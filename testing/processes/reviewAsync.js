var async = require("async");

var ReviewProcess = function(args) {
    var app = args.app;

    this.processApplication = function(next) {
        async.series({
            validated: this.ensureAppIsValid,
            jobFound: this.findJob,
            qualified: this.ensureApplicantIsQualified,
            success: this.approveApplication
        }, function(err, result) {
            if (err) {
                next(null, {success: false, message: err});
            } else {
                result.message = 'Good Job!';
                next(null, result);
            }
        })
    };

    this.ensureAppIsValid = function(next) {
        if (app.isValid()) {
            next(null, true);
        } else {
            next('Something is wrong...', null);
        }
    };

    this.findJob = function(next) {
        app.job = {
            position: null,
            contractDuration: null,
            salary: null
        };
        next(null, true);
    };

    this.ensureApplicantIsQualified = function(next) {
        //TODO: check that requirements for the job are met

        next(null, true);
    };

    this.approveApplication = function(next) {
        next(null, true);
    }
};

module.exports = ReviewProcess;