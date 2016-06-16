from __future__ import absolute_import
from unplatform.wsgi import application
from tornado import httpserver, wsgi, ioloop
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "unplatform.settings")
import django.views.defaults
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

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CERTFILE = os.path.join(BASE_DIR, "unplatform/unplatform.cert.dummy.pem")
KEYFILE = os.path.join(BASE_DIR, "unplatform/unplatform.key.dummy.pem")

container = wsgi.WSGIContainer(application)
http_server = httpserver.HTTPServer(container,
                                    ssl_options = {
            "certfile":  CERTFILE,
                "keyfile": KEYFILE })

http_server.listen(8888)

ioloop.IOLoop.current().start()