var mongodb = require('./../db/db');
var ObjectID = require('mongodb').ObjectID;
var database;


EmployeeProvider = function () {
    mongodb.open(function (err, db) {
        database = db;
        database.collection('employees', {strict: true}, function (err, collection) {
            if (err) {
                console.log("The 'employees' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    })
};

EmployeeProvider.prototype.getCollection = function (callback) {
    database.collection('employees', function (error, employee_collection) {
        if (error) callback(error);
        else callback(null, employee_collection);
    });
};

//find all employees
EmployeeProvider.prototype.findAll = function (callback) {
    this.getCollection(function (error, employee_collection) {
        if (error) callback(error);
        else {
            employee_collection.find().toArray(function (error, results) {
                if (error) callback(error);
                else callback(null, results)
            });
        }
    });
};

//find an employee by ID
EmployeeProvider.prototype.findById = function (id, callback) {
    this.getCollection(function (error, employee_collection) {
        if (error) callback(error);
        else {
            employee_collection.findOne({_id: ObjectID(id)}, function (error, result) {
                if (error) callback(error);
                else callback(null, result)
            });
        }
    });
};


//save new employee
EmployeeProvider.prototype.save = function (employees, callback) {
    this.getCollection(function (error, employee_collection) {
        if (error) callback(error);
        else {
            if (typeof(employees.length) == 'undefined')
                employees = [employees];

            for (var i = 0; i < employees.length; i++) {
                employee = employees[i];
                employee.created_at = new Date();
            }

            employee_collection.insert(employees, function () {
                callback(null, employees);
            });
        }
    });
};

// update an employee
EmployeeProvider.prototype.update = function (employeeId, employees, callback) {
    this.getCollection(function (error, employee_collection) {
        if (error) callback(error);
        else {
            employee_collection.update(
                {_id: ObjectID(employeeId)},
                employees,
                function (error, employees) {
                    if (error) callback(error);
                    else callback(null, employees)
                });
        }
    });
};

//delete employee
EmployeeProvider.prototype.delete = function (employeeId, callback) {
    this.getCollection(function (error, employee_collection) {
        if (error) callback(error);
        else {
            employee_collection.remove(
                {_id: ObjectID(employeeId)},
                function (error, employee) {
                    if (error) callback(error);
                    else callback(null, employee)
                });
        }
    });
};

var populateDB = function () {

    console.log('Populating employee database...');
    var employees = [
        {
            _id: ObjectID("567ac1bb9974127422d449ef"),
            id: 1,
            name: 'James King',
            managerId: "567ac1bb9974127422d449f8",
            managerName: '',
            title: 'President and CEO',
            department: 'Corporate'
        },
        {
            _id: ObjectID("567ac1bb9974127422d449f0"),
            id: 2,
            name: 'Julie Taylor',
            managerId: "567ac1bb9974127422d449ef",
            managerName: 'James King',
            title: 'VP of Marketing',
            department: 'Marketing'
        },
        {
            _id: ObjectID("567ac1bb9974127422d449f1"),
            id: 3,
            name: 'Eugene Lee',
            managerId: "567ac1bb9974127422d449ef",
            managerName: 'James King',
            title: 'CFO',
            department: 'Accounting'
        },
        {
            _id: ObjectID("567ac1bb9974127422d449f2"),
            id: 4,
            name: 'John Williams',
            managerId: "567ac1bb9974127422d449ef",
            managerName: 'James King',
            title: 'VP of Engineering',
            department: 'Engineering'
        },
        {
            _id: ObjectID("567ac1bb9974127422d449f3"),
            id: 5,
            name: 'Ray Moore',
            managerId: "567ac1bb9974127422d449ef",
            managerName: 'James King',
            title: 'VP of Sales',
            department: 'Sales'
        },
        {
            _id: ObjectID("567ac1bb9974127422d449f4"),
            id: 6,
            name: 'Paul Jones',
            managerId: "567ac1bb9974127422d449f2",
            managerName: 'John Williams',
            title: 'QA Manager',
            department: 'Engineering'
        },
        {
            _id: ObjectID("567ac1bb9974127422d449f5"),
            id: 7,
            name: 'Paula Gates',
            managerId: "567ac1bb9974127422d449f2",
            managerName: 'John Williams',
            title: 'Software Architect',
            department: 'Engineering'
        },
        {
            _id: ObjectID("567ac1bb9974127422d449f6"),
            id: 8,
            name: 'Lisa Wong',
            managerId: "567ac1bb9974127422d449f0",
            managerName: 'Julie Taylor',
            title: 'Marketing Manager',
            department: 'Marketing'
        },
        {
            _id: ObjectID("567ac1bb9974127422d449f7"),
            id: 9,
            name: 'Gary Donovan',
            managerId: "567ac1bb9974127422d449f0",
            managerName: 'Julie Taylor',
            title: 'Marketing Manager',
            department: 'Marketing'
        },
        {
            _id: ObjectID("567ac1bb9974127422d449f8"),
            id: 10,
            name: 'Kathleen Byrne',
            managerId: "567ac1bb9974127422d449f3",
            managerName: 'Ray Moore',
            title: 'Sales Representative',
            department: 'Sales'
        },
        {
            _id: ObjectID("567ac1bb9974127422d449f9"),
            id: 11,
            name: 'Amy Jones',
            managerId: "567ac1bb9974127422d449f3",
            managerName: 'Ray Moore',
            title: 'Sales Representative',
            department: 'Sales'
        },
        {
            _id: ObjectID("567ac1bb9974127422d449fa"),
            id: 12,
            name: 'Steven Wells',
            managerId: "567ac1bb9974127422d449f3",
            managerName: 'John Williams',
            title: 'Software Architect',
            department: 'Engineering'
        }
    ];

    database.collection('employees', function (error, employee_collection) {
        employee_collection.insert(employees, {safe: true}, function (err, result) {
        });
    });

};

exports.EmployeeProvider = EmployeeProvider;