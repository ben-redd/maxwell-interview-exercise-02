//what is the problem?
/*
 The task is to build a program which when executed would ask the user to list all the items purchased in any order. Once the user has listed all the items, print the total cost. You need to build a solution for the given items and you do not need to worry about items which would be added in future. 
 */

//  We are looking for you to demonstrate your knowledge related to common software practices to include reusability, portability and encapsulation - to name a few.

//import prompt-sync package
const prompt = require('prompt-sync')({ sigint: true });

class PriceCalculator {
  constructor() {
    //current store pricing table
    this.pricingTable = {
      milk: {
        unitPrice: 3.97,
        isOnSale: true,
        saleUnitNum: 2,
        salePrice: 5.0,
        saleSavings: 2.94,
      },
      bread: {
        unitPrice: 2.17,
        isOnSale: true,
        saleUnitNum: 3,
        salePrice: 6.0,
        saleSavings: 0.51,
      },
      banana: {
        unitPrice: 0.99,
        isOnSale: false,
        saleUnitNum: undefined,
        salePrice: undefined,
        saleSavings: undefined,
      },
      apple: {
        unitPrice: 0.89,
        isOnSale: false,
        saleUnitNum: undefined,
        salePrice: undefined,
        saleSavings: undefined,
      },
    };
    //user purchase Data that will contain which items the user buys, quantity of items, total price of each type, and total saved for sale types.
    this.userPurchaseData = {};
  }

  //prompt user for input, then modify and check. Returns a boolean based on the validity of the input
  getUserInput() {
    //separate console.logs from prompt because of newline error with prompt-sync package
    console.log(
      '\nBased on the current store inventory of: Milk, Bread, Banana, and Apple.',
    );
    console.log(
      'Please enter all of the items you wish to purchase, separated by commas. ',
    );
    console.log('e.g. Your input: milk, milk, bread, banana\n');
    let userInput = prompt('Your input: ');
    console.log(`your input: ${userInput}`);
    //convert userInput into an array. Removes white space and converts to lowercase as well
    let userInputArray = this.convertStringToArray(userInput);
    if (this.isInputValid(userInputArray)) {
      this.updateUserPurchaseData(userInputArray);
      return true;
    }
    return false;
  }

  //convert input into usable data, e.g. an array
  convertStringToArray(string) {
    return string.replace(/ /g, '').toLowerCase().split(',');
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
  updateUserPurchaseData(inputArr) {
    for (let i = 0; i < inputArr.length; i++) {
      if (this.pricingTable.hasOwnProperty(inputArr[i])) {
        if (this.userPurchaseData.hasOwnProperty(inputArr[i])) {
          this.userPurchaseData[inputArr[i]].quantity++;
        } else {
          this.userPurchaseData[inputArr[i]] = {
            quantity: 1,
            totalPrice: 0,
            totalSaved: 0,
          };
        }
      }
    }
  }
  calculateTotalCost() {
    let total = 0;
    let amountSaved = 0;
    let dataDisplayArray = [];
    for (let key in this.userPurchaseData) {
      //destructure this.pricingTable[key] and this.userPurchaseData[key]
      let {
        isOnSale,
        unitPrice,
        saleUnitNum,
        salePrice,
        saleSavings,
      } = this.pricingTable[key];
      let { quantity } = this.userPurchaseData[key];
      if (quantity > 0) {
        //calculation if item is on sale
        if (isOnSale === true) {
          let saleUnits = Math.floor(quantity / saleUnitNum);
          this.userPurchaseData[key].totalPrice += Number(
            (saleUnits * salePrice +
              (quantity % saleUnitNum) * unitPrice).toFixed(2),
          );
          this.userPurchaseData[key].totalSaved = Number(
            (saleUnits * saleSavings).toFixed(2),
          );
          total += this.userPurchaseData[key].totalPrice;
          total = Number(total.toFixed(2));
          amountSaved += this.userPurchaseData[key].totalSaved;
        } else {
          //normal price calculation if item is not on sale
          this.userPurchaseData[key].totalPrice += Number(
            (quantity * unitPrice).toFixed(2),
          );
          total += this.userPurchaseData[key].totalPrice;
          total = Number(total.toFixed(2));
        }

        dataDisplayArray.push({
          Item: key,
          Quantity: quantity,
          Price: `$${this.userPurchaseData[key].totalPrice}`,
          Savings: `$${this.userPurchaseData[key].totalSaved}`,
        });
      }
    }
    console.log(Object.entries(this.pricingTable));
    console.log(Object.entries(this.userPurchaseData));
    console.table(dataDisplayArray);
    console.log(`Total price : $${total}`);
    console.log(`Total Savings : $${amountSaved}`);
  }

  //   printPurchaseData(){
  //       const dataTable = [
  //           ['Item', 'Quantity', 'Price', 'Savings']
  //       ]
  //   }
}

//execution
let purchase = new PriceCalculator();
if (purchase.getUserInput()) {
  purchase.calculateTotalCost();
}

/* *** REFACTOR PLAN ***
-[X]Seperate data structures of pricing table and user input

-[X]combine functions into getUserInput

-[x]clean up calculate total cost and write a seperate function to display data

-[]fix prompt sync re-prompt issue on new lines
*/
