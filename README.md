# unplatform
==========

This version is obsolete. 

Please see the current version of Unplatform at:

https://github.com/CLIxIndia-Dev/unplatform_v2

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
which require no environment configuration. After cloning, install all necessary python packages via

```pip install -r unplatform_source/requirements.txt```

Next, run the relevant /build scripts/ shell script to turn the unplatform source into an executable. unplatform serves
content via static content methods, so to ensure that content is included you must copy all of the folders in the unplatform_source
folder to the distributable folder. Additionally a launcher and ssl certificates must be included as well.

Typical releases are structured like this:

top level folder + launcher / unplatform executable + async worker executable + unplatform folders + certificates

NOTE: the Windows build script assumes that you have the zip package and Git / Git Bash installed.
You can find them here:

zip: http://gnuwin32.sourceforge.net/packages/zip.htm
git bash: https://git-scm.com/download/win

NOTE:
For Linux builds, you may run into this PyInstaller issue:

github.com/pyinstaller/pyinstaller/issues/1539

To solve, I just "touched" the empty, missing file.

For Ubuntu builds, if you get a SyntaxError about missing parentheses
when trying `from wsgiref import simple_server`, the Python3 version of
`wsgiref` may not be in your `PYTHONPATH` -- make sure that it is not including the
Python 2 version by default.
