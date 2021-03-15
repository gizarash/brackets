module.exports = function check(str, bracketsConfig) {
  let stack = [];
  let strArray = str.split('');
  let openBrackets = [];
  let closeBrackets = [];
  let identicalBrackets = [];
  
  bracketsConfig.forEach(element => {
    if(element[0] == element[1]) {
      identicalBrackets.push(element[0]);
    } else {
      openBrackets.push(element[0]);
      closeBrackets.push(element[1]);
    }
  });

  for (let i = 0; i < strArray.length; i++) {
    const curBracket = strArray[i];
    if (openBrackets.indexOf(curBracket) >= 0) {
      stack.push(curBracket);
    } else {
      let closeIndex = closeBrackets.indexOf(curBracket);
      if (closeIndex >= 0) {
        if (stack.length > 0) {
          if (stack[stack.length-1] == openBrackets[closeIndex]) {
            stack.pop();
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        let identicalIndex = identicalBrackets.indexOf(curBracket);
        if (identicalIndex >= 0) {
          if (stack.length > 0) {
            if (stack[stack.length-1] == identicalBrackets[identicalIndex]) {
              stack.pop();
            } else {
              stack.push(curBracket);
            }
          } else {
            stack.push(curBracket);
          }
        }
      }
    }
  }

  return (stack.length == 0);
}
