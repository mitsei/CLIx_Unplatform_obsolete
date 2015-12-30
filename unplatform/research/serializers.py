from rest_framework import serializers
from unplatform.research.models import Fingerprint
from unplatform.research.utils import get_client_ip




# class DetectedSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AttendeeLocation
#         fields = ('latitude', 'longitude', 'time')

class FingerprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fingerprint
        fields = ('uuid', 'user_agent', 'client_ip', 'server_ip',)
        # def save(self):
        #     client_ip = self.context['request'].META.get('REMOTE_ADDR')

        # def get_ip(self, request):
        #     x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        #     if x_forwarded_for:
        #         ip = x_forwarded_for.split(',')[0]
        #     else:
        #         ip = request.META.get('REMOTE_ADDR')
        #     return ip
