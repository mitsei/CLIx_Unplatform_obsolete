from django.db import models

# Create your models here.
from django.template.context_processors import request


class Fingerprint(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uuid = models.CharField(max_length=32, null=True)
    user_agent = models.CharField(max_length=200) # not sure what a good length is yet
    client_ip = models.CharField(max_length=15, null=True)
    server_ip = models.CharField(max_length=15, null=True)
    time = models.DateTimeField(auto_now_add=True)


#
# class VideoData(models.Model):
# 	uuid = models.ForeignKey(SessionUUID, related_name='uuids')
# 	metadata = models.
#
# 	time = models.DateTimeField(auto_now_add=True)
# 	def __unicode__(self):
# 		return self.metadata
