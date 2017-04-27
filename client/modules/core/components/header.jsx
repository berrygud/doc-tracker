import React from 'react';

import packageJson from '/package.json';
import UserDropdownItems from './user_dropdown_items';
import AdminDropdownItems from './admin_dropdown_items';

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

  // { Roles.userIsInRole(Meteor.userId(), 'SuperAdmin') ? <AdminLeftNav /> : "" }

  render() {
    let buttonStyle = {padding:0, marginLeft:10}
    let role = (Meteor.user() && Meteor.user().roles) ? Meteor.user().roles[0] : ""
    let username = (Meteor.user() ? `[ ${Meteor.user().username} : ${role} ]` : "")
    let loginButton = (Meteor.userId() ? <a style={buttonStyle} href="/logout">Logout</a> : <a style={buttonStyle} href="/login">Login</a>)

    return(
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="/">Dcman</a>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav" style={{marginTop: 15}}>
              <li><span style={{color: 'white'}}>v{this.state.version}</span></li>
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
              <li>{loginButton}</li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
              <li><a href="#">{username}</a></li>
              <li class="dropdown">
                <a href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false">Menus <span class="caret"></span>
                </a>
                { Roles.userIsInRole(Meteor.userId(), 'SuperAdmin') ? <AdminDropdownItems /> : <UserDropdownItems /> }
              </li>
            </ul>

          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
