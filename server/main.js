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

  process.env.MAIL_URL = 'smtp://dcmancapiz@gmail.com:dcmanpassword@smtp.gmail.com:587';
});


