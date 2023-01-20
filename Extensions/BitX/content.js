let reference = document.getElementById("free_play_result");
let banners = document.getElementById("bitx");
let bottom = document.getElementById("bottom_user_ads_container");
// add the iframe
reference.insertAdjacentHTML(
  "afterend",
  '<div id="bitx" class="responsive-iframe-container"><iframe src="https://www.arnuld.net/?a=2509870" scrolling="no" frameborder="0" allowfullscreen></iframe><small><a href="https://www.arnuld.net/buy/bitcoins/">Buy Bitcoin</a> to start playing &bull; <a href="https://www.arnuld.net/dl/multiply-btc-guide">Download Guide</a> to win the Multiply BTC game</small></div>'
);
setInterval(function () {
  let btn = document.getElementById("free_play_form_button");
  let btnStyle = btn.getAttribute("style");
  // if 'style' attribute is not found, click the button
  if (!btnStyle) {
    console.log("Page is being reloaded");
    setTimeout(function () {
      btn.click();
      console.log("ROLL button clicked");
    }, 5000);
  } else {
    // close the modal after free roll
    try {
      let modal = document.querySelector(".reveal-modal.open");
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
}, 60000);
