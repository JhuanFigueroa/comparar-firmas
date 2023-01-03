import React, {useEffect, useState} from "react";
import axios from "axios";
import '../styles/listUsers.scss'
import { Link } from "react-router-dom";
const ListUsers=()=>{
    const [users,setUsers]=useState([])

    const getUsers = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/users');
        let usersList = res.data;
        console.log(usersList);
        setUsers(usersList);
        
      };
    useEffect(()=>{
        getUsers();
    },[])

    return(
        <div className="contenedor">
        <h2>Lista de usuarios</h2> 
        {users.map((user) => (
          <li className="userName" key={user.id}>
            {user.nombre} {user.apellido}
            <section className="botones">
              <Link to={`/comparar/${user.id}`}>Comparar</Link>
             
            </section>
          </li>
        ))}
  
       
      </div>
    );
}
export default ListUsers