import find from "lodash/find"
import remove from "lodash/remove"

export default class Cart {
  items = []


  add(item) {
    const itemToFindRepetProduct = {
      product: item.product
    }
    if (find(this.items, itemToFindRepetProduct)) {
      remove((this.items, itemToFindRepetProduct))
      return
    }
    this.items.push(item)
  }

  remove(product) {
    remove(this.items, {
      product
    })
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price
    }, 0)
  }

  checkout() {
    return {
      total: this.getTotal(),
      items: this.items
    }
  }

}
