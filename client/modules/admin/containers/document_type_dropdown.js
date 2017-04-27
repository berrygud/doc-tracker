import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import DocumentTypeDropdown from '../components/document_type_dropdown.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  const data = Collections.DocumentTypes.find({}).fetch()

  if (data.length){
    onData(null, {data}); 
  }
  
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DocumentTypeDropdown);
