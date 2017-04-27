import configs from './configs';
import publications from './publications';
import methods from './methods';

configs();
publications();
methods();

Meteor.startup(function () {
  Meteor.users.allow({
    update: () => {
      return true;
    },
    remove: () => {
      return true;
    }
  });
})
