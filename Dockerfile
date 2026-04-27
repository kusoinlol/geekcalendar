FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    TZ=Asia/Taipei

# tzdata so datetime.date.today() reflects Taipei wall-clock, not UTC.
RUN apt-get update \
    && apt-get install -y --no-install-recommends tzdata \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo "$TZ" > /etc/timezone \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY it.json ./it.json
COPY geekcalendar ./geekcalendar

ENV PORT=8080
EXPOSE 8080

CMD exec uvicorn geekcalendar.app:app --host 0.0.0.0 --port ${PORT}
