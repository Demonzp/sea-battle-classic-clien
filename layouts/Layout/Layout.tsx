import React from 'react';
import Footer from '../Footer';
import Header from '../Header';

type Props = {
  children: JSX.Element
}

const Layoute:React.FC<Props> = ({children})=>{
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>


  );
};

export default Layoute;