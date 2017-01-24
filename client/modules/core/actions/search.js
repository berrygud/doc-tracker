import {Documents} from '/lib/collections';
export default {
  search({Meteor, LocalState, FlowRouter}, keyword, cb) {
    let res = Documents.find({trackingId: keyword}).fetch();
    return cb(null, res);
  }
}
