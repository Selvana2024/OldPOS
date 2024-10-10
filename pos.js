let cartIndex = 0;
let body = document.querySelector("body");
let productsDiv = document.querySelector(".products");
let appProduct = [];
renderProducts();
let cartProduct = [];
function showSideCart() {
  cartIndex = 1;
  body.innerHTML += `<div class="sideCart animate__animated animate__fadeInRight overflow-y-scroll" onclick="event.stopPropagation()">
  <i class="fa-solid fa-circle-xmark exit" onclick="hideSideCart()"></i>
  </div>`;
  renderCartProduct();
}
function hideSideCart() {
  let sideCart = document.querySelector(".sideCart");
  sideCart.remove();
}
function renderCartProduct() {
  let sideCart = document.querySelector(".sideCart");
  cartProduct.innerHTML = "";
  cartProduct.forEach((el, index) => {
    sideCart.innerHTML += `
        <div class="col-12 p-3 mb-3 productInCart ">
        <img src= "${el.image}" height="70px">
       <div class="d-flex flex-column p-2 flex-wrap" style="flex-grow:1">        
       <p>Name: ${el.category}</p>
      <p>Price: ${el.price} EGP</p>
       </div>
       <div class="d-flex flex-column align-items-center">
       <button class="btn btn-light">+</button>
       <p class="mb-0">${el.qty}</p>
       <button class="btn btn-dark">-</button>
       </div>
       <i class="fa-solid fa-circle-xmark exit" onclick=""></i>
        </div>
        `;
  });
}

function renderProducts() {
  axios
    .get("https://fakestoreapi.com/products")
    .then((res) => {
      appProduct = res.data;
      appProduct.forEach((el, index) => {
        productsDiv.innerHTML += `
        <div
        class="col-12 col-md-5 d-flex  justify-content-center  col-lg-3"
        onclick="event.stopPropagation()"
      >
        <div class="pro">
          <img
            class="proImg"
            src="${el.image}"
          />
          <h5 class="name">${el.category}</h5>
          <p class="price">${el.price}$</p>
          <button class="btn btn-dark" onclick="AddProductToCart(${el.id})">Add To Cart</button>
        </div>
      </div>
            `;
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function AddProductToCart(product_id) {
  let obj = appProduct.find((el) => {
    return el.id == product_id;
  });
  obj.qty = 1;
  cartProduct.push(obj);
  renderCartProduct();
}
