from django.shortcuts import loader
from django.http import HttpResponse
import os
from unplatform.settings import MODULES_DIR

# Create your views here.

def table_of_contents(request):
    modules = os.listdir(MODULES_DIR)
    # module_dictionary = dict(zip(modules, modules))
    # for x in module_dictionary:
    #     print (x, ":", module_dictionary[x])

    template = loader.get_template('module_viewer/index.html')
    return HttpResponse(template.render({'modules':modules, 'testvar':[1,2,3,4]}))