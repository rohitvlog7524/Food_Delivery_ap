const data= [
    {
        id : 0,
        img : 'pasta6.jpeg',
        name : 'Italian pasta',
        price : 190,
        save : 25,
        delievery : 'In 0- 1 hr',
        itemInCart: false
    },
    {
        id : 1,
        img : 'pasta3.jpeg',
        name : 'White pasta',
        price : 300,
        save : 50,
        delievery : 'In 0 - 1hr',
        itemInCart: false
    },
    {
        id : 2,
        img : 'pasta5.jpeg',
        name : 'Veggie pasta',
        price : 240,
        save : 30,
        delievery : 'In 0 - 1 hr',
        itemInCart: false
    },
    {
        id : 3,
        img : 'pasta1.jpeg',
        name : 'Mexican pasta',
        price : 285,
        save : 35,
        delievery : 'In 0- 1 hr',
        itemInCart: false
    },
    {
        id : 4,
        img : 'taco1.jpeg',
        name : 'Taco bell',
        price : 200,
        save : 15,
        delievery : 'In 0 - 1 hr',
        itemInCart: false
    },
    {
        id : 5,
        img : 'taco2.jpeg',
        name : 'Mexican taco',
        price : 220,
        save : 25,
        delievery : 'In 0 - 1 hr',
        itemInCart: false
    },
    {
        id : 6,
        img : 'taco3.jpeg',
        name : 'Italian taco',
        price : 160,
        save : 20,
        delievery : 'In 0 - 1 hr',
        itemInCart: false
    },
    {
        id : 7,
        img : 'shakes1.jpg',
        name : 'Banana shakes',
        price : 100,
        save : 10,
        delievery : 'In 0 - 1 hr',
        itemInCart: false
    },
];

let cartList=[]; 

var i;
var detail =document.getElementsByClassName('card-item');
var detailsImg = document.getElementById('details-img')
var detailTitle = document.getElementById('detail-title')
var detailPrice = document.getElementById('detail-price')
var youSave = document.getElementById('you-save');
var detailsPage = document.getElementById('details-page');
var back = document.getElementById('buy')
back.addEventListener('click',refreshPage)
var addToCarts = document.querySelectorAll('#add-to-cart')
var cart = document.getElementById('cart');

cart.addEventListener('click',displayCart)

var carts = document.getElementById('carts');

carts.addEventListener('click',()=>addToCart(getId))

var home = document.getElementById('logo');

home.addEventListener('click',hideCart);

document.addEventListener('click',function (e){
    if(e.target.id=='remove'){
        var itemId = e.target.parentNode.id
        removeFromCart(itemId)
    }
})


for(i=0;i<data.length;i++){
    detail[i].addEventListener('click',handleDetail)
}

var getId;

addToCarts.forEach(val=>val.addEventListener('click',()=>addToCart(val.parentNode.id)));

function handleDetail(e){
    detailsPage.style.display = 'block'
    getId= this.parentNode.id;
    detailsImg.src= data[getId].img;
    detailTitle.innerHTML=   data[getId].name;
    detailPrice.innerHTML= 'Price : $ ' +data[getId].price;
    youSave.innerHTML= 'You save : ($ ' + data[getId].save + ')';
}

function addToCart(id) {
    if(!data[id].itemInCart){
        cartList= [...cartList,data[id]];
        addItem()
        
        alert('item added to your cart')

    }
    else{
        alert('your item is already there')
    }
    data[id].itemInCart= true
}

function refreshPage(){
    detailsPage.style.display = 'none'
}

function hideCart(){
    document.getElementById('main').style.display= "block";
    document.getElementById('cart-container').style.display= "none";
}

function displayCart(){
    document.getElementById('main').style.display= "none";
    document.getElementById('details-page').style.display= "none";
    document.getElementById('cart-container').style.display= "block";
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display= "none";
        document.getElementById('empty-cart').style.display= "block";
    }
    else{
        document.getElementById('empty-cart').style.display= "none";
        document.getElementById('cart-with-items').style.display= "block";
        
    }
}

var totalAmount;
var totalItems;
var totalSaving;

function addItem(){
    totalAmount=0;
    totalItems = 0;
    totalSaving=0
    var clrNode=document.getElementById('item-body');
        clrNode.innerHTML= '';
        console.log(clrNode.childNodes)
        cartList.map((cart)=>
        {
            var cartCont = document.getElementById('item-body');
            totalAmount = totalAmount + cart.price;
            totalSaving = totalSaving + cart.save;
            totalItems = totalItems + 1;

            var tempCart = document.createElement('div')
            tempCart.setAttribute('class','cart-list');
            tempCart.setAttribute('id',cart.id);

            var listImg = document.createElement('img');
            listImg.setAttribute('id','list-img');
            listImg.src = cart.img
            tempCart.appendChild(listImg)

            var listName = document.createElement('h3');
            listName.setAttribute('class','list-name');
            listName.innerHTML = cart.name;
            tempCart.appendChild(listName)

            var listPay = document.createElement('h3');
            listPay.setAttribute('class','pay');
            listPay.innerHTML = cart.price;
            tempCart.appendChild(listPay);

            var listQuantity = document.createElement('h3');
            listQuantity.setAttribute('class','quantity');
            listQuantity.innerHTML = '1';
            tempCart.appendChild(listQuantity);

            var listTrash = document.createElement('i');
            listTrash.setAttribute('class','fa fa-trash ');
            listTrash.setAttribute('id','remove');
            tempCart.appendChild(listTrash);

            cartCont.appendChild(tempCart)
            
        })
        document.getElementById('total-amount').innerHTML = 'Total Amount : $ ' + totalAmount;
        document.getElementById('total-items').innerHTML = 'Total Items : ' + totalItems;
        document.getElementById('you-saved').innerHTML = 'You Saved : $ ' + totalSaving;
        document.getElementById('total').style.display= "block";
}

function removeFromCart(itemId){
    data[itemId].itemInCart = false
    cartList = cartList.filter((list)=>list.id!=itemId);
    addItem()
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display= "none";
        document.getElementById('empty-cart').style.display= "block";
    }
}
