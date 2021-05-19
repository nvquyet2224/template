(()=>{"use strict";function t(t,n){var i;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=function(t,n){if(t){if("string"==typeof t)return e(t,n);var i=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(i="Object"===i&&t.constructor?t.constructor.name:i)||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){i&&(t=i);var a=0;return{s:n=function(){},n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o=!0,s=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return o=t.done,t},e:function(t){s=!0,r=t},f:function(){try{o||null==i.return||i.return()}finally{if(s)throw r}}}}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}var n=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.threshold=t,this.isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}var n;return(n=[{key:"getIEVersion",value:function(){var t=window.navigator.userAgent,e=t.indexOf("MSIE");return 0<e?parseInt(t.substring(e+5,t.indexOf(".",e))):navigator.userAgent.match(/Trident\/7\./)?11:0}},{key:"checkVisible",value:function(t){var e=t.getBoundingClientRect();return t=Math.max(document.documentElement.clientHeight,window.innerHeight),!(e.bottom-90<0||0<=e.top-(t-80))}},{key:"animation",value:function(){var e,n=t(document.querySelectorAll(".ani__item"));try{for(n.s();!(e=n.n()).done;){var i=e.value;this.checkVisible(i)?i.classList.add("fs-ani"):i.classList.remove("fs-ani")}}catch(e){n.e(e)}finally{n.f()}}},{key:"lazyLoad",value:function(){var e,n=1100<window.innerWidth?".cm-pic.fs-lazy, .pc-pic.fs-lazy":".cm-pic.fs-lazy, .sp-pic.fs-lazy",i=t(document.querySelectorAll(n));try{for(i.s();!(e=i.n()).done;){var a=e.value;a.getBoundingClientRect().top<=window.innerHeight+this.threshold&&(a.setAttribute("src",a.getAttribute("data-src")),a.classList.remove("fs-lazy"))}}catch(e){i.e(e)}finally{i.f()}n=1100<window.innerWidth?".cm-bg.fs-lazy, .pc-bg.fs-lazy":".cm-bg.fs-lazy, .sp-bg.fs-lazy";var r,o=t(document.querySelectorAll(n));try{for(o.s();!(r=o.n()).done;){var s=r.value;s.getBoundingClientRect().top<=window.innerHeight+this.threshold&&(s.style.backgroundImage="url("+s.getAttribute("data-src")+")",s.classList.remove("fs-lazy"))}}catch(e){o.e(e)}finally{o.f()}}},{key:"openPopup",value:function(){document.body.classList.add("open__popup")}},{key:"closePopup",value:function(){document.body.classList.remove("open__popup")}},{key:"toggleMenu",value:function(){document.body.classList.contains("open__menu")?document.body.classList.remove("open__menu"):document.body.classList.add("open__menu")}},{key:"onScroll",value:function(){var t=this;setTimeout((function(){t.lazyLoad(),t.animation()}),0)}},{key:"onResize",value:function(){this.isMobile||(this.lazyLoad(),this.animation())}},{key:"onRotate",value:function(){}},{key:"init",value:function(){var e=this;0<this.getIEVersion()&&document.body.classList.add("isIE"),null!==document.querySelector(".nav__but")&&document.querySelector(".nav__but").addEventListener("click",(function(){return e.toggleMenu()}));var n,i=t(document.querySelectorAll(".popup__open"));try{for(i.s();!(n=i.n()).done;)n.value.addEventListener("click",(function(){return e.openPopup()}))}catch(e){i.e(e)}finally{i.f()}var a,r,o=t(document.querySelectorAll(".popup__close"));try{for(o.s();!(a=o.n()).done;)a.value.addEventListener("click",(function(){return e.closePopup()}))}catch(e){o.e(e)}finally{o.f()}null!==document.querySelector(".fs-navigation")&&(r=document.body.getAttribute("data-page"),document.querySelector(".fs-navigation li[data-nav="+r).classList.add("active")),window.addEventListener("scroll",(function(){return e.onScroll()})),window.addEventListener("orientationchange",(function(){return e.onRotate()})),window.addEventListener("resize",(function(){return e.onResize()})),this.onScroll()}}])&&function(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}(e.prototype,n),e}(),i=function(){return(i=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var a in e=arguments[n])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)},a=(r.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal||this.endVal;this.countDown=this.startVal>t;var e=t-this.startVal;Math.abs(e)>this.options.smartEasingThreshold?(this.finalEndVal=t,e=this.countDown?1:-1,this.endVal=t+e*this.options.smartEasingAmount,this.duration=this.duration/2):(this.endVal=t,this.finalEndVal=null),this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},r.prototype.start=function(t){this.error||(this.callback=t,0<this.duration?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},r.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},r.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},r.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal||this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},r.prototype.printValue=function(t){t=this.formattingFn(t),"INPUT"===this.el.tagName?this.el.value=t:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=t:this.el.innerHTML=t},r.prototype.ensureNumber=function(t){return"number"==typeof t&&!isNaN(t)},r.prototype.validateValue=function(t){var e=Number(t);return this.ensureNumber(e)?e:(this.error="[CountUp] invalid start or end value: "+t,null)},r.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},r);function r(t,e,n){var a=this;this.target=t,this.endVal=e,this.options=n,this.version="2.0.7",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:""},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.count=function(t){a.startTime||(a.startTime=t),t-=a.startTime,a.remaining=a.duration-t,a.useEasing?a.countDown?a.frameVal=a.startVal-a.easingFn(t,0,a.startVal-a.endVal,a.duration):a.frameVal=a.easingFn(t,a.startVal,a.endVal-a.startVal,a.duration):a.countDown?a.frameVal=a.startVal-(a.startVal-a.endVal)*(t/a.duration):a.frameVal=a.startVal+(a.endVal-a.startVal)*(t/a.duration),a.countDown?a.frameVal=a.frameVal<a.endVal?a.endVal:a.frameVal:a.frameVal=a.frameVal>a.endVal?a.endVal:a.frameVal,a.frameVal=Number(a.frameVal.toFixed(a.options.decimalPlaces)),a.printValue(a.frameVal),t<a.duration?a.rAF=requestAnimationFrame(a.count):null!==a.finalEndVal?a.update(a.finalEndVal):a.callback&&a.callback()},this.formatNumber=function(t){var e=t<0?"-":"",n=(t=Math.abs(t).toFixed(a.options.decimalPlaces),(t=(t+="").split("."))[0]);if(t=1<t.length?a.options.decimal+t[1]:"",a.options.useGrouping){for(var i="",r=0,o=n.length;r<o;++r)0!==r&&r%3==0&&(i=a.options.separator+i),i=n[o-r-1]+i;n=i}return a.options.numerals&&a.options.numerals.length&&(n=n.replace(/[0-9]/g,(function(t){return a.options.numerals[+t]})),t=t.replace(/[0-9]/g,(function(t){return a.options.numerals[+t]}))),e+a.options.prefix+n+t+a.options.suffix},this.easeOutExpo=function(t,e,n,i){return n*(1-Math.pow(2,-10*t/i))*1024/1023+e},this.options=i(i({},this.defaults),n),this.formattingFn=this.options.formattingFn||this.formatNumber,this.easingFn=this.options.easingFn||this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(e),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof t?document.getElementById(t):t,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined"}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}var s,l=new n,u=!0;l.init(),null!==document.querySelector("#numberCount")&&(n=document.querySelector("#numberCount").getAttribute("data-count"),s=new a("numberCount",n,{separator:"."})),window.addEventListener("scroll",(function(){var t,e=function(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(n="Object"===n&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0;return{s:e=function(){},n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return r=t.done,t},e:function(t){s=!0,a=t},f:function(){try{r||null==n.return||n.return()}finally{if(s)throw a}}}}(document.querySelectorAll("#numberCount"));try{for(e.s();!(t=e.n()).done;){var n=t.value;l.checkVisible(n)?u&&(s.start(),u=!1):u||(s.reset(),u=!0)}}catch(t){e.e(t)}finally{e.f()}}))})();