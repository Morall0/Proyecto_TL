// Funcion que aplica la T de rotacion a un arreglo de coordenadas.
/*function transformacionRot(coords, ang) {
    const mat_rotacion = [0, [Math.cos(ang), -Math.sin(ang)],
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
}*/

// Funcion que aplica la T de rotacion a un arreglo de coordenadas.
function transformacionRot3D(coords, ang, A) {
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

function transformacionR3aR2(coords) {
    coords_2d=[];
    coords.forEach((coord)=>{
        coords_2d.push([coord[0], coord[1]]);
    });
    return coords_2d
}

// Funcion que dibuja las figuras en el canvas
function dibuja2d (ctx, coords) {
    ctx.beginPath();
        ctx.strokeStyle = "white"; // Color de borde
        ctx.moveTo(coords[0][0] + 250 , coords[0][1] + 250); // Situa el punto de partida la figura

        for(let i=1; i<coords.length; i++) { // for que dibuja las aristas
            ctx.lineTo(coords[i][0] + 250, coords[i][1] + 250);
        }

        ctx.lineTo(coords[0][0] + 250, coords[0][1] + 250); // Cierra la figura con el punto de partida

        ctx.stroke(); // Dibuja el borde
    ctx2d.closePath();
}

const canvas = document.getElementById("canvas"); // Se enlaza el canvas del html.
const ctx2d = canvas.getContext("2d"); // Obteniendo el contexto (se trabaja en un plano 2d)

const coords=[[-150, 150, 150],[150, 150, 150],[150, -150, 150],[-150, -150, 150], [-150, 150, -150],[150, 150, -150],[150, -150, -150],[-150, -150, -150]];

let cubo = {
    cara_i: [[-150, 150, 150],[150, 150, 150],[150, -150, 150],[-150, -150, 150]],
    cara_s: [[-150, 150, -150],[150, 150, -150],[150, -150, -150],[-150, -150, -150]],
    cara_izq: [[-150, 150, 150], [-150, 150, -150], [-150, -150, -150],[-150, -150, 150]],
    cara_der: [[150, 150, 150], [150, 150, -150], [150, -150, -150],[150, -150, 150]],
    
    dibujaCubo(ctx, ang, M) {
        this.cara_i = transformacionRot3D(this.cara_i, ang, M);
        this.cara_s = transformacionRot3D(this.cara_s, ang, M);
        this.cara_izq = transformacionRot3D(this.cara_izq, ang, M);
        this.cara_der = transformacionRot3D(this.cara_der, ang, M);
        ctx.clearRect(0, 0, 500, 500);
        dibuja2d(ctx, transformacionR3aR2(this.cara_i));
        dibuja2d(ctx, transformacionR3aR2(this.cara_s));
        dibuja2d(ctx, transformacionR3aR2(this.cara_izq));
        dibuja2d(ctx, transformacionR3aR2(this.cara_der));
    }
}

const input_a = document.getElementById("alpha"); 
const input_b = document.getElementById("beta"); 
const input_g = document.getElementById("gamma"); 

cubo.dibujaCubo(ctx2d, 0, [[1, 0, 0], [0, 0, 1], [0, 1, 0]]);

input_a.addEventListener("input", () => { // Detecta el cambio en el angulo.
    const ang = (input_a.value/180 )* Math.PI; // Obteniendo el angulo y convirtiendolo a radianes
    
    console.log(ang)
    // Matriz que rota con respecto al eje x
    const mat_rotacion_x = [[1, 0, 0],      
                            [0, Math.sin(ang), Math.cos(ang)],
                            [0, Math.cos(ang), -Math.sin(ang)]];

    console.log(mat_rotacion_x)

    cubo.dibujaCubo(ctx2d, ang, mat_rotacion_x);
});

input_b.addEventListener("input", () => { // Detecta el cambio en el angulo.
    const ang = (input_b.value/180 )* Math.PI; // Obteniendo el angulo y convirtiendolo a radianes
    
    // Matriz que rota con respecto al eje y
    const mat_rotacion_y = [[Math.cos(ang), 0, Math.sin(ang)],
                        [0, 1, 0],
                        [-Math.sin(ang), 0, Math.cos(ang)]];

    cubo.dibujaCubo(ctx2d, ang, mat_rotacion_y);
});

input_g.addEventListener("input", () => { // Detecta el cambio en el angulo.
    const ang = (input_g.value/180 )* Math.PI; // Obteniendo el angulo y convirtiendolo a radianes

    // Matriz que rota con respecto al eje z 
    const mat_rotacion_z = [[Math.cos(ang),  -Math.sin(ang), 0], 
                            [Math.sin(ang), Math.cos(ang), 0],
                            [0, 0, 1]];

    cubo.dibujaCubo(ctx2d, ang, mat_rotacion_z);
});
