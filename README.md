# Sandbox Volunteer Checkin System
[![Build Status](https://travis-ci.org/Mottelz/sandbox-checkins.svg?branch=master)](https://travis-ci.org/Mottelz/sandbox-checkins)

This is in production, so I'm using this doc as a way to explain what does what for myself and others. 

This project created using [express-generator version 4.16](https://www.npmjs.com/package/express-generator). The project uses [Skeleton](http://getskeleton.com/) for styling and [HandlebarsJS](https://handlebarsjs.com/) for page templates.

## Project Structure
Going to do a version of MVC here: 
- Model: The files in the **model** folder are the only ones that should be accessing the database. 
- View: The files in the **routes** folder will handle the HTTP calls. The templates for the actual pages are located in the **views** folder. 
- Controller: The files in the **controller** folder will handle all the logic. This is the bit that connects the other parts. 

The **scripts** folder is where to store misc bits of code needed for this project. 
- *cardreader.py*: A simple script written in Python3 that reads in the input from the card reader. 
- *database_init.sql*: SQLite3 script that sets up the database. 

I have also setup automated testing using Mocha + Chai and TravisCI. Mocha and Chai are the unit testing packages and TravisCI automatically tests every new version uploaded to Master. It's the reason for that pretty badge at the top of this doc.

## Technical Details
All time is stored using the Unix ms timestamp and based on the utc timezone. If you're every using a format string to tell MomentJS the format use a lowercase x for this timestamp. 


## Glossary
*Checkin:* This refers to when a volunteer swipes their card to checkin. 