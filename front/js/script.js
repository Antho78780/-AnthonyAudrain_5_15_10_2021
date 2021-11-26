//////////// recuperation de l'api pour afficher touts les produits sur la page d'acceuil ///////////
const requeteGet = fetch(`http://localhost:3000/api/products`);
requeteGet
////// reponse de l'api qui va afficher touts les produits sur la page d'acceuil
.then(reponse => reponse.json())
.then(productArray => {
    console.log("Affichage de tout les produits")
    console.log(productArray);
    ///// Boucle de la réponse de l'api qui va permettre d'insérer de l'html pour afficher tout les produits.
    for (let product of productArray) {
        document.querySelector('#items').innerHTML +=
        `<a href="./product.html?id=${product._id}"><article><img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productname>"${product.name}"</h3><p class="productDescription">"${product.description}"</p></article></a>`
    };
});
   













