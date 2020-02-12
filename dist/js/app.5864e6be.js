(function(e){function t(t){for(var n,s,o=t[0],c=t[1],l=t[2],m=0,f=[];m<o.length;m++)s=o[m],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&f.push(r[s][0]),r[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(f.length)f.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,o=1;o<a.length;o++){var c=a[o];0!==r[c]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=a[0]))}return e}var n={},r={app:0},i=[];function s(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=n,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(a,n,function(t){return e[t]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-content",[a("HelloWorld")],1)],1)},i=[],s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{attrs:{tile:"",flat:""}},[a("v-data-table",{attrs:{headers:e.headers,items:e.miners,"show-select":"","single-select":"","item-key":"ip"},scopedSlots:e._u([{key:"item.url",fn:function(t){return[a("v-chip",{staticClass:"pa-1",on:{click:function(a){return e.setting(t.item)}}},[e._v(e._s(t.item.summary.url))])]}},{key:"item.summary.acc",fn:function(t){return[a("v-chip",{staticClass:"pa-1",attrs:{outlined:"",small:"",color:"green"}},[e._v(" "+e._s(t.item.summary.acc)+" ")])]}},{key:"item.summary.lastacctime",fn:function(t){return[a("v-chip",{staticClass:"pa-1",attrs:{small:"",outlined:"",color:"green"}},[e._v(e._s(t.item.summary.lastacctime))])]}},{key:"item.summary.rej",fn:function(t){return[a("v-chip",{staticClass:"pa-1",attrs:{small:"",outlined:"",color:"red accent-2"}},[e._v(" "+e._s(t.item.summary.rej))])]}},{key:"item.summary.temp",fn:function(t){return[a("v-chip",{staticClass:"pa-1",attrs:{small:"",outlined:""}},[e._v(" "+e._s(t.item.summary.temp)+" C ")])]}},{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",{staticClass:"display-1 font-weight-thin"},[e._v("Super Monitor")]),a("v-dialog",{attrs:{width:"800",persistent:""},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[e._v(e._s(e.minerInfo.ip))])]),a("v-card-text",[a("v-textarea",{attrs:{height:"300","hide-details":"",outlined:"","full-width":""},model:{value:e.minerJSON,callback:function(t){e.minerJSON=t},expression:"minerJSON"}})],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"grey",outlined:""},on:{click:function(t){e.dialog=!1}}},[e._v("Cancel")]),a("v-btn",{attrs:{color:"green",outlined:"",loading:e.loading,disabled:e.loading},on:{click:function(t){return e.save(e.minerInfo.ip)}}},[e._v("Save")]),a("v-spacer")],1)],1)],1),a("v-spacer"),a("v-switch",{attrs:{"prepend-icon":"mdi-brightness-6","hide-details":"",inset:"",color:"pink accent-2"},model:{value:e.$vuetify.theme.dark,callback:function(t){e.$set(e.$vuetify.theme,"dark",t)},expression:"$vuetify.theme.dark"}})],1)]},proxy:!0}]),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}}),a("v-snackbar",{attrs:{timeout:3e3,color:e.snackColor},model:{value:e.snack,callback:function(t){e.snack=t},expression:"snack"}},[e._v(" "+e._s(e.snackText)+" "),a("v-btn",{attrs:{text:""},on:{click:function(t){e.snack=!1}}},[e._v("Close")])],1)],1)},o=[],c=(a("4160"),a("159b"),a("96cf"),a("1da1")),l=a("1dce"),u=a.n(l),m=a("b5ae"),f=a("0fec"),d=a("7d1a"),p=a.n(d);f["a"].addLocale(p.a);var v={mixins:[l["validationMixin"]],validations:{ip:{required:m["required"],minLength:Object(m["minLength"])(8)}},beforeMount:function(){var e=this;this.axios.get("/v1/api/miners").then((function(t){e.miners=t.data,e.miners.forEach((function(t){t.summary.lastacctime=e.timeago(t.summary.lastacctime),t.summary.uptime="".concat(parseInt(t.summary.uptime/3600)," h"),t.summary.freq="".concat(parseInt(t.summary.freq/1e6)," MHz")}))}))},methods:{save:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.loader="loading",e.prev=1,e.next=4,this.axios.put("/v1/api/miners/status/".concat(t),JSON.parse(this.minerJSON));case 4:this.snackColor="success",this.snackText="Data saved",e.next=13;break;case 8:e.prev=8,e.t0=e["catch"](1),this.snackColor="error",this.snackText=e.t0,this.snack=!0;case 13:return e.prev=13,this.snack=!0,e.finish(13);case 16:case"end":return e.stop()}}),e,this,[[1,8,13,16]])})));function t(t){return e.apply(this,arguments)}return t}(),setting:function(e){this.minerInfo=e,this.minerJSON=JSON.stringify(this.minerInfo.setting,null,2),this.dialog=!0},timeago:function(e){var t=new f["a"]("ko-KR"),a=t.format(new Date(e));return"just now"===a?"".concat(Math.floor((new Date-new Date(e))/1e3),"s ago"):a},create:function(){this.$v.$touch(),this.$v.$invalid||(this.axios.post("/v1/api/miners/".concat(this.$v.ip.$model)),this.$v.ip.$model=null)}},data:function(){return{minerJSON:"",minerInfo:"",dialog:!1,snack:!1,snackColor:"",snackText:"",max25chars:function(e){return e.length<=25||"Input too long!"},pagination:{},headers:[{text:"url",value:"url"},{text:"user",value:"summary.user"},{text:"pass",value:"summary.pass",sortable:!1},{text:"acc",value:"summary.acc"},{text:"acc/min",value:"summary.accmn"},{text:"reject",value:"summary.rej"},{text:"temp",value:"summary.temp"},{text:"lastacc",value:"summary.lastacctime"},{text:"uptime",value:"summary.uptime"},{text:"hashrate",value:"summary.khs"},{text:"algorithm",value:"summary.algo"},{text:"netdiff",value:"summary.diff"},{text:"pooldiff",value:"summary.stdiff"},{text:"freq",value:"summary.freq"}],ip:"",rules:[function(e){var t=/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;return t.test(e)||"올바른 IP 입력"}],selected:[],miners:[{summary:{url:"dummy",temp:43}}],loading:!1,loader:null}},watch:{loader:function(){var e=this,t=this.loader;this[t]=!this[t],setTimeout((function(){e[t]=!1,e.dialog=!1}),3e3),this.loader=null}}},h=v,y=a("2877"),g=Object(y["a"])(h,s,o,!1,null,null,null),b=g.exports,x={name:"App",components:{HelloWorld:b},data:function(){return{}}},k=x,_=Object(y["a"])(k,r,i,!1,null,null,null),w=_.exports,O=a("ce5b"),j=a.n(O);a("bf40");n["default"].use(j.a);var C=new j.a({theme:{themes:{light:{primary:"#ee44aa",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}}}),S=(a("d5e8"),a("5363"),a("bc3a")),$=a.n(S),J=a("a7fe"),I=a.n(J);n["default"].use(u.a),n["default"].use(I.a,$.a),n["default"].config.productionTip=!1,new n["default"]({vuetify:C,render:function(e){return e(w)}}).$mount("#app")}});
//# sourceMappingURL=app.5864e6be.js.map