from django.db import models
from django.utils import timezone

class Fingerprint(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uuid = models.CharField(max_length=36, null=True)
    user_agent = models.CharField(max_length=200) # not sure what a good length is yet
    screen_size = models.CharField(max_length=12, null=True)
    browser_url = models.CharField(max_length=200, null=True) # also not sure about this length
    languages = models.CharField(max_length=50, null=True) # or this one, for that matter
    client_ip = models.CharField(max_length=15, null=True)
    client_ip_other = models.CharField(max_length=15, null=True)
    server_ip = models.CharField(max_length=15, null=True)
    is_sent = models.BooleanField(default=False) # for tracking if it was passed to a remote db (e.g. cloud repo)
    creation_time = models.DateTimeField(default=timezone.now) # Was auto_now_add=true but changed to allow override

