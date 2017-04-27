import React from 'react';

import RoleList from '../containers/role_list'

class RoleAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    }
  }

  handleChangeName() {
    this.setState({
      name: this.refs.name.value
    })
  }

  handleClick() {
    if (Roles.createRole(this.refs.name.value)) {
      this.setState({
        name: ""
      })

      toastr.success('Role has been added.')
    }
  }

  render() {
    return (
      <div>
        <h4>Roles</h4>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              class="form-control"
              type="text"
              id="name"
              name="name"
              ref="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChangeName.bind(this)} />
          </div>
          <div class="form-group">
            <button
              class="btn btn-primary"
              onClick={this.handleClick.bind(this)}>Add
            </button>
          </div>
        </div>
        <div class="col-sm-8">
          <RoleList />
        </div>
      </div>
    );
  }
}

export default RoleAdd;
