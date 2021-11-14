
/////////////// RECUPERATION DU LOCALSTORAGE DES PRODUITS EN QUESTION DANS LE PANIER ////////////////////
const recupLocalStorage = JSON.parse(localStorage.getItem("panier"));
const additionPrixEtQuantite = (accumulator, currentValue) => accumulator + currentValue;

const arrayPrice = [];
const arrayQuantity = [];

///////////// AJOUT DE TOUTE LES OPTIONS DU PRODUIT DANS UNE BOUCLE //////////////////
recupLocalStorage.forEach(panier => {
    const quantite = parseInt(panier.quantite);
    const total = panier.price * quantite;
    arrayQuantity.push(quantite);
    arrayPrice.push(total);

    document.querySelector("#cart__items").innerHTML += 
    `<article class="cart__item"data-id="${panier.id}"><div class="cart__item__img"><img src="${panier.img}" alt="${panier.altTxt}"></div><div class="cart__item__content">
    <div class="cart__item__content__titlePrice"><h2>${panier.name}</h2><p>${total} €</p></div><div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity"><p>Quantité : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantite}">
    </div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p>
    </div></div></div></article`;

    const localDelete = document.querySelector(".deleteItem");
    localDelete.addEventListener("click", function(event) {
        event.preventDefault();
        alert( "Vous avez supprimé l'article " + panier.name + " du panier");
    })
}); 
const totalPrice = arrayPrice.reduce(additionPrixEtQuantite);
const totalQuantite = arrayQuantity.reduce(additionPrixEtQuantite);

document.querySelector("#totalPrice").innerHTML = `${totalPrice}`;
document.querySelector("#totalQuantity").innerHTML = `${totalQuantite}`;
console.log(recupLocalStorage);

const recupFormulaire = document.querySelector(".cart__order__form");
const recupOrderId = document.querySelector("#orderId");
const envoyerCommande = document.querySelector("#order");


const products = [];

for (let recupLocalStorageId of recupLocalStorage) {
    products.push(recupLocalStorageId.id)
}
envoyerCommande.addEventListener("click", function(event) {
    event.preventDefault();
    const contact = {
        firstName: recupFormulaire[0],
        lastName: recupFormulaire[1],
        address: recupFormulaire[2],
        city: recupFormulaire[3],
        email: recupFormulaire[4],
        products,
    } 
    console.log(contact)
})





const requestPost = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(envoyerCommande),
})








    
    















   




     
    
   








