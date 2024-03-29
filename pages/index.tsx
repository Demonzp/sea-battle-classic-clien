import type { NextPage } from 'next';
import { useEffect, useMemo } from 'react';
import GameComp from '../components/GameComp';
import SignInWithGoogleBtn from '../components/SignInWithGoogleBtn';
import { TGoogleAuthData, TGoogleAuthRes } from '../components/SignInWithGoogleBtn/SignInWithGoogleBtn';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setConnect, setGuest, setUser, TUser } from '../store/slices/app';
import styles from '../styles/Home.module.css';

// type Props = {
//   data: any
// }
//<InferGetStaticPropsType<typeof getServerSideProps>></InferGetStaticPropsType>
const Home: NextPage = () => {

  const { user, isConnected, isConnect } = useAppSelector(state=>state.app);
  const isForceShow = useMemo(()=>user?false:true, [user]);

  const dispath = useAppDispatch();

  useEffect(()=>{
    dispath(setConnect(true));
  },[]);

  const onSignIn = (data: TGoogleAuthRes)=>{
    //console.log('onSignIn = ', data);
    dispath(setUser(data));
  };

  const onConnect = ()=>{
    dispath(setConnect(true));
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {!user&&
          <SignInWithGoogleBtn onSuccess={onSignIn} isForceShow={isForceShow}/>
        }
        {
          ((isConnect||isConnected)&&user)&&
          <GameComp />
        }
        {
          (!isConnected&&!isConnect&&user)&&
          <div>
            <label>connect to the server</label>
            <button onClick={onConnect}>connect</button>
          </div>
        }
      </div>
    </div>
  );
};

export default Home;
