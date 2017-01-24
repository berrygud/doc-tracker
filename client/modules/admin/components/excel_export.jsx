import React from 'react';

class ExcelExport extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    e.preventDefault();
    window.location.href = '/admin/excel/' + this.props.docId;
  }

  render() {
    return (
      <div>
        <a href="#" onClick={this.handleClick.bind(this)} class="pull-right btn btn-warning">Export to Excel</a>
      </div>
    );
  }
}

export default ExcelExport;
