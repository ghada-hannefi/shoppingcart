var products = new Array(),
    busket = new Array(0, 0, 0, 0),
    maKouffaAncre = document.getElementById("maKouffa"),
    shoppingHallAncre = document.getElementById("shoppingHall"),
    shoppingHallNavBarLink = document.getElementById("navBar-ShoppingHallLink"),
    maKouffaNavBarLink = document.getElementById("navBar-MaKouffaLink");


products = [
    ["1", "./assets/images/xdbHo4E.png", "WOMEN LEATHER BAG", 230.990],
    ["2", "./assets/images/montre.png", "MEW WATCH", 320.800],
    ["3", "./assets/images/parfum.png", "WOMEN COCO PERFUM", 101.550],
    ["4", "./assets/images/pngegg.png", "MEN JACKET", 99.900]
]

shoppingHallNavBarLink.addEventListener("click", (e) => {
    console.log("ma")
    shoppingHallAncre.classList.add("active");
    maKouffaAncre.classList.remove("active");
    console.log(maKouffaAncre)
    console.log(shoppingHallAncre)
    maKouffaAncre.style.display = "none";
    shoppingHallAncre.style.display = "block";
});

maKouffaNavBarLink.addEventListener("click", (e) => {
    shoppingHallAncre.classList.remove("active");
    maKouffaAncre.classList.add("active");
    console.log(maKouffaAncre)
    console.log(shoppingHallAncre)
    shoppingHallAncre.style.display = "none";
    maKouffaAncre.style.display = "block";
});


function myFct(id) {
    busket[id] += 1;
    console.log(busket[id])
    if (busket[id] - 1 == 0) {
        addProductToBusket(id);
    } else {
        calculateNewQuantity(id, "increment");
    }
}

//function to  update quantity and total/product and kouffaTotal
function calculateNewQuantity(id, typeOfOperation) {
    let ope = typeOfOperation == "increment" ? 1 : -1;
    let newQty = parseInt(document.getElementById(`qtyProduct-${id}`).value) + 1 * ope;
    if (newQty != 0) {
        document.getElementById(`qtyProduct-${id}`).value = newQty;
        console.log(newQty);
        let newUTotal = (newQty * parseFloat(document.getElementById(`upriceProduct-${id}`).innerText)).toFixed(2);
        document.getElementById(`totalProduct-${id}`).innerText = newUTotal;
        console.log(busket);
        calculateNewTotal(newUTotal);
        console.log(newQty * parseFloat(document.getElementById(`upriceProduct-${id}`).innerText));
        console.log(document.getElementById(`totalProduct-${id}`).value);
    }
}



document.getElementById("Product-1").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("ok1");
    myFct(0);
});
document.getElementById("Product-2").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("ok2");
    myFct(1);
});
document.getElementById("Product-3").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("ok3");
    myFct(2);
});
document.getElementById("Product-4").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("ok4");
    myFct(3);
});




function addProductToBusket(id) {
    let productDom = `
    <div class="layout-inline" id ="productDom-${id}">
        <div class="col col-pro layout-inline"><img src="${products[id][1]}" style="wih:50px; height:50px" alt="" />
            <p>${products[id][2]}</p>
        </div>
        <div class="col  col-numeric align-center ">
            <p id="upriceProduct-${id}">${products[id][3]}</p>
        </div>
        <div class="col col-qty layout-inline">
            <button id="incrementProduct-${id}" class="fa fa-plus-circle qty operations"  aria-hidden="true" onclick='console.log("test20");calculateNewQuantity(${id}, "increment");'></button>
            <input type="texte" id="qtyProduct-${id}" value="1" min="1" onchange="" readonly/>
            <button type="button" id="decreasesProduct-${id}" class="fa fa-minus-circle qty operations" aria-hidden="true" onclick='console.log("test21");calculateNewQuantity(${id}, "decreases");'></button>
        </div>
        <div class="col col-vat col-numeric align-center">
            <p>0</p>
        </div>
        <div class="col col-total col-numeric align-center">
            <p id="totalProduct-${id}">${products[id][3]*busket[id]}</p>
        </div>
        <div class="col col-ope inlineGroupe align-center">
            <button type="button" class="col align-center fa fa-heart operations" onclick="this.style.color = this.style.color == 'red' ? '#43ace3' : 'red';" ></button>
            <button type="button" class="col align-center fa fa-times-circle operations" onclick="deleteProduct(this.parentElement.parentElement.id)"></button>
        </div>
    </div>
    `;
    document.getElementById("busketProducts").insertAdjacentHTML("beforeend", productDom);
}

function calculateNewTotal() {
    console.log("calculateNewTotal");
    let som = 0,
        utotal;
    for (let id = 0; id < 4; id++) {
        console.log("busket[id]", busket[id])
        if (busket[id] !== 0) {
            console.log("document.getElementById('totalProduct-'+id): ", document.getElementById('totalProduct-' + id))
            som += parseFloat(document.getElementById('totalProduct-' + id).innerText);
            console.log("som: ", som)
        }
    }
    document.getElementById("myKouffa-Total").innerText = som;
}


function deleteProduct(domID) {
    let id = domID.substring(domID.length - 1);;
    console.log("id", id)
    console.log("domID", domID)
    busket[id] = 0;
    document.getElementById(domID).remove();
    calculateNewTotal();
}