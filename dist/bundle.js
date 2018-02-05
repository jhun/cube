!function(t){function e(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();n(1);var s=n(6),c=function(t){return t&&t.__esModule?t:{default:t}}(s),u=n(7),h=function(t){function e(){i(this,e);var t=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t._isAnimating=!1,t._isDragging=!1,t._isFrozen=!1,t._draggingMultiplier=.1,t.yaw=0,t.pitch=0,t.roll=0,t._handleMouseDown=t._handleMouseDown.bind(t),t._handleMouseMove=t._handleMouseMove.bind(t),t._handleMouseUp=t._handleMouseUp.bind(t),t._handleTouchStart=t._handleTouchStart.bind(t),t._handleTouchMove=t._handleTouchMove.bind(t),t._handleTouchEnd=t._handleTouchEnd.bind(t),t._processAnimation=t._processAnimation.bind(t),t._refresh=t._refresh.bind(t),t.deviceOrientationManager=new c.default(t),t}return r(e,t),o(e,[{key:"connectedCallback",value:function(){this._pivot=this.querySelector("vz-cubepivot"),this._addEventHandlers(),this._refresh(),void 0!==this.deviceOrientationManager&&this.deviceOrientationManager.init()}},{key:"disconnectedCallback",value:function(){"function"==typeof cancelAnimationFrame?cancelAnimationFrame(this._refreshId):clearTimeout(this._refreshId),this._removeEventHandlers(),void 0!==this.deviceOrientationManager&&this.deviceOrientationManager.deinit()}},{key:"animateTo",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"auto",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;if("auto"==i){var r=t>0?t-360:t+360;Math.abs(r-this.yaw)<Math.abs(t-this.yaw)&&(t=r)}else"right"==i?this.yaw>0&&(this.yaw=-180-(180-this.yaw)):"left"==i&&this.yaw<0&&(this.yaw=180-this.yaw+180);this._isAnimating=!0,this._animationStartPos={yaw:this.yaw,pitch:this.pitch},this._animationEndPos={yaw:parseFloat(t)||0,pitch:parseFloat(e)||0},this._animationStartTime=Date.now(),this._animationEndTime=Date.now()+n,this._animationEndCallback=a}},{key:"freeze",value:function(){this._isFrozen=!0,window.frozen=!0}},{key:"unfreeze",value:function(){this._isFrozen=!1,window.frozen=!1}},{key:"zoomIn",value:function(){this.setAttribute("zoom",!0)}},{key:"zoomOut",value:function(){this.removeAttribute("zoom")}},{key:"zoomTo",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1500;this.style.transition=e+"ms perspective ease-in-out",this.style.perspective=t+"vmax"}},{key:"fadeOut",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3,e=this;e.style.opacity=1,function n(){(e.style.opacity-=1e3/t/30)<0?e.style.display="none":requestAnimationFrame(n)}()}},{key:"fadeIn",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"block",n=this;n.style.display=e,n.style.opacity=0,function e(){var i=parseFloat(n.style.opacity);(i+=1e3/t/30)>1||(n.style.opacity=i,requestAnimationFrame(e))}()}},{key:"_easing",value:function(t){return t<.5?2*t*t:(4-2*t)*t-1}},{key:"_addEventHandlers",value:function(){this.addEventListener("mousedown",this._handleMouseDown),window.addEventListener("mousemove",this._handleMouseMove),window.addEventListener("mouseup",this._handleMouseUp),this.addEventListener("touchstart",this._handleTouchStart),this.addEventListener("touchmove",this._handleTouchMove),this.addEventListener("touchend",this._handleTouchEnd),this.addEventListener("touchcancel",this._handleTouchEnd)}},{key:"_removeEventHandlers",value:function(){this.removeEventListener("mousedown",this._handleMouseDown),window.removeEventListener("mousemove",this._handleMouseMove),window.removeEventListener("mouseup",this._handleMouseUp),this.removeEventListener("touchstart",this._handleTouchStart),this.removeEventListener("touchmove",this._handleTouchMove),this.removeEventListener("touchend",this._handleTouchEnd),this.removeEventListener("touchcancel",this._handleTouchEnd)}},{key:"_handleMouseDown",value:function(t){this._isDragging=!0,this._lastDragEvent=t}},{key:"_handleMouseMove",value:function(t){!this._isDragging||this._isAnimating||this._isFrozen||(this.yaw+=(this._lastDragEvent.pageX-t.pageX)*this._draggingMultiplier,this.pitch-=(0,u.constraint)((this._lastDragEvent.pageY-t.pageY)*this._draggingMultiplier,-70,70),this._lastDragEvent=t)}},{key:"_handleMouseUp",value:function(t){this._isDragging=!1}},{key:"_handleTouchStart",value:function(t){Math.abs(this.pitch)<69&&t.preventDefault(),this._isDragging=!0,this._lastDragEvent=t.touches[0]}},{key:"_handleTouchMove",value:function(t){Math.abs(this.pitch)<69&&t.preventDefault(),!this._isDragging||this._isAnimating||this._isFrozen||(this.yaw+=(this._lastDragEvent.pageX-t.touches[0].pageX)*this._draggingMultiplier,this.pitch-=(this._lastDragEvent.pageY-t.touches[0].pageY)*this._draggingMultiplier,this._lastDragEvent=t.touches[0])}},{key:"_handleTouchEnd",value:function(t){Math.abs(this.pitch)<69&&t.preventDefault(),this._isDragging=!1}},{key:"_processAnimation",value:function(){var t=this;if(this._isAnimating){var e=Date.now(),n=(0,u.map)(e,this._animationStartTime,this._animationEndTime,0,1);this.yaw=(0,u.map)(this._easing(n),0,1,this._animationStartPos.yaw,this._animationEndPos.yaw),this.pitch=(0,u.map)(this._easing(n),0,1,this._animationStartPos.pitch,this._animationEndPos.pitch),this._animationEndTime<=e&&(this._isAnimating=!1,this.yaw=this._animationEndPos.yaw,this.pitch=this._animationEndPos.pitch,"function"==typeof this._animationEndCallback&&requestAnimationFrame(function(e){return t._animationEndCallback.call(t)}))}}},{key:"_normalize",value:function(){this.pitch=(0,u.constraint)(this.pitch,-70,70),this.yaw>180&&(this.yaw-=360),this.yaw<-180&&(this.yaw+=360),this.roll<-180&&(this.roll+=360)}},{key:"_refresh",value:function(){this._processAnimation(),this._normalize();var t=getComputedStyle(this).perspective;this._pivot.style.transform="translateZ("+t+") rotateZ("+this.roll+"deg) rotateX("+this.pitch+"deg) rotateY("+this.yaw+"deg)",this._refreshId="function"==typeof requestAnimationFrame?requestAnimationFrame(this._refresh):setTimeout(this._refresh,1e3/30)}}]),e}(HTMLElement);customElements.define("vz-cube",h);var l=function(t){function e(){i(this,e);var t=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t._yaw=t.getAttribute("yaw"),t._pitch=t.getAttribute("pitch"),t._refresh=t._refresh.bind(t),t._refresh(),t}return r(e,t),o(e,[{key:"connectedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(t,e,n){switch(t){case"yaw":this._yaw=parseFloat(n)||0;break;case"pitch":this._pitch=parseFloat(n)||0}this._refresh()}},{key:"_refresh",value:function(){this.style.transform="rotateY("+this.yaw+"deg) rotateX("+this.pitch+"deg) translateZ(calc(-50vmax + 2rem))"}},{key:"yaw",get:function(){return this._yaw}},{key:"pitch",get:function(){return this._pitch}}]),e}(HTMLElement);customElements.define("vz-cube-feature",l)},function(t,e,n){var i=n(2);"string"==typeof i&&(i=[[t.i,i,""]]);var a={};a.transform=void 0;n(4)(i,a);i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(3)(void 0),e.push([t.i,"vz-cube,vz-cubeface,vz-cubepivot{display:block}vz-cube{width:100vmax;height:100vmax;overflow:hidden;perspective:40vmax;transition:perspective .5s ease-in-out}vz-cube[zoom]{transition:perspective .5s ease-in-out!important;perspective:60vmax!important}vz-cubepivot{position:relative;width:100%;height:100%;transform-style:preserve-3d}vz-cubeface{position:absolute;left:0;top:0;width:100%;height:100%;background-size:100% 100%;background-repeat:no-repeat;backface-visibility:hidden}vz-cubeface[data-face=front]{transform:rotateY(90deg) translateX(calc(50% - 1px)) rotateY(-90deg)}vz-cubeface[data-face=left]{transform:translateX(calc(-50% + 1px)) rotateY(90deg)}vz-cubeface[data-face=right]{transform:translateX(calc(50% - 1px)) rotateY(-90deg)}vz-cubeface[data-face=top]{transform:translateY(calc(-50% + 1px)) rotateX(-90deg)}vz-cubeface[data-face=bottom]{transform:translateY(calc(50% - 1px)) rotateX(90deg)}vz-cubeface[data-face=back]{transform:rotateY(90deg) translateX(calc(-50% + 1px)) rotateY(90deg)}vz-cube-feature{width:2rem;height:2rem;margin-top:-1rem;margin-left:-1rem;position:absolute;top:50%;left:50%;background:#fff;border-radius:50%;opacity:.666;transform:translateZ(calc(-50vmax + 1px));cursor:pointer}",""])},function(t,e){function n(t,e){var n=t[1]||"",a=t[3];if(!a)return n;if(e&&"function"==typeof btoa){var r=i(a);return[n].concat(a.sources.map(function(t){return"/*# sourceURL="+a.sourceRoot+t+" */"})).concat([r]).join("\n")}return[n].join("\n")}function i(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var i=n(e,t);return e[2]?"@media "+e[2]+"{"+i+"}":i}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},a=0;a<this.length;a++){var r=this[a][0];"number"==typeof r&&(i[r]=!0)}for(a=0;a<t.length;a++){var o=t[a];"number"==typeof o[0]&&i[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),e.push(o))}},e}},function(t,e,n){function i(t,e){for(var n=0;n<t.length;n++){var i=t[n],a=v[i.id];if(a){a.refs++;for(var r=0;r<a.parts.length;r++)a.parts[r](i.parts[r]);for(;r<i.parts.length;r++)a.parts.push(h(i.parts[r],e))}else{for(var o=[],r=0;r<i.parts.length;r++)o.push(h(i.parts[r],e));v[i.id]={id:i.id,refs:1,parts:o}}}}function a(t,e){for(var n=[],i={},a=0;a<t.length;a++){var r=t[a],o=e.base?r[0]+e.base:r[0],s=r[1],c=r[2],u=r[3],h={css:s,media:c,sourceMap:u};i[o]?i[o].parts.push(h):n.push(i[o]={id:o,parts:[h]})}return n}function r(t,e){var n=m(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=_[_.length-1];if("top"===t.insertAt)i?i.nextSibling?n.insertBefore(e,i.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),_.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function o(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=_.indexOf(t);e>=0&&_.splice(e,1)}function s(t){var e=document.createElement("style");return t.attrs.type="text/css",u(e,t.attrs),r(t,e),e}function c(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",u(e,t.attrs),r(t,e),e}function u(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function h(t,e){var n,i,a,r;if(e.transform&&t.css){if(!(r=e.transform(t.css)))return function(){};t.css=r}if(e.singleton){var u=g++;n=y||(y=s(e)),i=l.bind(null,n,u,!1),a=l.bind(null,n,u,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(e),i=d.bind(null,n,e),a=function(){o(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),i=f.bind(null,n),a=function(){o(n)});return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else a()}}function l(t,e,n,i){var a=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=w(e,a);else{var r=document.createTextNode(a),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(r,o[e]):t.appendChild(r)}}function f(t,e){var n=e.css,i=e.media;if(i&&t.setAttribute("media",i),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function d(t,e,n){var i=n.css,a=n.sourceMap,r=void 0===e.convertToAbsoluteUrls&&a;(e.convertToAbsoluteUrls||r)&&(i=b(i)),a&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */");var o=new Blob([i],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(o),s&&URL.revokeObjectURL(s)}var v={},p=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),m=function(t){var e={};return function(n){return void 0===e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),y=null,g=0,_=[],b=n(5);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=p()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=a(t,e);return i(n,e),function(t){for(var r=[],o=0;o<n.length;o++){var s=n[o],c=v[s.id];c.refs--,r.push(c)}if(t){i(a(t,e),e)}for(var o=0;o<r.length;o++){var c=r[o];if(0===c.refs){for(var u=0;u<c.parts.length;u++)c.parts[u]();delete v[c.id]}}}};var w=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,i=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var a=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(a))return t;var r;return r=0===a.indexOf("//")?a:0===a.indexOf("/")?n+a:i+a.replace(/^\.\//,""),"url("+JSON.stringify(r)+")"})}},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=function(){function t(e){i(this,t),this.cube=e,this.orientation=window.orientation||0,this._handleDeviceOrientation=this._handleDeviceOrientation.bind(this),this._handleDeviceOrientation=this._handleDeviceOrientation.bind(this)}return a(t,[{key:"init",value:function(){window.addEventListener("deviceorientation",this._handleDeviceOrientation)}},{key:"deinit",value:function(){window.removeEventListener("deviceorientation",this._handleDeviceOrientation)}},{key:"_handleDeviceOrientation",value:function(t){var e=this._getOrientation(t),n=this._previousOrientation;if(void 0!==n){var i=e.x-n.x,a=e.y-n.y;Math.abs(a)>90&&(i=0,a=0),this.cube.yaw+=i,this.cube.pitch+=a}this._previousOrientation=e}},{key:"_getOrientation",value:function(t){var e=t.alpha,n=t.beta,i=t.gamma;if(!window.frozen&&1){var a=window.orientation||0,r={x:-(e+i),y:n};switch(a){case 90:r={x:90-(e+n),y:-i};break;case-90:r={x:90-(e+n),y:i}}return r}}}]),t}();e.default=r},function(t,e,n){"use strict";function i(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return(t-e)/(n-e)*((arguments.length>4&&void 0!==arguments[4]?arguments[4]:1)-i)+i}function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return Math.min(Math.max(t,e),n)}Object.defineProperty(e,"__esModule",{value:!0}),e.map=i,e.constraint=a}]);