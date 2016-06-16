from __future__ import absolute_import
from unplatform.wsgi import application
from tornado import httpserver, wsgi, ioloop
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "unplatform.settings")
import django.views.defaults
from unplatform.celeryapp import app as celery_app
from celery.bin import worker

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