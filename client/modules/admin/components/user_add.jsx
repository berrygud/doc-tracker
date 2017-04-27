import React from 'react';
import { Accounts } from 'meteor/accounts-base'

import UserList from '../containers/user_list'

class UserAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      password_repeat: "",
      email: "",
      full_name: ""
    }
  }

  handleChangeUsername() {
    this.setState({
      username: this.refs.username.value
    })
  }

  handleChangePassword() {
    this.setState({
      password: this.refs.password.value
    })
  }

  handleChangePasswordRepeat() {
    this.setState({
      password_repeat: this.refs.password_repeat.value
    })
  }

  handleChangeEmail() {
    this.setState({
      email: this.refs.email.value
    })
  }

  handleChangeFullname() {
    this.setState({
      full_name: this.refs.full_name.value
    })
  }

  handleClick() {
    // passwords must be the same
    let { username, password, password_repeat, full_name, email } = this.state

    if (password === password_repeat) {
      Meteor.call('users.createUserFromAdmin', email, password, username,
        full_name, (err, result) => {

        if (!err) {
          this.setState({
            username: "",
            password: "",
            password_repeat: "",
            email: "",
            full_name: ""
          })

          toastr.success('User has been added.')
        } else {
          console.log(err.reason)
        }
      })
    }
  }

  render() {
    return (
      <div>
        <h4>Users</h4>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text"
              class="form-control"
              id="username"
              name="username"
              ref="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChangeUsername.bind(this)} />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control"
              type="password"
              id="password"
              name="password"
              ref="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChangePassword.bind(this)} />
          </div>
          <div class="form-group">
            <label for="password_repeat">Repeat Password</label>
            <input class="form-control"
              type="password"
              id="password_repeat"
              name="password_repeat"
              ref="password_repeat"
              placeholder="Repeat Password"
              value={this.state.password_repeat}
              onChange={this.handleChangePasswordRepeat.bind(this)}/>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control"
              type="email"
              id="email"
              name="email"
              ref="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleChangeEmail.bind(this)} />
          </div>
          <div class="form-group">
            <label for="full_name">Full Name</label>
            <input class="form-control"
              type="full_name"
              id="full_name"
              name="full_name"
              ref="full_name"
              placeholder="Full Name"
              value={this.state.full_name}
              onChange={this.handleChangeFullname.bind(this)} />
          </div>
          <div class="form-group">
            <button
              class="btn btn-primary"
              onClick={this.handleClick.bind(this)}>Add
            </button>
          </div>
        </div>
        <div class="col-sm-8">
          <UserList />
        </div>
      </div>
    );
  }
}

export default UserAdd;
