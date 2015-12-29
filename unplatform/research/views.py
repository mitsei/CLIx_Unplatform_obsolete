from django.shortcuts import render, loader
from django.http import HttpResponse
import socket

import json

from unplatform.research.models import Fingerprint
from unplatform.research.serializers import FingerprintSerializer
from rest_framework import viewsets


# Create your views here.

# This beast returns the ip address of the host machine
def get_host_ip():
    return [l for l in ([ip for ip in socket.gethostbyname_ex(socket.gethostname())[2] if not ip.startswith("127.")][:1], [[(s.connect(('8.8.8.8', 80)), s.getsockname()[0], s.close()) for s in [socket.socket(socket.AF_INET, socket.SOCK_DGRAM)]][0][1]]) if l][0][0]
#
# def get_client_ip(request):
#     return request.META['HTTP_X_FORWARDED_FOR']

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def get_uuid():
    return 0


def index(request):
    template = loader.get_template('research/index.html')
    return HttpResponse(template.render())

def video(request):
    template = loader.get_template('research/video.html')
    return HttpResponse(template.render({'client_ip':get_client_ip(request)}))



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

class FingerprintViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Fingerprint.objects.all()
    serializer_class = FingerprintSerializer