import
Cart
from './Cart'

describe('Cart', () => {
  let cart;
  let product = {
    title: 'Adidas',
    price: 120
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
      product,
      quantity: 2
    }
    cart.add(item)

    expect(cart.getTotal()).toEqual(240)
  });

  it('should ensure no more than on product quantity exists at a time', () => {

    cart.add({
      product,
      quantity: 2
    })
    cart.add({
      product,
      quantity: 1
    })

    expect(cart.getTotal()).toEqual(240)
  });
});
