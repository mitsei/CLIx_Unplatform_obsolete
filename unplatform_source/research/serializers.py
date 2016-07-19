from rest_framework import serializers
from research.models import Fingerprint, AppData, UUID, Configuration, User
from research.fields import GetOrCreateSlugRelatedField



class FingerprintSerializer(serializers.ModelSerializer):
    session_id = GetOrCreateSlugRelatedField(queryset=UUID.objects.all(), slug_field='session_id')
    class Meta:
        model = Fingerprint
        fields = ('url', 'session_id', 'user_agent', 'screen_size', 'browser_url', 'languages', 'client_ip', 'client_ip_other', 'server_ip', 'creation_time', 'is_sent')


class AppDataSerializer(serializers.ModelSerializer):
    session_id = GetOrCreateSlugRelatedField(queryset=UUID.objects.all(), slug_field='session_id')
    class Meta:
        model = AppData
        fields = ('url', 'session_id', 'app_name', 'event_type', 'params', 'creation_time', 'is_sent')


class UUIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = UUID
        fields = ('url', 'session_id', 'configuration', 'creation_time')

class ConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Configuration
        fields = ('url', 'state', 'district', 'school_id', 'terminal_id', 'creation_time', 'is_sent')

class UserSerializer(serializers.ModelSerializer):
    session_id = GetOrCreateSlugRelatedField(queryset=UUID.objects.all(), slug_field='session_id')
    class Meta:
        model = User
        fields = ('url', 'session_id', 'user_type', 'user_count', 'creation_time', 'is_sent')