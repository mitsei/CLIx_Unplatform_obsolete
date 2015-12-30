from rest_framework import serializers
from unplatform.research.models import Fingerprint




class FingerprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fingerprint
        fields = ('url', 'uuid', 'user_agent', 'client_ip', 'server_ip', 'time')
