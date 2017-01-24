import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import UsersDropdown from '../components/users_dropdown.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('users.all').ready()) {
    let users = Meteor.users.find({}).fetch();
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
