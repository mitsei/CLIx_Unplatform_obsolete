from django.conf.urls import patterns, include, url

from . import views

# from django.conf.urls import handler404
from django.contrib.staticfiles import views as reststatic


urlpatterns = [
    url(r'^$', views.start),
    url(r'^tableofcontents/$', views.table_of_contents, name='table_of_contents'),
    url(r'^modules/(?P<path>.*)$', views.serve_module),
    url(r'^school/$', views.select_school),
    ]

# handler404 = views.list_files
### urlpatterns += [##     url(r'^modules/(?P<path>.*)$', reststatic.serve),## ]
