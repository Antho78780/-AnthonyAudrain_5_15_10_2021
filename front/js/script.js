
function kanap (){
    fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(data => {
        document.getElementById("items")
        console.log(items)
    })
}
kanap();  

       




























