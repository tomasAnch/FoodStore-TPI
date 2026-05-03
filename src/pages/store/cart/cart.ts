import type { CartItem } from "../../../types/product";
import { logout } from "../../../utils/auth";
import { getCart, saveCart } from "../../../utils/cartLocalStorage";

const renderCart = (items: CartItem[]): void => {

    const cartList = document.getElementById("cartList") as HTMLDivElement;
    cartList.innerHTML = '';

    const emptyCart = document.getElementById("emptyCart") as HTMLDivElement;
    const cartSummary = document.getElementById("cartSummary") as HTMLElement;

    if (items.length === 0) {
        emptyCart.style.display = "flex";
        cartSummary.style.display = "none";
    } else {
        emptyCart.style.display = "none";
        cartSummary.style.display = "block";
    }

    items.forEach((item) => {
        const div = document.createElement('div');
        div.className = "cart-item";
        div.innerHTML = `
            <div class="cart-item__info">
                <p class="cart-item__name">${item.product.nombre}</p>
                <p>${item.product.precio}</p>
                <p>${item.quantity}</p>
            </div>
            <button class="cart-item__remove" data-id="${item.product.id}">🗑️</button>

        `;

        const removeBtn = div.querySelector(".cart-item__remove") as HTMLButtonElement;
        removeBtn.addEventListener("click", () => {
            const carrito = getCart();
            const nuevoCarrito = carrito.filter((i) => i.product.id !== item.product.id);
            saveCart(nuevoCarrito);
            renderCart(nuevoCarrito);
            calcularTotal(nuevoCarrito);
        });

        cartList.appendChild(div);
    })

}

const calcularTotal = (items: CartItem[]): void => {

    const total = items.reduce((acc, item) => acc + item.product.precio * item.quantity, 0);

    document.getElementById("cartTotal")!.textContent = `$${total}`;
    document.getElementById("cartSubtotal")!.textContent = `$${total}`;

}

const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

const carrito = getCart();
renderCart(carrito);
calcularTotal(carrito);
