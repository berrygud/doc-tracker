import React from 'react';

class AdminDropdownItems extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
      </ul>
    );
  }
}

export default AdminDropdownItems;
