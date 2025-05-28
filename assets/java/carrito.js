const listaCarrito = document.getElementById("lista-carrito");
const total = document.getElementById("total");
let totalCarrito = 0;
const carrito = {};

function agregarAlCarrito(nombre, precio) {
const clave = `${nombre} - $${precio.toLocaleString()} COP`;

if (!carrito[clave]) {
    carrito[clave] = { nombre, precio, cantidad: 0 };
}
carrito[clave].cantidad++;

renderizarCarrito();
}

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
}

document.querySelectorAll(".sabores button").forEach(btn => {
btn.addEventListener("click", () => {
    const nombre = btn.dataset.nombre;
    const precio = parseInt(btn.dataset.precio);
    agregarAlCarrito(nombre, precio);
});
});

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

const url = `https://wa.me/573197336609?text=${encodeURIComponent(mensaje)}`;
window.open(url, "_blank");
});
