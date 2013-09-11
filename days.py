# -*- coding: utf-8 -*-

def get_wikipedia_urls_for_whole_year():
    urls = []
    
    MONTHS = {
        'January': 31,
        'February': 29,
        'March': 31,
        'April': 30,
        'May': 31,
        'June': 30,
        'July': 31,
        'August': 31,
        'September': 30,
        'October': 31,
        'November': 30,
        'December': 31,
    }

    for month, days in MONTHS.items():
        for day in xrange(1, days + 1):
            url = 'https://en.wikipedia.org/wiki/{0}_{1}'.format(month, day)
            urls.append(url)

    return urls
