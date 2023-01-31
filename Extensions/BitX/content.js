/*******************
 * authentication
 *******************/

/*************************
 * #1 Get the settings
 * from Local Storage
 *************************/
if (localStorage.getItem("settings") !== null) {
  let settings = JSON.parse(localStorage.getItem("settings"));
  if (settings) {
    console.log("Settings retrieved from Local Storage");
  }
} else {
  console.log("Settings is not found");
}

/***************
 * Initialize
 ***************/
let btcUSDPrice = "";
let currentBalance = 0;
let eligibleBonus = "";
let isFirstLaunch = false;
let rewardPoints = "";
let rpPromo = "";
let multiplyBTCWinnings = "";
let freeRolls = 0;
let promo_start = "";
let promo_end = "";
let r =
  '<div id="bitx" class="responsive-iframe-container"><iframe src="https://www.arnuld.net/?a=2509870" scrolling="no" frameborder="0" allowfullscreen></iframe><small><a href="https://www.arnuld.net/buy/bitcoins/">Buy Bitcoin</a> to start playing &bull; <a href="https://www.arnuld.net/dl/multiply-btc-guide">Download Guide</a> to win the Multiply BTC game</small></div>';
let rpPromoBox = "";
let rpFreeRoll = "";
let rpPromoText = "";
let startingBalance = 0;
let storedBalance = 0;
let storedDate = "";
let temp = "";
let winnings_result = "";
let winnings = 0;
let winnings_start = "";
let winnings_end = "";
let jsonData = {};
let bitxData = {};
let settings = {};

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

/*************************
 * Get the jsonData
 * from Local Storage
 *************************/
// get date today
const date = new Date();
dateToday = date.toISOString().slice(0, 10);

jsonData = JSON.parse(localStorage.getItem("bitxData")); // get json data from Local Storage

// set startingBalance
if (jsonData) {
  // get current balance from Local Storage
  storedBalance = Number(jsonData["current-balance"]);
  storedBalance = storedBalance.toFixed(8);
  startingBalance = document.querySelector(
    "ul.right.tabs > li.balanceli > span"
  ).innerHTML;

  // get stored date from Local Storage
  storedDate = jsonData["date-today"]; // check if jsonData does not exist
}
// if storedDate is 1 day late than dateToday
if (storedDate !== dateToday) {
  startingBalance = document.querySelector(
    "ul.right.tabs > li.balanceli > span"
  ).innerHTML;
}

/******************************
 * 60-Second loop starts here
 ******************************/
function main(freeRolls) {
  setInterval(function () {
    let btn = document.getElementById("free_play_form_button");
    let btnStyle = btn.getAttribute("style");
    // if 'style' attribute is not found, click the button
    if (!btnStyle) {
      console.log("Page is being reloaded");
      setTimeout(function () {
        btn.click();
        console.log("ROLL button clicked");
        if (isFirstLaunch) {
          freeRolls = 0;
        } else {
          freeRolls = jsonData["free-rolls"];
        }
        // free roll has been claimed, set isFirstLaunch = false
        isFirstLaunch = false;
        // fixing issue on first launch, where freeRolls = NaN
        if (Number.isNaN(freeRolls)) {
          freeRolls = Number(freeRolls);
          console.log("freeRolls is NaN");
        }
        // compare dates
        if (dateToday !== storedDate) {
          const date = new Date();
          dateToday = date.toISOString().slice(0, 10);
        }
        scrapeSelected(freeRolls); // returns jsonData
        saveJSONData(jsonData); // save to Local Storage
        console.log(jsonData); // remove later, for checking data only
      }, 3000);
    } else {
      // close the modal after free roll
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

function scrapeSelected(freeRolls) {
  freeRolls++;
  btcUSDPrice = document.querySelector(
    "#site_stats > div > div > div h4"
  ).innerText;
  if (isFirstLaunch) {
    isFirstLaunch = true;
    startingBalance = storedBalance;
  } else {
    isFirstLaunch = false;
    startingBalance = jsonData["starting-balance"];
    do {
      currentBalance = Number(
        document.querySelector("ul.right.tabs > li.balanceli > span").innerHTML
      );
      if (currentBalance === null || currentBalance === 0) {
        setTimeout(function () {
          currentBalance = Number(
            document.getElementById("balance_small").innerText
          );
        }, 2000); // 2 seconds
      }
    } while (currentBalance === null || currentBalance === 0);
  }
  /* Calculate currentBalance */
  winnings_result = document.getElementById("fp_min_reward").innerText;
  const regex = /\d+.\d+/;
  winnings = Number(winnings_result.match(regex)[0]); // exp format, ex: 1.8e-7
  currentBalance = (currentBalance + winnings).toFixed(8);
  winnings = winnings.toFixed(8); // convert winnings back to string + limits decimals to 8 chars
  if (currentBalance === null) {
    console.log("currentBalance = null");
    temp = document.querySelector("nav section ul li.balanceli").innerText;
    currentBalance = temp.split("BTC")[0];
    currentBalance = Number(currentBalance.trim());
  }
  /* Scrape more values */
  eligibleBonus = document.querySelector(
    "#bonus_eligible_msg > span > .dep_bonus_max"
  ).innerHTML;
  rewardPoints = document.querySelector(
    "#rewards_tab div:nth-child(2) div .user_reward_points"
  ).innerHTML;
  // rpPromoText = document.querySelector("#free_play_alert_boxes > div:nth-child(2) > span").innerText;
  rpPromoBox = document.querySelector(
    "#free_play_alert_boxes > div:nth-child(2)"
  );
  if (rpPromoBox.style.display === "none") {
    // returns true if rpPromoBox has the display style of 'none'
    rpPromo = "No promo available";
    rpPromoSchedule = "No schedule ATM";
    hourlyRP = document.querySelector(
      "#free_play_result div .rewards_link"
    ).innerText;
  } else {
    // execute if rpPromoBox is visible
    rpPromoText = document.querySelector(
      "#free_play_alert_boxes > div:nth-child(2) > span"
    ).innerText;
    if (rpPromoText.includes(" ends ")) {
      promo_start = "running and ";
    } else {
      promo_start = "(RP) promotion ";
    }
    promo_end = " (";
    rpPromo = rpPromoText.match(/\d+x/)[0]; // output: 5x
    rpPromoSchedule = rpPromoText.split(promo_start)[1].split(promo_end)[0];
    promoRPText = document.getElementById("free_play_result").innerText;
    const regex_rp = /s \((\d+)/;
    hourlyRP = rpPromoText.match(regex_rp)[1] + " Reward Points";
  }
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
    "rp-promo-hourly": hourlyRP,
    "rp-promo-schedule": rpPromoSchedule,
    "starting-balance": startingBalance,
  };

  return jsonData;
}

function saveJSONData(jsonData) {
  localStorage.setItem("bitxData", JSON.stringify(jsonData));
  isFirstLaunch = false;
}

main();
