import React from 'react';

import {DocumentTypes} from '/lib/collections'

class DocumentTypeEdit extends React.Component {
  constructor(props) {
    super(props);

    let { code, name } = props.data

    this.state = {
      code,
      name
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

    DocumentTypes.update(this.props.id, {
      code: this.state.code,
      name: this.state.name
    }, (err, result) => {
      if (result) {
        this.setState({
          code: "",
          name: ""
        });
        FlowRouter.go('/admin/document-type/add')
        toastr.success('Document Type has been updated.');
      }
    });
  }

  render() {
    return (
      <div>
        <div class="col-sm-3">
          <label for="code">Code</label>&nbsp;
            <input
              type="text"
              id="code"
              name="code"
              ref="code"
              value={this.state.code}
              onChange={this.handleChangeCode.bind(this)}
              /><br/>
            <label for="name">Name</label>&nbsp;
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
      </div>
    );
  }
}

export default DocumentTypeEdit;
