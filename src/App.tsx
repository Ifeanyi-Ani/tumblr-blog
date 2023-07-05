import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Container from "react-bootstrap/esm/Container";
import Home from "./pages/Home";
import { Preview } from "./pages/Preview";
import Dashboard from "./pages/admin/Dashboard";
import AdminNav from "./pages/admin/AdminNav";
import Users from "./pages/admin/Users";
import Posts from "./pages/admin/Posts";

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <BrowserRouter>
          <Container fluid className='page-wrapper p-0'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/blog/:id' element={<Preview />} />
              <Route path='/admin' element={<AdminNav />}>
                <Route index element={<Dashboard />} />
                <Route path='posts' element={<Posts />} />
                <Route path='users' element={<Users />} />
              </Route>
            </Routes>
          </Container>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
