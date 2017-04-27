import React from 'react';

class RoleList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete(id) {
    if (confirm('Are you sure?')) {
      Roles.deleteRole(id)
      toastr.success('Document Types has been removed.')
    }
  }

  render() {
    return (
      <div>
        <table class="table table-bordered table-striped table-condensed table-hover">
          <thead>
            <tr style={{textAlign: 'center', fontWeight: 'bold'}}>
              <td width="50%">Name</td>
              <td width="50%">Actions</td>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((role, i) => {
              return (
                <tr key={i}>
                  <td>{role.name}</td>
                  <td style={{textAlign: 'center'}}>
                    <a class="btn btn-info"
                      href={"/admin/role/edit/" + role._id}>Edit
                    </a>&nbsp;
                    <a class="btn btn-danger"
                      href="#"
                      onClick={this.handleDelete.bind(this, role.name)}>Delete
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RoleList;
