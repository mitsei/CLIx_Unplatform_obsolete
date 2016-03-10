from django.db import models

# Create your models here.
from django.template.context_processors import request


class Fingerprint(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uuid = models.CharField(max_length=32, null=True)
    user_agent = models.CharField(max_length=200) # not sure what a good length is yet
    client_ip = models.CharField(max_length=15, null=True)
    client_ip_other = models.CharField(max_length=15, null=True)
    server_ip = models.CharField(max_length=15, null=True)
    creation_time = models.DateTimeField(auto_now_add=True)


#
# class ModuleData(models.Model):
# 	uuid = models.ForeignKey(SessionUUID, related_name='uuids')
# 	metadata = models.
#       browser_url = models.CharField(max_length=200) # not sure if this is a good length
# 	time = models.DateTimeField(auto_now_add=True)
# 	def __unicode__(self):
# 		return self.metadata
