import {DocumentTypes} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('document_types', function () {
    return DocumentTypes.find();
  });
}
