import React from 'react';

import {SchoolDistricts} from '/lib/collections';

class SchoolDistrictList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete(id) {
    if (confirm('Are you sure?')) {
      SchoolDistricts.remove(id, (err, result) => {
        if (result) {
          toastr.success('School / District has been removed.');
        }
      })
    }
  }

  render() {
    return (
      <div>
        <table class="table table-bordered table-striped table-condensed table-hover">
          <thead>
            <tr style={{textAlign: 'center', fontWeight: 'bold'}}>
              <td width="30%">ID</td>
              <td width="35%">Name</td>
              <td width="35%">Actions</td>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((schoolDistrict, i) => {
              return (
                <tr key={i}>
                  <td>{schoolDistrict.sd_id}</td>
                  <td>{schoolDistrict.name}</td>
                  <td style={{textAlign: 'center'}}>
                    <a class="btn btn-info"
                       href={"/admin/school-district/edit/" + schoolDistrict._id}>
                       Edit
                    </a>&nbsp;
                    <a class="btn btn-danger"
                       href="#"
                       onClick={this.handleDelete.bind(this, schoolDistrict._id)}>
                       Delete
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

export default SchoolDistrictList;
