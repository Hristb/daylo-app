const Jc=()=>{};var yo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Va=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Xc=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],l=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Pa={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,h=s+2<n.length,d=h?n[s+2]:0,m=o>>2,I=(o&3)<<4|l>>4;let w=(l&15)<<2|d>>6,V=d&63;h||(V=64,a||(w=64)),r.push(e[m],e[I],e[w],e[V])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Va(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Xc(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],l=s<n.length?e[n.charAt(s)]:0;++s;const d=s<n.length?e[n.charAt(s)]:64;++s;const I=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||l==null||d==null||I==null)throw new Zc;const w=o<<2|l>>4;if(r.push(w),d!==64){const V=l<<4&240|d>>2;if(r.push(V),I!==64){const N=d<<6&192|I;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Zc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const tl=function(n){const t=Va(n);return Pa.encodeByteArray(t,!0)},ir=function(n){return tl(n).replace(/\./g,"")},el=function(n){try{return Pa.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rl=()=>nl().__FIREBASE_DEFAULTS__,sl=()=>{if(typeof process>"u"||typeof yo>"u")return;const n=yo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},il=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&el(n[1]);return t&&JSON.parse(t)},Ms=()=>{try{return Jc()||rl()||sl()||il()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ol=n=>{var t,e;return(e=(t=Ms())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},al=n=>{const t=ol(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},ba=()=>{var n;return(n=Ms())==null?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function cl(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ll(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ir(JSON.stringify(e)),ir(JSON.stringify(a)),""].join(".")}const dn={};function hl(){const n={prod:[],emulator:[]};for(const t of Object.keys(dn))dn[t]?n.emulator.push(t):n.prod.push(t);return n}function fl(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let Eo=!1;function dl(n,t){if(typeof window>"u"||typeof document>"u"||!Ls(window.location.host)||dn[n]===t||dn[n]||Eo)return;dn[n]=t;function e(w){return`__firebase__banner__${w}`}const r="__firebase__banner",o=hl().prod.length>0;function a(){const w=document.getElementById(r);w&&w.remove()}function l(w){w.style.display="flex",w.style.background="#7faaf0",w.style.position="fixed",w.style.bottom="5px",w.style.left="5px",w.style.padding=".5em",w.style.borderRadius="5px",w.style.alignItems="center"}function h(w,V){w.setAttribute("width","24"),w.setAttribute("id",V),w.setAttribute("height","24"),w.setAttribute("viewBox","0 0 24 24"),w.setAttribute("fill","none"),w.style.marginLeft="-6px"}function d(){const w=document.createElement("span");return w.style.cursor="pointer",w.style.marginLeft="16px",w.style.fontSize="24px",w.innerHTML=" &times;",w.onclick=()=>{Eo=!0,a()},w}function m(w,V){w.setAttribute("id",V),w.innerText="Learn more",w.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",w.setAttribute("target","__blank"),w.style.paddingLeft="5px",w.style.textDecoration="underline"}function I(){const w=fl(r),V=e("text"),N=document.getElementById(V)||document.createElement("span"),O=e("learnmore"),k=document.getElementById(O)||document.createElement("a"),H=e("preprendIcon"),z=document.getElementById(H)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(w.created){const W=w.element;l(W),m(k,O);const Tt=d();h(z,H),W.append(z,N,k,Tt),document.body.appendChild(W)}o?(N.innerText="Preview backend disconnected.",z.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(z.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,N.innerText="Preview backend running in this workspace."),N.setAttribute("id",V)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",I):I()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ml(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function pl(){var t;const n=(t=Ms())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function gl(){return!pl()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function _l(){try{return typeof indexedDB=="object"}catch{return!1}}function yl(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)==null?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const El="FirebaseError";class Ue extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=El,Object.setPrototypeOf(this,Ue.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Da.prototype.create)}}class Da{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?Tl(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new Ue(s,l,r)}}function Tl(n,t){return n.replace(Il,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const Il=/\{\$([^}]+)}/g;function or(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(To(o)&&To(a)){if(!or(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function To(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ke(n){return n&&n._delegate?n._delegate:n}class yn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const le="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new ul;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(wl(t))try{this.getOrInitializeService({instanceIdentifier:le})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=le){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=le){return this.instances.has(t)}getOptions(t=le){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&t(o,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Al(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=le){return this.component?this.component.multipleInstances?t:le:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Al(n){return n===le?void 0:n}function wl(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new vl(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})($||($={}));const Sl={debug:$.DEBUG,verbose:$.VERBOSE,info:$.INFO,warn:$.WARN,error:$.ERROR,silent:$.SILENT},Cl=$.INFO,Vl={[$.DEBUG]:"log",[$.VERBOSE]:"log",[$.INFO]:"info",[$.WARN]:"warn",[$.ERROR]:"error"},Pl=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=Vl[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Na{constructor(t){this.name=t,this._logLevel=Cl,this._logHandler=Pl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in $))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Sl[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,$.DEBUG,...t),this._logHandler(this,$.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,$.VERBOSE,...t),this._logHandler(this,$.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,$.INFO,...t),this._logHandler(this,$.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,$.WARN,...t),this._logHandler(this,$.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,$.ERROR,...t),this._logHandler(this,$.ERROR,...t)}}const bl=(n,t)=>t.some(e=>n instanceof e);let Io,vo;function Dl(){return Io||(Io=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Nl(){return vo||(vo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ka=new WeakMap,ms=new WeakMap,xa=new WeakMap,is=new WeakMap,Fs=new WeakMap;function kl(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(Wt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&ka.set(e,n)}).catch(()=>{}),Fs.set(t,n),t}function xl(n){if(ms.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});ms.set(n,t)}let ps={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return ms.get(n);if(t==="objectStoreNames")return n.objectStoreNames||xa.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Wt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function Ol(n){ps=n(ps)}function Ml(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(os(this),t,...e);return xa.set(r,t.sort?t.sort():[t]),Wt(r)}:Nl().includes(n)?function(...t){return n.apply(os(this),t),Wt(ka.get(this))}:function(...t){return Wt(n.apply(os(this),t))}}function Ll(n){return typeof n=="function"?Ml(n):(n instanceof IDBTransaction&&xl(n),bl(n,Dl())?new Proxy(n,ps):n)}function Wt(n){if(n instanceof IDBRequest)return kl(n);if(is.has(n))return is.get(n);const t=Ll(n);return t!==n&&(is.set(n,t),Fs.set(t,n)),t}const os=n=>Fs.get(n);function Fl(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,t),l=Wt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Wt(a.result),h.oldVersion,h.newVersion,Wt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const Ul=["get","getKey","getAll","getAllKeys","count"],Bl=["put","add","delete","clear"],as=new Map;function Ao(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(as.get(t))return as.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=Bl.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Ul.includes(e)))return;const o=async function(a,...l){const h=this.transaction(a,s?"readwrite":"readonly");let d=h.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[e](...l),s&&h.done]))[0]};return as.set(t,o),o}Ol(n=>({...n,get:(t,e,r)=>Ao(t,e)||n.get(t,e,r),has:(t,e)=>!!Ao(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(jl(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function jl(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const gs="@firebase/app",wo="0.14.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft=new Na("@firebase/app"),$l="@firebase/app-compat",zl="@firebase/analytics-compat",Gl="@firebase/analytics",Hl="@firebase/app-check-compat",Kl="@firebase/app-check",Wl="@firebase/auth",Ql="@firebase/auth-compat",Yl="@firebase/database",Jl="@firebase/data-connect",Xl="@firebase/database-compat",Zl="@firebase/functions",th="@firebase/functions-compat",eh="@firebase/installations",nh="@firebase/installations-compat",rh="@firebase/messaging",sh="@firebase/messaging-compat",ih="@firebase/performance",oh="@firebase/performance-compat",ah="@firebase/remote-config",uh="@firebase/remote-config-compat",ch="@firebase/storage",lh="@firebase/storage-compat",hh="@firebase/firestore",fh="@firebase/ai",dh="@firebase/firestore-compat",mh="firebase",ph="12.9.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s="[DEFAULT]",gh={[gs]:"fire-core",[$l]:"fire-core-compat",[Gl]:"fire-analytics",[zl]:"fire-analytics-compat",[Kl]:"fire-app-check",[Hl]:"fire-app-check-compat",[Wl]:"fire-auth",[Ql]:"fire-auth-compat",[Yl]:"fire-rtdb",[Jl]:"fire-data-connect",[Xl]:"fire-rtdb-compat",[Zl]:"fire-fn",[th]:"fire-fn-compat",[eh]:"fire-iid",[nh]:"fire-iid-compat",[rh]:"fire-fcm",[sh]:"fire-fcm-compat",[ih]:"fire-perf",[oh]:"fire-perf-compat",[ah]:"fire-rc",[uh]:"fire-rc-compat",[ch]:"fire-gcs",[lh]:"fire-gcs-compat",[hh]:"fire-fst",[dh]:"fire-fst-compat",[fh]:"fire-vertex","fire-js":"fire-js",[mh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar=new Map,_h=new Map,ys=new Map;function Ro(n,t){try{n.container.addComponent(t)}catch(e){Ft.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function ur(n){const t=n.name;if(ys.has(t))return Ft.debug(`There were multiple attempts to register component ${t}.`),!1;ys.set(t,n);for(const e of ar.values())Ro(e,n);for(const e of _h.values())Ro(e,n);return!0}function yh(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function Eh(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Qt=new Da("app","Firebase",Th);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new yn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Qt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vh=ph;function Ah(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:_s,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw Qt.create("bad-app-name",{appName:String(s)});if(e||(e=ba()),!e)throw Qt.create("no-options");const o=ar.get(s);if(o){if(or(e,o.options)&&or(r,o.config))return o;throw Qt.create("duplicate-app",{appName:s})}const a=new Rl(s);for(const h of ys.values())a.addComponent(h);const l=new Ih(e,r,a);return ar.set(s,l),l}function wh(n=_s){const t=ar.get(n);if(!t&&n===_s&&ba())return Ah();if(!t)throw Qt.create("no-app",{appName:n});return t}function Pe(n,t,e){let r=gh[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const a=[`Unable to register library "${r}" with version "${t}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Ft.warn(a.join(" "));return}ur(new yn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rh="firebase-heartbeat-database",Sh=1,En="firebase-heartbeat-store";let us=null;function Oa(){return us||(us=Fl(Rh,Sh,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(En)}catch(e){console.warn(e)}}}}).catch(n=>{throw Qt.create("idb-open",{originalErrorMessage:n.message})})),us}async function Ch(n){try{const e=(await Oa()).transaction(En),r=await e.objectStore(En).get(Ma(n));return await e.done,r}catch(t){if(t instanceof Ue)Ft.warn(t.message);else{const e=Qt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Ft.warn(e.message)}}}async function So(n,t){try{const r=(await Oa()).transaction(En,"readwrite");await r.objectStore(En).put(t,Ma(n)),await r.done}catch(e){if(e instanceof Ue)Ft.warn(e.message);else{const r=Qt.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Ft.warn(r.message)}}}function Ma(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh=1024,Ph=30;class bh{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Nh(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Co();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>Ph){const a=kh(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ft.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Co(),{heartbeatsToSend:r,unsentEntries:s}=Dh(this._heartbeatsCache.heartbeats),o=ir(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Ft.warn(e),""}}}function Co(){return new Date().toISOString().substring(0,10)}function Dh(n,t=Vh){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),Vo(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),Vo(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class Nh{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return _l()?yl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Ch(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return So(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return So(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function Vo(n){return ir(JSON.stringify({version:2,heartbeats:n})).length}function kh(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xh(n){ur(new yn("platform-logger",t=>new ql(t),"PRIVATE")),ur(new yn("heartbeat",t=>new bh(t),"PRIVATE")),Pe(gs,wo,n),Pe(gs,wo,"esm2020"),Pe("fire-js","")}xh("");var Oh="firebase",Mh="12.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Pe(Oh,Mh,"app");var Po=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Yt,La;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,p){function _(){}_.prototype=p.prototype,E.F=p.prototype,E.prototype=new _,E.prototype.constructor=E,E.D=function(T,y,A){for(var g=Array(arguments.length-2),It=2;It<arguments.length;It++)g[It-2]=arguments[It];return p.prototype[y].apply(T,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,p,_){_||(_=0);const T=Array(16);if(typeof p=="string")for(var y=0;y<16;++y)T[y]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(y=0;y<16;++y)T[y]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=E.g[0],_=E.g[1],y=E.g[2];let A=E.g[3],g;g=p+(A^_&(y^A))+T[0]+3614090360&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(y^p&(_^y))+T[1]+3905402710&4294967295,A=p+(g<<12&4294967295|g>>>20),g=y+(_^A&(p^_))+T[2]+606105819&4294967295,y=A+(g<<17&4294967295|g>>>15),g=_+(p^y&(A^p))+T[3]+3250441966&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(A^_&(y^A))+T[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(y^p&(_^y))+T[5]+1200080426&4294967295,A=p+(g<<12&4294967295|g>>>20),g=y+(_^A&(p^_))+T[6]+2821735955&4294967295,y=A+(g<<17&4294967295|g>>>15),g=_+(p^y&(A^p))+T[7]+4249261313&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(A^_&(y^A))+T[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(y^p&(_^y))+T[9]+2336552879&4294967295,A=p+(g<<12&4294967295|g>>>20),g=y+(_^A&(p^_))+T[10]+4294925233&4294967295,y=A+(g<<17&4294967295|g>>>15),g=_+(p^y&(A^p))+T[11]+2304563134&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(A^_&(y^A))+T[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(y^p&(_^y))+T[13]+4254626195&4294967295,A=p+(g<<12&4294967295|g>>>20),g=y+(_^A&(p^_))+T[14]+2792965006&4294967295,y=A+(g<<17&4294967295|g>>>15),g=_+(p^y&(A^p))+T[15]+1236535329&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(y^A&(_^y))+T[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^y&(p^_))+T[6]+3225465664&4294967295,A=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(A^p))+T[11]+643717713&4294967295,y=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(y^A))+T[0]+3921069994&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(y^A&(_^y))+T[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^y&(p^_))+T[10]+38016083&4294967295,A=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(A^p))+T[15]+3634488961&4294967295,y=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(y^A))+T[4]+3889429448&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(y^A&(_^y))+T[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^y&(p^_))+T[14]+3275163606&4294967295,A=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(A^p))+T[3]+4107603335&4294967295,y=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(y^A))+T[8]+1163531501&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(y^A&(_^y))+T[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^y&(p^_))+T[2]+4243563512&4294967295,A=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(A^p))+T[7]+1735328473&4294967295,y=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(y^A))+T[12]+2368359562&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(_^y^A)+T[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^y)+T[8]+2272392833&4294967295,A=p+(g<<11&4294967295|g>>>21),g=y+(A^p^_)+T[11]+1839030562&4294967295,y=A+(g<<16&4294967295|g>>>16),g=_+(y^A^p)+T[14]+4259657740&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(_^y^A)+T[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^y)+T[4]+1272893353&4294967295,A=p+(g<<11&4294967295|g>>>21),g=y+(A^p^_)+T[7]+4139469664&4294967295,y=A+(g<<16&4294967295|g>>>16),g=_+(y^A^p)+T[10]+3200236656&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(_^y^A)+T[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^y)+T[0]+3936430074&4294967295,A=p+(g<<11&4294967295|g>>>21),g=y+(A^p^_)+T[3]+3572445317&4294967295,y=A+(g<<16&4294967295|g>>>16),g=_+(y^A^p)+T[6]+76029189&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(_^y^A)+T[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^y)+T[12]+3873151461&4294967295,A=p+(g<<11&4294967295|g>>>21),g=y+(A^p^_)+T[15]+530742520&4294967295,y=A+(g<<16&4294967295|g>>>16),g=_+(y^A^p)+T[2]+3299628645&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(y^(_|~A))+T[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~y))+T[7]+1126891415&4294967295,A=p+(g<<10&4294967295|g>>>22),g=y+(p^(A|~_))+T[14]+2878612391&4294967295,y=A+(g<<15&4294967295|g>>>17),g=_+(A^(y|~p))+T[5]+4237533241&4294967295,_=y+(g<<21&4294967295|g>>>11),g=p+(y^(_|~A))+T[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~y))+T[3]+2399980690&4294967295,A=p+(g<<10&4294967295|g>>>22),g=y+(p^(A|~_))+T[10]+4293915773&4294967295,y=A+(g<<15&4294967295|g>>>17),g=_+(A^(y|~p))+T[1]+2240044497&4294967295,_=y+(g<<21&4294967295|g>>>11),g=p+(y^(_|~A))+T[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~y))+T[15]+4264355552&4294967295,A=p+(g<<10&4294967295|g>>>22),g=y+(p^(A|~_))+T[6]+2734768916&4294967295,y=A+(g<<15&4294967295|g>>>17),g=_+(A^(y|~p))+T[13]+1309151649&4294967295,_=y+(g<<21&4294967295|g>>>11),g=p+(y^(_|~A))+T[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~y))+T[11]+3174756917&4294967295,A=p+(g<<10&4294967295|g>>>22),g=y+(p^(A|~_))+T[2]+718787259&4294967295,y=A+(g<<15&4294967295|g>>>17),g=_+(A^(y|~p))+T[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(y+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+y&4294967295,E.g[3]=E.g[3]+A&4294967295}r.prototype.v=function(E,p){p===void 0&&(p=E.length);const _=p-this.blockSize,T=this.C;let y=this.h,A=0;for(;A<p;){if(y==0)for(;A<=_;)s(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<p;)if(T[y++]=E.charCodeAt(A++),y==this.blockSize){s(this,T),y=0;break}}else for(;A<p;)if(T[y++]=E[A++],y==this.blockSize){s(this,T),y=0;break}}this.h=y,this.o+=p},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;p=this.o*8;for(var _=E.length-8;_<E.length;++_)E[_]=p&255,p/=256;for(this.v(E),E=Array(16),p=0,_=0;_<4;++_)for(let T=0;T<32;T+=8)E[p++]=this.g[_]>>>T&255;return E};function o(E,p){var _=l;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=p(E)}function a(E,p){this.h=p;const _=[];let T=!0;for(let y=E.length-1;y>=0;y--){const A=E[y]|0;T&&A==p||(_[y]=A,T=!1)}this.g=_}var l={};function h(E){return-128<=E&&E<128?o(E,function(p){return new a([p|0],p<0?-1:0)}):new a([E|0],E<0?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return I;if(E<0)return k(d(-E));const p=[];let _=1;for(let T=0;E>=_;T++)p[T]=E/_|0,_*=4294967296;return new a(p,0)}function m(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return k(m(E.substring(1),p));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=d(Math.pow(p,8));let T=I;for(let A=0;A<E.length;A+=8){var y=Math.min(8,E.length-A);const g=parseInt(E.substring(A,A+y),p);y<8?(y=d(Math.pow(p,y)),T=T.j(y).add(d(g))):(T=T.j(_),T=T.add(d(g)))}return T}var I=h(0),w=h(1),V=h(16777216);n=a.prototype,n.m=function(){if(O(this))return-k(this).m();let E=0,p=1;for(let _=0;_<this.g.length;_++){const T=this.i(_);E+=(T>=0?T:4294967296+T)*p,p*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(N(this))return"0";if(O(this))return"-"+k(this).toString(E);const p=d(Math.pow(E,6));var _=this;let T="";for(;;){const y=Tt(_,p).g;_=H(_,y.j(p));let A=((_.g.length>0?_.g[0]:_.h)>>>0).toString(E);if(_=y,N(_))return A+T;for(;A.length<6;)A="0"+A;T=A+T}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function N(E){if(E.h!=0)return!1;for(let p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function O(E){return E.h==-1}n.l=function(E){return E=H(this,E),O(E)?-1:N(E)?0:1};function k(E){const p=E.g.length,_=[];for(let T=0;T<p;T++)_[T]=~E.g[T];return new a(_,~E.h).add(w)}n.abs=function(){return O(this)?k(this):this},n.add=function(E){const p=Math.max(this.g.length,E.g.length),_=[];let T=0;for(let y=0;y<=p;y++){let A=T+(this.i(y)&65535)+(E.i(y)&65535),g=(A>>>16)+(this.i(y)>>>16)+(E.i(y)>>>16);T=g>>>16,A&=65535,g&=65535,_[y]=g<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function H(E,p){return E.add(k(p))}n.j=function(E){if(N(this)||N(E))return I;if(O(this))return O(E)?k(this).j(k(E)):k(k(this).j(E));if(O(E))return k(this.j(k(E)));if(this.l(V)<0&&E.l(V)<0)return d(this.m()*E.m());const p=this.g.length+E.g.length,_=[];for(var T=0;T<2*p;T++)_[T]=0;for(T=0;T<this.g.length;T++)for(let y=0;y<E.g.length;y++){const A=this.i(T)>>>16,g=this.i(T)&65535,It=E.i(y)>>>16,se=E.i(y)&65535;_[2*T+2*y]+=g*se,z(_,2*T+2*y),_[2*T+2*y+1]+=A*se,z(_,2*T+2*y+1),_[2*T+2*y+1]+=g*It,z(_,2*T+2*y+1),_[2*T+2*y+2]+=A*It,z(_,2*T+2*y+2)}for(E=0;E<p;E++)_[E]=_[2*E+1]<<16|_[2*E];for(E=p;E<2*p;E++)_[E]=0;return new a(_,0)};function z(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function W(E,p){this.g=E,this.h=p}function Tt(E,p){if(N(p))throw Error("division by zero");if(N(E))return new W(I,I);if(O(E))return p=Tt(k(E),p),new W(k(p.g),k(p.h));if(O(p))return p=Tt(E,k(p)),new W(k(p.g),p.h);if(E.g.length>30){if(O(E)||O(p))throw Error("slowDivide_ only works with positive integers.");for(var _=w,T=p;T.l(E)<=0;)_=ft(_),T=ft(T);var y=dt(_,1),A=dt(T,1);for(T=dt(T,2),_=dt(_,2);!N(T);){var g=A.add(T);g.l(E)<=0&&(y=y.add(_),A=g),T=dt(T,1),_=dt(_,1)}return p=H(E,y.j(p)),new W(y,p)}for(y=I;E.l(p)>=0;){for(_=Math.max(1,Math.floor(E.m()/p.m())),T=Math.ceil(Math.log(_)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),A=d(_),g=A.j(p);O(g)||g.l(E)>0;)_-=T,A=d(_),g=A.j(p);N(A)&&(A=w),y=y.add(A),E=H(E,g)}return new W(y,E)}n.B=function(E){return Tt(this,E).h},n.and=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let T=0;T<p;T++)_[T]=this.i(T)&E.i(T);return new a(_,this.h&E.h)},n.or=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let T=0;T<p;T++)_[T]=this.i(T)|E.i(T);return new a(_,this.h|E.h)},n.xor=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let T=0;T<p;T++)_[T]=this.i(T)^E.i(T);return new a(_,this.h^E.h)};function ft(E){const p=E.g.length+1,_=[];for(let T=0;T<p;T++)_[T]=E.i(T)<<1|E.i(T-1)>>>31;return new a(_,E.h)}function dt(E,p){const _=p>>5;p%=32;const T=E.g.length-_,y=[];for(let A=0;A<T;A++)y[A]=p>0?E.i(A+_)>>>p|E.i(A+_+1)<<32-p:E.i(A+_);return new a(y,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,La=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,Yt=a}).apply(typeof Po<"u"?Po:typeof self<"u"?self:typeof window<"u"?window:{});var Wn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Fa,cn,Ua,Zn,Es,Ba,qa,ja;(function(){var n,t=Object.defineProperty;function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Wn=="object"&&Wn];for(var u=0;u<i.length;++u){var c=i[u];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=e(this);function s(i,u){if(u)t:{var c=r;i=i.split(".");for(var f=0;f<i.length-1;f++){var v=i[f];if(!(v in c))break t;c=c[v]}i=i[i.length-1],f=c[i],u=u(f),u!=f&&u!=null&&t(c,i,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(i){return i||function(u){var c=[],f;for(f in u)Object.prototype.hasOwnProperty.call(u,f)&&c.push([f,u[f]]);return c}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(i){var u=typeof i;return u=="object"&&i!=null||u=="function"}function h(i,u,c){return i.call.apply(i.bind,arguments)}function d(i,u,c){return d=h,d.apply(null,arguments)}function m(i,u){var c=Array.prototype.slice.call(arguments,1);return function(){var f=c.slice();return f.push.apply(f,arguments),i.apply(this,f)}}function I(i,u){function c(){}c.prototype=u.prototype,i.Z=u.prototype,i.prototype=new c,i.prototype.constructor=i,i.Ob=function(f,v,R){for(var P=Array(arguments.length-2),U=2;U<arguments.length;U++)P[U-2]=arguments[U];return u.prototype[v].apply(f,P)}}var w=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function V(i){const u=i.length;if(u>0){const c=Array(u);for(let f=0;f<u;f++)c[f]=i[f];return c}return[]}function N(i,u){for(let f=1;f<arguments.length;f++){const v=arguments[f];var c=typeof v;if(c=c!="object"?c:v?Array.isArray(v)?"array":c:"null",c=="array"||c=="object"&&typeof v.length=="number"){c=i.length||0;const R=v.length||0;i.length=c+R;for(let P=0;P<R;P++)i[c+P]=v[P]}else i.push(v)}}class O{constructor(u,c){this.i=u,this.j=c,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function k(i){a.setTimeout(()=>{throw i},0)}function H(){var i=E;let u=null;return i.g&&(u=i.g,i.g=i.g.next,i.g||(i.h=null),u.next=null),u}class z{constructor(){this.h=this.g=null}add(u,c){const f=W.get();f.set(u,c),this.h?this.h.next=f:this.g=f,this.h=f}}var W=new O(()=>new Tt,i=>i.reset());class Tt{constructor(){this.next=this.g=this.h=null}set(u,c){this.h=u,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let ft,dt=!1,E=new z,p=()=>{const i=Promise.resolve(void 0);ft=()=>{i.then(_)}};function _(){for(var i;i=H();){try{i.h.call(i.g)}catch(c){k(c)}var u=W;u.j(i),u.h<100&&(u.h++,i.next=u.g,u.g=i)}dt=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function y(i,u){this.type=i,this.g=this.target=u,this.defaultPrevented=!1}y.prototype.h=function(){this.defaultPrevented=!0};var A=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,u=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};a.addEventListener("test",c,u),a.removeEventListener("test",c,u)}catch{}return i}();function g(i){return/^[\s\xa0]*$/.test(i)}function It(i,u){y.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,u)}I(It,y),It.prototype.init=function(i,u){const c=this.type=i.type,f=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=u,u=i.relatedTarget,u||(c=="mouseover"?u=i.fromElement:c=="mouseout"&&(u=i.toElement)),this.relatedTarget=u,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&It.Z.h.call(this)},It.prototype.h=function(){It.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var se="closure_listenable_"+(Math.random()*1e6|0),Ec=0;function Tc(i,u,c,f,v){this.listener=i,this.proxy=null,this.src=u,this.type=c,this.capture=!!f,this.ha=v,this.key=++Ec,this.da=this.fa=!1}function kn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function xn(i,u,c){for(const f in i)u.call(c,i[f],f,i)}function Ic(i,u){for(const c in i)u.call(void 0,i[c],c,i)}function gi(i){const u={};for(const c in i)u[c]=i[c];return u}const _i="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function yi(i,u){let c,f;for(let v=1;v<arguments.length;v++){f=arguments[v];for(c in f)i[c]=f[c];for(let R=0;R<_i.length;R++)c=_i[R],Object.prototype.hasOwnProperty.call(f,c)&&(i[c]=f[c])}}function On(i){this.src=i,this.g={},this.h=0}On.prototype.add=function(i,u,c,f,v){const R=i.toString();i=this.g[R],i||(i=this.g[R]=[],this.h++);const P=Mr(i,u,f,v);return P>-1?(u=i[P],c||(u.fa=!1)):(u=new Tc(u,this.src,R,!!f,v),u.fa=c,i.push(u)),u};function Or(i,u){const c=u.type;if(c in i.g){var f=i.g[c],v=Array.prototype.indexOf.call(f,u,void 0),R;(R=v>=0)&&Array.prototype.splice.call(f,v,1),R&&(kn(u),i.g[c].length==0&&(delete i.g[c],i.h--))}}function Mr(i,u,c,f){for(let v=0;v<i.length;++v){const R=i[v];if(!R.da&&R.listener==u&&R.capture==!!c&&R.ha==f)return v}return-1}var Lr="closure_lm_"+(Math.random()*1e6|0),Fr={};function Ei(i,u,c,f,v){if(Array.isArray(u)){for(let R=0;R<u.length;R++)Ei(i,u[R],c,f,v);return null}return c=vi(c),i&&i[se]?i.J(u,c,l(f)?!!f.capture:!1,v):vc(i,u,c,!1,f,v)}function vc(i,u,c,f,v,R){if(!u)throw Error("Invalid event type");const P=l(v)?!!v.capture:!!v;let U=Br(i);if(U||(i[Lr]=U=new On(i)),c=U.add(u,c,f,P,R),c.proxy)return c;if(f=Ac(),c.proxy=f,f.src=i,f.listener=c,i.addEventListener)A||(v=P),v===void 0&&(v=!1),i.addEventListener(u.toString(),f,v);else if(i.attachEvent)i.attachEvent(Ii(u.toString()),f);else if(i.addListener&&i.removeListener)i.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return c}function Ac(){function i(c){return u.call(i.src,i.listener,c)}const u=wc;return i}function Ti(i,u,c,f,v){if(Array.isArray(u))for(var R=0;R<u.length;R++)Ti(i,u[R],c,f,v);else f=l(f)?!!f.capture:!!f,c=vi(c),i&&i[se]?(i=i.i,R=String(u).toString(),R in i.g&&(u=i.g[R],c=Mr(u,c,f,v),c>-1&&(kn(u[c]),Array.prototype.splice.call(u,c,1),u.length==0&&(delete i.g[R],i.h--)))):i&&(i=Br(i))&&(u=i.g[u.toString()],i=-1,u&&(i=Mr(u,c,f,v)),(c=i>-1?u[i]:null)&&Ur(c))}function Ur(i){if(typeof i!="number"&&i&&!i.da){var u=i.src;if(u&&u[se])Or(u.i,i);else{var c=i.type,f=i.proxy;u.removeEventListener?u.removeEventListener(c,f,i.capture):u.detachEvent?u.detachEvent(Ii(c),f):u.addListener&&u.removeListener&&u.removeListener(f),(c=Br(u))?(Or(c,i),c.h==0&&(c.src=null,u[Lr]=null)):kn(i)}}}function Ii(i){return i in Fr?Fr[i]:Fr[i]="on"+i}function wc(i,u){if(i.da)i=!0;else{u=new It(u,this);const c=i.listener,f=i.ha||i.src;i.fa&&Ur(i),i=c.call(f,u)}return i}function Br(i){return i=i[Lr],i instanceof On?i:null}var qr="__closure_events_fn_"+(Math.random()*1e9>>>0);function vi(i){return typeof i=="function"?i:(i[qr]||(i[qr]=function(u){return i.handleEvent(u)}),i[qr])}function mt(){T.call(this),this.i=new On(this),this.M=this,this.G=null}I(mt,T),mt.prototype[se]=!0,mt.prototype.removeEventListener=function(i,u,c,f){Ti(this,i,u,c,f)};function yt(i,u){var c,f=i.G;if(f)for(c=[];f;f=f.G)c.push(f);if(i=i.M,f=u.type||u,typeof u=="string")u=new y(u,i);else if(u instanceof y)u.target=u.target||i;else{var v=u;u=new y(f,i),yi(u,v)}v=!0;let R,P;if(c)for(P=c.length-1;P>=0;P--)R=u.g=c[P],v=Mn(R,f,!0,u)&&v;if(R=u.g=i,v=Mn(R,f,!0,u)&&v,v=Mn(R,f,!1,u)&&v,c)for(P=0;P<c.length;P++)R=u.g=c[P],v=Mn(R,f,!1,u)&&v}mt.prototype.N=function(){if(mt.Z.N.call(this),this.i){var i=this.i;for(const u in i.g){const c=i.g[u];for(let f=0;f<c.length;f++)kn(c[f]);delete i.g[u],i.h--}}this.G=null},mt.prototype.J=function(i,u,c,f){return this.i.add(String(i),u,!1,c,f)},mt.prototype.K=function(i,u,c,f){return this.i.add(String(i),u,!0,c,f)};function Mn(i,u,c,f){if(u=i.i.g[String(u)],!u)return!0;u=u.concat();let v=!0;for(let R=0;R<u.length;++R){const P=u[R];if(P&&!P.da&&P.capture==c){const U=P.listener,it=P.ha||P.src;P.fa&&Or(i.i,P),v=U.call(it,f)!==!1&&v}}return v&&!f.defaultPrevented}function Rc(i,u){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=d(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(i,u||0)}function Ai(i){i.g=Rc(()=>{i.g=null,i.i&&(i.i=!1,Ai(i))},i.l);const u=i.h;i.h=null,i.m.apply(null,u)}class Sc extends T{constructor(u,c){super(),this.m=u,this.l=c,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Ai(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ge(i){T.call(this),this.h=i,this.g={}}I(Ge,T);var wi=[];function Ri(i){xn(i.g,function(u,c){this.g.hasOwnProperty(c)&&Ur(u)},i),i.g={}}Ge.prototype.N=function(){Ge.Z.N.call(this),Ri(this)},Ge.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var jr=a.JSON.stringify,Cc=a.JSON.parse,Vc=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function Si(){}function Ci(){}var He={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function $r(){y.call(this,"d")}I($r,y);function zr(){y.call(this,"c")}I(zr,y);var ie={},Vi=null;function Ln(){return Vi=Vi||new mt}ie.Ia="serverreachability";function Pi(i){y.call(this,ie.Ia,i)}I(Pi,y);function Ke(i){const u=Ln();yt(u,new Pi(u))}ie.STAT_EVENT="statevent";function bi(i,u){y.call(this,ie.STAT_EVENT,i),this.stat=u}I(bi,y);function Et(i){const u=Ln();yt(u,new bi(u,i))}ie.Ja="timingevent";function Di(i,u){y.call(this,ie.Ja,i),this.size=u}I(Di,y);function We(i,u){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},u)}function Qe(){this.g=!0}Qe.prototype.ua=function(){this.g=!1};function Pc(i,u,c,f,v,R){i.info(function(){if(i.g)if(R){var P="",U=R.split("&");for(let K=0;K<U.length;K++){var it=U[K].split("=");if(it.length>1){const at=it[0];it=it[1];const bt=at.split("_");P=bt.length>=2&&bt[1]=="type"?P+(at+"="+it+"&"):P+(at+"=redacted&")}}}else P=null;else P=R;return"XMLHTTP REQ ("+f+") [attempt "+v+"]: "+u+`
`+c+`
`+P})}function bc(i,u,c,f,v,R,P){i.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+v+"]: "+u+`
`+c+`
`+R+" "+P})}function ve(i,u,c,f){i.info(function(){return"XMLHTTP TEXT ("+u+"): "+Nc(i,c)+(f?" "+f:"")})}function Dc(i,u){i.info(function(){return"TIMEOUT: "+u})}Qe.prototype.info=function(){};function Nc(i,u){if(!i.g)return u;if(!u)return null;try{const R=JSON.parse(u);if(R){for(i=0;i<R.length;i++)if(Array.isArray(R[i])){var c=R[i];if(!(c.length<2)){var f=c[1];if(Array.isArray(f)&&!(f.length<1)){var v=f[0];if(v!="noop"&&v!="stop"&&v!="close")for(let P=1;P<f.length;P++)f[P]=""}}}}return jr(R)}catch{return u}}var Fn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ni={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},ki;function Gr(){}I(Gr,Si),Gr.prototype.g=function(){return new XMLHttpRequest},ki=new Gr;function Ye(i){return encodeURIComponent(String(i))}function kc(i){var u=1;i=i.split(":");const c=[];for(;u>0&&i.length;)c.push(i.shift()),u--;return i.length&&c.push(i.join(":")),c}function qt(i,u,c,f){this.j=i,this.i=u,this.l=c,this.S=f||1,this.V=new Ge(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new xi}function xi(){this.i=null,this.g="",this.h=!1}var Oi={},Hr={};function Kr(i,u,c){i.M=1,i.A=Bn(Pt(u)),i.u=c,i.R=!0,Mi(i,null)}function Mi(i,u){i.F=Date.now(),Un(i),i.B=Pt(i.A);var c=i.B,f=i.S;Array.isArray(f)||(f=[String(f)]),Qi(c.i,"t",f),i.C=0,c=i.j.L,i.h=new xi,i.g=mo(i.j,c?u:null,!i.u),i.P>0&&(i.O=new Sc(d(i.Y,i,i.g),i.P)),u=i.V,c=i.g,f=i.ba;var v="readystatechange";Array.isArray(v)||(v&&(wi[0]=v.toString()),v=wi);for(let R=0;R<v.length;R++){const P=Ei(c,v[R],f||u.handleEvent,!1,u.h||u);if(!P)break;u.g[P.key]=P}u=i.J?gi(i.J):{},i.u?(i.v||(i.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,u)):(i.v="GET",i.g.ea(i.B,i.v,null,u)),Ke(),Pc(i.i,i.v,i.B,i.l,i.S,i.u)}qt.prototype.ba=function(i){i=i.target;const u=this.O;u&&zt(i)==3?u.j():this.Y(i)},qt.prototype.Y=function(i){try{if(i==this.g)t:{const U=zt(this.g),it=this.g.ya(),K=this.g.ca();if(!(U<3)&&(U!=3||this.g&&(this.h.h||this.g.la()||no(this.g)))){this.K||U!=4||it==7||(it==8||K<=0?Ke(3):Ke(2)),Wr(this);var u=this.g.ca();this.X=u;var c=xc(this);if(this.o=u==200,bc(this.i,this.v,this.B,this.l,this.S,U,u),this.o){if(this.U&&!this.L){e:{if(this.g){var f,v=this.g;if((f=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(f)){var R=f;break e}}R=null}if(i=R)ve(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Qr(this,i);else{this.o=!1,this.m=3,Et(12),oe(this),Je(this);break t}}if(this.R){i=!0;let at;for(;!this.K&&this.C<c.length;)if(at=Oc(this,c),at==Hr){U==4&&(this.m=4,Et(14),i=!1),ve(this.i,this.l,null,"[Incomplete Response]");break}else if(at==Oi){this.m=4,Et(15),ve(this.i,this.l,c,"[Invalid Chunk]"),i=!1;break}else ve(this.i,this.l,at,null),Qr(this,at);if(Li(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),U!=4||c.length!=0||this.h.h||(this.m=1,Et(16),i=!1),this.o=this.o&&i,!i)ve(this.i,this.l,c,"[Invalid Chunked Response]"),oe(this),Je(this);else if(c.length>0&&!this.W){this.W=!0;var P=this.j;P.g==this&&P.aa&&!P.P&&(P.j.info("Great, no buffering proxy detected. Bytes received: "+c.length),rs(P),P.P=!0,Et(11))}}else ve(this.i,this.l,c,null),Qr(this,c);U==4&&oe(this),this.o&&!this.K&&(U==4?co(this.j,this):(this.o=!1,Un(this)))}else Qc(this.g),u==400&&c.indexOf("Unknown SID")>0?(this.m=3,Et(12)):(this.m=0,Et(13)),oe(this),Je(this)}}}catch{}finally{}};function xc(i){if(!Li(i))return i.g.la();const u=no(i.g);if(u==="")return"";let c="";const f=u.length,v=zt(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return oe(i),Je(i),"";i.h.i=new a.TextDecoder}for(let R=0;R<f;R++)i.h.h=!0,c+=i.h.i.decode(u[R],{stream:!(v&&R==f-1)});return u.length=0,i.h.g+=c,i.C=0,i.h.g}function Li(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function Oc(i,u){var c=i.C,f=u.indexOf(`
`,c);return f==-1?Hr:(c=Number(u.substring(c,f)),isNaN(c)?Oi:(f+=1,f+c>u.length?Hr:(u=u.slice(f,f+c),i.C=f+c,u)))}qt.prototype.cancel=function(){this.K=!0,oe(this)};function Un(i){i.T=Date.now()+i.H,Fi(i,i.H)}function Fi(i,u){if(i.D!=null)throw Error("WatchDog timer not null");i.D=We(d(i.aa,i),u)}function Wr(i){i.D&&(a.clearTimeout(i.D),i.D=null)}qt.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(Dc(this.i,this.B),this.M!=2&&(Ke(),Et(17)),oe(this),this.m=2,Je(this)):Fi(this,this.T-i)};function Je(i){i.j.I==0||i.K||co(i.j,i)}function oe(i){Wr(i);var u=i.O;u&&typeof u.dispose=="function"&&u.dispose(),i.O=null,Ri(i.V),i.g&&(u=i.g,i.g=null,u.abort(),u.dispose())}function Qr(i,u){try{var c=i.j;if(c.I!=0&&(c.g==i||Yr(c.h,i))){if(!i.L&&Yr(c.h,i)&&c.I==3){try{var f=c.Ba.g.parse(u)}catch{f=null}if(Array.isArray(f)&&f.length==3){var v=f;if(v[0]==0){t:if(!c.v){if(c.g)if(c.g.F+3e3<i.F)Gn(c),$n(c);else break t;ns(c),Et(18)}}else c.xa=v[1],0<c.xa-c.K&&v[2]<37500&&c.F&&c.A==0&&!c.C&&(c.C=We(d(c.Va,c),6e3));qi(c.h)<=1&&c.ta&&(c.ta=void 0)}else ue(c,11)}else if((i.L||c.g==i)&&Gn(c),!g(u))for(v=c.Ba.g.parse(u),u=0;u<v.length;u++){let K=v[u];const at=K[0];if(!(at<=c.K))if(c.K=at,K=K[1],c.I==2)if(K[0]=="c"){c.M=K[1],c.ba=K[2];const bt=K[3];bt!=null&&(c.ka=bt,c.j.info("VER="+c.ka));const ce=K[4];ce!=null&&(c.za=ce,c.j.info("SVER="+c.za));const Gt=K[5];Gt!=null&&typeof Gt=="number"&&Gt>0&&(f=1.5*Gt,c.O=f,c.j.info("backChannelRequestTimeoutMs_="+f)),f=c;const Ht=i.g;if(Ht){const Kn=Ht.g?Ht.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Kn){var R=f.h;R.g||Kn.indexOf("spdy")==-1&&Kn.indexOf("quic")==-1&&Kn.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Jr(R,R.h),R.h=null))}if(f.G){const ss=Ht.g?Ht.g.getResponseHeader("X-HTTP-Session-Id"):null;ss&&(f.wa=ss,Y(f.J,f.G,ss))}}c.I=3,c.l&&c.l.ra(),c.aa&&(c.T=Date.now()-i.F,c.j.info("Handshake RTT: "+c.T+"ms")),f=c;var P=i;if(f.na=fo(f,f.L?f.ba:null,f.W),P.L){ji(f.h,P);var U=P,it=f.O;it&&(U.H=it),U.D&&(Wr(U),Un(U)),f.g=P}else ao(f);c.i.length>0&&zn(c)}else K[0]!="stop"&&K[0]!="close"||ue(c,7);else c.I==3&&(K[0]=="stop"||K[0]=="close"?K[0]=="stop"?ue(c,7):es(c):K[0]!="noop"&&c.l&&c.l.qa(K),c.A=0)}}Ke(4)}catch{}}var Mc=class{constructor(i,u){this.g=i,this.map=u}};function Ui(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Bi(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function qi(i){return i.h?1:i.g?i.g.size:0}function Yr(i,u){return i.h?i.h==u:i.g?i.g.has(u):!1}function Jr(i,u){i.g?i.g.add(u):i.h=u}function ji(i,u){i.h&&i.h==u?i.h=null:i.g&&i.g.has(u)&&i.g.delete(u)}Ui.prototype.cancel=function(){if(this.i=$i(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function $i(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let u=i.i;for(const c of i.g.values())u=u.concat(c.G);return u}return V(i.i)}var zi=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Lc(i,u){if(i){i=i.split("&");for(let c=0;c<i.length;c++){const f=i[c].indexOf("=");let v,R=null;f>=0?(v=i[c].substring(0,f),R=i[c].substring(f+1)):v=i[c],u(v,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function jt(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;i instanceof jt?(this.l=i.l,Xe(this,i.j),this.o=i.o,this.g=i.g,Ze(this,i.u),this.h=i.h,Xr(this,Yi(i.i)),this.m=i.m):i&&(u=String(i).match(zi))?(this.l=!1,Xe(this,u[1]||"",!0),this.o=tn(u[2]||""),this.g=tn(u[3]||"",!0),Ze(this,u[4]),this.h=tn(u[5]||"",!0),Xr(this,u[6]||"",!0),this.m=tn(u[7]||"")):(this.l=!1,this.i=new nn(null,this.l))}jt.prototype.toString=function(){const i=[];var u=this.j;u&&i.push(en(u,Gi,!0),":");var c=this.g;return(c||u=="file")&&(i.push("//"),(u=this.o)&&i.push(en(u,Gi,!0),"@"),i.push(Ye(c).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.u,c!=null&&i.push(":",String(c))),(c=this.h)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(en(c,c.charAt(0)=="/"?Bc:Uc,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",en(c,jc)),i.join("")},jt.prototype.resolve=function(i){const u=Pt(this);let c=!!i.j;c?Xe(u,i.j):c=!!i.o,c?u.o=i.o:c=!!i.g,c?u.g=i.g:c=i.u!=null;var f=i.h;if(c)Ze(u,i.u);else if(c=!!i.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var v=u.h.lastIndexOf("/");v!=-1&&(f=u.h.slice(0,v+1)+f)}if(v=f,v==".."||v==".")f="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){f=v.lastIndexOf("/",0)==0,v=v.split("/");const R=[];for(let P=0;P<v.length;){const U=v[P++];U=="."?f&&P==v.length&&R.push(""):U==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),f&&P==v.length&&R.push("")):(R.push(U),f=!0)}f=R.join("/")}else f=v}return c?u.h=f:c=i.i.toString()!=="",c?Xr(u,Yi(i.i)):c=!!i.m,c&&(u.m=i.m),u};function Pt(i){return new jt(i)}function Xe(i,u,c){i.j=c?tn(u,!0):u,i.j&&(i.j=i.j.replace(/:$/,""))}function Ze(i,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);i.u=u}else i.u=null}function Xr(i,u,c){u instanceof nn?(i.i=u,$c(i.i,i.l)):(c||(u=en(u,qc)),i.i=new nn(u,i.l))}function Y(i,u,c){i.i.set(u,c)}function Bn(i){return Y(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function tn(i,u){return i?u?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function en(i,u,c){return typeof i=="string"?(i=encodeURI(i).replace(u,Fc),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Fc(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Gi=/[#\/\?@]/g,Uc=/[#\?:]/g,Bc=/[#\?]/g,qc=/[#\?@]/g,jc=/#/g;function nn(i,u){this.h=this.g=null,this.i=i||null,this.j=!!u}function ae(i){i.g||(i.g=new Map,i.h=0,i.i&&Lc(i.i,function(u,c){i.add(decodeURIComponent(u.replace(/\+/g," ")),c)}))}n=nn.prototype,n.add=function(i,u){ae(this),this.i=null,i=Ae(this,i);let c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(u),this.h+=1,this};function Hi(i,u){ae(i),u=Ae(i,u),i.g.has(u)&&(i.i=null,i.h-=i.g.get(u).length,i.g.delete(u))}function Ki(i,u){return ae(i),u=Ae(i,u),i.g.has(u)}n.forEach=function(i,u){ae(this),this.g.forEach(function(c,f){c.forEach(function(v){i.call(u,v,f,this)},this)},this)};function Wi(i,u){ae(i);let c=[];if(typeof u=="string")Ki(i,u)&&(c=c.concat(i.g.get(Ae(i,u))));else for(i=Array.from(i.g.values()),u=0;u<i.length;u++)c=c.concat(i[u]);return c}n.set=function(i,u){return ae(this),this.i=null,i=Ae(this,i),Ki(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[u]),this.h+=1,this},n.get=function(i,u){return i?(i=Wi(this,i),i.length>0?String(i[0]):u):u};function Qi(i,u,c){Hi(i,u),c.length>0&&(i.i=null,i.g.set(Ae(i,u),V(c)),i.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],u=Array.from(this.g.keys());for(let f=0;f<u.length;f++){var c=u[f];const v=Ye(c);c=Wi(this,c);for(let R=0;R<c.length;R++){let P=v;c[R]!==""&&(P+="="+Ye(c[R])),i.push(P)}}return this.i=i.join("&")};function Yi(i){const u=new nn;return u.i=i.i,i.g&&(u.g=new Map(i.g),u.h=i.h),u}function Ae(i,u){return u=String(u),i.j&&(u=u.toLowerCase()),u}function $c(i,u){u&&!i.j&&(ae(i),i.i=null,i.g.forEach(function(c,f){const v=f.toLowerCase();f!=v&&(Hi(this,f),Qi(this,v,c))},i)),i.j=u}function zc(i,u){const c=new Qe;if(a.Image){const f=new Image;f.onload=m($t,c,"TestLoadImage: loaded",!0,u,f),f.onerror=m($t,c,"TestLoadImage: error",!1,u,f),f.onabort=m($t,c,"TestLoadImage: abort",!1,u,f),f.ontimeout=m($t,c,"TestLoadImage: timeout",!1,u,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=i}else u(!1)}function Gc(i,u){const c=new Qe,f=new AbortController,v=setTimeout(()=>{f.abort(),$t(c,"TestPingServer: timeout",!1,u)},1e4);fetch(i,{signal:f.signal}).then(R=>{clearTimeout(v),R.ok?$t(c,"TestPingServer: ok",!0,u):$t(c,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(v),$t(c,"TestPingServer: error",!1,u)})}function $t(i,u,c,f,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),f(c)}catch{}}function Hc(){this.g=new Vc}function Zr(i){this.i=i.Sb||null,this.h=i.ab||!1}I(Zr,Si),Zr.prototype.g=function(){return new qn(this.i,this.h)};function qn(i,u){mt.call(this),this.H=i,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}I(qn,mt),n=qn.prototype,n.open=function(i,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=u,this.readyState=1,sn(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(u.body=i),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,rn(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,sn(this)),this.g&&(this.readyState=3,sn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ji(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function Ji(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var u=i.value?i.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!i.done}))&&(this.response=this.responseText+=u)}i.done?rn(this):sn(this),this.readyState==3&&Ji(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,rn(this))},n.Na=function(i){this.g&&(this.response=i,rn(this))},n.ga=function(){this.g&&rn(this)};function rn(i){i.readyState=4,i.l=null,i.j=null,i.B=null,sn(i)}n.setRequestHeader=function(i,u){this.A.append(i,u)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],u=this.h.entries();for(var c=u.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=u.next();return i.join(`\r
`)};function sn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(qn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Xi(i){let u="";return xn(i,function(c,f){u+=f,u+=":",u+=c,u+=`\r
`}),u}function ts(i,u,c){t:{for(f in c){var f=!1;break t}f=!0}f||(c=Xi(c),typeof i=="string"?c!=null&&Ye(c):Y(i,u,c))}function Z(i){mt.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}I(Z,mt);var Kc=/^https?$/i,Wc=["POST","PUT"];n=Z.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,u,c,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);u=u?u.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():ki.g(),this.g.onreadystatechange=w(d(this.Ca,this));try{this.B=!0,this.g.open(u,String(i),!0),this.B=!1}catch(R){Zi(this,R);return}if(i=c||"",c=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var v in f)c.set(v,f[v]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const R of f.keys())c.set(R,f.get(R));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(c.keys()).find(R=>R.toLowerCase()=="content-type"),v=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(Wc,u,void 0)>=0)||f||v||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,P]of c)this.g.setRequestHeader(R,P);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(R){Zi(this,R)}};function Zi(i,u){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=u,i.o=5,to(i),jn(i)}function to(i){i.A||(i.A=!0,yt(i,"complete"),yt(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,yt(this,"complete"),yt(this,"abort"),jn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),jn(this,!0)),Z.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?eo(this):this.Xa())},n.Xa=function(){eo(this)};function eo(i){if(i.h&&typeof o<"u"){if(i.v&&zt(i)==4)setTimeout(i.Ca.bind(i),0);else if(yt(i,"readystatechange"),zt(i)==4){i.h=!1;try{const R=i.ca();t:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var c;if(!(c=u)){var f;if(f=R===0){let P=String(i.D).match(zi)[1]||null;!P&&a.self&&a.self.location&&(P=a.self.location.protocol.slice(0,-1)),f=!Kc.test(P?P.toLowerCase():"")}c=f}if(c)yt(i,"complete"),yt(i,"success");else{i.o=6;try{var v=zt(i)>2?i.g.statusText:""}catch{v=""}i.l=v+" ["+i.ca()+"]",to(i)}}finally{jn(i)}}}}function jn(i,u){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const c=i.g;i.g=null,u||yt(i,"ready");try{c.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function zt(i){return i.g?i.g.readyState:0}n.ca=function(){try{return zt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(i){if(this.g){var u=this.g.responseText;return i&&u.indexOf(i)==0&&(u=u.substring(i.length)),Cc(u)}};function no(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Qc(i){const u={};i=(i.g&&zt(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<i.length;f++){if(g(i[f]))continue;var c=kc(i[f]);const v=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const R=u[v]||[];u[v]=R,R.push(c)}Ic(u,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function on(i,u,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||u}function ro(i){this.za=0,this.i=[],this.j=new Qe,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=on("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=on("baseRetryDelayMs",5e3,i),this.Za=on("retryDelaySeedMs",1e4,i),this.Ta=on("forwardChannelMaxRetries",2,i),this.va=on("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new Ui(i&&i.concurrentRequestLimit),this.Ba=new Hc,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=ro.prototype,n.ka=8,n.I=1,n.connect=function(i,u,c,f){Et(0),this.W=i,this.H=u||{},c&&f!==void 0&&(this.H.OSID=c,this.H.OAID=f),this.F=this.X,this.J=fo(this,null,this.W),zn(this)};function es(i){if(so(i),i.I==3){var u=i.V++,c=Pt(i.J);if(Y(c,"SID",i.M),Y(c,"RID",u),Y(c,"TYPE","terminate"),an(i,c),u=new qt(i,i.j,u),u.M=2,u.A=Bn(Pt(c)),c=!1,a.navigator&&a.navigator.sendBeacon)try{c=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!c&&a.Image&&(new Image().src=u.A,c=!0),c||(u.g=mo(u.j,null),u.g.ea(u.A)),u.F=Date.now(),Un(u)}ho(i)}function $n(i){i.g&&(rs(i),i.g.cancel(),i.g=null)}function so(i){$n(i),i.v&&(a.clearTimeout(i.v),i.v=null),Gn(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function zn(i){if(!Bi(i.h)&&!i.m){i.m=!0;var u=i.Ea;ft||p(),dt||(ft(),dt=!0),E.add(u,i),i.D=0}}function Yc(i,u){return qi(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=u.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=We(d(i.Ea,i,u),lo(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const v=new qt(this,this.j,i);let R=this.o;if(this.U&&(R?(R=gi(R),yi(R,this.U)):R=this.U),this.u!==null||this.R||(v.J=R,R=null),this.S)t:{for(var u=0,c=0;c<this.i.length;c++){e:{var f=this.i[c];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break e}f=void 0}if(f===void 0)break;if(u+=f,u>4096){u=c;break t}if(u===4096||c===this.i.length-1){u=c+1;break t}}u=1e3}else u=1e3;u=oo(this,v,u),c=Pt(this.J),Y(c,"RID",i),Y(c,"CVER",22),this.G&&Y(c,"X-HTTP-Session-Id",this.G),an(this,c),R&&(this.R?u="headers="+Ye(Xi(R))+"&"+u:this.u&&ts(c,this.u,R)),Jr(this.h,v),this.Ra&&Y(c,"TYPE","init"),this.S?(Y(c,"$req",u),Y(c,"SID","null"),v.U=!0,Kr(v,c,null)):Kr(v,c,u),this.I=2}}else this.I==3&&(i?io(this,i):this.i.length==0||Bi(this.h)||io(this))};function io(i,u){var c;u?c=u.l:c=i.V++;const f=Pt(i.J);Y(f,"SID",i.M),Y(f,"RID",c),Y(f,"AID",i.K),an(i,f),i.u&&i.o&&ts(f,i.u,i.o),c=new qt(i,i.j,c,i.D+1),i.u===null&&(c.J=i.o),u&&(i.i=u.G.concat(i.i)),u=oo(i,c,1e3),c.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),Jr(i.h,c),Kr(c,f,u)}function an(i,u){i.H&&xn(i.H,function(c,f){Y(u,f,c)}),i.l&&xn({},function(c,f){Y(u,f,c)})}function oo(i,u,c){c=Math.min(i.i.length,c);const f=i.l?d(i.l.Ka,i.l,i):null;t:{var v=i.i;let U=-1;for(;;){const it=["count="+c];U==-1?c>0?(U=v[0].g,it.push("ofs="+U)):U=0:it.push("ofs="+U);let K=!0;for(let at=0;at<c;at++){var R=v[at].g;const bt=v[at].map;if(R-=U,R<0)U=Math.max(0,v[at].g-100),K=!1;else try{R="req"+R+"_"||"";try{var P=bt instanceof Map?bt:Object.entries(bt);for(const[ce,Gt]of P){let Ht=Gt;l(Gt)&&(Ht=jr(Gt)),it.push(R+ce+"="+encodeURIComponent(Ht))}}catch(ce){throw it.push(R+"type="+encodeURIComponent("_badmap")),ce}}catch{f&&f(bt)}}if(K){P=it.join("&");break t}}P=void 0}return i=i.i.splice(0,c),u.G=i,P}function ao(i){if(!i.g&&!i.v){i.Y=1;var u=i.Da;ft||p(),dt||(ft(),dt=!0),E.add(u,i),i.A=0}}function ns(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=We(d(i.Da,i),lo(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,uo(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=We(d(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Et(10),$n(this),uo(this))};function rs(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function uo(i){i.g=new qt(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var u=Pt(i.na);Y(u,"RID","rpc"),Y(u,"SID",i.M),Y(u,"AID",i.K),Y(u,"CI",i.F?"0":"1"),!i.F&&i.ia&&Y(u,"TO",i.ia),Y(u,"TYPE","xmlhttp"),an(i,u),i.u&&i.o&&ts(u,i.u,i.o),i.O&&(i.g.H=i.O);var c=i.g;i=i.ba,c.M=1,c.A=Bn(Pt(u)),c.u=null,c.R=!0,Mi(c,i)}n.Va=function(){this.C!=null&&(this.C=null,$n(this),ns(this),Et(19))};function Gn(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function co(i,u){var c=null;if(i.g==u){Gn(i),rs(i),i.g=null;var f=2}else if(Yr(i.h,u))c=u.G,ji(i.h,u),f=1;else return;if(i.I!=0){if(u.o)if(f==1){c=u.u?u.u.length:0,u=Date.now()-u.F;var v=i.D;f=Ln(),yt(f,new Di(f,c)),zn(i)}else ao(i);else if(v=u.m,v==3||v==0&&u.X>0||!(f==1&&Yc(i,u)||f==2&&ns(i)))switch(c&&c.length>0&&(u=i.h,u.i=u.i.concat(c)),v){case 1:ue(i,5);break;case 4:ue(i,10);break;case 3:ue(i,6);break;default:ue(i,2)}}}function lo(i,u){let c=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(c*=2),c*u}function ue(i,u){if(i.j.info("Error code "+u),u==2){var c=d(i.bb,i),f=i.Ua;const v=!f;f=new jt(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Xe(f,"https"),Bn(f),v?zc(f.toString(),c):Gc(f.toString(),c)}else Et(2);i.I=0,i.l&&i.l.pa(u),ho(i),so(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),Et(2)):(this.j.info("Failed to ping google.com"),Et(1))};function ho(i){if(i.I=0,i.ja=[],i.l){const u=$i(i.h);(u.length!=0||i.i.length!=0)&&(N(i.ja,u),N(i.ja,i.i),i.h.i.length=0,V(i.i),i.i.length=0),i.l.oa()}}function fo(i,u,c){var f=c instanceof jt?Pt(c):new jt(c);if(f.g!="")u&&(f.g=u+"."+f.g),Ze(f,f.u);else{var v=a.location;f=v.protocol,u=u?u+"."+v.hostname:v.hostname,v=+v.port;const R=new jt(null);f&&Xe(R,f),u&&(R.g=u),v&&Ze(R,v),c&&(R.h=c),f=R}return c=i.G,u=i.wa,c&&u&&Y(f,c,u),Y(f,"VER",i.ka),an(i,f),f}function mo(i,u,c){if(u&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=i.Aa&&!i.ma?new Z(new Zr({ab:c})):new Z(i.ma),u.Fa(i.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function po(){}n=po.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Hn(){}Hn.prototype.g=function(i,u){return new At(i,u)};function At(i,u){mt.call(this),this.g=new ro(u),this.l=i,this.h=u&&u.messageUrlParams||null,i=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(i?i["X-WebChannel-Content-Type"]=u.messageContentType:i={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(i?i["X-WebChannel-Client-Profile"]=u.sa:i={"X-WebChannel-Client-Profile":u.sa}),this.g.U=i,(i=u&&u.Qb)&&!g(i)&&(this.g.u=i),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!g(u)&&(this.g.G=u,i=this.h,i!==null&&u in i&&(i=this.h,u in i&&delete i[u])),this.j=new we(this)}I(At,mt),At.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){es(this.g)},At.prototype.o=function(i){var u=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.v&&(c={},c.__data__=jr(i),i=c);u.i.push(new Mc(u.Ya++,i)),u.I==3&&zn(u)},At.prototype.N=function(){this.g.l=null,delete this.j,es(this.g),delete this.g,At.Z.N.call(this)};function go(i){$r.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var u=i.__sm__;if(u){t:{for(const c in u){i=c;break t}i=void 0}(this.i=i)&&(i=this.i,u=u!==null&&i in u?u[i]:void 0),this.data=u}else this.data=i}I(go,$r);function _o(){zr.call(this),this.status=1}I(_o,zr);function we(i){this.g=i}I(we,po),we.prototype.ra=function(){yt(this.g,"a")},we.prototype.qa=function(i){yt(this.g,new go(i))},we.prototype.pa=function(i){yt(this.g,new _o)},we.prototype.oa=function(){yt(this.g,"b")},Hn.prototype.createWebChannel=Hn.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,ja=function(){return new Hn},qa=function(){return Ln()},Ba=ie,Es={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Fn.NO_ERROR=0,Fn.TIMEOUT=8,Fn.HTTP_ERROR=6,Zn=Fn,Ni.COMPLETE="complete",Ua=Ni,Ci.EventType=He,He.OPEN="a",He.CLOSE="b",He.ERROR="c",He.MESSAGE="d",mt.prototype.listen=mt.prototype.J,cn=Ci,Z.prototype.listenOnce=Z.prototype.K,Z.prototype.getLastError=Z.prototype.Ha,Z.prototype.getLastErrorCode=Z.prototype.ya,Z.prototype.getStatus=Z.prototype.ca,Z.prototype.getResponseJson=Z.prototype.La,Z.prototype.getResponseText=Z.prototype.la,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Fa,Fa=Z}).apply(typeof Wn<"u"?Wn:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}gt.UNAUTHENTICATED=new gt(null),gt.GOOGLE_CREDENTIALS=new gt("google-credentials-uid"),gt.FIRST_PARTY=new gt("first-party-uid"),gt.MOCK_USER=new gt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Be="12.9.0";function Lh(n){Be=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de=new Na("@firebase/firestore");function Re(){return de.logLevel}function D(n,...t){if(de.logLevel<=$.DEBUG){const e=t.map(Us);de.debug(`Firestore (${Be}): ${n}`,...e)}}function Ut(n,...t){if(de.logLevel<=$.ERROR){const e=t.map(Us);de.error(`Firestore (${Be}): ${n}`,...e)}}function me(n,...t){if(de.logLevel<=$.WARN){const e=t.map(Us);de.warn(`Firestore (${Be}): ${n}`,...e)}}function Us(n){if(typeof n=="string")return n;try{return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,$a(n,r,e)}function $a(n,t,e){let r=`FIRESTORE (${Be}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Ut(r),new Error(r)}function G(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||$a(t,s,r)}function F(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class b extends Ue{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Fh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(gt.UNAUTHENTICATED))}shutdown(){}}class Uh{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Bh{constructor(t){this.t=t,this.currentUser=gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){G(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new Mt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Mt,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},l=h=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>l(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Mt)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(G(typeof r.accessToken=="string",31837,{l:r}),new za(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return G(t===null||typeof t=="string",2055,{h:t}),new gt(t)}}class qh{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=gt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class jh{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new qh(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(gt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class bo{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class $h{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Eh(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){G(this.o===void 0,3512);const r=o=>{o.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,D("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const s=o=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new bo(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(G(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new bo(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zh(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=zh(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function B(n,t){return n<t?-1:n>t?1:0}function Ts(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),o=t.charAt(r);if(s!==o)return cs(s)===cs(o)?B(s,o):cs(s)?1:-1}return B(n.length,t.length)}const Gh=55296,Hh=57343;function cs(n){const t=n.charCodeAt(0);return t>=Gh&&t<=Hh}function xe(n,t,e){return n.length===t.length&&n.every((r,s)=>e(r,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Do="__name__";class Dt{constructor(t,e,r){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&M(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Dt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Dt?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=Dt.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return B(t.length,e.length)}static compareSegments(t,e){const r=Dt.isNumericId(t),s=Dt.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?Dt.extractNumericId(t).compare(Dt.extractNumericId(e)):Ts(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Yt.fromString(t.substring(4,t.length-2))}}class Q extends Dt{construct(t,e,r){return new Q(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new b(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(s=>s.length>0))}return new Q(e)}static emptyPath(){return new Q([])}}const Kh=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class lt extends Dt{construct(t,e,r){return new lt(t,e,r)}static isValidIdentifier(t){return Kh.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),lt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Do}static keyField(){return new lt([Do])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new b(S.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new b(S.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new b(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(o(),s++)}if(o(),a)throw new b(S.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new lt(e)}static emptyPath(){return new lt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(t){this.path=t}static fromPath(t){return new x(Q.fromString(t))}static fromName(t){return new x(Q.fromString(t).popFirst(5))}static empty(){return new x(Q.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Q.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Q.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new x(new Q(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(n,t,e){if(!e)throw new b(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Wh(n,t,e,r){if(t===!0&&r===!0)throw new b(S.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function No(n){if(!x.isDocumentKey(n))throw new b(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ko(n){if(x.isDocumentKey(n))throw new b(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ha(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Tr(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":M(12329,{type:typeof n})}function pe(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new b(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Tr(n);throw new b(S.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(n,t){const e={typeString:n};return t&&(e.value=t),e}function Cn(n,t){if(!Ha(n))throw new b(S.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new b(S.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xo=-62135596800,Oo=1e6;class J{static now(){return J.fromMillis(Date.now())}static fromDate(t){return J.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*Oo);return new J(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new b(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new b(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<xo)throw new b(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new b(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Oo}_compareTo(t){return this.seconds===t.seconds?B(this.nanoseconds,t.nanoseconds):B(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:J._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Cn(t,J._jsonSchema))return new J(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-xo;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}J._jsonSchemaVersion="firestore/timestamp/1.0",J._jsonSchema={type:rt("string",J._jsonSchemaVersion),seconds:rt("number"),nanoseconds:rt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static fromTimestamp(t){return new L(t)}static min(){return new L(new J(0,0))}static max(){return new L(new J(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn=-1;function Qh(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=L.fromTimestamp(r===1e9?new J(e+1,0):new J(e,r));return new Xt(s,x.empty(),t)}function Yh(n){return new Xt(n.readTime,n.key,Tn)}class Xt{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Xt(L.min(),x.empty(),Tn)}static max(){return new Xt(L.max(),x.empty(),Tn)}}function Jh(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=x.comparator(n.documentKey,t.documentKey),e!==0?e:B(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Zh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qe(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==Xh)throw n;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new C((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof C?e:C.resolve(e)}catch(e){return C.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):C.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):C.reject(e)}static resolve(t){return new C((e,r)=>{e(t)})}static reject(t){return new C((e,r)=>{r(t)})}static waitFor(t){return new C((e,r)=>{let s=0,o=0,a=!1;t.forEach(l=>{++s,l.next(()=>{++o,a&&o===s&&e()},h=>r(h))}),a=!0,o===s&&e()})}static or(t){let e=C.resolve(!1);for(const r of t)e=e.next(s=>s?C.resolve(s):r());return e}static forEach(t,e){const r=[];return t.forEach((s,o)=>{r.push(e.call(this,s,o))}),this.waitFor(r)}static mapArray(t,e){return new C((r,s)=>{const o=t.length,a=new Array(o);let l=0;for(let h=0;h<o;h++){const d=h;e(t[d]).next(m=>{a[d]=m,++l,l===o&&r(a)},m=>s(m))}})}static doWhile(t,e){return new C((r,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):r()};o()})}}function tf(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function je(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Ir.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qs=-1;function vr(n){return n==null}function cr(n){return n===0&&1/n==-1/0}function ef(n){return typeof n=="number"&&Number.isInteger(n)&&!cr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka="";function nf(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Mo(t)),t=rf(n.get(e),t);return Mo(t)}function rf(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case Ka:e+="";break;default:e+=o}}return e}function Mo(n){return n+Ka+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function _e(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Wa(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(t,e){this.comparator=t,this.root=e||ct.EMPTY}insert(t,e){return new X(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ct.BLACK,null,null))}remove(t){return new X(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ct.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Qn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Qn(this.root,t,this.comparator,!1)}getReverseIterator(){return new Qn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Qn(this.root,t,this.comparator,!0)}}class Qn{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ct{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??ct.RED,this.left=s??ct.EMPTY,this.right=o??ct.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new ct(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ct.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return ct.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ct.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ct.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}}ct.EMPTY=null,ct.RED=!0,ct.BLACK=!1;ct.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new ct(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(t){this.comparator=t,this.data=new X(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Fo(this.data.getIterator())}getIteratorFrom(t){return new Fo(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof ot)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new ot(this.comparator);return e.data=t,e}}class Fo{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t){this.fields=t,t.sort(lt.comparator)}static empty(){return new St([])}unionWith(t){let e=new ot(lt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new St(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return xe(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Qa("Invalid base64 string: "+o):o}}(t);return new ht(e)}static fromUint8Array(t){const e=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(t);return new ht(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return B(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const sf=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Zt(n){if(G(!!n,39018),typeof n=="string"){let t=0;const e=sf.exec(n);if(G(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:tt(n.seconds),nanos:tt(n.nanos)}}function tt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function te(n){return typeof n=="string"?ht.fromBase64String(n):ht.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya="server_timestamp",Ja="__type__",Xa="__previous_value__",Za="__local_write_time__";function js(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Ja])==null?void 0:r.stringValue)===Ya}function Ar(n){const t=n.mapValue.fields[Xa];return js(t)?Ar(t):t}function In(n){const t=Zt(n.mapValue.fields[Za].timestampValue);return new J(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(t,e,r,s,o,a,l,h,d,m,I){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=d,this.isUsingEmulator=m,this.apiKey=I}}const lr="(default)";class vn{constructor(t,e){this.projectId=t,this.database=e||lr}static empty(){return new vn("","")}get isDefaultDatabase(){return this.database===lr}isEqual(t){return t instanceof vn&&t.projectId===this.projectId&&t.database===this.database}}function af(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new b(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new vn(n.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tu="__type__",uf="__max__",Yn={mapValue:{}},eu="__vector__",hr="value";function ee(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?js(n)?4:lf(n)?9007199254740991:cf(n)?10:11:M(28295,{value:n})}function Ot(n,t){if(n===t)return!0;const e=ee(n);if(e!==ee(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return In(n).isEqual(In(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=Zt(s.timestampValue),l=Zt(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,o){return te(s.bytesValue).isEqual(te(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,o){return tt(s.geoPointValue.latitude)===tt(o.geoPointValue.latitude)&&tt(s.geoPointValue.longitude)===tt(o.geoPointValue.longitude)}(n,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return tt(s.integerValue)===tt(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=tt(s.doubleValue),l=tt(o.doubleValue);return a===l?cr(a)===cr(l):isNaN(a)&&isNaN(l)}return!1}(n,t);case 9:return xe(n.arrayValue.values||[],t.arrayValue.values||[],Ot);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},l=o.mapValue.fields||{};if(Lo(a)!==Lo(l))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Ot(a[h],l[h])))return!1;return!0}(n,t);default:return M(52216,{left:n})}}function An(n,t){return(n.values||[]).find(e=>Ot(e,t))!==void 0}function Oe(n,t){if(n===t)return 0;const e=ee(n),r=ee(t);if(e!==r)return B(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return B(n.booleanValue,t.booleanValue);case 2:return function(o,a){const l=tt(o.integerValue||o.doubleValue),h=tt(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1}(n,t);case 3:return Uo(n.timestampValue,t.timestampValue);case 4:return Uo(In(n),In(t));case 5:return Ts(n.stringValue,t.stringValue);case 6:return function(o,a){const l=te(o),h=te(a);return l.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){const l=o.split("/"),h=a.split("/");for(let d=0;d<l.length&&d<h.length;d++){const m=B(l[d],h[d]);if(m!==0)return m}return B(l.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){const l=B(tt(o.latitude),tt(a.latitude));return l!==0?l:B(tt(o.longitude),tt(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return Bo(n.arrayValue,t.arrayValue);case 10:return function(o,a){var w,V,N,O;const l=o.fields||{},h=a.fields||{},d=(w=l[hr])==null?void 0:w.arrayValue,m=(V=h[hr])==null?void 0:V.arrayValue,I=B(((N=d==null?void 0:d.values)==null?void 0:N.length)||0,((O=m==null?void 0:m.values)==null?void 0:O.length)||0);return I!==0?I:Bo(d,m)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===Yn.mapValue&&a===Yn.mapValue)return 0;if(o===Yn.mapValue)return 1;if(a===Yn.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),d=a.fields||{},m=Object.keys(d);h.sort(),m.sort();for(let I=0;I<h.length&&I<m.length;++I){const w=Ts(h[I],m[I]);if(w!==0)return w;const V=Oe(l[h[I]],d[m[I]]);if(V!==0)return V}return B(h.length,m.length)}(n.mapValue,t.mapValue);default:throw M(23264,{he:e})}}function Uo(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return B(n,t);const e=Zt(n),r=Zt(t),s=B(e.seconds,r.seconds);return s!==0?s:B(e.nanos,r.nanos)}function Bo(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=Oe(e[s],r[s]);if(o)return o}return B(e.length,r.length)}function Me(n){return Is(n)}function Is(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=Zt(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return te(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return x.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=Is(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${Is(e.fields[a])}`;return s+"}"}(n.mapValue):M(61005,{value:n})}function tr(n){switch(ee(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Ar(n);return t?16+tr(t):16;case 5:return 2*n.stringValue.length;case 6:return te(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,o)=>s+tr(o),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return _e(r.fields,(o,a)=>{s+=o.length+tr(a)}),s}(n.mapValue);default:throw M(13486,{value:n})}}function qo(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function vs(n){return!!n&&"integerValue"in n}function $s(n){return!!n&&"arrayValue"in n}function jo(n){return!!n&&"nullValue"in n}function $o(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function er(n){return!!n&&"mapValue"in n}function cf(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[tu])==null?void 0:r.stringValue)===eu}function mn(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return _e(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=mn(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=mn(n.arrayValue.values[e]);return t}return{...n}}function lf(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===uf}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.value=t}static empty(){return new wt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!er(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=mn(e)}setAll(t){let e=lt.emptyPath(),r={},s=[];t.forEach((a,l)=>{if(!e.isImmediateParentOf(l)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=l.popLast()}a?r[l.lastSegment()]=mn(a):s.push(l.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());er(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Ot(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];er(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){_e(e,(s,o)=>t[s]=o);for(const s of r)delete t[s]}clone(){return new wt(mn(this.value))}}function nu(n){const t=[];return _e(n.fields,(e,r)=>{const s=new lt([e]);if(er(r)){const o=nu(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)}),new St(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(t,e,r,s,o,a,l){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new _t(t,0,L.min(),L.min(),L.min(),wt.empty(),0)}static newFoundDocument(t,e,r,s){return new _t(t,1,e,L.min(),r,s,0)}static newNoDocument(t,e){return new _t(t,2,e,L.min(),L.min(),wt.empty(),0)}static newUnknownDocument(t,e){return new _t(t,3,e,L.min(),L.min(),wt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=wt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=wt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof _t&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new _t(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(t,e){this.position=t,this.inclusive=e}}function zo(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=x.comparator(x.fromName(a.referenceValue),e.key):r=Oe(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Go(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Ot(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(t,e="asc"){this.field=t,this.dir=e}}function hf(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{}class nt extends ru{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new df(t,e,r):e==="array-contains"?new gf(t,r):e==="in"?new _f(t,r):e==="not-in"?new yf(t,r):e==="array-contains-any"?new Ef(t,r):new nt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new mf(t,r):new pf(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Oe(e,this.value)):e!==null&&ee(this.value)===ee(e)&&this.matchesComparison(Oe(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Vt extends ru{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Vt(t,e)}matches(t){return su(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function su(n){return n.op==="and"}function iu(n){return ff(n)&&su(n)}function ff(n){for(const t of n.filters)if(t instanceof Vt)return!1;return!0}function As(n){if(n instanceof nt)return n.field.canonicalString()+n.op.toString()+Me(n.value);if(iu(n))return n.filters.map(t=>As(t)).join(",");{const t=n.filters.map(e=>As(e)).join(",");return`${n.op}(${t})`}}function ou(n,t){return n instanceof nt?function(r,s){return s instanceof nt&&r.op===s.op&&r.field.isEqual(s.field)&&Ot(r.value,s.value)}(n,t):n instanceof Vt?function(r,s){return s instanceof Vt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,a,l)=>o&&ou(a,s.filters[l]),!0):!1}(n,t):void M(19439)}function au(n){return n instanceof nt?function(e){return`${e.field.canonicalString()} ${e.op} ${Me(e.value)}`}(n):n instanceof Vt?function(e){return e.op.toString()+" {"+e.getFilters().map(au).join(" ,")+"}"}(n):"Filter"}class df extends nt{constructor(t,e,r){super(t,e,r),this.key=x.fromName(r.referenceValue)}matches(t){const e=x.comparator(t.key,this.key);return this.matchesComparison(e)}}class mf extends nt{constructor(t,e){super(t,"in",e),this.keys=uu("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class pf extends nt{constructor(t,e){super(t,"not-in",e),this.keys=uu("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function uu(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map(r=>x.fromName(r.referenceValue))}class gf extends nt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return $s(e)&&An(e.arrayValue,this.value)}}class _f extends nt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&An(this.value.arrayValue,e)}}class yf extends nt{constructor(t,e){super(t,"not-in",e)}matches(t){if(An(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!An(this.value.arrayValue,e)}}class Ef extends nt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!$s(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>An(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tf{constructor(t,e=null,r=[],s=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=l,this.Te=null}}function Ho(n,t=null,e=[],r=[],s=null,o=null,a=null){return new Tf(n,t,e,r,s,o,a)}function zs(n){const t=F(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>As(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),vr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>Me(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>Me(r)).join(",")),t.Te=e}return t.Te}function Gs(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!hf(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!ou(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Go(n.startAt,t.startAt)&&Go(n.endAt,t.endAt)}function ws(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(t,e=null,r=[],s=[],o=null,a="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function If(n,t,e,r,s,o,a,l){return new $e(n,t,e,r,s,o,a,l)}function Hs(n){return new $e(n)}function Ko(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function vf(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function cu(n){return n.collectionGroup!==null}function pn(n){const t=F(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ie.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ot(lt.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ie.push(new wn(o,r))}),e.has(lt.keyField().canonicalString())||t.Ie.push(new wn(lt.keyField(),r))}return t.Ie}function Nt(n){const t=F(n);return t.Ee||(t.Ee=Af(t,pn(n))),t.Ee}function Af(n,t){if(n.limitType==="F")return Ho(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new wn(s.field,o)});const e=n.endAt?new fr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new fr(n.startAt.position,n.startAt.inclusive):null;return Ho(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Rs(n,t){const e=n.filters.concat([t]);return new $e(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function wf(n,t){const e=n.explicitOrderBy.concat([t]);return new $e(n.path,n.collectionGroup,e,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function Ss(n,t,e){return new $e(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function wr(n,t){return Gs(Nt(n),Nt(t))&&n.limitType===t.limitType}function lu(n){return`${zs(Nt(n))}|lt:${n.limitType}`}function Se(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(s=>au(s)).join(", ")}]`),vr(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(s=>Me(s)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(s=>Me(s)).join(",")),`Target(${r})`}(Nt(n))}; limitType=${n.limitType})`}function Rr(n,t){return t.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):x.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,s){for(const o of pn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,t)&&function(r,s){return!(r.startAt&&!function(a,l,h){const d=zo(a,l,h);return a.inclusive?d<=0:d<0}(r.startAt,pn(r),s)||r.endAt&&!function(a,l,h){const d=zo(a,l,h);return a.inclusive?d>=0:d>0}(r.endAt,pn(r),s))}(n,t)}function Rf(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function hu(n){return(t,e)=>{let r=!1;for(const s of pn(n)){const o=Sf(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function Sf(n,t,e){const r=n.field.isKeyField()?x.comparator(t.key,e.key):function(o,a,l){const h=a.data.field(o),d=l.data.field(o);return h!==null&&d!==null?Oe(h,d):M(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){_e(this.inner,(e,r)=>{for(const[s,o]of r)t(s,o)})}isEmpty(){return Wa(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cf=new X(x.comparator);function Bt(){return Cf}const fu=new X(x.comparator);function ln(...n){let t=fu;for(const e of n)t=t.insert(e.key,e);return t}function du(n){let t=fu;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function he(){return gn()}function mu(){return gn()}function gn(){return new ye(n=>n.toString(),(n,t)=>n.isEqual(t))}const Vf=new X(x.comparator),Pf=new ot(x.comparator);function q(...n){let t=Pf;for(const e of n)t=t.add(e);return t}const bf=new ot(B);function Df(){return bf}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ks(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:cr(t)?"-0":t}}function pu(n){return{integerValue:""+n}}function Nf(n,t){return ef(t)?pu(t):Ks(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(){this._=void 0}}function kf(n,t,e){return n instanceof dr?function(s,o){const a={fields:{[Ja]:{stringValue:Ya},[Za]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&js(o)&&(o=Ar(o)),o&&(a.fields[Xa]=o),{mapValue:a}}(e,t):n instanceof Rn?_u(n,t):n instanceof Sn?yu(n,t):function(s,o){const a=gu(s,o),l=Wo(a)+Wo(s.Ae);return vs(a)&&vs(s.Ae)?pu(l):Ks(s.serializer,l)}(n,t)}function xf(n,t,e){return n instanceof Rn?_u(n,t):n instanceof Sn?yu(n,t):e}function gu(n,t){return n instanceof mr?function(r){return vs(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class dr extends Sr{}class Rn extends Sr{constructor(t){super(),this.elements=t}}function _u(n,t){const e=Eu(t);for(const r of n.elements)e.some(s=>Ot(s,r))||e.push(r);return{arrayValue:{values:e}}}class Sn extends Sr{constructor(t){super(),this.elements=t}}function yu(n,t){let e=Eu(t);for(const r of n.elements)e=e.filter(s=>!Ot(s,r));return{arrayValue:{values:e}}}class mr extends Sr{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function Wo(n){return tt(n.integerValue||n.doubleValue)}function Eu(n){return $s(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Of(n,t){return n.field.isEqual(t.field)&&function(r,s){return r instanceof Rn&&s instanceof Rn||r instanceof Sn&&s instanceof Sn?xe(r.elements,s.elements,Ot):r instanceof mr&&s instanceof mr?Ot(r.Ae,s.Ae):r instanceof dr&&s instanceof dr}(n.transform,t.transform)}class Mf{constructor(t,e){this.version=t,this.transformResults=e}}class Lt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Lt}static exists(t){return new Lt(void 0,t)}static updateTime(t){return new Lt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function nr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Cr{}function Tu(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new vu(n.key,Lt.none()):new Vn(n.key,n.data,Lt.none());{const e=n.data,r=wt.empty();let s=new ot(lt.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new Ee(n.key,r,new St(s.toArray()),Lt.none())}}function Lf(n,t,e){n instanceof Vn?function(s,o,a){const l=s.value.clone(),h=Yo(s.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,t,e):n instanceof Ee?function(s,o,a){if(!nr(s.precondition,o))return void o.convertToUnknownDocument(a.version);const l=Yo(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Iu(s)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function _n(n,t,e,r){return n instanceof Vn?function(o,a,l,h){if(!nr(o.precondition,a))return l;const d=o.value.clone(),m=Jo(o.fieldTransforms,h,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,t,e,r):n instanceof Ee?function(o,a,l,h){if(!nr(o.precondition,a))return l;const d=Jo(o.fieldTransforms,h,a),m=a.data;return m.setAll(Iu(o)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(I=>I.field))}(n,t,e,r):function(o,a,l){return nr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,t,e)}function Ff(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=gu(r.transform,s||null);o!=null&&(e===null&&(e=wt.empty()),e.set(r.field,o))}return e||null}function Qo(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&xe(r,s,(o,a)=>Of(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Vn extends Cr{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ee extends Cr{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Iu(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function Yo(n,t,e){const r=new Map;G(n.length===e.length,32656,{Ve:e.length,de:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,l=t.data.field(o.field);r.set(o.field,xf(a,l,e[s]))}return r}function Jo(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,kf(o,a,t))}return r}class vu extends Cr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Uf extends Cr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&Lf(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=_n(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=_n(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=mu();return this.mutations.forEach(s=>{const o=t.get(s.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=e.has(s.key)?null:l;const h=Tu(a,l);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(L.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),q())}isEqual(t){return this.batchId===t.batchId&&xe(this.mutations,t.mutations,(e,r)=>Qo(e,r))&&xe(this.baseMutations,t.baseMutations,(e,r)=>Qo(e,r))}}class Ws{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){G(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=function(){return Vf}();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new Ws(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jf{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var et,j;function $f(n){switch(n){case S.OK:return M(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return M(15467,{code:n})}}function Au(n){if(n===void 0)return Ut("GRPC error has no .code"),S.UNKNOWN;switch(n){case et.OK:return S.OK;case et.CANCELLED:return S.CANCELLED;case et.UNKNOWN:return S.UNKNOWN;case et.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case et.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case et.INTERNAL:return S.INTERNAL;case et.UNAVAILABLE:return S.UNAVAILABLE;case et.UNAUTHENTICATED:return S.UNAUTHENTICATED;case et.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case et.NOT_FOUND:return S.NOT_FOUND;case et.ALREADY_EXISTS:return S.ALREADY_EXISTS;case et.PERMISSION_DENIED:return S.PERMISSION_DENIED;case et.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case et.ABORTED:return S.ABORTED;case et.OUT_OF_RANGE:return S.OUT_OF_RANGE;case et.UNIMPLEMENTED:return S.UNIMPLEMENTED;case et.DATA_LOSS:return S.DATA_LOSS;default:return M(39323,{code:n})}}(j=et||(et={}))[j.OK=0]="OK",j[j.CANCELLED=1]="CANCELLED",j[j.UNKNOWN=2]="UNKNOWN",j[j.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",j[j.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",j[j.NOT_FOUND=5]="NOT_FOUND",j[j.ALREADY_EXISTS=6]="ALREADY_EXISTS",j[j.PERMISSION_DENIED=7]="PERMISSION_DENIED",j[j.UNAUTHENTICATED=16]="UNAUTHENTICATED",j[j.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",j[j.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",j[j.ABORTED=10]="ABORTED",j[j.OUT_OF_RANGE=11]="OUT_OF_RANGE",j[j.UNIMPLEMENTED=12]="UNIMPLEMENTED",j[j.INTERNAL=13]="INTERNAL",j[j.UNAVAILABLE=14]="UNAVAILABLE",j[j.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zf(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gf=new Yt([4294967295,4294967295],0);function Xo(n){const t=zf().encode(n),e=new La;return e.update(t),new Uint8Array(e.digest())}function Zo(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Yt([e,r],0),new Yt([s,o],0)]}class Qs{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new hn(`Invalid padding: ${e}`);if(r<0)throw new hn(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new hn(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new hn(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=Yt.fromNumber(this.ge)}ye(t,e,r){let s=t.add(e.multiply(Yt.fromNumber(r)));return s.compare(Gf)===1&&(s=new Yt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Xo(t),[r,s]=Zo(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);if(!this.we(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new Qs(o,s,e);return r.forEach(l=>a.insert(l)),a}insert(t){if(this.ge===0)return;const e=Xo(t),[r,s]=Zo(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);this.be(a)}}be(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class hn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,Pn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Vr(L.min(),s,new X(B),Bt(),q())}}class Pn{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new Pn(r,e,q(),q(),q())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(t,e,r,s){this.Se=t,this.removedTargetIds=e,this.key=r,this.De=s}}class wu{constructor(t,e){this.targetId=t,this.Ce=e}}class Ru{constructor(t,e,r=ht.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class ta{constructor(){this.ve=0,this.Fe=ea(),this.Me=ht.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=q(),e=q(),r=q();return this.Fe.forEach((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:M(38017,{changeType:o})}}),new Pn(this.Me,this.xe,t,e,r)}Ke(){this.Oe=!1,this.Fe=ea()}qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}Ue(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}$e(){this.ve+=1}We(){this.ve-=1,G(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class Hf{constructor(t){this.Ge=t,this.ze=new Map,this.je=Bt(),this.He=Jn(),this.Je=Jn(),this.Ze=new X(B)}Xe(t){for(const e of t.Se)t.De&&t.De.isFoundDocument()?this.Ye(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,e=>{const r=this.nt(e);switch(t.state){case 0:this.rt(e)&&r.Le(t.resumeToken);break;case 1:r.We(),r.Ne||r.Ke(),r.Le(t.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(r.Qe(),r.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),r.Le(t.resumeToken));break;default:M(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach((r,s)=>{this.rt(s)&&e(s)})}st(t){const e=t.targetId,r=t.Ce.count,s=this.ot(e);if(s){const o=s.target;if(ws(o))if(r===0){const a=new x(o.path);this.et(e,a,_t.newNoDocument(a,L.min()))}else G(r===1,20013,{expectedCount:r});else{const a=this._t(e);if(a!==r){const l=this.ut(t),h=l?this.ct(l,t,a):1;if(h!==0){this.it(e);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,d)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,l;try{a=te(r).toUint8Array()}catch(h){if(h instanceof Qa)return me("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new Qs(a,s,o)}catch(h){return me(h instanceof hn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.ge===0?null:l}ct(t,e,r){return e.Ce.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.Ge.getRemoteKeysForTarget(e);let s=0;return r.forEach(o=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.et(e,o,null),s++)}),s}Tt(t){const e=new Map;this.ze.forEach((o,a)=>{const l=this.ot(a);if(l){if(o.current&&ws(l.target)){const h=new x(l.target.path);this.It(h).has(a)||this.Et(a,h)||this.et(a,h,_t.newNoDocument(h,t))}o.Be&&(e.set(a,o.ke()),o.Ke())}});let r=q();this.Je.forEach((o,a)=>{let l=!0;a.forEachWhile(h=>{const d=this.ot(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(o))}),this.je.forEach((o,a)=>a.setReadTime(t));const s=new Vr(t,e,this.Ze,this.je,r);return this.je=Bt(),this.He=Jn(),this.Je=Jn(),this.Ze=new X(B),s}Ye(t,e){if(!this.rt(t))return;const r=this.Et(t,e.key)?2:0;this.nt(t).qe(e.key,r),this.je=this.je.insert(e.key,e),this.He=this.He.insert(e.key,this.It(e.key).add(t)),this.Je=this.Je.insert(e.key,this.Rt(e.key).add(t))}et(t,e,r){if(!this.rt(t))return;const s=this.nt(t);this.Et(t,e)?s.qe(e,1):s.Ue(e),this.Je=this.Je.insert(e,this.Rt(e).delete(t)),this.Je=this.Je.insert(e,this.Rt(e).add(t)),r&&(this.je=this.je.insert(e,r))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.nt(t).$e()}nt(t){let e=this.ze.get(t);return e||(e=new ta,this.ze.set(t,e)),e}Rt(t){let e=this.Je.get(t);return e||(e=new ot(B),this.Je=this.Je.insert(t,e)),e}It(t){let e=this.He.get(t);return e||(e=new ot(B),this.He=this.He.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||D("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new ta),this.Ge.getRemoteKeysForTarget(t).forEach(e=>{this.et(t,e,null)})}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function Jn(){return new X(x.comparator)}function ea(){return new X(x.comparator)}const Kf={asc:"ASCENDING",desc:"DESCENDING"},Wf={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Qf={and:"AND",or:"OR"};class Yf{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Cs(n,t){return n.useProto3Json||vr(t)?t:{value:t}}function pr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Su(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Jf(n,t){return pr(n,t.toTimestamp())}function kt(n){return G(!!n,49232),L.fromTimestamp(function(e){const r=Zt(e);return new J(r.seconds,r.nanos)}(n))}function Ys(n,t){return Vs(n,t).canonicalString()}function Vs(n,t){const e=function(s){return new Q(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function Cu(n){const t=Q.fromString(n);return G(Nu(t),10190,{key:t.toString()}),t}function Ps(n,t){return Ys(n.databaseId,t.path)}function ls(n,t){const e=Cu(t);if(e.get(1)!==n.databaseId.projectId)throw new b(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new b(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new x(Pu(e))}function Vu(n,t){return Ys(n.databaseId,t)}function Xf(n){const t=Cu(n);return t.length===4?Q.emptyPath():Pu(t)}function bs(n){return new Q(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Pu(n){return G(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function na(n,t,e){return{name:Ps(n,t),fields:e.value.mapValue.fields}}function Zf(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:M(39313,{state:d})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=function(d,m){return d.useProto3Json?(G(m===void 0||typeof m=="string",58123),ht.fromBase64String(m||"")):(G(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),ht.fromUint8Array(m||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&function(d){const m=d.code===void 0?S.UNKNOWN:Au(d.code);return new b(m,d.message||"")}(a);e=new Ru(r,s,o,l||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=ls(n,r.document.name),o=kt(r.document.updateTime),a=r.document.createTime?kt(r.document.createTime):L.min(),l=new wt({mapValue:{fields:r.document.fields}}),h=_t.newFoundDocument(s,o,a,l),d=r.targetIds||[],m=r.removedTargetIds||[];e=new rr(d,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=ls(n,r.document),o=r.readTime?kt(r.readTime):L.min(),a=_t.newNoDocument(s,o),l=r.removedTargetIds||[];e=new rr([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=ls(n,r.document),o=r.removedTargetIds||[];e=new rr([],o,s,null)}else{if(!("filter"in t))return M(11601,{Vt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new jf(s,o),l=r.targetId;e=new wu(l,a)}}return e}function td(n,t){let e;if(t instanceof Vn)e={update:na(n,t.key,t.value)};else if(t instanceof vu)e={delete:Ps(n,t.key)};else if(t instanceof Ee)e={update:na(n,t.key,t.data),updateMask:cd(t.fieldMask)};else{if(!(t instanceof Uf))return M(16599,{dt:t.type});e={verify:Ps(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,a){const l=a.transform;if(l instanceof dr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Rn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Sn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof mr)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw M(20930,{transform:a.transform})}(0,r))),t.precondition.isNone||(e.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:Jf(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:M(27497)}(n,t.precondition)),e}function ed(n,t){return n&&n.length>0?(G(t!==void 0,14353),n.map(e=>function(s,o){let a=s.updateTime?kt(s.updateTime):kt(o);return a.isEqual(L.min())&&(a=kt(o)),new Mf(a,s.transformResults||[])}(e,t))):[]}function nd(n,t){return{documents:[Vu(n,t.path)]}}function rd(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Vu(n,s);const o=function(d){if(d.length!==0)return Du(Vt.create(d,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(d){if(d.length!==0)return d.map(m=>function(w){return{field:Ce(w.field),direction:od(w.dir)}}(m))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const l=Cs(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{ft:e,parent:s}}function sd(n){let t=Xf(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){G(r===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=function(I){const w=bu(I);return w instanceof Vt&&iu(w)?w.getFilters():[w]}(e.where));let a=[];e.orderBy&&(a=function(I){return I.map(w=>function(N){return new wn(Ve(N.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(w))}(e.orderBy));let l=null;e.limit&&(l=function(I){let w;return w=typeof I=="object"?I.value:I,vr(w)?null:w}(e.limit));let h=null;e.startAt&&(h=function(I){const w=!!I.before,V=I.values||[];return new fr(V,w)}(e.startAt));let d=null;return e.endAt&&(d=function(I){const w=!I.before,V=I.values||[];return new fr(V,w)}(e.endAt)),If(t,s,a,o,l,"F",h,d)}function id(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function bu(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Ve(e.unaryFilter.field);return nt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Ve(e.unaryFilter.field);return nt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ve(e.unaryFilter.field);return nt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ve(e.unaryFilter.field);return nt.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(n):n.fieldFilter!==void 0?function(e){return nt.create(Ve(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Vt.create(e.compositeFilter.filters.map(r=>bu(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(e.compositeFilter.op))}(n):M(30097,{filter:n})}function od(n){return Kf[n]}function ad(n){return Wf[n]}function ud(n){return Qf[n]}function Ce(n){return{fieldPath:n.canonicalString()}}function Ve(n){return lt.fromServerFormat(n.fieldPath)}function Du(n){return n instanceof nt?function(e){if(e.op==="=="){if($o(e.value))return{unaryFilter:{field:Ce(e.field),op:"IS_NAN"}};if(jo(e.value))return{unaryFilter:{field:Ce(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if($o(e.value))return{unaryFilter:{field:Ce(e.field),op:"IS_NOT_NAN"}};if(jo(e.value))return{unaryFilter:{field:Ce(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ce(e.field),op:ad(e.op),value:e.value}}}(n):n instanceof Vt?function(e){const r=e.getFilters().map(s=>Du(s));return r.length===1?r[0]:{compositeFilter:{op:ud(e.op),filters:r}}}(n):M(54877,{filter:n})}function cd(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Nu(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function ku(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(t,e,r,s,o=L.min(),a=L.min(),l=ht.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new Kt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Kt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Kt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Kt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{constructor(t){this.yt=t}}function hd(n){const t=sd({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ss(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(){this.Sn=new dd}addToCollectionParentIndex(t,e){return this.Sn.add(e),C.resolve()}getCollectionParents(t,e){return C.resolve(this.Sn.getEntries(e))}addFieldIndex(t,e){return C.resolve()}deleteFieldIndex(t,e){return C.resolve()}deleteAllFieldIndexes(t){return C.resolve()}createTargetIndexes(t,e){return C.resolve()}getDocumentsMatchingTarget(t,e){return C.resolve(null)}getIndexType(t,e){return C.resolve(0)}getFieldIndexes(t,e){return C.resolve([])}getNextCollectionGroupToUpdate(t){return C.resolve(null)}getMinOffset(t,e){return C.resolve(Xt.min())}getMinOffsetFromCollectionGroup(t,e){return C.resolve(Xt.min())}updateCollectionGroup(t,e,r){return C.resolve()}updateIndexEntries(t,e){return C.resolve()}}class dd{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new ot(Q.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new ot(Q.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},xu=41943040;class vt{static withCacheSize(t){return new vt(t,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vt.DEFAULT_COLLECTION_PERCENTILE=10,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,vt.DEFAULT=new vt(xu,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),vt.DISABLED=new vt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(t){this.sr=t}next(){return this.sr+=2,this.sr}static _r(){return new Le(0)}static ar(){return new Le(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa="LruGarbageCollector",md=1048576;function ia([n,t],[e,r]){const s=B(n,e);return s===0?B(t,r):s}class pd{constructor(t){this.Pr=t,this.buffer=new ot(ia),this.Tr=0}Ir(){return++this.Tr}Er(t){const e=[t,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();ia(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class gd{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(t){D(sa,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){je(e)?D(sa,"Ignoring IndexedDB error during garbage collection: ",e):await qe(e)}await this.Ar(3e5)})}}class _d{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.dr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return C.resolve(Ir.ce);const r=new pd(e);return this.Vr.forEachTarget(t,s=>r.Er(s.sequenceNumber)).next(()=>this.Vr.mr(t,s=>r.Er(s))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(ra)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ra):this.gr(t,e))}getCacheSize(t){return this.Vr.getCacheSize(t)}gr(t,e){let r,s,o,a,l,h,d;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(I=>(I>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${I}`),s=this.params.maximumSequenceNumbersToCollect):s=I,a=Date.now(),this.nthSequenceNumber(t,s))).next(I=>(r=I,l=Date.now(),this.removeTargets(t,r,e))).next(I=>(o=I,h=Date.now(),this.removeOrphanedDocuments(t,r))).next(I=>(d=Date.now(),Re()<=$.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${I} documents in `+(d-h)+`ms
Total Duration: ${d-m}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:I})))}}function yd(n,t){return new _d(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed{constructor(){this.changes=new ye(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,_t.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?C.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(r!==null&&_n(r.mutation,s,St.empty(),J.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,q()).next(()=>r))}getLocalViewOfDocuments(t,e,r=q()){const s=he();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,r).next(o=>{let a=ln();return o.forEach((l,h)=>{a=a.insert(l,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const r=he();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,q()))}populateOverlays(t,e,r){const s=[];return r.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((a,l)=>{e.set(a,l)})})}computeViews(t,e,r,s){let o=Bt();const a=gn(),l=function(){return gn()}();return e.forEach((h,d)=>{const m=r.get(d.key);s.has(d.key)&&(m===void 0||m.mutation instanceof Ee)?o=o.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),_n(m.mutation,d,m.mutation.getFieldMask(),J.now())):a.set(d.key,St.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((d,m)=>a.set(d,m)),e.forEach((d,m)=>l.set(d,new Td(m,a.get(d)??null))),l))}recalculateAndSaveOverlays(t,e){const r=gn();let s=new X((a,l)=>a-l),o=q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const l of a)l.keys().forEach(h=>{const d=e.get(h);if(d===null)return;let m=r.get(h)||St.empty();m=l.applyToLocalView(d,m),r.set(h,m);const I=(s.get(l.batchId)||q()).add(h);s=s.insert(l.batchId,I)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),d=h.key,m=h.value,I=mu();m.forEach(w=>{if(!o.has(w)){const V=Tu(e.get(w),r.get(w));V!==null&&I.set(w,V),o=o.add(w)}}),a.push(this.documentOverlayCache.saveOverlays(t,d,I))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,s){return vf(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):cu(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):C.resolve(he());let l=Tn,h=o;return a.next(d=>C.forEach(d,(m,I)=>(l<I.largestBatchId&&(l=I.largestBatchId),o.get(m)?C.resolve():this.remoteDocumentCache.getEntry(t,m).next(w=>{h=h.insert(m,w)}))).next(()=>this.populateOverlays(t,d,o)).next(()=>this.computeViews(t,h,d,q())).next(m=>({batchId:l,changes:du(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new x(e)).next(r=>{let s=ln();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=ln();return this.indexManager.getCollectionParents(t,o).next(l=>C.forEach(l,h=>{const d=function(I,w){return new $e(w,null,I.explicitOrderBy.slice(),I.filters.slice(),I.limit,I.limitType,I.startAt,I.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,r,s).next(m=>{m.forEach((I,w)=>{a=a.insert(I,w)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s))).next(a=>{o.forEach((h,d)=>{const m=d.getKey();a.get(m)===null&&(a=a.insert(m,_t.newInvalidDocument(m)))});let l=ln();return a.forEach((h,d)=>{const m=o.get(h);m!==void 0&&_n(m.mutation,d,St.empty(),J.now()),Rr(e,d)&&(l=l.insert(h,d))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd{constructor(t){this.serializer=t,this.Nr=new Map,this.Br=new Map}getBundleMetadata(t,e){return C.resolve(this.Nr.get(e))}saveBundleMetadata(t,e){return this.Nr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:kt(s.createTime)}}(e)),C.resolve()}getNamedQuery(t,e){return C.resolve(this.Br.get(e))}saveNamedQuery(t,e){return this.Br.set(e.name,function(s){return{name:s.name,query:hd(s.bundledQuery),readTime:kt(s.readTime)}}(e)),C.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(){this.overlays=new X(x.comparator),this.Lr=new Map}getOverlay(t,e){return C.resolve(this.overlays.get(e))}getOverlays(t,e){const r=he();return C.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((s,o)=>{this.bt(t,e,o)}),C.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Lr.delete(r)),C.resolve()}getOverlaysForCollection(t,e,r){const s=he(),o=e.length+1,a=new x(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const h=l.getNext().value,d=h.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return C.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new X((d,m)=>d-m);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>r){let m=o.get(d.largestBatchId);m===null&&(m=he(),o=o.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const l=he(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((d,m)=>l.set(d,m)),!(l.size()>=s)););return C.resolve(l)}bt(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new qf(e,r));let o=this.Lr.get(e);o===void 0&&(o=q(),this.Lr.set(e,o)),this.Lr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wd{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(t){return C.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,C.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(){this.kr=new ot(ut.Kr),this.qr=new ot(ut.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(t,e){const r=new ut(t,e);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Wr(new ut(t,e))}Qr(t,e){t.forEach(r=>this.removeReference(r,e))}Gr(t){const e=new x(new Q([])),r=new ut(e,t),s=new ut(e,t+1),o=[];return this.qr.forEachInRange([r,s],a=>{this.Wr(a),o.push(a.key)}),o}zr(){this.kr.forEach(t=>this.Wr(t))}Wr(t){this.kr=this.kr.delete(t),this.qr=this.qr.delete(t)}jr(t){const e=new x(new Q([])),r=new ut(e,t),s=new ut(e,t+1);let o=q();return this.qr.forEachInRange([r,s],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new ut(t,0),r=this.kr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class ut{constructor(t,e){this.key=t,this.Hr=e}static Kr(t,e){return x.comparator(t.key,e.key)||B(t.Hr,e.Hr)}static Ur(t,e){return B(t.Hr,e.Hr)||x.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Yn=1,this.Jr=new ot(ut.Kr)}checkEmpty(t){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Bf(o,e,r,s);this.mutationQueue.push(a);for(const l of s)this.Jr=this.Jr.add(new ut(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return C.resolve(a)}lookupMutationBatch(t,e){return C.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.Xr(r),o=s<0?0:s;return C.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?qs:this.Yn-1)}getAllMutationBatches(t){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new ut(e,0),s=new ut(e,Number.POSITIVE_INFINITY),o=[];return this.Jr.forEachInRange([r,s],a=>{const l=this.Zr(a.Hr);o.push(l)}),C.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new ot(B);return e.forEach(s=>{const o=new ut(s,0),a=new ut(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([o,a],l=>{r=r.add(l.Hr)})}),C.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;x.isDocumentKey(o)||(o=o.child(""));const a=new ut(new x(o),0);let l=new ot(B);return this.Jr.forEachWhile(h=>{const d=h.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(h.Hr)),!0)},a),C.resolve(this.Yr(l))}Yr(t){const e=[];return t.forEach(r=>{const s=this.Zr(r);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){G(this.ei(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return C.forEach(e.mutations,s=>{const o=new ut(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Jr=r})}nr(t){}containsKey(t,e){const r=new ut(e,0),s=this.Jr.firstAfterOrEqual(r);return C.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,C.resolve()}ei(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(t){this.ti=t,this.docs=function(){return new X(x.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ti(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return C.resolve(r?r.document.mutableCopy():_t.newInvalidDocument(e))}getEntries(t,e){let r=Bt();return e.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():_t.newInvalidDocument(s))}),C.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=Bt();const a=e.path,l=new x(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:d,value:{document:m}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Jh(Yh(m),r)<=0||(s.has(m.key)||Rr(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return C.resolve(o)}getAllFromCollectionGroup(t,e,r,s){M(9500)}ni(t,e){return C.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new Cd(this)}getSize(t){return C.resolve(this.size)}}class Cd extends Ed{constructor(t){super(),this.Mr=t}applyChanges(t){const e=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?e.push(this.Mr.addEntry(t,s)):this.Mr.removeEntry(r)}),C.waitFor(e)}getFromCache(t,e){return this.Mr.getEntry(t,e)}getAllFromCache(t,e){return this.Mr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(t){this.persistence=t,this.ri=new ye(e=>zs(e),Gs),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.ii=0,this.si=new Js,this.targetCount=0,this.oi=Le._r()}forEachTarget(t,e){return this.ri.forEach((r,s)=>e(s)),C.resolve()}getLastRemoteSnapshotVersion(t){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return C.resolve(this.ii)}allocateTargetId(t){return this.highestTargetId=this.oi.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.ii&&(this.ii=e),C.resolve()}lr(t){this.ri.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.oi=new Le(e),this.highestTargetId=e),t.sequenceNumber>this.ii&&(this.ii=t.sequenceNumber)}addTargetData(t,e){return this.lr(e),this.targetCount+=1,C.resolve()}updateTargetData(t,e){return this.lr(e),C.resolve()}removeTargetData(t,e){return this.ri.delete(e.target),this.si.Gr(e.targetId),this.targetCount-=1,C.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.ri.forEach((a,l)=>{l.sequenceNumber<=e&&r.get(l.targetId)===null&&(this.ri.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)}),C.waitFor(o).next(()=>s)}getTargetCount(t){return C.resolve(this.targetCount)}getTargetData(t,e){const r=this.ri.get(e)||null;return C.resolve(r)}addMatchingKeys(t,e,r){return this.si.$r(e,r),C.resolve()}removeMatchingKeys(t,e,r){this.si.Qr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(a=>{o.push(s.markPotentiallyOrphaned(t,a))}),C.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.si.Gr(e),C.resolve()}getMatchingKeysForTargetId(t,e){const r=this.si.jr(e);return C.resolve(r)}containsKey(t,e){return C.resolve(this.si.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{constructor(t,e){this._i={},this.overlays={},this.ai=new Ir(0),this.ui=!1,this.ui=!0,this.ci=new wd,this.referenceDelegate=t(this),this.li=new Vd(this),this.indexManager=new fd,this.remoteDocumentCache=function(s){return new Sd(s)}(r=>this.referenceDelegate.hi(r)),this.serializer=new ld(e),this.Pi=new vd(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Ad,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this._i[t.toKey()];return r||(r=new Rd(e,this.referenceDelegate),this._i[t.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(t,e,r){D("MemoryPersistence","Starting transaction:",t);const s=new Pd(this.ai.next());return this.referenceDelegate.Ti(),r(s).next(o=>this.referenceDelegate.Ii(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Ei(t,e){return C.or(Object.values(this._i).map(r=>()=>r.containsKey(t,e)))}}class Pd extends Zh{constructor(t){super(),this.currentSequenceNumber=t}}class Xs{constructor(t){this.persistence=t,this.Ri=new Js,this.Ai=null}static Vi(t){return new Xs(t)}get di(){if(this.Ai)return this.Ai;throw M(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.di.delete(r.toString()),C.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.di.add(r.toString()),C.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),C.resolve()}removeTarget(t,e){this.Ri.Gr(e.targetId).forEach(s=>this.di.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.di.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}Ti(){this.Ai=new Set}Ii(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.di,r=>{const s=x.fromPath(r);return this.mi(t,s).next(o=>{o||e.removeEntry(s,L.min())})}).next(()=>(this.Ai=null,e.apply(t)))}updateLimboDocument(t,e){return this.mi(t,e).next(r=>{r?this.di.delete(e.toString()):this.di.add(e.toString())})}hi(t){return 0}mi(t,e){return C.or([()=>C.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ei(t,e)])}}class gr{constructor(t,e){this.persistence=t,this.fi=new ye(r=>nf(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=yd(this,e)}static Vi(t,e){return new gr(t,e)}Ti(){}Ii(t){return C.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.pr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(s=>r+s))}pr(t){let e=0;return this.mr(t,r=>{e++}).next(()=>e)}mr(t,e){return C.forEach(this.fi,(r,s)=>this.wr(t,r,s).next(o=>o?C.resolve():e(s)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ni(t,a=>this.wr(t,a,e).next(l=>{l||(r++,o.removeEntry(a,L.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.fi.set(e,t.currentSequenceNumber),C.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),C.resolve()}removeReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),C.resolve()}updateLimboDocument(t,e){return this.fi.set(e,t.currentSequenceNumber),C.resolve()}hi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=tr(t.data.value)),e}wr(t,e,r){return C.or([()=>this.persistence.Ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.fi.get(e);return C.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Ts=r,this.Is=s}static Es(t,e){let r=q(),s=q();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new Zs(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return gl()?8:tf(ml())>0?6:4}()}initialize(t,e){this.fs=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.gs(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.ps(t,e,s,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new bd;return this.ys(t,e,a).next(l=>{if(o.result=l,this.As)return this.ws(t,e,a,l.size)})}).next(()=>o.result)}ws(t,e,r,s){return r.documentReadCount<this.Vs?(Re()<=$.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",Se(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),C.resolve()):(Re()<=$.DEBUG&&D("QueryEngine","Query:",Se(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(Re()<=$.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",Se(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Nt(e))):C.resolve())}gs(t,e){if(Ko(e))return C.resolve(null);let r=Nt(e);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=Ss(e,null,"F"),r=Nt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const a=q(...o);return this.fs.getDocuments(t,a).next(l=>this.indexManager.getMinOffset(t,r).next(h=>{const d=this.bs(e,l);return this.Ss(e,d,a,h.readTime)?this.gs(t,Ss(e,null,"F")):this.Ds(t,d,e,h)}))})))}ps(t,e,r,s){return Ko(e)||s.isEqual(L.min())?C.resolve(null):this.fs.getDocuments(t,r).next(o=>{const a=this.bs(e,o);return this.Ss(e,a,r,s)?C.resolve(null):(Re()<=$.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Se(e)),this.Ds(t,a,e,Qh(s,Tn)).next(l=>l))})}bs(t,e){let r=new ot(hu(t));return e.forEach((s,o)=>{Rr(t,o)&&(r=r.add(o))}),r}Ss(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}ys(t,e,r){return Re()<=$.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",Se(e)),this.fs.getDocumentsMatchingQuery(t,e,Xt.min(),r)}Ds(t,e,r,s){return this.fs.getDocumentsMatchingQuery(t,r,s).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ti="LocalStore",Nd=3e8;class kd{constructor(t,e,r,s){this.persistence=t,this.Cs=e,this.serializer=s,this.vs=new X(B),this.Fs=new ye(o=>zs(o),Gs),this.Ms=new Map,this.xs=t.getRemoteDocumentCache(),this.li=t.getTargetCache(),this.Pi=t.getBundleCache(),this.Os(r)}Os(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Id(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.vs))}}function xd(n,t,e,r){return new kd(n,t,e,r)}async function Mu(n,t){const e=F(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,e.Os(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],l=[];let h=q();for(const d of s){a.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}for(const d of o){l.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next(d=>({Ns:d,removedBatchIds:a,addedBatchIds:l}))})})}function Od(n,t){const e=F(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=t.batch.keys(),o=e.xs.newChangeBuffer({trackRemovals:!0});return function(l,h,d,m){const I=d.batch,w=I.keys();let V=C.resolve();return w.forEach(N=>{V=V.next(()=>m.getEntry(h,N)).next(O=>{const k=d.docVersions.get(N);G(k!==null,48541),O.version.compareTo(k)<0&&(I.applyToRemoteDocument(O,d),O.isValidDocument()&&(O.setReadTime(d.commitVersion),m.addEntry(O)))})}),V.next(()=>l.mutationQueue.removeMutationBatch(h,I))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let h=q();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(h=h.add(l.batch.mutations[d].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,s))})}function Lu(n){const t=F(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.li.getLastRemoteSnapshotVersion(e))}function Md(n,t){const e=F(n),r=t.snapshotVersion;let s=e.vs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.xs.newChangeBuffer({trackRemovals:!0});s=e.vs;const l=[];t.targetChanges.forEach((m,I)=>{const w=s.get(I);if(!w)return;l.push(e.li.removeMatchingKeys(o,m.removedDocuments,I).next(()=>e.li.addMatchingKeys(o,m.addedDocuments,I)));let V=w.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(I)!==null?V=V.withResumeToken(ht.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):m.resumeToken.approximateByteSize()>0&&(V=V.withResumeToken(m.resumeToken,r)),s=s.insert(I,V),function(O,k,H){return O.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=Nd?!0:H.addedDocuments.size+H.modifiedDocuments.size+H.removedDocuments.size>0}(w,V,m)&&l.push(e.li.updateTargetData(o,V))});let h=Bt(),d=q();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))}),l.push(Ld(o,a,t.documentUpdates).next(m=>{h=m.Bs,d=m.Ls})),!r.isEqual(L.min())){const m=e.li.getLastRemoteSnapshotVersion(o).next(I=>e.li.setTargetsMetadata(o,o.currentSequenceNumber,r));l.push(m)}return C.waitFor(l).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,d)).next(()=>h)}).then(o=>(e.vs=s,o))}function Ld(n,t,e){let r=q(),s=q();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=Bt();return e.forEach((l,h)=>{const d=o.get(l);h.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),h.isNoDocument()&&h.version.isEqual(L.min())?(t.removeEntry(l,h.readTime),a=a.insert(l,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(h),a=a.insert(l,h)):D(ti,"Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",h.version)}),{Bs:a,Ls:s}})}function Fd(n,t){const e=F(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=qs),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function Ud(n,t){const e=F(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return e.li.getTargetData(r,t).next(o=>o?(s=o,C.resolve(s)):e.li.allocateTargetId(r).next(a=>(s=new Kt(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.li.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=e.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.vs=e.vs.insert(r.targetId,r),e.Fs.set(t,r.targetId)),r})}async function Ds(n,t,e){const r=F(n),s=r.vs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!je(a))throw a;D(ti,`Failed to update sequence numbers for target ${t}: ${a}`)}r.vs=r.vs.remove(t),r.Fs.delete(s.target)}function oa(n,t,e){const r=F(n);let s=L.min(),o=q();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,d,m){const I=F(h),w=I.Fs.get(m);return w!==void 0?C.resolve(I.vs.get(w)):I.li.getTargetData(d,m)}(r,a,Nt(t)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(a,l.targetId).next(h=>{o=h})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,t,e?s:L.min(),e?o:q())).next(l=>(Bd(r,Rf(t),l),{documents:l,ks:o})))}function Bd(n,t,e){let r=n.Ms.get(t)||L.min();e.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.Ms.set(t,r)}class aa{constructor(){this.activeTargetIds=Df()}Qs(t){this.activeTargetIds=this.activeTargetIds.add(t)}Gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class qd{constructor(){this.vo=new aa,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.vo.Qs(t),this.Fo[t]||"not-current"}updateQueryState(t,e,r){this.Fo[t]=e}removeLocalQueryTarget(t){this.vo.Gs(t)}isLocalQueryTarget(t){return this.vo.activeTargetIds.has(t)}clearQueryState(t){delete this.Fo[t]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(t){return this.vo.activeTargetIds.has(t)}start(){return this.vo=new aa,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jd{Mo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua="ConnectivityMonitor";class ca{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(t){this.Lo.push(t)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){D(ua,"Network connectivity changed: AVAILABLE");for(const t of this.Lo)t(0)}Bo(){D(ua,"Network connectivity changed: UNAVAILABLE");for(const t of this.Lo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xn=null;function Ns(){return Xn===null?Xn=function(){return 268435456+Math.round(2147483648*Math.random())}():Xn++,"0x"+Xn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hs="RestConnection",$d={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class zd{get Ko(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=e+"://"+t.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===lr?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(t,e,r,s,o){const a=Ns(),l=this.Qo(t,e.toUriEncodedString());D(hs,`Sending RPC '${t}' ${a}:`,l,r);const h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(h,s,o);const{host:d}=new URL(l),m=Ls(d);return this.zo(t,l,h,r,m).then(I=>(D(hs,`Received RPC '${t}' ${a}: `,I),I),I=>{throw me(hs,`RPC '${t}' ${a} failed with error: `,I,"url: ",l,"request:",r),I})}jo(t,e,r,s,o,a){return this.Wo(t,e,r,s,o)}Go(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Be}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,o)=>t[o]=s),r&&r.headers.forEach((s,o)=>t[o]=s)}Qo(t,e){const r=$d[t];let s=`${this.qo}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(t){this.Ho=t.Ho,this.Jo=t.Jo}Zo(t){this.Xo=t}Yo(t){this.e_=t}t_(t){this.n_=t}onMessage(t){this.r_=t}close(){this.Jo()}send(t){this.Ho(t)}i_(){this.Xo()}s_(){this.e_()}o_(t){this.n_(t)}__(t){this.r_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt="WebChannelConnection",un=(n,t,e)=>{n.listen(t,r=>{try{e(r)}catch(s){setTimeout(()=>{throw s},0)}})};class be extends zd{constructor(t){super(t),this.a_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static u_(){if(!be.c_){const t=qa();un(t,Ba.STAT_EVENT,e=>{e.stat===Es.PROXY?D(pt,"STAT_EVENT: detected buffering proxy"):e.stat===Es.NOPROXY&&D(pt,"STAT_EVENT: detected no buffering proxy")}),be.c_=!0}}zo(t,e,r,s,o){const a=Ns();return new Promise((l,h)=>{const d=new Fa;d.setWithCredentials(!0),d.listenOnce(Ua.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Zn.NO_ERROR:const I=d.getResponseJson();D(pt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(I)),l(I);break;case Zn.TIMEOUT:D(pt,`RPC '${t}' ${a} timed out`),h(new b(S.DEADLINE_EXCEEDED,"Request time out"));break;case Zn.HTTP_ERROR:const w=d.getStatus();if(D(pt,`RPC '${t}' ${a} failed with status:`,w,"response text:",d.getResponseText()),w>0){let V=d.getResponseJson();Array.isArray(V)&&(V=V[0]);const N=V==null?void 0:V.error;if(N&&N.status&&N.message){const O=function(H){const z=H.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(z)>=0?z:S.UNKNOWN}(N.status);h(new b(O,N.message))}else h(new b(S.UNKNOWN,"Server responded with status "+d.getStatus()))}else h(new b(S.UNAVAILABLE,"Connection failed."));break;default:M(9055,{l_:t,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{D(pt,`RPC '${t}' ${a} completed.`)}});const m=JSON.stringify(s);D(pt,`RPC '${t}' ${a} sending request:`,s),d.send(e,"POST",m,r,15)})}T_(t,e,r){const s=Ns(),o=[this.qo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,e,r),l.encodeInitMessageHeaders=!0;const d=o.join("");D(pt,`Creating RPC '${t}' stream ${s}: ${d}`,l);const m=a.createWebChannel(d,l);this.I_(m);let I=!1,w=!1;const V=new Gd({Ho:N=>{w?D(pt,`Not sending because RPC '${t}' stream ${s} is closed:`,N):(I||(D(pt,`Opening RPC '${t}' stream ${s} transport.`),m.open(),I=!0),D(pt,`RPC '${t}' stream ${s} sending:`,N),m.send(N))},Jo:()=>m.close()});return un(m,cn.EventType.OPEN,()=>{w||(D(pt,`RPC '${t}' stream ${s} transport opened.`),V.i_())}),un(m,cn.EventType.CLOSE,()=>{w||(w=!0,D(pt,`RPC '${t}' stream ${s} transport closed`),V.o_(),this.E_(m))}),un(m,cn.EventType.ERROR,N=>{w||(w=!0,me(pt,`RPC '${t}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),V.o_(new b(S.UNAVAILABLE,"The operation could not be completed")))}),un(m,cn.EventType.MESSAGE,N=>{var O;if(!w){const k=N.data[0];G(!!k,16349);const H=k,z=(H==null?void 0:H.error)||((O=H[0])==null?void 0:O.error);if(z){D(pt,`RPC '${t}' stream ${s} received error:`,z);const W=z.status;let Tt=function(E){const p=et[E];if(p!==void 0)return Au(p)}(W),ft=z.message;W==="NOT_FOUND"&&ft.includes("database")&&ft.includes("does not exist")&&ft.includes(this.databaseId.database)&&me(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Tt===void 0&&(Tt=S.INTERNAL,ft="Unknown error status: "+W+" with message "+z.message),w=!0,V.o_(new b(Tt,ft)),m.close()}else D(pt,`RPC '${t}' stream ${s} received:`,k),V.__(k)}}),be.u_(),setTimeout(()=>{V.s_()},0),V}terminate(){this.a_.forEach(t=>t.close()),this.a_=[]}I_(t){this.a_.push(t)}E_(t){this.a_=this.a_.filter(e=>e===t)}Go(t,e,r){super.Go(t,e,r),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return ja()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hd(n){return new be(n)}function fs(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pr(n){return new Yf(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */be.c_=!1;class Fu{constructor(t,e,r=1e3,s=1.5,o=6e4){this.Ci=t,this.timerId=e,this.R_=r,this.A_=s,this.V_=o,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(t){this.cancel();const e=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-r);s>0&&D("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),t())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const la="PersistentStream";class Uu{constructor(t,e,r,s,o,a,l,h){this.Ci=t,this.b_=r,this.S_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Fu(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,()=>this.k_()))}K_(t){this.q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===S.RESOURCE_EXHAUSTED?(Ut(e.toString()),Ut("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.t_(e)}W_(){}auth(){this.state=1;const t=this.Q_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===e&&this.G_(r,s)},r=>{t(()=>{const s=new b(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(t,e){const r=this.Q_(this.D_);this.stream=this.j_(t,e),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.Yo(()=>{r(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.H_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(t){return D(la,`close with error: ${t}`),this.stream=null,this.close(4,t)}Q_(t){return e=>{this.Ci.enqueueAndForget(()=>this.D_===t?e():(D(la,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Kd extends Uu{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}j_(t,e){return this.connection.T_("Listen",t,e)}H_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=Zf(this.serializer,t),r=function(o){if(!("targetChange"in o))return L.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?L.min():a.readTime?kt(a.readTime):L.min()}(t);return this.listener.J_(e,r)}Z_(t){const e={};e.database=bs(this.serializer),e.addTarget=function(o,a){let l;const h=a.target;if(l=ws(h)?{documents:nd(o,h)}:{query:rd(o,h).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Su(o,a.resumeToken);const d=Cs(o,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(L.min())>0){l.readTime=pr(o,a.snapshotVersion.toTimestamp());const d=Cs(o,a.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,t);const r=id(this.serializer,t);r&&(e.labels=r),this.K_(e)}X_(t){const e={};e.database=bs(this.serializer),e.removeTarget=t,this.K_(e)}}class Wd extends Uu{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}H_(t){return G(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,G(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){G(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=ed(t.writeResults,t.commitTime),r=kt(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=bs(this.serializer),this.K_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map(r=>td(this.serializer,r))};this.K_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{}class Yd extends Qd{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new b(S.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Wo(t,Vs(e,r),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new b(S.UNKNOWN,o.toString())})}jo(t,e,r,s,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.jo(t,Vs(e,r),s,a,l,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new b(S.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function Jd(n,t,e,r){return new Yd(n,t,e,r)}class Xd{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ut(e),this.aa=!1):D("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge="RemoteStore";class Zd{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=o,this.Aa.Mo(a=>{r.enqueueAndForget(async()=>{Te(this)&&(D(ge,"Restarting streams for network reachability change."),await async function(h){const d=F(h);d.Ea.add(4),await bn(d),d.Va.set("Unknown"),d.Ea.delete(4),await br(d)}(this))})}),this.Va=new Xd(r,s)}}async function br(n){if(Te(n))for(const t of n.Ra)await t(!0)}async function bn(n){for(const t of n.Ra)await t(!1)}function Bu(n,t){const e=F(n);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),si(e)?ri(e):ze(e).O_()&&ni(e,t))}function ei(n,t){const e=F(n),r=ze(e);e.Ia.delete(t),r.O_()&&qu(e,t),e.Ia.size===0&&(r.O_()?r.L_():Te(e)&&e.Va.set("Unknown"))}function ni(n,t){if(n.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}ze(n).Z_(t)}function qu(n,t){n.da.$e(t),ze(n).X_(t)}function ri(n){n.da=new Hf({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),At:t=>n.Ia.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),ze(n).start(),n.Va.ua()}function si(n){return Te(n)&&!ze(n).x_()&&n.Ia.size>0}function Te(n){return F(n).Ea.size===0}function ju(n){n.da=void 0}async function tm(n){n.Va.set("Online")}async function em(n){n.Ia.forEach((t,e)=>{ni(n,t)})}async function nm(n,t){ju(n),si(n)?(n.Va.ha(t),ri(n)):n.Va.set("Unknown")}async function rm(n,t,e){if(n.Va.set("Online"),t instanceof Ru&&t.state===2&&t.cause)try{await async function(s,o){const a=o.cause;for(const l of o.targetIds)s.Ia.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ia.delete(l),s.da.removeTarget(l))}(n,t)}catch(r){D(ge,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await _r(n,r)}else if(t instanceof rr?n.da.Xe(t):t instanceof wu?n.da.st(t):n.da.tt(t),!e.isEqual(L.min()))try{const r=await Lu(n.localStore);e.compareTo(r)>=0&&await function(o,a){const l=o.da.Tt(a);return l.targetChanges.forEach((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.Ia.get(d);m&&o.Ia.set(d,m.withResumeToken(h.resumeToken,a))}}),l.targetMismatches.forEach((h,d)=>{const m=o.Ia.get(h);if(!m)return;o.Ia.set(h,m.withResumeToken(ht.EMPTY_BYTE_STRING,m.snapshotVersion)),qu(o,h);const I=new Kt(m.target,h,d,m.sequenceNumber);ni(o,I)}),o.remoteSyncer.applyRemoteEvent(l)}(n,e)}catch(r){D(ge,"Failed to raise snapshot:",r),await _r(n,r)}}async function _r(n,t,e){if(!je(t))throw t;n.Ea.add(1),await bn(n),n.Va.set("Offline"),e||(e=()=>Lu(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{D(ge,"Retrying IndexedDB access"),await e(),n.Ea.delete(1),await br(n)})}function $u(n,t){return t().catch(e=>_r(n,e,t))}async function Dr(n){const t=F(n),e=ne(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:qs;for(;sm(t);)try{const s=await Fd(t.localStore,r);if(s===null){t.Ta.length===0&&e.L_();break}r=s.batchId,im(t,s)}catch(s){await _r(t,s)}zu(t)&&Gu(t)}function sm(n){return Te(n)&&n.Ta.length<10}function im(n,t){n.Ta.push(t);const e=ne(n);e.O_()&&e.Y_&&e.ea(t.mutations)}function zu(n){return Te(n)&&!ne(n).x_()&&n.Ta.length>0}function Gu(n){ne(n).start()}async function om(n){ne(n).ra()}async function am(n){const t=ne(n);for(const e of n.Ta)t.ea(e.mutations)}async function um(n,t,e){const r=n.Ta.shift(),s=Ws.from(r,t,e);await $u(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Dr(n)}async function cm(n,t){t&&ne(n).Y_&&await async function(r,s){if(function(a){return $f(a)&&a!==S.ABORTED}(s.code)){const o=r.Ta.shift();ne(r).B_(),await $u(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),await Dr(r)}}(n,t),zu(n)&&Gu(n)}async function ha(n,t){const e=F(n);e.asyncQueue.verifyOperationInProgress(),D(ge,"RemoteStore received new credentials");const r=Te(e);e.Ea.add(3),await bn(e),r&&e.Va.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await br(e)}async function lm(n,t){const e=F(n);t?(e.Ea.delete(2),await br(e)):t||(e.Ea.add(2),await bn(e),e.Va.set("Unknown"))}function ze(n){return n.ma||(n.ma=function(e,r,s){const o=F(e);return o.sa(),new Kd(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Zo:tm.bind(null,n),Yo:em.bind(null,n),t_:nm.bind(null,n),J_:rm.bind(null,n)}),n.Ra.push(async t=>{t?(n.ma.B_(),si(n)?ri(n):n.Va.set("Unknown")):(await n.ma.stop(),ju(n))})),n.ma}function ne(n){return n.fa||(n.fa=function(e,r,s){const o=F(e);return o.sa(),new Wd(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:om.bind(null,n),t_:cm.bind(null,n),ta:am.bind(null,n),na:um.bind(null,n)}),n.Ra.push(async t=>{t?(n.fa.B_(),await Dr(n)):(await n.fa.stop(),n.Ta.length>0&&(D(ge,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new Mt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,l=new ii(t,e,a,s,o);return l.start(r),l}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new b(S.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function oi(n,t){if(Ut("AsyncQueue",`${t}: ${n}`),je(n))return new b(S.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{static emptySet(t){return new De(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||x.comparator(e.key,r.key):(e,r)=>x.comparator(e.key,r.key),this.keyedMap=ln(),this.sortedSet=new X(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof De)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new De;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(){this.ga=new X(x.comparator)}track(t){const e=t.doc.key,r=this.ga.get(e);r?t.type!==0&&r.type===3?this.ga=this.ga.insert(e,t):t.type===3&&r.type!==1?this.ga=this.ga.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ga=this.ga.remove(e):t.type===1&&r.type===2?this.ga=this.ga.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):M(63341,{Vt:t,pa:r}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal((e,r)=>{t.push(r)}),t}}class Fe{constructor(t,e,r,s,o,a,l,h,d){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach(l=>{a.push({type:0,doc:l})}),new Fe(t,e,De.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&wr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some(t=>t.Da())}}class fm{constructor(){this.queries=da(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const s=F(e),o=s.queries;s.queries=da(),o.forEach((a,l)=>{for(const h of l.ba)h.onError(r)})})(this,new b(S.ABORTED,"Firestore shutting down"))}}function da(){return new ye(n=>lu(n),wr)}async function Hu(n,t){const e=F(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.Sa()&&t.Da()&&(r=2):(o=new hm,r=t.Da()?0:1);try{switch(r){case 0:o.wa=await e.onListen(s,!0);break;case 1:o.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const l=oi(a,`Initialization of query '${Se(t.query)}' failed`);return void t.onError(l)}e.queries.set(s,o),o.ba.push(t),t.va(e.onlineState),o.wa&&t.Fa(o.wa)&&ai(e)}async function Ku(n,t){const e=F(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.ba.indexOf(t);a>=0&&(o.ba.splice(a,1),o.ba.length===0?s=t.Da()?0:1:!o.Sa()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function dm(n,t){const e=F(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const l of a.ba)l.Fa(s)&&(r=!0);a.wa=s}}r&&ai(e)}function mm(n,t,e){const r=F(n),s=r.queries.get(t);if(s)for(const o of s.ba)o.onError(e);r.queries.delete(t)}function ai(n){n.Ca.forEach(t=>{t.next()})}var ks,ma;(ma=ks||(ks={})).Ma="default",ma.Cache="cache";class Wu{constructor(t,e,r){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Fe(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const r=e!=="Offline";return(!this.options.Ka||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=Fe.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==ks.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(t){this.key=t}}class Yu{constructor(t){this.key=t}}class pm{constructor(t,e){this.query=t,this.Za=e,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=q(),this.mutatedKeys=q(),this.eu=hu(t),this.tu=new De(this.eu)}get nu(){return this.Za}ru(t,e){const r=e?e.iu:new fa,s=e?e.tu:this.tu;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,l=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((m,I)=>{const w=s.get(m),V=Rr(this.query,I)?I:null,N=!!w&&this.mutatedKeys.has(w.key),O=!!V&&(V.hasLocalMutations||this.mutatedKeys.has(V.key)&&V.hasCommittedMutations);let k=!1;w&&V?w.data.isEqual(V.data)?N!==O&&(r.track({type:3,doc:V}),k=!0):this.su(w,V)||(r.track({type:2,doc:V}),k=!0,(h&&this.eu(V,h)>0||d&&this.eu(V,d)<0)&&(l=!0)):!w&&V?(r.track({type:0,doc:V}),k=!0):w&&!V&&(r.track({type:1,doc:w}),k=!0,(h||d)&&(l=!0)),k&&(V?(a=a.add(V),o=O?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{tu:a,iu:r,Ss:l,mutatedKeys:o}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const a=t.iu.ya();a.sort((m,I)=>function(V,N){const O=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Vt:k})}};return O(V)-O(N)}(m.type,I.type)||this.eu(m.doc,I.doc)),this.ou(r),s=s??!1;const l=e&&!s?this._u():[],h=this.Ya.size===0&&this.current&&!s?1:0,d=h!==this.Xa;return this.Xa=h,a.length!==0||d?{snapshot:new Fe(this.query,t.tu,o,a,t.mutatedKeys,h===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new fa,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(t){return!this.Za.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach(e=>this.Za=this.Za.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Za=this.Za.delete(e)),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Ya;this.Ya=q(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))});const e=[];return t.forEach(r=>{this.Ya.has(r)||e.push(new Yu(r))}),this.Ya.forEach(r=>{t.has(r)||e.push(new Qu(r))}),e}cu(t){this.Za=t.ks,this.Ya=q();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return Fe.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const ui="SyncEngine";class gm{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class _m{constructor(t){this.key=t,this.hu=!1}}class ym{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new ye(l=>lu(l),wr),this.Iu=new Map,this.Eu=new Set,this.Ru=new X(x.comparator),this.Au=new Map,this.Vu=new Js,this.du={},this.mu=new Map,this.fu=Le.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Em(n,t,e=!0){const r=nc(n);let s;const o=r.Tu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.lu()):s=await Ju(r,t,e,!0),s}async function Tm(n,t){const e=nc(n);await Ju(e,t,!0,!1)}async function Ju(n,t,e,r){const s=await Ud(n.localStore,Nt(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let l;return r&&(l=await Im(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&Bu(n.remoteStore,s),l}async function Im(n,t,e,r,s){n.pu=(I,w,V)=>async function(O,k,H,z){let W=k.view.ru(H);W.Ss&&(W=await oa(O.localStore,k.query,!1).then(({documents:E})=>k.view.ru(E,W)));const Tt=z&&z.targetChanges.get(k.targetId),ft=z&&z.targetMismatches.get(k.targetId)!=null,dt=k.view.applyChanges(W,O.isPrimaryClient,Tt,ft);return ga(O,k.targetId,dt.au),dt.snapshot}(n,I,w,V);const o=await oa(n.localStore,t,!0),a=new pm(t,o.ks),l=a.ru(o.documents),h=Pn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),d=a.applyChanges(l,n.isPrimaryClient,h);ga(n,e,d.au);const m=new gm(t,e,a);return n.Tu.set(t,m),n.Iu.has(e)?n.Iu.get(e).push(t):n.Iu.set(e,[t]),d.snapshot}async function vm(n,t,e){const r=F(n),s=r.Tu.get(t),o=r.Iu.get(s.targetId);if(o.length>1)return r.Iu.set(s.targetId,o.filter(a=>!wr(a,t))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Ds(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),e&&ei(r.remoteStore,s.targetId),xs(r,s.targetId)}).catch(qe)):(xs(r,s.targetId),await Ds(r.localStore,s.targetId,!0))}async function Am(n,t){const e=F(n),r=e.Tu.get(t),s=e.Iu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),ei(e.remoteStore,r.targetId))}async function wm(n,t,e){const r=Dm(n);try{const s=await function(a,l){const h=F(a),d=J.now(),m=l.reduce((V,N)=>V.add(N.key),q());let I,w;return h.persistence.runTransaction("Locally write mutations","readwrite",V=>{let N=Bt(),O=q();return h.xs.getEntries(V,m).next(k=>{N=k,N.forEach((H,z)=>{z.isValidDocument()||(O=O.add(H))})}).next(()=>h.localDocuments.getOverlayedDocuments(V,N)).next(k=>{I=k;const H=[];for(const z of l){const W=Ff(z,I.get(z.key).overlayedDocument);W!=null&&H.push(new Ee(z.key,W,nu(W.value.mapValue),Lt.exists(!0)))}return h.mutationQueue.addMutationBatch(V,d,H,l)}).next(k=>{w=k;const H=k.applyToLocalDocumentSet(I,O);return h.documentOverlayCache.saveOverlays(V,k.batchId,H)})}).then(()=>({batchId:w.batchId,changes:du(I)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,h){let d=a.du[a.currentUser.toKey()];d||(d=new X(B)),d=d.insert(l,h),a.du[a.currentUser.toKey()]=d}(r,s.batchId,e),await Dn(r,s.changes),await Dr(r.remoteStore)}catch(s){const o=oi(s,"Failed to persist write");e.reject(o)}}async function Xu(n,t){const e=F(n);try{const r=await Md(e.localStore,t);t.targetChanges.forEach((s,o)=>{const a=e.Au.get(o);a&&(G(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?G(a.hu,14607):s.removedDocuments.size>0&&(G(a.hu,42227),a.hu=!1))}),await Dn(e,r,t)}catch(r){await qe(r)}}function pa(n,t,e){const r=F(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Tu.forEach((o,a)=>{const l=a.view.va(t);l.snapshot&&s.push(l.snapshot)}),function(a,l){const h=F(a);h.onlineState=l;let d=!1;h.queries.forEach((m,I)=>{for(const w of I.ba)w.va(l)&&(d=!0)}),d&&ai(h)}(r.eventManager,t),s.length&&r.Pu.J_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Rm(n,t,e){const r=F(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Au.get(t),o=s&&s.key;if(o){let a=new X(x.comparator);a=a.insert(o,_t.newNoDocument(o,L.min()));const l=q().add(o),h=new Vr(L.min(),new Map,new X(B),a,l);await Xu(r,h),r.Ru=r.Ru.remove(o),r.Au.delete(t),ci(r)}else await Ds(r.localStore,t,!1).then(()=>xs(r,t,e)).catch(qe)}async function Sm(n,t){const e=F(n),r=t.batch.batchId;try{const s=await Od(e.localStore,t);tc(e,r,null),Zu(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await Dn(e,s)}catch(s){await qe(s)}}async function Cm(n,t,e){const r=F(n);try{const s=await function(a,l){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let m;return h.mutationQueue.lookupMutationBatch(d,l).next(I=>(G(I!==null,37113),m=I.keys(),h.mutationQueue.removeMutationBatch(d,I))).next(()=>h.mutationQueue.performConsistencyCheck(d)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(d,m,l)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m)).next(()=>h.localDocuments.getDocuments(d,m))})}(r.localStore,t);tc(r,t,e),Zu(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await Dn(r,s)}catch(s){await qe(s)}}function Zu(n,t){(n.mu.get(t)||[]).forEach(e=>{e.resolve()}),n.mu.delete(t)}function tc(n,t,e){const r=F(n);let s=r.du[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.du[r.currentUser.toKey()]=s}}function xs(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Iu.get(t))n.Tu.delete(r),e&&n.Pu.yu(r,e);n.Iu.delete(t),n.isPrimaryClient&&n.Vu.Gr(t).forEach(r=>{n.Vu.containsKey(r)||ec(n,r)})}function ec(n,t){n.Eu.delete(t.path.canonicalString());const e=n.Ru.get(t);e!==null&&(ei(n.remoteStore,e),n.Ru=n.Ru.remove(t),n.Au.delete(e),ci(n))}function ga(n,t,e){for(const r of e)r instanceof Qu?(n.Vu.addReference(r.key,t),Vm(n,r)):r instanceof Yu?(D(ui,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,t),n.Vu.containsKey(r.key)||ec(n,r.key)):M(19791,{wu:r})}function Vm(n,t){const e=t.key,r=e.path.canonicalString();n.Ru.get(e)||n.Eu.has(r)||(D(ui,"New document in limbo: "+e),n.Eu.add(r),ci(n))}function ci(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const t=n.Eu.values().next().value;n.Eu.delete(t);const e=new x(Q.fromString(t)),r=n.fu.next();n.Au.set(r,new _m(e)),n.Ru=n.Ru.insert(e,r),Bu(n.remoteStore,new Kt(Nt(Hs(e.path)),r,"TargetPurposeLimboResolution",Ir.ce))}}async function Dn(n,t,e){const r=F(n),s=[],o=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((l,h)=>{a.push(r.pu(h,t,e).then(d=>{var m;if((d||e)&&r.isPrimaryClient){const I=d?!d.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))==null?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,I?"current":"not-current")}if(d){s.push(d);const I=Zs.Es(h.targetId,d);o.push(I)}}))}),await Promise.all(a),r.Pu.J_(s),await async function(h,d){const m=F(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",I=>C.forEach(d,w=>C.forEach(w.Ts,V=>m.persistence.referenceDelegate.addReference(I,w.targetId,V)).next(()=>C.forEach(w.Is,V=>m.persistence.referenceDelegate.removeReference(I,w.targetId,V)))))}catch(I){if(!je(I))throw I;D(ti,"Failed to update sequence numbers: "+I)}for(const I of d){const w=I.targetId;if(!I.fromCache){const V=m.vs.get(w),N=V.snapshotVersion,O=V.withLastLimboFreeSnapshotVersion(N);m.vs=m.vs.insert(w,O)}}}(r.localStore,o))}async function Pm(n,t){const e=F(n);if(!e.currentUser.isEqual(t)){D(ui,"User change. New user:",t.toKey());const r=await Mu(e.localStore,t);e.currentUser=t,function(o,a){o.mu.forEach(l=>{l.forEach(h=>{h.reject(new b(S.CANCELLED,a))})}),o.mu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Dn(e,r.Ns)}}function bm(n,t){const e=F(n),r=e.Au.get(t);if(r&&r.hu)return q().add(r.key);{let s=q();const o=e.Iu.get(t);if(!o)return s;for(const a of o){const l=e.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function nc(n){const t=F(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Xu.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=bm.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Rm.bind(null,t),t.Pu.J_=dm.bind(null,t.eventManager),t.Pu.yu=mm.bind(null,t.eventManager),t}function Dm(n){const t=F(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Sm.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Cm.bind(null,t),t}class yr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Pr(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return xd(this.persistence,new Dd,t.initialUser,this.serializer)}Cu(t){return new Ou(Xs.Vi,this.serializer)}Du(t){return new qd}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}yr.provider={build:()=>new yr};class Nm extends yr{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){G(this.persistence.referenceDelegate instanceof gr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new gd(r,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new Ou(r=>gr.Vi(r,e),this.serializer)}}class Os{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>pa(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Pm.bind(null,this.syncEngine),await lm(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new fm}()}createDatastore(t){const e=Pr(t.databaseInfo.databaseId),r=Hd(t.databaseInfo);return Jd(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,s,o,a,l){return new Zd(r,s,o,a,l)}(this.localStore,this.datastore,t.asyncQueue,e=>pa(this.syncEngine,e,0),function(){return ca.v()?new ca:new jd}())}createSyncEngine(t,e){return function(s,o,a,l,h,d,m){const I=new ym(s,o,a,l,h,d);return m&&(I.gu=!0),I}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const o=F(s);D(ge,"RemoteStore shutting down."),o.Ea.add(5),await bn(o),o.Aa.shutdown(),o.Va.set("Unknown")}(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}Os.provider={build:()=>new Os};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):Ut("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const re="FirestoreClient";class km{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this._databaseInfo=s,this.user=gt.UNAUTHENTICATED,this.clientId=Bs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{D(re,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(D(re,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Mt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=oi(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function ds(n,t){n.asyncQueue.verifyOperationInProgress(),D(re,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Mu(t.localStore,s),r=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function _a(n,t){n.asyncQueue.verifyOperationInProgress();const e=await xm(n);D(re,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>ha(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>ha(t.remoteStore,s)),n._onlineComponents=t}async function xm(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){D(re,"Using user provided OfflineComponentProvider");try{await ds(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;me("Error using user provided cache. Falling back to memory cache: "+e),await ds(n,new yr)}}else D(re,"Using default OfflineComponentProvider"),await ds(n,new Nm(void 0));return n._offlineComponents}async function sc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(D(re,"Using user provided OnlineComponentProvider"),await _a(n,n._uninitializedComponentsProvider._online)):(D(re,"Using default OnlineComponentProvider"),await _a(n,new Os))),n._onlineComponents}function Om(n){return sc(n).then(t=>t.syncEngine)}async function ic(n){const t=await sc(n),e=t.eventManager;return e.onListen=Em.bind(null,t.syncEngine),e.onUnlisten=vm.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Tm.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Am.bind(null,t.syncEngine),e}function Mm(n,t,e={}){const r=new Mt;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,l,h,d){const m=new rc({next:w=>{m.Nu(),a.enqueueAndForget(()=>Ku(o,I));const V=w.docs.has(l);!V&&w.fromCache?d.reject(new b(S.UNAVAILABLE,"Failed to get document because the client is offline.")):V&&w.fromCache&&h&&h.source==="server"?d.reject(new b(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(w)},error:w=>d.reject(w)}),I=new Wu(Hs(l.path),m,{includeMetadataChanges:!0,Ka:!0});return Hu(o,I)}(await ic(n),n.asyncQueue,t,e,r)),r.promise}function Lm(n,t,e={}){const r=new Mt;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,l,h,d){const m=new rc({next:w=>{m.Nu(),a.enqueueAndForget(()=>Ku(o,I)),w.fromCache&&h.source==="server"?d.reject(new b(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(w)},error:w=>d.reject(w)}),I=new Wu(l,m,{includeMetadataChanges:!0,Ka:!0});return Hu(o,I)}(await ic(n),n.asyncQueue,t,e,r)),r.promise}function Fm(n,t){const e=new Mt;return n.asyncQueue.enqueueAndForget(async()=>wm(await Om(n),t,e)),e.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oc(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Um="ComponentProvider",ya=new Map;function Bm(n,t,e,r,s){return new of(n,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,oc(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac="firestore.googleapis.com",Ea=!0;class Ta{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new b(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=ac,this.ssl=Ea}else this.host=t.host,this.ssl=t.ssl??Ea;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=xu;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<md)throw new b(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Wh("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=oc(t.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new b(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new b(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new b(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Nr{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ta({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new b(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new b(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ta(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Fh;switch(r.type){case"firstParty":return new jh(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new b(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=ya.get(e);r&&(D(Um,"Removing Datastore"),ya.delete(e),r.terminate())}(this),Promise.resolve()}}function qm(n,t,e,r={}){var d;n=pe(n,Nr);const s=Ls(t),o=n._getSettings(),a={...o,emulatorOptions:n._getEmulatorOptions()},l=`${t}:${e}`;s&&(cl(`https://${l}`),dl("Firestore",!0)),o.host!==ac&&o.host!==l&&me("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:l,ssl:s,emulatorOptions:r};if(!or(h,a)&&(n._setSettings(h),r.mockUserToken)){let m,I;if(typeof r.mockUserToken=="string")m=r.mockUserToken,I=gt.MOCK_USER;else{m=ll(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const w=r.mockUserToken.sub||r.mockUserToken.user_id;if(!w)throw new b(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");I=new gt(w)}n._authCredentials=new Uh(new za(m,I))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Ie(this.firestore,t,this._query)}}class st{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Jt(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new st(this.firestore,t,this._key)}toJSON(){return{type:st._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(Cn(e,st._jsonSchema))return new st(t,r||null,new x(Q.fromString(e.referencePath)))}}st._jsonSchemaVersion="firestore/documentReference/1.0",st._jsonSchema={type:rt("string",st._jsonSchemaVersion),referencePath:rt("string")};class Jt extends Ie{constructor(t,e,r){super(t,e,Hs(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new st(this.firestore,null,new x(t))}withConverter(t){return new Jt(this.firestore,t,this._path)}}function ip(n,t,...e){if(n=ke(n),Ga("collection","path",t),n instanceof Nr){const r=Q.fromString(t,...e);return ko(r),new Jt(n,null,r)}{if(!(n instanceof st||n instanceof Jt))throw new b(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Q.fromString(t,...e));return ko(r),new Jt(n.firestore,null,r)}}function op(n,t,...e){if(n=ke(n),arguments.length===1&&(t=Bs.newId()),Ga("doc","path",t),n instanceof Nr){const r=Q.fromString(t,...e);return No(r),new st(n,null,new x(r))}{if(!(n instanceof st||n instanceof Jt))throw new b(S.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Q.fromString(t,...e));return No(r),new st(n.firestore,n instanceof Jt?n.converter:null,new x(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia="AsyncQueue";class va{constructor(t=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Fu(this,"async_queue_retry"),this._c=()=>{const r=fs();r&&D(Ia,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const e=fs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=fs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise(()=>{});const e=new Mt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Yu.push(t),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(t){if(!je(t))throw t;D(Ia,"Operation failed with retryable error: "+t)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(t){const e=this.ac.then(()=>(this.rc=!0,t().catch(r=>{throw this.nc=r,this.rc=!1,Ut("INTERNAL UNHANDLED ERROR: ",Aa(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=e,e}enqueueAfterDelay(t,e,r){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=ii.createAndSchedule(this,t,e,r,o=>this.hc(o));return this.tc.push(s),s}uc(){this.nc&&M(47125,{Pc:Aa(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then(()=>{this.tc.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()})}Rc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function Aa(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class kr extends Nr{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new va,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new va(t),this._firestoreClient=void 0,await t}}}function ap(n,t){const e=typeof n=="object"?n:wh(),r=typeof n=="string"?n:lr,s=yh(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=al("firestore");o&&qm(s,...o)}return s}function li(n){if(n._terminated)throw new b(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||jm(n),n._firestoreClient}function jm(n){var r,s,o,a;const t=n._freezeSettings(),e=Bm(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,t);n._componentsProvider||(o=t.localCache)!=null&&o._offlineComponentProvider&&((a=t.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new km(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&function(h){const d=h==null?void 0:h._online.build();return{_offline:h==null?void 0:h._offline.build(d),_online:d}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Rt(ht.fromBase64String(t))}catch(e){throw new b(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Rt(ht.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Rt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Cn(t,Rt._jsonSchema))return Rt.fromBase64String(t.bytes)}}Rt._jsonSchemaVersion="firestore/bytes/1.0",Rt._jsonSchema={type:rt("string",Rt._jsonSchemaVersion),bytes:rt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new b(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new lt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new b(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new b(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return B(this._lat,t._lat)||B(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:xt._jsonSchemaVersion}}static fromJSON(t){if(Cn(t,xt._jsonSchema))return new xt(t.latitude,t.longitude)}}xt._jsonSchemaVersion="firestore/geoPoint/1.0",xt._jsonSchema={type:rt("string",xt._jsonSchemaVersion),latitude:rt("number"),longitude:rt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,t._values)}toJSON(){return{type:Ct._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Cn(t,Ct._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new Ct(t.vectorValues);throw new b(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ct._jsonSchemaVersion="firestore/vectorValue/1.0",Ct._jsonSchema={type:rt("string",Ct._jsonSchemaVersion),vectorValues:rt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $m=/^__.*__$/;class zm{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Ee(t,this.data,this.fieldMask,e,this.fieldTransforms):new Vn(t,this.data,e,this.fieldTransforms)}}function lc(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{dataSource:n})}}class hi{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.validatePath(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(t){return new hi({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePathSegment(t),r}childContextForFieldPath(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePath(),r}childContextForArray(t){return this.contextWith({path:void 0,arrayElement:!0})}createError(t){return Er(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}validatePath(){if(this.path)for(let t=0;t<this.path.length;t++)this.validatePathSegment(this.path.get(t))}validatePathSegment(t){if(t.length===0)throw this.createError("Document fields must not be empty");if(lc(this.dataSource)&&$m.test(t))throw this.createError('Document fields cannot begin and end with "__"')}}class Gm{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Pr(t)}createContext(t,e,r,s=!1){return new hi({dataSource:t,methodName:e,targetDoc:r,path:lt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function hc(n){const t=n._freezeSettings(),e=Pr(n._databaseId);return new Gm(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Hm(n,t,e,r,s,o={}){const a=n.createContext(o.merge||o.mergeFields?2:0,t,e,s);mc("Data must be an object, but it was:",a,r);const l=fc(r,a);let h,d;if(o.merge)h=new St(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const m=[];for(const I of o.mergeFields){const w=Nn(t,I,e);if(!a.contains(w))throw new b(S.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Ym(m,w)||m.push(w)}h=new St(m),d=a.fieldTransforms.filter(I=>h.covers(I.field))}else h=null,d=a.fieldTransforms;return new zm(new wt(l),h,d)}function Km(n,t,e,r=!1){return fi(e,n.createContext(r?4:3,t))}function fi(n,t){if(dc(n=ke(n)))return mc("Unsupported field value:",t,n),fc(n,t);if(n instanceof cc)return function(r,s){if(!lc(s.dataSource))throw s.createError(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.createError(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.createError("Nested arrays are not supported");return function(r,s){const o=[];let a=0;for(const l of r){let h=fi(l,s.childContextForArray(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,t)}return function(r,s){if((r=ke(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Nf(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=J.fromDate(r);return{timestampValue:pr(s.serializer,o)}}if(r instanceof J){const o=new J(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:pr(s.serializer,o)}}if(r instanceof xt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Rt)return{bytesValue:Su(s.serializer,r._byteString)};if(r instanceof st){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.createError(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Ys(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Ct)return function(a,l){const h=a instanceof Ct?a.toArray():a;return{mapValue:{fields:{[tu]:{stringValue:eu},[hr]:{arrayValue:{values:h.map(m=>{if(typeof m!="number")throw l.createError("VectorValues must only contain numeric values.");return Ks(l.serializer,m)})}}}}}}(r,s);if(ku(r))return r._toProto(s.serializer);throw s.createError(`Unsupported field value: ${Tr(r)}`)}(n,t)}function fc(n,t){const e={};return Wa(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):_e(n,(r,s)=>{const o=fi(s,t.childContextForField(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function dc(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof J||n instanceof xt||n instanceof Rt||n instanceof st||n instanceof cc||n instanceof Ct||ku(n))}function mc(n,t,e){if(!dc(e)||!Ha(e)){const r=Tr(e);throw r==="an object"?t.createError(n+" a custom object"):t.createError(n+" "+r)}}function Nn(n,t,e){if((t=ke(t))instanceof uc)return t._internalPath;if(typeof t=="string")return Qm(n,t);throw Er("Field path arguments must be of type string or ",n,!1,void 0,e)}const Wm=new RegExp("[~\\*/\\[\\]]");function Qm(n,t,e){if(t.search(Wm)>=0)throw Er(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new uc(...t.split("."))._internalPath}catch{throw Er(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Er(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new b(S.INVALID_ARGUMENT,l+n+h)}function Ym(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{convertValue(t,e="none"){switch(ee(t)){case 0:return null;case 1:return t.booleanValue;case 2:return tt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(te(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return _e(t,(s,o)=>{r[s]=this.convertValue(o,e)}),r}convertVectorValue(t){var r,s,o;const e=(o=(s=(r=t.fields)==null?void 0:r[hr].arrayValue)==null?void 0:s.values)==null?void 0:o.map(a=>tt(a.doubleValue));return new Ct(e)}convertGeoPoint(t){return new xt(tt(t.latitude),tt(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Ar(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(In(t));default:return null}}convertTimestamp(t){const e=Zt(t);return new J(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=Q.fromString(t);G(Nu(r),9688,{name:t});const s=new vn(r.get(1),r.get(3)),o=new x(r.popFirst(5));return s.isEqual(e)||Ut(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc extends Jm{constructor(t){super(),this.firestore=t}convertBytes(t){return new Rt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new st(this.firestore,null,e)}}const wa="@firebase/firestore",Ra="4.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new st(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Xm(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(Nn("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Xm extends gc{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zm(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new b(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class di{}class _c extends di{}function up(n,t,...e){let r=[];t instanceof di&&r.push(t),r=r.concat(e),function(o){const a=o.filter(h=>h instanceof mi).length,l=o.filter(h=>h instanceof xr).length;if(a>1||a>0&&l>0)throw new b(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class xr extends _c{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new xr(t,e,r)}_apply(t){const e=this._parse(t);return yc(t._query,e),new Ie(t.firestore,t.converter,Rs(t._query,e))}_parse(t){const e=hc(t.firestore);return function(o,a,l,h,d,m,I){let w;if(d.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new b(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){Ca(I,m);const N=[];for(const O of I)N.push(Sa(h,o,O));w={arrayValue:{values:N}}}else w=Sa(h,o,I)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||Ca(I,m),w=Km(l,a,I,m==="in"||m==="not-in");return nt.create(d,m,w)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function cp(n,t,e){const r=t,s=Nn("where",n);return xr._create(s,r,e)}class mi extends di{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new mi(t,e)}_parse(t){const e=this._queryConstraints.map(r=>r._parse(t)).filter(r=>r.getFilters().length>0);return e.length===1?e[0]:Vt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,o){let a=s;const l=o.getFlattenedFilters();for(const h of l)yc(a,h),a=Rs(a,h)}(t._query,e),new Ie(t.firestore,t.converter,Rs(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class pi extends _c{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new pi(t,e)}_apply(t){const e=function(s,o,a){if(s.startAt!==null)throw new b(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new b(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new wn(o,a)}(t._query,this._field,this._direction);return new Ie(t.firestore,t.converter,wf(t._query,e))}}function lp(n,t="asc"){const e=t,r=Nn("orderBy",n);return pi._create(r,e)}function Sa(n,t,e){if(typeof(e=ke(e))=="string"){if(e==="")throw new b(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!cu(t)&&e.indexOf("/")!==-1)throw new b(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(Q.fromString(e));if(!x.isDocumentKey(r))throw new b(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return qo(n,new x(r))}if(e instanceof st)return qo(n,e._key);throw new b(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Tr(e)}.`)}function Ca(n,t){if(!Array.isArray(n)||n.length===0)throw new b(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function yc(n,t){const e=function(s,o){for(const a of s)for(const l of a.getFlattenedFilters())if(o.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new b(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new b(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function tp(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class fn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class fe extends gc{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new sr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Nn("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new b(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=fe._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}fe._jsonSchemaVersion="firestore/documentSnapshot/1.0",fe._jsonSchema={type:rt("string",fe._jsonSchemaVersion),bundleSource:rt("string","DocumentSnapshot"),bundleName:rt("string"),bundle:rt("string")};class sr extends fe{data(t={}){return super.data(t)}}class Ne{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new fn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new sr(this._firestore,this._userDataWriter,r.key,r,new fn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new b(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const h=new sr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new fn(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>o||l.type!==3).map(l=>{const h=new sr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new fn(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,m=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),m=a.indexOf(l.doc.key)),{type:ep(l.type),doc:h,oldIndex:d,newIndex:m}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new b(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Ne._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Bs.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach(o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function ep(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ne._jsonSchemaVersion="firestore/querySnapshot/1.0",Ne._jsonSchema={type:rt("string",Ne._jsonSchemaVersion),bundleSource:rt("string","QuerySnapshot"),bundleName:rt("string"),bundle:rt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hp(n){n=pe(n,st);const t=pe(n.firestore,kr),e=li(t);return Mm(e,n._key).then(r=>rp(t,n,r))}function fp(n){n=pe(n,Ie);const t=pe(n.firestore,kr),e=li(t),r=new pc(t);return Zm(n._query),Lm(e,n._query).then(s=>new Ne(t,r,n,s))}function dp(n,t,e){n=pe(n,st);const r=pe(n.firestore,kr),s=tp(n.converter,t,e),o=hc(r);return np(r,[Hm(o,"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,Lt.none())])}function np(n,t){const e=li(n);return Fm(e,t)}function rp(n,t,e){const r=e.docs.get(t._key),s=new pc(n);return new fe(n,s,t._key,r,new fn(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){Lh(vh),ur(new yn("firestore",(r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),l=new kr(new Bh(r.getProvider("auth-internal")),new $h(a,r.getProvider("app-check-internal")),af(a,s),a);return o={useFetchStreams:e,...o},l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),Pe(wa,Ra,t),Pe(wa,Ra,"esm2020")})();export{J as T,fp as a,hp as b,ip as c,op as d,ap as g,Ah as i,lp as o,up as q,dp as s,cp as w};
