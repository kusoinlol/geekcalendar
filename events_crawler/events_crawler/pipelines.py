# -*- coding: utf-8 -*-
import pymongo


class CrawlerPipeline(object):

    def __init__(self, *args, **kwargs):
        self.client = pymongo.MongoClient('localhost', 27017)
        self.db = self.client.geekcalendar
        
    def process_item(self, item, spider):
        try:
            self.db.events.insert(dict(item)) 
        except pymongo.errors.DuplicateKeyError:
            pass  # Ignoring events that is duplicated (already exists in collection)

        return item

