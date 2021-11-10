
const getLocal = JSON.parse(localStorage.getItem("panier"));
console.log(getLocal)
for (let product of getLocal){
    const cart_items = document.querySelector("#cart__items").innerHTML += 
    `<article class="cart__item"data-id="${product.id}"><div class="cart__item__img"><img src="${product.img}" alt="${product.altTxt}"></div><div class="cart__item__content">
    <div class="cart__item__content__titlePrice"><h2>${product.name}</h2><p>${product.price} €</p></div><div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity"><p>Quantité : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantite}">
    </div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p>
    </div></div></div></article`;
}

