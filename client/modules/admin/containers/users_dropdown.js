import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import UsersDropdown from '../components/users_dropdown.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('users.all').ready()) {

    // exclude super admin account on dropdown 
    let data = Meteor.users.find({ username: { $ne: 'admin' } }).fetch();
      let users = data.filter((user) => {
      if (typeof user.roles !== 'undefined') {
        return user
      }
    })

    onData(null, {users});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UsersDropdown);
