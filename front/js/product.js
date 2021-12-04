//////////////// Utilistation de URLSEARCHPARAMS qui va permettre d'affecter un id au produit en question ////////////////////
const idProduct = new URLSearchParams(window.location.search);
const _id = idProduct.get("id");

///////////////// récuperation de l'api en rajoutant la clé ID pour afficher le produit  ////////////////////
const requete = fetch(`http://localhost:3000/api/products/${_id}`);
requete 
.then (res => res.json()) 
.then (product => { /// Ajout des informations du produit dans la page produit gràce à la methode then /////
    document.querySelector(".item__img").innerHTML =`<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.querySelector("#title").innerHTML =`${product.name}`;
    document.querySelector("#price").innerHTML =`${product.price}`;
    document.querySelector("#description").innerHTML =`${product.description}`;
////// Récupération des ID /////
    const recupQuantite = document.querySelector('#quantity');
    const sendPanier = document.querySelector("#addToCart");
    const recupColors =  document.querySelector("#colors");
    ///// Ajout de la possibilité d'afficher les options de la couleur du produit gràce a une boucle/////////
    for (let color of product.colors) {
        document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`
}
      //////////// Récupération de la constante sendPanier pour écouter le click ////////////
    sendPanier.addEventListener("click", function(event) {
        event.preventDefault();
        ///// création de l'objet optionProduit ////
        let optionsProduit =  {
            name: product.name,
            img: product.imageUrl,
            price: product.price,
            id: product._id,
            colors:   recupColors.value,
            quantite: parseInt( recupQuantite.value),
        }
        
        //// création d'un tableau LocalStorage ////
        let array = [];
        array = JSON.parse(localStorage.getItem("panier"));;
       
        ////////// AJOUT DE CONDITIONS POUR STOCKER LESPRODUITS DANS LE LOCALSTORAGE//////////////
             
             if(array && optionsProduit.colors != "" && optionsProduit.quantite != "0") {
                let produitExisteDeja = array.find(el => el.id == optionsProduit.id);
                if(produitExisteDeja) {
                    let resultQuantite = [];
                    let resultQuantiteMoins = [];
                    for (let i of array) {
                        if(optionsProduit.id == i.id)
                            resultQuantite = i.quantite += optionsProduit.quantite;
                            resultQuantiteMoins = i.quantite -= optionsProduit.quantite;
                    }
                    
                        optionsProduit.quantite = resultQuantite;
                        array = array.filter(el => el.id != optionsProduit.id)
                }else {
                }                                                                                                                                                            
                array.push(optionsProduit);
                localStorage.setItem("panier", JSON.stringify(array));
                alert(" Vous avez ajouté l'article " + product.name + " au panier");  
             }
             else if([] &&  optionsProduit.colors != "" && optionsProduit.quantite != "0") {
                array = [];
                array.push(optionsProduit);
                localStorage.setItem("panier", JSON.stringify(array));
                alert(" Vous avez ajouté l'article " + product.name + " au panier");
             }
             else if(optionsProduit.colors == "" && optionsProduit.quantite != "0") {
                 alert("Choissisez une couleur pour ajouté votre article au panier");
             }
             else if(optionsProduit.quantite = "0" && optionsProduit.colors != "") {
                 alert("Choissisez la quantité de l'article pour l'ajouté au panier")
             }
             else {
                 alert("L'article n'a pas de couleurs ni de quantité vous ne pouvez pas l'ajouté au panier")
             }

    })
    //// récupération du localStorage envoyé dans le localStorage dans le console log ////
    const recupLocalStorage = JSON.parse(localStorage.getItem("panier"));
    console.log("recuperation du LocalStorage");
    console.log(recupLocalStorage);
})
    
    


 
 






