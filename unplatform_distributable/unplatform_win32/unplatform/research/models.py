from django.db import models
from django.utils import timezone
from research.utils import get_host_ip


class Configuration(models.Model):
    state = models.CharField(max_length=32, null=True)
    district = models.CharField(max_length=32, null=True)
    school_id = models.CharField(max_length=36, primary_key=True)
    terminal_id = models.CharField(max_length=6, null=True)
    is_sent = models.NullBooleanField(null=True) # for tracking if it was passed to remote db (e.g. cloud repo)
    creation_time = models.DateTimeField(default=timezone.now)

def get_configuration():
    try:
        data = Configuration.objects.latest('creation_time').school_id
    except Configuration.DoesNotExist:
        data = "NOTSET"
    return data

class UUID(models.Model):
    session_id = models.CharField(max_length=36, primary_key=True)
    creation_time = models.DateTimeField(default=timezone.now)
    configuration = models.ForeignKey(Configuration, related_name='configurations', default=get_configuration)
    def __str__(self):
        return self.session_id
# default should be Configuration.objects.latest('creation_time').school_id

class User(models.Model):
    session_id = models.ForeignKey(UUID, related_name='users')
    user_type = models.CharField(max_length=15, null=True)
    user_count = models.CharField(max_length=2, null=True)
    is_sent = models.NullBooleanField(null=True) # for tracking if it was passed to a remote db (e.g. cloud repo)
    creation_time = models.DateTimeField(default=timezone.now)

class Fingerprint(models.Model):
    session_id = models.ForeignKey(UUID, related_name='fingerprints')
    user_agent = models.CharField(max_length=200) # not sure what a good length is yet
    screen_size = models.CharField(max_length=12, null=True)
    browser_url = models.CharField(max_length=200, null=True) # also not sure about this length
    languages = models.CharField(max_length=50, null=True) # or this one, for that matter
    client_ip = models.CharField(max_length=15, null=True)
    client_ip_other = models.CharField(max_length=15, null=True)
    server_ip = models.CharField(max_length=15, default=get_host_ip)
    is_sent = models.NullBooleanField(null=True) # for tracking if it was passed to a remote db (e.g. cloud repo)
    creation_time = models.DateTimeField(default=timezone.now) # Was auto_now_add=true but changed to allow override
#
class AppData(models.Model):
    session_id = models.ForeignKey(UUID, related_name='appdata')
    app_name = models.CharField(max_length=32)
    event_type = models.CharField(max_length=32)
    params = models.TextField()
    is_sent = models.NullBooleanField(null=True) # for tracking if it was passed to a remote db (e.g. cloud repo)
    creation_time = models.DateTimeField(default=timezone.now)



