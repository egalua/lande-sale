!function(e){var t={};function s(i){if(t[i])return t[i].exports;var l=t[i]={i:i,l:!1,exports:{}};return e[i].call(l.exports,l,l.exports,s),l.l=!0,l.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)s.d(i,l,function(t){return e[t]}.bind(null,l));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=1)}([function(e,t,s){},function(e,t,s){"use strict";s.r(t);s(0),s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p,s.p;class i{constructor(e,t="galleryBoxClone-js"){this.cssNames={commonImgsBox:"img-contents",LargeImgsBox:"img-contents__control-box",LargeImgToLeft:"img-contents__to-left",LargeImgToRight:"img-contents__to-right",PopupCloseBtn:"img-contents__closeBtn",FotoCounter:"img-contents__foto-counter",TapeWrapper:"img-contents__imgs-tape-wrapper",TapeViewfinder:"img-contents__imgs-tape-hidden-box",TapeToLeft:"img-contents__tape-to-left",TapeToRight:"img-contents__tape-to-right",ImgsTape:"img-contents__imgs-tape",ImgsTapeItem:"img-contents__imgs-tape-item",ImgsTapeItemActive:"img-contents__imgs-tape-item_active",LargeImgLink:"img-contents__large-img-link",LargeImg:"img-contents__large-img",SmallImg:"img-contents__small-img",GalleryBoxClone:"galleryBoxClone-js",Preloader:"img-contents__large-img-preloader"},this.gallery=document.querySelector("."+e),this.cssNames.GalleryBoxClone=t,this.createPopupGallery(),this.setHandlers()}setHandlers(){const e=this.popupGallery.querySelector("."+this.cssNames.LargeImg),t=this;e.addEventListener("load",(e=>{const t=e.target;window.requestAnimationFrame((()=>{t.style.display=""}))}));new MutationObserver((e=>{const s=t.popupGallery.querySelector("."+t.cssNames.LargeImg),i=s.parentNode,l=e[0].target.currentSrc;i.style.backgroundImage="url("+l+")",window.requestAnimationFrame((()=>{s.style="display:none;"}))})).observe(e,{attributes:!0,attributeFilter:["src"],attributeOldValue:!0}),window.addEventListener("resize",(e=>{t.showActiveItem()})),this.popupGallery.addEventListener("click",(e=>{e.preventDefault()}));const s=this.smallImgClickHandler.bind(this);this.popupGallery.addEventListener("click",s);const i=this.closeHandler.bind(this);this.popupGallery.addEventListener("click",i);const l=this.nextImgHandler.bind(this);this.popupGallery.addEventListener("click",l);const r=this.prevImgHandler.bind(this);this.popupGallery.addEventListener("click",r);const a=this.toLeftTapeHandler.bind(this);this.popupGallery.addEventListener("click",a);const o=this.toRightTapeHandler.bind(this);this.popupGallery.addEventListener("click",o)}smallImgClickHandler(e){let t=e.target;if(t=t.closest("."+this.cssNames.ImgsTapeItem),null!==t){const e=this.getImgItemIndex(t);-1!=e&&this.openPopupGallery(e)}}closeHandler(e){let t=e.target;t=t.closest("."+this.cssNames.PopupCloseBtn),null!==t&&(this.popupGallery.style.display="",document.body.style.overflow="")}nextImgHandler(e){let t=e.target;t=t.closest("."+this.cssNames.LargeImgToRight),null!==t&&this.openPopupGallery(this.getNewActiveIdx(1))}prevImgHandler(e){let t=e.target;t=t.closest("."+this.cssNames.LargeImgToLeft),null!==t&&this.openPopupGallery(this.getNewActiveIdx(-1))}toLeftTapeHandler(e){let t=e.target;if(t=t.closest("."+this.cssNames.TapeToLeft),null!==t){let e=this.getTapeOffset();e-=this.getViewfinderWidth(),e=this.alignTapeOnLeft(e),this.setTapeOffset(e)}}toRightTapeHandler(e){let t=e.target;if(t=t.closest("."+this.cssNames.TapeToRight),null!==t){let e=this.getTapeOffset();e+=this.getViewfinderWidth(),e=this.alignTapeOnRight(e),this.setTapeOffset(e)}}getNewActiveIdx(e){const t=this.popupGallery.querySelector("."+this.cssNames.ImgsTape),s=t.querySelector("."+this.cssNames.ImgsTapeItemActive),i=t.querySelectorAll("."+this.cssNames.ImgsTapeItem).length,l=this.getImgItemIndex(s);return e<0?(i+l+e%i)%i:(l+e)%i}getImgItemIndex(e){const t=e,s=this.popupGallery.querySelector("."+this.cssNames.ImgsTape).querySelectorAll("."+this.cssNames.ImgsTapeItem);for(let e=0;e<s.length;e++)if(s[e]==t)return e;return-1}getTapeWidth(){const e=this.popupGallery.querySelector("."+this.cssNames.ImgsTape),t=window.getComputedStyle(e);return parseFloat(t.width)}getTapeOffset(){const e=this.popupGallery.querySelector("."+this.cssNames.ImgsTape),t=window.getComputedStyle(e).transform.match(/(-?[0-9\.]+)/g);return parseFloat(t[4])}getViewfinderWidth(){const e=this.popupGallery.querySelector("."+this.cssNames.TapeViewfinder);e.style.boxSizing="content-box";const t=window.getComputedStyle(e),s=parseFloat(t.width);return e.style.boxSizing="",s}getItemPosition(e){const t=this.popupGallery.querySelector("."+this.cssNames.ImgsTape),s=window.getComputedStyle(t),i=parseFloat(s.columnGap),l=window.getComputedStyle(t.querySelector("."+this.cssNames.ImgsTapeItem)),r=parseFloat(l.width),a=t.querySelectorAll("."+this.cssNames.ImgsTapeItem),o=i+r;let n=0;if(void 0===e)for(let e=0;e<a.length;e++){if(a[e].classList.contains(this.cssNames.ImgsTapeItemActive))return n;n+=o}for(let t=0;t<e;t++)n+=o;return n}getTapeStep(){const e=this.popupGallery.querySelector("."+this.cssNames.ImgsTape),t=window.getComputedStyle(e),s=parseFloat(t.columnGap),i=window.getComputedStyle(e.querySelector("."+this.cssNames.ImgsTapeItem));return s+parseFloat(i.width)}getTapeItemWidth(){const e=this.popupGallery.querySelector("."+this.cssNames.ImgsTapeItem);return parseFloat(window.getComputedStyle(e).width)}getPartlyVisImgIdx(e){let t={leftIdx:-1,rightIdx:-1};const s=this.getViewfinderWidth(),i=this.getTapeStep(),l=this.popupGallery.querySelectorAll("."+this.cssNames.ImgsTapeItem).length,r=this.getTapeItemWidth(),a=Math.abs(e)/i,o=(Math.abs(e)+s-r)/i,n=(Math.abs(e)-r)/i,p=(Math.abs(e)+s)/i;for(let e=0;e<l;e++)e<a&&e>=n&&e<o&&(t.leftIdx=e),e>a&&e<=p&&e>o&&(t.rightIdx=e);return t}createPopupGallery(){let e=document.createElement("div"),t=this.gallery.querySelector("."+this.cssNames.commonImgsBox);e.classList.add(this.cssNames.GalleryBoxClone),document.body.appendChild(e),e.appendChild(t.cloneNode(!0)),this.popupGallery=e}openPopupGallery(e){this.popupGallery.style.display="block",document.body.style.overflow="hidden",this.setLargeImg(e),this.setActiveClass(e),this.showActiveItem()}setLargeImg(e){const t=this.popupGallery.querySelector("."+this.cssNames.LargeImg),s=this.popupGallery.querySelectorAll("."+this.cssNames.LargeImgLink)[e].href;t.src=s}setActiveClass(e){const t=this.popupGallery.querySelectorAll("."+this.cssNames.ImgsTapeItemActive);if(0!=t.length)for(let e=0;e<t.length;e++)t[e].classList.remove(this.cssNames.ImgsTapeItemActive);const s=this.popupGallery.querySelectorAll("."+this.cssNames.ImgsTapeItem);s[e].classList.add(this.cssNames.ImgsTapeItemActive),this.setFotoCounter(e,s.length)}setFotoCounter(e,t){this.popupGallery.querySelector("."+this.cssNames.FotoCounter).innerHTML=++e+" / "+t}setTapeOffset(e){let t=this;window.requestAnimationFrame((()=>{t.popupGallery.querySelector("."+t.cssNames.ImgsTape).style.transform="matrix(1, 0, 0, 1,"+e+", 0)"}))}showActiveItem(){let e=this.getTapeWidth(),t=this.getTapeOffset(),s=this.getViewfinderWidth(),i=this.getItemPosition(),l=this.getTapeStep();(s-i+Math.abs(t)<l||i<Math.abs(t))&&(t=-i),e-Math.abs(t)<s&&(t=s-e),this.setTapeOffset(t)}alignTapeOnLeft(e){let t=this.getTapeOffset(),s=this.getPartlyVisImgIdx(t),i=this.popupGallery.querySelectorAll("."+this.cssNames.ImgsTapeItem).length,l=this.getTapeWidth(),r=this.getViewfinderWidth();if(t+l==r)return t;e+l<r&&(e=r-l);const a=this.getPartlyVisImgIdx(e).leftIdx;return-1!=s.rightIdx&&s.rightIdx==i-1&&-1==s.leftIdx||-1==a||(e=-this.getItemPosition(a)),e>0&&(e=0),e}alignTapeOnRight(e){let t=this.getTapeOffset(),s=this.getPartlyVisImgIdx(t),i=(this.popupGallery.querySelectorAll("."+this.cssNames.ImgsTapeItem).length,this.getTapeWidth()),l=this.getViewfinderWidth();if(0==t)return t;e>0&&(e=0);const r=this.getPartlyVisImgIdx(e).rightIdx;if((-1==s.leftIdx||0!=s.leftIdx||-1!=s.rightIdx)&&-1!=r){const t=this.getTapeItemWidth();e=l-this.getItemPosition(r)-t}return e+i<l&&(e=l-i),e}}new class{constructor(e="gallery"){this.cssNames={gallery:"gallery",popupGalleryBox:"images-box",tape:"img-contents__imgs-tape",tapeItem:"img-contents__imgs-tape-item",viewfinder:"img-contents__imgs-tape-hidden-box"},this.cssNames.gallery=e,this.gallery=document.querySelector("."+e),this.popupGallery=new i(this.cssNames.popupGalleryBox),this.setHandlers()}setHandlers(){this.gallery.addEventListener("click",(e=>{e.preventDefault()}));const e=this.smallImgClickHandler.bind(this);this.gallery.addEventListener("click",e)}smallImgClickHandler(e){let t=e.target;if(t=t.closest("."+this.cssNames.tapeItem),null!==t){const e=this.getTapeItemIdx(t);-1!=e&&this.popupGallery.openPopupGallery(e)}}getTapeItemIdx(e){const t=e.parentNode.querySelectorAll("."+this.cssNames.tapeItem);for(let s=0;s<t.length;s++)if(t[s]==e)return s;return-1}}("gallery");console.log("index page")}]);
//# sourceMappingURL=index-bandle.js.map