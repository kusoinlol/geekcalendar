# -*- coding: utf-8 -*-
import bottle
import datetime
import pymongo
import random

def get_random_event_for(day):
    conn = pymongo.MongoClient()
    db = conn.geekcalendar

    event_date = '{0}{1}'.format(day.month, day.day)
    event = db.events.find_one({'random': {'$gte': random.random()}, 'event_date': event_date })
    
    return event


@bottle.route('/')
@bottle.view('onthisday')
def onthisday():
    day = datetime.datetime.today()
    event = get_random_event_for(day)
    event = dict(event)
    return {'event': event}


bottle.run(host='localhost', port=8080)
