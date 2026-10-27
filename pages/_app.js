import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/Styles.scss';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from '@/store/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Component {...pageProps} />
    </Provider>
  );
}
