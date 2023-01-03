
const mainCanvas = document.getElementById("main-canvas");
const context = mainCanvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
const btnGuardar = document.querySelector(".btn-send");
let initialX;
let initialY;
const dibujar = (cursorX, cursorY) => {

  context.beginPath();
  context.moveTo(initialX, initialY);
  context.lineWith = 120;
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
  mainCanvas.addEventListener("mousemove", mouseMoving);
};

const mouseMoving = (e) => {
  dibujar(e.offsetX, e.offsetY);
};

const mouseUp = () => {
  mainCanvas.removeEventListener("mousemove", mouseMoving);
};

mainCanvas.addEventListener("mousedown", mouseDown);
mainCanvas.addEventListener("mouseup", mouseUp);

const guardarImagen = async () => {

  var imagen = mainCanvas.toDataURL()//.replace("image/png", "image/octet-stream");

  let b64 = imagen.slice(imagen.indexOf(',') + 1);
  const fd = new FormData();
  fd.append("user", 1);
  fd.append("firma", b64);
  const rta = axios.post("http://127.0.0.1:8000/file", fd).then(res => {
    console.log(res.data); 
  if (res.data==0) {
      console.log('No coincide');
    } else {
      console.log('Coincide');
    }
  })
};

const descargarImagen = () => {
  let enlace = document.createElement('a');
  // El título
  enlace.download = "Canvas como imagen.jpg";

  enlace.href = mainCanvas.toDataURL();
  // Hacer click en él
  enlace.click();
}
btnGuardar.addEventListener("click", guardarImagen);
