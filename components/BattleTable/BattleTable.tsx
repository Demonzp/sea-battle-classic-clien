import { useAppSelector } from '../../store/hooks';

const BattleTable = () => {
    const {gameStatistic} = useAppSelector(state=>state.game);
    return (
        <>
        {
            gameStatistic&&
            <table>
                <caption>Battle Statistic</caption>
                <thead>
                    <tr>
                        <th colSpan={3}>You loser!!!!!</th>
                    </tr>
                    <tr>
                        <th>total time: </th>
                        <td colSpan={2}>10:10:00</td>
                    </tr>
                    <tr>
                        <th>total shots: </th>
                        <td colSpan={2}>200</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th rowSpan={6}>You: </th>
                    </tr>
                    <tr>
                        <th>total shots:</th>
                        <td>34</td>
                    </tr>
                    <tr>
                        <th>hit shots:</th>
                        <td>34</td>
                    </tr>
                    <tr>
                        <th>miss shots:</th>
                        <td>51</td>
                    </tr>
                    <tr>
                        <th>destroy ships:</th>
                        <td>34</td>
                    </tr>
                    <tr>
                        <th>losses ships:</th>
                        <td>34</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th rowSpan={6}>Enemy: </th>
                    </tr>
                    <tr>
                        <th>total shots:</th>
                        <td>34</td>
                    </tr>
                    <tr>
                        <th>hit shots:</th>
                        <td>34</td>
                    </tr>
                    <tr>
                        <th>miss shots:</th>
                        <td>51</td>
                    </tr>
                    <tr>
                        <th>destroy ships:</th>
                        <td>34</td>
                    </tr>
                    <tr>
                        <th>losses ships:</th>
                        <td>34</td>
                    </tr>
                </tbody>
            </table>
        }
        </>

    );
};

export default BattleTable;