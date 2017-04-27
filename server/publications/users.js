import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  // lets publish all, since client doesn't see emails and roles
  // when using autopublish
  Meteor.publish('users.all', function () {
    return Meteor.users.find({});
  });
}
