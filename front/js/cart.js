
/////////////// RECUPERATION DU LOCALSTORAGE DES PRODUITS EN QUESTION DANS LE PANIER ////////////////////
const recupLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log("Affichage des produits du panier")
console.log(recupLocalStorage);
const additionPrixEtQuantite = (accumulator, currentValue) => accumulator + currentValue;

const arrayPrice = [];
const arrayQuantity = [];

    ///////////// AJOUT DE TOUTE LES OPTIONS DU PRODUIT DANS UNE BOUCLE //////////////////
for (let i = 0;i<recupLocalStorage.length;i++) {
    let quantite = parseInt(recupLocalStorage[i].quantite);
    const total = recupLocalStorage[i].price * quantite;
    arrayQuantity.push(quantite);
    arrayPrice.push(total);
    const recupArticle = document.querySelector("#cart__items");
    if(recupArticle) {
        recupArticle.innerHTML +=`<article class="cart__item"data-id="${recupLocalStorage[i].id}"><div class="cart__item__img"><img src="${recupLocalStorage[i].img}" alt="${recupLocalStorage[i].altTxt}">
        </div><div class="cart__item__content"><div class="cart__item__content__titlePrice"><h2>${recupLocalStorage[i].name}</h2><p>${total} €</p></div><div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity"><p>Quantité : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantite}">
        </div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p>
        </div></div></div></article`;
        console.log(recupLocalStorage[i]);
        const recupItemQuantity = document.querySelectorAll(".itemQuantity");
        for (let i = 0; i < recupItemQuantity.length;i++) {
            recupItemQuantity[i].addEventListener("click", function(e) {
                e.preventDefault();
                console.log(recupLocalStorage[i])
                const valueQuantite = recupItemQuantity[i].value;
                console.log(valueQuantite);
                if(valueQuantite) {
                    quantite = valueQuantite;
                    recupLocalStorage[i].quantite = quantite;
                    localStorage.setItem("panier", JSON.stringify(recupLocalStorage));
                }else {
                }
            })
        }
    }else {
    }

    const totalPrice = arrayPrice.reduce(additionPrixEtQuantite);
    const totalQuantite = arrayQuantity.reduce(additionPrixEtQuantite);

    const recupPrice = document.querySelector("#totalPrice");
    const recupQuantite = document.querySelector("#totalQuantity");

    if(recupPrice && recupQuantite) {
        recupPrice.innerHTML = `${totalPrice}`;
        recupQuantite.innerHTML = `${totalQuantite}`
    }else {
    }
}
const deleteItem = document.querySelectorAll(".deleteItem");
for (let i=0; i<deleteItem.length;i++) {
    deleteItem[i].addEventListener("click", function(e) {
        e.preventDefault();
        alert(" Vous avez supprimé l'article " + recupLocalStorage[i].name + " du panier")
        let produitSupp = recupLocalStorage[i].id;
        const filtre = recupLocalStorage.filter(el => el.id !== produitSupp);
        console.log(filtre);
        localStorage.setItem("panier", JSON.stringify(filtre));
        window.location.href = "cart.html";
    })
}
const recupFormulaire = document.querySelector(".cart__order__form");
const envoyerCommande = document.querySelector("#order");
const recupOrderId = document.querySelector("#orderId");
        if(envoyerCommande) {
            envoyerCommande.addEventListener("click", function(event) {
                event.preventDefault();
                const contact = {
                    firstName: recupFormulaire[0].value,
                    lastName: recupFormulaire[1].value,
                    address: recupFormulaire[2].value,
                    city: recupFormulaire[3].value,
                    email: recupFormulaire[4].value,
                }
                const products = []; 
                for (let recupId of recupLocalStorage) {
                    products.push(recupId.id);
                }
                const objetContactEtProducts = {
                    contact,
                    products,
                }
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
                }
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
                }
                function email () {
                    const regexEmail = contact.email;
                    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(regexEmail)) {
                        return true;
                    }else {
                        return false;
                    };
                };
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
                        .then (data => {
                            if(prenom() && nom() && address() && ville() & email()) {
                            }
                            else {
                                alert("Informations incorrect")
                                data = undefined;
                                console.log("Le formulaire ne peut pas étre envoyer avec des mauvaises informations");
                            }
                            console.log("Réponse du back-end")
                            console.log(data);
                            console.log("OrderId")
                            console.log(data.orderId);
                            console.log(window.location.href);
                            
                        });
                /*
                window.location = "confirmation.html";
                */
            }) 
        }else {
        }
    
   
   

    
   






    
    















   




     
    
   








