# Sandbox Check-Ins
[![Build Status](https://travis-ci.org/Mottelz/sandbox-checkins.svg?branch=master)](https://travis-ci.org/Mottelz/sandbox-checkins)

###### This is a simple system to keep trakc of volunteer hours.

## The Answers WTF.
This is in production, so I'm using this doc as a way to explain what does what for myself and others. 

This project created using [express-generator version 4.16](https://www.npmjs.com/package/express-generator). 

Going to do a version of MVC here: 
- Model: The files in the **model** folder are the only ones that should be accessing the database. 
- View: The files in the **routes** folder will handle the HTTP calls. The templates for the actual pages are located in the **views** folder. 
- Controller: The files in the **controller** folder will handle all the logic. This is the bit that connects the other parts. 
