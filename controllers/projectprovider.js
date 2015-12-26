var mongodb = require('./../db/db');
var ObjectID = require('mongodb').ObjectID;
var database;

ProjectProvider = function (db) {
    mongodb.open(function (err, db) {
        database = db;
        database.collection('projects', {strict: true}, function (err, collection) {
            if (err) {
                console.log("The 'projects' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    })
};

ProjectProvider.prototype.getCollection = function (callback) {
    database.collection('projects', function (error, projects_collection) {
        if (error) callback(error);
        else callback(null, projects_collection);
    });
};

//find all projects
ProjectProvider.prototype.findAll = function (callback) {
    this.getCollection(function (error, projects_collection) {
        if (error) callback(error);
        else {
            projects_collection.find().toArray(function (error, results) {
                if (error) callback(error);
                else callback(null, results)
            });
        }
    });
};

//find an projects by ID
ProjectProvider.prototype.findById = function (id, callback) {
    this.getCollection(function (error, projects_collection) {
        if (error) callback(error);
        else {
            projects_collection.findOne({_id: ObjectID(id)}, function (error, result) {
                if (error) callback(error);
                else callback(null, result)
            });
        }
    });
};

//find an projects by managerId
ProjectProvider.prototype.findProjectsByManagerId = function (id, callback) {
    this.getCollection(function (error, manager) {
        if (error) callback(error);
        else {
            manager.findOne({managerId: id}, function (error, result) {
                if (error) callback(error);
                else callback(null, result)
            });
        }
    });
};

//save new project
ProjectProvider.prototype.save = function (projects, callback) {
    this.getCollection(function (error, projects_collection) {
        if (error) callback(error);
        else {
            if (typeof(projects.length) == 'undefined')
                projects = [projects];

            for (var i = 0; i < projects.length; i++) {
                project = projects[i];
                project.created_at = new Date();
            }

            projects_collection.insert(projects, function () {
                callback(null, projects);
            });
        }
    });
};

// update an project
ProjectProvider.prototype.update = function (projectId, projects, callback) {
    this.getCollection(function (error, projects_collection) {
        if (error) callback(error);
        else {
            projects_collection.update(
                {_id: ObjectID(projectId)},
                projects,
                function (error, projects) {
                    if (error) callback(error);
                    else callback(null, projects)
                });
        }
    });
};

//delete project
ProjectProvider.prototype.delete = function (projectId, callback) {
    this.getCollection(function (error, projects_collection) {
        if (error) callback(error);
        else {
            projects_collection.remove(
                {_id: ObjectID(projectId)},
                function (error, project) {
                    if (error) callback(error);
                    else callback(null, project)
                });
        }
    });
};

var populateDB = function () {

    console.log('Populating project database...');
    var projects = [
        {
            _id: ObjectID("567ac1bb9974127422d449fb"),
            id: 1,
            title: 'wi-fi beacon',
            managerId: "567ac1bb9974127422d449f5",
            employees: ["567ac1bb9974127422d449ef", "567ac1bb9974127422d449f1"]
        },
        {
            _id: ObjectID("567ac1bb9974127422d449fc"),
            id: 2,
            title: 'Mobile payment app',
            managerId: "567ac1bb9974127422d449f6",
            employees: ["567ac1bb9974127422d449f2", "567ac1bb9974127422d449f3", "567ac1bb9974127422d449f4"]
        },
        {
            _id: ObjectID("567ac1bb9974127422d449fd"),
            id: 3,
            title: 'Web Client',
            managerId: "567ac1bb9974127422d449f7",
            employees: ["567ac1bb9974127422d449ef", "567ac1bb9974127422d449f0", "567ac1bb9974127422d449f1", "567ac1bb9974127422d449f3"]
        },
        {
            _id: ObjectID("567ac1bb9974127422d449fe"),
            id: 4,
            title: 'E-Commerce',
            managerId: "567ac1bb9974127422d449f8",
            employees: ["567ac1bb9974127422d449f0", "567ac1bb9974127422d449f1", "567ac1bb9974127422d449f3"]
        },
        {
            _id: ObjectID("567ac1bb9974127422d449ff"),
            id: 5,
            title: 'Logistics',
            managerId: "567ac1bb9974127422d449f9",
            employees: ["567ac1bb9974127422d449f3", "567ac1bb9974127422d449f4"]
        },
        {
            _id: ObjectID("567ac1bb9974127422d44a00"),
            id: 6,
            title: 'Runner app',
            managerId: "567ac1bb9974127422d449fa",
            employees: ["567ac1bb9974127422d449f0", "567ac1bb9974127422d449f3"]
        }
    ];

    database.collection('projects', function (error, projects_collection) {
        projects_collection.insert(projects, {safe: true}, function (err, result) {
        });
    });

};

exports.ProjectProvider = ProjectProvider;