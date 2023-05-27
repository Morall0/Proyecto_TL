const canvas = document.getElementById("canvas");
const ctx2d = canvas.getContext("2d");

const coordenadas = [[100, 100], [400, 100], [400, 400], [100, 400]];

const rotacion = []

ctx2d.beginPath();
    ctx2d.strokeStyle = "white";

    ctx2d.moveTo(100, 100);
    ctx2d.lineTo(400, 100);
    ctx2d.lineTo(400, 400);
    ctx2d.lineTo(100, 400);
    ctx2d.lineTo(100, 100);

    ctx2d.fill();
    ctx2d.stroke();
ctx2d.closePath();
