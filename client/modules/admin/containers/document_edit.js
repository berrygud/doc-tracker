import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import DocumentEdit from '../components/document_edit.jsx';

export const composer = ({context, id}, onData) => {
  const {Meteor, Collections} = context();

  const {Documents, Logs} = Collections;

  if (Meteor.subscribe('documents.single', id).ready()) {
    let doc = Documents.findOne(id);

    if (Meteor.subscribe('logs.docs', id).ready()) {
      const options = {
        sort: {dateIn: -1}
      };

      let docLogs = Logs.find({documentId: id}, options).fetch();
      onData(null, {doc, docLogs});
    }
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DocumentEdit);
