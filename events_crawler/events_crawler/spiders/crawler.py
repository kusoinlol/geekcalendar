# -*- coding: utf-8 -*-
from datetime import datetime

from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector

from events_crawler.items import DayItem
from events_crawler.spiders import utils

WIKIPEDIA_START_URLS = utils.get_wikipedia_urls_for_whole_year()

HEADLINES_OF_INTEREST = ['Events', 'Births', 'Deaths', ]


class WikipediaEventsSpider(BaseSpider):
    name = "wikipedia_events_spider"
    allowed_domains = ["http://en.wikipedia.org", ]
    start_urls = WIKIPEDIA_START_URLS

    def parse(self, response):
        hxs = HtmlXPathSelector(response)
        day = DayItem()

        #  All <h2> that have a child <span class="mw-headline">
        headlines = hxs.select('//h2[child::span[@class="mw-headline"]]')
        
        raw_day = hxs.select('//h1[@id="firstHeading"]/span/text()').extract()[0]
        converted_day = datetime.strptime(raw_day, "%B %d")
        actual_day = datetime.strftime(converted_day, "%m%d")

        day['day'] = actual_day

        events = []
        for headline in headlines:
            headline_type = headline.select('span[@class="mw-headline"]/text()').extract()[0]

            if headline_type in HEADLINES_OF_INTEREST:
                lines = headline.select('following-sibling::ul/li')
                for line in lines:
                    event = {}

                    description = ''.join(line.select('text()|a/text()').extract())

                    try:
                        event_year = int(description[:4])
                    except ValueError:
                        continue  # Ignoring dates BC
                    complete_date = "{0} {1}".format(raw_day, event_year)

                    event['complete_date'] = datetime.strptime(complete_date, "%B %d %Y")
                    event['type'] = headline_type
                    event['description'] = description
                    event['related_links'] = line.select('a/@href').extract()
                    
                    events.append(event)
  
        day['events'] = events

        return day

