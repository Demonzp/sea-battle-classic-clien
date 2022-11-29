import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

export type TGoogleAuthRes = {
  credential: string
}

export type TGoogleAuthData = {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  iat: number;
  family_name: string;
  given_name: string;
  name: string;
  iss: string;
  jti: string;
  nbf: number;
  picture: string;
  sub: string;
}

type TPromptOneTap = {
  isNotDisplayed: ()=>boolean,
  isSkippedMoment: ()=>boolean
};
  
declare global {
  interface Window{
    google:{
      accounts:{
        id:{
          initialize:({
            client_id,
            callback, 
            auto_select,
            state_cookie_domain,
            cancel_on_tap_outside
            }:{
            client_id:string, 
            callback:(data:TGoogleAuthRes)=>void, 
            auto_select?:boolean,
            state_cookie_domain?:string, 
            cancel_on_tap_outside?: boolean
          })=>void,
          renderButton:(div:HTMLDivElement,{theme, size}:{theme:string, size:string})=>void,
          prompt: (data:(data:TPromptOneTap)=>void)=>void,
          disableAutoSelect: ()=>void
        }
      }
    }
  }
}
  
const loadingScript = (src:string)=>{
  return new Promise<boolean>((resolve, reject)=>{
    if(document.querySelector(`script[src="${src}"]`)){
      return resolve(true);
    }
  
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = (err) => reject(err);
    document.body.append(script);
  });
};

type Props = {
  onSuccess: (data:TGoogleAuthRes)=>void;
  isForceShow: boolean;
}

const SignInWithGoogleBtn: React.FC<Props> = ({onSuccess, isForceShow})=>{
  const googleButton = useRef<HTMLDivElement>(null);
  const {data} = useSWR('https://accounts.google.com/gsi/client', loadingScript);

  const [isShowGoogle, setIsShowGoogle] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(()=>{

    if(!data){
      return;
    }

    const id = '1008355361267-fmr73nhrqjafm59p2nt3l07o5ksjnndo.apps.googleusercontent.com';

    const google = window.google;

    google.accounts.id.initialize({
      client_id: id,
      auto_select: false,
      callback: googleCallback,
      cancel_on_tap_outside: false
    });

    google.accounts.id.prompt(oneTapStatusCallback);

    googleButton.current!.hidden = true;

    google.accounts.id.renderButton(
      googleButton.current!,
      {theme: 'outline', size: 'large'}
    );

    setLoaded(true);
  }, [data]);

  useEffect(()=>{
    if(isShowGoogle){
      googleButton.current!.hidden = false;
    }else{
      googleButton.current!.hidden = true;
    }
  }, [isShowGoogle]);

  useEffect(()=>{
    if(isForceShow && isLoaded){
      setIsShowGoogle(true);
    }
  }, [isForceShow]);

  const googleCallback = (data:TGoogleAuthRes)=>{
    console.log('data = ', data);
    setIsShowGoogle(false);
    onSuccess(data);
  }

  const oneTapStatusCallback = (data: TPromptOneTap)=>{
    //console.log('nativeCallback = ', data);
    if(data.isNotDisplayed()||data.isSkippedMoment()){
      setIsShowGoogle(true);
    }else{
      setIsShowGoogle(false);
    }
  }

  

  return (
    <>
      <div ref={googleButton}></div>
    </>
      
      // <div className="g_id_signout">
      //   <button>Sign Out</button>
      // </div>
  )
};

export default SignInWithGoogleBtn;

// export const getStaticProps = async () => {
//   const src = 'https://accounts.google.com/gsi/client';

//   await loadingScript(src);

//   return {};
// };