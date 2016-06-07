# #!/usr/bin/env python
# import tornado.ioloop
# import maproxy.proxyserver
#
# # HTTPS->HTTP
# ssl_certs={     "certfile":  "../unplatform.cert.pem",
#                 "keyfile": "../unplatform.key.pem" }
# # "client_ssl_options=ssl_certs" simply means "listen using SSL"
# server = maproxy.proxyserver.ProxyServer("localhost",8000,
#                                          client_ssl_options=ssl_certs)
# server.listen(1024)
# # print("https://127.0.0.1:8888 -> http://www.google.com")
# tornado.ioloop.IOLoop.instance().start()


from unplatform.wsgi import application
from tornado import httpserver, wsgi, ioloop
import maproxy.proxyserver

container = wsgi.WSGIContainer(application)
http_server = httpserver.HTTPServer(container)
http_server.listen(8888)
ssl_certs={     "certfile":  "./unplatform.cert.dummy.pem",
                "keyfile": "./unplatform.key.dummy.pem" }
server = maproxy.proxyserver.ProxyServer("localhost",8888,
                                         client_ssl_options=ssl_certs)
server.listen(8080)

ioloop.IOLoop.current().start()