import React, {createRef, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const Comparar=()=>{
    const {id}=useParams()
    const form=useRef()
    const canvas = createRef()
    const [menseje,setMensaje]=useState('')
    const [coincide,setCoincide]=useState(false)
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
        fd.append("user", id);
        fd.append("firma", b64);
        const rta = axios.post("http://127.0.0.1:8000/file", fd).then(res => {
            console.log(res.data);
            if (res.data==0) {
                setMensaje('Las firmas no coinciden')
            } else {
                setCoincide(true)
                setMensaje('Las firmas coinciden')
            }
        })
    };


    useEffect(() => {
        context = canvas.current.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.current.width, canvas.current.height);
    })

    return(
        <div>
            {(menseje!='' && !!coincide) ? (
                <div className="mensaje-alert-succes">
                    <h3>La firma coincide </h3>
                </div>
            ): menseje!='' ?(
                <div className="mensaje-alert-danger">
                    <h3>La firma no coincide </h3>
                </div>
            ):(
                <div></div>
            )}
            <canvas ref={canvas} id="main-canvas" width="400" height="400"
                    onMouseDown={mouseDown}
                    onMouseUp={mouseUp}>

            </canvas>

            <button  className="btn-send" onClick={guardarImagen}>Comparar</button>
        </div>
    );
}

export default Comparar