const api = fetch('http://localhost:3000/api/products');
api.then (reponse => reponse.json())
    .then (data => {
        console.log(data)
        let array = [];
       for (let boucle of data) {
           array += `<a href=""><article><img src = "${boucle.imageUrl}"><h3>"${boucle.name}"<h3><p>"${boucle.description}"</p></article></a>`
       }
       document.getElementById('items').innerHTML = array;
       console.log(array)
    })




















