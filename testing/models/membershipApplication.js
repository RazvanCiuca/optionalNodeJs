var _ = require('lodash');
var moment = require('moment');

var MembershipApplication = function(args) {

    this.email = args.email;
    this.age = args.age;

    _.extend(this, args);

    this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10, 'days');

    this.emailIsValid = function() {
        return this.email && this.email.length > 3 && this.email.indexOf('@') > -1;
    };
    this.ageIsValid = function() {
        return this.age && this.age > 18;
    };
    this.isValid = function() {
        return this.emailIsValid() && this.ageIsValid() && this.isNotExpired();
    };
    this.isNotExpired = function() {
        return this.validUntil.isAfter(moment());
    }

};

module.exports = MembershipApplication;