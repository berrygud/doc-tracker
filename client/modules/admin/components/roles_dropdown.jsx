import React from 'react';

class RolesDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      role: ""
    }
  }

  handleChangeRole() {
    this.setState({
      role: this.refs.role.value
    })
  }

  render() {
    return (
      <select id="role" name="role" ref="role" onChange={this.handleChangeRole.bind(this)}>
        <option value={this.state.role}>-- Select a role --</option>
        {this.props.data.map((role, i) => {
          return (
            <option key={i} value={role.name}>
              {role.name}
            </option>
          )
        })}
      </select>
    );
  }
}

export default RolesDropdown;
