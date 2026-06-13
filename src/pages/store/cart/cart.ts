import type { CartItem } from "../../../types/product";
import { logout } from "../../../utils/auth";
import { getCart, saveCart } from "../../../utils/cartLocalStorage";

const formatPrice = (price: number): string => {
    return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};

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
            <div class="cart-item__emoji">🍽️</div>
            <div class="cart-item__info">
                <p class="cart-item__name">${item.product.nombre}</p>
                <span class="cart-item__category">${item.product.categorias[0].nombre}</span>
            </div>
            <div class="cart-item__quantity">
                <button class="qty-btn qty-btn--minus" data-id="${item.product.id}">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn qty-btn--plus" data-id="${item.product.id}">+</button>
            </div>
            <span class="cart-item__subtotal">${formatPrice(item.product.precio * item.quantity)}</span>
            <button class="cart-item__remove" data-id="${item.product.id}">🗑️</button>
        `;

        const minusBtn = div.querySelector(".qty-btn--minus") as HTMLButtonElement;
        minusBtn.addEventListener("click", () => {
            const carrito = getCart();
            const itemActual = carrito.find((i) => i.product.id === item.product.id);
            if (itemActual) {
                if (itemActual.quantity > 1) {
                    itemActual.quantity -= 1;
                } else {
                    const index = carrito.indexOf(itemActual);
                    carrito.splice(index, 1);
                }
                saveCart(carrito);
                renderCart(carrito);
                calcularTotal(carrito);
            }
        });

        const plusBtn = div.querySelector(".qty-btn--plus") as HTMLButtonElement;
        plusBtn.addEventListener("click", () => {
            const carrito = getCart();
            const itemActual = carrito.find((i) => i.product.id === item.product.id);
            if (itemActual) {
                itemActual.quantity += 1;
                saveCart(carrito);
                renderCart(carrito);
                calcularTotal(carrito);
            }
        });

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

    document.getElementById("cartTotal")!.textContent = formatPrice(total);
    document.getElementById("cartSubtotal")!.textContent = formatPrice(total);

}

const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

const carrito = getCart();
renderCart(carrito);
calcularTotal(carrito);
