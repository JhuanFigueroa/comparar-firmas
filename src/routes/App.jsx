import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import '../styles/global.scss';
import Home from "@components/Home";
import Layout from "../pages/Layout";
import Comparar from "@components/Comparar";
import Crear from "@components/Crear";
import ListUsers from "@components/ListUsers";

const App=()=>{
    return (

        <Router>
            
            <Layout>
                <Routes>
                <Route exact path="/" element={<Home/>} />
                    <Route exact path="/crear" element={<Crear/>} />
                    <Route exact path="/listar" element={<ListUsers/>} />
                    <Route exact path="/comparar/:id" element={<Comparar/>} />
	          </Routes>
            </Layout>
        </Router>

    );
}

export default App;