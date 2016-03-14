from django.shortcuts import loader
from django.http import HttpResponse
import os
from unplatform.settings import MODULES_FOLDER

# Create your views here.

def table_of_contents(request):
    modules = os.listdir(MODULES_FOLDER)
    modules = sorted(modules)
    # module_dictionary = dict(zip(modules, modules))
    # for x in module_dictionary:
    #     print (x, ":", module_dictionary[x])

    template = loader.get_template('curriculum/index.html')
    return HttpResponse(template.render({'modules':modules}))