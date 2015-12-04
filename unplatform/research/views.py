from django.shortcuts import render, loader
from django.http import HttpResponse
import socket

import json
# Create your views here.

# This beast returns the ip address of the host machine
def get_ip():
    return [l for l in ([ip for ip in socket.gethostbyname_ex(socket.gethostname())[2] if not ip.startswith("127.")][:1], [[(s.connect(('8.8.8.8', 80)), s.getsockname()[0], s.close()) for s in [socket.socket(socket.AF_INET, socket.SOCK_DGRAM)]][0][1]]) if l][0][0]


def index(request):
    template = loader.get_template('research/index.html')
    return HttpResponse(template.render())

# from django.utils.translation import ugettext as _
# from django.http import HttpResponse
#
# def my_view(request):
#     output = _("Welcome to my site.")
#     return HttpResponse(output)


def comprehension(request):
    testvar = [1,2,3,4]
    template = loader.get_template('research/comprehension.html')
    return HttpResponse(template.render({'testvar':testvar}))