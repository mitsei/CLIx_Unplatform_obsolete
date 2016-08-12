from django.conf.urls import patterns, include, url
from rest_framework import routers
from django.conf import settings
from . import views

router = routers.DefaultRouter()
router.register(r'uuids', views.UUIDViewSet)
router.register(r'fingerprints', views.FingerprintViewSet)
router.register(r'appdata', views.AppDataViewSet)
router.register(r'configuration', views.ConfigurationViewSet)
router.register(r'users', views.UserViewSet)


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^docs/', include('rest_framework_swagger.urls')),
    ]

