import React from 'react';
import {Documents, Logs} from '/lib/collections';

import SchoolDistrictDropdown from '../containers/school_district_dropdown'
import DocumentTypeDropdown from '../containers/document_type_dropdown'
import UsersDropdown from '../containers/users_dropdown'

class DocumentAdd extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCreate(e) {
    e.preventDefault();
    const {trackingId, description, notes} = this.refs;
    let documentId = Meteor.uuid();

    // $('#dtCode').val()
    // console.log($('#sdCode').val());
    // console.log($('#dtCode').val());

    Documents.insert({
      _id: documentId,
      trackingId: trackingId.value,
      description: description.value,
      notes: notes.value,
      createdBy: Meteor.userId(),
      createdDate: new Date()
    });

    Logs.insert({
      documentId,
      trackingId: trackingId.value,
      beginStatus: 'Accepted',
      office: Meteor.user().username,
      dateIn: new Date(),
      userId: Meteor.userId()
    });

    FlowRouter.redirect('/admin/doc-edit/' + documentId);
    toastr.success(`Document has been saved with TrackingID: ${trackingId.value}`);
  }

  render() {
    return (
      <div class="col-sm-12">
        <h4>Create Document Tracker</h4>
        <form method="post" class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-3 control-label">Tracking ID</label>
            <div class="col-sm-9">
              <input class="form-control" type="text" name="trackingId" ref="trackingId" defaultValue="" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">Description</label>
            <div class="col-sm-9">
              <textarea class="form-control" name="description" ref="description" defaultValue="" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">Notes</label>
            <div class="col-sm-9">
              <textarea class="form-control" name="notes" ref="notes" defaultValue="" />
            </div>
          </div>

          <SchoolDistrictDropdown />
          <DocumentTypeDropdown />
          <div class="form-group">
            <label class="col-sm-3 control-label">Route</label>
            <div class="col-sm-9">
              <UsersDropdown />
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label">&nbsp;</label>
            <div class="col-sm-9">
              <button class="btn btn-primary" onClick={this.handleCreate.bind(this)}>Create</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default DocumentAdd;
