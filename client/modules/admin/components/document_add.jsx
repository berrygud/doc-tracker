import React from 'react';
import moment from 'moment';
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
    const {description, notes} = this.refs;
    let documentId = Meteor.uuid();

    let docTypeId = $('#documentType').val();
    let dateId = moment().format('YYYYMMDDHHmmss');
    let trackingId = `${docTypeId}-${dateId}`;

    Documents.insert({
      _id: documentId,
      trackingId,
      description: description.value,
      notes: notes.value,
      createdBy: Meteor.userId(),
      createdDate: new Date()
    });

    Logs.insert({
      documentId,
      trackingId,
      beginStatus: 'Accepted',
      office: Meteor.user().username,
      dateIn: new Date(),
      userId: Meteor.userId()
    });

    FlowRouter.redirect('/admin/doc-edit/' + documentId);
    toastr.success(`Document has been saved with TrackingID: ${trackingId}`);
  }

  render() {
    return (
      <div class="col-sm-12">
        <h4>Create Document Tracker</h4>
        <form method="post" class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-3 control-label">Description</label>
            <div class="col-sm-9">
              <textarea class="form-control" name="description"
                ref="description" defaultValue="" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">Remarks</label>
            <div class="col-sm-9">
              <textarea class="form-control" name="notes" ref="notes"
                defaultValue="" />
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
              <button onClick={this.handleCreate.bind(this)}
                class="btn btn-primary">Create</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default DocumentAdd;
