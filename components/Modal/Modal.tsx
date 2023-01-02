import React from 'react';
import styles from '../../styles/Modal.module.css';

type Props = {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    children?: JSX.Element | JSX.Element[];
}

const Modal: React.FC<Props> = ({ isActive, setIsActive, children }) => {
    return (
        <div 
            className={isActive?styles.modalActive:styles.modal}
            onClick={()=>setIsActive(false)}
        >
            <div 
                className={isActive?styles.contentActive:styles.content} 
                onClick={e=>e.stopPropagation()}
            >
                {children}
                <div className={styles.action}>
                    <button onClick={()=>setIsActive(false)}>Ok</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;