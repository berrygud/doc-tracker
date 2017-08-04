import React from 'react';
import {Logs, Dashboards} from '/lib/collections';
import moment from 'moment';

import UsersDropdown from '../containers/users_dropdown';
import ExcelExport from '../containers/excel_export';

class DocTransactions extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCheckIn(e) {
    e.preventDefault();

    let dateIn = new Date();

    Logs.insert({
      documentId: this.props.docId,
      trackingId: this.props.trackingId,
      beginStatus: 'Accepted',
      office: Meteor.user().username,
      dateIn
    });

    // remove document on dashboard by documentId
    Meteor.call('dashboards.removeByDocId', this.props.docId);
    // document stays on his dashboard until checked-in from the other end
    Dashboards.insert({
      userId: Meteor.userId(),
      documentId: this.props.docId,
      trackingId: this.props.trackingId,
      type: 'Outgoing',
      createdDate: dateOut
    });

    toastr.success('Transaction has been added.');
  }

  handleCheckOut(id) {

    // refs doesn't work on imported components, use jquery
    let route = $('#route-' + id).val();
    let routeUserId = $('#route-' + id + '-hidden').val();
    let endStatus = this.refs['endStatus-' + id].value;
    let transactionNotes = this.refs['transactionNotes-' + id].value;
    let dateOut = new Date();

    if (!route || !endStatus) {
      alert('Route and Status is required');
      return false;
    }

    let data = {
      route,
      routeUserId,
      endStatus,
      transactionNotes,
      dateOut
    };

    Logs.update(id, {$set: data});

    // document has been released, remove from dashboard
    if (endStatus === 'Released') {
      Meteor.call('dashboards.removeByDocId', this.props.docId);
    } else {
      // remove first then add new one
      Meteor.call('dashboards.removeUserDoc', Meteor.userId(), this.props.docId);
      Dashboards.insert({
        userId: routeUserId,
        documentId: this.props.docId,
        trackingId: this.props.trackingId,
        type: 'Incoming',
        createdDate: dateOut
      });

      // document stays on his dashboard until checked-in from the other end
      Dashboards.insert({
        userId: Meteor.userId(),
        documentId: this.props.docId,
        trackingId: this.props.trackingId,
        type: 'Floating',
        createdDate: dateOut
      });
    }

    toastr.success('Transaction: Out');
  }

  handleDelete(id) {
    if (confirm('Are you sure?')) {
      Logs.remove(id);
      toastr.success('Transaction has been deleted.');
    }
  }

  getDateOut(log) {
    if (log.dateOut) {
      return moment(log.dateOut).format('llll');
    } else {
      return 'N/A';
    }
  }

  getRoute(log) {
    if (log.office === Meteor.user().username && !log.route) {
      return <UsersDropdown id={`route-${log._id}`} excludeUid={Meteor.userId()} />
    } else {
      return log.route;
    }
  }

  getStatus(log) {
    if (log.office === Meteor.user().username && !log.route) {
      return <select class="form-control" id={`endStatus-${log._id}`} name={`endStatus-${log._id}`} ref={`endStatus-${log._id}`}>
        <option value="">N/A</option>
        <option value="Endorsed">Endorsed</option>
        <option value="Signed">Signed</option>
        <option value="Released">Released</option>
      </select>
    } else {
      return log.endStatus;
    }
  }

  getTransNotes(log) {
    if (log.office === Meteor.user().username && !log.route) {
      return <textarea class="form-control" name={`transactionNotes-${log._id}`} ref={`transactionNotes-${log._id}`} defaultValue="" />
    } else {
      return log.transactionNotes;
    }
  }

  getOutButton(log) {
    if (log.office === Meteor.user().username && !log.route) {
      return <span><button class="btn btn-info" id={`outButton-${log._id}`} onClick={this.handleCheckOut.bind(this, log._id)}>Check Out</button>&nbsp;</span>;
    } else {
      return false;
    }
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

  getCheckInRow() {
    let latestTransaction = this.props.data[this.props.data.length - 1];

    // show the check-in button if you are the assigned userId
    if (latestTransaction.routeUserId === Meteor.userId()) {
      return (
        <tr>
          <td>{Meteor.user().username}</td>
          <td>(auto)</td>
          <td>--</td>
          <td>--</td>
          <td>--</td>
          <td>--</td>
          <td><button class="btn btn-success" onClick={this.handleCheckIn.bind(this)}>Check In</button></td>
        </tr>
      )
    } else {
      return false;
    }
  }

  getActionButtons(log) {
    return (
      <div>
        {this.getOutButton(log)}
        {this.isSuperAdmin() ? <button class="btn btn-danger" onClick={this.handleDelete.bind(this, log._id)}>Delete</button> : ""}
      </div>
    );
  }

  render() {
    let logs = this.props.data;
    return (
      <div>
        <h4>Transactions</h4>
        <table class="table table-striped table-bordered table-hover table-condensed">
          <thead>
            <tr>
              <td><strong>Office</strong></td>
              <td><strong>Date In</strong></td>
              <td><strong>Date Out</strong></td>
              <td><strong>Route</strong></td>
              <td><strong>Status</strong></td>
              <td><strong>Remarks</strong></td>
              <td><strong>Actions</strong></td>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => {
              return (
                <tr key={i}>
                  <td>{log.office}</td>
                  <td>{moment(log.dateIn).format('llll')}</td>
                  <td>{moment(log.dateOut).format('llll')}</td>
                  <td>{this.getRoute(log)}</td>
                  <td>{this.getStatus(log)}</td>
                  <td>{this.getTransNotes(log)}</td>
                  <td style={{textAlign: 'center'}}>
                    {this.getActionButtons(log)}
                  </td>
                </tr>
              );
            })}
            {this.getCheckInRow()}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="8">
                <ExcelExport {...this.props} />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default DocTransactions;
