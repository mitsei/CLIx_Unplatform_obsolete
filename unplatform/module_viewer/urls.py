from django.conf.urls import patterns, include, url

from . import views


urlpatterns = [
    url(r'^$', views.table_of_contents, name='table_of_contents'),

    ]