from __future__ import absolute_import
from unplatform.wsgi import application
from tornado import httpserver, wsgi, ioloop, web

# The rest of these imports are so pyinstaller can find hidden imports
# during the build process. This can be done in the spec file but live
# here since the project is rebuilt from scratch before distribution
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "unplatform.settings")
import django.views.defaults
import django.contrib.auth.apps
import django.contrib.messages.apps
import django.contrib.contenttypes.apps
import django.contrib.staticfiles.apps
from unplatform.celeryapp import app as celery_app
from celery.bin import worker
import celery.apps
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
import natsort
import requests
import rest_framework
import corsheaders
import kombu.transport.django
import rest_framework_swagger
import corsheaders.middleware
import django.contrib.sessions.middleware
import django.contrib.sessions.apps
import django.contrib.auth.middleware
import django.contrib.messages.middleware
import rest_framework.routers
import rest_framework.renderers
import rest_framework.parsers
import rest_framework.authentication

# This doesn't always work right, depending on where you launch the executable from
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CERTFILE = os.path.join(BASE_DIR, "unplatform/unplatform.cert.dummy.pem")
KEYFILE = os.path.join(BASE_DIR, "unplatform/unplatform.key.dummy.pem")

# Let Tornado handle static files and media from epubs
import sys
if getattr(sys, 'frozen', False):
    ABS_PATH = os.path.dirname(sys.executable)
else:
    ABS_PATH = BASE_DIR

wsgi_container = wsgi.WSGIContainer(application)
# Note, these two static / media URLs must match the Django settings in unplatform/settings.py
# for STATIC_URL and MEDIA_URL
tornado_app = web.Application([
    (r'/media/(.*)', web.StaticFileHandler, {'path': '{0}/modules/'.format(ABS_PATH)}),
    (r'.*', web.FallbackHandler, dict(fallback=wsgi_container)),
])
http_server = httpserver.HTTPServer(tornado_app,
                                    ssl_options = {
            "certfile":  CERTFILE,
                "keyfile": KEYFILE })

http_server.listen(8888)

ioloop.IOLoop.current().start()
