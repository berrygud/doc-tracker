import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import DocumentAdd from './containers/document_add';
import DocumentEdit from './containers/document_edit';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/admin/doc-add', {
    action() {
      mount(MainLayoutCtx, {
        content: () => (<DocumentAdd />)
      });
    }
  });

  FlowRouter.route('/admin/doc-edit/:id', {
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<DocumentEdit id={params.id} />)
      });
    }
  });
}
