import configs from './configs';
import publications from './publications';
import methods from './methods';
import {Documents, Logs} from '../lib/collections';

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

JsonRoutes.add("get", "/s/:id", function (req, res, next) {
  let trackingId = req.params.id;
  let doc = Documents.findOne({trackingId});

  const options = {
    sort: {dateIn: -1}
  };

  let docLogs = Logs.find({trackingId}, options).fetch();
  res.setHeader('access-control-allow-origin', '*');

  JsonRoutes.sendResult(res, {
    data: {doc, docLogs}
  });
});
