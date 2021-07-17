import React, { useState } from 'react';

import Dropzone from 'react-dropzone';

import './style.css';

interface UploadFileProps {
    onFileUpload: (file: File) => void;
}

export default function Uploadfile({ onFileUpload }: UploadFileProps){
    const [file, setFile] = useState<File | null>(null);
    
    function renderDragMessage(isDragActive: boolean, isDragReject: boolean){
        if (!isDragActive) {
            if (file){
                return <p style={{color: '#78e5d5'}}>Você selecionou o arquivo {file.name}</p>
            }
            return  <p style={{color: '#999'}}>Clique para selecionar sua foto de perfil ou arraste-a para a caixa.</p>
        }

        if (isDragReject){
            return <p style={{color: '#e57878'}}>Arquivo não suportado</p>
        }

        return <p style={{color: '#78e5d5'}}>Solte o seu arquivo.</p>
    }

    return (
       <Dropzone accept="image/*" onDropAccepted={(files) => {
         setFile(files[0]);
         onFileUpload(files[0])
       }}>
           {({ getRootProps, getInputProps, isDragActive, isDragReject}) => (
               <div
                {...getRootProps()}
                className={`drop-container ${isDragActive ? "drop-container-drag-active" : ""} ${isDragReject ? "drop-container-drag-rejected" : ""} ${file && "drop-container-has-file"}`}>
                    <input {...getInputProps()}/>
                   {renderDragMessage(isDragActive, isDragReject)}
               </div>
           )}
       </Dropzone>
    )
}