from __future__ import absolute_import

from celery import shared_task


from research.models import Fingerprint, AppData, Configuration, User
from django.core import serializers
import json, requests, socket
from research.utils import is_connected, REMOTE_SERVER

@shared_task
def send_data_to_cloud():
    print('Checking for live connection')
    if (is_connected()):
        print('Attempting to send data')
        configurations_to_be_sent = Configuration.objects.exclude(is_sent=True)
        serialized_configurations = json.loads(serializers.serialize('json', configurations_to_be_sent))
        for index, obj in enumerate(serialized_configurations):
            r=requests.post('https://unplatform.herokuapp.com/api/configuration/', json=obj['fields'])
            if r.status_code==201:
                configurations_to_be_sent[index].is_sent=True
                configurations_to_be_sent[index].save()
                print("configuration pk=" + str(configurations_to_be_sent[index].pk) + " succcessfully sent")
        users_to_be_sent = User.objects.exclude(is_sent=True)
        serialized_users = json.loads(serializers.serialize('json', users_to_be_sent))
        for index, obj in enumerate(serialized_users):
            r=requests.post('https://unplatform.herokuapp.com/api/users/', json=obj['fields'])
            if r.status_code==201:
                users_to_be_sent[index].is_sent=True
                users_to_be_sent[index].save()
                print("user pk=" + str(users_to_be_sent[index].pk) + " succcessfully sent")
        fingerprints_to_be_sent = Fingerprint.objects.exclude(is_sent=True)
        serialized_fingerprint = json.loads(serializers.serialize('json', fingerprints_to_be_sent))
        for index, obj in enumerate(serialized_fingerprint):
            r=requests.post('https://unplatform.herokuapp.com/api/fingerprints/', json=obj['fields'])
            if r.status_code==201:
                fingerprints_to_be_sent[index].is_sent=True
                fingerprints_to_be_sent[index].save()
                print("fingerprint pk=" + str(fingerprints_to_be_sent[index].pk) + " succcessfully sent")
        appdata_to_be_sent = AppData.objects.exclude(is_sent=True)
        serialized_appdata = json.loads(serializers.serialize('json', appdata_to_be_sent))
        for index, obj in enumerate(serialized_appdata):
            r=requests.post('https://unplatform.herokuapp.com/api/appdata/', json=obj['fields'])
            if r.status_code==201:
                appdata_to_be_sent[index].is_sent=True
                appdata_to_be_sent[index].save()
                print("appdata pk=" + str(appdata_to_be_sent[index].pk) + " succcessfully sent")
    else:
        print('No connection')
        return