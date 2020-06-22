import React from 'react'
import { useRecoilState } from "recoil";
import { FiPlusCircle } from 'react-icons/fi'

import AssetModal from './AssetModal'

import { saldoState, assetsState } from '../store/atoms'

const AssetsTable = () => {
    const [saldo,] = useRecoilState(saldoState);
    const [assets,] = useRecoilState(assetsState);

    return (
        <div className="">
            <AssetModal />

            <div className="card card-body font-weight-bold">
                <div className="row">
                    <div className="col-5 border-right text-center">Ativo</div>
                    <div className="col-3 border-right text-center">Posição Atual</div>
                    <div className="col-3 border-right text-center">Posição Ideal</div>
                    <div className="col-1 text-center">Ação</div>
                </div>
            </div>

            {assets.map(asset => (
                <div key={asset.label} className="card card-body pointer mt-1">
                    <div className="row">
                        <div className="col-2">{asset.label}</div>
                        <div className="col-1">{asset.grade}</div>
                        <div className="col-2 border-right">{asset.price}</div>
                        <div className="col-1">{asset.amount}</div>
                        <div className="col-1">{asset.total}</div>
                        <div className="col-1 border-right">{asset.percent}%</div>
                        <div className="col-1">{asset.idealAmount}</div>
                        <div className="col-1">{asset.idealTotal}</div>
                        <div className="col-1 border-right">{asset.idealPercent}%</div>
                        <div className="col-1">{asset.status}</div>
                    </div>
                </div>
            ))}

            <div className="card card-body pointer mt-1" data-toggle="modal" data-target="#assetModal">
                <div className="row">
                    <div className="col text-center">
                        <FiPlusCircle />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetsTable