const recupLocalGetItem = localStorage.getItem("orderId");
const recupOrderId = document.querySelector("#orderId");

recupOrderId.innerHTML = `${recupLocalGetItem}`;
localStorage.removeItem("orderId")