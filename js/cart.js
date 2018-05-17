/*
This is global filter (some say this must be put before new Vue()
but for this project it still works even if put after new Vue())
Vue.filter('formatMoney', (value)=>{
    return "$" + value.toFixed(2);
});
*/

new Vue({
	el: '#app',

	data: {
		total: 0, //total price of all products selected
		products: [],
        allChecked: false,
		numChecked: 0, //number of products checked
		del: false, //if we wanna delete some product
		delIndex: 0 //index of product to be deleted
	},

    filters: { //local filter
        formatMoney: function(value) {
        	return "$" + value.toFixed(2);
        }
    },

	//what to do when the webpage is ready (ready instead of mounted for vue verison 1)
	mounted: function() {
		this.$nextTick(function() {
			this.cartView(); //vm.cartView is also OK; BUT may NOT OK if use outside nextTick
		})
	},

	methods: {
		cartView:function() {
  			this.$http.get("data/cartData.json").then(function(res){
	  			this.products=res.data.result.list;
  			})
  		},
        changeQuantity:function(product, amount) {
			if (product.productQuantity > 1 || amount === 1) {
                product.productQuantity += amount;
                if (typeof product.checked !== 'undefined' && product.checked)
                    this.total += amount*product.productPrice;
            }
		},
        toggleChecked: function(product) {
			if (typeof product.checked === 'undefined') {
				//Vue.set(product, 'checked', true); //global registration
				this.$set(product, 'checked', true); //local registration with $
				this.numChecked++;
                this.total += product.productPrice * product.productQuantity;
			}
			else {
                product.checked = !product.checked;
				if (product.checked) {
					this.numChecked++;
                    this.total += product.productPrice * product.productQuantity;
                }
				else {
					this.numChecked--;
                    this.total -= product.productPrice * product.productQuantity;
                }
            }

            //if everything is selected, set this.allChecked = true
			//otherwise, set this.allChecked = false
			this.allChecked = this.numChecked === this.products.length;
		},
        toggleAll: function() {
			this.allChecked = !this.allChecked;
			this.total = 0;
			var _this = this;
			this.products.forEach(function (product, index) {
                if (typeof product.checked === 'undefined')
                    _this.$set(product, 'checked', _this.allChecked);
                else product.checked = _this.allChecked;

                if (_this.allChecked) _this.total += product.productPrice * product.productQuantity;
            })
		},
        delPrep: function(index) {
			this.del = true;
			this.delIndex = index;
		},
        //this feature should actually be handled by the back end:
		//back end should take the index, delete the product and then
		// send us a message saying deleting is(not) successful
        delProduct: function () {
            //change Item total if the deleted product is checked
			var current = this.products[this.delIndex];
			if (current.checked)
                this.total -= current.productPrice * current.productQuantity;
            this.products.splice(this.delIndex, 1);
			this.del = false; //to close the pop up window
        },
		/*
        checkIfSelect: function () {
			if (this.numChecked !== 0) {
                router.go({
                    path:'address.html',
                    activeClass:'active'
                });
			}
        }*/
	}
});
