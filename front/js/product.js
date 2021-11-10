
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

        const recupQuantite = document.querySelector('#quantity');
        const sendPanier = document.querySelector("#addToCart");
        const recupColors =  document.querySelector("#colors");

        product.colors.forEach(color => {
            document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`
        });

        sendPanier.addEventListener("click", function() {
            alert(" Vous avez ajouté l'article " + product.name + " au panier");
            let idColorsQuantiteDuProduit =  {
                name: product.name,
                description: product.description,
                altTxt: product.altTxt,
                img: product.imageUrl,
                price: product.price,
                id: product._id,
                colors:   recupColors.value,
                quantite: recupQuantite.value,
            }
            let array = [];
            array = JSON.parse(localStorage.getItem("panier"));
            if(array) {
                array.push(idColorsQuantiteDuProduit);
                localStorage.setItem("panier", JSON.stringify(array));   
            }
            else {
                array = [];
                array.push(idColorsQuantiteDuProduit);
                localStorage.setItem("panier", JSON.stringify(array)); 
            }  
        })

    })
    


 
 






