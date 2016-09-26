from __future__ import absolute_import
from unplatform.settings import BROKER_URL # CELERY_RESULT_BACKEND
import os

# All the following imports are so pyinstaller can detect the correct modules to load when building standalone distributables
import celery
from celery import Celery, fixups
from celery.fixups import django
from celery.loaders import app
import celery.loaders.app

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'unplatform.settings')

from django.conf import settings

app = Celery('unplatform', broker=BROKER_URL)

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))