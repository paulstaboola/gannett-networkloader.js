//AB_TEMPLATE
//ab -> 7
var _taboola = _taboola || [];
var TRC = TRC || {};
TRC.perfConfOverride = {
    'logTimer': 50000,
    'logLength': 5,
    'traffic': 50,
    'measureEnable': true,
    'measureTimeToSend': 10000,
    'measureInterval': 10000,
    'disableRawDataSend': true
};

/*! 20220420-4-RELEASE */

! function(e, t) {
    if (t.TRC = t.TRC || {}, "object" == typeof e && "function" == typeof e.now) {
        var n = function() {};
        e.mark && "function" == typeof e.mark || (e.mark = n), TRC.PerfEvenType = {
            START: "start",
            STOP: "stop",
            MARK: "mark",
            REQ_LEVEL_START: "startReq",
            REQ_LEVEL_STOP: "stopReq"
        }, TRC.Performance = function(n) {
            var o = n || {},
                a = "tbl_" + Date.now() + "_",
                r = o.logTimer,
                i = o.logLength || 40,
                s = [],
                l = TRC.EVENT_LOOP_INTERVAL,
                c = 1,
                u = 20,
                d = TRC.EVENT_LOOP_REPORT_INTERVAL;
            this.perfString = "", this.timeout = null, this.modeEvents = {}, this.measurementIds = [], this.modeDictionery = {}, this.measurements = [], this.vitalsCls = 0, this.vitalsClsMax = 0, this.fpsMeasurements = [], this.eventLoopMeasurements = [], this.measurementsCollection = [], this.firstIterationFlag = !0, o.measures = o.measures || {}, o.measures["generalMeasure_loaderLoaded"] = [a + "2.0", a + "measuring"], o.measures["generalMeasure_implLoaded"] = [a + "4.0", a + "measuring"], o.measures["generalMeasure_integration"] = ["tbl_ic", a + "measuring"], o.measures["generalMeasure_inflate"] = ["tbl_inflate_start", "tbl_inflate_end"];
            var m = function(e, t, n) {
                this.measurements.push({
                    name: "generalMeasure_" + e,
                    entryType: "measure",
                    startTime: n || performance.now(),
                    duration: t
                })
            };
            this.addPageConnectionMetrics = function() {
                if (this.firstIterationFlag && navigator.connection) {
                    var e = navigator.connection;
                    if (e.downlink && m.call(this, "connectionDownlink", e.downlink), e.rtt && m.call(this, "connectionRtt", e.rtt), e.effectiveType) {
                        var t;
                        switch (e.effectiveType) {
                            case "slow-2g":
                                t = 1;
                                break;
                            case "2g":
                            case "3g":
                            case "4g":
                                t = e.effectiveType[0];
                                break;
                            default:
                                t = -1
                        }
                        m.call(this, "connectionEffectiveType", Number(t))
                    }
                }
            }, this.addVitalsMetricObserver = function() {
                try {
                    if (t.PerformanceObserver) {
                        var e = this,
                            n;
                        new t.PerformanceObserver(function(t) {
                            for (var n = t.getEntries(), o = 0; o < n.length; o++) {
                                var a = n[o],
                                    r = a.processingStart - a.startTime;
                                m.call(e, "firstInputDelay", r, a.startTime)
                            }
                        }).observe({
                            type: "first-input",
                            buffered: !0
                        });
                        var o = 0,
                            a = 0,
                            r = Number.NEGATIVE_INFINITY,
                            i = Number.NEGATIVE_INFINITY;
                        new PerformanceObserver(function(t) {
                            for (var n = t.getEntries(), s = 0; s < n.length; s++) {
                                var l = n[s];
                                l.hadRecentInput || ((l.startTime - r > 5e3 || l.startTime - i > 1e3) && (r = l.startTime, a = 0), i = l.startTime, a += l.value, o = Math.max(o, a), e.vitalsCls += l.value, e.vitalsClsMax = o, TRC && TRC.dispatch && TRC.dispatch("onCls", l))
                            }
                        }).observe({
                            type: "layout-shift",
                            buffered: !0
                        })
                    }
                } catch (e) {
                    t.__trcWarn && __trcWarn("faile to add taboola web vitals to perf", e)
                }
            }, this.addVitalsMetricObserver(), this.logMeasurements = function n() {
                if (!(performance.now() / 1e3 / 60 > 30)) {
                    var r = [];
                    if (this.measurementIds = [], e.getEntriesByName && e.measure) {
                        var i, s;
                        if (e.mark(a + "measuring"), 0 == e.getEntriesByName(a + "measuring").length) {
                            if (!e.setResourceTimingBufferSize) return;
                            e.setResourceTimingBufferSize(e.getEntries().length + 100), e.mark(a + "measuring")
                        }
                        if (this.firstIterationFlag)
                            for (var l in o.measures)
                                if (o.measures.hasOwnProperty(l)) {
                                    var c = o.measures[l][0],
                                        u = o.measures[l][1];
                                    e.getEntriesByName(c).length > 0 && e.getEntriesByName(u).length > 0 && (e.measure(l, c, u), this.measurementIds.push(l))
                                } for (var d in this.modeEvents)
                            if (this.modeEvents.hasOwnProperty(d))
                                for (var m in this.modeEvents[d])
                                    if (this.modeEvents[d].hasOwnProperty(m)) {
                                        var T = this.modeEvents[d][m];
                                        if (T) {
                                            var h = T["prefix"] + m + "_" + d;
                                            T["start"] && T["stop"] ? (e.measure(h, T["start"], T["stop"]), this.measurementIds.push(h)) : T["mark"] && (e.measure(h, T["mark"], a + "measuring"), this.measurementIds.push(h))
                                        }
                                        this.modeEvents[d][m] = null
                                    } for (var C = 0; C < this.measurementIds.length; C++) {
                            s = this.measurementIds[C];
                            var R, l = e.getEntriesByName(s)[0];
                            this.measurements.push(l)
                        }(r = e.getEntriesByType("navigation")).length > 0 && this.firstIterationFlag && (r = r[0], this.measurements.push({
                            name: "generalMeasure_domInteractive",
                            entryType: "measure",
                            startTime: r.domInteractive,
                            duration: 0
                        }), this.measurements.push({
                            name: "generalMeasure_domContentLoadedEventEnd",
                            entryType: "measure",
                            startTime: r.domContentLoadedEventEnd,
                            duration: 0
                        }), this.measurements.push({
                            name: "generalMeasure_loadEventEnd",
                            entryType: "measure",
                            startTime: r.loadEventEnd,
                            duration: 0
                        }), this.measurements.push({
                            name: "generalMeasure_domComplete",
                            entryType: "measure",
                            startTime: r.domComplete,
                            duration: 0
                        }), this.addPageConnectionMetrics()), 0 !== this.vitalsCls && (this.measurements.push({
                            name: "generalMeasure_clsAggAdjusted",
                            entryType: "measure",
                            startTime: performance.now(),
                            duration: 100 * this.vitalsCls
                        }), this.measurements.push({
                            name: "generalMeasure_clsMaxAggAdjusted",
                            entryType: "measure",
                            startTime: performance.now(),
                            duration: 100 * this.vitalsClsMax
                        })), this.firstIterationFlag = !1, this.returnMeasueObj = {};
                        var b = {};
                        if (0 !== this.measurements.length) {
                            for (; this.fpsMeasurements.length > 0;) this.measurements.push(this.fpsMeasurements.pop());
                            for (; this.eventLoopMeasurements.length > 0;) this.measurements.push(this.eventLoopMeasurements.pop());
                            b.measurements = JSON.stringify(this.measurements), b.dict = JSON.stringify(this.modeDictionery), this.returnMeasueObj.cv = TRC.version || "", TRC.networkId && (this.returnMeasueObj.networkId = TRC.networkId), t.TRCImpl && t.TRCImpl.systemFlags && t.TRCImpl.systemFlags.loaderType && (this.returnMeasueObj.lt = t.TRCImpl.systemFlags.loaderType), this.returnMeasueObj.sd = p(), this.returnMeasueObj.ri = f(), this.returnMeasueObj.vi = g(), this.returnMeasueObj.data = JSON.stringify(b), t.TRCImpl && t.TRCImpl.sendEvent("perf", this.returnMeasueObj), this.measurementsCollection = this.measurementsCollection.concat(this.measurements), this.measurements = []
                        }
                    }
                }
            }, this.mark = function(t, n, o, r, i, s) {
                var l = function(e) {
                        var t = 0;
                        if (0 == e.length) return t;
                        for (var n = 0; n < e.length; n++) {
                            var o;
                            t = (t << 5) - t + e.charCodeAt(n), t &= t
                        }
                        return t
                    },
                    c = n || e.now(),
                    u = l(o + r),
                    d = a + t + (o || r ? "_" + u : "");
                if (e.mark(d), i) {
                    switch (this.modeDictionery[u] = o + "~~@~~" + r, this.modeEvents[u] = this.modeEvents[u] || {}, this.modeEvents[u][i] = this.modeEvents[u][i] || {}, s) {
                        case TRC.PerfEvenType.START:
                        case TRC.PerfEvenType.REQ_LEVEL_START:
                            this.modeEvents[u][i]["start"] = d;
                            break;
                        case TRC.PerfEvenType.STOP:
                        case TRC.PerfEvenType.REQ_LEVEL_STOP:
                            this.modeEvents[u][i]["stop"] = d;
                            break;
                        case TRC.PerfEvenType.MARK:
                            this.modeEvents[u][i]["mark"] = d
                    }
                    s === TRC.PerfEvenType.REQ_LEVEL_STOP || s === TRC.PerfEvenType.REQ_LEVEL_START ? this.modeEvents[u][i]["prefix"] = "reqMeasure_" : this.modeEvents[u][i]["prefix"] = "generalMeasure_"
                }
                return this.perfString = this.perfString + ";" + t + "=" + c, d
            }, window.addEventListener("beforeunload", this.logMeasurements.bind(this));
            var f = function() {
                    var e;
                    return (t.TRCImpl && t.TRCImpl.getGlobalRequestId.trcBind(t.TRCImpl))()
                },
                p = function() {
                    var e;
                    return (t.TRCImpl && t.TRCImpl.getGlobalSessionData.trcBind(t.TRCImpl))()
                },
                g = function() {
                    return t.taboola_view_id || (t.taboola_view_id = (new Date).getTime()), t.taboola_view_id
                },
                T = function() {
                    this.elapsed = 0, this.last = null
                };
            T.prototype = {
                tick: function(e) {
                    this.elapsed = (e - (this.last || e)) / 1e3, this.last = e
                },
                fps: function() {
                    return Math.round(1 / this.elapsed)
                }
            };
            var h = new T;

            function C(e) {
                t.requestAnimationFrame(C), h.tick(e)
            }
            t.requestAnimationFrame && t.requestAnimationFrame(C), this.cancelFpsMeasure = function() {
                C = function() {}
            }, this.getTimer = function() {
                return h
            }, this.getrender = function() {
                return C
            };
            var R = 0,
                b = function() {
                    var e, t, n = {
                        hidden: "visibilitychange",
                        webkitHidden: "webkitvisibilitychange",
                        mozHidden: "mozvisibilitychange",
                        msHidden: "msvisibilitychange"
                    };
                    for (e in n)
                        if (n.hasOwnProperty(e) && e in document) {
                            t = n[e];
                            break
                        } return function(n) {
                        return n && document.addEventListener(t, n), !document[e]
                    }
                }();
            if (b(function() {
                    b() ? (TRC.performance && TRC.performance.mark("windowActiveSTART" + R, null, "active", R, "activeTab", TRC.PerfEvenType.START), TRC.performance && TRC.performance.mark("windowActiveSTOP" + R, null, "active", R, "activeTab", TRC.PerfEvenType.STOP)) : (TRC.performance && TRC.performance.mark("windowInactiveSTART" + R, null, "inactive", R, "inactiveTab", TRC.PerfEvenType.START), TRC.performance && TRC.performance.mark("windowInactiveSTOP" + R, null, "inactive", R, "inactiveTab", TRC.PerfEvenType.STOP)), R++
                }), o.measureEnable) {
                TRC.__takeMeasureQueue = TRC.__takeMeasureQueue || [];
                var v = o.measureTimeToSend || 0,
                    _ = this.logMeasurements.bind(this);
                if (TRC.__takeMeasureQueue.push(_), 0 == v) window.addEventListener("beforeunload", TRC.__takeMeasureQueue.pop());
                else if (1 == TRC.__takeMeasureQueue.length) {
                    var y = TRC.__takeMeasureQueue.pop();
                    this.measureTimeout = setTimeout(function() {
                        _(), o.measureInterval && (this.measureInterval = setInterval(_, Math.max(Number(o.measureInterval), 1e4)))
                    }, v)
                }
                setInterval(function() {
                    var t = e.now();
                    setTimeout(function() {
                        s.push(e.now() - t)
                    }, 0)
                }, l), setInterval(function() {
                    var e, t = 0,
                        n = 0,
                        o = 0;
                    if (s.length > 0) {
                        e = s.length;
                        for (var a = 0; a < s.length; a++) n = Math.max(n, s[a]), o += s[a];
                        t = o / e, s = [];
                        var r = Number(performance.now());
                        TRC.performance.eventLoopMeasurements.length <= u && (TRC.performance.eventLoopMeasurements.push({
                            name: "generalMeasure_ELAVG_" + c,
                            entryType: "measure",
                            startTime: r,
                            duration: t
                        }), TRC.performance.eventLoopMeasurements.push({
                            name: "generalMeasure_ELMAX_" + c,
                            entryType: "measure",
                            startTime: r,
                            duration: n
                        }), c++)
                    }
                }, d), "complete" !== document.readyState && document.addEventListener("readystatechange", function(t) {
                    "complete" === t.target.readyState && TRC.performance.measurements.push({
                        name: "generalMeasure_documentReady",
                        entryType: "measure",
                        startTime: e.now(),
                        duration: 0
                    })
                })
            }
        }
    }
}(window.performance, window),
function(e) {
    e.TRC = e.TRC || {}, e.TRC.inflate = {
        STYLE: "__style__",
        COMMON: "__common__",
        KEYS: "__keys__",
        getModeCustom: function e(t, n) {
            var o = "\\/\\*\\ss-split-".concat(t, "\\s\\*\\/[^]*\\*\\se-split-").concat(t, "\\s\\*\\/"),
                a = new RegExp(o, "g"),
                r = n.match(a);
            return r ? r[0] : null
        },
        inflateObject: function e(t, n) {
            var o = this,
                a = {},
                r;
            return this.inflateValue(this.KEYS, t, n).forEach(function(e) {
                a[e] = o.inflateValue(e, t, n)
            }), a
        },
        inflateValue: function e(t, n, o) {
            var a = o[t];
            return void 0 === a && (a = n[t]), a
        },
        inflateStyle: function e(t, n) {
            var o = "";
            return Object.keys(n).forEach(function(e) {
                var a = n[e],
                    r = "";
                e.split(",").forEach(function(e) {
                    "" !== r && (r += ","), r += ".".concat(t, " ").concat(e)
                }), o += "".concat(r, "{").concat(a, "}")
            }), o
        },
        getConfig: function t(n) {
            var o = this,
                a = n.global["enable-mode-injection"] && !(e.navigator && "string" == typeof e.navigator.userAgent && /(iPhone|iPad)(?=.*AppleWebKit)(?!.*CriOS)/i.test(e.navigator.userAgent));
            if (n && n.modes) {
                var r = n.modes,
                    i = n.global,
                    s = i.style,
                    l = r[this.COMMON];
                if (l) {
                    var c = window.performance && "function" == typeof window.performance.mark;
                    c && window.performance.mark("tbl_inflate_start");
                    var u = {},
                        d = s.rtl;
                    Object.keys(r).forEach(function(e) {
                        if (e !== o.COMMON) {
                            var t = r[e];
                            u[e] = o.inflateObject(l, t), a ? (u[e][o.STYLE] = t[o.STYLE] || l[o.STYLE], n.global["enable-custom-injection"] && (u[e].mode_custom = o.getModeCustom(e, s.mode_custom) || "")) : d += o.inflateStyle(e, o.inflateObject(l[o.STYLE], t[o.STYLE]))
                        }
                    }), a ? u[this.COMMON] = l : (d += s.custom, d += s.mode_custom, i.style = d), n.modes = u, c && window.performance.mark("tbl_inflate_end")
                }
            }
            return n
        }
    }
}(window),
function(win, doc) {
    if (!win.TRC || !win.TRC.utm) {
        win.TRC ? TRC.utm = [] : TRC = {
            utm: []
        };
        var queueName = "_taboola";
        win[queueName] = win[queueName] || [];
        var config = {
            "modes": {
                "ab_thumbnails-b_abp-mode": {
                    "header": "SPONSOR CONTENT",
                    "rows": 1,
                    "widget-creator-revision": "7796304",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 3,
                        "virtualThumbWidth": 6,
                        "virtualThumbHeight": 5
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:57.0px;*height:57.0px;color:#333;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".trc_rbox_header": "font-family:helvetica, arial, sans-serif;font-size:14.0px;font-weight:bold;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;line-height:1.2em;display:inline-block;position:relative;height:auto;width:100%;_width:100%;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",
                        ".video-label-box": "text-align:left;",
                        "": "width:300px;_width:300px;border-width:1px 0px 1px 0px;border-style:solid solid solid solid;border-color:#DFDFDF;padding:10px 0px 5px 0px;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:38.0px;*height:38.0px;color:#333;font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        ".logoDiv a span": "font-size:11.0px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "ab_thumbnails-g_abp-mode": {
                    "header": "SPONSOR CONTENT",
                    "list-suffix": function(itemsContainer, data) {
                        if (TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
                            for (var i = 0; i < data.boxes.length; i++) {
                                data.boxes[i].style.height = 'auto';
                                if ((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                                    var clearDiv = document.createElement('div');
                                    clearDiv.style.clear = 'both';
                                    clearDiv.style.width = '100%';
                                    itemsContainer.insertBefore(clearDiv, data.boxes[i]);
                                }
                            }
                        }
                        /*******Add individual class name according to browser*******/
                        var targetContainer = data.container._trc_container;
                        if (TRC.Browser.ie) {
                            targetContainer.className += ' trc_ie' + TRC.Browser.ie;
                        } else if (TRC.Browser.chrome) {
                            targetContainer.className += ' trc_chrome';
                        } else if (TRC.Browser.firefox) {
                            targetContainer.className += ' trc_ff';
                        } else if (TRC.Browser.safari) {
                            targetContainer.className += ' trc_safari';
                        }
                        /*************************/
                        /*** inject text-links ***/
                        if (data) {
                            var currentContainer = data.container;
                            var currentContainerParent = data.container.parentNode;
                            var newContainerDiv = document.createElement('div');
                            if (currentContainer && currentContainerParent && newContainerDiv) {
                                newContainerDiv.id = 'taboola-section-front-text-links';
                                newContainerDiv.style.borderTop = 'none';
                                newContainerDiv.style.paddingTop = '0';
                                currentContainer.style.borderBottom = 'none';
                                currentContainer.style.paddingBottom = '0';
                                currentContainerParent.insertBefore(newContainerDiv, currentContainer.nextSibling);
                                window._taboola = window._taboola || [];
                                _taboola.push({
                                    mode: 'text-links-a',
                                    container: 'taboola-section-front-text-links',
                                    placement: 'Section Front Text Links',
                                    target_type: 'mix'
                                });
                            }
                        }
                    },
                    "attribution-position": "top",
                    "item-data-filter": function(data) {
                        if (!data.category) {
                            data.category = 'USA TODAY';
                        }
                        if (data.category) {
                            var categoryList = window.TRC.categoryList;
                            var data_category_list = data.category.split(';');
                            var hight_prioraty_category;
                            for (var i = 0; i < data_category_list.length; i++) {
                                var category = data_category_list[i];
                                var category_list = (category.split('//')) ? category.split('//') : category;
                                category = category_list[category_list.length - 1];
                                if (categoryList[category])
                                    hight_prioraty_category = (!hight_prioraty_category) ? category : ((categoryList[hight_prioraty_category]['index'] > categoryList[category]['index']) ? category : hight_prioraty_category);
                            }
                            hight_prioraty_category = (hight_prioraty_category) ? hight_prioraty_category : data_category_list[0];
                            if (!categoryList[hight_prioraty_category])
                                data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                }).replace(/People/g, 'Life');
                            else
                                data.category = (categoryList[hight_prioraty_category]['name']) ? categoryList[hight_prioraty_category]['name'] : ((0 <= categoryList[hight_prioraty_category]['index'] < 11) ? hight_prioraty_category.toUpperCase() : (hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                })));
                        }
                        return data;
                    },
                    "detail-order-syndicated": "branding,title",
                    "widget-creator-revision": "7646288",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 3,
                        "virtualThumbWidth": 1,
                        "virtualThumbHeight": 1
                    }],
                    "disclosure-position": "top",
                    "mode-has-adchoice": false,
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Helvetica,Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:bold;max-height:77px;*height:77px;color:#fff;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Futura Today Normal',Arial,Helvetica,sans-serif;",
                        ".trc_rbox_header": "font-family:'Futura Today Bold',arial,sans-serif;font-size:15px;font-weight:normal;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#e6e6e6;padding:0;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",
                        ".videoCube .thumbnail-overlay": "background-image:url(http://cdn.taboola.com/libtrc/static/thumbnails/da6eb17d679d2182809c72530d4e41b8.png);background-position:5% 5%;",
                        ".trc_rbox_border_elm": "border-color:#e6e6e6;",
                        ".video-label-box": "text-align:left;",
                        "": "width:300px;_width:300px;border-width:0px 0px 0px 0px;border-style:solid solid solid solid;border-color:#DFDFDF;padding:0px 10px 0px 10px;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:72.0px;*height:72.0px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#D7D7D7;font-size:12.0px;font-weight:normal;text-decoration:none;font-family:Helvetica,Arial,sans-serif;background-image:null;text-align:left;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "ab_thumbnails-rr_1x1": {
                    "header": "",
                    "attribution-position": "top",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }],
                    "min-width-for-attribution": 200,
                    "disclosure-link-text-sponsored": "AD CONTENT",
                    "disclosure-position": "after_branding",
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:38.0px;*height:38.0px;color:#000000;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans';font-size:16.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 0px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:38px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-title": "max-height:19.0px;*height:19.0px;color:#000000;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 0px 0px;",
                        ".branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".syndicatedItem .video-label-box": "height:38px;margin:4px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:10.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;margin:0 0 0 0;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-title', '.videoCube:hover .video-label-box .video-description', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "ab_thumbnails-rr_1x1-stream": {
                    "header": "AD CONTENT",
                    "thumbnail-position": "start",
                    "attribution-position": "top",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 1,
                        "virtualThumbHeight": 1
                    }],
                    "min-width-for-attribution": 200,
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:76.0px;*height:76.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0px 0px 6px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 1px 0px;border-color:#C2C2C2;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;margin:0 0 10px 0;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#C2C2C2;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:0px 0px 1px 0px;border-style:none;",
                        ".syndicatedItem .video-title": "max-height:88.0px;*height:88.0px;color:#303030;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14.0px;line-height:16px;font-weight:bold;text-decoration:none;height:80.0px;padding:0;",
                        ".syndicatedItem .branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:19.0px;margin:2px 0px 0px 0px;",
                        ".videoCube.thumbnail_start .thumbBlock_holder": "width:50%;_width:50%;",
                        ".branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;font-family:inherit;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "ab_thumbnails-rr_1x1z": {
                    "header": ".",
                    "attribution-position": "top",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }],
                    "disclosure-link-text-sponsored": "Sponsored",
                    "disclosure-position": "after_branding",
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:38.0px;*height:38.0px;color:#000000;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans';font-size:8.0px;font-weight:normal;text-decoration:none;color:#ffffff;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 0px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:38px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-title": "max-height:19.0px;*height:19.0px;color:#000000;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".syndicatedItem .video-label-box": "height:38px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:12.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;margin:0 0 0 0;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-title', '.videoCube:hover .video-label-box .video-description', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "ab_thumbnails-rr_1x2": {
                    "header": ".",
                    "attribution-position": "top",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }],
                    "min-width-for-attribution": 200,
                    "disclosure-link-text-sponsored": "AD CONTENT",
                    "disclosure-position": "after_branding",
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:38.0px;*height:38.0px;color:#000000;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans';font-size:8.0px;font-weight:normal;text-decoration:none;color:#ffffff;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 0px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:38px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-title": "max-height:19.0px;*height:19.0px;color:#000000;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".syndicatedItem .video-label-box": "height:38px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:12.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;margin:0 0 0 0;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-title', '.videoCube:hover .video-label-box .video-description', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "ab_thumbnails-u_abp-mode": {
                    "header": "Ad Content",
                    "attribution-position": "top",
                    "widget-creator-revision": "16277100",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 480,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 3,
                        "virtualThumbHeight": 2
                    }, {
                        "minWidth": 481,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 3,
                        "virtualThumbWidth": 6,
                        "virtualThumbHeight": 5
                    }],
                    "disclosure-position": "top",
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:rgba(0,0,0,.87);text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:rgba(0,0,0,.87);border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:88px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:rgba(0,0,0,.53);font-size:14.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".syndicatedItem .video-label-box": "height:88px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:14.0px;color:rgba(0,0,0,.53);display:inline;font-weight:normal;font-family:'Unify Sans', helvetica, arial, sans-serif;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "alternating-thumbnails-a": {
                    "header": "You May Like",
                    "attribution-position": "top",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 480,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 3,
                        "virtualThumbHeight": 2
                    }, {
                        "minWidth": 481,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 3,
                        "virtualThumbWidth": 6,
                        "virtualThumbHeight": 5
                    }],
                    "disclosure-position": "top",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:#000000;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:#000000;text-decoration:none;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:88px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:88px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "alternating-thumbnails-feed-desktop": {
                    "header": "More Stories",
                    "detail-order": "title,category,external-data",
                    "item-renderer": function(box, data) {
                        try {
                            if (data.isSyndicated) {
                                // title custom styling on Audience Exchange item (2nd slot) to match OG item (1st slot)
                                var title = box.querySelector('.video-label.video-title')
                                title.style.fontSize = '18px';
                                title.style.lineHeight = '22px';
                                title.style.maxHeight = '66px';
                                title.style.fontWeight = '600';
                                // description custom styling - 2 lines max and match styling to OG item
                                var description = box.querySelectorAll('.video-description')[0]
                                if (description) {
                                    description.style.lineHeight = '22px';
                                    description.style.maxHeight = '44px';
                                    description.style.overflow = 'hidden';
                                    description.style.color = '#666666';
                                    description.style.fontSize = '14px';
                                    description.style.fontWeight = '600';
                                }
                            }
                        } catch (e) {
                            __trcError('Error in [hook-custom-css-ae-slot] [hook-custom-ae] ' + e.message);
                        }
                    },
                    "format-uploader": '%s',
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                        try {
                            if (typeof data.isSyndicated == 'undefined') {
                                var getTimeDifference = function(data) {
                                    var fullPublishDate = new Date(1000 * data['published-date']),
                                        fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                                        articleMonth = fullPublishDate.getMonth(),
                                        articleDay = fullPublishDate.toString().split(' ')[2],
                                        articleYear = fullPublishDate.toString().split(' ')[3],
                                        articleTime = fullPublishDate.toString().split(' ')[4],
                                        articleHour = articleTime.split(':')[0],
                                        articleMinute = articleTime.split(':')[1],
                                        fullCurrentDate = new Date(),
                                        fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                                        currentMonth = fullCurrentDate.getMonth(),
                                        currentDay = fullCurrentDate.toString().split(' ')[2],
                                        currentYear = fullCurrentDate.toString().split(' ')[3],
                                        currentTime = fullCurrentDate.toString().split(' ')[4],
                                        currentHour = currentTime.split(':')[0],
                                        currentMinute = currentTime.split(':')[1],
                                        dayDiff,
                                        hourDiff,
                                        monthDifference,
                                        previousMonthTotalDays,
                                        output;
                                    if (currentMonth == articleMonth) {
                                        if (currentDay == articleDay) {
                                            hourDiff = currentHour - articleHour;
                                            if (hourDiff == 0) {
                                                output = +hourDiff + ' minutes ago';
                                            } else if (hourDiff == 1) {
                                                output = +hourDiff + ' hour ago';
                                            } else {
                                                output = +hourDiff + ' hours ago';
                                            }
                                            return output;
                                        } else {
                                            dayDiff = +currentDay - +articleDay;
                                            if (dayDiff == 1) {
                                                output = 'Yesterday';
                                            } else {
                                                output = +dayDiff + ' days ago';
                                            }
                                            return output;
                                        }
                                    } else {
                                        previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                                        monthDifference = +currentMonth - +articleMonth;
                                        currentDay = +currentDay + (+previousMonthTotalDays * monthDifference);
                                        dayDiff = +currentDay - +articleDay;
                                        if (dayDiff == 1) {
                                            output = 'Yesterday';
                                        } else {
                                            output = +dayDiff + ' days ago';
                                        }
                                        return output;
                                    }
                                }
                                data['external-data'] = ' | ' + getTimeDifference(data);
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "detail-order-syndicated": "title,description",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;max-height:96px;*height:96px;color:#212121;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:15px 0px 14px 0px;",
                        ".video-label-box": "text-align:left;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#212121;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "alternating-thumbnails-feed-mobile": {
                    "header": "More Stories",
                    "detail-order": "title,external-data,category",
                    "item-renderer": function(box, data) {
                        try {
                            if (data.isSyndicated) {
                                // title custom styling on Audience Exchange item (2nd slot) to match OG item (1st slot)
                                var title = box.querySelector('.video-label.video-title')
                                title.style.fontSize = '24px';
                                title.style.lineHeight = '32px';
                                title.style.maxHeight = '96px';
                                title.style.fontWeight = 'bold !important';
                                title.style.fontFamily = '\'Unify Sans\', Helvetica, Arial, sans-serif';
                                title.style.color = '#212121';
                                title.style.overflow = 'hidden';
                                // description custom styling - 2 lines max and match styling to OG item
                                var description = box.querySelectorAll('.video-label.video-description')[0]
                                description.style.marginTop = '20px';
                                description.style.textDecoration = 'none';
                                description.style.fontSize = '14px';
                                description.style.fontFamily = '\'Unify Sans\', Helvetica, Arial, sans-serif';
                                description.style.lineHeight = '22px';
                                description.style.maxHeight = '66px';
                                description.style.overflow = 'hidden';
                                description.style.color = 'rgba(0,0,0,0.73)';
                                description.style.fontWeight = '700';
                                // var beforeDescription = box.querySelectorAll('.video-description:before')[0]
                                // beforeDescription.style.background = '#009bff';
                                // beforeDescription.style.content = ' ';
                                // beforeDescription.style.height = '8px';
                                // beforeDescription.style.width = '50px';
                                // beforeDescription.style.display = 'block';
                                // beforeDescription.style.marginBottom = '12px';
                                var category = box.querySelectorAll('.video-category dt')[0]
                                category.style.fontFamily = '\'Unify Sans\',Helvetica,Arial,sans-serif';
                                category.style.fontSize = '14px';
                                category.style.fontWeight = '600';
                                category.style.color = '#666';
                                // var categoryImg = box.querySelectorAll('.video-category img')[0]
                                // categoryImg.style.display = 'inline-block';
                                // categoryImg.style.width = '24px';
                                // categoryImg.style.marginLeft = '5px';
                                // categoryImg.style.verticalAlign = 'middle';
                            }
                            var uploaderElm = box.getElementsByClassName('video-category')[0],
                                arrowImg = document.createElement('img');
                            arrowImg.src = 'http://cdn.taboola.com/static/e4/e424481e-cd6a-4770-892a-0569c09aecb1.png';
                            uploaderElm.appendChild(arrowImg);
                        } catch (e) {
                            __trcError('Error in [hook-custom-css-ae-slot] [hook-custom-ae] ' + e.message);
                        }
                    },
                    "format-uploader": '%s',
                    "item-data-filter": function(data) {
                        if (data['external-data'] == 'USA TODAY') {
                            data['external-data'] = 'USA TODAY';
                        }
                        //    logic for amp pages only
                        else if (window.location.href.split('/')[4] == 'frame.html' && data.category) {
                            data['external-data'] = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data['external-data'] = window.location.href.split('/')[4];
                        }
                        data.category = 'Read the full article';
                        try {
                            if (typeof data.isSyndicated == 'undefined') {
                                var formatAMPM = function(date) {
                                    var hours = date.getHours();
                                    var minutes = date.getMinutes();
                                    var ampm = hours >= 12 ? 'pm' : 'am';
                                    hours = hours % 12;
                                    hours = hours ? hours : 12; // the hour '0' should be '12'
                                    minutes = minutes < 10 ? '0' + minutes : minutes;
                                    var strTime = hours + ':' + minutes + ' ' + ampm;
                                    return strTime;
                                }
                                var getTimeDifference = function(data) {
                                    var fullPublishDate = new Date(1000 * data['published-date']),
                                        fullPublishDate = new Date(fullPublishDate.valueOf() + (fullPublishDate.getTimezoneOffset() - 240) * 60000),
                                        articleMonth = fullPublishDate.toString().split(' ')[1],
                                        articleDay = fullPublishDate.toString().split(' ')[2],
                                        articleYear = fullPublishDate.toString().split(' ')[3],
                                        articleTime = fullPublishDate.toString().split(' ')[4],
                                        articleHour = articleTime.split(':')[0],
                                        articleMinute = articleTime.split(':')[1],
                                        output;
                                    output = 'Published ' + formatAMPM(fullPublishDate) + ' EDT ' + articleMonth + ' ' + articleDay + ', ' + articleYear;
                                    return output;
                                }
                                data['uploader'] = getTimeDifference(data);
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "detail-order-syndicated": "title,description,category",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;max-height:96px;*height:96px;color:#212121;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#212121;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:23px 0px 13px 0px;",
                        ".video-label-box": "text-align:left;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "article-two-columns": {
                    "header": "TOP VIDEO PICKS",
                    "list-size": 3,
                    "orientation": "vertical",
                    "navigation-type": "scrolling",
                    "thumbnail-width": "74",
                    "thumbnail-height": "57",
                    "detail-order": "title,duration",
                    "list-suffix": function(internalc, myorigin) {
                        var box = window.TRCImpl.boxes[internalc.id.split('internal_')[1]];
                        var gam = new window.TRC.GoogleAds(box, '7951796702', null, 'ca-pub-2194040235099739');
                        gam.gamInWrapper = false;
                        gam.draw([200, 200], [200, 200], 27, false);
                        document.getElementsByClassName('gam_header')[0].innerHTML = 'Sponsored links';
                        box.element.parentNode.className += 'article-two-columns_google_ads';
                    },
                    "format-duration": function(dur) {
                        var hours = parseInt(dur / 3600);
                        if (hours >= 1)
                            dur = dur % 3600;
                        else
                            hours = 0;
                        var min = parseInt(dur / 60);
                        var sec = parseInt(dur % 60);
                        if (typeof hours != 'number' || typeof min != 'number' || typeof sec != 'number' || isNaN(hours) || isNaN(min) || isNaN(sec) || dur < 1)
                            return '';
                        return '(' + (hours >= 1 ? (hours + 'h') : '') + min + 'm' + sec + 's' + ')';
                    },
                    "format-published-date": function(published_date) {
                        var publish_date = new Date(parseInt(published_date) * 1000);
                        var Months = {
                            '1': 'Jan',
                            '2': 'Feb',
                            '3': 'Mar',
                            '4': 'Apr',
                            '5': 'May',
                            '6': 'Jun',
                            '7': 'Jul',
                            '8': 'Aug',
                            '9': 'Sep',
                            '10': 'Oct',
                            '11': 'Nov',
                            '12': 'Dec'
                        };
                        var publish_date_year = publish_date.getFullYear();
                        var publish_date_month = publish_date.getMonth() + 1;
                        var publish_date_days = publish_date.getDate();
                        var publish_date_day = publish_date.getDay();
                        switch (publish_date_day) {
                            case 0:
                                publish_date_day = 'Sun';
                                break;
                            case 1:
                                publish_date_day = 'Mon';
                                break;
                            case 2:
                                publish_date_day = 'Tue';
                                break;
                            case 3:
                                publish_date_day = 'Wed';
                                break;
                            case 4:
                                publish_date_day = 'Thu';
                                break;
                            case 5:
                                publish_date_day = 'Fri';
                                break;
                            case 6:
                                publish_date_day = 'Sat';
                                break;
                        }
                        if (publish_date_days < 10)
                            publish_date_days = '0' + publish_date_days;
                        return publish_date_day + ', ' + Months[publish_date_month] + ' ' + publish_date_days + ' ' + publish_date_year;
                    },
                    "thumbnail-position": "start",
                    "color-scheme": "custom",
                    "pager-button-location": "none",
                    "layout-template": "custom",
                    "style-template": "custom",
                    "attribution-position": "top",
                    "item-data-filter": function(data) {
                        if (data.category) {
                            var categoryList = window.TRC.categoryList;
                            var data_category_list = data.category.split(';');
                            var high_priority_category;
                            for (var i = 0; i < data_category_list.length; i++) {
                                var category = data_category_list[i];
                                var category_list = (category.split('//')) ? category.split('//') : category;
                                category = category_list[category_list.length - 1];
                                if (categoryList[category])
                                    high_priority_category = (!high_priority_category) ? category : ((categoryList[high_priority_category]['index'] > categoryList[category]['index']) ? category : high_priority_category);
                            }
                            high_priority_category = (high_priority_category) ? high_priority_category : data_category_list[0];
                            if (!categoryList[high_priority_category])
                                data.category = high_priority_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                });
                            else
                                data.category = (categoryList[high_priority_category]['name']) ? categoryList[high_priority_category]['name'] : ((0 <= categoryList[high_priority_category]['index'] < 13) ? high_priority_category.toUpperCase() : (high_priority_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                })));
                        }
                        return data;
                    },
                    "detail-order-syndicated": "branding,title",
                    "syndicated-static-text": "Sponsored",
                    "quantcast-label": "Unsorted.gannett-network.default.article-two-columns",
                    "auto-size-rules": [{
                        "minWc": 120,
                        "maxWc": 249,
                        "minWsRange": 8,
                        "maxWsRange": 8,
                        "n": 1
                    }, {
                        "minWc": 250,
                        "maxWc": 379,
                        "minWsRange": 8,
                        "maxWsRange": 9,
                        "n": 2
                    }, {
                        "minWc": 380,
                        "maxWc": 609,
                        "minWsRange": 8,
                        "maxWsRange": 10,
                        "n": 3
                    }, {
                        "minWc": 610,
                        "maxWc": 749,
                        "minWsRange": 8,
                        "maxWsRange": 11,
                        "n": 4
                    }, {
                        "minWc": 750,
                        "maxWc": 1029,
                        "minWsRange": 7,
                        "maxWsRange": 11,
                        "n": 5
                    }, {
                        "minWc": 1030,
                        "maxWc": 1419,
                        "minWsRange": 6,
                        "maxWsRange": 11,
                        "n": 6
                    }, {
                        "minWc": 1420,
                        "maxWc": 1729,
                        "minWsRange": 6,
                        "maxWsRange": 12,
                        "n": 7
                    }, {
                        "minWc": 1730,
                        "maxWc": 1920,
                        "minWsRange": 6,
                        "maxWsRange": 13,
                        "n": 8
                    }],
                    "rows": 1,
                    "widget-creator-layout": "autowidget-template",
                    "mode-is-responsive": false,
                    "responsive-rules": null,
                    "use-css-important": false,
                    "disclosure-position": "top",
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:12px;line-height:15px;font-weight:bold!important;max-height:2.58em;*height:2.58em;color:#333;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:200px;border-width:0;padding:0;",
                        ".videoCube .video-duration": "left:57px;display:none;",
                        ".videoCube .video-label-box": "margin-left:79px;margin-right:auto;",
                        ".trc_rbox_header": "font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;text-decoration:none;color:#2C2C2C;border-width:0;background:transparent;border-style:none none solid none;border-color:#D6D5D3;padding:0;margin:0 0 15px 0;",
                        ".video-duration-detail": "font-size:11px;font-weight:normal;text-decoration:none;color:#B4B2B2;",
                        ".video-published-date": "font-size:10px;font-weight:normal;text-decoration:none;color:#999;display:inherit;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#CCCCCC;padding:0 0 0 0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",
                        ".videoCube .thumbnail-overlay": "background-image:url(http://cdn.taboola.com/gannett/play-medium.png);background-position:50% 50%;",
                        ".videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay": "background-image:url(http://cdn.taboola.com/gannett/play-medium-over.png);",
                        ".trc_rbox_border_elm": "border-color:0;",
                        ".video-label-box": "text-align:left;",
                        ".thumbnail-emblem": "background-position:0% 100%;width:35;_width:35;height:35;",
                        ".videoCube .sponsored": "margin-top:-2px;",
                        "": "width:185px;_width:185px;border-width:0px;border-style:solid solid solid solid;border-color:#000000;padding:0;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",
                        ".videoCube.vertical": "border-style:none none none none;",
                        ".videoCube.horizontal": "border-style:none none none dotted;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",
                        ".videoCube.syndicatedItem.horizontal": "border-style:none none none solid;",
                        ".videoCube.syndicatedItem .video-duration": "display:block;left:36px;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:2.58em;*height:2.58em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:17.5px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:black;font-size:10px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;",
                        ".videoCube.syndicatedItem .thumbBlock .branding": "text-align:left;background-color:transparent;display:block;left:0px;color:black;font-size:10px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;",
                        ".videoCube.syndicatedItem .thumbBlock .static-text": "text-align:left;background-color:black;display:block;color:white;font-size:10px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbnails-desktop-01": {
                    "header": "Recommended Content",
                    "detail-order": "title,category,external-data",
                    "item-renderer": function(box, data) {
                        try {
                            if (data.isSyndicated) {
                                // title custom styling on Audience Exchange item (2nd slot) to match OG item (1st slot)
                                var title = box.querySelector('.video-label.video-title')
                                title.style.fontSize = '18px';
                                title.style.lineHeight = '22px';
                                title.style.maxHeight = '66px';
                                title.style.fontWeight = '600';
                                // description custom styling - 2 lines max and match styling to OG item
                                var description = box.querySelectorAll('.video-description')[0]
                                if (description) {
                                    description.style.lineHeight = '22px';
                                    description.style.maxHeight = '44px';
                                    description.style.overflow = 'hidden';
                                    description.style.color = '#666666';
                                    description.style.fontSize = '14px';
                                    description.style.fontWeight = '600';
                                }
                            }
                        } catch (e) {
                            __trcError('Error in [hook-custom-css-ae-slot] [hook-custom-ae] ' + e.message);
                        }
                    },
                    "format-uploader": '%s',
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                        try {
                            if (!data.isSyndicated) {
                                var getTimeDifference = function(data) {
                                    var fullPublishDate = new Date(1000 * data['published-date']),
                                        fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                                        articleMonth = fullPublishDate.getMonth(),
                                        articleDay = fullPublishDate.toString().split(' ')[2],
                                        articleYear = fullPublishDate.toString().split(' ')[3],
                                        articleTime = fullPublishDate.toString().split(' ')[4],
                                        articleHour = articleTime.split(':')[0],
                                        articleMinute = articleTime.split(':')[1],
                                        fullCurrentDate = new Date(),
                                        fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                                        currentMonth = fullCurrentDate.getMonth(),
                                        currentDay = fullCurrentDate.toString().split(' ')[2],
                                        currentYear = fullCurrentDate.toString().split(' ')[3],
                                        currentTime = fullCurrentDate.toString().split(' ')[4],
                                        currentHour = currentTime.split(':')[0],
                                        currentMinute = currentTime.split(':')[1],
                                        dayDiff,
                                        hourDiff,
                                        monthDifference,
                                        previousMonthTotalDays,
                                        output;
                                    if (currentMonth == articleMonth) {
                                        if (currentDay == articleDay) {
                                            hourDiff = currentHour - articleHour;
                                            if (hourDiff == 0) {
                                                output = +hourDiff + ' minutes ago';
                                            } else if (hourDiff == 1) {
                                                output = +hourDiff + ' hour ago';
                                            } else {
                                                output = +hourDiff + ' hours ago';
                                            }
                                            return output;
                                        } else {
                                            dayDiff = +currentDay - +articleDay;
                                            if (dayDiff == 1) {
                                                output = 'Yesterday';
                                            } else {
                                                output = +dayDiff + ' days ago';
                                            }
                                            return output;
                                        }
                                    } else {
                                        previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                                        monthDifference = +currentMonth - +articleMonth;
                                        currentDay = +currentDay + (+previousMonthTotalDays * monthDifference);
                                        dayDiff = +currentDay - +articleDay;
                                        if (dayDiff == 1) {
                                            output = 'Yesterday';
                                        } else {
                                            output = +dayDiff + ' days ago';
                                        }
                                        return output;
                                    }
                                }
                                data['external-data'] = ' | ' + getTimeDifference(data);
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "detail-order-syndicated": "title,description",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;max-height:96px;*height:96px;color:#212121;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:15px 0px 14px 0px;",
                        ".video-label-box": "text-align:left;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#212121;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbnails-desktop-a-03": {
                    "header": "Recommended",
                    "detail-order": "title,category,external-data",
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                        /***** START - get-time-difference *****/
                        /*     try {
                        			if (typeof data.isSyndicated == 'undefined') {
                        				data['external-data'] = ' | ' + TRC.getTimeDifference(data['published-date']);
                        			}
                        		} catch (e) {
                        			__trcError('Error in [item-data-filter] [get-time-difference] : ', e.message);
                        		} */
                        /***** END - get-time-difference *****/
                    },
                    "detail-order-syndicated": "title,description",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 430,
                        "virtualThumbHeight": 241.2
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:24.0px;font-weight:bold;max-height:120.0px;*height:120.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 12px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#303030;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:20.0px;line-height:24.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 4px 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbnails-desktop-a-03-sb": {
                    "header": "Recommended",
                    "detail-order": "title,category,external-data",
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                        /***** START - get-time-difference *****/
                        /*     try {
                        			if (typeof data.isSyndicated == 'undefined') {
                        				data['external-data'] = ' | ' + TRC.getTimeDifference(data['published-date']);
                        			}
                        		} catch (e) {
                        			__trcError('Error in [item-data-filter] [get-time-difference] : ', e.message);
                        		} */
                        /***** END - get-time-difference *****/
                    },
                    "detail-order-syndicated": "title,description",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 430,
                        "virtualThumbHeight": 241.2
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:24.0px;font-weight:bold;max-height:120.0px;*height:120.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 12px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#303030;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:20.0px;line-height:24.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 4px 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbnails-desktop-deal": {
                    "header": "More Stories",
                    "detail-order": "title,category,external-data",
                    "list-suffix": function(internalc, myorigin) {
                        try {
                            var modeContainer = TRC.dom.closest(internalc, '.trc_related_container');
                            if (modeContainer.querySelector('.syndicatedItem')) {
                                var headerText = modeContainer.querySelector('.trc_rbox_header_span')
                                headerText.innerText = 'Deal of the Day';
                            }
                        } catch (e) {
                            _trcError('Error in list-suffix' + e.message);
                        }
                    },
                    "item-renderer": function(box, data) {
                        try {
                            if (data.isSyndicated) {
                                // title custom styling on Audience Exchange item (2nd slot) to match OG item (1st slot)
                                var title = box.querySelector('.video-label.video-title')
                                title.style.fontSize = '18px';
                                title.style.lineHeight = '22px';
                                title.style.maxHeight = '66px';
                                title.style.fontWeight = '600';
                                // description custom styling - 2 lines max and match styling to OG item
                                var description = box.querySelectorAll('.video-description')[0]
                                if (description) {
                                    description.style.lineHeight = '22px';
                                    description.style.maxHeight = '44px';
                                    description.style.overflow = 'hidden';
                                    description.style.color = '#666666';
                                    description.style.fontSize = '14px';
                                    description.style.fontWeight = '600';
                                }
                            }
                        } catch (e) {
                            __trcError('Error in [hook-custom-css-ae-slot] [hook-custom-ae] ' + e.message);
                        }
                    },
                    "format-uploader": '%s',
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                        try {
                            if (!data.isSyndicated) {
                                var getTimeDifference = function(data) {
                                    var fullPublishDate = new Date(1000 * data['published-date']),
                                        fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                                        articleMonth = fullPublishDate.getMonth(),
                                        articleDay = fullPublishDate.toString().split(' ')[2],
                                        articleYear = fullPublishDate.toString().split(' ')[3],
                                        articleTime = fullPublishDate.toString().split(' ')[4],
                                        articleHour = articleTime.split(':')[0],
                                        articleMinute = articleTime.split(':')[1],
                                        fullCurrentDate = new Date(),
                                        fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                                        currentMonth = fullCurrentDate.getMonth(),
                                        currentDay = fullCurrentDate.toString().split(' ')[2],
                                        currentYear = fullCurrentDate.toString().split(' ')[3],
                                        currentTime = fullCurrentDate.toString().split(' ')[4],
                                        currentHour = currentTime.split(':')[0],
                                        currentMinute = currentTime.split(':')[1],
                                        dayDiff,
                                        hourDiff,
                                        monthDifference,
                                        previousMonthTotalDays,
                                        output;
                                    if (currentMonth == articleMonth) {
                                        if (currentDay == articleDay) {
                                            hourDiff = currentHour - articleHour;
                                            if (hourDiff == 0) {
                                                output = +hourDiff + ' minutes ago';
                                            } else if (hourDiff == 1) {
                                                output = +hourDiff + ' hour ago';
                                            } else {
                                                output = +hourDiff + ' hours ago';
                                            }
                                            return output;
                                        } else {
                                            dayDiff = +currentDay - +articleDay;
                                            if (dayDiff == 1) {
                                                output = 'Yesterday';
                                            } else {
                                                output = +dayDiff + ' days ago';
                                            }
                                            return output;
                                        }
                                    } else {
                                        previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                                        monthDifference = +currentMonth - +articleMonth;
                                        currentDay = +currentDay + (+previousMonthTotalDays * monthDifference);
                                        dayDiff = +currentDay - +articleDay;
                                        if (dayDiff == 1) {
                                            output = 'Yesterday';
                                        } else {
                                            output = +dayDiff + ' days ago';
                                        }
                                        return output;
                                    }
                                }
                                data['external-data'] = ' | ' + getTimeDifference(data);
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "detail-order-syndicated": "title,description",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;max-height:96px;*height:96px;color:#212121;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:15px 0px 14px 0px;",
                        ".video-label-box": "text-align:left;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#212121;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbnails-desktop-deal-03": {
                    "header": "More Stories",
                    "detail-order": "title,category,external-data",
                    "list-suffix": function(internalc, myorigin) {
                        try {
                            var modeContainer = TRC.dom.closest(internalc, '.trc_related_container');
                            if (modeContainer.querySelector('.syndicatedItem')) {
                                var headerText = modeContainer.querySelector('.trc_rbox_header_span')
                                headerText.innerText = 'Deal of the Day';
                                var itemLabelHref = internalc.querySelector('.item-label-href');
                                if (itemLabelHref) {
                                    var viewDealLabel = document.createElement('div');
                                    viewDealLabel.id = 'view-deal-label';
                                    viewDealLabel.innerHTML = '<span>View Deal </span><span id=\'top-left-arrow\'><svg><g><polygon points=\'1 13 3 13 3 11 17.0857864 11 13.7928932 7.70710678 15.2071068 6.29289322 20.9142136 12 15.2071068 17.7071068 13.7928932 16.292893 17.0857864 13\'></polygon></g></svg></span>';
                                    itemLabelHref.appendChild(viewDealLabel);
                                    var disclaimerLabel = document.createElement('div');
                                    disclaimerLabel.id = 'disclaimer-label';
                                    disclaimerLabel.innerHTML = '<span>Recommendations are independently chosen by our editors. Purchases you make through our links may earn us a commission.</span>';
                                    viewDealLabel.insertAdjacentElement('afterend', disclaimerLabel);
                                }
                            }
                        } catch (e) {
                            _trcError('Error in list-suffix' + e.message);
                        }
                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        try {
                            if (data.category == null) {
                                data.category = 'News';
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                        return data;
                    },
                    "detail-order-syndicated": "title,description",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:24.0px;font-weight:bold;max-height:120.0px;*height:120.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 12px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#303030;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:20.0px;line-height:24.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".video-label-box .branding": "line-height:22.0px;display:block;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;margin:0 0 4px 0;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.video-label-box .branding', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-title', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbnails-desktop-deal-04": {
                    "header": "More Stories",
                    "detail-order": "title,category,external-data",
                    "list-suffix": function(internalc, myorigin) {
                        try {
                            var modeContainer = TRC.dom.closest(internalc, '.trc_related_container');
                            if (modeContainer.querySelector('.syndicatedItem')) {
                                var headerText = modeContainer.querySelector('.trc_rbox_header_span')
                                headerText.innerText = 'Recommended For You';
                                var itemLabelHref = internalc.querySelector('.item-label-href');
                                if (itemLabelHref) {
                                    var viewDealLabel = document.createElement('div');
                                    viewDealLabel.id = 'view-deal-label';
                                    viewDealLabel.innerHTML = '<span>Play Now </span><span id=\'top-left-arrow\'><svg><g><polygon points=\'1 13 3 13 3 11 17.0857864 11 13.7928932 7.70710678 15.2071068 6.29289322 20.9142136 12 15.2071068 17.7071068 13.7928932 16.292893 17.0857864 13\'></polygon></g></svg></span>';
                                    /*itemLabelHref.appendChild(viewDealLabel);
               var disclaimerLabel = document.createElement('div');
                disclaimerLabel.id = 'disclaimer-label';
                disclaimerLabel.innerHTML = '<span>Recommendations are independently chosen by our editors. Purchases you make through our links may earn us a commission.</span>';
                viewDealLabel.insertAdjacentElement('afterend', disclaimerLabel);
								
							*/
                                }
                            }
                        } catch (e) {
                            _trcError('Error in list-suffix' + e.message);
                        }
                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        try {
                            if (data.category == null) {
                                data.category = 'News';
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                        return data;
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:24.0px;font-weight:bold;max-height:120.0px;*height:120.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 12px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#303030;font-family:'Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:16px;line-height:18px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#666666;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#666666;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".video-label-box .branding": "line-height:22.0px;display:block;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;margin:0 0 4px 0;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.video-label-box .branding', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-title', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbnails-desktop-deal-05": {
                    "header": "",
                    "detail-order": "title,category,external-data",
                    "list-suffix": function(internalc, myorigin) {
                        try {
                            var modeContainer = TRC.dom.closest(internalc, '.trc_related_container');
                            if (modeContainer.querySelector('.syndicatedItem')) {
                                var headerText = modeContainer.querySelector('.trc_rbox_header_span')
                                headerText.innerText = 'Feed Your Fandom';
                                var itemLabelHref = internalc.querySelector('.item-label-href');
                                if (itemLabelHref) {
                                    var viewDealLabel = document.createElement('div');
                                    viewDealLabel.id = 'view-deal-label';
                                    viewDealLabel.innerHTML = '<span>Play Now </span><span id=\'top-left-arrow\'><svg><g><polygon points=\'1 13 3 13 3 11 17.0857864 11 13.7928932 7.70710678 15.2071068 6.29289322 20.9142136 12 15.2071068 17.7071068 13.7928932 16.292893 17.0857864 13\'></polygon></g></svg></span>';
                                    /*itemLabelHref.appendChild(viewDealLabel);
               var disclaimerLabel = document.createElement('div');
                disclaimerLabel.id = 'disclaimer-label';
                disclaimerLabel.innerHTML = '<span>Recommendations are independently chosen by our editors. Purchases you make through our links may earn us a commission.</span>';
                viewDealLabel.insertAdjacentElement('afterend', disclaimerLabel);
								
							*/
                                }
                            }
                        } catch (e) {
                            _trcError('Error in list-suffix' + e.message);
                        }
                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        try {
                            if (data.category == null) {
                                data.category = 'News';
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                        return data;
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:24.0px;font-weight:bold;max-height:120.0px;*height:120.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 12px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:10px;font-weight:normal;text-decoration:none;color:#666666;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#303030;font-family:'Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:16px;line-height:18px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#666666;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#666666;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".video-label-box .branding": "line-height:22.0px;display:block;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;margin:0 0 4px 0;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.video-label-box .branding', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-title', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbnails-mobile-01": {
                    "header": "Recommended Content",
                    "detail-order": "title,external-data,category",
                    "item-renderer": function(box, data) {
                        try {
                            if (data.isSyndicated) {
                                // title custom styling on Audience Exchange item (2nd slot) to match OG item (1st slot)
                                var title = box.querySelector('.video-label.video-title')
                                title.style.fontSize = '24px';
                                title.style.lineHeight = '32px';
                                title.style.maxHeight = '96px';
                                title.style.fontWeight = 'bold !important';
                                title.style.fontFamily = '\'Unify Sans\', Helvetica, Arial, sans-serif';
                                title.style.color = '#212121';
                                title.style.overflow = 'hidden';
                                // description custom styling - 2 lines max and match styling to OG item
                                var description = box.querySelectorAll('.video-label.video-description')[0]
                                description.style.marginTop = '20px';
                                description.style.textDecoration = 'none';
                                description.style.fontSize = '14px';
                                description.style.fontFamily = '\'Unify Sans\', Helvetica, Arial, sans-serif';
                                description.style.lineHeight = '22px';
                                description.style.maxHeight = '66px';
                                description.style.overflow = 'hidden';
                                description.style.color = 'rgba(0,0,0,0.73)';
                                description.style.fontWeight = '700';
                                var category = box.querySelectorAll('.video-category dt')[0]
                                category.style.fontFamily = '\'Unify Sans\',Helvetica,Arial,sans-serif';
                                category.style.fontSize = '14px';
                                category.style.fontWeight = '600';
                                category.style.color = '#666';
                            }
                            var uploaderElm = box.getElementsByClassName('video-category')[0],
                                arrowImg = document.createElement('img');
                            arrowImg.src = 'http://cdn.taboola.com/static/e4/e424481e-cd6a-4770-892a-0569c09aecb1.png';
                            uploaderElm.appendChild(arrowImg);
                        } catch (e) {
                            __trcError('Error in [hook-custom-css-ae-slot] [hook-custom-ae] ' + e.message);
                        }
                    },
                    "format-uploader": '%s',
                    "item-data-filter": function(data) {
                        if (data['external-data'] == 'USA TODAY') {
                            data['external-data'] = 'USA TODAY';
                        }
                        //    logic for amp pages only
                        else if (window.location.href.split('/')[4] == 'frame.html' && data.category) {
                            data['external-data'] = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data['external-data'] = window.location.href.split('/')[4];
                        }
                        data.category = 'Read the full article';
                        try {
                            if (typeof data.isSyndicated == 'undefined') {
                                var formatAMPM = function(date) {
                                    var hours = date.getHours();
                                    var minutes = date.getMinutes();
                                    var ampm = hours >= 12 ? 'pm' : 'am';
                                    hours = hours % 12;
                                    hours = hours ? hours : 12; // the hour '0' should be '12'
                                    minutes = minutes < 10 ? '0' + minutes : minutes;
                                    var strTime = hours + ':' + minutes + ' ' + ampm;
                                    return strTime;
                                }
                                var getTimeDifference = function(data) {
                                    var fullPublishDate = new Date(1000 * data['published-date']),
                                        fullPublishDate = new Date(fullPublishDate.valueOf() + (fullPublishDate.getTimezoneOffset() - 240) * 60000),
                                        articleMonth = fullPublishDate.toString().split(' ')[1],
                                        articleDay = fullPublishDate.toString().split(' ')[2],
                                        articleYear = fullPublishDate.toString().split(' ')[3],
                                        articleTime = fullPublishDate.toString().split(' ')[4],
                                        articleHour = articleTime.split(':')[0],
                                        articleMinute = articleTime.split(':')[1],
                                        output;
                                    output = 'Published ' + formatAMPM(fullPublishDate) + ' EDT ' + articleMonth + ' ' + articleDay + ', ' + articleYear;
                                    return output;
                                }
                                data['uploader'] = getTimeDifference(data);
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "detail-order-syndicated": "title,description,category",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;max-height:96px;*height:96px;color:#212121;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#212121;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:23px 0px 13px 0px;",
                        ".video-label-box": "text-align:left;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbnails-mobile-deal": {
                    "header": "More Stories",
                    "detail-order": "title,external-data,category",
                    "list-suffix": function(internalc, myorigin) {
                        try {
                            var modeContainer = TRC.dom.closest(internalc, '.trc_related_container');
                            if (modeContainer.querySelector('.syndicatedItem')) {
                                var headerText = modeContainer.querySelector('.trc_rbox_header_span')
                                headerText.innerText = 'Deal of the Day';
                            }
                        } catch (e) {
                            _trcError('Error in list-suffix' + e.message);
                        }
                    },
                    "item-renderer": function(box, data) {
                        try {
                            if (data.isSyndicated) {
                                // title custom styling on Audience Exchange item (2nd slot) to match OG item (1st slot)
                                var title = box.querySelector('.video-label.video-title')
                                title.style.fontSize = '24px';
                                title.style.lineHeight = '32px';
                                title.style.maxHeight = '96px';
                                title.style.fontWeight = 'bold !important';
                                title.style.fontFamily = '\'Unify Sans\', Helvetica, Arial, sans-serif';
                                title.style.color = '#212121';
                                title.style.overflow = 'hidden';
                                // description custom styling - 2 lines max and match styling to OG item
                                var description = box.querySelectorAll('.video-label.video-description')[0]
                                description.style.marginTop = '20px';
                                description.style.textDecoration = 'none';
                                description.style.fontSize = '14px';
                                description.style.fontFamily = '\'Unify Sans\', Helvetica, Arial, sans-serif';
                                description.style.lineHeight = '22px';
                                description.style.maxHeight = '66px';
                                description.style.overflow = 'hidden';
                                description.style.color = 'rgba(0,0,0,0.73)';
                                description.style.fontWeight = '700';
                                var category = box.querySelectorAll('.video-category dt')[0]
                                category.style.fontFamily = '\'Unify Sans\',Helvetica,Arial,sans-serif';
                                category.style.fontSize = '14px';
                                category.style.fontWeight = '600';
                                category.style.color = '#666';
                            }
                            var uploaderElm = box.getElementsByClassName('video-category')[0],
                                arrowImg = document.createElement('img');
                            arrowImg.src = 'http://cdn.taboola.com/static/e4/e424481e-cd6a-4770-892a-0569c09aecb1.png';
                            uploaderElm.appendChild(arrowImg);
                        } catch (e) {
                            __trcError('Error in [hook-custom-css-ae-slot] [hook-custom-ae] ' + e.message);
                        }
                    },
                    "format-uploader": '%s',
                    "item-data-filter": function(data) {
                        if (data['external-data'] == 'USA TODAY') {
                            data['external-data'] = 'USA TODAY';
                        }
                        //    logic for amp pages only
                        else if (window.location.href.split('/')[4] == 'frame.html' && data.category) {
                            data['external-data'] = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data['external-data'] = window.location.href.split('/')[4];
                        }
                        data.category = 'Read the full article';
                        try {
                            if (typeof data.isSyndicated == 'undefined') {
                                var formatAMPM = function(date) {
                                    var hours = date.getHours();
                                    var minutes = date.getMinutes();
                                    var ampm = hours >= 12 ? 'pm' : 'am';
                                    hours = hours % 12;
                                    hours = hours ? hours : 12; // the hour '0' should be '12'
                                    minutes = minutes < 10 ? '0' + minutes : minutes;
                                    var strTime = hours + ':' + minutes + ' ' + ampm;
                                    return strTime;
                                }
                                var getTimeDifference = function(data) {
                                    var fullPublishDate = new Date(1000 * data['published-date']),
                                        fullPublishDate = new Date(fullPublishDate.valueOf() + (fullPublishDate.getTimezoneOffset() - 240) * 60000),
                                        articleMonth = fullPublishDate.toString().split(' ')[1],
                                        articleDay = fullPublishDate.toString().split(' ')[2],
                                        articleYear = fullPublishDate.toString().split(' ')[3],
                                        articleTime = fullPublishDate.toString().split(' ')[4],
                                        articleHour = articleTime.split(':')[0],
                                        articleMinute = articleTime.split(':')[1],
                                        output;
                                    output = 'Published ' + formatAMPM(fullPublishDate) + ' EDT ' + articleMonth + ' ' + articleDay + ', ' + articleYear;
                                    return output;
                                }
                                data['uploader'] = getTimeDifference(data);
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "detail-order-syndicated": "title,description,category",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;max-height:96px;*height:96px;color:#212121;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#212121;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:23px 0px 13px 0px;",
                        ".video-label-box": "text-align:left;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbnails-mobile-fandom": {
                    "header": "",
                    "detail-order": "title,category,external-data",
                    "list-suffix": function(internalc, myorigin) {
                        try {
                            var modeContainer = TRC.dom.closest(internalc, '.trc_related_container');
                            if (modeContainer.querySelector('.syndicatedItem')) {
                                var headerText = modeContainer.querySelector('.trc_rbox_header_span')
                                headerText.innerText = 'Feed Your Fandom';
                                var itemLabelHref = internalc.querySelector('.item-label-href');
                                if (itemLabelHref) {
                                    var viewDealLabel = document.createElement('div');
                                    viewDealLabel.id = 'view-deal-label';
                                    viewDealLabel.innerHTML = '<span>Play Now </span><span id=\'top-left-arrow\'><svg><g><polygon points=\'1 13 3 13 3 11 17.0857864 11 13.7928932 7.70710678 15.2071068 6.29289322 20.9142136 12 15.2071068 17.7071068 13.7928932 16.292893 17.0857864 13\'></polygon></g></svg></span>';
                                    /*itemLabelHref.appendChild(viewDealLabel);
               var disclaimerLabel = document.createElement('div');
                disclaimerLabel.id = 'disclaimer-label';
                disclaimerLabel.innerHTML = '<span>Recommendations are independently chosen by our editors. Purchases you make through our links may earn us a commission.</span>';
                viewDealLabel.insertAdjacentElement('afterend', disclaimerLabel);
								
							*/
                                }
                            }
                        } catch (e) {
                            _trcError('Error in list-suffix' + e.message);
                        }
                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        try {
                            if (data.category == null) {
                                data.category = 'News';
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                        return data;
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:24.0px;font-weight:bold;max-height:120.0px;*height:120.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 12px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:10px;font-weight:normal;text-decoration:none;color:#666666;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#303030;font-family:'Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:16px;line-height:18px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#666666;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#666666;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".video-label-box .branding": "line-height:22.0px;display:block;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;margin:0 0 4px 0;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.video-label-box .branding', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-title', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbs-feed-mobile-a": {
                    "header": "Recommended",
                    "detail-order": "title,branding",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }
                    },
                    "format-uploader": '%s',
                    "detail-order-syndicated": "title,category",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:18.0px;font-weight:bold;max-height:96px;*height:96px;color:#212121;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#212121;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:23px 0px 9px 0px;line-height:1.2em;display:block;margin:0;position:relative;box-sizing:border-box;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:128px;margin:5px 0 0 0;",
                        ".video-external-data": "font-size:14px;font-weight:normal;text-decoration:none;color:rgba(0, 0, 0, 0.73);",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:32.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:128px;margin:5px 0 0 0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:3px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbs-feed-mobile-deal": {
                    "header": "More Stories",
                    "detail-order": "title,external-data,category",
                    "list-suffix": function(internalc, myorigin) {
                        try {
                            var modeContainer = TRC.dom.closest(internalc, '.trc_related_container');
                            if (modeContainer.querySelector('.syndicatedItem')) {
                                var headerText = modeContainer.querySelector('.trc_rbox_header_span')
                                headerText.innerText = 'Deal of the Day';
                                var itemLabelHref = internalc.querySelector('.item-label-href');
                                if (itemLabelHref) {
                                    var disclaimerLabel = document.createElement('div');
                                    disclaimerLabel.id = 'disclaimer-label';
                                    disclaimerLabel.innerHTML = '<span>Recommendations are independently chosen by our editors. Purchases you make through our links may earn us a commission.</span>';
                                    itemLabelHref.insertAdjacentElement('afterend', disclaimerLabel);
                                }
                            }
                        } catch (e) {
                            _trcError('Error in list-suffix' + e.message);
                        }
                    },
                    "format-uploader": '%s',
                    "item-data-filter": function(data) {
                        if (data['external-data'] == null) {
                            data['external-data'] = 'USA TODAY';
                        }
                        data.category = 'View Deal';
                        try {
                            if (typeof data.isSyndicated == 'undefined') {
                                var formatAMPM = function(date) {
                                    var hours = date.getHours();
                                    var minutes = date.getMinutes();
                                    var ampm = hours >= 12 ? 'pm' : 'am';
                                    hours = hours % 12;
                                    hours = hours ? hours : 12; // the hour '0' should be '12'
                                    minutes = minutes < 10 ? '0' + minutes : minutes;
                                    var strTime = hours + ':' + minutes + ' ' + ampm;
                                    return strTime;
                                }
                                var getTimeDifference = function(data) {
                                    var fullPublishDate = new Date(1000 * data['published-date']),
                                        fullPublishDate = new Date(fullPublishDate.valueOf() + (fullPublishDate.getTimezoneOffset() - 240) * 60000),
                                        articleMonth = fullPublishDate.toString().split(' ')[1],
                                        articleDay = fullPublishDate.toString().split(' ')[2],
                                        articleYear = fullPublishDate.toString().split(' ')[3],
                                        articleTime = fullPublishDate.toString().split(' ')[4],
                                        articleHour = articleTime.split(':')[0],
                                        articleMinute = articleTime.split(':')[1],
                                        output;
                                    output = 'Published ' + formatAMPM(fullPublishDate) + ' EDT ' + articleMonth + ' ' + articleDay + ', ' + articleYear;
                                    return output;
                                }
                                data['uploader'] = getTimeDifference(data);
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "detail-order-syndicated": "title,description,category",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;max-height:96px;*height:96px;color:#212121;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#212121;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:23px 0px 13px 0px;line-height:1.2em;display:block;margin:0;position:relative;background-color:#f8f8f8;box-sizing:border-box;height:auto;width:auto;_width:auto;",
                        ".video-uploader": "font-size:14px;font-weight:normal;text-decoration:none;color:black;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 0 0 !important;",
                        ".video-label-box": "text-align:left;height:128px;margin:5px 0 0 0;",
                        ".video-external-data": "font-size:14px;font-weight:normal;text-decoration:none;color:rgba(0, 0, 0, 0.73);",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:32.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:128px;margin:5px 0 0 0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:3px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbs-feed-mobile-deal-01": {
                    "header": "Recommended for you",
                    "detail-order": "title,external-data",
                    "list-suffix": function(internalc, myorigin) {
                        /* try {
                             var modeContainer = TRC.dom.closest(internalc, '.trc_related_container');
                             if (modeContainer.querySelector('.syndicatedItem')) {
                                 var headerText = modeContainer.querySelector('.trc_rbox_header_span')
                                 headerText.innerText = 'Deal of the Day';
                                 var itemLabelHref = internalc.querySelector('.item-label-href');
                                 if (itemLabelHref) {
                                     var disclaimerLabel = document.createElement('div');
                                     disclaimerLabel.id = 'disclaimer-label';
                                     disclaimerLabel.innerHTML = '<span>Recommendations are independently chosen by our editors. Purchases you make through our links may earn us a commission.</span>';
                                     itemLabelHref.insertAdjacentElement('afterend', disclaimerLabel);
                                 }
                             }
                         } catch (e) {
                             _trcError('Error in list-suffix' + e.message);
                         }*/
                    },
                    "format-uploader": '%s',
                    "item-data-filter": function(data) {
                        if (data['external-data'] == null) {
                            data['external-data'] = 'USA TODAY';
                        }
                        data.category = 'Play Now';
                        try {
                            if (typeof data.isSyndicated == 'undefined') {
                                var formatAMPM = function(date) {
                                    var hours = date.getHours();
                                    var minutes = date.getMinutes();
                                    var ampm = hours >= 12 ? 'pm' : 'am';
                                    hours = hours % 12;
                                    hours = hours ? hours : 12; // the hour '0' should be '12'
                                    minutes = minutes < 10 ? '0' + minutes : minutes;
                                    var strTime = hours + ':' + minutes + ' ' + ampm;
                                    return strTime;
                                }
                                var getTimeDifference = function(data) {
                                    var fullPublishDate = new Date(1000 * data['published-date']),
                                        fullPublishDate = new Date(fullPublishDate.valueOf() + (fullPublishDate.getTimezoneOffset() - 240) * 60000),
                                        articleMonth = fullPublishDate.toString().split(' ')[1],
                                        articleDay = fullPublishDate.toString().split(' ')[2],
                                        articleYear = fullPublishDate.toString().split(' ')[3],
                                        articleTime = fullPublishDate.toString().split(' ')[4],
                                        articleHour = articleTime.split(':')[0],
                                        articleMinute = articleTime.split(':')[1],
                                        output;
                                    output = 'Published ' + formatAMPM(fullPublishDate) + ' EDT ' + articleMonth + ' ' + articleDay + ', ' + articleYear;
                                    return output;
                                }
                                data['uploader'] = getTimeDifference(data);
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;max-height:96px;*height:96px;color:#212121;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#212121;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:23px 0px 13px 0px;line-height:1.2em;display:block;margin:0;position:relative;background-color:#ffffff;box-sizing:border-box;height:auto;width:auto;_width:auto;",
                        ".video-uploader": "font-size:14px;font-weight:normal;text-decoration:none;color:black;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 0 0 !important;",
                        ".video-label-box": "text-align:left;height:128px;margin:5px 0 0 0;",
                        ".video-external-data": "font-size:14px;font-weight:normal;text-decoration:none;color:rgba(0, 0, 0, 0.73);",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#303030;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:18.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#666;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:32.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#666;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:128px;margin:5px 0 0 0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:3px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "exchange-thumbs-feed-mobile-deal-a": {
                    "header": "More Stories",
                    "detail-order": "title,external-data,category",
                    "list-suffix": function(internalc, myorigin) {
                        try {
                            var modeContainer = TRC.dom.closest(internalc, '.trc_related_container');
                            if (modeContainer.querySelector('.syndicatedItem')) {
                                var headerText = modeContainer.querySelector('.trc_rbox_header_span')
                                headerText.innerText = 'Deal of the Day';
                            }
                        } catch (e) {
                            _trcError('Error in list-suffix' + e.message);
                        }
                    },
                    "format-uploader": '%s',
                    "item-data-filter": function(data) {
                        if (data['external-data'] == null) {
                            data['external-data'] = 'USA TODAY';
                        }
                        data.category = 'View Deal';
                        try {
                            if (typeof data.isSyndicated == 'undefined') {
                                var formatAMPM = function(date) {
                                    var hours = date.getHours();
                                    var minutes = date.getMinutes();
                                    var ampm = hours >= 12 ? 'pm' : 'am';
                                    hours = hours % 12;
                                    hours = hours ? hours : 12; // the hour '0' should be '12'
                                    minutes = minutes < 10 ? '0' + minutes : minutes;
                                    var strTime = hours + ':' + minutes + ' ' + ampm;
                                    return strTime;
                                }
                                var getTimeDifference = function(data) {
                                    var fullPublishDate = new Date(1000 * data['published-date']),
                                        fullPublishDate = new Date(fullPublishDate.valueOf() + (fullPublishDate.getTimezoneOffset() - 240) * 60000),
                                        articleMonth = fullPublishDate.toString().split(' ')[1],
                                        articleDay = fullPublishDate.toString().split(' ')[2],
                                        articleYear = fullPublishDate.toString().split(' ')[3],
                                        articleTime = fullPublishDate.toString().split(' ')[4],
                                        articleHour = articleTime.split(':')[0],
                                        articleMinute = articleTime.split(':')[1],
                                        output;
                                    output = 'Published ' + formatAMPM(fullPublishDate) + ' EDT ' + articleMonth + ' ' + articleDay + ', ' + articleYear;
                                    return output;
                                }
                                data['uploader'] = getTimeDifference(data);
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "detail-order-syndicated": "title,description,category",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;max-height:96px;*height:96px;color:#212121;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#212121;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:23px 0px 13px 0px;line-height:1.2em;display:block;margin:0;position:relative;background-color:#f8f8f8;box-sizing:border-box;height:auto;width:auto;_width:auto;",
                        ".video-uploader": "font-size:14px;font-weight:normal;text-decoration:none;color:black;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 0 0 !important;",
                        ".video-label-box": "text-align:left;height:128px;margin:5px 0 0 0;",
                        ".video-external-data": "font-size:14px;font-weight:normal;text-decoration:none;color:rgba(0, 0, 0, 0.73);",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:32.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:128px;margin:5px 0 0 0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:3px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-rec-reel-01-x": {
                    "detail-order": "title,description,branding",
                    "thumbnail-position": "under",
                    "detail-order-syndicated": "title,description,branding",
                    "widget-creator-layout": "autowidget-template",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }],
                    "disclosure-link-text-sponsored": "Sponsored",
                    "disclosure-position": "after_branding",
                    "storyWidget": true,
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;max-height:54.0px;*height:54.0px;color:#ffffff;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;max-height:44.0px;*height:44.0px;color:#ffffff;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".video-label-box": "text-align:left;height:auto;min-height:54.0px;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:44.0px;*height:44.0px;color:#ffffff;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;font-weight:normal;line-height:22.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:54.0px;*height:54.0px;color:#ffffff;font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#ffffff;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".branding": "color:#ffffff;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".videoCube.thumbnail_under .tbl-text-over": "background:linear-gradient(to bottom, rgba(1,0,0,0) 0%, #000000 100%);opacity:0.8;filter:alpha(opacity=80);",
                        ".syndicatedItem .video-label-box": "height:auto;",
                        ".logoDiv a span": "font-size:11.0px;color:#ffffff;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "background:transparent;height:auto;",
                        ".trc_header_left_column": "height:auto;background-color:transparent;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.videoCube.thumbnail_under .tbl-text-over', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_left_column', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-b": {
                    "header": "MORE STORIES",
                    "detail-order": "title,category,published-date",
                    "list-suffix": function(itemsContainer, data) {
                        if (TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
                            for (var i = 0; i < data.boxes.length; i++) {
                                data.boxes[i].style.height = 'auto';
                                if ((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                                    var clearDiv = document.createElement('div');
                                    clearDiv.style.clear = 'both';
                                    clearDiv.style.width = '100%';
                                    itemsContainer.insertBefore(clearDiv, data.boxes[i]);
                                }
                            }
                        }
                        for (i = 0; i < data.boxes.length; i++) {
                            data.boxes[i].className += ' item_' + (i + 1);
                            ///change date
                            var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date']) * 1000);
                            var trc_elm = itemsContainer.childNodes[i].childNodes[1];
                            var elems = trc_elm.getElementsByTagName('*'),
                                i;
                            var a;
                            for (a in elems) {
                                if ((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
                                    elems[a].innerHTML = timeSince(date) + ' ago';
                                }

                                function timeSince(date) {
                                    var seconds = Math.floor((new Date() - date) / 1000);
                                    var interval = Math.floor(seconds / 31536000);
                                    if (interval > 1) {
                                        return interval + ' years';
                                    }
                                    interval = Math.floor(seconds / 2592000);
                                    if (interval > 1) {
                                        return interval + ' months';
                                    }
                                    interval = Math.floor(seconds / 86400);
                                    if (interval > 1) {
                                        return interval + ' days';
                                    }
                                    interval = Math.floor(seconds / 3600);
                                    if (interval > 1) {
                                        return interval + ' hours';
                                    }
                                    interval = Math.floor(seconds / 60);
                                    if (interval > 1) {
                                        return interval + ' minutes';
                                    }
                                    return Math.floor(seconds) + ' seconds';
                                }
                            }
                            var publish_date = data.response.trc['video-list'].video[i]['published-date'];
                            var category = data.response.trc['video-list'].video[i]['category'];
                            var branding = data.response.trc['video-list'].video[i]['branding-text'];
                            var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
                            /*   if ((publish_date && category)  && (!data.response.trc['video-list'].video[i]['is-syndicated']) && (!data.response.trc['video-list'].video[i]['branding-text'])){
                                       //item has both publish date and category
                                       var spacer = document.createElement('em');
                                       spacer.innerHTML = ' | ';
                                       itemsContainer.childNodes[i].childNodes[1].firstChild.insertBefore(spacer,itemsContainer.childNodes[i].childNodes[1].firstChild.childNodes[2]);
                               }*/
                        }
                        var brandingMapping = {
                            'reporternews.com': 'Abilene Reporter-News',
                            'alamogordonews.com': 'Alamogordo Daily News',
                            'thetowntalk.com': 'The Town Talk',
                            'independentmail.com': 'Anderson Independent-Mail',
                            'postcrescent.com': 'The Post-Crescent',
                            'app.com': 'Asbury Park Press',
                            'citizen-times.com': 'Asheville Citizen-Times',
                            'battlecreekenquirer.com': 'Battle Creek Enquirer',
                            'northjersey.com': 'The Record / Herald News',
                            'pressconnects.com': 'Press & Sun-Bulletin',
                            'kitsapsun.com': 'Kitsap Sun',
                            'floridatoday.com': 'Florida Today',
                            'mycentraljersey.com': 'Courier News / Home News Tribune',
                            'bucyrustelegraphforum.com': 'Telegraph-Forum',
                            'burlingtonfreepress.com': 'The Burlington Free Press',
                            'currentargus.com': 'Carlsbad Current-Argus',
                            'publicopiniononline.com': 'Chambersburg Public Opinion',
                            'courierpostonline.com': 'Courier-Post',
                            'chillicothegazette.com': 'Chillicothe Gazette',
                            'cincinnati.com': 'Cincinnati Enquirer',
                            'theleafchronicle.com': 'The Leaf-Chronicle',
                            'caller.com': 'Corpus Christi Caller-Times',
                            'coshoctontribune.com': 'Coshocton Tribune',
                            'demingheadlight.com': 'Deming Headlight',
                            'desmoinesregister.com': 'The Des Moines Register',
                            'freep.com': 'Detroit Free Press',
                            'detroitnews.com': 'The Detroit News',
                            'elpasotimes.com': 'El Paso Times',
                            'stargazette.com': 'Star-Gazette',
                            'courierpress.com': 'Evansville Courier & Press',
                            'daily-times.com': 'The Daily Times',
                            'fdlreporter.com': 'The Reporter',
                            'coloradoan.com': 'Fort Collins Coloradoan',
                            'news-press.com': 'The News-Press',
                            'thenews-messenger.com': 'The News-Messenger',
                            'greatfallstribune.com': 'Great Falls Tribune',
                            'greenbaypressgazette.com': 'Green Bay Press-Gazette',
                            'greenvilleonline.com': 'The Greenville News',
                            'guampdn.com': 'Pacific Daily News',
                            'eveningsun.com': 'The Evening Sun',
                            'hattiesburgamerican.com': 'Hattiesburg American',
                            'thegleaner.com': 'The Gleaner',
                            'indystar.com': 'The Indianapolis Star',
                            'press-citizen.com': 'Iowa City Press-Citizen',
                            'ithacajournal.com': 'The Ithaca Journal',
                            'clarionledger.com': 'The Clarion-Ledger',
                            'jacksonsun.com': 'The Jackson Sun',
                            'knoxnews.com': 'Knoxville News Sentinel',
                            'jconline.com': 'Lafayette Journal and Courier',
                            'theadvertiser.com': 'The Daily Advertiser',
                            'lancastereaglegazette.com': 'Lancaster Eagle-Gazette',
                            'lansingstatejournal.com': 'Lansing State Journal',
                            'lcsun-news.com': 'Las Cruces Sun-News',
                            'ldnews.com': 'Lebanon Daily News',
                            'livingstondaily.com': 'Livingston Daily Press  & Argus',
                            'hometownlife.com': 'O&E Media',
                            'courier-journal.com': 'The Courier-Journal',
                            'htrnews.com': 'Herald Times Reporter',
                            'mansfieldnewsjournal.com': 'Mansfield News Journal',
                            'marionstar.com': 'The Marion Star',
                            'marshfieldnewsherald.com': 'Marshfield News Herald',
                            'commercialappeal.com': 'The Commercial Appeal',
                            'jsonline.com': 'Milwaukee Journal Sentinel',
                            'thenewsstar.com': 'The News-Star',
                            'montgomeryadvertiser.com': 'The Montgomery Advertiser',
                            'dailyrecord.com': 'Daily Record',
                            'baxterbulletin.com': 'The Baxter Bulletin',
                            'thestarpress.com': 'The Star Press',
                            'dnj.com': 'The Daily News Journal',
                            'naplesnews.com': 'Naples Daily News',
                            'tennessean.com': 'The Tennessean',
                            'newarkadvocate.com': 'The Advocate',
                            'dailyworld.com': 'Daily World',
                            'thenorthwestern.com': 'Oshkosh Northwestern',
                            'desertsun.com': 'The Desert Sun',
                            'pnj.com': 'Pensacola News Journal',
                            'azcentral.com': 'The Arizona Republic',
                            'portclintonnewsherald.com': 'News Herald',
                            'thetimesherald.com': 'Times Herald',
                            'tcpalm.com': 'St. Lucie News Tribune / The Stuart News / Indian River Press Journal',
                            'poughkeepsiejournal.com': 'Poughkeepsie Journal',
                            'redding.com': 'Redding Searchlight ',
                            'rgj.com': 'Reno Gazette-Journal',
                            'pal-item.com': 'Palladium-Item',
                            'democratandchronicle.com': 'Democrat & Chronicle',
                            'ruidosonews.com': 'Ruidoso News',
                            'statesmanjournal.com': 'Statesman Journal',
                            'thecalifornian.com': 'The Salinas Californian',
                            'delmarvanow.com': 'The Daily Times',
                            'gosanangelo.com': 'San Angelo Standard-Times',
                            'sheboyganpress.com': 'The Sheboygan Press',
                            'shreveporttimes.com': 'The Times',
                            'scsun-news.com': 'Silver City Sun-News',
                            'argusleader.com': 'Argus Leader',
                            'news-leader.com': 'Springfield News-Leader',
                            'sctimes.com': 'St. Cloud Times',
                            'thespectrum.com': 'The Spectrum',
                            'newsleader.com': 'The News Leader',
                            'stevenspointjournal.com': 'Stevens Point Journal',
                            'tallahassee.com': 'Tallahassee Democrat',
                            'vcstar.com': 'Ventura County Star',
                            'thedailyjournal.com': 'The Daily Journal',
                            'visaliatimesdelta.com': 'Visalia Times-Delta',
                            'wausaudailyherald.com': 'Wausau Daily Herald',
                            'lohud.com': 'The Journal News',
                            'timesrecordnews.com': 'Wichita Falls Times Record News',
                            'delawareonline.com': 'The News Journal',
                            'wisconsinrapidstribune.com': 'The Daily Tribune',
                            'ydr.com': 'York Daily Record',
                            'yorkdispatch.com': 'The York Dispatch',
                            'zanesvilletimesrecorder.com': 'Times Recorder',
                            'blackmountainnews.com': 'Black Mountain News',
                            'centralfloridafuture.com': 'Central Florida Future',
                            'desmoinesregister.com': 'Altoona Record-Herald',
                            'dmjuice.com': 'DM Juice',
                            'hawkcentral.com': 'Hawk Central',
                            'desmoinesregister.com': 'Indianola Record',
                            'elpasoymas.com': 'El Paso y Mas',
                            'packersnews.com': 'Packers News',
                            'upstateparent.com': 'Upstate Parent',
                            'brookfield-elmgrovenow.com': 'Brookfield',
                            'greenfield-westallisnow.com': 'Greenfield',
                            'lakecountrynow.com': 'Lake Country',
                            'metroparentmagazine.com': 'Metro Parent Magazine',
                            'muskego-newberlinnow.com': 'Muskego',
                            'mynorthshorenow.com': 'North Shorre',
                            'mynorthwestnow.com': 'Northwest',
                            'myozaukeenow.com': 'Ozaukee',
                            'mysouthnow.com': 'South',
                            'mysouthshorenow.com': 'South Shore',
                            'waukeshanow.com': 'Waukesha',
                            'wauwatosanow.com': 'Wauwatosa',
                            'wisfarmer.com': 'Wisconsin State Farmer',
                            'marcoislandflorida.com': 'Marco Island',
                            'centralohio.com': 'Central Ohio',
                            'farmersadvance.com': 'Farmers Advance',
                            'lavozarizona.com': 'La Voz',
                            'reno.com': 'Reno.com',
                            'elsoldesalinas.com': 'El Sol',
                            'argusleader.com': 'Brandon',
                            'argusleader.com': 'Dell Rapids',
                            'fsunews.com': 'FSU News',
                            'thehammontonnews.com': 'Hammonton News',
                            'delawarebeaches.com': 'Delaware Beaches',
                            'gametimepa.com': 'GameTimePA'
                        }
                        var ss;
                        if (window.location.ancestorOrigins.length == 0) {
                            ss = window.location.host.substr(4, window.top.location.host.length);
                        } else {
                            var rr = window.location.ancestorOrigins;
                            for (var x = 0; x < rr.length; x++) {
                                if (rr[x].indexOf('amp') >= 0 && rr[x].indexOf('com') >= 0) {
                                    ss = rr[x].substr(8, rr[x].indexOf('cdn') - 9).split('-');
                                    ss.shift();
                                    ss = ss.join('.');
                                }
                            }
                        }
                        if (TRCImpl['trc-network-mapping'][ss] == TRC.publisherId && brandingMapping[ss]) {
                            for (var x = 0; x < document.querySelectorAll('.organic-thumbnails-b .video-category').length; x++) {
                                document.querySelectorAll('.organic-thumbnails-b .video-category')[x].innerText = brandingMapping[ss] + ' ';
                            }
                        }
                    },
                    "item-data-filter": function(data) {
                        if (!data.category) {
                            data.category = 'USA TODAY';
                        }
                        if (data.category) {
                            var categoryList = window.TRC.categoryList;
                            var data_category_list = data.category.split(';');
                            var hight_prioraty_category;
                            for (var i = 0; i < data_category_list.length; i++) {
                                var category = data_category_list[i];
                                var category_list = (category.split('//')) ? category.split('//') : category;
                                category = category_list[category_list.length - 1];
                                if (categoryList[category])
                                    hight_prioraty_category = (!hight_prioraty_category) ? category : ((categoryList[hight_prioraty_category]['index'] > categoryList[category]['index']) ? category : hight_prioraty_category);
                            }
                            hight_prioraty_category = (hight_prioraty_category) ? hight_prioraty_category : data_category_list[0];
                            if (!categoryList[hight_prioraty_category])
                                data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                }).replace(/People/g, 'Life');
                            else
                                data.category = (categoryList[hight_prioraty_category]['name']) ? categoryList[hight_prioraty_category]['name'] : ((0 <= categoryList[hight_prioraty_category]['index'] < 11) ? hight_prioraty_category.toUpperCase() : (hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                })));
                        }
                        return data;
                    },
                    "widget-creator-revision": "7680361",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 6,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;max-height:88.0px;*height:88.0px;color:#333;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:helvetica, arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'futura today', helvetica, Symbol, arial, sans-serif;font-size:19.0px;font-weight:normal;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 15px 0;line-height:1.2em;display:inline-block;position:relative;height:auto;width:100%;_width:100%;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0 0 20px 0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",
                        ".video-label-box": "text-align:left;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:#333;font-family:helvetica, arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:normal;text-decoration:none;font-family:helvetica, arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".videoCube.thumbnail_start .thumbBlock_holder": "width:30%;_width:30%;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:none;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed": {
                    "detail-order": "description",
                    "detail-order-syndicated": "description",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 480,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }, {
                        "minWidth": 481,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }],
                    "before-detail-order": "title",
                    "before-detail-order-syndicated": "title,branding",
                    "title-icon": "PUBLISHER_LOGO",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;max-height:54.0px;*height:54.0px;color:#000000;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;max-height:44.0px;*height:44.0px;color:black;text-decoration:none;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:none;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:44px;margin:5px 5px 0px 5px;",
                        ".syndicatedItem .video-description": "max-height:44.0px;*height:44.0px;color:black;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;font-weight:normal;line-height:22.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:27.0px;*height:27.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".video-icon-img": "margin:0px 5px 0px 5px;height:30.0px;",
                        ".video-label-box.trc-pre-label": "height:54px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:54px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:5px 0px 7px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".syndicatedItem .video-label-box": "height:44px;margin:5px 5px 0px 5px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;"
                    }
                },
                "organic-thumbnails-feed-2x1": {
                    "header": "More Stories",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }

                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 2,
                        "virtualThumbWidth": 155,
                        "virtualThumbHeight": 88
                    }],
                    "__style__": {
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 22px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:10px;font-weight:normal;text-decoration:none;color:#666666;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#666666;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-desktop-03": {
                    "header": "Recommended",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }

                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        try {
                            if (data.category == null) {
                                data.category = 'News';
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "detail-order-syndicated": "title,description",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 1,
                        "virtualThumbWidth": 430,
                        "virtualThumbHeight": 241.2
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:18.0px;font-weight:bold;max-height:120.0px;*height:120.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 12px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#303030;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:16.0px;line-height:18.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 4px 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-desktop-03-sb": {
                    "header": "Recommended",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }

                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        try {
                            if (data.category == null) {
                                data.category = 'News';
                            }
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "detail-order-syndicated": "title,description",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 1,
                        "virtualThumbWidth": 430,
                        "virtualThumbHeight": 241.2
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:18.0px;font-weight:bold;max-height:120.0px;*height:120.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 12px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#303030;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:16.0px;line-height:18.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 4px 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-gallery": {
                    "header": "Featured Gallery",
                    "detail-order": "title,category,external-data,uploader",
                    "item-renderer": function(box, data) {
                        var uploaderElm = box.getElementsByClassName('video-uploader')[0],
                            playDivContainer = document.createElement('span'),
                            playImg = document.createElement('img');
                        if (uploaderElm) {
                            playDivContainer.className = 'play-div';
                            playDivContainer.appendChild(playImg);
                            playImg.src = 'http://cdn.taboola.com/static/5c/5c4c6a9b-4c65-42cd-8bb2-cf96dcacad19.svg';
                            uploaderElm.insertBefore(playDivContainer, uploaderElm.firstChild);
                        }
                    },
                    "format-uploader": '%s',
                    "item-data-filter": function(data) {
                        data.uploader = 'View Gallery';
                        if (data.category) {
                            data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data.category = 'News';
                        }
                        try {
                            var getTimeDifference = function(data) {
                                var fullPublishDate = new Date(1000 * data['published-date']),
                                    fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                                    articleMonth = fullPublishDate.getMonth(),
                                    articleDay = fullPublishDate.toString().split(' ')[2],
                                    articleYear = fullPublishDate.toString().split(' ')[3],
                                    articleTime = fullPublishDate.toString().split(' ')[4],
                                    articleHour = articleTime.split(':')[0],
                                    articleMinute = articleTime.split(':')[1],
                                    fullCurrentDate = new Date(),
                                    fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                                    currentMonth = fullCurrentDate.getMonth(),
                                    currentDay = fullCurrentDate.toString().split(' ')[2],
                                    currentYear = fullCurrentDate.toString().split(' ')[3],
                                    currentTime = fullCurrentDate.toString().split(' ')[4],
                                    currentHour = currentTime.split(':')[0],
                                    currentMinute = currentTime.split(':')[1],
                                    dayDiff,
                                    hourDiff,
                                    monthDifference,
                                    previousMonthTotalDays,
                                    output;
                                if (currentMonth == articleMonth) {
                                    if (currentDay == articleDay) {
                                        hourDiff = currentHour - articleHour;
                                        if (hourDiff == 0) {
                                            output = +hourDiff + ' minutes ago';
                                        } else if (hourDiff == 1) {
                                            output = +hourDiff + ' hour ago';
                                        } else {
                                            output = +hourDiff + ' hours ago';
                                        }
                                        return output;
                                    } else {
                                        dayDiff = +currentDay - +articleDay;
                                        if (dayDiff == 1) {
                                            output = 'Yesterday';
                                        } else {
                                            output = +dayDiff + ' days ago';
                                        }
                                        return output;
                                    }
                                } else {
                                    previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                                    monthDifference = +currentMonth - +articleMonth;
                                    currentDay = +currentDay + (+previousMonthTotalDays * monthDifference);
                                    dayDiff = +currentDay - +articleDay;
                                    if (dayDiff == 1) {
                                        output = 'Yesterday';
                                    } else {
                                        output = +dayDiff + ' days ago';
                                    }
                                    return output;
                                }
                            }
                            data['external-data'] = ' | ' + getTimeDifference(data);
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20px;line-height:24px;font-weight:600!important;max-height:72px;*height:72px;color:#212121;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:15px 0px 14px 0px;line-height:1.2em;display:block;margin:0;position:relative;background-color:#fafafa;box-sizing:border-box;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:12px;font-weight:normal;text-decoration:none;color:rgba(0,0,0,0.60);font-family:'Unify Sans',Helvetica,Arial,sans-serif;text-transform:capitalize;",
                        ".video-uploader": "font-size:12px;font-weight:normal;text-decoration:none;color:black;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 0 0 !important;",
                        ".video-label-box": "text-align:left;height:128px;margin:16px 0 0 0;",
                        ".video-external-data": "font-size:12px;font-weight:normal;text-decoration:none;color:rgba(0,0,0,0.60);font-family:'Unify Sans',Helvetica,Arial,sans-serif;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#212121;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:32.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".syndicatedItem .video-label-box": "height:128px;margin:5px 0 0 0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 8px 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".thumbBlock_holder": "width:66%;_width:66%;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:3px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.thumbBlock_holder', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-gallery-mobile": {
                    "header": "Featured Gallery",
                    "detail-order": "uploader,title,category,external-data",
                    "item-renderer": function(box, data) {
                        var uploaderElm = box.getElementsByClassName('video-uploader')[0],
                            playDivContainer = document.createElement('span'),
                            playImg = document.createElement('img');
                        if (uploaderElm) {
                            playDivContainer.className = 'play-div';
                            playDivContainer.appendChild(playImg);
                            playImg.src = 'http://cdn.taboola.com/static/5c/5c4c6a9b-4c65-42cd-8bb2-cf96dcacad19.svg';
                            uploaderElm.insertBefore(playDivContainer, uploaderElm.firstChild);
                        }
                    },
                    "format-uploader": '%s',
                    "item-data-filter": function(data) {
                        data.uploader = 'View Gallery';
                        if (data.category) {
                            data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data.category = 'News';
                        }
                        try {
                            var getTimeDifference = function(data) {
                                var fullPublishDate = new Date(1000 * data['published-date']),
                                    fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                                    articleMonth = fullPublishDate.getMonth(),
                                    articleDay = fullPublishDate.toString().split(' ')[2],
                                    articleYear = fullPublishDate.toString().split(' ')[3],
                                    articleTime = fullPublishDate.toString().split(' ')[4],
                                    articleHour = articleTime.split(':')[0],
                                    articleMinute = articleTime.split(':')[1],
                                    fullCurrentDate = new Date(),
                                    fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                                    currentMonth = fullCurrentDate.getMonth(),
                                    currentDay = fullCurrentDate.toString().split(' ')[2],
                                    currentYear = fullCurrentDate.toString().split(' ')[3],
                                    currentTime = fullCurrentDate.toString().split(' ')[4],
                                    currentHour = currentTime.split(':')[0],
                                    currentMinute = currentTime.split(':')[1],
                                    dayDiff,
                                    hourDiff,
                                    monthDifference,
                                    previousMonthTotalDays,
                                    output;
                                if (currentMonth == articleMonth) {
                                    if (currentDay == articleDay) {
                                        hourDiff = currentHour - articleHour;
                                        if (hourDiff == 0) {
                                            output = +hourDiff + ' minutes ago';
                                        } else if (hourDiff == 1) {
                                            output = +hourDiff + ' hour ago';
                                        } else {
                                            output = +hourDiff + ' hours ago';
                                        }
                                        return output;
                                    } else {
                                        dayDiff = +currentDay - +articleDay;
                                        if (dayDiff == 1) {
                                            output = 'Yesterday';
                                        } else {
                                            output = +dayDiff + ' days ago';
                                        }
                                        return output;
                                    }
                                } else {
                                    previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                                    monthDifference = +currentMonth - +articleMonth;
                                    currentDay = +currentDay + (+previousMonthTotalDays * monthDifference);
                                    dayDiff = +currentDay - +articleDay;
                                    if (dayDiff == 1) {
                                        output = 'Yesterday';
                                    } else {
                                        output = +dayDiff + ' days ago';
                                    }
                                    return output;
                                }
                            }
                            data['external-data'] = ' | ' + getTimeDifference(data);
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20px;line-height:24px;font-weight:600!important;max-height:48px;*height:48px;color:#212121;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:25px 0px 14px 0px;line-height:1.2em;display:block;margin:0;position:relative;background-color:#f8f8f8;box-sizing:border-box;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:12px;font-weight:normal;text-decoration:none;color:#666;font-family:'Unify Sans',Helvetica,Arial,sans-serif;",
                        ".video-uploader": "font-size:12px;font-weight:normal;text-decoration:none;color:black;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 0 0 !important;",
                        ".video-label-box": "text-align:left;height:128px;margin:5px 0 0 0;",
                        ".video-external-data": "font-size:12px;font-weight:normal;text-decoration:none;color:#666;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:32.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".syndicatedItem .video-label-box": "height:128px;margin:5px 0 0 0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:4px 0 8px 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:3px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-mobile-b": {
                    "header": "Most Popular",
                    "detail-order": "title,category,external-data",
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category) {
                            data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data.category = 'News';
                        }
                        try {
                            var getTimeDifference = function(data) {
                                var fullPublishDate = new Date(1000 * data['published-date']),
                                    fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                                    articleMonth = fullPublishDate.getMonth(),
                                    articleDay = fullPublishDate.toString().split(' ')[2],
                                    articleYear = fullPublishDate.toString().split(' ')[3],
                                    articleTime = fullPublishDate.toString().split(' ')[4],
                                    articleHour = articleTime.split(':')[0],
                                    articleMinute = articleTime.split(':')[1],
                                    fullCurrentDate = new Date(),
                                    fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                                    currentMonth = fullCurrentDate.getMonth(),
                                    currentDay = fullCurrentDate.toString().split(' ')[2],
                                    currentYear = fullCurrentDate.toString().split(' ')[3],
                                    currentTime = fullCurrentDate.toString().split(' ')[4],
                                    currentHour = currentTime.split(':')[0],
                                    currentMinute = currentTime.split(':')[1],
                                    dayDiff,
                                    hourDiff,
                                    monthDifference,
                                    previousMonthTotalDays,
                                    output;
                                if (currentMonth == articleMonth) {
                                    if (currentDay == articleDay) {
                                        hourDiff = currentHour - articleHour;
                                        if (hourDiff == 0) {
                                            output = +hourDiff + ' minutes ago';
                                        } else if (hourDiff == 1) {
                                            output = +hourDiff + ' hour ago';
                                        } else {
                                            output = +hourDiff + ' hours ago';
                                        }
                                        return output;
                                    } else {
                                        dayDiff = +currentDay - +articleDay;
                                        if (dayDiff == 1) {
                                            output = 'Yesterday';
                                        } else {
                                            output = +dayDiff + ' days ago';
                                        }
                                        return output;
                                    }
                                } else {
                                    previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                                    monthDifference = +currentMonth - +articleMonth;
                                    currentDay = +currentDay + (+previousMonthTotalDays * monthDifference);
                                    dayDiff = +currentDay - +articleDay;
                                    if (dayDiff == 1) {
                                        output = 'Yesterday';
                                    } else {
                                        output = +dayDiff + ' days ago';
                                    }
                                    return output;
                                }
                            }
                            data['external-data'] = ' | ' + getTimeDifference(data);
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 3,
                        "cells": 1,
                        "virtualThumbWidth": 1,
                        "virtualThumbHeight": 1
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:600;max-height:66.0px;*height:66.0px;color:#212121;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:25px 0px 14px 0px;line-height:1.2em;display:block;margin:0;position:relative;background-color:#f8f8f8;box-sizing:border-box;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:12px;font-weight:normal;text-decoration:none;color:rgba(0,0,0,0.60);font-family:'Unify Sans',Helvetica,Arial,sans-serif;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 24px 0 !important;",
                        ".video-label-box": "text-align:left;height:auto;margin:0;",
                        ".video-external-data": "font-size:12px;font-weight:normal;text-decoration:none;color:#666;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".videoCube.thumbnail_start .thumbBlock_holder": "width:25%;_width:25%;margin:auto 5% auto auto;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:3px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-stream": {
                    "header": "Most Popular",
                    "detail-order": "title,category",
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category) {
                            data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data.category = 'News';
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 3,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:18px;line-height:22.0px;font-weight:600;max-height:44px;*height:44px;color:rgba(0,0,0,0.87);text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:15px 0px 14px 0px;line-height:1.2em;display:block;margin:0;position:relative;background-color:#fafafa;box-sizing:border-box;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:12px;font-weight:normal;text-decoration:none;color:rgba(0,0,0,0.60);font-family:'Unify Sans',Helvetica,Arial,sans-serif;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 0 0 !important;",
                        ".video-label-box": "text-align:left;height:auto;margin:0;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".videoCube.thumbnail_start .thumbBlock_holder": "width:25%;_width:25%;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:3px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-stream-03": {
                    "header": "More Local Stories",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }

                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 155,
                        "virtualThumbHeight": 88
                    }],
                    "__style__": {
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 22px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:10px;font-weight:normal;text-decoration:none;color:#626262;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-stream-03-plus": {
                    "header": "More Stories",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }

                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 155,
                        "virtualThumbHeight": 88
                    }],
                    "__style__": {
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 22px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-stream-03-sb": {
                    "header": "More Local Stories",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }

                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 155,
                        "virtualThumbHeight": 88
                    }],
                    "__style__": {
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 22px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:10px;font-weight:normal;text-decoration:none;color:#626262;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-stream-04": {
                    "detail-order": "title,category",
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 155,
                        "virtualThumbHeight": 88
                    }],
                    "__style__": {
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 22px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-stream-04-plus": {
                    "header": "Recommended",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }

                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 155,
                        "virtualThumbHeight": 88
                    }],
                    "__style__": {
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 22px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:10px;font-weight:normal;text-decoration:none;color:#666666;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-stream-04-plus-m": {
                    "header": "Recommended",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }
                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category) {
                            data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data.category = 'News';
                        }
                        try {

                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 3,
                        "cells": 1,
                        "virtualThumbWidth": 1,
                        "virtualThumbHeight": 1
                    }],
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:18.0px;font-weight:bold;max-height:55.0px;*height:55.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans';font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 12px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:12px;font-weight:normal;text-decoration:none;color:#626262;font-family:'Unify Sans';text-transform:uppercase;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".videoCube .thumbBlock": "border-width:0px;border-color:darkgray;width:108%;_width:108%;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:#303030;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#626262;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".videoCube.thumbnail_start .thumbBlock_holder": "width:25%;_width:25%;",
                        ".branding": "color:#626262;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;margin:0 0 0 0;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;font-size:inherit;",
                        ".trc_rbox_header_span .trc_header_right_column": "background:transparent;height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-description', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-stream-05": {
                    "header": "More Local Stories",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }

                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 3,
                        "cells": 1,
                        "virtualThumbWidth": 155,
                        "virtualThumbHeight": 88
                    }],
                    "__style__": {
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 22px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-stream-05-plus": {
                    "header": "More Stories",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }

                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 3,
                        "cells": 1,
                        "virtualThumbWidth": 155,
                        "virtualThumbHeight": 88
                    }],
                    "__style__": {
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 22px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-stream-05-sb": {
                    "header": "More Local Stories",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }

                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category == null) {
                            data.category = 'News';
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 3,
                        "cells": 1,
                        "virtualThumbWidth": 155,
                        "virtualThumbHeight": 88
                    }],
                    "__style__": {
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 22px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-videos": {
                    "header": "Featured Video",
                    "detail-order": "title,category,external-data,uploader",
                    "item-renderer": function(box, data) {
                        var uploaderElm = box.getElementsByClassName('video-uploader')[0],
                            playDivContainer = document.createElement('span'),
                            playImg = document.createElement('img');
                        if (uploaderElm) {
                            playDivContainer.className = 'play-div';
                            playDivContainer.appendChild(playImg);
                            playImg.src = 'http://cdn.taboola.com/static/e5/e5e3b639-cb5f-45eb-8f6e-8073e4c31dac.png';
                            uploaderElm.insertBefore(playDivContainer, uploaderElm.firstChild);
                        }
                    },
                    "format-uploader": '%s',
                    "item-data-filter": function(data) {
                        if (data.duration) {
                            var time = data.duration,
                                minutes = Math.floor(time / 60),
                                seconds = (time - minutes * 60).toString(),
                                hours = Math.floor(time / 3600);
                            if (seconds.length == 1) {
                                seconds = '0' + seconds;
                            }
                            // data.uploader = 'Play | 0' + minutes + ':' + seconds;
                        }
                        if (data.category) {
                            data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data.category = 'News';
                        }
                        try {
                            var getTimeDifference = function(data) {
                                var fullPublishDate = new Date(1000 * data['published-date']),
                                    fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                                    articleMonth = fullPublishDate.getMonth(),
                                    articleDay = fullPublishDate.toString().split(' ')[2],
                                    articleYear = fullPublishDate.toString().split(' ')[3],
                                    articleTime = fullPublishDate.toString().split(' ')[4],
                                    articleHour = articleTime.split(':')[0],
                                    articleMinute = articleTime.split(':')[1],
                                    fullCurrentDate = new Date(),
                                    fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                                    currentMonth = fullCurrentDate.getMonth(),
                                    currentDay = fullCurrentDate.toString().split(' ')[2],
                                    currentYear = fullCurrentDate.toString().split(' ')[3],
                                    currentTime = fullCurrentDate.toString().split(' ')[4],
                                    currentHour = currentTime.split(':')[0],
                                    currentMinute = currentTime.split(':')[1],
                                    dayDiff,
                                    hourDiff,
                                    monthDifference,
                                    previousMonthTotalDays,
                                    output;
                                if (currentMonth == articleMonth) {
                                    if (currentDay == articleDay) {
                                        hourDiff = currentHour - articleHour;
                                        if (hourDiff == 0) {
                                            output = +hourDiff + ' minutes ago';
                                        } else if (hourDiff == 1) {
                                            output = +hourDiff + ' hour ago';
                                        } else {
                                            output = +hourDiff + ' hours ago';
                                        }
                                        return output;
                                    } else {
                                        dayDiff = +currentDay - +articleDay;
                                        if (dayDiff == 1) {
                                            output = 'Yesterday';
                                        } else {
                                            output = +dayDiff + ' days ago';
                                        }
                                        return output;
                                    }
                                } else {
                                    previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                                    monthDifference = +currentMonth - +articleMonth;
                                    currentDay = +currentDay + (+previousMonthTotalDays * monthDifference);
                                    dayDiff = +currentDay - +articleDay;
                                    if (dayDiff == 1) {
                                        output = 'Yesterday';
                                    } else {
                                        output = +dayDiff + ' days ago';
                                    }
                                    return output;
                                }
                            }
                            data['external-data'] = ' | ' + getTimeDifference(data);
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20px;line-height:24px;font-weight:600!important;max-height:72px;*height:72px;color:#212121;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:15px 0px 14px 0px;line-height:1.2em;display:block;margin:0;position:relative;background-color:#fafafa;box-sizing:border-box;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:12px;font-weight:normal;text-decoration:none;color:rgba(0,0,0,0.60);font-family:'Unify Sans',Helvetica,Arial,sans-serif;text-transform:capitalize;",
                        ".video-uploader": "font-size:12px;font-weight:normal;text-decoration:none;color:black;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 0 0 !important;",
                        ".video-label-box": "text-align:left;height:128px;margin:16px 0 0 0;",
                        ".video-external-data": "font-size:12px;font-weight:normal;text-decoration:none;color:rgba(0,0,0,0.60);font-family:'Unify Sans',Helvetica,Arial,sans-serif;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#212121;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:32.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".syndicatedItem .video-label-box": "height:128px;margin:16px 0 0 0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 8px 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".thumbBlock_holder": "width:66%;_width:66%;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:3px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.thumbBlock_holder', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-feed-videos-mobile": {
                    "header": "Featured Video",
                    "detail-order": "uploader,title,category,external-data",
                    "item-renderer": function(box, data) {
                        var uploaderElm = box.getElementsByClassName('video-uploader')[0],
                            playDivContainer = document.createElement('span'),
                            playImg = document.createElement('img');
                        if (uploaderElm) {
                            playDivContainer.className = 'play-div';
                            playDivContainer.appendChild(playImg);
                            playImg.src = 'http://cdn.taboola.com/static/e5/e5e3b639-cb5f-45eb-8f6e-8073e4c31dac.png';
                            uploaderElm.insertBefore(playDivContainer, uploaderElm.firstChild);
                        }
                    },
                    "format-uploader": '%s',
                    "item-data-filter": function(data) {
                        if (data.duration) {
                            var time = data.duration,
                                minutes = Math.floor(time / 60),
                                seconds = (time - minutes * 60).toString(),
                                hours = Math.floor(time / 3600);
                            if (seconds.length == 1) {
                                seconds = '0' + seconds;
                            }
                            // data.uploader = 'Play | 0' + minutes + ':' + seconds;
                        }
                        if (data.category) {
                            data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data.category = 'News';
                        }
                        try {
                            var getTimeDifference = function(data) {
                                var fullPublishDate = new Date(1000 * data['published-date']),
                                    fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                                    articleMonth = fullPublishDate.getMonth(),
                                    articleDay = fullPublishDate.toString().split(' ')[2],
                                    articleYear = fullPublishDate.toString().split(' ')[3],
                                    articleTime = fullPublishDate.toString().split(' ')[4],
                                    articleHour = articleTime.split(':')[0],
                                    articleMinute = articleTime.split(':')[1],
                                    fullCurrentDate = new Date(),
                                    fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                                    currentMonth = fullCurrentDate.getMonth(),
                                    currentDay = fullCurrentDate.toString().split(' ')[2],
                                    currentYear = fullCurrentDate.toString().split(' ')[3],
                                    currentTime = fullCurrentDate.toString().split(' ')[4],
                                    currentHour = currentTime.split(':')[0],
                                    currentMinute = currentTime.split(':')[1],
                                    dayDiff,
                                    hourDiff,
                                    monthDifference,
                                    previousMonthTotalDays,
                                    output;
                                if (currentMonth == articleMonth) {
                                    if (currentDay == articleDay) {
                                        hourDiff = currentHour - articleHour;
                                        if (hourDiff == 0) {
                                            output = +hourDiff + ' minutes ago';
                                        } else if (hourDiff == 1) {
                                            output = +hourDiff + ' hour ago';
                                        } else {
                                            output = +hourDiff + ' hours ago';
                                        }
                                        return output;
                                    } else {
                                        dayDiff = +currentDay - +articleDay;
                                        if (dayDiff == 1) {
                                            output = 'Yesterday';
                                        } else {
                                            output = +dayDiff + ' days ago';
                                        }
                                        return output;
                                    }
                                } else {
                                    previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                                    monthDifference = +currentMonth - +articleMonth;
                                    currentDay = +currentDay + (+previousMonthTotalDays * monthDifference);
                                    dayDiff = +currentDay - +articleDay;
                                    if (dayDiff == 1) {
                                        output = 'Yesterday';
                                    } else {
                                        output = +dayDiff + ' days ago';
                                    }
                                    return output;
                                }
                            }
                            data['external-data'] = ' | ' + getTimeDifference(data);
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20px;line-height:24px;font-weight:600!important;max-height:48px;*height:48px;color:#212121;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:25px 0px 14px 0px;line-height:1.2em;display:block;margin:0;position:relative;background-color:#f8f8f8;box-sizing:border-box;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:12px;font-weight:normal;text-decoration:none;color:#666;font-family:'Unify Sans',Helvetica,Arial,sans-serif;",
                        ".video-uploader": "font-size:12px;font-weight:normal;text-decoration:none;color:black;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 0 0 !important;",
                        ".video-label-box": "text-align:left;height:128px;margin:5px 0 0 0;",
                        ".video-external-data": "font-size:12px;font-weight:normal;text-decoration:none;color:#666;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:32.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".syndicatedItem .video-label-box": "height:128px;margin:5px 0 0 0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:4px 0 8px 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:3px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-rr": {
                    "header": ".",
                    "thumbnail-position": "start",
                    "attribution-position": "top",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 3,
                        "cells": 1,
                        "virtualThumbWidth": 7,
                        "virtualThumbHeight": 5
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:#333;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:arial, sans-serif;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#fff;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".video-label-box": "text-align:left;height:auto;margin:0;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:#333;font-family:arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:arial, sans-serif;background-image:null;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0;",
                        ".logoDiv a span": "font-size:11.0px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-rr-stream": {
                    "header": "More Stories",
                    "detail-order": "title,category",
                    "thumbnail-position": "start",
                    "attribution-position": "bottom",
                    "attribution-text": " ",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 3,
                        "cells": 1,
                        "virtualThumbWidth": 3,
                        "virtualThumbHeight": 2
                    }],
                    "disclosure-position": "after_branding",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:76.0px;*height:76.0px;color:#000000;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:24px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:25px;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:27px;width:auto;_width:auto;",
                        ".video-category": "font-size:12px;font-weight:normal;text-decoration:none;color:#626262;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;text-transform:uppercase;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:57.0px;*height:57.0px;color:#000000;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".branding": "color:#626262;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:19.0px;margin:0px 0px 0px 33%;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#154c91;display:inline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".videoCube:hover .video-label-box .video-description": "color:#000000;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.videoCube:hover .video-label-box .video-description', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-rr-stream-photo": {
                    "header": "More Galleries",
                    "detail-order": "title,category",
                    "thumbnail-position": "start",
                    "attribution-position": "bottom",
                    "attribution-text": " ",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 3,
                        "cells": 1,
                        "virtualThumbWidth": 3,
                        "virtualThumbHeight": 2
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:76.0px;*height:76.0px;color:#000000;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:24px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:25px;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:27px;width:auto;_width:auto;",
                        ".video-category": "font-size:12px;font-weight:normal;text-decoration:none;color:#626262;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;text-transform:uppercase;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:57.0px;*height:57.0px;color:#000000;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#154c91;display:inline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".videoCube:hover .video-label-box .video-description": "color:#000000;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.videoCube:hover .video-label-box .video-description', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbnails-rr-stream-video": {
                    "header": "More Videos",
                    "detail-order": "title,category",
                    "thumbnail-position": "start",
                    "attribution-position": "bottom",
                    "attribution-text": " ",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 3,
                        "cells": 1,
                        "virtualThumbWidth": 3,
                        "virtualThumbHeight": 2
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:76.0px;*height:76.0px;color:#000000;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:24px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:25px;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:27px;width:auto;_width:auto;",
                        ".video-category": "font-size:12px;font-weight:normal;text-decoration:none;color:#626262;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;text-transform:uppercase;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:57.0px;*height:57.0px;color:#000000;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#154c91;display:inline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".videoCube:hover .video-label-box .video-description": "color:#000000;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.videoCube:hover .video-label-box .video-description', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbs-feed-01": {
                    "detail-order": "title,description,branding",
                    "detail-order-syndicated": "title,description,branding",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 480,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }, {
                        "minWidth": 481,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;max-height:54.0px;*height:54.0px;color:#000000;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;max-height:44.0px;*height:44.0px;color:black;text-decoration:none;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:none;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:125px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:44.0px;*height:44.0px;color:black;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;font-weight:normal;line-height:22.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:54.0px;*height:54.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 0px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".syndicatedItem .video-label-box": "height:125px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;"
                    }
                },
                "organic-thumbs-feed-01-a-bpcv": {
                    "navigation-type": "scrolling",
                    "detail-order": "title,branding",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 1.5,
                            "h": 1.5
                        },
                        "rows": 1,
                        "cells": 4,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }],
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:rgba(0,0,0,0.87);text-decoration:none;",
                        ".video-description": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:rgba(0,0,0,0.87);text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:5px 0px 2px 0px;line-height:1.2em;display:none;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:96px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:72.0px;*height:72.0px;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 0px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:24.0px;",
                        ".syndicatedItem .video-label-box": "height:96px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;"
                    }
                },
                "organic-thumbs-feed-01-b-em": {
                    "detail-order": "title,description,branding",
                    "detail-order-syndicated": "title,description,branding",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 3,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }],
                    "disclosure-link-text-sponsored": "Sponsored",
                    "disclosure-position": "after_branding",
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;max-height:44.0px;*height:44.0px;color:#000000;text-decoration:none;margin:0 0 0 0;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:20.0px;font-weight:normal;max-height:40.0px;*height:40.0px;color:#000000;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".video-label-box": "text-align:left;height:106px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:40.0px;*height:40.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:14.0px;font-weight:normal;line-height:20.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 0px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:106px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#999999;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-title', '.videoCube:hover .video-label-box .video-description', '.video-label-box .branding', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_left_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbs-feed-01-bpcv": {
                    "detail-order": "title,description,branding",
                    "detail-order-syndicated": "title,description,branding",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 480,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }, {
                        "minWidth": 481,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }],
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;max-height:54.0px;*height:54.0px;color:rgba(0,0,0,0.87);text-decoration:none;",
                        ".video-description": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;max-height:44.0px;*height:44.0px;color:rgba(0,0,0,0.87);text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:none;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:125px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:44.0px;*height:44.0px;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:normal;line-height:22.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:54.0px;*height:54.0px;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 0px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".syndicatedItem .video-label-box": "height:125px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;"
                    }
                },
                "organic-thumbs-feed-01-bpcv-mp": {
                    "detail-order": "title,branding",
                    "organic-show-static-text": true,
                    "widget-theme-type": "MOST_POPULAR",
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:#212121;text-decoration:none;",
                        ".video-description": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:#212121;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".video-label-box": "text-align:left;height:96px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:#212121;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:72.0px;*height:72.0px;color:#212121;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 0px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:24.0px;",
                        ".videoCube .thumbBlock .static-text": "font-weight:normal;font-family:Arial, Helvetica, sans-serif;text-decoration:none;font-size:11.0px;background-color:#a30202;display:block;color:#ffffff;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:96px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_rbox_header .trc_header_ext', '.videoCube a', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_left_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbs-feed-01-c": {
                    "detail-order": "title,branding",
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:#000000;text-decoration:none;",
                        ".video-label-box": "text-align:left;height:96px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-title": "max-height:72.0px;*height:72.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 0px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:24.0px;",
                        ".syndicatedItem .video-label-box": "height:96px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;"
                    }
                },
                "organic-thumbs-feed-01-c-bpcv": {
                    "detail-order": "title,branding",
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:rgba(0,0,0,0.87);text-decoration:none;",
                        ".video-description": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:rgba(0,0,0,0.87);text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".video-label-box": "text-align:left;height:96px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:72.0px;*height:72.0px;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 0px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:24.0px;",
                        ".syndicatedItem .video-label-box": "height:96px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;"
                    }
                },
                "organic-thumbs-feed-01-mp": {
                    "detail-order": "title,branding",
                    "organic-show-static-text": true,
                    "widget-theme-type": "MOST_POPULAR",
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:#000000;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:#000000;text-decoration:none;",
                        ".video-label-box": "text-align:left;height:96px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:72.0px;*height:72.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 0px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:24.0px;",
                        ".videoCube .thumbBlock .static-text": "font-weight:normal;font-family:Arial, Helvetica, sans-serif;text-decoration:none;font-size:11.0px;background-color:#a30202;display:block;color:#ffffff;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:96px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;"
                    }
                },
                "organic-thumbs-feed-01-x": {
                    "detail-order": "title,description,branding",
                    "detail-order-syndicated": "title,description,branding",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 480,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }, {
                        "minWidth": 481,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }],
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;max-height:54.0px;*height:54.0px;color:#000000;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;max-height:44.0px;*height:44.0px;color:black;text-decoration:none;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:none;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:125px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:44.0px;*height:44.0px;color:black;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;font-weight:normal;line-height:22.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:54.0px;*height:54.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 0px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".syndicatedItem .video-label-box": "height:125px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;"
                    }
                },
                "organic-thumbs-feed-01-y-em": {
                    "detail-order": "title,branding",
                    "thumbnail-position": "start",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 2,
                        "virtualThumbWidth": 7,
                        "virtualThumbHeight": 5
                    }],
                    "disclosure-link-text-sponsored": "Sponsored",
                    "disclosure-position": "after_branding",
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:48.0px;*height:48.0px;color:#000000;text-decoration:none;margin:0 0 0 0;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:#000000;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 10px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:24.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#999999;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "background:transparent;height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-title', '.videoCube:hover .video-label-box .video-description', '.video-label-box .branding', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_left_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbs-feed-01-z": {
                    "detail-order": "",
                    "thumbnail-position": "start",
                    "detail-order-syndicated": "",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 7,
                        "virtualThumbHeight": 5
                    }],
                    "before-detail-order": "title,branding",
                    "before-detail-order-syndicated": "title,branding",
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:48.0px;*height:48.0px;color:#000000;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:none;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:24.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_left_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbs-feed-mobile-a": {
                    "header": "More Stories",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }

                    },
                    "format-uploader": '%s',
                    "detail-order-syndicated": "title,description,category",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 3,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "__style__": {
                        ".video-title": "font-family:'Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif !important;font-size:16.0px;line-height:18.0px;font-weight:bold;max-height:96px;*height:96px;color:#303030;text-decoration:none;padding:0 0 2px 0;margin:0 0 3px 0 !important;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#212121;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:23px 0px 9px 0px;line-height:1.2em;display:block;margin:0;position:relative;box-sizing:border-box;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:128px;margin:5px 0 0 0;",
                        ".video-external-data": "font-size:14px;font-weight:normal;text-decoration:none;color:rgba(0, 0, 0, 0.73);",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:32.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:128px;margin:5px 0 0 0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:3px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbs-feed-mobile-a-sb": {
                    "header": "More Stories",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }

                    },
                    "format-uploader": '%s',
                    "detail-order-syndicated": "title,description,category",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 3,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "__style__": {
                        ".video-title": "font-family:'Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif !important;font-size:16.0px;line-height:18.0px;font-weight:bold;max-height:96px;*height:96px;color:#303030;text-decoration:none;padding:0 0 2px 0;margin:0 0 3px 0 !important;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#212121;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:23px 0px 9px 0px;line-height:1.2em;display:block;margin:0;position:relative;box-sizing:border-box;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:128px;margin:5px 0 0 0;",
                        ".video-external-data": "font-size:14px;font-weight:normal;text-decoration:none;color:rgba(0, 0, 0, 0.73);",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:32.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:128px;margin:5px 0 0 0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:3px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbs-feed-mobile-b": {
                    "header": "More Local Stories",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }
                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category) {
                            data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data.category = 'News';
                        }
                        try {
                            var getTimeDifference = function(data) {
                                var fullPublishDate = new Date(1000 * data['published-date']),
                                    fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                                    articleMonth = fullPublishDate.getMonth(),
                                    articleDay = fullPublishDate.toString().split(' ')[2],
                                    articleYear = fullPublishDate.toString().split(' ')[3],
                                    articleTime = fullPublishDate.toString().split(' ')[4],
                                    articleHour = articleTime.split(':')[0],
                                    articleMinute = articleTime.split(':')[1],
                                    fullCurrentDate = new Date(),
                                    fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                                    currentMonth = fullCurrentDate.getMonth(),
                                    currentDay = fullCurrentDate.toString().split(' ')[2],
                                    currentYear = fullCurrentDate.toString().split(' ')[3],
                                    currentTime = fullCurrentDate.toString().split(' ')[4],
                                    currentHour = currentTime.split(':')[0],
                                    currentMinute = currentTime.split(':')[1],
                                    dayDiff,
                                    hourDiff,
                                    monthDifference,
                                    previousMonthTotalDays,
                                    output;
                                if (currentMonth == articleMonth) {
                                    if (currentDay == articleDay) {
                                        hourDiff = currentHour - articleHour;
                                        if (hourDiff == 0) {
                                            output = +hourDiff + ' minutes ago';
                                        } else if (hourDiff == 1) {
                                            output = +hourDiff + ' hour ago';
                                        } else {
                                            output = +hourDiff + ' hours ago';
                                        }
                                        return output;
                                    } else {
                                        dayDiff = +currentDay - +articleDay;
                                        if (dayDiff == 1) {
                                            output = 'Yesterday';
                                        } else {
                                            output = +dayDiff + ' days ago';
                                        }
                                        return output;
                                    }
                                } else {
                                    previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                                    monthDifference = +currentMonth - +articleMonth;
                                    currentDay = +currentDay + (+previousMonthTotalDays * monthDifference);
                                    dayDiff = +currentDay - +articleDay;
                                    if (dayDiff == 1) {
                                        output = 'Yesterday';
                                    } else {
                                        output = +dayDiff + ' days ago';
                                    }
                                    return output;
                                }
                            }
                            data['external-data'] = ' | ' + getTimeDifference(data);
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 1,
                        "virtualThumbHeight": 1
                    }],
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:18.0px;font-weight:bold;max-height:55.0px;*height:55.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans';font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 12px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:#303030;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#626262;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#626262;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbs-feed-mobile-b-plus": {
                    "header": "More Stories",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }
                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category) {
                            data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data.category = 'News';
                        }
                        try {
                            var getTimeDifference = function(data) {
                                var fullPublishDate = new Date(1000 * data['published-date']),
                                    fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                                    articleMonth = fullPublishDate.getMonth(),
                                    articleDay = fullPublishDate.toString().split(' ')[2],
                                    articleYear = fullPublishDate.toString().split(' ')[3],
                                    articleTime = fullPublishDate.toString().split(' ')[4],
                                    articleHour = articleTime.split(':')[0],
                                    articleMinute = articleTime.split(':')[1],
                                    fullCurrentDate = new Date(),
                                    fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                                    currentMonth = fullCurrentDate.getMonth(),
                                    currentDay = fullCurrentDate.toString().split(' ')[2],
                                    currentYear = fullCurrentDate.toString().split(' ')[3],
                                    currentTime = fullCurrentDate.toString().split(' ')[4],
                                    currentHour = currentTime.split(':')[0],
                                    currentMinute = currentTime.split(':')[1],
                                    dayDiff,
                                    hourDiff,
                                    monthDifference,
                                    previousMonthTotalDays,
                                    output;
                                if (currentMonth == articleMonth) {
                                    if (currentDay == articleDay) {
                                        hourDiff = currentHour - articleHour;
                                        if (hourDiff == 0) {
                                            output = +hourDiff + ' minutes ago';
                                        } else if (hourDiff == 1) {
                                            output = +hourDiff + ' hour ago';
                                        } else {
                                            output = +hourDiff + ' hours ago';
                                        }
                                        return output;
                                    } else {
                                        dayDiff = +currentDay - +articleDay;
                                        if (dayDiff == 1) {
                                            output = 'Yesterday';
                                        } else {
                                            output = +dayDiff + ' days ago';
                                        }
                                        return output;
                                    }
                                } else {
                                    previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                                    monthDifference = +currentMonth - +articleMonth;
                                    currentDay = +currentDay + (+previousMonthTotalDays * monthDifference);
                                    dayDiff = +currentDay - +articleDay;
                                    if (dayDiff == 1) {
                                        output = 'Yesterday';
                                    } else {
                                        output = +dayDiff + ' days ago';
                                    }
                                    return output;
                                }
                            }
                            data['external-data'] = ' | ' + getTimeDifference(data);
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 1,
                        "virtualThumbHeight": 1
                    }],
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:18.0px;font-weight:bold;max-height:55.0px;*height:55.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans';font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 12px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:#303030;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#626262;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#626262;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbs-feed-mobile-b-sb": {
                    "header": "More Local Stories",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }
                    },
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category) {
                            data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data.category = 'News';
                        }
                        try {
                            var getTimeDifference = function(data) {
                                var fullPublishDate = new Date(1000 * data['published-date']),
                                    fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                                    articleMonth = fullPublishDate.getMonth(),
                                    articleDay = fullPublishDate.toString().split(' ')[2],
                                    articleYear = fullPublishDate.toString().split(' ')[3],
                                    articleTime = fullPublishDate.toString().split(' ')[4],
                                    articleHour = articleTime.split(':')[0],
                                    articleMinute = articleTime.split(':')[1],
                                    fullCurrentDate = new Date(),
                                    fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                                    currentMonth = fullCurrentDate.getMonth(),
                                    currentDay = fullCurrentDate.toString().split(' ')[2],
                                    currentYear = fullCurrentDate.toString().split(' ')[3],
                                    currentTime = fullCurrentDate.toString().split(' ')[4],
                                    currentHour = currentTime.split(':')[0],
                                    currentMinute = currentTime.split(':')[1],
                                    dayDiff,
                                    hourDiff,
                                    monthDifference,
                                    previousMonthTotalDays,
                                    output;
                                if (currentMonth == articleMonth) {
                                    if (currentDay == articleDay) {
                                        hourDiff = currentHour - articleHour;
                                        if (hourDiff == 0) {
                                            output = +hourDiff + ' minutes ago';
                                        } else if (hourDiff == 1) {
                                            output = +hourDiff + ' hour ago';
                                        } else {
                                            output = +hourDiff + ' hours ago';
                                        }
                                        return output;
                                    } else {
                                        dayDiff = +currentDay - +articleDay;
                                        if (dayDiff == 1) {
                                            output = 'Yesterday';
                                        } else {
                                            output = +dayDiff + ' days ago';
                                        }
                                        return output;
                                    }
                                } else {
                                    previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                                    monthDifference = +currentMonth - +articleMonth;
                                    currentDay = +currentDay + (+previousMonthTotalDays * monthDifference);
                                    dayDiff = +currentDay - +articleDay;
                                    if (dayDiff == 1) {
                                        output = 'Yesterday';
                                    } else {
                                        output = +dayDiff + ' days ago';
                                    }
                                    return output;
                                }
                            }
                            data['external-data'] = ' | ' + getTimeDifference(data);
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 1,
                        "virtualThumbHeight": 1
                    }],
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:18.0px;font-weight:bold;max-height:55.0px;*height:55.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans';font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 12px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:#303030;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#626262;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".branding": "color:#626262;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbs-feed-mobile-c": {
                    "detail-order": "title,category",
                    "thumbnail-position": "start",
                    "item-data-filter": function(data) {
                        if (data.category) {
                            data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                        } else {
                            data.category = 'News';
                        }
                        try {
                            var getTimeDifference = function(data) {
                                var fullPublishDate = new Date(1000 * data['published-date']),
                                    fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                                    articleMonth = fullPublishDate.getMonth(),
                                    articleDay = fullPublishDate.toString().split(' ')[2],
                                    articleYear = fullPublishDate.toString().split(' ')[3],
                                    articleTime = fullPublishDate.toString().split(' ')[4],
                                    articleHour = articleTime.split(':')[0],
                                    articleMinute = articleTime.split(':')[1],
                                    fullCurrentDate = new Date(),
                                    fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                                    currentMonth = fullCurrentDate.getMonth(),
                                    currentDay = fullCurrentDate.toString().split(' ')[2],
                                    currentYear = fullCurrentDate.toString().split(' ')[3],
                                    currentTime = fullCurrentDate.toString().split(' ')[4],
                                    currentHour = currentTime.split(':')[0],
                                    currentMinute = currentTime.split(':')[1],
                                    dayDiff,
                                    hourDiff,
                                    monthDifference,
                                    previousMonthTotalDays,
                                    output;
                                if (currentMonth == articleMonth) {
                                    if (currentDay == articleDay) {
                                        hourDiff = currentHour - articleHour;
                                        if (hourDiff == 0) {
                                            output = +hourDiff + ' minutes ago';
                                        } else if (hourDiff == 1) {
                                            output = +hourDiff + ' hour ago';
                                        } else {
                                            output = +hourDiff + ' hours ago';
                                        }
                                        return output;
                                    } else {
                                        dayDiff = +currentDay - +articleDay;
                                        if (dayDiff == 1) {
                                            output = 'Yesterday';
                                        } else {
                                            output = +dayDiff + ' days ago';
                                        }
                                        return output;
                                    }
                                } else {
                                    previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                                    monthDifference = +currentMonth - +articleMonth;
                                    currentDay = +currentDay + (+previousMonthTotalDays * monthDifference);
                                    dayDiff = +currentDay - +articleDay;
                                    if (dayDiff == 1) {
                                        output = 'Yesterday';
                                    } else {
                                        output = +dayDiff + ' days ago';
                                    }
                                    return output;
                                }
                            }
                            data['external-data'] = ' | ' + getTimeDifference(data);
                        } catch (e) {
                            __trcError(e);
                        }
                    },
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 1,
                        "virtualThumbHeight": 1
                    }],
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:18.0px;font-weight:bold;max-height:38px;*height:38px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans';font-size:24.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 9px 0px !important;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-category": "font-size:12px;font-weight:normal;text-decoration:none;color:#626262;font-family:'Unify Sans';text-transform:uppercase;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:#303030;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#626262;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".videoCube.thumbnail_start .thumbBlock_holder": "width:25%;_width:25%;margin:auto auto 0px auto;",
                        ".branding": "color:#626262;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "padding:9px 0 0 15px;margin:0 0 0 0;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-description', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbs-feed-mobile-d": {
                    "header": "Recommended",
                    "detail-order": "title,category",
                    "item-renderer": function(box, data) {
                        /** START - check and add tags to organic content for propensity feeds **/
                        try {
                            TRC._addForSubscribers(box, data);
                        } catch (e) {
                            __trcError('Error in item-renderer ' + e.message);
                        }

                    },
                    "format-uploader": '%s',
                    "detail-order-syndicated": "title,description,category",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 3,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "__style__": {
                        ".video-title": "font-family:'Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif !important;font-size:16.0px;line-height:18.0px;font-weight:bold;max-height:96px;*height:96px;color:#303030;text-decoration:none;padding:0 0 2px 0;margin:0 0 3px 0 !important;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:16px;line-height:25px;font-weight:normal;max-height:75px;*height:75px;color:rgba(0, 0, 0, 0.87);text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;font-weight:bold;text-decoration:none;color:#212121;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:7px 0px 9px 0px;line-height:1.2em;display:block;margin:0;position:relative;box-sizing:border-box;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:128px;margin:5px 0 0 0;",
                        ".video-external-data": "font-size:14px;font-weight:600;text-decoration:none;color:rgba(0, 0, 0, 0.73);",
                        ".syndicatedItem .video-title": "max-height:96.0px;*height:96.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:32.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;",
                        ".syndicatedItem .video-label-box": "height:128px;margin:5px 0 0 0;",
                        ".logoDiv a span": "font-size:11px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;font-size:inherit;",
                        ".trc_rbox_header_span .trc_header_right_column": "background:transparent;height:auto;",
                        ".trc_header_right_part": "margin:3px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "organic-thumbs-feed-y-em": {
                    "detail-order": "title,description,branding",
                    "detail-order-syndicated": "title,description,branding",
                    "disclosure-link-text-sponsored": "Sponsored",
                    "disclosure-position": "after_branding",
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:48.0px;*height:48.0px;color:#000000;text-decoration:none;margin:0 0 0 0;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:20.0px;font-weight:normal;max-height:40.0px;*height:40.0px;color:#000000;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".video-label-box": "text-align:left;height:112px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:40.0px;*height:40.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;font-weight:normal;line-height:20.0px;text-decoration:none;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 0px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:24.0px;",
                        ".syndicatedItem .video-label-box": "height:112px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#999999;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-title', '.videoCube:hover .video-label-box .video-description', '.video-label-box .branding', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_left_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "rec-reel-sc2": {
                    "detail-order": "title,branding",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 1.5,
                            "h": 1.5
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }],
                    "disclosure-link-text-sponsored": "Sponsored",
                    "disclosure-position": "after_branding",
                    "storyWidget": true,
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;max-height:54.0px;*height:54.0px;color:#000000;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:#000000;text-decoration:none;",
                        ".video-label-box": "text-align:left;height:81px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:54.0px;*height:54.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".syndicatedItem .video-label-box": "height:81px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;"
                    }
                },
                "rec-reel-sc2-bpcv": {
                    "detail-order": "title,branding",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 1.5,
                            "h": 1.5
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }],
                    "disclosure-link-text-sponsored": "Sponsored",
                    "disclosure-position": "after_branding",
                    "storyWidget-story-num-title-lines": 0,
                    "recommendationReel": true,
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;max-height:54.0px;*height:54.0px;color:#212121;text-decoration:none;",
                        ".video-description": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:#212121;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".video-label-box": "text-align:left;height:81px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:#212121;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:54.0px;*height:54.0px;color:#212121;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".syndicatedItem .video-label-box": "height:81px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;background-color:transparent;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        ".trc_rbox_header .logoDiv": "font-size:inherit;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_rbox_header .trc_header_ext', '.videoCube a', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_left_column', '.trc_header_right_part', '.trc_rbox_header .logoDiv', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "text-links-a": {
                    "item-renderer": function(box, data) {
                        /*	    var winWidth = -1,
                                winHeight = -1;
                                function resizeVideoBox() {
                                        if(box.labelsBox.firstChild) {
                                                box.labelsBox.firstChild.innerHTML = box.video_data['title'];
                                        }
                                        box.fixTextOverflow(true);
                                }
                                TRC.dom.on(window, 'resize', function (e) {
                                        /* IE8 and below has a few issues with window resize. First, it can go into infinite loop due to resize event being called on children resize as well, so we need to check
                                           if window dimensions has changed and only if so, call the function. Second issue, is that it will give incorrect dimensions in the calculation unless we use setTimeout() */
                        /*              if(TRC.Browser.ieUpto(8)) {
                                                if(document.documentElement.clientWidth != winWidth || document.documentElement.clientHeight != winHeight) {
                                                        setTimeout(function() {
                                                                resizeVideoBox();
                                                                winWidth = document.documentElement.clientWidth;
                                                                winHeight = document.documentElement.clientHeight;
                                                        });
                                                }
                                        }else{
                                                resizeVideoBox();
                                        }
                                });
                            if (TRC.widgetCreatorPreview && jQuery) {
                                    jQuery(window).on('videoCubeChange', resizeVideoBox);
                            }
                            if(box.rbox.boxes.length >= box.rbox.recommendationList.length/2) {
                                    box.className += ' rightCol';
                            }
                        */
                    },
                    "thumbnail-position": "none",
                    "detail-order-syndicated": "branding,title",
                    "format-syndicator": function(s) {
                        return s;
                    },
                    "rows": 1,
                    "widget-creator-layout": "autowidget-template-text-links",
                    "widget-creator-revision": "8251431",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 960,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 2
                    }, {
                        "minWidth": 961,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1
                    }],
                    "min-width-for-disclosure": 495,
                    "min-width-for-attribution": 625,
                    "mode-has-adchoice": false,
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:normal;max-height:40.0px;*height:40.0px;color:#333333;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:auto;border-width:0;padding:0;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0;",
                        ".videoCube": "width:48%;_width:48%;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0px 3px 1px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",
                        ".video-label-box": "text-align:left;",
                        "": "width:auto;_width:auto;border-width:0px 0px 0px 0px;border-style:solid solid solid solid;border-color:#DFDFDF;padding:0px 0px 0px 0px;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:40.0px;*height:40.0px;color:#000000;font-family:Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:normal;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:normal;text-decoration:none;font-family:Arial,sans-serif;background-image:null;text-align:left;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "text-links-vertical": {
                    "header": "related stories",
                    "list-size": 5,
                    "thumbnail-width": "0",
                    "thumbnail-height": "0",
                    "detail-order": "title,published-date",
                    "item-renderer": function(box, data) {
                        if (typeof window.trc_itemRenderer == 'function')
                            window.trc_itemRenderer(document.createElement('div'), data);
                        try {
                            __trcDOMWalker(box, function(o) {
                                if (o.nodeType === 1) {
                                    o.target = '_blank';
                                }
                            });
                        } catch (e) {
                            ;
                        }
                        // Add recommendation target type for videoCube node
                        if (data && data.isPhoto) {
                            if (box) {
                                box.className += ' photoItem';
                            }
                        }
                    },
                    "format-published-date": function(d) {
                        function timeSince(date) {
                            var seconds = Math.floor((new Date() - date) / 1000);
                            var interval = Math.floor(seconds / 31536000);
                            if (interval >= 1) {
                                return interval + ' years';
                            }
                            interval = Math.floor(seconds / 2592000);
                            if (interval >= 1) {
                                return interval + ' months';
                            }
                            interval = Math.floor(seconds / 86400);
                            if (interval >= 1) {
                                return interval + ' days';
                            }
                            interval = Math.floor(seconds / 3600);
                            if (interval >= 1) {
                                return interval + ' hours';
                            }
                            interval = Math.floor(seconds / 60);
                            if (interval >= 1) {
                                return interval + ' minutes';
                            }
                            return Math.floor(seconds) + ' seconds';
                        }
                        var date = new Date(parseFloat(d) * 1000);
                        return timeSince(date) + ' ago';
                    },
                    "sponsored-location": "thumbnail-top",
                    "thumbnail-position": "none",
                    "attribution-position": "top",
                    "attribution-text": "<span>par Taboola</span>",
                    "item-data-filter": function(data) {
                        if (data.category) {
                            var categoryList = window.TRC.categoryList;
                            var data_category_list = data.category.split(';');
                            var high_priority_category;
                            for (var i = 0; i < data_category_list.length; i++) {
                                var category = data_category_list[i];
                                var category_list = (category.split('//')) ? category.split('//') : category;
                                category = category_list[category_list.length - 1];
                                if (categoryList[category])
                                    high_priority_category = (!high_priority_category) ? category : ((categoryList[high_priority_category]['index'] > categoryList[category]['index']) ? category : high_priority_category);
                            }
                            high_priority_category = (high_priority_category) ? high_priority_category : data_category_list[0];
                            if (!categoryList[high_priority_category])
                                data.category = high_priority_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                });
                            else
                                data.category = (categoryList[high_priority_category]['name']) ? categoryList[high_priority_category]['name'] : ((0 <= categoryList[high_priority_category]['index'] < 13) ? high_priority_category.toUpperCase() : (high_priority_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                })));
                        }
                        return data;
                    },
                    "auto-size-rules": [{
                        "minWc": 120,
                        "maxWc": 249,
                        "minWsRange": 8,
                        "maxWsRange": 8,
                        "n": 1
                    }, {
                        "minWc": 250,
                        "maxWc": 379,
                        "minWsRange": 8,
                        "maxWsRange": 9,
                        "n": 2
                    }, {
                        "minWc": 380,
                        "maxWc": 609,
                        "minWsRange": 8,
                        "maxWsRange": 10,
                        "n": 3
                    }, {
                        "minWc": 610,
                        "maxWc": 749,
                        "minWsRange": 8,
                        "maxWsRange": 11,
                        "n": 4
                    }, {
                        "minWc": 750,
                        "maxWc": 1029,
                        "minWsRange": 7,
                        "maxWsRange": 11,
                        "n": 5
                    }, {
                        "minWc": 1030,
                        "maxWc": 1419,
                        "minWsRange": 6,
                        "maxWsRange": 11,
                        "n": 6
                    }, {
                        "minWc": 1420,
                        "maxWc": 1729,
                        "minWsRange": 6,
                        "maxWsRange": 12,
                        "n": 7
                    }, {
                        "minWc": 1730,
                        "maxWc": 1920,
                        "minWsRange": 6,
                        "maxWsRange": 13,
                        "n": 8
                    }],
                    "rows": 1,
                    "widget-creator-layout": "autowidget-template",
                    "widget-creator-revision": "17739812",
                    "mode-is-responsive": false,
                    "responsive-rules": null,
                    "use-css-important": false,
                    "disclosure-position": "top",
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:arial,sans-serif\\3b ;font-size:13px;line-height:1.35em;font-weight:bold;max-height:2.7em;*height:2.7em;color:#333;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:auto;border-width:0;padding:0 30px;margin:0 0 0 0;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".trc_rbox_header": "font-family:'Futura Today Bold',arial,sans-serif;;font-size:12px;font-weight:normal;text-decoration:none;color:#FFF;border-width:0;background:url('http://www.gannett-cdn.com/static/images/components/story-updates-bg.png') no-repeat scroll transparent;border-style:none;border-color:#D6D5D3;padding:0 10px 5px 8px;line-height:28px;margin:0 0 -32px 0;text-align:center;text-transform:uppercase;",
                        ".video-published-date": "font-size:11px;font-weight:normal;text-decoration:none;color:#666;display:inherit;",
                        ".videoCube": "width:100%;_width:100%;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:12px 0;height:6.1em;margin-left:0;margin-top:0;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",
                        ".video-label-box": "text-align:left;",
                        "": "width:320px;_width:320px;border-width:0;border-style:none;border-color:#000000;padding:0;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",
                        ".videoCube.horizontal": "border-style:dotted none none;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#CBCBCB;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",
                        ".videoCube.syndicatedItem.horizontal": "border-style:dotted none none;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:2.7em;*height:2.7em;color:#333;font-family:arial,sans-serif;;font-size:13px;line-height:1.35em;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#666;font-size:11px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        ".logoDiv a span": "font-size:10px;color:#aaa;font-weight:normal;",
                        ".logoDiv a": "font-size:inherit;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.logoDiv a', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-a-amp": {
                    "header": "AD CONTENT",
                    "attribution-position": "top",
                    "widget-creator-revision": "7680361",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 1,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 7,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }, {
                        "minWidth": 2,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 3,
                        "virtualThumbHeight": 2
                    }],
                    "min-width-for-attribution": 200,
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:normal;max-height:96.0px;*height:96.0px;color:#333;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'futura today demibold', helvetica, arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'futura today demibold', helvetica, Symbol, arial, sans-serif;font-size:19.0px;font-weight:normal;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 15px 0;line-height:1.2em;display:inline-block;position:relative;height:auto;width:100%;_width:100%;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0 0 20px 0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",
                        ".video-label-box": "text-align:left;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:72.0px;*height:72.0px;color:#333;font-family:'futura today demibold', helvetica, arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:normal;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:normal;text-decoration:none;font-family:HelveticaNeue, helvetica, arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".videoCube.thumbnail_start .thumbBlock_holder": "width:30%;_width:30%;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        ".logoDiv a span": "font-size:11px;color:#999;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:none;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-a-dfp-1x1": {
                    "header": "You May Like",
                    "attribution-position": "bottom",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }],
                    "disclosure-link-text-sponsored": "Sponsored",
                    "disclosure-position": "after_branding",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;max-height:44.0px;*height:44.0px;color:#000000;text-decoration:none;",
                        ".video-label-box": "text-align:left;height:44px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-title": "max-height:22.0px;*height:22.0px;color:#000000;font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:44px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_left_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;"
                    }
                },
                "thumbnails-a-test": {
                    "header": "You May Like",
                    "attribution-position": "top",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 6,
                        "virtualThumbHeight": 5
                    }],
                    "disclosure-position": "top",
                    "enable-read-more": true,
                    "read-more-box-selector": ".gnt_ar_b",
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:#000000;text-decoration:none;margin:0 0 0 0;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:5px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:88px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:88px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;background-color:transparent;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "background:transparent;height:auto;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-title', '.videoCube:hover .video-label-box .video-description', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-b": {
                    "header": "AD CONTENT",
                    "attribution-position": "top",
                    "rows": 1,
                    "widget-creator-revision": "7796304",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 1,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 6,
                        "virtualThumbWidth": 6,
                        "virtualThumbHeight": 5
                    }, {
                        "minWidth": 2,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 3,
                        "virtualThumbWidth": 6,
                        "virtualThumbHeight": 5
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:#333;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".trc_rbox_header": "font-family:helvetica, arial, sans-serif;font-size:14.0px;font-weight:bold;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",
                        ".video-label-box": "text-align:left;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:48.0px;*height:48.0px;color:#333;font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-e": {
                    "header": "Ad Content",
                    "attribution-position": "top",
                    "widget-creator-revision": "13618466",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 3,
                        "virtualThumbHeight": 2
                    }],
                    "disclosure-position": "top",
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:normal;max-height:96.0px;*height:96.0px;color:#222222;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans';",
                        ".trc_rbox_header": "font-family:'Unify Sans';font-size:14.0px;font-weight:bold;text-decoration:none;color:#222222;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;line-height:1.2em;display:block;margin:0;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:72.0px;*height:72.0px;color:#222222;font-family:'Unify Sans';font-size:18.0px;line-height:24.0px;font-weight:normal;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#666666;font-size:12.0px;font-weight:normal;text-decoration:none;font-family:'Unify Sans';background-image:null;text-align:left;line-height:18.0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        ".logoDiv a span": "font-size:11.0px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-eur": {
                    "header": "AD CONTENT",
                    "attribution-position": "top",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 499,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 3,
                        "virtualThumbHeight": 2
                    }, {
                        "minWidth": 500,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 3,
                        "virtualThumbWidth": 6,
                        "virtualThumbHeight": 5
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;max-height:66.0px;*height:66.0px;color:#333333;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:15.0px;font-weight:bold;text-decoration:none;color:#333333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:66px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#333333;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:66px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#333333;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-f": {
                    "header": "MORE FROM THE WEB",
                    "thumbnail-position": "start",
                    "detail-order-syndicated": "branding,title",
                    "widget-creator-layout": "autowidget-template-stream",
                    "widget-creator-revision": "7731339",
                    "responsive-rules": [{
                        minWidth: 0,
                        margin: {
                            v: 2,
                            h: 2
                        },
                        rows: 2,
                        cells: 1,
                        virtualThumbWidth: 1,
                        virtualThumbHeight: 1
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:12.0px;line-height:16.0px;font-weight:normal;max-height:48.0px;*height:48.0px;color:#000000;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".trc_rbox_header": "font-family:'Futura Today Bold', sans-serif;font-size:13.0px;font-weight:normal;text-decoration:none;color:#2c2c2c;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 12px 0;line-height:1.2em;display:none;position:relative;height:auto;width:100%;_width:100%;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;margin:0 0 10px 0;",
                        ".video-label-box": "text-align:left;",
                        "": "width:300px;_width:300px;border-width:0px 0px 0px 0px;border-style:solid solid solid solid;border-color:#DFDFDF;padding:15px 20px 15px 20px;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:32.0px;*height:32.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:12.0px;line-height:16.0px;font-weight:normal;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:22.0px;position:relative;bottom:7px;",
                        ".videoCube.thumbnail_start .thumbBlock_holder": "width:20%;_width:20%;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        ".logoDiv a span": "font-size:11.0px;color:#b3b3b3;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-feed-a": {
                    "header": "You May Like",
                    "detail-order-syndicated": "title,description,branding",
                    "disclosure-position": "bottom",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;max-height:66.0px;*height:66.0px;color:#000000;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:20px;font-weight:normal;max-height:40px;*height:40px;color:black;text-decoration:none;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:20.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:5px 0px 5px 5px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:84px;margin:5px 5px 0px 5px;",
                        ".syndicatedItem .video-description": "max-height:40px;*height:40px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:20px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 0px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:84px;margin:5px 5px 0px 5px;",
                        ".logoDiv a span": "font-size:11.0px;color:#000000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-feed-desktop": {
                    "header": "AD CONTENT",
                    "detail-order-syndicated": "title,description,branding",
                    "widget-creator-revision": "16277100",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 2,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }],
                    "disclosure-position": "bottom",
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:rgba(0,0,0,.87);text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16px font-weight:bold;font-weight:bold;text-decoration:none;color:#000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0 0 0 0;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:88px;margin:5px 0 0 0;",
                        ".syndicatedItem .video-description": "max-height:34px;*height:34px;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:17px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:44.0px;*height:44.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:rgba(0,0,0,.53);font-size:14.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".syndicatedItem .video-label-box": "height:66px;margin:5px 0 0 5px;",
                        ".logoDiv a span": "font-size:12px;color:#666;display:inline;font-weight:400;font-family:'Unify Sans',helvetica,arial,sans-serif;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-feed-desktop-03": {
                    "detail-order-syndicated": "title,description,branding",
                    "widget-creator-revision": "16277100",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 2,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }],
                    "disclosure-link-text-sponsored": "Ad",
                    "disclosure-position": "after_branding",
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:rgba(0,0,0,.87);text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16px font-weight:bold;font-weight:bold;text-decoration:none;color:#000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0 0 0 0;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:88px;margin:5px 0 0 0;",
                        ".syndicatedItem .video-description": "max-height:34px;*height:34px;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:17px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:48.0px;*height:48.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:rgba(0,0,0,.53);font-size:14.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".syndicatedItem .video-label-box": "height:66px;margin:5px 0 0 5px;",
                        ".logoDiv a span": "font-size:12px;color:#666;display:inline;font-weight:400;font-family:'Unify Sans',helvetica,arial,sans-serif;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-feed-desktop-04": {
                    "detail-order-syndicated": "title,description,branding",
                    "widget-creator-revision": "16277100",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 1,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }],
                    "disclosure-link-text-sponsored": "Sponsored",
                    "disclosure-position": "after_branding",
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:rgba(0,0,0,.87);text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16px font-weight:bold;font-weight:bold;text-decoration:none;color:#000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0 0 0 0;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:88px;margin:5px 0 0 0;",
                        ".syndicatedItem .video-description": "max-height:34px;*height:34px;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:17px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:48.0px;*height:48.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:rgba(0,0,0,.53);font-size:14.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".syndicatedItem .video-label-box": "height:66px;margin:5px 0 0 5px;",
                        ".logoDiv a span": "font-size:12px;color:#666;display:inline;font-weight:400;font-family:'Unify Sans',helvetica,arial,sans-serif;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-feed-mobile-e": {
                    "header": "AD CONTENT",
                    "attribution-text": "Sponsored by Taboola",
                    "detail-order-syndicated": "title,description,branding",
                    "widget-creator-revision": "13616469",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 5,
                        "virtualThumbHeight": 3
                    }],
                    "min-width-for-attribution": 300,
                    "disclosure-position": "bottom",
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:600;max-height:76.0px;*height:76.0px;color:rgba(0,0,0,.87);text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;line-height:1.2em;display:block;margin:0;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:38px;*height:38px;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:19px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:57.0px;*height:57.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:600;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:rgba(0,0,0,.53);font-size:14.0px;font-weight:600;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        ".logoDiv a span": "font-size:11px;color:#000!important;display:inline!important;font-weight:400;font-family:Arial,Helvetica,'sans-serif';",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-feed-original": {
                    "detail-order-syndicated": "title,description,branding",
                    "widget-creator-revision": "16277100",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 480,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 3,
                        "virtualThumbHeight": 2
                    }, {
                        "minWidth": 481,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 3,
                        "virtualThumbWidth": 6,
                        "virtualThumbHeight": 5
                    }],
                    "disclosure-position": "bottom",
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:rgba(0,0,0,.87);text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:rgba(0,0,0,.87);border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:88px;margin:5px 0 0 0;",
                        ".syndicatedItem .video-description": "max-height:32px;*height:32px;color:black;font-family:Arial, Helvetica, sans-serif;font-size:12px;font-weight:normal;line-height:16px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:rgba(0,0,0,.53);font-size:14.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".syndicatedItem .video-label-box": "height:98px;margin:5px 0 0 5px;",
                        ".logoDiv a span": "font-size:12px;color:#666;display:inline;font-weight:400;font-family:'Unify Sans',helvetica,arial,sans-serif;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-feed-original-03": {
                    "detail-order-syndicated": "title,description,branding",
                    "widget-creator-revision": "16277100",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 480,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 3,
                        "virtualThumbHeight": 2
                    }, {
                        "minWidth": 481,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 3,
                        "virtualThumbWidth": 6,
                        "virtualThumbHeight": 5
                    }],
                    "has-image-lazy-load": true,
                    "disclosure-link-text-sponsored": "Ad",
                    "disclosure-position": "after_branding",
                    "has-thumbs-image-lazy-load": true,
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:rgba(0,0,0,.87);text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:rgba(0,0,0,.87);border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:88px;margin:5px 0 0 0;",
                        ".syndicatedItem .video-description": "max-height:38px;*height:38px;color:black;font-family:Arial, Helvetica, sans-serif;font-size:12px;font-weight:normal;line-height:19px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:rgba(0,0,0,.53);font-size:14.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".syndicatedItem .video-label-box": "height:104px;margin:5px 0 0 5px;",
                        ".logoDiv a span": "font-size:12px;color:#666;display:inline;font-weight:400;font-family:'Unify Sans',helvetica,arial,sans-serif;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-feed-original-03-test": {
                    "detail-order-syndicated": "title,description,branding",
                    "widget-creator-revision": "16277100",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 480,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 3,
                        "virtualThumbHeight": 2
                    }, {
                        "minWidth": 481,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 3,
                        "virtualThumbWidth": 6,
                        "virtualThumbHeight": 5
                    }],
                    "has-image-lazy-load": true,
                    "disclosure-link-text-sponsored": "Sponsored",
                    "disclosure-position": "after_branding",
                    "has-thumbs-image-lazy-load": true,
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:rgba(0,0,0,.87);text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:rgba(0,0,0,.87);border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:88px;margin:5px 0 0 0;",
                        ".syndicatedItem .video-description": "max-height:38px;*height:38px;color:black;font-family:Arial, Helvetica, sans-serif;font-size:12px;font-weight:normal;line-height:19px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:rgba(0,0,0,.53);font-size:14.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".syndicatedItem .video-label-box": "height:104px;margin:5px 0 0 5px;",
                        ".logoDiv a span": "font-size:12px;color:#666;display:inline;font-weight:400;font-family:'Unify Sans',helvetica,arial,sans-serif;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-feed-stream": {
                    "header": "AD CONTENT",
                    "thumbnail-position": "start",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 9,
                        "virtualThumbHeight": 5
                    }],
                    "disclosure-position": "bottom",
                    "read-more-mode-devices": "",
                    "disclosure-alignment": "right",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:76.0px;*height:76.0px;color:#000000;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;",
                        ".video-label-box": "text-align:left;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14.0px;line-height:22px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",
                        ".videoCube.thumbnail_start .thumbBlock_holder": "width:49%;_width:49%;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-g": {
                    "header": "AD CONTENT",
                    "list-suffix": function(itemsContainer, data) {
                        if (TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
                            for (var i = 0; i < data.boxes.length; i++) {
                                data.boxes[i].style.height = 'auto';
                                if ((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                                    var clearDiv = document.createElement('div');
                                    clearDiv.style.clear = 'both';
                                    clearDiv.style.width = '100%';
                                    itemsContainer.insertBefore(clearDiv, data.boxes[i]);
                                }
                            }
                        }
                        /*******Add individual class name according to browser*******/
                        var targetContainer = data.container._trc_container;
                        if (TRC.Browser.ie) {
                            targetContainer.className += ' trc_ie' + TRC.Browser.ie;
                        } else if (TRC.Browser.chrome) {
                            targetContainer.className += ' trc_chrome';
                        } else if (TRC.Browser.firefox) {
                            targetContainer.className += ' trc_ff';
                        } else if (TRC.Browser.safari) {
                            targetContainer.className += ' trc_safari';
                        }
                        /*************************/
                        /*** inject text-links ***/
                        if (data) {
                            var currentContainer = data.container;
                            var currentContainerParent = data.container.parentNode;
                            var newContainerDiv = document.createElement('div');
                            if (currentContainer && currentContainerParent && newContainerDiv) {
                                newContainerDiv.id = 'taboola-section-front-text-links';
                                newContainerDiv.style.borderTop = 'none';
                                newContainerDiv.style.paddingTop = '0';
                                currentContainer.style.borderBottom = 'none';
                                currentContainer.style.paddingBottom = '0';
                                currentContainerParent.insertBefore(newContainerDiv, currentContainer.nextSibling);
                                window._taboola = window._taboola || [];
                                _taboola.push({
                                    mode: 'text-links-a',
                                    container: 'taboola-section-front-text-links',
                                    placement: 'Section Front Text Links',
                                    target_type: 'mix'
                                });
                            }
                        }
                    },
                    "attribution-position": "top",
                    "item-data-filter": function(data) {
                        if (!data.category) {
                            data.category = 'USA TODAY';
                        }
                        if (data.category) {
                            var categoryList = window.TRC.categoryList;
                            var data_category_list = data.category.split(';');
                            var hight_prioraty_category;
                            for (var i = 0; i < data_category_list.length; i++) {
                                var category = data_category_list[i];
                                var category_list = (category.split('//')) ? category.split('//') : category;
                                category = category_list[category_list.length - 1];
                                if (categoryList[category])
                                    hight_prioraty_category = (!hight_prioraty_category) ? category : ((categoryList[hight_prioraty_category]['index'] > categoryList[category]['index']) ? category : hight_prioraty_category);
                            }
                            hight_prioraty_category = (hight_prioraty_category) ? hight_prioraty_category : data_category_list[0];
                            if (!categoryList[hight_prioraty_category])
                                data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                }).replace(/People/g, 'Life');
                            else
                                data.category = (categoryList[hight_prioraty_category]['name']) ? categoryList[hight_prioraty_category]['name'] : ((0 <= categoryList[hight_prioraty_category]['index'] < 11) ? hight_prioraty_category.toUpperCase() : (hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                })));
                        }
                        return data;
                    },
                    "detail-order-syndicated": "branding,title",
                    "widget-creator-revision": "7646288",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 3,
                        "virtualThumbWidth": 1,
                        "virtualThumbHeight": 1
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Helvetica,Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:bold;max-height:77px;*height:77px;color:#fff;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Futura Today Normal',Arial,Helvetica,sans-serif;",
                        ".trc_rbox_header": "font-family:'Futura Today Bold',arial,sans-serif;font-size:15px;font-weight:normal;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#e6e6e6;padding:0;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",
                        ".videoCube .thumbnail-overlay": "background-image:url(https://cdn.taboola.com/static/12/12d068d7-0bac-49f3-8bb8-148effd99c7b.png);background-position:5% 5%;",
                        ".trc_rbox_border_elm": "border-color:#e6e6e6;",
                        ".video-label-box": "text-align:left;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:72.0px;*height:72.0px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#D7D7D7;font-size:12.0px;font-weight:normal;text-decoration:none;font-family:Helvetica,Arial,sans-serif;background-image:null;text-align:left;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-mobile-eu": {
                    "header": "AD CONTENT",
                    "attribution-position": "top",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 3,
                        "virtualThumbHeight": 2
                    }],
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;max-height:44.0px;*height:44.0px;color:#333333;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:15.0px;font-weight:bold;text-decoration:none;color:#333333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:44px;margin:5px 0px 0px 0px;",
                        "": "width:300px;_width:300px;border-width:0px 0px 0px 0px;border-style:solid solid solid solid;border-color:#DFDFDF;padding:0px 0px 20px 0px;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",
                        ".syndicatedItem .video-title": "max-height:22.0px;*height:22.0px;color:#333333;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".syndicatedItem .video-label-box": "height:44px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11.0px;color:#333333;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-p": {
                    "header": "AD CONTENT",
                    "thumbnail-position": "start",
                    "widget-creator-layout": "autowidget-template-stream",
                    "widget-creator-revision": "14749859",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 1,
                        "virtualThumbWidth": 8,
                        "virtualThumbHeight": 8
                    }],
                    "mode-has-adchoice": false,
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:'Futura Today DemiBold',arial,sans-serif!important;font-size:15.0px;line-height:20.0px;font-weight:normal;max-height:80.0px;*height:80.0px;color:#333;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Futura Today Bold',arial,sans-serif;",
                        ".trc_rbox_header": "font-family:'Futura Today Bold',arial,sans-serif;font-size:15.0px;font-weight:bold;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:none;margin:0 0 30px 0;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".video-label-box": "text-align:left;height:auto;margin:0;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:60.0px;*height:60.0px;color:#333;font-family:'Futura Today DemiBold',arial,sans-serif;font-size:15.0px;line-height:20.0px;font-weight:normal;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:normal;text-decoration:none;font-family:HelveticaNeue,arial,sans-serif;background-image:null;text-align:left;line-height:normal;margin:12px 0 0 0;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0;",
                        ".logoDiv a span": "font-size:11.0px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-q-abp": {
                    "header": "You May Like",
                    "attribution-position": "top",
                    "widget-creator-revision": "12501185",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }],
                    "disclosure-position": "top",
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:76.0px;*height:76.0px;color:#000000;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:15.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;line-height:1.2em;display:inline-block;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:100%;_width:100%;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;",
                        ".video-label-box": "text-align:left;",
                        "": "width:300px;_width:300px;border-width:0px 0px 0px 0px;border-style:solid solid solid solid;border-color:#DFDFDF;padding:5px 5px 5px 5px;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:57.0px;*height:57.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        ".logoDiv a span": "font-size:11.0px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-r": {
                    "header": "AD CONTENT",
                    "attribution-position": "top",
                    "item-data-filter": function(data) {
                        if (!data.category) {
                            data.category = 'USA TODAY';
                        }
                        if (data.category) {
                            var categoryList = window.TRC.categoryList;
                            var data_category_list = data.category.split(';');
                            var hight_prioraty_category;
                            for (var i = 0; i < data_category_list.length; i++) {
                                var category = data_category_list[i];
                                var category_list = (category.split('//')) ? category.split('//') : category;
                                category = category_list[category_list.length - 1];
                                if (categoryList[category])
                                    hight_prioraty_category = (!hight_prioraty_category) ? category : ((categoryList[hight_prioraty_category]['index'] > categoryList[category]['index']) ? category : hight_prioraty_category);
                            }
                            hight_prioraty_category = (hight_prioraty_category) ? hight_prioraty_category : data_category_list[0];
                            if (!categoryList[hight_prioraty_category])
                                data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                }).replace(/People/g, 'Life');
                            else
                                data.category = (categoryList[hight_prioraty_category]['name']) ? categoryList[hight_prioraty_category]['name'] : ((0 <= categoryList[hight_prioraty_category]['index'] < 11) ? hight_prioraty_category.toUpperCase() : (hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                })));
                        }
                        return data;
                    },
                    "widget-creator-revision": "13150537",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 3
                    }],
                    "disclosure-position": "top",
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:#000000;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".trc_rbox_header": "font-family:'Futura Today Bold', sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0 0 1px 0;background:transparent;border-style:none;border-color:#e6e6e6;padding:0 0 6px 0;line-height:1.2em;display:block;margin:0;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:1px 1px 1px 1px;border-color:#D6D5D3;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:NONE;",
                        ".videoCube .thumbnail-overlay": "background-image:url(http://cdn.taboola.com/libtrc/static/thumbnails/da6eb17d679d2182809c72530d4e41b8.png);background-position:5% 5%;",
                        ".trc_rbox_border_elm": "border-color:#e6e6e6;",
                        ".video-label-box": "text-align:left;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px 1px 1px 1px;border-style:NONE;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:60.0px;*height:60.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:20.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        ".logoDiv a span": "font-size:11.0px;color:#000;display:inline;font-weight:normal;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-title', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-rr": {
                    "header": "AD CONTENT",
                    "attribution-text": "Sponsored by Taboola",
                    "widget-creator-revision": "13616469",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }],
                    "min-width-for-attribution": 300,
                    "disclosure-link-text-sponsored": "Ad",
                    "disclosure-position": "after_branding",
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:600;max-height:20.0px;*height:20.0px;color:rgba(0,0,0,.87);text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;line-height:1.2em;display:block;margin:0 0 0 0;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:22px;*height:22px;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:20.0px;*height:20.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:600;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:rgba(0,0,0,.53);font-size:14.0px;font-weight:600;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;line-height:12.0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        ".branding .logoDiv a span": "color:#626262;font-size:inherit;",
                        ".logoDiv a span": "font-size:11px;color:#000 !important;display:inline !important;font-weight:400;",
                        ".videoCube .video-label-box .video-title": "text-decoration:none;margin:0 0 0 0;",
                        ".videoCube:hover .video-label-box .video-title": "text-decoration:underline;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .video-label-box .video-title', '.videoCube:hover .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-rr-01": {
                    "header": "AD CONTENT",
                    "thumbnail-position": "start",
                    "attribution-position": "bottom",
                    "widget-creator-layout": "autowidget-template-stream",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 1,
                        "virtualThumbWidth": 1,
                        "virtualThumbHeight": 1
                    }],
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:76.0px;*height:76.0px;color:#303030;text-decoration:none;",
                        ".trc_rbox_div": "width:auto;_width:99%;height:410px;border-width:0;padding:0;margin:0 0 0 0;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0px 0px 6px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:0px 0px 1px 0px;border-color:#C2C2C2;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;margin:0 0 10px 0;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#C2C2C2;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:0px 0px 1px 0px;border-style:SOLID;",
                        ".syndicatedItem .video-title": "max-height:50.0px;*height:50.0px;color:#303030;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14.0px;line-height:16px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:19.0px;margin:2px 0px 0px 0px;",
                        ".branding": "color:#626262;font-size:12.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans','Helvetica Neue','Arial Nova',Helvetica,Arial,sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".syndicatedItem .video-label-box": "height:auto;margin:0px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:11px;color:#000000;display:inline;font-weight:normal;font-family:inherit;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-s": {
                    "header": "AD CONTENT",
                    "list-suffix": function(itemsContainer, data) {
                        if (TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
                            for (var i = 0; i < data.boxes.length; i++) {
                                data.boxes[i].style.height = 'auto';
                                if ((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                                    var clearDiv = document.createElement('div');
                                    clearDiv.style.clear = 'both';
                                    clearDiv.style.width = '100%';
                                    itemsContainer.insertBefore(clearDiv, data.boxes[i]);
                                }
                            }
                        }
                        /*******Add individual class name according to browser*******/
                        var targetContainer = data.container._trc_container;
                        if (TRC.Browser.ie) {
                            targetContainer.className += ' trc_ie' + TRC.Browser.ie;
                        } else if (TRC.Browser.chrome) {
                            targetContainer.className += ' trc_chrome';
                        } else if (TRC.Browser.firefox) {
                            targetContainer.className += ' trc_ff';
                        } else if (TRC.Browser.safari) {
                            targetContainer.className += ' trc_safari';
                        }
                        /*************************/
                        /*** inject text-links ***/
                        if (data) {
                            var currentContainer = data.container;
                            var currentContainerParent = data.container.parentNode;
                            var newContainerDiv = document.createElement('div');
                            if (currentContainer && currentContainerParent && newContainerDiv) {
                                newContainerDiv.id = 'taboola-homepage-text-links';
                                newContainerDiv.style.borderTop = 'none';
                                newContainerDiv.style.paddingTop = '0';
                                currentContainer.style.borderBottom = 'none';
                                currentContainer.style.paddingBottom = '0';
                                currentContainerParent.insertBefore(newContainerDiv, currentContainer.nextSibling);
                                window._taboola = window._taboola || [];
                                _taboola.push({
                                    mode: 'text-links-a',
                                    container: 'taboola-homepage-text-links',
                                    placement: 'Homepage Text Links',
                                    target_type: 'mix'
                                });
                            }
                        }
                    },
                    "attribution-position": "top",
                    "item-data-filter": function(data) {
                        if (!data.category) {
                            data.category = 'USA TODAY';
                        }
                        if (data.category) {
                            var categoryList = window.TRC.categoryList;
                            var data_category_list = data.category.split(';');
                            var hight_prioraty_category;
                            for (var i = 0; i < data_category_list.length; i++) {
                                var category = data_category_list[i];
                                var category_list = (category.split('//')) ? category.split('//') : category;
                                category = category_list[category_list.length - 1];
                                if (categoryList[category])
                                    hight_prioraty_category = (!hight_prioraty_category) ? category : ((categoryList[hight_prioraty_category]['index'] > categoryList[category]['index']) ? category : hight_prioraty_category);
                            }
                            hight_prioraty_category = (hight_prioraty_category) ? hight_prioraty_category : data_category_list[0];
                            if (!categoryList[hight_prioraty_category])
                                data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                }).replace(/People/g, 'Life');
                            else
                                data.category = (categoryList[hight_prioraty_category]['name']) ? categoryList[hight_prioraty_category]['name'] : ((0 <= categoryList[hight_prioraty_category]['index'] < 11) ? hight_prioraty_category.toUpperCase() : (hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                })));
                        }
                        return data;
                    },
                    "detail-order-syndicated": "branding,title",
                    "widget-creator-revision": "7646288",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 3,
                        "virtualThumbWidth": 1,
                        "virtualThumbHeight": 1
                    }],
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:Helvetica,Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:bold;max-height:77px;*height:77px;color:#fff;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".videoCube .video-label-box": "margin-left:0;margin-right:0px;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Futura Today Normal',Arial,Helvetica,sans-serif;",
                        ".trc_rbox_header": "font-family:'Futura Today Bold',arial,sans-serif;font-size:15px;font-weight:normal;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#e6e6e6;padding:0;",
                        ".videoCube": "width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",
                        ".videoCube .thumbnail-overlay": "background-image:url(https://cdn.taboola.com/static/12/12d068d7-0bac-49f3-8bb8-148effd99c7b.png);background-position:5% 5%;",
                        ".trc_rbox_border_elm": "border-color:#e6e6e6;",
                        ".video-label-box": "text-align:left;",
                        ".videoCube.syndicatedItem": "background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",
                        ".videoCube.syndicatedItem .video-label-box": "margin-left:0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:72.0px;*height:72.0px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#D7D7D7;font-size:12.0px;font-weight:normal;text-decoration:none;font-family:Helvetica,Arial,sans-serif;background-image:null;text-align:left;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.videoCube .video-label-box', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.videoCube.syndicatedItem .video-label-box', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-stand-alone": {
                    "header": "AD CONTENT",
                    "attribution-position": "top",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 479,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 6,
                        "virtualThumbHeight": 5
                    }, {
                        "minWidth": 480,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 3,
                        "virtualThumbWidth": 6,
                        "virtualThumbHeight": 5
                    }],
                    "storyWidget-story-num-title-lines": 0,
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:16.0px;font-weight:bold;max-height:49.0px;*height:49.0px;color:#303030;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans';font-size:16.0px;font-weight:bold;text-decoration:none;color:#303030;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:76px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-title": "max-height:49.0px;*height:49.0px;color:#303030;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14.0px;line-height:16.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-image:null;text-align:left;line-height:19.0px;",
                        ".syndicatedItem .video-label-box": "height:76px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:14px;color:#626262;display:inline;font-weight:bold;font-family:'Unify Sans';",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbnails-u": {
                    "header": "Ad Content",
                    "attribution-position": "top",
                    "widget-creator-revision": "16277100",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 480,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 4,
                        "cells": 1,
                        "virtualThumbWidth": 3,
                        "virtualThumbHeight": 2
                    }, {
                        "minWidth": 481,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 2,
                        "cells": 3,
                        "virtualThumbWidth": 6,
                        "virtualThumbHeight": 5
                    }],
                    "disclosure-position": "top",
                    "read-more-mode-devices": "",
                    "__style__": {
                        ".video-title": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:rgba(0,0,0,.87);text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",
                        ".video-label,.sponsored,.sponsored-url": "font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",
                        ".trc_rbox_header": "font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:rgba(0,0,0,.87);border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;line-height:1.2em;display:block;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:88px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:66.0px;*height:66.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:rgba(0,0,0,.53);font-size:14.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;line-height:22.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre-label": "height:0px;",
                        ".videoCube .video-label-box.trc-pre-label": "margin:0px 0px 5px 0px;",
                        ".syndicatedItem .video-label-box": "height:88px;margin:5px 0px 0px 0px;",
                        ".logoDiv a span": "font-size:14.0px;color:rgba(0,0,0,.53);display:inline;font-weight:normal;font-family:'Unify Sans', helvetica, arial, sans-serif;",
                        ".videoCube:hover .video-label-box .video-description": "text-decoration:underline;",
                        ".videoCube .video-label-box .video-title": "margin:0 0 0 0;",
                        ".video-label-box .branding": "display:block;",
                        ".trc_header_left_column": "width:48%;_width:48%;display:inline-block;height:auto;",
                        ".trc_rbox_header .trc_header_ext": "position:relative;top:auto;right:auto;",
                        ".logoDiv a": "font-size:100%;",
                        ".videoCube a": "padding:0 0 0 0;",
                        ".trc_rbox_header .logoDiv": "line-height:normal;",
                        ".trc_rbox_header_span .trc_header_right_column": "height:auto;",
                        ".trc_header_right_part": "margin:0px 0 0 0;",
                        "__keys__": ['.video-title', '.video-description', '.trc_rbox_div', '.videoCube .video-duration', '.video-label,.sponsored,.sponsored-url', '.trc_rbox_header', '.sponsored-url', '.sponsored', '.video-category', '.video-duration-detail', '.video-rating', '.video-uploader', '.video-views', '.video-published-date', '.sponsored-default .video-title', '.sponsored-default .video-description', '.videoCube', 'div.videoCube:hover, div.videoCube_hover', '.sponsored-default', 'div.sponsored-default:hover, div.sponsored-default.videoCube_hover', '.videoCube .thumbnail-overlay', '.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay', '.trc_rbox_border_elm', '.videoCube .thumbBlock', 'div.videoCube:hover .thumbBlock', '.pager_enabled', '.trc_pager_counter', '.pager_disabled', '.trc_pager_prev:hover, .trc_pager_next:hover', '.trc_pager_selected', '.trc_pager_unselected', 'div.trc_pager_pages div:hover', '.trc_lightbox_overlay', '.video-label-box', '.trc_sponsored_overlay', '.thumbnail-emblem', '.videoCube .sponsored', '', '.videoCube.vertical', '.videoCube.horizontal', '.trc_pager_prev,.trc_pager_next', '.trc_pager_pages div', '.video-external-data', '.trc_pager div', '.playerCube .thumbnail-overlay', '.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay', '.playerCube .videoCube', '.playerCube .videoCube.horizontal', '.playerCube .videoCube .video-label-box', '.playerCube .video-duration-detail', '.playerCube .video-external-data', '.playerCube .video-label-box', '.playerCube .video-published-date', '.playerCube .video-category', '.playerCube .video-description', '.playerCube .videoCube .video-duration', '.playerCube .videoCube .thumbBlock', '.playerCube .video-rating', '.playerCube .video-uploader', '.playerCube .video-views', '.playerCube .video-title', '.playerCube div.videoCube:hover, div.videoCube_hover', '.whatsThisSyndicated', 'div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover', 'div.syndicatedItem:hover .thumbBlock', '.videoCube.syndicatedItem', '.videoCube.syndicatedItem.horizontal', '.videoCube.syndicatedItem .thumbBlock', '.videoCube.syndicatedItem .thumbnail-overlay', '.videoCube.syndicatedItem.vertical', '.videoCube.syndicatedItem .video-duration', '.syndicatedItem', '.syndicatedItem .video-description', '.syndicatedItem .video-title', '.syndicatedItem .sponsored', '.syndicatedItem .sponsored-url', '.syndicatedItem .video-category', '.syndicatedItem .video-duration-detail', '.syndicatedItem .video-external-data', '.syndicatedItem .video-published-date', '.syndicatedItem .video-rating', '.syndicatedItem .video-uploader', '.syndicatedItem .video-views', '.syndicatedItem .branding', '.videoCube.syndicatedItem .thumbBlock .branding', '.videoCube.syndicatedItem .thumbBlock .static-text', '.videoCube.thumbnail_start .thumbBlock_holder', '.trc_rbox_header_icon_img', '.video-icon-img', '.video-label-box.trc-pre-label', '.syndicatedItem .video-label-box.trc-pre-label', '.videoCube.thumbnail_start .trc-pre-label', '.videoCube.thumbnail_start.trc-split-label .trc-main-label', '.videoCube.thumbnail_start.trc-split-label .trc-pre-label', '.videoCube .video-label-box.trc-pre-label', '.branding', '.branding .logoDiv a span', '.branding div.logoDiv', '.videoCube .thumbBlock .static-text', '.syndicatedItem .video-label-box', '.logoDiv a span', '.tbl-cta-style .cta-button', '.tbl-cta-style .cta-button:hover', '.videoCube:hover .video-label-box .video-description', '.videoCube .video-label-box .video-title', '.video-label-box .branding', '.trc_header_left_column', '.trc_rbox_header .trc_header_ext', '.logoDiv a', '.videoCube a', '.trc_rbox_header .logoDiv', '.trc_rbox_header_span .trc_header_right_column', '.trc_header_right_part', '.videoCube .story-widget.story-widget-text-under .tbl-text-under-title-background', '.videoCube .story-widget.story-widget-text-under .tbl-ui-line', '.tbl-recommendation-reel .tbl-text-under-branding-background', '.tbl-recommendation-reel .tbl-text-under-title-background', '.tbl-recommendation-reel .tbl-ui-line', '.tbl-reco-reel-slider']
                    }
                },
                "thumbs-feed-01": {
                    "detail-order": "title,description,branding",
                    "detail-order-syndicated": "title,description,branding",
                    "responsive-rules": [{
                        "minWidth": 0,
                        "maxWidth": 480,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 16,
                        "virtualThumbHeight": 9
                    }, {
                        "minWidth": 481,
                        "margin": {
                            "v": 2,
                            "h": 2
                        },
                        "rows": 1,
                        "cells": 1,
                        "virtualThumbWidth": 2,
                        "virtualThumbHeight": 1
                    }],
                    "disclosure-link-text-sponsored": "Sponsored",
                    "disclosure-position": "after_branding",
                    "__style__": {
                        ".video-title": "font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;max-height:81.0px;*height:81.0px;color:#000000;text-decoration:none;",
                        ".video-description": "font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;max-height:44.0px;*height:44.0px;color:black;text-decoration:none;",
                        ".trc_rbox_header": "font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 2px 0px;line-height:1.2em;display:none;margin:0px 0px 0px 0px;position:relative;background-color:transparent;box-sizing:initial;height:auto;width:auto;_width:auto;",
                        ".video-label-box": "text-align:left;height:125px;margin:5px 0px 0px 0px;",
                        ".syndicatedItem .video-description": "max-height:44.0px;*height:44.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;font-weight:normal;line-height:22.0px;text-decoration:none;",
                        ".syndicatedItem .video-title": "max-height:54.0px;*height:54.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;text-decoration:none;padding:0;",
                        ".syndicatedItem .branding": "color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;line-height:27.0px;",
                        ".video-label-box.trc-pre-label": "height:0px;",
                        ".syndicatedItem .video-label-box.trc-pre