var Emitter = require("events").EventEmitter;
var util = require('util');

var ReviewProcess = function(args) {
    var callback;

    this.processApplication = function(app, next) {
        callback = next;
        this.emit('application-received', app);
    };

    this.ensureAppIsValid = function(app) {
        if (app.isValid()) {
            this.emit('validated', app);
        } else {
            this.emit('invalid', 'Something\'s not right...');
        }
    };

    this.findJob = function(app) {
        app.job = {
            position: null,
            contractDuration: null,
            salary: null
        };
        this.emit('found-job', app);
    };

    this.ensureApplicantIsQualified = function(app) {
        //TODO: check that requirements for the job are met

        this.emit('qualified', app);
    };

    this.acceptApplication = function(app) {
        callback(null, {
            success: true,
            message: 'Good Job!'
        });
    };

    this.denyApplication = function(message) {
        callback(null, {
            success: false,
            message: message
        });
    };

    //event path
    this.on('application-received', this.ensureAppIsValid);
    this.on('validated', this.findJob);
    this.on('found-job', this.ensureApplicantIsQualified);
    this.on('qualified', this.acceptApplication);

    this.on('invalid', this.denyApplication);

};

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;