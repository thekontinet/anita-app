import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";

import {renderProducts} from './product.js'
import {renderBagCounter, addToCart, renderCart} from './cart.js'



renderBagCounter()
renderCart()

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((products) => {

    renderProducts(products);

    document.querySelectorAll('[data-add-to-bag-button]').forEach(function(button){
        button.addEventListener('click', function(){
          const id = button.getAttribute('data-productid')
          const product = products.find(product => product.id == id)
          addToCart(product)
        })
    })



  })
  .catch(err => alert('Something went wrong: ' + err.message));







