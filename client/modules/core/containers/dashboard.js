import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Dashboard from '../components/dashboard.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  const {Documents, Logs, Dashboards} = Collections;

  if (Meteor.user()) {

    if (Meteor.subscribe('dashboards').ready()) {
      // get all assigned docs
      const options = {
        sort: {createdDate: -1}
      };

      let dashDocLogs = Dashboards.find({userId: Meteor.userId()}, options).fetch();
      let trackingIds = dashDocLogs.map(ddl => ddl.trackingId);

      if (Meteor.subscribe('documents.trackIds', trackingIds).ready()) {
        let docs = Documents.find({trackingId: {$in: trackingIds}}, options).fetch();

        let matchDocLogs = docs.map(function(doc) {
          let matched = _.where(dashDocLogs, {documentId: doc._id});
          doc.dashType = matched[0].type;
          doc.createdDate = matched[0].createdDate;
          return doc;
        });

        onData(null, {docs: matchDocLogs});
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
)(Dashboard);
