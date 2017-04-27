import React from 'react';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete(id) {
    if (confirm('Are you sure?')) {
      Meteor.users.remove(id, (err, result) => {
        if (err) {
          console.log(err);
        }

        if (result) {
          toastr.success('User has been removed.');
        }
      })
    }
  }

  render() {
    return (
      <div>
        <table class="table table-bordered table-striped table-condensed table-hover">
          <thead>
            <tr style={{textAlign: 'center', fontWeight: 'bold'}}>
              <td>Username</td>
              <td width="20%">Email</td>
              <td width="20%">Full Name</td>
              <td width="20%">Role</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user, i) => {

              let name = "N/A"
              if (user.profile && user.profile.name) {
                name = user.profile.name
              }

              let email = "N/A"
              if (user.emails && user.emails[0]) {
                email = user.emails[0].address
              }

              let role = "N/A"
              if (user.roles && user.roles[0]) {
                role = user.roles[0]
              }

              return (
                <tr key={i}>
                  <td>{user.username}</td>
                  <td>{email}</td>
                  <td>{name}</td>
                  <td>{role}</td>
                  <td style={{textAlign: 'center'}}>
                    <a class="btn btn-info"
                       href={"/admin/user/edit/" + user._id}>Edit
                    </a>&nbsp;
                    <a class="btn btn-danger"
                       href="#"
                       onClick={this.handleDelete.bind(this, user._id)}>Delete
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
