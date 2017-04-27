import React from 'react';

import {SchoolDistricts} from '/lib/collections';

class SchoolDistrictEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sd_id: this.props.data.sd_id,
      name: this.props.data.name
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
    const {_id, sd_id, name} = this.state;

    let data = {
      sd_id,
      name
    };

    SchoolDistricts.update(this.props.id, { $set: data }, (err, result) => {
      if (result) {
        FlowRouter.go('/admin/tools');
        toastr.success('School / District has been saved.');
      }
    });


  }

  render() {
    return (
      <div>
        <label for="sd_id">ID</label>&nbsp;
        <input
          type="text"
          id="sd_id"
          name="sd_id"
          ref="sd_id"
          value={this.state.sd_id}
          onChange={this.handleChangeSdId.bind(this)}
        /><br/>
        <label for="name">School / District</label>&nbsp;
        <input
          type="text"
          id="name"
          name="name"
          ref="name"
          value={this.state.name}
          onChange={this.handleChangeName.bind(this)}
        /><br/>
      <button class="btn btn-primary" onClick={this.handleClick.bind(this)}>Update</button>
      </div>
    );
  }
}

export default SchoolDistrictEdit;
