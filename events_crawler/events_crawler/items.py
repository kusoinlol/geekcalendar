from scrapy.item import Item, Field


class EventItem(Item):
    event_date = Field()
    short_description = Field()
    full_description = Field()
    related_links = Field()

    random = Field()  # Used to retrieve documents randomly

