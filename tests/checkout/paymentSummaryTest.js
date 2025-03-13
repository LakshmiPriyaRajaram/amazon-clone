import { cart } from "../../data/cart-class.js";
import { getProducts, products, loadProducts, loadProductsFetch } from "../../data/products.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";
import formatCurrency from "../../scripts/utils/money.js";

describe("test suite : renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  let cartQuantity = 0;
  let productPriceCents = 0;

  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    })
  }); 
  

  beforeEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
    <div class="js-payment-summary"></div>
    `;

    spyOn(Storage.prototype, "setItem");
    cart.cartItem = [
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];

    cartQuantity = cart.updateCartQuantity(cartQuantity);
    cart.cartItem.forEach((cartItem) => {
      const product = getProducts(cartItem.productId);
      productPriceCents += product.priceCents * cartItem.quantity;
    });
    renderPaymentSummary();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = ``;
  });

  it("displays the payment summary", () => {
    expect(document.querySelector(".js-payment-quantity").innerText).toContain(
      cartQuantity
    );
    expect(
      document.querySelector(".js-payment-summary-money").innerText
    ).toContain(formatCurrency(productPriceCents));
  });
});
