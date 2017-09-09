import dashboards from './dashboards';
import logs from './logs';

import users from './users';
import common from './common';

export default function () {
  users();
  common();
  dashboards();
  logs();
}
