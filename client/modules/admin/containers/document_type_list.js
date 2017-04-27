import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import DocumentTypeList from '../components/document_type_list.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  let data = Collections.DocumentTypes.find({}).fetch();

  onData(null, {data});
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DocumentTypeList);
