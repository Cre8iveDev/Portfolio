/*******************
 * authentication
 *******************/

/*************************
 * #1 Get the settings
 * from Local Storage
 *************************/
if (localStorage.getItem("settings") !== undefined) {
  let settings = JSON.parse(localStorage.getItem("settings"));
  if (settings) {
    console.log("Settings retrieved from Local Storage");
  }
}

/***************
 * Initialize
 ***************/
let storedDate = "";
let btcUSDPrice = "";
let currentBalance = 0;
let eligibleBonus = "";
let rewardPoints = "";
let rpPromo = "";
let multiplyBTCWinnings = "";
let freeRolls = 0;
let rpPromoText = "";
let start = "(RP) promotion ";
let end = " (";
let isFirstLaunch = false;
let winnings = 0;
let winnings_result = "";
let winnings_start = "You win ";
let winnings_end = " BTC";
let r =
  '<div id="bitx" class="responsive-iframe-container"><iframe src="https://www.arnuld.net/?a=2509870" scrolling="no" frameborder="0" allowfullscreen></iframe><small><a href="https://www.arnuld.net/buy/bitcoins/">Buy Bitcoin</a> to start playing &bull; <a href="https://www.arnuld.net/dl/multiply-btc-guide">Download Guide</a> to win the Multiply BTC game</small></div>';
let jsonData = {};
let settings = {};

/*************************
 * Get jsonData from
 * Local Storage & set
 * startingBalance = 0
 *************************/
jsonData = JSON.parse(localStorage.getItem("bitxData")); // get json data from Local Storage
if (!jsonData) {
  let startingBalance = 0;
} else {
  storedDate = jsonData["date-today"]; // get today's date from json data
}

/****************************
 * Check Local Storage date
 * if same as date today
 ****************************/
// 1. stored date in local storage was read above

// 2. get date today
const date = new Date();
const dateToday = date.toISOString().slice(0, 10);

// 3. Compare dates
if (dateToday !== storedDate) {
  isFirstLaunch = true;
  freeRolls = 0;
} else {
  isFirstLaunch = false;
}

/************************
 * Rebuild the banners
 ************************/
let reference = document.getElementById("free_play_result");
let reference2 = document.getElementById(
  "double_your_btc_main_container_outer"
);
let banners = document.getElementById("bitx");
let bottom = document.getElementById("bottom_user_ads_container");
let bottom2 = document.getElementById("double_your_btc_main_container");

// add the iframe
reference.insertAdjacentHTML("afterend", r);
// add iframe to multiply btc page
reference2.insertAdjacentHTML("afterend", r);

/******************************
 * 60-Second loop starts here
 ******************************/
function main() {
  setInterval(function () {
    let btn = document.getElementById("free_play_form_button");
    let btnStyle = btn.getAttribute("style");
    // if 'style' attribute is not found, click the button
    if (!btnStyle) {
      console.log("Page is being reloaded");
      setTimeout(function () {
        btn.click();
        console.log("ROLL button clicked");
        if (!isFirstLaunch) {
          freeRolls = jsonData["free-rolls"];
        }
        freeRolls++;
        scrapeSelected(); // returns jsonData
        saveJSONData(jsonData); // save to Local Storage
        console.log(jsonData); // remove later, for checking data only
      }, 3000);
    } else {
      // close the modal after free roll
      try {
        let modal = document.getElementById("myModal22");
        if (modal) {
          let btn_close = modal.querySelector(".close-reveal-modal");
          if (btn_close) {
            btn_close.click();
          } else {
            throw new Error("Close button not found");
          }
        } else {
          throw new Error("Parent element doesn't exist");
        }
      } catch (error) {}

      console.log("Timer is active... ");
      // scroll to bottom of the page
      bottom.scrollIntoView({ behavior: "smooth" });
      bottom2.scrollIntoView({ behavior: "smooth" });
    }

    if (document.getElementById("bitx")) {
      // if element exist, do nothing
    } else {
      // add iframe
      reference.insertAdjacentHTML("afterend", r);
    }
  }, 15000);
}

function scrapeSelected() {
  btcUSDPrice = document.querySelector(
    "#site_stats > div > div > div h4"
  ).innerText;
  // let currentBalance = document.querySelector("span#balance").innerHTML;
  // currentBalance = document.querySelector("ul.right.tabs > li.balanceli > span").innerHTML;
  if (isFirstLaunch) {
    startingBalance = currentBalance;
  } else {
    startingBalance = jsonData["starting-balance"];
    currentBalance = Number(document.getElementById("balance_small").innerText);
  }
  winnings_result = document.querySelector("#free_play_result").innerText;
  if (winnings_result.includes("win")) {
    winnings_start = "You win ";
  }
  winnings_end = " BTC";
  winnings = winnings_result.split(winnings_start)[1].split(winnings_end)[0];
  if (winnings === null || winnings === "") {
    winnings = jsonData["free-btc"];
  }
  // ISSUE: for some reason, winnings cannot be scraped
  currentBalance = currentBalance + Number(winnings);
  // ISSUE: currentBalance is 1 roll behind
  if (currentBalance === null) {
    temp = document.querySelector("nav section ul li.balanceli").innerText;
    console.log("Scraped balanceli: " + temp);
    currentBalance = temp.split("BTC")[0];
    currentBalance = currentBalance.trim();
    console.log("currentBalance: " + currentBalance);
  }
  eligibleBonus = document.querySelector(
    "#bonus_eligible_msg > span > .dep_bonus_max"
  ).innerHTML;
  rewardPoints = document.querySelector(
    "#rewards_tab div:nth-child(2) div .user_reward_points"
  ).innerHTML;
  // rpPromoBox = document.querySelector("#free_play_alert_boxes > div:nth-child(2) > span").innerHTML;
  rpPromoText = document.querySelector(
    "#free_play_alert_boxes > div:nth-child(2) > span"
  ).innerText;
  rpPromo = rpPromoText.match(/\d+x/)[0]; // 5x
  rpPromoSchedule = rpPromoText.split(start)[1].split(end)[0];
  multiplyBTCWinnings = document.querySelector(
    "#personal_stats > div > div > div h4"
  ).innerHTML;

  jsonData = {
    "date-today": dateToday,
    "btc-usd-price": btcUSDPrice,
    "current-balance": currentBalance,
    "eligible-bonus": eligibleBonus,
    "free-btc": winnings,
    "free-rolls": freeRolls,
    "multiply-btc-winnings": multiplyBTCWinnings,
    "reward-points": rewardPoints,
    "rp-promo": rpPromo,
    "rp-promo-schedule": rpPromoSchedule,
    "starting-balance": startingBalance,
  };

  return jsonData;
}

main();

function saveJSONData(jsonData) {
  localStorage.setItem("bitxData", JSON.stringify(jsonData));
  console.log("jsonData saved to Local Storage!");
}
