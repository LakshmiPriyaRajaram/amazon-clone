import { cart } from "../../data/cart-class.js";

describe("test suite: addToCart", () => {
  beforeEach(() => {
    document.querySelector(".js-test-container").innerHTML = 
    `<input id="js-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6" value="1" ;">`;
    spyOn(Storage.prototype, "setItem");
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
    `;
  });

  it("adds an existing product to the cart", () => {
    cart.cartItem = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];

    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItem[0].quantity).toEqual(2);
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ])
    );
  });

  it("adds a new product to the cart", () => {
    cart.cartItem = [];

    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItem[0].quantity).toEqual(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
  });
});

describe("test suite: removeFromCart", () => {
  beforeEach(() => {
    spyOn(Storage.prototype, "setItem");
    cart.cartItem = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];
  });

  it("removes a product from the cart", () => {
    cart.removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItem.length).toEqual(0);
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([])
    );
  });

  it("does nothing if product is not in the cart", () => {
    cart.removeFromCart("does-not-exist");
    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItem[0].quantity).toEqual(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
  });
});

describe("test suite: updateDeliveryOptions", () => {
  beforeEach(() => {
    spyOn(Storage.prototype, "setItem");
    cart.cartItem = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];
  });

  it("updates the delivery options", () => {
    cart.updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "3");
    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItem[0].quantity).toEqual(1);
    expect(cart.cartItem[0].deliveryOptionId).toEqual("3");
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "3",
        },
      ])
    );
  });

  it("does nothing if the product is not in the cart", () => {
    cart.updateDeliveryOption("doesnot exists", "3");
    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItem[0].quantity).toEqual(1);
    expect(cart.cartItem[0].deliveryOptionId).toEqual("1");
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(0);
  });

  it("does nothing if the deliveryOption does not exits", () => {
    cart.updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "4");
    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItem[0].quantity).toEqual(1);
    expect(cart.cartItem[0].deliveryOptionId).toEqual("1");
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(0);
  });
});
