import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCamo, TCamo } from '../../store/slices/game';
import styles from '../../styles/SkinManager.module.css';

const getClassStyle = (camo:TCamo)=>{
    if(camo.selected){
        return styles.imgCont+' '+styles.selected;
    }else{
        return styles.imgCont;
    }
};

const SkinManager = () => {
    const { camos } = useAppSelector(state => state.game);
    const dispath = useAppDispatch();

    return (
        <div className={styles.cont}>
            <div className={styles.fon}>
                <div className={styles.headSkin}>
                    <div>Select Camouflage</div>
                </div>
                <div className={styles.col}>
                    {
                        camos.map(c=>{
                            return(
                                <div 
                                    key={c.id} 
                                    className={getClassStyle(c)}
                                    onClick={()=>dispath(selectCamo(c.id))}
                                >
                                    <img className={styles.image} src={`./assets/${c.path}.png`} alt={c.name} />
                                    <div>{c.name}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>


        </div>
    );
}

export default SkinManager;