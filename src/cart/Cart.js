export default class Cart {
  items = []
  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price
    }, 0)
  }

  addItem(item) {
    this.items.push(item)
  }

}
