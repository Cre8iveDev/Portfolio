saveSettings = {};
let username = "";
let password = "";

document.addEventListener("DOMContentLoaded", function () {
  let okBtn = document.getElementById("okBtn");
  okBtn.addEventListener("click", function () {
    settingsData = {
      "data-user": document.querySelector("#username").value,
      "data-pass": document.querySelector("#password").value,
    };
    document.querySelector(".modal-footer").classList.add("show");
    if (settingsData !== null) {
      document.querySelector(".success").classList.add("show");
      console.log(settingsData);
    } else {
      document.querySelector(".error").classList.add("show");
    }
  });
});

function saveSettings() {
  localStorage.setItem("settings", JSON.stringify(settingsData));
  console.log("Settings saved successfully!");
}
