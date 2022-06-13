# E-Library
E-Library is a web-based digital library application management service designed to facilitate library data collection on a campus/university, school or other institution.

# Getting Started
~~~
$ mysql -u root

mysql> CREATE DATABASE elibrary;
~~~
Create your MySQL database and name it `elibrary`
~~~
$ mv .env.example .env
~~~
Rename the `.env.example` file to `.env`
~~~
$ npm install
~~~
Install all dependencies on this project.

~~~
$ npm run dev
~~~
Run the app in development mode. then open http://localhost:3000 in the browser.
