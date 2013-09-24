# Scrapy settings for crawler project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#

BOT_NAME = 'events_crawler'

SPIDER_MODULES = ['events_crawler.spiders']
NEWSPIDER_MODULE = 'events_crawler.spiders'

ITEM_PIPELINES = {
    'events_crawler.pipelines.CrawlerPipeline': 100,
}

# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'crawler (+http://www.yourdomain.com)'
