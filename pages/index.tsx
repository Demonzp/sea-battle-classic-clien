import jwtDecode from 'jwt-decode';
import type { NextPage, InferGetStaticPropsType, GetServerSideProps } from 'next';
import { useEffect, useMemo } from 'react';
import GameComp from '../components/GameComp';
import SignInWithGoogleBtn from '../components/SignInWithGoogleBtn';
import { TGoogleAuthData, TGoogleAuthRes } from '../components/SignInWithGoogleBtn/SignInWithGoogleBtn';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setGuest, setUser, TUser } from '../store/slices/app';
import styles from '../styles/Home.module.css';

// type Props = {
//   data: any
// }
//<InferGetStaticPropsType<typeof getServerSideProps>></InferGetStaticPropsType>
const Home: NextPage = () => {

  const { user, isConnected } = useAppSelector(state=>state.app);
  const isForceShow = useMemo(()=>user?false:true, [user]);

  const dispath = useAppDispatch();

  const onSignIn = (data: TGoogleAuthRes)=>{
    dispath(setUser(data));
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {!user&&
          <SignInWithGoogleBtn onSuccess={onSignIn} isForceShow={isForceShow}/>
        }
        {
          (isConnected)&&
          <GameComp />
        }
        {
          (!isConnected)&&
          <div>
            <label>connect to the server</label>
            <button>connect</button>
          </div>
        }
      </div>
    </div>
  );
};

// export const getServerSideProps:GetServerSideProps<Props> = async ()=> {
//   // Fetch data from external API
  
//   const data = await axios.get('http://localhost:4000/');
//   // Pass data to the page via props
//   return { props: { data: data.data } }
// }

export default Home;
