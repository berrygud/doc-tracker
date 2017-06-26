import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSearch(e) {
    e.preventDefault();
    let keyword = this.refs.public_search.value;
    this.refs.public_search.value = "";
    this.props.search(keyword, (err, res) => {
      if (res.length) {
        FlowRouter.go('/search-result/' + res[0]._id);
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
    return (
      <div class="row">  
        <div class="col-sm-12">
          <h3>Search Document (Public)</h3>
          <input
            type="text"
            class="form-control"
            name="public_search"
            ref="public_search"
            defaultValue=""
            onKeyPress={this.handleKeyPress.bind(this)}
            placeholder="Search: Tracking ID"
          />
        </div>      
        <div class="col-sm-12">
          <button onClick={this.handleSearch.bind(this)} 
            style={{marginTop: 10}}
            class="btn btn-primary center">Search
          </button>`
        </div>
      </div>
    );
  }
}

export default Search;
