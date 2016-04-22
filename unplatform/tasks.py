# from __future__ import absolute_import
#
# from proj.celery import app
#
#
# @app.task
# def add(x, y):
#     return x + y
#
#
# @app.task
# def mul(x, y):
#     return x * y
#
#
# @app.task
# def xsum(numbers):
#     return sum(numbers)


# from research.models import Fingerprint
# import requests
#
# # @app.task
# @shared_task
# def update_link(pk):
#     link = Fingerprint.objects.get(pk=pk)
#     # ...
#     res = requests.get(link.url, timeout=2)

from __future__ import absolute_import

from celery import shared_task


@shared_task
def add(x, y):
    return x + y
