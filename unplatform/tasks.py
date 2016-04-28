# from __future__ import absolute_import
#
# from proj.celery import app
#
#

#
#
# @app.task
#
# from __future__ import absolute_import
#
# from celery import shared_task
# from research.models import Fingerprint
# from django.core import serializers
# import json, requests
#
# @shared_task
# def send_data_to_cloud():
#     print('sending data')
#     to_be_sent = Fingerprint.objects.exclude(is_sent=True)
#     serialized = json.loads(serializers.serialize('json', to_be_sent))
#     for index, obj in enumerate(serialized):
#         r=requests.post('http://unplatform.herokuapp.com/api/fingerprints/', json=obj['fields'])
#         if r.status_code==201:
#             to_be_sent[index].is_sent=True
#             to_be_sent[index].save()
#             print("pk=" + to_be_sent[index].pk + " has been sent succcessfully")
#     return 'send_complete'
#
# @shared_task
# def add(x, y):
#     return x + y