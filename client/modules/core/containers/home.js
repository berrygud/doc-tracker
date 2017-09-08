import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Home from '../components/home.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.user() && Meteor.subscribe('documents.all').ready()) {
    let docs = Collections.Documents.find({createdBy: Meteor.userId()}).fetch();
    let logs = Collections.Logs.find({routeUserId: Meteor.userId()}).fetch();


    let docsTrackingIds = docs.map((doc) => {
      return doc.trackingId;
    });

    // requirement: change, show only owned document exclude assigned docs

    // let logsTrackingIds = logs.map((log) => {
    //   return log.trackingId;
    // });

    // let trackingIds = _.union(docsTrackingIds, logsTrackingIds);

    const options = {
      sort: {createdDate: -1}
    };
    let docsUnion = Collections.Documents.find({ trackingId: {
      $in: docsTrackingIds
    }}, options).fetch();

    onData(null, {isLoggedIn: true, docs: docsUnion});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  filter: actions.search.filter
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Home);
