import React from 'react';

class DocumentTypeDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dtCode: ""
    }
  }

  handleChange() {
    this.setState({
      dtCode: this.refs.documentType.value
    })
  }

  render() {
    return (
      <div class="form-group">
        <label class="col-sm-3 control-label">Document Type</label>
        <div class="col-sm-9">
          <select
            id="documentType"
            name="documentType"
            ref="documentType"
            class="form-control"
            onChange={this.handleChange.bind(this)}
          >
            <option>--Select--</option>
            {this.props.data.map((documentType, i) => {
              return (
                <option value={documentType.code} key={i}>
                  {documentType.code + ' - ' + documentType.name}
                </option>
              )
            })}
          </select>
        </div>
        <input
          type="hidden"
          name="dtCode"
          id="dtCode"
          ref="dtCode"
          value={this.state.dtCode}
        />
      </div>
    );
  }
}

export default DocumentTypeDropdown;
