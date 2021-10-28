
const urlSearchParams = new URLSearchParams(window.location.search);
console.log(urlSearchParams);
const id = urlSearchParams.get("id");
console.log(id)
const key = fetch(`http://localhost:3000/api/products/${id}`);
key.then (reponse => reponse.json())
    .then (productSolo => {
        console.log(productSolo)
        document.querySelector(".item__img").innerHTML =`<img src="${productSolo.imageUrl}" alt="${productSolo.altTxt}">`;
        document.querySelector("#title").innerHTML =`${productSolo.name}`;
        document.querySelector("#price").innerHTML =`${productSolo.price}`;
        document.querySelector("#description").innerHTML =`${productSolo.description}`;
        document.querySelector("#colors").innerHTML =`<option value="">${productSolo.colors[0]}</option>
        <option value="">${productSolo.colors[1]}</option>
        <option value="">${productSolo.colors[2]}</option>`;
    })
