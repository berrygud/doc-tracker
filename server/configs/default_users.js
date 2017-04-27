export default () => {
  if (!Meteor.users.find({}).fetch().length) {
    let users = [
      {username: 'admin', password: 'adminpassword', profile: {
        name: 'Super Admin'
      }},
      {username: 'onin', password: 'oninpassword', profile: {
        name: 'Jesus B. Nana'
      }},
      {username: 'records', password: 'recordspassword'},
    ];

    let userIds = users.map((user) => {

      let userId = Accounts.createUser({
        username: user.username,
        password : user.password
      });

      if (userId && user.username === 'admin') {
        Roles.addUsersToRoles(userId, ['SuperAdmin']);
        console.log(userId + ' : Made admin user SuperAdmin');
      }

      return userId;
    });
  }
}
