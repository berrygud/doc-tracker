import {Logs} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'logs.insert'(doc, type, dateIn) {
      Logs.insert({
        documentId: doc._id,
        trackingId: doc.trackingId,
        beginStatus: 'Accepted',
        office: Meteor.user().username,
        type,
        dateIn
      });
    }
  });
}
