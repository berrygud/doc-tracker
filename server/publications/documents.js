import {Documents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('documents.single', function (documentsId) {
    return Documents.find(documentsId);
  });

  Meteor.publish('documents.all', function () {
    return Documents.find({});
  });
}
