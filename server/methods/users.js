import {Users} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

export default function () {
  Meteor.methods({
    'users.createUserFromAdmin'(email, password, username, full_name) {
      Accounts.createUser({
        email,
        password,
        username,
        profile: {
          name: full_name
        }
      })
    },
    'users.setPasswordFromAdmin'(userId, password) {
      Accounts.setPassword(userId, password, {logout: false});
    }
  });
}
