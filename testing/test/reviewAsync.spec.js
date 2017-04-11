var expect = require('chai').expect;
var MembershipApplication = require('../models/membershipApplication');
var ReviewProcess = require('../processes/reviewAsync');
var sinon = require('sinon');

describe('Review Process Async', function() {
    describe('Receiving a valid application', function() {
        var decision;

        var validApp = new MembershipApplication({
            email: 'razvan@ciuca.com',
            age: 28
        });
        var review = new ReviewProcess({app: validApp});

        sinon.spy(review, 'ensureAppIsValid');
        sinon.spy(review, 'findJob');
        sinon.spy(review, 'ensureApplicantIsQualified');

        before(function(done) {
            review.processApplication(function(err, result) {
                decision = result;
                done();
            });
        });

        it('should return success', function() {
            expect(decision.success).to.equal(true);
        });
        it('should ensure the application is valid', function () {
            expect(review.ensureAppIsValid.called).to.equal(true);
        });
        it('should ensure a job is found', function () {
            expect(review.findJob.called).to.equal(true);
        });
        it('should ensure the applicant is qualified', function () {
            expect(review.ensureApplicantIsQualified.called).to.equal(true);
        });

    });
});