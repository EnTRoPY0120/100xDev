/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  
  const counter = new Array(26).fill(0);

  if(str1.length != str2.length){
    return false;
  }

  for(let i = 0; i < str1.length; i++){
    counter[str1.toLowerCase().charCodeAt(i)- 97]++;
    counter[str2.toLowerCase().charCodeAt(i)- 97]--;
  }
  for(let i = 0; i < 26;i++){
    if(counter[i] != 0){
      return false;
    }
  }
return true;
}

module.exports = isAnagram;
