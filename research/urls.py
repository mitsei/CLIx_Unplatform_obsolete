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
    ]



# if settings.DEBUG:
# urlpatterns += [
#     url(r'^modules/(?P<path>.*)$', reststatic.serve),
# ]
