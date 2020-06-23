import React, { useState } from 'react'
import { useRecoilState } from "recoil";
import axios from 'axios'

import { saldoState, assetsState } from '../store/atoms'

const AssetModal = () => {
    const [form, setForm] = useState({ label: 'PETR4', grade: 3, amount: 2 })
    const [error, setError] = useState()
    const [saldo,] = useRecoilState(saldoState);
    const [assets, setAssets] = useRecoilState(assetsState);

    const handleSubmitForm = async (event) => {
        event.preventDefault()

        if (assets.some(asset => asset.label === form.label)) {
            setError('Este ativo já foi adicionado!')
            return
        }
        
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
                                <div className="col-6 offset-3">
                                    <label htmlFor="">Ativo</label>
                                    <input value={form.label} onChange={e => setForm({ ...form, label: e.target.value.toUpperCase()})} className="form-control" />
                                    <div className="form-text">Código do ativo. Ex.: PETR4.</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 offset-3 mt-3">
                                    <label htmlFor="">Nota</label>
                                    <input type="number" value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value})} className="form-control" />
                                    <div className="form-text">A sua nota para esse ativo.</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 offset-3 mt-3">
                                    <label htmlFor="">Quantidade</label>
                                    <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value})} className="form-control" />
                                    <div className="form-text">Quantidade desse ativo na sua carteira atualmente.</div>
                                </div>
                            </div>
                        </form>

                        <div className="row">
                            <div className="col-6 offset-3 text-danger mt-3">
                                {error && <span>{error}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSubmitForm}>Salvar alterações</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetModal