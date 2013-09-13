from scrapy.item import Item, Field

class EventItem(Item):
    event_date = Field()
    description = Field()
    related_links = Field()

