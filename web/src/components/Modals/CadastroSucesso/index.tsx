import { Icon } from '@material-ui/core'
import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useModal } from '../../../context/ModalProvider'
import Overlay from '../Overlay'

export interface CadastroSucessoProps {
    name: string;
    close: () => void;
}
export default function CadastroSucesso({ name, close }: CadastroSucessoProps) {
    return (
        <Overlay>
            <h1>{ name }</h1>
            <IoClose color="red" size={30} onClick={close}/>
        </Overlay>
    )
}
