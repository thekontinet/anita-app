
export function renderProducts(products) {
    let productsHTML = products.map(
      (product) => `
      <div class='col-sm-4 mb-4'>
    <div class="card product-card">
       <div class="card-img-top text-center">
           <img class="product-card-image" src="${product.image}" alt="Product Image">
       </div>
       <div class="card-body">
           <span class='h6 d-block'>${product.title}</span>
           <span class="fw-bold">${(new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(product.price))}</span>
           <button class="btn btn-primary d-block w-100 mt-4" data-add-to-bag-button data-productid='${product.id}'>Add to bag</button>
       </div>                        
   </div>
   </div>
       `
    ).join('');

    const productContainer = document.querySelector('[data-products-container]')
        if(productContainer){
            productContainer.innerHTML = productsHTML
        }
  }