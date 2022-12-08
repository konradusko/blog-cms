/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
 const O = window, V = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ne = Symbol(), J = /* @__PURE__ */ new WeakMap();
 class pe {
   constructor(e, t, o) {
     if (this._$cssResult$ = !0, o !== ne)
       throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
     this.cssText = e, this.t = t;
   }
   get styleSheet() {
     let e = this.o;
     const t = this.t;
     if (V && e === void 0) {
       const o = t !== void 0 && t.length === 1;
       o && (e = J.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && J.set(t, e));
     }
     return e;
   }
   toString() {
     return this.cssText;
   }
 }
 const Y = (i) => new pe(typeof i == "string" ? i : i + "", void 0, ne), me = (i, e) => {
   V ? i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet) : e.forEach((t) => {
     const o = document.createElement("style"), r = O.litNonce;
     r !== void 0 && o.setAttribute("nonce", r), o.textContent = t.cssText, i.appendChild(o);
   });
 }, K = V ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
   let t = "";
   for (const o of e.cssRules)
     t += o.cssText;
   return Y(t);
 })(i) : i;
 /**
  * @license
  * Copyright 2017 Google LLC
  * SPDX-License-Identifier: BSD-3-Clause
  */
 var R;
 const T = window, F = T.trustedTypes, be = F ? F.emptyScript : "", X = T.reactiveElementPolyfillSupport, q = { toAttribute(i, e) {
   switch (e) {
     case Boolean:
       i = i ? be : null;
       break;
     case Object:
     case Array:
       i = i == null ? i : JSON.stringify(i);
   }
   return i;
 }, fromAttribute(i, e) {
   let t = i;
   switch (e) {
     case Boolean:
       t = i !== null;
       break;
     case Number:
       t = i === null ? null : Number(i);
       break;
     case Object:
     case Array:
       try {
         t = JSON.parse(i);
       } catch {
         t = null;
       }
   }
   return t;
 } }, se = (i, e) => e !== i && (e == e || i == i), L = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: se };
 class x extends HTMLElement {
   constructor() {
     super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
   }
   static addInitializer(e) {
     var t;
     this.finalize(), ((t = this.h) !== null && t !== void 0 ? t : this.h = []).push(e);
   }
   static get observedAttributes() {
     this.finalize();
     const e = [];
     return this.elementProperties.forEach((t, o) => {
       const r = this._$Ep(o, t);
       r !== void 0 && (this._$Ev.set(r, o), e.push(r));
     }), e;
   }
   static createProperty(e, t = L) {
     if (t.state && (t.attribute = !1), this.finalize(), this.elementProperties.set(e, t), !t.noAccessor && !this.prototype.hasOwnProperty(e)) {
       const o = typeof e == "symbol" ? Symbol() : "__" + e, r = this.getPropertyDescriptor(e, o, t);
       r !== void 0 && Object.defineProperty(this.prototype, e, r);
     }
   }
   static getPropertyDescriptor(e, t, o) {
     return { get() {
       return this[t];
     }, set(r) {
       const a = this[e];
       this[t] = r, this.requestUpdate(e, a, o);
     }, configurable: !0, enumerable: !0 };
   }
   static getPropertyOptions(e) {
     return this.elementProperties.get(e) || L;
   }
   static finalize() {
     if (this.hasOwnProperty("finalized"))
       return !1;
     this.finalized = !0;
     const e = Object.getPrototypeOf(this);
     if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
       const t = this.properties, o = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
       for (const r of o)
         this.createProperty(r, t[r]);
     }
     return this.elementStyles = this.finalizeStyles(this.styles), !0;
   }
   static finalizeStyles(e) {
     const t = [];
     if (Array.isArray(e)) {
       const o = new Set(e.flat(1 / 0).reverse());
       for (const r of o)
         t.unshift(K(r));
     } else
       e !== void 0 && t.push(K(e));
     return t;
   }
   static _$Ep(e, t) {
     const o = t.attribute;
     return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
   }
   u() {
     var e;
     this._$E_ = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach((t) => t(this));
   }
   addController(e) {
     var t, o;
     ((t = this._$ES) !== null && t !== void 0 ? t : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((o = e.hostConnected) === null || o === void 0 || o.call(e));
   }
   removeController(e) {
     var t;
     (t = this._$ES) === null || t === void 0 || t.splice(this._$ES.indexOf(e) >>> 0, 1);
   }
   _$Eg() {
     this.constructor.elementProperties.forEach((e, t) => {
       this.hasOwnProperty(t) && (this._$Ei.set(t, this[t]), delete this[t]);
     });
   }
   createRenderRoot() {
     var e;
     const t = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
     return me(t, this.constructor.elementStyles), t;
   }
   connectedCallback() {
     var e;
     this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
       var o;
       return (o = t.hostConnected) === null || o === void 0 ? void 0 : o.call(t);
     });
   }
   enableUpdating(e) {
   }
   disconnectedCallback() {
     var e;
     (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
       var o;
       return (o = t.hostDisconnected) === null || o === void 0 ? void 0 : o.call(t);
     });
   }
   attributeChangedCallback(e, t, o) {
     this._$AK(e, o);
   }
   _$EO(e, t, o = L) {
     var r;
     const a = this.constructor._$Ep(e, o);
     if (a !== void 0 && o.reflect === !0) {
       const n = (((r = o.converter) === null || r === void 0 ? void 0 : r.toAttribute) !== void 0 ? o.converter : q).toAttribute(t, o.type);
       this._$El = e, n == null ? this.removeAttribute(a) : this.setAttribute(a, n), this._$El = null;
     }
   }
   _$AK(e, t) {
     var o;
     const r = this.constructor, a = r._$Ev.get(e);
     if (a !== void 0 && this._$El !== a) {
       const n = r.getPropertyOptions(a), c = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) === null || o === void 0 ? void 0 : o.fromAttribute) !== void 0 ? n.converter : q;
       this._$El = a, this[a] = c.fromAttribute(t, n.type), this._$El = null;
     }
   }
   requestUpdate(e, t, o) {
     let r = !0;
     e !== void 0 && (((o = o || this.constructor.getPropertyOptions(e)).hasChanged || se)(this[e], t) ? (this._$AL.has(e) || this._$AL.set(e, t), o.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, o))) : r = !1), !this.isUpdatePending && r && (this._$E_ = this._$Ej());
   }
   async _$Ej() {
     this.isUpdatePending = !0;
     try {
       await this._$E_;
     } catch (t) {
       Promise.reject(t);
     }
     const e = this.scheduleUpdate();
     return e != null && await e, !this.isUpdatePending;
   }
   scheduleUpdate() {
     return this.performUpdate();
   }
   performUpdate() {
     var e;
     if (!this.isUpdatePending)
       return;
     this.hasUpdated, this._$Ei && (this._$Ei.forEach((r, a) => this[a] = r), this._$Ei = void 0);
     let t = !1;
     const o = this._$AL;
     try {
       t = this.shouldUpdate(o), t ? (this.willUpdate(o), (e = this._$ES) === null || e === void 0 || e.forEach((r) => {
         var a;
         return (a = r.hostUpdate) === null || a === void 0 ? void 0 : a.call(r);
       }), this.update(o)) : this._$Ek();
     } catch (r) {
       throw t = !1, this._$Ek(), r;
     }
     t && this._$AE(o);
   }
   willUpdate(e) {
   }
   _$AE(e) {
     var t;
     (t = this._$ES) === null || t === void 0 || t.forEach((o) => {
       var r;
       return (r = o.hostUpdated) === null || r === void 0 ? void 0 : r.call(o);
     }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
   }
   _$Ek() {
     this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
   }
   get updateComplete() {
     return this.getUpdateComplete();
   }
   getUpdateComplete() {
     return this._$E_;
   }
   shouldUpdate(e) {
     return !0;
   }
   update(e) {
     this._$EC !== void 0 && (this._$EC.forEach((t, o) => this._$EO(o, this[o], t)), this._$EC = void 0), this._$Ek();
   }
   updated(e) {
   }
   firstUpdated(e) {
   }
 }
 x.finalized = !0, x.elementProperties = /* @__PURE__ */ new Map(), x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, X == null || X({ ReactiveElement: x }), ((R = T.reactiveElementVersions) !== null && R !== void 0 ? R : T.reactiveElementVersions = []).push("1.4.2");
 /**
  * @license
  * Copyright 2017 Google LLC
  * SPDX-License-Identifier: BSD-3-Clause
  */
 var B;
 const U = window, k = U.trustedTypes, G = k ? k.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, u = `lit$${(Math.random() + "").slice(9)}$`, le = "?" + u, fe = `<${le}>`, _ = document, S = (i = "") => _.createComment(i), j = (i) => i === null || typeof i != "object" && typeof i != "function", de = Array.isArray, he = (i) => de(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", A = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Q = /-->/g, ee = />/g, w = RegExp(`>|[ 	
 \f\r](?:([^\\s"'>=/]+)([ 	
 \f\r]*=[ 	
 \f\r]*(?:[^ 	
 \f\r"'\`<>=]|("|')|))|$)`, "g"), te = /'/g, oe = /"/g, ce = /^(?:script|style|textarea|title)$/i, ge = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), Z = ge(1), $ = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), re = /* @__PURE__ */ new WeakMap(), y = _.createTreeWalker(_, 129, null, !1), ue = (i, e) => {
   const t = i.length - 1, o = [];
   let r, a = e === 2 ? "<svg>" : "", n = A;
   for (let s = 0; s < t; s++) {
     const l = i[s];
     let h, d, p = -1, b = 0;
     for (; b < l.length && (n.lastIndex = b, d = n.exec(l), d !== null); )
       b = n.lastIndex, n === A ? d[1] === "!--" ? n = Q : d[1] !== void 0 ? n = ee : d[2] !== void 0 ? (ce.test(d[2]) && (r = RegExp("</" + d[2], "g")), n = w) : d[3] !== void 0 && (n = w) : n === w ? d[0] === ">" ? (n = r != null ? r : A, p = -1) : d[1] === void 0 ? p = -2 : (p = n.lastIndex - d[2].length, h = d[1], n = d[3] === void 0 ? w : d[3] === '"' ? oe : te) : n === oe || n === te ? n = w : n === Q || n === ee ? n = A : (n = w, r = void 0);
     const M = n === w && i[s + 1].startsWith("/>") ? " " : "";
     a += n === A ? l + fe : p >= 0 ? (o.push(h), l.slice(0, p) + "$lit$" + l.slice(p) + u + M) : l + u + (p === -2 ? (o.push(void 0), s) : M);
   }
   const c = a + (i[t] || "<?>") + (e === 2 ? "</svg>" : "");
   if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
     throw Error("invalid template strings array");
   return [G !== void 0 ? G.createHTML(c) : c, o];
 };
 class C {
   constructor({ strings: e, _$litType$: t }, o) {
     let r;
     this.parts = [];
     let a = 0, n = 0;
     const c = e.length - 1, s = this.parts, [l, h] = ue(e, t);
     if (this.el = C.createElement(l, o), y.currentNode = this.el.content, t === 2) {
       const d = this.el.content, p = d.firstChild;
       p.remove(), d.append(...p.childNodes);
     }
     for (; (r = y.nextNode()) !== null && s.length < c; ) {
       if (r.nodeType === 1) {
         if (r.hasAttributes()) {
           const d = [];
           for (const p of r.getAttributeNames())
             if (p.endsWith("$lit$") || p.startsWith(u)) {
               const b = h[n++];
               if (d.push(p), b !== void 0) {
                 const M = r.getAttribute(b.toLowerCase() + "$lit$").split(u), H = /([.?@])?(.*)/.exec(b);
                 s.push({ type: 1, index: a, name: H[2], strings: M, ctor: H[1] === "." ? ve : H[1] === "?" ? ye : H[1] === "@" ? ke : N });
               } else
                 s.push({ type: 6, index: a });
             }
           for (const p of d)
             r.removeAttribute(p);
         }
         if (ce.test(r.tagName)) {
           const d = r.textContent.split(u), p = d.length - 1;
           if (p > 0) {
             r.textContent = k ? k.emptyScript : "";
             for (let b = 0; b < p; b++)
               r.append(d[b], S()), y.nextNode(), s.push({ type: 2, index: ++a });
             r.append(d[p], S());
           }
         }
       } else if (r.nodeType === 8)
         if (r.data === le)
           s.push({ type: 2, index: a });
         else {
           let d = -1;
           for (; (d = r.data.indexOf(u, d + 1)) !== -1; )
             s.push({ type: 7, index: a }), d += u.length - 1;
         }
       a++;
     }
   }
   static createElement(e, t) {
     const o = _.createElement("template");
     return o.innerHTML = e, o;
   }
 }
 function z(i, e, t = i, o) {
   var r, a, n, c;
   if (e === $)
     return e;
   let s = o !== void 0 ? (r = t._$Co) === null || r === void 0 ? void 0 : r[o] : t._$Cl;
   const l = j(e) ? void 0 : e._$litDirective$;
   return (s == null ? void 0 : s.constructor) !== l && ((a = s == null ? void 0 : s._$AO) === null || a === void 0 || a.call(s, !1), l === void 0 ? s = void 0 : (s = new l(i), s._$AT(i, t, o)), o !== void 0 ? ((n = (c = t)._$Co) !== null && n !== void 0 ? n : c._$Co = [])[o] = s : t._$Cl = s), s !== void 0 && (e = z(i, s._$AS(i, e.values), s, o)), e;
 }
 class we {
   constructor(e, t) {
     this.u = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
   }
   get parentNode() {
     return this._$AM.parentNode;
   }
   get _$AU() {
     return this._$AM._$AU;
   }
   v(e) {
     var t;
     const { el: { content: o }, parts: r } = this._$AD, a = ((t = e == null ? void 0 : e.creationScope) !== null && t !== void 0 ? t : _).importNode(o, !0);
     y.currentNode = a;
     let n = y.nextNode(), c = 0, s = 0, l = r[0];
     for (; l !== void 0; ) {
       if (c === l.index) {
         let h;
         l.type === 2 ? h = new P(n, n.nextSibling, this, e) : l.type === 1 ? h = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (h = new _e(n, this, e)), this.u.push(h), l = r[++s];
       }
       c !== (l == null ? void 0 : l.index) && (n = y.nextNode(), c++);
     }
     return a;
   }
   p(e) {
     let t = 0;
     for (const o of this.u)
       o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
   }
 }
 class P {
   constructor(e, t, o, r) {
     var a;
     this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = r, this._$Cm = (a = r == null ? void 0 : r.isConnected) === null || a === void 0 || a;
   }
   get _$AU() {
     var e, t;
     return (t = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && t !== void 0 ? t : this._$Cm;
   }
   get parentNode() {
     let e = this._$AA.parentNode;
     const t = this._$AM;
     return t !== void 0 && e.nodeType === 11 && (e = t.parentNode), e;
   }
   get startNode() {
     return this._$AA;
   }
   get endNode() {
     return this._$AB;
   }
   _$AI(e, t = this) {
     e = z(this, e, t), j(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== $ && this.g(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : he(e) ? this.k(e) : this.g(e);
   }
   O(e, t = this._$AB) {
     return this._$AA.parentNode.insertBefore(e, t);
   }
   T(e) {
     this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
   }
   g(e) {
     this._$AH !== m && j(this._$AH) ? this._$AA.nextSibling.data = e : this.T(_.createTextNode(e)), this._$AH = e;
   }
   $(e) {
     var t;
     const { values: o, _$litType$: r } = e, a = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = C.createElement(r.h, this.options)), r);
     if (((t = this._$AH) === null || t === void 0 ? void 0 : t._$AD) === a)
       this._$AH.p(o);
     else {
       const n = new we(a, this), c = n.v(this.options);
       n.p(o), this.T(c), this._$AH = n;
     }
   }
   _$AC(e) {
     let t = re.get(e.strings);
     return t === void 0 && re.set(e.strings, t = new C(e)), t;
   }
   k(e) {
     de(this._$AH) || (this._$AH = [], this._$AR());
     const t = this._$AH;
     let o, r = 0;
     for (const a of e)
       r === t.length ? t.push(o = new P(this.O(S()), this.O(S()), this, this.options)) : o = t[r], o._$AI(a), r++;
     r < t.length && (this._$AR(o && o._$AB.nextSibling, r), t.length = r);
   }
   _$AR(e = this._$AA.nextSibling, t) {
     var o;
     for ((o = this._$AP) === null || o === void 0 || o.call(this, !1, !0, t); e && e !== this._$AB; ) {
       const r = e.nextSibling;
       e.remove(), e = r;
     }
   }
   setConnected(e) {
     var t;
     this._$AM === void 0 && (this._$Cm = e, (t = this._$AP) === null || t === void 0 || t.call(this, e));
   }
 }
 class N {
   constructor(e, t, o, r, a) {
     this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = a, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = m;
   }
   get tagName() {
     return this.element.tagName;
   }
   get _$AU() {
     return this._$AM._$AU;
   }
   _$AI(e, t = this, o, r) {
     const a = this.strings;
     let n = !1;
     if (a === void 0)
       e = z(this, e, t, 0), n = !j(e) || e !== this._$AH && e !== $, n && (this._$AH = e);
     else {
       const c = e;
       let s, l;
       for (e = a[0], s = 0; s < a.length - 1; s++)
         l = z(this, c[o + s], t, s), l === $ && (l = this._$AH[s]), n || (n = !j(l) || l !== this._$AH[s]), l === m ? e = m : e !== m && (e += (l != null ? l : "") + a[s + 1]), this._$AH[s] = l;
     }
     n && !r && this.j(e);
   }
   j(e) {
     e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
   }
 }
 class ve extends N {
   constructor() {
     super(...arguments), this.type = 3;
   }
   j(e) {
     this.element[this.name] = e === m ? void 0 : e;
   }
 }
 const xe = k ? k.emptyScript : "";
 class ye extends N {
   constructor() {
     super(...arguments), this.type = 4;
   }
   j(e) {
     e && e !== m ? this.element.setAttribute(this.name, xe) : this.element.removeAttribute(this.name);
   }
 }
 class ke extends N {
   constructor(e, t, o, r, a) {
     super(e, t, o, r, a), this.type = 5;
   }
   _$AI(e, t = this) {
     var o;
     if ((e = (o = z(this, e, t, 0)) !== null && o !== void 0 ? o : m) === $)
       return;
     const r = this._$AH, a = e === m && r !== m || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== m && (r === m || a);
     a && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
   }
   handleEvent(e) {
     var t, o;
     typeof this._$AH == "function" ? this._$AH.call((o = (t = this.options) === null || t === void 0 ? void 0 : t.host) !== null && o !== void 0 ? o : this.element, e) : this._$AH.handleEvent(e);
   }
 }
 class _e {
   constructor(e, t, o) {
     this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
   }
   get _$AU() {
     return this._$AM._$AU;
   }
   _$AI(e) {
     z(this, e);
   }
 }
 const ie = U.litHtmlPolyfillSupport;
 ie == null || ie(C, P), ((B = U.litHtmlVersions) !== null && B !== void 0 ? B : U.litHtmlVersions = []).push("2.4.0");
 const $e = (i, e, t) => {
   var o, r;
   const a = (o = t == null ? void 0 : t.renderBefore) !== null && o !== void 0 ? o : e;
   let n = a._$litPart$;
   if (n === void 0) {
     const c = (r = t == null ? void 0 : t.renderBefore) !== null && r !== void 0 ? r : null;
     a._$litPart$ = n = new P(e.insertBefore(S(), c), c, void 0, t != null ? t : {});
   }
   return n._$AI(i), n;
 };
 /**
  * @license
  * Copyright 2017 Google LLC
  * SPDX-License-Identifier: BSD-3-Clause
  */
 var I, D;
 class E extends x {
   constructor() {
     super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
   }
   createRenderRoot() {
     var e, t;
     const o = super.createRenderRoot();
     return (e = (t = this.renderOptions).renderBefore) !== null && e !== void 0 || (t.renderBefore = o.firstChild), o;
   }
   update(e) {
     const t = this.render();
     this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = $e(t, this.renderRoot, this.renderOptions);
   }
   connectedCallback() {
     var e;
     super.connectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!0);
   }
   disconnectedCallback() {
     var e;
     super.disconnectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!1);
   }
   render() {
     return $;
   }
 }
 E.finalized = !0, E._$litElement$ = !0, (I = globalThis.litElementHydrateSupport) === null || I === void 0 || I.call(globalThis, { LitElement: E });
 const ae = globalThis.litElementPolyfillSupport;
 ae == null || ae({ LitElement: E });
 ((D = globalThis.litElementVersions) !== null && D !== void 0 ? D : globalThis.litElementVersions = []).push("3.2.2");
 /**
  * @license
  * Copyright 2017 Google LLC
  * SPDX-License-Identifier: BSD-3-Clause
  */
 const ze = (i) => (e) => typeof e == "function" ? ((t, o) => (customElements.define(t, o), o))(i, e) : ((t, o) => {
   const { kind: r, elements: a } = o;
   return { kind: r, elements: a, finisher(n) {
     customElements.define(t, n);
   } };
 })(i, e);
 /**
  * @license
  * Copyright 2017 Google LLC
  * SPDX-License-Identifier: BSD-3-Clause
  */
 const Ae = (i, e) => e.kind === "method" && e.descriptor && !("value" in e.descriptor) ? { ...e, finisher(t) {
   t.createProperty(e.key, i);
 } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e.key, initializer() {
   typeof e.initializer == "function" && (this[e.key] = e.initializer.call(this));
 }, finisher(t) {
   t.createProperty(e.key, i);
 } };
 function Ee(i) {
   return (e, t) => t !== void 0 ? ((o, r, a) => {
     r.constructor.createProperty(a, o);
   })(i, e, t) : Ae(i, e);
 }
 /**
  * @license
  * Copyright 2017 Google LLC
  * SPDX-License-Identifier: BSD-3-Clause
  */
 const Se = ({ finisher: i, descriptor: e }) => (t, o) => {
   var r;
   if (o === void 0) {
     const a = (r = t.originalKey) !== null && r !== void 0 ? r : t.key, n = e != null ? { kind: "method", placement: "prototype", key: a, descriptor: e(t.key) } : { ...t, key: a };
     return i != null && (n.finisher = function(c) {
       i(c, a);
     }), n;
   }
   {
     const a = t.constructor;
     e !== void 0 && Object.defineProperty(t, o, e(o)), i == null || i(a, o);
   }
 };
 /**
  * @license
  * Copyright 2017 Google LLC
  * SPDX-License-Identifier: BSD-3-Clause
  */
 function v(i, e) {
   return Se({ descriptor: (t) => {
     const o = { get() {
       var r, a;
       return (a = (r = this.renderRoot) === null || r === void 0 ? void 0 : r.querySelector(i)) !== null && a !== void 0 ? a : null;
     }, enumerable: !0, configurable: !0 };
     if (e) {
       const r = typeof t == "symbol" ? Symbol() : "__" + t;
       o.get = function() {
         var a, n;
         return this[r] === void 0 && (this[r] = (n = (a = this.renderRoot) === null || a === void 0 ? void 0 : a.querySelector(i)) !== null && n !== void 0 ? n : null), this[r];
       };
     }
     return o;
   } });
 }
 /**
  * @license
  * Copyright 2021 Google LLC
  * SPDX-License-Identifier: BSD-3-Clause
  */
 var W;
 ((W = window.HTMLSlotElement) === null || W === void 0 ? void 0 : W.prototype.assignedElements) != null;
 const je = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:Inter,sans-serif;font-feature-settings:normal}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}[type=text],[type=email],[type=url],[type=password],[type=number],[type=date],[type=datetime-local],[type=month],[type=search],[type=tel],[type=time],[type=week],[multiple],textarea,select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border-color:#6b7280;border-width:1px;border-radius:0;padding:.5rem .75rem;font-size:1rem;line-height:1.5rem;--tw-shadow: 0 0 #0000}[type=text]:focus,[type=email]:focus,[type=url]:focus,[type=password]:focus,[type=number]:focus,[type=date]:focus,[type=datetime-local]:focus,[type=month]:focus,[type=search]:focus,[type=tel]:focus,[type=time]:focus,[type=week]:focus,[multiple]:focus,textarea:focus,select:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: #2563eb;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);border-color:#2563eb}input::-moz-placeholder,textarea::-moz-placeholder{color:#6b7280;opacity:1}input::placeholder,textarea::placeholder{color:#6b7280;opacity:1}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-date-and-time-value{min-height:1.5em}::-webkit-datetime-edit,::-webkit-datetime-edit-year-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-meridiem-field{padding-top:0;padding-bottom:0}select{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");background-position:right .5rem center;background-repeat:no-repeat;background-size:1.5em 1.5em;padding-right:2.5rem;-webkit-print-color-adjust:exact;print-color-adjust:exact}[multiple]{background-image:initial;background-position:initial;background-repeat:unset;background-size:initial;padding-right:.75rem;-webkit-print-color-adjust:unset;print-color-adjust:unset}[type=checkbox],[type=radio]{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;display:inline-block;vertical-align:middle;background-origin:border-box;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-shrink:0;height:1rem;width:1rem;color:#2563eb;background-color:#fff;border-color:#6b7280;border-width:1px;--tw-shadow: 0 0 #0000}[type=checkbox]{border-radius:0}[type=radio]{border-radius:100%}[type=checkbox]:focus,[type=radio]:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 2px;--tw-ring-offset-color: #fff;--tw-ring-color: #2563eb;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}[type=checkbox]:checked,[type=radio]:checked{border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}[type=checkbox]:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")}[type=radio]:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e")}[type=checkbox]:checked:hover,[type=checkbox]:checked:focus,[type=radio]:checked:hover,[type=radio]:checked:focus{border-color:transparent;background-color:currentColor}[type=checkbox]:indeterminate{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}[type=checkbox]:indeterminate:hover,[type=checkbox]:indeterminate:focus{border-color:transparent;background-color:currentColor}[type=file]{background:unset;border-color:inherit;border-width:0;border-radius:0;padding:0;font-size:unset;line-height:inherit}[type=file]:focus{outline:1px solid ButtonText;outline:1px auto -webkit-focus-ring-color}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}:root{--bs-blue: #0d6efd;--bs-indigo: #6610f2;--bs-purple: #6f42c1;--bs-pink: #d63384;--bs-red: #dc3545;--bs-orange: #fd7e14;--bs-yellow: #ffc107;--bs-green: #198754;--bs-teal: #20c997;--bs-cyan: #0dcaf0;--bs-white: #fff;--bs-gray: #6c757d;--bs-gray-dark: #343a40;--bs-gray-100: #f8f9fa;--bs-gray-200: #e9ecef;--bs-gray-300: #dee2e6;--bs-gray-400: #ced4da;--bs-gray-500: #adb5bd;--bs-gray-600: #6c757d;--bs-gray-700: #495057;--bs-gray-800: #343a40;--bs-gray-900: #212529;--bs-primary: #0d6efd;--bs-secondary: #6c757d;--bs-success: #198754;--bs-info: #0dcaf0;--bs-warning: #ffc107;--bs-danger: #dc3545;--bs-light: #f8f9fa;--bs-dark: #212529;--bs-primary-rgb: 13, 110, 253;--bs-secondary-rgb: 108, 117, 125;--bs-success-rgb: 25, 135, 84;--bs-info-rgb: 13, 202, 240;--bs-warning-rgb: 255, 193, 7;--bs-danger-rgb: 220, 53, 69;--bs-light-rgb: 248, 249, 250;--bs-dark-rgb: 33, 37, 41;--bs-white-rgb: 255, 255, 255;--bs-black-rgb: 0, 0, 0;--bs-body-color-rgb: 33, 37, 41;--bs-body-bg-rgb: 255, 255, 255;--bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0));--bs-body-font-family: var(--bs-font-sans-serif);--bs-body-font-size: 1rem;--bs-body-font-weight: 400;--bs-body-line-height: 1.5;--bs-body-color: #212529;--bs-body-bg: #fff}.form-control[type=file]{overflow:hidden}.form-control[type=file]:not(:disabled):not([readonly]){cursor:pointer}.form-control:focus{box-shadow:0 0 0 1px #2563eb}.form-control::file-selector-button{padding:.375rem .75rem;margin:-.375rem -.75rem;-webkit-margin-end:.75rem;margin-inline-end:.75rem;color:#212529;background-color:#e9ecef;pointer-events:none;border-color:inherit;border-style:solid;border-width:0;border-inline-end-width:1px;border-radius:0;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}.form-control:hover:not(:disabled):not([readonly])::file-selector-button{background-color:#dde0e3}.form-control::-webkit-file-upload-button{padding:.375rem .75rem;margin:-.375rem -.75rem;-webkit-margin-end:.75rem;margin-inline-end:.75rem;color:#374151;background-color:#f3f4f6;pointer-events:none;border-color:inherit;border-style:solid;border-width:0;border-inline-end-width:1px;border-radius:0;-webkit-transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button{background-color:#dde0e3}.form-floating>.form-control{height:calc(3.5rem + 2px);line-height:1.25;padding:1rem .75rem}.form-floating>.form-control::-moz-placeholder{color:transparent}.form-floating>.form-control::placeholder{color:transparent}.form-floating>.form-control:focus{padding-top:1.625rem;padding-bottom:.625rem}.form-floating>.form-control:not(:-moz-placeholder-shown){padding-top:1.625rem;padding-bottom:.625rem}.form-floating>.form-control:not(:placeholder-shown){padding-top:1.625rem;padding-bottom:.625rem}.form-floating>.form-control:-webkit-autofill{padding-top:1.625rem;padding-bottom:.625rem}.form-floating>.form-control:focus~label{opacity:.65;transform:scale(.85) translateY(-.5rem) translate(.15rem)}.form-floating>.form-control:not(:-moz-placeholder-shown)~label{opacity:.65;transform:scale(.85) translateY(-.5rem) translate(.15rem)}.form-floating>.form-control:not(:placeholder-shown)~label{opacity:.65;transform:scale(.85) translateY(-.5rem) translate(.15rem)}.input-group>.form-control{width:1%}.input-group>.form-control:focus{z-index:3}.input-group:not(.has-validation)>.dropdown-toggle:nth-last-child(n+3){border-top-right-radius:0;border-bottom-right-radius:0}.input-group.has-validation>.dropdown-toggle:nth-last-child(n+4){border-top-right-radius:0;border-bottom-right-radius:0}.was-validated .form-control:valid{border-color:#198754;padding-right:calc(1.5em + .75rem);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.form-control.is-valid{border-color:#198754;padding-right:calc(1.5em + .75rem);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.was-validated .form-control:valid:focus{border-color:#198754;box-shadow:0 0 0 .25rem #19875440}.form-control.is-valid:focus{border-color:#198754;box-shadow:0 0 0 .25rem #19875440}.was-validated textarea.form-control:valid{padding-right:calc(1.5em + .75rem);background-position:top calc(.375em + .1875rem) right calc(.375em + .1875rem)}textarea.form-control.is-valid{padding-right:calc(1.5em + .75rem);background-position:top calc(.375em + .1875rem) right calc(.375em + .1875rem)}.was-validated .input-group .form-control:valid{z-index:1}.input-group .form-control.is-valid{z-index:1}.was-validated .input-group .form-control:valid:focus{z-index:3}.input-group .form-control.is-valid:focus{z-index:3}.is-invalid~.invalid-feedback{display:block}.is-invalid~.invalid-tooltip{display:block}.was-validated .form-control:invalid{border-color:#dc3545;padding-right:calc(1.5em + .75rem);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.form-control.is-invalid{border-color:#dc3545;padding-right:calc(1.5em + .75rem);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.was-validated .form-control:invalid:focus{border-color:#dc3545;box-shadow:0 0 0 .25rem #dc354540}.form-control.is-invalid:focus{border-color:#dc3545;box-shadow:0 0 0 .25rem #dc354540}.was-validated textarea.form-control:invalid{padding-right:calc(1.5em + .75rem);background-position:top calc(.375em + .1875rem) right calc(.375em + .1875rem)}textarea.form-control.is-invalid{padding-right:calc(1.5em + .75rem);background-position:top calc(.375em + .1875rem) right calc(.375em + .1875rem)}.form-select.is-invalid{border-color:#dc3545}.form-select.is-invalid:not([multiple]):not([size]){padding-right:4.125rem;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e"),url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");background-position:right .75rem center,center right 2.25rem;background-size:16px 12px,calc(.75em + .375rem) calc(.75em + .375rem)}.form-select.is-invalid:not([multiple])[size="1"]{padding-right:4.125rem;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e"),url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");background-position:right .75rem center,center right 2.25rem;background-size:16px 12px,calc(.75em + .375rem) calc(.75em + .375rem)}.form-select.is-invalid:focus{border-color:#dc3545;box-shadow:0 0 0 .25rem #dc354540}.form-check-input.is-invalid{border-color:#dc3545}.form-check-input.is-invalid:checked{background-color:#dc3545}.form-check-input.is-invalid:focus{box-shadow:0 0 0 .25rem #dc354540}.form-check-input.is-invalid~.form-check-label{color:#dc3545}.was-validated .input-group .form-control:invalid{z-index:2}.input-group .form-control.is-invalid,.input-group .form-select.is-invalid{z-index:2}.was-validated .input-group .form-control:invalid:focus{z-index:3}.input-group .form-control.is-invalid:focus{z-index:3}.input-group .form-select.is-invalid:focus{z-index:3}.btn.active{box-shadow:none}.btn.active:focus{box-shadow:none}.fade{transition:opacity .15s linear}.fade:not(.show){opacity:0}.collapse:not(.show){display:none}.collapsing{height:0;overflow:hidden;transition:height .35s ease}.collapsing.collapse-horizontal{width:0;height:auto;transition:width .35s ease}.dropdown-menu{z-index:1000}.dropdown-item.active,.dropdown-item:active{color:#1f2937;-webkit-text-decoration:none;text-decoration:none;background-color:#0d6efd}.dropdown-item:disabled{color:#adb5bd;pointer-events:none;background-color:transparent}.dropdown-menu.show{display:block}.dropdown-menu-dark .dropdown-item.active,.dropdown-menu-dark .dropdown-item:active{color:#fff;background-color:#0d6efd}.dropdown-menu-dark .dropdown-item.disabled{color:#adb5bd}.dropdown-menu-dark .dropdown-item:disabled{color:#adb5bd}.nav-tabs .nav-link{color:#4b5563}.nav-tabs .nav-link:hover{isolation:isolate}.nav-tabs .nav-link:focus{isolation:isolate}.nav-tabs .nav-link.disabled{color:#9ca3af;background-color:transparent;border-color:transparent}.nav-tabs .nav-link.active,.nav-tabs .nav-item.show .nav-link{color:#2563eb;border-color:#2563eb}.nav-tabs .dropdown-menu{margin-top:-1px;border-top-left-radius:0;border-top-right-radius:0}.nav-pills .nav-link{background:rgb(243,244,246);color:#4b5563;box-shadow:none}.nav-pills .nav-link.active{background:rgb(37,99,235);color:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}.nav-pills .show>.nav-link{background:rgb(37,99,235);color:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}.nav-pills .disabled{color:#9ca3af;background-color:#f3f4f680}.nav-pills.menu-sidebar .nav-link{background-color:transparent;box-shadow:none;padding:0 5px;border-radius:0}.nav-pills.menu-sidebar .nav-link.active{color:#1266f1;font-weight:600;border-left:.125rem solid #1266f1}.nav-justified>.nav-link{-ms-flex-basis:0;flex-basis:0}.nav-justified .nav-item{-ms-flex-basis:0;flex-basis:0}.tab-content>.active{display:block}.navbar-expand .navbar-nav{flex-direction:row}.navbar-expand .navbar-nav .dropdown-menu{position:absolute}.navbar-expand .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand .offcanvas{position:inherit;bottom:0;z-index:1000;-ms-flex-grow:1;flex-grow:1;visibility:visible!important;background-color:transparent;border-right:0;border-left:0;transition:none;transform:none}.navbar-light .navbar-nav .nav-link.disabled{color:#0000004d}.navbar-light .navbar-nav .show>.nav-link{color:#000000e6}.navbar-light .navbar-nav .nav-link.active{color:#000000e6}.navbar-dark .navbar-nav .nav-link.disabled{color:#ffffff40}.navbar-dark .navbar-nav .show>.nav-link{color:#fff}.navbar-dark .navbar-nav .nav-link.active{color:#fff}.accordion-item:last-of-type .accordion-button.collapsed{border-bottom-right-radius:calc(.5rem - 1px);border-bottom-left-radius:calc(.5rem - 1px)}.btn-close.disabled{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:.25}.modal{z-index:1055}.modal-dialog{margin:.5rem}.modal.fade .modal-dialog{transition:transform .3s ease-out;transform:translateY(-50px)}.modal.show .modal-dialog{transform:none}.modal.modal-static .modal-dialog{transform:scale(1.02)}.modal-dialog-scrollable .modal-body{overflow-y:auto}.modal-backdrop{position:fixed;top:0;left:0;z-index:1050;width:100vw;height:100vh;background-color:#000}.modal-backdrop.fade{opacity:0}.modal-backdrop.show{opacity:.5}.modal-body{flex:1 1 auto}.modal-fullscreen .modal-body{overflow-y:auto}.tooltip{position:absolute;z-index:1080;display:block;margin:0;font-family:var(--bs-font-sans-serif);font-style:normal;font-weight:400;line-height:1.5;-webkit-text-align:start;text-align:start;-webkit-text-decoration:none;text-decoration:none;-webkit-text-shadow:none;text-shadow:none;-webkit-text-transform:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;white-space:normal;line-break:auto;font-size:.875rem;word-wrap:break-word;opacity:0}.tooltip.show{opacity:1}.bs-tooltip-top .tooltip-arrow,.bs-tooltip-auto[data-popper-placement^=top] .tooltip-arrow{bottom:0}.bs-tooltip-top .tooltip-arrow:before{top:-1px;border-width:.4rem .4rem 0;border-top-color:#000}.bs-tooltip-auto[data-popper-placement^=top] .tooltip-arrow:before{top:-1px;border-width:.4rem .4rem 0;border-top-color:#000}.bs-tooltip-end .tooltip-arrow,.bs-tooltip-auto[data-popper-placement^=right] .tooltip-arrow{left:0;width:.4rem;height:.8rem}.bs-tooltip-end .tooltip-arrow:before{right:-1px;border-width:.4rem .4rem .4rem 0;border-right-color:#000}.bs-tooltip-auto[data-popper-placement^=right] .tooltip-arrow:before{right:-1px;border-width:.4rem .4rem .4rem 0;border-right-color:#000}.bs-tooltip-bottom .tooltip-arrow,.bs-tooltip-auto[data-popper-placement^=bottom] .tooltip-arrow{top:0}.bs-tooltip-bottom .tooltip-arrow:before{bottom:-1px;border-width:0 .4rem .4rem;border-bottom-color:#000}.bs-tooltip-auto[data-popper-placement^=bottom] .tooltip-arrow:before{bottom:-1px;border-width:0 .4rem .4rem;border-bottom-color:#000}.bs-tooltip-start .tooltip-arrow,.bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow{right:0;width:.4rem;height:.8rem}.bs-tooltip-start .tooltip-arrow:before{left:-1px;border-width:.4rem 0 .4rem .4rem;border-left-color:#000}.bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow:before{left:-1px;border-width:.4rem 0 .4rem .4rem;border-left-color:#000}.tooltip-inner{max-width:200px;font-size:14px;padding:6px 16px;color:#fff;-webkit-text-align:center;text-align:center;background-color:#6d6d6d;border-radius:.25rem}.popover{position:absolute;top:0;left:0;z-index:1070;display:block;max-width:276px;font-family:var(--bs-font-sans-serif);font-style:normal;font-weight:400;line-height:1.5;-webkit-text-align:start;text-align:start;-webkit-text-decoration:none;text-decoration:none;-webkit-text-shadow:none;text-shadow:none;-webkit-text-transform:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;white-space:normal;line-break:auto;font-size:.875rem;word-wrap:break-word;background-color:#fff;background-clip:padding-box;border:0;border-radius:.5rem;box-shadow:0 10px 15px -3px #0000001a,0 4px 6px -2px #0000000d}.bs-popover-top>.popover-arrow{bottom:calc(-.5rem - 1px)}.bs-popover-auto[data-popper-placement^=top]>.popover-arrow{bottom:calc(-.5rem - 1px)}.bs-popover-top>.popover-arrow:before{bottom:0;border-width:.5rem .5rem 0;border-top-color:#00000040}.bs-popover-auto[data-popper-placement^=top]>.popover-arrow:before{bottom:0;border-width:.5rem .5rem 0;border-top-color:#00000040}.bs-popover-top>.popover-arrow:after{bottom:1px;border-width:.5rem .5rem 0;border-top-color:#fff}.bs-popover-auto[data-popper-placement^=top]>.popover-arrow:after{bottom:1px;border-width:.5rem .5rem 0;border-top-color:#fff}.bs-popover-end>.popover-arrow{left:calc(-.5rem - 1px);width:.5rem;height:1rem}.bs-popover-auto[data-popper-placement^=right]>.popover-arrow{left:calc(-.5rem - 1px);width:.5rem;height:1rem}.bs-popover-end>.popover-arrow:before{left:0;border-width:.5rem .5rem .5rem 0;border-right-color:#00000040}.bs-popover-auto[data-popper-placement^=right]>.popover-arrow:before{left:0;border-width:.5rem .5rem .5rem 0;border-right-color:#00000040}.bs-popover-end>.popover-arrow:after{left:1px;border-width:.5rem .5rem .5rem 0;border-right-color:#fff}.bs-popover-auto[data-popper-placement^=right]>.popover-arrow:after{left:1px;border-width:.5rem .5rem .5rem 0;border-right-color:#fff}.bs-popover-bottom>.popover-arrow{top:calc(-.5rem - 1px)}.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow{top:calc(-.5rem - 1px)}.bs-popover-bottom>.popover-arrow:before{top:0;border-width:0 .5rem .5rem .5rem;border-bottom-color:#00000040}.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow:before{top:0;border-width:0 .5rem .5rem .5rem;border-bottom-color:#00000040}.bs-popover-bottom>.popover-arrow:after{top:1px;border-width:0 .5rem .5rem .5rem;border-bottom-color:#fff}.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow:after{top:1px;border-width:0 .5rem .5rem .5rem;border-bottom-color:#fff}.bs-popover-bottom .popover-header:before{position:absolute;top:0;left:50%;display:block;width:1rem;margin-left:-.5rem;content:"";border-bottom:1px solid #f0f0f0}.bs-popover-auto[data-popper-placement^=bottom] .popover-header:before{position:absolute;top:0;left:50%;display:block;width:1rem;margin-left:-.5rem;content:"";border-bottom:1px solid #f0f0f0}.bs-popover-start>.popover-arrow{right:calc(-.5rem - 1px);width:.5rem;height:1rem}.bs-popover-auto[data-popper-placement^=left]>.popover-arrow{right:calc(-.5rem - 1px);width:.5rem;height:1rem}.bs-popover-start>.popover-arrow:before{right:0;border-width:.5rem 0 .5rem .5rem;border-left-color:#00000040}.bs-popover-auto[data-popper-placement^=left]>.popover-arrow:before{right:0;border-width:.5rem 0 .5rem .5rem;border-left-color:#00000040}.bs-popover-start>.popover-arrow:after{right:1px;border-width:.5rem 0 .5rem .5rem;border-left-color:#fff}.bs-popover-auto[data-popper-placement^=left]>.popover-arrow:after{right:1px;border-width:.5rem 0 .5rem .5rem;border-left-color:#fff}.popover-header{padding:.5rem 1rem;margin-bottom:0;font-size:1rem;background-color:#fff;border-bottom:1px solid rgba(0,0,0,.2);border-top-left-radius:.5rem;border-top-right-radius:.5rem;font-weight:500}.popover-header:empty{display:none}.popover-body{padding:1rem;color:#212529}.carousel.pointer-event{touch-action:pan-y}.carousel-item{display:none;margin-right:-100%;-webkit-backface-visibility:hidden;backface-visibility:hidden;transition:transform .6s ease-in-out}.carousel-item.active,.carousel-item-next,.carousel-item-prev{display:block}.carousel-item-next:not(.carousel-item-start){transform:translate(100%)}.active.carousel-item-end{transform:translate(100%)}.carousel-item-prev:not(.carousel-item-end){transform:translate(-100%)}.active.carousel-item-start{transform:translate(-100%)}.carousel-fade .carousel-item{opacity:0;transition-property:opacity;transform:none}.carousel-fade .carousel-item.active,.carousel-fade .carousel-item-next.carousel-item-start,.carousel-fade .carousel-item-prev.carousel-item-end{z-index:1;opacity:1}.carousel-fade .active.carousel-item-start,.carousel-fade .active.carousel-item-end{z-index:0;opacity:0;transition:opacity 0s .6s}.carousel-indicators{z-index:2;margin-right:15%;margin-left:15%;list-style:none}.carousel-indicators [data-bs-target]{box-sizing:content-box;flex:0 1 auto;width:30px;height:3px;padding:0;margin-right:3px;margin-left:3px;-webkit-text-indent:-999px;text-indent:-999px;cursor:pointer;background-color:#fff;background-clip:padding-box;border:0;border-top:10px solid transparent;border-bottom:10px solid transparent;opacity:.5;transition:opacity .6s ease}.carousel-indicators .active{opacity:1}.carousel-dark .carousel-indicators [data-bs-target]{background-color:#000}.offcanvas{z-index:1045}.offcanvas-backdrop{position:fixed;top:0;left:0;z-index:1040;width:100vw;height:100vh;background-color:#000}.offcanvas-backdrop.fade{opacity:0}.offcanvas-backdrop.show{opacity:.5}.offcanvas.show{transform:none}.sticky-top{position:sticky;top:0;z-index:1020}.vr{display:inline-block;align-self:stretch;width:1px;min-height:1em;background-color:currentColor;opacity:.25}.animation{animation-duration:1s;animation-fill-mode:both;padding:auto}.fade-in{animation-name:_fade-in}.fade-out{animation-name:_fade-out}.animation.infinite{animation-iteration-count:infinite}.animation.delay-1s{animation-delay:1s}.animation.delay-2s{animation-delay:2s}.animation.delay-3s{animation-delay:3s}.animation.delay-4s{animation-delay:4s}.animation.delay-5s{animation-delay:5s}.animation.fast{animation-duration:.8s}.animation.faster{animation-duration:.5s}.animation.slow{animation-duration:2s}.animation.slower{animation-duration:3s}.slide-in-left{animation-name:_slide-in-left}.slide-in-right{animation-name:_slide-in-right}.slide-out-left{animation-name:_slide-out-left}.slide-out-right{animation-name:_slide-out-right}.ripple-surface{position:relative;overflow:hidden;display:inline-block;vertical-align:bottom}.ripple-surface-unbound{overflow:visible}.ripple-wave{background-image:radial-gradient(circle,rgba(0,0,0,.2) 0,rgba(0,0,0,.3) 40%,rgba(0,0,0,.4) 50%,rgba(0,0,0,.5) 60%,transparent 70%);border-radius:50%;opacity:.5;pointer-events:none;position:absolute;touch-action:none;transform:scale(0);transition-property:transform,opacity;transition-timing-function:cubic-bezier(0,0,.15,1),cubic-bezier(0,0,.15,1);z-index:999}.ripple-wave.active{transform:scale(1);opacity:0}.btn .ripple-wave{background-image:radial-gradient(circle,hsla(0deg,0%,100%,.2) 0,hsla(0deg,0%,100%,.3) 40%,hsla(0deg,0%,100%,.4) 50%,hsla(0deg,0%,100%,.5) 60%,hsla(0deg,0%,100%,0) 70%)}.ripple-surface-primary .ripple-wave{background-image:radial-gradient(circle,rgba(18,102,241,.2) 0,rgba(18,102,241,.3) 40%,rgba(18,102,241,.4) 50%,rgba(18,102,241,.5) 60%,rgba(18,102,241,0) 70%)}.ripple-surface-secondary .ripple-wave{background-image:radial-gradient(circle,rgba(178,60,253,.2) 0,rgba(178,60,253,.3) 40%,rgba(178,60,253,.4) 50%,rgba(178,60,253,.5) 60%,rgba(178,60,253,0) 70%)}.ripple-surface-success .ripple-wave{background-image:radial-gradient(circle,rgba(0,183,74,.2) 0,rgba(0,183,74,.3) 40%,rgba(0,183,74,.4) 50%,rgba(0,183,74,.5) 60%,rgba(0,183,74,0) 70%)}.ripple-surface-info .ripple-wave{background-image:radial-gradient(circle,rgba(57,192,237,.2) 0,rgba(57,192,237,.3) 40%,rgba(57,192,237,.4) 50%,rgba(57,192,237,.5) 60%,rgba(57,192,237,0) 70%)}.ripple-surface-warning .ripple-wave{background-image:radial-gradient(circle,rgba(255,169,0,.2) 0,rgba(255,169,0,.3) 40%,rgba(255,169,0,.4) 50%,rgba(255,169,0,.5) 60%,rgba(255,169,0,0) 70%)}.ripple-surface-danger .ripple-wave{background-image:radial-gradient(circle,rgba(249,49,84,.2) 0,rgba(249,49,84,.3) 40%,rgba(249,49,84,.4) 50%,rgba(249,49,84,.5) 60%,rgba(249,49,84,0) 70%)}.ripple-surface-light .ripple-wave{background-image:radial-gradient(circle,hsla(0deg,0%,98.4%,.2) 0,hsla(0deg,0%,98.4%,.3) 40%,hsla(0deg,0%,98.4%,.4) 50%,hsla(0deg,0%,98.4%,.5) 60%,hsla(0deg,0%,98.4%,0) 70%)}.ripple-surface-dark .ripple-wave{background-image:radial-gradient(circle,rgba(38,38,38,.2) 0,rgba(38,38,38,.3) 40%,rgba(38,38,38,.4) 50%,rgba(38,38,38,.5) 60%,rgba(38,38,38,0) 70%)}.ripple-surface-white .ripple-wave{background-image:radial-gradient(circle,hsla(0deg,0%,100%,.2) 0,hsla(0deg,0%,100%,.3) 40%,hsla(0deg,0%,100%,.4) 50%,hsla(0deg,0%,100%,.5) 60%,hsla(0deg,0%,100%,0) 70%)}.ripple-surface-black .ripple-wave{background-image:radial-gradient(circle,rgba(0,0,0,.2) 0,rgba(0,0,0,.3) 40%,rgba(0,0,0,.4) 50%,rgba(0,0,0,.5) 60%,transparent 70%)}.datepicker-toggle-button{position:absolute;outline:none;border:none;background-color:transparent;right:10px;top:50%;transform:translate(-50%,-50%)}.datepicker-toggle-button:focus{color:#2979ff}.datepicker-toggle-button:hover{color:#2979ff}.datepicker-backdrop{width:100%;height:100%;position:fixed;top:0;right:0;bottom:0;left:0;background-color:#0006;z-index:1065}.datepicker-dropdown-container{width:328px;height:380px;background-color:#fff;border-radius:.5rem;box-shadow:0 10px 15px -3px #00000012,0 4px 6px -2px #0000000d;z-index:1066}.datepicker-modal-container{display:flex;flex-direction:column;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:328px;height:512px;background-color:#fff;border-radius:.6rem .6rem .5rem .5rem;box-shadow:0 10px 15px -3px #00000012,0 4px 6px -2px #0000000d;z-index:1066}.datepicker-header{height:120px;padding-right:24px;padding-left:24px;background-color:#2979ff;display:flex;flex-direction:column;border-radius:.5rem .5rem 0 0}.datepicker-title{height:32px;display:flex;flex-direction:column;justify-content:flex-end}.datepicker-title-text{font-size:10px;font-weight:400;-webkit-text-transform:uppercase;text-transform:uppercase;letter-spacing:1.7px;color:#fff}.datepicker-date{height:72px;display:flex;flex-direction:column;justify-content:flex-end}.datepicker-date-text{font-size:34px;font-weight:400;color:#fff}.datepicker-main{position:relative;height:100%}.datepicker-date-controls{padding:10px 12px 0;display:flex;justify-content:space-between;color:#000000a3}.datepicker-view-change-button{padding:10px;color:#666;font-weight:500;font-size:.9rem;border-radius:10px;box-shadow:none;background-color:transparent;margin:0;border:none}.datepicker-view-change-button:hover{background-color:#eee}.datepicker-view-change-button:focus{background-color:#eee}.datepicker-view-change-button:after{content:"";display:inline-block;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top-width:5px;border-top-style:solid;margin:0 0 0 5px;vertical-align:middle}.datepicker-arrow-controls{margin-top:10px}.datepicker-previous-button{position:relative;padding:0;width:40px;height:40px;line-height:40px;border:none;outline:none;margin:0 24px 0 0;color:#000000a3;background-color:transparent}.datepicker-previous-button:hover{background-color:#eee;border-radius:50%}.datepicker-previous-button:focus{background-color:#eee;border-radius:50%}.datepicker-previous-button:after{top:0;left:0;right:0;bottom:0;position:absolute;content:"";margin:15.5px;border:0 solid currentColor;border-top-width:2px;border-left-width:2px;transform:translate(2px) rotate(-45deg)}.datepicker-next-button{position:relative;padding:0;width:40px;height:40px;line-height:40px;border:none;outline:none;margin:0;color:#000000a3;background-color:transparent}.datepicker-next-button:hover{background-color:#eee;border-radius:50%}.datepicker-next-button:focus{background-color:#eee;border-radius:50%}.datepicker-next-button:after{top:0;left:0;right:0;bottom:0;position:absolute;content:"";margin:15.5px;border:0 solid currentColor;border-top-width:2px;border-right-width:2px;transform:translate(-2px) rotate(45deg)}.datepicker-view{padding-left:12px;padding-right:12px;outline:none}.datepicker-table{margin-right:auto;margin-left:auto;width:304px}.datepicker-day-heading{width:40px;height:40px;-webkit-text-align:center;text-align:center;font-size:12px;font-weight:400}.datepicker-cell{-webkit-text-align:center;text-align:center}.datepicker-cell.disabled{color:#ccc;cursor:default;pointer-events:none}.datepicker-cell.disabled:hover{cursor:default}.datepicker-cell:hover{cursor:pointer}.datepicker-cell:not(.disabled):not(.selected):hover .datepicker-cell-content{background-color:#d3d3d3}.datepicker-cell.selected .datepicker-cell-content{background-color:#2979ff;color:#fff}.datepicker-cell:not(.selected).focused .datepicker-cell-content{background-color:#eee}.datepicker-cell.focused .datepicker-cell-content.selected{background-color:#2979ff}.datepicker-cell.current .datepicker-cell-content{border:1px solid #000}.datepicker-small-cell{width:40px;height:40px}.datepicker-small-cell-content{width:36px;height:36px;line-height:36px;border-radius:50%;font-size:13px}.datepicker-large-cell{width:76px;height:42px}.datepicker-large-cell-content{width:72px;height:40px;line-height:40px;padding:1px 2px;border-radius:999px}.datepicker-footer{height:56px;display:flex;position:absolute;width:100%;bottom:0;justify-content:flex-end;align-items:center;padding-left:12px;padding-right:12px}.datepicker-footer-btn{background-color:#fff;color:#2979ff;border:none;cursor:pointer;padding:0 10px;-webkit-text-transform:uppercase;text-transform:uppercase;font-size:.8rem;font-weight:500;height:40px;line-height:40px;letter-spacing:.1rem;border-radius:10px;margin-bottom:10px}.datepicker-footer-btn:hover{background-color:#eee}.datepicker-footer-btn:focus{background-color:#eee}.datepicker-clear-btn{margin-right:auto}.timepicker-wrapper{touch-action:none;z-index:1065;opacity:0;right:0;bottom:0;top:0;left:0;background-color:#0006}.timepicker-elements{min-width:310px;min-height:325px;background:#fff;border-top-right-radius:.6rem;border-top-left-radius:.6rem}.timepicker-head{background-color:#2979ff;height:100px;border-top-right-radius:.5rem;border-top-left-radius:.5rem;padding:10px 24px 10px 50px}.timepicker-button{font-size:.8rem;min-width:64px;box-sizing:border-box;font-weight:500;line-height:40px;border-radius:10px;letter-spacing:.1rem;-webkit-text-transform:uppercase;text-transform:uppercase;color:#2979ff;border:none;background-color:transparent;transition:background-color .25s cubic-bezier(.4,0,.2,1) 0ms,box-shadow .25s cubic-bezier(.4,0,.2,1) 0ms,border .25s cubic-bezier(.4,0,.2,1) 0ms;outline:none;padding:0 10px;height:40px;margin-bottom:10px}.timepicker-button:hover{background-color:#00000014}.timepicker-button:focus{outline:none;background-color:#00000014}.timepicker-current{font-size:3.75rem;font-weight:300;line-height:1.2;letter-spacing:-.00833em;color:#fff;opacity:.54;border:none;background:transparent;padding:0}.timepicker-current.active{opacity:1}.timepicker-current-wrapper{direction:ltr}.timepicker-mode-wrapper{margin-left:20px;font-size:18px;color:#ffffff8a}.timepicker-mode-wrapper.active{opacity:1}.timepicker-clock-wrapper{min-width:310px;max-width:325px;min-height:305px;overflow-x:hidden;height:100%}.timepicker-clock{position:relative;border-radius:100%;width:260px;height:260px;cursor:default;margin:0 auto;background-color:#00000012}.timepicker-time-tips-minutes.active,.timepicker-time-tips-inner.active,.timepicker-time-tips-hours.active{color:#fff;background-color:#2979ff;font-weight:400}.timepicker-time-tips-minutes.disabled,.timepicker-time-tips-inner.disabled,.timepicker-time-tips-hours.disabled{color:#b3afaf;pointer-events:none;background-color:transparent}.timepicker-dot{font-weight:300;line-height:1.2;letter-spacing:-.00833em;color:#fff;font-size:3.75rem;opacity:.54;border:none;background:transparent;padding:0}.timepicker-middle-dot{top:50%;left:50%;width:6px;height:6px;transform:translate(-50%,-50%);border-radius:50%;background-color:#2979ff}.timepicker-hand-pointer{background-color:#2979ff;bottom:50%;height:40%;left:calc(50% - 1px);transform-origin:center bottom 0;width:2px}.timepicker-time-tips.active{color:#fff}.timepicker-circle{top:-21px;left:-15px;width:4px;border:14px solid #2979ff;height:4px;box-sizing:content-box;border-radius:100%}.timepicker-hour-mode{padding:0;background-color:transparent;border:none;color:#fff;opacity:.54;cursor:pointer}.timepicker-hour,.timepicker-minute{cursor:pointer}.timepicker-hour-mode:hover{background-color:#00000026;outline:none}.timepicker-hour-mode:focus{background-color:#00000026;outline:none}.timepicker-hour:hover{background-color:#00000026;outline:none}.timepicker-hour:focus{background-color:#00000026;outline:none}.timepicker-minute:hover{background-color:#00000026;outline:none}.timepicker-minute:focus{background-color:#00000026;outline:none}.timepicker-hour-mode.active,.timepicker-hour.active,.timepicker-minute.active{color:#fff;opacity:1}.timepicker-footer{border-bottom-left-radius:.5rem;border-bottom-right-radius:.5rem;display:flex;justify-content:space-between;align-items:center;width:100%;height:56px;padding-left:12px;padding-right:12px;background-color:#fff}.timepicker-container{max-height:calc(100% - 64px);overflow-y:auto;box-shadow:0 10px 15px -3px #00000012,0 4px 6px -2px #0000000d}.timepicker-icon-up.active,.timepicker-icon-down.active{opacity:1}.timepicker-toggle-button{position:absolute;outline:none;border:none;background-color:transparent;right:10px;top:50%;transform:translate(-50%,-50%);transition:all .3s ease;cursor:pointer}.timepicker-toggle-button:hover{color:#2979ff}.timepicker-toggle-button:focus{color:#2979ff}.timepicker-input:focus+.timepicker-toggle-button{color:#2979ff}.timepicker-input:focus+.timepicker-toggle-button i{color:#2979ff}.timepicker a.timepicker-toggle-button,.timepicker-toggle-button.timepicker-icon{right:1px}.timepicker-modal .fade.show{opacity:1}.stepper{position:relative;padding:0;margin:0;width:100%;list-style:none;overflow:hidden;transition:height .2s ease-in-out}.stepper:not(.stepper-vertical){display:flex;justify-content:space-between}.stepper:not(.stepper-vertical) .stepper-content{position:absolute;width:100%;padding:1rem}.stepper:not(.stepper-vertical) .stepper-step{flex:auto;height:4.5rem}.stepper:not(.stepper-vertical) .stepper-step:first-child .stepper-head{padding-left:1.5rem}.stepper:not(.stepper-vertical) .stepper-step:last-child .stepper-head{padding-right:1.5rem}.stepper:not(.stepper-vertical) .stepper-step:not(:first-child) .stepper-head:before{flex:1;height:1px;width:100%;margin-right:.5rem;content:"";background-color:#0000001a}.stepper:not(.stepper-vertical) .stepper-step:not(:last-child) .stepper-head:after{flex:1;height:1px;width:100%;margin-left:.5rem;content:"";background-color:#0000001a}.stepper:not(.stepper-vertical) .stepper-head-icon{margin:1.5rem .5rem 1.5rem 0}.stepper.stepper-mobile{justify-content:center;align-items:flex-end}.stepper.stepper-mobile.stepper-progress-bar .stepper-head-icon{display:none}.stepper.stepper-mobile .stepper-step{flex:unset;height:-moz-fit-content;height:fit-content;margin:1rem 0}.stepper.stepper-mobile .stepper-step:not(:last-child) .stepper-head:after{margin-left:0}.stepper.stepper-mobile .stepper-step:not(:first-child) .stepper-head:before{margin-right:0}.stepper.stepper-mobile .stepper-step:not(:last-child):not(:first-child) .stepper-head{padding-left:.25rem;padding-right:.25rem}.stepper.stepper-mobile .stepper-head-icon{font-size:0;margin:0;height:.5rem;width:.5rem;z-index:1}.stepper.stepper-mobile .stepper-head-text{display:none}.stepper.stepper-mobile .stepper-content{top:2.56rem}.collapse{visibility:visible!important}@media (prefers-reduced-motion: reduce){.form-control::file-selector-button{transition:none}.form-control::-webkit-file-upload-button{-webkit-transition:none;transition:none}.form-switch .form-check-input{transition:none}.form-range::-webkit-slider-thumb{-webkit-transition:none;transition:none}.form-range::-moz-range-thumb{-moz-transition:none;transition:none}.form-floating>label{transition:none}.fade,.collapsing,.collapsing.collapse-horizontal{transition:none}.accordion-button:after{transition:none}.modal.fade .modal-dialog,.carousel-item,.carousel-fade .active.carousel-item-start,.carousel-fade .active.carousel-item-end,.carousel-control-prev,.carousel-control-next,.carousel-indicators [data-bs-target]{transition:none}.spinner-border,.spinner-grow{animation-duration:1.5s}}@media (min-width: 576px){.navbar-expand-sm{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-sm .navbar-nav{flex-direction:row}.navbar-expand-sm .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-sm .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-sm .navbar-nav-scroll{overflow:visible}.navbar-expand-sm .navbar-collapse{display:flex!important;-ms-flex-basis:auto;flex-basis:auto}.navbar-expand-sm .navbar-toggler,.navbar-expand-sm .offcanvas-header{display:none}.navbar-expand-sm .offcanvas{position:inherit;bottom:0;z-index:1000;-ms-flex-grow:1;flex-grow:1;visibility:visible!important;background-color:transparent;border-right:0;border-left:0;transition:none;transform:none}.navbar-expand-sm .offcanvas-top,.navbar-expand-sm .offcanvas-bottom{height:auto;border-top:0;border-bottom:0}.navbar-expand-sm .offcanvas-body{display:flex;-ms-flex-grow:0;flex-grow:0;padding:0;overflow-y:visible}.modal-dialog{max-width:500px;margin:1.75rem auto}.modal-dialog-scrollable{height:calc(100% - 3.5rem)}.modal-dialog-centered{min-height:calc(100% - 3.5rem)}.modal-sm{max-width:300px}.sticky-sm-top{position:sticky;top:0;z-index:1020}}@media (min-width: 768px){.navbar-expand-md{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-md .navbar-nav{flex-direction:row}.navbar-expand-md .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-md .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-md .navbar-nav-scroll{overflow:visible}.navbar-expand-md .navbar-collapse{display:flex!important;-ms-flex-basis:auto;flex-basis:auto}.navbar-expand-md .navbar-toggler,.navbar-expand-md .offcanvas-header{display:none}.navbar-expand-md .offcanvas{position:inherit;bottom:0;z-index:1000;-ms-flex-grow:1;flex-grow:1;visibility:visible!important;background-color:transparent;border-right:0;border-left:0;transition:none;transform:none}.navbar-expand-md .offcanvas-top,.navbar-expand-md .offcanvas-bottom{height:auto;border-top:0;border-bottom:0}.navbar-expand-md .offcanvas-body{display:flex;-ms-flex-grow:0;flex-grow:0;padding:0;overflow-y:visible}.sticky-md-top{position:sticky;top:0;z-index:1020}}@media (min-width: 992px){.navbar-expand-lg{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-lg .navbar-nav{flex-direction:row}.navbar-expand-lg .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-lg .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-lg .navbar-nav-scroll{overflow:visible}.navbar-expand-lg .navbar-collapse{display:flex!important;-ms-flex-basis:auto;flex-basis:auto}.navbar-expand-lg .navbar-toggler,.navbar-expand-lg .offcanvas-header{display:none}.navbar-expand-lg .offcanvas{position:inherit;bottom:0;z-index:1000;-ms-flex-grow:1;flex-grow:1;visibility:visible!important;background-color:transparent;border-right:0;border-left:0;transition:none;transform:none}.navbar-expand-lg .offcanvas-top,.navbar-expand-lg .offcanvas-bottom{height:auto;border-top:0;border-bottom:0}.navbar-expand-lg .offcanvas-body{display:flex;-ms-flex-grow:0;flex-grow:0;padding:0;overflow-y:visible}.modal-lg,.modal-xl{max-width:800px}.sticky-lg-top{position:sticky;top:0;z-index:1020}}@media (min-width: 1200px){.navbar-expand-xl{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-xl .navbar-nav{flex-direction:row}.navbar-expand-xl .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-xl .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-xl .navbar-nav-scroll{overflow:visible}.navbar-expand-xl .navbar-collapse{display:flex!important;-ms-flex-basis:auto;flex-basis:auto}.navbar-expand-xl .navbar-toggler,.navbar-expand-xl .offcanvas-header{display:none}.navbar-expand-xl .offcanvas{position:inherit;bottom:0;z-index:1000;-ms-flex-grow:1;flex-grow:1;visibility:visible!important;background-color:transparent;border-right:0;border-left:0;transition:none;transform:none}.navbar-expand-xl .offcanvas-top,.navbar-expand-xl .offcanvas-bottom{height:auto;border-top:0;border-bottom:0}.navbar-expand-xl .offcanvas-body{display:flex;-ms-flex-grow:0;flex-grow:0;padding:0;overflow-y:visible}.modal-xl{max-width:1140px}.sticky-xl-top{position:sticky;top:0;z-index:1020}}@media (min-width: 1400px){.navbar-expand-xxl{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-xxl .navbar-nav{flex-direction:row}.navbar-expand-xxl .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-xxl .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-xxl .navbar-nav-scroll{overflow:visible}.navbar-expand-xxl .navbar-collapse{display:flex!important;-ms-flex-basis:auto;flex-basis:auto}.navbar-expand-xxl .navbar-toggler,.navbar-expand-xxl .offcanvas-header{display:none}.navbar-expand-xxl .offcanvas{position:inherit;bottom:0;z-index:1000;-ms-flex-grow:1;flex-grow:1;visibility:visible!important;background-color:transparent;border-right:0;border-left:0;transition:none;transform:none}.navbar-expand-xxl .offcanvas-top,.navbar-expand-xxl .offcanvas-bottom{height:auto;border-top:0;border-bottom:0}.navbar-expand-xxl .offcanvas-body{display:flex;-ms-flex-grow:0;flex-grow:0;padding:0;overflow-y:visible}.sticky-xxl-top{position:sticky;top:0;z-index:1020}}@media (max-width: 575.98px){.modal-fullscreen-sm-down{width:100vw;max-width:none;height:100%;margin:0}.modal-fullscreen-sm-down .modal-content{height:100%;border:0;border-radius:0}.modal-fullscreen-sm-down .modal-header{border-radius:0}.modal-fullscreen-sm-down .modal-body{overflow-y:auto}.modal-fullscreen-sm-down .modal-footer{border-radius:0}}@media (max-width: 767.98px){.modal-fullscreen-md-down{width:100vw;max-width:none;height:100%;margin:0}.modal-fullscreen-md-down .modal-content{height:100%;border:0;border-radius:0}.modal-fullscreen-md-down .modal-header{border-radius:0}.modal-fullscreen-md-down .modal-body{overflow-y:auto}.modal-fullscreen-md-down .modal-footer{border-radius:0}}@media (max-width: 991.98px){.modal-fullscreen-lg-down{width:100vw;max-width:none;height:100%;margin:0}.modal-fullscreen-lg-down .modal-content{height:100%;border:0;border-radius:0}.modal-fullscreen-lg-down .modal-header{border-radius:0}.modal-fullscreen-lg-down .modal-body{overflow-y:auto}.modal-fullscreen-lg-down .modal-footer{border-radius:0}}@media (max-width: 1199.98px){.modal-fullscreen-xl-down{width:100vw;max-width:none;height:100%;margin:0}.modal-fullscreen-xl-down .modal-content{height:100%;border:0;border-radius:0}.modal-fullscreen-xl-down .modal-header{border-radius:0}.modal-fullscreen-xl-down .modal-body{overflow-y:auto}.modal-fullscreen-xl-down .modal-footer{border-radius:0}}@media (max-width: 1399.98px){.modal-fullscreen-xxl-down{width:100vw;max-width:none;height:100%;margin:0}.modal-fullscreen-xxl-down .modal-content{height:100%;border:0;border-radius:0}.modal-fullscreen-xxl-down .modal-header{border-radius:0}.modal-fullscreen-xxl-down .modal-body{overflow-y:auto}.modal-fullscreen-xxl-down .modal-footer{border-radius:0}}@media (prefers-reduced-motion){.animation{transition:none!important;animation:unset!important}}@media screen and (min-width: 320px) and (max-width: 820px) and (orientation: landscape){.datepicker-modal-container .datepicker-header{height:100%}.datepicker-modal-container .datepicker-date{margin-top:100px}.datepicker-modal-container .datepicker-day-cell{width:32x;height:32x}.datepicker-modal-container{flex-direction:row;width:475px;height:360px}.datepicker-modal-container.datepicker-day-cell{width:36px;height:36px}}@media screen and (min-width: 320px) and (max-width: 825px) and (orientation: landscape){.timepicker-elements{flex-direction:row!important;border-bottom-left-radius:.5rem;min-width:auto;min-height:auto;overflow-y:auto}.timepicker-head{border-top-right-radius:0;border-bottom-left-radius:0;padding:10px;padding-right:10px!important;height:auto;min-height:305px}.timepicker-head-content{flex-direction:column}.timepicker-mode-wrapper{justify-content:space-around!important;flex-direction:row!important}.timepicker-current,.timepicker-dot{font-size:3rem;font-weight:400}}@keyframes _spinner-grow{0%{transform:scale(0)}50%{opacity:1;transform:none}}@keyframes _fade-in{0%{opacity:0}to{opacity:1}}@keyframes _fade-out{0%{opacity:1}to{opacity:0}}@keyframes _fade-in-down{0%{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:translateZ(0)}}@keyframes _fade-in-left{0%{opacity:0;transform:translate3d(-100%,0,0)}to{opacity:1;transform:translateZ(0)}}@keyframes _fade-in-right{0%{opacity:0;transform:translate3d(100%,0,0)}to{opacity:1;transform:translateZ(0)}}@keyframes _fade-in-up{0%{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:translateZ(0)}}@keyframes _fade-out-down{0%{opacity:1}to{opacity:0;transform:translate3d(0,100%,0)}}@keyframes _fade-out-left{0%{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0)}}@keyframes _fade-out-right{0%{opacity:1}to{opacity:0;transform:translate3d(100%,0,0)}}@keyframes _fade-out-up{0%{opacity:1}to{opacity:0;transform:translate3d(0,-100%,0)}}@keyframes _slide-in-down{0%{visibility:visible;transform:translate3d(0,-100%,0)}to{transform:translateZ(0)}}@keyframes _slide-in-left{0%{visibility:visible;transform:translate3d(-100%,0,0)}to{transform:translateZ(0)}}@keyframes _slide-in-right{0%{visibility:visible;transform:translate3d(100%,0,0)}to{transform:translateZ(0)}}@keyframes _slide-in-up{0%{visibility:visible;transform:translate3d(0,100%,0)}to{transform:translateZ(0)}}@keyframes _slide-out-down{0%{transform:translateZ(0)}to{visibility:hidden;transform:translate3d(0,100%,0)}}@keyframes _slide-out-left{0%{transform:translateZ(0)}to{visibility:hidden;transform:translate3d(-100%,0,0)}}@keyframes _slide-out-right{0%{transform:translateZ(0)}to{visibility:hidden;transform:translate3d(100%,0,0)}}@keyframes _slide-out-up{0%{transform:translateZ(0)}to{visibility:hidden;transform:translate3d(0,-100%,0)}}@keyframes _slide-down{0%{transform:translateZ(0)}to{transform:translate3d(0,100%,0)}}@keyframes _slide-left{0%{transform:translateZ(0)}to{transform:translate3d(-100%,0,0)}}@keyframes _slide-right{0%{transform:translateZ(0)}to{transform:translate3d(100%,0,0)}}@keyframes _slide-up{0%{transform:translateZ(0)}to{transform:translate3d(0,-100%,0)}}@keyframes _zoom-in{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes _zoom-out{0%{opacity:1}50%{opacity:0;transform:scale3d(.3,.3,.3)}to{opacity:0}}@keyframes _tada{0%{transform:scaleZ(1)}10%{transform:scale3d(.9,.9,.9) rotate3d(0,0,1,-3deg)}20%{transform:scale3d(.9,.9,.9) rotate3d(0,0,1,-3deg)}30%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}50%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}70%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}90%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}60%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}80%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{transform:scaleZ(1)}}@keyframes _pulse{0%{transform:scaleZ(1)}50%{transform:scale3d(1.05,1.05,1.05)}to{transform:scaleZ(1)}}@keyframes _show-up-clock{0%{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.visible{visibility:visible}.collapse{visibility:collapse}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.m-0{margin:0}.my-4{margin-top:1rem;margin-bottom:1rem}.mx-4{margin-left:1rem;margin-right:1rem}.mb-4{margin-bottom:1rem}.mr-3{margin-right:.75rem}.mb-12{margin-bottom:3rem}.mb-0{margin-bottom:0}.mr-4{margin-right:1rem}.mb-6{margin-bottom:1.5rem}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.table{display:table}.hidden{display:none}.h-5{height:1.25rem}.h-screen{height:100vh}.h-full{height:100%}.h-6{height:1.5rem}.w-5{width:1.25rem}.w-full{width:100%}.w-6{width:1.5rem}.flex-shrink-0{flex-shrink:0}.grow-0{flex-grow:0}.basis-auto{flex-basis:auto}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.resize{resize:both}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.justify-evenly{justify-content:space-evenly}.rounded-lg{border-radius:.5rem}.rounded{border-radius:.25rem}.border{border-width:1px}.border-solid{border-style:solid}.border-gray-300{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity))}.bg-red-100{--tw-bg-opacity: 1;background-color:rgb(254 226 226 / var(--tw-bg-opacity))}.bg-green-100{--tw-bg-opacity: 1;background-color:rgb(220 252 231 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-blue-600{--tw-bg-opacity: 1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))}.bg-clip-padding{background-clip:padding-box}.p-4{padding:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.px-4{padding-left:1rem;padding-right:1rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.px-7{padding-left:1.75rem;padding-right:1.75rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.text-center{text-align:center}.text-xs{font-size:.75rem;line-height:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.font-medium{font-weight:500}.font-semibold{font-weight:600}.font-normal{font-weight:400}.uppercase{text-transform:uppercase}.leading-snug{line-height:1.375}.tracking-wide{letter-spacing:.025em}.text-red-600{--tw-text-opacity: 1;color:rgb(220 38 38 / var(--tw-text-opacity))}.text-red-700{--tw-text-opacity: 1;color:rgb(185 28 28 / var(--tw-text-opacity))}.text-green-700{--tw-text-opacity: 1;color:rgb(21 128 61 / var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.shadow-md{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.outline{outline-style:solid}.blur{--tw-blur: blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-150{transition-duration:.15s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}.before\\:mt-0\\.5:before{content:var(--tw-content);margin-top:.125rem}.before\\:mt-0:before{content:var(--tw-content);margin-top:0}.before\\:flex-1:before{content:var(--tw-content);flex:1 1 0%}.before\\:border-t:before{content:var(--tw-content);border-top-width:1px}.before\\:border-gray-300:before{content:var(--tw-content);--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity))}.after\\:mt-0\\.5:after{content:var(--tw-content);margin-top:.125rem}.after\\:mt-0:after{content:var(--tw-content);margin-top:0}.after\\:flex-1:after{content:var(--tw-content);flex:1 1 0%}.after\\:border-t:after{content:var(--tw-content);border-top-width:1px}.after\\:border-gray-300:after{content:var(--tw-content);--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity))}.hover\\:bg-blue-700:hover{--tw-bg-opacity: 1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))}.hover\\:shadow-lg:hover{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.focus\\:border-blue-600:focus{--tw-border-opacity: 1;border-color:rgb(37 99 235 / var(--tw-border-opacity))}.focus\\:bg-white:focus{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.focus\\:bg-blue-700:focus{--tw-bg-opacity: 1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))}.focus\\:text-gray-700:focus{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity))}.focus\\:shadow-lg:focus{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-0:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.active\\:bg-blue-800:active{--tw-bg-opacity: 1;background-color:rgb(30 64 175 / var(--tw-bg-opacity))}.active\\:shadow-lg:active{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}@media (prefers-color-scheme: dark){.dark\\:bg-red-200{--tw-bg-opacity: 1;background-color:rgb(254 202 202 / var(--tw-bg-opacity))}.dark\\:bg-green-200{--tw-bg-opacity: 1;background-color:rgb(187 247 208 / var(--tw-bg-opacity))}.dark\\:text-red-800{--tw-text-opacity: 1;color:rgb(153 27 27 / var(--tw-text-opacity))}.dark\\:text-green-800{--tw-text-opacity: 1;color:rgb(22 101 52 / var(--tw-text-opacity))}}@media (min-width: 768px){.md\\:mb-0{margin-bottom:0}.md\\:w-9\\/12{width:75%}.md\\:w-8\\/12{width:66.666667%}.md\\:shrink-0{flex-shrink:0}}@media (min-width: 1024px){.lg\\:w-6\\/12{width:50%}.lg\\:w-5\\/12{width:41.666667%}.lg\\:justify-start{justify-content:flex-start}.lg\\:justify-between{justify-content:space-between}.lg\\:text-left{text-align:left}}@media (min-width: 1280px){.xl\\:ml-20{margin-left:5rem}.xl\\:w-6\\/12{width:50%}.xl\\:w-5\\/12{width:41.666667%}.xl\\:justify-center{justify-content:center}}
 `, Ce = `.animated{animation-duration:1s;animation-fill-mode:both}.fadeInDown{animation-name:fadeInDown}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
 `;
 var Pe = Object.defineProperty, Me = Object.getOwnPropertyDescriptor, g = (i, e, t, o) => {
   for (var r = o > 1 ? void 0 : o ? Me(e, t) : e, a = i.length - 1, n; a >= 0; a--)
     (n = i[a]) && (r = (o ? n(e, t, r) : n(r)) || r);
   return o && r && Pe(e, t, r), r;
 };
 let f = class extends E {
   constructor() {
     super(...arguments), this.current_page = "login";
   }
   changeRoute() {
     this.current_page == "login" ? this.current_page = "forgetPassword" : this.current_page = "login";
   }
   create_error(i, e) {
     const t = document.createElement("span");
     t.setAttribute("class", "text-xs tracking-wide text-red-600"), t.innerText = e, t.dataset.error_id = "form_error", i.after(t);
   }
   create_server_response(i, e, t) {
     const o = document.createElement("div");
     o.dataset.error_id = "form_error", t ? (o.setAttribute("class", "flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"), o.innerHTML = `<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
       <span class="sr-only">Info</span>
       <div>
         <span class="font-medium">${e}</span>
       </div>`) : (o.setAttribute("class", "flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"), o.innerHTML = `  <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
       <span class="sr-only">Info</span>
       <div>
         <span class="font-medium">${e}</span>
       </div>`), i.before(o);
   }
   delete_error() {
     var i;
     (i = this.shadowRoot) == null || i.querySelectorAll('[data-error_id="form_error"]').forEach((e) => e.remove());
   }
   disable_button(i) {
     i && (i.disabled = !0), this.forget_password_route && (this.forget_password_route.disabled = !0), this.back_to_login_route && (this.back_to_login_route.disabled = !0);
   }
   enable_button(i) {
     i && (i.disabled = !1), this.forget_password_route && (this.forget_password_route.disabled = !1), this.back_to_login_route && (this.back_to_login_route.disabled = !1);
   }
   login_fn() {
     if (!(!this.login_button || !this.input_login_login || !this.input_password_login)) {
       if (this.delete_error(), this.disable_button(this.login_button), this.input_login_login.value.length == 0)
         return this.enable_button(this.login_button), this.create_error(this.input_login_login, "Prosz\u0119 poda\u0107 login");
       if (this.input_password_login.value.length == 0)
         return this.enable_button(this.login_button), this.create_error(this.input_password_login, "Prosz\u0119 poda\u0107 has\u0142o");
       fetch("/admin/login", {
         method: "POST",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           login: this.input_login_login.value,
           password: this.input_password_login.value
         })
       }).then((i) => i.json()).then((i) => {
         "redirect" in i && i.redirect == !0 ? setTimeout(() => {
           window.location.href = "/home";
         }, 2e3) : this.enable_button(this.login_button), this.create_server_response(this.login_button, i.message, i.error);
       }).catch(() => {
         this.create_server_response(this.login_button, "Wyst\u0105pi\u0142 b\u0142\u0105d", !0), this.enable_button(this.login_button);
       });
     }
   }
   forgetPasswort_fn() {
     if (!(!this.input_email_reset_password || !this.forget_password_button || !this.back_to_login_route)) {
       if (this.delete_error(), this.disable_button(this.forget_password_button), this.input_email_reset_password.value.length == 0)
         return this.enable_button(this.forget_password_button), this.create_error(this.input_email_reset_password, "Prosz\u0119 poda\u0107 adres email");
       fetch("/forget/password", {
         method: "POST",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           email: this.input_email_reset_password.value
         })
       }).then((i) => i.json()).then((i) => {
         this.enable_button(this.forget_password_button), this.create_server_response(this.forget_password_button, i.message, i.error);
       }).catch(() => {
         this.create_server_response(this.forget_password_button, "Wyst\u0105pi\u0142 b\u0142\u0105d", !0), this.enable_button(this.forget_password_button);
       });
     }
   }
   render() {
     return Z`
     <section class="h-screen">
     <div class="px-6 h-full text-gray-800">
       <div
         class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
       >
         <div
           class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
         >
           <img
             src="/public/example.webp"
             class="w-full"
             alt="Sample image"
           />
         </div>
         ${this.current_page == "login" ? Z`      <div  class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 animated fadeInDown">
         <div>
           <div class="flex flex-row items-center justify-center lg:justify-start">
             <p class="text-lg mb-0 mr-4">Zaloguj się do Panelu</p>
           
           </div>
 
           <div
             class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
           >
             <p class="text-center font-semibold mx-4 mb-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
           </svg>
           </p>
           </div>
 
           <!-- Email input -->
           <div class="mb-6">
             <input
               type="text"
               class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
               id="input_login_login"
               placeholder="login"
             />
           </div>
 
           <!-- Password input -->
           <div class="mb-6">
             <input
               type="password"
               class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
               id="input_password_login"
               placeholder="Hasło"
             />
             
           </div>
 
           <div class="flex justify-between items-center mb-6">
             <div class="form-group form-check">
              
             </div>
             <button id="forget_password_route" @click=${this.changeRoute} class="text-gray-800">Zapomniałeś hasła?</button>
           </div>
 
           <div class="text-center lg:text-left">
    
             <button @click="${this.login_fn}" id="login_button"
               type="button"
               class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
             >
               Zaloguj
             </button>
           </div>
         </div>` : Z`      <div  class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 animated fadeInDown">
         <div>
           <div class="flex flex-row items-center justify-center lg:justify-start">
             <p class="text-lg mb-0 mr-4">Zapomniałeś hasła ?</p>
           
           </div>
 
           <div
             class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
           >
             <p class="text-center font-semibold mx-4 mb-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
           </svg>
           </p>
           </div>
 
           <!-- Email input -->
           <div class="mb-6">
             <input
               type="text"
               class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
               id="input_email_reset_password"
               placeholder="Adres email"
             />
           </div>
 
 
           <div class="flex justify-between items-center mb-6">
             <div class="form-group form-check">
              
             </div>
             <button id="back_to_login_route" @click=${this.changeRoute} class="text-gray-800">Powrót do logowania</button>
           </div>
 
           <div class="text-center lg:text-left">
    
             <button @click="${this.forgetPasswort_fn}" id="forget_password_button"
               type="button"
               class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
             >
               Wyślij
             </button>
           </div>
         </div>`}
   
         </div>
       </div>
     </div>
   </section>  
     `;
   }
 };
 f.styles = [Y(je), Y(Ce)];
 g([
   Ee()
 ], f.prototype, "current_page", 2);
 g([
   v("#forget_password_route")
 ], f.prototype, "forget_password_route", 2);
 g([
   v("#input_login_login")
 ], f.prototype, "input_login_login", 2);
 g([
   v("#input_password_login")
 ], f.prototype, "input_password_login", 2);
 g([
   v("#login_button")
 ], f.prototype, "login_button", 2);
 g([
   v("#back_to_login_route")
 ], f.prototype, "back_to_login_route", 2);
 g([
   v("#forget_password_button")
 ], f.prototype, "forget_password_button", 2);
 g([
   v("#input_email_reset_password")
 ], f.prototype, "input_email_reset_password", 2);
 f = g([
   ze("login-element")
 ], f);
 export {
   f as loginElement
 };
 