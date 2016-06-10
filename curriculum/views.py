from django.shortcuts import loader
from django.http import HttpResponse
from unplatform.settings import MODULES_FOLDER, BASE_DIR

import os
import posixpath
from django.contrib.staticfiles import finders
from django.http import Http404
from django.utils.six.moves.urllib.parse import unquote
from django.views import static
import json


def start(request):
    template = loader.get_template('curriculum/start.html')
    return HttpResponse(template.render())

def table_of_contents(request):
    modules = os.listdir(MODULES_FOLDER)
    modules = sorted(modules)
    template = loader.get_template('curriculum/index.html')
    return HttpResponse(template.render({'modules':modules}))

def select_school(request):
    template = loader.get_template('curriculum/school.html')
    return HttpResponse(template.render())






# Modified version of django.contrib.staticfiles.views which returns a directory listing as json
def serve_module(request, path, insecure=False, **kwargs):
    file_path =  os.path.join(BASE_DIR, 'common/', path)
    valid_path = os.path.isdir(file_path) and path != ''
    if valid_path:
        files = []
        dirs = []
        for f in os.listdir(file_path):
            if os.path.isfile(os.path.join(file_path, f)):
                files.append(f)
            elif os.path.isdir(os.path.join(file_path, f)):
                dirs.append(f)
        files = sorted(files)
        dirs = sorted(dirs)
        files = json.dumps({'dirs': dirs, 'files': files})

    normalized_path = posixpath.normpath(unquote(path)).lstrip('/')
    absolute_path = finders.find(normalized_path)
    if not absolute_path:
        if path.endswith('/') or path == '':
            raise Http404("Directory indexes are not allowed here.")
        raise Http404("'%s' could not be found" % path)
    document_root, path = os.path.split(absolute_path)
    if valid_path:
        return HttpResponse(files)
    else:
        return static.serve(request, path, document_root=document_root, **kwargs)
