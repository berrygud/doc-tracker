import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import UserList from '../components/user_list.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('users.all').ready()) {
    const users = Meteor.users.find({}).fetch()
    onData(null, {users})
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserList);
