import actions from './actions';
import routes from './routes.jsx';
import accountsConfig from './configs/accounts';
import libs from './libs';

accountsConfig();

export default {
  routes,
  actions,
  libs,
  load(context) {

  }
};
