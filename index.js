import { menuArray } from "./data.js";

let customerOrder = []

function createEmptyOrder(array){
    array.forEach(function(item){
        const emptyItem = {name: item.name, quantity: 0, price: item.price}
        customerOrder.push(emptyItem)
    })
}
createEmptyOrder(menuArray)



document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
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
    console.log(customerOrder)
}


function getCustomerOrder(){
    let orderSectionHtml = ''
    const selectedItems = customerOrder.filter(function(item){
        return item.quantity > 0
    })
    selectedItems.forEach(function(item){
        orderSectionHtml += `
        <div class="order-item">
            <div class="name-and-remove-container">
                <div class="order-item-name">${item.name}</div>
                <div class="remove-button">remove</div>
            </div>
            <div class="price">${item.price}</div>
        </div>
        `
    })
    return orderSectionHtml
}


function getMenuHtml() {
    let menuHtml = ''
    menuArray.forEach(function(item){
        menuHtml += `
            <div class="menu-item">
                <div class="menu-info">
                    <div class="item-icon">${item.emoji}</div>
                    <div class="menu-item-description">
                        <h3>${item.name}</h3>
                        <p>${item.ingredients}</p>
                        <p>$${item.price}</p>
                    </div>
                </div>
                <button class="add-button" data-add="${item.id}">+</button>
            </div>`
    })
    return menuHtml
}


function render(){
    document.getElementById('menu').innerHTML = getMenuHtml()
    document.getElementById('order-section').innerHTML=getCustomerOrder(customerOrder)
}

render()


console.log('TESTING')