const ActiveDirectory = require('activedirectory')

const username = 'OmidNe@systemgroup.net'
const password = require('./password')
const config = {
    url: 'ldap://systemgroup.net',
    baseDN: 'dc=systemgroup,dc=com',
    username: username,
    password: password,
}

let client = ActiveDirectory(config)

client.authenticate(username, password, (auth, err) => {
    if (err) {
        console.log(err)
        return
    }

    console.log(auth)
})

var query = 'cn=*Exchange*';
var opts = {
    includeMembership: ['group', 'user'], // Optionally can use 'all'
    includeDeleted: false
};

client.find(query, function(err, results) {
    if ((err) || (!results)) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
    }

    console.log('Groups');
    _.each(results.groups, function(group) {
        console.log('  ' + group.cn);
    });

    console.log('Users');
    _.each(results.users, function(user) {
        console.log('  ' + user.cn);
    });

    console.log('Other');
    _.each(results.other, function(other) {
        console.log('  ' + other.cn);
    });
});