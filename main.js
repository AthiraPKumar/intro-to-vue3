const app = Vue.createApp({
    data(){
        return {
            cart: [],
            premium: true
        }
    },

    methods: {
        updateCart(id){
            this.cart.push(id);
        },
        removeFromCart(id){
            this.cart.pop(id);
        }
    }

})
