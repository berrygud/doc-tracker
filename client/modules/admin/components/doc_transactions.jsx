import React from 'react';
import {Logs} from '/lib/collections';
import moment from 'moment';

import UsersDropdown from '../containers/users_dropdown';
import ExcelExport from '../containers/excel_export';

class DocTransactions extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAdd(e) {
    e.preventDefault();

    Logs.insert({
      documentId: this.props.docId,
      trackingId: this.props.trackingId,
      beginStatus: 'Accepted',
      office: Meteor.user().username,
      dateIn: new Date()
    });

    toastr.success('Transaction has been added.');
  }

  handleOut(id) {

    // refs doesn't work on imported components, use jquery
    let route = $('#route-' + id).val();
    let routeUserId = $('#route-' + id + '-hidden').val();
    let endStatus = this.refs['endStatus-' + id].value;
    let transactionNotes = this.refs['transactionNotes-' + id].value;

    if (!route || !endStatus) {
      alert('Route and Status is required');
      return false;
    }

    let data = {
      route,
      routeUserId,
      endStatus,
      transactionNotes,
      dateOut: new Date()
    };

    Logs.update(id, {$set: data});
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
    if (log.route) {
      return log.route;
    } else {
      return <UsersDropdown id={`route-${log._id}`} />
    }
  }

  getStatus(log) {
    if (log.endStatus) {
      return log.endStatus;
    } else {
      return <select class="form-control" id={`endStatus-${log._id}`} name={`endStatus-${log._id}`} ref={`endStatus-${log._id}`}>
        <option value="">N/A</option>
        <option value="Endorsed">Endorsed</option>
        <option value="Signed">Signed</option>
        <option value="Released">Released</option>
      </select>
    }
  }

  getTransNotes(log) {
    if (log.dateOut) {
      return log.transactionNotes;
    } else {
      return <textarea class="form-control" name={`transactionNotes-${log._id}`} ref={`transactionNotes-${log._id}`} defaultValue="" />
    }
  }

  getOutButton(log) {
    if (log.dateOut) {
      return false;
    } else {
      return <span><button class="btn btn-info" id={`outButton-${log._id}`} onClick={this.handleOut.bind(this, log._id)}>Check Out</button>&nbsp;</span>;
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
              <td><strong>Notes</strong></td>
              <td><strong>Actions</strong></td>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => {
              return (
                <tr key={i}>
                  <td>{log.office}</td>
                  <td>{moment(log.dateIn).format('llll')}</td>
                  <td>
                    {this.getDateOut(log)}
                  </td>
                  <td>
                    {this.getRoute(log)}
                  </td>
                  <td>
                    {this.getStatus(log)}
                  </td>
                  <td>
                    {this.getTransNotes(log)}
                  </td>
                  <td align="center">
                    {this.getOutButton(log)}
                    {this.isSuperAdmin() ? <button class="btn btn-danger" onClick={this.handleDelete.bind(this, log._id)}>Delete</button> : ""}

                  </td>
                </tr>
              );
            })}
            <tr>
              <td>{Meteor.user().username}</td>
              <td>(auto)</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td><button class="btn btn-success" onClick={this.handleAdd.bind(this)}>Check In</button></td>
            </tr>
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
