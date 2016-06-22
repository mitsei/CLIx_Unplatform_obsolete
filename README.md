unplatform
==========
A modularized quasi-LMS for use in unconnected learning environments.

unplatform is written in python3.4 and powered by django, tornado, and pyinstaller

Example content
-------------------

- Student entry point (/):    https://unplatform.herokuapp.com/
- FSP entry point (/school/):    https://unplatform.herokuapp.com/school/
- API (/api/):    https://unplatform.herokuapp.com/api/
- API documentation (/docs/): https://unplatform.herokuapp.com/docs/

Installation
-------------------

### Download (requires clixindia.org sign-in)

- Win32: https://docs.google.com/a/clixindia.org/uc?id=0BxQsxUG7EC3eV19CRFVWUEpvYlk&export=download
- OSX: https://docs.google.com/a/clixindia.org/uc?id=0BxQsxUG7EC3eaDU5Ni03X25YUkU&export=download
- Linux64: https://docs.google.com/a/clixindia.org/uc?id=0BxQsxUG7EC3eWVRsMmd4U1hoOTA&export=download

After download, unzip to the location of your choice. OS specific installation procedures can be found in /readme/
Once installed, navigate to /school/ and set the location specific identifiers.


API notes
-------------------
unplatform's API is build on django rest framework, which means each endpoint is self describing at each url.
When POSTing, the only header that currently must be set is content-type: application/json.

Currently the following models are implemented:

* UUID: /api/uuids/
UUIDs are the primary piece of data for tying together session data across all other models.
There is no need to post any data to this endpoint because when data is posted to the other endpoints,
a get_or_create action is performed on this table.

* Fingerprints: /api/fingerprints/
Fingerprints are automatically generated device environment data, including browser information, network information,
and screen resolution. unplatform captures and reports all of this data automatically, so there is also no need to
post data to this endpoint.

* AppData: /api/appdata/
AppData is where all tool and application data is reported. It accepts the follow data:

    session_id (required, get it from the browser session_uuid cookie)
    app_name (required, length < 32, name of the app)
    event_type (required, length < 32, name of the type of event)
    params (parameters of the event_type)

* Users: /api/users/
Users stores anonymous information about the users that initiate a session. This information is generated
automatically by unplatform so there is no need to post data to this endpoint.

* Configuration: /api/configuration/
Configuration stores global variables. This data is set by the FSP at /school/ upon installation and should
not have data POSTed to it.

### unplatform/common micro-api
JSON format directory listings of common subfolders can be obtained by point a url at them. For example,
a directory listing of /unplatform/common/some_tool/ can be retrieved at /modules/some_tool/ This allows you to
author tools which are dynamically aware of the filesystem.



* The last entry set on /school/ is the entry used for reporting school data
* session_uuid cookie /     -session timeout after 15 minutes of idle time
    -when the home button or finish buttons are clicked

   -configuration (for global variables like school codes)
    -users (for tracking user type on the landing page)


/modules/ folder
*Navigation has been reworked to reflect the desired subject/grade/unit/lesson structure, and all 3 subjects have sample data.
*A sample epub has been included under physics


navigation templates
* Navigation templates are available for translation

db.sqlite notes
* The file /unplatform/db.sqlite3 is available for use in any sqlite viewer


certs
* Dummy *.pem certs have been provided for SSL support.  They can be overwritten with new certs as long as their filename is the same.
* SSL support has been added so that browsers can access microphones/webcams


Developer notes:
* Navigation templates are available for styling & translation in the folder unplatform/curriculum/templates/unplatform

Please provide feedback to me bhanks@mit.edu Include what operating system & browser information when possible.


*Async worker can pass data along intermittent connections
