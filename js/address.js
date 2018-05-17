new Vue({
    el: '.container',

    data: {
        addresses: [],
        shipping: 0, //standard 3-day shipping or next-day shipping
        currAddrID: 0, //addressId of the last address
        numShown: 3, //number of addresses shown, the default is 3, clicking more changes it to addresses.size
        selectedIndex: 0, //index of the addresses selected
        defaultIndex: 0, //index of the default address

        del: false,
        delIndex: 0,

        add: false,
        newAddr: {
            "addressId": 0,
            "userName":"",
            "streetName":"",
            "postCode":"",
            "tel":"",
            "isDefault": true
        },

        edit: false,
        editIndex: 0,
    },

    mounted: function() {
        this.$nextTick(function() {
            this.getAddresses();
        })
    },

    computed: {
        filterAddress: function () {
            return this.addresses.slice(0, this.numShown);
        }
    },

    methods: {
        getAddresses: function () {
            this.$http.get("data/address.json").then(function(res){
                var result = res.data.result;
                if (res.data.status === 0) {
                    this.addresses = result;
                    this.currAddrID = result[result.length-1].addressId;
                }
            })
        },
        delPrep: function (index) {
            this.del = true;
            this.delIndex = index;
        },
        delAddress: function () {
            this.addresses.splice(this.delIndex, 1);
            this.del = false; //to close the pop up window
        },
        addNew: function () {
            this.newAddr.addressId = ++this.currAddrID;
            this.addresses.unshift(this.newAddr);
            this.add = false;
            defaultIndex = 0;
            this.newAddr = {
                "addressId": 0,
                "userName": "",
                "streetName": "",
                "postCode": "",
                "tel": "",
                "isDefault": true
            }
        }
    }
});