import React from 'react';

import AccountsUiWrapper from './accounts_ui_wrapper';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSearch(e) {
    e.preventDefault();
    let keyword = this.refs.search.value;
    this.refs.search.value = "";
    this.props.search(keyword, (err, res) => {
      if (res.length) {
        FlowRouter.go('/admin/doc-edit/' + res[0]._id);
      } else {
        toastr.warning("Search didn't find a match");
      }
    });
  }

  render() {
    return(
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="/">Doc Tracker</a>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav" style={{marginTop: 15}}>
              <li class="active"><AccountsUiWrapper /></li>
              <li><input
                style={{marginTop: -7, marginLeft: 10}} type="text" class="form-control" name="search" ref="search" defaultValue="" placeholder="Search: Tracking ID" />
              </li>
              <li><button onClick={this.handleSearch.bind(this)} style={{margin: '-7px 0 0 15px'}} class="btn btn-primary">Search</button></li>
              <li><span style={{marginLeft: 10, color: 'white'}}>v0.9.0</span></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
