import { createStore } from "vuex";

export default createStore({
  state: {
    products: [
      {
        id: 1,
        name: 'iPhone 13 Pro Max',
        image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80',
        price: 1299.75,
        category: ['phones', 'iphone'],
      },
      {
        id: 2,
        name: 'Samsung Galaxy S21 Ultra',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80',
        price: 1249,
        category: ['phones', 'android'],
      },
      {
        id: 3,
        name: 'Google Pixel 6 Pro',
        image: 'https://images.unsplash.com/photo-1635870664257-430f094c25db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=765&q=80',
        price: 1099,
        category: ['phones', 'android'],
      }
    ],
    shoppingCart: localStorage.shoppingCart ? JSON.parse(localStorage.shoppingCart) : []
  },
  mutations: {
    ADD_TO_CART(state, id) {
      state.shoppingCart.push(id)
      localStorage.shoppingCart = JSON.stringify(state.shoppingCart)
    },
    REMOVE_FROM_CART(state, index) {
      state.shoppingCart.splice(index, 1)
      localStorage.shoppingCart = JSON.stringify(state.shoppingCart)
    }
  },
  actions: {
    addToCart({commit}, id) {
      commit('ADD_TO_CART', id)
    },
    removeFromCart({commit}, index) {
      commit('REMOVE_FROM_CART', index)
    }
  },
  getters: {
    products: (state) => state.products,
    productsByCategory: (state) => (slug) => {
      let arr = []
      state.products.forEach(product => {
        if (product.category.findIndex(cat => cat === slug) !== -1) arr.push(product)
      })
      return arr
    },
    // productById:
    isInCart: (state) => (id) => {
      return state.shoppingCart.findIndex(item => item === id) !== -1
    },
    shoppingCart: (state) => state.shoppingCart,
    shoppingCartData: (state) => {
      const data = []
      state.shoppingCart.map((id, index) => {
        const foundProduct = state.products.find((prod) => prod.id === id)
        data[index] = foundProduct
      })
      return data
    }
  }
});
