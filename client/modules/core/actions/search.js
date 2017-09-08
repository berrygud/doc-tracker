import {Documents} from '/lib/collections';
export default {
  search({Meteor, LocalState, FlowRouter}, keyword, cb) {
    let res = Documents.find({trackingId: keyword}).fetch();
    return cb(null, res);
  },

  filter({Meteor, LocalState, FlowRouter}, keyword, cb) {
    let createdBy = Meteor.userId();
    const options = {
      sort: {createdDate: -1}
    };

    let res = Documents.find({ '$or' : [
      { 'trackingId'  : {'$regex': keyword, $options: "i"}, createdBy },
      { 'description' : {'$regex': keyword, $options: "i"}, createdBy },
      { 'notes'       : {'$regex': keyword, $options: "i"}, createdBy }
    ]}, options).fetch();

    return cb(null, res);
  }
}
