from django.db import models
from django.http import HttpResponse

# Create your models here.
from django.template.context_processors import request


class Fingerprint(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uuid = models.CharField(max_length=150, null=True)
    user_agent = models.CharField(max_length=150) # not sure what a good length is yet
    client_ip = models.CharField(max_length=15, null=True)
    server_ip = models.CharField(max_length=15, null=True)
    time = models.DateTimeField(auto_now_add=True)
    asdf = request


#
# class VideoData(models.Model):
# 	uuid = models.ForeignKey(SessionUUID, related_name='uuids')
# 	metadata = models.
#
# 	time = models.DateTimeField(auto_now_add=True)
# 	def __unicode__(self):
# 		return self.metadata
