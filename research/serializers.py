from rest_framework import serializers
from research.models import Fingerprint, AppData, UUID
from research.fields import GetOrCreateSlugRelatedField



class FingerprintSerializer(serializers.ModelSerializer):
    session_id = GetOrCreateSlugRelatedField(queryset=UUID.objects.all(), slug_field='session_id')
    class Meta:
        model = Fingerprint
        fields = ('url', 'session_id', 'user_agent', 'screen_size', 'browser_url', 'languages', 'client_ip', 'client_ip_other', 'server_ip', 'creation_time')
# removed , 'is_sent'


class AppDataSerializer(serializers.ModelSerializer):
    session_id = GetOrCreateSlugRelatedField(queryset=UUID.objects.all(), slug_field='session_id')
    class Meta:
        model = AppData
        fields = ('url', 'session_id', 'app_name', 'event_type', 'params', 'creation_time')


# class DataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Fingerprint
#         fields = ('url', 'user_agent', 'screen_size', 'browser_url', 'languages', 'client_ip', 'client_ip_other', 'server_ip', 'creation_time')

class UUIDSerializer(serializers.ModelSerializer):
    # fingerprints = FingerprintSerializer(many=True, read_only=True)
    # appdata = AppDataSerializer(many=True, read_only=True)
    class Meta:
        model = UUID
        fields = ('url', 'session_id')