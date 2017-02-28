var fs = require('fs');

var users;

loadUsers(function(parsedUsers) {
    users = parsedUsers;
});


function loadUsers(callback) {
    fs.readFile('fakeDb.json', 'utf-8', function(err, data) {
        var parsedUsers = JSON.parse(data);
        callback(parsedUsers);
    });
}

function getUsers(request, response) {
    console.log('getUsers callback');
    response.json(users);
};

module.exports = {
    loadUsers: loadUsers,
    getUsers: getUsers
};