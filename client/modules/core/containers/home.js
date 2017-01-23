import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Home from '../components/home.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  onData(null, {});



  if (Meteor.user() && Meteor.subscribe('documents.all').ready()) {
    let docs = Collections.Documents.find({}).fetch();
    onData(null, {isLoggedIn: true, docs});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Home);
