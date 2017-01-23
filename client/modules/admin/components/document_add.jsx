import React from 'react';
import {Documents, Logs} from '/lib/collections';

class DocumentAdd extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCreate(e) {
    e.preventDefault();
    const {trackingId, description, notes} = this.refs;
    let documentId = Meteor.uuid();

    Documents.insert({
      _id: documentId,
      trackingId: trackingId.value,
      description: description.value,
      notes: notes.value
    });

    Logs.insert({
      documentId,
      beginStatus: 'Accepted',
      office: Meteor.user().username,
      dateIn: new Date()
    });

    FlowRouter.redirect('/admin/doc-edit/' + documentId);
    toastr.success('Document has been saved.');
  }

  render() {
    return (
      <div class="col-sm-6">
        <h4>Create New Document Tracker</h4>
        <form method="post" class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-3 control-label">Tracking Id</label>
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
          <div class="form-group">
            <label class="col-sm-3 control-label">&nbsp;</label>
            <div class="col-sm-9">
              <button class="btn btn-primary" onClick={this.handleCreate.bind(this)}>Save</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default DocumentAdd;
