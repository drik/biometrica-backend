import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Fingerprint from './fingerprint';
import FingerprintDetail from './fingerprint-detail';
import FingerprintUpdate from './fingerprint-update';
import FingerprintDeleteDialog from './fingerprint-delete-dialog';

const FingerprintRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Fingerprint />} />
    <Route path="new" element={<FingerprintUpdate />} />
    <Route path=":id">
      <Route index element={<FingerprintDetail />} />
      <Route path="edit" element={<FingerprintUpdate />} />
      <Route path="delete" element={<FingerprintDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FingerprintRoutes;
