(this.webpackJsonptrain_memory=this.webpackJsonptrain_memory||[]).push([[0],[,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),s=n(5),a=n.n(s),i=(n(10),n(4)),u=n(2),o=(n(11),n(12),n(0)),l=r.a.createContext();function d(){return Object(c.useContext)(l).changePage}function b(){return Object(c.useContext)(l).page}function j(){return Object(c.useContext)(l).targetElements}function f(){return Object(c.useContext)(l).assistant}function v(e){var t=e.children,n=e.page,c=e.setPage,r=e.targetElements,s=e.assistant;return Object(o.jsx)(l.Provider,{value:{page:n,changePage:function(e){c(e)},targetElements:r,assistant:s},children:t})}function O(e,t,n,c){if(t)if(2===t)h(e,n,c,3);else{var r=t*t-1;n((function(n){return n>r+1?n-1:n===r+1?c[r]?r:k(n,c,r+1,-1):n-t>=e?c[n-t]?n-t:p(n,c,r+1,-2):n}))}else n((function(t){return t>e?t-1:t}))}function m(e,t,n,c){if(t)if(2===t)x(e,n,c,3);else{var r=t*t-1,s=r-t;n((function(n){return n>r&&n<e?n+1:n>s&&n<=r?r+1:n+t<=e?c[n+t]?n+t:p(n,c,r+1,2):n}))}else n((function(t){return t<e?t+1:t}))}function h(e,t,n,c){t(c?function(t){return t>e?n[t-1]?t-1:k(t,n,c,-1):t}:function(t){return t>e?t-1:t})}function x(e,t,n,c){t(c?function(t){return t<e?n[t+1]?t+1:k(t,n,c,1):t}:function(t){return t<e?t+1:t})}function p(e,t,n,c){if(1===c){for(var r=e+1;r<=n;r++)if(t[r])return r}else{if(-1!==c){if(2===c){for(var s=Math.sqrt(n),a=e+s;a<n;a+=s)if(t[a])return a;return n}for(var i=Math.sqrt(n),u=e-i;u>=0;u-=i)if(t[u])return u;return e}for(var o=e-1;o>=0;o--)if(t[o])return o}return-1}function k(e,t,n,c){var r=p(e,t,n,c);return-1!==r?r:3===n?e:r=p(e,t,n,-c)}function N(e,t,n,c){return function(r){switch(r.keyCode){case 19:O(0,2===t?2:t,n,c);break;case 20:m(e-1,2===t?2:t,n,c);break;case 22:x(e-1,n,c,2===t?3:t*t);break;case 21:h(0,n,c,2===t?3:t*t)}}}function g(e,t,n){-1!==e&&(0===n||e>=n*n?t.current[e].current.focus():t.current[e].current.querySelector(".picture-btn").focus())}function w(){return function(e){23===e.keyCode&&document.activeElement.click()}}function E(){var e=d(),t=Object(c.useRef)([Object(c.useRef)(),Object(c.useRef)(),Object(c.useRef)(),Object(c.useRef)()]);j().current=t.current;var n=Object(c.useState)(-1),r=Object(u.a)(n,2),s=r[0],a=N(4,0,r[1],Object(c.useRef)(Array(4).fill(!0)).current),i=f();function l(t){var n=0,c=0;switch(t){case"easy":n=9,c=3;break;case"middle":n=16,c=4;break;case"hard":n=25,c=4;break;case"help":return function(){i.current.sendData({action:{action_id:t}}),e({value:3})}}return function(){i.current.sendData({action:{action_id:t}}),function(t,n){var c=window.outerHeight,r=window.outerWidth;e(c<=800||r<=800?{value:1,level:t-n}:{value:1,level:t})}(n,c)}}return Object(c.useEffect)((function(){var e=w();return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[]),Object(c.useEffect)((function(){return document.addEventListener("keydown",a),function(){document.removeEventListener("keydown",a)}}),[]),Object(c.useEffect)((function(){g(s,t,0)}),[s]),Object(o.jsx)("div",{className:"menu-container",children:Object(o.jsxs)("div",{className:"menu-options",children:[Object(o.jsxs)("button",{ref:t.current[0],tabIndex:1,className:"btn btn-level",onClick:l("easy"),children:["\u041b\u0435\u0433\u043a\u0438\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c",Object(o.jsxs)("div",{className:"indicator",children:[Object(o.jsx)("div",{className:"sparkle-icon",children:"\u2605"}),Object(o.jsx)("div",{className:"indicator-icon",children:"\u2605"}),Object(o.jsx)("div",{className:"indicator-icon",children:"\u2605"}),Object(o.jsx)("div",{className:"indicator-icon",children:"\u2605"}),Object(o.jsx)("div",{className:"indicator-icon",children:"\u2605"})]})]}),Object(o.jsxs)("button",{ref:t.current[1],tabIndex:2,className:"btn btn-level",onClick:l("middle"),children:["\u0421\u0440\u0435\u0434\u043d\u0438\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c",Object(o.jsxs)("div",{className:"indicator",children:[Object(o.jsx)("div",{className:"sparkle-icon",children:"\u2605"}),Object(o.jsx)("div",{className:"sparkle-icon",children:"\u2605"}),Object(o.jsx)("div",{className:"sparkle-icon",children:"\u2605"}),Object(o.jsx)("div",{className:"indicator-icon",children:"\u2605"}),Object(o.jsx)("div",{className:"indicator-icon",children:"\u2605"})]})]}),Object(o.jsxs)("button",{ref:t.current[2],tabIndex:3,className:"btn btn-level",onClick:l("hard"),children:["\u0421\u043b\u043e\u0436\u043d\u044b\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c",Object(o.jsxs)("div",{className:"indicator",children:[Object(o.jsx)("div",{className:"sparkle-icon",children:"\u2605"}),Object(o.jsx)("div",{className:"sparkle-icon",children:"\u2605"}),Object(o.jsx)("div",{className:"sparkle-icon",children:"\u2605"}),Object(o.jsx)("div",{className:"sparkle-icon",children:"\u2605"}),Object(o.jsx)("div",{className:"sparkle-icon",children:"\u2605"})]})]}),Object(o.jsx)("button",{ref:t.current[3],tabIndex:4,className:"btn btn-option btn-help",onClick:l("help"),children:"\u041f\u043e\u043c\u043e\u0449\u044c"})]})})}n(14),n(15),n(16);var y=Object(c.createContext)();function _(){return Object(c.useContext)(y).result}function R(e){var t=e.children,n=e.pictures,c=e.answers,r=e.result,s=e.setVision,a=e.vision,i=e.wrapVision,u=e.disableBtn,l=e.setDisableBtn,d=e.buttonsRefs,b=e.deleteWrapTimeout;return Object(o.jsx)(y.Provider,{value:{pictures:n,answers:c,result:r,setVision:s,vision:a,wrapVision:i,disableBtn:u,setDisableBtn:l,buttonsRefs:d,deleteWrapTimeout:b},children:t})}function C(e){var t=e.reference,n=e.isCorrect,r=e.count,s=e.index,a=Object(c.useState)(!1),i=Object(u.a)(a,2),l=i[0],d=i[1],j=Object(c.useState)(!1),f=Object(u.a)(j,2),v=f[0],O=f[1],m=Object(c.useState)("active"),h=Object(u.a)(m,2),x=h[0],p=h[1],k=b().level,N=Object(c.useContext)(y).setVision,g=Object(c.useContext)(y).vision,w=Object(c.useContext)(y).disableBtn,E=Object(c.useContext)(y).setDisableBtn,R=_(),C=Object(c.useContext)(y).buttonsRefs;return Object(c.useEffect)((function(){l&&(++r.current,r.current===k&&N("ready"))}),[l]),Object(c.useEffect)((function(){!0===v&&"invisible-img"===g&&N("error")}),[v]),Object(c.useEffect)((function(){"chosen"===x&&("enable"!==w&&E("enable"),"wrong"===n?R.current--:R.current++)}),[x]),Object(o.jsx)("div",{className:"card card-level_"+k,children:Object(o.jsxs)("div",{ref:C.current[s-1]=Object(c.useRef)(),className:"card-inner inner-level_"+k,children:["btn"!==g&&Object(o.jsx)("div",{className:"cover "+g}),"btn"===g&&Object(o.jsx)("button",{disabled:"chosen"===x,onClick:function(){p("chosen")},className:"picture-btn "+x+" "+n,children:s}),Object(o.jsx)("img",{onLoad:function(){return d(!0)},onError:function(){O(!0)},src:t,alt:"Game element",className:"img"})]})})}function L(){var e=Object(c.useRef)([]),t=Object(c.useRef)(0),n=b().level,r=Object(c.useContext)(y).pictures,s=Object(c.useContext)(y).answers;return Object(o.jsx)("div",{className:"grid",children:function(){if(0===e.current.length)for(var c=0;c<n;c++)e.current.push(Object(o.jsx)(C,{count:t,index:c+1,isCorrect:s[c],reference:"https://pictures-for-memory-game.s3.eu-north-1.amazonaws.com/".concat(r[c],".jpg")},c));return e.current}()})}function S(e,t){return e+Math.floor((t-e)*Math.random())}function D(e){for(var t=new Array(e).fill(0),n=new Array(e).fill("wrong"),c=S(1,26),r=function(e){return e<=9?S(3,6):e<=16?S(4,7):S(6,9)}(e),s=e-r;r>0;){var a=S(0,e);0===t[a]&&(t[a]=c,n[a]="right",r--)}for(var i=0;i<e;)if(0===t[i]){var u=S(1,26);t.includes(u)||(t[i]=u,i++)}else i++;return[t,n,s]}n(17);function T(){var e=Object(c.useState)(3),t=Object(u.a)(e,2),n=t[0],r=t[1],s=Object(c.useContext)(y).wrapVision,a=Object(c.useContext)(y).deleteWrapTimeout;return Object(c.useEffect)((function(){"covered"===s&&(a.current=setInterval((function(){r((function(e){return 1===e?(clearInterval(a.current),3):e-1}))}),1e3))}),[s]),Object(o.jsx)("div",{className:"wrap "+s,children:Object(o.jsx)("div",{className:"wrap-content",children:n})})}n(18);function B(){var e=_();return Object(o.jsx)("div",{className:"result-container",children:Object(o.jsx)("div",{className:"results-box",children:Object(o.jsxs)("div",{className:"current-result",children:["\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442: ",Object(o.jsxs)("span",{children:[e.current,"%"]})]})})})}function I(e){var t=Object(c.useState)("invisible-img"),n=Object(u.a)(t,2),r=n[0],s=n[1],a=Object(c.useState)("none"),i=Object(u.a)(a,2),l=i[0],v=i[1],O=Object(c.useState)("disabled-ready"),m=Object(u.a)(O,2),h=m[0],x=m[1],p=Object(c.useState)("not-result"),k=Object(u.a)(p,2),E=k[0],y=k[1],_=Object(c.useRef)({}),C=Object(c.useRef)({}),S=Object(c.useRef)([]),I=Object(c.useRef)([Object(c.useRef)(),Object(c.useRef)(),Object(c.useRef)()]),M=Object(c.useRef)([Object(c.useRef)(),Object(c.useRef)()]),V=Object(c.useRef)([]),q=Object(c.useState)(-1),A=Object(u.a)(q,2),P=A[0],W=A[1],z=Object(c.useState)(0),H=Object(u.a)(z,2),J=H[0],G=H[1],F=b().level,K=Object(c.useRef)(D(F)),Q=Object(c.useRef)(K.current[2]),U=Object(c.useRef)(Array(F+3).fill(!0)),X=d();j().current=[].concat(S.current,I.current,M.current);var Y=f();function Z(){Y.current.sendData({action:{action_id:"menu"}}),s("cleanup")}function $(){Y.current.sendData({action:{action_id:"menu"}}),X(0)}function ee(){clearTimeout(_.current),clearInterval(C.current),Y.current.sendData({action:{action_id:"restart"}}),X({value:2,level:F})}function te(){Q.current=Math.floor(100*Q.current/F),Y.current.sendData({action:{action_id:"ready",payload:Q.current}}),y("is-result"),s("vision")}return Object(c.useEffect)((function(){var e=w();return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[]),Object(c.useEffect)((function(){"ready"===r?v("covered"):"visible"===r?_.current=setTimeout((function(){v("covered")}),2e3):"cleanup"===r&&(clearTimeout(_.current),clearInterval(C.current),X({value:0}))}),[r]),Object(c.useEffect)((function(){"covered"===l&&(_.current="ready"===r?setTimeout((function(){v("none"),s("visible")}),3e3):setTimeout((function(){v("none"),s("btn"),G(1),Y.current.sendData({action:{action_id:"can_chose_card"}})}),3e3))}),[l]),Object(c.useEffect)((function(){"is-result"===E&&G(3)}),[E]),Object(c.useEffect)((function(){"enable"===h&&G(2)}),[h]),Object(c.useEffect)((function(){var e=null;switch(J){case 0:V.current=I.current.slice(0,2),e=N(2,0,W,U.current),document.addEventListener("keydown",e);break;case 1:V.current=[].concat(S.current,I.current.slice(0,2)),W((function(e){return-1===e?-1:e+F})),e=N(F+2,Math.sqrt(F),W,U.current),document.addEventListener("keydown",e);break;case 2:V.current=[].concat(S.current,I.current),e=N(F+3,Math.sqrt(F),W,U.current),document.addEventListener("keydown",e);break;case 3:V.current=M.current,W(-1),e=N(2,0,W,U.current),document.addEventListener("keydown",e)}return function(){document.removeEventListener("keydown",e)}}),[J]),Object(c.useEffect)((function(){switch(J){case 0:g(P,V,0);break;case 1:case 2:g(P,V,Math.sqrt(F));break;case 3:g(P,V,0)}var e=function(e,t,n){return function(){t&&e<t&&(n[e]=!1)}}(P,F,U.current);return document.addEventListener("click",e),function(){document.removeEventListener("click",e)}}),[P]),Object(o.jsxs)(R,{pictures:K.current[0],answers:K.current[1],result:Q,setVision:s,vision:r,wrapVision:l,disableBtn:h,setDisableBtn:x,buttonsRefs:S,deleteWrapTimeout:C,children:[Object(o.jsx)(T,{}),Object(o.jsxs)("div",{className:"game-container "+E,children:["is-result"===E&&Object(o.jsx)(B,{className:"result"}),Object(o.jsxs)("div",{className:"game-inner",children:[Object(o.jsx)(L,{}),"error"===r&&Object(o.jsx)("div",{className:"error-wrapper",children:Object(o.jsx)("div",{className:"error-content",children:"\u0423\u043f\u0441... \u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u043a \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442\u0443"})}),"invisible-img"===r&&Object(o.jsx)("div",{className:"loader",children:Object(o.jsxs)("div",{className:"spinner",children:[Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{})]})}),"not-result"===E?Object(o.jsxs)("div",{className:"btn-container",children:[Object(o.jsx)("button",{ref:I.current[0],className:"game-btn enabled",onClick:Z,children:"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0443\u0440\u043e\u0432\u0435\u043d\u044c"}),Object(o.jsx)("button",{ref:I.current[1],className:"game-btn enabled",onClick:ee,children:"\u041d\u0430\u0447\u0430\u0442\u044c \u0437\u0430\u043d\u043e\u0432\u043e"}),Object(o.jsx)("button",{ref:I.current[2],className:"game-btn "+("enable"!==h?"disabled":"enabled"),onClick:te,disabled:"enable"!==h,children:"\u0413\u043e\u0442\u043e\u0432\u043e"})]}):Object(o.jsxs)("div",{className:"result-btn-container",children:[Object(o.jsx)("button",{ref:M.current[0],className:"game-btn enabled",onClick:ee,children:"\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u044c \u043f\u043e\u043f\u044b\u0442\u043a\u0443"}),Object(o.jsx)("button",{ref:M.current[1],className:"game-btn enabled",onClick:$,children:"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0443\u0440\u043e\u0432\u0435\u043d\u044c"})]})]})]})]})}n(19);function M(){var e=Object(c.useState)(0),t=Object(u.a)(e,2),n=t[0],r=t[1],s=Object(c.useState)(),a=Object(u.a)(s,2),i=a[0],l=a[1];var b=Object(c.useState)("invisible"),v=Object(u.a)(b,2),O=v[0],m=v[1],h=Object(c.useState)(["disabled","enabled"]),x=Object(u.a)(h,2),p=x[0],k=x[1],E=Object(c.useRef)([Object(c.useRef)(),Object(c.useRef)(),Object(c.useRef)()]);j().current=E.current;var y=Object(c.useRef)(Array(3).fill(!0)),_=Object(c.useState)(-1),R=Object(u.a)(_,2),C=R[0],L=R[1],S=f();function D(e){switch(e){case"menu":return function(){S.current.sendData({action:{action_id:e}}),T({value:0})};case"back":return function(){S.current.sendData({action:{action_id:e,payload:n-1}}),r((function(e){return e-1}))};case"next":return function(){S.current.sendData({action:{action_id:e,payload:n+1}}),r((function(e){return e+1}))}}}Object(c.useEffect)((function(){var e=w();return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[]),Object(c.useEffect)((function(){g(C,E,0)}),[C]);var T=d();return Object(c.useEffect)((function(){var e=null;switch(n){case 0:k(["disabled","enabled"]),y.current=[!0,!1,!0],e=N(3,2,L,y.current),document.addEventListener("keydown",e);break;case 1:k(["enabled","enabled"]),y.current=[!0,!0,!0],e=N(3,2,L,y.current),document.addEventListener("keydown",e);break;case 5:k(["enabled","disabled"]),y.current=[!0,!0,!1],e=N(3,2,L,y.current),document.addEventListener("keydown",e)}return l("https://memory-game-help.s3.eu-north-1.amazonaws.com/".concat(n+1,".jpeg")),function(){document.removeEventListener("keydown",e)}}),[n]),Object(o.jsxs)("div",{className:"help_container",children:[Object(o.jsxs)("div",{className:"help_img_wrapper",children:["invisible"===O&&Object(o.jsxs)("div",{className:"spinner",children:[Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{})]}),Object(o.jsx)("img",{className:"help_img "+O,src:i,alt:"Help_img",onLoad:function(){return m("visible")}})]}),Object(o.jsxs)("div",{className:"btn-container",children:[Object(o.jsx)("button",{ref:E.current[0],className:"game-btn enabled",onClick:D("menu"),children:"\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043a \u043c\u0435\u043d\u044e"}),Object(o.jsx)("button",{ref:E.current[1],disabled:"disabled"===p[0],className:"game-btn "+p[0],onClick:D("back"),children:"\u041f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0430\u044f"}),Object(o.jsx)("button",{ref:E.current[2],disabled:"disabled"===p[1],className:"game-btn "+p[1],onClick:D("next"),children:"\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0430\u044f"})]})]})}var V=n(22);function q(e,t){return{environment:e,value:t}}var A=function(e,t){switch(t.type){case"easy_level":return q("menu",0);case"middle_level":return q("menu",1);case"hard_level":return q("menu",2);case"help":return q("menu",3);case"help_menu":return q("help",0);case"help_back":return q("help",1);case"help_next":return q("help",2);case"ready":return q("game",-3);case"game_restart":return q("game",-4);case"game_menu":return q("game",-5);case"result_menu":return q("result",-1);case"result_restart":return q("result",-2);case"card":return q("card",t.number);default:throw new Error}};var P=function(){var e=Object(c.useState)({value:0}),t=Object(u.a)(e,2),n=t[0],r=t[1],s=Object(c.useRef)([]),a=Object(c.useReducer)(A,{environment:"initial"}),l=Object(u.a)(a,2),d=l[0],b=l[1],j=Object(c.useRef)(),f=Object(c.useRef)();return Object(c.useEffect)((function(){var e;f.current=(e=function(){return j.current},Object(V.a)({getState:e})),f.current.on("data",(function(e){var t=e.action;t&&b(t)}))}),[]),Object(c.useEffect)((function(){if("initial"!==d.environment)if(d.value<0){var e=s.current.length+d.value;s.current[e].current.click(),-3===d.value&&s.current[e].current.disabled&&f.current.sendData({action:{action_id:"ready_disabled"}})}else if("card"===d.environment){var t=s.current.length;d.value>t-5?f.current.sendData({action:{action_id:"not_card"}}):(s.current[d.value-1].current.querySelector(".picture-btn").click(),f.current.sendData({action:{action_id:"is_card"}}))}else if(s.current[d.value].current.disabled){var n="";n=1===d.value?"help_first":"help_last",f.current.sendData({action:{action_id:n}})}else s.current[d.value].current.click()}),[d]),Object(o.jsx)(v,{page:n,setPage:r,targetElements:s,assistant:f,children:Object(o.jsx)("div",{className:"App",children:function(){switch(n.value){case 1:return Object(o.jsx)(I,{});case 2:return setTimeout((function(){return r(Object(i.a)(Object(i.a)({},n),{},{value:1}))}),0),Object(o.jsx)("div",{});case 3:return Object(o.jsx)(M,{});default:return Object(o.jsx)(E,{})}}()})})};a.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(P,{})}),document.getElementById("root"))}],[[20,1,2]]]);
//# sourceMappingURL=main.6472eb92.chunk.js.map