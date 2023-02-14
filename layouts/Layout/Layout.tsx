import React from 'react';
import { useAppSelector } from '../../store/hooks';
import Footer from '../Footer';
import Header from '../Header';

type Props = {
  children: JSX.Element
}

const Layoute: React.FC<Props> = ({ children }) => {
  const {user, isConnected, isConnect} = useAppSelector(state=>state.app);
  
  return (
    <>
      {
        ((!isConnected&&!isConnect)||!user)&&
        <div className='videoWrapper'>
          <video
            className="bgVideod"
            autoPlay
            loop={true}
            muted
          >
            <source
              src="./background-video.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      }

      <div className="mainWraper">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>

  );
};

export default Layoute;