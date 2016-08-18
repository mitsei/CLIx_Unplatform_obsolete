from __future__ import absolute_import
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "unplatform.settings")
# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
from unplatform.celeryapp import app as celery_app
import celery.apps
from celery.bin import worker
import celery.apps.worker
import celery.app.log
import celery.app.amqp
import django.core.cache.backends.locmem
import celery.concurrency.prefork
import celery.worker.autoscale
import celery.worker.autoreload
import celery.worker.consumer
import celery.app.control
import celery.events
import celery.worker.strategy
import celery.backends.base

from billiard import freeze_support
freeze_support()

if __name__ == '__main__':
    print('Beginning sync worker')
    worker = worker.worker(app=celery_app)
    worker.app.IS_WINDOWS = False
    options = {
        'traceback': True,
        'beat': True,
        'autoscale': [1,1],
    }
    worker.run(**options)
