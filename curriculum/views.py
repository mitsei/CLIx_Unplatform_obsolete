from django.shortcuts import loader
from django.http import HttpResponse
import os
from unplatform.settings import MODULES_FOLDER, BASE_DIR

# Create your views here.

def table_of_contents(request):
    modules = os.listdir(MODULES_FOLDER)
    modules = sorted(modules)
    # module_dictionary = dict(zip(modules, modules))
    # for x in module_dictionary:
    #     print (x, ":", module_dictionary[x])

    template = loader.get_template('curriculum/index.html')
    return HttpResponse(template.render({'modules':modules}))


# def list_files(request):
#
#
#     return HttpResponse(request)


import os
import posixpath

from django.conf import settings
from django.contrib.staticfiles import finders
from django.http import Http404
from django.utils.six.moves.urllib.parse import unquote
from django.views import static
import json

# Modified version of django.contrib.staticfiles.views which returns a directory listing as json
def serve_module(request, path, insecure=False, **kwargs):

    file_path =  os.path.join(BASE_DIR, 'common/', path)
    valid_path = os.path.isdir(file_path) and path != ''
    if valid_path:
        file_list = os.listdir(file_path)
        # file_string = ', '.join(map(str, file_list))
        # files = '{"files":[' + file_string + ']}'
        files = json.dumps({'files': file_list})

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