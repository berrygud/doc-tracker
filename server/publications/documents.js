import {Documents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('documents.single', function(id) {
    return Documents.find({_id: id});
  });

  Meteor.publish('documents.all', function () {
    return Documents.find({});
  });

  Meteor.publish('documents.track', function (trackingId) {
    return Documents.find(trackingId);
  });

  Meteor.publish('documents.trackIds', function (trackingIds) {
    const options = {
      sort: {createdDate: 1}
    };

    return Documents.find({trackingId: {$in: trackingIds}}, options)
  });
}
