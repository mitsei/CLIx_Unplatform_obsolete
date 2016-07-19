from __future__ import absolute_import
import os
import celery
from celery import fixups

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "unplatform.settings")
# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
from unplatform.celeryapp import app as celery_app