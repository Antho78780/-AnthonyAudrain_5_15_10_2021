//////////// AJOUT DE TOUT LES PRODUITS DUR LA PAGE D'ACCEUIL///////////
const requeteGet = fetch(`http://localhost:3000/api/products`);
requeteGet
.then(reponse => reponse.json())
.then(productArray => {
    console.log("Affichage de tout les produits")
    console.log(productArray);
    for (let product of productArray) {
        document.querySelector('#items').innerHTML +=
        `<a href="./product.html?id=${product._id}"><article><img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productname>"${product.name}"</h3><p class="productDescription">"${product.description}"</p></article></a>`
    };
});
   













