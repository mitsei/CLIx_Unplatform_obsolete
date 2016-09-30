from __future__ import absolute_import
from unplatform.wsgi import application
from tornado import httpserver, wsgi, ioloop, web

# The rest of these imports are so pyinstaller can find hidden imports
# during the build process. This can be done in the spec file but live
# here since the project is rebuilt from scratch before distribution
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
tornado_app = web.Application([
    (r'/static/(.*)', web.StaticFileHandler, {'path': '{0}/common/'.format(ABS_PATH)}),
    (r'/media/(.*)', web.StaticFileHandler, {'path': '{0}/modules/'.format(ABS_PATH)}),
    (r'.*', web.FallbackHandler, dict(fallback=wsgi_container)),
])
http_server = httpserver.HTTPServer(tornado_app,
                                    ssl_options = {
            "certfile":  CERTFILE,
                "keyfile": KEYFILE })

http_server.listen(8888)

ioloop.IOLoop.current().start()