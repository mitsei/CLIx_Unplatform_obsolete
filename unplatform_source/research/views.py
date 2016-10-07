import requests

from django.shortcuts import render, loader
from django.http import HttpResponse
from django.conf import settings

from research.models import Fingerprint, AppData, UUID, Configuration, User
from research.serializers import FingerprintSerializer, AppDataSerializer, UUIDSerializer, ConfigurationSerializer, UserSerializer
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.settings import api_settings


from research.utils import get_client_ip, get_host_ip, get_session_id

DEFAULT_LOG_GENUS_TYPE = 'log-genus-type%3Adefault-clix%40ODL.MIT.EDU'


class FingerprintViewSet(viewsets.ModelViewSet):

    """
    API endpoint that allows fingerprints to be viewed or edited.
    """
    queryset = Fingerprint.objects.all().order_by('-creation_time')
    serializer_class = FingerprintSerializer

    def perform_create(self, serializer):
        ip_list = get_client_ip(self.request).split(',')
        public_ip = str(ip_list[len(ip_list)-1])
        other_ip = None
        if len(ip_list) > 1:
            other_ip = str(ip_list[0])
        serializer.save(client_ip=public_ip,
                        client_ip_other=other_ip)


class AppDataViewSet(APIView):
    """
    API endpoint that allows appdata to be viewed or edited.
    Uses QBank logging as the back-end
    """
    def _get_log(self):
        url = settings.QBANK_LOGGING_ENDPOINT
        req = requests.get(url, verify=False)
        logs = req.json()
        default_log = None
        for log in logs:
            if log['genusTypeId'] == DEFAULT_LOG_GENUS_TYPE:
                default_log = log
                break
        if default_log is None:
            payload = {
                'name': 'Default CLIx log',
                'description': 'For logging info from unplatform and tools, which do not know about catalog IDs',
                'genusTypeId': DEFAULT_LOG_GENUS_TYPE
            }
            req = requests.post(url, json=payload, verify=False)
            default_log = req.json()
        return default_log

    def get(self, request, format=None):
        default_log = self._get_log()
        url = '{0}/{1}/logentries'.format(settings.QBANK_LOGGING_ENDPOINT,
                                          default_log['id'])
        req = requests.get(url, verify=False)
        log_entries = req.json()
        return Response(log_entries)

    def post(self, request, format=None):
        # get or find a default log genus type
        default_log = self._get_log()

        payload = {
            'data': request.data
        }
        log_entry_url = '{0}/{1}/logentries'.format(settings.QBANK_LOGGING_ENDPOINT,
                                                    default_log['id'])
        requests.post(log_entry_url, json=payload, verify=False)


class UUIDViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows UUIDs to be viewed or edited.
    """
    queryset = UUID.objects.all().order_by('-creation_time')
    serializer_class = UUIDSerializer

    # def perform_create(self, serializer):

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows school configurations to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-creation_time')
    serializer_class = UserSerializer

class ConfigurationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows school configurations to be viewed or edited.
    """
    queryset = Configuration.objects.all().order_by('-creation_time')
    serializer_class = ConfigurationSerializer
