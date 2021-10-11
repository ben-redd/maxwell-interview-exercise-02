//what is the problem?
/*
 The task is to build a program which when executed would ask the user to list all the items purchased in any order. Once the user has listed all the items, print the total cost. You need to build a solution for the given items and you do not need to worry about items which would be added in future. 
 */

//  We are looking for you to demonstrate your knowledge related to common software practices to include reusability, portability and encapsulation - to name a few.

//import prompt-sync package
const prompt = require('prompt-sync')({ sigint: true });

class PriceCalculator {
  constructor() {
    this.pricingTable = {
      milk: {
        unitPrice: 3.97,
        isOnSale: true,
        saleUnitNum: 2,
        salePrice: 5.0,
        saleSavings: 2.94,
        quantity: 0,
        totalPrice: 0,
        totalSaved: 0,
      },
      bread: {
        unitPrice: 2.17,
        isOnSale: true,
        saleUnitNum: 3,
        salePrice: 6.0,
        saleSavings: 0.51,
        quantity: 0,
        totalPrice: 0,
        totalSaved: 0,
      },
      banana: {
        unitPrice: 0.99,
        isOnSale: false,
        saleUnitNum: undefined,
        salePrice: undefined,
        saleSavings: undefined,
        quantity: 0,
        totalPrice: 0,
        totalSaved: 0,
      },
      apple: {
        unitPrice: 0.89,
        isOnSale: false,
        saleUnitNum: undefined,
        salePrice: undefined,
        saleSavings: undefined,
        quantity: 0,
        totalPrice: 0,
        totalSaved: 0,
      },
    };
  }

  //convert input into usable data, e.g. an array
  convertStringToArray(string) {
    return string.replace(/ /g, '').toLowerCase().split(',');
  }
  //prompt user for input
  getUserInput() {
    let userInput = prompt(
      'Based on the current store inventory of: Milk, Bread, Banana, and Apple. Please enter all of the items you wish to purchase, separated by commas: ',
    );
    console.log(`your input: ${userInput}`);
    //convert userInput into an array. Removes white space and converts to lowercase as well
    let userInputArray = this.convertStringToArray(userInput);
    return userInputArray;
  }

  //checks user input for invalid items
  isInputValid(inputArr) {
    for (let i = 0; i < inputArr.length; i++) {
      if (!this.pricingTable.hasOwnProperty(inputArr[i])) {
        console.log(`the following value is invalid: ${inputArr[i]}`);
        console.log('Please try again.');
        return false;
      }
    }
    return true;
  }
  updateQuantity(inputArr) {
    for (let i = 0; i < inputArr.length; i++) {
      if (this.pricingTable.hasOwnProperty(inputArr[i])) {
        this.pricingTable[inputArr[i]].quantity++;
      }
    }
  }
  calculateTotalCost() {
    let total = 0;
    let amountSaved = 0;
    let dataDisplayArray = [];
    for (let key in this.pricingTable) {
      //destructure this.pricingTable[key]
      let {
        quantity,
        isOnSale,
        totalPrice,
        unitPrice,
        saleUnitNum,
        salePrice,
        saleSavings,
        totalSaved,
      } = this.pricingTable[key];
      if (quantity > 0) {
        //calculation if item is on sale
        if (isOnSale === true) {
          let saleUnits = Math.floor(quantity / saleUnitNum);
          totalPrice = Number(
            (saleUnits * salePrice +
              (quantity % saleUnitNum) * unitPrice).toFixed(2),
          );
          totalSaved = Number((saleUnits * saleSavings).toFixed(2));
          total += totalPrice;
          total = Number(total.toFixed(2));
          amountSaved += totalSaved;
        } else {
          //normal price calculation if item is not on sale
          totalPrice = Number((quantity * unitPrice).toFixed(2));
          total += totalPrice;
          total = Number(total.toFixed(2));
        }

        dataDisplayArray.push({
          Item: key,
          Quantity: quantity,
          Price: `$${totalPrice}`,
        });
      }
    }
    console.table(dataDisplayArray);
    console.log(`Total price : $${total}`);
    console.log(`Total Savings : $${amountSaved}`);
  }
}

//execution
let purchase = new PriceCalculator();
let userInput = purchase.getUserInput();
let isValid = purchase.isInputValid(userInput);
if (isValid) {
  purchase.updateQuantity(userInput);
  purchase.calculateTotalCost();
}
