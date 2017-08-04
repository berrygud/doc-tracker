import {Dashboards} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'dashboards.removeUserDoc'(userId, documentId) {
      Dashboards.remove({
        userId,
        documentId
      });
    },

    'dashboards.removeByDocId'(documentId) {
      Dashboards.remove({
        documentId
      });
    },

    'dashboards.removeByType'(documentId, type) {
      Dashboards.remove({
        documentId,
        type
      });
    },

  });
}
