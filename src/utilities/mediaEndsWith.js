export function mediaEndsWith(str, suffix) {
    return str.slice(str.length - suffix.length) === suffix;

}

console.log(mediaEndsWith('abc', 'bc')); // true
console.log(mediaEndsWith('abc', 'd')); // false