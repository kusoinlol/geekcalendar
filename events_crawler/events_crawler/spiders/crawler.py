# -*- coding: utf-8 -*-
from datetime import datetime

from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector

from events_crawler.items import EventItem
from events_crawler.spiders import utils

WIKIPEDIA_START_URLS = utils.get_wikipedia_urls_for_whole_year()
WIKIPEDIA_START_URLS = ["https://en.wikipedia.org/wiki/October_1", ]

HEADLINES_OF_INTEREST = ['Events', 'Births', 'Deaths', ]


class WikipediaEventsSpider(BaseSpider):
    name = "wikipedia_events_spider"
    allowed_domains = ["https://en.wikipedia.org", ]
    start_urls = WIKIPEDIA_START_URLS

    def parse(self, response):
        hxs = HtmlXPathSelector(response)

        #  All <h2> that have a child <span class="mw-headline">
        headlines = hxs.select('//h2[child::span[@class="mw-headline"]]')
        raw_day = hxs.select('//h1[@id="firstHeading"]/span/text()').extract()[0]

        events = []
        for headline in headlines:
            headline_type = headline.select('span[@class="mw-headline"]/text()').extract()[0]

            if headline_type in HEADLINES_OF_INTEREST:
                lines = headline.select('following-sibling::ul/li')
                for line in lines:
                    event = EventItem()

                    short_description = ''.join(line.select('text()|a/text()').extract())
                    event['short_description'] = short_description

                    if 'BC' in short_description:
                        # Ignoring BC dates
                        continue

                    try:
                        event_year = int(short_description[:4])
                    except ValueError:
                        continue

                    if event_year < 1000:
                        # strptime with years lower than 1000 doesnt work
                        # need to find a way to fix it
                        continue

                    raw_complete_date = "{0} {1}".format(raw_day, event_year)
                    event['event_date'] = datetime.strptime(raw_complete_date, "%B %d %Y")
                    # event['type'] = headline_type
                    event['related_links'] = line.select('a/@href').extract()
                    
                    events.append(event)
        return events
