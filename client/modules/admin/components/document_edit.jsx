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

  render() {

    let {trackingId, description, notes} = this.props.doc;

    return (
      <div>
        <div class="col-sm-6">
          <h4>Edit Document Tracker</h4>
          <form method="post" class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-3 control-label">Tracking Id</label>
              <div class="col-sm-9">
                <input class="form-control" type="text" name="trackingId" ref="trackingId" defaultValue={trackingId} disabled="true" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Description</label>
              <div class="col-sm-9">
                <textarea class="form-control" name="description" ref="description" onChange={this.handleDescChange.bind(this)} value={this.state.description} />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Notes</label>
              <div class="col-sm-9">
                <textarea class="form-control" name="notes" ref="notes" defaultValue={notes} />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">&nbsp;</label>
              <div class="col-sm-9">
                <button class="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Save</button>
              </div>
            </div>
          </form>
        </div>

        <div class="col-sm-6">&nbsp;</div>

        <hr/>

        <div class="col-sm-12">
          <DocTransactions data={this.props.docLogs} docId={this.props.id} />
        </div>

      </div>
    );
  }
}

export default DocumentEdit;
