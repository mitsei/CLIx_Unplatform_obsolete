"""unplatform URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/tresearch.views.index, name='index', opics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

# this part is for development environment only
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # url(r'^admin/', include(admin.site.urls)),
    # url(r'^$research/', include('unplatform.research.urls')),
    url(r'^', include('research.urls')),
    #     url(r'^$', include('unplatform.research.urls')), ??????
    url(r'^', include('curriculum.urls')),

]

# this part is for dev only

# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
