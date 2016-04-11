from rest_framework import serializers
from research.models import Fingerprint




class FingerprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fingerprint
        fields = ('url', 'uuid', 'user_agent', 'screen_size', 'browser_url', 'languages', 'client_ip', 'client_ip_other', 'server_ip', 'creation_time')

#
# class ModuleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Module
#         fields = ('url', 'browser_url', 'creation_time')
