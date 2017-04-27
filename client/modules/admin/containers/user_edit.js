import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import UserEdit from '../components/user_edit.jsx';

export const composer = ({context, id}, onData) => {
  const {Meteor, Collections} = context();

  let data = Meteor.users.findOne(id)
  if (typeof data !== 'undefined') {
    onData(null, {data});
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserEdit);
