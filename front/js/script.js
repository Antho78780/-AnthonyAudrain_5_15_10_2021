//////////// recuperation de l'api pour afficher touts les produits sur la page d'acceuil ///////////
function recupApi() {
    fetch(`http://localhost:3000/api/products`)
    .then(res => res.json())
    .then(productArray => {
        console.log("Affichage de tout les produits")
        console.log(productArray);
        ///// création d'une boucle pour inserer du code HTML  ////
        for (let product of productArray) {
            document.querySelector('#items').innerHTML +=
            `<a href="./product.html?id=${product._id}"><article><img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productname>"${product.name}"</h3><p class="productDescription">"${product.description}"</p></article></a>`
        };
    });
}
recupApi();

   













