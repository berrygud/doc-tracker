import React from 'react';
import {Logs} from '/lib/collections';
import moment from 'moment';

class DocTransactions extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAdd(e) {
    e.preventDefault();

    Logs.insert({
      documentId: this.props.docId,
      beginStatus: 'Accepted',
      office: Meteor.user().username,
      dateIn: new Date()
    });

    toastr.success('Transaction has been added.');
  }

  handleOut(id) {

    let route = this.refs['route-' + id].value;
    let endStatus = this.refs['endStatus-' + id].value;

    if (!route || !endStatus) {
      alert('Route and Status is required');
      return false;
    }

    let data = {
      route,
      endStatus,
      dateOut: new Date(),
      transactionNotes: this.refs['transactionNotes-' + id].value
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
      return <select class="form-control" id={`route-${log._id}`} name={`route-${log._id}`} ref={`route-${log._id}`}>
        <option value="">N/A</option>
        <option value="admin">admin</option>
        <option value="sds">sds</option>
        <option value="records">records</option>
      </select>
    }
  }

  getStatus(log) {
    if (log.endStatus) {
      return log.endStatus;
    } else {
      return <select class="form-control" id={`endStatus-${log._id}`} name={`endStatus-${log._id}`} ref={`endStatus-${log._id}`}>
        <option value="">N/A</option>
        <option value="endorsed">endorsed</option>
        <option value="signed">signed</option>
        <option value="release">release</option>
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
      return <span><button class="btn btn-info" id={`outButton-${log._id}`} onClick={this.handleOut.bind(this, log._id)}>Out</button>&nbsp;</span>;
    }
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
                  <td>
                    {this.getOutButton(log)}
                    <button class="btn btn-danger" onClick={this.handleDelete.bind(this, log._id)}>Delete</button>
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
              <td><button class="btn btn-success" onClick={this.handleAdd.bind(this)}>New</button></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="8"><a href="#" class="pull-right btn btn-warning">Export to Excel</a></td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default DocTransactions;
