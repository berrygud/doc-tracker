import React from 'react';

class UsersDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: ""
    }
  }

  handleChange() {
    let {id} = this.props
    // this is how to get data attribute on <select> tag
    let selectedUserId = $('#' + id).find(':selected').data('userid');
    $('#' + id + "-hidden").val(selectedUserId)
  }

  render() {
    let {id} = this.props;
    let hiddenId = id + "-hidden";
    return (
      <div>
        <select class="form-control" id={id} name={id} ref="userRoleName" onChange={this.handleChange.bind(this)}>
          <option>--Select--</option>
          {this.props.users.map((user, i) => {
            if (user._id !== this.props.excludeUid) {
              return (
                <option data-userid={user._id} value={`[${user.roles[0]}] ${user.profile.name}`} key={i}>
                  [{user.roles[0]}] {user.profile.name}
                </option>
              );
            }
          })}
        </select>
        <input type="hidden" ref="userId" id={hiddenId} name={hiddenId} defaultValue="" />
      </div>
    );
  }
}

export default UsersDropdown;
