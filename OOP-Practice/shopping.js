'use strict';

(function () {
    function Product(name, price, exDate) {
        this.id = Math.floor(Math.random() * (99999 - 10000) + 10000);
        this.name = name;
        this.price = price;
        this.exDate = exDate;
        
        this.getInfo = function () {
            var firstLetter = this.name[0];
            var lastLetter = this.name[this.name.length - 1];
            
            var id = firstLetter.toUpperCase() + lastLetter.toUpperCase() + this.id;
            return [id, this.name, this.price].join();
        }
    }
    
    function ShoppingBag() {
        this.list = [];
        
        this.addProduct = function (product) {
            
            var d = new Date();
            var nd = d.getDate();
            
            var m = new Date();
            var nm = m.getMonth();
    
            var y = new Date();
            var ny = y.getFullYear();
            
            var danas = new Date(nm + '-' + nd + '-' + ny);
            var danasM = danas.getTime();
    
    
            var productDate = new Date(product.exDate);
            var exDateM = productDate.getTime();
        
                if(danasM < exDateM){
                    this.list.push(product);
                }
            
        }

        this.averagePrice = function () {
            return (this.calculateTotalPrice() / this.list.length).toFixed(3)
        }

        this.mostExpensive = function () {
            this.mostExpensive = 0;
            this.mostExpensiveProduct;
            this.list.forEach((element, index) => { 
                if (this.list[index].price > this.mostExpensive) { 
                    this.mostExpensive = this.list[index].price; 
                    this.mostExpensiveProduct = this.list[index].name; 
                }
            });
            return this.mostExpensiveProduct + " " + this.mostExpensive; 
        };
    

        this.calculateTotalPrice = function () {
            this.totalPrice = 0;
            this.list.forEach((element, index) => {
                this.totalPrice += this.list[index].price;
            });
            return this.totalPrice; 
        };
        
    }

    function PaymandCard(accBal, date) {
        this.accBal = parseFloat(accBal.toFixed(2));
        this.date = new Date(date);
        
        var sada = Date.now;

        if(this.date.getTime() > sada()  ) {
            console.log('Date is valid'); 
        }
        else {
            console.log('Date is not valid');
        }
    }

    function checkOutAndBuy(shopBag, card) {
        if (shopBag.calculateTotalPrice() < card.accBal) {
            
            shopBag.list.forEach(function (element, index) { 
                console.log(shopBag.list[index].getInfo()); 
            });
            console.log('Total price is: ' + shopBag.calculateTotalPrice()); 
            console.log('The most expensive product is: ' + shopBag.mostExpensive());
            console.log('Average price is: ' + shopBag.averagePrice());
            console.log('Successful!'); 
        }
        else {
            console.log('Total price is: ' + shopBag.calculateTotalPrice()); 
            console.log('Total amount of money on card: ' + card.accBal); 
            console.log('Not enough money on card!');
        }
    }
    
    
    var product1 = new Product('Banana', 230, '05-17-2022');
    var product2 = new Product('Badem', 430, '03-19-2021');
    var product3 = new Product('Lubenica', 150, '04-11-2023');
    var product4 = new Product('Paradajz', 350, '02-03-2022');


    var shoppingBag = new ShoppingBag();
    var paymandCard1 = new PaymandCard(753.17586, '5-17-2023');

    shoppingBag.addProduct(product1); 
    shoppingBag.addProduct(product2); 
    shoppingBag.addProduct(product3);
    shoppingBag.addProduct(product4);


    checkOutAndBuy(shoppingBag, paymandCard1);

})();
