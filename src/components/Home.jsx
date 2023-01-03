import React from "react";
import {useNavigate} from "react-router-dom";

const Home=()=>{
    const navigate=useNavigate()
    const clickRegistrar=()=>{
        navigate('/crear')
    }
    const cliickComparar=()=>{
        navigate('/listar')
    }
    return(
      <div className="container-botones">
            <button className="btn" onClick={clickRegistrar}>Registrar firma</button>
            <button className="btn" onClick={cliickComparar}>Comparar firma</button>
      </div>
    );
}

export default Home