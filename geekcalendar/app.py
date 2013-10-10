# -*- coding: utf-8 -*-
import bottle
import datetime
import pymongo
import random

YEAR_MONTHS = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July',  
               'August', 'September', 'October', 'November', 'December']


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

    event_date = event['complete_event_date']
    event['formatted_date'] = '{0} {1}, {2}'.format(YEAR_MONTHS[event_date.month], event_date.day, event_date.year)

    return {'event': event}


@bottle.route('/static/<filepath:path>')
def serve_static(filepath):
    import os
    static_root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')
    return bottle.static_file(filepath, root=static_root)


bottle.run(host='localhost', port=8080, debug=True, reloader=True)
