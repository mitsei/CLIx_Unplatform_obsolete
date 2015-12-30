from django.shortcuts import render, loader
from django.http import HttpResponse

from unplatform.research.models import Fingerprint
from unplatform.research.serializers import FingerprintSerializer
from rest_framework import viewsets

from unplatform.research.utils import get_client_ip, get_host_ip, get_session_id


# Create your views here.
#


def index(request):
    template = loader.get_template('research/index.html')
    return HttpResponse(template.render())

def video(request):
    template = loader.get_template('research/video.html')
    return HttpResponse(template.render({'client_ip':get_client_ip(request)}))


def comprehension(request):
    testvar = [1,2,3,4]
    template = loader.get_template('research/comprehension.html')
    return HttpResponse(template.render({'testvar':testvar}))


# from django.utils.translation import ugettext as _
# from django.http import HttpResponse
#
# def my_view(request):
#     output = _("Welcome to my site.")
#     return HttpResponse(output)




class FingerprintViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows fingerprints to be viewed or edited.
    """
    queryset = Fingerprint.objects.all()
    serializer_class = FingerprintSerializer

    def perform_create(self, serializer):
            serializer.save(client_ip=str(get_client_ip(self.request)),
                            server_ip=str(get_host_ip()),
                            uuid=get_session_id(self.request))
