import {Dashboards} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'dashboards.removeUserDoc'(userId, documentId) {

      // Make sure the user is logged-in
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }

      Dashboards.remove({
        userId,
        documentId
      });
    },

    'dashboards.removeByDocId'(documentId) {

      // Make sure the user is logged-in
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }

      Dashboards.remove({
        documentId
      });
    },

    'dashboards.removeByType'(documentId, type) {

      // Make sure the user is logged-in
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }

      Dashboards.remove({
        documentId,
        type
      });
    },

    'dashboards.insert'(doc, type, createdDate) {

      // Make sure the user is logged-in
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }

      Dashboards.insert({
        userId: Meteor.userId(),
        documentId: doc._id,
        trackingId: doc.trackingId,
        type,
        createdDate
      });
    }

  });
}
