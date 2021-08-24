"use strict";


/** product: calculate the product of an array of numbers. */

function product(nums) {

  // product([2, 3, 4])   // 24

  // base case
  if (nums.length === 0) return 1;

  // normal case
  return nums.pop() * product(nums);

}


/** longest: return the length of the longest word in an array of words. */

function longest(words, idx = 0, maxWordLen = 0) {

  // base case
  if (!(words[idx])) return maxWordLen;

  // normal case  
  let maxLen = words[idx].length > maxWordLen ? words[idx].length : maxWordLen;
  return longest(words, (idx + 1), maxLen);

}


/** everyOther: return a string with every other letter. */

function everyOther(str, posn = 0, includeLetter = true) {
  //                      111
  //            0123456789012 len=13
  //everyOther("recursion ugh")  // "rcrinuh"

  // // non-recursive
  // let includeLetter = true;
  // let outEveryOther = "";
  // for (let i = 0; i < str.length; i++) {
  //   if (includeLetter) {
  //     outEveryOther = outEveryOther + str[i];
  //   } 
  //   includeLetter = !includeLetter;
  // }

  // return outEveryOther;
  // // end non-recursive

  // base
  if (posn >= str.length) return "";

  // normal 
  return ((includeLetter ? str[posn] : "") + everyOther(str, (posn + 1), !(includeLetter)));

}


/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {

  function flip(str, posn = 0, endPosn = 0) {
    if (posn >= endPosn) return "";

    return flip(str, (posn + 1), endPosn) + str[posn];
  }

  // The thinking is for a palindrome, you only need to flip the first half of the string.
  // Take the first half of the string + any 'middle' letter + flipped first half
  //   str.slice(0,endPosn)            + any 'middle' letter + flip(str, 0, endPosn)
  // any 'middle' letter exists for strings with an odd number of letters:
  //   (midPosn === endPosn ? "" : str.slice(midPosn, midPosn+1))
  //   When midPosn === endPosn, we have a string with an even number so the middle is ""
  //   When midPosn != endPosn, we have a middle letter, use str.slice(midPosn, midPosn+1)
  //    to get it.
  // endPosn is calculated everytime flip runs. Instead, calculate it once and pass it in.
  // Might as well keep str.length / 2 since we can use it to quickly check even or odd string.
  let midPosn = str.length / 2;
  let endPosn = Math.floor(midPosn);
  if ((str.slice(0, endPosn) + (midPosn === endPosn ? "" : str.slice(midPosn, midPosn + 1)) + flip(str, 0, endPosn)) === str) {
    return true;
  } else {
    return false;
  }

}


/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, idx = 0) {
  // let animals = ["duck", "cat", "pony"];

  // findIndex(animals, "cat");  // 1
  // findIndex(animals, "porcupine");   // -1
  if (idx >= arr.length) return -1;

  return arr[idx] === val ? idx : findIndex(arr, val, (idx + 1));

}


/** revString: return a copy of a string, but in reverse. */

function revString(str, posn = 0) {
  // revString("porcupine") // 'enipucrop'
  if (posn >= str.length) return "";

  return revString(str, (posn + 1)) + str[posn];

}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj, objStrings = []) {

  // need to walk the object -
  //   is current thing an object? 
  //     yes - get keys and ??recursively?? go through keys
  //     no  - is it a string?
  //           yes - add the string to the array
  //           no  - is it an object?
  //                  yes - walk the object 
  //     

  function checkKeys(obj = {}, arrKeys = [], idx = 0, len = 0, objStrings = []) {

    if (idx >= len) return objStrings;

    if (typeof obj[arrKeys[idx]] === "string") {
      objStrings.push(obj[arrKeys[idx]]);
      
    } else {
      if (typeof obj[arrKeys[idx]] === "object") {
        // We have an object. Treat this object exactly how the initial
        //  object was treated by calling gatherStrings. Eventually, when
        //  we get back to this point, WE NEED TO CONTINUE WITH CHECKKEYS!!!!
        // NOT RETURN!!!!! Returning from gatherStrings -- the commented out
        //  bit -- meant we stopped processing the keys as if we exhausted
        //  the arrKeys.
        gatherStrings(obj[arrKeys[idx]], objStrings);

        // return gatherStrings(obj[arrKeys[idx]], objStrings);
        
      } 
    }

    return checkKeys(obj, arrKeys, (idx + 1), len, objStrings);

  };

  if (typeof obj === "object") {
    // get the keys and process all the keys. 
    // objStrings is the array that accumulates the strings. This array 
    //  is passed between subsequent checkKeys and gatherStrings calls.
    const objKeys = Object.keys(obj);

    return checkKeys(obj, objKeys, 0, objKeys.length, objStrings);
  } 

  return objStrings;

}


/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, firstTime = true, idxStart = 0, idxEnd = 0) {

  if (firstTime) {
    // we need to initially set the bounds. All other iterations will have the idx's
    //  passed in and firstTime is set to false.
    idxStart = 0;
    idxEnd = arr.length;
  }
  let idxMid = Math.floor((idxStart + idxEnd) / 2);

  if (arr[idxMid] === val) {
    // found val
    return idxMid;
  } else {
    if (idxStart >= idxEnd) {
      return -1;
    } else {
      if (arr[idxMid] < val) {
        // look to the right of idxMid.
        idxStart = idxMid + 1;
      } else {
        // arr[idxMid] is greater than val.
        // look to the left of idxMid 
        idxEnd = idxMid - 1;
      }
      return binarySearch(arr, val, false, idxStart, idxEnd)
    }
  }

}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
