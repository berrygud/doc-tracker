import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import SearchBox from '../components/search_box.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('documents.all').ready()) {
    onData(null, {});
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context,
  search: actions.search.search
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SearchBox);
