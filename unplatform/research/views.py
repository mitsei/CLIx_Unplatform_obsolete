from django.shortcuts import render, loader
from django.http import HttpResponse

from unplatform.research.models import Fingerprint
from unplatform.research.serializers import FingerprintSerializer
from rest_framework import viewsets

from unplatform.research.utils import get_client_ip, get_host_ip, get_session_id

import uuid

# Create your views here.
#


def index(request):
    template = loader.get_template('research/index.html')
    return HttpResponse(template.render())

def video(request):
    print dir(request.session)
    print (request.session.has_key)
    print get_session_id(request)
    print dir(request.session)
    template = loader.get_template('research/video.html')
    return HttpResponse(template.render({'client_ip':get_client_ip(request), 'session_id':get_session_id(request)}))


def comprehension(request):
    testvar = [1,2,3,4]
    template = loader.get_template('research/comprehension.html')
    return HttpResponse(template.render({'testvar':testvar}))


class FingerprintViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows fingerprints to be viewed or edited.
    """
    queryset = Fingerprint.objects.all()
    serializer_class = FingerprintSerializer

    def perform_create(self, serializer):
        # print dir(self.request.session)
        # print (self.request.session.has_key)
        # self.request.session['has_session'] = True
        # print get_session_id(self.request)
        serializer.save(client_ip=str(get_client_ip(self.request)),
                        client_ip_private=
                        server_ip=str(get_host_ip())
                        )
        # uuid=get_session_id(self.request)
        # print dir(self.request.session)
