let reference = document.getElementById("free_play_result");
let banners = document.getElementById("bitx");
let bottom = document.getElementById("bottom_user_ads_container");
let btn = document.getElementById("free_play_form_button");
let btnStyle = btn.getAttribute("style");
reference.insertAdjacentHTML(
  "afterend",
  '<div id="bitx" class="responsive-iframe-container"><iframe src="https://www.arnuld.net" scrolling="no" frameborder="0" allowfullscreen></iframe></div>'
);
setInterval(function () {
  if (!btnStyle) {
    console.log("Page is being reloaded");
    setTimeout(function () {
      btn.click();
      banner_ad_inserted++;
      console.log("ROLL button clicked");
    }, 5000);
  } else {
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
  }
  bottom.scrollIntoView({ behavior: "smooth" });
}, 60000);
