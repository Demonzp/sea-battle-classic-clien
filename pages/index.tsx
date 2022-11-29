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

  const { user } = useAppSelector(state=>state.app);
  const isForceShow = useMemo(()=>user?false:true, [user]);

  const dispath = useAppDispatch();

  const onSignIn = (data: TGoogleAuthRes)=>{
    const googleData = jwtDecode<TGoogleAuthData>(data.credential);

    const tempUser: TUser = {} as TUser;
    tempUser.name = googleData.name;
    tempUser.firstName = googleData.given_name;
    tempUser.secondName = googleData.family_name;
    tempUser.email = googleData.email;
    tempUser.id = googleData.sub;

    dispath(setUser(tempUser));
  };


  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <SignInWithGoogleBtn onSuccess={onSignIn} isForceShow={isForceShow}/>
        {
          user&&
          <GameComp />
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
