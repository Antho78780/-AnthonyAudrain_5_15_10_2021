/////////////// RECUPERATION DU LOCALSTORAGE DES PRODUITS EN QUESTION DANS LE PANIER ////////////////////
const recupLocalStorage = JSON.parse(localStorage.getItem("panier"));

///////////// AJOUT DE TOUTE LES OPTIONS DU PRODUIT DANS UNE BOUCLE //////////////////
for (let product of recupLocalStorage){
    const cart_items = document.querySelector("#cart__items").innerHTML += 
    `<article class="cart__item"data-id="${product.id}"><div class="cart__item__img"><img src="${product.img}" alt="${product.altTxt}"></div><div class="cart__item__content">
    <div class="cart__item__content__titlePrice"><h2>${product.name}</h2><p>${product.price} €</p></div><div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity"><p>Quantité : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantite}">
    </div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p>
    </div></div></div></article`;
    console.log(product);

    const localDelete = document.querySelector(".deleteItem");
    console.log(localDelete)
    
    localDelete.addEventListener("click", function() {
        alert( "Vous avez supprimé l'article " + product.name + " du panier")
    })



     
    
   
}







