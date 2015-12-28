from django.db import models

# Create your models here.

# class SessionUUID(models.model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     user_agent = models.CharField(max_length=150) # not sure what a good length is yet
#     ip_address = models.CharField(max_length=15)
#     time = models.DateTimeField(auto_now_add=True)
#
# class VideoData(models.Model):
# 	uuid = models.ForeignKey(SessionUUID, related_name='uuids')
# 	metadata = models.
#
# 	time = models.DateTimeField(auto_now_add=True)
# 	def __unicode__(self):
# 		return self.metadata
