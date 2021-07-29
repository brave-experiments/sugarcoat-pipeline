var UET, UET_init, UET_push;
{
    const $___mock_5ca4651956d93028 = {};
    (exports => {
        'use strict';
        const xhrUnsent = 0;
        const xhrOpened = 1;
        const xhrHeadersReceived = 2;
        const xhrLoading = 3;
        const xhrDone = 4;
        const xhrDeferredHandleSymbol = Symbol('deferredHandle');
        const xhrOnLoadStartSymbol = Symbol('onloadstart');
        const xhrOnProgressSymbol = Symbol('onprogress');
        const xhrOnAbortSymbol = Symbol('onabort');
        const xhrOnErrorSymbol = Symbol('onerror');
        const xhrOnLoadSymbol = Symbol('onload');
        const xhrOnTimeoutSymbol = Symbol('ontimeout');
        const xhrOnLoadEndSymbol = Symbol('onloadend');
        const xhrOnReadyStateChangeSymbol = Symbol('onreadystatechange');
        const xhrReadyStateSymbol = Symbol('readyState');
        const xhrTimeoutSymbol = Symbol('timeout');
        const xhrWithCredentialsSymbol = Symbol('withCredentials');
        const xhrUploadSymbol = Symbol('upload');
        const xhrResponseTypeSymbol = Symbol('responseType');
        const defineEvent = (obj, symbol) => {
            const type = symbol.description.substring(2);
            Object.defineProperty(obj, symbol, {
                configurable: false,
                enumerable: false,
                value: null,
                writable: true
            });
            obj.addEventListener(type, function (event) {
                const handler = this[symbol];
                if (handler) {
                    handler.call(this, event);
                }
            });
        };
        const changeReadyState = (xhr, readyState) => {
            xhr[xhrReadyStateSymbol] = readyState;
            xhr.dispatchEvent(new Event('readystatechange'));
        };
        let isSealed = true;
        class XMLHttpRequestEventTarget extends EventTarget {
            constructor() {
                super();
                if (!(this instanceof XMLHttpRequest) && !(this instanceof XMLHttpRequestUpload)) {
                    throw new TypeError('Illegal constructor');
                }
                defineEvent(this, xhrOnLoadStartSymbol);
                defineEvent(this, xhrOnProgressSymbol);
                defineEvent(this, xhrOnAbortSymbol);
                defineEvent(this, xhrOnErrorSymbol);
                defineEvent(this, xhrOnLoadSymbol);
                defineEvent(this, xhrOnTimeoutSymbol);
                defineEvent(this, xhrOnLoadEndSymbol);
            }
            get onloadstart() {
                return this[xhrOnLoadStartSymbol];
            }
            set onloadstart(value) {
                this[xhrOnLoadStartSymbol] = value;
            }
            get onprogress() {
                return this[xhrOnProgressSymbol];
            }
            set onprogress(value) {
                this[xhrOnProgressSymbol] = value;
            }
            get onabort() {
                return this[xhrOnAbortSymbol];
            }
            set onabort(value) {
                this[xhrOnAbortSymbol] = value;
            }
            get onerror() {
                return this[xhrOnErrorSymbol];
            }
            set onerror(value) {
                this[xhrOnErrorSymbol] = value;
            }
            get ontimeout() {
                return this[xhrOnTimeoutSymbol];
            }
            set ontimeout(value) {
                this[xhrOnTimeoutSymbol] = value;
            }
            get onloadend() {
                return this[xhrOnLoadEndSymbol];
            }
            set onloadend(value) {
                this[xhrOnLoadEndSymbol] = value;
            }
        }
        exports.XMLHttpRequestEventTarget = {
            configurable: true,
            enumerable: true,
            value: XMLHttpRequestEventTarget,
            writable: true
        };
        class XMLHttpRequestUpload extends XMLHttpRequestEventTarget {
            constructor() {
                if (isSealed) {
                    throw new TypeError('Illegal constructor');
                }
                super();
            }
        }
        exports.XMLHttpRequestUpload = {
            configurable: true,
            enumerable: true,
            value: XMLHttpRequestUpload,
            writable: true
        };
        class XMLHttpRequest extends XMLHttpRequestEventTarget {
            constructor() {
                super();
                isSealed = false;
                const xhrUpload = new XMLHttpRequestUpload();
                isSealed = true;
                Object.defineProperty(this, xhrDeferredHandleSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: null,
                    writable: true
                });
                defineEvent(this, xhrOnReadyStateChangeSymbol);
                Object.defineProperty(this, xhrReadyStateSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: xhrUnsent,
                    writable: true
                });
                Object.defineProperty(this, xhrTimeoutSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: 0,
                    writable: true
                });
                Object.defineProperty(this, xhrWithCredentialsSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: false,
                    writable: true
                });
                Object.defineProperty(this, xhrUploadSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: xhrUpload,
                    writable: false
                });
                Object.defineProperty(this, xhrResponseTypeSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: '',
                    writable: true
                });
            }
            get onreadystatechange() {
                return this[xhrOnReadyStateChangeSymbol];
            }
            set onreadystatechange(value) {
                this[xhrOnReadyStateChangeSymbol] = value;
            }
            get readyState() {
                return this[xhrReadyStateSymbol];
            }
            open(method, url) {
                switch (this[xhrReadyStateSymbol]) {
                case xhrUnsent:
                case xhrDone: {
                        changeReadyState(this, xhrOpened);
                        break;
                    }
                }
            }
            setRequestHeader(name, value) {
            }
            setTrustToken(trustToken) {
            }
            get timeout() {
                return this[xhrTimeoutSymbol];
            }
            set timeout(value) {
                this[xhrTimeoutSymbol] = value;
            }
            get withCredentials() {
                return this[xhrWithCredentialsSymbol];
            }
            set withCredentials(value) {
                switch (this[xhrReadyStateSymbol]) {
                case xhrUnsent:
                case xhrOpened: {
                        break;
                    }
                default: {
                        throw new DOMException('Failed to set the \'withCredentials\' property on \'XMLHttpRequest\': The value may only be set if the object\'s state is UNSENT or OPENED.');
                    }
                }
                this[xhrWithCredentialsSymbol] = !!value;
            }
            get upload() {
                return this[xhrUploadSymbol];
            }
            send() {
                if (this[xhrReadyStateSymbol] === xhrOpened && this[xhrDeferredHandleSymbol] === null) {
                    this[xhrDeferredHandleSymbol] = setTimeout(() => {
                        this[xhrDeferredHandleSymbol] = null;
                        changeReadyState(this, xhrDone);
                        this.dispatchEvent(new ProgressEvent('error'));
                        this.dispatchEvent(new ProgressEvent('loadend'));
                    }, 0);
                } else {
                    throw new DOMException('Failed to execute \'send\' on \'XMLHttpRequest\': The object\'s state must be OPENED.');
                }
            }
            abort() {
                if (this[xhrReadyStateSymbol] === xhrOpened && this[xhrDeferredHandleSymbol] !== null) {
                    clearTimeout(this[xhrDeferredHandleSymbol]);
                    this[xhrDeferredHandleSymbol] = null;
                    changeReadyState(this, xhrUnsent);
                    this.dispatchEvent(new ProgressEvent('abort'));
                    this.dispatchEvent(new ProgressEvent('loadend'));
                }
            }
            get responseURL() {
                return '';
            }
            get status() {
                return 0;
            }
            get statusText() {
                return '';
            }
            getResponseHeader(name) {
                return null;
            }
            overrideMimeType(mime) {
            }
            get responseType() {
                return this[xhrResponseTypeSymbol];
            }
            set responseType(value) {
                switch (this[xhrReadyStateSymbol]) {
                case xhrDone: {
                        throw new DOMException('Failed to set the \'responseType\' property on \'XMLHttpRequest\': The response type cannot be set if the object\'s state is LOADING or DONE.');
                    }
                }
                switch (value) {
                case '':
                case 'arraybuffer':
                case 'blob':
                case 'document':
                case 'json':
                case 'text': {
                        this[xhrResponseTypeSymbol] = value;
                        break;
                    }
                }
            }
            get response() {
                const responseType = this[xhrResponseTypeSymbol];
                return responseType === '' || responseType === 'text' ? '' : null;
            }
            get responseText() {
                const responseType = this[xhrResponseTypeSymbol];
                if (responseType === '' || responseType === 'text') {
                    return '';
                } else {
                    throw new DOMException('Failed to read the \'responseText\' property from \'XMLHttpRequest\': The value is only accessible if the object\'s \'responseType\' is \'\' or \'text\' (was \'arraybuffer\').');
                }
            }
            get responseXML() {
                return null;
            }
        }
        Object.defineProperty(XMLHttpRequest, 'UNSENT', {
            configurable: false,
            enumerable: true,
            value: xhrUnsent
        });
        Object.defineProperty(XMLHttpRequest, 'OPENED', {
            configurable: false,
            enumerable: true,
            value: xhrOpened
        });
        Object.defineProperty(XMLHttpRequest, 'HEADERS_RECEIVED', {
            configurable: false,
            enumerable: true,
            value: xhrHeadersReceived
        });
        Object.defineProperty(XMLHttpRequest, 'LOADING', {
            configurable: false,
            enumerable: true,
            value: xhrLoading
        });
        Object.defineProperty(XMLHttpRequest, 'DONE', {
            configurable: false,
            enumerable: true,
            value: xhrDone
        });
        exports.XMLHttpRequest = {
            configurable: true,
            enumerable: true,
            value: XMLHttpRequest,
            writable: true
        };
    })($___mock_5ca4651956d93028);
    const $___mock_177311337389c91d = {};
    (exports => {
        'use strict';
        let isSealed = false;
        class Storage {
            constructor() {
                if (isSealed) {
                    throw new TypeError('Illegal constructor');
                }
            }
            get length() {
                return Object.keys(this).length;
            }
            key(index) {
                const keys = Object.keys(this);
                if (index < 0 || index >= keys.length) {
                    return null;
                }
                return keys[index];
            }
            getItem(key) {
                return Object.prototype.hasOwnProperty.call(this, key) ? this[key] : null;
            }
            setItem(key, value) {
                this[key] = String(value);
            }
            removeItem(key) {
                delete this[key];
            }
            clear() {
                const keys = Object.keys(this);
                for (const key of keys) {
                    delete this[key];
                }
            }
        }
        exports.Storage = {
            configurable: true,
            enumerable: true,
            value: Storage,
            writable: true
        };
        const localStorage = new Storage();
        exports.localStorage = {
            configurable: true,
            enumerable: true,
            get() {
                return localStorage;
            }
        };
        const sessionStorage = new Storage();
        exports.sessionStorage = {
            configurable: true,
            enumerable: true,
            get() {
                return sessionStorage;
            }
        };
        isSealed = true;
    })($___mock_177311337389c91d);
    (function () {
        UET = $___var_05562f821b968c0e;
        ({}.constructor.defineProperty(UET, 'name', {
            configurable: true,
            enumerable: false,
            value: 'UET',
            writable: false
        }));
        UET_init = $___var_1293ea212bd98607;
        ({}.constructor.defineProperty(UET_init, 'name', {
            configurable: true,
            enumerable: false,
            value: 'UET_init',
            writable: false
        }));
        UET_push = $___var_e4a6ad6e4e690502;
        ({}.constructor.defineProperty(UET_push, 'name', {
            configurable: true,
            enumerable: false,
            value: 'UET_push',
            writable: false
        }));
        function $___var_05562f821b968c0e(o) {
            this.stringExists = function (n) {
                return n && n.length > 0;
            };
            this.domain = 'bat.bing.com';
            this.URLLENGTHLIMIT = 4096;
            this.pageLoadEvt = 'pageLoad';
            this.customEvt = 'custom';
            this.pageViewEvt = 'page_view';
            o.Ver = o.Ver !== undefined && (o.Ver === '1' || o.Ver === 1) ? 1 : 2;
            this.uetConfig = {};
            this.uetConfig.consent = {
                enabled: !1,
                adStorageAllowed: !0,
                adStorageUpdated: !1,
                hasWaited: !1,
                waitForUpdate: 0
            };
            this.beaconParams = {};
            this.supportsCORS = this.supportsXDR = !1;
            this.paramValidations = {
                string_currency: {
                    type: 'regex',
                    regex: /^[a-zA-Z]{3}$/,
                    error: '{p} value must be ISO standard currency code'
                },
                number: {
                    type: 'num',
                    digits: 3,
                    max: 999999999999
                },
                integer: {
                    type: 'num',
                    digits: 0,
                    max: 999999999999
                },
                hct_los: {
                    type: 'num',
                    digits: 0,
                    max: 30
                },
                date: {
                    type: 'regex',
                    regex: /^\d{4}-\d{2}-\d{2}$/,
                    error: '{p} value must be in YYYY-MM-DD date format'
                },
                'enum': {
                    type: 'enum',
                    error: '{p} value must be one of the allowed values'
                },
                array: {
                    type: 'array',
                    error: '{p} must be an array with 1+ elements'
                }
            };
            this.knownParams = {
                event_action: { beacon: 'ea' },
                event_category: { beacon: 'ec' },
                event_label: { beacon: 'el' },
                event_value: {
                    type: 'number',
                    beacon: 'ev'
                },
                page_title: {},
                page_location: {},
                page_path: {},
                ecomm_prodid: { beacon: 'prodid' },
                ecomm_pagetype: {
                    type: 'enum',
                    values: [
                        'home',
                        'searchresults',
                        'category',
                        'product',
                        'cart',
                        'purchase',
                        'other'
                    ],
                    beacon: 'pagetype'
                },
                ecomm_totalvalue: { type: 'number' },
                ecomm_category: {},
                ecomm_query: {},
                ecomm_exp: {},
                hct_base_price: { type: 'number' },
                hct_booking_xref: {},
                hct_checkin_date: { type: 'date' },
                hct_checkout_date: { type: 'date' },
                hct_length_of_stay: { type: 'hct_los' },
                hct_partner_hotel_id: {},
                hct_total_price: { type: 'number' },
                hct_pagetype: {
                    type: 'enum',
                    values: [
                        'home',
                        'searchresults',
                        'offerdetail',
                        'conversionintent',
                        'conversion',
                        'property',
                        'cart',
                        'purchase',
                        'cancel',
                        'other'
                    ]
                },
                travel_destid: {},
                travel_originid: {},
                travel_pagetype: {
                    type: 'enum',
                    values: [
                        'home',
                        'searchresults',
                        'offerdetail',
                        'conversionintent',
                        'conversion',
                        'cancel',
                        'other'
                    ]
                },
                travel_startdate: { type: 'date' },
                travel_enddate: { type: 'date' },
                travel_totalvalue: { type: 'number' },
                flight_destid: {},
                flight_originid: {},
                flight_pagetype: {
                    type: 'enum',
                    values: [
                        'home',
                        'searchresults',
                        'offerdetail',
                        'cart',
                        'purchase',
                        'cancel',
                        'other'
                    ]
                },
                flight_startdate: { type: 'date' },
                flight_enddate: { type: 'date' },
                flight_totalvalue: { type: 'number' },
                affiliation: {},
                brs_response_id: {},
                checkout_option: {},
                checkout_step: { type: 'integer' },
                content_id: {},
                content_type: {},
                coupon: {},
                currency: {
                    type: 'string_currency',
                    beacon: 'gc'
                },
                description: {},
                fatal: {},
                method: {},
                name: {},
                revenue_value: {
                    type: 'number',
                    beacon: 'gv'
                },
                screen_name: {},
                search_term: {},
                shipping: { type: 'number' },
                tax: { type: 'number' },
                transaction_id: {},
                rep: {},
                vid: {},
                items: { type: 'array' },
                'items.brand': {},
                'items.category': {},
                'items.creative_name': {},
                'items.creative_slot': {},
                'items.id': {},
                'items.list_name': {},
                'items.list_position': { type: 'integer' },
                'items.location_id': {},
                'items.name': {},
                'items.price': { type: 'number' },
                'items.quantity': { type: 'number' },
                'items.variant': {},
                promotions: { type: 'array' },
                'promotions.creative_name': {},
                'promotions.creative_slot': {},
                'promotions.id': {},
                'promotions.name': {}
            };
            this.knownEvents = {
                add_payment_info: [],
                add_to_cart: [
                    'revenue_value',
                    'currency',
                    'items'
                ],
                add_to_wishlist: [
                    'revenue_value',
                    'currency',
                    'items'
                ],
                begin_checkout: [
                    'revenue_value',
                    'currency',
                    'items',
                    'coupon'
                ],
                checkout_progress: [
                    'revenue_value',
                    'currency',
                    'items',
                    'coupon',
                    'checkout_step',
                    'checkout_option'
                ],
                exception: [
                    'description',
                    'fatal'
                ],
                generate_lead: [
                    'revenue_value',
                    'currency',
                    'transaction_id'
                ],
                login: ['method'],
                page_view: [
                    'page_title',
                    'page_location',
                    'page_path',
                    'rep'
                ],
                purchase: [
                    'transaction_id',
                    'revenue_value',
                    'currency',
                    'tax',
                    'shipping',
                    'items',
                    'coupon'
                ],
                refund: [
                    'transaction_id',
                    'revenue_value',
                    'currency',
                    'tax',
                    'shipping',
                    'items'
                ],
                remove_from_cart: [
                    'revenue_value',
                    'currency',
                    'items'
                ],
                screen_view: ['screen_name'],
                search: ['search_term'],
                select_content: [
                    'items',
                    'promotions',
                    'content_type',
                    'content_id'
                ],
                set_checkout_option: [
                    'checkout_step',
                    'checkout_option'
                ],
                share: [
                    'method',
                    'content_type',
                    'content_id'
                ],
                sign_up: ['method'],
                view_item: ['items'],
                view_item_list: ['items'],
                view_promotion: ['promotions'],
                view_search_results: ['search_term']
            };
            this.pageLevelParams = {};
            this.legacyValidPageLoadKeyNames = { rep: 1 };
            this.legacyValidCustomEventKeyNames = {
                ec: 1,
                el: 1,
                ev: 1,
                ea: 1,
                gv: 1,
                gc: 1,
                prodid: 1,
                pagetype: 1
            };
            this.ambiguousValidCustomEventKeyNames = {
                ecomm_prodid: 1,
                ecomm_pagetype: 1,
                rep: 1
            };
            this.validRetailPageTypeValues = {
                home: 1,
                searchresults: 1,
                category: 1,
                product: 1,
                cart: 1,
                purchase: 1,
                other: 1
            };
            this.invalidKeyException = 'Invalid data: Key Name: ';
            this.invalidEventException = 'Invalid event type: Event Type: ';
            this.invalidPageTypeException = 'Invalid pagetype value: ';
            this.invalidProdIdException = 'The prodid value must be within 1 to 50 characters.';
            this.missingPageTypeException = 'The pagetype parameter is required when you include the prodid parameter.';
            this.goalCurrencyFormatException = 'gc value must be ISO standard currency code';
            this.missingHotelParametersException = 'The hotel total price (hct_total_price) and currency parameters are required when you include other hotel parameters.';
            this.hotelVariableRevenueException = 'The variable revenue parameter (revenue_value) cannot be sent when you include other hotel parameters.';
            this.evq = o.q instanceof Array ? o.q : [];
            this.evqDispatch = !1;
            this.pageLoadDispatch = !1;
            this.documentLoaded = !1;
            this.eventPushQueue = [];
            var n = this;
            this.domainName = null;
            this.sessionCookieName = '_uetsid';
            this.sessionExpirationTime = 86400;
            this.visitorExpirationTime = 33696000;
            this.cookieIdMaxLength = 36;
            this.msClkIdCookieValuePrefix = '_uet';
            this.msClkIdCookieName = '_uetmsclkid';
            this.msClkIdParamName = 'msclkid';
            this.msClkIdExpirationTime = 7776000;
            this.lengthMsClkId = 32;
            this.msClkId = null;
            this.subVersion = 1;
            this.previousPage = null;
            this.checkuetHostdocumentload = function () {
                if (this.documentLoaded = !!document.body && (!document.readyState || document.readyState === 'interactive' || document.readyState === 'complete' || document.readyState === 'loaded'), n.documentLoaded) {
                    if (n.uetConfig.consent.enabled && !n.uetConfig.consent.hasWaited && n.uetConfig.consent.waitForUpdate > 0)
                        n.uetConfig.consent.hasWaited = !0, setTimeout(function () {
                            n.checkuetHostdocumentload();
                        }, n.uetConfig.consent.waitForUpdate);
                    else if (n.eventPushQueue.length > 0) {
                        for (var t = 0; t < n.eventPushQueue.length; t++)
                            n._push(n.eventPushQueue[t]);
                        n.eventPushQueue = [];
                    }
                } else
                    setTimeout(function () {
                        n.checkuetHostdocumentload();
                    }, 5);
            };
            this.loadConfig = function () {
                const $___old_905aaad097096f12 = {}.constructor.getOwnPropertyDescriptor(window, 'XMLHttpRequest'), $___old_bac27771013451a2 = {}.constructor.getOwnPropertyDescriptor(window, 'XMLHttpRequest');
                try {
                    if ($___old_905aaad097096f12)
                        ({}.constructor.defineProperty(window, 'XMLHttpRequest', $___mock_5ca4651956d93028.XMLHttpRequest));
                    if ($___old_bac27771013451a2)
                        ({}.constructor.defineProperty(window, 'XMLHttpRequest', $___mock_5ca4651956d93028.XMLHttpRequest));
                    return function () {
                        var t, e, r, u, f, i, n;
                        this.uetConfig.cookieAllowed = !0;
                        o.storeConvTrackCookies === !1 && (this.uetConfig.cookieAllowed = !1);
                        this.uetConfig.cookieDomain = '';
                        o.hasOwnProperty('cookieDomain') && o.cookieDomain && typeof o.cookieDomain == 'string' && (this.uetConfig.cookieDomain = o.cookieDomain);
                        this.uetConfig.cookieFlags = '';
                        o.hasOwnProperty('cookieFlags') && o.cookieFlags && typeof o.cookieFlags == 'string' && (this.uetConfig.cookieFlags = o.cookieFlags);
                        this.uetConfig.navTimingApi = !1;
                        o.navTimingApi === !0 && (this.uetConfig.navTimingApi = !0);
                        this.uetConfig.errorBeaconLevel = 0;
                        o.hasOwnProperty('errorBeaconLevel') && (t = o.errorBeaconLevel, typeof t == 'number' && t % 1 == 0 && t >= 0 && t <= 2 && (this.uetConfig.errorBeaconLevel = t));
                        this.uetConfig.disableAutoPageView = !1;
                        o.disableAutoPageView === !0 && (this.uetConfig.disableAutoPageView = !0);
                        this.uetConfig.disableVisibilityEvents = !1;
                        o.disableVisibilityEvents === !0 && (this.uetConfig.disableVisibilityEvents = !0);
                        this.uetConfig.removeQueryFromUrls = !1;
                        o.removeQueryFromUrls === !0 && (this.uetConfig.removeQueryFromUrls = !0);
                        this.uetConfig.allRep = !1;
                        o.allRep === !0 && (this.uetConfig.allRep = !0);
                        e = '_uetmsdns';
                        o.hasOwnProperty('msDnsCookie') && o.msDnsCookie && typeof o.msDnsCookie == 'string' && (e = o.msDnsCookie);
                        this.uetConfig.msDns = this.getCookie(e, '', 1) === '1';
                        this.uetConfig.disableUetVid = !1;
                        o.disableUetVid === !0 && (this.uetConfig.disableUetVid = !0);
                        this.uetConfig.vidCookie = '_uetvid';
                        this.uetConfig.uidCookie = '_uetuid';
                        o.hasOwnProperty('uidCookie') && o.uidCookie && typeof o.uidCookie == 'string' && (this.uetConfig.uidCookie = o.uidCookie);
                        o.hasOwnProperty('clarityProjectId') && o.clarityProjectId && typeof o.clarityProjectId == 'string' && (n = document.createElement('script'), n.src = 'https://clarity.microsoft.com/js/' + o.clarityProjectId, n.type = 'text/javascript', n.setAttribute('crossorigin', 'anonymous'), n.async = 1, n.onload = this.clarityOnLoad, document.head.appendChild(n));
                        window.XMLHttpRequest !== undefined && 'withCredentials' in new XMLHttpRequest() && (this.supportsCORS = !0);
                        typeof XDomainRequest != 'undefined' && (this.supportsXDR = !0);
                        r = 'https:';
                        u = 0;
                        o.Ver === 1 && o.advertiserId !== undefined && (u = o.advertiserId);
                        this.postURL = r + '//' + this.domain + '/action/' + u;
                        this.urlPrefix = this.postURL + '?';
                        this.errPrefix = r + '//' + this.domain + '/action-err/' + u + '?';
                        this.previewPrefix = r + '//' + this.domain + '/actionp/' + u + '?';
                        o.Ver !== 1 ? (this.stringExists(o.tagId) && !this.stringExists(o.ti) && (o.ti = o.tagId), f = {
                            ti: 0,
                            Ver: 0,
                            tm: 1,
                            Tag: 0,
                            EXT_Data: 0
                        }) : f = {
                            Ver: 0,
                            tagId: 0,
                            Tag: 0,
                            Sig: 0,
                            EXT_Data: 0
                        };
                        for (i in o)
                            f.hasOwnProperty(i) && (this.beaconParams[i] = f[i] === 1 ? encodeURIComponent(o[i]) : o[i]);
                        this.beaconParams.mid = this.getUuidV4(!0);
                        this.stringExists(o.ti) && (n = document.createElement('script'), n.src = r + '//' + this.domain + '/p/action/' + o.ti + '.js', n.type = 'text/javascript', n.async = 1, document.head.appendChild(n));
                    }.apply(this, arguments);
                } finally {
                    if ($___old_905aaad097096f12)
                        ({}.constructor.defineProperty(window, 'XMLHttpRequest', $___old_905aaad097096f12));
                    if ($___old_bac27771013451a2)
                        ({}.constructor.defineProperty(window, 'XMLHttpRequest', $___old_bac27771013451a2));
                }
            };
            this.push = function () {
                var t = arguments, i, r, u = !1;
                if (t.length === 1)
                    if (i = 'event', t[0] === this.pageLoadEvt)
                        r = [
                            this.pageViewEvt,
                            {}
                        ], u = !0;
                    else {
                        if (t[0] instanceof Array)
                            if (t[0].length > 0)
                                t[0] = t[0][0];
                            else
                                return;
                        r = [
                            '',
                            t[0] || {}
                        ];
                        u = !0;
                    }
                else if (t.length > 1 && t[0] !== this.pageLoadEvt)
                    i = t[0], r = Array.prototype.slice.call(t, 1);
                else
                    return;
                n.documentLoaded || i === 'set' || i === 'consent' ? n._push([
                    i,
                    r,
                    u
                ]) : n.eventPushQueue.push([
                    i,
                    r,
                    u
                ]);
            };
            this._push = function (n) {
                var e, r, o, u, t, f, i;
                if (n[1] instanceof Array)
                    if (n[0] === 'event') {
                        if (e = n[1][1] || {}, r = n[1][0], r === null || r === undefined)
                            return;
                        o = r === this.pageViewEvt ? this.pageLoadEvt : this.customEvt;
                        this.evt(o, r, e, n[2]);
                    } else if (n[0] === 'set') {
                        if (typeof n[1][0] != 'object')
                            return;
                        for (u in n[1][0])
                            this.knownParams.hasOwnProperty(u) && (this.pageLevelParams[u] = n[1][0][u]);
                    } else if (n[0] === 'consent') {
                        if (this.uetConfig.consent.enabled = !0, t = n[1][1], f = n[1][0], t === null || typeof t != 'object')
                            return;
                        f === 'default' ? (t.hasOwnProperty('ad_storage') && this.uetConfig.consent.adStorageUpdated === !1 && (this.uetConfig.consent.adStorageAllowed = t.ad_storage !== 'denied'), t.hasOwnProperty('wait_for_update') && (i = parseInt(t.wait_for_update, 10), !isNaN(i) && i > 0 && (i = Math.min(i, 10000), this.uetConfig.consent.waitForUpdate = i))) : f === 'update' && t.hasOwnProperty('ad_storage') && (this.uetConfig.consent.adStorageAllowed = t.ad_storage !== 'denied', this.uetConfig.consent.adStorageUpdated = !0, this.uetConfig.consent.adStorageAllowed ? this.pageLoadDispatch && this.addMsClkId({}) : (delete this.beaconParams.sid, delete this.beaconParams.vid));
                    }
            };
            this.dispatchq = function (n) {
                var t, i, r, u, e, o, f;
                for (n || (this.evqDispatch = !0, this.uetConfig.disableVisibilityEvents === !1 && 'onpagehide' in window && (window.addEventListener('pageshow', this.firePageShow.bind(this)), window.addEventListener('pagehide', this.firePageHide.bind(this)))), r = 0; r < this.evq.length; r++)
                    if (typeof this.evq[r] == 'object') {
                        if (u = this.evq[r], t === 'set')
                            n && this.push(t, u);
                        else if (t === 'consent')
                            n && i !== undefined && this.push(t, i, u);
                        else if (!n)
                            if (t === 'event') {
                                e = !1;
                                for (o in this.legacyValidCustomEventKeyNames)
                                    if (u.hasOwnProperty(o)) {
                                        e = !0;
                                        break;
                                    }
                                i !== undefined && (this.push(t, i, e ? {} : u), e && this.push(u));
                            } else
                                this.push(u);
                        t = i = undefined;
                    } else
                        typeof this.evq[r] == 'string' || this.evq[r] instanceof String ? (t !== undefined && i !== undefined && (n || this.push(t, i, {}), t = i = undefined), f = this.evq[r], t === undefined && (f === 'set' || f === 'consent' || f === 'event') ? t = f : t !== undefined && i === undefined ? i = f : t = i = undefined, r !== this.evq.length - 1 || t !== 'event' || n || i === undefined || this.push(t, i, {})) : t = i = undefined;
            };
            this.invisibleDiv = null;
            this.invisibleFrame = null;
            this._SB = function (n) {
                return (n + 256).toString(16).substring(1, 3);
            };
            this._SU = function (n, t) {
                for (var r = '', i = 0; i < 16; i++)
                    t && i >= 4 && i <= 10 && i % 2 == 0 && (r += '-'), r += this._SB(n[i]);
                return r;
            };
            this.getRandomValues = window.crypto && window.crypto.getRandomValues && window.crypto.getRandomValues.bind(window.crypto) || window.msCrypto && window.msCrypto.getRandomValues && window.msCrypto.getRandomValues.bind(window.msCrypto) || function (n) {
                for (var t = 0; t < n.length; t++)
                    n[t] = Math.floor(Math.random() * 256);
            };
            this.getUuidV1 = function (n) {
                var r, i, t, u;
                try {
                    for (r = new Uint8Array(10), this.getRandomValues(r), i = (Date.now() + 12219292800000) * 10000 + (r[8] + (r[9] << 8)) % 10000, t = new Uint8Array(16), t[3] = i & 255, t[2] = i >> 8 & 255, t[1] = i >> 16 & 255, t[0] = i >> 24 & 255, i /= 4294967296, t[5] = i & 255, t[4] = i >> 8 & 255, t[7] = i >> 16 & 255, t[6] = i >> 24 & 255, u = 0; u < 8; u++)
                        t[u + 8] = r[u];
                    return t[8] &= 63, t[8] |= 128, t[6] &= 15, t[6] |= 16, t[10] |= 1, this._SU(t, n);
                } catch (f) {
                    return '';
                }
            };
            this.getUuidV4 = function (n) {
                try {
                    var t = new Uint8Array(16);
                    return this.getRandomValues(t), t[8] &= 63, t[8] |= 128, t[6] &= 15, t[6] |= 64, this._SU(t, n);
                } catch (i) {
                    return '';
                }
            };
            this.stringifyToRequest = function (n, t) {
                var u = '', r = '', i;
                t && (r = t + '.');
                for (i in n)
                    u += typeof n[i] == 'object' ? this.stringifyToRequest(n[i], r + i) : r + i + '=' + n[i] + '&';
                return u;
            };
            this.createInvisibleElement = function (n, t) {
                var i = document.createElement(t);
                return i.setAttribute('style', 'width:0px; height:0px; display:none; visibility:hidden;'), i.id = 'batBeacon' + Math.floor(Math.random() * 1000000000000), n.appendChild(i), i;
            };
            this.createInvisibleDiv = function (n) {
                return this.invisibleDiv = this.createInvisibleElement(n, 'div'), this.invisibleDiv.id;
            };
            this.fireBeaconImg = function (n) {
                var t = this.createInvisibleElement(this.invisibleDiv, 'img'), i, r;
                return t.width = 0, t.height = 0, i = Math.floor(Math.random() * 1000000), r = n + '&rn=' + i, t.setAttribute('alt', ''), o.alt && t.setAttribute('alt', o.alt), t.setAttribute('src', r), i;
            };
            this.addLoadTime = function (n) {
                var t, e, r, u;
                if (window.performance && (t = window.performance.timing.domContentLoadedEventEnd, window.performance.timing.loadEventEnd && (t = window.performance.timing.loadEventEnd), t !== undefined && t !== 0 && (e = t - window.performance.timing.navigationStart, n.lt = e), this.uetConfig.navTimingApi && window.performance.timing != null)) {
                    var f = [
                            'navigationStart',
                            'unloadEventStart',
                            'unloadEventEnd',
                            'redirectStart',
                            'redirectEnd',
                            'fetchStart',
                            'domainLookupStart',
                            'domainLookupEnd',
                            'connectStart',
                            'connectEnd',
                            'secureConnectionStart',
                            'requestStart',
                            'responseStart',
                            'responseEnd',
                            'domLoading',
                            'domInteractive',
                            'domContentLoadedEventStart',
                            'domContentLoadedEventEnd',
                            'domComplete',
                            'loadEventStart',
                            'loadEventEnd'
                        ], o = window.performance.timing[f[0]], i = o;
                    for (r = 1; r < f.length; r++)
                        u = window.performance.timing[f[r]], i += ',', i += u == null || u === 0 ? '' : u - o;
                    i.length <= 150 && (n.pt = i);
                    window.performance.navigation != null && (n.pn = window.performance.navigation.type + ',' + window.performance.navigation.redirectCount);
                }
                return n;
            };
            this.hashCode = function (n) {
                var t = 0, i, r;
                if (n.length === 0)
                    return t;
                for (i = 0; i < n.length; i++)
                    r = n.charCodeAt(i), t = (t << 5) - t + r, t = t & t;
                return t;
            };
            this.addPluginData = function (n) {
                for (var r, u, t, f = [], i = 0; i < window.navigator.plugins.length; i++)
                    f.push({ name: window.navigator.plugins[i].name });
                for (r = f.sort(function (n, t) {
                        return n.name > t.name ? 1 : n.name < t.name ? -1 : 0;
                    }), u = '', t = 0; t < r.length; t++)
                    u += r[t].name;
                return n.pi = this.hashCode(u), n;
            };
            this.addFraudSignals = function (n) {
                n = this.addPluginData(n);
                var t = window.navigator.userLanguage || window.navigator.language;
                return this.stringExists(t) && (n.lg = t), screen && (screen.width && (n.sw = screen.width), screen.height && (n.sh = screen.height), screen.colorDepth && (n.sc = screen.colorDepth)), n;
            };
            this.addUrlData = function (n) {
                var u, i, r, t, f, e;
                if (window.self != window.top)
                    try {
                        for (u = 0, i = window.self; u <= 5 && i != null && i != window.top; u++, i = i.parent)
                            if (i.document != null && this.stringExists(i.document.referrer) && i.document.referrer.toLowerCase() !== 'about:blank') {
                                t = i.document.referrer;
                                this.uetConfig.removeQueryFromUrls === !0 && (t = t.split('?')[0]);
                                n.p = encodeURIComponent(t);
                                n.r = '';
                                break;
                            }
                    } catch (o) {
                    }
                else
                    r = window.document.referrer, t = window.location.href, this.uetConfig.removeQueryFromUrls === !0 && (t = t.split('?')[0], r = r.split('?')[0]), f = window.location.hash, e = t.indexOf(f) >= 0 ? t : t + f, n.p = encodeURIComponent(e), n.r = encodeURIComponent(r);
                return n;
            };
            this.extractMsClkId = function (n) {
                this.stringExists(this.msClkId) || (this.msClkId = this.getQueryParam(n.p, this.msClkIdParamName));
            };
            this.addPageData = function (n, t) {
                var i, r;
                return t = t === !0, n = this.addFraudSignals(n), i = window.document.title, this.stringExists(i) && !this.stringExists(n.tl) && (n.tl = encodeURIComponent(i).replace(/%2C/gi, ',')), window.document.head.getElementsByTagName('meta').keywords && (r = window.document.head.getElementsByTagName('meta').keywords.content, this.stringExists(r) && (n.kw = encodeURIComponent(r).replace(/%2C/gi, ','))), t ? this.stringExists(this.previousPage) && !n.hasOwnProperty('r') && (n.r = this.previousPage) : (n = this.addUrlData(n), n = this.addLoadTime(n)), n;
            };
            this.removeTrailingAmp = function (n) {
                var t = n.charAt(n.length - 1);
                return (t === '&' || t === '?') && (n = n.substring(0, n.length - 1)), n;
            };
            this.throwError = function (n) {
                var t, i;
                if (typeof CustomEvent == 'function' && (t = {
                        errMsg: n,
                        tagId: o.ti
                    }, i = new CustomEvent('uetError', { detail: t }), window.dispatchEvent(i)), this.uetConfig.errorBeaconLevel > 0) {
                    this.invisibleDiv || this.createInvisibleDiv(document.body);
                    var r = this.combine(this.beaconParams, { errMsg: encodeURIComponent(n) }), u = this.stringifyToRequest(r), f = this.removeTrailingAmp(this.errPrefix + u);
                    this.fireBeaconImg(f);
                }
                throw n;
            };
            this.validateValue = function (n, t, i, r) {
                var u = 0, f = t, e = i === undefined || i === 0 ? !0 : !1;
                return t.toString().indexOf(',') !== -1 && (f = t.replace(/,/g, '')), u = parseFloat(f), (isNaN(f) || isNaN(u) || e && u.toString().indexOf('.') !== -1) && this.throwError(n + ' should be ' + (e ? 'an integer' : 'a number')), u > r ? this.throwError(n + ' cannot be greater than ' + r) : u < 0 ? this.throwError(n + ' cannot be less than 0') : this.getDecimalPlaces(u) > i && this.throwError(n + ' cannot have more than ' + i + ' decimal places'), u;
            };
            this.validateRegex = function (n, t, i) {
                var r = n === null || n === undefined ? '' : n.toString();
                return r.match(t) || this.throwError(i), r;
            };
            this.encodeParameter = function (n) {
                var t = n === null || n === undefined ? '' : n.toString();
                return t.replace(/&/gi, '%26').replace(/#/gi, '%23');
            };
            this._validateProdId = function (n) {
                return (n === null || n === undefined) && this.throwError(this.invalidProdIdException), n = n.toString(), (n.length < 1 || n.length > 50) && this.throwError(this.invalidProdIdException), n;
            };
            this.validateProdId = function (n) {
                var i = '', t;
                if (n instanceof Array) {
                    for (t = 0; t < n.length; t++)
                        n[t] instanceof Array && this.throwError(this.invalidProdIdException), n[t] !== null && n[t] !== undefined && (i += i !== '' ? ',' : '', i += encodeURIComponent(this._validateProdId(n[t])));
                    i === '' && this.throwError(this.invalidProdIdException);
                } else
                    i = encodeURIComponent(this._validateProdId(n));
                return i;
            };
            this.validatePageType = function (n, t) {
                (n === null || n === undefined) && this.throwError(this.invalidPageTypeException + n);
                var i = n.toString().toLowerCase();
                return t[i] || this.throwError(this.invalidPageTypeException + i), i;
            };
            this.getDecimalPlaces = function (n) {
                var i = parseFloat(n), t;
                return isNaN(n) || isNaN(i) ? 0 : (t = ('' + n).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/), !t) ? 0 : Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0));
            };
            this.validateParameter = function (n, t, i) {
                var r, u;
                if (t.match(/^[a-z_]{2,32}$/) || this.throwError(n + ' invalid parameter name'), i.type == null || this.paramValidations[i.type] == null)
                    return n.toString();
                r = this.paramValidations[i.type];
                switch (r.type) {
                case 'regex':
                    u = r.error.replace('{p}', t);
                    n = this.validateRegex(n, r.regex, u);
                    break;
                case 'num':
                    n = this.validateValue(t, n, r.digits, r.max);
                    break;
                case 'enum':
                    n = n.toString().toLowerCase();
                    n !== '' && i.values.indexOf(n) === -1 && this.throwError(r.error.replace('{p}', t));
                    break;
                case 'array':
                    (!(n instanceof Array) || n.length < 1) && this.throwError(r.error.replace('{p}', t));
                    n = this.validateParameterArray(n, t);
                    break;
                default:
                    n = n.toString();
                }
                return n;
            };
            this.validateParameterArray = function (n, t) {
                for (var i = 0; i < n.length; i++)
                    typeof n[i] == 'object' && (n[i] = this.validateSubparams(n[i], t + '.'), n[i] = this.removeTrailingAmp(this.stringifyToRequest(n[i])));
                return n.join(',');
            };
            this.validateSubparams = function (n, t) {
                var f = {}, i, u, r;
                for (i in n)
                    if (this.knownParams.hasOwnProperty(t + i) && n[i] != null) {
                        if (u = this.knownParams[t + i], r = this.validateParameter(n[i], i, u), typeof r == 'string' || r instanceof String) {
                            if (r === '')
                                continue;
                            r = encodeURIComponent(r);
                        }
                        f[u.hasOwnProperty('beacon') ? u.beacon : i] = r;
                    }
                return f;
            };
            this.eventBasicChecks = function (n, t) {
                n || this.throwError(this.invalidEventException + 'undefined event.');
                n !== this.pageLoadEvt && n !== this.customEvt && this.throwError(this.invalidEventException + n);
                t || this.throwError('undefined data object passed to validate');
                typeof t != 'object';
            };
            this.validateDataObjectNew = function (n, t) {
                var u, f, e, r, i;
                if (this.eventBasicChecks(n, t), !t.hasOwnProperty('ecomm_prodid') || t.ecomm_prodid == null || typeof t.ecomm_prodid == 'string' && t.ecomm_prodid.toString() === '' || (t.ecomm_prodid = this.validateProdId(t.ecomm_prodid)), u = t.event_action, u != null && this.knownEvents.hasOwnProperty(u)) {
                    f = this.knownEvents[u];
                    for (e in f)
                        r = f[e], this.pageLevelParams.hasOwnProperty(r) && !t.hasOwnProperty(r) && (t[r] = this.pageLevelParams[r]);
                }
                return i = this.validateSubparams(t, ''), !i.hasOwnProperty('pagetype') && i.hasOwnProperty('prodid') && this.throwError(this.missingPageTypeException), (i.hasOwnProperty('hct_base_price') || i.hasOwnProperty('hct_booking_xref') || i.hasOwnProperty('hct_pagetype') || i.hasOwnProperty('hct_checkin_date') || i.hasOwnProperty('hct_checkout_date') || i.hasOwnProperty('hct_length_of_stay') || i.hasOwnProperty('hct_partner_hotel_id')) && (i.hasOwnProperty('hct_total_price') && i.hasOwnProperty('gc') || this.throwError(this.missingHotelParametersException)), i.hasOwnProperty('hct_total_price') && i.hasOwnProperty('gv') && this.throwError(this.hotelVariableRevenueException), i;
            };
            this.validateDataObject = function (n, t) {
                var i, r, u, f;
                this.eventBasicChecks(n, t);
                for (i in t)
                    n === this.customEvt && (this.legacyValidCustomEventKeyNames[i] || this.ambiguousValidCustomEventKeyNames[i]) || n === this.pageLoadEvt && this.legacyValidPageLoadKeyNames[i] || this.throwError(this.invalidKeyException + i);
                t.hasOwnProperty('ev') > 0 && (t.ev = this.validateValue('ev', t.ev, 3, 999999999999));
                t.hasOwnProperty('gv') > 0 && (t.gv = this.validateValue('gv', t.gv, 3, 999999999999));
                t.hasOwnProperty('gc') > 0 && (t.gc = this.validateRegex(t.gc, /^[a-zA-Z]{3}$/, this.goalCurrencyFormatException));
                t.hasOwnProperty('ec') > 0 && t.ec !== null && t.ec !== undefined && (r = encodeURIComponent(t.ec), t.ec = this.encodeParameter(t.ec), t.ec !== r && (t.ec2 = r));
                t.hasOwnProperty('ea') > 0 && t.ea !== null && t.ea !== undefined && (u = encodeURIComponent(t.ea), t.ea = this.encodeParameter(t.ea), t.ea !== u && (t.ea2 = u));
                t.hasOwnProperty('el') > 0 && t.el !== null && t.el !== undefined && (f = encodeURIComponent(t.el), t.el = this.encodeParameter(t.el), t.el !== f && (t.el2 = f));
                t.hasOwnProperty('ecomm_prodid') > 0 && (t.prodid = t.ecomm_prodid, delete t.ecomm_prodid);
                t.hasOwnProperty('ecomm_pagetype') > 0 && (t.pagetype = t.ecomm_pagetype, delete t.ecomm_pagetype);
                t.hasOwnProperty('pagetype') && (t.pagetype == null || t.pagetype.toString() === '') && delete t.pagetype;
                t.hasOwnProperty('prodid') && (t.prodid == null || typeof t.prodid == 'string' && t.prodid === '') && delete t.prodid;
                t.hasOwnProperty('pagetype') > 0 ? (t.pagetype = this.validatePageType(t.pagetype, this.validRetailPageTypeValues), t.hasOwnProperty('prodid') > 0 && (t.prodid = this.validateProdId(t.prodid))) : t.hasOwnProperty('prodid') > 0 && this.throwError(this.missingPageTypeException);
            };
            this.evt = function (n, t, i, r) {
                var o, a, v, s, h, u, c, e, y, l, f;
                if (r = r !== !1, i = i || {}, this.evqDispatch === !1 && this.dispatchq(!0), this.uetConfig.disableAutoPageView === !0 && this.evqDispatch === !1 && this.dispatchq(!1), typeof i == 'object') {
                    if (this.uetConfig.allRep === !0 ? i.rep = '1' : i.hasOwnProperty('rep') && (i.rep === 1 || i.rep === '1' || i.rep === !0 ? i.rep = '1' : delete i.rep), r ? this.validateDataObject(n, i) : (i.event_action = t, i = this.validateDataObjectNew(n, i)), n === this.customEvt) {
                        o = [];
                        for (a in i)
                            o.push(a);
                        if (o.length === 0)
                            return;
                        r || (i.en = 'Y');
                    } else if (n === this.pageLoadEvt) {
                        if (i.ea != null && this.knownEvents.hasOwnProperty(i.ea)) {
                            v = this.knownEvents[i.ea];
                            for (s in i)
                                v.indexOf(s) === -1 && delete i[s];
                        }
                        if (h = !r && i.hasOwnProperty('page_path'), h) {
                            if (i.spa = 'Y', this.pageLoadDispatch === !1 ? (u = {}, u = this.addPageData(u, !1), this.stringExists(u.p) && (this.previousPage = u.p), i.r = u.r, i.lt = u.lt, u.hasOwnProperty('pt') && (i.pt = u.pt), u.hasOwnProperty('pn') && (i.pn = u.pn)) : (this.firePageHide(), this.beaconParams.mid = this.getUuidV4(!0)), i.hasOwnProperty('page_title') && (i.tl = i.page_title, delete i.page_title), this.stringExists(this.previousPage)) {
                                if (c = this.previousPage.toUpperCase(), e = c.indexOf('%3A%2F%2F'), e === -1)
                                    return;
                                y = i.page_path.substring(0, 3).toUpperCase() === '%2F';
                                y ? (e += 9, l = c.indexOf('%2F', e), i.p = l === -1 ? this.previousPage + i.page_path : this.previousPage.substring(0, l) + i.page_path) : i.p = this.previousPage;
                            }
                        } else {
                            if (this.pageLoadDispatch === !0)
                                return;
                            if (this.uetConfig.disableAutoPageView === !0 && r)
                                return;
                        }
                        this.pageLoadDispatch === !1 && (this.pageLoadDispatch = !0);
                        i = this.addPageData(i, h);
                        this.stringExists(i.p) && (this.previousPage = i.p);
                    }
                    this.invisibleDiv || this.createInvisibleDiv(document.body);
                    i.evt = n;
                    window.self != window.top && (i.ifm = 1);
                    this.addCookieId(this.beaconParams, 'sid', '', this.sessionCookieName, this.sessionExpirationTime);
                    this.addCookieId(this.beaconParams, 'uid', '', this.uetConfig.uidCookie, 0);
                    this.pageLevelParams.hasOwnProperty('vid') ? (f = this.pageLevelParams.vid, typeof f == 'string' && this.stringExists(f) && (f = f.replace(/[-{}]/g, '').toLowerCase(), f.match(/^[0-9a-f]{32}$/) && (this.beaconParams.vid = f, this.beaconParams.vids = '3'))) : this.uetConfig.disableUetVid || this.addCookieId(this.beaconParams, 'vid', 'vids', this.uetConfig.vidCookie, this.uetConfig.disableUetVid ? 0 : this.visitorExpirationTime);
                    i = this.addMsClkId(i);
                    n === this.pageLoadEvt && (i.sv = this.subVersion);
                    this.uetConfig.consent.enabled === !0 && (i.asc = this.uetConfig.consent.adStorageAllowed ? 'G' : 'D');
                    this.uetConfig.msDns !== !0 && (this.fireBeacon(i), i.abf = !0);
                    n === this.pageLoadEvt && this.evqDispatch === !1 && this.dispatchq(!1);
                }
            };
            this.removeLocalStorageBackup = function (n) {
                try {
                    localStorage.removeItem(n + '_exp');
                    localStorage.removeItem(n);
                } catch (t) {
                }
            };
            this.setLocalStorageBackup = function (n, t, i) {
                const $___old_715aebc2e82e36f0 = {}.constructor.getOwnPropertyDescriptor(window, 'localStorage');
                try {
                    if ($___old_715aebc2e82e36f0)
                        ({}.constructor.defineProperty(window, 'localStorage', $___mock_177311337389c91d.localStorage));
                    return function () {
                        try {
                            var r = new Date();
                            r.setTime(r.getTime() + i * 1000);
                            localStorage.setItem(n, t);
                            localStorage.setItem(n + '_exp', r.toUTCString());
                        } catch (u) {
                        }
                    }.apply(this, arguments);
                } finally {
                    if ($___old_715aebc2e82e36f0)
                        ({}.constructor.defineProperty(window, 'localStorage', $___old_715aebc2e82e36f0));
                }
            };
            this.getLocalStorageBackup = function (n, t) {
                const $___old_06b8ad688d4c1d83 = {}.constructor.getOwnPropertyDescriptor(window, 'localStorage');
                try {
                    if ($___old_06b8ad688d4c1d83)
                        ({}.constructor.defineProperty(window, 'localStorage', $___mock_177311337389c91d.localStorage));
                    return function () {
                        var r, i;
                        try {
                            return (r = localStorage.getItem(n + '_exp'), r == null) ? null : new Date() > new Date(r) ? (this.removeLocalStorageBackup(n), null) : (i = localStorage.getItem(n), i == null || i.length > t ? null : i);
                        } catch (u) {
                            return null;
                        }
                    }.apply(this, arguments);
                } finally {
                    if ($___old_06b8ad688d4c1d83)
                        ({}.constructor.defineProperty(window, 'localStorage', $___old_06b8ad688d4c1d83));
                }
            };
            this.getCookie = function (n, t, i) {
                var r, u, e, f, o;
                if (!this.stringExists(n) || (r = document.cookie, r.length === 0))
                    return null;
                for (this.stringExists(t) || (t = ''), e = 0; e < r.length;) {
                    if (u = r.indexOf(n + '=' + t, e), u < 0)
                        return null;
                    if (u > 0 && r[u - 1] !== ' ' && r[u - 1] !== ';')
                        e = u + n.length + 1;
                    else
                        break;
                }
                return (f = r.indexOf(';', u), f = f >= 0 ? f : r.length, o = r.substring(u + n.length + 1 + t.length, f), o.length > i) ? null : o;
            };
            this._setCookie = function (n, t, i, r, u) {
                return document.cookie = n + '=' + t + ';expires=' + i.toUTCString() + (r ? ';domain=.' + r : '') + ';path=/' + (this.stringExists(u) ? ';' + u : '');
            };
            this.getHostname = function () {
                return document.location && document.location.hostname;
            };
            this.setCookie = function (n, t, i, r, u, f, e) {
                var h, l, c, s, o;
                if (!this.stringExists(n) || (this.stringExists(f) || (f = ''), !this.stringExists(t) || t.length > e))
                    return null;
                if (h = new Date(), h.setTime(h.getTime() + i * 1000), l = new Date(), l.setTime(0), u && this.setLocalStorageBackup(n, t, i), this.domainName === null || r) {
                    if (c = this.getHostname(), c && typeof c == 'string' && c !== 'localhost')
                        for (s = c.split('.'), o = s.pop(), s.length === 3 && Number(o) >= 0 && (s = []); s.length > 0;)
                            if ((o = s.pop() + '.' + o, this.uetConfig.cookieDomain === '' || this.uetConfig.cookieDomain.toLowerCase() === o.toLowerCase()) && (r && (this._setCookie(n, '', l, o, this.uetConfig.cookieFlags), r = !!this.getCookie(n, f, e)), !r && (this._setCookie(n, f + t, h, o, this.uetConfig.cookieFlags), this.getCookie(n, f, e)))) {
                                this.domainName = o;
                                return;
                            }
                    this.domainName = '';
                }
                this._setCookie(n, f + t, h, this.domainName, this.uetConfig.cookieFlags);
            };
            this.getQueryParam = function (n, t) {
                if (!this.stringExists(n) || !this.stringExists(t) || /[^\d\w]/.exec(t))
                    return null;
                try {
                    n = decodeURIComponent(n);
                } catch (u) {
                }
                var i = new RegExp('[?&]' + t + '=([^&#]*)', 'i'), r = i.exec(n) || [
                        ,
                        null
                    ];
                return r[1];
            };
            this.addCookieId = function (n, t, i, r, u) {
                if (o.Ver < 2 || this.uetConfig.cookieAllowed === !1 || this.uetConfig.consent.adStorageAllowed === !1)
                    return n;
                var e = '2', s = !0, f = this.getCookie(r, '', this.cookieIdMaxLength);
                return (this.stringExists(f) || (s = !1, f = this.getLocalStorageBackup(r, this.cookieIdMaxLength)), u === 0) ? (this.stringExists(f) && (n[t] = encodeURIComponent(f), this.stringExists(i) && (n[i] = e)), n) : (this.stringExists(f) && !f.match(/^[0-9a-f]{32}$/) && (f = f.replace(/-/g, '')), this.stringExists(f) && f.match(/^[0-9a-f]{32}$/) ? e = '0' : (f = this.getUuidV1(!1), e = '1'), this.setCookie(r, f, u, s, !0, '', this.cookieIdMaxLength), (this.getCookie(r, '', this.cookieIdMaxLength) === f || this.getLocalStorageBackup(r, this.cookieIdMaxLength) === f) && (n[t] = encodeURIComponent(f), this.stringExists(i) && (n[i] = e)), n);
            };
            this.addMsClkId = function (n) {
                if (o.Ver < 2 || this.uetConfig.cookieAllowed === !1 || this.uetConfig.consent.adStorageAllowed === !1)
                    return n;
                this.extractMsClkId(this.addUrlData({}));
                var i = '0', t = this.getCookie(this.msClkIdCookieName, this.msClkIdCookieValuePrefix, this.lengthMsClkId);
                return this.stringExists(t) || (t = this.getLocalStorageBackup(this.msClkIdCookieName, this.lengthMsClkId)), this.stringExists(this.msClkId) ? t !== this.msClkId && (i = '1') : this.msClkId = t, this.stringExists(this.msClkId) ? (this.setCookie(this.msClkIdCookieName, this.msClkId, this.msClkIdExpirationTime, !0, !0, this.msClkIdCookieValuePrefix, this.lengthMsClkId), this.getCookie(this.msClkIdCookieName, this.msClkIdCookieValuePrefix, this.lengthMsClkId) !== this.msClkId && (i += 'N'), n.msclkid = encodeURIComponent(this.msClkId + '-' + i)) : n.msclkid = 'N', n;
            };
            this.clone = function (n, t) {
                t === undefined && (t = {});
                for (var i in n)
                    n.hasOwnProperty(i) && (t[i] = n[i]);
                return t;
            };
            this.combine = function (n, t) {
                var i = this.clone(n);
                return i.alt && delete i.alt, this.clone(t, i);
            };
            this.fireBeacon = function (n) {
                for (var i, e = this.urlPrefix, t = this.combine(this.beaconParams, n), u = this.stringifyToRequest(t), f = this.removeTrailingAmp(e + u), o = [
                            'r',
                            'el2',
                            'ec2',
                            'ea2',
                            'page_location',
                            'page_path',
                            'kw',
                            'p',
                            'tl',
                            'items'
                        ], r = 0; encodeURI(f).length > this.URLLENGTHLIMIT && o.length > r; r++)
                    (i = o[r], i in t) && (r == 0 ? t[i] = t[i].split('?')[0] : r <= 3 ? t[i] = '' : delete t[i], u = this.stringifyToRequest(t), f = this.removeTrailingAmp(e + u));
                this.fireBeaconImg(f);
            };
            this.firePageShow = function (n) {
                this.uetConfig.disableVisibilityEvents === !1 && n && n.persisted && this.fireSendBeacon('pageShow');
            };
            this.firePageHide = function () {
                this.uetConfig.disableVisibilityEvents === !1 && this.fireSendBeacon('pageHide');
            };
            this.fireSendBeacon = function (n) {
                var i = this.combine(this.beaconParams, { evt: n }), t = this.removeTrailingAmp(this.previewPrefix + this.stringifyToRequest(i));
                navigator.sendBeacon ? navigator.sendBeacon(t) : this.fireBeaconImg(t);
            };
            this.clarityOnLoad = function () {
                typeof clarity != 'undefined' && window.clarity.start();
            };
            this.loadConfig();
            this.checkuetHostdocumentload();
        }
        function $___var_1293ea212bd98607(u, o) {
            (typeof window[u] != 'object' || Object.prototype.toString.call(window[u]) === '[object Array]') && (o.q = window[u], window[u] = new UET(o));
        }
        function $___var_e4a6ad6e4e690502(u) {
            var n = Array.prototype.slice.call(arguments, 1);
            window[u] = window[u] || [];
            window[u].push.apply(window[u], n);
        }
    }())
}