import React, { Component } from 'react';

import packageJson from '/package.json';
import {Documents} from '/lib/collections';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version: packageJson.version
    };
  }

  handleDelete(id) {
    if (confirm('Are you sure?')) {
      Documents.remove(id);
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      let keyword = $('#filter').val();

      this.handleSearch(keyword);
      $('#filter').val('')
    }
  }

  handleSearch(keyword) {

    this.props.filter(keyword, (err, res) => {
      if (res.length) {

        let tbody = "";
        res.forEach((doc, i) => {
              tbody += `
                <tr key=${i}>
                  <td>
                    <a href="/admin/doc-edit/${doc._id}">${doc.trackingId}</a>
                  </td>
                  <td>${doc.description}</td>
                  <td>${doc.notes}</td>
                  <td style="{text-lign: 'center'}"><a class="btn btn-info" href="/admin/doc-edit/${doc._id}">Details</a>&nbsp;
                  <button class="btn btn-danger" onClick=${this.handleDelete.bind(this, doc._id)}>Delete</button></td>
                </tr>
              `;
        })

        $('#tbody').html(tbody);

      } else {
        toastr.warning("Filter didn't found a match");
      }
    });
  }

  render() {
    return (
      <div class="col-sm-12">
        <a href="/admin/doc-add" class="btn btn-info">
          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;
          Create Document Tracker
        </a>
        <hr />
        <h4>My Documents</h4>
        <input
          id="filter"
          class="form-control"
          type="text"
          name="filter"
          defaultValue=""
          placeholder="Type your keyword and press 'ENTER'"
          ref="filter"
          style={{marginBottom: '10px'}}
          onKeyPress={this.handleKeyPress.bind(this)} />

        <table class="table table-condensed table-bordered table-striped table-hover">
          <thead>
            <tr>
              <td class="col-sm-2">Tracking ID</td>
              <td class="col-sm-3">Description</td>
              <td class="col-sm-4">Remarks</td>
              <td class="col-sm-3"><a href="/superadmin" style={{textDecoration: 'none', color: '#333'}}>Actions</a></td>
            </tr>
          </thead>
          <tbody id="tbody">
            {this.props.docs.map((doc, i) => {
              return (
                <tr key={i}>
                  <td>
                    <a href={`/admin/doc-edit/${doc._id}`}>{doc.trackingId}</a>
                  </td>
                  <td>{doc.description}</td>
                  <td>{doc.notes}</td>
                  <td style={{textAlign: 'center'}}><a class="btn btn-info" href={`/admin/doc-edit/${doc._id}`}>Details</a>&nbsp;
                  <button class="btn btn-danger" onClick={this.handleDelete.bind(this, doc._id)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Home;
