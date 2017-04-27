import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import RoleList from '../components/role_list.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  let data = Roles.getAllRoles().fetch();

  onData(null, {data});
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RoleList);
