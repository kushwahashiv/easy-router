var http = require('http');
var router = require('./router/index');
//Create instance of various providers
var EmployeeProvider = require('./controllers/employeeprovider').EmployeeProvider;
var ProjectProvider = require('./controllers/projectprovider').ProjectProvider;
var employeeProvider = new EmployeeProvider();
var projectProvider = new ProjectProvider();

var port = 2048;

//create server
var server = http.createServer(router);
server.listen(port, function() {
    console.log('Server is listening on port ' + port);
    console.log('__dirname = ' + __dirname  + '\nprocess.cwd = ' + process.cwd());
    console.log('Browse RESTful APIs of projects from URL. ex. http://localhost:2048/employees ');
});

//APIs
//------------------------------------------------

//get list of employees
router.get('/employees', function (req, res) {
    employeeProvider.findAll(function (error, emps) {
        if (error) {
            res.writeHead(500, JSON.stringify({
                message: error.message
            }));
            return res.end();
        }
        if (emps) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(JSON.stringify({
                employees: emps
            }));
            res.end();
        }
    });
});

//update an employee
router.get('/employee/:id/edit', function (req, res) {
    employeeProvider.findById(req.params['id'], function (error, employee) {
        if (error) {
            res.writeHead(500, JSON.stringify({
                message: error.message
            }));
            return res.end();
        }
        if (employee) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(JSON.stringify({
                title: employee.title,
                employee: employee
            }));
            res.end();
        }
    });
});

//save updated employee
router.post('/employee/:id/edit', function (req, res) {
    employeeProvider.update(req.params['id'], {
        title: req.params['title'],
        name: req.params['name']
    }, function (error, docs) {
        if (error) {
            res.writeHead(500, JSON.stringify({
                message: error.message
            }));
            return res.end();
        }
        if (docs) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(JSON.stringify({
                employee: docs
            }));
            res.end();
        }
    });
});

//delete an employee
router.post('/employee/:id/delete', function (req, res) {
    employeeProvider.delete(req.params['id'], function (error, docs) {
        if (error) {
            res.writeHead(500, JSON.stringify({
                message: error.message
            }));
            return res.end();
        }
        if (docs) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(JSON.stringify({
                employee: docs
            }));
            res.end();
        }
    });
});

//save new employee
router.post('/employee/new', function (req, res) {
    employeeProvider.save({
        title: req.params['title'],
        name: req.params['name']
    }, function (error, docs) {
        if (error) {
            res.writeHead(500, JSON.stringify({
                message: error.message
            }));
            return res.end();
        }
        if (docs) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(JSON.stringify({
                employee: docs
            }));
            res.end();
        }
    });
});

//update an employee
router.get('/employee/:id/edit', function (req, res) {
    employeeProvider.findById(req.params['id'], function (error, employee) {
        if (error) {
            res.writeHead(500, JSON.stringify({
                message: error.message
            }));
            return res.end();
        }
        if (employee) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(JSON.stringify({
                title: employee.title,
                employee: employee
            }));
            res.end();
        }
    });
});

//get list of projects
router.get('/projects', function (req, res) {
    projectProvider.findAll(function (error, proj) {
        if (error) {
            res.writeHead(500, JSON.stringify({
                message: error.message
            }));
            return res.end();
        }

        if (proj) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(JSON.stringify({
                projects: proj
            }));
            res.end();
        }
    });
});

//save updated project
router.post('/project/:id/edit', function (req, res) {
    projectProvider.update(req.params['id'], {
        title: req.params['title'],
        managerId: req.params['managerId'],
        employees: req.params['employees'] //updated employees list
    }, function (error, docs) {
        if (error) {
            res.writeHead(500, JSON.stringify({
                message: error.message
            }));
            return res.end();
        }
        if (docs) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(JSON.stringify({
                project: docs
            }));
            res.end();
        }
    });
});


//delete an project
router.post('/project/:id/delete', function (req, res) {
    projectProvider.delete(req.params['id'], function (error, docs) {
        if (error) {
            res.writeHead(500, JSON.stringify({
                message: error.message
            }));
            return res.end();
        }
        if (docs) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(JSON.stringify({
                project: docs
            }));
            res.end();
        }
    });
});


//save new project
router.post('/project/new', function (req, res) {
    projectProvider.save({
        title: req.params['title'],
        managerId: req.params['managerId'],
        employees: req.params['employees'] //updated employees list
    }, function (error, docs) {
        if (error) {
            res.writeHead(500, JSON.stringify({
                message: error.message
            }));
            return res.end();
        }
        if (docs) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(JSON.stringify({
                project: docs
            }));
            res.end();
        }
    });
});


//find project by ManagerId
router.get('/projects/:id', function (req, res) {
    projectProvider.findProjectsByManagerId(req.params['id'], function (error, proj) {
        if (error) {
            res.writeHead(500, JSON.stringify({
                message: error.message
            }));
            return res.end();
        }
        if (proj) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(JSON.stringify({
                projects: proj
            }));
            res.end();
        }
    });
});

//find project by ManagerId
router.get('/projects/:id', function (req, res) {
    projectProvider.findProjectsByManagerId(req.params['id'], function (error, proj) {
        if (error) {
            res.writeHead(500, JSON.stringify({
                message: error.message
            }));
            return res.end();
        }
        if (proj) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(JSON.stringify({
                projects: proj
            }));
            res.end();
        }
    });
});
