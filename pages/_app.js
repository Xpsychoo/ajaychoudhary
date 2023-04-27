import '@/styles/Styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { store } from '../store/store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return <>
    <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#fff',
            color: '#000',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <Component {...pageProps} />
    </Provider>
  </>
}
