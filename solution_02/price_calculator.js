//what is the problem?
/*
 The task is to build a program which when executed would ask the user to list all the items purchased in any order. Once the user has listed all the items, print the total cost. You need to build a solution for the given items and you do not need to worry about items which would be added in future. 
 */

//  We are looking for you to demonstrate your knowledge related to common software practices to include reusability, portability and encapsulation - to name a few.

//How Will I solve the problem?

//****** Part 1 ******
//Store data of this weeks pricing table for the local grocery store
// pricing table
// Item     Unit price        Sale price
// --------------------------------------
// Milk      $3.97            2 for $5.00
// Bread     $2.17            3 for $6.00
// Banana    $0.99
// Apple     $0.89

const pricingTable = {
  milk: {
    unitPrice: 3.97,
    isOnSale: true,
    saleUnitNum: 2,
    salePrice: 5.0,
  },
  bread: {
    unitPrice: 2.17,
    isOnSale: true,
    saleUnitNum: 3,
    salePrice: 6.0,
  },
  banana: {
    unitPrice: 0.99,
    isOnSale: false,
    saleUnitNum: undefined,
    salePrice: undefined,
  },
  apple: {
    unitPrice: 0.89,
    isOnSale: false,
    saleUnitNum: undefined,
    salePrice: undefined,
  },
};

//pricing array made for easy comparison of the keys in our pricing table object
const pricingArray = Object.keys(pricingTable);

//****** Part 2 ******
//prompt the user for an input of the items available at the grocery store
//be sure to specify parameters for the user input such as commas or spaces between words

//prompt user
let getUserInput = () => {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.question(
    `Based on the current store inventory of: Milk, Bread, Banana, and Apple. Please enter all of the items you wish to purchase, separated by commas. \n`,
    (userInput) => {
      if (userInput) {
        console.log(`Your list: ${userInput}`);
        readline.close();
      }
    },
  );
  readline.on('close', () => {
    console.log('thank you for providing your list');
  });
};

//get user input and run a test to ensure that it meets specified parameters
//convert input into usable data, e.g. an array
let convertStringToArray = (string) => {
  return string.replace(/ /g, '').toLowerCase().split(',');
};

//checks to make sure that the
let compareArrayValues = (userArr, pricing) => {
  for (let i = 0; i < userArr.length; i++) {
    if (!pricing.includes(userArr[i])) {
      console.log(`the following value is invalid: ${userArr[i]}`);
      return false;
    }
  }
  return true;
};

//****** Part 3 ******
//write a function or method that can take the user input, and the store pricing table and then calculate the total cost

//****** Part 4 ******
//print the total cost in a format similar to what is shown below:
// Item     Quantity      Price
// --------------------------------------
// Milk      3            $8.97
// Bread     4            $8.17
// Apple     1            $0.89
// Banana    1            $0.99

// Total price : $19.02
// You saved $3.45 today.

//****** Part 5 ******
//think of various things that could potentially break the code I've written, and write tests to ensure everything is ////working properly

//****** Part 6 ******
//refactor code to ensure readability and efficiency

//****** Part 7 ******
//Test again
