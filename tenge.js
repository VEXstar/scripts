// ==UserScript==
// @name         Currency exchange rate translation from tenge
// @namespace    Dr.VEX
// @version      0.0.1
// @author       Dr.VEX
// @description  Позволяет отображать цену в стиме в рублях и тенге и WMZ
// @license      MIT
// @homepage     https://github.com/VEXstar/scripts
// @homepageURL  https://github.com/VEXstar/scripts
// @supportURL   https://github.com/VEXstar/scripts/issues
// @downloadURL  https://raw.githubusercontent.com/VEXstar/scripts/main/tenge.js
// @updateURL    https://raw.githubusercontent.com/VEXstar/scripts/main/tenge.js
// @match        *://steamdb.info/app/*
// @match        *://steamdb.info/depot/*
// @match        *://store.steampowered.com/app/*
// @match        *://store.steampowered.com/
// @match        *://store.steampowered.com/*
// @grant        unsafeWindow
// ==/UserScript==

const rubCourse = (tenge) =>{return tenge*0.17};
const wmzCourse = (tenge) =>{return tenge*0.0022};

function wellDone() {
  const dfp = [].slice.call(document.getElementsByClassName("discount_final_price"));
  const dop = [].slice.call(document.getElementsByClassName("discount_original_price"));
  const price = [].slice.call(document.getElementsByClassName("price"));
  const all = dfp.concat(price);
  dop.forEach(el=>{el.innerText = ""});
  all.forEach(el=>{
    if(el.innerText.indexOf("Бесплатно") != -1 || el.innerText.indexOf("₸") == -1){
      return;
    }
    const oldText = el.innerText;
    const tengePrice = parseInt(oldText.replaceAll("₸","").replaceAll(" ",""));
    const rubPrice = Math.round(rubCourse(tengePrice));
    const wmzPrice = Math.round(wmzCourse(tengePrice));
    el.innerText = el.innerText + " ("+rubPrice+"₽ / "+wmzPrice+"WMZ)";
  });
  const oldBalanceText = document.getElementById("header_wallet_balance").innerText;
  const tengeBalance = parseFloat(oldBalanceText.replaceAll("₸","").replaceAll(" ",""));
  const rubPrice = Math.round(rubCourse(tengeBalance));
  const wmzPrice = Math.round(wmzCourse(tengeBalance));
  document.getElementById("header_wallet_balance").innerText = oldBalanceText + " ("+rubPrice+"₽ / "+wmzPrice+"WMZ)";
}
setTimeout(wellDone,2000);
