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

  getHomeData() {
    if (this.props.isLoggedIn) {
      return (
        <div>

          <a href="/admin/doc-add" class="btn btn-info">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;
            Create Document Tracker
          </a>
          <hr />
          <h4>List Documents</h4>
          <table class="table table-condensed table-bordered table-striped table-hover">
            <thead>
              <tr>
                <td class="col-sm-3">Tracking ID</td>
                <td class="col-sm-7">Description</td>
                <td class="col-sm-2">Actions</td>
              </tr>
            </thead>
            <tbody>
              {this.props.docs.map((doc, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <a href={`/admin/doc-edit/${doc._id}`}>{doc.trackingId}</a>
                    </td>
                    <td>{doc.description}</td>
                    <td><a class="btn btn-info" href={`/admin/doc-edit/${doc._id}`}>Details</a>&nbsp;
                    <button class="btn btn-danger" onClick={this.handleDelete.bind(this, doc._id)}>Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Welcome to DepEd Document Tracking System v{this.state.version}</h4>
          <p>You need to be logged-in to use the system.</p>
          <p><a href="/login">Click here to login</a></p>
        </div>
      )
    }
  }

  render() {
    return (
      <div class="col-sm-12">
        {this.getHomeData()}
      </div>
    );
  }
}

export default Home;
