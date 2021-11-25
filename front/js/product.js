//////////////// CREATION DE l'id DU PRODUIT POUR RENDRE L'ID UNIQUE////////////////////
const idProduct = new URLSearchParams(window.location.search);
const _id = idProduct.get("id");

///////////////// RECUPERATION DE L'API AVEC L'ID POUR AJOUTER TOUTES LES OPTIONS DANS LE PRODUIT EN QUESTION////////////////////
const requete = fetch(`http://localhost:3000/api/products/${_id}`);
requete 
.then (reponse => reponse.json()) /// PROMESSE EN REPONSE JSON
.then (product => { /// AJOUT DES OPTIONS DU PRODUIT DANS LA PROMESSE
    document.querySelector(".item__img").innerHTML =`<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.querySelector("#title").innerHTML =`${product.name}`;
    document.querySelector("#price").innerHTML =`${product.price}`;
    document.querySelector("#description").innerHTML =`${product.description}`;

    const recupQuantite = document.querySelector('#quantity');
    const sendPanier = document.querySelector("#addToCart");
    const recupColors =  document.querySelector("#colors");
    ///// AJOUT DE LA POSSIBILITE D'AFFICHER L'OPTION AVEC TOUTES LES COULEURS/////////
    product.colors.forEach(color => {
        document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`
    });

      //////////// ENVOIE DE MON PRODUIT AU PANIER ET AU LOCALSTORAGE////////////
    sendPanier.addEventListener("click", function(event) {
        event.preventDefault();
        alert(" Vous avez ajouté l'article " + product.name + " au panier");
        let optionsProduit =  {
            name: product.name,
            img: product.imageUrl,
            price: product.price,
            id: product._id,
            colors:   recupColors.value,
            quantite: recupQuantite.value
        }
        let array = [];
        array = JSON.parse(localStorage.getItem("panier"));
        
    
        ////////// AJOUT DE CONDITIONS POUR STOCKER LES PRODUITS DANS LE LOCALSTORAGE//////////////
            if(array) {
                array = array.filter(el => el.id != optionsProduit.id);
                array.push(optionsProduit);
                localStorage.setItem("panier", JSON.stringify(array));                
            }
            else  { 
                array = [];
                array.push(optionsProduit);
                optionsProduit.quantite + optionsProduit.quantite;
                localStorage.setItem("panier", JSON.stringify(array)); 
            }
            console.log("envoie du array dans le localStorage");
            console.log(array)
    })
    const recupLocalStorage = JSON.parse(localStorage.getItem("panier"));
    console.log("recuperation du LocalStorage");
    console.log(recupLocalStorage);
})
    
    


 
 






