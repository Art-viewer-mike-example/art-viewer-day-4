(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const p="https://api.artic.edu",u="/api/v1/artworks",m=async(n,a={})=>{try{const t=await fetch(n,a),{ok:i,status:e,statusText:o}=t;if(!i)throw new Error(`Fetch failed: ${e}, ${o||"no statusText"}`);return[null,await t.json()]}catch(t){return console.warn(t.message),[t,null]}},f=async({keyword:n="landscape",maxCount:a=25}={})=>{const t=new URL(p);t.pathname=`${u}/search`,t.searchParams.append("q",n),t.searchParams.append("limit",a),t.searchParams.append("query[term][is_public_domain]","true"),t.searchParams.append("fields","id,title,image_id,artwork_type_title");const[i,e]=await m(t);return i?[]:e.data},v=async n=>{const[a,t]=await m(`${p}${u}/${n}`);return a?[a,null]:[null,t.data]},E=n=>{n.innerHTML=`
    <h1>ArtViewer App</h1>

    <form id="search-form" aria-labelledby="form-heading">
      <h2 id="form-heading">Search For Paintings By Keyword</h2>
      <label for="search-input" class="block center">
        Keyword:
        <input type="text" id="search-input" name="keyword" />
      </label>
      <fieldset class="block center">
      <legend>Select the number of results you'd like</legend>
        <input type="radio" id="option-25" name="maxCount" value="25" aria-label="Return up to 25 artworks" checked>
        <label for="option-25">25</label>
        <input type="radio" id="option-50" name="maxCount" value="50" aria-label="Return up to 50 artworks">
        <label for="option-50">50</label>
        <input type="radio" id="option-100" name="maxCount" value="100" aria-label="Return up to 100 artworks">
        <label for="option-100">100</label>
      </fieldset>
      <button type="submit" class="block center">Search for paintings!</button>
    </form>

    <dialog id="selected-painting-modal">
      <form id="close-modal" aria-label="Close modal" method="dialog"><button>X</button></form>
      <div id="painting-preload-info"></div>
      <div id="painting-info"></div>
    </dialog>

    <div id="paintings">
      <h2>Paintings</h2>
      <div id="paintings-container"></div>
    </div>
  `;const a=document.getElementById("paintings-container"),t=document.getElementById("search-form"),i=document.getElementById("selected-painting-modal");return{searchForm:t,paintingsContainer:a,selectedPaintingModal:i}},g=(n,a,t=400)=>{const i=new Set;n.innerHTML="",a.forEach(({id:e,title:o,image_id:r})=>{if(i.has(o.toLowerCase()))return;i.add(o.toLowerCase());const s=document.createElement("div");s.classList.add("painting-card");const d=document.createElement("h3");d.classList.add("painting-title"),d.textContent=o;const l=document.createElement("img");l.src=`https://www.artic.edu/iiif/2/${r}/full/${t},/0/default.jpg`,l.onerror=()=>s.remove(),l.alt=o;const c=document.createElement("button");c.textContent="More Info",c.setAttribute("aria-label",`Open modal with info on "${o}"`),c.dataset.imageId=r,c.dataset.title=o,c.dataset.artworkId=e,s.append(d,l,c),n.append(s)})},P=async n=>{n.preventDefault();const a=new FormData(n.target),t=Object.fromEntries(a.entries()),i=await f(t);g(document.querySelector("#paintings-container"),i),n.target.reset()},M=async n=>{if(!n.target.matches("button"))return;const a=document.querySelector("#selected-painting-modal"),t=document.querySelector("#painting-preload-info");t.innerHTML="";const{imageId:i,artworkId:e,title:o}=n.target.dataset,r=document.createElement("h2");r.textContent=o,t.append(r);const s=document.createElement("img");s.src=`https://www.artic.edu/iiif/2/${i}/full/843,/0/default.jpg`,s.alt=o,s.onload=()=>{t.append(s),a.showModal()};const d=document.querySelector("#painting-info");d.innerHTML=`
    <p>Artist: Loading...</p>
    <p>Date: Loading...</p>
    <p>Place of Origin: Loading...</p>
    <p>Medium: Loading...</p>
    <p>Classifications: Loading...</p>
    <p>Dimensions: Loading...</p>
  `;const[l,c]=await v(e);if(l)return d.innerHTML="Sorry, we could not find more information about this painting.";const{artist_title:h,classification_titles:y,date_display:w,place_of_origin:b,medium_display:L,dimensions:k}=c;d.innerHTML=`
    <p>Artist: ${h}</p>
    <p>Date: ${w}</p>
    <p>Place of Origin: ${b}</p>
    <p>Medium: ${L}</p>
    <p>Classifications: ${(y||[]).join(", ")}</p>
    <p>Dimensions: ${k}</p>
  `,console.log("artworkInfo:",c)},O=n=>{const a=document.querySelector("#selected-painting-modal");if(!n.target.id===a.id)return;const t=n.target.getBoundingClientRect(),i={x:n.clientX,y:n.clientY};(t.top>=i.y||i.y>=t.top+t.height||t.left>=i.x||i.x>=t.left+t.width)&&a.close()};async function S(n){const{paintingsContainer:a,searchForm:t,selectedPaintingModal:i}=E(n),e=await f();g(a,e),t.addEventListener("submit",P),a.addEventListener("click",M),i.addEventListener("click",O)}const C=document.querySelector("main");S(C);
