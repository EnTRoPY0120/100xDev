/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  if(str.length === 0){
    return true;
  }

  // replace the puncutation and whitespaces using the regex expression in the string and convert it to lowercase for case-insensitive checking
  
  let str1 = str.replace(/[,.?!]| /g,"").toLowerCase();
  for(let i= 0 , j = str1.length-1 ; i < str.length/2 ; i++ , j--){
    if(str1[i] !== str1[j]){
      return false;
    }
  }
  return true;
}

module.exports = isPalindrome;
