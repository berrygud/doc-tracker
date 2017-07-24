import React from 'react';

class AdminDropdownItems extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let loginButton = (Meteor.userId() ? <a href="/logout">Logout</a> : <a href="/login">Login</a>)

    return (
      <ul class="dropdown-menu">
        <li>
          <a href="/">Dashboard</a>
        </li>
        <li role="separator" class="divider"></li>
        <li class="dropdown-header">SuperAdmin Tools</li>
        <li>
          <a href="/admin/school-district/add">School / District Manager</a>
        </li>
        <li>
          <a href="/admin/document-type/add">Document Type Manager</a>
        </li>
        <li>
          <a href="/admin/user/add">User Manager</a>
        </li>
        <li>
          <a href="/admin/role/add">Role Manager</a>
        </li>
        <li>
          {loginButton}
        </li>
      </ul>
    );
  }
}

export default AdminDropdownItems;
