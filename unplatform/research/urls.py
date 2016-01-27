from django.conf.urls import patterns, include, url
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'fingerprints', views.FingerprintViewSet)


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^$', views.index, name='index'),
    url(r'^comprehension/$', views.comprehension, name='comprehension'),
    url(r'^video/$', views.video, name='video'),
    url(r'^slideshow/$', views.slideshow, name='slideshow')
    ]