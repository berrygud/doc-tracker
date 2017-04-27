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
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            ref="name"
            defaultValue={name}
          /><br/>
          <input
            type="hidden"
            name="origName"
            id="origName"
            ref="origName"
            value={origName} />
          <button class="btn btn-primary" onClick={this.handleClick.bind(this)}>
            Update
          </button>
        </div>
      </div>
    );
  }
}

export default RoleEdit;
