# -*- coding: utf-8 -*-

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

def get_wikipedia_urls_for_whole_year():
    urls = []
    for month, days in MONTHS.items():
        for day in xrange(1, days + 1):
            url = 'https://en.wikipedia.org/wiki/{0}_{1}'.format(month, day)
            urls.append(url)
    return urls


def get_bbc_on_this_day_urls_for_whole_year():
    urls = []
    for month, days in MONTHS.items():
        for day in xrange(1, days + 1):
            url = 'http://news.bbc.co.uk/onthisday/low/dates/stories/{0}/{1}/default.stm'.format(month.lower(), day)
            urls.append(url)
    return urls


def get_nytimes_on_this_day_urls_for_whole_year():
    urls = []
    for month, days in MONTHS.items():
        for day in xrange(1, days + 1):
            url = 'http://learning.blogs.nytimes.com/on-this-day/{0}-{1}/'.format(month, day)
            urls.append(url)
    return urls

def get_all_urls():
    urls = []
    urls1 = get_wikipedia_urls_for_whole_year()
    urls2 = get_bbc_on_this_day_urls_for_whole_year()
    urls3 = get_nytimes_on_this_day_urls_for_whole_year()

    return urls


