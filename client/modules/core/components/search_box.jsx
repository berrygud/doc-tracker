import React, { Component } from 'react';

class SearchBox extends Component {
  constructor(props) {
    super(props);
  }

  handleSearch(e) {
    e.preventDefault();
    let keyword = this.refs.search.value;
    this.refs.search.value = "";

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

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearch(e);
    }
  }

  render() {
    return (
      <div>
        <input
          style={{marginTop: -7, marginLeft: 10}}
          type="text"
          class="form-control"
          name="search"
          id="search"
          ref="search"
          defaultValue=""
          onKeyPress={this.handleKeyPress.bind(this)}
          placeholder="Search: Tracking ID" />        
      </div>
    )
  }
}

export default SearchBox;
