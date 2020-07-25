function checkCashRegister(price, cash, cid) {
 
  let currencyUnits = {
    "PENNY": .01,
    "NICKEL": .05,
    "DIME": .10,
    "QUARTER": .25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
  }  
  let resultArr = [];
  
  let regTotal  = cid.map(item => item[1]).reduce((sum, item) => sum + item);
  regTotal = regTotal.toFixed(2);
  console.log(regTotal);
  
  let changeDue = cash - price;
  
  if (changeDue > regTotal) {
   return { status: "INSUFFICIENT_FUNDS",  change: resultArr};
  } else if (changeDue.toFixed(2) === regTotal) {
   return { status: "CLOSED", change: cid};
  } else {
    cid = cid.reverse();
    for (let item of cid) {
      let temp = [item[0], 0];
      while (changeDue >= currencyUnits[item[0]] && item[1] > 0) {
        temp[1] += currencyUnits[item[0]];
        item[1] -= currencyUnits[item[0]];
        changeDue -= currencyUnits[item[0]];
        changeDue = changeDue.toFixed(2);
      }      if (temp[1] > 0) {
        resultArr.push(temp);
      }
    }
  }  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }  
  return { status: "OPEN", change: resultArr };
 
}
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
