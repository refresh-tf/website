(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{204:function(t,e,n){"use strict";n.d(e,"a",(function(){return meta}));var meta=function(title,t,e,n){return{title:title,meta:[{name:"title",content:title},{name:"description",content:t},{property:"og:type",content:"website"},{property:"og:url",content:e},{property:"og:title",title:title},{property:"og:description",content:t},{property:"og:image",content:n},{property:"twitter:card",content:"summary_large_image"},{property:"twitter:url",content:e},{property:"twitter:title",content:title},{property:"twitter:description",content:t},{property:"twitter:image",content:n}]}}},205:function(t,e,n){var map={"./background.jpg":143,"./cp_process.jpeg":206,"./cp_steel.jpg":207,"./pl_borneo.png":208};function r(t){var e=o(t);return n(e)}function o(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=o,t.exports=r,r.id=205},206:function(t,e,n){t.exports=n.p+"img/cp_process.c3d59ab.jpeg"},207:function(t,e,n){t.exports=n.p+"img/cp_steel.d022fdd.jpg"},208:function(t,e,n){t.exports=n.p+"img/pl_borneo.6419a69.png"},210:function(t,e,n){var content=n(215);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("354700dc",content,!0,{sourceMap:!1})},214:function(t,e,n){"use strict";n(210)},215:function(t,e,n){var r=n(33)(!1);r.push([t.i,"#map_page_info h1{text-transform:uppercase}#map_page_info .version{color:#ccc;font-weight:700;display:block}#map_page_info .version h4{margin:0;display:inline-block;text-transform:uppercase}#map_page_info .version span.version-date{color:#555}#map_page_info .changelog{list-style:none}#map_page_info .changelog div.tag{text-align:center;display:inline-block;min-width:90px;margin-right:4px;text-transform:uppercase}#map_page_info .changelog,#map_page_info section p{padding-left:10px}#map_page_info .summary{display:grid;grid-template-columns:repeat(2,1fr);grid-gap:60px}#map_page_info .summary .column{width:100%}#map_page_info .summary .column img{width:100%;height:auto}",""]),t.exports=r},231:function(t,e,n){"use strict";n.r(e);var r=n(2),o=(n(25),n(14),n(26),n(35),n(204)),c={fix:"fixed",fixed:"fixed",revert:"reverted",reverted:"reverted",improvement:"improvement",improved:"improvement"},m=function(t){return c[t]||t},l={head:function(){var t="https://refresh-tf.github.io",e=t+"/website/map/"+this.map.name.toLowerCase(),n=t+this.imgUrl,title="Refresh - "+this.mapname(),r=this.map.description;return Object(o.a)(title,r,e,n)},computed:{imgUrl:function(){return n(205)("./"+this.map.thumbnail)}},created:function(){this.$store.commit("CHANGE_LAYOUT_BG",n(205)("./"+this.map.thumbnail))},methods:{tagType:function(t){return m(t)},tagColor:function(t){var e=m(t);return"improvement"==e?"green":"reverted"==e?"yellow":"fixed"==e?"red":"blue"},filename:function(t){return[this.map.prefix,this.map.name,t.suffix].join("_")},mapname:function(){return this.map.prefix.toLowerCase()+" "+this.map.name.charAt(0).toUpperCase()+this.map.name.slice(1)}},asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,map;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,r=t.params,e.next=3,n(r.slug).fetch();case 3:return map=e.sent,e.abrupt("return",{map:map});case 5:case"end":return e.stop()}}),e)})))()}},d=(n(214),n(24)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container",attrs:{id:"map_page_info"}},[n("h1",[t._v(t._s(t.map.prefix)+" "+t._s(t.map.name))]),t._v(" "),n("div",{staticClass:"page_container"},[n("h2",[t._v("About")]),t._v(" "),n("div",{staticClass:"summary"},[n("div",{staticClass:"column"},[n("p",{staticStyle:{"white-space":"pre-line"}},[t._v(t._s(t.map.description))]),t._v(" "),t.map.versions.length>0?n("a",{staticClass:"button large",attrs:{href:t.map.versions[0].download,target:"_blank"}},[n("i",{staticClass:"mdi mdi-download"}),t._v("\r\n          Download latest version\r\n        ")]):t._e()]),t._v(" "),n("div",{staticClass:"column"},[n("img",{ref:"thumbnail",attrs:{src:t.imgUrl}})])]),t._v(" "),n("div",{staticClass:"separator"}),t._v(" "),n("h2",[t._v("Update History")]),t._v(" "),t._l(t.map.versions,(function(e){return n("section",[n("div",{staticClass:"version"},[n("h4",[t._v(t._s(e.suffix))]),t._v(" "),n("span",{staticClass:"version-date"},[t._v(t._s(e.date))])]),t._v(" "),n("ul",{staticClass:"changelog"},t._l(e.changes,(function(e){return n("li",[n("div",{class:"tag "+t.tagColor(e.type)},[n("span",[t._v(t._s(t.tagType(e.type)))])]),t._v(" "),n("span",[t._v(t._s(e.message))])])})),0),t._v(" "),n("p",[n("a",{staticClass:"button",attrs:{href:e.download,target:"_blank"}},[n("i",{staticClass:"mdi mdi-download"}),t._v("\r\n          "+t._s(t.filename(e))+"\r\n        ")])])])}))],2)])}),[],!1,null,null,null);e.default=component.exports}}]);