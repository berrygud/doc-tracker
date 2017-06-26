import React from 'react';
import {mount} from 'react-mounter';
import { Accounts } from 'meteor/std:accounts-ui';

import LoginLayout from './components/login_layout.jsx';
import MainLayout from './components/main_layout.jsx';
import Home from './containers/home.js';
import Dashboard from './containers/dashboard.js';
import NotAllowed from './components/not_allowed.jsx';
import Search from './containers/search.js';
import SearchResult from './containers/search_result.js';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);
  const LoginLayoutCtx = injectDeps(LoginLayout);

  FlowRouter.route("/login", {
    action(params) {
      mount(LoginLayoutCtx, {
        content: () => (<Accounts.ui.LoginForm />)
      });
    }
  });

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });

  FlowRouter.route("/logout", {
    action(params) {
      Meteor.logout((err) => {
        FlowRouter.go('/')
      })
    }
  });

  FlowRouter.route('/dashboard', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Dashboard />)
      });
    }
  });

  FlowRouter.route('/search', {
    name: 'search',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Search />)
      });
    }
  });  

  FlowRouter.route('/search-result/:id', {
    name: 'search-result',
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<SearchResult id={params.id} />)
      });
    }
  });    

  FlowRouter.route('/not-allowed', {
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NotAllowed />)
      });
    }
  });

  // TODO: remove this, can't automate this on heroku yet...
  FlowRouter.route('/superadmin', {
    action() {
      let adminUser = Meteor.users.findOne({username: 'admin'});
      if (adminUser) {
        Roles.addUsersToRoles(adminUser._id, ['SuperAdmin']);
        console.log(adminUser._id + " admin made SuperAdmin");
      }
    }
  });
}
