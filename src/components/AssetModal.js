import React, { useState } from 'react'
import { useRecoilState } from "recoil";
import axios from 'axios'

import { saldoState, assetsState } from '../store/atoms'

const AssetForm = () => {
    const [form, setForm] = useState({ label: 'PETR4', grade: 3, amount: 2 })
    const [saldo, setSaldo] = useRecoilState(saldoState);
    const [assets, setAssets] = useRecoilState(assetsState);

    const handleSubmitForm = async (event) => {
        event.preventDefault()
        
        try {
            const response = (await axios.get(`https://blxskdikk0.execute-api.sa-east-1.amazonaws.com/dev/quotation?label=${form.label}`)).data

            if (!response[form.label]) {
                return
            }
    
            const newAssetsArray = [...assets, { ...form, price: response[form.label].price, name: response[form.label].name }]
            const totalPrice = newAssetsArray.reduce((total, asset) => total + (asset.amount * asset.price), 0)
            const totalGrade = newAssetsArray.reduce((total, asset) => total + (asset.grade), 0)
    
            setAssets(newAssetsArray.map(asset => ({
                label: asset.label,
                name: asset.name,
                grade: parseInt(asset.grade),
                price: parseFloat(asset.price),
                amount: parseInt(Math.floor(asset.amount)),
                total: parseFloat((asset.amount * asset.price)),
                percent: parseFloat((asset.amount * asset.price / totalPrice * 100)),
                idealAmount: parseInt(Math.floor((asset.grade / totalGrade) * saldo / asset.price)),
                idealTotal: parseFloat(Math.floor((asset.grade / totalGrade) * saldo / asset.price) * asset.price),
                idealPercent: parseFloat((asset.grade / totalGrade * 100)),
                status: ((asset.grade / totalGrade) * saldo / asset.price) > asset.amount
            })))
            
            // setForm({ label: '', grade: 0, amount: 0 })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="modal" id="assetModal">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Adicionar ativo</h5>
                        
                        <button type="button" className="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmitForm}>
                            <div className="row">
                                <div className="col">
                                    <input value={form.label} onChange={e => setForm({ ...form, label: e.target.value})} className="form-control" />
                                </div>
                                <div className="col">
                                    <input value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value})} className="form-control" />
                                </div>
                                <div className="col">
                                    <input value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value})} className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary">Salvar alterações</button>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-primary">Salvar alterações</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetForm