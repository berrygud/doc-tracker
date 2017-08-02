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

    // remove assigned document
    Meteor.call('dashboards.removeUserDoc', Meteor.userId(), doc._id);
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
    } else {
      return (
        <div><button class="btn btn-info" onClick={this.handleGoDetails.bind(this, doc)}>Details</button></div>
      );
    }
  }

  getData() {
    if (this.props.docs) {
      console.log('meron')
      return (

          this.props.docs.map((doc, i) => {
            return (
              <tr key={i}>
                <td>{moment(doc.createdDate).format('llll')}</td>
                <td><a href={`/admin/doc-edit/${doc._id}`}>{doc.trackingId}</a></td>
                <td>{doc.description}</td>
                <td>{doc.notes}</td>
                <td>{this.getActionButtons(doc)}</td>
              </tr>
            );
          })

      )
    } else {
      console.log('wala')
      return (
        <tr><td colSpan="5">-- No Data --</td></tr>
      )
    }

  }

  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <table class="table table-striped table-bordered table-hover table-condensed">
          <thead>
            <tr>
              <td class="col-sm-2"><strong>Date</strong></td>
              <td class="col-sm-2"><strong>Tracking ID</strong></td>
              <td class="col-sm-3"><strong>Description</strong></td>
              <td class="col-sm-3"><strong>Remarks</strong></td>
              <td class="col-sm-2"><strong>Actions</strong></td>
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
