/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const spent = [];
  
  // Return empty array for no transactions
  if(transactions.length === 0){
    return spent;
  }

  // Create an object to store the category and its respective prices
  let categoryWithAmount = {};


  // Now iterate through the transactions to get the price and the category
  for(let transaction of transactions){

    const category = transaction.category;
    // if present add the price to the existing category else add the new one
    if(categoryWithAmount[category]){
      categoryWithAmount[category] += transaction.price;
    }
      else {
        categoryWithAmount[category] = transaction.price;
      }
  }

  // Iterate the obj to push the category and total spent to spent[]
  for(let category in categoryWithAmount){
    spent.push({
        category : category ,
        totalSpent : categoryWithAmount[category]
    })
  }
  return spent;
}

module.exports = calculateTotalSpentByCategory;
