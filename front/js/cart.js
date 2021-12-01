
/////////////// recupération du localstorage pour afficher les produits du panier dans le console lolg ////////////////////
const recupLocalStorage = JSON.parse(localStorage.getItem("panier"));
const additionPrixEtQuantite = (accumulator, currentValue) => accumulator + currentValue;
console.log("Affichage des produits du panier");
 console.log(recupLocalStorage);

 /// récupéation des ID ////
const recupPrice = document.querySelector("#totalPrice");
const recupQuantite = document.querySelector("#totalQuantity");

const arrayPrice = [];
const arrayQuantity = [];

    ///////////// création d'une boucle qui va me permettre d'affiché les produits envoyé au localStorage dans le panier //////////////////
for (let i = 0;i<recupLocalStorage.length;i++) {
        let quantite = parseInt(recupLocalStorage[i].quantite);
        let total = recupLocalStorage[i].price * quantite;
        arrayQuantity.push(quantite);
        arrayPrice.push(total);
        const recupArticle = document.querySelector("#cart__items");
        if(recupArticle) {
            recupArticle.innerHTML +=`<article class="cart__item"data-id="${recupLocalStorage[i].id}"><div class="cart__item__img"><img src="${recupLocalStorage[i].img}" 
            alt="${recupLocalStorage[i].altTxt}"></div><div class="cart__item__content"><div class="cart__item__content__titlePrice"><h2>${recupLocalStorage[i].name}</h2>
            <p class ="total">${total}€</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Quantité : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100"value="${quantite}"></div><div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p></div></div></div></article`;
        }
        else {
        };
        const totalPrice = arrayPrice.reduce(additionPrixEtQuantite);
        const totalQuantite = arrayQuantity.reduce(additionPrixEtQuantite);

        if(recupPrice && recupQuantite) {
            recupPrice.innerHTML = `${totalPrice}`;
            recupQuantite.innerHTML = `${totalQuantite}`
        }else {
        };
        const recupItemQuantity = document.querySelectorAll(".itemQuantity");
       
            for (let i = 0; i < recupItemQuantity.length;i++) {
                recupItemQuantity[i].addEventListener("click", function(e) {
                    e.preventDefault();
                    const valueQuantite = recupItemQuantity[i].value;
                        quantite = valueQuantite;
                        recupLocalStorage[i].quantite = quantite;
                        localStorage.setItem("panier", JSON.stringify(recupLocalStorage));
                })
            }   
           
            
};
/// récupération de la class deleteItem avec selectorAll pour sélectionner tout les boutons supprimé ////
const deleteItem = document.querySelectorAll(".deleteItem");
//// création d'une boucle pour le selectorAll ////
for (let i=0; i<deleteItem.length;i++) {
    deleteItem[i].addEventListener("click", function(e) {
        e.preventDefault();
        alert(" Vous avez supprimé l'article " + recupLocalStorage[i].name + " du panier");
        let produitSupp = recupLocalStorage[i].id;
        const filtre = recupLocalStorage.filter(el => el.id != produitSupp); //// méthode filter qui permet de retourner un tableau avec ce qui est demander ////
        console.log(filtre);
        localStorage.setItem("panier", JSON.stringify(filtre)); //// permet de supprimé le ou les produits dans le localStorage ////
        window.location.href = "cart.html";
    })
}
const recupFormulaire = document.querySelector(".cart__order__form");
const envoyerCommande = document.querySelector("#order");
const recupOrderId = document.querySelector("#orderId");


    ///////ENVOIE DU FORMULAIRE AU BACK-END POUR RECEVOIR l'ORDER-ID////
       if(envoyerCommande) {
            envoyerCommande.addEventListener("click", function(event) {
                event.preventDefault();
                const contact = {
                    firstName: recupFormulaire[0].value,
                    lastName: recupFormulaire[1].value,
                    address: recupFormulaire[2].value,
                    city: recupFormulaire[3].value,
                    email: recupFormulaire[4].value,
                };
                const products = []; 
                for (let recupId of recupLocalStorage) {
                    products.push(recupId.id);
                }
                const objetContactEtProducts = {
                    contact,
                    products,
                }
                //// Création de 5 functions avec la méthode regex pour controllé les informations de l'utilisateur/////
        
                    function prenom () {
                        const regexPrenom = contact.firstName;
                        if(/^[A-Za-z]{3,15}$/.test(regexPrenom)) {
                            return true;
                        }else {
                            return false;
                        };
                    };
                    function nom () {
                        const regexNom = contact.lastName;
                        if(/^[A-Za-z]{3,15}$/.test(regexNom)) {
                            return true;
                        }else {
                        return false;
                        };
                    };
                    function address () {
                        const regexAdress = contact.address;
                        if(/^[ A-Za-z-0-9 ]{5,25}$/.test(regexAdress)) {
                            return true;
                        }else {
                            return false;
                        };
                    };
                    function ville() {
                        const regexVille = contact.city;
                        if(/^[A-Za-z]{4,15}$/.test(regexVille)) {
                            return true;
                        }else {
                        return false;
                        };
                    };
                    function email () {
                        const regexEmail = contact.email;
                        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(regexEmail)) {
                            return true;
                        }else {
                            return false;
                        };
                    };
                
                ////Récupéation de l'api qui va permettre envoyé l'objet objetContactEtProducts au back-end////
                    const requestPost = fetch(`http://localhost:3000/api/products/order`, {
                        method: "POST",
                        body : JSON.stringify(objetContactEtProducts),
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    })
                        requestPost
                        .then (res => res.json())    
                        .then (data => { /// Réponse du back-end en envoyant le numéro de commande du produit ///
                            if(prenom() == false && nom() == false && address () == false && ville() == false && email() == false) {
                                alert("Tout les champs doivent étre remplis ")
                            }
                            else if(prenom() == false || nom() == false || address () == false || ville() == false || email() == false) {
                                if(prenom() == false) {
                                    alert("Votre prenom n'est pas correct")
                                }
                                if(nom() == false) {
                                    alert("Votre nom n'est pas correct")
                                }
                                if(address() == false) {
                                    alert("Votre adresse n'est pas correct")
                                }
                                if(ville() == false) {
                                    alert("Votre ville n'est pas correct")
                                }
                                if(email() == false) {
                                    alert("Votre email n'est pas correct")
                                }
                                console.log("Les articles ne peuvent pas étre envoyé")
                                data.orderId = null;
                            }
                            console.log("Réponse du back-end");
                            console.log(data);
                            if(data.orderId && recupLocalStorage.length != 0){
                                window.location.href = "confirmation.html?" + data.orderId ; 
                            }else {
                                alert("Vous n'avez pas d'article dans le panier")
                            }
                        });               
             }) 
        }else {
            const id = window.location.search;
            const orderId = id.slice(1);
            recupOrderId.innerHTML = orderId;
            console.log("OrderId du back-end");
            console.log(recupOrderId);   
        }
    
    
   
   

    
   






    
    















   




     
    
   








