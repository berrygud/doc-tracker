import React from 'react';

import packageJson from '/package.json';
import UserDropdownItems from './user_dropdown_items';
import AdminDropdownItems from './admin_dropdown_items';
import SearchBox from '../containers/search_box';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: packageJson.version
    };
  }

  handleSearch(e) {
    e.preventDefault();
    // let keyword = this.refs.search.value;
    let keyword = $('#search').val();
    // this.refs.search.value = "";
    $('#search').val('');

    // search for logged-in users
    if (Meteor.userId()) {
      this.props.search(keyword, (err, res) => {
        if (res.length) {
          FlowRouter.go('/admin/doc-edit/' + res[0]._id);
        } else {
          toastr.warning("Search didn't find a match");
        }
      });
    } else {
      // search for public users
      this.props.search(keyword, (err, res) => {
        if (res.length) {
          FlowRouter.go('/search-result/' + res[0]._id);
        } else {
          toastr.warning("Search didn't find a match");
        }
      });
    }

  }

  // { Roles.userIsInRole(Meteor.userId(), 'SuperAdmin') ? <AdminLeftNav /> : "" }

  render() {
    let role = (Meteor.user() && Meteor.user().roles) ? Meteor.user().roles[0] : ""
    let username = (Meteor.user() ? `[ ${Meteor.user().username} : ${role} ]` : "")

    return(
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="/">Capiz DcMan</a>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav" style={{marginTop: 15}}>
              <li>
                <SearchBox />
              </li>
              <li><button onClick={this.handleSearch.bind(this)} style={{margin: '-7px 0 0 15px'}} class="btn btn-primary">Search</button></li>
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
