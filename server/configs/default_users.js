export default () => {
  if (!Meteor.users.find({}).fetch().length) {
    let users = [
      {username: 'admin', password: 'password', profile: {
        name: 'Super Admin'
      }},
      {username: 'onin', password: 'password', profile: {
        name: 'Jesus B. Nana'
      }},
      {username: 'records', password: 'password', profile: {
        name: 'Juan D. Cruz'
      }}
    ];

    let userIds = users.map((user) => {

      let userId = Accounts.createUser({
        username: user.username,
        password: user.password
      });

      if (userId && user.username === 'admin') {
        Roles.addUsersToRoles(userId, [ 'SuperAdmin' ]);
        console.log(userId + ' : Made admin user SuperAdmin');
      }

      return userId;
    });
  }
};
