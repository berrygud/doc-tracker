import React from 'react';

import {SchoolDistricts} from '/lib/collections';
import SchoolDistrictList from '../containers/school_district_list'

class SchoolDistrictAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sd_id: "",
      name: ""
    }
  }

  handleChangeSdId() {
    this.setState({
      sd_id: this.refs.sd_id.value
    });
  }

  handleChangeName() {
    this.setState({
      name: this.refs.name.value
    });
  }

  handleClick(e) {
    e.preventDefault();

    SchoolDistricts.insert({
      sd_id: this.state.sd_id,
      name: this.state.name
    }, (err, result) => {
      if (result) {
        this.setState({
          sd_id: "",
          name: ""
        });
        toastr.success('School / District has been added.');
      }
    });
  }

  render() {
    return (
      <div>
        <h4>Schools / Districts</h4>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="sd_id">ID</label>
            <input
              class="form-control"
              type="text"
              id="sd_id"
              name="sd_id"
              ref="sd_id"
              value={this.state.sd_id}
              placeholder="ID"
              onChange={this.handleChangeSdId.bind(this)} />
          </div>
          <div class="form-group">
            <label for="name">School / District</label>&nbsp;
            <input
              class="form-control"
              type="text"
              id="name"
              name="name"
              ref="name"
              value={this.state.name}
              placeholder="School / District"
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
          <SchoolDistrictList />
        </div>
      </div>
    );
  }
}

export default SchoolDistrictAdd;
