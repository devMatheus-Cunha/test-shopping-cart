import
Cart
from './Cart'

describe('Cart', () => {
  let cart;
  let productOne = {
    title: 'Adidas',
    price: 120
  }
  let productTwo = {
    title: 'Nike',
    price: 100
  }

  // before each test
  beforeEach(() => {
    cart = new Cart()
  })

  it('should return 0 when getTotal() is executed in a newly created instace ', () => {

    expect(cart.getTotal()).toEqual(0)
  });

  it('should multiply quantity and price and receive the total amount', () => {
    const item = {
      product: productOne,
      quantity: 2
    }
    cart.add(item)

    expect(cart.getTotal()).toEqual(240)
  });

  it('should ensure no more than on product quantity exists at a time', () => {

    cart.add({
      product: productOne,
      quantity: 2
    })
    cart.add({
      product: productOne,
      quantity: 1
    })

    expect(cart.getTotal()).toEqual(240)
  });

  it('should update total when a product gets included then removed ', () => {
    cart.add({
      product: productOne,
      quantity: 2
    })
    cart.add({
      product: productTwo,
      quantity: 1
    })

    cart.remove(productOne)

    expect(cart.getTotal()).toEqual(100)
  });
});
