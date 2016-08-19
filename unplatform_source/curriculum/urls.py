from django.conf.urls import patterns, include, url

from . import views

# from django.conf.urls import handler404
from django.contrib.staticfiles import views as reststatic


urlpatterns = [
    url(r'^$', views.start),
    url(r'^modules/(?P<path>.*)$', views.serve_module),
    url(r'^school/$', views.select_school),
    url(r'^epubs/$', views.select_epub),
    url(r'^subject/$', views.select_subject),
    url(r'^(?P<subject>[-\w]+)/$', views.select_grade),
    url(r'^(?P<subject>[-\w]+)/(?P<grade>[-\w]+)/$', views.select_unit),
    url(r'^(?P<subject>[-\w]+)/(?P<grade>[-\w]+)/(?P<unit>[-\w]+)/$', views.select_lesson),
    url(r'^(?P<subject>[-\w]+)/(?P<grade>[-\w]+)/(?P<unit>[-\w]+)/(?P<lesson>[-\w]+)/$', views.show_activities),
    ]
