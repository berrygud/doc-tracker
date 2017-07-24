import React from 'react';

class UserDropdownItems extends React.Component {
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
        <li>
          {loginButton}
        </li>
      </ul>
    );
  }
}

export default UserDropdownItems;
