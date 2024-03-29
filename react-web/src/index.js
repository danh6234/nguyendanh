import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from "react-toastify";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store,{persistor} from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import  LoadingBar  from 'react-redux-loading-bar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <PersistGate loading= {null} persistor={persistor}>
        <React.StrictMode>  
            <LoadingBar updateTime={100} className='bg-danger' style={{height: "2px"}}/>
            <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
            />
          <App />  
        </React.StrictMode>
      </PersistGate>
    </Provider>  
  </>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
