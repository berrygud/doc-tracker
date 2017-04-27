export default () => {
  if (!Meteor.roles.find({}).fetch().length) {
    let roles = [
      {name: 'SuperAdmin'},
      {name: 'Admin'},
      {name: 'Records'},
    ]

    let roleIds = roles.map((role) => {
      return Roles.createRole(role.name)
    })
  }
}
