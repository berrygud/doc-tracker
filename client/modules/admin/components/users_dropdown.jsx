import React from 'react';

class UsersDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {id} = this.props;
    return (
      <select class="form-control" id={id} name={id} ref={id}>
        <option value="">N/A</option>
        {this.props.users.map((user, i) => {
          return (<option value={user.username} key={i}>{user.username}</option>);
        })}
      </select>
    );
  }
}

export default UsersDropdown;
