import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import SchoolDistrictList from '../components/school_district_list.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  let data = Collections.SchoolDistricts.find({}).fetch();

  onData(null, {data});
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SchoolDistrictList);
