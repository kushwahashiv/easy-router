Projects server
============
Organization employee-manager-projects server. This uses a simple router from scratch for node.js performance junkies :)
Note that this router is not as flexible as other routers, it is mostly useful for building simple APIs that don't depend on complex middleware schemes.

Pre-requisites
----------------
1. Node and MongoDB should be installed on the machine
2. MongoDb service should be running so that when you start the server it can seed the database.

***Information:*** Please refer to populateDB function in files **/projects/controllers/employeeprovider.js** and **/projects/controllers/projectprovider.js** to see the seed data of employees and projects


How to run the program
----------------------
1. Open cmd prompt and change directory to 'projects' folder
2. Run command 'npm start' or 'node server.js' to launch the server 
3. Open browser and type url http://localhost:2048/employees
4. you will be able to see the list of employees in json format
5. you can run other RESTful APIs using postmon or other tools

How to run nodeunit test cases
--------------------------------
1. Open cmd prompt and CD to 'projects' folder
2. Run command 'npm test' or 'node node_modules/nodeunit/bin/nodeunit test' from command prompt to launch test run


Features
-----------------------
* Employee be assigned to multiple Projects.
* A Project can be done by multiple Employees.
* Each Project have a Manager
* A Manager can have one or more employees under him


* **Hashtable based** routing
* **RegExp** for parameter testing
* **404**, set custom not found handler

Testcases coverage
-------------------------
1. Router test cases using nodeunit
2. Manual test cases from browser using 'node manualtest/server.js'


Open issues
------------
* ProjectProvider and EmployeeProvider controllers test case has not been covered 

Conclusion
-----------
