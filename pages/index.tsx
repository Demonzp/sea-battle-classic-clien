import type { NextPage } from 'next';
import { useAppSelector } from '../store/hooks';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const {user} = useAppSelector(state=>state.app);
  return (
    <div className={styles.container}>
        <label>User: {user?user.name:'null'}</label>
    </div>
  )
};

export default Home;
