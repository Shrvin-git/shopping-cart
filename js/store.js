let allProducts = [
    { id: 1, title: 'Album 1', price: 25, img: 'Images/Album 1.png', count: 1 },
    { id: 2, title: 'Album 2', price: 30, img: 'Images/Album 2.png', count: 1 },
    { id: 3, title: 'Album 3', price: 10, img: 'Images/Album 3.png', count: 1 },
    { id: 4, title: 'Album 4', price: 15, img: 'Images/Album 4.png', count: 1 },
    { id: 5, title: 'Coffee', price: 100, img: 'Images/Cofee.png', count: 1 },
    { id: 6, title: 'Shirt', price: 45, img: 'Images/Shirt.png', count: 1 },
]

let $ = document
const shopItemsContainer = $.querySelector('.shop-items')
const basketItemWrappper = document.querySelector('.cart-items')
const totalProductPrice = document.querySelector('.cart-total-price')
const removeAllProduct = document.querySelector('.btn-purchase')

let allProductsArray = []

allProducts.forEach(function (products) {

    let productWrapper = document.createElement('div')
    productWrapper.classList.add('shop-item')

    let productTitle = document.createElement('span')
    productTitle.classList.add('shop-item-title')
    productTitle.innerHTML = products.title

    let productCover = document.createElement('img')
    productCover.classList.add('shop-item-image')
    productCover.setAttribute('src', products.img)

    let productItemDetails = document.createElement('div')
    productItemDetails.classList.add('shop-item-details')

    let productPrice = document.createElement('span')
    productPrice.classList.add('shop-item-price')
    productPrice.innerHTML = products.price + ' $'

    let addProductBasket = document.createElement('button')
    addProductBasket.className = 'btn btn-primary shop-item-button'
    addProductBasket.innerHTML = 'ADD TO CART'
    addProductBasket.addEventListener('click', function () {
        addToBasketArray(products.id)
    })

    productItemDetails.append(productPrice, addProductBasket)
    productWrapper.append(productTitle, productCover, productItemDetails)
    shopItemsContainer.append(productWrapper)


})
function addToBasketArray(productID) {
    let mainIndex = allProducts.find(function (items) {
        return items.id === productID
    })

    allProductsArray.push(mainIndex)
    basketGenerator(allProductsArray)
}
function basketGenerator(productsArray) {
    basketItemWrappper.innerHTML = ''
    productsArray.forEach(function (product) {
        basketItemWrappper.insertAdjacentHTML('beforeend',
            '<div class="cart-row"><div class= "cart-item cart-column" ><img class="cart-item-image" src="' + product.img + '" width="100" height="100"><span class="cart-item-title">' + product.title + '</span></div><span class="cart-price cart-column">$' + product.price + '</span><div class="cart-quantity cart-column"><input class="cart-quantity-input" type="number"" value="' + product.count + '"  onChange="updateProductCount(' + product.id + ',' + product.count + ')"  "><button class="btn btn-danger" type="button" onclick="removeItem(' + product.id + ')" ">REMOVE</button></div></div> '
        )
        totalPrice(allProductsArray)
    })

}
function removeItem(productID) {

    let productIndex = allProductsArray.findIndex(function (item) {
        return productID === item.id
    })

    allProductsArray.splice(productIndex, 1)
    basketGenerator(allProductsArray)
    totalPrice(allProductsArray)
}
function clearAllBasket() {
    allProductsArray = []
    basketGenerator(allProductsArray)
    totalProductPrice.innerHTML = '$ 0'
}
function totalPrice(allProducts) {
    let sum = 0
    allProducts.forEach(function (product) {
        sum += product.count * product.price
    })
    totalProductPrice.innerHTML = '$ ' + sum
}
function updateProductCount(productId, productCount) {

    allProductsArray.forEach(function (product) {
        if (product.id === productId) {
            product.count = productCount
        }

    })

    totalPrice(allProductsArray)
}
removeAllProduct.addEventListener('click', clearAllBasket)
