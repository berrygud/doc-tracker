import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import RolesDropdown from '../components/roles_dropdown.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  let data = Roles.getAllRoles().fetch();

  if (data.length) {
    onData(null, {data});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RolesDropdown);
