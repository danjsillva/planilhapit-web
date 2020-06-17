import React from 'react';
import { RecoilRoot } from 'recoil'

import AssetForm from './components/AssetForm'
import AssetsTable from './components/AssetsTable'

import { GlobalStyle } from './styles/global'

const App = () => {
  return (
    <>
      <GlobalStyle />

      <RecoilRoot>
        <AssetForm />
        <AssetsTable />
      </RecoilRoot>
    </>
  );
}

export default App
