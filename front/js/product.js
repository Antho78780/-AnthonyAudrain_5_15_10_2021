//////////////// CREATION DE l'id DU PRODUIT POUR RENDRE L'ID UNIQUE////////////////////
const idProduct = new URLSearchParams(window.location.search);
const _id = idProduct.get("id");

///////////////// AJOUT DE L'API AVEC L'ID POUR AJOUTER TOUTES LES OPTIONS DANS LE PRODUIT EN QUESTION////////////////////
const requete = fetch(`http://localhost:3000/api/products/${_id}`);
requete.then (reponse => reponse.json())
    .then (product => {
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
      //////////// AJOUT DE l'ELEMENT ADDEVENTLISTENER POUR CLICKER SUR LE BUTTON PANIER POUR ENVOYER LE PRODUIT DANS LE LOCALSTORAGE//////////////////////////////////////
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
                array.push(optionsProduit);
                localStorage.setItem("panier", JSON.stringify(array));   
            }
            else {
                array = [];
                array.push(optionsProduit);
                localStorage.setItem("panier", JSON.stringify(array)); 
            }
           
           
           
           
            
            
    
           
           

           
           

           
           

          
        
        })
        
        if(JSON.parse(localStorage.getItem("panier"))) {
        }
        else {
            console.log("Aucun produit ajouté dans le localStorage")
        }

        
    
    })
    
    


 
 






