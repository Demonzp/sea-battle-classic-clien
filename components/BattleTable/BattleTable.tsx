import { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { msToString } from '../../utils/global';

const BattleTable = () => {
    const {gameStatistic} = useAppSelector(state=>state.game);
    const timeObj = useMemo(()=>gameStatistic?msToString(gameStatistic?.time):{h:'00',m:'00',s:'00'},[gameStatistic]);
    return (
        <>
        {
            gameStatistic&&
            <table>
                <caption>Battle Statistic</caption>
                <thead>
                    <tr>
                        <th colSpan={3}>{gameStatistic.text}</th>
                    </tr>
                    <tr>
                        <th>total time: </th>
                        <td colSpan={2}>{timeObj.h}:{timeObj.m}:{timeObj.s}</td>
                    </tr>
                    <tr>
                        <th>total shots: </th>
                        <td colSpan={2}>{gameStatistic.shots}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th rowSpan={6}>You: </th>
                    </tr>
                    <tr>
                        <th>total shots:</th>
                        <td>{gameStatistic.you.shots}</td>
                    </tr>
                    <tr>
                        <th>hit shots:</th>
                        <td>{gameStatistic.you.hits}</td>
                    </tr>
                    <tr>
                        <th>miss shots:</th>
                        <td>{gameStatistic.you.miss}</td>
                    </tr>
                    <tr>
                        <th>destroy ships:</th>
                        <td>{gameStatistic.you.killShips}</td>
                    </tr>
                    <tr>
                        <th>losses ships:</th>
                        <td>{gameStatistic.you.lossesShips}</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th rowSpan={6}>Enemy: </th>
                    </tr>
                    <tr>
                        <th>total shots:</th>
                        <td>{gameStatistic.enemy.shots}</td>
                    </tr>
                    <tr>
                        <th>hit shots:</th>
                        <td>{gameStatistic.enemy.hits}</td>
                    </tr>
                    <tr>
                        <th>miss shots:</th>
                        <td>{gameStatistic.enemy.miss}</td>
                    </tr>
                    <tr>
                        <th>destroy ships:</th>
                        <td>{gameStatistic.enemy.killShips}</td>
                    </tr>
                    <tr>
                        <th>losses ships:</th>
                        <td>{gameStatistic.enemy.lossesShips}</td>
                    </tr>
                </tbody>
            </table>
        }
        </>

    );
};

export default BattleTable;