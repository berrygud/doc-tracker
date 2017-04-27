import React from 'react';

import {DocumentTypes} from '/lib/collections'
import DocumentTypeList from '../containers/document_type_list'

class DocumentTypeAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      name: ""
    }
  }

  handleChangeCode() {
    this.setState({
      code: this.refs.code.value
    });
  }

  handleChangeName() {
    this.setState({
      name: this.refs.name.value
    });
  }

  handleClick(e) {
    e.preventDefault();

    DocumentTypes.insert({
      code: this.state.code,
      name: this.state.name
    }, (err, result) => {
      if (result) {
        this.setState({
          code: "",
          name: ""
        });
        toastr.success('Document Type has been added.');
      }
    });
  }

  render() {
    return (
      <div>
        <h4>Document Types</h4>
        <div class="col-sm-3">
          <div class="form-group">
            <label for="code">Code</label>
            <input
              class="form-control"
              type="text"
              id="code"
              name="code"
              ref="code"
              placeholder="Code"
              value={this.state.code}
              onChange={this.handleChangeCode.bind(this)} />
          </div>
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
        <div class="col-sm-9">
          <DocumentTypeList />
        </div>
      </div>
    );
  }
}

export default DocumentTypeAdd;
