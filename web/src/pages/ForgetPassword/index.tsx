import React, { useState } from 'react'
import { useModal } from '../../context/ModalProvider';
import api from '../../services/api';

export default function ForgetPassword() {
    const { spinner } = useModal();
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState('');

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        setError('');
        spinner.open();

        try {
            let response = await api.post('/users/recover/', { email });

            if (response.status === 200){
                // Email enviado
            }
        } catch(error){
            if (error.response.data === "Not Found"){
                setError('Usuário Não Encontrado');
            }
        }

        spinner.close();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" onChange={(e) => setEmail(e.target.value)}/>
            <button>Recuperar senha</button>
            { error.length ? <h1 style={{color: "red"}}> {error} </h1> : null}
        </form>
    )
}
