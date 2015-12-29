from django.db import models

# Create your models here.

class Fingerprint(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uuid = models.CharField(max_length=150)
    user_agent = models.CharField(max_length=150) # not sure what a good length is yet
    client_ip = models.CharField(max_length=15)
    server_ip = models.CharField(max_length=15)
    time = models.DateTimeField(auto_now_add=True)

# def get_session_id(request):
# from django.http import HttpResponse

#     if not request.session.get('has_session'):
#         request.session['has_session'] = True
#     return request.session.session_key
#
# ,'session_id':get_session_id(request)}


#
# class VideoData(models.Model):
# 	uuid = models.ForeignKey(SessionUUID, related_name='uuids')
# 	metadata = models.
#
# 	time = models.DateTimeField(auto_now_add=True)
# 	def __unicode__(self):
# 		return self.metadata
