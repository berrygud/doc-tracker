import {Dashboards, Documents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('dashboards', function () {
    // get all assigned docs
    const options = {
      sort: {createdDate: 1}
    };

    // sort is important
    return Dashboards.find({userId: Meteor.userId()}, options);
  });
}
