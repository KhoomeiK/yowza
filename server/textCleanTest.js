const post = 'Redditors who work at food banks, what is best to donate, what do you always need?';
console.log(post);

// function processTitle(rawTitle) {
//   let finalTitle = rawTitle.trim();

//   const regexp = /(.*)( of [Rr]eddit[:,]? ?)/g;
//   const matches = regexp.exec(finalTitle);

//   if (matches && matches.length > 0) {
//     finalTitle = finalTitle
//       .replace(regexp, '') // Remove __ of Reddit
//       .split('your')
//       .join(`${matches[1].toLowerCase()}'`) // your -> their
//       .split('you')
//       .join(matches[1].toLowerCase()) // you -> __
//       .split('you')
//       .join('them') // Idk why this is but ok
//       .trim(); // Remove extra spaces from manipulation
//   }
//   return (finalTitle.charAt(0).toUpperCase() + finalTitle.slice(1)).trim();
// }
// console.log(processTitle(post));

// /*
// const post = 'Parents of reddit what is your best "why is my kid so stupid" moment?';

// const processTitle = (rawTitle) => {
//   let finalTitle = rawTitle.trim();

//   const regexp = /( of [Rr]eddit? ?)/g;
//   const matches = regexp.exec(finalTitle);
//   console.log(matches);

//   if (matches && matches.length > 0) {
//     // TODO: Check if there is at least one "you" otherwise, replace your by "{match[1]}'s" See post /b5121a for example
//     finalTitle = finalTitle.replace(matches[0], ', '); // Remove 'of Reddit'
//     // .split('you')
//     // .join(matches[1].toLowerCase()) // you -> __
//     // .split('you')
//     // .join('them') // Idk why this is but ok
//     // .trim(); // Remove extra spaces from manipulation
//   }

//   return (finalTitle.charAt(0).toUpperCase() + finalTitle.slice(1)).trim();
// };

// console.log(processTitle(post));
// */


console.log(/[Rr]eddit/g.exec('Redditors who work at food banks, what is best to donate, what do you always need?'));
