import React from 'react';

class NotAllowed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Permission Denied</h3>
      </div>
    );
  }
}

export default NotAllowed;
