# Project using nodejs/MongoDB : user CRUD with authentification using passport
    A web app for the management of:
    * books.pdf file : upload, download, delete books
    * users: authentifcation, view, edit, delete
   


## User Permissions

### Normal User

A Normal user can

* register himself on the app
* View books

### Subscriber
 A subscriber can 
* register himself on the app
* search for books and view availabilty
* download books

### Admin

An admin can

* view and edit his profile
* Create, Update, and Delete Categories
* view, Edit or Delete existing books
* upload new books
* search for books and view availability
* view all stats of the library
* view, Edit or Delete users




## Installing
Once you have cloned or downloaded this repo you need to make sure you have Mongo DB installed then

run the following command to bring all npm packages required for this project

`npm install` 

## Execute the backend

You  can execute the backend with  this command : `nodemon`
You  can execute the frontend with  this command : `npm start`

## Tech Stack Used

### The MERN Stack
 ExpressJS, NodeMailer, Multer, EJS, nodemon, passport, JWT, Mongoose, MongoDB
 React Js, react-data-table-component, react-modal, react-router-dom, react-toastify
 axios, bootstrap, formik, Yup