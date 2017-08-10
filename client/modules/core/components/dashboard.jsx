import React from 'react';
import {Logs, Dashboards} from '/lib/collections';
import moment from 'moment';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  handleGoDetails(doc) {
    FlowRouter.redirect(`/admin/doc-edit/${doc._id}`);
  }

  // todo: duplicate code from doc_transactions
  handleCheckIn(doc) {
    let dateIn = new Date();

    Logs.insert({
      documentId: doc._id,
      trackingId: doc.trackingId,
      beginStatus: 'Accepted',
      office: Meteor.user().username,
      type: 'Outgoing',
      dateIn
    });

    // remove document on dashboard by documentId
    Meteor.call('dashboards.removeByDocId', doc._id);
    Dashboards.insert({
      userId: Meteor.userId(),
      documentId: doc._id,
      trackingId: doc.trackingId,
      type: 'Outgoing',
      createdDate: dateIn
    });

    toastr.success('Document has been checked-in.');
  }

  getActionButtons(doc) {
    if (doc.dashType === 'Incoming') {
      return (
        <div><button class="btn btn-success" onClick={this.handleCheckIn.bind(this, doc)}>Check In</button></div>
      );
    } else if (doc.dashType === 'Floating') {
      return (
        <div><button class="btn btn-warning" onClick={this.handleGoDetails.bind(this, doc)}>Details</button></div>
      );
    } else {
      return (
        <div><button class="btn btn-info" onClick={this.handleGoDetails.bind(this, doc)}>Details</button></div>
      );
    }
  }

  getData() {
    if (this.props.docs.length) {
      return (
        this.props.docs.map((doc, i) => {

          // get time ago in hours
          let cTstamp = moment(doc.createdDate);
          let nowTstamp = moment(new Date());
          let agoInHours = moment.duration(nowTstamp.diff(doc.createdDate)).asHours().toFixed();
          let color;
          if (agoInHours < 1) {
            color = 'blue';
          } else if (agoInHours > 1 && agoInHours < 2) {
            color = 'orange';
          } else if (agoInHours > 2) {
            color = 'red';
          } else {
            color = 'red';
          }

          return (
            <tr key={i}>
              <td><a href={`/admin/doc-edit/${doc._id}`}>{doc.trackingId}</a></td>
              <td>{doc.description}</td>
              <td>{doc.notes}</td>
              <td>{this.getActionButtons(doc)}</td>
              <td>
                <strong>
                  { moment.duration(nowTstamp.diff(doc.createdDate)).humanize() }
                </strong>
              </td>
            </tr>
          );
        })
      )
    } else {
      return (
        <tr>
          <td colSpan="5" style={{textAlign: 'center'}}>-- No Data --</td>
        </tr>
      )
    }

  }

  render() {
    return (
      <div class="col-sm-12">
        <a href="/admin/doc-add" class="btn btn-info">
          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;
          Create Document Tracker
        </a>
        <hr />
        <h4>Dashboard</h4>
        <table class="table table-striped table-bordered table-hover table-condensed">
          <thead>
            <tr>
              <td class="col-sm-2"><strong>Tracking ID</strong></td>
              <td class="col-sm-3"><strong>Description</strong></td>
              <td class="col-sm-3"><strong>Remarks</strong></td>
              <td class="col-sm-2"><strong>Actions</strong></td>
              <td class="col-sm-2"><strong>Age</strong></td>
            </tr>
          </thead>
          <tbody>
            {this.getData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;
