import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/store';
import Layoute from '../layouts/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layoute>
        <Component {...pageProps} />
      </Layoute>
    </Provider>
  )
}

export default MyApp
