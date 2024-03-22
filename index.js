import { menuArray } from "./data.js";

let customerOrder = []

function createEmptyOrder(array){
    array.forEach(function(item){
        const emptyItem = {name: item.name, quantity: 0, price: item.price, id: item.id}
        customerOrder.push(emptyItem)
    })
}
createEmptyOrder(menuArray)


function hideOrderSummary(){
    const totalQuantity = customerOrder.reduce((accumulator, item) => 
        accumulator += item.quantity, 0
    )
    /* Re-written as a ternary operator below

    if (totalQuantity>0){
        document.getElementById('order-section').classList.remove('hidden')
    } else{
        document.getElementById('order-section').classList.add('hidden')
    }*/
    totalQuantity > 0 ? 
        document.getElementById('order-section').classList.remove('hidden') :
        document.getElementById('order-section').classList.add('hidden')
}

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
    else if(e.target.dataset.order){
        document.getElementById('payment-modal-container').classList.toggle('hidden')
    }
})

function handleAddClick(itemID){
    const targetMenuObj = menuArray.filter(function(item){
        return item.id.toString() === itemID
    })[0]
    const targetCustomerOrderObj = customerOrder.filter(function(item){
        return item.name === targetMenuObj.name
    })[0]
    targetCustomerOrderObj.quantity += 1
    targetCustomerOrderObj.price = targetMenuObj.price * targetCustomerOrderObj.quantity
    hideOrderSummary()
    render()
}

function handleRemoveClick(itemID){
    const targetCustomerOrderObj = customerOrder.filter(function(item){
        return item.id.toString() === itemID
    })[0]
    targetCustomerOrderObj.quantity -= 1
    targetCustomerOrderObj.price = (targetCustomerOrderObj.price / (targetCustomerOrderObj.quantity + 1)) * targetCustomerOrderObj.quantity
    console.log(customerOrder)
    hideOrderSummary()
    render()
}


function getCustomerOrder(){
    let orderSectionHtml = ''
    const selectedItems = customerOrder.filter(function(item){
        return item.quantity > 0
    })
    orderSectionHtml += `<div id="your-order">Your order</div>`
    selectedItems.forEach(function(item){
        orderSectionHtml += `
        <div class="order-item">
            <div class="name-and-remove-container">
                <div class="order-item-name">${item.name} (${item.quantity})</div>
                <div class="remove-button" data-remove="${item.id}">remove</div>
            </div>
            <div class="price">$${item.price}</div>
        </div>
        `
    })
    const totalPrice = selectedItems.reduce((accumulator, item) => 
        accumulator += item.price, 0
    )
    orderSectionHtml += `
    <div class="order-total">
        <div>Total price:</div>
        <div>$${totalPrice}</div>
    </div>
    <button id="order-button" class="big-button" data-order=orderButton>Complete order</button>`
    return orderSectionHtml
}


function getMenuHtml() {
    let menuHtml = ''
    menuArray.forEach(function(item){
        menuHtml += `
            <div class="menu-item">
                <div class="menu-info">
                    <div class="item-icon">${item.emoji}</div>
                    <div>
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-ingredients">${item.ingredients}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                </div>
                <button class="add-button" data-add="${item.id}">+</button>
            </div>`
    })
    return menuHtml
}


function render(){
    document.getElementById('menu').innerHTML = getMenuHtml()
    document.getElementById('order-section').innerHTML=getCustomerOrder()
}

render()
