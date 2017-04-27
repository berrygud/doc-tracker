import React from 'react';

class RoleEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.data.name
    }
  }

  handleClick() {
    let origName = this.refs.origName.value
    let name = this.refs.name.value
    Roles.deleteRole(origName)
    let idDelName = Roles.createRole(name)
    if (idDelName) {
      FlowRouter.go('/admin/role/add')
      toastr.success('Role has been updated.')
    }
  }

  render() {

    let {name} = this.props.data
    let origName = name.slice(0);

    return (
      <div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control"
              type="text"
              id="name"
              name="name"
              ref="name"
              defaultValue={name} />
          </div>
          <div class="form-group">
            <input class="form-group"
              type="hidden"
              name="origName"
              id="origName"
              ref="origName"
              value={origName} />
          </div>
          <div class="form-group">
            <button class="btn btn-primary" onClick={this.handleClick.bind(this)}>
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RoleEdit;
