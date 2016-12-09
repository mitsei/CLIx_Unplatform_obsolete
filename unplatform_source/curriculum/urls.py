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
    url(r'^Tools/$', views.select_tool),
    url(r'^Tools/(?P<tool>((?!/).)*)/$', views.show_tool),
    url(r'^(?P<subject>((?!/).)*)/$', views.select_grade),
    url(r'^(?P<subject>((?!/).)*)/(?P<grade>((?!/).)*)/$', views.select_unit),
    url(r'^(?P<subject>((?!/).)*)/(?P<grade>((?!/).)*)/(?P<unit>((?!/).)*)/$', views.select_lesson),
    url(r'^(?P<subject>((?!/).)*)/(?P<grade>((?!/).)*)/(?P<unit>((?!/).)*)/(?P<lesson>((?!/).)*)/$', views.show_activities),

    ]
