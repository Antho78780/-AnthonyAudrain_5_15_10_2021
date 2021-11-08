
const idProduct = new URLSearchParams(window.location.search);
const _id = idProduct.get("id");
const requete = fetch(`http://localhost:3000/api/products/${_id}`);
requete.then (reponse => reponse.json())
    .then (product => {
        console.log(product);
        document.querySelector(".item__img").innerHTML =`<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        document.querySelector("#title").innerHTML =`${product.name}`;
        document.querySelector("#price").innerHTML =`${product.price}`;
        document.querySelector("#description").innerHTML =`${product.description}`;

        const quantite = document.querySelector('#quantity');
        const sendPanier = document.querySelector("#addToCart");
        const recupColors =  document.querySelector("#colors");
        const productArray = []

        product.colors.forEach(color => {
            document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`
        });

        sendPanier.addEventListener("click", function(event) {
            event.preventDefault();
            const IdColorsQuantiteDuProduit = {
                Id: product._id,
                Colors: recupColors.value,
                Quantite: quantite.value,
            }
            productArray.push(IdColorsQuantiteDuProduit);
            localStorage.setItem("option_produit", JSON.stringify(productArray));
            const getLocal = JSON.parse(localStorage.getItem("option_produit"));
            console.log(getLocal);
        })
    })


 
 






