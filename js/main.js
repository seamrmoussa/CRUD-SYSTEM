var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var ProductFileImg = document.getElementById("ProductFileImg");
var ProductFileImgName = document.getElementById("ProductFileImgName");
var searchElement = document.getElementById("search");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");

var productList = [];

var productIndexForUpdate = null;

if (localStorage.getItem("boxData") != null) {
  productList = JSON.parse(localStorage.getItem("boxData"));
  searchAndDisplayProduct();
}

function productStorage() {
  localStorage.setItem("boxData", JSON.stringify(productList));
}

function clearFormAndValidation() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
  ProductFileImg.value = "";

  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productDescription.classList.remove("is-valid");
  ProductFileImg.classList.remove("is-valid");
}

function addProduct() {
  if (
    validation(productName, "nameErrMsg") &&
    validation(productPrice, "priceErrMsg") &&
    validation(productCategory, "categoryErrMsg") &&
    validation(productDescription, "descriptionErrMsg") &&
    validation(ProductFileImg, "fileImgErrMsg")
  ) {
    var product = {
      name: productName.value.trim(),
      price: productPrice.value,
      category: productCategory.value.trim(),
      description: productDescription.value.trim(),
      img: ProductFileImg.files[0]
        ? `assets/img/${ProductFileImg.files[0].name}`
        : "assets/img/5.png",
    };
    productList.push(product);

    clearFormAndValidation();
    productStorage();
    searchAndDisplayProduct();
  }
}

function searchAndDisplayProduct() {
  var boxProductData = "";
  var reg = new RegExp(searchElement.value, "gi");

  for (var i = 0; i < productList.length; i++) {
    var priceText = productList[i].price
      ? `${productList[i].price} <span class="fw-bold text-success">EGP</span>`
      : "";
    if (
      productList[i].name
        .toLowerCase()
        .includes(searchElement.value.toLowerCase())
    ) {
      boxProductData += `<div class="col-sm-6 col-lg-4 col-xl-3">
                <div
                  class="inner border border-3 border-info rounded-3 overflow-hidden"
                >
                <div style="height: 200px;">
                  <img
                    src="${productList[i].img}"
                    alt="${productList[i].name}"
                    class="w-100"
                    height="200px"
                  />
                </div>
                  <div class="p-2">
                    <h4>
                       ${productList[i].name
                         .split(" ")
                         .slice(0, 3)
                         .join(" ")
                         .replace(
                           reg,
                           (par) => `<span class="bg-danger">${par}</span>`,
                         )}
                    </h4>
                    <h5>
                     Price: ${priceText}
                    </h5>
                    <h6>
                      Model: ${productList[i].category}
                    </h6>
                    <h6>
                      Desc: ${productList[i].description}
                    </h6>
                  </div>
                  <div
                    class="d-flex gap-4 align-items-center justify-content-center pb-2"
                  >
                    <button onclick="deleteItem(${i})" class="btn btn-danger">
                      <i class="fa-solid fa-trash text-warning h5 my-0"></i>
                    </button>
                    <button onclick="getDataToUpdate(${i})" class="btn btn-warning">
                      <i
                        class="fa-solid fa-pen-to-square text-danger h5 my-0"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>`;
    }
  }

  document.getElementById("rowDataProducts").innerHTML = boxProductData;
}

function deleteItem(index) {
  productList.splice(index, 1);
  productStorage();
  searchAndDisplayProduct();
}

function getDataToUpdate(index) {
  productIndexForUpdate = index;
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDescription.value = productList[index].description;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

function updateProductData() {
  if (
    validation(productName, "nameErrMsg") &&
    validation(productPrice, "priceErrMsg") &&
    validation(productCategory, "categoryErrMsg") &&
    validation(productDescription, "descriptionErrMsg")
  ) {
    productList[productIndexForUpdate].name = productName.value;
    productList[productIndexForUpdate].price = productPrice.value;
    productList[productIndexForUpdate].category = productCategory.value;
    productList[productIndexForUpdate].description = productDescription.value;
    productList[productIndexForUpdate].img = ProductFileImg.files[0]
      ? `assets/img/${ProductFileImg.files[0].name}`
      : productList[productIndexForUpdate].img;

    btnUpdate.classList.add("d-none");
    btnAdd.classList.remove("d-none");

    clearFormAndValidation();
    productStorage();
    searchAndDisplayProduct();
  }
}

function validation(element, eleErrMsg) {
  var regex = {
    // Writing name product except <scripts>.
    productName: /^[a-zA-Z\u0600-\u06FF0-9\s.,!?@]{3,15}$/i,
    productPrice: /^(100|[1-9]\d{2,6})(\.\d{1,2})?$/,
    productCategory: /^(TV|Mobile|IPhone|LapTop)$/,
    // Writing anything except <scripts>.
    productDescription: /^[a-zA-Z\u0600-\u06FF0-9\s.,!?@]{10,18}$/i,
    //any images with type (jpeg , jpg , png , gif , webp , bmp) except <scripts>.
    ProductFileImg: /^.+\.(jpg|jpeg|png|gif|webp|bmp)$/i,
  };

  var term = element.value;

  var errorMsg = document.getElementById(eleErrMsg);

  if (regex[element.id].test(term)) {
    errorMsg.classList.add("d-none");
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    return true;
  } else {
    errorMsg.classList.remove("d-none");
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}
