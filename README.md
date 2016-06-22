unplatform
==========
A modularized quasi-LMS for use in unconnected learning environments.

unplatform is written in python3.4 and powered by django, tornado, and pyinstaller

Example content:

    Student entry point (/):    https://unplatform.herokuapp.com/
    FSP entry point (/school/):    https://unplatform.herokuapp.com/school/
    API (/api/):    https://unplatform.herokuapp.com/api/
    API documentation (/docs/): https://unplatform.herokuapp.com/docs/

### Installation

Download (requires clixindia.org sign-in):

    Win32: https://docs.google.com/a/clixindia.org/uc?id=0BxQsxUG7EC3eV19CRFVWUEpvYlk&export=download
    OSX: https://docs.google.com/a/clixindia.org/uc?id=0BxQsxUG7EC3eaDU5Ni03X25YUkU&export=download
    Linux64: https://docs.google.com/a/clixindia.org/uc?id=0BxQsxUG7EC3eWVRsMmd4U1hoOTA&export=download

After download, unzip to the location of your choice. OS specific installation procedures can be found in /readme/

Once installed, navigate to /school/ and set the location specific identifiers.


### API notes
* The last entry set on /school/ is the entry used for reporting school data
* session_uuid cookie /     -session timeout after 15 minutes of idle time
    -when the home button or finish buttons are clicked

   -configuration (for global variables like school codes)
    -users (for tracking user type on the landing page)

/common/ api
* All common files belong in the folder /unplatform/common/ and have a filesystem API if you point your browser at a directory in /modules/*commonfolder*/ (ex: https://localhost:8888/


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
