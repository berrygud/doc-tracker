import {Logs} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('logs', function (logsId) {
    return Logs.find(logsId);
  });

  Meteor.publish('logs.docs', (documentId) => {
    const options = {
      sort: {dateIn: -1}
    };

    let docLogs = Logs.find({documentId}, options);
    return docLogs;
  });

  Meteor.publish('logs.trackId', (trackingId) => {
    const options = {
      sort: {dateIn: -1}
    };

    let docLogs = Logs.find({trackingId}, options);
    return docLogs;
  });
}
