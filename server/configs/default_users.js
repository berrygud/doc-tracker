export default () => {
  if (!Meteor.users.find({}).fetch().length) {
    let users = [
      {username: 'onin', password: 'oninpassword'},
      {username: 'admin', password: 'adminpassword'},
      {username: 'records', password: 'recordspassword'},
    ];

    let userIds = users.map((user) => {

      let userId = Accounts.createUser({
        username: user.username,
        password : user.password
      });

      if (user.username === 'admin') {
        Roles.addUsersToRoles(userId, ['SuperAdmin'])
      }

      return userId;
    });
  }
}
