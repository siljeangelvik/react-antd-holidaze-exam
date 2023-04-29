function endsWith(str, suffix) {
    return str.slice(str.length - suffix.length) === suffix;
}

console.log(endsWith('abc', 'bc')); // true
console.log(endsWith('abc', 'd')); // false