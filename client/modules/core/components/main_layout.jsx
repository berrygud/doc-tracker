import React, {Component} from 'react';

import Header from '../containers/header';

class Layout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header />
        <div style={{marginTop: 70}}>
    			<div class="col-sm-12">
    				{this.props.content()}
    			</div>
        </div>
      </div>
    )
  }
}

// const Layout = ({content = () => null }) => (
// );

export default Layout;
