import React from 'react';

import AccountsUiWrapper from './accounts_ui_wrapper';

class Header extends React.Component {
  constructor(props) {
    super(props);
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
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
