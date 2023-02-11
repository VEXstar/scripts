// ==UserScript==
// @name         Currency exchange rate translation from tenge
// @namespace    Dr.VEX
// @version      0.0.1
// @author       Dr.VEX
// @description  Позволяет отображать цену в стиме в рублях и тенге и WMZ
// @license      MIT
// @homepage     https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @homepageURL  https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @source       github:Sak32009/GetDLCInfoFromSteamDB
// @supportURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/issues/
// @downloadURL  https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/sak32009-get-data-from-steam-steamdb.user.js
// @updateURL    https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/sak32009-get-data-from-steam-steamdb.meta.js
// @match        *://steamdb.info/app/*
// @match        *://steamdb.info/depot/*
// @match        *://store.steampowered.com/app/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.bundle.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/sprintf/1.1.2/sprintf.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js
// @grant        unsafeWindow
// @updatedAT    Wed, 11 Jan 2023 09:59:28 GMT
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
