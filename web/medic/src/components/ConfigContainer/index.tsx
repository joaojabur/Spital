import React from 'react'
import './index.css';

interface ConfigContainerProps {
    children: React.ReactNode;
}


export default function ConfigContainer({ children }: ConfigContainerProps) {
    return (
        <div className="config-container">
            { children }
        </div>
    )
}
