import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useModal } from '../../context/ModalProvider';
import api from '../../services/api';

interface RecoverPasswordParams {
    token?: string;
}

export default function RecoverPassword() {
    let { token } = useParams<RecoverPasswordParams>();
    const { spinner } = useModal();
    const [ isValid, setIsValid ] = useState<boolean | null>(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ password, setPassword] = useState('');
    const [ confirmPassword, setConfirmPassword] = useState('');

    const history = useHistory();

    if (!token || (isValid !== null && !isValid)){
        spinner.close()
        history.replace('/');
    }

    const verifyToken = useCallback(async () => {
        spinner.open();
        let response = await api.get(`/users/recover/${token}`);

        if (response.status === 202){
            setIsValid(true);
        }

        setIsLoading(false);
        spinner.close();
    }, [setIsValid, token]);

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    if (isLoading){
        return <div></div>
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        spinner.open();
        if (password !== confirmPassword){
            spinner.close();
            return
        }

        let response = await api.put(`/users/recover/${token}`, { password });

        if (response.status === 200){
            console.log("Senha Mudada")
            history.replace('/');
        }

        spinner.close();
    }

    return (
        <div>
            Carregou
            <form onSubmit={handleSubmit}>
                <input type="password"/>
                <input type="password"/>
                <button>Salvar nova Senha</button>
            </form>
        </div>
    )
}
