const listaCarrito = document.getElementById("lista-carrito");
const total = document.getElementById("total");
let totalCarrito = 0;
const carrito = {};

// Agrega al carrito
function agregarAlCarrito(nombre, precio) {
    const clave = `${nombre} - $${precio.toLocaleString()} COP`;

    if (!carrito[clave]) {
        carrito[clave] = { nombre, precio, cantidad: 0 };
    }
    carrito[clave].cantidad++;

    renderizarCarrito();
}

// Actualiza contador superior
function actualizarContadorCarrito() {
    let cantidad = 0;
    for (const clave in carrito) {
        cantidad += carrito[clave].cantidad;
    }
    const contador = document.getElementById("contador-carrito");
    const contadorMobile = document.getElementById("contador-carrito-mobile");

    if (contador) contador.textContent = cantidad;
    if (contadorMobile) contadorMobile.textContent = cantidad;
}

// Dibuja el carrito
function renderizarCarrito() {
    listaCarrito.innerHTML = "";
    totalCarrito = 0;

    for (const clave in carrito) {
        const item = carrito[clave];
        const li = document.createElement("li");
        li.innerHTML = `${item.cantidad} × ${item.nombre} - $${(item.precio * item.cantidad).toLocaleString()} COP <button class="eliminar">❌</button>`;

        li.querySelector(".eliminar").addEventListener("click", () => {
            item.cantidad--;
            if (item.cantidad <= 0) {
                delete carrito[clave];
            }
            renderizarCarrito();
        });

        listaCarrito.appendChild(li);
        totalCarrito += item.precio * item.cantidad;
    }

    total.textContent = totalCarrito.toLocaleString();
    actualizarContadorCarrito();
}

// Botones de productos
document.querySelectorAll(".sabores button").forEach(btn => {
    btn.addEventListener("click", () => {
        const nombre = btn.dataset.nombre;
        const precio = parseInt(btn.dataset.precio);
        agregarAlCarrito(nombre, precio);
    });
});

// Botón comprar
const botonComprar = document.getElementById("comprar");
botonComprar.addEventListener("click", () => {
    if (Object.keys(carrito).length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "Hola Don Jaime, estoy interesado en comprar:\n";
    for (const clave in carrito) {
        const item = carrito[clave];
        mensaje += `- ${item.cantidad} × ${item.nombre}\n`;
    }
    mensaje += `\nTotal a pagar: $${totalCarrito.toLocaleString()} COP`;

    const url = `https://wa.me/573105371374?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
});

// Ícono carrito (para hacer scroll)
const iconoCarrito = document.getElementById("icono-carrito");
if (iconoCarrito) {
    iconoCarrito.addEventListener("click", () => {
        document.querySelector(".carrito").scrollIntoView({ behavior: 'smooth' });
    });
}

const iconoCarritoMobile = document.getElementById("icono-carrito-mobile");
if (iconoCarritoMobile) {
    iconoCarritoMobile.addEventListener("click", () => {
        document.querySelector(".carrito").scrollIntoView({ behavior: 'smooth' });
    });
}

// Menú hamburguesa
const menuToggle = document.getElementById("menu-toggle");
if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        document.querySelector(".nav-menu").classList.toggle("active");
    });
}