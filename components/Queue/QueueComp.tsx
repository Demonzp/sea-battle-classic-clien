import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setScene } from '../../store/slices/game';
import styles from '../../styles/GameUI.module.css';
import socketInst from '../../utils/socket';

const QueueComp = () => {
    const [sec, setSec] = useState('00');
    const [min, setMin] = useState('00');
    const [hour, setHour] = useState('00');
    const [timeCreate, _] = useState(Date.now());
    const dispatch = useAppDispatch();
    const { queue, online } = useAppSelector(state => state.game.queue);

    useEffect(() => {
        const timer = setInterval(() => {
            const time = (Date.now() - timeCreate);
            //const time = 10699000;
            const hours = Math.trunc((time / 1000) / 60 / 60);
            const hoursToSec = hours * 60 * 60;
            setHour(() => hours < 10 ? '0' + hours : String(hours));
            const minuts = Math.trunc((time / 1000 - hoursToSec) / 60);
            setMin(() => minuts < 10 ? '0' + minuts : String(minuts));
            const seconds = Math.trunc((time / 1000 - hoursToSec - (minuts * 60)));
            setSec(() => seconds < 10 ? '0' + seconds : String(seconds));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const onLeaveQueue = ()=>{
        socketInst.emit('leave-queue');
        dispatch(setScene('shipyard'));
    };

    return (
        <div className={styles.queueCont}>
            <div className={styles.col}>
                <button style={{ maxWidth: 150 }} onClick={onLeaveQueue}>leave queue</button>
                <div style={{ marginTop: 20 }}>
                    time in queue: {hour}:{min}:{sec}
                </div>
                <div style={{ marginTop: 20 }}>
                    online: {online}
                </div>
                <div style={{ marginTop: 20 }}>
                    queue: {queue}
                </div>
            </div>
        </div>
    );
};

export default QueueComp;