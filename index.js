import{a as h,S as b,i as d}from"./assets/vendor-D73Uttp0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const m=t=>`<li class="gallery-card">
        <a href="${t.largeImageURL}">
            <img class="gallery-img" src="${t.webformatURL}" alt="${t.tags}" />
        </a>
        <div class="gallery-info">
            <p><b>Likes:</b> ${t.likes}</p>
            <p><b>Views:</b> ${t.views}</p>
            <p><b>Comments:</b> ${t.comments}</p>
            <p><b>Downloads:</b> ${t.downloads}</p>
        </div>
    </li>`;h.defaults.baseURL="https://pixabay.com";const y=async(t,r)=>{const s={params:{q:t,image_type:"photos",orientation:"horizontal",safesearch:!0,key:"46112845-f959e042da8238bb9faecb37a",per_page:15,page:r}};return(await h.get("/api/",s)).data};document.querySelector(".main-button");const f=document.querySelector(".main-form"),L=document.querySelector(".main-input"),n=document.querySelector(".js-list"),u=document.querySelector(".js-load-more"),p=document.querySelector(".loader"),v=new b(".gallery-card a",{captionsData:"alt",captionDelay:250});let a=1,l="",g=0;const w=async t=>{if(t.preventDefault(),n.innerHTML="",l=L.value.trim(),a=1,l==="")return d.show({message:"Please fill out the form!",position:"topRight",color:"red"});p.classList.remove("is-hidden");try{const r=await y(l,a);if(r.hits.length===0)return d.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"red"});const s=r.hits.map(m).join("");n.innerHTML=s,g=n.querySelector("li").getBoundingClientRect().height,v.refresh(),u.classList.remove("is-hidden")}catch(r){console.log(r)}finally{p.classList.add("is-hidden"),f.reset()}},S=async t=>{try{a++;const s=(await y(l,a)).hits.map(m).join("");if(n.insertAdjacentHTML("beforeend",s),scrollBy({top:g*2,behavior:"smooth"}),a===response.data.totalHits)return u.classList.add("is-hidden"),d.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"blue"})}catch(r){console.log(r)}};f.addEventListener("submit",w);u.addEventListener("click",S);
//# sourceMappingURL=index.js.map
