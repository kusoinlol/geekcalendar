from scrapy.item import Item, Field


class DayItem(Item):
    day = Field()
    events = Field()

