from waitress import serve
from unplatform.wsgi import application


# from django.template.loaders.filesystem import Loader
# from django.template.loaders.app_directories import Loader
#
# import django.template.defaulttags
# import django.template.defaultfilters
# import django.template.loader_tags
#
#
# import logging
# logger = logging.getLogger('waitress')
# logger.setLevel(logging.INFO)

serve(application)
# serve(application, host='0.0.0.0', port=8080, url_scheme='https')