import React from 'react';
import { RecoilRoot } from 'recoil'

import AssetForm from './components/AssetForm'
import AssetsTable from './components/AssetsTable'

import './style.css'

const App = () => {
  return (
    <RecoilRoot>
      <div className="container">
        <div className="row mt-5">
          <div className="col-3">
            <AssetForm />   
          </div>
          <div className="col-9">
            <AssetsTable />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App
