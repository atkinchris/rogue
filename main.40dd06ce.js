!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){(function(t){var n,o=t.crypto||t.msCrypto;if(o&&o.getRandomValues){var r=new Uint8Array(16);n=function(){return o.getRandomValues(r),r}}if(!n){var i=new Array(16);n=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),i[t]=e>>>((3&t)<<3)&255;return i}}e.exports=n}).call(t,n(6))},function(e,t){function n(e,t){var n=t||0,r=o;return r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]}for(var o=[],r=0;r<256;++r)o[r]=(r+256).toString(16).substr(1);e.exports=n},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=n(3),i=o(r),a=n(8),c=o(a),u=n(15),f=o(u),s=n(16),l=o(s),d=n(17),v=o(d),p=n(19),h=o(p);n(20);var y=new i.default;(0,l.default)(function(e){y.setCache("playerIntent",{type:"move",direction:e}),(0,f.default)(y,c.default)}),(0,v.default)(y),(0,f.default)(y,c.default),(0,h.default)()},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(4),a=function(){function e(){o(this,e),this.entities={},this.components={},this.caches={}}return r(e,[{key:"createEntity",value:function(){var e=(0,i.v4)();return this.entities[e]=!0,e}},{key:"setCache",value:function(e,t){this.caches[e]=t}},{key:"getCache",value:function(e){return this.caches[e]}},{key:"addComponent",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];this.components[t]||(this.components[t]={}),this.components[t][e]=n}},{key:"removeComponent",value:function(e,t){this.components[t]||(this.components[t]={}),this.components[t][e]=null}},{key:"getEntitiesWith",value:function(e){var t=this;return Object.keys(this.entities).filter(function(n){return e.every(function(e){return t.getComponent(n,e)})})}},{key:"getComponent",value:function(e,t){return this.components[t]&&this.components[t][e]}},{key:"debugComponents",value:function(){console.log(this.components)}}]),e}();t.default=a},function(e,t,n){var o=n(5),r=n(7),i=r;i.v1=o,i.v4=r,e.exports=i},function(e,t,n){function o(e,t,n){var o=t&&n||0,r=t||[];e=e||{};var a=void 0!==e.clockseq?e.clockseq:u,l=void 0!==e.msecs?e.msecs:(new Date).getTime(),d=void 0!==e.nsecs?e.nsecs:s+1,v=l-f+(d-s)/1e4;if(v<0&&void 0===e.clockseq&&(a=a+1&16383),(v<0||l>f)&&void 0===e.nsecs&&(d=0),d>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");f=l,s=d,u=a,l+=122192928e5;var p=(1e4*(268435455&l)+d)%4294967296;r[o++]=p>>>24&255,r[o++]=p>>>16&255,r[o++]=p>>>8&255,r[o++]=255&p;var h=l/4294967296*1e4&268435455;r[o++]=h>>>8&255,r[o++]=255&h,r[o++]=h>>>24&15|16,r[o++]=h>>>16&255,r[o++]=a>>>8|128,r[o++]=255&a;for(var y=e.node||c,m=0;m<6;++m)r[o+m]=y[m];return t||i(r)}var r=n(0),i=n(1),a=r(),c=[1|a[0],a[1],a[2],a[3],a[4],a[5]],u=16383&(a[6]<<8|a[7]),f=0,s=0;e.exports=o},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){function o(e,t,n){var o=t&&n||0;"string"==typeof e&&(t="binary"==e?new Array(16):null,e=null),e=e||{};var a=e.random||(e.rng||r)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t)for(var c=0;c<16;++c)t[o+c]=a[c];return t||i(a)}var r=n(0),i=n(1);e.exports=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(9),i=o(r),a=n(10),c=o(a),u=n(11),f=o(u),s=n(12),l=o(s),d=n(13),v=o(d),p=n(14),h=o(p);t.default=[(0,h.default)(),(0,c.default)(),(0,l.default)(),(0,v.default)(),(0,f.default)(),(0,i.default)()]},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){var e=document.getElementById("canvas"),t=e.getContext("2d"),n=[];return e.width=200,e.height=200,function(o){var r=o.getEntitiesWith(["tile","position"]);t.clearRect(0,0,e.width,e.height),n.forEach(function(t){t.getContext("2d").clearRect(0,0,e.width,e.height)}),r.forEach(function(t){var r=o.getComponent(t,"tile"),i=o.getComponent(t,"position"),a=20*i.x,c=20*i.y,u=r.layer,f=void 0===u?0:u;n[f]||(n[f]=e.cloneNode());var s=n[f].getContext("2d");s.fillStyle="black",s.fillRect(a,c,20,20),s.font="20px monospace",s.fillStyle="white",s.fillText(r.character,a,c+20),s.restore()}),n.forEach(function(e){t.drawImage(e,0,0)})}};t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){return function(e,t){var n=e.getCache("playerIntent");n&&n.type?e.getEntitiesWith(["playerControlled"]).forEach(function(o){switch(n.type){case"move":e.addComponent(o,"moveIntent",n);break;default:t("Invalid intent from ",o)}}):t("No intent found"),e.setCache("playerIntent",null)}};t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){return function(e){e.getEntitiesWith(["moveIntent","position"]).forEach(function(t){var n=e.getComponent(t,"moveIntent");e.addComponent(t,"position",n),e.removeComponent(t,"moveIntent")})}};t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){return function(e,t){e.getEntitiesWith(["moveIntent","position"]).forEach(function(n){var o=e.getComponent(n,"moveIntent"),r=e.getComponent(n,"position"),i=r.x,a=r.y,c={x:i,y:a};switch(o.direction){case"down":c.y+=1;break;case"up":c.y-=1;break;case"left":c.x-=1;break;case"right":c.x+=1;break;default:t("Invalid movement direction",n)}e.addComponent(n,"moveIntent",c)})}};t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){return function(e){var t=e.getEntitiesWith(["moveIntent","collides"]),n=e.getCache("collisions");t.forEach(function(t){var o=e.getComponent(t,"moveIntent"),r=o.x,i=o.y;n[r+","+i]&&e.removeComponent(t,"moveIntent")})}};t.default=o},function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},i=function(){return function(e){var t=e.getEntitiesWith(["collides","position"]),n=t.reduce(function(t,n){var i=e.getComponent(n,"position"),a=i.x,c=i.y;return r({},t,o({},a+","+c,!0))},{});e.setCache("collisions",n)}};t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t){for(var n=!0,o=0,r=function(e){console.warn(e),n=!1};n;)o+=1,o>10&&r("Iteration limit reached"),t.forEach(function(t){return t(e,r)})};t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){var t=function(t){if(t&&!t.repeat)switch(t.code){case"KeyW":case"ArrowUp":e("up");break;case"KeyS":case"ArrowDown":e("down");break;case"KeyA":case"ArrowLeft":e("left");break;case"KeyD":case"ArrowRight":e("right")}};return window.addEventListener("keydown",t),function(){return window.removeEventListener("keydown",t)}};t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(18),r=["          "," ######## ","##......# ","#...@...# ","#.......# ","##......##"," #.......#"," #########"],i=function(e){return r.forEach(function(t,n){t.split("").forEach(function(t,r){switch(t){case"@":(0,o.createPlayer)(e,{x:r,y:n}),(0,o.createFloor)(e,{x:r,y:n});break;case"#":(0,o.createWall)(e,{x:r,y:n});break;case".":(0,o.createFloor)(e,{x:r,y:n})}})})};t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t){var n=e.createEntity();return e.addComponent(n,"position",t),e.addComponent(n,"tile",{character:"@",layer:1}),e.addComponent(n,"playerControlled"),e.addComponent(n,"collides"),n},r=function(e,t){var n=e.createEntity();return e.addComponent(n,"position",t),e.addComponent(n,"tile",{character:"#"}),e.addComponent(n,"collides"),n},i=function(e,t){var n=e.createEntity();return e.addComponent(n,"position",t),e.addComponent(n,"tile",{character:"."}),n};t.createPlayer=o,t.createWall=r,t.createFloor=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={up:"ArrowUp",down:"ArrowDown",left:"ArrowLeft",right:"ArrowRight"},r=function(e){return function(){var t=new Event("keydown");t.code=e,window.dispatchEvent(t)}},i=function(){Object.keys(o).forEach(function(e){document.getElementById(e+"-button").addEventListener("click",r(o[e]))})};t.default=i},function(e,t){}]);
//# sourceMappingURL=main.40dd06ce.js.map