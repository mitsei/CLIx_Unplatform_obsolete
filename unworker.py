from __future__ import absolute_import
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "unplatform.settings")
# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
from unplatform.celeryapp import app as celery_app
import celery.apps
from celery.bin import worker
import celery.apps.worker

worker = worker.worker(app=celery_app)
worker.app.IS_WINDOWS = False

options = {

    'traceback': True,
    'beat': True,
}

worker.run(**options) 
