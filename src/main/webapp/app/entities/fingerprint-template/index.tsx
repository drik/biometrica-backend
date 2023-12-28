import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import FingerprintTemplate from './fingerprint-template';
import FingerprintTemplateDetail from './fingerprint-template-detail';
import FingerprintTemplateUpdate from './fingerprint-template-update';
import FingerprintTemplateDeleteDialog from './fingerprint-template-delete-dialog';

const FingerprintTemplateRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<FingerprintTemplate />} />
    <Route path="new" element={<FingerprintTemplateUpdate />} />
    <Route path=":id">
      <Route index element={<FingerprintTemplateDetail />} />
      <Route path="edit" element={<FingerprintTemplateUpdate />} />
      <Route path="delete" element={<FingerprintTemplateDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FingerprintTemplateRoutes;
