import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import DocumentAdd from './containers/document_add';
import DocumentEdit from './containers/document_edit';
import SchoolDistrictAdd from './containers/school_district_add';
import SchoolDistrictEdit from './containers/school_district_edit';
import DocumentTypeAdd from './containers/document_type_add';
import DocumentTypeEdit from './containers/document_type_edit';
import UserAdd from './containers/user_add';
import UserEdit from './containers/user_edit';
import RoleAdd from './containers/role_add';
import RoleEdit from './containers/role_edit';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  function mustBeLoggedIn(context, redirect) {
    // context is the output of `FlowRouter.current()`
    if (!Meteor.userId()) {
      redirect('/not-allowed');
    }
  }

  function mustBeSuperAdmin(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), 'SuperAdmin')) {
      redirect('/not-allowed');
    }
  }

  const adminGroupRoute = FlowRouter.group({
    prefix: '/admin',
    triggersEnter: [mustBeLoggedIn]
  });

  adminGroupRoute.route('/doc-add', {
    action() {
      mount(MainLayoutCtx, {
        content: () => (<DocumentAdd />)
      });
    }
  });

  adminGroupRoute.route('/doc-edit/:id', {
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<DocumentEdit id={params.id} />)
      });
    }
  });

  adminGroupRoute.route('/school-district/add', {
    triggersEnter: [mustBeSuperAdmin],
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<SchoolDistrictAdd />)
      });
    }
  });

  adminGroupRoute.route('/school-district/edit/:id', {
    triggersEnter: [mustBeSuperAdmin],
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<SchoolDistrictEdit id={params.id} />)
      });
    }
  });

  adminGroupRoute.route('/document-type/add', {
    triggersEnter: [mustBeSuperAdmin],
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<DocumentTypeAdd />)
      });
    }
  });

  adminGroupRoute.route('/document-type/edit/:id', {
    triggersEnter: [mustBeSuperAdmin],
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<DocumentTypeEdit id={params.id} />)
      });
    }
  });

  adminGroupRoute.route('/user/add', {
    triggersEnter: [mustBeSuperAdmin],
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<UserAdd />)
      });
    }
  });

  adminGroupRoute.route('/user/edit/:id', {
    triggersEnter: [mustBeSuperAdmin],
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<UserEdit id={params.id} />)
      });
    }
  });

  adminGroupRoute.route('/role/add', {
    triggersEnter: [mustBeSuperAdmin],
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<RoleAdd />)
      });
    }
  });

  adminGroupRoute.route('/role/edit/:id', {
    triggersEnter: [mustBeSuperAdmin],
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<RoleEdit id={params.id} />)
      });
    }
  });

}
