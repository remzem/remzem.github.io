/* =========================================================
   BROWSER.JS
   Drives Gateway: fetching "pages" (the html files inside
   /sites/) and swapping them into #browser-content, plus
   back/forward history, the fake loading message, and window
   dragging.

   HOW TO ADD A NEW SITE / PAGE:
   1. Make a new .html file inside the matching /sites/ folder
      (e.g. sites/news/riot-coverage.html). Give it its own
      <style> block at the top, same as the existing examples.
   2. Add one line to the SITES object below with a short key,
      a title, the fake in-universe URL, and the real path to
      your file.
   3. Anywhere you want a link to it, use:
      <a onclick="loadSite('yourKeyHere')">link text</a>
   ========================================================= */

const SITES = {
  gridex: {
    title: "Gridex",
    url:   "http://www.grid.rom/",
    path:  "sites/search/index.html"
  },
  vex: {
    title: "Vex's Page",
    url:   "http://members.metronet.rom/~vex_44/",
    path:  "sites/personal/vex.html"
  },
  xingyuan: {
    title: "Xingyuan Energy",
    url:   "http://www.xingyuan.energy/",
    path:  "sites/corporations/xingyuan.html"
  },
  board: {
    title: "MetroBoard",
    url:   "http://forums.metronet.rom/board/thread.php?id=204",
    path:  "sites/forums/board.html"
  },
  socialtemplate: {
    title: "Template Character",
    url:   "http://loop.rom/template_character",
    path:  "sites/social/template.html"
  },
  metroface: {
    title: "TheLoop",
    url:   "http://loop.rom/",
    path:  "sites/social/theloop.html"
  }
};

const FAKE_LOADING_MESSAGES = ["Connecting...", "Loading page...", "Almost there..."];

let historyStack = ["gridex"];
let historyIndex = 0;
let requestInFlight = 0;

async function renderSite(key){
  const site = SITES[key];
  if(!site){
    console.error("No site registered for key:", key);
    return;
  }

  const thisRequest = ++requestInFlight;
  const content = document.getElementById("browser-content");
  const statusBar = document.getElementById("status-bar");

  document.getElementById("address-input").value = site.url;
  document.getElementById("title-text").textContent = "Gateway - " + site.title;
  document.getElementById("taskbar-app").textContent = "Gateway - " + site.title;
  document.getElementById("back-btn").disabled = historyIndex === 0;
  document.getElementById("fwd-btn").disabled = historyIndex === historyStack.length - 1;

  const loadingMsg = FAKE_LOADING_MESSAGES[Math.floor(Math.random() * FAKE_LOADING_MESSAGES.length)];
  content.innerHTML = `<div id="loading-msg">${loadingMsg}</div>`;
  statusBar.textContent = loadingMsg;

  try{
    const res = await fetch(site.path + "?_=" + Date.now());
    if(!res.ok) throw new Error("HTTP " + res.status);
    const html = await res.text();

    if(thisRequest !== requestInFlight) return;

    content.innerHTML = html;
    content.scrollTop = 0;
    statusBar.textContent = "Done";
  }catch(err){
    if(thisRequest !== requestInFlight) return;
    content.innerHTML = `<div id="loading-msg">This page can't be displayed. (${err.message})</div>`;
    statusBar.textContent = "Error";
    console.error("Failed to load site:", key, err);
  }
}

function loadSite(key){
  historyStack = historyStack.slice(0, historyIndex + 1);
  historyStack.push(key);
  historyIndex++;
  renderSite(key);
}
function goBack(){
  if(historyIndex > 0){ historyIndex--; renderSite(historyStack[historyIndex]); }
}
function goForward(){
  if(historyIndex < historyStack.length - 1){ historyIndex++; renderSite(historyStack[historyIndex]); }
}
function reloadSite(){ renderSite(historyStack[historyIndex]); }

/* ---------------- OPEN / CLOSE ---------------- */
function openBrowser(){
  document.getElementById("browser-window").style.display = "flex";
  document.getElementById("taskbar-app").style.display = "inline-block";
}
function closeBrowser(){
  document.getElementById("browser-window").style.display = "none";
}

/* ---------------- DRAGGING + INIT ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const win = document.getElementById("browser-window");
  const titleBar = document.getElementById("title-bar");
  let dragging = false, offsetX = 0, offsetY = 0;

  function centerWindow(){
    const w = win.offsetWidth, h = win.offsetHeight;
    win.style.left = ((window.innerWidth - w) / 2) + "px";
    win.style.top = Math.max(20, (window.innerHeight - h) / 2 - 20) + "px";
  }

  titleBar.addEventListener("mousedown", (e) => {
    if(e.target.tagName === "SPAN" && e.target.parentElement.classList.contains("win-controls")) return;
    dragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
  });
  document.addEventListener("mousemove", (e) => {
    if(!dragging) return;
    win.style.left = (e.clientX - offsetX) + "px";
    win.style.top = (e.clientY - offsetY) + "px";
  });
  document.addEventListener("mouseup", () => { dragging = false; });

  renderSite("gridex");
  centerWindow();
});
