let themeSwitch = document.getElementById("theme-switch");
let Main = document.getElementsByTagName("main")[0];
let currentTheme = localStorage.getItem("theme") || "dark-theme";
Main.classList.add(currentTheme);

function SwitchTheme() {
  let newTheme = Main.classList.contains("dark-theme")
    ? "light-theme"
    : "dark-theme";
  Main.classList = "";
  Main.classList.add(newTheme);
  localStorage.setItem("theme", newTheme);
}

themeSwitch.addEventListener("click", SwitchTheme);
