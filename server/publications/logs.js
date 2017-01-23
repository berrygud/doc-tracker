import {Logs} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('logs', function (logsId) {
    return Logs.find(logsId);
  });
}
