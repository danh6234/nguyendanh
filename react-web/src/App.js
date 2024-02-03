import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import Defaultlayout from './container/Default';
import DefaultMain from '../src/container/main/DefaultMain';
import DefaultlayoutMember from '../src/container/member/DefaultMem';
import Login from './page/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultlayoutEmploy from '../src/container/employ/DefaultEmploy'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/main/*' element={<DefaultMain />} public />
        <Route path='/member/*' element={<DefaultlayoutMember />} />
        <Route path='/employ/*' element={<DefaultlayoutEmploy />} />
        <Route path='/*' element={<Defaultlayout />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
