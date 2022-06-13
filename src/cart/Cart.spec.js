import
Cart
from './Cart'

describe('Cart', () => {
  let cart;

  // before each test
  beforeEach(() => {
    cart = new Cart()
  })

  it('should return 0 when getTotal() is executed in a newly created instace ', () => {

    expect(cart.getTotal()).toEqual(0)
  });

  it('should multiply quantity and price and receive the total amount', () => {
    const item = {
      product: {
        title: 'Adidas',
        price: 120
      },
      quantity: 2
    }
    cart.addItem(item)

    expect(cart.getTotal()).toEqual(240)
  });
});
