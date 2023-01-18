chrome.tabs.executeScript({
  file: "/inc/other-scripts.js",
});

setInterval(function () {
  let btn = document.getElementById("free_play_form_button");
  let btnStyle = btn.getAttribute("style");
  let parent = document.getElementById("free_play_result");
  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", "bitx");
  let anchor = document.createElement("a");
  anchor.setAttribute("href", "https://www.arnuld.net/btc/buy");
  newDiv.appendChild(anchor);
  let banner = document.createElement("img");
  banner.setAttribute(
    "src",
    "https://www.paypalobjects.com/digitalassets/c/website/marketing/na/us/logo-center/Security_Banner_234x60_4a.png"
  );
  anchor.appendChild(banner);

  parent.insertAdjacentHTML("afterend", newDiv.outerHTML);

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
