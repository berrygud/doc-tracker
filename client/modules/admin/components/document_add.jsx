import React from 'react';
import moment from 'moment';
import {Documents, Logs} from '/lib/collections';

import DocumentTypeDropdown from '../containers/document_type_dropdown'

class DocumentAdd extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCreate(e) {
    e.preventDefault();
    const {description, notes, email} = this.refs;
    let documentId = Meteor.uuid();

    let docTypeId = $('#documentType').val();
    let dateId = moment().format('YYYYMMDDHHmmss');
    let trackingId = `${docTypeId}-${dateId}`;

    Documents.insert({
      _id: documentId,
      trackingId,
      description: description.value,
      notes: notes.value,
      email: email.value,
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

    // todo: add email validation
    if (email.value) {

      let date = moment().format('DD MMMM YYYY')
      let fullName = Meteor.user().profile.name;
      let role = Meteor.user().roles[0];
      let to = email.value
      let subject = `DepEd Capiz Document Tracking ID: ${trackingId}`
      let text = `
Hello,

Your ${docTypeId} document with Tracking ID : ${trackingId} has been received by ${fullName}, ${role} on ${date}.
You can view it's activity log at http://dcman.depedcapiz.ph/track/${trackingId}.

Thank you.
`
      Meteor.call('email.sendMail', to, subject, text);
    }

    FlowRouter.redirect('/admin/doc-edit/' + documentId);
    toastr.success(`Document has been saved with TrackingID: ${trackingId}`);
  }

  render() {
    return (
      <div class="col-sm-12">
        <h4>Create Document Tracker</h4>
        <form method="post" class="form-horizontal">

          <DocumentTypeDropdown />

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
          <div class="form-group">
            <label class="col-sm-3 control-label">Client Email</label>
            <div class="col-sm-9">
              <input type="email" class="form-control" name="email" ref="email"
                defaultValue="" />
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
