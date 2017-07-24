import React from 'react';
import {Documents, Logs} from '/lib/collections';

import DocTransactions from './doc_transactions';

class DocumentEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.doc.description
    }
  }

  handleDescChange() {
    this.setState({
      description: this.refs.description.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const {trackingId, description, notes} = this.refs;

    let doc = {
      // trackingId: trackingId.value,
      description: description.value,
      notes: notes.value
    };

    Documents.update(this.props.id, { $set: doc });

    toastr.success('Document has been saved.');
  }

  isSuperAdmin() {
    if (Roles.userIsInRole(Meteor.userId(), 'SuperAdmin')) {
      return true;
    }
    return false;
  }

  hasEditPermission() {
    if (this.isSuperAdmin() || this.props.doc.createdBy === Meteor.userId()) {
      return true;
    }
    return false;
  }

  render() {

    // console.log(this.hasEditPermission(), 'has edit');
    // console.log(this.props, 'props');
    // console.log(Meteor.userId(), 'userId');

    let saveButton = ""
    if (this.hasEditPermission()) {
      saveButton = (
        <div class="form-group">
          <label class="col-sm-3 control-label">&nbsp;</label>
          <div class="col-sm-6">
            <button class="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Save</button>
          </div>
          <div class="col-sm-3">
            <a href="/admin/doc-add" class="btn btn-info">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;
              Create Document Tracker
            </a>
          </div>
        </div>
      )
    }

    let {trackingId, description, notes, email} = this.props.doc;
    let emailAddress = (email) ? `(${email})` : '';

    return (
      <div>
        <div class="col-sm-6">
          <h4>Edit Document Tracker {emailAddress}</h4>
          <form method="post" class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-3 control-label">Tracking ID</label>
              <div class="col-sm-9">
                <input class="form-control" type="text" name="trackingId" ref="trackingId" defaultValue={trackingId} disabled="true" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Description</label>
              <div class="col-sm-9">
                <textarea class="form-control" name="description" ref="description" onChange={this.handleDescChange.bind(this)} value={this.state.description}
                  disabled={this.hasEditPermission() ? false : true} />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Remarks</label>
              <div class="col-sm-9">
                <textarea class="form-control" name="notes" ref="notes" defaultValue={notes}
                  disabled={this.hasEditPermission() ? false : true} />
              </div>
            </div>

            {saveButton}
          </form>
        </div>

        <div class="col-sm-6">
          &nbsp;
        </div>

        <hr/>

        <div class="col-sm-12">
          <DocTransactions data={this.props.docLogs} docId={this.props.id} trackingId={trackingId} />
        </div>

      </div>
    );
  }
}

export default DocumentEdit;
