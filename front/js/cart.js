const requete = fetch("http://localhost:3000/api/products/");
requete.then (reponse => reponse.json())
    .then (product => {
        console.log(product);
    })
const getLocal = JSON.parse(localStorage.getItem("panier"));
console.log(getLocal)
const recupCart = document.querySelector("#cart__items").innerHTML = 
`<article class="cart__item"data-id=""><div class="cart__item__img"><img src="" alt=""></div><div class="cart__item__content"><div class="cart__item__content__titlePrice">
<h2></h2><p></p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté : </p>
<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=""></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p>
</div></div></div></article`;
console.log(recupCart);

