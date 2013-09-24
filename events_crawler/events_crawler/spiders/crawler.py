# -*- coding: utf-8 -*-
from datetime import datetime

from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector

from events_crawler.items import EventItem
from events_crawler.spiders import utils

WIKIPEDIA_START_URLS = utils.get_wikipedia_urls_for_whole_year()

HEADLINES_OF_INTEREST = ['Events', 'Births', 'Deaths', ]


class WikipediaEventsSpider(BaseSpider):
    name = "wikipedia_events_spider"
    allowed_domains = ["http://en.wikipedia.org", ]

    start_urls = WIKIPEDIA_START_URLS

    def parse(self, response):
        hxs = HtmlXPathSelector(response)
        events = []

        #  All <h2> that have a child <span class="mw-headline">
        headlines = hxs.select('//h2[child::span[@class="mw-headline"]]')
        event_date = hxs.select('//h1[@id="firstHeading"]/span/text()').extract()[0]

        data = {}
        for headline in headlines:
            headline_type = headline.select('span[@class="mw-headline"]/text()').extract()[0]

            if headline_type in HEADLINES_OF_INTEREST:
                lines = headline.select('following-sibling::ul/li')
                for line in lines:
                    event = EventItem()
                    event['related_links'] = line.select('a/@href').extract()
                    event['description'] = ''.join(line.select('text()|a/text()').extract())
                    try:
                        event_year = int(event['description'][:4])
                    except ValueError:
                        continue  # Ignoring dates BC
                    complete_date = "{0} {1}".format(event_date, event_year)
                    event['event_date'] = datetime.strptime(complete_date, "%B %d %Y")
                    events.append(event)
    
        return events

