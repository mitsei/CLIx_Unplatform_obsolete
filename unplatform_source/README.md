unplatform
==========
A modularized quasi-LMS for use in unconnected learning environments.

unplatform is written in python3.4 and powered by django, tornado, and pyinstaller

Features
--------
unplatform provides a way to deliver web-like HTML5 content to the browser in a way that requires no software installation, 
no network infrastructure, and no particular OS. Additionally it provides an API so that education research data can be captured, 
even when users are not reliably identifiable. unplatform also tries to detect when network infrastructure is available
so that data can be automatically passed to researchers when possible.

Sample content
--------------

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

Session ID
----------
When a browser visits unplatform content, a session_uuid cookie is set if one does not exist. That cookie is available
until the browser is closed. session_uuid cookies regenerate on user inactivity timeouts and "finish" events.


API
---
unplatform's API is build on django rest framework, which means each endpoint is self describing at each url.
Additionally, automatically generated documentation and test utilities are available at the url /docs/
When POSTing, the only header that must be set is content-type: application/json.

Currently the following endpoints are implemented:

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

    ```session_id``` (required, get it from the browser session_uuid cookie)<br />
    ```app_name``` (required, length < 32, name of the app)<br />
    ```event_type``` (required, length < 32, name of the type of event)<br />
    ```params``` (parameters of the event_type)<br />

* Users: /api/users/
Users stores anonymous information about the users that initiate a session. This information is generated
automatically by unplatform so there is no need to post data to this endpoint.

* Configuration: /api/configuration/
Configuration stores global variables. This data is set by the FSP at /school/ upon installation and should
not have data POSTed to it.

* /unplatform/common/ folder micro-api
JSON format directory listings of common subfolders can be obtained by point a url at them. For example,
a directory listing of /unplatform/common/some_tool/ can be retrieved at /modules/some_tool/ This allows you to
author tools which are dynamically aware of the filesystem.


Database
-------------------
unplatform uses sqlite. The database file can be found at unplatform/db.sqlite3 and can be opened by any
compatible tool. Because sqlite does not support concurrency well, occasionally a database lock error may be returned
as error code 500.


SSL certificates
-------------------
unplatform provides dummy certificates to enable ssl so that the browser has access to the webcam & microphone. These
dummy certificates will cause browser issues regarding unrecognized certificate authority, but they can be safely and
permanantly dismissed.


File structure
--------------
All curriculum is stored in the unplatform/modules folder. Currently it uses a nested structure but is under review to
accommodate differing navigation based on subject. All curriculum is able to be traversed using unplatform's nagivation templates.

All common files and tools are stored in the unplatform/common folder and are served on the /modules/ url.

unplatform is provided with sample tools and curriculum populated throughout.

Navigation templates
-------------------
Navigation templates are available under /unplatform/curriculum/templates/curriculum/ They represent the navigational
structure of unplatform and can be safely edited for localization and styling.

Async worker
------------
unplatform has an asynchronous worker that tries to detect when internet is available. When this happens, it will automatically pass
data from the internal database to a remote repository. No action is needed by users or developers for this to be enabled.

Contact
-------------------
Please provide feedback to bhanks@mit.edu
