(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{204:function(t,e,r){"use strict";r.d(e,"a",(function(){return meta}));var meta=function(title,t,e,r){return{title:title,meta:[{name:"title",content:title},{name:"description",content:t},{property:"og:type",content:"website"},{property:"og:url",content:e},{property:"og:title",title:title},{property:"og:description",content:t},{property:"og:image",content:r},{property:"twitter:card",content:"summary_large_image"},{property:"twitter:url",content:e},{property:"twitter:title",content:title},{property:"twitter:description",content:t},{property:"twitter:image",content:r}]}}},209:function(t,e,r){var content=r(213);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(34).default)("3ff323c4",content,!0,{sourceMap:!1})},212:function(t,e,r){"use strict";r(209)},213:function(t,e,r){var n=r(33)(!1);n.push([t.i,".contributors{text-align:center}",""]),t.exports=n},230:function(t,e,r){"use strict";r.r(e);var n=r(2),o=(r(25),r(204));var c={head:function(){var t="https://refresh-tf.github.io",e=t+r(142);return Object(o.a)("About Refresh","About the Refresh project","https://refresh-tf.github.io/website/about",e)},data:function(){return{contributors:[]}},fetch:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var meta;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$content("meta").fetch();case 2:meta=e.sent,t.contributors=meta.contributors;case 4:case"end":return e.stop()}}),e)})))()},mounted:function(){!function(t){for(var i=t.length-1;i>0;i--){var e=Math.floor(Math.random()*(i+1)),r=[t[e],t[i]];t[i]=r[0],t[e]=r[1]}}(this.contributors),this.$forceUpdate()}},f=(r(212),r(24)),component=Object(f.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("h1",[t._v("About Refresh!")]),t._v(" "),r("div",{staticClass:"page_container"},[t._v("\r\n    Lorem, ipsum dolor sit amet consectetur adipisicing elit.\r\n  ")]),t._v(" "),r("div",{staticClass:"page_title"},[t._v("The Team")]),t._v(" "),r("div",{ref:"contributors",staticClass:"page_container contributors"},t._l(t.contributors,(function(t){return r("img",{attrs:{alt:"",src:"https://www.steamsignature.com/status/default/"+t+".png"}})})),0)])}),[],!1,null,null,null);e.default=component.exports}}]);