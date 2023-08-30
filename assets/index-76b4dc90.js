(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=e(o);fetch(o.href,a)}})();const h="https://api.artic.edu",w="/api/v1/artworks",y=async(t,i={})=>{try{const e=await fetch(t,i),{ok:n,status:o,statusText:a}=e;if(!n)throw new Error(`Fetch failed: ${o}, ${a||"no statusText"}`);return[null,await e.json()]}catch(e){return console.warn(e.message),[e,null]}},b=async({keyword:t="landscape",maxCount:i=25}={})=>{const e=new URL(h);e.pathname=`${w}/search`,e.searchParams.append("q",t),e.searchParams.append("limit",i),e.searchParams.append("query[term][is_public_domain]","true"),e.searchParams.append("fields","id,title,image_id,artwork_type_title");const[n,o]=await y(e);return n?[]:o.data},M=async t=>{const[i,e]=await y(`${h}${w}/${t}`);return i?[i,null]:[null,e.data]},S=t=>{try{return JSON.parse(localStorage.getItem(t))}catch(i){return console.error(i),null}},k=t=>{localStorage.setItem("artworks",JSON.stringify(t))},l=()=>{const t=S("artworks");return t||[]},B=t=>{k([...l(),t])},O=t=>{const i=l().filter(({id:e})=>Number(e)!==Number(t));k(i)},v=t=>!!l().find(({id:i})=>Number(i)===Number(t)),x=t=>{t.innerHTML=`
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

    <div class="flex-basic">
      <div id="videos">
        <h2>A Little Music, Perhaps?</h2>
        <div id="videos-container"></div>
      </div>

      <div id="favorite-paintings">
        <h2>Favorite Paintings</h2>
        <div id="favorite-paintings-container"></div>
      </div>
    </div>
  `;const i=document.getElementById("paintings-container"),e=document.getElementById("favorite-paintings-container"),n=document.getElementById("search-form"),o=document.getElementById("selected-painting-modal"),a=document.getElementById("videos-container");return T(a),{searchForm:n,paintingsContainer:i,selectedPaintingModal:o,favoritePaintingsContainer:e}},u=(t,i,e=400)=>{const n=new Set;t.innerHTML="",i.forEach(({id:o,title:a,image_id:r})=>{if(n.has(a.toLowerCase()))return;n.add(a.toLowerCase());const s=document.createElement("div");s.classList.add("painting-card");const d=document.createElement("h3");d.classList.add("painting-title"),d.textContent=a;const c=document.createElement("img");c.src=`https://www.artic.edu/iiif/2/${r}/full/${e},/0/default.jpg`,c.onerror=()=>s.remove(),c.alt=a;const p=g(a,r,o,"More Info","open-modal-button",`Open modal with info on "${a}"`),m=v(o)?"Remove from Favorites":"Add to Favorites",f=g(a,r,o,m,"add-to-favorites-button",`Add "${a}" to favorites`);s.append(d,c,p,f),t.append(s)})},T=t=>{["p7dqmROKGIo","dwY7w0k3j2Y","tsbQA3apvGs","nN3kXezpxro","yBkrwst9M94","7QtrcuKdnvM","XCBwOgTYFAI"].forEach(e=>{const n=document.createElement("iframe");n.src=`https://www.youtube.com/embed/${e}`,n.width="100%",n.setAttribute("tabindex","0"),n.allowFullscreen=!0,n.title="YouTube video player",n.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"),t.append(n)})},g=(t,i,e,n,o,a)=>{const r=document.createElement("button");return r.textContent=n,r.classList.add(o),r.setAttribute("aria-label",a),r.dataset.image_id=i,r.dataset.title=t,r.dataset.id=e,r},$=async t=>{t.preventDefault();const i=new FormData(t.target),e=Object.fromEntries(i.entries()),n=await b(e);u(document.querySelector("#paintings-container"),n),t.target.reset()},I=async t=>{if(!t.target.matches("button.open-modal-button"))return;const i=document.querySelector("#selected-painting-modal"),e=document.querySelector("#painting-preload-info");e.innerHTML="";const{image_id:n,id:o,title:a}=t.target.dataset,r=document.createElement("h2");r.textContent=a,e.append(r);const s=document.createElement("img");s.src=`https://www.artic.edu/iiif/2/${n}/full/843,/0/default.jpg`,s.alt=a,s.onload=()=>{e.append(s),i.showModal()};const d=document.querySelector("#painting-info");d.innerHTML=`
    <p>Artist: Loading...</p>
    <p>Date: Loading...</p>
    <p>Place of Origin: Loading...</p>
    <p>Medium: Loading...</p>
    <p>Classifications: Loading...</p>
    <p>Dimensions: Loading...</p>
  `;const[c,p]=await M(o);if(c)return d.innerHTML="Sorry, we could not find more information about this painting.";const{artist_title:m,classification_titles:f,date_display:L,place_of_origin:A,medium_display:E,dimensions:P}=p;d.innerHTML=`
    <p>Artist: ${m}</p>
    <p>Date: ${L}</p>
    <p>Place of Origin: ${A}</p>
    <p>Medium: ${E}</p>
    <p>Classifications: ${(f||[]).join(", ")}</p>
    <p>Dimensions: ${P}</p>
  `;const F=v(o)?"Remove from Favorites":"Add to Favorites",C=g(a,n,o,F,"add-to-favorites-button",`Add "${a}" to favorites`);d.append(C)},_=t=>{const i=document.querySelector("#selected-painting-modal");if(!t.target.id===i.id)return;const e=t.target.getBoundingClientRect(),n={x:t.clientX,y:t.clientY};(e.top>=n.y||n.y>=e.top+e.height||e.left>=n.x||n.x>=e.left+e.width)&&i.close()},R=t=>{if(!t.target.matches(".add-to-favorites-button"))return;const{image_id:i,title:e,id:n}=t.target.dataset,o=document.getElementById("favorite-paintings-container");return v(n)?(O(n),t.target.textContent="Add to Favorites"):(B({image_id:i,title:e,id:n}),t.target.textContent="Remove from Favorites"),u(o,l())};async function q(t){const{paintingsContainer:i,searchForm:e,selectedPaintingModal:n,favoritePaintingsContainer:o}=x(t),a=document.querySelector("main");u(o,l()),e.addEventListener("submit",$),n.addEventListener("click",_),a.addEventListener("click",R),a.addEventListener("click",I);const r=await b();u(i,r)}const N=document.querySelector("main");q(N);
