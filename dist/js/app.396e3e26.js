(function(t){function e(e){for(var a,i,o=e[0],c=e[1],l=e[2],m=0,d=[];m<o.length;m++)i=o[m],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&d.push(s[i][0]),s[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(d.length)d.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,o=1;o<n.length;o++){var c=n[o];0!==s[c]&&(a=!1)}a&&(r.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},s={app:0},r=[];function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-content",[n("Status")],1)],1)},r=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{tile:"",flat:""}},[n("v-data-table",{attrs:{headers:t.headers,items:t.miners,"item-key":"ip"},scopedSlots:t._u([{key:"item.url",fn:function(e){return["normal"===e.item.status?n("v-chip",{attrs:{dark:"",color:"green"},on:{click:function(n){return t.setting(e.item)}}},[n("v-icon",{attrs:{left:""}},[t._v(" mdi-check ")]),t._v(" "+t._s(e.item.summary.url))],1):n("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(a){var s=a.on;return[n("v-chip",t._g({attrs:{dark:"",color:"amber darken-3"}},s),[n("v-icon",{attrs:{left:""}},[t._v("mdi-alert-circle-outline")]),t._v(" "+t._s(e.item.summary.url)+" ")],1)]}}],null,!0)},[n("span",[t._v(t._s(e.item.setting))])])]}},{key:"item.summary.acc",fn:function(e){return[n("v-chip",{staticClass:"pa-1",attrs:{outlined:"",small:"",color:"green"}},[t._v(" "+t._s(e.item.summary.acc)+" ")])]}},{key:"item.summary.lastacctime",fn:function(e){return[n("v-chip",{staticClass:"pa-1",attrs:{small:"",outlined:"",color:"green"}},[t._v(t._s(e.item.summary.lastacctime))])]}},{key:"item.summary.rej",fn:function(e){return[n("v-chip",{staticClass:"pa-1",attrs:{small:"",outlined:"",color:"red accent-2"}},[t._v(" "+t._s(e.item.summary.rej))])]}},{key:"item.summary.temp",fn:function(e){return[n("v-chip",{staticClass:"pa-1",attrs:{small:"",color:"orange",outlined:""}},[e.item.summary.temp>t.cobre_setting.alert.temp?n("v-icon",{attrs:{color:"orange"}},[t._v("mdi-fire")]):t._e(),t._v(" "+t._s(e.item.summary.temp)+" C ")],1)]}},{key:"top",fn:function(){return[n("v-toolbar",{attrs:{flat:""}},[n("v-toolbar-title",{staticClass:"display-1 font-weight-thin"},[t._v("Super Monitoring Now :: "+t._s(t.miners.length))]),n("v-dialog",{attrs:{width:"800"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",[n("v-card-title",{staticClass:"px-3"},[n("v-icon",{staticClass:"pr-3",attrs:{color:"green accent-4","x-large":""}},[t._v("mdi-raspberry-pi")]),n("span",{staticClass:"headline font-weight-light",on:{click:function(e){return t.window.open(t.minerInfo.ip)}}},[t._v(t._s(t.minerInfo.ip)+" / "+t._s(t.minerInfo.mac))]),n("v-spacer"),n("v-btn",{attrs:{icon:""},on:{click:function(e){t.advanced=!t.advanced}}},[n("v-icon",[t._v("mdi-settings")])],1)],1),n("v-col",{attrs:{cols:"12"}},[n("v-text-field",{attrs:{label:"URL",color:"green accent-4",outlined:"",disabled:t.loading,dense:"",rounded:""},model:{value:t.minerInfo.setting.pools[0].url,callback:function(e){t.$set(t.minerInfo.setting.pools[0],"url",e)},expression:"minerInfo.setting.pools[0].url"}}),n("v-text-field",{attrs:{label:"User",rounded:"",color:"green accent-4",disabled:t.loading,outlined:"",dense:""},model:{value:t.minerInfo.setting.pools[0].user,callback:function(e){t.$set(t.minerInfo.setting.pools[0],"user",e)},expression:"minerInfo.setting.pools[0].user"}}),n("v-text-field",{attrs:{label:"Pass",color:"green accent-4",rounded:"",outlined:"",dense:"",disabled:t.loading,"hide-details":""},model:{value:t.minerInfo.setting.pools[0].pass,callback:function(e){t.$set(t.minerInfo.setting.pools[0],"pass",e)},expression:"minerInfo.setting.pools[0].pass"}})],1),n("v-col",{staticClass:"py-0"},[n("v-expand-transition",[n("v-textarea",{directives:[{name:"show",rawName:"v-show",value:t.advanced,expression:"advanced"}],attrs:{"hide-details":"",flat:"",height:"300","background-color":"red lighten-2",name:"input-7-4",disabled:t.loading,rounded:"",solo:""},model:{value:t.miner_info,callback:function(e){t.miner_info=e},expression:"miner_info"}})],1)],1),n("v-card-actions",{staticClass:"px-3"},[n("v-btn",{attrs:{text:""},on:{click:function(e){t.dialog=!1}}},[n("v-icon",[t._v("mdi-close")]),t._v(" Cancel")],1),n("v-btn",{staticClass:"white--text",attrs:{color:"green accent-4",loading:t.loading,disabled:t.loading,text:""},on:{click:function(e){return t.save(t.minerInfo.ip)}}},[n("v-icon",[t._v("mdi-content-save")]),t._v(" Save")],1),n("v-btn",{staticClass:"white--text",attrs:{color:"green accent-4",text:"",disabled:t.loading},on:{click:function(e){return t.apply(t.minerInfo.ip)}}},[n("v-icon",[t._v("mdi-restart")]),t._v(" apply")],1),n("v-spacer"),n("v-btn",{attrs:{rounded:"",color:"red accent-3",outlined:"",disabled:t.loading},on:{click:function(e){return t.reboot(t.minerInfo.ip)}}},[n("v-icon",[t._v("mdi-alert")]),t._v(" Reboot")],1),n("v-btn",{attrs:{rounded:"",color:"red accent-3",outlined:"",disabled:t.loading},on:{click:function(e){return t.shutdown(t.minerInfo.ip)}}},[n("v-icon",[t._v("mdi-power")]),t._v(" Shutdown")],1)],1)],1)],1),n("v-spacer"),n("v-switch",{attrs:{"prepend-icon":"mdi-brightness-6","hide-details":"",inset:"",color:"pink accent-2"},model:{value:t.$vuetify.theme.dark,callback:function(e){t.$set(t.$vuetify.theme,"dark",e)},expression:"$vuetify.theme.dark"}}),n("v-dialog",{attrs:{width:"500"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[n("v-btn",t._g({attrs:{icon:""}},a),[n("v-icon",[t._v("mdi-settings")])],1)]}}]),model:{value:t.settingDialog,callback:function(e){t.settingDialog=e},expression:"settingDialog"}},[n("v-card",[n("v-container",[n("v-card-text",[n("v-col",{attrs:{cols:"12"}},[n("v-subheader",{staticClass:"pl-0"}),n("v-slider",{attrs:{hint:"Tick size","persistent-hint":"","thumb-label":"always",min:"1",max:"30","thumb-size":"24",step:"1","tick-size":"10"},model:{value:t.cobre_setting.interval.axios,callback:function(e){t.$set(t.cobre_setting.interval,"axios",e)},expression:"cobre_setting.interval.axios"}})],1),n("v-col",{attrs:{cols:"12"}},[n("v-subheader",{staticClass:"pl-0"}),n("v-slider",{attrs:{hint:"Temperature alert","persistent-hint":"","thumb-size":"24","thumb-label":"always",min:"20",step:"1","tick-size":"10"},model:{value:t.cobre_setting.alert.temp,callback:function(e){t.$set(t.cobre_setting.alert,"temp",e)},expression:"cobre_setting.alert.temp"}})],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{text:"",width:"25%"},on:{click:function(e){return t.setSetting()}}},[t._v(" apply ")]),n("v-spacer")],1)],1)],1),n("v-btn",{attrs:{icon:"",loading:t.scan_loader,disabled:t.scan_loader},on:{click:function(e){return t.addMiner()}}},[n("v-icon",[t._v("mdi-magnify")])],1)],1)]},proxy:!0}])}),n("v-snackbar",{attrs:{timeout:3e3,color:t.snackColor},model:{value:t.snack,callback:function(e){t.snack=e},expression:"snack"}},[t._v(" "+t._s(t.snackText)+" ")])],1)},o=[],c=(n("4160"),n("caad"),n("ac1f"),n("2532"),n("5319"),n("2ca0"),n("159b"),n("96cf"),n("1da1")),l=n("1dce"),u=n.n(l),m=n("b5ae"),d=n("0fec"),v=n("7d1a"),p=n.n(v);d["a"].addLocale(p.a);var f={mixins:[l["validationMixin"]],validations:{ip:{required:m["required"],minLength:Object(m["minLength"])(8)}},beforeMount:function(){var t=this;this.getSetting(),this.getAllMiners(),this.inerval=setInterval((function(){t.getAllMiners()}),1e3*this.cobre_setting.interval.axios)},methods:{setSetting:function(){var t=this;clearInterval(this.inerval),this.inerval=setInterval((function(){t.getAllMiners()}),1e3*this.cobre_setting.interval.axios),this.axios.put("/v1/api/setting",this.cobre_setting).then((function(e){t.snackText=e.data,t.snackColor="success",t.snack=!0,t.settingDialog=!1})).catch((function(e){t.snackText=e,t.snackColor="error",t.snack=!0}))},getSetting:function(){var t=this;this.axios.get("/v1/api/setting").then((function(e){t.cobre_setting=e.data})).catch((function(e){t.snackText=e,t.snackColor="error",t.snack=!0}))},getAllMiners:function(){var t=this;this.axios.get("/v1/api/miners").then((function(e){t.miners=e.data,t.miners.forEach((function(e){e.summary.lastacctime=t.timeago(e.summary.lastacctime),e.summary.uptime="".concat(parseInt(e.summary.uptime/3600)," h"),e.summary.freq="".concat(parseInt(e.summary.freq/1e6)),e.summary.khs=t.hashrate(parseInt(e.summary.khs))}))})).catch((function(e){t.snackText=e,t.snackColor="error",t.snack=!0}))},hashrate:function(t){return 1e3>t/1e3?"".concat(t/1e3,"M"):"".concat(t/1e6,"G")},save:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.prev=1,t.next=4,this.axios.put("/v1/api/miners/status/".concat(e),JSON.parse(this.miner_info));case 4:n=t.sent,200===n.status&&(this.snackColor="success",this.snackText="Data saved!"),t.next=13;break;case 8:t.prev=8,t.t0=t["catch"](1),this.snackText=t.t0,this.snackColor="error",this.snack=!0;case 13:return t.prev=13,this.loading=!1,this.snack=!0,t.finish(13);case 17:case"end":return t.stop()}}),t,this,[[1,8,13,17]])})));function e(e){return t.apply(this,arguments)}return e}(),addMiner:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.scan_loader=!0,this.axios.post("/v1/api/miners").then((function(t){e.snackText=t,e.snackColor="success",e.snack=!0})).catch((function(t){e.snackText=t,e.snackColor="error",e.snack=!0})),setTimeout((function(){e.scan_loader=!1}),1e4);case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),reboot:function(t){var e=this,n=new WebSocket("ws://".concat(t,":4048/reboot"),"text");n.onmessage=function(t){e.snackText=t.data,e.snackColor="success",e.snack=!0,n.close()},n.onerror=function(t){e.snackText=t,e.snackColor="error",e.snack=!0,n.close()}},shutdown:function(t){var e=this,n=new WebSocket("ws://".concat(t,":4048/shutdown"),"text");n.onmessage=function(t){e.snackText=t.data,e.snackColor="success",e.snack=!0,n.close()},n.onerror=function(t){e.snackText=t,e.snackColor="error",e.snack=!0,n.close()}},apply:function(t){var e=this,n=new WebSocket("ws://".concat(t,":4048/restart"),"text");n.onmessage=function(t){e.snackText=t.data,e.snackColor="success",e.snack=!0,n.close()}},setting:function(t){this.minerInfo=t,this.dialog=!0},timeago:function(t){var e=new d["a"]("ko-KR"),n=e.format(new Date(t));return"just now"===n?"".concat(Math.floor((new Date-new Date(t))/1e3),"s ago"):n.includes("minute")?n.startsWith("a")?"1m ago":n.replace(" minute","m"):n.includes("minutes")?n.replace("hour","h"):n},create:function(){this.$v.$touch(),this.$v.$invalid||(this.axios.post("/v1/api/miners/".concat(this.$v.ip.$model)),this.$v.ip.$model=null)}},data:function(){return{cobre_setting:{interval:{axios:5},alert:{temp:70}},settingDialog:!1,addDialog:!1,scan_loader:!1,minerInfo:{setting:{pools:[{user:"",url:"",pass:""}]}},advanced:!1,dialog:!1,snack:!1,snackColor:"",snackText:"",pagination:{},headers:[{text:"URL",value:"url"},{text:"User",value:"summary.user"},{text:"Pass",value:"summary.pass"},{text:"Accept",value:"summary.acc"},{text:"Reject",value:"summary.rej"},{text:"Temp",value:"summary.temp"},{text:"Acc/min",value:"summary.accmn"},{text:"LastAcc",value:"summary.lastacctime"},{text:"Uptime",value:"summary.uptime"},{text:"Hashrate",value:"summary.khs"},{text:"Algo",value:"summary.algo"},{text:"NetDiff",value:"summary.diff"},{text:"PoolDiff",value:"summary.stdiff"},{text:"Chip",value:"summary.ascs"},{text:"Valid",value:"summary.ascsvalid"},{text:"Freq(MHz)",value:"summary.freq"}],ip:"",miners:[],loading:!1}},computed:{miner_info:{get:function(){return JSON.stringify(this.minerInfo.setting,null,2)},set:function(t){this.minerInfo.setting=JSON.parse(t)}}}},h=f,g=n("2877"),k=Object(g["a"])(h,i,o,!1,null,null,null),b=k.exports,x={name:"App",components:{Status:b},data:function(){return{}}},y=x,_=Object(g["a"])(y,s,r,!1,null,null,null),w=_.exports,C=n("ce5b"),I=n.n(C);n("bf40");a["default"].use(I.a);var S=new I.a({theme:{themes:{light:{primary:"#ee44aa",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}}}),T=(n("d5e8"),n("5363"),n("bc3a")),$=n.n(T),j=n("a7fe"),O=n.n(j);a["default"].use(u.a),a["default"].use(O.a,$.a),a["default"].config.productionTip=!1,new a["default"]({vuetify:S,render:function(t){return t(w)}}).$mount("#app")}});
//# sourceMappingURL=app.396e3e26.js.map