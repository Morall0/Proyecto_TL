// Funcion que aplica la T de rotacion a un arreglo de coordenadas.
function transformacionRot(coords, ang) {
    const mat_rotacion = [[Math.cos(ang), -Math.sin(ang)],
                          [Math.sin(ang),  Math.cos(ang)]];
    const A = mat_rotacion;

    let nuevas_coords= JSON.parse(JSON.stringify(coords)); // Se saca la copia de las coordenadas originales.

    coords.forEach((B, index) => { // Por cada par de coordenadas...
        for(let n=0; n<A.length; n++) { // Itera filas de matriz A
            let suma = 0;
            for(let m=0; m<B.length; m++) { // Itera filas de A y filas de B
                suma+=A[n][m]*B[m];
            }
            nuevas_coords[index][n] = suma;
        }
    });

    return nuevas_coords;
}


// Funcion que dibuja las figuras en el canvas
function dibuja2d (ctx, coords) {
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
        ctx.strokeStyle = "white"; // Color de borde
        ctx.moveTo(coords[0][0] + 250 , coords[0][1] + 250); // Situa el punto de partida la figura

        for(let i=1; i<coords.length; i++) { // for que dibuja las aristas
            ctx.lineTo(coords[i][0] + 250, coords[i][1] + 250);
        }

        ctx.lineTo(coords[0][0] + 250, coords[0][1] + 250); // Cierra la figura con el punto de partida

        ctx.fill(); // Rellena la figura
        ctx.stroke(); // Dibuja el borde
    ctx2d.closePath();

}

const canvas = document.getElementById("canvas"); // Se enlaza el canvas del html.
const ctx2d = canvas.getContext("2d"); // Obteniendo el contexto (se trabaja en un plano 2d)

const coords = [[-150, -150], [150, -150], [150, 150], [-150, 150]]; // Coordenadas de los vertices de la figura (2d)
const input_ang = document.getElementById("ang"); // Toma el valor del input (de 0 a 360)

dibuja2d(ctx2d, coords); // Se dibuja la figura inicial.

input_ang.addEventListener("input", () => { // Detecta el cambio en el angulo.
    ang = (input_ang.value/180 )* Math.PI; // Obteniendo el angulo y convirtiendolo a radianes

    const nuevas_coords = transformacionRot(coords, ang); // Aplica la rotacion.
    
    dibuja2d(ctx2d, nuevas_coords); // Redibuja la figura.
});
