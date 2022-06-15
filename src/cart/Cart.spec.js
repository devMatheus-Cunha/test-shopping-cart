import Cart from './Cart';

describe('Cart', () => {
  let cart;
  let productOne = {
    title: 'Adidas',
    price: 120,
  };
  let productTwo = {
    title: 'Nike',
    price: 100,
  };

  // before each test
  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal(', () => {
    it('should return 0 when getTotal() is executed in a newly created instace ', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product: productOne,
        quantity: 2,
      };
      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(240);
    });

    it('should ensure no more than on product quantity exists at a time', () => {
      cart.add({
        product: productOne,
        quantity: 2,
      });
      cart.add({
        product: productOne,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(240);
    });

    it('should update total when a product gets included then removed ', () => {
      cart.add({
        product: productOne,
        quantity: 2,
      });
      cart.add({
        product: productTwo,
        quantity: 1,
      });

      cart.remove(productOne);

      expect(cart.getTotal().getAmount()).toEqual(100);
    });
  });

  describe('checkout', () => {
    it('should return object with the total and the list of items', () => {
      cart.add({
        product: productOne,
        quantity: 2,
      });
      cart.add({
        product: productTwo,
        quantity: 5,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should return object with the total and the list of items when summary is called', () => {
      cart.add({
        product: productOne,
        quantity: 2,
      });
      cart.add({
        product: productTwo,
        quantity: 5,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0)
    });

    it('should reset the cart  when checkout() is called', () => {
      cart.add({
        product: productTwo,
        quantity: 5,
      });
      cart.checkout()

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe('special conditios', () => {
    it('should apply percentage discount quantity above minimum is passed ', () => {
      const condition = {
        percentage: 30,
        minimum: 2
      }

      cart.add({
        product: productOne,
        condition,
        quantity: 3
      })

      expect(cart.getTotal().getAmount()).toEqual(252)
    });
  });
});
