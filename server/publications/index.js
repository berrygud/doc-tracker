import document_types from './document_types';

import dashboards from './dashboards';
import documents from './documents';
import logs from './logs';
import users from './users';
import excel from './excel';

export default function () {
  documents();
  logs();
  users();
  excel();
  dashboards();
  document_types();
}
