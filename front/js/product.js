
console.log(window.location);
const idProduct = new URLSearchParams(window.location.search);
const id = idProduct.get("id");
console.log(id)
const requete = fetch(`http://localhost:3000/api/products/${id}`);
requete.then (reponse => reponse.json())
    .then (product => {
        console.log(product)
        const recupImg = document.querySelector(".item__img").innerHTML =`<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        const recupTitle = document.querySelector("#title").innerHTML =`${product.name}`;
        const recupPrice = document.querySelector("#price").innerHTML =`${product.price}`;
        const recupDescription = document.querySelector("#description").innerHTML =`${product.description}`;
        product.colors.forEach(color => {
             document.querySelector('#colors').innerHTML += `<option value="">${color}</option>`;
        });
    })
 
 






