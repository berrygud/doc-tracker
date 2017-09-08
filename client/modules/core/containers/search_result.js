import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import SearchResult from '../components/search_result.jsx';

export const composer = ({context, id, trackId}, onData) => {
  const {Meteor, Collections} = context();

  const {Documents, Logs} = Collections;

  if (trackId) {
    if (Meteor.subscribe('documents.track', trackId).ready()) {
      let doc = Documents.findOne({trackingId: trackId});

      const options = {
        sort: {dateIn: -1}
      };

      let docLogs = Logs.find({trackingId: trackId}, options).fetch();

      if (doc) {
        onData(null, {doc, docLogs});
      }
    }
  } else {
    if (Meteor.subscribe('documents.single', id).ready()) {
      let doc = Documents.findOne(id);

      const options = {
        sort: {dateIn: -1}
      };

      if (Meteor.subscribe('logs.docs', id).ready()) {
        let docLogs = Logs.find({documentId: id}, options).fetch();
        onData(null, {doc, docLogs});
      }

    }
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SearchResult);
