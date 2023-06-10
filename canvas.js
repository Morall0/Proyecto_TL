// Funcion que aplica la T de rotacion a un arreglo de coordenadas.
function transformacionRot3D(coords, a, b, g) {
    let nuevas_coords= JSON.parse(JSON.stringify(coords)); // Se saca la copia de las coordenadas originales.

    // Matriz de rotacion que surge a partir de la composicion de las 3 matrices de rotacion
    const A = [[Math.cos(b)*Math.cos(g), -Math.cos(b)*Math.sin(g), Math.sin(b)],
             [Math.sin(a)*Math.sin(g)-Math.cos(a)*Math.sin(b)*Math.cos(g), Math.cos(a)*Math.sin(b)*Math.sin(g)+Math.sin(a)*Math.cos(g), Math.cos(a)*Math.cos(b)],
             [Math.sin(a)*Math.sin(b)*Math.cos(g)+Math.cos(a)*Math.sin(g), Math.cos(a)*Math.cos(g)-Math.sin(a)*Math.sin(b)*Math.sin(g), -Math.sin(a)*Math.cos(b)]];

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

// T:R3->R2 donde T(x, y, z) = (x, y)
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
        ctx.moveTo(coords[0][0] + 350 , coords[0][1] + 350); // Situa el punto de partida la figura

        for(let i=1; i<coords.length; i++) { // for que dibuja las aristas
            ctx.lineTo(coords[i][0] + 350, coords[i][1] + 350);
        }

        ctx.lineTo(coords[0][0] + 350, coords[0][1] + 350); // Cierra la figura con el punto de partida

        ctx.stroke(); // Dibuja el borde
    ctx2d.closePath();
}

const canvas = document.getElementById("canvas"); // Se enlaza el canvas del html.
const ctx2d = canvas.getContext("2d"); // Obteniendo el contexto (se trabaja en un plano 2d)

// Objeto que almacena las caras del cubo
let cubo = {
    cara_inferior: [[-150, 150, 150],[150, 150, 150],[150, -150, 150],[-150, -150, 150]],
    cara_superior: [[-150, 150, -150],[150, 150, -150],[150, -150, -150],[-150, -150, -150]],
    cara_izquierda: [[-150, 150, 150], [-150, 150, -150], [-150, -150, -150],[-150, -150, 150]],
    cara_derecha: [[150, 150, 150], [150, 150, -150], [150, -150, -150],[150, -150, 150]],
    
    // Dibuja el cubo con las transformaciones y en R2
    dibujaCubo(ctx, a, b, g) {
        let cara_i = transformacionRot3D(this.cara_inferior, a, b, g);
        let cara_s = transformacionRot3D(this.cara_superior, a, b, g);
        let cara_izq = transformacionRot3D(this.cara_izquierda, a, b, g);
        let cara_der = transformacionRot3D(this.cara_derecha, a, b, g);
        ctx.clearRect(0, 0, 700, 700);
        dibuja2d(ctx, transformacionR3aR2(cara_i));
        dibuja2d(ctx, transformacionR3aR2(cara_s));
        dibuja2d(ctx, transformacionR3aR2(cara_izq));
        dibuja2d(ctx, transformacionR3aR2(cara_der));
    }
}

// Inputs de los angulos
const input_a = document.getElementById("alpha"); 
const input_b = document.getElementById("beta"); 
const input_g = document.getElementById("gamma"); 

//Variables que almacenan los angulos
let alpha=0;
let beta=0;
let gamma=0;

// Se dibuja inicialmente el cubo
cubo.dibujaCubo(ctx2d, 0, 0, 0);

// Evento del angulo alpha
input_a.addEventListener("input", () => {
    alpha = (input_a.value/180 )* Math.PI; // Obteniendo el angulo y convirtiendolo a radianes
    cubo.dibujaCubo(ctx2d, alpha, beta, gamma);
});

// Evento del angulo beta
input_b.addEventListener("input", () => {
    beta = (input_b.value/180 )* Math.PI; // Obteniendo el angulo y convirtiendolo a radianes
    cubo.dibujaCubo(ctx2d, alpha, beta, gamma);
});

// Evento del angulo gamma
input_g.addEventListener("input", () => {
    gamma = (input_g.value/180 )* Math.PI; // Obteniendo el angulo y convirtiendolo a radianes
    cubo.dibujaCubo(ctx2d, alpha, beta, gamma);
});
