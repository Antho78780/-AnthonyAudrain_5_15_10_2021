
/////////////// RECUPERATION DU LOCALSTORAGE DES PRODUITS EN QUESTION DANS LE PANIER ////////////////////
const recupLocalStorage = JSON.parse(localStorage.getItem("panier"));
const additionPrixEtQuantite = (accumulator, currentValue) => accumulator + currentValue;

const arrayPrice = [];
const arrayQuantity = [];

///////////// AJOUT DE TOUTE LES OPTIONS DU PRODUIT DANS UNE BOUCLE //////////////////

for (let panier of recupLocalStorage) {
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
}
console.log(recupLocalStorage)
const totalPrice = arrayPrice.reduce(additionPrixEtQuantite);
const totalQuantite = arrayQuantity.reduce(additionPrixEtQuantite);


document.querySelector("#totalPrice").innerHTML = `${totalPrice}`;
document.querySelector("#totalQuantity").innerHTML = `${totalQuantite}`;

const recupFormulaire = document.querySelector(".cart__order__form");
const envoyerCommande = document.querySelector("#order");


    envoyerCommande.addEventListener("click", function(event) {
        event.preventDefault();
    
        const contact = {
            firstName: recupFormulaire[0].value,
            lastName: recupFormulaire[1].value,
            address: recupFormulaire[2].value,
            city: recupFormulaire[3].value,
            email: recupFormulaire[4].value,
        }
        const products = []; 

        for (let recupId of recupLocalStorage) {
            products.push(recupId.id);
        }
        const obj = {
            contact,
            products,
        }

        console.log(obj)

        const requestPost = fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        console.log(requestPost);
        requestPost.then (reponse => reponse.json())
        .then (data => {
            console.log(data);
        })
    })


   






    
    















   




     
    
   








