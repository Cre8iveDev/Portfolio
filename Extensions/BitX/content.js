// authenticate
// get date today
const date = new Date();
const dateStart = date.toISOString().slice(0, 10);

// show settings modal
// save settings to localstorage & cookie

// show before loop starts
let starting_balance = document.querySelector("#balance").innerHTML;
let free_rolls = 0;
let reference = document.getElementById("free_play_result");
let reference2 = document.getElementById(
  "double_your_btc_main_container_outer"
);
let banners = document.getElementById("bitx");
let bottom = document.getElementById("bottom_user_ads_container");
let bottom2 = document.getElementById("double_your_btc_main_container");

// add the iframe
reference.insertAdjacentHTML(
  "afterend",
  '<div id="bitx" class="responsive-iframe-container"><iframe src="https://www.arnuld.net/?a=2509870" scrolling="no" frameborder="0" allowfullscreen></iframe><small><a href="https://www.arnuld.net/buy/bitcoins/">Buy Bitcoin</a> to start playing &bull; <a href="https://www.arnuld.net/dl/multiply-btc-guide">Download Guide</a> to win the Multiply BTC game</small></div>'
);
// add iframe to multiply btc page
reference2.insertAdjacentHTML(
  "afterend",
  '<div id="bitx2" class="responsive-iframe-container"><iframe src="https://www.arnuld.net/?a=2509870" scrolling="no" frameborder="0" allowfullscreen></iframe><small><a href="https://www.arnuld.net/buy/bitcoins/">Buy Bitcoin</a> to start playing &bull; <a href="https://www.arnuld.net/dl/multiply-btc-guide">Download Guide</a> to win the Multiply BTC game</small></div>'
);
// 60-second loop starts here
setInterval(function () {
  let btn = document.getElementById("free_play_form_button");
  let btnStyle = btn.getAttribute("style");
  // if 'style' attribute is not found, click the button
  if (!btnStyle) {
    console.log("Page is being reloaded");
    setTimeout(function () {
      btn.click();
      free_rolls++;
      console.log("ROLL button clicked");
    }, 3000);
  } else {
    // close the modal after free roll
    try {
      let modal = document.querySelector(".reveal-modal.open");
      if (modal) {
        let btn_close = modal.querySelector(".close-reveal-modal");
        if (btn_close) {
          scrapeSelected();
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
    reference.insertAdjacentHTML(
      "afterend",
      '<div id="bitx" class="responsive-iframe-container"><iframe src="https://www.arnuld.net/?a=2509870" scrolling="no" frameborder="0" allowfullscreen></iframe><small><a href="https://www.arnuld.net/buy/bitcoins/">Buy Bitcoin</a> to start playing &bull; <a href="https://www.arnuld.net/dl/multiply-btc-guide">Download Guide</a> to win the Multiply BTC game</small></div>'
    );
  }
}, 30000);

function scrapeSelected() {
  let btc_usd_price = document.querySelector(
    "#site_stats > div > div > div h4"
  ).innerHTML;
  let balance_li = document.querySelector("span#balance").innerHTML;
  let eligible_bonus = document.querySelector(
    "#bonus_eligible_msg > span > .dep_bonus_max"
  ).innerHTML;
  let rp_promo_text = document.querySelector(
    "#free_play_alert_boxes > div ~ div"
  ).innerHTML;
  let rp_promo = document.querySelector(
    "#free_play_alert_boxes > div ~ div"
  ).innerHTML;
  let multiply_btc_winnings = document.querySelector(
    "#personal_stats > div > div > div h4"
  ).innerHTML;

  let jsonData = {
    "start-date": dateStart,
    "btc-usd-price": btc_usd_price,
    "starting-balance": starting_balance,
    "balance-li": balance_li,
    "eligible-bonus": eligible_bonus,
    "multiply-btc-winnings": multiply_btc_winnings,
    "rp-promo": rp_promo,
    "free-rolls": free_rolls,
  };

  console.log(jsonData);
}
