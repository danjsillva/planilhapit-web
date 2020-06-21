import React from 'react';
import { RecoilRoot } from 'recoil'

import AssetForm from './components/AssetForm'
import AssetsTable from './components/AssetsTable'

const App = () => {
  return (
    <RecoilRoot>
      <AssetForm />
      
      <AssetsTable />
    </RecoilRoot>
  );
}

export default App
