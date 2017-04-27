import { Accounts } from 'meteor/accounts-base';

export default function() {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
    loginPath: '/login'
  });
}
