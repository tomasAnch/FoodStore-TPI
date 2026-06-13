import { getCategories, PRODUCTS } from '../../../data/data';
import type { Product } from "../../../types/product";
import { logout } from '../../../utils/auth';
import { getCart, saveCart } from '../../../utils/cartLocalStorage';

const mostrarToast = (): void => {
    const toast = document.getElementById("toast") as HTMLDivElement;
    toast.classList.add("toast--show");
    setTimeout(() => {
        toast.classList.remove("toast--show");
    }, 2000);
};

const actualizarBadge = (): void => {
    const cart = getCart();
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    const badge = document.getElementById("cartBadge") as HTMLSpanElement;
    badge.textContent = String(total);
};

const renderProducts = (products: Product[]): void => {

    const productsGrid = document.getElementById("productsGrid") as HTMLDivElement;
    productsGrid.innerHTML = '';

    products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-card__img-wrap">
                <img class="product-card__img" src="/images/${product.imagen}" alt="${product.nombre}" />
            </div>
            <div class="product-card__body">
                <span class="product-card__category">${product.categorias[0].nombre}</span>
                <h3 class="product-card__name">${product.nombre}</h3>
                <p class="product-card__desc">${product.descripcion}</p>
                <div class="product-card__footer">
                    <div class="product-card__price"><span>$</span>${product.precio}</div>
                    <button class="add-to-cart-btn">🛒</button>
                </div>
            </div>
        `;

        const btn = card.querySelector(".add-to-cart-btn") as HTMLButtonElement;
        btn.addEventListener("click", () => {
            const carrito = getCart();
            const itemExistente = carrito.find((item) => item.product.id === product.id);
            if (itemExistente) {
                itemExistente.quantity += 1;
            } else {
                carrito.push({ product: product, quantity: 1 });
            }

            saveCart(carrito);
            actualizarBadge()
            mostrarToast();

        });

        productsGrid.appendChild(card);
    });

    const emptyState = document.getElementById("emptyState") as HTMLDivElement;
    if (products.length === 0) {
        emptyState.style.display = "flex";
    } else {
        emptyState.style.display = "none";
    }

};

const renderCategories = (): void => {

    const categories = getCategories();
    const categoryList = document.getElementById("categoryList") as HTMLUListElement;

    categories.forEach((category) => {
        const li = document.createElement("li");
        li.className = "category-item";
        li.textContent = category.nombre;
        li.dataset.id = String(category.id);

        li.addEventListener("click", () => {
            document.querySelectorAll(".category-item").forEach((el) => el.classList.remove("category-item--active"));
            li.classList.add("category-item--active");
            const filtered = PRODUCTS.filter(
                (p) => p.categorias[0].nombre === category.nombre
            );
            renderProducts(filtered);
        });

        categoryList.appendChild(li);
    });

    const todosBtn = document.querySelector('[data-id="all"]') as HTMLLIElement;
    todosBtn.addEventListener("click", () => {
        document.querySelectorAll(".category-item").forEach((el) => el.classList.remove("category-item--active"));
        todosBtn.classList.add("category-item--active");
        renderProducts(PRODUCTS);
    });

};

const buscador = (): void => {
    const searchInput = document.getElementById("searchInput") as HTMLInputElement;

    searchInput.addEventListener('input', () => {

        const query = searchInput.value.toLowerCase();
        const filtered = PRODUCTS.filter((p) => {
            return p.nombre.toLowerCase().includes(query);
        });
        renderProducts(filtered);
    })
};

const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

renderProducts(PRODUCTS);
renderCategories();
buscador();
actualizarBadge();