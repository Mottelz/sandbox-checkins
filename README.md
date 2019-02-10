# Sandbox Volunteer Checkin System
[![Build Status](https://travis-ci.org/Mottelz/sandbox-checkins.svg?branch=master)](https://travis-ci.org/Mottelz/sandbox-checkins)

This is in production, so I'm using this doc as a way to explain what does what for myself and others. 

This project created using [express-generator version 4.16](https://www.npmjs.com/package/express-generator). 

Going to do a version of MVC here: 
- Model: The files in the **model** folder are the only ones that should be accessing the database. 
- View: The files in the **routes** folder will handle the HTTP calls. The templates for the actual pages are located in the **views** folder. 

The **scripts** folder is where to store misc bits of code needed for this project. 
- *cardreader.py*: A simple script written in Python3 that reads in the input from the card reader. 
- *database_init.sql*: SQLite3 script that sets up the database. 

I have also setup automated testing using Mocha + Chai and TravisCI. Mocha and Chai are the unit testing packages and TravisCI automatically tests every new version uploaded to Master. It's the reason for that pretty badge at the top of this doc.