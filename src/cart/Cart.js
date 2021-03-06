import find from "lodash/find"
import remove from "lodash/remove"
import {
  calculateDiscount,
  Money
} from './utils'


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
    return this.items.reduce((acc, {
      quantity,
      product,
      condition
    }) => {
      const amount = Money({
        amount: quantity * product.price
      })

      let discount = Money({
        amount: 0
      })

      if (condition) {
        discount = calculateDiscount(amount, quantity, condition)
      }

      return acc.add(amount).subtract(discount)
    }, Money({
      amount: 0
    }))
  }

  summary() {
    const total = this.getTotal()
    const formatted = total.toFormat('$0,0.00')
    const items = this.items

    return {
      total,
      formatted,
      items,
    }
  }

  checkout() {
    const {
      total,
      items
    } = this.summary()

    this.items = []

    return {
      total: total.getAmount(),
      items,
    }
  }

}
