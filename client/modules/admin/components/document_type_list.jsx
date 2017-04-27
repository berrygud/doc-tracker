import React from 'react';

import {DocumentTypes} from '/lib/collections';

class DocumentTypeList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete(id) {
    if (confirm('Are you sure?')) {
      DocumentTypes.remove(id, (err, result) => {
        if (result) {
          toastr.success('Document Types has been removed.');
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
              <td width="30%">Code</td>
              <td width="35%">Name</td>
              <td width="35%">Actions</td>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((documentType, i) => {
              return (
                <tr key={i}>
                  <td>{documentType.code}</td>
                  <td>{documentType.name}</td>
                  <td style={{textAlign: 'center'}}>
                    <a
                      class="btn btn-info"
                      href={"/admin/document-type/edit/" + documentType._id}>
                      Edit
                    </a>&nbsp;
                      <a
                        class="btn btn-danger"
                        href="#"
                        onClick={this.handleDelete.bind(this, documentType._id)}
                      >
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

export default DocumentTypeList;
