var expect = require('chai').expect;
var MembershipApplication = require('../models/membershipApplication');
var moment = require('moment');

describe('Application', function() {
    describe('Using valid input', function() {
        var validApp;

        before(function() {
            validApp = new MembershipApplication({
                email: 'razvan@ciuca.com',
                age: 28
            });
        });

        it('should be valid', function() {
            expect(validApp.isValid()).to.equal(true);
        });
        it('should report a valid email', function () {
            expect(validApp.emailIsValid()).to.equal(true);
        });
        it('should report a valid age', function () {
            expect(validApp.ageIsValid()).to.equal(true);
        });
    });

    describe('Using invalid input', function() {
        it('should report an invalid email', function () {
            var app = new MembershipApplication({ email: 'razvan;ciuca.com' });
            expect(app.emailIsValid()).to.equal(false);
        });
        it('should report a valid age', function () {
            var app = new MembershipApplication({ age: 16 });
            expect(app.ageIsValid()).to.equal(false);
        });
        it('should report invalid if it is past the validUntil date', function () {
            var app = new MembershipApplication({ validUntil: Date.parse("01/01/2017") });
            expect(app.isNotExpired()).to.equal(false);
        });
    });
});
