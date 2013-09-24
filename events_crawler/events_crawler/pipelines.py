from pymongo import MongoClient


class CrawlerPipeline(object):

    def __init__(self, *args, **kwargs):
        self.client = MongoClient('localhost', 27017)
        self.db = self.client.geekcalendar
        
    def process_item(self, item, spider):
        self.db.events.insert(dict(item)) 
        return item

