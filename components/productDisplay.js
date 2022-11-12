app.component('product-display', {
    props: {
        type: Boolean,
        required: true
    },
    template: 
    /*html*/
    `<div class="product-display">
    <div class="product-container">
    <div class="product-image">
        <img v-bind:src="image">
    </div>
    <div class="product-info">
      <h2 v-if="onSale">{{ title }} : On Sale</h2>
      <h2 v-if="!onSale">{{ title }} : Not On Sale</h2>
      <p v-if="InStock">In stock</p>
      <p v-else>Out of Stock</p>
      <p>Shipping: {{ shipping }}</p>
      <p v-if="Inventory > 0">Available</p>
      <!-- <p v-if="onSale">On Sale</p> -->
        <product-details :details="details"></product-details>
      <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
      class="color-circle" :style="{backgroundColor: variant.color}">
      </div>
      <button class="button" 
      :disabled="!InStock"
      :class="{disabledButton: !InStock}"
      v-on:click="addToCart">Add to Cart</button>
      <button class="button" v-on:click="removeFromCart">Remove Item</button>
    </div>
    </div>
    <review-display v-if="reviews.length" :reviews="reviews"></review-display>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data(){
    return {
        product : 'Socks',
        selectedVariant: 0,
        brand: 'Vue Mastry',
        Inventory: 8,
        details: ['50% Cotton', '30% wool', '20% Polyester'],
        variants: [
            {id: 2244, color:'green', image: '../assets/images/socks_green.jpg', Quantity: 50, onSale:true},
            {id: 2246, color:'red', image: '../assets/images/socks_blue.jpg', Quantity: 0 , onSale: false}
        ],
        reviews: []
    }
},

methods: {
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
    },
    updateImage(variantImage) {
        this.image = variantImage;
    },
    updateVariant(index) {
        this.selectedVariant = index;
        console.log(index);
    },
    addReview(review) {
        this.reviews.push(review);
    }
},
computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        InStock() {
            return this.variants[this.selectedVariant].Quantity;
        },
        onSale() {
            return this.variants[this.selectedVariant].onSale;
        },
        shipping() {
            if (this.premium){
                return 'Free'
            }else{
                return 2.99
            } 
        }
}
})