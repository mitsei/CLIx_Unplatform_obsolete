from django.conf.urls import patterns, include, url
from rest_framework import routers
from django.conf import settings
# from django.contrib.staticfiles import views as reststatic
from . import views

router = routers.DefaultRouter()
router.register(r'uuids', views.UUIDViewSet)
router.register(r'fingerprints', views.FingerprintViewSet)
router.register(r'appdata', views.AppDataViewSet)
router.register(r'configuration', views.ConfigurationViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    # url(r'^$', views.index, name='index'),
    # url(r'^comprehension/$', views.comprehension, name='comprehension'),
    # url(r'^video/$', views.video, name='video'),
    # url(r'^slideshow/$', views.slideshow, name='slideshow')
    ]



# if settings.DEBUG:
# urlpatterns += [
#     url(r'^modules/(?P<path>.*)$', reststatic.serve),
# ]
