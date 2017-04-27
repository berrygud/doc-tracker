import React, {Component} from 'react';

import Header from '../containers/header';

class LoginLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div style={{marginTop: 70}}>
          <div class="col-sm-2">&nbsp;</div>
    			<div class="col-sm-8">
    				{this.props.content()}
    			</div>
          <div class="col-sm-2">&nbsp;</div>
        </div>
      </div>
    );
  }
}

export default LoginLayout;
