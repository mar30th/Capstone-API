let callapi = new Callapi();
let productPicFromSV = "";

getListProduct();

function getListProduct() {
  callapi
    .fetchLishData()
    .then(function (result) {
      renderdata(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//renderdata
const renderdata = (data) => {
  var content = "";
  data.forEach(function (product, i) {
    content += `
        <tr>
        <th scope="row">${i + 1}</th>
        <td class="tm-product-name">${product.name}</td>
        <td class="tm-product-name">${product.price}</td>
        <td class="tm-product-name">${product.screen}</td>
        <td class="tm-product-name">${product.backCamera}</td>
        <td class="tm-product-name">${product.frontCamera}</td>
        <td class="tm-product-name"><img class="w-50" src="${
          product.img
        }" alt=""></td>
        <td class="tm-product-name">${product.desc}</td>
        <td class="tm-product-name">${product.type}</td>
        <td>
        <div class="d-flex">
          <a onclick="handleDelete(${product.id});"class="tm-product-delete-link m-1">
            <i
              class="far fa-trash-alt tm-product-delete-icon"
            ></i>
          </a>
          <a onclick="handleEdit(${product.id})" data-toggle="modal" data-target="#myModal" class="tm-product-delete-link m-1">
          <i class="fas fa-pen-square tm-product-delete-icon"></i>
        </a>
        </div>
        </td>
      </tr>
        `;
  });
  document.getElementById("productList").innerHTML = content;
};

const handleDelete = (id) => {
    callapi
        .deleteProduct(id)
        .then(function () {
            getListProduct();
        })
        .catch(function (error) {
            console.log(error);
        })
};

const handleEdit = (id) => {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Update Product"
  var btnUpdate = `<a onclick="handleUpdate(${id})" class="btn btn-primary btn-block text-uppercase mb-3 w-25">Update</a>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  callapi
  .getProductByID(id)
  .then(function (result){
    var product = result.data;
    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("screen").value = product.screen;
    document.getElementById("bcamera").value = product.backCamera;
    document.getElementById("fcamera").value = product.frontCamera;
    productPicFromSV = product.img;
    document.getElementById("type").value = product.type;
    document.getElementById("description").value = product.desc;
    chooseFile(productPicFromSV);
    document.getElementById("productImage").innerHTML =  `<img src="${productPicFromSV}" id="productImg" style="object-fit: cover; width: 180px;"></img>`
  })
  .catch(function (error){
    console.log(error);
  })
};

const handleUpdate = (id) => {
  let name = document.getElementById('name').value;
  let price = document.getElementById("price").value;
  let screen = document.getElementById("screen").value;
  let backCamera = document.getElementById("bcamera").value;
  let frontCamera = document.getElementById("fcamera").value;
  let img = "";
  if (document.getElementById("imgFile").files.length > 0) {
    img = document.getElementById("imgFile").files[0].name;
  };

  if(!img){
    img = productPicFromSV;
  }
  let desc = document.getElementById("description").value;
  let type = document.getElementById("type").value;

  let product = new Product(id, name, price, screen, backCamera, frontCamera, img, desc, type);
  callapi
  .putProductByID(product)
  .then(function(){
    getListProduct();
    document.getElementById("productForm").reset();
    productPicFromSV = "";
    document.getElementsByClassName("close")[0].click();
  })
  .catch(function(error) {
    console.log(error);
  })
};


//Add product
document.getElementById("btnAdd").addEventListener("click", function () {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add New Product";
  var btnAdd = `<a onclick="handleAdd()" class="btn btn-primary btn-block text-uppercase mb-3 w-25">Add</a>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});


const handleAdd = () => {
  let name = document.getElementById('name').value;
  let price = document.getElementById("price").value;
  let screen = document.getElementById("screen").value;
  let backCamera = document.getElementById("bcamera").value;
  let frontCamera = document.getElementById("fcamera").value;
  let img = "";
  if (document.getElementById("imgFile").files.length > 0) {
    img = document.getElementById("imgFile").files[0].name;
  };
  let desc = document.getElementById("description").value;
  let type = document.getElementById("type").value;

  let product = new Product(``, name, price, screen, backCamera, frontCamera, img, desc, type);

  callapi
  .addProduct(product)
  .then(function(){
    getListProduct();
    document.getElementById("productForm").reset();
    document.getElementsByClassName("close")[0].click();
  })
  .catch(function(error){
    console.log(error);
  })
};


const chooseFile = (imgFile) => {
  document.getElementById("uploadIcon").style.display = "none";
  if(imgFile.files && imgFile.files[0]){
    let reader = new FileReader();

    reader.onload = function (e) {
      $('#productImg').attr('src', e.target.result);
    }
    reader.readAsDataURL(imgFile.files[0]);
  }
};

// $("#myModal").modal("show");
$('#myModal').on('hidden.bs.modal', function () {
    $('#myModal form')[0].reset();
    document.getElementById("productImage").innerHTML =  `<img src="" id="productImg" style="object-fit: cover; width: 180px;"></img>`
    });