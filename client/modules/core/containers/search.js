import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Search from '../components/search.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  search: actions.search.search
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Search);
