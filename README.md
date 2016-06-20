unplatform
==========
A modularized quasi-LMS for use in unconnected learning environments.

Download (requires clixindia.org sign-in):
Win32: https://docs.google.com/a/clixindia.org/uc?id=0BxQsxUG7EC3eV19CRFVWUEpvYlk&export=download
OSX: https://docs.google.com/a/clixindia.org/uc?id=0BxQsxUG7EC3eaDU5Ni03X25YUkU&export=download
Linux64: https://docs.google.com/a/clixindia.org/uc?id=0BxQsxUG7EC3eWVRsMmd4U1hoOTA&export=download

Example cloud hosted content:
    Student entry point (/):    https://unplatform.herokuapp.com/
    FSP entry point (/school/):    https://unplatform.herokuapp.com/school/
    API (/api):    https://unplatform.herokuapp.com/api/

Changes:
*Navigation has been reworked to reflect the desired subject/grade/unit/lesson structure, and all 3 subjects have sample data.
* Navigation templates are available for translation
*A sample epub has been included under physics
*A home button (return to root) & finish button (reset UUID) have been added
*Unplatform data collection has been greatly expanded. Included are:
    -idle time over 1 minute
    -session timeout after 15 minutes of idle time
    -when window is brought in&out of focus
    -when links are clicked
    -user type and when relevant, user count
    -when the home button or finish buttons are clicked
*FSPs can now set school & terminal ID codes at /school/
*API has been expanded. Included are:
    -configuration (for global variables like school codes)
    -users (for tracking user type on the landing page)
*Async worker can pass data along intermittent connections
* SSL support has been added so that browsers can access microphones/webcams

Developer notes:
* Navigation templates are available for styling & translation in the folder unplatform/curriculum/templates/unplatform
* The API has been expanded (see the url /api/)
* All common files belong in the folder /unplatform/common/ and have a filesystem API if you point your browser at a directory in /modules/*commonfolder*/ (ex: https://localhost:8888/
* The last entry set on /school/ is the entry used for reporting school data
* The file /unplatform/db.sqlite3 is available for use in any sqlite viewer
* Dummy *.pem certs have been provided for SSL support. This prompts a warning the first time a browser visits unplatform. They can be overwritten with new certs as long as their filename is the same.

Please provide feedback to me bhanks@mit.edu Include what operating system & browser information when possible. Thanks again as always!
