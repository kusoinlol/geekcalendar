# -*- coding: utf-8 -*-
from datetime import datetime
import random

from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector

from events_crawler.items import EventItem
from events_crawler.spiders import utils

WIKIPEDIA_START_URLS = utils.get_wikipedia_urls_for_whole_year()

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

                    try:
                        event_year = int(short_description[:4])
                    except ValueError:
                        continue

                    if headline_type == 'Births':
                        short_description = short_description[7:]
                        short_description = 'Birth of ' + short_description

                    if headline_type == 'Deaths':
                        short_description = short_description[7:]
                        short_description = 'Death of ' + short_description
                
                    event['short_description'] = short_description

                    if 'BC' in short_description or event_year < 1000:
                        # Ignoring BC dates and lower than 1000 beacuse
                        # strptime doesnt work well in this cases
                        continue

                    raw_complete_date = "{0} {1}".format(raw_day, event_year)
                    complete_event_date = datetime.strptime(raw_complete_date, "%B %d %Y")
                    event['complete_event_date'] = complete_event_date
                    event['event_date'] = '{0}{1}'.format(complete_event_date.month, complete_event_date.day)
                    event['related_links'] = line.select('a/@href').extract()
                    event['random'] = random.random()

                    events.append(event)

        return events
