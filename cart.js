let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");


let basket = JSON.parse(localStorage.getItem('data')) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);

}
calculation();

let generateCards = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemData.find((y) => y.id === id) || [];

            return `
    <div class = "cart-item">
     <img width = "100"src=${search.img} alt=""/>
    <div class="details">
<div class="title-price-x">
<h4 class="title-price">
<p>${search.name}</p>
<p class="cart-item-price">$${search.price}</p>
</h4>
<i onclick="removeItem(${id})"class="bi bi-x"></i>
</div>

<div class="buttons">
<i onclick = "decrement(${id})"class="bi bi-dash-lg"></i>
<div class="quantity" id = ${id}>${item}</div>
<i onclick = "increment(${id})"class="bi bi-plus-lg"></i>
</div>

<h3> $ ${item * search.price}</h3>

    </div>
    </div>

    
    
    `
        }).join(""));
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
    <h2> Cart is Empty </h2>
    <a href="shop.html">
    <button class="HomeBtn"> Back to home </button>
    </a>
    
    
    `
    }


};
generateCards();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    generateCards();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
    //console.log(basket);

}


let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return
    else {
        search.item -= 1;
    }
    //console.log(basket);
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCards();
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item); 
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
}

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCards();
    
TotalAmount();
calculation();
localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart=()=>{
  basket = [];
  generateCards();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
  
}

let TotalAmount = () => {
if(basket.length !== 0){
    let amount = basket.map((x)=>{
        let {item, id} = x;
        let search = shopItemData.find((y)=>y.id === id) || [];

        return item * search.price;
    })
    .reduce((x,y)=> x+y, 0);
label.innerHTML = `
<h2> Total Bill: $ ${amount}</h2>
<button class="checkout">Checkout</button>
<button onclick = "clearCart()"class="removeAll">Clear</button>
`
}else return;
};

TotalAmount();