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
                  <tr>
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
      return <ul>
        <li><strong>Username : Password</strong></li>
        <li>admin : adminpassword</li>
        <li>records : recordspassword</li>
        <li>sds : sdspassword</li>
      </ul>
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
