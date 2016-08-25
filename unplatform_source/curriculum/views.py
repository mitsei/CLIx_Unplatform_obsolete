from django.shortcuts import loader
from django.http import HttpResponse
from unplatform.settings import MODULES_FOLDER, BASE_DIR, UNPLATFORM_VERSION

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

def select_school(request):
    template = loader.get_template('curriculum/school.html')
    return HttpResponse(template.render())


def select_subject(request):
    template = loader.get_template('curriculum/subject.html')
    return HttpResponse(template.render())

def select_grade(request, subject):
    template = loader.get_template('curriculum/grade.html')
    return HttpResponse(template.render())

def select_unit(request, subject, grade):
    unit_location = os.path.join(MODULES_FOLDER, subject, grade)
    units = os.listdir(unit_location)
    units = sorted(units)
    template = loader.get_template('curriculum/unit.html')
    return HttpResponse(template.render({'units':units, 'subject':subject, 'grade':grade, 'version':UNPLATFORM_VERSION}))

def select_lesson(request, subject, grade, unit):
    lesson_location = os.path.join(MODULES_FOLDER, subject, grade, unit)
    lessons = os.listdir(lesson_location)
    lessons = sorted(lessons)
    template = loader.get_template('curriculum/lesson.html')
    return HttpResponse(template.render({'lessons':lessons, 'version':UNPLATFORM_VERSION}))

def show_activities(request, subject, grade, unit, lesson):
    activity_location = os.path.join(MODULES_FOLDER, subject, grade, unit, lesson)
    epub_location = os.path.join(MODULES_FOLDER, subject, grade, unit, lesson)
    epubs = os.listdir(epub_location)
    epubs = sorted(epubs)
    activities = os.listdir(activity_location)
    activities = sorted(activities)
    contentName = request.GET.get('contentName') # not sure if this will be needed
    if contentName is not None:
        template = loader.get_template('curriculum/activity.html')
    else:
        template = loader.get_template('curriculum/tools.html')
    return HttpResponse(template.render({'subject':subject, 'grade':grade, 'unit':unit, 'lesson':lesson, 'activities':activities, 'epubs':epubs, 'contentName': contentName, 'version':UNPLATFORM_VERSION}))


def oea(request):
    template = loader.get_template('curriculum/oea.html')
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
