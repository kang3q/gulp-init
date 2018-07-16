"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var a = 1;
var c = 1;

var arr = [1, 2, 3, 0];
var sumArr = arr.reduce(function (p, c) {
  return p + c;
});
console.log(sumArr); // 6

exports.default = sumArr;