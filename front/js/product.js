
const idProduct = new URLSearchParams(window.location.search);
const id = idProduct.get("id");
const requete = fetch(`http://localhost:3000/api/products/${id}`);
requete.then (reponse => reponse.json())
    .then (product => {
        console.log(product);
        document.querySelector(".item__img").innerHTML =`<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        document.querySelector("#title").innerHTML =`${product.name}`;
        document.querySelector("#price").innerHTML =`${product.price}`;
        document.querySelector("#description").innerHTML =`${product.description}`;
        const quantite = document.querySelector('#quantity');
        const sendPanier = document.querySelector("#addToCart");
        console.log(sendPanier);
        const recupColors =  document.querySelector("#colors");
        product.colors.forEach(color => {
            document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`
        });
        sendPanier.addEventListener("click", function(event) {
            event.preventDefault();
            const IdColorsQuantiteDuProduit = {
                id,
                choixColors: recupColors.value,
                quantite,
            }
            IdColorsQuantiteDuProduit;
            console.log(IdColorsQuantiteDuProduit);
        })
    })


 
 






