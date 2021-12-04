
/////////////// recupération du localstorage pour afficher les produits du panier dans le console lolg ////////////////////
const recupLocalStorage = JSON.parse(localStorage.getItem("panier"));
const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log("Affichage des produits du panier");
console.log(recupLocalStorage);

 /// récupéation des ID ////
const recupPrice = document.querySelector("#totalPrice");
const recupQuantite = document.querySelector("#totalQuantity");
/// création de 2 tableaux vides , un tableau prix et un  tableau quantité pour additionné les prix et la quantité
const arrayPrice = [];
const arrayQuantity = [];

    ///////////// création d'une boucle qui va me permettre d'affiché les produits envoyé au localStorage dans le panier //////////////////
for (let panier of recupLocalStorage) {
    let quantite = parseInt(panier.quantite);
    let total = panier.price * quantite;
    arrayQuantity.push(quantite); /// push la quantité  dans mon tableau vide ////
    arrayPrice.push(total);/// push le prix dans mon tableau vide /////
    const recupArticle = document.querySelector("#cart__items");
    if(recupArticle) {
        recupArticle.innerHTML +=`<article class="cart__item"data-id="${panier.id}"><div class="cart__item__img"><img src="${panier.img}" 
        alt="${panier.altTxt}"></div><div class="cart__item__content"><div class="cart__item__content__titlePrice"><h2>${panier.name}</h2>
        <p class ="total">${total}€</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Quantité : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100"value="${quantite}"></div><div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p></div></div></div></article`;
    }else {
    };
    const totalPrice = arrayPrice.reduce(reducer);
    const totalQuantite = arrayQuantity.reduce(reducer);
    ///// implantation des constantes dans le code HTML pour mettre à jour la quantité total et le prix total ///
    if(recupPrice && recupQuantite) {
        recupPrice.innerHTML = `${totalPrice}`;
        recupQuantite.innerHTML = `${totalQuantite}`
    }else {
    };
    const recupItemQuantity = document.querySelectorAll(".itemQuantity");
	const deleteItem = document.querySelectorAll(".deleteItem");

    ////  création d'une boucle pour modifié la quantité des articles dans le panier ///
    for (let itemQuantity of recupItemQuantity) {
        itemQuantity.addEventListener("click", function(e) {
            e.preventDefault();
            const valueQuantite = itemQuantity.value;
			quantite = valueQuantite;
			panier.quantite = quantite;
			localStorage.setItem("panier", JSON.stringify(recupLocalStorage));
        })
    }  
	//// création d'une boucle pour supprimé les articles à partir du panier ////
	for (let itemDelete of deleteItem) {
		itemDelete.addEventListener("click", function(e) {
			e.preventDefault();
			alert(" Vous avez supprimé l'article " + panier.name + " du panier");
			let produitSupp = panier.id;
			const filtre = recupLocalStorage.filter(el => el.id != produitSupp); 
			localStorage.setItem("panier", JSON.stringify(filtre)); 
			window.location.href = "cart.html";
		})
	}          
};
const recupFormulaire = document.querySelector(".cart__order__form");
const envoyerCommande = document.querySelector("#order");
const recupOrderId = document.querySelector("#orderId");

if(envoyerCommande) {
	envoyerCommande.addEventListener("click", function(event) {
		event.preventDefault();
		//// création de l'objet contact ////
		const contact = {
			firstName: recupFormulaire[0].value,
			lastName: recupFormulaire[1].value,
			address: recupFormulaire[2].value,
			city: recupFormulaire[3].value,
			email: recupFormulaire[4].value,
		};
		//// création du tableau product qui va stocker l'id de mon produit ////
		const products = []; 
		for (let productId of recupLocalStorage) {
			products.push(productId.id);
		}
		//// rassemblement de mon objet contact et de mon tableau product comme c'est demandé pour les envoyés au back-end ////
		const objetContactEtProducts = {
			contact,
			products,
		}
		//// Création de 5 functions avec la méthode regex pour controlé les informations de l'utilisateur/////
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
		
		////Récupéation de l'api avec la méthode post qui va permettre d'envoyer mon objet au back-end////
		const requestPost = fetch(`http://localhost:3000/api/products/order`, {
			method: "POST",
			body : JSON.stringify(objetContactEtProducts),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			}
		})
		requestPost
		.then (res => res.json())    
		.then (data => { /// Réponse du back-end en envoyant le numéro de commande du produit ///
			if(prenom() && nom() && address () && ville() && email() && recupLocalStorage.length != 0) {
				window.location.href = "confirmation.html?" + data.orderId; //// envoie du numero de commande de l'article dans l'url /// 
			}
			else if(recupLocalStorage.length == 0) {
				alert("Votre panier est vide");
				data.orderId == null;
			}
			else if(prenom() == false && nom() == false && address () == false && ville() == false && email() == false) {
				alert("Plusieurs champs incorrects");
				data.orderId == null;
			}
			else if(prenom() == false || nom() == false || address () == false || ville() == false || email() == false){
				data.orderId == null;
				if(prenom() == false) {
					alert("le prenom n'est pas valide");
				}
				if(nom() == false) {
					alert("le nom n'est pas valide");
				}
				if(address() == false) {
					alert("l'adresse n'est pas valide");
				}
				if(ville() == false){
					alert("La ville n'est pas valide");
				}
				if(email() == false) {
					alert("l'email n'est pas valide");
				}
			}
		});               
	}) 
}else {
	//// récupération du numéro de commande qui est dans l'url gràce à window.location.search ///
	const id = window.location.search;
	const orderId = id.slice(1);
	recupOrderId.innerHTML = orderId;
	console.log("OrderId du back-end");
	console.log(recupOrderId);   
}
    
    
   
   

    
   






    
    















   




     
    
   








