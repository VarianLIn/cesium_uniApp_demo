(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"712f":function(e,t,i){"use strict";i.r(t);var n=i("b18f"),s=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,(function(){return n[e]}))}(a);t["default"]=s.a},7888:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CONFIG=void 0;var n={shenyangLab2:"http://www.sunwaywh.top/gisData/shenyangLab2/tileset.json",wuhan:"http://www.sunwaywh.top/gisData/wuhan/tileset.json",obj1:"http://www.sunwaywh.top/gisData/obj1/tileset.json",obj2:"http://www.sunwaywh.top/gisData/obj2/tileset.json",obj3:"http://www.sunwaywh.top/gisData/obj3/tileset.json",test1:"../cesium_renderjs/static/data/convert/tileset.json",test2:"../cesium_renderjs/static/data/s/tileset.json"};t.CONFIG=n},"87de":function(e,t,i){"use strict";var n;i.d(t,"b",(function(){return s})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return n}));var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{attrs:{id:"container"}})],1)},a=[]},a26f:function(e,t,i){"use strict";i.r(t);var n=i("87de"),s=i("712f");for(var a in s)"default"!==a&&function(e){i.d(t,e,(function(){return s[e]}))}(a);i("ad31");var o=i("f0c5");s["default"].__module="Cesium";var r={},u=Object(o["a"])(r,n["b"],n["c"],!1,null,"3cfc212b",null,!1,n["a"],s["default"]);t["default"]=u.exports},ad31:function(e,t,i){"use strict";var n=i("e4b7"),s=i.n(n);s.a},b18f:function(e,t,i){"use strict";i("4160"),i("159b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i("7888"),s={data:function(){return{domlist:null,viewer:null,tilesetData:null,moduleHeight:0}},mounted:function(){this.initResources()},methods:{initResources:function(){if(this.domlist)this.removeResource();else{var e=document.createElement("link");e.rel="stylesheet",e.href="static/Cesium/Widgets/widgets.css",document.head.appendChild(e);var t=this.requireResources("script","static/dat.gui.js"),i=this.requireResources("script","static/Cesium/Cesium.js",this.initCesium);this.domlist=[e,t,i]}},requireResources:function(e,t,i){var n=document.createElement(e);return n.src=t,document.head.appendChild(n),i&&i instanceof Function&&(n.onload=i.bind(this)),n},removeResource:function(){if(this.domlist)for(var e=0;e<this.domlist.length;e++)document.head.removeChild(this.domlist[e])},initCesium:function(){Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0M2NkNGRmNS0zZmE2LTQ5YTctOGNlOS0xZDc1MDIzOTgzOTIiLCJpZCI6NjI3OTIsImlhdCI6MTYyNzQ2MjE4NH0.JgeH5FotG5WCWhjiskSRE6y4ZVI4b4xoN_CWuFDtAdA",this.viewer=new Cesium.Viewer("container",{terrainProvider:Cesium.createWorldTerrain(),geocoder:!1,navigationHelpButton:!1,animation:!1,timeline:!1,fullscreenButton:!1,vrButton:!1,scene3DOnly:!0}),this.viewer._cesiumWidget._creditContainer.style.display="none",this.viewer.scene.debugShowFramesPerSecond=!0,this.guiInit()},guiInit:function(){var e=this,t={name:"3dTiles地址",value:[],namelist:[]};for(var i in n.CONFIG)t.value.push({name:i,value:n.CONFIG[i]}),t.namelist.push(i);var s=new dat.GUI;s.domElement.style.position="absolute",s.domElement.style.left="10px",s.domElement.style.top="45px";var a=s.addFolder("三维模型"),o=a.add(t,"name",t.namelist),r=a.add({height:this.moduleHeight},"height",-200,200);a.open(),o.onChange((function(i){t.value.forEach((function(t,n){t.name===i&&e.add3dTiels(t.value)}))})),r.onChange((function(t){e.moduleHeight=t,e.moduleHeightChange(e.tilesetData,t)}))},add3dTiels:function(e){var t=this;this.tilesetData?this.removeData():this.tilesetData,this.tilesetData=new Cesium.Cesium3DTileset({url:e}),this.tilesetData.readyPromise.then((function(e){t.viewer&&t.viewer.scene.primitives.add(e),t.moduleHeightChange(e,t.moduleHeight),t.viewer.zoomTo(e)})).otherwise((function(e){console.log(e)}))},moduleHeightChange:function(e,t){var i=Cesium.Cartographic.fromCartesian(e.boundingSphere.center),n=Cesium.Cartesian3.fromRadians(i.longitude,i.latitude,0),s=Cesium.Cartesian3.fromRadians(i.longitude,i.latitude,t),a=Cesium.Cartesian3.subtract(s,n,new Cesium.Cartesian3);e.modelMatrix=Cesium.Matrix4.fromTranslation(a)},removeData:function(){this.tilesetData&&(this.tilesetData.destroy(),this.tilesetData=null)}},beforeDestroy:function(){this.removeData(),this.removeResource()}};t.default=s},d3e8:function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,".content[data-v-3cfc212b]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}#container[data-v-3cfc212b]{width:100%;height:500px\n\t/* background: #0ff; */}",""]),e.exports=t},e4b7:function(e,t,i){var n=i("d3e8");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var s=i("4f06").default;s("e2a0e970",n,!0,{sourceMap:!1,shadowMode:!1})}}]);