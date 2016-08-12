from django.shortcuts import render, loader
from django.http import HttpResponse

from research.models import Fingerprint, AppData, UUID, Configuration, User
from research.serializers import FingerprintSerializer, AppDataSerializer, UUIDSerializer, ConfigurationSerializer, UserSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.settings import api_settings


from research.utils import get_client_ip, get_host_ip, get_session_id

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


class AppDataViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows appdata to be viewed or edited.
    """
    queryset = AppData.objects.all().order_by('-creation_time')
    serializer_class = AppDataSerializer


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
