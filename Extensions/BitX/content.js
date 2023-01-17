setInterval(function () {
  let btn = document.getElementById("free_play_form_button");
  let btnStyle = btn.getAttribute("style");
  let parent = document.getElementById("bottom_user_ads_container");
  let childLink = parent.querySelector("a");
  let imgLink = childLink.querySelector("img");
  childLink.setAttribute("href", "https://www.arnuld.net/btc/buy");
  imgLink.setAttribute(
    "src",
    "https://via.placeholder.com/728x100121212/ffffff?text=Buy+Bitcoins+Here"
  );
  if (!btnStyle) {
    console.log("Page is being reloaded");
    setTimeout(function () {
      btn.click();
      console.log("ROLL button clicked");
    }, 5000);
    parent.scrollIntoView({ behavior: "smooth" });
  } else {
    try {
      let parent = document.querySelector(".reveal-modal.open");
      if (parent) {
        let btn_close = parent.querySelector(".close-reveal-modal");
        if (btn_close) {
          btn_close.click();
          parent.scrollIntoView({ behavior: "smooth" });
        } else {
          throw new Error("Close button not found");
        }
      } else {
        throw new Error("Parent element doesn't exist");
      }
    } catch (error) {}

    console.log("Timer is active...");
  }
}, 60000);
