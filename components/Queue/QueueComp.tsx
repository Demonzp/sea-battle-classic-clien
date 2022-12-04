import { useEffect, useState } from 'react';
import styles from '../../styles/GameUI.module.css';

const QueueComp = ()=>{
    const [sec, setSec] = useState('00');
    const [min, setMin] = useState('00');
    const [hour, setHour] = useState('00');
    const [timeCreate, _] = useState(Date.now());

    useEffect(()=>{
        const timer = setInterval(()=>{
            const time = (Date.now()-timeCreate);
            //const time = 10699000;
            const hours = Math.trunc((time/1000)/60/60);
            const hoursToSec = hours*60*60;
            setHour(()=>hours<10?'0'+hours:String(hours));
            const minuts = Math.trunc((time/1000-hoursToSec)/60);
            setMin(()=>minuts<10?'0'+minuts:String(minuts));
            const seconds = Math.trunc((time/1000-hoursToSec-(minuts*60)));
            setSec(()=>seconds<10?'0'+seconds:String(seconds));
        }, 1000);
        return ()=>clearInterval(timer);
    },[]);

    return (
        <div className={styles.queueCont}>
            <div className={styles.col}>
                <button style={{maxWidth: 150}}>leave queue</button>
                <div style={{marginTop: 20}}>
                    time in queue: {hour}:{min}:{sec}
                </div>
                <div style={{marginTop: 20}}>
                    online: {10}
                </div>
                <div style={{marginTop: 20}}>
                    queue: {1}
                </div>
            </div>
        </div>
    );
};

export default QueueComp;