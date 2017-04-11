var expect = require('chai').expect;
var MembershipApplication = require('../models/membershipApplication');
var ReviewProcess = require('../processes/review');
var sinon = require('sinon');

describe('Review Process', function() {
    describe('Receiving a valid application', function() {
        var decision;
        var review = new ReviewProcess();
        var validApp = new MembershipApplication({
            email: 'razvan@ciuca.com',
            age: 28
        });
        var applicationReceivedSpy = sinon.spy();
        var validationSpy = sinon.spy();
        var jobSpy = sinon.spy();
        var qualificationSpy = sinon.spy();

        before(function(done) {
            review.on("application-received", applicationReceivedSpy);
            review.on("validated", validationSpy);
            review.on("found-job", jobSpy);
            review.on("qualified", qualificationSpy);
            review.processApplication(validApp, function(err, result) {
                decision = result;
                done();
            });
        });

        it('should return success', function() {
            expect(decision.success).to.equal(true);
        });
        it('should ensure the application is received', function () {
            expect(applicationReceivedSpy.called).to.equal(true);
        });
        it('should ensure the application is valid', function () {
            expect(validationSpy.called).to.equal(true);
        });
        it('should ensure a job is found', function () {
            expect(jobSpy.called).to.equal(true);
        });
        it('should ensure the applicant is qualified', function () {
            expect(qualificationSpy.called).to.equal(true);
        });

    });


});