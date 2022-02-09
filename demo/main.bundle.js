var STTdiff = (function (t) {
  var e = {};
  function n(r) {
    if (e[r]) return e[r].exports;
    var o = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  return (
    (n.m = t),
    (n.c = e),
    (n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var o in t)
          n.d(
            r,
            o,
            function (e) {
              return t[e];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 2))
  );
})([
  function (t, e, n) {
    "use strict";
    (t.exports.makeItArrayIfItsNot = function (t) {
      return "[object Array]" !== Object.prototype.toString.call(t) ? [t] : t;
    }),
      (t.exports.findIntervalLeftBorderIndex = function (t, e) {
        if (t < e[0]) return 0;
        if (t > e[e.length - 1]) return e.length - 1;
        for (var n, r = 0, o = e.length - 1; o - r != 1; )
          t >= e[(n = r + Math.floor((o - r) / 2))] ? (r = n) : (o = n);
        return r;
      });
  },
  function (t, e) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (t) {
      "object" == typeof window && (n = window);
    }
    t.exports = n;
  },
  function (t, e, n) {
    var r = n(3),
      o = n(13),
      i = n(15),
      u = n(16),
      s = n(17),
      a = n(23),
      c = n(24).diffsListToHtml;
    function l(t) {
      return (function (t) {
        return t.trim().replace(/\n\n/g, " ").replace(/\n/g, " ");
      })(t).split(" ");
    }
    function f(t, e) {
      return (function (t, e) {
        var n = t.map(function (t) {
            return o(t.text);
          }),
          i = e.map(function (t) {
            return o(t);
          });
        return new r.SequenceMatcher(null, n, i).getOpcodes();
      })(t, l(e));
    }
    function p(t, e) {
      var n = t.words,
        r = f(n, e),
        o = l(e);
      return s(r, n, o);
    }
    (t.exports = p),
      (t.exports.alignSTT = p),
      (t.exports.diffsList = function (t, e) {
        var n = t.words,
          r = f(n, e),
          o = l(e);
        return u(r, n, o);
      }),
      (t.exports.diffsCount = function (t, e) {
        var n = t.words,
          r = f(n, e),
          o = l(e);
        return i(r, n, o);
      }),
      (t.exports.calculateWordDuration = a),
      (t.exports.diffsListToHtml = c),
      (t.exports.diffsListAsHtml = function (t, e, n) {
        var r = t.words,
          o = f(r, e),
          i = l(e),
          s = u(o, r, i);
        return c(s, n);
      });
  },
  function (t, e, n) {
    t.exports = n(4);
  },
  function (t, e, n) {
    (function () {
      var t,
        r,
        o,
        i,
        u,
        s,
        a,
        c,
        l,
        f,
        p,
        h,
        d,
        g,
        y,
        v,
        m,
        b,
        w,
        x,
        j,
        E =
          [].indexOf ||
          function (t) {
            for (var e = 0, n = this.length; e < n; e++)
              if (e in this && this[e] === t) return e;
            return -1;
          };
      (c = Math.floor),
        (f = Math.max),
        (p = Math.min),
        (r = n(5)),
        (s = n(7)),
        (m = function (t, e) {
          return e ? (2 * t) / e : 1;
        }),
        (v = function (t, e) {
          var n, r, o, i, u, s;
          for (
            u = [t.length, e.length], n = i = 0, s = p((r = u[0]), (o = u[1]));
            0 <= s ? i < s : i > s;
            n = 0 <= s ? ++i : --i
          ) {
            if (t[n] < e[n]) return -1;
            if (t[n] > e[n]) return 1;
          }
          return r - o;
        }),
        (j = function (t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (y = function (t) {
          var e, n;
          for (e = 0, n = t.length; e < n; e++) if (t[e]) return !0;
          return !1;
        }),
        (u = (function () {
          function t(t, e, n, r) {
            (this.isjunk = t),
              null == e && (e = ""),
              null == n && (n = ""),
              (this.autojunk = null == r || r),
              (this.a = this.b = null),
              this.setSeqs(e, n);
          }
          return (
            (t.name = "SequenceMatcher"),
            (t.prototype.setSeqs = function (t, e) {
              return this.setSeq1(t), this.setSeq2(e);
            }),
            (t.prototype.setSeq1 = function (t) {
              if (t !== this.a)
                return (
                  (this.a = t), (this.matchingBlocks = this.opcodes = null)
                );
            }),
            (t.prototype.setSeq2 = function (t) {
              if (t !== this.b)
                return (
                  (this.b = t),
                  (this.matchingBlocks = this.opcodes = null),
                  (this.fullbcount = null),
                  this._chainB()
                );
            }),
            (t.prototype._chainB = function () {
              var t, e, n, r, o, i, u, s, a, l, f, p, h, d;
              for (
                t = this.b, this.b2j = e = {}, r = l = 0, p = t.length;
                l < p;
                r = ++l
              )
                (n = t[r]), (j(e, n) ? e[n] : (e[n] = [])).push(r);
              if (((i = {}), (o = this.isjunk)))
                for (f = 0, h = (d = Object.keys(e)).length; f < h; f++)
                  o((n = d[f])) && ((i[n] = !0), delete e[n]);
              if (((a = {}), (u = t.length), this.autojunk && u >= 200))
                for (n in ((s = c(u / 100) + 1), e))
                  e[n].length > s && ((a[n] = !0), delete e[n]);
              return (
                (this.isbjunk = function (t) {
                  return j(i, t);
                }),
                (this.isbpopular = function (t) {
                  return j(a, t);
                })
              );
            }),
            (t.prototype.findLongestMatch = function (t, e, n, r) {
              var o, i, u, s, a, c, l, f, p, h, d, g, y, v, m, b, w, x, E, O, S;
              for (
                o = (b = [this.a, this.b, this.b2j, this.isbjunk])[0],
                  i = b[1],
                  u = b[2],
                  f = b[3],
                  s = (w = [t, n, 0])[0],
                  a = w[1],
                  c = w[2],
                  h = {},
                  l = y = t;
                t <= e ? y < e : y > e;
                l = t <= e ? ++y : --y
              ) {
                for (
                  g = {}, v = 0, m = (x = j(u, o[l]) ? u[o[l]] : []).length;
                  v < m;
                  v++
                )
                  if (!((p = x[v]) < n)) {
                    if (p >= r) break;
                    (d = g[p] = (h[p - 1] || 0) + 1) > c &&
                      ((s = (E = [l - d + 1, p - d + 1, d])[0]),
                      (a = E[1]),
                      (c = E[2]));
                  }
                h = g;
              }
              for (; s > t && a > n && !f(i[a - 1]) && o[s - 1] === i[a - 1]; )
                (s = (O = [s - 1, a - 1, c + 1])[0]), (a = O[1]), (c = O[2]);
              for (
                ;
                s + c < e && a + c < r && !f(i[a + c]) && o[s + c] === i[a + c];

              )
                c++;
              for (; s > t && a > n && f(i[a - 1]) && o[s - 1] === i[a - 1]; )
                (s = (S = [s - 1, a - 1, c + 1])[0]), (a = S[1]), (c = S[2]);
              for (
                ;
                s + c < e && a + c < r && f(i[a + c]) && o[s + c] === i[a + c];

              )
                c++;
              return [s, a, c];
            }),
            (t.prototype.getMatchingBlocks = function () {
              var t,
                e,
                n,
                r,
                o,
                i,
                u,
                s,
                a,
                c,
                l,
                f,
                p,
                h,
                d,
                g,
                y,
                m,
                b,
                w,
                x,
                j,
                E,
                O,
                S,
                T;
              if (this.matchingBlocks) return this.matchingBlocks;
              for (
                m = [
                  [
                    0,
                    (h = (j = [this.a.length, this.b.length])[0]),
                    0,
                    (d = j[1]),
                  ],
                ],
                  g = [];
                m.length;

              )
                (e = (E = m.pop())[0]),
                  (t = E[1]),
                  (r = E[2]),
                  (n = E[3]),
                  (o = (O = b = this.findLongestMatch(e, t, r, n))[0]),
                  (s = O[1]),
                  (l = O[2]) &&
                    (g.push(b),
                    e < o && r < s && m.push([e, o, r, s]),
                    o + l < t && s + l < n && m.push([o + l, t, s + l, n]));
              for (
                g.sort(v), i = a = f = 0, y = [], w = 0, x = g.length;
                w < x;
                w++
              )
                (u = (S = g[w])[0]),
                  (c = S[1]),
                  (p = S[2]),
                  i + f === u && a + f === c
                    ? (f += p)
                    : (f && y.push([i, a, f]),
                      (i = (T = [u, c, p])[0]),
                      (a = T[1]),
                      (f = T[2]));
              return (
                f && y.push([i, a, f]),
                y.push([h, d, 0]),
                (this.matchingBlocks = y)
              );
            }),
            (t.prototype.getOpcodes = function () {
              var t, e, n, r, o, i, u, s, a, c, l, f;
              if (this.opcodes) return this.opcodes;
              for (
                r = o = 0,
                  this.opcodes = e = [],
                  s = 0,
                  a = (c = this.getMatchingBlocks()).length;
                s < a;
                s++
              )
                (t = (l = c[s])[0]),
                  (n = l[1]),
                  (i = l[2]),
                  (u = ""),
                  r < t && o < n
                    ? (u = "replace")
                    : r < t
                    ? (u = "delete")
                    : o < n && (u = "insert"),
                  u && e.push([u, r, t, o, n]),
                  (r = (f = [t + i, n + i])[0]),
                  (o = f[1]),
                  i && e.push(["equal", t, r, n, o]);
              return e;
            }),
            (t.prototype.getGroupedOpcodes = function (t) {
              var e, n, r, o, i, u, s, a, c, l, h, d, g, y, v;
              for (
                null == t && (t = 3),
                  (e = this.getOpcodes()).length ||
                    (e = [["equal", 0, 1, 0, 1]]),
                  "equal" === e[0][0] &&
                    ((c = (d = e[0])[0]),
                    (o = d[1]),
                    (i = d[2]),
                    (u = d[3]),
                    (s = d[4]),
                    (e[0] = [c, f(o, i - t), i, f(u, s - t), s])),
                  "equal" === e[e.length - 1][0] &&
                    ((c = (g = e[e.length - 1])[0]),
                    (o = g[1]),
                    (i = g[2]),
                    (u = g[3]),
                    (s = g[4]),
                    (e[e.length - 1] = [c, o, p(i, o + t), u, p(s, u + t)])),
                  a = t + t,
                  r = [],
                  n = [],
                  l = 0,
                  h = e.length;
                l < h;
                l++
              )
                (c = (y = e[l])[0]),
                  (o = y[1]),
                  (i = y[2]),
                  (u = y[3]),
                  (s = y[4]),
                  "equal" === c &&
                    i - o > a &&
                    (n.push([c, o, p(i, o + t), u, p(s, u + t)]),
                    r.push(n),
                    (n = []),
                    (o = (v = [f(o, i - t), f(u, s - t)])[0]),
                    (u = v[1])),
                  n.push([c, o, i, u, s]);
              return (
                !n.length ||
                  (1 === n.length && "equal" === n[0][0]) ||
                  r.push(n),
                r
              );
            }),
            (t.prototype.ratio = function () {
              var t, e, n, r;
              for (
                t = 0, e = 0, n = (r = this.getMatchingBlocks()).length;
                e < n;
                e++
              )
                t += r[e][2];
              return m(t, this.a.length + this.b.length);
            }),
            (t.prototype.quickRatio = function () {
              var t, e, n, r, o, i, u, s, a, c, l;
              if (!this.fullbcount)
                for (
                  this.fullbcount = n = {}, i = 0, s = (c = this.b).length;
                  i < s;
                  i++
                )
                  n[(e = c[i])] = (n[e] || 0) + 1;
              for (
                n = this.fullbcount,
                  t = {},
                  r = 0,
                  u = 0,
                  a = (l = this.a).length;
                u < a;
                u++
              )
                (e = l[u]),
                  (o = j(t, e) ? t[e] : n[e] || 0),
                  (t[e] = o - 1),
                  o > 0 && r++;
              return m(r, this.a.length + this.b.length);
            }),
            (t.prototype.realQuickRatio = function () {
              var t, e, n;
              return (
                (n = [this.a.length, this.b.length]),
                m(p((t = n[0]), (e = n[1])), t + e)
              );
            }),
            t
          );
        })()),
        (l = function (t, e, n, o) {
          var i, s, a, c, l, f, p, h, d;
          if ((null == n && (n = 3), null == o && (o = 0.6), !(n > 0)))
            throw new Error("n must be > 0: (" + n + ")");
          if (!(0 <= o && o <= 1))
            throw new Error("cutoff must be in [0.0, 1.0]: (" + o + ")");
          for (
            i = [], (s = new u()).setSeq2(t), c = 0, f = e.length;
            c < f;
            c++
          )
            (a = e[c]),
              s.setSeq1(a),
              s.realQuickRatio() >= o &&
                s.quickRatio() >= o &&
                s.ratio() >= o &&
                i.push([s.ratio(), a]);
          for (d = [], l = 0, p = (i = r.nlargest(i, n, v)).length; l < p; l++)
            (h = i[l])[0], (a = h[1]), d.push(a);
          return d;
        }),
        (b = function (t, e) {
          var n, r, o;
          for (n = (o = [0, t.length])[0], r = o[1]; n < r && t[n] === e; ) n++;
          return n;
        }),
        (t = (function () {
          function t(t, e) {
            (this.linejunk = t), (this.charjunk = e);
          }
          return (
            (t.name = "Differ"),
            (t.prototype.compare = function (t, e) {
              var n, r, o, i, s, a, c, l, f, p, h, d, g, y;
              for (
                c = [],
                  f = 0,
                  h = (g = new u(this.linejunk, t, e).getOpcodes()).length;
                f < h;
                f++
              ) {
                switch (
                  ((l = (y = g[f])[0]),
                  (r = y[1]),
                  (n = y[2]),
                  (i = y[3]),
                  (o = y[4]),
                  l)
                ) {
                  case "replace":
                    s = this._fancyReplace(t, r, n, e, i, o);
                    break;
                  case "delete":
                    s = this._dump("-", t, r, n);
                    break;
                  case "insert":
                    s = this._dump("+", e, i, o);
                    break;
                  case "equal":
                    s = this._dump(" ", t, r, n);
                    break;
                  default:
                    throw new Error("unknow tag (" + l + ")");
                }
                for (p = 0, d = s.length; p < d; p++) (a = s[p]), c.push(a);
              }
              return c;
            }),
            (t.prototype._dump = function (t, e, n, r) {
              var o, i, u;
              for (
                u = [], o = i = n;
                n <= r ? i < r : i > r;
                o = n <= r ? ++i : --i
              )
                u.push(t + " " + e[o]);
              return u;
            }),
            (t.prototype._plainReplace = function (t, e, n, r, o, i) {
              var u, a, c, l, f, p, h, d, g, y;
              for (
                s(e < n && o < i),
                  i - o < n - e
                    ? ((u = this._dump("+", r, o, i)),
                      (f = this._dump("-", t, e, n)))
                    : ((u = this._dump("-", t, e, n)),
                      (f = this._dump("+", r, o, i))),
                  l = [],
                  p = 0,
                  d = (y = [u, f]).length;
                p < d;
                p++
              )
                for (h = 0, g = (a = y[p]).length; h < g; h++)
                  (c = a[h]), l.push(c);
              return l;
            }),
            (t.prototype._fancyReplace = function (t, e, n, r, o, i) {
              var s,
                a,
                c,
                l,
                f,
                p,
                h,
                d,
                g,
                y,
                v,
                m,
                b,
                w,
                x,
                j,
                E,
                O,
                S,
                T,
                k,
                q,
                A,
                _,
                I,
                M,
                B,
                L,
                P,
                R,
                z,
                D,
                N,
                C,
                F,
                H,
                U,
                $,
                W,
                J,
                G,
                Q,
                V,
                K,
                Z,
                X,
                Y,
                tt;
              for (
                h = (H = [0.74, 0.75])[0],
                  w = H[1],
                  b = new u(this.charjunk),
                  x = (U = [null, null])[0],
                  j = U[1],
                  q = [],
                  O = _ = o;
                o <= i ? _ < i : _ > i;
                O = o <= i ? ++_ : --_
              )
                for (
                  y = r[O], b.setSeq2(y), E = I = e;
                  e <= n ? I < n : I > n;
                  E = e <= n ? ++I : --I
                )
                  (a = t[E]) !== y
                    ? (b.setSeq1(a),
                      b.realQuickRatio() > h &&
                        b.quickRatio() > h &&
                        b.ratio() > h &&
                        ((h = (Q = [b.ratio(), E, O])[0]),
                        (d = Q[1]),
                        (g = Q[2])))
                    : null === x && ((x = (G = [E, O])[0]), (j = G[1]));
              if (h < w) {
                if (null === x) {
                  for (
                    M = 0,
                      L = (V = this._plainReplace(t, e, n, r, o, i)).length;
                    M < L;
                    M++
                  )
                    (k = V[M]), q.push(k);
                  return q;
                }
                (d = (K = [x, j, 1])[0]), (g = K[1]), (h = K[2]);
              } else x = null;
              for (
                B = 0, P = (Z = this._fancyHelper(t, e, d, r, o, g)).length;
                B < P;
                B++
              )
                (k = Z[B]), q.push(k);
              if (((s = (X = [t[d], r[g]])[0]), (p = X[1]), null === x)) {
                for (
                  f = m = "",
                    b.setSeqs(s, p),
                    N = 0,
                    R = (Y = b.getOpcodes()).length;
                  N < R;
                  N++
                )
                  switch (
                    ((A = (tt = Y[N])[0]),
                    (c = tt[1]),
                    (l = tt[2]),
                    (v = tt[3]),
                    (S = ($ = [l - c, tt[4] - v])[0]),
                    (T = $[1]),
                    A)
                  ) {
                    case "replace":
                      (f += Array(S + 1).join("^")),
                        (m += Array(T + 1).join("^"));
                      break;
                    case "delete":
                      f += Array(S + 1).join("-");
                      break;
                    case "insert":
                      m += Array(T + 1).join("+");
                      break;
                    case "equal":
                      (f += Array(S + 1).join(" ")),
                        (m += Array(T + 1).join(" "));
                      break;
                    default:
                      throw new Error("unknow tag (" + A + ")");
                  }
                for (
                  C = 0, z = (W = this._qformat(s, p, f, m)).length;
                  C < z;
                  C++
                )
                  (k = W[C]), q.push(k);
              } else q.push("  " + s);
              for (
                F = 0,
                  D = (J = this._fancyHelper(t, d + 1, n, r, g + 1, i)).length;
                F < D;
                F++
              )
                (k = J[F]), q.push(k);
              return q;
            }),
            (t.prototype._fancyHelper = function (t, e, n, r, o, i) {
              var u;
              return (
                (u = []),
                e < n
                  ? (u =
                      o < i
                        ? this._fancyReplace(t, e, n, r, o, i)
                        : this._dump("-", t, e, n))
                  : o < i && (u = this._dump("+", r, o, i)),
                u
              );
            }),
            (t.prototype._qformat = function (t, e, n, r) {
              var o, i;
              return (
                (i = []),
                (o = p(b(t, "\t"), b(e, "\t"))),
                (o = p(o, b(n.slice(0, o), " "))),
                (o = p(o, b(r.slice(0, o), " "))),
                (n = n.slice(o).replace(/\s+$/, "")),
                (r = r.slice(o).replace(/\s+$/, "")),
                i.push("- " + t),
                n.length && i.push("? " + Array(o + 1).join("\t") + n + "\n"),
                i.push("+ " + e),
                r.length && i.push("? " + Array(o + 1).join("\t") + r + "\n"),
                i
              );
            }),
            t
          );
        })()),
        (i = function (t, e) {
          return null == e && (e = /^\s*#?\s*$/), e.test(t);
        }),
        (o = function (t, e) {
          return null == e && (e = " \t"), E.call(e, t) >= 0;
        }),
        (x = function (t, e) {
          var n, r;
          return (
            (n = t + 1), 1 === (r = e - t) ? "" + n : (r || n--, n + "," + r)
          );
        }),
        (g = function (t, e, n) {
          var r,
            o,
            i,
            s,
            a,
            c,
            l,
            f,
            p,
            h,
            d,
            g,
            y,
            v,
            m,
            b,
            w,
            j,
            E,
            O,
            S,
            T,
            k,
            q,
            A,
            _,
            I,
            M,
            B,
            L,
            P,
            R,
            z,
            D,
            N,
            C,
            F;
          for (
            null == (a = (P = null != n ? n : {}).fromfile) && (a = ""),
              null == (E = P.tofile) && (E = ""),
              null == (c = P.fromfiledate) && (c = ""),
              null == (O = P.tofiledate) && (O = ""),
              null == P.n && 3,
              null == (m = P.lineterm) && (m = "\n"),
              v = [],
              b = !1,
              S = 0,
              A = (R = new u(null, t, e).getGroupedOpcodes()).length;
            S < A;
            S++
          )
            for (
              l = R[S],
                b ||
                  ((b = !0),
                  (s = c ? "\t" + c : ""),
                  (j = O ? "\t" + O : ""),
                  v.push("--- " + a + s + m),
                  v.push("+++ " + E + j + m)),
                g = (z = [l[0], l[l.length - 1]])[1],
                r = x((i = z[0])[1], g[2]),
                o = x(i[3], g[4]),
                v.push("@@ -" + r + " +" + o + " @@" + m),
                T = 0,
                _ = l.length;
              T < _;
              T++
            )
              if (
                ((w = (D = l[T])[0]),
                (f = D[1]),
                (p = D[2]),
                (h = D[3]),
                (d = D[4]),
                "equal" !== w)
              ) {
                if ("replace" === w || "delete" === w)
                  for (q = 0, M = (C = t.slice(f, p)).length; q < M; q++)
                    (y = C[q]), v.push("-" + y);
                if ("replace" === w || "insert" === w)
                  for (L = 0, B = (F = e.slice(h, d)).length; L < B; L++)
                    (y = F[L]), v.push("+" + y);
              } else
                for (k = 0, I = (N = t.slice(f, p)).length; k < I; k++)
                  (y = N[k]), v.push(" " + y);
          return v;
        }),
        (w = function (t, e) {
          var n, r;
          return (
            (n = t + 1),
            (r = e - t) || n--,
            r <= 1 ? "" + n : n + "," + (n + r - 1)
          );
        }),
        (a = function (t, e, n) {
          var r,
            o,
            i,
            s,
            a,
            c,
            l,
            f,
            p,
            h,
            d,
            g,
            v,
            m,
            b,
            x,
            j,
            E,
            O,
            S,
            T,
            k,
            q,
            A,
            _,
            I,
            M,
            B,
            L,
            P,
            R,
            z,
            D,
            N,
            C,
            F,
            H,
            U;
          for (
            null == (a = (z = null != n ? n : {}).fromfile) && (a = ""),
              null == (S = z.tofile) && (S = ""),
              null == (c = z.fromfiledate) && (c = ""),
              null == (T = z.tofiledate) && (T = ""),
              null == z.n && 3,
              null == (b = z.lineterm) && (b = "\n"),
              x = { insert: "+ ", delete: "- ", replace: "! ", equal: "  " },
              j = !1,
              m = [],
              k = 0,
              I = (D = new u(null, t, e).getGroupedOpcodes()).length;
            k < I;
            k++
          )
            if (((l = D[k]), !j)) {
              if (
                ((j = !0),
                (s = c ? "\t" + c : ""),
                (O = T ? "\t" + T : ""),
                m.push("*** " + a + s + b),
                m.push("--- " + S + O + b),
                (i = (N = [l[0], l[l.length - 1]])[0]),
                (g = N[1]),
                m.push("***************" + b),
                (r = w(i[1], g[2])),
                m.push("*** " + r + " ****" + b),
                y(
                  (function () {
                    var t, e, n, r;
                    for (r = [], t = 0, e = l.length; t < e; t++)
                      (n = l[t]),
                        (E = n[0]),
                        n[1],
                        n[2],
                        n[3],
                        n[4],
                        r.push("replace" === E || "delete" === E);
                    return r;
                  })()
                ))
              )
                for (q = 0, M = l.length; q < M; q++)
                  if (
                    ((C = l[q]),
                    (E = C[0]),
                    (f = C[1]),
                    (p = C[2]),
                    C[3],
                    C[4],
                    "insert" !== E)
                  )
                    for (A = 0, B = (F = t.slice(f, p)).length; A < B; A++)
                      (v = F[A]), m.push(x[E] + v);
              if (
                ((o = w(i[3], g[4])),
                m.push("--- " + o + " ----" + b),
                y(
                  (function () {
                    var t, e, n, r;
                    for (r = [], t = 0, e = l.length; t < e; t++)
                      (n = l[t]),
                        (E = n[0]),
                        n[1],
                        n[2],
                        n[3],
                        n[4],
                        r.push("replace" === E || "insert" === E);
                    return r;
                  })()
                ))
              )
                for (_ = 0, L = l.length; _ < L; _++)
                  if (
                    ((H = l[_]),
                    (E = H[0]),
                    H[1],
                    H[2],
                    (h = H[3]),
                    (d = H[4]),
                    "delete" !== E)
                  )
                    for (R = 0, P = (U = e.slice(h, d)).length; R < P; R++)
                      (v = U[R]), m.push(x[E] + v);
            }
          return m;
        }),
        (h = function (e, n, r, i) {
          return null == i && (i = o), new t(r, i).compare(e, n);
        }),
        (d = function (t, e) {
          var n, r, o, i, u, s, a;
          if (!(i = { 1: "- ", 2: "+ " }[e]))
            throw new Error("unknow delta choice (must be 1 or 2): " + e);
          for (o = ["  ", i], r = [], u = 0, s = t.length; u < s; u++)
            (a = (n = t[u]).slice(0, 2)),
              E.call(o, a) >= 0 && r.push(n.slice(2));
          return r;
        }),
        (e._arrayCmp = v),
        (e.SequenceMatcher = u),
        (e.getCloseMatches = l),
        (e._countLeading = b),
        (e.Differ = t),
        (e.IS_LINE_JUNK = i),
        (e.IS_CHARACTER_JUNK = o),
        (e._formatRangeUnified = x),
        (e.unifiedDiff = g),
        (e._formatRangeContext = w),
        (e.contextDiff = a),
        (e.ndiff = h),
        (e.restore = d);
    }.call(this));
  },
  function (t, e, n) {
    t.exports = n(6);
  },
  function (t, e, n) {
    var r, o, i;
    (function () {
      var n, u, s, a, c, l, f, p, h, d, g, y, v, m, b;
      (s = Math.floor),
        (d = Math.min),
        (u = function (t, e) {
          return t < e ? -1 : t > e ? 1 : 0;
        }),
        (h = function (t, e, n, r, o) {
          var i;
          if ((null == n && (n = 0), null == o && (o = u), n < 0))
            throw new Error("lo must be non-negative");
          for (null == r && (r = t.length); n < r; )
            o(e, t[(i = s((n + r) / 2))]) < 0 ? (r = i) : (n = i + 1);
          return [].splice.apply(t, [n, n - n].concat(e)), e;
        }),
        (l = function (t, e, n) {
          return null == n && (n = u), t.push(e), m(t, 0, t.length - 1, n);
        }),
        (c = function (t, e) {
          var n, r;
          return (
            null == e && (e = u),
            (n = t.pop()),
            t.length ? ((r = t[0]), (t[0] = n), b(t, 0, e)) : (r = n),
            r
          );
        }),
        (p = function (t, e, n) {
          var r;
          return null == n && (n = u), (r = t[0]), (t[0] = e), b(t, 0, n), r;
        }),
        (f = function (t, e, n) {
          var r;
          return (
            null == n && (n = u),
            t.length &&
              n(t[0], e) < 0 &&
              ((e = (r = [t[0], e])[0]), (t[0] = r[1]), b(t, 0, n)),
            e
          );
        }),
        (a = function (t, e) {
          var n, r, o, i, a, c;
          for (
            null == e && (e = u),
              a = [],
              r = 0,
              o = (i = function () {
                c = [];
                for (
                  var e = 0, n = s(t.length / 2);
                  0 <= n ? e < n : e > n;
                  0 <= n ? e++ : e--
                )
                  c.push(e);
                return c;
              }
                .apply(this)
                .reverse()).length;
            r < o;
            r++
          )
            (n = i[r]), a.push(b(t, n, e));
          return a;
        }),
        (v = function (t, e, n) {
          var r;
          if ((null == n && (n = u), -1 !== (r = t.indexOf(e))))
            return m(t, 0, r, n), b(t, r, n);
        }),
        (g = function (t, e, n) {
          var r, o, i, s, c;
          if ((null == n && (n = u), !(o = t.slice(0, e)).length)) return o;
          for (a(o, n), i = 0, s = (c = t.slice(e)).length; i < s; i++)
            (r = c[i]), f(o, r, n);
          return o.sort(n).reverse();
        }),
        (y = function (t, e, n) {
          var r, o, i, s, l, f, p, g, y;
          if ((null == n && (n = u), 10 * e <= t.length)) {
            if (!(i = t.slice(0, e).sort(n)).length) return i;
            for (
              o = i[i.length - 1], s = 0, f = (p = t.slice(e)).length;
              s < f;
              s++
            )
              n((r = p[s]), o) < 0 &&
                (h(i, r, 0, null, n), i.pop(), (o = i[i.length - 1]));
            return i;
          }
          for (
            a(t, n), y = [], l = 0, g = d(e, t.length);
            0 <= g ? l < g : l > g;
            0 <= g ? ++l : --l
          )
            y.push(c(t, n));
          return y;
        }),
        (m = function (t, e, n, r) {
          var o, i, s;
          for (
            null == r && (r = u), o = t[n];
            n > e && r(o, (i = t[(s = (n - 1) >> 1)])) < 0;

          )
            (t[n] = i), (n = s);
          return (t[n] = o);
        }),
        (b = function (t, e, n) {
          var r, o, i, s, a;
          for (
            null == n && (n = u), o = t.length, a = e, i = t[e], r = 2 * e + 1;
            r < o;

          )
            (s = r + 1) < o && !(n(t[r], t[s]) < 0) && (r = s),
              (t[e] = t[r]),
              (r = 2 * (e = r) + 1);
          return (t[e] = i), m(t, a, e, n);
        }),
        (n = (function () {
          function t(t) {
            (this.cmp = null != t ? t : u), (this.nodes = []);
          }
          return (
            (t.push = l),
            (t.pop = c),
            (t.replace = p),
            (t.pushpop = f),
            (t.heapify = a),
            (t.updateItem = v),
            (t.nlargest = g),
            (t.nsmallest = y),
            (t.prototype.push = function (t) {
              return l(this.nodes, t, this.cmp);
            }),
            (t.prototype.pop = function () {
              return c(this.nodes, this.cmp);
            }),
            (t.prototype.peek = function () {
              return this.nodes[0];
            }),
            (t.prototype.contains = function (t) {
              return -1 !== this.nodes.indexOf(t);
            }),
            (t.prototype.replace = function (t) {
              return p(this.nodes, t, this.cmp);
            }),
            (t.prototype.pushpop = function (t) {
              return f(this.nodes, t, this.cmp);
            }),
            (t.prototype.heapify = function () {
              return a(this.nodes, this.cmp);
            }),
            (t.prototype.updateItem = function (t) {
              return v(this.nodes, t, this.cmp);
            }),
            (t.prototype.clear = function () {
              return (this.nodes = []);
            }),
            (t.prototype.empty = function () {
              return 0 === this.nodes.length;
            }),
            (t.prototype.size = function () {
              return this.nodes.length;
            }),
            (t.prototype.clone = function () {
              var e;
              return ((e = new t()).nodes = this.nodes.slice(0)), e;
            }),
            (t.prototype.toArray = function () {
              return this.nodes.slice(0);
            }),
            (t.prototype.insert = t.prototype.push),
            (t.prototype.top = t.prototype.peek),
            (t.prototype.front = t.prototype.peek),
            (t.prototype.has = t.prototype.contains),
            (t.prototype.copy = t.prototype.clone),
            t
          );
        })()),
        (o = []),
        void 0 ===
          (i =
            "function" ==
            typeof (r = function () {
              return n;
            })
              ? r.apply(e, o)
              : r) || (t.exports = i);
    }.call(this));
  },
  function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(8);
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */ function o(t, e) {
        if (t === e) return 0;
        for (
          var n = t.length, r = e.length, o = 0, i = Math.min(n, r);
          o < i;
          ++o
        )
          if (t[o] !== e[o]) {
            (n = t[o]), (r = e[o]);
            break;
          }
        return n < r ? -1 : r < n ? 1 : 0;
      }
      function i(t) {
        return e.Buffer && "function" == typeof e.Buffer.isBuffer
          ? e.Buffer.isBuffer(t)
          : !(null == t || !t._isBuffer);
      }
      var u = n(9),
        s = Object.prototype.hasOwnProperty,
        a = Array.prototype.slice,
        c = "foo" === function () {}.name;
      function l(t) {
        return Object.prototype.toString.call(t);
      }
      function f(t) {
        return (
          !i(t) &&
          "function" == typeof e.ArrayBuffer &&
          ("function" == typeof ArrayBuffer.isView
            ? ArrayBuffer.isView(t)
            : !!t &&
              (t instanceof DataView ||
                !!(t.buffer && t.buffer instanceof ArrayBuffer)))
        );
      }
      var p = (t.exports = m),
        h = /\s*function\s+([^\(\s]*)\s*/;
      function d(t) {
        if (u.isFunction(t)) {
          if (c) return t.name;
          var e = t.toString().match(h);
          return e && e[1];
        }
      }
      function g(t, e) {
        return "string" == typeof t ? (t.length < e ? t : t.slice(0, e)) : t;
      }
      function y(t) {
        if (c || !u.isFunction(t)) return u.inspect(t);
        var e = d(t);
        return "[Function" + (e ? ": " + e : "") + "]";
      }
      function v(t, e, n, r, o) {
        throw new p.AssertionError({
          message: n,
          actual: t,
          expected: e,
          operator: r,
          stackStartFunction: o,
        });
      }
      function m(t, e) {
        t || v(t, !0, e, "==", p.ok);
      }
      function b(t, e, n, r) {
        if (t === e) return !0;
        if (i(t) && i(e)) return 0 === o(t, e);
        if (u.isDate(t) && u.isDate(e)) return t.getTime() === e.getTime();
        if (u.isRegExp(t) && u.isRegExp(e))
          return (
            t.source === e.source &&
            t.global === e.global &&
            t.multiline === e.multiline &&
            t.lastIndex === e.lastIndex &&
            t.ignoreCase === e.ignoreCase
          );
        if (
          (null !== t && "object" == typeof t) ||
          (null !== e && "object" == typeof e)
        ) {
          if (
            f(t) &&
            f(e) &&
            l(t) === l(e) &&
            !(t instanceof Float32Array || t instanceof Float64Array)
          )
            return 0 === o(new Uint8Array(t.buffer), new Uint8Array(e.buffer));
          if (i(t) !== i(e)) return !1;
          var s = (r = r || { actual: [], expected: [] }).actual.indexOf(t);
          return (
            (-1 !== s && s === r.expected.indexOf(e)) ||
            (r.actual.push(t),
            r.expected.push(e),
            (function (t, e, n, r) {
              if (null == t || null == e) return !1;
              if (u.isPrimitive(t) || u.isPrimitive(e)) return t === e;
              if (n && Object.getPrototypeOf(t) !== Object.getPrototypeOf(e))
                return !1;
              var o = w(t),
                i = w(e);
              if ((o && !i) || (!o && i)) return !1;
              if (o) return (t = a.call(t)), (e = a.call(e)), b(t, e, n);
              var s,
                c,
                l = E(t),
                f = E(e);
              if (l.length !== f.length) return !1;
              for (l.sort(), f.sort(), c = l.length - 1; c >= 0; c--)
                if (l[c] !== f[c]) return !1;
              for (c = l.length - 1; c >= 0; c--)
                if (((s = l[c]), !b(t[s], e[s], n, r))) return !1;
              return !0;
            })(t, e, n, r))
          );
        }
        return n ? t === e : t == e;
      }
      function w(t) {
        return "[object Arguments]" == Object.prototype.toString.call(t);
      }
      function x(t, e) {
        if (!t || !e) return !1;
        if ("[object RegExp]" == Object.prototype.toString.call(e))
          return e.test(t);
        try {
          if (t instanceof e) return !0;
        } catch (t) {}
        return !Error.isPrototypeOf(e) && !0 === e.call({}, t);
      }
      function j(t, e, n, r) {
        var o;
        if ("function" != typeof e)
          throw new TypeError('"block" argument must be a function');
        "string" == typeof n && ((r = n), (n = null)),
          (o = (function (t) {
            var e;
            try {
              t();
            } catch (t) {
              e = t;
            }
            return e;
          })(e)),
          (r =
            (n && n.name ? " (" + n.name + ")." : ".") + (r ? " " + r : ".")),
          t && !o && v(o, n, "Missing expected exception" + r);
        var i = "string" == typeof r,
          s = !t && o && !n;
        if (
          (((!t && u.isError(o) && i && x(o, n)) || s) &&
            v(o, n, "Got unwanted exception" + r),
          (t && o && n && !x(o, n)) || (!t && o))
        )
          throw o;
      }
      (p.AssertionError = function (t) {
        (this.name = "AssertionError"),
          (this.actual = t.actual),
          (this.expected = t.expected),
          (this.operator = t.operator),
          t.message
            ? ((this.message = t.message), (this.generatedMessage = !1))
            : ((this.message = (function (t) {
                return (
                  g(y(t.actual), 128) +
                  " " +
                  t.operator +
                  " " +
                  g(y(t.expected), 128)
                );
              })(this)),
              (this.generatedMessage = !0));
        var e = t.stackStartFunction || v;
        if (Error.captureStackTrace) Error.captureStackTrace(this, e);
        else {
          var n = new Error();
          if (n.stack) {
            var r = n.stack,
              o = d(e),
              i = r.indexOf("\n" + o);
            if (i >= 0) {
              var u = r.indexOf("\n", i + 1);
              r = r.substring(u + 1);
            }
            this.stack = r;
          }
        }
      }),
        u.inherits(p.AssertionError, Error),
        (p.fail = v),
        (p.ok = m),
        (p.equal = function (t, e, n) {
          t != e && v(t, e, n, "==", p.equal);
        }),
        (p.notEqual = function (t, e, n) {
          t == e && v(t, e, n, "!=", p.notEqual);
        }),
        (p.deepEqual = function (t, e, n) {
          b(t, e, !1) || v(t, e, n, "deepEqual", p.deepEqual);
        }),
        (p.deepStrictEqual = function (t, e, n) {
          b(t, e, !0) || v(t, e, n, "deepStrictEqual", p.deepStrictEqual);
        }),
        (p.notDeepEqual = function (t, e, n) {
          b(t, e, !1) && v(t, e, n, "notDeepEqual", p.notDeepEqual);
        }),
        (p.notDeepStrictEqual = function t(e, n, r) {
          b(e, n, !0) && v(e, n, r, "notDeepStrictEqual", t);
        }),
        (p.strictEqual = function (t, e, n) {
          t !== e && v(t, e, n, "===", p.strictEqual);
        }),
        (p.notStrictEqual = function (t, e, n) {
          t === e && v(t, e, n, "!==", p.notStrictEqual);
        }),
        (p.throws = function (t, e, n) {
          j(!0, t, e, n);
        }),
        (p.doesNotThrow = function (t, e, n) {
          j(!1, t, e, n);
        }),
        (p.ifError = function (t) {
          if (t) throw t;
        }),
        (p.strict = r(
          function t(e, n) {
            e || v(e, !0, n, "==", t);
          },
          p,
          {
            equal: p.strictEqual,
            deepEqual: p.deepStrictEqual,
            notEqual: p.notStrictEqual,
            notDeepEqual: p.notDeepStrictEqual,
          }
        )),
        (p.strict.strict = p.strict);
      var E =
        Object.keys ||
        function (t) {
          var e = [];
          for (var n in t) s.call(t, n) && e.push(n);
          return e;
        };
    }.call(this, n(1)));
  },
  function (t, e, n) {
    "use strict";
    /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var r = Object.getOwnPropertySymbols,
      o = Object.prototype.hasOwnProperty,
      i = Object.prototype.propertyIsEnumerable;
    function u(t) {
      if (null == t)
        throw new TypeError(
          "Object.assign cannot be called with null or undefined"
        );
      return Object(t);
    }
    t.exports = (function () {
      try {
        if (!Object.assign) return !1;
        var t = new String("abc");
        if (((t[5] = "de"), "5" === Object.getOwnPropertyNames(t)[0]))
          return !1;
        for (var e = {}, n = 0; n < 10; n++)
          e["_" + String.fromCharCode(n)] = n;
        if (
          "0123456789" !==
          Object.getOwnPropertyNames(e)
            .map(function (t) {
              return e[t];
            })
            .join("")
        )
          return !1;
        var r = {};
        return (
          "abcdefghijklmnopqrst".split("").forEach(function (t) {
            r[t] = t;
          }),
          "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        );
      } catch (t) {
        return !1;
      }
    })()
      ? Object.assign
      : function (t, e) {
          for (var n, s, a = u(t), c = 1; c < arguments.length; c++) {
            for (var l in (n = Object(arguments[c])))
              o.call(n, l) && (a[l] = n[l]);
            if (r) {
              s = r(n);
              for (var f = 0; f < s.length; f++)
                i.call(n, s[f]) && (a[s[f]] = n[s[f]]);
            }
          }
          return a;
        };
  },
  function (t, e, n) {
    (function (t) {
      var r =
          Object.getOwnPropertyDescriptors ||
          function (t) {
            for (var e = Object.keys(t), n = {}, r = 0; r < e.length; r++)
              n[e[r]] = Object.getOwnPropertyDescriptor(t, e[r]);
            return n;
          },
        o = /%[sdj%]/g;
      (e.format = function (t) {
        if (!v(t)) {
          for (var e = [], n = 0; n < arguments.length; n++)
            e.push(s(arguments[n]));
          return e.join(" ");
        }
        n = 1;
        for (
          var r = arguments,
            i = r.length,
            u = String(t).replace(o, function (t) {
              if ("%%" === t) return "%";
              if (n >= i) return t;
              switch (t) {
                case "%s":
                  return String(r[n++]);
                case "%d":
                  return Number(r[n++]);
                case "%j":
                  try {
                    return JSON.stringify(r[n++]);
                  } catch (t) {
                    return "[Circular]";
                  }
                default:
                  return t;
              }
            }),
            a = r[n];
          n < i;
          a = r[++n]
        )
          g(a) || !w(a) ? (u += " " + a) : (u += " " + s(a));
        return u;
      }),
        (e.deprecate = function (n, r) {
          if (void 0 !== t && !0 === t.noDeprecation) return n;
          if (void 0 === t)
            return function () {
              return e.deprecate(n, r).apply(this, arguments);
            };
          var o = !1;
          return function () {
            if (!o) {
              if (t.throwDeprecation) throw new Error(r);
              t.traceDeprecation ? console.trace(r) : console.error(r),
                (o = !0);
            }
            return n.apply(this, arguments);
          };
        });
      var i,
        u = {};
      function s(t, n) {
        var r = { seen: [], stylize: c };
        return (
          arguments.length >= 3 && (r.depth = arguments[2]),
          arguments.length >= 4 && (r.colors = arguments[3]),
          d(n) ? (r.showHidden = n) : n && e._extend(r, n),
          m(r.showHidden) && (r.showHidden = !1),
          m(r.depth) && (r.depth = 2),
          m(r.colors) && (r.colors = !1),
          m(r.customInspect) && (r.customInspect = !0),
          r.colors && (r.stylize = a),
          l(r, t, r.depth)
        );
      }
      function a(t, e) {
        var n = s.styles[e];
        return n
          ? "[" + s.colors[n][0] + "m" + t + "[" + s.colors[n][1] + "m"
          : t;
      }
      function c(t, e) {
        return t;
      }
      function l(t, n, r) {
        if (
          t.customInspect &&
          n &&
          E(n.inspect) &&
          n.inspect !== e.inspect &&
          (!n.constructor || n.constructor.prototype !== n)
        ) {
          var o = n.inspect(r, t);
          return v(o) || (o = l(t, o, r)), o;
        }
        var i = (function (t, e) {
          if (m(e)) return t.stylize("undefined", "undefined");
          if (v(e)) {
            var n =
              "'" +
              JSON.stringify(e)
                .replace(/^"|"$/g, "")
                .replace(/'/g, "\\'")
                .replace(/\\"/g, '"') +
              "'";
            return t.stylize(n, "string");
          }
          if (y(e)) return t.stylize("" + e, "number");
          if (d(e)) return t.stylize("" + e, "boolean");
          if (g(e)) return t.stylize("null", "null");
        })(t, n);
        if (i) return i;
        var u = Object.keys(n),
          s = (function (t) {
            var e = {};
            return (
              t.forEach(function (t, n) {
                e[t] = !0;
              }),
              e
            );
          })(u);
        if (
          (t.showHidden && (u = Object.getOwnPropertyNames(n)),
          j(n) && (u.indexOf("message") >= 0 || u.indexOf("description") >= 0))
        )
          return f(n);
        if (0 === u.length) {
          if (E(n)) {
            var a = n.name ? ": " + n.name : "";
            return t.stylize("[Function" + a + "]", "special");
          }
          if (b(n))
            return t.stylize(RegExp.prototype.toString.call(n), "regexp");
          if (x(n)) return t.stylize(Date.prototype.toString.call(n), "date");
          if (j(n)) return f(n);
        }
        var c,
          w = "",
          O = !1,
          S = ["{", "}"];
        (h(n) && ((O = !0), (S = ["[", "]"])), E(n)) &&
          (w = " [Function" + (n.name ? ": " + n.name : "") + "]");
        return (
          b(n) && (w = " " + RegExp.prototype.toString.call(n)),
          x(n) && (w = " " + Date.prototype.toUTCString.call(n)),
          j(n) && (w = " " + f(n)),
          0 !== u.length || (O && 0 != n.length)
            ? r < 0
              ? b(n)
                ? t.stylize(RegExp.prototype.toString.call(n), "regexp")
                : t.stylize("[Object]", "special")
              : (t.seen.push(n),
                (c = O
                  ? (function (t, e, n, r, o) {
                      for (var i = [], u = 0, s = e.length; u < s; ++u)
                        q(e, String(u))
                          ? i.push(p(t, e, n, r, String(u), !0))
                          : i.push("");
                      return (
                        o.forEach(function (o) {
                          o.match(/^\d+$/) || i.push(p(t, e, n, r, o, !0));
                        }),
                        i
                      );
                    })(t, n, r, s, u)
                  : u.map(function (e) {
                      return p(t, n, r, s, e, O);
                    })),
                t.seen.pop(),
                (function (t, e, n) {
                  if (
                    t.reduce(function (t, e) {
                      return (
                        e.indexOf("\n") >= 0 && 0,
                        t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
                      );
                    }, 0) > 60
                  )
                    return (
                      n[0] +
                      ("" === e ? "" : e + "\n ") +
                      " " +
                      t.join(",\n  ") +
                      " " +
                      n[1]
                    );
                  return n[0] + e + " " + t.join(", ") + " " + n[1];
                })(c, w, S))
            : S[0] + w + S[1]
        );
      }
      function f(t) {
        return "[" + Error.prototype.toString.call(t) + "]";
      }
      function p(t, e, n, r, o, i) {
        var u, s, a;
        if (
          ((a = Object.getOwnPropertyDescriptor(e, o) || { value: e[o] }).get
            ? (s = a.set
                ? t.stylize("[Getter/Setter]", "special")
                : t.stylize("[Getter]", "special"))
            : a.set && (s = t.stylize("[Setter]", "special")),
          q(r, o) || (u = "[" + o + "]"),
          s ||
            (t.seen.indexOf(a.value) < 0
              ? (s = g(n) ? l(t, a.value, null) : l(t, a.value, n - 1)).indexOf(
                  "\n"
                ) > -1 &&
                (s = i
                  ? s
                      .split("\n")
                      .map(function (t) {
                        return "  " + t;
                      })
                      .join("\n")
                      .substr(2)
                  : "\n" +
                    s
                      .split("\n")
                      .map(function (t) {
                        return "   " + t;
                      })
                      .join("\n"))
              : (s = t.stylize("[Circular]", "special"))),
          m(u))
        ) {
          if (i && o.match(/^\d+$/)) return s;
          (u = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
            ? ((u = u.substr(1, u.length - 2)), (u = t.stylize(u, "name")))
            : ((u = u
                .replace(/'/g, "\\'")
                .replace(/\\"/g, '"')
                .replace(/(^"|"$)/g, "'")),
              (u = t.stylize(u, "string")));
        }
        return u + ": " + s;
      }
      function h(t) {
        return Array.isArray(t);
      }
      function d(t) {
        return "boolean" == typeof t;
      }
      function g(t) {
        return null === t;
      }
      function y(t) {
        return "number" == typeof t;
      }
      function v(t) {
        return "string" == typeof t;
      }
      function m(t) {
        return void 0 === t;
      }
      function b(t) {
        return w(t) && "[object RegExp]" === O(t);
      }
      function w(t) {
        return "object" == typeof t && null !== t;
      }
      function x(t) {
        return w(t) && "[object Date]" === O(t);
      }
      function j(t) {
        return w(t) && ("[object Error]" === O(t) || t instanceof Error);
      }
      function E(t) {
        return "function" == typeof t;
      }
      function O(t) {
        return Object.prototype.toString.call(t);
      }
      function S(t) {
        return t < 10 ? "0" + t.toString(10) : t.toString(10);
      }
      (e.debuglog = function (n) {
        if (
          (m(i) && (i = t.env.NODE_DEBUG || ""), (n = n.toUpperCase()), !u[n])
        )
          if (new RegExp("\\b" + n + "\\b", "i").test(i)) {
            var r = t.pid;
            u[n] = function () {
              var t = e.format.apply(e, arguments);
              console.error("%s %d: %s", n, r, t);
            };
          } else u[n] = function () {};
        return u[n];
      }),
        (e.inspect = s),
        (s.colors = {
          bold: [1, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          white: [37, 39],
          grey: [90, 39],
          black: [30, 39],
          blue: [34, 39],
          cyan: [36, 39],
          green: [32, 39],
          magenta: [35, 39],
          red: [31, 39],
          yellow: [33, 39],
        }),
        (s.styles = {
          special: "cyan",
          number: "yellow",
          boolean: "yellow",
          undefined: "grey",
          null: "bold",
          string: "green",
          date: "magenta",
          regexp: "red",
        }),
        (e.isArray = h),
        (e.isBoolean = d),
        (e.isNull = g),
        (e.isNullOrUndefined = function (t) {
          return null == t;
        }),
        (e.isNumber = y),
        (e.isString = v),
        (e.isSymbol = function (t) {
          return "symbol" == typeof t;
        }),
        (e.isUndefined = m),
        (e.isRegExp = b),
        (e.isObject = w),
        (e.isDate = x),
        (e.isError = j),
        (e.isFunction = E),
        (e.isPrimitive = function (t) {
          return (
            null === t ||
            "boolean" == typeof t ||
            "number" == typeof t ||
            "string" == typeof t ||
            "symbol" == typeof t ||
            void 0 === t
          );
        }),
        (e.isBuffer = n(11));
      var T = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      function k() {
        var t = new Date(),
          e = [S(t.getHours()), S(t.getMinutes()), S(t.getSeconds())].join(":");
        return [t.getDate(), T[t.getMonth()], e].join(" ");
      }
      function q(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }
      (e.log = function () {
        console.log("%s - %s", k(), e.format.apply(e, arguments));
      }),
        (e.inherits = n(12)),
        (e._extend = function (t, e) {
          if (!e || !w(e)) return t;
          for (var n = Object.keys(e), r = n.length; r--; ) t[n[r]] = e[n[r]];
          return t;
        });
      var A =
        "undefined" != typeof Symbol ? Symbol("util.promisify.custom") : void 0;
      function _(t, e) {
        if (!t) {
          var n = new Error("Promise was rejected with a falsy value");
          (n.reason = t), (t = n);
        }
        return e(t);
      }
      (e.promisify = function (t) {
        if ("function" != typeof t)
          throw new TypeError(
            'The "original" argument must be of type Function'
          );
        if (A && t[A]) {
          var e;
          if ("function" != typeof (e = t[A]))
            throw new TypeError(
              'The "util.promisify.custom" argument must be of type Function'
            );
          return (
            Object.defineProperty(e, A, {
              value: e,
              enumerable: !1,
              writable: !1,
              configurable: !0,
            }),
            e
          );
        }
        function e() {
          for (
            var e,
              n,
              r = new Promise(function (t, r) {
                (e = t), (n = r);
              }),
              o = [],
              i = 0;
            i < arguments.length;
            i++
          )
            o.push(arguments[i]);
          o.push(function (t, r) {
            t ? n(t) : e(r);
          });
          try {
            t.apply(this, o);
          } catch (t) {
            n(t);
          }
          return r;
        }
        return (
          Object.setPrototypeOf(e, Object.getPrototypeOf(t)),
          A &&
            Object.defineProperty(e, A, {
              value: e,
              enumerable: !1,
              writable: !1,
              configurable: !0,
            }),
          Object.defineProperties(e, r(t))
        );
      }),
        (e.promisify.custom = A),
        (e.callbackify = function (e) {
          if ("function" != typeof e)
            throw new TypeError(
              'The "original" argument must be of type Function'
            );
          function n() {
            for (var n = [], r = 0; r < arguments.length; r++)
              n.push(arguments[r]);
            var o = n.pop();
            if ("function" != typeof o)
              throw new TypeError("The last argument must be of type Function");
            var i = this,
              u = function () {
                return o.apply(i, arguments);
              };
            e.apply(this, n).then(
              function (e) {
                t.nextTick(u, null, e);
              },
              function (e) {
                t.nextTick(_, e, u);
              }
            );
          }
          return (
            Object.setPrototypeOf(n, Object.getPrototypeOf(e)),
            Object.defineProperties(n, r(e)),
            n
          );
        });
    }.call(this, n(10)));
  },
  function (t, e) {
    var n,
      r,
      o = (t.exports = {});
    function i() {
      throw new Error("setTimeout has not been defined");
    }
    function u() {
      throw new Error("clearTimeout has not been defined");
    }
    function s(t) {
      if (n === setTimeout) return setTimeout(t, 0);
      if ((n === i || !n) && setTimeout)
        return (n = setTimeout), setTimeout(t, 0);
      try {
        return n(t, 0);
      } catch (e) {
        try {
          return n.call(null, t, 0);
        } catch (e) {
          return n.call(this, t, 0);
        }
      }
    }
    !(function () {
      try {
        n = "function" == typeof setTimeout ? setTimeout : i;
      } catch (t) {
        n = i;
      }
      try {
        r = "function" == typeof clearTimeout ? clearTimeout : u;
      } catch (t) {
        r = u;
      }
    })();
    var a,
      c = [],
      l = !1,
      f = -1;
    function p() {
      l &&
        a &&
        ((l = !1), a.length ? (c = a.concat(c)) : (f = -1), c.length && h());
    }
    function h() {
      if (!l) {
        var t = s(p);
        l = !0;
        for (var e = c.length; e; ) {
          for (a = c, c = []; ++f < e; ) a && a[f].run();
          (f = -1), (e = c.length);
        }
        (a = null),
          (l = !1),
          (function (t) {
            if (r === clearTimeout) return clearTimeout(t);
            if ((r === u || !r) && clearTimeout)
              return (r = clearTimeout), clearTimeout(t);
            try {
              r(t);
            } catch (e) {
              try {
                return r.call(null, t);
              } catch (e) {
                return r.call(this, t);
              }
            }
          })(t);
      }
    }
    function d(t, e) {
      (this.fun = t), (this.array = e);
    }
    function g() {}
    (o.nextTick = function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      c.push(new d(t, e)), 1 !== c.length || l || s(h);
    }),
      (d.prototype.run = function () {
        this.fun.apply(null, this.array);
      }),
      (o.title = "browser"),
      (o.browser = !0),
      (o.env = {}),
      (o.argv = []),
      (o.version = ""),
      (o.versions = {}),
      (o.on = g),
      (o.addListener = g),
      (o.once = g),
      (o.off = g),
      (o.removeListener = g),
      (o.removeAllListeners = g),
      (o.emit = g),
      (o.prependListener = g),
      (o.prependOnceListener = g),
      (o.listeners = function (t) {
        return [];
      }),
      (o.binding = function (t) {
        throw new Error("process.binding is not supported");
      }),
      (o.cwd = function () {
        return "/";
      }),
      (o.chdir = function (t) {
        throw new Error("process.chdir is not supported");
      }),
      (o.umask = function () {
        return 0;
      });
  },
  function (t, e) {
    t.exports = function (t) {
      return (
        t &&
        "object" == typeof t &&
        "function" == typeof t.copy &&
        "function" == typeof t.fill &&
        "function" == typeof t.readUInt8
      );
    };
  },
  function (t, e) {
    "function" == typeof Object.create
      ? (t.exports = function (t, e) {
          (t.super_ = e),
            (t.prototype = Object.create(e.prototype, {
              constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            }));
        })
      : (t.exports = function (t, e) {
          t.super_ = e;
          var n = function () {};
          (n.prototype = e.prototype),
            (t.prototype = new n()),
            (t.prototype.constructor = t);
        });
  },
  function (t, e, n) {
    var r = n(14);
    t.exports = function (t) {
      if (void 0 !== t) {
        var e = t
          .toLowerCase()
          .trim()
          .replace(/[^a-z|0-9]+/g, "");
        return (n = e), isNaN(n) || "" === n ? e : r.toWords(e);
      }
      return t;
      var n;
    };
  },
  function (t, e, n) {
    (function (n) {
      /*!
       * Number-To-Words util
       * @version v1.2.4
       * @link https://github.com/marlun78/number-to-words
       * @author Martin Eneqvist (https://github.com/marlun78)
       * @contributors Aleksey Pilyugin (https://github.com/pilyugin),Jeremiah Hall (https://github.com/jeremiahrhall),Adriano Melo (https://github.com/adrianomelo),dmrzn (https://github.com/dmrzn)
       * @license MIT
       */
      !(function () {
        "use strict";
        ("object" == typeof self && self.self === self && self) ||
          ("object" == typeof n && n.global);
        function r(t) {
          return !(
            "number" != typeof t ||
            t != t ||
            t === 1 / 0 ||
            t === -1 / 0
          );
        }
        function o(t) {
          return "number" == typeof t && Math.abs(t) <= 9007199254740991;
        }
        var i = /(hundred|thousand|(m|b|tr|quadr)illion)$/,
          u = /teen$/,
          s = /y$/,
          a =
            /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/,
          c = {
            zero: "zeroth",
            one: "first",
            two: "second",
            three: "third",
            four: "fourth",
            five: "fifth",
            six: "sixth",
            seven: "seventh",
            eight: "eighth",
            nine: "ninth",
            ten: "tenth",
            eleven: "eleventh",
            twelve: "twelfth",
          };
        function l(t) {
          return i.test(t) || u.test(t)
            ? t + "th"
            : s.test(t)
            ? t.replace(s, "ieth")
            : a.test(t)
            ? t.replace(a, f)
            : t;
        }
        function f(t, e) {
          return c[e];
        }
        var p = 100,
          h = 1e3,
          d = 1e6,
          g = 1e9,
          y = 1e12,
          v = 1e15,
          m = 9007199254740992,
          b = [
            "zero",
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "ten",
            "eleven",
            "twelve",
            "thirteen",
            "fourteen",
            "fifteen",
            "sixteen",
            "seventeen",
            "eighteen",
            "nineteen",
          ],
          w = [
            "zero",
            "ten",
            "twenty",
            "thirty",
            "forty",
            "fifty",
            "sixty",
            "seventy",
            "eighty",
            "ninety",
          ];
        function x(t, e) {
          var n,
            i = parseInt(t, 10);
          if (!r(i))
            throw new TypeError(
              "Not a finite number: " + t + " (" + typeof t + ")"
            );
          if (!o(i))
            throw new RangeError(
              "Input is not a safe number, it’s either too large or too small."
            );
          return (
            (n = (function t(e) {
              var n,
                r,
                o = arguments[1];
              return 0 === e
                ? o
                  ? o.join(" ").replace(/,$/, "")
                  : "zero"
                : (o || (o = []),
                  e < 0 && (o.push("minus"), (e = Math.abs(e))),
                  e < 20
                    ? ((n = 0), (r = b[e]))
                    : e < p
                    ? ((n = e % 10),
                      (r = w[Math.floor(e / 10)]),
                      n && ((r += "-" + b[n]), (n = 0)))
                    : e < h
                    ? ((n = e % p), (r = t(Math.floor(e / p)) + " hundred"))
                    : e < d
                    ? ((n = e % h), (r = t(Math.floor(e / h)) + " thousand,"))
                    : e < g
                    ? ((n = e % d), (r = t(Math.floor(e / d)) + " million,"))
                    : e < y
                    ? ((n = e % g), (r = t(Math.floor(e / g)) + " billion,"))
                    : e < v
                    ? ((n = e % y), (r = t(Math.floor(e / y)) + " trillion,"))
                    : e <= m &&
                      ((n = e % v),
                      (r = t(Math.floor(e / v)) + " quadrillion,")),
                  o.push(r),
                  t(n, o));
            })(i)),
            e ? l(n) : n
          );
        }
        var j = {
          toOrdinal: function (t) {
            var e = parseInt(t, 10);
            if (!r(e))
              throw new TypeError(
                "Not a finite number: " + t + " (" + typeof t + ")"
              );
            if (!o(e))
              throw new RangeError(
                "Input is not a safe number, it’s either too large or too small."
              );
            var n = String(e),
              i = Math.abs(e % 100),
              u = 11 <= i && i <= 13,
              s = n.charAt(n.length - 1);
            return (
              n +
              (u
                ? "th"
                : "1" === s
                ? "st"
                : "2" === s
                ? "nd"
                : "3" === s
                ? "rd"
                : "th")
            );
          },
          toWords: x,
          toWordsOrdinal: function (t) {
            return l(x(t));
          },
        };
        t.exports && (e = t.exports = j), (e.numberToWords = j);
      })();
    }.call(this, n(1)));
  },
  function (t, e) {
    t.exports = function (t, e, n) {
      var r = {
        equal: 0,
        insert: 0,
        replace: 0,
        delete: 0,
        baseTextTotalWordCount: n.length,
      };
      return (
        t.forEach(function (t) {
          var o = t[0],
            i = t[1],
            u = t[2],
            s = t[3],
            a = t[4];
          if ("equal" === o) {
            var c = n.slice(s, a);
            r.equal += c.length;
          }
          if ("insert" === o) {
            var l = n.slice(s, a);
            r.delete += l.length;
          }
          if ("delete" === o) {
            var f = e.slice(i, u);
            r.insert += f.length;
          }
          if ("replace" === o) {
            e.slice(i, u);
            var p = n.slice(s, a);
            r.replace += p.length;
          }
        }),
        r
      );
    };
  },
  function (t, e) {
    t.exports = function (t, e, n) {
      var r = [];
      return (
        t.forEach(function (t) {
          var o = t[0],
            i = t[1],
            u = t[2],
            s = t[3],
            a = t[4];
          if ("equal" === o) {
            var c = e.slice(i, u),
              l = n.slice(s, a);
            r.push({ stt: c, baseText: l, matchType: o });
          }
          if ("insert" === o) {
            var f = n.slice(s, a);
            r.push({ stt: "NA", baseText: f, matchType: "delete" });
          }
          if ("delete" === o) {
            var p = e.slice(i, u);
            r.push({ stt: p, baseText: "NA", matchType: "insert" });
          }
          if ("replace" === o) {
            var h = e.slice(i, u),
              d = n.slice(s, a);
            r.push({ stt: h, baseText: d, matchType: o });
          }
        }),
        r
      );
    };
  },
  function (t, e, n) {
    function r(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    var o = n(18).linear;
    t.exports = function (t, e, n) {
      var i = [];
      return (
        n.forEach(function () {
          i.push({});
        }),
        t.forEach(function (t) {
          var o = t[0],
            u = t[1],
            s = t[2],
            a = t[3];
          if ("equal" === o) {
            var c = e.slice(u, s);
            i.splice.apply(i, [a, c.length].concat(r(c)));
          }
          i.forEach(function (t, e) {
            t.text = n[e];
          });
        }),
        (function (t) {
          for (
            var e = (function (t) {
                return t.map(function (e, n) {
                  var r = e;
                  if (("start" in e) && 0 !== n) {
                    var o = t[n - 1];
                    ("end" in o) &&
                      (r = { start: o.end, end: e.end, text: e.text });
                  }
                  if (("end" in e) && n !== t.length - 1) {
                    var i = t[n + 1];
                    ("start" in i) &&
                      (r = { end: i.start, start: e.start, text: e.text });
                  }
                  return r;
                });
              })(t),
              n = r(Array(e.length).keys()),
              i = [],
              u = [],
              s = [],
              a = [],
              c = 0;
            c < e.length;
            c++
          )
            "start" in e[c] && (i.push(c), s.push(e[c].start));
          for (var l = 0; l < e.length; l++)
            "end" in e[l] && (u.push(l), a.push(e[l].end));
          var f = o(n, i, s),
            p = o(n, u, a);
          return (function (t) {
            return t.map(function (t, e, n) {
              if (0 != e) {
                var r = n[e - 1],
                  o = t;
                return r.end > o.start && (t.start = r.end), t;
              }
              return t;
            });
          })(
            (e = e.map(function (t, e) {
              return (
                "start" in t || (t.start = f[e]),
                "end" in t || (t.end = p[e]),
                t
              );
            }))
          );
        })(i)
      );
    };
  },
  function (t, e, n) {
    "use strict";
    (t.exports.polynomial = n(19)),
      (t.exports.linear = n(20)),
      (t.exports.linearRegression = n(21)),
      (t.exports.step = n(22));
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    t.exports = function (t, e, n) {
      var o = [];
      return (
        (t = r.makeItArrayIfItsNot(t)).forEach(function (t) {
          o.push(
            (function (t, e, n) {
              for (var r = [n], o = 1; o < e.length; o++) {
                r.push([]);
                for (var i = 1; i <= o; i++)
                  r[i][o] =
                    ((t - e[o - i]) * r[i - 1][o] -
                      (t - e[o]) * r[i - 1][o - 1]) /
                    (e[o] - e[o - i]);
              }
              return r[i - 1][o - 1];
            })(t, e, n)
          );
        }),
        o
      );
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    t.exports = function (t, e, n) {
      var o = [];
      return (
        (t = r.makeItArrayIfItsNot(t)).forEach(function (t) {
          var i,
            u,
            s,
            a,
            c,
            l,
            f = r.findIntervalLeftBorderIndex(t, e);
          f == e.length - 1 && f--,
            o.push(
              ((i = t),
              (u = e[f]),
              (s = n[f]),
              (a = e[f + 1]),
              (c = n[f + 1]),
              (l = (c - s) / (a - u)) * i + (-l * u + s))
            );
        }),
        o
      );
    };
  },
  function (t, e, n) {
    "use strict";
    t.exports = function (t, e) {
      for (
        var n = {},
          o = t,
          i = e,
          u = i.length,
          s = 0,
          a = 0,
          c = 0,
          l = 0,
          f = 0,
          p = 0;
        p < i.length;
        p++
      )
        (s += o[p]),
          (a += i[p]),
          (c += o[p] * i[p]),
          (l += o[p] * o[p]),
          (f += i[p] * i[p]);
      return (
        (n.slope = (u * c - s * a) / (u * l - s * s)),
        (n.intercept = (a - n.slope * s) / u),
        (n.rSquared = Math.pow(
          (u * c - s * a) / Math.sqrt((u * l - s * s) * (u * f - a * a)),
          2
        )),
        (n.evaluate = function (t) {
          var e = r.makeItArrayIfItsNot(t),
            n = [],
            o = this;
          return (
            e.forEach(function (t) {
              n.push(o.slope * t + o.intercept);
            }),
            n
          );
        }),
        n
      );
    };
    var r = n(0);
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    t.exports = function (t, e, n) {
      return r.makeItArrayIfItsNot(t).map(function (t) {
        return n[r.findIntervalLeftBorderIndex(t, e)];
      });
    };
  },
  function (t, e) {
    t.exports = function (t) {
      return 0.08475 + 0.05379 * t.length;
    };
  },
  function (t, e) {
    t.exports.diffsListToHtml = function (t, e) {
      var n = [];
      function r(t, e, n) {
        return "<span class='"
          .concat(e, " word' data-start='")
          .concat(n, "'>")
          .concat(t, "</span>");
      }
      function o(t, e) {
        return "<span class='".concat(e, " line'>").concat(t, "</span>");
      }
      return (
        n.push(
          '<style>\n    .equal{\n        cursor: pointer;\n    }\n\n    .delete {\n        display: inline-block;\n        position: relative;\n        // background-color: #ffe5e5;\n        // background-color: #ff0000;\n        // color: white;\n        cursor: no-drop;\n    }\n\n    .delete:before {\n        content: "~~~~~~~~~~~~";\n        font-size: 0.6em;\n        font-weight: 700;\n        font-family: Times New Roman, Serif;\n        color: red;\n        width: 100%;\n        position: absolute;\n        top: 12px;\n        left: -1px;\n        overflow: hidden;\n    }\n\n    .insert{\n        text-decoration-line: line-through;\n        background-color: #e5e5ff;\n        cursor: pointer;\n    }\n\n    .insert {\n        display: inline-block;\n        position: relative;\n        cursor: pointer;\n    }\n\n    .insert:before {\n        content: "~~~~~~~~~~~~";\n        font-size: 0.6em;\n        font-weight: 700;\n        font-family: Times New Roman, Serif;\n        color: blue;\n        width: 100%;\n        position: absolute;\n        top: 12px;\n        left: -1px;\n        overflow: hidden;\n    }\n\n    .replaceStt{\n        display: inline-block;\n        position: relative;\n        cursor: pointer;\n    }\n\n    .replaceStt:before {\n        content: "~~~~~~~~~~~~";\n        font-size: 0.6em;\n        font-weight: 700;\n        font-family: Times New Roman, Serif;\n        color:  red;\n        width: 100%;\n        position: absolute;\n        top: 12px;\n        left: -1px;\n        overflow: hidden;\n    }\n\n\n    .replaceBaseText{\n        display: inline-block;\n        position: relative;\n        // background-color: #99cc99;\n        cursor: no-drop;\n    }\n\n    .replaceBaseText:before {\n        content: "~~~~~~~~~~~~";\n        font-size: 0.6em;\n        font-weight: 700;\n        font-family: Times New Roman, Serif;\n        color:  #99cc99;\n        width: 100%;\n        position: absolute;\n        top: 12px;\n        left: -1px;\n        overflow: hidden;\n    }\n\n    span.replaceBaseTextLine.line{\n        background-color: #e5f2e5;\n    }\n\n    span.replaceBaseTextLine.line:after{\n        content: "]";\n        color: #99cc99;\n    }\n\n    span.replaceBaseTextLine.line:before{\n        content: "[";\n        color: #99cc99;\n    }\n\n    span.replaceSttLine.line{\n        background-color: #ffe5e5;\n    }\n\n    span.replaceSttLine.line:after{\n        content: "]";\n        color: red;\n    }\n    span.replaceSttLine.line:before{\n        content: "[";\n        color: red;\n    }\n\n    .unplayedWord{\n        color:grey!important;\n    }\n\n    video.videoPreview {\n        margin-left: auto;\n        margin-right: auto;\n        display: block;\n    }\n    </style>'
        ),
        n.push(
          "\n    Equal: Some equal text\n    <br>\n    Inserted (by STT): <span class='insert'>an</span> <span class='insert'>inserted</span> <span class='insert'>word</span>\n    <br>\n    Deleted (not recognised by STT):<span class='delete'>a</span>  <span class='delete'>deleted</span> <span class='delete'>word</span>\n    <br>\n    Replaced:<span class='replaceBaseTextLine line'>\n    <span class='replaceBaseText '>Some</span>\n    <span class='replaceBaseText '>base</span>\n    <span class='replaceBaseText '>text</span>\n    <span class='replaceBaseText '>line</span>\n    </span>\n    <span class='replaceSttLine line'>\n    <span class=\"replaceStt \">replaced</span>\n    <span class=\"replaceStt \">by</span>\n    <span class=\"replaceStt \">stt</span>\n    <span class=\"replaceStt \">hypothesis</span>\n    </span>\n    <br>\n    <hr>\n    <br>\n    "
        ),
        e &&
          n.push(
            '<video class=\'videoPreview\' style="width: 40vw;" src="'.concat(
              e,
              '" controls></video>'
            )
          ),
        n.push(
          "\n    <script type=\"text/javascript\">\n    document.addEventListener('DOMContentLoaded', (event) => {\n\n        const videoEl =  document.querySelector('.videoPreview');\n        // const videoInputEl = document.querySelector('.videoInput');\n\n        // videoInputEl.addEventListener('change', function(e) {\n        //     console.log(e.target.value, this.files)\n        //     var url = URL.createObjectURL(this.files[0]);\n        //     document.querySelector('.videoPreview').src =url; \n        // });\n\n\n        document.querySelector('.text').addEventListener('click', function(e) {\n            console.log(e.target.dataset.start);\n            videoEl.currentTime = e.target.dataset.start;\n            videoEl.play();\n        })\n\n        document.querySelector('video').addEventListener(\"timeupdate\", function(){\n            console.log('time updated', this.currentTime)\n            let currentTime = this.currentTime;\n            let wordsEl = document.querySelectorAll('.word');\n            wordsEl.forEach((word)=>{\n                if(word.dataset.start >= currentTime){\n                    word.classList.add(\"unplayedWord\");\n                }\n                else{\n                    word.classList.remove(\"unplayedWord\");\n                }\n            })\n        });\n    })\n    </script>\n    <hr>"
        ),
        t.forEach(function (t) {
          var e = t.matchType;
          if ("equal" === e) {
            var i = t.stt.map(function (t) {
              return r(t.text, "equal", t.start);
            });
            n.push(i.join(" "));
          }
          if ("insert" === e) {
            var u = t.stt.map(function (t) {
              return r(t.text, "insert", t.start);
            });
            n.push(u.join(" "));
          }
          if ("delete" === e) {
            var s = t.baseText.map(function (t) {
              return r(t, "delete");
            });
            n.push(s.join(" "));
          }
          if ("replace" === e) {
            var a = t.stt.map(function (t) {
                return r(t.text, "replaceStt", t.start);
              }),
              c = t.baseText.map(function (t) {
                return r(t, "replaceBaseText");
              }),
              l = o(a.join(" "), "replaceSttLine"),
              f = o(c.join(" "), "replaceBaseTextLine") + l;
            n.push(f);
          }
        }),
        (n = "<div class='text'>".concat(n.join(" "), "</div>"))
      );
    };
  },
]);
