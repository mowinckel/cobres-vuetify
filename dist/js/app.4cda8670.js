(function(t){function e(e){for(var r,o,s=e[0],l=e[1],c=e[2],d=0,v=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&v.push(i[o][0]),i[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);u&&u(e);while(v.length)v.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,s=1;s<n.length;s++){var l=n[s];0!==i[l]&&(r=!1)}r&&(a.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},i={app:0},a=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},4473:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-content",[n("HelloWorld")],1)],1)},a=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("form",{on:{submit:function(e){return e.preventDefault(),t.create(e)}}},[n("v-text-field",{attrs:{solo:"","error-messages":"error",label:"127.0.0.1",required:""},on:{input:function(e){return t.$v.ip.$touch()},blur:function(e){return t.$v.ip.$touch()}},model:{value:t.$v.ip.$model,callback:function(e){t.$set(t.$v.ip,"$model",e)},expression:"$v.ip.$model"}})],1),n("h2",{staticClass:"display-1 success--text pl-4"},[t._v(" Miners: "),n("v-fade-transition",{attrs:{"leave-absolute":""}},[n("span",{key:"tasks-"+t.miners.length},[t._v(" "+t._s(t.miners.length)+" ")])])],1),n("v-divider",{staticClass:"mt-4"}),n("v-row",{staticClass:"my-1",attrs:{align:"center"}},[n("strong",{staticClass:"mx-4 info--text text--darken-3"},[t._v(" Monitoring : "+t._s(t.miners.length)+" ")]),n("v-divider",{attrs:{vertical:""}}),n("strong",{staticClass:"mx-4 black--text"},[t._v(" Down: "+t._s(t.completedTasks)+" ")]),n("v-spacer"),n("v-btn",{staticClass:"mx-4 elevation-1",attrs:{fab:"",small:"",color:"green",loading:t.loading,disabled:t.loading},on:{click:function(e){return t.scan()}}},[n("v-icon",{attrs:{color:"white"}},[t._v("mdi-refresh")])],1)],1),n("v-divider",{staticClass:"mb-4"}),t.miners.length>0?n("v-card",[n("v-list-item-group",{attrs:{multiple:"","active-class":"green--text",dense:""},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[n("draggable",t._b({on:{change:t.change},model:{value:t.miners,callback:function(e){t.miners=e},expression:"miners"}},"draggable",t.dragOptions,!1),[n("transition-group",{attrs:{type:"transition",name:"flip"}},t._l(t.miners,(function(e,r){return n("v-list-item",{key:r+"-"+e,attrs:{"three-line":""}},[n("v-list-item-icon",[n("v-icon",{attrs:{color:"green"}},[t._v("mdi-check-circle")])],1),n("v-list-item-content",[n("v-list-item-title",{staticClass:"title"},[t._v(t._s(e.ip)+" :: "+t._s(e.summary.algo))]),n("v-list-item-title",[t._v(t._s(e.summary.url))]),n("v-list-item-title",[t._v(t._s(e.summary.user))])],1),n("v-list-item-action",[n("v-list-item-action-text"),n("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(r){var i=r.on;return[n("v-btn",t._g({attrs:{icon:"",text:"",color:"success",dark:""},on:{click:function(n){return t.setting(e.summary)}}},i),[n("v-icon",[t._v("mdi-settings")])],1)]}}],null,!0)})],1)],1)})),1)],1)],1),n("v-dialog",{attrs:{"max-width":"500",scrollable:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",[n("v-alert",{attrs:{prominent:"",type:"error",title:"",tile:""}},[n("v-row",{attrs:{align:"center"}},[n("v-col",{staticClass:"grow"},[t._v("Caution!! This is advanced setting")])],1)],1),n("v-card-text",{staticStyle:{height:"300px"}},[n("v-col",{attrs:{cols:"12"}},t._l(Object.entries(t.dialogContent),(function(t){var e=t[0],r=t[1];return n("v-text-field",{key:e,attrs:{label:e,placeholder:r,outlined:""}})})),1)],1),n("v-divider"),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"green darken-1",text:"",large:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Cancel ")]),n("v-btn",{attrs:{color:"green darken-1",text:"",large:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Apply ")])],1)],1)],1)],1):t._e()],1)},s=[],l=n("1dce"),c=n.n(l),u=n("b5ae"),d=n("310e"),v=n.n(d),f={mixins:[l["validationMixin"]],validations:{ip:{required:u["required"],minLength:Object(u["minLength"])(8)}},components:{draggable:v.a},beforeMount:function(){var t=this;this.loader="loading",this.axios.get("/v1/api/miners").then((function(e){t.miners=e.data}))},methods:{setting:function(t){this.dialogContent=t,this.dialog=!0},change:function(){},create:function(){this.$v.$touch(),this.$v.$invalid||(this.axios.post("/v1/api/miners/".concat(this.$v.ip.$model)),this.$v.ip.$model=null)}},data:function(){return{dialogContent:[],dialog:!1,ip:"",rules:[function(t){var e=/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;return e.test(t)||"올바른 IP 입력"}],selected:[],miners:[],loading:!1,loader:null}},watch:{loader:function(){var t=this,e=this.loader;this[e]=!this[e],setTimeout((function(){return t[e]=!1}),3e3),this.loader=null}},computed:{dragOptions:function(){return{animation:200,group:"description",disabled:!1,ghostClass:"ghost"}},completedTasks:function(){return 0},progress:function(){return this.completedTasks/this.miners.length*100},remainingTasks:function(){return this.miners.length-this.completedTasks}}},p=f,m=(n("dcf5"),n("2877")),g=Object(m["a"])(p,o,s,!1,null,"20032bce",null),h=g.exports,b={name:"App",components:{HelloWorld:h},data:function(){return{}}},_=b,y=Object(m["a"])(_,i,a,!1,null,null,null),x=y.exports,k=n("ce5b"),$=n.n(k);n("bf40");r["default"].use($.a);var w=new $.a({theme:{themes:{light:{primary:"#ee44aa",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}}}),C=(n("d5e8"),n("5363"),n("bc3a")),O=n.n(C),j=n("a7fe"),T=n.n(j);r["default"].use(c.a),r["default"].use(T.a,O.a),r["default"].config.productionTip=!1,new r["default"]({vuetify:w,render:function(t){return t(x)}}).$mount("#app")},dcf5:function(t,e,n){"use strict";var r=n("4473"),i=n.n(r);i.a}});
//# sourceMappingURL=app.4cda8670.js.map