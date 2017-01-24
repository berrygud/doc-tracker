import React from 'react';

import AccountsUiWrapper from './accounts_ui_wrapper';
import packageJson from '/package.json';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: packageJson.version
    };
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

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearch(e);
    }
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
                style={{marginTop: -7, marginLeft: 10}}
                type="text"
                class="form-control"
                name="search"
                ref="search"
                defaultValue=""
                onKeyPress={this.handleKeyPress.bind(this)}
                placeholder="Search: Tracking ID"
              />
              </li>
              <li><button onClick={this.handleSearch.bind(this)} style={{margin: '-7px 0 0 15px'}} class="btn btn-primary">Search</button></li>
              <li><span style={{marginLeft: 10, color: 'white'}}>{this.state.version}</span></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
