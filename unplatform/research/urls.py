from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^comprehension/$', views.comprehension, name='comprehension'),
    url(r'^video/$', views.video, name='video')
    ]