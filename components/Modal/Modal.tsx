import { on } from 'events';
import React from 'react';
import styles from '../../styles/Modal.module.css';

type Props = {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    isStaticBackground?: boolean;
    onConfirm?: ()=>void;
    children?: JSX.Element | JSX.Element[];
}

const Modal: React.FC<Props> = ({ isActive, isStaticBackground = false, setIsActive, onConfirm, children }) => {
    return (
        <div 
            className={isActive?styles.modalActive:styles.modal}
            onClick={()=>!isStaticBackground&&setIsActive(false)}
        >
            <div 
                className={isActive?styles.contentActive:styles.content} 
                onClick={e=>e.stopPropagation()}
            >
                {isActive&&children}
                <div className={styles.action}>
                    <button onClick={()=>onConfirm&&onConfirm()}>Ok</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;