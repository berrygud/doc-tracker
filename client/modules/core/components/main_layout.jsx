import React from 'react';

import Header from './header';

const Layout = ({content = () => null }) => (
  <div>
    <Header />
    <div style={{marginTop: 70}}>      
      {content()}
    </div>
  </div>
);

export default Layout;
