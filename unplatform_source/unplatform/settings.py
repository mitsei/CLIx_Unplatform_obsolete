"""
Django settings for unplatform project.

Generated by 'django-admin startproject' using Django 1.8.6.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.8/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
import sys
import random
import string

def rand_generator(size=24, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for x in range(size))

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.8/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = rand_generator()

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'research',
    'curriculum',
    'rest_framework',
    'corsheaders',
    'kombu.transport.django',
    'rest_framework_swagger'
)

MIDDLEWARE_CLASSES = (
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.locale.LocaleMiddleware'
)

CORS_ORIGIN_ALLOW_ALL = True
CORS_URLS_REGEX = r'^/api/.*$'

ROOT_URLCONF = 'unplatform.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake',
    }
}

WSGI_APPLICATION = 'unplatform.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        # for sqlite write lock timeout
        'OPTIONS': {
            'timeout': 30,
        }
    }
}

# # PAAS settings -------------------------------------------------
#
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
#         'NAME': 'unplatform',                      # Or path to database file if using sqlite3.
#         # The following settings are not used with sqlite3:
#         'USER': '',
#         'PASSWORD': '',
#         'HOST': '',                      # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
#         'PORT': '',                      # Set to empty string for default.
#     }
# }
#
# # Parse database configuration from $DATABASE_URL
# import dj_database_url
# dbconfig = dj_database_url.config()
# if dbconfig:
#     DATABASES['default'] =  dbconfig
#
# # Honor the 'X-Forwarded-Proto' header for request.is_secure()
# SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
# SECURE_SSL_REDIRECT=True

# # END --------------------------------------------






# # # Redis setup for async tasks ----------------
# from redislite import Redis
#
# # Create a Redis instance using redislite
# RDB_PATH = os.path.join('/tmp/my_redis.db')
# rdb = Redis(RDB_PATH)
# REDIS_SOCKET_PATH = 'redis+socket://%s' % (rdb.socket_file, )
#
# # Use redislite for the Celery broker
# BROKER_URL = REDIS_SOCKET_PATH
#
# # Use redislite for the Celery result backend
# CELERY_RESULT_BACKEND = REDIS_SOCKET_PATH
# # # END -------------------------------------------


# # Django backend setup for async tasks since redis doesn't support Windows ----------------
BROKER_URL = 'django://'

# # End ---------------------------------------------------

if DEBUG:
    CELERY_REDIRECT_STDOUTS = True
    CELERY_REDIRECT_STDOUTS_LEVEL = 'DEBUG'

# This part adds an asynchronous job on an interval
# Execute it with celery -A unplatform worker -B --loglevel=info

from datetime import timedelta
import unplatform.tasks

CELERY_ACCEPT_CONTENT = ['pickle']

CELERYBEAT_SCHEDULE = {
    'post-every-30-seconds': {
        'task': 'research.tasks.send_data_to_cloud',
        'schedule': timedelta(seconds=15),
        'args': ()
    },
}

CELERY_TIMEZONE = 'UTC'

# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

LOCALE_PATHS = (
    os.path.join(BASE_DIR,'locale'),
)

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/

STATIC_URL = '/modules/'
MEDIA_URL = '/media/'
STATIC_ROOT = 'unused'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'modules'),
    os.path.join(BASE_DIR, 'research/templates'),
    os.path.join(BASE_DIR, 'common'),
)

STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
)

MODULES_FOLDER = os.path.join(BASE_DIR,'modules/')

# Logging
# https://docs.djangoproject.com/en/1.8/topics/logging/
LOG_FILE = os.path.join(BASE_DIR,'debug.log')
LOGGING = {
    'version': 1, # Note this is the logger version, not unplatform version
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'WARNING',
            'class': 'logging.FileHandler',
            'filename': LOG_FILE,
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'WARNING',
            'propagate': True,
        },
    },
}

QBANK_LOGGING_ENDPOINT = 'https://localhost:8080/api/v1/logging/logs'

UNPLATFORM_VERSION = '0.7.1'
