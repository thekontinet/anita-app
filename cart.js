import iziToast from "izitoast"
import "izitoast/dist/css/izitoast.css"

const bagData = localStorage.getItem('bag')
let bag = JSON.parse(bagData) || []

export function addToCart(product){
    if(!product){
      alert('Invalid Product')
      return
    }

    if(bag.find(bagItem => bagItem.id == product.id)){
        bag = bag.map(item => {
            if(item.id === product.id){
                item.quantity++
            }
            return item
        })
    }else{
        bag.push({...product, quantity: 1})
    }

    localStorage.setItem('bag', JSON.stringify(bag))
    renderBagCounter()
    iziToast.success({
        title: 'New cart item',
        message: 'Added new item to cart',
        position: 'topCenter'
    });
    
  }

export function removeFromCart(itemId){
    bag = bag.filter(item => item.id != itemId)
    localStorage.setItem('bag', JSON.stringify(bag))
    renderBagCounter()
    iziToast.success({
        title: 'cart item removed',
        message: 'item has been removed from cart',
        position: 'topCenter'
    });
  }

export function renderBagCounter(){
    const bagData = localStorage.getItem('bag')
    const bagArray = JSON.parse(bagData) || []
    document.querySelectorAll('[data-bag-counter]').forEach(el => el.innerText = bagArray.length)
}


export function renderCart() {
    const grandTotal = bag.reduce((a, b) => (a + (b.price * b.quantity)), 0)
    let cartHTML = bag.map(
      (item) => `
      <li class="d-flex list-group-item p-4 justify-content-between align-items-center">
        <span class="fw-bold">${item.title}</span>
        <span>x${item.quantity}</span>
        <span class="fw-bold">$${item.price * item.quantity}</span>
        <button class='btn btn-sm btn-danger' data-delete-cart-item data-cartid='${item.id}'><i class='bi bi-trash'></i></button>
    </li>
       `
    ).join('');

    const totalHTML = `
    <li class="d-flex list-group-item p-4 justify-content-between align-items-center">
      <span class="fw-bold">Total</span>
      <span></span>
      <span class="fw-bold">$${grandTotal}</span>
  </li>
     `

    const cartContainer = document.querySelector('[data-cart-container]')
    if(cartContainer){
        cartContainer.innerHTML = cartHTML + totalHTML

        document.querySelectorAll('[data-delete-cart-item]').forEach(button => {
            button.addEventListener('click', function(){
                const id =  button.getAttribute('data-cartid')
                removeFromCart(id)
                renderCart()
            })
        })
    }
  }

