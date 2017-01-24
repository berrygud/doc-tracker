import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  getHomeData() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          <a href="/admin/doc-add">+ Create Document Transaction</a>
          <hr />
          <h4>List Documents</h4>
          <table class="table table-condensed table-bordered table-striped table-hover">
            <thead>
              <tr>
                <td class="col-sm-3">Tracking ID</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              {this.props.docs.map((doc, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <a href={`/admin/doc-edit/${doc._id}`}>{doc.trackingId}</a>
                    </td>
                    <td>{doc.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (<div>X Document Tracking System</div>);
    }
  }

  render() {
    return (
      <div class="col-sm-12">
        {this.getHomeData()}
      </div>
    );
  }
}

export default Home;
