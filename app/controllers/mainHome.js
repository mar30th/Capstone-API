let callapi = new Callapi();
let cart = [];

function getListProduct() {
    callapi
    .fetchLishData()
    .then(function (result) {
        renderDataHomePage(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

getListProduct();


const renderDataHomePage = (data) => {
    let content = ``;
    data.forEach(function (product) {
        content += `
        <div class="col-sm-4">
        <div class="best_phone">
            <p class="best_text">${product.name}</p>
            <p>${product.type}</p>
            <div class="phone_icon"><img src="../../img/${product.img}"></div>
            <div class="star_text">
                <div class="left_part">
                    <ul>
                        <li><a href="#"><img src="img/star-icon.png"></a></li>
                        <li><a href="#"><img src="img/star-icon.png"></a></li>
                        <li><a href="#"><img src="img/star-icon.png"></a></li>
                        <li><a href="#"><img src="img/star-icon.png"></a></li>
                        <li><a href="#"><img src="img/star-icon.png"></a></li>
                    </ul>

                </div>
                <div class="right_part">
                    <div class="phone_price">$ <span style="color: #ff4e5b;">${product.price}</span></div>
                </div>
            </div>
            <button onclick="getDataCart(${product.id})" class="btn btn-primary">Add to cart</button>
        </div>
    </div>
        `;
    })

    document.getElementById("product__main").innerHTML = content;
};

    const handleAddToCart = (prod) => {
    const cloneCart = [...this.cart];

    const foundProduct = cloneCart.find((item) => {
        return item.product.id === prod.id;
    });
    if(!foundProduct) {
        const cartItem = {
            product: {id: prod.id, price: prod.price, name: prod.name},
            quantity: 1,
        };

        cloneCart.push(cartItem);
    }
    else foundProduct.quantity += 1;
    console.log(cloneCart);
};

document.getElementById("searchProduct").addEventListener("keyup", function () {
    var keyword = document.getElementById("searchProduct").value;
  
    var ArrResult = dsnv.timKiemNV(keyword);
    renderDataHomePage(ArrResult);
  });

  function getDataCart(id) {
    callapi
      .getProductByID(id)
      .then(function (result) {
        addToCart(
          result.data.id,
          result.data.name,
          result.data.price,
          result.data.img
        );
        renderCart(cart);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function addToCart(id, name, price, img) {
    let product = new Product(id, name, price, img);
    let cartItem = {
      item: product,
      count: 1,
    };
    for (let i in cart) {
      if (cart[i].item.id === cartItem.item.id) {
        cart[i].count++;
        saveCart();
        return;
      }
    }
    cart.push(cartItem);
    console.log(cartItem);
    saveCart();
  }

  function renderCart(data) {
    let cart = [];
    cart = data;
    console.log(cart.length);
    let contentHTML = "";
    if (cart.length == 0) {
      contentHTML = `
      <tr>
        <td colspan="4">
          <p style="font-size: 18px;">"Your cart is empty"</p>
        </td>
      </tr>
      `;
    }
    for (let i = 0; i < cart.length; i++) {
      contentHTML += `
      <tr>
        <td class="pt-3 pb-3"><img src=" ./admin-page/img/${
          cart[i].item.img
        }" alt="" width = 100px></td>
        <td class="">${(cart[i].item.name)}</td>
        <td class="">${cart[i].item.price}</td>
        <td class="">
          <span>
            <button class="btn btn-secondary" onclick="minusItem('${
              cart[i].item.id
            }')">-</button>
              ${cart[i].count}
            <button class="btn btn-secondary" onclick="plusItem('${
              cart[i].item.id
            }','${cart[i].item.name}','${cart[i].item.price}'), '${
            cart[i].item.img
            }'">+</button>  
          <span>
        </td>
        <td>
          <button class="btn btn-danger" onclick="deleteItem('${
            cart[i].item.id
          }')">Delete</button>
        </td>
      </tr>
      `;
    }
    document.getElementById("renderCart").innerHTML = contentHTML;
    document.getElementById("cart-footer").innerHTML =
      `           
      <span >
        <button class="btn btn-success" onclick="checkout()">
          Purchase
        </button>
      </span>` +
      "<h3>Total: $</h3> " +
      "<h3>" +
      totalPrice() +
      "</h3>";
  };
  document.getElementById("cartDisplay").innerHTML = totalCount()

  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }
  function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
    renderCart(cart);
  }