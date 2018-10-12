'use strict'

function compare(a,b) {
    if (a.score < b.score)
      return 1;
    if (a.score > b.score)
      return -1;
    return 0;
  }

function sortedShare(input){

    return input.sort(compare)
}

module.exports = sortedShare