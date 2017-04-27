import React from 'react';

import RolesDropdown from '../containers/roles_dropdown'

class UserEdit extends React.Component {
  constructor(props) {
    super(props);

    let full_name = ""
    if (props.data.profile && props.data.profile.name) {
      full_name = props. data.profile.name
    }

    let email = ""
    if (props.data.emails && props.data.emails[0].address) {
      email = props.data.emails[0].address
    }

    this.state = {
      username: props.data.username,
      role: "",
      password: "",
      email,
      full_name
    }
  }

  handleClick() {

    let userId = this.props.data._id
    let selectedRole = $('#role').val();
    let username = this.refs.username.value;
    let email = this.refs.email.value;
    let full_name = this.refs.full_name.value;
    let password = this.refs.password.value;
    let password_repeat = this.refs.password_repeat.value;

    // passwords must be the same
    // TODO: update to better length check
    if (password.length > 0 && password === password_repeat) {
      Meteor.call('users.setPasswordFromAdmin', userId, password);
    }

    let allRoles = Roles.getAllRoles().fetch()
    allRoles.map((xrole, i) => {
      Roles.removeUsersFromRoles(userId, xrole.name)
    })

    let data = {
      username, 'emails.0.address': email, 'profile.name': full_name
    }

    // console.log(data, 'data update');
    Meteor.users.update(userId, { $set: data }, (err, res) => {
      if (selectedRole) {
        Roles.setUserRoles(userId, selectedRole)
        // console.log(userId, 'userId');
        // console.log(selectedRole, 'selectedRole');
      }

      FlowRouter.go('/admin/user/add')
      toastr.success('User has been updated.')
    })
  }

  render() {

    let user = this.props.data
    let username = user.username

    let full_name = ""
    if (user.profile && user.profile.name) {
      full_name = user.profile.name
    }

    let email = ""
    if (user.emails && user.emails[0].address) {
      // email = user.emails[0].address
      email = user.emails[0].address
    }

    return (
      <div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="username">Username</label>
            <input class="form-control"
              type="text"
              id="username"
              name="username"
              ref="username"
              defaultValue={username}
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control"
              type="password"
              id="password"
              name="password"
              ref="password"
              defaultValue="" />
          </div>
          <div class="form-group">
            <label for="password_repeat">Repeat Password</label>
            <input class="form-control"
              type="password"
              id="password_repeat"
              name="password_repeat"
              ref="password_repeat"
              defaultValue=""
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control"
              type="email"
              id="email"
              name="email"
              ref="email"
              defaultValue={email} />
          </div>
          <div class="form-group">
            <label for="full_name">Full Name</label>
            <input class="form-control"
              type="full_name"
              id="full_name"
              name="full_name"
              ref="full_name"
              defaultValue={full_name} />
          </div>
          <div class="form-group">
            <label for="role">Role</label>
            <RolesDropdown />
          </div>
          <div class="form-group">
            <button class="btn btn-primary" onClick={this.handleClick.bind(this)}>
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserEdit;
