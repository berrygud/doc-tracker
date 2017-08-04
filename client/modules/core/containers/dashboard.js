import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Dashboard from '../components/dashboard.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  const {Documents, Logs, Dashboards} = Collections;

  if (Meteor.user()) {

    // get all assigned docs
    const options = {
      sort: {createdDate: 1}
    };

    // sort is important
    let dashDocLogs = Dashboards.find({userId: Meteor.userId()}, options).fetch();
    let trackingIds = dashDocLogs.map(ddl => ddl.trackingId);
    var docs = Documents.find({trackingId: {$in: trackingIds}}, options).fetch();

    for (let i = 0; i < docs.length; i++) {
      if (docs[i].trackingId === dashDocLogs[i].trackingId) {
        docs[i].dashType = dashDocLogs[i].type
      }
    }

    onData(null, {docs});
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Dashboard);
