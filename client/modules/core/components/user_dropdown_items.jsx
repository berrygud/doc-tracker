import React from 'react';

class UserDropdownItems extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul class="dropdown-menu">
        <li>
          <a href="/">Dashboard</a>
        </li>
      </ul>
    );
  }
}

export default UserDropdownItems;
