window.Subjx=function(r){var n={};function o(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return r[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}return o.m=r,o.c=n,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=1)}([function(t,e,r){},function(t,e,r){"use strict";r.r(e);r(0);var P=requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame||msRequestAnimationFrame||function(t){return setTimeout(t,1e3/60)},n=cancelAnimationFrame||mozCancelAnimationFrame||function(t){clearTimeout(t)},o=(Array.prototype.forEach,Array.prototype.slice),a=Array.prototype.map,i=console.warn;function f(t){return null!=t}function S(t){return null==t}function s(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var c=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.observers={}}return function(t,e,r){e&&s(t.prototype,e),r&&s(t,r)}(t,[{key:"subscribe",value:function(t,e){var r=this.observers;S(r[t])&&Object.defineProperty(r,t,{value:[]}),r[t].push(e)}},{key:"unsubscribe",value:function(e){this.observers=this.observers.filter(function(t){return t!==e})}},{key:"notify",value:function(e,r,n){S(this.observers[e])||this.observers[e].forEach(function(t){if(r!==t)switch(e){case"onmove":t.onMove(n);break;case"onrotate":t.onRotate(n);break;case"onresize":t.onResize(n);break;case"onapply":t.onApply(n);break;case"onrefreshstate":t.onRefreshState(n)}})}}]),t}();function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var h=function(){function a(t){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),!t)return this;if("string"==typeof t){var e=document.querySelectorAll(t);this.length=e.length;for(var r=0;r<this.length;r++)this[r]=e[r]}else if(1===t.nodeType||t===document)this[0]=t,this.length=1;else if(t instanceof Subjx||"object"===l(t)){this.length=t.length;for(var n=0;n<this.length;n++)this[n]=t[n]}else if(Array.isArray(t))for(var o=this.length=0;o<this.length;o++)1===t.nodeType&&(this[o]=t[o],this.length++);return this}return function(t,e,r){e&&u(t.prototype,e),r&&u(t,r)}(a,[{key:"css",value:function(t){return function(r){var t={setStyle:function(t){return function(t,e){var r=t.length;for(;r--;)for(var n in e)t[r].style[n]=e[n];return t.style}(this,t)},getStyle:function(){return function(t){var e=t.length;for(;e--;)return t[e].currentStyle?t[e].currentStyle[r]:document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(t[e],"")[r]:t[e].style[r]}(this)}};{if("string"==typeof r)return t.getStyle.apply(this,o.call(arguments,1));if("object"===l(r)||!r)return t.setStyle.apply(this,arguments);i("Method ".concat(r," does not exist"))}return!1}.call(this,t)}},{key:"find",value:function(t){return function(t){var e=this.length;for(;e--;)return O(this[e].querySelectorAll(t))}.call(this,t)}},{key:"each",value:function(t){return function(t){for(var e=o.call(this,0),r=e.length-1;0<=r;--r)n=r,t.call(e[n]);var n;return this}.call(this,t)}},{key:"on",value:function(){return function(){var t=this.length;for(;t--;)this[t].events||(this[t].events={},this[t].events[arguments[0]]=[]),2===arguments.length?document.addEventListener?this[t].addEventListener(arguments[0],arguments[1],!1):document.attachEvent?this[t].attachEvent("on".concat(arguments[0]),arguments[1]):this[t]["on".concat(arguments[0])]=arguments[1]:3===arguments.length&&"string"==typeof arguments[1]&&d(this[t],arguments[0],arguments[1],arguments[2],!0);return this}.apply(this,arguments)}},{key:"off",value:function(){return function(){var t=this.length;for(;t--;)this[t].events||(this[t].events={},this[t].events[arguments[0]]=[]),2===arguments.length?document.removeEventListener?this[t].removeEventListener(arguments[0],arguments[1],!1):document.detachEvent?this[t].detachEvent("on".concat(arguments[0]),arguments[1]):this[t]["on".concat(arguments[0])]=null:3===arguments.length&&"string"==typeof arguments[1]&&d(this[t],arguments[0],arguments[1],arguments[2],!1);return this}.apply(this,arguments)}},{key:"is",value:function(t){return function(t){var e=O(t),r=this.length;for(;r--;)if(this[r]===e[r])return!0;return!1}.call(this,t)}}]),a}();function d(t,e,r,n,o){function a(t){for(var e=t.target;e&&e!==this;)e.matches(r)&&n.call(e,t),e=e.parentNode}!0===o?document.addEventListener?t.addEventListener(e,a,!1):document.attachEvent?t.attachEvent("on".concat(e),a):t["on".concat(e)]=a:document.removeEventListener?t.removeEventListener(e,a,!1):document.detachEvent?t.detachEvent("on".concat(e),a):t["on".concat(e)]=null}function O(t){return new h(t)}function j(t){return t.getBoundingClientRect()}function p(t){return t.css("-webkit-transform")||t.css("-moz-transform")||t.css("-ms-transform")||t.css("-o-transform")||t.css("transform")||"none"}function C(t){var e={};for(var r in t=t.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*(?:,|\s)?)+\))+/g)){var n=t[r].match(/[\w\.\-]+/g);e[n.shift()]=n.map(function(t){return Number(t)})}return e}function E(t){var e=p(t).match(/-?\d+\.?\d+|-?\d+/g);return e?e.map(function(t){return parseFloat(t)}):[1,0,0,1,0,0]}function g(e,t){if(t){if(e.classList){if(!(-1<t.indexOf(" ")))return e.classList.add(t);t.split(/\s+/).forEach(function(t){return e.classList.add(t)})}return e}}var b=/px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc|deg/,y=Math.PI/180,ft=180/Math.PI;function Zt(t){var e=t.x,r=t.y,n=t.centerX,o=t.centerY,a=t.angle,i=t.newCenterX,s=t.newCenterY,c=L(n,o,e,r,a,!1,!1),l=L(i,s,e,r,a,!1,!1),u=e-(c.left-l.left),h=r-(c.top-l.top);return{resX:v(u),resY:v(h)}}function X(t,e){if(0===e)return t;var r=Y(t,e);return r-t<e?r:void 0}function Y(t,e){return 0===e?t:e*Math.round(t/e)}function N(t,e,r,n,o,a,i){var s=t+parseFloat(r)/2,c=e+parseFloat(n)/2,l=t-s,u=e-c,h=Math.atan2(u,l)+o,f=Math.sqrt(Math.pow(parseFloat(r)/2,2)+Math.pow(parseFloat(n)/2,2)),d=Math.cos(h),p=Math.sin(h),g=c+f*(p=!0===i?-p:p);return{left:v(s+f*(d=!0===a?-d:d)),top:v(g)}}function L(t,e,r,n,o,a,i){var s=Math.cos(o),c=Math.sin(o),l=(s=!0===a?-s:s)*(n-e)-(c=!0===i?-c:c)*(r-t)+e;return{left:v(s*(r-t)+c*(n-e)+t),top:v(l)}}function T(t,e){return/px/.test(t)?t:/%/.test(t)?"".concat(parseFloat(t)*parseFloat(e)/100,"px"):void 0}function D(t,e,r){return/px/.test(r)?t:/%/.test(r)?"".concat(100*parseFloat(t)/parseFloat(e),"%"):void 0}function z(t){return t.match(b)[0]}function v(t){return Number(t.toFixed(6))}function m(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var w=function(){function r(t,e){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),this.constructor===r)throw new TypeError("Cannot construct Subject instances directly");this.el=t,this.storage=null,this.Ob=e,this._onMouseDown=this._onMouseDown.bind(this),this._onTouchStart=this._onTouchStart.bind(this),this._onMouseMove=this._onMouseMove.bind(this),this._onTouchMove=this._onTouchMove.bind(this),this._onMouseUp=this._onMouseUp.bind(this),this._onTouchEnd=this._onTouchEnd.bind(this)}return function(t,e,r){e&&m(t.prototype,e),r&&m(t,r)}(r,[{key:"enable",value:function(t){S(this.storage)?(this._load(t),this._init(this.el)):warn("Already enabled")}},{key:"disable",value:function(){var t=this.storage,e=this.el;S(t)||(function(e,t){if(t){if(e.classList){if(!(-1<t.indexOf(" ")))return e.classList.remove(t);t.split(/\s+/).forEach(function(t){return e.classList.remove(t)})}}}(e,"dg-drag"),this._destroy(),delete this.storage)}},{key:"_load",value:function(t){(function(e){g(this.el,"dg-drag");var t={x:10,y:10,angle:10*y},r={move:!1,resize:!1,rotate:!1};if(f(e)){if(f(e.snap)){var n=e.snap,o=n.x,a=n.y,i=n.angle;t.x=S(o)?10:o,t.y=S(a)?10:a,t.angle=S(i)?1*y:i*y}if(f(e.each)){var s=e.each,c=s.move,l=s.resize,u=s.rotate;r.move=c||!1,r.resize=l||!1,r.rotate=u||!1}}var h=this.Ob;(r.move||r.resize||r.rotate)&&(h.subscribe("onrefreshstate",this),h.subscribe("onapply",this));r.move&&h.subscribe("onmove",this);r.resize&&h.subscribe("onresize",this);r.rotate&&h.subscribe("onrotate",this);this.storage={drop:e&&function(t){return"function"==typeof t}(e.drop)?function(t){e.drop(t,this.el)}:function(){},snap:t,each:r}}).call(this,t)}},{key:"_draw",value:function(){var D=this;!function t(){var e=D.storage;if(e.frame=P(t),e.doDraw){e.doDraw=!1;var r=e.handle,n=e.handles,o=e.cx,a=e.cy,i=e.ch,s=e.cw,c=e.refang,l=e.pressang,u=e.pageX,h=e.pageY,f=e.center,d=(e.snap,e.parentScale),p=e.doDrag,g=e.doResize,b=e.doRotate,y=d[0],v=d[1],m=e.each,w=m.move,x=(m.resize,m.rotate);if(g){var k,M,_,A,E,O=null,j=null;if(r.is(n.br)||r.is(n.mr))A=((h=(E=L(o,a,u,h,c,!1,!1)).top)-a)/v,_=((u=E.left)-o)/y,r.is(n.br)&&(j=A+i),O=_+s,M=k=!1;else if(r.is(n.tl)||r.is(n.ml))A=-((h=(E=L(o,a,u,h,c,!1,!1)).top)-a)/v,O=(_=-((u=E.left)-o)/y)+s,r.is(n.tl)&&(j=A+i),M=k=!0;else if(r.is(n.tr)||r.is(n.tc)){var X=r.is(n.tr),Y=r.is(n.tc);A=-((h=(E=L(o,a,u,h,c,X,!1)).top)-a)/v,_=-((u=E.left)-o)/y,X&&(A=-A),j=A+i,X&&(O=_+s),k=Y,M=!0}else if(r.is(n.bl)||r.is(n.bc)){var S=r.is(n.bl);h=(E=L(o,a,u,h,c,!1,S)).top,_=-((u=E.left)-o)/y,j=(A=(h-a)/v)+i,S&&(O=_+s),k=S,M=!1,console.log("bl",k,M)}D._resize(O,j,k,M,_,A)}if(p){var C=(h-a)/v,N=(u-o)/y;D._drag(C,N),w&&D.Ob.notify("onmove",D,{diffTop:C,diffLeft:N})}if(b){var T=Math.atan2(h-f.y,u-f.x)-l;D._rotate(T),x&&D.Ob.notify("onrotate",D,{radians:T})}}}()}},{key:"_start",value:function(t){t.stopImmediatePropagation&&t.stopImmediatePropagation();var e=this.storage,r=this._compute(t);e.pageX=t.pageX,e.pageY=t.pageY,e.cx=t.pageX,e.cy=t.pageY,e.ctrlKey=t.ctrlKey,e.shiftKey=t.shiftKey,Object.keys(r).forEach(function(t){e[t]=r[t]});var n=r.onRightEdge,o=r.onBottomEdge,a=r.onTopEdge,i=r.onLeftEdge,s=r.handle,c=r.factor,l=r.revX,u=r.revY,h=n||o||a||i,f=s.is(e.handles.rotator);e.doResize=h,e.doDrag=!f&&!h,e.doRotate=f,this.Ob&&this.Ob.notify("onrefreshstate",this,{factor:c,revX:l,revY:u,onTopEdge:a,onLeftEdge:i,onRightEdge:n,onBottomEdge:o}),this._draw()}},{key:"_moving",value:function(t){t.preventDefault&&t.preventDefault();var e=this.storage;e.pageX=t.pageX,e.pageY=t.pageY,e.doDraw=!0}},{key:"_end",value:function(t){t.stopImmediatePropagation&&t.stopImmediatePropagation();var e=this.storage,r=e.doResize?"resize":e.doDrag?"drag":"rotate";e.doResize=!1,e.doDrag=!1,e.doRotate=!1,e.doDraw=!1,this._apply(r),this.Ob&&this.Ob.notify("onapply",this,r),n(e.frame),e.drop.call(this,t)}},{key:"_onMouseDown",value:function(t){this._start(t),O(document).on("mousemove",this._onMouseMove).on("mouseup",this._onMouseUp)}},{key:"_onTouchStart",value:function(t){this._start(t.touches[0]),O(document).on("touchmove",this._onTouchMove).on("touchend",this._onTouchEnd)}},{key:"_onMouseMove",value:function(t){this._moving(t,this.el)}},{key:"_onTouchMove",value:function(t){this._moving(t.touches[0],this.el)}},{key:"_onMouseUp",value:function(t){this._end(t,this.el),O(document).off("mousemove",this._onMouseMove).off("mouseup",this._onMouseUp)}},{key:"_onTouchEnd",value:function(t){0===t.touches.length&&this._end(t.changedTouches[0],this.el),O(document).off("touchmove",this._onTouchMove).off("touchend",this._onTouchEnd)}},{key:"onMove",value:function(t){this._drag(t.diffTop,t.diffLeft)}},{key:"onRotate",value:function(t){this._rotate(t.radians)}},{key:"onResize",value:function(t){var e=null!==t.width?this.storage.cw+t.x:null,r=null!==t.height?this.storage.ch+t.y:null;this._resize(e,r,t.revX,t.revY)}},{key:"onApply",value:function(t){this._apply(t)}}]),r}();function x(t){return(x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function R(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function k(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function M(t,e){return!e||"object"!==x(e)&&"function"!=typeof e?function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(t):e}function _(t){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function A(t,e){return(A=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var B=function(){function o(t,e,r){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),(n=M(this,_(o).call(this,t,r))).enable(e),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&A(t,e)}(o,w),function(t,e,r){e&&k(t.prototype,e),r&&k(t,r)}(o,[{key:"_init",value:function(t,e){(function(t){var e=document.createElement("div");g(e,"dg-wrapper"),t.parentNode.insertBefore(e,t);var r=e,n=O(t),o=n.css("width"),a=n.css("height"),i=n.css("top"),s=n.css("left"),c=O(r.parentNode),l={top:i,left:s,width:T(o,c.css("width")),height:T(a,c.css("height")),transform:p(n)},u=document.createElement("div");u.innerHTML='<div class="dg-hdl dg-rotator"></div>        <div class="dg-hdl dg-hdl-t dg-hdl-l dg-hdl-tl"></div>        <div class="dg-hdl dg-hdl-t dg-hdl-r dg-hdl-tr"></div>        <div class="dg-hdl dg-hdl-b dg-hdl-r dg-hdl-br"></div>        <div class="dg-hdl dg-hdl-b dg-hdl-l dg-hdl-bl"></div>        <div class="dg-hdl dg-hdl-t dg-hdl-c dg-hdl-tc"></div>        <div class="dg-hdl dg-hdl-b dg-hdl-c dg-hdl-bc"></div>        <div class="dg-hdl dg-hdl-m dg-hdl-l dg-hdl-ml"></div>        <div class="dg-hdl dg-hdl-m dg-hdl-r dg-hdl-mr"></div>',g(u,"dg-controls"),r.appendChild(u);var h=O(u);h.css(l);var f=O(r);Object.assign(this.storage,{controls:u,handles:{tl:f.find(".dg-hdl-tl"),tr:f.find(".dg-hdl-tr"),br:f.find(".dg-hdl-br"),bl:f.find(".dg-hdl-bl"),tc:f.find(".dg-hdl-tc"),bc:f.find(".dg-hdl-bc"),ml:f.find(".dg-hdl-ml"),mr:f.find(".dg-hdl-mr"),rotator:f.find(".dg-rotator")},parent:c}),h.on("mousedown",this._onMouseDown).on("touchstart",this._onTouchStart)}).call(this,t,e)}},{key:"_destroy",value:function(t){(function(){var t=this.storage.controls;O(t).off("mousedown",this._onMouseDown).off("touchstart",this._onTouchStart),this.el.parentNode.removeChild(t.parentNode)}).call(this,t)}},{key:"_drag",value:function(){I.call.apply(I,[this].concat(Array.prototype.slice.call(arguments)))}},{key:"_rotate",value:function(){H.call.apply(H,[this].concat(Array.prototype.slice.call(arguments)))}},{key:"_resize",value:function(){q.call.apply(q,[this].concat(Array.prototype.slice.call(arguments)))}},{key:"_compute",value:function(){return F.call.apply(F,[this].concat(Array.prototype.slice.call(arguments)))}},{key:"_apply",value:function(){var t=this.storage,e=O(this.el),r=t.cached,n=t.parent,o=t.dimens,a=t.controls;if(r){var i=R(r),s=i[4],c=i[5];i[4]=0,i[5]=0;var l=U(i),u=n.css("width"),h=n.css("height"),f=parseFloat(T(e.css("left"),u)),d=parseFloat(T(e.css("top"),h));l.left=D(f+s+"px",u,o.left),l.top=D(d+c+"px",h,o.top),e.css(l),O(a).css(l),window.parent.postMessage({event:"resize-on-mouseup",position:{width:a.style.width,height:a.style.height,diffLeft:s,diffTop:c}},"http://127.0.0.1:3978/#/edit"),this.storage.cached=null}}},{key:"onRefreshState",value:function(t){var e=this.storage,r=function(t,e,r){var n=this.storage,o=n.controls,a=n.handles,i=n.parent,s=n.snap,c=j(a.tl[0]),l=j(a.tr[0]),u=Math.atan2(l.top-c.top,l.left-c.left)*t,h=parseFloat(T(o.style.width,i.css("width"))),f=parseFloat(T(o.style.height,i.css("height"))),d=E(O(o)),p=N(d[4],d[5],h,f,u,e,r),g=O(this.el),b=this.el.style;return{transform:d,parentTransform:E(i),left:Y(d[4],s.x),top:Y(d[5],s.y),coordX:p.left,coordY:p.top,refang:u,cw:h,ch:f,dimens:{top:z(b.top||g.css("top")),left:z(b.left||g.css("left")),width:z(b.width||g.css("width")),height:z(b.height||g.css("height"))}}}.call(this,t.factor,t.revX,t.revY);Object.keys(r).forEach(function(t){e[t]=r[t]})}}]),o}();function F(t){var e=this.el,r=this.storage,n=r.handles,o=r.controls,a=r.parent,i=r.snap,s=O(t.target),c=1,l=s.is(n.tl)||s.is(n.ml)||s.is(n.bl)||s.is(n.tc),u=s.is(n.tl)||s.is(n.tr)||s.is(n.tc)||s.is(n.ml);(s.is(n.tr)||s.is(n.bl))&&(c=-1);var h=j(n.tl[0]),f=j(n.tr[0]),d=Math.atan2(f.top-h.top,f.left-h.left)*c,p=parseFloat(T(o.style.width,a.css("width"))),g=parseFloat(T(o.style.height,a.css("height"))),b=E(O(o)),y=N(b[4],b[5],p,g,d,l,u),v=j(o),m=v.left+p/2,w=v.top+g/2,x=Math.atan2(t.pageY-w,t.pageX-m),k=O(e),M=e.style,_={top:z(M.top||k.css("top")),left:z(M.left||k.css("left")),width:z(M.width||k.css("width")),height:z(M.height||k.css("height"))},A=E(a);return{parentScale:[A[0],A[3]],transform:b,cw:p,ch:g,center:{x:m,y:w},left:Y(b[4],i.x),top:Y(b[5],i.y),coordY:y.top,coordX:y.left,factor:c,pressang:x,refang:d,revX:l,revY:u,handle:s,onTopEdge:s.is(n.tl)||s.is(n.tc)||s.is(n.tr),onLeftEdge:s.is(n.tl)||s.is(n.ml)||s.is(n.bl),onRightEdge:s.is(n.tr)||s.is(n.mr)||s.is(n.br),onBottomEdge:s.is(n.br)||s.is(n.bc)||s.is(n.bl),dimens:_}}function q(t,e,r,n){var o=this.el,a=this.storage,i=a.controls,s=a.handle,c=a.snap,l=a.left,u=a.top,h=a.coordX,f=a.coordY,d=a.refang,p=a.dimens,g=a.parent,b=a.transform,y=i.style;null!==t&&(y.width="".concat(X(t,c.x),"px"));var v=s[0].classList.contains("dg-hdl-br")||s[0].classList.contains("dg-hdl-tr")||s[0].classList.contains("dg-hdl-bl")||s[0].classList.contains("dg-hdl-tl"),m=a.ch/a.cw;null!==e&&(a.shiftKey&&v&&(e=t*m),y.height="".concat(X(e,c.y),"px"));var w=N(l,u,y.width,y.height,d,r,n),x=u-(w.top-f),k=l-(w.left-h),M=R(b);M[4]=k,M[5]=x;var _=U(M);O(i).css(_),_.width=D(y.width,g.css("width"),p.width),_.height=D(y.height,g.css("height"),p.height);var A={width:_.width,height:_.height};O(o).css(_),window.parent.postMessage({event:"resize-from-package",size:A},"http://127.0.0.1:3978/#/edit"),a.cached=M}function I(t,e){var r=this.el,n=this.storage,o=n.controls,a=n.transform,i=n.snap,s=R(a),c={elDrag:r,elDragContainer:document.querySelector("body")};c.elDrag.name&&c.elDrag.name.match("fullscreen")?(c.elDragClient={left:+c.elDrag.name.split("/")[1],right:+c.elDrag.name.split("/")[2],top:+c.elDrag.name.split("/")[3],bottom:+c.elDrag.name.split("/")[4]},(c.elDragClient.left||Math.abs(Math.round(c.elDragClient.right+2))-Math.round(c.elDragContainer.clientWidth))&&(0<e&&c.elDragClient.left?Math.abs(c.elDragClient.left)>Math.abs(e)?s[4]=X(a[4]+Math.round(e),i.x):s[4]=X(a[4]+Math.abs(c.elDragClient.left),i.x):e<=0&&Math.round(c.elDragClient.right-2)-Math.round(c.elDragContainer.clientWidth)&&(0<Math.abs(Math.round(c.elDragClient.right))-Math.round(c.elDragContainer.clientWidth)-Math.abs(e)?s[4]=X(a[4]+e,i.x):s[4]=X(a[4]-(Math.abs(Math.round(c.elDragClient.right))-Math.round(c.elDragContainer.clientWidth)),i.x))),c.elDragClient.top&&(0<t&&c.elDragClient.top?Math.abs(c.elDragClient.top)>Math.abs(t)?s[5]=X(a[5]+Math.round(t),i.y):s[5]=X(a[5]+Math.abs(c.elDragClient.top),i.y):e<=0&&Math.round(c.elDragClient.bottom-2)-Math.round(c.elDragContainer.clientHeight)&&(0<Math.abs(Math.round(c.elDragClient.bottom))-Math.round(c.elDragContainer.clientHeight)-Math.abs(t)?s[5]=X(a[5]+t,i.y):s[5]=X(a[5]-(Math.abs(Math.round(c.elDragClient.bottom))-Math.round(c.elDragContainer.clientHeight)),i.y)))):(s[4]=X(a[4]+e,i.x),s[5]=X(a[5]+t,i.y));var l=U(s);O(o).css(l),O(r).css(l),n.cached=s}function H(t){var e=this.el,r=this.storage,n=r.controls,o=r.transform,a=r.refang,i=r.snap,s=R(o),c=X(a+t,i.angle);s[0]=v(Math.cos(c)),s[1]=v(Math.sin(c)),s[2]=-v(Math.sin(c)),s[3]=v(Math.cos(c)),window.parent.postMessage({event:"rotate-from-resizer",value:c*(180/Math.PI)},"http://127.0.0.1:3978/#/edit");var l=U(s);O(n).css(l),O(e).css(l),r.cached=s}function U(t){var e="matrix(".concat(t.join(),")");return{transform:e,webkitTranform:e,mozTransform:e,msTransform:e,otransform:e}}function Gt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(t){V(e,t,r[t])})}return e}function V(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function $t(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=[],n=!0,o=!1,a=void 0;try{for(var i,s=t[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(t){o=!0,a=t}finally{try{n||null==s.return||s.return()}finally{if(o)throw a}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var K=/([achlmqstvz])([^achlmqstvz]*)/gi,W=/\s*,\s*|\s+/g;function Jt(t){for(var e=K.lastIndex=0,r=[];e=K.exec(t);){var n=e[1],o=n.toUpperCase();r.push({relative:n!==o,key:o,cmd:n,value:e[2].trim().split(W).map(function(t){if(!isNaN(t))return Number(t)})})}return r}function te(t,e,r,n){return t+e*(Math.abs(t-r)/n)}function ee(t,e,r){return t+e*(t/r)}function re(t){return!0===t?-1:1}function dt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(t){Q(e,t,r[t])})}return e}function Q(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Z(t){return(Z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function G(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function $(t,e){return!e||"object"!==Z(e)&&"function"!=typeof e?function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(t):e}function J(t){return(J=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function tt(t,e){return(tt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var et=25,rt=/[+-]?\d+(\.\d+)?/g,nt=/translate\(.*\)(.*)translate\(.*\)|$/,ot=function(){function o(t,e,r){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),(n=$(this,J(o).call(this,t,r))).enable(e),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&tt(t,e)}(o,w),function(t,e,r){e&&G(t.prototype,e),r&&G(t,r)}(o,[{key:"_init",value:function(t,e){(function(t){var r=lt("g");t.parentNode.appendChild(r);var e=t.getBBox(),n=e.width,o=e.height,a=e.x,i=e.y,s=t.getAttribute("transform")||"translate(0 0)",c=lt("rect");[["width",n],["height",o],["x",a],["y",i],["fill","transparent"],["stroke","#00a8ff"],["stroke-dasharray","3 3"],["transform",s]].forEach(function(t){c.setAttribute(t[0],t[1])});var l=lt("g");l.appendChild(c),r.appendChild(l);var u={tl:[a,i],tr:[a+n,i],br:[a+n,i+o],bl:[a,i+o],tc:[a+n/2,i],bc:[a+n/2,i+o],ml:[a,i+o/2],mr:[a+n,i+o/2],rotator:[a+n/2,i-et]};Object.keys(u).forEach(function(t){var e=u[t];u[t]=function(t,e,r){var n=lt("circle"),o={cx:t,cy:e,r:6,fill:"white",stroke:"#00a8ff",transform:r};return Object.keys(o).map(function(t){n.setAttribute(t,o[t])}),n}(e[0],e[1],s),r.appendChild(lt("g").appendChild(u[t]).parentNode)}),Object.assign(this.storage,{wrapper:r,box:c,handles:u,parent:r.parentNode}),O(r).on("mousedown",this._onMouseDown).on("touchstart",this._onTouchStart)}).call(this,t,e)}},{key:"_destroy",value:function(t){(function(){var t=this.storage.wrapper;O(t).off("mousedown",this._onMouseDown).off("touchstart",this._onTouchStart),this.el.parentNode.removeChild(t)}).call(this,t)}},{key:"_drag",value:function(){st.call.apply(st,[this].concat(Array.prototype.slice.call(arguments)))}},{key:"_rotate",value:function(){ct.call.apply(ct,[this].concat(Array.prototype.slice.call(arguments)))}},{key:"_resize",value:function(){it.call.apply(it,[this].concat(Array.prototype.slice.call(arguments)))}},{key:"_compute",value:function(){return at.call.apply(at,[this].concat(Array.prototype.slice.call(arguments)))}},{key:"_apply",value:function(t){var e=this,r=this.storage,n=r.box,o=r.handles,a=r.refang,i=r.factor,s=r.wrapper,c=r.cached,l=r.transform,u=C(s.getAttribute("transform")||"translate(0 0)").translate,h=n.getBBox(),f=h.x,d=h.y,p=h.width,g=h.height,b=u[0],y=u[1],v=f+b,m=d+y,w=v+p/2,x=m+g/2;if("rotate"!==t&&ut(n,o,{x:v,y:m,width:p,height:g,angle:a*i}),"drag"===t){if(0===b&&0===y)return;s.removeAttribute("transform");var k=[];"g"===this.el.tagName.toLowerCase()?(this.el.childNodes.forEach(function(t){1===t.nodeType&&k.push(t)}),this.el.removeAttribute("transform")):k.push(this.el),k.forEach(function(t){!function(e,t){var r=t.x,n=t.y,o=t.angle,a=t.centerX,i=t.centerY,s=[["transform","rotate(".concat(o," ").concat(a," ").concat(i,")")]];switch(e.tagName.toLowerCase()){case"text":case"rect":var c=Number(e.getAttribute("x"))+r,l=Number(e.getAttribute("y"))+n;s.push(["x",c],["y",l]);break;case"circle":case"ellipse":var u=Number(e.getAttribute("cx"))+r,h=Number(e.getAttribute("cy"))+n;s.push(["cx",u],["cy",h]);break;case"line":var f=Number(e.getAttribute("x1"))+r,d=Number(e.getAttribute("y1"))+n,p=Number(e.getAttribute("x2"))+r,g=Number(e.getAttribute("y2"))+n;s.push(["x1",f],["y1",d],["x2",p],["y2",g]);break;case"polygon":case"polyline":var b=pt(e.getAttribute("points")).map(function(t){return t[0]=Number(t[0])+r,t[1]=Number(t[1])+n,t.join(" ")}).join(" ");s.push(["points",b]);break;case"path":var y=e.getAttribute("d");s.push(["d",function(t){for(var e=t.path,r=t.x,n=t.y,o=Jt(e),a="",i=!0,s=0,c=o.length;s<c;s++){var l=o[s],u=l.value,h=l.key,f=l.relative;switch(h){case"M":if(f&&!i)break;u[0]=u[0]+r,u[1]=u[1]+n;break;case"A":if(f)break;u[5]=u[5]+r,u[6]=u[6]+n;break;case"C":if(f)break;u[0]=u[0]+r,u[1]=u[1]+n,u[2]=u[2]+r,u[3]=u[3]+n,u[4]=u[4]+r,u[5]=u[5]+n;break;case"H":if(f)break;u[0]=u[0]+r;break;case"V":if(f)break;u[0]=u[0]+n;break;case"L":case"T":if(f)break;u[0]=u[0]+r,u[1]=u[1]+n;break;case"Q":case"S":if(f)break;u[0]=u[0]+r,u[1]=u[1]+n,u[2]=u[2]+r,u[3]=u[3]+n;break;case"Z":u[0]=""}a+=l.cmd+l.value.join(",")+" ",i=!1}return a}({path:y,x:r,y:n})])}s.forEach(function(t){e.setAttribute(t[0],t[1])})}(t,{x:b,y:y,angle:a*i*ft,centerX:w,centerY:x})})}if("resize"===t){if(S(c))return;var M=[],_=c.revX,A=c.revY,E=c.scaleX,O=c.scaleY,j=c.diffX,X=c.diffY,Y=!1;"g"===this.el.tagName.toLowerCase()?(this.el.childNodes.forEach(function(t){1===t.nodeType&&M.push(t)}),Y=!0):M.push(this.el),M.forEach(function(t){!function(e,t){var r=t.scaleX,n=t.scaleY,o=t.diffX,a=t.diffY,i=t.revX,s=t.revY,c=t.angle,l=t.centerX,u=t.centerY,h=t.bBox,f=t.store,d=f.onRightEdge,p=f.onLeftEdge,g=f.onTopEdge,b=f.onBottomEdge,y=f.center,v=h.x,m=h.y,w=h.width,x=h.height,k=0,M=0;d&&(k=v);p&&(k=v+w);g&&(M=m+x);b&&(M=m);var _={centerX:y.left,centerY:y.top,newCenterX:l,newCenterY:u,angle:c},A=[["transform","rotate(".concat(c*ft," ").concat(l," ").concat(u,")")]];switch(e.tagName.toLowerCase()){case"text":var E=Number(e.getAttribute("x")),O=Number(e.getAttribute("y")),j=Zt(dt({x:te(E,o,k,w),y:te(O,a,M,x)},_)),X=j.resX,Y=j.resY;A.push(["x",X+(r<0?w:0)],["y",Y+(n<0?x:0)]);break;case"circle":var S=Number(e.getAttribute("r")),C=Number(e.getAttribute("cx")),N=Number(e.getAttribute("cy")),T=S*(Math.abs(r)+Math.abs(n))/2,D=Zt(dt({x:te(C,o,k,w),y:te(N,a,M,x)},_)),P=D.resX,L=D.resY;A.push(["r",T],["cx",P],["cy",L]);break;case"rect":var z=Number(e.getAttribute("width")),R=Number(e.getAttribute("height")),B=Number(e.getAttribute("x")),F=Number(e.getAttribute("y")),q=Zt(dt({x:te(B,o,k,w),y:te(F,a,M,x)},_)),I=q.resX,H=q.resY,U=z*Math.abs(r),V=R*Math.abs(n);A.push(["x",I-(r<0?U:0)],["y",H-(n<0?V:0)],["width",U],["height",V]);break;case"ellipse":var K=Number(e.getAttribute("rx")),W=Number(e.getAttribute("ry")),Q=Number(e.getAttribute("cx")),Z=Number(e.getAttribute("cy")),G=Zt(dt({x:te(Q,o,k,w),y:te(Z,a,M,x)},_)),$=G.resX,J=G.resY;A.push(["rx",K*Math.abs(r)],["ry",W*Math.abs(n)],["cx",$],["cy",J]);break;case"line":var tt=Number(e.getAttribute("x1")),et=Number(e.getAttribute("y1")),rt=Number(e.getAttribute("x2")),nt=Number(e.getAttribute("y2")),ot=Zt(dt({x:te(tt,o,k,w),y:te(et,a,M,x)},_)),at=ot.resX,it=ot.resY,st=Zt(dt({x:te(rt,o,k,w),y:te(nt,a,M,x)},_)),ct=st.resX,lt=st.resY;A.push(["x1",at],["y1",it],["x2",ct],["y2",lt]);break;case"polygon":case"polyline":var ut=pt(e.getAttribute("points")).map(function(t){var e=Zt(dt({x:te(Number(t[0]),o,k,w),y:te(Number(t[1]),a,M,x)},_)),r=e.resX,n=e.resY;return t[0]=r,t[1]=n,t.join(" ")}).join(" ");A.push(["points",ut]);break;case"path":var ht=e.getAttribute("d");A.push(["d",function(t){for(var e=t.bBox,r=t.path,n=t.baseData,o=t.dx,a=t.dy,i=t.revX,s=t.revY,c=t.fixedX,l=t.fixedY,u=Jt(r),h=e.width,f=e.height,d="",p=[],g=!0,b=0,y=u.length;b<y;b++){var v=u[b],m=v.value,w=v.key,x=v.relative;switch(w){case"A":var k=$t(m,7),M=k[0],_=k[1],A=k[2],E=k[3],O=k[4],j=k[5],X=k[6],Y=re(i),S=re(s),C=[],N=M+o*Y*(M/h),T=_+a*S*(_/f);if(C.push(N,T,A,E,O),x)C.push(ee(j,o*Y,h),ee(X,a*S,f));else{var D=Zt(Gt({x:te(j,o,c,h),y:te(X,a,l,f)},n)),P=D.resX,L=D.resY;C.push(P,L)}p.push(C);break;case"C":var z=$t(m,6),R=z[0],B=z[1],F=z[2],q=z[3],I=z[4],H=z[5];if(x){var U=re(i),V=re(s);p.push([ee(R,o*U,h),ee(B,a*V,f),ee(F,o*U,h),ee(q,a*V,f),ee(I,o*U,h),ee(H,a*V,f)])}else{var K=s&&l<B||!s&&B<l?-1:1,W=i&&c<F||!i&&F<c?-1:1,Q=s&&l<q||!s&&q<l?-1:1,Z=Zt(Gt({x:te(R,o*(i&&c<R||!i&&R<c?-1:1),c,h),y:te(B,a*K,l,f)},n)),G=Z.resX,$=Z.resY,J=Zt(Gt({x:te(F,o*W,c,h),y:te(q,a*Q,l,f)},n)),tt=J.resX,et=J.resY,rt=Zt(Gt({x:te(I,o,c,h),y:te(H,a,l,f)},n)),nt=rt.resX,ot=rt.resY;p.push([G,$,tt,et,nt,ot])}break;case"H":if(x){var at=re(i);p.push([ee(m[0],o*at,h)])}else{var it=Zt(Gt({x:te(m[0],o,c,h),y:0},n)).resX;p.push([it])}break;case"V":if(x){var st=re(s);p.push([ee(m[0],a*st,f)])}else{var ct=Zt(Gt({x:0,y:te(m[0],a,l,f)},n)).resY;p.push([ct])}break;case"T":case"L":if(x){var lt=re(i),ut=re(s);p.push([ee(m[0],o*lt,h),ee(m[1],a*ut,f)])}else{var ht=Zt(Gt({x:te(m[0],o,c,h),y:te(m[1],a,l,f)},n)),ft=ht.resX,dt=ht.resY;p.push([ft,dt])}break;case"M":var pt=$t(m,2),gt=pt[0],bt=pt[1];if(x&&!g){var yt=re(i),vt=re(s);p.push([ee(gt,o*yt,h),ee(bt,a*vt,f)])}else{var mt=Zt(Gt({x:te(gt,o,c,h),y:te(bt,a,l,f)},n)),wt=mt.resX,xt=mt.resY;p.push([wt,xt])}break;case"Q":var kt=$t(m,4),Mt=kt[0],_t=kt[1],At=kt[2],Et=kt[3];if(x){var Ot=re(i),jt=re(s);p.push([ee(Mt,o*Ot,h),ee(_t,a*jt,f),ee(At,o*Ot,h),ee(Et,a*jt,f)])}else{var Xt=s&&l<_t||!s&&_t<l?-1:1,Yt=Zt(Gt({x:te(Mt,o*(i&&c<Mt||!i&&Mt<c?-1:1),c,h),y:te(_t,a*Xt,l,f)},n)),St=Yt.resX,Ct=Yt.resY,Nt=Zt(Gt({x:te(At,o,c,h),y:te(Et,a,l,f)},n)),Tt=Nt.resX,Dt=Nt.resY;p.push([St,Ct,Tt,Dt])}break;case"S":var Pt=$t(m,4),Lt=Pt[0],zt=Pt[1],Rt=Pt[2],Bt=Pt[3];if(x){var Ft=re(i),qt=re(s);p.push([ee(Lt,o*Ft,h),ee(zt,a*qt,f),ee(Rt,o*Ft,h),ee(Bt,a*qt,f)])}else{var It=s&&l<zt||!s&&zt<l?-1:1,Ht=Zt(Gt({x:te(Lt,o*(i&&c<Lt||!i&&Lt<c?-1:1),c,h),y:te(zt,a*It,l,f)},n)),Ut=Ht.resX,Vt=Ht.resY,Kt=Zt(Gt({x:te(Rt,o,c,h),y:te(Bt,a,l,f)},n)),Wt=Kt.resX,Qt=Kt.resY;p.push([Ut,Vt,Wt,Qt])}break;case"Z":p.push([""])}d+=v.cmd+p[b].join(",")+" ",g=!1}return d}({bBox:h,path:ht,baseData:_,dx:o,dy:a,revX:i,revY:s,fixedX:k,fixedY:M})])}A.forEach(function(t){e.setAttribute(t[0],t[1])})}(t,{scaleX:E,scaleY:O,diffX:j*re(_),diffY:X*re(A),revX:_,revY:A,angle:a*i,factor:i,centerX:w,centerY:x,bBox:!0===Y?l.bBox:t.getBBox(),store:e.storage})}),this.storage.cached=null}}},{key:"onRefreshState",value:function(e){var r=this.storage,n=function(t){var e=t.factor,r=t.revX,n=t.revY,o=this.storage,a=o.box,i=o.handles,s=o.snap,c=j(i.tl),l=j(i.tr),u=Math.atan2(l.y-c.y,l.x-c.x)*e,h=a.getBBox(),f=h.width,d=h.height,p=h.x,g=h.y,b=N(p,g,f,d,u,r,n),y=j(a);return{transform:{orig:this.el.getAttribute("transform"),value:a.getAttribute("transform"),scaleX:r?f+p:p,scaleY:n?d+g:g,bBox:h},cw:f,ch:d,center:{x:y.left+f/2,y:y.top+d/2,left:p+f/2,top:g+d/2},left:Y(p,s.x),top:Y(g,s.y),coordX:b.left,coordY:b.top,factor:e,refang:u}}.call(this,e);Object.keys(e).forEach(function(t){r[t]=e[t]}),Object.keys(n).forEach(function(t){r[t]=n[t]})}}]),o}();function at(t){var e=this.storage,r=e.box,n=e.handles,o=e.snap,a=e.parent,i=O(t.target),s=1,c=i.is(n.tl)||i.is(n.ml)||i.is(n.bl)||i.is(n.tc),l=i.is(n.tl)||i.is(n.tr)||i.is(n.tc)||i.is(n.ml);(i.is(n.tr)||i.is(n.bl))&&(s=-1);var u=j(n.tl),h=j(n.tr),f=Math.atan2(h.top-u.top,h.left-u.left)*s,d=r.getBBox(),p=d.width,g=d.height,b=d.x,y=d.y,v=N(b,y,p,g,f,c,l),m=j(r),w=m.left+p/2,x=m.top+g/2,k=Math.atan2(t.pageY-x,t.pageX-w),M=i.is(n.tl)||i.is(n.tc)||i.is(n.tr),_=i.is(n.tl)||i.is(n.ml)||i.is(n.bl),A=i.is(n.tr)||i.is(n.mr)||i.is(n.br),E=i.is(n.br)||i.is(n.bc)||i.is(n.bl);return{transform:{orig:this.el.getAttribute("transform"),value:r.getAttribute("transform"),scaleX:c?p+b:b,scaleY:l?g+y:y,bBox:d},parentScale:C(a.getAttribute("transform")||"scale(1 1)").scale,cw:p,ch:g,center:{x:m.left+p/2,y:m.top+g/2,left:b+p/2,top:y+g/2},left:Y(b,o.x),top:Y(y,o.y),coordX:v.left,coordY:v.top,factor:s,pressang:k,refang:f,revX:c,revY:l,handle:i,onTopEdge:M,onLeftEdge:_,onRightEdge:A,onBottomEdge:E}}function it(t,e,r,n){var o=this.storage,a=o.box,i=o.handles,s=o.snap,c=o.left,l=o.top,u=o.coordX,h=o.coordY,f=o.refang,d=o.factor,p=o.cw,g=o.ch,b=o.transform,y=this.el,v=Number(a.getAttribute("width")),m=Number(a.getAttribute("height"));if(null!==t&&(v=X(t,s.x)),null!==e&&(m=X(e,s.y)),!(Math.abs(v)<2||Math.abs(m)<2)){var w=N(c,l,v,m,f,r,n),x=l-(w.top-h);ut(a,i,{x:c-(w.left-u),y:x,width:v,height:m,angle:f*d});var k=v/p,M=m/g;this.storage.cached={scaleX:k,scaleY:M,diffX:v-p,diffY:m-g,revX:r,revY:n};var _=b.scaleX,A=b.scaleY,E="translate(".concat(_," ").concat(A,") scale(").concat(k," ").concat(M,") translate(").concat(-_," ").concat(-A,")");if("g"===y.tagName.toLowerCase())y.childNodes.forEach(function(t){if(1===t.nodeType){var e=t.getAttribute("transform")||"";t.setAttribute("transform",e.replace(nt,E))}});else{var O=y.getAttribute("transform")||"";y.setAttribute("transform",O.replace(nt,E))}}}function st(t,e){var r=this.storage,n=r.snap,o=r.transform,a=r.wrapper,i=o.orig||"",s=X(e,n.x),c=X(t,n.y),l="translate(".concat(s," ").concat(c,")"),u=i.replace(/translate\(.+\)|^/,l);a.setAttribute("transform",l),this.el.setAttribute("transform",u)}function ct(t){var e=this.storage,r=e.refang,n=e.snap,o=e.center,a=e.box,i=e.handles,s=X(r+t,n.angle),c="rotate(".concat(s*ft," ").concat(o.left," ").concat(o.top,")");a.setAttribute("transform",c),Object.keys(i).forEach(function(t){i[t].setAttribute("transform",c)}),"g"===this.el.tagName.toLowerCase()?this.el.childNodes.forEach(function(t){1===t.nodeType&&t.setAttribute("transform",c)}):this.el.setAttribute("transform",c)}function lt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function ut(e,r,t){var n=t.x,o=t.y,a=t.width,i=t.height,s=t.angle,c=a/2,l=i/2,u="rotate(".concat(s*ft," ").concat(n+c," ").concat(o+l,")"),h={tl:[n,o],ml:[n,o+l],bl:[n,o+i],tc:[n+c,o],tr:[n+a,o],mr:[n+a,o+l],br:[n+a,o+i],bc:[n+c,o+i],rotator:[n+c,o-et+(i<0?i:0)]},f={x:n+=a<0?a:0,y:o+=i<0?i:0,width:Math.abs(a),height:Math.abs(i),transform:u};Object.keys(f).forEach(function(t){e.setAttribute(t,f[t])}),Object.keys(r).forEach(function(t){var e=r[t];e.setAttribute("cx",h[t][0]),e.setAttribute("cy",h[t][1]),e.setAttribute("transform",u)})}function pt(t){return t.match(rt).reduce(function(t,e,r,n){return r%2==0&&t.push(n.slice(r,r+2)),t},[])}function ht(t){return(ht="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function gt(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function bt(t,e){return!e||"object"!==ht(e)&&"function"!=typeof e?function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(t):e}function yt(t){return(yt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function vt(t,e){return(vt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}
/* @license
 * Move/Rotate/Resize tool
 * Released under the MIT license, 2018-2019
 * nichollascarter@gmail.com
*/var mt=function(){function e(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),bt(this,yt(e).call(this,t))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&vt(t,e)}(e,h),function(t,e,r){e&&gt(t.prototype,e),r&&gt(t,r)}(e,[{key:"drag",value:function(t){return function(e){if(this.length){var r=new c;return a.call(this,function(t){return t instanceof SVGElement?new ot(t,e,r):new B(t,e,r)})}}.call(this,t)}}]),e}();e.default=function(t){return new mt(t)}}]).default;
//# sourceMappingURL=subjx.js.map