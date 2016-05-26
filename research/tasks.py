from __future__ import absolute_import

from celery import shared_task


from research.models import Fingerprint, AppData
from django.core import serializers
import json, requests

@shared_task
def send_data_to_cloud():
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


# from research.models import Fingerprint
# import requests
#
# # @app.task
# @shared_task
# def update_link(pk):
#     link = Fingerprint.objects.get(pk=pk)
#     # ...
#     res = requests.get(link.url, timeout=2)
    # ....

     # create a task
     # update_link.delay(link.pk)

# @shared_task
# def send_data_to_cloud():
#

#
#
# @shared_task
# def add(x, y):
#     return x + y
#
#
# @shared_task
# def mul(x, y):
#     return x * y
#
#
# @shared_task
# def xsum(numbers):
#     return sum(numbers)
#
