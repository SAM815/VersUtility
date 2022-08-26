let shop = document.getElementById("Section-2");
 

let basket = JSON.parse(localStorage.getItem('data')) ||[];

let generateShop =()=>{
    return (shop.innerHTML = shopItemData.map(element=>{
        let {id, name, price, desc, img} = element;
        let search = basket.find((x)=>x.id===id)||[];
        return  `
        <div class="cardborder" id="product-id-${id}">
        <div class="card" id="card" style="width: 17rem;">
          <img src=${img} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
              content.</p>
            <div class="price-quantity">
              <h2> ${'$' + price}</h2>
              <div class="buttons">
                <i onclick = "decrement(${id})"class="bi bi-dash-lg"></i>
                <div class="quantity" id = ${id}>${search.item === undefined? 0: search.item}</div>
                <i onclick = "increment(${id})"class="bi bi-plus-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        
        
        
        
        `
    })
    .join(""));


}

generateShop();

let increment = (id) =>{
let selectedItem = id;
let search = basket.find((x)=>x.id === selectedItem.id);

if(search === undefined){
    basket.push({
        id: selectedItem.id,
        item: 1,
    });
} else{
    search.item += 1;
}
localStorage.setItem("data", JSON.stringify(basket));
//console.log(basket);
update(selectedItem.id);
}


let decrement = (id) =>{
    let selectedItem = id; 
    let search = basket.find((x)=>x.id === selectedItem.id);

    if(search === undefined) return;
 else if(search.item === 0) return
else{
    search.item -= 1;
} 
//console.log(basket);
update(selectedItem.id);
basket = basket.filter((x)=>x.item !==0);

localStorage.setItem("data", JSON.stringify(basket));
}



let update = (id) =>{
   let search = basket.find((x)=>x.id === id);
   //console.log(search.item); 
   document.getElementById(id).innerHTML = search.item;
   calculation();
}

//Calculation function that adds all numbers and displays in the shopping cart at the top.

let calculation = ()=>{
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x + y, 0);
  
}
calculation();
//Save the data in the local storage
