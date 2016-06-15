from unplatform.wsgi import application
from tornado import httpserver, wsgi, ioloop
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CERTFILE = os.path.join(BASE_DIR, "unplatform.cert.dummy.pem")
KEYFILE = os.path.join(BASE_DIR, "unplatform.cert.dummy.pem")

container = wsgi.WSGIContainer(application)
http_server = httpserver.HTTPServer(container,
                                    ssl_options = {
            "certfile":  CERTFILE,
                "keyfile": KEYFILE })

http_server.listen(8888)

ioloop.IOLoop.current().start()