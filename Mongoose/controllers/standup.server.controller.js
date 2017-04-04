var Standup = require('../models/standup.server.model.js');

exports.createNote = function(req, res) {
    var entry = new Standup({
        memberName: req.body.memberName,
        project: req.body.project,
        workYesterday: req.body.workYesterday,
        workToday: req.body.workToday,
        impediment: req.body.impediment
    });

    entry.save();

    res.redirect(301, '/');
};

exports.getNote = function(req, res) {
    res.render('newNote', {title: 'Standup - New Note'});
};

exports.listNotes = function(req, res) {
    var query = Standup.find();
    query.sort({createdOn: 'desc'}).limit(3).exec(function(err, results) {
        res.render('index', {title: 'Standup - List', notes: results})
    });

};