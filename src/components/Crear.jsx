import React, {createRef, useEffect, useRef} from "react";
import '../styles/crear.scss'
import axios from "axios";
import {useNavigate} from "react-router-dom";
const Crear = () => {
    const navigate=useNavigate()
    const form = useRef(null)
    const canvas = createRef()
    let context;
    let initialX;
    let initialY;

    const dibujar = (cursorX, cursorY) => {
        context.beginPath();
        context.moveTo(initialX, initialY);
        context.lineWith = 30;
        context.strokeStyle = "#000";
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineTo(cursorX, cursorY);
        context.stroke();
        initialX = cursorX;
        initialY = cursorY;
    };

    const mouseDown = (e) => {
        initialX = e.offsetX;
        initialY = e.offsetY;
        dibujar(initialX, initialY);

        canvas.current.addEventListener("mousemove", mouseMoving);
    };

    const mouseMoving = (e) => {
        dibujar(e.offsetX, e.offsetY);
    };

    const mouseUp = () => {

        canvas.current.removeEventListener("mousemove", mouseMoving);
    };

    const guardarImagen = async (e) => {
 		e.preventDefault()
        var imagen = canvas.current.toDataURL()//.replace("image/png", "image/octet-stream");

        let b64 = imagen.slice(imagen.indexOf(',') + 1);

        const fd = new FormData(form.current);

        const rta= axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/users/create",
            data: {
                nombre: fd.get('nombre'),
                apellido: fd.get('apellido'),
                email: fd.get('email'),
                firma: b64
            },
            headers: { "Content-Type": "multipart/form-data" },
        })


        navigate('/')
    };


    useEffect(() => {
        context = canvas.current.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.current.width, canvas.current.height);
    })

    return (
        <div>
            <h2>Registrar Usuario</h2>
            <form className="form-crear" onSubmit={guardarImagen} ref={form}>
                <label htmlFor="nombre">Nombre:</label>
                <input name="nombre"/>

                <label htmlFor="apellido">Apellido:</label>
                <input name="apellido"/>

                <label htmlFor="email">Correo:</label>
                <input name="email"/>

                <canvas ref={canvas} id="main-canvas" width="400" height="400"
                        onMouseDown={mouseDown}
                        onMouseUp={mouseUp}>

                </canvas>

                <button type={"submit"} className="btn-send">Registrar</button>
            </form>
        </div>
    );
}

export default Crear
