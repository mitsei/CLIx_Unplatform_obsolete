from django.shortcuts import loader
from django.http import HttpResponse, HttpResponseRedirect
from django.core.servers.basehttp import FileWrapper
from unplatform.settings import MODULES_FOLDER, BASE_DIR, UNPLATFORM_VERSION, MEDIA_URL,\
    STATIC_URL

import os
import posixpath
from django.contrib.staticfiles import finders
from django.http import Http404
from django.utils.six.moves.urllib.parse import unquote
from django.views import static
import json
import requests
from natsort import natsorted

def start(request):
    template = loader.get_template('curriculum/start.html')
    return HttpResponse(template.render())

def select_school(request):
    template = loader.get_template('curriculum/school.html')
    return HttpResponse(template.render())


def select_subject(request):
    subject_location = os.path.join(MODULES_FOLDER)
    subjects = os.listdir(subject_location)
    subjects = sorted(subjects)
    template = loader.get_template('curriculum/subject.html')
    return HttpResponse(template.render({'subjects':subjects, 'version':UNPLATFORM_VERSION}))

def select_grade(request, subject):
    grade_location = os.path.join(MODULES_FOLDER, subject)
    grades = os.listdir(grade_location)
    grades = sorted(grades)
    template = loader.get_template('curriculum/grade.html')
    return HttpResponse(template.render({'grades':grades, 'version':UNPLATFORM_VERSION}))

def select_unit(request, subject, grade):
    unit_location = os.path.join(MODULES_FOLDER, subject, grade)
    units = os.listdir(unit_location)
    units = sorted(units)
    template = loader.get_template('curriculum/unit.html')
    return HttpResponse(template.render({'units':units, 'subject':subject, 'grade':grade, 'version':UNPLATFORM_VERSION}))

def select_lesson(request, subject, grade, unit):
    lesson_location = os.path.join(MODULES_FOLDER, subject, grade, unit)
    lessons = os.listdir(lesson_location)
    lessons = natsorted(lessons)
    template = loader.get_template('curriculum/lesson.html')
    return HttpResponse(template.render({'grade': grade, 'subject': subject, 'lessons':lessons, 'version':UNPLATFORM_VERSION}))

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
    return HttpResponse(template.render({'subject':subject,
                                         'grade':grade,
                                         'unit':unit,
                                         'lesson':lesson,
                                         'activities':activities,
                                         'epubs':epubs,
                                         'contentName': contentName,
                                         'version':UNPLATFORM_VERSION,
                                         'MEDIA_URL': MEDIA_URL}))


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
    #document_root, path = os.path.split(absolute_path)
    if valid_path:
        return HttpResponse(files)
    else:
        # redirect to Tornado for static files / media inside of the epubs
        # use STATIC_URL because previously /modules/ pointed to the
        # common directory, which is now STATIC_URL
        return HttpResponseRedirect('{0}{1}'.format(STATIC_URL, path))

def select_tool(request):
    tool_location = os.path.join(MODULES_FOLDER, "Tools")
    tools = os.listdir(tool_location)
    tools = sorted(tools)
    template = loader.get_template('curriculum/tools.html')
    return HttpResponse(template.render({'tools':tools,
                                         'version':UNPLATFORM_VERSION,
                                         'MEDIA_URL': MEDIA_URL}))

def show_tool(request, tool):
    template = loader.get_template('curriculum/tool.html')
    return HttpResponse(template.render({'tool': tool,
                                         'version':UNPLATFORM_VERSION,
                                         'MEDIA_URL': MEDIA_URL}))
