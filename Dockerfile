FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY it.json ./it.json
COPY geekcalendar ./geekcalendar

ENV PORT=8080
EXPOSE 8080

CMD exec uvicorn geekcalendar.app:app --host 0.0.0.0 --port ${PORT}
