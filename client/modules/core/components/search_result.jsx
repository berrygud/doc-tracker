import React from 'react';
import moment from 'moment';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.docLogs)
    console.log(this.props.doc)
  }

  getDateOut(log) {
    if (log.dateOut) {
      return moment(log.dateOut).format('llll');
    } else {
      return 'N/A';
    }
  }  

  render() {
    let { doc, docLogs } = this.props;
    
    let createdDate = moment(doc.createdDate).format('llll');

    return (
      <div>
        <h3>Tracking ID: {doc.trackingId}</h3>
        <p>Description: {doc.description}</p>
        <p>Date Created: {createdDate}</p>        
        <hr />
        <h4>Transactions</h4>
        <table class="table table-striped table-bordered table-hover table-condensed">
          <thead>
            <tr>
              <td><strong>Office</strong></td>
              <td><strong>Date In</strong></td>
              <td><strong>Date Out</strong></td>
              <td><strong>Route</strong></td>
              <td><strong>Status</strong></td>
            </tr>
          </thead>
          <tbody>
            {docLogs.map((d, i) => {
              return (
                <tr key={i}>
                  <td>{d.office}</td>
                  <td>{moment(d.dateIn).format('llll')}</td>
                  <td>{this.getDateOut(d)}</td>
                  <td>{d.route}</td>
                  <td>{d.endStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchResult;
