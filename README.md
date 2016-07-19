# unplatform
==========
A modularized quasi-LMS for use in unconnected learning environments.

unplatform is written in python3.4 and powered by django, tornado, and pyinstaller

Features
--------
unplatform provides a way to deliver web-like HTML5 content to the browser in a way that requires no software installation, 
no network infrastructure, and no particular OS. Additionally it provides an API so that education research data can be captured, 
even when users are not reliably identifiable. unplatform also tries to detect when network infrastructure is available
so that data can be automatically passed to researchers when possible.

How to build
-------------
unplatform is pure python, and has no external dependancies. This allows it to be built into executable distributables 
which require no environment configuration. After cloning, install all neccesary python packages via 

```pip install -r unplatform_source/requirements.txt```

Next, run the relevant /build scripts/ shell script to turn the unplatform source into an executable. unplatform serves
content via static content methods, so to ensure that content is included you must copy all of the folders in the unplatform_source
folder to the distributable folder. Additionally a launcher and ssl certificates must be included as well.

Typical releases are structured like this:

top level folder + launcher / unplatform executable + async worker executable + unplatform folders + certificates
