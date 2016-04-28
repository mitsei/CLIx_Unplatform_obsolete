from __future__ import absolute_import

from celery import shared_task


from research.models import Fingerprint
from django.core import serializers
import json, requests

@shared_task
def send_data_to_cloud():
    to_be_sent = Fingerprint.objects.exclude(is_sent=True)
    serialized = json.loads(serializers.serialize('json', to_be_sent))
    for index, obj in enumerate(serialized):
        r=requests.post('http://unplatform.herokuapp.com/api/fingerprints/', json=obj['fields'])
        if r.status_code==201:
            to_be_sent[index].is_sent=True
            to_be_sent[index].save()
            print("pk=" + str(to_be_sent[index].pk) + " succcessfully sent")



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
