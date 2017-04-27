import React from 'react';

import {SchoolDistricts} from '/lib/collections';

class SchoolDistrictDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sdCode: ""
    }
  }

  handleChange() {
    this.setState({
      sdCode: this.refs.schoolDistrict.value
    })
  }

  render() {
    return (
      <div class="form-group">
        <label class="col-sm-3 control-label">School / District</label>
        <div class="col-sm-9">
          <select
            name="schoolDistrict"
            ref="schoolDistrict"
            id="schoolDistrict"
            class="form-control"
            onChange={this.handleChange.bind(this)}
          >
            <option>--Select--</option>
            {this.props.data.map((schoolDistrict, i) => {
              return (
                <option
                  key={i}
                  value={schoolDistrict.sd_id}
                >
                  {schoolDistrict.sd_id} - {schoolDistrict.name}
                </option>
              )
            })}
          </select>
        </div>
        <input
          type="hidden"
          name="sdCode"
          id="sdCode"
          ref="sdCode"
          value={this.state.sdCode}
        />
      </div>
    );
  }
}

export default SchoolDistrictDropdown;
