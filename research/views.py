from django.shortcuts import render, loader
from django.http import HttpResponse

from research.models import Fingerprint, AppData, UUID
from research.serializers import FingerprintSerializer, AppDataSerializer, UUIDSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.settings import api_settings


from research.utils import get_client_ip, get_host_ip, get_session_id #, get_modules

class FingerprintViewSet(viewsets.ModelViewSet):

    """
    API endpoint that allows fingerprints to be viewed or edited.
    """
    queryset = Fingerprint.objects.all().order_by('-creation_time')
    serializer_class = FingerprintSerializer

    def perform_create(self, serializer):
        # print dir(self.request.session)
        # print (self.request.session.has_key)
        # self.request.session['has_session'] = True
        # print get_session_id(self.request)
        # print len(get_client_ip(self.request).split(','))
        ip_list = get_client_ip(self.request).split(',')
        public_ip = str(ip_list[len(ip_list)-1])
        other_ip = None
        if len(ip_list) > 1:
            other_ip = str(ip_list[0])

        serializer.save(client_ip=public_ip,
                        client_ip_other=other_ip,
                        server_ip=str(get_host_ip())
                        )
        # uuid=get_session_id(self.request)
        # print dir(self.request.session)


class AppDataViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = AppData.objects.all()
    serializer_class = AppDataSerializer
    def create(self, request, *args, **kwargs):
        # serializer = self.get_serializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        # headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        # serializer.save()
        return {}

    def get_success_headers(self, data):
        # try:
        #     return {'Location': data[api_settings.URL_FIELD_NAME]}
        # except (TypeError, KeyError):
            return {}

class UUIDViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = UUID.objects.all()
    serializer_class = UUIDSerializer
