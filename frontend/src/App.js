import logo from './logo.svg';
import './App.css';
import * as react from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Routes ,BrowserRouter as Router , Route , Link}from 'react-router-dom';
import CreateProduct from './components/create.component'
import LisProduct from './components/list.component'
import EditProduct from './components/edit.component'

function App() {
  return (
    <Router>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to={"/"}>Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={"/"}>products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={"/product/create"}>create</Link>
                </li>
              </ul>
              
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/product/create" element={<CreateProduct />}></Route>
          <Route path="/product/edit/:id" element={<EditProduct />}></Route>
          <Route path="/" element={<LisProduct />}></Route>
        </Routes>
     </Router>
  );
}

export default App;
