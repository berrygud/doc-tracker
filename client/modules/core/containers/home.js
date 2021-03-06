import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Home from '../components/home.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  onData(null, {});

  if (Meteor.user() && Meteor.subscribe('documents.all').ready()) {
    let docs = Collections.Documents.find({createdBy: Meteor.userId()}).fetch();
    let logs = Collections.Logs.find({routeUserId: Meteor.userId()}).fetch();

    let logsTrackingIds = logs.map((log) => {
      return log.trackingId;
    });

    let docsTrackingIds = docs.map((doc) => {
      return doc.trackingId;
    });

    let trackingIds = _.union(docsTrackingIds, logsTrackingIds);

    const options = {
      sort: {_id: -1}
    };
    let docsUnion = Collections.Documents.find({ trackingId: {
      $in: trackingIds
    }}, options).fetch();

    onData(null, {isLoggedIn: true, docs: docsUnion});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Home);
