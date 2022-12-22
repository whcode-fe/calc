/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var G = 9e15, $ = 1e9, ue = "0123456789abcdef", x = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", y = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", fe = {
  precision: 20,
  rounding: 4,
  modulo: 1,
  toExpNeg: -7,
  toExpPos: 21,
  minE: -G,
  maxE: G,
  crypto: !1
}, we, U, m = !0, ie = "[DecimalError] ", V = ie + "Invalid argument: ", me = ie + "Precision limit exceeded", Ne = ie + "crypto unavailable", ve = "[object Decimal]", L = Math.floor, q = Math.pow, Ae = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, Le = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, Fe = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Ee = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, R = 1e7, w = 7, Oe = 9007199254740991, Ie = x.length - 1, ce = y.length - 1, d = { toStringTag: ve };
d.absoluteValue = d.abs = function() {
  var e = new this.constructor(this);
  return e.s < 0 && (e.s = 1), p(e);
};
d.ceil = function() {
  return p(new this.constructor(this), this.e + 1, 2);
};
d.clampedTo = d.clamp = function(e, i) {
  var n, r = this, t = r.constructor;
  if (e = new t(e), i = new t(i), !e.s || !i.s)
    return new t(NaN);
  if (e.gt(i))
    throw Error(V + i);
  return n = r.cmp(e), n < 0 ? e : r.cmp(i) > 0 ? i : new t(r);
};
d.comparedTo = d.cmp = function(e) {
  var i, n, r, t, s = this, o = s.d, u = (e = new s.constructor(e)).d, c = s.s, f = e.s;
  if (!o || !u)
    return !c || !f ? NaN : c !== f ? c : o === u ? 0 : !o ^ c < 0 ? 1 : -1;
  if (!o[0] || !u[0])
    return o[0] ? c : u[0] ? -f : 0;
  if (c !== f)
    return c;
  if (s.e !== e.e)
    return s.e > e.e ^ c < 0 ? 1 : -1;
  for (r = o.length, t = u.length, i = 0, n = r < t ? r : t; i < n; ++i)
    if (o[i] !== u[i])
      return o[i] > u[i] ^ c < 0 ? 1 : -1;
  return r === t ? 0 : r > t ^ c < 0 ? 1 : -1;
};
d.cosine = d.cos = function() {
  var e, i, n = this, r = n.constructor;
  return n.d ? n.d[0] ? (e = r.precision, i = r.rounding, r.precision = e + Math.max(n.e, n.sd()) + w, r.rounding = 1, n = De(r, Se(r, n)), r.precision = e, r.rounding = i, p(U == 2 || U == 3 ? n.neg() : n, e, i, !0)) : new r(1) : new r(NaN);
};
d.cubeRoot = d.cbrt = function() {
  var e, i, n, r, t, s, o, u, c, f, l = this, a = l.constructor;
  if (!l.isFinite() || l.isZero())
    return new a(l);
  for (m = !1, s = l.s * q(l.s * l, 1 / 3), !s || Math.abs(s) == 1 / 0 ? (n = S(l.d), e = l.e, (s = (e - n.length + 1) % 3) && (n += s == 1 || s == -2 ? "0" : "00"), s = q(n, 1 / 3), e = L((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), s == 1 / 0 ? n = "5e" + e : (n = s.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + e), r = new a(n), r.s = l.s) : r = new a(s.toString()), o = (e = a.precision) + 3; ; )
    if (u = r, c = u.times(u).times(u), f = c.plus(l), r = k(f.plus(l).times(u), f.plus(c), o + 2, 1), S(u.d).slice(0, o) === (n = S(r.d)).slice(0, o))
      if (n = n.slice(o - 3, o + 1), n == "9999" || !t && n == "4999") {
        if (!t && (p(u, e + 1, 0), u.times(u).times(u).eq(l))) {
          r = u;
          break;
        }
        o += 4, t = 1;
      } else {
        (!+n || !+n.slice(1) && n.charAt(0) == "5") && (p(r, e + 1, 1), i = !r.times(r).times(r).eq(l));
        break;
      }
  return m = !0, p(r, e, a.rounding, i);
};
d.decimalPlaces = d.dp = function() {
  var e, i = this.d, n = NaN;
  if (i) {
    if (e = i.length - 1, n = (e - L(this.e / w)) * w, e = i[e], e)
      for (; e % 10 == 0; e /= 10)
        n--;
    n < 0 && (n = 0);
  }
  return n;
};
d.dividedBy = d.div = function(e) {
  return k(this, new this.constructor(e));
};
d.dividedToIntegerBy = d.divToInt = function(e) {
  var i = this, n = i.constructor;
  return p(k(i, new n(e), 0, 1, 1), n.precision, n.rounding);
};
d.equals = d.eq = function(e) {
  return this.cmp(e) === 0;
};
d.floor = function() {
  return p(new this.constructor(this), this.e + 1, 3);
};
d.greaterThan = d.gt = function(e) {
  return this.cmp(e) > 0;
};
d.greaterThanOrEqualTo = d.gte = function(e) {
  var i = this.cmp(e);
  return i == 1 || i === 0;
};
d.hyperbolicCosine = d.cosh = function() {
  var e, i, n, r, t, s = this, o = s.constructor, u = new o(1);
  if (!s.isFinite())
    return new o(s.s ? 1 / 0 : NaN);
  if (s.isZero())
    return u;
  n = o.precision, r = o.rounding, o.precision = n + Math.max(s.e, s.sd()) + 4, o.rounding = 1, t = s.d.length, t < 32 ? (e = Math.ceil(t / 3), i = (1 / re(4, e)).toString()) : (e = 16, i = "2.3283064365386962890625e-10"), s = W(o, 1, s.times(i), new o(1), !0);
  for (var c, f = e, l = new o(8); f--; )
    c = s.times(s), s = u.minus(c.times(l.minus(c.times(l))));
  return p(s, o.precision = n, o.rounding = r, !0);
};
d.hyperbolicSine = d.sinh = function() {
  var e, i, n, r, t = this, s = t.constructor;
  if (!t.isFinite() || t.isZero())
    return new s(t);
  if (i = s.precision, n = s.rounding, s.precision = i + Math.max(t.e, t.sd()) + 4, s.rounding = 1, r = t.d.length, r < 3)
    t = W(s, 2, t, t, !0);
  else {
    e = 1.4 * Math.sqrt(r), e = e > 16 ? 16 : e | 0, t = t.times(1 / re(5, e)), t = W(s, 2, t, t, !0);
    for (var o, u = new s(5), c = new s(16), f = new s(20); e--; )
      o = t.times(t), t = t.times(u.plus(o.times(c.times(o).plus(f))));
  }
  return s.precision = i, s.rounding = n, p(t, i, n, !0);
};
d.hyperbolicTangent = d.tanh = function() {
  var e, i, n = this, r = n.constructor;
  return n.isFinite() ? n.isZero() ? new r(n) : (e = r.precision, i = r.rounding, r.precision = e + 7, r.rounding = 1, k(n.sinh(), n.cosh(), r.precision = e, r.rounding = i)) : new r(n.s);
};
d.inverseCosine = d.acos = function() {
  var e, i = this, n = i.constructor, r = i.abs().cmp(1), t = n.precision, s = n.rounding;
  return r !== -1 ? r === 0 ? i.isNeg() ? _(n, t, s) : new n(0) : new n(NaN) : i.isZero() ? _(n, t + 4, s).times(0.5) : (n.precision = t + 6, n.rounding = 1, i = i.asin(), e = _(n, t + 4, s).times(0.5), n.precision = t, n.rounding = s, e.minus(i));
};
d.inverseHyperbolicCosine = d.acosh = function() {
  var e, i, n = this, r = n.constructor;
  return n.lte(1) ? new r(n.eq(1) ? 0 : NaN) : n.isFinite() ? (e = r.precision, i = r.rounding, r.precision = e + Math.max(Math.abs(n.e), n.sd()) + 4, r.rounding = 1, m = !1, n = n.times(n).minus(1).sqrt().plus(n), m = !0, r.precision = e, r.rounding = i, n.ln()) : new r(n);
};
d.inverseHyperbolicSine = d.asinh = function() {
  var e, i, n = this, r = n.constructor;
  return !n.isFinite() || n.isZero() ? new r(n) : (e = r.precision, i = r.rounding, r.precision = e + 2 * Math.max(Math.abs(n.e), n.sd()) + 6, r.rounding = 1, m = !1, n = n.times(n).plus(1).sqrt().plus(n), m = !0, r.precision = e, r.rounding = i, n.ln());
};
d.inverseHyperbolicTangent = d.atanh = function() {
  var e, i, n, r, t = this, s = t.constructor;
  return t.isFinite() ? t.e >= 0 ? new s(t.abs().eq(1) ? t.s / 0 : t.isZero() ? t : NaN) : (e = s.precision, i = s.rounding, r = t.sd(), Math.max(r, e) < 2 * -t.e - 1 ? p(new s(t), e, i, !0) : (s.precision = n = r - t.e, t = k(t.plus(1), new s(1).minus(t), n + e, 1), s.precision = e + 4, s.rounding = 1, t = t.ln(), s.precision = e, s.rounding = i, t.times(0.5))) : new s(NaN);
};
d.inverseSine = d.asin = function() {
  var e, i, n, r, t = this, s = t.constructor;
  return t.isZero() ? new s(t) : (i = t.abs().cmp(1), n = s.precision, r = s.rounding, i !== -1 ? i === 0 ? (e = _(s, n + 4, r).times(0.5), e.s = t.s, e) : new s(NaN) : (s.precision = n + 6, s.rounding = 1, t = t.div(new s(1).minus(t.times(t)).sqrt().plus(1)).atan(), s.precision = n, s.rounding = r, t.times(2)));
};
d.inverseTangent = d.atan = function() {
  var e, i, n, r, t, s, o, u, c, f = this, l = f.constructor, a = l.precision, h = l.rounding;
  if (f.isFinite()) {
    if (f.isZero())
      return new l(f);
    if (f.abs().eq(1) && a + 4 <= ce)
      return o = _(l, a + 4, h).times(0.25), o.s = f.s, o;
  } else {
    if (!f.s)
      return new l(NaN);
    if (a + 4 <= ce)
      return o = _(l, a + 4, h).times(0.5), o.s = f.s, o;
  }
  for (l.precision = u = a + 10, l.rounding = 1, n = Math.min(28, u / w + 2 | 0), e = n; e; --e)
    f = f.div(f.times(f).plus(1).sqrt().plus(1));
  for (m = !1, i = Math.ceil(u / w), r = 1, c = f.times(f), o = new l(f), t = f; e !== -1; )
    if (t = t.times(c), s = o.minus(t.div(r += 2)), t = t.times(c), o = s.plus(t.div(r += 2)), o.d[i] !== void 0)
      for (e = i; o.d[e] === s.d[e] && e--; )
        ;
  return n && (o = o.times(2 << n - 1)), m = !0, p(o, l.precision = a, l.rounding = h, !0);
};
d.isFinite = function() {
  return !!this.d;
};
d.isInteger = d.isInt = function() {
  return !!this.d && L(this.e / w) > this.d.length - 2;
};
d.isNaN = function() {
  return !this.s;
};
d.isNegative = d.isNeg = function() {
  return this.s < 0;
};
d.isPositive = d.isPos = function() {
  return this.s > 0;
};
d.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
d.lessThan = d.lt = function(e) {
  return this.cmp(e) < 0;
};
d.lessThanOrEqualTo = d.lte = function(e) {
  return this.cmp(e) < 1;
};
d.logarithm = d.log = function(e) {
  var i, n, r, t, s, o, u, c, f = this, l = f.constructor, a = l.precision, h = l.rounding, g = 5;
  if (e == null)
    e = new l(10), i = !0;
  else {
    if (e = new l(e), n = e.d, e.s < 0 || !n || !n[0] || e.eq(1))
      return new l(NaN);
    i = e.eq(10);
  }
  if (n = f.d, f.s < 0 || !n || !n[0] || f.eq(1))
    return new l(n && !n[0] ? -1 / 0 : f.s != 1 ? NaN : n ? 0 : 1 / 0);
  if (i)
    if (n.length > 1)
      s = !0;
    else {
      for (t = n[0]; t % 10 === 0; )
        t /= 10;
      s = t !== 1;
    }
  if (m = !1, u = a + g, o = H(f, u), r = i ? ee(l, u + 10) : H(e, u), c = k(o, r, u, 1), J(c.d, t = a, h))
    do
      if (u += 10, o = H(f, u), r = i ? ee(l, u + 10) : H(e, u), c = k(o, r, u, 1), !s) {
        +S(c.d).slice(t + 1, t + 15) + 1 == 1e14 && (c = p(c, a + 1, 0));
        break;
      }
    while (J(c.d, t += 10, h));
  return m = !0, p(c, a, h);
};
d.minus = d.sub = function(e) {
  var i, n, r, t, s, o, u, c, f, l, a, h, g = this, v = g.constructor;
  if (e = new v(e), !g.d || !e.d)
    return !g.s || !e.s ? e = new v(NaN) : g.d ? e.s = -e.s : e = new v(e.d || g.s !== e.s ? g : NaN), e;
  if (g.s != e.s)
    return e.s = -e.s, g.plus(e);
  if (f = g.d, h = e.d, u = v.precision, c = v.rounding, !f[0] || !h[0]) {
    if (h[0])
      e.s = -e.s;
    else if (f[0])
      e = new v(g);
    else
      return new v(c === 3 ? -0 : 0);
    return m ? p(e, u, c) : e;
  }
  if (n = L(e.e / w), l = L(g.e / w), f = f.slice(), s = l - n, s) {
    for (a = s < 0, a ? (i = f, s = -s, o = h.length) : (i = h, n = l, o = f.length), r = Math.max(Math.ceil(u / w), o) + 2, s > r && (s = r, i.length = 1), i.reverse(), r = s; r--; )
      i.push(0);
    i.reverse();
  } else {
    for (r = f.length, o = h.length, a = r < o, a && (o = r), r = 0; r < o; r++)
      if (f[r] != h[r]) {
        a = f[r] < h[r];
        break;
      }
    s = 0;
  }
  for (a && (i = f, f = h, h = i, e.s = -e.s), o = f.length, r = h.length - o; r > 0; --r)
    f[o++] = 0;
  for (r = h.length; r > s; ) {
    if (f[--r] < h[r]) {
      for (t = r; t && f[--t] === 0; )
        f[t] = R - 1;
      --f[t], f[r] += R;
    }
    f[r] -= h[r];
  }
  for (; f[--o] === 0; )
    f.pop();
  for (; f[0] === 0; f.shift())
    --n;
  return f[0] ? (e.d = f, e.e = ne(f, n), m ? p(e, u, c) : e) : new v(c === 3 ? -0 : 0);
};
d.modulo = d.mod = function(e) {
  var i, n = this, r = n.constructor;
  return e = new r(e), !n.d || !e.s || e.d && !e.d[0] ? new r(NaN) : !e.d || n.d && !n.d[0] ? p(new r(n), r.precision, r.rounding) : (m = !1, r.modulo == 9 ? (i = k(n, e.abs(), 0, 3, 1), i.s *= e.s) : i = k(n, e, 0, r.modulo, 1), i = i.times(e), m = !0, n.minus(i));
};
d.naturalExponential = d.exp = function() {
  return le(this);
};
d.naturalLogarithm = d.ln = function() {
  return H(this);
};
d.negated = d.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s, p(e);
};
d.plus = d.add = function(e) {
  var i, n, r, t, s, o, u, c, f, l, a = this, h = a.constructor;
  if (e = new h(e), !a.d || !e.d)
    return !a.s || !e.s ? e = new h(NaN) : a.d || (e = new h(e.d || a.s === e.s ? a : NaN)), e;
  if (a.s != e.s)
    return e.s = -e.s, a.minus(e);
  if (f = a.d, l = e.d, u = h.precision, c = h.rounding, !f[0] || !l[0])
    return l[0] || (e = new h(a)), m ? p(e, u, c) : e;
  if (s = L(a.e / w), r = L(e.e / w), f = f.slice(), t = s - r, t) {
    for (t < 0 ? (n = f, t = -t, o = l.length) : (n = l, r = s, o = f.length), s = Math.ceil(u / w), o = s > o ? s + 1 : o + 1, t > o && (t = o, n.length = 1), n.reverse(); t--; )
      n.push(0);
    n.reverse();
  }
  for (o = f.length, t = l.length, o - t < 0 && (t = o, n = l, l = f, f = n), i = 0; t; )
    i = (f[--t] = f[t] + l[t] + i) / R | 0, f[t] %= R;
  for (i && (f.unshift(i), ++r), o = f.length; f[--o] == 0; )
    f.pop();
  return e.d = f, e.e = ne(f, r), m ? p(e, u, c) : e;
};
d.precision = d.sd = function(e) {
  var i, n = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0)
    throw Error(V + e);
  return n.d ? (i = ke(n.d), e && n.e + 1 > i && (i = n.e + 1)) : i = NaN, i;
};
d.round = function() {
  var e = this, i = e.constructor;
  return p(new i(e), e.e + 1, i.rounding);
};
d.sine = d.sin = function() {
  var e, i, n = this, r = n.constructor;
  return n.isFinite() ? n.isZero() ? new r(n) : (e = r.precision, i = r.rounding, r.precision = e + Math.max(n.e, n.sd()) + w, r.rounding = 1, n = _e(r, Se(r, n)), r.precision = e, r.rounding = i, p(U > 2 ? n.neg() : n, e, i, !0)) : new r(NaN);
};
d.squareRoot = d.sqrt = function() {
  var e, i, n, r, t, s, o = this, u = o.d, c = o.e, f = o.s, l = o.constructor;
  if (f !== 1 || !u || !u[0])
    return new l(!f || f < 0 && (!u || u[0]) ? NaN : u ? o : 1 / 0);
  for (m = !1, f = Math.sqrt(+o), f == 0 || f == 1 / 0 ? (i = S(u), (i.length + c) % 2 == 0 && (i += "0"), f = Math.sqrt(i), c = L((c + 1) / 2) - (c < 0 || c % 2), f == 1 / 0 ? i = "5e" + c : (i = f.toExponential(), i = i.slice(0, i.indexOf("e") + 1) + c), r = new l(i)) : r = new l(f.toString()), n = (c = l.precision) + 3; ; )
    if (s = r, r = s.plus(k(o, s, n + 2, 1)).times(0.5), S(s.d).slice(0, n) === (i = S(r.d)).slice(0, n))
      if (i = i.slice(n - 3, n + 1), i == "9999" || !t && i == "4999") {
        if (!t && (p(s, c + 1, 0), s.times(s).eq(o))) {
          r = s;
          break;
        }
        n += 4, t = 1;
      } else {
        (!+i || !+i.slice(1) && i.charAt(0) == "5") && (p(r, c + 1, 1), e = !r.times(r).eq(o));
        break;
      }
  return m = !0, p(r, c, l.rounding, e);
};
d.tangent = d.tan = function() {
  var e, i, n = this, r = n.constructor;
  return n.isFinite() ? n.isZero() ? new r(n) : (e = r.precision, i = r.rounding, r.precision = e + 10, r.rounding = 1, n = n.sin(), n.s = 1, n = k(n, new r(1).minus(n.times(n)).sqrt(), e + 10, 0), r.precision = e, r.rounding = i, p(U == 2 || U == 4 ? n.neg() : n, e, i, !0)) : new r(NaN);
};
d.times = d.mul = function(e) {
  var i, n, r, t, s, o, u, c, f, l = this, a = l.constructor, h = l.d, g = (e = new a(e)).d;
  if (e.s *= l.s, !h || !h[0] || !g || !g[0])
    return new a(!e.s || h && !h[0] && !g || g && !g[0] && !h ? NaN : !h || !g ? e.s / 0 : e.s * 0);
  for (n = L(l.e / w) + L(e.e / w), c = h.length, f = g.length, c < f && (s = h, h = g, g = s, o = c, c = f, f = o), s = [], o = c + f, r = o; r--; )
    s.push(0);
  for (r = f; --r >= 0; ) {
    for (i = 0, t = c + r; t > r; )
      u = s[t] + g[r] * h[t - r - 1] + i, s[t--] = u % R | 0, i = u / R | 0;
    s[t] = (s[t] + i) % R | 0;
  }
  for (; !s[--o]; )
    s.pop();
  return i ? ++n : s.shift(), e.d = s, e.e = ne(s, n), m ? p(e, a.precision, a.rounding) : e;
};
d.toBinary = function(e, i) {
  return he(this, 2, e, i);
};
d.toDecimalPlaces = d.toDP = function(e, i) {
  var n = this, r = n.constructor;
  return n = new r(n), e === void 0 ? n : (O(e, 0, $), i === void 0 ? i = r.rounding : O(i, 0, 8), p(n, e + n.e + 1, i));
};
d.toExponential = function(e, i) {
  var n, r = this, t = r.constructor;
  return e === void 0 ? n = Z(r, !0) : (O(e, 0, $), i === void 0 ? i = t.rounding : O(i, 0, 8), r = p(new t(r), e + 1, i), n = Z(r, !0, e + 1)), r.isNeg() && !r.isZero() ? "-" + n : n;
};
d.toFixed = function(e, i) {
  var n, r, t = this, s = t.constructor;
  return e === void 0 ? n = Z(t) : (O(e, 0, $), i === void 0 ? i = s.rounding : O(i, 0, 8), r = p(new s(t), e + t.e + 1, i), n = Z(r, !1, e + r.e + 1)), t.isNeg() && !t.isZero() ? "-" + n : n;
};
d.toFraction = function(e) {
  var i, n, r, t, s, o, u, c, f, l, a, h, g = this, v = g.d, N = g.constructor;
  if (!v)
    return new N(g);
  if (f = n = new N(1), r = c = new N(0), i = new N(r), s = i.e = ke(v) - g.e - 1, o = s % w, i.d[0] = q(10, o < 0 ? w + o : o), e == null)
    e = s > 0 ? i : f;
  else {
    if (u = new N(e), !u.isInt() || u.lt(f))
      throw Error(V + u);
    e = u.gt(i) ? s > 0 ? i : f : u;
  }
  for (m = !1, u = new N(S(v)), l = N.precision, N.precision = s = v.length * w * 2; a = k(u, i, 0, 1, 1), t = n.plus(a.times(r)), t.cmp(e) != 1; )
    n = r, r = t, t = f, f = c.plus(a.times(t)), c = t, t = i, i = u.minus(a.times(t)), u = t;
  return t = k(e.minus(n), r, 0, 1, 1), c = c.plus(t.times(f)), n = n.plus(t.times(r)), c.s = f.s = g.s, h = k(f, r, s, 1).minus(g).abs().cmp(k(c, n, s, 1).minus(g).abs()) < 1 ? [f, r] : [c, n], N.precision = l, m = !0, h;
};
d.toHexadecimal = d.toHex = function(e, i) {
  return he(this, 16, e, i);
};
d.toNearest = function(e, i) {
  var n = this, r = n.constructor;
  if (n = new r(n), e == null) {
    if (!n.d)
      return n;
    e = new r(1), i = r.rounding;
  } else {
    if (e = new r(e), i === void 0 ? i = r.rounding : O(i, 0, 8), !n.d)
      return e.s ? n : e;
    if (!e.d)
      return e.s && (e.s = n.s), e;
  }
  return e.d[0] ? (m = !1, n = k(n, e, 0, i, 1).times(e), m = !0, p(n)) : (e.s = n.s, n = e), n;
};
d.toNumber = function() {
  return +this;
};
d.toOctal = function(e, i) {
  return he(this, 8, e, i);
};
d.toPower = d.pow = function(e) {
  var i, n, r, t, s, o, u = this, c = u.constructor, f = +(e = new c(e));
  if (!u.d || !e.d || !u.d[0] || !e.d[0])
    return new c(q(+u, f));
  if (u = new c(u), u.eq(1))
    return u;
  if (r = c.precision, s = c.rounding, e.eq(1))
    return p(u, r, s);
  if (i = L(e.e / w), i >= e.d.length - 1 && (n = f < 0 ? -f : f) <= Oe)
    return t = Me(c, u, n, r), e.s < 0 ? new c(1).div(t) : p(t, r, s);
  if (o = u.s, o < 0) {
    if (i < e.d.length - 1)
      return new c(NaN);
    if (e.d[i] & 1 || (o = 1), u.e == 0 && u.d[0] == 1 && u.d.length == 1)
      return u.s = o, u;
  }
  return n = q(+u, f), i = n == 0 || !isFinite(n) ? L(f * (Math.log("0." + S(u.d)) / Math.LN10 + u.e + 1)) : new c(n + "").e, i > c.maxE + 1 || i < c.minE - 1 ? new c(i > 0 ? o / 0 : 0) : (m = !1, c.rounding = u.s = 1, n = Math.min(12, (i + "").length), t = le(e.times(H(u, r + n)), r), t.d && (t = p(t, r + 5, 1), J(t.d, r, s) && (i = r + 10, t = p(le(e.times(H(u, i + n)), i), i + 5, 1), +S(t.d).slice(r + 1, r + 15) + 1 == 1e14 && (t = p(t, r + 1, 0)))), t.s = o, m = !0, c.rounding = s, p(t, r, s));
};
d.toPrecision = function(e, i) {
  var n, r = this, t = r.constructor;
  return e === void 0 ? n = Z(r, r.e <= t.toExpNeg || r.e >= t.toExpPos) : (O(e, 1, $), i === void 0 ? i = t.rounding : O(i, 0, 8), r = p(new t(r), e, i), n = Z(r, e <= r.e || r.e <= t.toExpNeg, e)), r.isNeg() && !r.isZero() ? "-" + n : n;
};
d.toSignificantDigits = d.toSD = function(e, i) {
  var n = this, r = n.constructor;
  return e === void 0 ? (e = r.precision, i = r.rounding) : (O(e, 1, $), i === void 0 ? i = r.rounding : O(i, 0, 8)), p(new r(n), e, i);
};
d.toString = function() {
  var e = this, i = e.constructor, n = Z(e, e.e <= i.toExpNeg || e.e >= i.toExpPos);
  return e.isNeg() && !e.isZero() ? "-" + n : n;
};
d.truncated = d.trunc = function() {
  return p(new this.constructor(this), this.e + 1, 1);
};
d.valueOf = d.toJSON = function() {
  var e = this, i = e.constructor, n = Z(e, e.e <= i.toExpNeg || e.e >= i.toExpPos);
  return e.isNeg() ? "-" + n : n;
};
function S(e) {
  var i, n, r, t = e.length - 1, s = "", o = e[0];
  if (t > 0) {
    for (s += o, i = 1; i < t; i++)
      r = e[i] + "", n = w - r.length, n && (s += B(n)), s += r;
    o = e[i], r = o + "", n = w - r.length, n && (s += B(n));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; )
    o /= 10;
  return s + o;
}
function O(e, i, n) {
  if (e !== ~~e || e < i || e > n)
    throw Error(V + e);
}
function J(e, i, n, r) {
  var t, s, o, u;
  for (s = e[0]; s >= 10; s /= 10)
    --i;
  return --i < 0 ? (i += w, t = 0) : (t = Math.ceil((i + 1) / w), i %= w), s = q(10, w - i), u = e[t] % s | 0, r == null ? i < 3 ? (i == 0 ? u = u / 100 | 0 : i == 1 && (u = u / 10 | 0), o = n < 4 && u == 99999 || n > 3 && u == 49999 || u == 5e4 || u == 0) : o = (n < 4 && u + 1 == s || n > 3 && u + 1 == s / 2) && (e[t + 1] / s / 100 | 0) == q(10, i - 2) - 1 || (u == s / 2 || u == 0) && (e[t + 1] / s / 100 | 0) == 0 : i < 4 ? (i == 0 ? u = u / 1e3 | 0 : i == 1 ? u = u / 100 | 0 : i == 2 && (u = u / 10 | 0), o = (r || n < 4) && u == 9999 || !r && n > 3 && u == 4999) : o = ((r || n < 4) && u + 1 == s || !r && n > 3 && u + 1 == s / 2) && (e[t + 1] / s / 1e3 | 0) == q(10, i - 3) - 1, o;
}
function z(e, i, n) {
  for (var r, t = [0], s, o = 0, u = e.length; o < u; ) {
    for (s = t.length; s--; )
      t[s] *= i;
    for (t[0] += ue.indexOf(e.charAt(o++)), r = 0; r < t.length; r++)
      t[r] > n - 1 && (t[r + 1] === void 0 && (t[r + 1] = 0), t[r + 1] += t[r] / n | 0, t[r] %= n);
  }
  return t.reverse();
}
function De(e, i) {
  var n, r, t;
  if (i.isZero())
    return i;
  r = i.d.length, r < 32 ? (n = Math.ceil(r / 3), t = (1 / re(4, n)).toString()) : (n = 16, t = "2.3283064365386962890625e-10"), e.precision += n, i = W(e, 1, i.times(t), new e(1));
  for (var s = n; s--; ) {
    var o = i.times(i);
    i = o.times(o).minus(o).times(8).plus(1);
  }
  return e.precision -= n, i;
}
var k = function() {
  function e(r, t, s) {
    var o, u = 0, c = r.length;
    for (r = r.slice(); c--; )
      o = r[c] * t + u, r[c] = o % s | 0, u = o / s | 0;
    return u && r.unshift(u), r;
  }
  function i(r, t, s, o) {
    var u, c;
    if (s != o)
      c = s > o ? 1 : -1;
    else
      for (u = c = 0; u < s; u++)
        if (r[u] != t[u]) {
          c = r[u] > t[u] ? 1 : -1;
          break;
        }
    return c;
  }
  function n(r, t, s, o) {
    for (var u = 0; s--; )
      r[s] -= u, u = r[s] < t[s] ? 1 : 0, r[s] = u * o + r[s] - t[s];
    for (; !r[0] && r.length > 1; )
      r.shift();
  }
  return function(r, t, s, o, u, c) {
    var f, l, a, h, g, v, N, F, C, D, E, P, K, b, te, Q, X, se, T, Y, j = r.constructor, oe = r.s == t.s ? 1 : -1, A = r.d, M = t.d;
    if (!A || !A[0] || !M || !M[0])
      return new j(
        !r.s || !t.s || (A ? M && A[0] == M[0] : !M) ? NaN : A && A[0] == 0 || !M ? oe * 0 : oe / 0
      );
    for (c ? (g = 1, l = r.e - t.e) : (c = R, g = w, l = L(r.e / g) - L(t.e / g)), T = M.length, X = A.length, C = new j(oe), D = C.d = [], a = 0; M[a] == (A[a] || 0); a++)
      ;
    if (M[a] > (A[a] || 0) && l--, s == null ? (b = s = j.precision, o = j.rounding) : u ? b = s + (r.e - t.e) + 1 : b = s, b < 0)
      D.push(1), v = !0;
    else {
      if (b = b / g + 2 | 0, a = 0, T == 1) {
        for (h = 0, M = M[0], b++; (a < X || h) && b--; a++)
          te = h * c + (A[a] || 0), D[a] = te / M | 0, h = te % M | 0;
        v = h || a < X;
      } else {
        for (h = c / (M[0] + 1) | 0, h > 1 && (M = e(M, h, c), A = e(A, h, c), T = M.length, X = A.length), Q = T, E = A.slice(0, T), P = E.length; P < T; )
          E[P++] = 0;
        Y = M.slice(), Y.unshift(0), se = M[0], M[1] >= c / 2 && ++se;
        do
          h = 0, f = i(M, E, T, P), f < 0 ? (K = E[0], T != P && (K = K * c + (E[1] || 0)), h = K / se | 0, h > 1 ? (h >= c && (h = c - 1), N = e(M, h, c), F = N.length, P = E.length, f = i(N, E, F, P), f == 1 && (h--, n(N, T < F ? Y : M, F, c))) : (h == 0 && (f = h = 1), N = M.slice()), F = N.length, F < P && N.unshift(0), n(E, N, P, c), f == -1 && (P = E.length, f = i(M, E, T, P), f < 1 && (h++, n(E, T < P ? Y : M, P, c))), P = E.length) : f === 0 && (h++, E = [0]), D[a++] = h, f && E[0] ? E[P++] = A[Q] || 0 : (E = [A[Q]], P = 1);
        while ((Q++ < X || E[0] !== void 0) && b--);
        v = E[0] !== void 0;
      }
      D[0] || D.shift();
    }
    if (g == 1)
      C.e = l, we = v;
    else {
      for (a = 1, h = D[0]; h >= 10; h /= 10)
        a++;
      C.e = a + l * g - 1, p(C, u ? s + C.e + 1 : s, o, v);
    }
    return C;
  };
}();
function p(e, i, n, r) {
  var t, s, o, u, c, f, l, a, h, g = e.constructor;
  e:
    if (i != null) {
      if (a = e.d, !a)
        return e;
      for (t = 1, u = a[0]; u >= 10; u /= 10)
        t++;
      if (s = i - t, s < 0)
        s += w, o = i, l = a[h = 0], c = l / q(10, t - o - 1) % 10 | 0;
      else if (h = Math.ceil((s + 1) / w), u = a.length, h >= u)
        if (r) {
          for (; u++ <= h; )
            a.push(0);
          l = c = 0, t = 1, s %= w, o = s - w + 1;
        } else
          break e;
      else {
        for (l = u = a[h], t = 1; u >= 10; u /= 10)
          t++;
        s %= w, o = s - w + t, c = o < 0 ? 0 : l / q(10, t - o - 1) % 10 | 0;
      }
      if (r = r || i < 0 || a[h + 1] !== void 0 || (o < 0 ? l : l % q(10, t - o - 1)), f = n < 4 ? (c || r) && (n == 0 || n == (e.s < 0 ? 3 : 2)) : c > 5 || c == 5 && (n == 4 || r || n == 6 && (s > 0 ? o > 0 ? l / q(10, t - o) : 0 : a[h - 1]) % 10 & 1 || n == (e.s < 0 ? 8 : 7)), i < 1 || !a[0])
        return a.length = 0, f ? (i -= e.e + 1, a[0] = q(10, (w - i % w) % w), e.e = -i || 0) : a[0] = e.e = 0, e;
      if (s == 0 ? (a.length = h, u = 1, h--) : (a.length = h + 1, u = q(10, w - s), a[h] = o > 0 ? (l / q(10, t - o) % q(10, o) | 0) * u : 0), f)
        for (; ; )
          if (h == 0) {
            for (s = 1, o = a[0]; o >= 10; o /= 10)
              s++;
            for (o = a[0] += u, u = 1; o >= 10; o /= 10)
              u++;
            s != u && (e.e++, a[0] == R && (a[0] = 1));
            break;
          } else {
            if (a[h] += u, a[h] != R)
              break;
            a[h--] = 0, u = 1;
          }
      for (s = a.length; a[--s] === 0; )
        a.pop();
    }
  return m && (e.e > g.maxE ? (e.d = null, e.e = NaN) : e.e < g.minE && (e.e = 0, e.d = [0])), e;
}
function Z(e, i, n) {
  if (!e.isFinite())
    return qe(e);
  var r, t = e.e, s = S(e.d), o = s.length;
  return i ? (n && (r = n - o) > 0 ? s = s.charAt(0) + "." + s.slice(1) + B(r) : o > 1 && (s = s.charAt(0) + "." + s.slice(1)), s = s + (e.e < 0 ? "e" : "e+") + e.e) : t < 0 ? (s = "0." + B(-t - 1) + s, n && (r = n - o) > 0 && (s += B(r))) : t >= o ? (s += B(t + 1 - o), n && (r = n - t - 1) > 0 && (s = s + "." + B(r))) : ((r = t + 1) < o && (s = s.slice(0, r) + "." + s.slice(r)), n && (r = n - o) > 0 && (t + 1 === o && (s += "."), s += B(r))), s;
}
function ne(e, i) {
  var n = e[0];
  for (i *= w; n >= 10; n /= 10)
    i++;
  return i;
}
function ee(e, i, n) {
  if (i > Ie)
    throw m = !0, n && (e.precision = n), Error(me);
  return p(new e(x), i, 1, !0);
}
function _(e, i, n) {
  if (i > ce)
    throw Error(me);
  return p(new e(y), i, n, !0);
}
function ke(e) {
  var i = e.length - 1, n = i * w + 1;
  if (i = e[i], i) {
    for (; i % 10 == 0; i /= 10)
      n--;
    for (i = e[0]; i >= 10; i /= 10)
      n++;
  }
  return n;
}
function B(e) {
  for (var i = ""; e--; )
    i += "0";
  return i;
}
function Me(e, i, n, r) {
  var t, s = new e(1), o = Math.ceil(r / w + 4);
  for (m = !1; ; ) {
    if (n % 2 && (s = s.times(i), pe(s.d, o) && (t = !0)), n = L(n / 2), n === 0) {
      n = s.d.length - 1, t && s.d[n] === 0 && ++s.d[n];
      break;
    }
    i = i.times(i), pe(i.d, o);
  }
  return m = !0, s;
}
function de(e) {
  return e.d[e.d.length - 1] & 1;
}
function Ce(e, i, n) {
  for (var r, t = new e(i[0]), s = 0; ++s < i.length; )
    if (r = new e(i[s]), r.s)
      t[n](r) && (t = r);
    else {
      t = r;
      break;
    }
  return t;
}
function le(e, i) {
  var n, r, t, s, o, u, c, f = 0, l = 0, a = 0, h = e.constructor, g = h.rounding, v = h.precision;
  if (!e.d || !e.d[0] || e.e > 17)
    return new h(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : 0 / 0);
  for (i == null ? (m = !1, c = v) : c = i, u = new h(0.03125); e.e > -2; )
    e = e.times(u), a += 5;
  for (r = Math.log(q(2, a)) / Math.LN10 * 2 + 5 | 0, c += r, n = s = o = new h(1), h.precision = c; ; ) {
    if (s = p(s.times(e), c, 1), n = n.times(++l), u = o.plus(k(s, n, c, 1)), S(u.d).slice(0, c) === S(o.d).slice(0, c)) {
      for (t = a; t--; )
        o = p(o.times(o), c, 1);
      if (i == null)
        if (f < 3 && J(o.d, c - r, g, f))
          h.precision = c += 10, n = s = u = new h(1), l = 0, f++;
        else
          return p(o, h.precision = v, g, m = !0);
      else
        return h.precision = v, o;
    }
    o = u;
  }
}
function H(e, i) {
  var n, r, t, s, o, u, c, f, l, a, h, g = 1, v = 10, N = e, F = N.d, C = N.constructor, D = C.rounding, E = C.precision;
  if (N.s < 0 || !F || !F[0] || !N.e && F[0] == 1 && F.length == 1)
    return new C(F && !F[0] ? -1 / 0 : N.s != 1 ? NaN : F ? 0 : N);
  if (i == null ? (m = !1, l = E) : l = i, C.precision = l += v, n = S(F), r = n.charAt(0), Math.abs(s = N.e) < 15e14) {
    for (; r < 7 && r != 1 || r == 1 && n.charAt(1) > 3; )
      N = N.times(e), n = S(N.d), r = n.charAt(0), g++;
    s = N.e, r > 1 ? (N = new C("0." + n), s++) : N = new C(r + "." + n.slice(1));
  } else
    return f = ee(C, l + 2, E).times(s + ""), N = H(new C(r + "." + n.slice(1)), l - v).plus(f), C.precision = E, i == null ? p(N, E, D, m = !0) : N;
  for (a = N, c = o = N = k(N.minus(1), N.plus(1), l, 1), h = p(N.times(N), l, 1), t = 3; ; ) {
    if (o = p(o.times(h), l, 1), f = c.plus(k(o, new C(t), l, 1)), S(f.d).slice(0, l) === S(c.d).slice(0, l))
      if (c = c.times(2), s !== 0 && (c = c.plus(ee(C, l + 2, E).times(s + ""))), c = k(c, new C(g), l, 1), i == null)
        if (J(c.d, l - v, D, u))
          C.precision = l += v, f = o = N = k(a.minus(1), a.plus(1), l, 1), h = p(N.times(N), l, 1), t = u = 1;
        else
          return p(c, C.precision = E, D, m = !0);
      else
        return C.precision = E, c;
    c = f, t += 2;
  }
}
function qe(e) {
  return String(e.s * e.s / 0);
}
function ae(e, i) {
  var n, r, t;
  for ((n = i.indexOf(".")) > -1 && (i = i.replace(".", "")), (r = i.search(/e/i)) > 0 ? (n < 0 && (n = r), n += +i.slice(r + 1), i = i.substring(0, r)) : n < 0 && (n = i.length), r = 0; i.charCodeAt(r) === 48; r++)
    ;
  for (t = i.length; i.charCodeAt(t - 1) === 48; --t)
    ;
  if (i = i.slice(r, t), i) {
    if (t -= r, e.e = n = n - r - 1, e.d = [], r = (n + 1) % w, n < 0 && (r += w), r < t) {
      for (r && e.d.push(+i.slice(0, r)), t -= w; r < t; )
        e.d.push(+i.slice(r, r += w));
      i = i.slice(r), r = w - i.length;
    } else
      r -= t;
    for (; r--; )
      i += "0";
    e.d.push(+i), m && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
  } else
    e.e = 0, e.d = [0];
  return e;
}
function Te(e, i) {
  var n, r, t, s, o, u, c, f, l;
  if (i.indexOf("_") > -1) {
    if (i = i.replace(/(\d)_(?=\d)/g, "$1"), Ee.test(i))
      return ae(e, i);
  } else if (i === "Infinity" || i === "NaN")
    return +i || (e.s = NaN), e.e = NaN, e.d = null, e;
  if (Le.test(i))
    n = 16, i = i.toLowerCase();
  else if (Ae.test(i))
    n = 2;
  else if (Fe.test(i))
    n = 8;
  else
    throw Error(V + i);
  for (s = i.search(/p/i), s > 0 ? (c = +i.slice(s + 1), i = i.substring(2, s)) : i = i.slice(2), s = i.indexOf("."), o = s >= 0, r = e.constructor, o && (i = i.replace(".", ""), u = i.length, s = u - s, t = Me(r, new r(n), s, s * 2)), f = z(i, n, R), l = f.length - 1, s = l; f[s] === 0; --s)
    f.pop();
  return s < 0 ? new r(e.s * 0) : (e.e = ne(f, l), e.d = f, m = !1, o && (e = k(e, t, u * 4)), c && (e = e.times(Math.abs(c) < 54 ? q(2, c) : I.pow(2, c))), m = !0, e);
}
function _e(e, i) {
  var n, r = i.d.length;
  if (r < 3)
    return i.isZero() ? i : W(e, 2, i, i);
  n = 1.4 * Math.sqrt(r), n = n > 16 ? 16 : n | 0, i = i.times(1 / re(5, n)), i = W(e, 2, i, i);
  for (var t, s = new e(5), o = new e(16), u = new e(20); n--; )
    t = i.times(i), i = i.times(s.plus(t.times(o.times(t).minus(u))));
  return i;
}
function W(e, i, n, r, t) {
  var s, o, u, c, f = e.precision, l = Math.ceil(f / w);
  for (m = !1, c = n.times(n), u = new e(r); ; ) {
    if (o = k(u.times(c), new e(i++ * i++), f, 1), u = t ? r.plus(o) : r.minus(o), r = k(o.times(c), new e(i++ * i++), f, 1), o = u.plus(r), o.d[l] !== void 0) {
      for (s = l; o.d[s] === u.d[s] && s--; )
        ;
      if (s == -1)
        break;
    }
    s = u, u = r, r = o, o = s;
  }
  return m = !0, o.d.length = l + 1, o;
}
function re(e, i) {
  for (var n = e; --i; )
    n *= e;
  return n;
}
function Se(e, i) {
  var n, r = i.s < 0, t = _(e, e.precision, 1), s = t.times(0.5);
  if (i = i.abs(), i.lte(s))
    return U = r ? 4 : 1, i;
  if (n = i.divToInt(t), n.isZero())
    U = r ? 3 : 2;
  else {
    if (i = i.minus(n.times(t)), i.lte(s))
      return U = de(n) ? r ? 2 : 3 : r ? 4 : 1, i;
    U = de(n) ? r ? 1 : 4 : r ? 3 : 2;
  }
  return i.minus(t).abs();
}
function he(e, i, n, r) {
  var t, s, o, u, c, f, l, a, h, g = e.constructor, v = n !== void 0;
  if (v ? (O(n, 1, $), r === void 0 ? r = g.rounding : O(r, 0, 8)) : (n = g.precision, r = g.rounding), !e.isFinite())
    l = qe(e);
  else {
    for (l = Z(e), o = l.indexOf("."), v ? (t = 2, i == 16 ? n = n * 4 - 3 : i == 8 && (n = n * 3 - 2)) : t = i, o >= 0 && (l = l.replace(".", ""), h = new g(1), h.e = l.length - o, h.d = z(Z(h), 10, t), h.e = h.d.length), a = z(l, 10, t), s = c = a.length; a[--c] == 0; )
      a.pop();
    if (!a[0])
      l = v ? "0p+0" : "0";
    else {
      if (o < 0 ? s-- : (e = new g(e), e.d = a, e.e = s, e = k(e, h, n, r, 0, t), a = e.d, s = e.e, f = we), o = a[n], u = t / 2, f = f || a[n + 1] !== void 0, f = r < 4 ? (o !== void 0 || f) && (r === 0 || r === (e.s < 0 ? 3 : 2)) : o > u || o === u && (r === 4 || f || r === 6 && a[n - 1] & 1 || r === (e.s < 0 ? 8 : 7)), a.length = n, f)
        for (; ++a[--n] > t - 1; )
          a[n] = 0, n || (++s, a.unshift(1));
      for (c = a.length; !a[c - 1]; --c)
        ;
      for (o = 0, l = ""; o < c; o++)
        l += ue.charAt(a[o]);
      if (v) {
        if (c > 1)
          if (i == 16 || i == 8) {
            for (o = i == 16 ? 4 : 3, --c; c % o; c++)
              l += "0";
            for (a = z(l, t, i), c = a.length; !a[c - 1]; --c)
              ;
            for (o = 1, l = "1."; o < c; o++)
              l += ue.charAt(a[o]);
          } else
            l = l.charAt(0) + "." + l.slice(1);
        l = l + (s < 0 ? "p" : "p+") + s;
      } else if (s < 0) {
        for (; ++s; )
          l = "0" + l;
        l = "0." + l;
      } else if (++s > c)
        for (s -= c; s--; )
          l += "0";
      else
        s < c && (l = l.slice(0, s) + "." + l.slice(s));
    }
    l = (i == 16 ? "0x" : i == 2 ? "0b" : i == 8 ? "0o" : "") + l;
  }
  return e.s < 0 ? "-" + l : l;
}
function pe(e, i) {
  if (e.length > i)
    return e.length = i, !0;
}
function Re(e) {
  return new this(e).abs();
}
function Ze(e) {
  return new this(e).acos();
}
function be(e) {
  return new this(e).acosh();
}
function Ue(e, i) {
  return new this(e).plus(i);
}
function Be(e) {
  return new this(e).asin();
}
function He(e) {
  return new this(e).asinh();
}
function Ve(e) {
  return new this(e).atan();
}
function $e(e) {
  return new this(e).atanh();
}
function Ge(e, i) {
  e = new this(e), i = new this(i);
  var n, r = this.precision, t = this.rounding, s = r + 4;
  return !e.s || !i.s ? n = new this(NaN) : !e.d && !i.d ? (n = _(this, s, 1).times(i.s > 0 ? 0.25 : 0.75), n.s = e.s) : !i.d || e.isZero() ? (n = i.s < 0 ? _(this, r, t) : new this(0), n.s = e.s) : !e.d || i.isZero() ? (n = _(this, s, 1).times(0.5), n.s = e.s) : i.s < 0 ? (this.precision = s, this.rounding = 1, n = this.atan(k(e, i, s, 1)), i = _(this, s, 1), this.precision = r, this.rounding = t, n = e.s < 0 ? n.minus(i) : n.plus(i)) : n = this.atan(k(e, i, s, 1)), n;
}
function We(e) {
  return new this(e).cbrt();
}
function Xe(e) {
  return p(e = new this(e), e.e + 1, 2);
}
function Je(e, i, n) {
  return new this(e).clamp(i, n);
}
function Ke(e) {
  if (!e || typeof e != "object")
    throw Error(ie + "Object expected");
  var i, n, r, t = e.defaults === !0, s = [
    "precision",
    1,
    $,
    "rounding",
    0,
    8,
    "toExpNeg",
    -G,
    0,
    "toExpPos",
    0,
    G,
    "maxE",
    0,
    G,
    "minE",
    -G,
    0,
    "modulo",
    0,
    9
  ];
  for (i = 0; i < s.length; i += 3)
    if (n = s[i], t && (this[n] = fe[n]), (r = e[n]) !== void 0)
      if (L(r) === r && r >= s[i + 1] && r <= s[i + 2])
        this[n] = r;
      else
        throw Error(V + n + ": " + r);
  if (n = "crypto", t && (this[n] = fe[n]), (r = e[n]) !== void 0)
    if (r === !0 || r === !1 || r === 0 || r === 1)
      if (r)
        if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
          this[n] = !0;
        else
          throw Error(Ne);
      else
        this[n] = !1;
    else
      throw Error(V + n + ": " + r);
  return this;
}
function Qe(e) {
  return new this(e).cos();
}
function Ye(e) {
  return new this(e).cosh();
}
function Pe(e) {
  var i, n, r;
  function t(s) {
    var o, u, c, f = this;
    if (!(f instanceof t))
      return new t(s);
    if (f.constructor = t, ge(s)) {
      f.s = s.s, m ? !s.d || s.e > t.maxE ? (f.e = NaN, f.d = null) : s.e < t.minE ? (f.e = 0, f.d = [0]) : (f.e = s.e, f.d = s.d.slice()) : (f.e = s.e, f.d = s.d ? s.d.slice() : s.d);
      return;
    }
    if (c = typeof s, c === "number") {
      if (s === 0) {
        f.s = 1 / s < 0 ? -1 : 1, f.e = 0, f.d = [0];
        return;
      }
      if (s < 0 ? (s = -s, f.s = -1) : f.s = 1, s === ~~s && s < 1e7) {
        for (o = 0, u = s; u >= 10; u /= 10)
          o++;
        m ? o > t.maxE ? (f.e = NaN, f.d = null) : o < t.minE ? (f.e = 0, f.d = [0]) : (f.e = o, f.d = [s]) : (f.e = o, f.d = [s]);
        return;
      } else if (s * 0 !== 0) {
        s || (f.s = NaN), f.e = NaN, f.d = null;
        return;
      }
      return ae(f, s.toString());
    } else if (c !== "string")
      throw Error(V + s);
    return (u = s.charCodeAt(0)) === 45 ? (s = s.slice(1), f.s = -1) : (u === 43 && (s = s.slice(1)), f.s = 1), Ee.test(s) ? ae(f, s) : Te(f, s);
  }
  if (t.prototype = d, t.ROUND_UP = 0, t.ROUND_DOWN = 1, t.ROUND_CEIL = 2, t.ROUND_FLOOR = 3, t.ROUND_HALF_UP = 4, t.ROUND_HALF_DOWN = 5, t.ROUND_HALF_EVEN = 6, t.ROUND_HALF_CEIL = 7, t.ROUND_HALF_FLOOR = 8, t.EUCLID = 9, t.config = t.set = Ke, t.clone = Pe, t.isDecimal = ge, t.abs = Re, t.acos = Ze, t.acosh = be, t.add = Ue, t.asin = Be, t.asinh = He, t.atan = Ve, t.atanh = $e, t.atan2 = Ge, t.cbrt = We, t.ceil = Xe, t.clamp = Je, t.cos = Qe, t.cosh = Ye, t.div = je, t.exp = ze, t.floor = xe, t.hypot = ye, t.ln = ei, t.log = ii, t.log10 = ri, t.log2 = ni, t.max = ti, t.min = si, t.mod = oi, t.mul = ui, t.pow = fi, t.random = ci, t.round = li, t.sign = ai, t.sin = hi, t.sinh = di, t.sqrt = pi, t.sub = gi, t.sum = wi, t.tan = mi, t.tanh = Ni, t.trunc = vi, e === void 0 && (e = {}), e && e.defaults !== !0)
    for (r = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], i = 0; i < r.length; )
      e.hasOwnProperty(n = r[i++]) || (e[n] = this[n]);
  return t.config(e), t;
}
function je(e, i) {
  return new this(e).div(i);
}
function ze(e) {
  return new this(e).exp();
}
function xe(e) {
  return p(e = new this(e), e.e + 1, 3);
}
function ye() {
  var e, i, n = new this(0);
  for (m = !1, e = 0; e < arguments.length; )
    if (i = new this(arguments[e++]), i.d)
      n.d && (n = n.plus(i.times(i)));
    else {
      if (i.s)
        return m = !0, new this(1 / 0);
      n = i;
    }
  return m = !0, n.sqrt();
}
function ge(e) {
  return e instanceof I || e && e.toStringTag === ve || !1;
}
function ei(e) {
  return new this(e).ln();
}
function ii(e, i) {
  return new this(e).log(i);
}
function ni(e) {
  return new this(e).log(2);
}
function ri(e) {
  return new this(e).log(10);
}
function ti() {
  return Ce(this, arguments, "lt");
}
function si() {
  return Ce(this, arguments, "gt");
}
function oi(e, i) {
  return new this(e).mod(i);
}
function ui(e, i) {
  return new this(e).mul(i);
}
function fi(e, i) {
  return new this(e).pow(i);
}
function ci(e) {
  var i, n, r, t, s = 0, o = new this(1), u = [];
  if (e === void 0 ? e = this.precision : O(e, 1, $), r = Math.ceil(e / w), this.crypto)
    if (crypto.getRandomValues)
      for (i = crypto.getRandomValues(new Uint32Array(r)); s < r; )
        t = i[s], t >= 429e7 ? i[s] = crypto.getRandomValues(new Uint32Array(1))[0] : u[s++] = t % 1e7;
    else if (crypto.randomBytes) {
      for (i = crypto.randomBytes(r *= 4); s < r; )
        t = i[s] + (i[s + 1] << 8) + (i[s + 2] << 16) + ((i[s + 3] & 127) << 24), t >= 214e7 ? crypto.randomBytes(4).copy(i, s) : (u.push(t % 1e7), s += 4);
      s = r / 4;
    } else
      throw Error(Ne);
  else
    for (; s < r; )
      u[s++] = Math.random() * 1e7 | 0;
  for (r = u[--s], e %= w, r && e && (t = q(10, w - e), u[s] = (r / t | 0) * t); u[s] === 0; s--)
    u.pop();
  if (s < 0)
    n = 0, u = [0];
  else {
    for (n = -1; u[0] === 0; n -= w)
      u.shift();
    for (r = 1, t = u[0]; t >= 10; t /= 10)
      r++;
    r < w && (n -= w - r);
  }
  return o.e = n, o.d = u, o;
}
function li(e) {
  return p(e = new this(e), e.e + 1, this.rounding);
}
function ai(e) {
  return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
}
function hi(e) {
  return new this(e).sin();
}
function di(e) {
  return new this(e).sinh();
}
function pi(e) {
  return new this(e).sqrt();
}
function gi(e, i) {
  return new this(e).sub(i);
}
function wi() {
  var e = 0, i = arguments, n = new this(i[e]);
  for (m = !1; n.s && ++e < i.length; )
    n = n.plus(i[e]);
  return m = !0, p(n, this.precision, this.rounding);
}
function mi(e) {
  return new this(e).tan();
}
function Ni(e) {
  return new this(e).tanh();
}
function vi(e) {
  return p(e = new this(e), e.e + 1, 1);
}
d[Symbol.for("nodejs.util.inspect.custom")] = d.toString;
d[Symbol.toStringTag] = "Decimal";
var I = d.constructor = Pe(fe);
x = new I(x);
y = new I(y);
const Ei = {
  add: function(e, i) {
    return new I(e).add(new I(i)).toNumber();
  },
  subtract: function(e, i) {
    return new I(e).sub(new I(i)).toNumber();
  },
  multiply: function(e, i) {
    return new I(e).mul(new I(i)).toNumber();
  },
  divide: function(e, i) {
    return new I(e).div(new I(i)).toNumber();
  }
};
export {
  Ei as default
};
//# sourceMappingURL=index.js.map