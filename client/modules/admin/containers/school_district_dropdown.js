import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import SchoolDistrictDropdown from '../components/school_district_dropdown.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  let data = Collections.SchoolDistricts.find({}).fetch();

  if (data.length) {
    onData(null, {data});
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SchoolDistrictDropdown);
