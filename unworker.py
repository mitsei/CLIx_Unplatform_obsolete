from __future__ import absolute_import
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "unplatform.settings")
# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
from unplatform.celery import app as celery_app

from celery.bin import worker

worker = worker.worker(app=celery_app)

options = {
    'loglevel': 'INFO',
    'traceback': True,
    'beat': True,
}

worker.run(**options) 
