const url =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";
const titleEl = document.querySelector(".product-title");
const vendorEl = document.querySelector(".product-vendor");
const priceEl = document.querySelector(".price");
const mrpEl = document.querySelector(".mrp");
const descriptionEl = document.querySelector(".description");
const discountEl = document.querySelector(".discount");
const imageEl = document.querySelector(".big-img img");
const colorSelector = document.querySelector(".colors");
const quantity = document.querySelector(".quantity-input");
let add = document.querySelector(".add");
//colors
const clr1 = document.querySelector(".clr1");
const clr2 = document.querySelector(".clr2");
const clr3 = document.querySelector(".clr3");
const clr4 = document.querySelector(".clr4");
//sizes
let smallEl = document.querySelector(".small");
let mediumEl = document.querySelector(".medium");
let largeEl = document.querySelector(".large");
let extraLargeEl = document.querySelector(".extra-large");
let doubleExtraLargeEl = document.querySelector(".double-extra-large");
//images
let bigImg = document.querySelector(".big-img img");

//product thumbnail images
function showImg(pic) {
  bigImg.src = pic;
}

// fetching data from api

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.product);

    // Update HTML elements with  details

    //imageEl.src = data.product.images[3].src;
    titleEl.textContent = data.product.title;
    vendorEl.textContent = data.product.vendor;
    priceEl.textContent = `${data.product.price}.00`;
    mrpEl.textContent = `${data.product.compare_at_price}.00`;
    descriptionEl.textContent = data.product.description;
    //removed the <p> tag from the api string
    descriptionEl.textContent = descriptionEl.textContent.replace(
      /<p data-mce-fragment=\"1\">/g,
      ""
    );
    descriptionEl.textContent = descriptionEl.textContent.replace(
      /<\/\p>/g,
      ""
    );
    //console.log(descriptionEl.textContent);

    // removed $ symbol from api
    const calcMrp = mrpEl.textContent.replace("$", "");
    const calcPrice = priceEl.textContent.replace("$", "");

    //discount calculation
    let discountCalcultion = `${Math.trunc(
      ((calcMrp - calcPrice) / calcMrp) * 100
    )}`;
    discountEl.textContent = `${discountCalcultion}%`;

    // Add color variants
    let result = "";
    let colorName = "";

    clr1.style.backgroundColor = data.product.options[0].values[0].Yellow;
    clr1.addEventListener("click", () => {
      clr1.value = data.product.options[0].values[0].Yellow;
      result = clr1.value;
      colorName = hexToColorName(result);
      console.log(colorName);
    });

    clr2.style.backgroundColor = data.product.options[0].values[1].Green;
    clr2.addEventListener("click", () => {
      clr2.value = data.product.options[0].values[1].Green;
      result = clr2.value;
      colorName = hexToColorName(result);
      console.log(colorName);
    });
    clr3.style.backgroundColor = data.product.options[0].values[2].Blue;
    clr3.addEventListener("click", () => {
      clr3.value = data.product.options[0].values[2].Blue;
      result = clr3.value;
      colorName = hexToColorName(result);
      console.log(colorName);
    });

    clr4.style.backgroundColor = data.product.options[0].values[3].Pink;
    clr4.addEventListener("click", () => {
      clr4.value = data.product.options[0].values[3].Pink;
      result = clr4.value;
      colorName = hexToColorName(result);
      console.log(colorName);
    });

    // hex to color name

    function hexToColorName(hex) {
      const colorMap = {
        "#ECDECC": "Yellow",
        "#BBD278": "Green",
        "#BBC1F8": "Blue",
        "#FFD3F8": "Pink",
        // Add more color as per requirement
      };

      return colorMap[hex.toUpperCase()] || "Unknown";
    }

    colorName = hexToColorName("12456");

    //console.log(colorName)

    //Add size variant

    smallEl.textContent = data.product.options[1].values[0];
    mediumEl.textContent = data.product.options[1].values[1];
    largeEl.textContent = data.product.options[1].values[2];
    extraLargeEl.textContent = data.product.options[1].values[3];
    doubleExtraLargeEl.textContent = data.product.options[1].values[4];
    //console.log(smallEl, mediumEl, largeEl, extraLargeEl, doubleExtraLargeEl);

    let sizeResult = "";
    let labelEl;

    let input1 = document.querySelector(".inp1");
    input1.addEventListener("click", () => {
      let labelEl = document.querySelector(".size");
      labelEl.value = data.product.options[1].values[0];
      sizeResult = labelEl.value;
      console.log(sizeResult);
    });

    let input2 = document.querySelector(".inp2");
    input2.addEventListener("click", () => {
      labelEl = document.querySelector(".size");
      labelEl.value = data.product.options[1].values[1];
      sizeResult = labelEl.value;
      console.log(sizeResult);
    });

    let input3 = document.querySelector(".inp3");
    input3.addEventListener("click", () => {
      labelEl = document.querySelector(".size");
      labelEl.value = data.product.options[1].values[2];
      sizeResult = labelEl.value;
      console.log(sizeResult);
    });

    let input4 = document.querySelector(".inp4");
    input4.addEventListener("click", () => {
      labelEl = document.querySelector(".size");
      labelEl.value = data.product.options[1].values[3];
      sizeResult = labelEl.value;
      console.log(sizeResult);
    });

    let input5 = document.querySelector(".inp5");
    input5.addEventListener("click", () => {
      labelEl = document.querySelector(".size");
      labelEl.value = data.product.options[1].values[4];
      sizeResult = labelEl.value;
      console.log(sizeResult);
    });

    //quantity select
    const minusBtn = document.querySelector(".minus-btn");
    const plusBtn = document.querySelector(".plus-btn");
    const quantityInput = document.querySelector(".quantity-input");
    let value = parseInt(quantityInput.value);

    //decrement
    minusBtn.addEventListener("click", function () {
      if (value > 1) {
        quantityInput.value = value -= 1;
        console.log(quantityInput.value);
      }
    });

    //increament
    plusBtn.addEventListener("click", function () {
      quantityInput.value = value += 1;
      console.log(quantityInput.value);
    });

    //add to cart with message
    add.addEventListener("click", () => {
      const cartMsg = `${quantityInput.value} Quantity of ${titleEl.textContent} with Color ${colorName} and Size  ${sizeResult} added to cart.`;
      document.querySelector(".add-to-cart-msg").textContent = cartMsg;
      document.querySelector(".add-to-cart-msg").style.display = "block";
      console.log(cartMsg);
    });
  })
  .catch((error) => console.error("Error fetching product details:", error));
