"use strict";

(function () {

    //******** Person *********/
    function Person(name, surname) {
        if(!name || !surname) {
            throw new Error('Fields name and surname are required')
        }
        this.name = name;
        this.surname = surname;

        this.getData = function () {
            return this.name + ' ' + this.surname;
        }
    }


    /********** Seat *********/

    function Seat(number,category) {
        category = category || 'e'; 
        number = number || Math.floor(91 * Math.random() + 10);

        if(!['e', 'b'].includes(category)) {
            throw new Error('Invalid category input');
        }
        this.number = number;
        this.category = category;

        this.getData = function () {
            return this.number + ', ' + this.category.toUpperCase();
        }
    }


    //******** Passenger *******/

    function Passenger(person, seat) { 
        this.person = person;
        this.seat = seat;

        this.getData = function () {
            return seat.getData() + ', ' + person.getData();
        }
    }


    //******** Flight **********/

    function Flight(relation, date) {
        if(!relation || !date) {
            throw new Error('Fields relation and date are required');
        }
        this.relation = relation;
        this.date = new Date(date);
        this.listOfPassengers = [];

        this.addPassenger = function (passenger) { 
            if(!passenger || !(passenger instanceof Passenger)) {
                throw new Error('Invalid person input');
            }
            this.listOfPassengers.push(passenger);
        } 

        this.getData = function () {
            var result = '';
            var day = this.date.getDate();
            var month = this.date.getMonth();
            var year = this.date.getFullYear();

            result += '\t' +  day + '.' + month + '.' + year  + ', ' + this.relation + '\n';
            this.listOfPassengers.forEach(function (passenger) {
                result += '  \t ' + '\t' +  passenger.getData() + '\n';
            })
            return result;

        }
        this.numberOffPassengers = function () {
            return this.listOfPassengers.length;
        }
    }

    //******** Airport ********/

    function Airport() {
        this.name = 'Nikola Tesla';
        this.listOfFlights = [];

        this.addFlight = function (flight) {
            if(!flight || !(flight instanceof Flight)) {
                throw new Error('Invalid flight input');
            }
            this.listOfFlights.push(flight);
        }

        this.getTotalPassengerNumber = function () {
            var count = 0;
            this.listOfFlights.forEach(function(flight) {
                count += flight.numberOffPassengers();
            })
            return count;
        }

        this.getData = function () {
            var result = 'Airport ' + this.name + ', total passengers ' + this.getTotalPassengerNumber() + '\n';
            this.listOfFlights.forEach(function (flight) {
                result += flight.getData();
            })
            return result;
        }
    }


    //****** Functions ********/

    function createFlight(relation, date) {
        return new Flight(relation,date);
    }

    function createPassenger(name, surname, seat, category) {
        var person = new Person(name, surname);
        var seat = new Seat(seat, category);
        return new Passenger(person, seat);
    }
    
    
    //******* Testing ********/
    
    try {
        var nikolaTesla = new Airport();
        var flight1 = createFlight('Belgrade - Paris', 'Oct 25 2017');
        var flight2 = createFlight('Barcelona - Belgrade', 'Nov 11 2017');

        var passenger1 = createPassenger('John', 'Snow', 1 ,'b');
        var passenger2 = createPassenger('Cersei', 'Lannister', 2, 'b');
        var passenger3 = createPassenger('Daenerys','Targaryen', 14);
        var passenger4 = createPassenger('Tyrion', 'Lannister');
        flight1.addPassenger(passenger1);
        flight1.addPassenger(passenger2);
        flight2.addPassenger(passenger3);
        flight2.addPassenger(passenger4);


        nikolaTesla.addFlight(flight1);
        nikolaTesla.addFlight(flight2);
        console.log(nikolaTesla.getData());


    } catch (error) {
        console.log('Error message: ' + error.message);
    }

})();

