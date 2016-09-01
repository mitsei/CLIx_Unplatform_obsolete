from django.conf.urls import patterns, include, url

from . import views

# from django.conf.urls import handler404
from django.contrib.staticfiles import views as reststatic


urlpatterns = [
    url(r'^$', views.start),
    url(r'^modules/(?P<path>.*)$', views.serve_module),
    url(r'^school/$', views.select_school),
    url(r'^subject/$', views.select_subject),
    url(r'^oea/$', views.oea),
    url(r'^(?P<subject>[-\s\w]+)/$', views.select_grade),
    url(r'^(?P<subject>[-\s\w]+)/(?P<grade>[-\s\w]+)/$', views.select_unit),
    url(r'^(?P<subject>[-\s\w]+)/(?P<grade>[-\s\w]+)/(?P<unit>[-\s\w]+)/$', views.select_lesson),
    url(r'^(?P<subject>[-\s\w]+)/(?P<grade>[-\s\w]+)/(?P<unit>[-\s\w]+)/(?P<lesson>[-\s\w]+)/$', views.show_activities),
    url(r'^(?P<subject>[-\s\w]+)/(?P<grade>[-\s\w]+)/(?P<unit>[-\s\w]+)/Tools/(?P<tool>[-\s\w]+)/$', views.show_tool),
    ]

