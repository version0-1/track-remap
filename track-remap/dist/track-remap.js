var TrackRemap = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer3;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer3.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer3.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function Buffer3(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer3.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer2(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer2(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer3.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer3.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer3, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer3.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer3.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer3.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer2(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer2(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer3.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer3.alloc(+length);
      }
      Buffer3.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer3.prototype;
      };
      Buffer3.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer3.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer3.from(b, b.offset, b.byteLength);
        if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer3.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer3.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer3.isBuffer(buf)) buf = Buffer3.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer3.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer3.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer3.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
      Buffer3.prototype.equals = function equals(b) {
        if (!Buffer3.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer3.compare(this, b) === 0;
      };
      Buffer3.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
      }
      Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer3.from(target, target.offset, target.byteLength);
        }
        if (!Buffer3.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer3.from(val, encoding);
        }
        if (Buffer3.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer3.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer3.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer3.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer3.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer3.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer3.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = (function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      })();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/@markw65/fit-file-writer/build/src/fit-encode.js
  var require_fit_encode = __commonJS({
    "node_modules/@markw65/fit-file-writer/build/src/fit-encode.js"(exports, module) {
      "use strict";
      var x = Object.defineProperty;
      var q = Object.getOwnPropertyDescriptor;
      var R = Object.getOwnPropertyNames;
      var B = Object.prototype.hasOwnProperty;
      var D = (p, e) => {
        for (var a in e) x(p, a, { get: e[a], enumerable: true });
      };
      var L = (p, e, a, n) => {
        if (e && typeof e == "object" || typeof e == "function") for (let s of R(e)) !B.call(p, s) && s !== a && x(p, s, { get: () => e[s], enumerable: !(n = q(e, s)) || n.enumerable });
        return p;
      };
      var z = (p) => L(x({}, "__esModule", { value: true }), p);
      var M = {};
      D(M, { FitWriter: () => S, keysOf: () => T });
      module.exports = z(M);
      var w = { file: { device: 1, settings: 2, sport: 3, activity: 4, workout: 5, course: 6, schedules: 7, weight: 9, totals: 10, goals: 11, bloodPressure: 14, blood_pressure: 14, monitoringA: 15, monitoring_a: 15, activitySummary: 20, activity_summary: 20, monitoringDaily: 28, monitoring_daily: 28, monitoringB: 32, monitoring_b: 32, segment: 34, segmentList: 35, segment_list: 35, exdConfiguration: 40, exd_configuration: 40, mfgRangeMin: 247, mfg_range_min: 247, mfgRangeMax: 254, mfg_range_max: 254, _min: 1, _max: 254 }, mesg_num: { fileId: 0, file_id: 0, capabilities: 1, deviceSettings: 2, device_settings: 2, userProfile: 3, user_profile: 3, hrmProfile: 4, hrm_profile: 4, sdmProfile: 5, sdm_profile: 5, bikeProfile: 6, bike_profile: 6, zonesTarget: 7, zones_target: 7, hrZone: 8, hr_zone: 8, powerZone: 9, power_zone: 9, metZone: 10, met_zone: 10, sport: 12, goal: 15, session: 18, lap: 19, record: 20, event: 21, deviceInfo: 23, device_info: 23, workout: 26, workoutStep: 27, workout_step: 27, schedule: 28, weightScale: 30, weight_scale: 30, course: 31, coursePoint: 32, course_point: 32, totals: 33, activity: 34, software: 35, fileCapabilities: 37, file_capabilities: 37, mesgCapabilities: 38, mesg_capabilities: 38, fieldCapabilities: 39, field_capabilities: 39, fileCreator: 49, file_creator: 49, bloodPressure: 51, blood_pressure: 51, speedZone: 53, speed_zone: 53, monitoring: 55, trainingFile: 72, training_file: 72, hrv: 78, antRx: 80, ant_rx: 80, antTx: 81, ant_tx: 81, antChannelId: 82, ant_channel_id: 82, length: 101, monitoringInfo: 103, monitoring_info: 103, pad: 105, slaveDevice: 106, slave_device: 106, connectivity: 127, weatherConditions: 128, weather_conditions: 128, weatherAlert: 129, weather_alert: 129, cadenceZone: 131, cadence_zone: 131, hr: 132, segmentLap: 142, segment_lap: 142, memoGlob: 145, memo_glob: 145, segmentId: 148, segment_id: 148, segmentLeaderboardEntry: 149, segment_leaderboard_entry: 149, segmentPoint: 150, segment_point: 150, segmentFile: 151, segment_file: 151, workoutSession: 158, workout_session: 158, watchfaceSettings: 159, watchface_settings: 159, gpsMetadata: 160, gps_metadata: 160, cameraEvent: 161, camera_event: 161, timestampCorrelation: 162, timestamp_correlation: 162, gyroscopeData: 164, gyroscope_data: 164, accelerometerData: 165, accelerometer_data: 165, threeDSensorCalibration: 167, three_d_sensor_calibration: 167, videoFrame: 169, video_frame: 169, obdiiData: 174, obdii_data: 174, nmeaSentence: 177, nmea_sentence: 177, aviationAttitude: 178, aviation_attitude: 178, video: 184, videoTitle: 185, video_title: 185, videoDescription: 186, video_description: 186, videoClip: 187, video_clip: 187, ohrSettings: 188, ohr_settings: 188, exdScreenConfiguration: 200, exd_screen_configuration: 200, exdDataFieldConfiguration: 201, exd_data_field_configuration: 201, exdDataConceptConfiguration: 202, exd_data_concept_configuration: 202, fieldDescription: 206, field_description: 206, developerDataId: 207, developer_data_id: 207, magnetometerData: 208, magnetometer_data: 208, barometerData: 209, barometer_data: 209, oneDSensorCalibration: 210, one_d_sensor_calibration: 210, monitoringHrData: 211, monitoring_hr_data: 211, timeInZone: 216, time_in_zone: 216, set: 225, stressLevel: 227, stress_level: 227, maxMetData: 229, max_met_data: 229, diveSettings: 258, dive_settings: 258, diveGas: 259, dive_gas: 259, diveAlarm: 262, dive_alarm: 262, exerciseTitle: 264, exercise_title: 264, diveSummary: 268, dive_summary: 268, spo2Data: 269, sleepLevel: 275, sleep_level: 275, jump: 285, aadAccelFeatures: 289, aad_accel_features: 289, beatIntervals: 290, beat_intervals: 290, respirationRate: 297, respiration_rate: 297, hsaAccelerometerData: 302, hsa_accelerometer_data: 302, hsaStepData: 304, hsa_step_data: 304, hsaSpo2Data: 305, hsaStressData: 306, hsa_stress_data: 306, hsaRespirationData: 307, hsa_respiration_data: 307, hsaHeartRateData: 308, hsa_heart_rate_data: 308, split: 312, splitSummary: 313, split_summary: 313, hsaBodyBatteryData: 314, hsa_body_battery_data: 314, hsaEvent: 315, hsa_event: 315, climbPro: 317, climb_pro: 317, tankUpdate: 319, tank_update: 319, tankSummary: 323, tank_summary: 323, sleepAssessment: 346, sleep_assessment: 346, hrvStatusSummary: 370, hrv_status_summary: 370, hrvValue: 371, hrv_value: 371, rawBbi: 372, raw_bbi: 372, deviceAuxBatteryInfo: 375, device_aux_battery_info: 375, hsaGyroscopeData: 376, hsa_gyroscope_data: 376, chronoShotSession: 387, chrono_shot_session: 387, chronoShotData: 388, chrono_shot_data: 388, hsaConfigurationData: 389, hsa_configuration_data: 389, diveApneaAlarm: 393, dive_apnea_alarm: 393, skinTempOvernight: 398, skin_temp_overnight: 398, hsaWristTemperatureData: 409, hsa_wrist_temperature_data: 409, mfgRangeMin: 65280, mfg_range_min: 65280, mfgRangeMax: 65534, mfg_range_max: 65534, _min: 0, _max: 65534 }, checksum: { clear: 0, ok: 1, _min: 0, _max: 1 }, file_flags: { read: 2, write: 4, erase: 8, _min: 2, _max: 8 }, mesg_count: { numPerFile: 0, num_per_file: 0, maxPerFile: 1, max_per_file: 1, maxPerFileType: 2, max_per_file_type: 2, _min: 0, _max: 2 }, date_time: { min: 268435456, _min: 268435456, _max: 268435456 }, local_date_time: { min: 268435456, _min: 268435456, _max: 268435456 }, message_index: { mask: 4095, reserved: 28672, selected: 32768, _min: 4095, _max: 32768 }, device_index: { 0: 0, 254: 254, _min: 0, _max: 254 }, gender: { female: 0, male: 1, _min: 0, _max: 1 }, language: { english: 0, french: 1, italian: 2, german: 3, spanish: 4, croatian: 5, czech: 6, danish: 7, dutch: 8, finnish: 9, greek: 10, hungarian: 11, norwegian: 12, polish: 13, portuguese: 14, slovakian: 15, slovenian: 16, swedish: 17, russian: 18, turkish: 19, latvian: 20, ukrainian: 21, arabic: 22, farsi: 23, bulgarian: 24, romanian: 25, chinese: 26, japanese: 27, korean: 28, taiwanese: 29, thai: 30, hebrew: 31, brazilianPortuguese: 32, brazilian_portuguese: 32, indonesian: 33, malaysian: 34, vietnamese: 35, burmese: 36, mongolian: 37, custom: 254, _min: 0, _max: 254 }, language_bits0: { english: 1, french: 2, italian: 4, german: 8, spanish: 16, croatian: 32, czech: 64, danish: 128, _min: 1, _max: 128 }, language_bits1: { dutch: 1, finnish: 2, greek: 4, hungarian: 8, norwegian: 16, polish: 32, portuguese: 64, slovakian: 128, _min: 1, _max: 128 }, language_bits2: { slovenian: 1, swedish: 2, russian: 4, turkish: 8, latvian: 16, ukrainian: 32, arabic: 64, farsi: 128, _min: 1, _max: 128 }, language_bits3: { bulgarian: 1, romanian: 2, chinese: 4, japanese: 8, korean: 16, taiwanese: 32, thai: 64, hebrew: 128, _min: 1, _max: 128 }, language_bits4: { brazilianPortuguese: 1, brazilian_portuguese: 1, indonesian: 2, malaysian: 4, vietnamese: 8, burmese: 16, mongolian: 32, _min: 1, _max: 32 }, time_zone: { almaty: 0, bangkok: 1, bombay: 2, brasilia: 3, cairo: 4, capeVerdeIs: 5, cape_verde_is: 5, darwin: 6, eniwetok: 7, fiji: 8, hongKong: 9, hong_kong: 9, islamabad: 10, kabul: 11, magadan: 12, midAtlantic: 13, mid_atlantic: 13, moscow: 14, muscat: 15, newfoundland: 16, samoa: 17, sydney: 18, tehran: 19, tokyo: 20, usAlaska: 21, us_alaska: 21, usAtlantic: 22, us_atlantic: 22, usCentral: 23, us_central: 23, usEastern: 24, us_eastern: 24, usHawaii: 25, us_hawaii: 25, usMountain: 26, us_mountain: 26, usPacific: 27, us_pacific: 27, other: 28, auckland: 29, kathmandu: 30, europeWesternWet: 31, europe_western_wet: 31, europeCentralCet: 32, europe_central_cet: 32, europeEasternEet: 33, europe_eastern_eet: 33, jakarta: 34, perth: 35, adelaide: 36, brisbane: 37, tasmania: 38, iceland: 39, amsterdam: 40, athens: 41, barcelona: 42, berlin: 43, brussels: 44, budapest: 45, copenhagen: 46, dublin: 47, helsinki: 48, lisbon: 49, london: 50, madrid: 51, munich: 52, oslo: 53, paris: 54, prague: 55, reykjavik: 56, rome: 57, stockholm: 58, vienna: 59, warsaw: 60, zurich: 61, quebec: 62, ontario: 63, manitoba: 64, saskatchewan: 65, alberta: 66, britishColumbia: 67, british_columbia: 67, boise: 68, boston: 69, chicago: 70, dallas: 71, denver: 72, kansasCity: 73, kansas_city: 73, lasVegas: 74, las_vegas: 74, losAngeles: 75, los_angeles: 75, miami: 76, minneapolis: 77, newYork: 78, new_york: 78, newOrleans: 79, new_orleans: 79, phoenix: 80, santaFe: 81, santa_fe: 81, seattle: 82, washingtonDc: 83, washington_dc: 83, usArizona: 84, us_arizona: 84, chita: 85, ekaterinburg: 86, irkutsk: 87, kaliningrad: 88, krasnoyarsk: 89, novosibirsk: 90, petropavlovskKamchatskiy: 91, petropavlovsk_kamchatskiy: 91, samara: 92, vladivostok: 93, mexicoCentral: 94, mexico_central: 94, mexicoMountain: 95, mexico_mountain: 95, mexicoPacific: 96, mexico_pacific: 96, capeTown: 97, cape_town: 97, winkhoek: 98, lagos: 99, riyahd: 100, venezuela: 101, australiaLh: 102, australia_lh: 102, santiago: 103, manual: 253, automatic: 254, _min: 0, _max: 254 }, display_measure: { metric: 0, statute: 1, nautical: 2, _min: 0, _max: 2 }, display_heart: { bpm: 0, max: 1, reserve: 2, _min: 0, _max: 2 }, display_power: { watts: 0, percentFtp: 1, percent_ftp: 1, _min: 0, _max: 1 }, display_position: { degree: 0, degreeMinute: 1, degree_minute: 1, degreeMinuteSecond: 2, degree_minute_second: 2, austrianGrid: 3, austrian_grid: 3, britishGrid: 4, british_grid: 4, dutchGrid: 5, dutch_grid: 5, hungarianGrid: 6, hungarian_grid: 6, finnishGrid: 7, finnish_grid: 7, germanGrid: 8, german_grid: 8, icelandicGrid: 9, icelandic_grid: 9, indonesianEquatorial: 10, indonesian_equatorial: 10, indonesianIrian: 11, indonesian_irian: 11, indonesianSouthern: 12, indonesian_southern: 12, indiaZone0: 13, indiaZoneIA: 14, india_zone_i_a: 14, indiaZoneIB: 15, india_zone_i_b: 15, indiaZoneIIA: 16, india_zone_i_i_a: 16, indiaZoneIIB: 17, india_zone_i_i_b: 17, indiaZoneIIIA: 18, india_zone_i_i_i_a: 18, indiaZoneIIIB: 19, india_zone_i_i_i_b: 19, indiaZoneIVA: 20, india_zone_i_v_a: 20, indiaZoneIVB: 21, india_zone_i_v_b: 21, irishTransverse: 22, irish_transverse: 22, irishGrid: 23, irish_grid: 23, loran: 24, maidenheadGrid: 25, maidenhead_grid: 25, mgrsGrid: 26, mgrs_grid: 26, newZealandGrid: 27, new_zealand_grid: 27, newZealandTransverse: 28, new_zealand_transverse: 28, qatarGrid: 29, qatar_grid: 29, modifiedSwedishGrid: 30, modified_swedish_grid: 30, swedishGrid: 31, swedish_grid: 31, southAfricanGrid: 32, south_african_grid: 32, swissGrid: 33, swiss_grid: 33, taiwanGrid: 34, taiwan_grid: 34, unitedStatesGrid: 35, united_states_grid: 35, utmUpsGrid: 36, utm_ups_grid: 36, westMalayan: 37, west_malayan: 37, borneoRso: 38, borneo_rso: 38, estonianGrid: 39, estonian_grid: 39, latvianGrid: 40, latvian_grid: 40, swedishRef99Grid: 41, _min: 0, _max: 41 }, switch: { off: 0, on: 1, auto: 2, _min: 0, _max: 2 }, sport: { generic: 0, running: 1, cycling: 2, transition: 3, fitnessEquipment: 4, fitness_equipment: 4, swimming: 5, basketball: 6, soccer: 7, tennis: 8, americanFootball: 9, american_football: 9, training: 10, walking: 11, crossCountrySkiing: 12, cross_country_skiing: 12, alpineSkiing: 13, alpine_skiing: 13, snowboarding: 14, rowing: 15, mountaineering: 16, hiking: 17, multisport: 18, paddling: 19, flying: 20, eBiking: 21, e_biking: 21, motorcycling: 22, boating: 23, driving: 24, golf: 25, hangGliding: 26, hang_gliding: 26, horsebackRiding: 27, horseback_riding: 27, hunting: 28, fishing: 29, inlineSkating: 30, inline_skating: 30, rockClimbing: 31, rock_climbing: 31, sailing: 32, iceSkating: 33, ice_skating: 33, skyDiving: 34, sky_diving: 34, snowshoeing: 35, snowmobiling: 36, standUpPaddleboarding: 37, stand_up_paddleboarding: 37, surfing: 38, wakeboarding: 39, waterSkiing: 40, water_skiing: 40, kayaking: 41, rafting: 42, windsurfing: 43, kitesurfing: 44, tactical: 45, jumpmaster: 46, boxing: 47, floorClimbing: 48, floor_climbing: 48, baseball: 49, diving: 53, hiit: 62, racket: 64, wheelchairPushWalk: 65, wheelchair_push_walk: 65, wheelchairPushRun: 66, wheelchair_push_run: 66, meditation: 67, discGolf: 69, disc_golf: 69, cricket: 71, rugby: 72, hockey: 73, lacrosse: 74, volleyball: 75, waterTubing: 76, water_tubing: 76, wakesurfing: 77, mixedMartialArts: 80, mixed_martial_arts: 80, snorkeling: 82, dance: 83, jumpRope: 84, jump_rope: 84, all: 254, _min: 0, _max: 254 }, sport_bits0: { generic: 1, running: 2, cycling: 4, transition: 8, fitnessEquipment: 16, fitness_equipment: 16, swimming: 32, basketball: 64, soccer: 128, _min: 1, _max: 128 }, sport_bits1: { tennis: 1, americanFootball: 2, american_football: 2, training: 4, walking: 8, crossCountrySkiing: 16, cross_country_skiing: 16, alpineSkiing: 32, alpine_skiing: 32, snowboarding: 64, rowing: 128, _min: 1, _max: 128 }, sport_bits2: { mountaineering: 1, hiking: 2, multisport: 4, paddling: 8, flying: 16, eBiking: 32, e_biking: 32, motorcycling: 64, boating: 128, _min: 1, _max: 128 }, sport_bits3: { driving: 1, golf: 2, hangGliding: 4, hang_gliding: 4, horsebackRiding: 8, horseback_riding: 8, hunting: 16, fishing: 32, inlineSkating: 64, inline_skating: 64, rockClimbing: 128, rock_climbing: 128, _min: 1, _max: 128 }, sport_bits4: { sailing: 1, iceSkating: 2, ice_skating: 2, skyDiving: 4, sky_diving: 4, snowshoeing: 8, snowmobiling: 16, standUpPaddleboarding: 32, stand_up_paddleboarding: 32, surfing: 64, wakeboarding: 128, _min: 1, _max: 128 }, sport_bits5: { waterSkiing: 1, water_skiing: 1, kayaking: 2, rafting: 4, windsurfing: 8, kitesurfing: 16, tactical: 32, jumpmaster: 64, boxing: 128, _min: 1, _max: 128 }, sport_bits6: { floorClimbing: 1, floor_climbing: 1, _min: 1, _max: 1 }, sub_sport: { generic: 0, treadmill: 1, street: 2, trail: 3, track: 4, spin: 5, indoorCycling: 6, indoor_cycling: 6, road: 7, mountain: 8, downhill: 9, recumbent: 10, cyclocross: 11, handCycling: 12, hand_cycling: 12, trackCycling: 13, track_cycling: 13, indoorRowing: 14, indoor_rowing: 14, elliptical: 15, stairClimbing: 16, stair_climbing: 16, lapSwimming: 17, lap_swimming: 17, openWater: 18, open_water: 18, flexibilityTraining: 19, flexibility_training: 19, strengthTraining: 20, strength_training: 20, warmUp: 21, warm_up: 21, match: 22, exercise: 23, challenge: 24, indoorSkiing: 25, indoor_skiing: 25, cardioTraining: 26, cardio_training: 26, indoorWalking: 27, indoor_walking: 27, eBikeFitness: 28, e_bike_fitness: 28, bmx: 29, casualWalking: 30, casual_walking: 30, speedWalking: 31, speed_walking: 31, bikeToRunTransition: 32, bike_to_run_transition: 32, runToBikeTransition: 33, run_to_bike_transition: 33, swimToBikeTransition: 34, swim_to_bike_transition: 34, atv: 35, motocross: 36, backcountry: 37, resort: 38, rcDrone: 39, rc_drone: 39, wingsuit: 40, whitewater: 41, skateSkiing: 42, skate_skiing: 42, yoga: 43, pilates: 44, indoorRunning: 45, indoor_running: 45, gravelCycling: 46, gravel_cycling: 46, eBikeMountain: 47, e_bike_mountain: 47, commuting: 48, mixedSurface: 49, mixed_surface: 49, navigate: 50, trackMe: 51, track_me: 51, map: 52, singleGasDiving: 53, single_gas_diving: 53, multiGasDiving: 54, multi_gas_diving: 54, gaugeDiving: 55, gauge_diving: 55, apneaDiving: 56, apnea_diving: 56, apneaHunting: 57, apnea_hunting: 57, virtualActivity: 58, virtual_activity: 58, obstacle: 59, breathing: 62, sailRace: 65, sail_race: 65, ultra: 67, indoorClimbing: 68, indoor_climbing: 68, bouldering: 69, hiit: 70, amrap: 73, emom: 74, tabata: 75, pickleball: 84, padel: 85, indoorWheelchairWalk: 86, indoor_wheelchair_walk: 86, indoorWheelchairRun: 87, indoor_wheelchair_run: 87, indoorHandCycling: 88, indoor_hand_cycling: 88, squash: 94, badminton: 95, racquetball: 96, tableTennis: 97, table_tennis: 97, flyCanopy: 110, fly_canopy: 110, flyParaglide: 111, fly_paraglide: 111, flyParamotor: 112, fly_paramotor: 112, flyPressurized: 113, fly_pressurized: 113, flyNavigate: 114, fly_navigate: 114, flyTimer: 115, fly_timer: 115, flyAltimeter: 116, fly_altimeter: 116, flyWx: 117, fly_wx: 117, flyVfr: 118, fly_vfr: 118, flyIfr: 119, fly_ifr: 119, all: 254, _min: 0, _max: 254 }, sport_event: { uncategorized: 0, geocaching: 1, fitness: 2, recreation: 3, race: 4, specialEvent: 5, special_event: 5, training: 6, transportation: 7, touring: 8, _min: 0, _max: 8 }, activity: { manual: 0, autoMultiSport: 1, auto_multi_sport: 1, _min: 0, _max: 1 }, intensity: { active: 0, rest: 1, warmup: 2, cooldown: 3, recovery: 4, interval: 5, other: 6, _min: 0, _max: 6 }, session_trigger: { activityEnd: 0, activity_end: 0, manual: 1, autoMultiSport: 2, auto_multi_sport: 2, fitnessEquipment: 3, fitness_equipment: 3, _min: 0, _max: 3 }, autolap_trigger: { time: 0, distance: 1, positionStart: 2, position_start: 2, positionLap: 3, position_lap: 3, positionWaypoint: 4, position_waypoint: 4, positionMarked: 5, position_marked: 5, off: 6, autoSelect: 13, auto_select: 13, _min: 0, _max: 13 }, lap_trigger: { manual: 0, time: 1, distance: 2, positionStart: 3, position_start: 3, positionLap: 4, position_lap: 4, positionWaypoint: 5, position_waypoint: 5, positionMarked: 6, position_marked: 6, sessionEnd: 7, session_end: 7, fitnessEquipment: 8, fitness_equipment: 8, _min: 0, _max: 8 }, time_mode: { hour12: 0, hour24: 1, military: 2, hour12WithSeconds: 3, hour24WithSeconds: 4, utc: 5, _min: 0, _max: 5 }, backlight_mode: { off: 0, manual: 1, keyAndMessages: 2, key_and_messages: 2, autoBrightness: 3, auto_brightness: 3, smartNotifications: 4, smart_notifications: 4, keyAndMessagesNight: 5, key_and_messages_night: 5, keyAndMessagesAndSmartNotifications: 6, key_and_messages_and_smart_notifications: 6, _min: 0, _max: 6 }, date_mode: { dayMonth: 0, day_month: 0, monthDay: 1, month_day: 1, _min: 0, _max: 1 }, backlight_timeout: { infinite: 0, _min: 0, _max: 0 }, event: { timer: 0, workout: 3, workoutStep: 4, workout_step: 4, powerDown: 5, power_down: 5, powerUp: 6, power_up: 6, offCourse: 7, off_course: 7, session: 8, lap: 9, coursePoint: 10, course_point: 10, battery: 11, virtualPartnerPace: 12, virtual_partner_pace: 12, hrHighAlert: 13, hr_high_alert: 13, hrLowAlert: 14, hr_low_alert: 14, speedHighAlert: 15, speed_high_alert: 15, speedLowAlert: 16, speed_low_alert: 16, cadHighAlert: 17, cad_high_alert: 17, cadLowAlert: 18, cad_low_alert: 18, powerHighAlert: 19, power_high_alert: 19, powerLowAlert: 20, power_low_alert: 20, recoveryHr: 21, recovery_hr: 21, batteryLow: 22, battery_low: 22, timeDurationAlert: 23, time_duration_alert: 23, distanceDurationAlert: 24, distance_duration_alert: 24, calorieDurationAlert: 25, calorie_duration_alert: 25, activity: 26, fitnessEquipment: 27, fitness_equipment: 27, length: 28, userMarker: 32, user_marker: 32, sportPoint: 33, sport_point: 33, calibration: 36, frontGearChange: 42, front_gear_change: 42, rearGearChange: 43, rear_gear_change: 43, riderPositionChange: 44, rider_position_change: 44, elevHighAlert: 45, elev_high_alert: 45, elevLowAlert: 46, elev_low_alert: 46, commTimeout: 47, comm_timeout: 47, autoActivityDetect: 54, auto_activity_detect: 54, diveAlert: 56, dive_alert: 56, diveGasSwitched: 57, dive_gas_switched: 57, tankPressureReserve: 71, tank_pressure_reserve: 71, tankPressureCritical: 72, tank_pressure_critical: 72, tankLost: 73, tank_lost: 73, radarThreatAlert: 75, radar_threat_alert: 75, tankBatteryLow: 76, tank_battery_low: 76, tankPodConnected: 81, tank_pod_connected: 81, tankPodDisconnected: 82, tank_pod_disconnected: 82, _min: 0, _max: 82 }, event_type: { start: 0, stop: 1, consecutiveDepreciated: 2, consecutive_depreciated: 2, marker: 3, stopAll: 4, stop_all: 4, beginDepreciated: 5, begin_depreciated: 5, endDepreciated: 6, end_depreciated: 6, endAllDepreciated: 7, end_all_depreciated: 7, stopDisable: 8, stop_disable: 8, stopDisableAll: 9, stop_disable_all: 9, _min: 0, _max: 9 }, timer_trigger: { manual: 0, auto: 1, fitnessEquipment: 2, fitness_equipment: 2, _min: 0, _max: 2 }, fitness_equipment_state: { ready: 0, inUse: 1, in_use: 1, paused: 2, unknown: 3, _min: 0, _max: 3 }, tone: { off: 0, tone: 1, vibrate: 2, toneAndVibrate: 3, tone_and_vibrate: 3, _min: 0, _max: 3 }, autoscroll: { none: 0, slow: 1, medium: 2, fast: 3, _min: 0, _max: 3 }, activity_class: { levelMax: 100, level_max: 100, level: 127, athlete: 128, _min: 100, _max: 128 }, hr_zone_calc: { custom: 0, percentMaxHr: 1, percent_max_hr: 1, percentHrr: 2, percent_hrr: 2, percentLthr: 3, percent_lthr: 3, _min: 0, _max: 3 }, pwr_zone_calc: { custom: 0, percentFtp: 1, percent_ftp: 1, _min: 0, _max: 1 }, wkt_step_duration: { time: 0, distance: 1, hrLessThan: 2, hr_less_than: 2, hrGreaterThan: 3, hr_greater_than: 3, calories: 4, open: 5, repeatUntilStepsCmplt: 6, repeat_until_steps_cmplt: 6, repeatUntilTime: 7, repeat_until_time: 7, repeatUntilDistance: 8, repeat_until_distance: 8, repeatUntilCalories: 9, repeat_until_calories: 9, repeatUntilHrLessThan: 10, repeat_until_hr_less_than: 10, repeatUntilHrGreaterThan: 11, repeat_until_hr_greater_than: 11, repeatUntilPowerLessThan: 12, repeat_until_power_less_than: 12, repeatUntilPowerGreaterThan: 13, repeat_until_power_greater_than: 13, powerLessThan: 14, power_less_than: 14, powerGreaterThan: 15, power_greater_than: 15, trainingPeaksTss: 16, training_peaks_tss: 16, repeatUntilPowerLastLapLessThan: 17, repeat_until_power_last_lap_less_than: 17, repeatUntilMaxPowerLastLapLessThan: 18, repeat_until_max_power_last_lap_less_than: 18, power3sLessThan: 19, power10sLessThan: 20, power30sLessThan: 21, power3sGreaterThan: 22, power10sGreaterThan: 23, power30sGreaterThan: 24, powerLapLessThan: 25, power_lap_less_than: 25, powerLapGreaterThan: 26, power_lap_greater_than: 26, repeatUntilTrainingPeaksTss: 27, repeat_until_training_peaks_tss: 27, repetitionTime: 28, repetition_time: 28, reps: 29, timeOnly: 31, time_only: 31, _min: 0, _max: 31 }, wkt_step_target: { speed: 0, heartRate: 1, heart_rate: 1, open: 2, cadence: 3, power: 4, grade: 5, resistance: 6, power3s: 7, power10s: 8, power30s: 9, powerLap: 10, power_lap: 10, swimStroke: 11, swim_stroke: 11, speedLap: 12, speed_lap: 12, heartRateLap: 13, heart_rate_lap: 13, _min: 0, _max: 13 }, goal: { time: 0, distance: 1, calories: 2, frequency: 3, steps: 4, ascent: 5, activeMinutes: 6, active_minutes: 6, _min: 0, _max: 6 }, goal_recurrence: { off: 0, daily: 1, weekly: 2, monthly: 3, yearly: 4, custom: 5, _min: 0, _max: 5 }, goal_source: { auto: 0, community: 1, user: 2, _min: 0, _max: 2 }, schedule: { workout: 0, course: 1, _min: 0, _max: 1 }, course_point: { generic: 0, summit: 1, valley: 2, water: 3, food: 4, danger: 5, left: 6, right: 7, straight: 8, firstAid: 9, first_aid: 9, fourthCategory: 10, fourth_category: 10, thirdCategory: 11, third_category: 11, secondCategory: 12, second_category: 12, firstCategory: 13, first_category: 13, horsCategory: 14, hors_category: 14, sprint: 15, leftFork: 16, left_fork: 16, rightFork: 17, right_fork: 17, middleFork: 18, middle_fork: 18, slightLeft: 19, slight_left: 19, sharpLeft: 20, sharp_left: 20, slightRight: 21, slight_right: 21, sharpRight: 22, sharp_right: 22, uTurn: 23, u_turn: 23, segmentStart: 24, segment_start: 24, segmentEnd: 25, segment_end: 25, campsite: 27, aidStation: 28, aid_station: 28, restArea: 29, rest_area: 29, generalDistance: 30, general_distance: 30, service: 31, energyGel: 32, energy_gel: 32, sportsDrink: 33, sports_drink: 33, mileMarker: 34, mile_marker: 34, checkpoint: 35, shelter: 36, meetingSpot: 37, meeting_spot: 37, overlook: 38, toilet: 39, shower: 40, gear: 41, sharpCurve: 42, sharp_curve: 42, steepIncline: 43, steep_incline: 43, tunnel: 44, bridge: 45, obstacle: 46, crossing: 47, store: 48, transition: 49, navaid: 50, transport: 51, alert: 52, info: 53, _min: 0, _max: 53 }, manufacturer: { garmin: 1, garminFr405Antfs: 2, zephyr: 3, dayton: 4, idt: 5, srm: 6, quarq: 7, ibike: 8, saris: 9, sparkHk: 10, spark_hk: 10, tanita: 11, echowell: 12, dynastreamOem: 13, dynastream_oem: 13, nautilus: 14, dynastream: 15, timex: 16, metrigear: 17, xelic: 18, beurer: 19, cardiosport: 20, aAndD: 21, a_and_d: 21, hmm: 22, suunto: 23, thitaElektronik: 24, thita_elektronik: 24, gpulse: 25, cleanMobile: 26, clean_mobile: 26, pedalBrain: 27, pedal_brain: 27, peaksware: 28, saxonar: 29, lemondFitness: 30, lemond_fitness: 30, dexcom: 31, wahooFitness: 32, wahoo_fitness: 32, octaneFitness: 33, octane_fitness: 33, archinoetics: 34, theHurtBox: 35, the_hurt_box: 35, citizenSystems: 36, citizen_systems: 36, magellan: 37, osynce: 38, holux: 39, concept2: 40, shimano: 41, oneGiantLeap: 42, one_giant_leap: 42, aceSensor: 43, ace_sensor: 43, brimBrothers: 44, brim_brothers: 44, xplova: 45, perceptionDigital: 46, perception_digital: 46, bf1systems: 47, pioneer: 48, spantec: 49, metalogics: 50, "4iiiis": 51, seikoEpson: 52, seiko_epson: 52, seikoEpsonOem: 53, seiko_epson_oem: 53, iforPowell: 54, ifor_powell: 54, maxwellGuider: 55, maxwell_guider: 55, starTrac: 56, star_trac: 56, breakaway: 57, alatechTechnologyLtd: 58, alatech_technology_ltd: 58, mioTechnologyEurope: 59, mio_technology_europe: 59, rotor: 60, geonaute: 61, idBike: 62, id_bike: 62, specialized: 63, wtek: 64, physicalEnterprises: 65, physical_enterprises: 65, northPoleEngineering: 66, north_pole_engineering: 66, bkool: 67, cateye: 68, stagesCycling: 69, stages_cycling: 69, sigmasport: 70, tomtom: 71, peripedal: 72, wattbike: 73, moxy: 76, ciclosport: 77, powerbahn: 78, acornProjectsAps: 79, acorn_projects_aps: 79, lifebeam: 80, bontrager: 81, wellgo: 82, scosche: 83, magura: 84, woodway: 85, elite: 86, nielsenKellerman: 87, nielsen_kellerman: 87, dkCity: 88, dk_city: 88, tacx: 89, directionTechnology: 90, direction_technology: 90, magtonic: 91, "1partcarbon": 92, insideRideTechnologies: 93, inside_ride_technologies: 93, soundOfMotion: 94, sound_of_motion: 94, stryd: 95, icg: 96, miPulse: 97, mi_pulse: 97, bsxAthletics: 98, bsx_athletics: 98, look: 99, campagnoloSrl: 100, campagnolo_srl: 100, bodyBikeSmart: 101, body_bike_smart: 101, praxisworks: 102, limitsTechnology: 103, limits_technology: 103, topactionTechnology: 104, topaction_technology: 104, cosinuss: 105, fitcare: 106, magene: 107, giantManufacturingCo: 108, giant_manufacturing_co: 108, tigrasport: 109, salutron: 110, technogym: 111, brytonSensors: 112, bryton_sensors: 112, latitudeLimited: 113, latitude_limited: 113, soaringTechnology: 114, soaring_technology: 114, igpsport: 115, thinkrider: 116, gopherSport: 117, gopher_sport: 117, waterrower: 118, orangetheory: 119, inpeak: 120, kinetic: 121, johnsonHealthTech: 122, johnson_health_tech: 122, polarElectro: 123, polar_electro: 123, seesense: 124, nciTechnology: 125, nci_technology: 125, iqsquare: 126, leomo: 127, ifitCom: 128, ifit_com: 128, corosByte: 129, coros_byte: 129, versaDesign: 130, versa_design: 130, chileaf: 131, cycplus: 132, gravaaByte: 133, gravaa_byte: 133, sigeyi: 134, coospo: 135, geoid: 136, bosch: 137, kyto: 138, kineticSports: 139, kinetic_sports: 139, decathlonByte: 140, decathlon_byte: 140, tqSystems: 141, tq_systems: 141, tagHeuer: 142, tag_heuer: 142, keiserFitness: 143, keiser_fitness: 143, zwiftByte: 144, zwift_byte: 144, porscheEp: 145, porsche_ep: 145, blackbird: 146, meilanByte: 147, meilan_byte: 147, ezon: 148, laisi: 149, myzone: 150, abawo: 151, bafang: 152, development: 255, healthandlife: 257, lezyne: 258, scribeLabs: 259, scribe_labs: 259, zwift: 260, watteam: 261, recon: 262, faveroElectronics: 263, favero_electronics: 263, dynovelo: 264, strava: 265, precor: 266, bryton: 267, sram: 268, navman: 269, cobi: 270, spivi: 271, mioMagellan: 272, mio_magellan: 272, evesports: 273, sensitivusGauge: 274, sensitivus_gauge: 274, podoon: 275, lifeTimeFitness: 276, life_time_fitness: 276, falcoEMotors: 277, falco_e_motors: 277, minoura: 278, cycliq: 279, luxottica: 280, trainerRoad: 281, trainer_road: 281, theSufferfest: 282, the_sufferfest: 282, fullspeedahead: 283, virtualtraining: 284, feedbacksports: 285, omata: 286, vdo: 287, magneticdays: 288, hammerhead: 289, kineticByKurt: 290, kinetic_by_kurt: 290, shapelog: 291, dabuziduo: 292, jetblack: 293, coros: 294, virtugo: 295, velosense: 296, cycligentinc: 297, trailforks: 298, mahleEbikemotion: 299, mahle_ebikemotion: 299, nurvv: 300, microprogram: 301, zone5cloud: 302, greenteg: 303, yamahaMotors: 304, yamaha_motors: 304, whoop: 305, gravaa: 306, onelap: 307, monarkExercise: 308, monark_exercise: 308, form: 309, decathlon: 310, syncros: 311, heatup: 312, cannondale: 313, trueFitness: 314, true_fitness: 314, rGTCycling: 315, r_g_t_cycling: 315, vasa: 316, raceRepublic: 317, race_republic: 317, fazua: 318, orekaTraining: 319, oreka_training: 319, lsec: 320, lululemonStudio: 321, lululemon_studio: 321, shanyue: 322, spinningMda: 323, spinning_mda: 323, hilldating: 324, aeroSensor: 325, aero_sensor: 325, nike: 326, magicshine: 327, ictrainer: 328, absoluteCycling: 329, absolute_cycling: 329, eoSwimbetter: 330, eo_swimbetter: 330, mywhoosh: 331, ravemen: 332, actigraphcorp: 5759, _min: 1, _max: 5759 }, garmin_product: { hrm1: 1, axh01: 2, axb01: 3, axb02: 4, hrm2ss: 5, dsiAlf02: 6, hrm3ss: 7, hrmRunSingleByteProductId: 8, hrm_run_single_byte_product_id: 8, bsm: 9, bcm: 10, axs01: 11, hrmTriSingleByteProductId: 12, hrm_tri_single_byte_product_id: 12, hrm4RunSingleByteProductId: 13, fr225SingleByteProductId: 14, gen3BsmSingleByteProductId: 15, gen3BcmSingleByteProductId: 16, hrmFitSingleByteProductId: 22, hrm_fit_single_byte_product_id: 22, oHR: 255, o_h_r: 255, fr301China: 473, fr301Japan: 474, fr301Korea: 475, fr301Taiwan: 494, fr405: 717, fr50: 782, fr405Japan: 987, fr60: 988, dsiAlf01: 1011, fr310xt: 1018, edge500: 1036, fr110: 1124, edge800: 1169, edge500Taiwan: 1199, edge500Japan: 1213, chirp: 1253, fr110Japan: 1274, edge200: 1325, fr910xt: 1328, edge800Taiwan: 1333, edge800Japan: 1334, alf04: 1341, fr610: 1345, fr210Japan: 1360, vectorSs: 1380, vector_ss: 1380, vectorCp: 1381, vector_cp: 1381, edge800China: 1386, edge500China: 1387, approachG10: 1405, fr610Japan: 1410, edge500Korea: 1422, fr70: 1436, fr310xt4t: 1446, amx: 1461, fr10: 1482, edge800Korea: 1497, swim: 1499, fr910xtChina: 1537, fenix: 1551, edge200Taiwan: 1555, edge510: 1561, edge810: 1567, tempe: 1570, fr910xtJapan: 1600, fr620: 1623, fr220: 1632, fr910xtKorea: 1664, fr10Japan: 1688, edge810Japan: 1721, virbElite: 1735, virb_elite: 1735, edgeTouring: 1736, edge_touring: 1736, edge510Japan: 1742, hrmTri: 1743, hrm_tri: 1743, hrmRun: 1752, hrm_run: 1752, fr920xt: 1765, edge510Asia: 1821, edge810China: 1822, edge810Taiwan: 1823, edge1000: 1836, vivoFit: 1837, vivo_fit: 1837, virbRemote: 1853, virb_remote: 1853, vivoKi: 1885, vivo_ki: 1885, fr15: 1903, vivoActive: 1907, vivo_active: 1907, edge510Korea: 1918, fr620Japan: 1928, fr620China: 1929, fr220Japan: 1930, fr220China: 1931, approachS6: 1936, vivoSmart: 1956, vivo_smart: 1956, fenix2: 1967, epix: 1988, fenix3: 2050, edge1000Taiwan: 2052, edge1000Japan: 2053, fr15Japan: 2061, edge520: 2067, edge1000China: 2070, fr620Russia: 2072, fr220Russia: 2073, vectorS: 2079, vector_s: 2079, edge1000Korea: 2100, fr920xtTaiwan: 2130, fr920xtChina: 2131, fr920xtJapan: 2132, virbx: 2134, vivoSmartApac: 2135, vivo_smart_apac: 2135, etrexTouch: 2140, etrex_touch: 2140, edge25: 2147, fr25: 2148, vivoFit2: 2150, fr225: 2153, fr630: 2156, fr230: 2157, fr735xt: 2158, vivoActiveApac: 2160, vivo_active_apac: 2160, vector2: 2161, vector2s: 2162, virbxe: 2172, fr620Taiwan: 2173, fr220Taiwan: 2174, truswing: 2175, d2airvenu: 2187, fenix3China: 2188, fenix3Twn: 2189, variaHeadlight: 2192, varia_headlight: 2192, variaTaillightOld: 2193, varia_taillight_old: 2193, edgeExplore1000: 2204, fr225Asia: 2219, variaRadarTaillight: 2225, varia_radar_taillight: 2225, variaRadarDisplay: 2226, varia_radar_display: 2226, edge20: 2238, edge520Asia: 2260, edge520Japan: 2261, d2Bravo: 2262, approachS20: 2266, vivoSmart2: 2271, edge1000Thai: 2274, variaRemote: 2276, varia_remote: 2276, edge25Asia: 2288, edge25Jpn: 2289, edge20Asia: 2290, approachX40: 2292, fenix3Japan: 2293, vivoSmartEmea: 2294, vivo_smart_emea: 2294, fr630Asia: 2310, fr630Jpn: 2311, fr230Jpn: 2313, hrm4Run: 2327, epixJapan: 2332, epix_japan: 2332, vivoActiveHr: 2337, vivo_active_hr: 2337, vivoSmartGpsHr: 2347, vivo_smart_gps_hr: 2347, vivoSmartHr: 2348, vivo_smart_hr: 2348, vivoSmartHrAsia: 2361, vivo_smart_hr_asia: 2361, vivoSmartGpsHrAsia: 2362, vivo_smart_gps_hr_asia: 2362, vivoMove: 2368, vivo_move: 2368, variaTaillight: 2379, varia_taillight: 2379, fr235Asia: 2396, fr235Japan: 2397, variaVision: 2398, varia_vision: 2398, vivoFit3: 2406, fenix3Korea: 2407, fenix3Sea: 2408, fenix3Hr: 2413, virbUltra30: 2417, indexSmartScale: 2429, index_smart_scale: 2429, fr235: 2431, fenix3Chronos: 2432, oregon7xx: 2441, rino7xx: 2444, epixKorea: 2457, epix_korea: 2457, fenix3HrChn: 2473, fenix3HrTwn: 2474, fenix3HrJpn: 2475, fenix3HrSea: 2476, fenix3HrKor: 2477, nautix: 2496, vivoActiveHrApac: 2497, vivo_active_hr_apac: 2497, fr35: 2503, oregon7xxWw: 2512, edge820: 2530, edgeExplore820: 2531, fr735xtApac: 2533, fr735xtJapan: 2534, fenix5s: 2544, d2BravoTitanium: 2547, variaUt800: 2567, runningDynamicsPod: 2593, running_dynamics_pod: 2593, edge820China: 2599, edge820Japan: 2600, fenix5x: 2604, vivoFitJr: 2606, vivo_fit_jr: 2606, vivoSmart3: 2622, vivoSport: 2623, vivo_sport: 2623, edge820Taiwan: 2628, edge820Korea: 2629, edge820Sea: 2630, fr35Hebrew: 2650, approachS60: 2656, fr35Apac: 2667, fr35Japan: 2668, fenix3ChronosAsia: 2675, virb360: 2687, fr935: 2691, fenix5: 2697, vivoactive3: 2700, edge1030: 2713, fr35Sea: 2727, fr235ChinaNfc: 2733, foretrex601_701: 2769, vivoMoveHr: 2772, vivo_move_hr: 2772, vector3: 2787, fenix5Asia: 2796, fenix5sAsia: 2797, fenix5xAsia: 2798, approachZ80: 2806, fr35Korea: 2814, d2charlie: 2819, vivoSmart3Apac: 2831, vivoSportApac: 2832, vivo_sport_apac: 2832, fr935Asia: 2833, descent: 2859, vivoFit4: 2878, fr645: 2886, fr645m: 2888, fr30: 2891, fenix5sPlus: 2900, edge130: 2909, edge1030Asia: 2924, vivosmart4: 2927, vivoMoveHrAsia: 2945, vivo_move_hr_asia: 2945, approachX10: 2962, fr30Asia: 2977, vivoactive3mW: 2988, fr645Asia: 3003, fr645mAsia: 3004, edgeExplore: 3011, edge_explore: 3011, gpsmap66: 3028, approachS10: 3049, vivoactive3mL: 3066, approachG80: 3085, edge130Asia: 3092, edge1030Bontrager: 3095, fenix5Plus: 3110, fenix5xPlus: 3111, edge520Plus: 3112, fr945: 3113, edge530: 3121, edge830: 3122, instinctEsports: 3126, instinct_esports: 3126, fenix5sPlusApac: 3134, fenix5xPlusApac: 3135, edge520PlusApac: 3142, descentT1: 3143, fr235lAsia: 3144, fr245Asia: 3145, vivoActive3mApac: 3163, gen3Bsm: 3192, gen3Bcm: 3193, vivoSmart4Asia: 3218, vivoactive4Small: 3224, vivoactive4Large: 3225, venu: 3226, marqDriver: 3246, marq_driver: 3246, marqAviator: 3247, marq_aviator: 3247, marqCaptain: 3248, marq_captain: 3248, marqCommander: 3249, marq_commander: 3249, marqExpedition: 3250, marq_expedition: 3250, marqAthlete: 3251, marq_athlete: 3251, descentMk2: 3258, gpsmap66i: 3284, fenix6SSport: 3287, fenix6S: 3288, fenix6Sport: 3289, fenix6: 3290, fenix6x: 3291, hrmDual: 3299, hrm_dual: 3299, hrmPro: 3300, hrm_pro: 3300, vivoMove3Premium: 3308, approachS40: 3314, fr245mAsia: 3321, edge530Apac: 3349, edge830Apac: 3350, vivoMove3: 3378, vivoActive4SmallAsia: 3387, vivoActive4LargeAsia: 3388, vivoActive4OledAsia: 3389, swim2: 3405, marqDriverAsia: 3420, marq_driver_asia: 3420, marqAviatorAsia: 3421, marq_aviator_asia: 3421, vivoMove3Asia: 3422, fr945Asia: 3441, vivoActive3tChn: 3446, marqCaptainAsia: 3448, marq_captain_asia: 3448, marqCommanderAsia: 3449, marq_commander_asia: 3449, marqExpeditionAsia: 3450, marq_expedition_asia: 3450, marqAthleteAsia: 3451, marq_athlete_asia: 3451, indexSmartScale2: 3461, instinctSolar: 3466, instinct_solar: 3466, fr45Asia: 3469, vivoactive3Daimler: 3473, legacyRey: 3498, legacy_rey: 3498, legacyDarthVader: 3499, legacy_darth_vader: 3499, legacyCaptainMarvel: 3500, legacy_captain_marvel: 3500, legacyFirstAvenger: 3501, legacy_first_avenger: 3501, fenix6sSportAsia: 3512, fenix6sAsia: 3513, fenix6SportAsia: 3514, fenix6Asia: 3515, fenix6xAsia: 3516, legacyCaptainMarvelAsia: 3535, legacy_captain_marvel_asia: 3535, legacyFirstAvengerAsia: 3536, legacy_first_avenger_asia: 3536, legacyReyAsia: 3537, legacy_rey_asia: 3537, legacyDarthVaderAsia: 3538, legacy_darth_vader_asia: 3538, descentMk2s: 3542, edge130Plus: 3558, edge1030Plus: 3570, rally200: 3578, fr745: 3589, venusq: 3600, lily: 3615, marqAdventurer: 3624, marq_adventurer: 3624, enduro: 3638, swim2Apac: 3639, marqAdventurerAsia: 3648, marq_adventurer_asia: 3648, fr945Lte: 3652, descentMk2Asia: 3702, venu2: 3703, venu2s: 3704, venuDaimlerAsia: 3737, venu_daimler_asia: 3737, marqGolfer: 3739, marq_golfer: 3739, venuDaimler: 3740, venu_daimler: 3740, fr745Asia: 3794, variaRct715: 3808, lilyAsia: 3809, lily_asia: 3809, edge1030PlusAsia: 3812, edge130PlusAsia: 3813, approachS12: 3823, venusqAsia: 3837, venusq_asia: 3837, edge1040: 3843, marqGolferAsia: 3850, marq_golfer_asia: 3850, venu2Plus: 3851, gnss: 3865, fr55: 3869, enduroAsia: 3872, enduro_asia: 3872, instinct2: 3888, fenix7s: 3905, fenix7: 3906, fenix7x: 3907, fenix7sApac: 3908, fenix7Apac: 3909, fenix7xApac: 3910, approachG12: 3927, descentMk2sAsia: 3930, approachS42: 3934, epixGen2: 3943, epixGen2Apac: 3944, venu2sAsia: 3949, venu2Asia: 3950, fr945LteAsia: 3978, vivoMoveSport: 3982, vivo_move_sport: 3982, vivomoveTrend: 3983, vivomove_trend: 3983, approachS12Asia: 3986, fr255Music: 3990, fr255SmallMusic: 3991, fr255: 3992, fr255Small: 3993, approachG12Asia: 4001, approachS42Asia: 4002, descentG1: 4005, venu2PlusAsia: 4017, fr955: 4024, fr55Asia: 4033, edge540: 4061, edge840: 4062, vivosmart5: 4063, instinct2Asia: 4071, marqGen2: 4105, venusq2: 4115, venusq2music: 4116, marqGen2Aviator: 4124, d2AirX10: 4125, hrmProPlus: 4130, hrm_pro_plus: 4130, descentG1Asia: 4132, tactix7: 4135, instinctCrossover: 4155, instinct_crossover: 4155, edgeExplore2: 4169, descentMk3: 4222, descentMk3i: 4223, approachS70: 4233, fr265Large: 4257, fr265Small: 4258, venu3: 4260, venu3s: 4261, tacxNeoSmart: 4265, tacx_neo_smart: 4265, tacxNeo2Smart: 4266, tacxNeo2TSmart: 4267, tacxNeoSmartBike: 4268, tacx_neo_smart_bike: 4268, tacxSatoriSmart: 4269, tacx_satori_smart: 4269, tacxFlowSmart: 4270, tacx_flow_smart: 4270, tacxVortexSmart: 4271, tacx_vortex_smart: 4271, tacxBushidoSmart: 4272, tacx_bushido_smart: 4272, tacxGeniusSmart: 4273, tacx_genius_smart: 4273, tacxFluxFluxSSmart: 4274, tacx_flux_flux_s_smart: 4274, tacxFlux2Smart: 4275, tacxMagnum: 4276, tacx_magnum: 4276, edge1040Asia: 4305, epixGen2Pro42: 4312, epixGen2Pro47: 4313, epixGen2Pro51: 4314, fr965: 4315, enduro2: 4341, fenix7sProSolar: 4374, fenix7ProSolar: 4375, fenix7xProSolar: 4376, lily2: 4380, instinct2x: 4394, vivoactive5: 4426, fr165: 4432, fr165Music: 4433, edge1050: 4440, descentT2: 4442, hrmFit: 4446, hrm_fit: 4446, marqGen2Commander: 4472, lilyAthlete: 4477, lily_athlete: 4477, fenix8Solar: 4532, fenix8SolarLarge: 4533, fenix8Small: 4534, fenix8: 4536, d2Mach1Pro: 4556, enduro3: 4575, fenixE: 4666, fenix_e: 4666, sdm4: 10007, edgeRemote: 10014, edge_remote: 10014, trainingCenter: 20119, training_center: 20119, tacxTrainingAppWin: 20533, tacx_training_app_win: 20533, tacxTrainingAppMac: 20534, tacx_training_app_mac: 20534, tacxTrainingAppMacCatalyst: 20565, tacx_training_app_mac_catalyst: 20565, tacxTrainingAppAndroid: 30045, tacx_training_app_android: 30045, tacxTrainingAppIos: 30046, tacx_training_app_ios: 30046, tacxTrainingAppLegacy: 30047, tacx_training_app_legacy: 30047, connectiqSimulator: 65531, connectiq_simulator: 65531, androidAntplusPlugin: 65532, android_antplus_plugin: 65532, connect: 65534, _min: 1, _max: 65534 }, antplus_device_type: { antfs: 1, bikePower: 11, bike_power: 11, environmentSensorLegacy: 12, environment_sensor_legacy: 12, multiSportSpeedDistance: 15, multi_sport_speed_distance: 15, control: 16, fitnessEquipment: 17, fitness_equipment: 17, bloodPressure: 18, blood_pressure: 18, geocacheNode: 19, geocache_node: 19, lightElectricVehicle: 20, light_electric_vehicle: 20, envSensor: 25, env_sensor: 25, racquet: 26, controlHub: 27, control_hub: 27, muscleOxygen: 31, muscle_oxygen: 31, shifting: 34, bikeLightMain: 35, bike_light_main: 35, bikeLightShared: 36, bike_light_shared: 36, exd: 38, bikeRadar: 40, bike_radar: 40, bikeAero: 46, bike_aero: 46, weightScale: 119, weight_scale: 119, heartRate: 120, heart_rate: 120, bikeSpeedCadence: 121, bike_speed_cadence: 121, bikeCadence: 122, bike_cadence: 122, bikeSpeed: 123, bike_speed: 123, strideSpeedDistance: 124, stride_speed_distance: 124, _min: 1, _max: 124 }, ant_network: { public: 0, antplus: 1, antfs: 2, private: 3, _min: 0, _max: 3 }, workout_capabilities: { interval: 1, custom: 2, fitnessEquipment: 4, fitness_equipment: 4, firstbeat: 8, newLeaf: 16, new_leaf: 16, tcx: 32, speed: 128, heartRate: 256, heart_rate: 256, distance: 512, cadence: 1024, power: 2048, grade: 4096, resistance: 8192, protected: 16384, _min: 1, _max: 16384 }, battery_status: { new: 1, good: 2, ok: 3, low: 4, critical: 5, charging: 6, unknown: 7, _min: 1, _max: 7 }, hr_type: { normal: 0, irregular: 1, _min: 0, _max: 1 }, course_capabilities: { processed: 1, valid: 2, time: 4, distance: 8, position: 16, heartRate: 32, heart_rate: 32, power: 64, cadence: 128, training: 256, navigation: 512, bikeway: 1024, aviation: 4096, _min: 1, _max: 4096 }, weight: { calculating: 65534, _min: 65534, _max: 65534 }, workout_hr: { bpmOffset: 100, bpm_offset: 100, _min: 100, _max: 100 }, workout_power: { wattsOffset: 1e3, watts_offset: 1e3, _min: 1e3, _max: 1e3 }, bp_status: { noError: 0, no_error: 0, errorIncompleteData: 1, error_incomplete_data: 1, errorNoMeasurement: 2, error_no_measurement: 2, errorDataOutOfRange: 3, error_data_out_of_range: 3, errorIrregularHeartRate: 4, error_irregular_heart_rate: 4, _min: 0, _max: 4 }, user_local_id: { localMin: 0, local_min: 0, localMax: 15, local_max: 15, stationaryMin: 16, stationary_min: 16, stationaryMax: 255, stationary_max: 255, portableMin: 256, portable_min: 256, portableMax: 65534, portable_max: 65534, _min: 0, _max: 65534 }, swim_stroke: { freestyle: 0, backstroke: 1, breaststroke: 2, butterfly: 3, drill: 4, mixed: 5, im: 6, _min: 0, _max: 6 }, activity_type: { generic: 0, running: 1, cycling: 2, transition: 3, fitnessEquipment: 4, fitness_equipment: 4, swimming: 5, walking: 6, sedentary: 8, all: 254, _min: 0, _max: 254 }, activity_subtype: { generic: 0, treadmill: 1, street: 2, trail: 3, track: 4, spin: 5, indoorCycling: 6, indoor_cycling: 6, road: 7, mountain: 8, downhill: 9, recumbent: 10, cyclocross: 11, handCycling: 12, hand_cycling: 12, trackCycling: 13, track_cycling: 13, indoorRowing: 14, indoor_rowing: 14, elliptical: 15, stairClimbing: 16, stair_climbing: 16, lapSwimming: 17, lap_swimming: 17, openWater: 18, open_water: 18, all: 254, _min: 0, _max: 254 }, activity_level: { low: 0, medium: 1, high: 2, _min: 0, _max: 2 }, side: { right: 0, left: 1, _min: 0, _max: 1 }, left_right_balance: { mask: 127, right: 128, _min: 127, _max: 128 }, left_right_balance100: { mask: 16383, right: 32768, _min: 16383, _max: 32768 }, length_type: { idle: 0, active: 1, _min: 0, _max: 1 }, day_of_week: { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, _min: 0, _max: 6 }, connectivity_capabilities: { bluetooth: 1, bluetoothLe: 2, bluetooth_le: 2, ant: 4, activityUpload: 8, activity_upload: 8, courseDownload: 16, course_download: 16, workoutDownload: 32, workout_download: 32, liveTrack: 64, live_track: 64, weatherConditions: 128, weather_conditions: 128, weatherAlerts: 256, weather_alerts: 256, gpsEphemerisDownload: 512, gps_ephemeris_download: 512, explicitArchive: 1024, explicit_archive: 1024, setupIncomplete: 2048, setup_incomplete: 2048, continueSyncAfterSoftwareUpdate: 4096, continue_sync_after_software_update: 4096, connectIqAppDownload: 8192, connect_iq_app_download: 8192, golfCourseDownload: 16384, golf_course_download: 16384, deviceInitiatesSync: 32768, device_initiates_sync: 32768, connectIqWatchAppDownload: 65536, connect_iq_watch_app_download: 65536, connectIqWidgetDownload: 131072, connect_iq_widget_download: 131072, connectIqWatchFaceDownload: 262144, connect_iq_watch_face_download: 262144, connectIqDataFieldDownload: 524288, connect_iq_data_field_download: 524288, connectIqAppManagment: 1048576, connect_iq_app_managment: 1048576, swingSensor: 2097152, swing_sensor: 2097152, swingSensorRemote: 4194304, swing_sensor_remote: 4194304, incidentDetection: 8388608, incident_detection: 8388608, audioPrompts: 16777216, audio_prompts: 16777216, wifiVerification: 33554432, wifi_verification: 33554432, trueUp: 67108864, true_up: 67108864, findMyWatch: 134217728, find_my_watch: 134217728, remoteManualSync: 268435456, remote_manual_sync: 268435456, liveTrackAutoStart: 536870912, live_track_auto_start: 536870912, liveTrackMessaging: 1073741824, live_track_messaging: 1073741824, instantInput: 2147483648, instant_input: 2147483648, _min: 1, _max: 2147483648 }, weather_report: { current: 0, hourlyForecast: 1, hourly_forecast: 1, dailyForecast: 2, daily_forecast: 2, _min: 0, _max: 2 }, weather_status: { clear: 0, partlyCloudy: 1, partly_cloudy: 1, mostlyCloudy: 2, mostly_cloudy: 2, rain: 3, snow: 4, windy: 5, thunderstorms: 6, wintryMix: 7, wintry_mix: 7, fog: 8, hazy: 11, hail: 12, scatteredShowers: 13, scattered_showers: 13, scatteredThunderstorms: 14, scattered_thunderstorms: 14, unknownPrecipitation: 15, unknown_precipitation: 15, lightRain: 16, light_rain: 16, heavyRain: 17, heavy_rain: 17, lightSnow: 18, light_snow: 18, heavySnow: 19, heavy_snow: 19, lightRainSnow: 20, light_rain_snow: 20, heavyRainSnow: 21, heavy_rain_snow: 21, cloudy: 22, _min: 0, _max: 22 }, weather_severity: { unknown: 0, warning: 1, watch: 2, advisory: 3, statement: 4, _min: 0, _max: 4 }, weather_severe_type: { unspecified: 0, tornado: 1, tsunami: 2, hurricane: 3, extremeWind: 4, extreme_wind: 4, typhoon: 5, inlandHurricane: 6, inland_hurricane: 6, hurricaneForceWind: 7, hurricane_force_wind: 7, waterspout: 8, severeThunderstorm: 9, severe_thunderstorm: 9, wreckhouseWinds: 10, wreckhouse_winds: 10, lesSuetesWind: 11, les_suetes_wind: 11, avalanche: 12, flashFlood: 13, flash_flood: 13, tropicalStorm: 14, tropical_storm: 14, inlandTropicalStorm: 15, inland_tropical_storm: 15, blizzard: 16, iceStorm: 17, ice_storm: 17, freezingRain: 18, freezing_rain: 18, debrisFlow: 19, debris_flow: 19, flashFreeze: 20, flash_freeze: 20, dustStorm: 21, dust_storm: 21, highWind: 22, high_wind: 22, winterStorm: 23, winter_storm: 23, heavyFreezingSpray: 24, heavy_freezing_spray: 24, extremeCold: 25, extreme_cold: 25, windChill: 26, wind_chill: 26, coldWave: 27, cold_wave: 27, heavySnowAlert: 28, heavy_snow_alert: 28, lakeEffectBlowingSnow: 29, lake_effect_blowing_snow: 29, snowSquall: 30, snow_squall: 30, lakeEffectSnow: 31, lake_effect_snow: 31, winterWeather: 32, winter_weather: 32, sleet: 33, snowfall: 34, snowAndBlowingSnow: 35, snow_and_blowing_snow: 35, blowingSnow: 36, blowing_snow: 36, snowAlert: 37, snow_alert: 37, arcticOutflow: 38, arctic_outflow: 38, freezingDrizzle: 39, freezing_drizzle: 39, storm: 40, stormSurge: 41, storm_surge: 41, rainfall: 42, arealFlood: 43, areal_flood: 43, coastalFlood: 44, coastal_flood: 44, lakeshoreFlood: 45, lakeshore_flood: 45, excessiveHeat: 46, excessive_heat: 46, heat: 47, weather: 48, highHeatAndHumidity: 49, high_heat_and_humidity: 49, humidexAndHealth: 50, humidex_and_health: 50, humidex: 51, gale: 52, freezingSpray: 53, freezing_spray: 53, specialMarine: 54, special_marine: 54, squall: 55, strongWind: 56, strong_wind: 56, lakeWind: 57, lake_wind: 57, marineWeather: 58, marine_weather: 58, wind: 59, smallCraftHazardousSeas: 60, small_craft_hazardous_seas: 60, hazardousSeas: 61, hazardous_seas: 61, smallCraft: 62, small_craft: 62, smallCraftWinds: 63, small_craft_winds: 63, smallCraftRoughBar: 64, small_craft_rough_bar: 64, highWaterLevel: 65, high_water_level: 65, ashfall: 66, freezingFog: 67, freezing_fog: 67, denseFog: 68, dense_fog: 68, denseSmoke: 69, dense_smoke: 69, blowingDust: 70, blowing_dust: 70, hardFreeze: 71, hard_freeze: 71, freeze: 72, frost: 73, fireWeather: 74, fire_weather: 74, flood: 75, ripTide: 76, rip_tide: 76, highSurf: 77, high_surf: 77, smog: 78, airQuality: 79, air_quality: 79, briskWind: 80, brisk_wind: 80, airStagnation: 81, air_stagnation: 81, lowWater: 82, low_water: 82, hydrological: 83, specialWeather: 84, special_weather: 84, _min: 0, _max: 84 }, time_into_day: { _min: 0, _max: 0 }, localtime_into_day: { _min: 0, _max: 0 }, stroke_type: { noEvent: 0, no_event: 0, other: 1, serve: 2, forehand: 3, backhand: 4, smash: 5, _min: 0, _max: 5 }, body_location: { leftLeg: 0, left_leg: 0, leftCalf: 1, left_calf: 1, leftShin: 2, left_shin: 2, leftHamstring: 3, left_hamstring: 3, leftQuad: 4, left_quad: 4, leftGlute: 5, left_glute: 5, rightLeg: 6, right_leg: 6, rightCalf: 7, right_calf: 7, rightShin: 8, right_shin: 8, rightHamstring: 9, right_hamstring: 9, rightQuad: 10, right_quad: 10, rightGlute: 11, right_glute: 11, torsoBack: 12, torso_back: 12, leftLowerBack: 13, left_lower_back: 13, leftUpperBack: 14, left_upper_back: 14, rightLowerBack: 15, right_lower_back: 15, rightUpperBack: 16, right_upper_back: 16, torsoFront: 17, torso_front: 17, leftAbdomen: 18, left_abdomen: 18, leftChest: 19, left_chest: 19, rightAbdomen: 20, right_abdomen: 20, rightChest: 21, right_chest: 21, leftArm: 22, left_arm: 22, leftShoulder: 23, left_shoulder: 23, leftBicep: 24, left_bicep: 24, leftTricep: 25, left_tricep: 25, leftBrachioradialis: 26, left_brachioradialis: 26, leftForearmExtensors: 27, left_forearm_extensors: 27, rightArm: 28, right_arm: 28, rightShoulder: 29, right_shoulder: 29, rightBicep: 30, right_bicep: 30, rightTricep: 31, right_tricep: 31, rightBrachioradialis: 32, right_brachioradialis: 32, rightForearmExtensors: 33, right_forearm_extensors: 33, neck: 34, throat: 35, waistMidBack: 36, waist_mid_back: 36, waistFront: 37, waist_front: 37, waistLeft: 38, waist_left: 38, waistRight: 39, waist_right: 39, _min: 0, _max: 39 }, segment_lap_status: { end: 0, fail: 1, _min: 0, _max: 1 }, segment_leaderboard_type: { overall: 0, personalBest: 1, personal_best: 1, connections: 2, group: 3, challenger: 4, kom: 5, qom: 6, pr: 7, goal: 8, carrot: 9, clubLeader: 10, club_leader: 10, rival: 11, last: 12, recentBest: 13, recent_best: 13, courseRecord: 14, course_record: 14, _min: 0, _max: 14 }, segment_delete_status: { doNotDelete: 0, do_not_delete: 0, deleteOne: 1, delete_one: 1, deleteAll: 2, delete_all: 2, _min: 0, _max: 2 }, segment_selection_type: { starred: 0, suggested: 1, _min: 0, _max: 1 }, source_type: { ant: 0, antplus: 1, bluetooth: 2, bluetoothLowEnergy: 3, bluetooth_low_energy: 3, wifi: 4, local: 5, _min: 0, _max: 5 }, local_device_type: { gps: 0, glonass: 1, gpsGlonass: 2, gps_glonass: 2, accelerometer: 3, barometer: 4, temperature: 5, whr: 10, sensorHub: 12, sensor_hub: 12, _min: 0, _max: 12 }, ble_device_type: { connectedGps: 0, connected_gps: 0, heartRate: 1, heart_rate: 1, bikePower: 2, bike_power: 2, bikeSpeedCadence: 3, bike_speed_cadence: 3, bikeSpeed: 4, bike_speed: 4, bikeCadence: 5, bike_cadence: 5, footpod: 6, bikeTrainer: 7, bike_trainer: 7, _min: 0, _max: 7 }, ant_channel_id: { antDeviceNumber: 65535, ant_device_number: 65535, antDeviceType: 16711680, ant_device_type: 16711680, antTransmissionTypeLowerNibble: 251658240, ant_transmission_type_lower_nibble: 251658240, antExtendedDeviceNumberUpperNibble: 4026531840, ant_extended_device_number_upper_nibble: 4026531840, _min: 65535, _max: 4026531840 }, display_orientation: { auto: 0, portrait: 1, landscape: 2, portraitFlipped: 3, portrait_flipped: 3, landscapeFlipped: 4, landscape_flipped: 4, _min: 0, _max: 4 }, workout_equipment: { none: 0, swimFins: 1, swim_fins: 1, swimKickboard: 2, swim_kickboard: 2, swimPaddles: 3, swim_paddles: 3, swimPullBuoy: 4, swim_pull_buoy: 4, swimSnorkel: 5, swim_snorkel: 5, _min: 0, _max: 5 }, watchface_mode: { digital: 0, analog: 1, connectIq: 2, connect_iq: 2, disabled: 3, _min: 0, _max: 3 }, digital_watchface_layout: { traditional: 0, modern: 1, bold: 2, _min: 0, _max: 2 }, analog_watchface_layout: { minimal: 0, traditional: 1, modern: 2, _min: 0, _max: 2 }, rider_position_type: { seated: 0, standing: 1, transitionToSeated: 2, transition_to_seated: 2, transitionToStanding: 3, transition_to_standing: 3, _min: 0, _max: 3 }, power_phase_type: { powerPhaseStartAngle: 0, power_phase_start_angle: 0, powerPhaseEndAngle: 1, power_phase_end_angle: 1, powerPhaseArcLength: 2, power_phase_arc_length: 2, powerPhaseCenter: 3, power_phase_center: 3, _min: 0, _max: 3 }, camera_event_type: { videoStart: 0, video_start: 0, videoSplit: 1, video_split: 1, videoEnd: 2, video_end: 2, photoTaken: 3, photo_taken: 3, videoSecondStreamStart: 4, video_second_stream_start: 4, videoSecondStreamSplit: 5, video_second_stream_split: 5, videoSecondStreamEnd: 6, video_second_stream_end: 6, videoSplitStart: 7, video_split_start: 7, videoSecondStreamSplitStart: 8, video_second_stream_split_start: 8, videoPause: 11, video_pause: 11, videoSecondStreamPause: 12, video_second_stream_pause: 12, videoResume: 13, video_resume: 13, videoSecondStreamResume: 14, video_second_stream_resume: 14, _min: 0, _max: 14 }, sensor_type: { accelerometer: 0, gyroscope: 1, compass: 2, barometer: 3, _min: 0, _max: 3 }, bike_light_network_config_type: { auto: 0, individual: 4, highVisibility: 5, high_visibility: 5, trail: 6, _min: 0, _max: 6 }, comm_timeout_type: { wildcardPairingTimeout: 0, wildcard_pairing_timeout: 0, pairingTimeout: 1, pairing_timeout: 1, connectionLost: 2, connection_lost: 2, connectionTimeout: 3, connection_timeout: 3, _min: 0, _max: 3 }, camera_orientation_type: { cameraOrientation0: 0, cameraOrientation90: 1, cameraOrientation180: 2, cameraOrientation270: 3, _min: 0, _max: 3 }, attitude_stage: { failed: 0, aligning: 1, degraded: 2, valid: 3, _min: 0, _max: 3 }, attitude_validity: { trackAngleHeadingValid: 1, track_angle_heading_valid: 1, pitchValid: 2, pitch_valid: 2, rollValid: 4, roll_valid: 4, lateralBodyAccelValid: 8, lateral_body_accel_valid: 8, normalBodyAccelValid: 16, normal_body_accel_valid: 16, turnRateValid: 32, turn_rate_valid: 32, hwFail: 64, hw_fail: 64, magInvalid: 128, mag_invalid: 128, noGps: 256, no_gps: 256, gpsInvalid: 512, gps_invalid: 512, solutionCoasting: 1024, solution_coasting: 1024, trueTrackAngle: 2048, true_track_angle: 2048, magneticHeading: 4096, magnetic_heading: 4096, _min: 1, _max: 4096 }, auto_sync_frequency: { never: 0, occasionally: 1, frequent: 2, onceADay: 3, once_a_day: 3, remote: 4, _min: 0, _max: 4 }, exd_layout: { fullScreen: 0, full_screen: 0, halfVertical: 1, half_vertical: 1, halfHorizontal: 2, half_horizontal: 2, halfVerticalRightSplit: 3, half_vertical_right_split: 3, halfHorizontalBottomSplit: 4, half_horizontal_bottom_split: 4, fullQuarterSplit: 5, full_quarter_split: 5, halfVerticalLeftSplit: 6, half_vertical_left_split: 6, halfHorizontalTopSplit: 7, half_horizontal_top_split: 7, dynamic: 8, _min: 0, _max: 8 }, exd_display_type: { numerical: 0, simple: 1, graph: 2, bar: 3, circleGraph: 4, circle_graph: 4, virtualPartner: 5, virtual_partner: 5, balance: 6, stringList: 7, string_list: 7, string: 8, simpleDynamicIcon: 9, simple_dynamic_icon: 9, gauge: 10, _min: 0, _max: 10 }, exd_data_units: { noUnits: 0, no_units: 0, laps: 1, milesPerHour: 2, miles_per_hour: 2, kilometersPerHour: 3, kilometers_per_hour: 3, feetPerHour: 4, feet_per_hour: 4, metersPerHour: 5, meters_per_hour: 5, degreesCelsius: 6, degrees_celsius: 6, degreesFarenheit: 7, degrees_farenheit: 7, zone: 8, gear: 9, rpm: 10, bpm: 11, degrees: 12, millimeters: 13, meters: 14, kilometers: 15, feet: 16, yards: 17, kilofeet: 18, miles: 19, time: 20, enumTurnType: 21, enum_turn_type: 21, percent: 22, watts: 23, wattsPerKilogram: 24, watts_per_kilogram: 24, enumBatteryStatus: 25, enum_battery_status: 25, enumBikeLightBeamAngleMode: 26, enum_bike_light_beam_angle_mode: 26, enumBikeLightBatteryStatus: 27, enum_bike_light_battery_status: 27, enumBikeLightNetworkConfigType: 28, enum_bike_light_network_config_type: 28, lights: 29, seconds: 30, minutes: 31, hours: 32, calories: 33, kilojoules: 34, milliseconds: 35, secondPerMile: 36, second_per_mile: 36, secondPerKilometer: 37, second_per_kilometer: 37, centimeter: 38, enumCoursePoint: 39, enum_course_point: 39, bradians: 40, enumSport: 41, enum_sport: 41, inchesHg: 42, inches_hg: 42, mmHg: 43, mm_hg: 43, mbars: 44, hectoPascals: 45, hecto_pascals: 45, feetPerMin: 46, feet_per_min: 46, metersPerMin: 47, meters_per_min: 47, metersPerSec: 48, meters_per_sec: 48, eightCardinal: 49, eight_cardinal: 49, _min: 0, _max: 49 }, exd_qualifiers: { noQualifier: 0, no_qualifier: 0, instantaneous: 1, average: 2, lap: 3, maximum: 4, maximumAverage: 5, maximum_average: 5, maximumLap: 6, maximum_lap: 6, lastLap: 7, last_lap: 7, averageLap: 8, average_lap: 8, toDestination: 9, to_destination: 9, toGo: 10, to_go: 10, toNext: 11, to_next: 11, nextCoursePoint: 12, next_course_point: 12, total: 13, threeSecondAverage: 14, three_second_average: 14, tenSecondAverage: 15, ten_second_average: 15, thirtySecondAverage: 16, thirty_second_average: 16, percentMaximum: 17, percent_maximum: 17, percentMaximumAverage: 18, percent_maximum_average: 18, lapPercentMaximum: 19, lap_percent_maximum: 19, elapsed: 20, sunrise: 21, sunset: 22, comparedToVirtualPartner: 23, compared_to_virtual_partner: 23, maximum24h: 24, minimum24h: 25, minimum: 26, first: 27, second: 28, third: 29, shifter: 30, lastSport: 31, last_sport: 31, moving: 32, stopped: 33, estimatedTotal: 34, estimated_total: 34, zone9: 242, zone8: 243, zone7: 244, zone6: 245, zone5: 246, zone4: 247, zone3: 248, zone2: 249, zone1: 250, _min: 0, _max: 250 }, exd_descriptors: { bikeLightBatteryStatus: 0, bike_light_battery_status: 0, beamAngleStatus: 1, beam_angle_status: 1, bateryLevel: 2, batery_level: 2, lightNetworkMode: 3, light_network_mode: 3, numberLightsConnected: 4, number_lights_connected: 4, cadence: 5, distance: 6, estimatedTimeOfArrival: 7, estimated_time_of_arrival: 7, heading: 8, time: 9, batteryLevel: 10, battery_level: 10, trainerResistance: 11, trainer_resistance: 11, trainerTargetPower: 12, trainer_target_power: 12, timeSeated: 13, time_seated: 13, timeStanding: 14, time_standing: 14, elevation: 15, grade: 16, ascent: 17, descent: 18, verticalSpeed: 19, vertical_speed: 19, di2BatteryLevel: 20, frontGear: 21, front_gear: 21, rearGear: 22, rear_gear: 22, gearRatio: 23, gear_ratio: 23, heartRate: 24, heart_rate: 24, heartRateZone: 25, heart_rate_zone: 25, timeInHeartRateZone: 26, time_in_heart_rate_zone: 26, heartRateReserve: 27, heart_rate_reserve: 27, calories: 28, gpsAccuracy: 29, gps_accuracy: 29, gpsSignalStrength: 30, gps_signal_strength: 30, temperature: 31, timeOfDay: 32, time_of_day: 32, balance: 33, pedalSmoothness: 34, pedal_smoothness: 34, power: 35, functionalThresholdPower: 36, functional_threshold_power: 36, intensityFactor: 37, intensity_factor: 37, work: 38, powerRatio: 39, power_ratio: 39, normalizedPower: 40, normalized_power: 40, trainingStressScore: 41, training_stress_score: 41, timeOnZone: 42, time_on_zone: 42, speed: 43, laps: 44, reps: 45, workoutStep: 46, workout_step: 46, courseDistance: 47, course_distance: 47, navigationDistance: 48, navigation_distance: 48, courseEstimatedTimeOfArrival: 49, course_estimated_time_of_arrival: 49, navigationEstimatedTimeOfArrival: 50, navigation_estimated_time_of_arrival: 50, courseTime: 51, course_time: 51, navigationTime: 52, navigation_time: 52, courseHeading: 53, course_heading: 53, navigationHeading: 54, navigation_heading: 54, powerZone: 55, power_zone: 55, torqueEffectiveness: 56, torque_effectiveness: 56, timerTime: 57, timer_time: 57, powerWeightRatio: 58, power_weight_ratio: 58, leftPlatformCenterOffset: 59, left_platform_center_offset: 59, rightPlatformCenterOffset: 60, right_platform_center_offset: 60, leftPowerPhaseStartAngle: 61, left_power_phase_start_angle: 61, rightPowerPhaseStartAngle: 62, right_power_phase_start_angle: 62, leftPowerPhaseFinishAngle: 63, left_power_phase_finish_angle: 63, rightPowerPhaseFinishAngle: 64, right_power_phase_finish_angle: 64, gears: 65, pace: 66, trainingEffect: 67, training_effect: 67, verticalOscillation: 68, vertical_oscillation: 68, verticalRatio: 69, vertical_ratio: 69, groundContactTime: 70, ground_contact_time: 70, leftGroundContactTimeBalance: 71, left_ground_contact_time_balance: 71, rightGroundContactTimeBalance: 72, right_ground_contact_time_balance: 72, strideLength: 73, stride_length: 73, runningCadence: 74, running_cadence: 74, performanceCondition: 75, performance_condition: 75, courseType: 76, course_type: 76, timeInPowerZone: 77, time_in_power_zone: 77, navigationTurn: 78, navigation_turn: 78, courseLocation: 79, course_location: 79, navigationLocation: 80, navigation_location: 80, compass: 81, gearCombo: 82, gear_combo: 82, muscleOxygen: 83, muscle_oxygen: 83, icon: 84, compassHeading: 85, compass_heading: 85, gpsHeading: 86, gps_heading: 86, gpsElevation: 87, gps_elevation: 87, anaerobicTrainingEffect: 88, anaerobic_training_effect: 88, course: 89, offCourse: 90, off_course: 90, glideRatio: 91, glide_ratio: 91, verticalDistance: 92, vertical_distance: 92, vmg: 93, ambientPressure: 94, ambient_pressure: 94, pressure: 95, vam: 96, _min: 0, _max: 96 }, auto_activity_detect: { none: 0, running: 1, cycling: 2, swimming: 4, walking: 8, elliptical: 32, sedentary: 1024, _min: 0, _max: 1024 }, supported_exd_screen_layouts: { fullScreen: 1, full_screen: 1, halfVertical: 2, half_vertical: 2, halfHorizontal: 4, half_horizontal: 4, halfVerticalRightSplit: 8, half_vertical_right_split: 8, halfHorizontalBottomSplit: 16, half_horizontal_bottom_split: 16, fullQuarterSplit: 32, full_quarter_split: 32, halfVerticalLeftSplit: 64, half_vertical_left_split: 64, halfHorizontalTopSplit: 128, half_horizontal_top_split: 128, _min: 1, _max: 128 }, fit_base_type: { enum: 0, sint8: 1, uint8: 2, string: 7, uint8z: 10, byte: 13, sint16: 131, uint16: 132, sint32: 133, uint32: 134, float32: 136, float64: 137, uint16z: 139, uint32z: 140, sint64: 142, uint64: 143, uint64z: 144, _min: 0, _max: 144 }, turn_type: { arrivingIdx: 0, arriving_idx: 0, arrivingLeftIdx: 1, arriving_left_idx: 1, arrivingRightIdx: 2, arriving_right_idx: 2, arrivingViaIdx: 3, arriving_via_idx: 3, arrivingViaLeftIdx: 4, arriving_via_left_idx: 4, arrivingViaRightIdx: 5, arriving_via_right_idx: 5, bearKeepLeftIdx: 6, bear_keep_left_idx: 6, bearKeepRightIdx: 7, bear_keep_right_idx: 7, continueIdx: 8, continue_idx: 8, exitLeftIdx: 9, exit_left_idx: 9, exitRightIdx: 10, exit_right_idx: 10, ferryIdx: 11, ferry_idx: 11, roundabout45Idx: 12, roundabout90Idx: 13, roundabout135Idx: 14, roundabout180Idx: 15, roundabout225Idx: 16, roundabout270Idx: 17, roundabout315Idx: 18, roundabout360Idx: 19, roundaboutNeg45Idx: 20, roundaboutNeg90Idx: 21, roundaboutNeg135Idx: 22, roundaboutNeg180Idx: 23, roundaboutNeg225Idx: 24, roundaboutNeg270Idx: 25, roundaboutNeg315Idx: 26, roundaboutNeg360Idx: 27, roundaboutGenericIdx: 28, roundabout_generic_idx: 28, roundaboutNegGenericIdx: 29, roundabout_neg_generic_idx: 29, sharpTurnLeftIdx: 30, sharp_turn_left_idx: 30, sharpTurnRightIdx: 31, sharp_turn_right_idx: 31, turnLeftIdx: 32, turn_left_idx: 32, turnRightIdx: 33, turn_right_idx: 33, uturnLeftIdx: 34, uturn_left_idx: 34, uturnRightIdx: 35, uturn_right_idx: 35, iconInvIdx: 36, icon_inv_idx: 36, iconIdxCnt: 37, icon_idx_cnt: 37, _min: 0, _max: 37 }, bike_light_beam_angle_mode: { manual: 0, auto: 1, _min: 0, _max: 1 }, fit_base_unit: { other: 0, kilogram: 1, pound: 2, _min: 0, _max: 2 }, set_type: { rest: 0, active: 1, _min: 0, _max: 1 }, max_met_category: { generic: 0, cycling: 1, _min: 0, _max: 1 }, exercise_category: { benchPress: 0, bench_press: 0, calfRaise: 1, calf_raise: 1, cardio: 2, carry: 3, chop: 4, core: 5, crunch: 6, curl: 7, deadlift: 8, flye: 9, hipRaise: 10, hip_raise: 10, hipStability: 11, hip_stability: 11, hipSwing: 12, hip_swing: 12, hyperextension: 13, lateralRaise: 14, lateral_raise: 14, legCurl: 15, leg_curl: 15, legRaise: 16, leg_raise: 16, lunge: 17, olympicLift: 18, olympic_lift: 18, plank: 19, plyo: 20, pullUp: 21, pull_up: 21, pushUp: 22, push_up: 22, row: 23, shoulderPress: 24, shoulder_press: 24, shoulderStability: 25, shoulder_stability: 25, shrug: 26, sitUp: 27, sit_up: 27, squat: 28, totalBody: 29, total_body: 29, tricepsExtension: 30, triceps_extension: 30, warmUp: 31, warm_up: 31, run: 32, unknown: 65534, _min: 0, _max: 65534 }, bench_press_exercise_name: { alternatingDumbbellChestPressOnSwissBall: 0, alternating_dumbbell_chest_press_on_swiss_ball: 0, barbellBenchPress: 1, barbell_bench_press: 1, barbellBoardBenchPress: 2, barbell_board_bench_press: 2, barbellFloorPress: 3, barbell_floor_press: 3, closeGripBarbellBenchPress: 4, close_grip_barbell_bench_press: 4, declineDumbbellBenchPress: 5, decline_dumbbell_bench_press: 5, dumbbellBenchPress: 6, dumbbell_bench_press: 6, dumbbellFloorPress: 7, dumbbell_floor_press: 7, inclineBarbellBenchPress: 8, incline_barbell_bench_press: 8, inclineDumbbellBenchPress: 9, incline_dumbbell_bench_press: 9, inclineSmithMachineBenchPress: 10, incline_smith_machine_bench_press: 10, isometricBarbellBenchPress: 11, isometric_barbell_bench_press: 11, kettlebellChestPress: 12, kettlebell_chest_press: 12, neutralGripDumbbellBenchPress: 13, neutral_grip_dumbbell_bench_press: 13, neutralGripDumbbellInclineBenchPress: 14, neutral_grip_dumbbell_incline_bench_press: 14, oneArmFloorPress: 15, one_arm_floor_press: 15, weightedOneArmFloorPress: 16, weighted_one_arm_floor_press: 16, partialLockout: 17, partial_lockout: 17, reverseGripBarbellBenchPress: 18, reverse_grip_barbell_bench_press: 18, reverseGripInclineBenchPress: 19, reverse_grip_incline_bench_press: 19, singleArmCableChestPress: 20, single_arm_cable_chest_press: 20, singleArmDumbbellBenchPress: 21, single_arm_dumbbell_bench_press: 21, smithMachineBenchPress: 22, smith_machine_bench_press: 22, swissBallDumbbellChestPress: 23, swiss_ball_dumbbell_chest_press: 23, tripleStopBarbellBenchPress: 24, triple_stop_barbell_bench_press: 24, wideGripBarbellBenchPress: 25, wide_grip_barbell_bench_press: 25, alternatingDumbbellChestPress: 26, alternating_dumbbell_chest_press: 26, _min: 0, _max: 26 }, calf_raise_exercise_name: { "3WayCalfRaise": 0, "3WayWeightedCalfRaise": 1, "3WaySingleLegCalfRaise": 2, "3WayWeightedSingleLegCalfRaise": 3, donkeyCalfRaise: 4, donkey_calf_raise: 4, weightedDonkeyCalfRaise: 5, weighted_donkey_calf_raise: 5, seatedCalfRaise: 6, seated_calf_raise: 6, weightedSeatedCalfRaise: 7, weighted_seated_calf_raise: 7, seatedDumbbellToeRaise: 8, seated_dumbbell_toe_raise: 8, singleLegBentKneeCalfRaise: 9, single_leg_bent_knee_calf_raise: 9, weightedSingleLegBentKneeCalfRaise: 10, weighted_single_leg_bent_knee_calf_raise: 10, singleLegDeclinePushUp: 11, single_leg_decline_push_up: 11, singleLegDonkeyCalfRaise: 12, single_leg_donkey_calf_raise: 12, weightedSingleLegDonkeyCalfRaise: 13, weighted_single_leg_donkey_calf_raise: 13, singleLegHipRaiseWithKneeHold: 14, single_leg_hip_raise_with_knee_hold: 14, singleLegStandingCalfRaise: 15, single_leg_standing_calf_raise: 15, singleLegStandingDumbbellCalfRaise: 16, single_leg_standing_dumbbell_calf_raise: 16, standingBarbellCalfRaise: 17, standing_barbell_calf_raise: 17, standingCalfRaise: 18, standing_calf_raise: 18, weightedStandingCalfRaise: 19, weighted_standing_calf_raise: 19, standingDumbbellCalfRaise: 20, standing_dumbbell_calf_raise: 20, _min: 0, _max: 20 }, cardio_exercise_name: { bobAndWeaveCircle: 0, bob_and_weave_circle: 0, weightedBobAndWeaveCircle: 1, weighted_bob_and_weave_circle: 1, cardioCoreCrawl: 2, cardio_core_crawl: 2, weightedCardioCoreCrawl: 3, weighted_cardio_core_crawl: 3, doubleUnder: 4, double_under: 4, weightedDoubleUnder: 5, weighted_double_under: 5, jumpRope: 6, jump_rope: 6, weightedJumpRope: 7, weighted_jump_rope: 7, jumpRopeCrossover: 8, jump_rope_crossover: 8, weightedJumpRopeCrossover: 9, weighted_jump_rope_crossover: 9, jumpRopeJog: 10, jump_rope_jog: 10, weightedJumpRopeJog: 11, weighted_jump_rope_jog: 11, jumpingJacks: 12, jumping_jacks: 12, weightedJumpingJacks: 13, weighted_jumping_jacks: 13, skiMoguls: 14, ski_moguls: 14, weightedSkiMoguls: 15, weighted_ski_moguls: 15, splitJacks: 16, split_jacks: 16, weightedSplitJacks: 17, weighted_split_jacks: 17, squatJacks: 18, squat_jacks: 18, weightedSquatJacks: 19, weighted_squat_jacks: 19, tripleUnder: 20, triple_under: 20, weightedTripleUnder: 21, weighted_triple_under: 21, _min: 0, _max: 21 }, carry_exercise_name: { barHolds: 0, bar_holds: 0, farmersWalk: 1, farmers_walk: 1, farmersWalkOnToes: 2, farmers_walk_on_toes: 2, hexDumbbellHold: 3, hex_dumbbell_hold: 3, overheadCarry: 4, overhead_carry: 4, _min: 0, _max: 4 }, chop_exercise_name: { cablePullThrough: 0, cable_pull_through: 0, cableRotationalLift: 1, cable_rotational_lift: 1, cableWoodchop: 2, cable_woodchop: 2, crossChopToKnee: 3, cross_chop_to_knee: 3, weightedCrossChopToKnee: 4, weighted_cross_chop_to_knee: 4, dumbbellChop: 5, dumbbell_chop: 5, halfKneelingRotation: 6, half_kneeling_rotation: 6, weightedHalfKneelingRotation: 7, weighted_half_kneeling_rotation: 7, halfKneelingRotationalChop: 8, half_kneeling_rotational_chop: 8, halfKneelingRotationalReverseChop: 9, half_kneeling_rotational_reverse_chop: 9, halfKneelingStabilityChop: 10, half_kneeling_stability_chop: 10, halfKneelingStabilityReverseChop: 11, half_kneeling_stability_reverse_chop: 11, kneelingRotationalChop: 12, kneeling_rotational_chop: 12, kneelingRotationalReverseChop: 13, kneeling_rotational_reverse_chop: 13, kneelingStabilityChop: 14, kneeling_stability_chop: 14, kneelingWoodchopper: 15, kneeling_woodchopper: 15, medicineBallWoodChops: 16, medicine_ball_wood_chops: 16, powerSquatChops: 17, power_squat_chops: 17, weightedPowerSquatChops: 18, weighted_power_squat_chops: 18, standingRotationalChop: 19, standing_rotational_chop: 19, standingSplitRotationalChop: 20, standing_split_rotational_chop: 20, standingSplitRotationalReverseChop: 21, standing_split_rotational_reverse_chop: 21, standingStabilityReverseChop: 22, standing_stability_reverse_chop: 22, _min: 0, _max: 22 }, core_exercise_name: { absJabs: 0, abs_jabs: 0, weightedAbsJabs: 1, weighted_abs_jabs: 1, alternatingPlateReach: 2, alternating_plate_reach: 2, barbellRollout: 3, barbell_rollout: 3, weightedBarbellRollout: 4, weighted_barbell_rollout: 4, bodyBarObliqueTwist: 5, body_bar_oblique_twist: 5, cableCorePress: 6, cable_core_press: 6, cableSideBend: 7, cable_side_bend: 7, sideBend: 8, side_bend: 8, weightedSideBend: 9, weighted_side_bend: 9, crescentCircle: 10, crescent_circle: 10, weightedCrescentCircle: 11, weighted_crescent_circle: 11, cyclingRussianTwist: 12, cycling_russian_twist: 12, weightedCyclingRussianTwist: 13, weighted_cycling_russian_twist: 13, elevatedFeetRussianTwist: 14, elevated_feet_russian_twist: 14, weightedElevatedFeetRussianTwist: 15, weighted_elevated_feet_russian_twist: 15, halfTurkishGetUp: 16, half_turkish_get_up: 16, kettlebellWindmill: 17, kettlebell_windmill: 17, kneelingAbWheel: 18, kneeling_ab_wheel: 18, weightedKneelingAbWheel: 19, weighted_kneeling_ab_wheel: 19, modifiedFrontLever: 20, modified_front_lever: 20, openKneeTucks: 21, open_knee_tucks: 21, weightedOpenKneeTucks: 22, weighted_open_knee_tucks: 22, sideAbsLegLift: 23, side_abs_leg_lift: 23, weightedSideAbsLegLift: 24, weighted_side_abs_leg_lift: 24, swissBallJackknife: 25, swiss_ball_jackknife: 25, weightedSwissBallJackknife: 26, weighted_swiss_ball_jackknife: 26, swissBallPike: 27, swiss_ball_pike: 27, weightedSwissBallPike: 28, weighted_swiss_ball_pike: 28, swissBallRollout: 29, swiss_ball_rollout: 29, weightedSwissBallRollout: 30, weighted_swiss_ball_rollout: 30, triangleHipPress: 31, triangle_hip_press: 31, weightedTriangleHipPress: 32, weighted_triangle_hip_press: 32, trxSuspendedJackknife: 33, trx_suspended_jackknife: 33, weightedTrxSuspendedJackknife: 34, weighted_trx_suspended_jackknife: 34, uBoat: 35, u_boat: 35, weightedUBoat: 36, weighted_u_boat: 36, windmillSwitches: 37, windmill_switches: 37, weightedWindmillSwitches: 38, weighted_windmill_switches: 38, alternatingSlideOut: 39, alternating_slide_out: 39, weightedAlternatingSlideOut: 40, weighted_alternating_slide_out: 40, ghdBackExtensions: 41, ghd_back_extensions: 41, weightedGhdBackExtensions: 42, weighted_ghd_back_extensions: 42, overheadWalk: 43, overhead_walk: 43, inchworm: 44, weightedModifiedFrontLever: 45, weighted_modified_front_lever: 45, russianTwist: 46, russian_twist: 46, abdominalLegRotations: 47, abdominal_leg_rotations: 47, armAndLegExtensionOnKnees: 48, arm_and_leg_extension_on_knees: 48, bicycle: 49, bicepCurlWithLegExtension: 50, bicep_curl_with_leg_extension: 50, catCow: 51, cat_cow: 51, corkscrew: 52, crissCross: 53, criss_cross: 53, crissCrossWithBall: 54, criss_cross_with_ball: 54, doubleLegStretch: 55, double_leg_stretch: 55, kneeFolds: 56, knee_folds: 56, lowerLift: 57, lower_lift: 57, neckPull: 58, neck_pull: 58, pelvicClocks: 59, pelvic_clocks: 59, rollOver: 60, roll_over: 60, rollUp: 61, roll_up: 61, rolling: 62, rowing1: 63, rowing2: 64, scissors: 65, singleLegCircles: 66, single_leg_circles: 66, singleLegStretch: 67, single_leg_stretch: 67, snakeTwist1And2: 68, swan: 69, swimming: 70, teaser: 71, theHundred: 72, the_hundred: 72, _min: 0, _max: 72 }, crunch_exercise_name: { bicycleCrunch: 0, bicycle_crunch: 0, cableCrunch: 1, cable_crunch: 1, circularArmCrunch: 2, circular_arm_crunch: 2, crossedArmsCrunch: 3, crossed_arms_crunch: 3, weightedCrossedArmsCrunch: 4, weighted_crossed_arms_crunch: 4, crossLegReverseCrunch: 5, cross_leg_reverse_crunch: 5, weightedCrossLegReverseCrunch: 6, weighted_cross_leg_reverse_crunch: 6, crunchChop: 7, crunch_chop: 7, weightedCrunchChop: 8, weighted_crunch_chop: 8, doubleCrunch: 9, double_crunch: 9, weightedDoubleCrunch: 10, weighted_double_crunch: 10, elbowToKneeCrunch: 11, elbow_to_knee_crunch: 11, weightedElbowToKneeCrunch: 12, weighted_elbow_to_knee_crunch: 12, flutterKicks: 13, flutter_kicks: 13, weightedFlutterKicks: 14, weighted_flutter_kicks: 14, foamRollerReverseCrunchOnBench: 15, foam_roller_reverse_crunch_on_bench: 15, weightedFoamRollerReverseCrunchOnBench: 16, weighted_foam_roller_reverse_crunch_on_bench: 16, foamRollerReverseCrunchWithDumbbell: 17, foam_roller_reverse_crunch_with_dumbbell: 17, foamRollerReverseCrunchWithMedicineBall: 18, foam_roller_reverse_crunch_with_medicine_ball: 18, frogPress: 19, frog_press: 19, hangingKneeRaiseObliqueCrunch: 20, hanging_knee_raise_oblique_crunch: 20, weightedHangingKneeRaiseObliqueCrunch: 21, weighted_hanging_knee_raise_oblique_crunch: 21, hipCrossover: 22, hip_crossover: 22, weightedHipCrossover: 23, weighted_hip_crossover: 23, hollowRock: 24, hollow_rock: 24, weightedHollowRock: 25, weighted_hollow_rock: 25, inclineReverseCrunch: 26, incline_reverse_crunch: 26, weightedInclineReverseCrunch: 27, weighted_incline_reverse_crunch: 27, kneelingCableCrunch: 28, kneeling_cable_crunch: 28, kneelingCrossCrunch: 29, kneeling_cross_crunch: 29, weightedKneelingCrossCrunch: 30, weighted_kneeling_cross_crunch: 30, kneelingObliqueCableCrunch: 31, kneeling_oblique_cable_crunch: 31, kneesToElbow: 32, knees_to_elbow: 32, legExtensions: 33, leg_extensions: 33, weightedLegExtensions: 34, weighted_leg_extensions: 34, legLevers: 35, leg_levers: 35, mcgillCurlUp: 36, mcgill_curl_up: 36, weightedMcgillCurlUp: 37, weighted_mcgill_curl_up: 37, modifiedPilatesRollUpWithBall: 38, modified_pilates_roll_up_with_ball: 38, weightedModifiedPilatesRollUpWithBall: 39, weighted_modified_pilates_roll_up_with_ball: 39, pilatesCrunch: 40, pilates_crunch: 40, weightedPilatesCrunch: 41, weighted_pilates_crunch: 41, pilatesRollUpWithBall: 42, pilates_roll_up_with_ball: 42, weightedPilatesRollUpWithBall: 43, weighted_pilates_roll_up_with_ball: 43, raisedLegsCrunch: 44, raised_legs_crunch: 44, weightedRaisedLegsCrunch: 45, weighted_raised_legs_crunch: 45, reverseCrunch: 46, reverse_crunch: 46, weightedReverseCrunch: 47, weighted_reverse_crunch: 47, reverseCrunchOnABench: 48, reverse_crunch_on_a_bench: 48, weightedReverseCrunchOnABench: 49, weighted_reverse_crunch_on_a_bench: 49, reverseCurlAndLift: 50, reverse_curl_and_lift: 50, weightedReverseCurlAndLift: 51, weighted_reverse_curl_and_lift: 51, rotationalLift: 52, rotational_lift: 52, weightedRotationalLift: 53, weighted_rotational_lift: 53, seatedAlternatingReverseCrunch: 54, seated_alternating_reverse_crunch: 54, weightedSeatedAlternatingReverseCrunch: 55, weighted_seated_alternating_reverse_crunch: 55, seatedLegU: 56, seated_leg_u: 56, weightedSeatedLegU: 57, weighted_seated_leg_u: 57, sideToSideCrunchAndWeave: 58, side_to_side_crunch_and_weave: 58, weightedSideToSideCrunchAndWeave: 59, weighted_side_to_side_crunch_and_weave: 59, singleLegReverseCrunch: 60, single_leg_reverse_crunch: 60, weightedSingleLegReverseCrunch: 61, weighted_single_leg_reverse_crunch: 61, skaterCrunchCross: 62, skater_crunch_cross: 62, weightedSkaterCrunchCross: 63, weighted_skater_crunch_cross: 63, standingCableCrunch: 64, standing_cable_crunch: 64, standingSideCrunch: 65, standing_side_crunch: 65, stepClimb: 66, step_climb: 66, weightedStepClimb: 67, weighted_step_climb: 67, swissBallCrunch: 68, swiss_ball_crunch: 68, swissBallReverseCrunch: 69, swiss_ball_reverse_crunch: 69, weightedSwissBallReverseCrunch: 70, weighted_swiss_ball_reverse_crunch: 70, swissBallRussianTwist: 71, swiss_ball_russian_twist: 71, weightedSwissBallRussianTwist: 72, weighted_swiss_ball_russian_twist: 72, swissBallSideCrunch: 73, swiss_ball_side_crunch: 73, weightedSwissBallSideCrunch: 74, weighted_swiss_ball_side_crunch: 74, thoracicCrunchesOnFoamRoller: 75, thoracic_crunches_on_foam_roller: 75, weightedThoracicCrunchesOnFoamRoller: 76, weighted_thoracic_crunches_on_foam_roller: 76, tricepsCrunch: 77, triceps_crunch: 77, weightedBicycleCrunch: 78, weighted_bicycle_crunch: 78, weightedCrunch: 79, weighted_crunch: 79, weightedSwissBallCrunch: 80, weighted_swiss_ball_crunch: 80, toesToBar: 81, toes_to_bar: 81, weightedToesToBar: 82, weighted_toes_to_bar: 82, crunch: 83, straightLegCrunchWithBall: 84, straight_leg_crunch_with_ball: 84, _min: 0, _max: 84 }, curl_exercise_name: { alternatingDumbbellBicepsCurl: 0, alternating_dumbbell_biceps_curl: 0, alternatingDumbbellBicepsCurlOnSwissBall: 1, alternating_dumbbell_biceps_curl_on_swiss_ball: 1, alternatingInclineDumbbellBicepsCurl: 2, alternating_incline_dumbbell_biceps_curl: 2, barbellBicepsCurl: 3, barbell_biceps_curl: 3, barbellReverseWristCurl: 4, barbell_reverse_wrist_curl: 4, barbellWristCurl: 5, barbell_wrist_curl: 5, behindTheBackBarbellReverseWristCurl: 6, behind_the_back_barbell_reverse_wrist_curl: 6, behindTheBackOneArmCableCurl: 7, behind_the_back_one_arm_cable_curl: 7, cableBicepsCurl: 8, cable_biceps_curl: 8, cableHammerCurl: 9, cable_hammer_curl: 9, cheatingBarbellBicepsCurl: 10, cheating_barbell_biceps_curl: 10, closeGripEzBarBicepsCurl: 11, close_grip_ez_bar_biceps_curl: 11, crossBodyDumbbellHammerCurl: 12, cross_body_dumbbell_hammer_curl: 12, deadHangBicepsCurl: 13, dead_hang_biceps_curl: 13, declineHammerCurl: 14, decline_hammer_curl: 14, dumbbellBicepsCurlWithStaticHold: 15, dumbbell_biceps_curl_with_static_hold: 15, dumbbellHammerCurl: 16, dumbbell_hammer_curl: 16, dumbbellReverseWristCurl: 17, dumbbell_reverse_wrist_curl: 17, dumbbellWristCurl: 18, dumbbell_wrist_curl: 18, ezBarPreacherCurl: 19, ez_bar_preacher_curl: 19, forwardBendBicepsCurl: 20, forward_bend_biceps_curl: 20, hammerCurlToPress: 21, hammer_curl_to_press: 21, inclineDumbbellBicepsCurl: 22, incline_dumbbell_biceps_curl: 22, inclineOffsetThumbDumbbellCurl: 23, incline_offset_thumb_dumbbell_curl: 23, kettlebellBicepsCurl: 24, kettlebell_biceps_curl: 24, lyingConcentrationCableCurl: 25, lying_concentration_cable_curl: 25, oneArmPreacherCurl: 26, one_arm_preacher_curl: 26, platePinchCurl: 27, plate_pinch_curl: 27, preacherCurlWithCable: 28, preacher_curl_with_cable: 28, reverseEzBarCurl: 29, reverse_ez_bar_curl: 29, reverseGripWristCurl: 30, reverse_grip_wrist_curl: 30, reverseGripBarbellBicepsCurl: 31, reverse_grip_barbell_biceps_curl: 31, seatedAlternatingDumbbellBicepsCurl: 32, seated_alternating_dumbbell_biceps_curl: 32, seatedDumbbellBicepsCurl: 33, seated_dumbbell_biceps_curl: 33, seatedReverseDumbbellCurl: 34, seated_reverse_dumbbell_curl: 34, splitStanceOffsetPinkyDumbbellCurl: 35, split_stance_offset_pinky_dumbbell_curl: 35, standingAlternatingDumbbellCurls: 36, standing_alternating_dumbbell_curls: 36, standingDumbbellBicepsCurl: 37, standing_dumbbell_biceps_curl: 37, standingEzBarBicepsCurl: 38, standing_ez_bar_biceps_curl: 38, staticCurl: 39, static_curl: 39, swissBallDumbbellOverheadTricepsExtension: 40, swiss_ball_dumbbell_overhead_triceps_extension: 40, swissBallEzBarPreacherCurl: 41, swiss_ball_ez_bar_preacher_curl: 41, twistingStandingDumbbellBicepsCurl: 42, twisting_standing_dumbbell_biceps_curl: 42, wideGripEzBarBicepsCurl: 43, wide_grip_ez_bar_biceps_curl: 43, _min: 0, _max: 43 }, deadlift_exercise_name: { barbellDeadlift: 0, barbell_deadlift: 0, barbellStraightLegDeadlift: 1, barbell_straight_leg_deadlift: 1, dumbbellDeadlift: 2, dumbbell_deadlift: 2, dumbbellSingleLegDeadliftToRow: 3, dumbbell_single_leg_deadlift_to_row: 3, dumbbellStraightLegDeadlift: 4, dumbbell_straight_leg_deadlift: 4, kettlebellFloorToShelf: 5, kettlebell_floor_to_shelf: 5, oneArmOneLegDeadlift: 6, one_arm_one_leg_deadlift: 6, rackPull: 7, rack_pull: 7, rotationalDumbbellStraightLegDeadlift: 8, rotational_dumbbell_straight_leg_deadlift: 8, singleArmDeadlift: 9, single_arm_deadlift: 9, singleLegBarbellDeadlift: 10, single_leg_barbell_deadlift: 10, singleLegBarbellStraightLegDeadlift: 11, single_leg_barbell_straight_leg_deadlift: 11, singleLegDeadliftWithBarbell: 12, single_leg_deadlift_with_barbell: 12, singleLegRdlCircuit: 13, single_leg_rdl_circuit: 13, singleLegRomanianDeadliftWithDumbbell: 14, single_leg_romanian_deadlift_with_dumbbell: 14, sumoDeadlift: 15, sumo_deadlift: 15, sumoDeadliftHighPull: 16, sumo_deadlift_high_pull: 16, trapBarDeadlift: 17, trap_bar_deadlift: 17, wideGripBarbellDeadlift: 18, wide_grip_barbell_deadlift: 18, _min: 0, _max: 18 }, flye_exercise_name: { cableCrossover: 0, cable_crossover: 0, declineDumbbellFlye: 1, decline_dumbbell_flye: 1, dumbbellFlye: 2, dumbbell_flye: 2, inclineDumbbellFlye: 3, incline_dumbbell_flye: 3, kettlebellFlye: 4, kettlebell_flye: 4, kneelingRearFlye: 5, kneeling_rear_flye: 5, singleArmStandingCableReverseFlye: 6, single_arm_standing_cable_reverse_flye: 6, swissBallDumbbellFlye: 7, swiss_ball_dumbbell_flye: 7, armRotations: 8, arm_rotations: 8, hugATree: 9, hug_a_tree: 9, _min: 0, _max: 9 }, hip_raise_exercise_name: { barbellHipThrustOnFloor: 0, barbell_hip_thrust_on_floor: 0, barbellHipThrustWithBench: 1, barbell_hip_thrust_with_bench: 1, bentKneeSwissBallReverseHipRaise: 2, bent_knee_swiss_ball_reverse_hip_raise: 2, weightedBentKneeSwissBallReverseHipRaise: 3, weighted_bent_knee_swiss_ball_reverse_hip_raise: 3, bridgeWithLegExtension: 4, bridge_with_leg_extension: 4, weightedBridgeWithLegExtension: 5, weighted_bridge_with_leg_extension: 5, clamBridge: 6, clam_bridge: 6, frontKickTabletop: 7, front_kick_tabletop: 7, weightedFrontKickTabletop: 8, weighted_front_kick_tabletop: 8, hipExtensionAndCross: 9, hip_extension_and_cross: 9, weightedHipExtensionAndCross: 10, weighted_hip_extension_and_cross: 10, hipRaise: 11, hip_raise: 11, weightedHipRaise: 12, weighted_hip_raise: 12, hipRaiseWithFeetOnSwissBall: 13, hip_raise_with_feet_on_swiss_ball: 13, weightedHipRaiseWithFeetOnSwissBall: 14, weighted_hip_raise_with_feet_on_swiss_ball: 14, hipRaiseWithHeadOnBosuBall: 15, hip_raise_with_head_on_bosu_ball: 15, weightedHipRaiseWithHeadOnBosuBall: 16, weighted_hip_raise_with_head_on_bosu_ball: 16, hipRaiseWithHeadOnSwissBall: 17, hip_raise_with_head_on_swiss_ball: 17, weightedHipRaiseWithHeadOnSwissBall: 18, weighted_hip_raise_with_head_on_swiss_ball: 18, hipRaiseWithKneeSqueeze: 19, hip_raise_with_knee_squeeze: 19, weightedHipRaiseWithKneeSqueeze: 20, weighted_hip_raise_with_knee_squeeze: 20, inclineRearLegExtension: 21, incline_rear_leg_extension: 21, weightedInclineRearLegExtension: 22, weighted_incline_rear_leg_extension: 22, kettlebellSwing: 23, kettlebell_swing: 23, marchingHipRaise: 24, marching_hip_raise: 24, weightedMarchingHipRaise: 25, weighted_marching_hip_raise: 25, marchingHipRaiseWithFeetOnASwissBall: 26, marching_hip_raise_with_feet_on_a_swiss_ball: 26, weightedMarchingHipRaiseWithFeetOnASwissBall: 27, weighted_marching_hip_raise_with_feet_on_a_swiss_ball: 27, reverseHipRaise: 28, reverse_hip_raise: 28, weightedReverseHipRaise: 29, weighted_reverse_hip_raise: 29, singleLegHipRaise: 30, single_leg_hip_raise: 30, weightedSingleLegHipRaise: 31, weighted_single_leg_hip_raise: 31, singleLegHipRaiseWithFootOnBench: 32, single_leg_hip_raise_with_foot_on_bench: 32, weightedSingleLegHipRaiseWithFootOnBench: 33, weighted_single_leg_hip_raise_with_foot_on_bench: 33, singleLegHipRaiseWithFootOnBosuBall: 34, single_leg_hip_raise_with_foot_on_bosu_ball: 34, weightedSingleLegHipRaiseWithFootOnBosuBall: 35, weighted_single_leg_hip_raise_with_foot_on_bosu_ball: 35, singleLegHipRaiseWithFootOnFoamRoller: 36, single_leg_hip_raise_with_foot_on_foam_roller: 36, weightedSingleLegHipRaiseWithFootOnFoamRoller: 37, weighted_single_leg_hip_raise_with_foot_on_foam_roller: 37, singleLegHipRaiseWithFootOnMedicineBall: 38, single_leg_hip_raise_with_foot_on_medicine_ball: 38, weightedSingleLegHipRaiseWithFootOnMedicineBall: 39, weighted_single_leg_hip_raise_with_foot_on_medicine_ball: 39, singleLegHipRaiseWithHeadOnBosuBall: 40, single_leg_hip_raise_with_head_on_bosu_ball: 40, weightedSingleLegHipRaiseWithHeadOnBosuBall: 41, weighted_single_leg_hip_raise_with_head_on_bosu_ball: 41, weightedClamBridge: 42, weighted_clam_bridge: 42, singleLegSwissBallHipRaiseAndLegCurl: 43, single_leg_swiss_ball_hip_raise_and_leg_curl: 43, clams: 44, innerThighCircles: 45, inner_thigh_circles: 45, innerThighSideLift: 46, inner_thigh_side_lift: 46, legCircles: 47, leg_circles: 47, legLift: 48, leg_lift: 48, legLiftInExternalRotation: 49, leg_lift_in_external_rotation: 49, _min: 0, _max: 49 }, hip_stability_exercise_name: { bandSideLyingLegRaise: 0, band_side_lying_leg_raise: 0, deadBug: 1, dead_bug: 1, weightedDeadBug: 2, weighted_dead_bug: 2, externalHipRaise: 3, external_hip_raise: 3, weightedExternalHipRaise: 4, weighted_external_hip_raise: 4, fireHydrantKicks: 5, fire_hydrant_kicks: 5, weightedFireHydrantKicks: 6, weighted_fire_hydrant_kicks: 6, hipCircles: 7, hip_circles: 7, weightedHipCircles: 8, weighted_hip_circles: 8, innerThighLift: 9, inner_thigh_lift: 9, weightedInnerThighLift: 10, weighted_inner_thigh_lift: 10, lateralWalksWithBandAtAnkles: 11, lateral_walks_with_band_at_ankles: 11, pretzelSideKick: 12, pretzel_side_kick: 12, weightedPretzelSideKick: 13, weighted_pretzel_side_kick: 13, proneHipInternalRotation: 14, prone_hip_internal_rotation: 14, weightedProneHipInternalRotation: 15, weighted_prone_hip_internal_rotation: 15, quadruped: 16, quadrupedHipExtension: 17, quadruped_hip_extension: 17, weightedQuadrupedHipExtension: 18, weighted_quadruped_hip_extension: 18, quadrupedWithLegLift: 19, quadruped_with_leg_lift: 19, weightedQuadrupedWithLegLift: 20, weighted_quadruped_with_leg_lift: 20, sideLyingLegRaise: 21, side_lying_leg_raise: 21, weightedSideLyingLegRaise: 22, weighted_side_lying_leg_raise: 22, slidingHipAdduction: 23, sliding_hip_adduction: 23, weightedSlidingHipAdduction: 24, weighted_sliding_hip_adduction: 24, standingAdduction: 25, standing_adduction: 25, weightedStandingAdduction: 26, weighted_standing_adduction: 26, standingCableHipAbduction: 27, standing_cable_hip_abduction: 27, standingHipAbduction: 28, standing_hip_abduction: 28, weightedStandingHipAbduction: 29, weighted_standing_hip_abduction: 29, standingRearLegRaise: 30, standing_rear_leg_raise: 30, weightedStandingRearLegRaise: 31, weighted_standing_rear_leg_raise: 31, supineHipInternalRotation: 32, supine_hip_internal_rotation: 32, weightedSupineHipInternalRotation: 33, weighted_supine_hip_internal_rotation: 33, _min: 0, _max: 33 }, hip_swing_exercise_name: { singleArmKettlebellSwing: 0, single_arm_kettlebell_swing: 0, singleArmDumbbellSwing: 1, single_arm_dumbbell_swing: 1, stepOutSwing: 2, step_out_swing: 2, _min: 0, _max: 2 }, hyperextension_exercise_name: { backExtensionWithOppositeArmAndLegReach: 0, back_extension_with_opposite_arm_and_leg_reach: 0, weightedBackExtensionWithOppositeArmAndLegReach: 1, weighted_back_extension_with_opposite_arm_and_leg_reach: 1, baseRotations: 2, base_rotations: 2, weightedBaseRotations: 3, weighted_base_rotations: 3, bentKneeReverseHyperextension: 4, bent_knee_reverse_hyperextension: 4, weightedBentKneeReverseHyperextension: 5, weighted_bent_knee_reverse_hyperextension: 5, hollowHoldAndRoll: 6, hollow_hold_and_roll: 6, weightedHollowHoldAndRoll: 7, weighted_hollow_hold_and_roll: 7, kicks: 8, weightedKicks: 9, weighted_kicks: 9, kneeRaises: 10, knee_raises: 10, weightedKneeRaises: 11, weighted_knee_raises: 11, kneelingSuperman: 12, kneeling_superman: 12, weightedKneelingSuperman: 13, weighted_kneeling_superman: 13, latPullDownWithRow: 14, lat_pull_down_with_row: 14, medicineBallDeadliftToReach: 15, medicine_ball_deadlift_to_reach: 15, oneArmOneLegRow: 16, one_arm_one_leg_row: 16, oneArmRowWithBand: 17, one_arm_row_with_band: 17, overheadLungeWithMedicineBall: 18, overhead_lunge_with_medicine_ball: 18, plankKneeTucks: 19, plank_knee_tucks: 19, weightedPlankKneeTucks: 20, weighted_plank_knee_tucks: 20, sideStep: 21, side_step: 21, weightedSideStep: 22, weighted_side_step: 22, singleLegBackExtension: 23, single_leg_back_extension: 23, weightedSingleLegBackExtension: 24, weighted_single_leg_back_extension: 24, spineExtension: 25, spine_extension: 25, weightedSpineExtension: 26, weighted_spine_extension: 26, staticBackExtension: 27, static_back_extension: 27, weightedStaticBackExtension: 28, weighted_static_back_extension: 28, supermanFromFloor: 29, superman_from_floor: 29, weightedSupermanFromFloor: 30, weighted_superman_from_floor: 30, swissBallBackExtension: 31, swiss_ball_back_extension: 31, weightedSwissBallBackExtension: 32, weighted_swiss_ball_back_extension: 32, swissBallHyperextension: 33, swiss_ball_hyperextension: 33, weightedSwissBallHyperextension: 34, weighted_swiss_ball_hyperextension: 34, swissBallOppositeArmAndLegLift: 35, swiss_ball_opposite_arm_and_leg_lift: 35, weightedSwissBallOppositeArmAndLegLift: 36, weighted_swiss_ball_opposite_arm_and_leg_lift: 36, supermanOnSwissBall: 37, superman_on_swiss_ball: 37, cobra: 38, supineFloorBarre: 39, supine_floor_barre: 39, _min: 0, _max: 39 }, lateral_raise_exercise_name: { "45DegreeCableExternalRotation": 0, alternatingLateralRaiseWithStaticHold: 1, alternating_lateral_raise_with_static_hold: 1, barMuscleUp: 2, bar_muscle_up: 2, bentOverLateralRaise: 3, bent_over_lateral_raise: 3, cableDiagonalRaise: 4, cable_diagonal_raise: 4, cableFrontRaise: 5, cable_front_raise: 5, calorieRow: 6, calorie_row: 6, comboShoulderRaise: 7, combo_shoulder_raise: 7, dumbbellDiagonalRaise: 8, dumbbell_diagonal_raise: 8, dumbbellVRaise: 9, dumbbell_v_raise: 9, frontRaise: 10, front_raise: 10, leaningDumbbellLateralRaise: 11, leaning_dumbbell_lateral_raise: 11, lyingDumbbellRaise: 12, lying_dumbbell_raise: 12, muscleUp: 13, muscle_up: 13, oneArmCableLateralRaise: 14, one_arm_cable_lateral_raise: 14, overhandGripRearLateralRaise: 15, overhand_grip_rear_lateral_raise: 15, plateRaises: 16, plate_raises: 16, ringDip: 17, ring_dip: 17, weightedRingDip: 18, weighted_ring_dip: 18, ringMuscleUp: 19, ring_muscle_up: 19, weightedRingMuscleUp: 20, weighted_ring_muscle_up: 20, ropeClimb: 21, rope_climb: 21, weightedRopeClimb: 22, weighted_rope_climb: 22, scaption: 23, seatedLateralRaise: 24, seated_lateral_raise: 24, seatedRearLateralRaise: 25, seated_rear_lateral_raise: 25, sideLyingLateralRaise: 26, side_lying_lateral_raise: 26, standingLift: 27, standing_lift: 27, suspendedRow: 28, suspended_row: 28, underhandGripRearLateralRaise: 29, underhand_grip_rear_lateral_raise: 29, wallSlide: 30, wall_slide: 30, weightedWallSlide: 31, weighted_wall_slide: 31, armCircles: 32, arm_circles: 32, shavingTheHead: 33, shaving_the_head: 33, _min: 0, _max: 33 }, leg_curl_exercise_name: { legCurl: 0, leg_curl: 0, weightedLegCurl: 1, weighted_leg_curl: 1, goodMorning: 2, good_morning: 2, seatedBarbellGoodMorning: 3, seated_barbell_good_morning: 3, singleLegBarbellGoodMorning: 4, single_leg_barbell_good_morning: 4, singleLegSlidingLegCurl: 5, single_leg_sliding_leg_curl: 5, slidingLegCurl: 6, sliding_leg_curl: 6, splitBarbellGoodMorning: 7, split_barbell_good_morning: 7, splitStanceExtension: 8, split_stance_extension: 8, staggeredStanceGoodMorning: 9, staggered_stance_good_morning: 9, swissBallHipRaiseAndLegCurl: 10, swiss_ball_hip_raise_and_leg_curl: 10, zercherGoodMorning: 11, zercher_good_morning: 11, _min: 0, _max: 11 }, leg_raise_exercise_name: { hangingKneeRaise: 0, hanging_knee_raise: 0, hangingLegRaise: 1, hanging_leg_raise: 1, weightedHangingLegRaise: 2, weighted_hanging_leg_raise: 2, hangingSingleLegRaise: 3, hanging_single_leg_raise: 3, weightedHangingSingleLegRaise: 4, weighted_hanging_single_leg_raise: 4, kettlebellLegRaises: 5, kettlebell_leg_raises: 5, legLoweringDrill: 6, leg_lowering_drill: 6, weightedLegLoweringDrill: 7, weighted_leg_lowering_drill: 7, lyingStraightLegRaise: 8, lying_straight_leg_raise: 8, weightedLyingStraightLegRaise: 9, weighted_lying_straight_leg_raise: 9, medicineBallLegDrops: 10, medicine_ball_leg_drops: 10, quadrupedLegRaise: 11, quadruped_leg_raise: 11, weightedQuadrupedLegRaise: 12, weighted_quadruped_leg_raise: 12, reverseLegRaise: 13, reverse_leg_raise: 13, weightedReverseLegRaise: 14, weighted_reverse_leg_raise: 14, reverseLegRaiseOnSwissBall: 15, reverse_leg_raise_on_swiss_ball: 15, weightedReverseLegRaiseOnSwissBall: 16, weighted_reverse_leg_raise_on_swiss_ball: 16, singleLegLoweringDrill: 17, single_leg_lowering_drill: 17, weightedSingleLegLoweringDrill: 18, weighted_single_leg_lowering_drill: 18, weightedHangingKneeRaise: 19, weighted_hanging_knee_raise: 19, lateralStepover: 20, lateral_stepover: 20, weightedLateralStepover: 21, weighted_lateral_stepover: 21, _min: 0, _max: 21 }, lunge_exercise_name: { overheadLunge: 0, overhead_lunge: 0, lungeMatrix: 1, lunge_matrix: 1, weightedLungeMatrix: 2, weighted_lunge_matrix: 2, alternatingBarbellForwardLunge: 3, alternating_barbell_forward_lunge: 3, alternatingDumbbellLungeWithReach: 4, alternating_dumbbell_lunge_with_reach: 4, backFootElevatedDumbbellSplitSquat: 5, back_foot_elevated_dumbbell_split_squat: 5, barbellBoxLunge: 6, barbell_box_lunge: 6, barbellBulgarianSplitSquat: 7, barbell_bulgarian_split_squat: 7, barbellCrossoverLunge: 8, barbell_crossover_lunge: 8, barbellFrontSplitSquat: 9, barbell_front_split_squat: 9, barbellLunge: 10, barbell_lunge: 10, barbellReverseLunge: 11, barbell_reverse_lunge: 11, barbellSideLunge: 12, barbell_side_lunge: 12, barbellSplitSquat: 13, barbell_split_squat: 13, coreControlRearLunge: 14, core_control_rear_lunge: 14, diagonalLunge: 15, diagonal_lunge: 15, dropLunge: 16, drop_lunge: 16, dumbbellBoxLunge: 17, dumbbell_box_lunge: 17, dumbbellBulgarianSplitSquat: 18, dumbbell_bulgarian_split_squat: 18, dumbbellCrossoverLunge: 19, dumbbell_crossover_lunge: 19, dumbbellDiagonalLunge: 20, dumbbell_diagonal_lunge: 20, dumbbellLunge: 21, dumbbell_lunge: 21, dumbbellLungeAndRotation: 22, dumbbell_lunge_and_rotation: 22, dumbbellOverheadBulgarianSplitSquat: 23, dumbbell_overhead_bulgarian_split_squat: 23, dumbbellReverseLungeToHighKneeAndPress: 24, dumbbell_reverse_lunge_to_high_knee_and_press: 24, dumbbellSideLunge: 25, dumbbell_side_lunge: 25, elevatedFrontFootBarbellSplitSquat: 26, elevated_front_foot_barbell_split_squat: 26, frontFootElevatedDumbbellSplitSquat: 27, front_foot_elevated_dumbbell_split_squat: 27, gunslingerLunge: 28, gunslinger_lunge: 28, lawnmowerLunge: 29, lawnmower_lunge: 29, lowLungeWithIsometricAdduction: 30, low_lunge_with_isometric_adduction: 30, lowSideToSideLunge: 31, low_side_to_side_lunge: 31, lunge: 32, weightedLunge: 33, weighted_lunge: 33, lungeWithArmReach: 34, lunge_with_arm_reach: 34, lungeWithDiagonalReach: 35, lunge_with_diagonal_reach: 35, lungeWithSideBend: 36, lunge_with_side_bend: 36, offsetDumbbellLunge: 37, offset_dumbbell_lunge: 37, offsetDumbbellReverseLunge: 38, offset_dumbbell_reverse_lunge: 38, overheadBulgarianSplitSquat: 39, overhead_bulgarian_split_squat: 39, overheadDumbbellReverseLunge: 40, overhead_dumbbell_reverse_lunge: 40, overheadDumbbellSplitSquat: 41, overhead_dumbbell_split_squat: 41, overheadLungeWithRotation: 42, overhead_lunge_with_rotation: 42, reverseBarbellBoxLunge: 43, reverse_barbell_box_lunge: 43, reverseBoxLunge: 44, reverse_box_lunge: 44, reverseDumbbellBoxLunge: 45, reverse_dumbbell_box_lunge: 45, reverseDumbbellCrossoverLunge: 46, reverse_dumbbell_crossover_lunge: 46, reverseDumbbellDiagonalLunge: 47, reverse_dumbbell_diagonal_lunge: 47, reverseLungeWithReachBack: 48, reverse_lunge_with_reach_back: 48, weightedReverseLungeWithReachBack: 49, weighted_reverse_lunge_with_reach_back: 49, reverseLungeWithTwistAndOverheadReach: 50, reverse_lunge_with_twist_and_overhead_reach: 50, weightedReverseLungeWithTwistAndOverheadReach: 51, weighted_reverse_lunge_with_twist_and_overhead_reach: 51, reverseSlidingBoxLunge: 52, reverse_sliding_box_lunge: 52, weightedReverseSlidingBoxLunge: 53, weighted_reverse_sliding_box_lunge: 53, reverseSlidingLunge: 54, reverse_sliding_lunge: 54, weightedReverseSlidingLunge: 55, weighted_reverse_sliding_lunge: 55, runnersLungeToBalance: 56, runners_lunge_to_balance: 56, weightedRunnersLungeToBalance: 57, weighted_runners_lunge_to_balance: 57, shiftingSideLunge: 58, shifting_side_lunge: 58, sideAndCrossoverLunge: 59, side_and_crossover_lunge: 59, weightedSideAndCrossoverLunge: 60, weighted_side_and_crossover_lunge: 60, sideLunge: 61, side_lunge: 61, weightedSideLunge: 62, weighted_side_lunge: 62, sideLungeAndPress: 63, side_lunge_and_press: 63, sideLungeJumpOff: 64, side_lunge_jump_off: 64, sideLungeSweep: 65, side_lunge_sweep: 65, weightedSideLungeSweep: 66, weighted_side_lunge_sweep: 66, sideLungeToCrossoverTap: 67, side_lunge_to_crossover_tap: 67, weightedSideLungeToCrossoverTap: 68, weighted_side_lunge_to_crossover_tap: 68, sideToSideLungeChops: 69, side_to_side_lunge_chops: 69, weightedSideToSideLungeChops: 70, weighted_side_to_side_lunge_chops: 70, siffJumpLunge: 71, siff_jump_lunge: 71, weightedSiffJumpLunge: 72, weighted_siff_jump_lunge: 72, singleArmReverseLungeAndPress: 73, single_arm_reverse_lunge_and_press: 73, slidingLateralLunge: 74, sliding_lateral_lunge: 74, weightedSlidingLateralLunge: 75, weighted_sliding_lateral_lunge: 75, walkingBarbellLunge: 76, walking_barbell_lunge: 76, walkingDumbbellLunge: 77, walking_dumbbell_lunge: 77, walkingLunge: 78, walking_lunge: 78, weightedWalkingLunge: 79, weighted_walking_lunge: 79, wideGripOverheadBarbellSplitSquat: 80, wide_grip_overhead_barbell_split_squat: 80, _min: 0, _max: 80 }, olympic_lift_exercise_name: { barbellHangPowerClean: 0, barbell_hang_power_clean: 0, barbellHangSquatClean: 1, barbell_hang_squat_clean: 1, barbellPowerClean: 2, barbell_power_clean: 2, barbellPowerSnatch: 3, barbell_power_snatch: 3, barbellSquatClean: 4, barbell_squat_clean: 4, cleanAndJerk: 5, clean_and_jerk: 5, barbellHangPowerSnatch: 6, barbell_hang_power_snatch: 6, barbellHangPull: 7, barbell_hang_pull: 7, barbellHighPull: 8, barbell_high_pull: 8, barbellSnatch: 9, barbell_snatch: 9, barbellSplitJerk: 10, barbell_split_jerk: 10, clean: 11, dumbbellClean: 12, dumbbell_clean: 12, dumbbellHangPull: 13, dumbbell_hang_pull: 13, oneHandDumbbellSplitSnatch: 14, one_hand_dumbbell_split_snatch: 14, pushJerk: 15, push_jerk: 15, singleArmDumbbellSnatch: 16, single_arm_dumbbell_snatch: 16, singleArmHangSnatch: 17, single_arm_hang_snatch: 17, singleArmKettlebellSnatch: 18, single_arm_kettlebell_snatch: 18, splitJerk: 19, split_jerk: 19, squatCleanAndJerk: 20, squat_clean_and_jerk: 20, _min: 0, _max: 20 }, plank_exercise_name: { "45DegreePlank": 0, weighted45DegreePlank: 1, "90DegreeStaticHold": 2, weighted90DegreeStaticHold: 3, bearCrawl: 4, bear_crawl: 4, weightedBearCrawl: 5, weighted_bear_crawl: 5, crossBodyMountainClimber: 6, cross_body_mountain_climber: 6, weightedCrossBodyMountainClimber: 7, weighted_cross_body_mountain_climber: 7, elbowPlankPikeJacks: 8, elbow_plank_pike_jacks: 8, weightedElbowPlankPikeJacks: 9, weighted_elbow_plank_pike_jacks: 9, elevatedFeetPlank: 10, elevated_feet_plank: 10, weightedElevatedFeetPlank: 11, weighted_elevated_feet_plank: 11, elevatorAbs: 12, elevator_abs: 12, weightedElevatorAbs: 13, weighted_elevator_abs: 13, extendedPlank: 14, extended_plank: 14, weightedExtendedPlank: 15, weighted_extended_plank: 15, fullPlankPasseTwist: 16, full_plank_passe_twist: 16, weightedFullPlankPasseTwist: 17, weighted_full_plank_passe_twist: 17, inchingElbowPlank: 18, inching_elbow_plank: 18, weightedInchingElbowPlank: 19, weighted_inching_elbow_plank: 19, inchwormToSidePlank: 20, inchworm_to_side_plank: 20, weightedInchwormToSidePlank: 21, weighted_inchworm_to_side_plank: 21, kneelingPlank: 22, kneeling_plank: 22, weightedKneelingPlank: 23, weighted_kneeling_plank: 23, kneelingSidePlankWithLegLift: 24, kneeling_side_plank_with_leg_lift: 24, weightedKneelingSidePlankWithLegLift: 25, weighted_kneeling_side_plank_with_leg_lift: 25, lateralRoll: 26, lateral_roll: 26, weightedLateralRoll: 27, weighted_lateral_roll: 27, lyingReversePlank: 28, lying_reverse_plank: 28, weightedLyingReversePlank: 29, weighted_lying_reverse_plank: 29, medicineBallMountainClimber: 30, medicine_ball_mountain_climber: 30, weightedMedicineBallMountainClimber: 31, weighted_medicine_ball_mountain_climber: 31, modifiedMountainClimberAndExtension: 32, modified_mountain_climber_and_extension: 32, weightedModifiedMountainClimberAndExtension: 33, weighted_modified_mountain_climber_and_extension: 33, mountainClimber: 34, mountain_climber: 34, weightedMountainClimber: 35, weighted_mountain_climber: 35, mountainClimberOnSlidingDiscs: 36, mountain_climber_on_sliding_discs: 36, weightedMountainClimberOnSlidingDiscs: 37, weighted_mountain_climber_on_sliding_discs: 37, mountainClimberWithFeetOnBosuBall: 38, mountain_climber_with_feet_on_bosu_ball: 38, weightedMountainClimberWithFeetOnBosuBall: 39, weighted_mountain_climber_with_feet_on_bosu_ball: 39, mountainClimberWithHandsOnBench: 40, mountain_climber_with_hands_on_bench: 40, mountainClimberWithHandsOnSwissBall: 41, mountain_climber_with_hands_on_swiss_ball: 41, weightedMountainClimberWithHandsOnSwissBall: 42, weighted_mountain_climber_with_hands_on_swiss_ball: 42, plank: 43, plankJacksWithFeetOnSlidingDiscs: 44, plank_jacks_with_feet_on_sliding_discs: 44, weightedPlankJacksWithFeetOnSlidingDiscs: 45, weighted_plank_jacks_with_feet_on_sliding_discs: 45, plankKneeTwist: 46, plank_knee_twist: 46, weightedPlankKneeTwist: 47, weighted_plank_knee_twist: 47, plankPikeJumps: 48, plank_pike_jumps: 48, weightedPlankPikeJumps: 49, weighted_plank_pike_jumps: 49, plankPikes: 50, plank_pikes: 50, weightedPlankPikes: 51, weighted_plank_pikes: 51, plankToStandUp: 52, plank_to_stand_up: 52, weightedPlankToStandUp: 53, weighted_plank_to_stand_up: 53, plankWithArmRaise: 54, plank_with_arm_raise: 54, weightedPlankWithArmRaise: 55, weighted_plank_with_arm_raise: 55, plankWithKneeToElbow: 56, plank_with_knee_to_elbow: 56, weightedPlankWithKneeToElbow: 57, weighted_plank_with_knee_to_elbow: 57, plankWithObliqueCrunch: 58, plank_with_oblique_crunch: 58, weightedPlankWithObliqueCrunch: 59, weighted_plank_with_oblique_crunch: 59, plyometricSidePlank: 60, plyometric_side_plank: 60, weightedPlyometricSidePlank: 61, weighted_plyometric_side_plank: 61, rollingSidePlank: 62, rolling_side_plank: 62, weightedRollingSidePlank: 63, weighted_rolling_side_plank: 63, sideKickPlank: 64, side_kick_plank: 64, weightedSideKickPlank: 65, weighted_side_kick_plank: 65, sidePlank: 66, side_plank: 66, weightedSidePlank: 67, weighted_side_plank: 67, sidePlankAndRow: 68, side_plank_and_row: 68, weightedSidePlankAndRow: 69, weighted_side_plank_and_row: 69, sidePlankLift: 70, side_plank_lift: 70, weightedSidePlankLift: 71, weighted_side_plank_lift: 71, sidePlankWithElbowOnBosuBall: 72, side_plank_with_elbow_on_bosu_ball: 72, weightedSidePlankWithElbowOnBosuBall: 73, weighted_side_plank_with_elbow_on_bosu_ball: 73, sidePlankWithFeetOnBench: 74, side_plank_with_feet_on_bench: 74, weightedSidePlankWithFeetOnBench: 75, weighted_side_plank_with_feet_on_bench: 75, sidePlankWithKneeCircle: 76, side_plank_with_knee_circle: 76, weightedSidePlankWithKneeCircle: 77, weighted_side_plank_with_knee_circle: 77, sidePlankWithKneeTuck: 78, side_plank_with_knee_tuck: 78, weightedSidePlankWithKneeTuck: 79, weighted_side_plank_with_knee_tuck: 79, sidePlankWithLegLift: 80, side_plank_with_leg_lift: 80, weightedSidePlankWithLegLift: 81, weighted_side_plank_with_leg_lift: 81, sidePlankWithReachUnder: 82, side_plank_with_reach_under: 82, weightedSidePlankWithReachUnder: 83, weighted_side_plank_with_reach_under: 83, singleLegElevatedFeetPlank: 84, single_leg_elevated_feet_plank: 84, weightedSingleLegElevatedFeetPlank: 85, weighted_single_leg_elevated_feet_plank: 85, singleLegFlexAndExtend: 86, single_leg_flex_and_extend: 86, weightedSingleLegFlexAndExtend: 87, weighted_single_leg_flex_and_extend: 87, singleLegSidePlank: 88, single_leg_side_plank: 88, weightedSingleLegSidePlank: 89, weighted_single_leg_side_plank: 89, spidermanPlank: 90, spiderman_plank: 90, weightedSpidermanPlank: 91, weighted_spiderman_plank: 91, straightArmPlank: 92, straight_arm_plank: 92, weightedStraightArmPlank: 93, weighted_straight_arm_plank: 93, straightArmPlankWithShoulderTouch: 94, straight_arm_plank_with_shoulder_touch: 94, weightedStraightArmPlankWithShoulderTouch: 95, weighted_straight_arm_plank_with_shoulder_touch: 95, swissBallPlank: 96, swiss_ball_plank: 96, weightedSwissBallPlank: 97, weighted_swiss_ball_plank: 97, swissBallPlankLegLift: 98, swiss_ball_plank_leg_lift: 98, weightedSwissBallPlankLegLift: 99, weighted_swiss_ball_plank_leg_lift: 99, swissBallPlankLegLiftAndHold: 100, swiss_ball_plank_leg_lift_and_hold: 100, swissBallPlankWithFeetOnBench: 101, swiss_ball_plank_with_feet_on_bench: 101, weightedSwissBallPlankWithFeetOnBench: 102, weighted_swiss_ball_plank_with_feet_on_bench: 102, swissBallProneJackknife: 103, swiss_ball_prone_jackknife: 103, weightedSwissBallProneJackknife: 104, weighted_swiss_ball_prone_jackknife: 104, swissBallSidePlank: 105, swiss_ball_side_plank: 105, weightedSwissBallSidePlank: 106, weighted_swiss_ball_side_plank: 106, threeWayPlank: 107, three_way_plank: 107, weightedThreeWayPlank: 108, weighted_three_way_plank: 108, towelPlankAndKneeIn: 109, towel_plank_and_knee_in: 109, weightedTowelPlankAndKneeIn: 110, weighted_towel_plank_and_knee_in: 110, tStabilization: 111, t_stabilization: 111, weightedTStabilization: 112, weighted_t_stabilization: 112, turkishGetUpToSidePlank: 113, turkish_get_up_to_side_plank: 113, weightedTurkishGetUpToSidePlank: 114, weighted_turkish_get_up_to_side_plank: 114, twoPointPlank: 115, two_point_plank: 115, weightedTwoPointPlank: 116, weighted_two_point_plank: 116, weightedPlank: 117, weighted_plank: 117, wideStancePlankWithDiagonalArmLift: 118, wide_stance_plank_with_diagonal_arm_lift: 118, weightedWideStancePlankWithDiagonalArmLift: 119, weighted_wide_stance_plank_with_diagonal_arm_lift: 119, wideStancePlankWithDiagonalLegLift: 120, wide_stance_plank_with_diagonal_leg_lift: 120, weightedWideStancePlankWithDiagonalLegLift: 121, weighted_wide_stance_plank_with_diagonal_leg_lift: 121, wideStancePlankWithLegLift: 122, wide_stance_plank_with_leg_lift: 122, weightedWideStancePlankWithLegLift: 123, weighted_wide_stance_plank_with_leg_lift: 123, wideStancePlankWithOppositeArmAndLegLift: 124, wide_stance_plank_with_opposite_arm_and_leg_lift: 124, weightedMountainClimberWithHandsOnBench: 125, weighted_mountain_climber_with_hands_on_bench: 125, weightedSwissBallPlankLegLiftAndHold: 126, weighted_swiss_ball_plank_leg_lift_and_hold: 126, weightedWideStancePlankWithOppositeArmAndLegLift: 127, weighted_wide_stance_plank_with_opposite_arm_and_leg_lift: 127, plankWithFeetOnSwissBall: 128, plank_with_feet_on_swiss_ball: 128, sidePlankToPlankWithReachUnder: 129, side_plank_to_plank_with_reach_under: 129, bridgeWithGluteLowerLift: 130, bridge_with_glute_lower_lift: 130, bridgeOneLegBridge: 131, bridge_one_leg_bridge: 131, plankWithArmVariations: 132, plank_with_arm_variations: 132, plankWithLegLift: 133, plank_with_leg_lift: 133, reversePlankWithLegPull: 134, reverse_plank_with_leg_pull: 134, _min: 0, _max: 134 }, plyo_exercise_name: { alternatingJumpLunge: 0, alternating_jump_lunge: 0, weightedAlternatingJumpLunge: 1, weighted_alternating_jump_lunge: 1, barbellJumpSquat: 2, barbell_jump_squat: 2, bodyWeightJumpSquat: 3, body_weight_jump_squat: 3, weightedJumpSquat: 4, weighted_jump_squat: 4, crossKneeStrike: 5, cross_knee_strike: 5, weightedCrossKneeStrike: 6, weighted_cross_knee_strike: 6, depthJump: 7, depth_jump: 7, weightedDepthJump: 8, weighted_depth_jump: 8, dumbbellJumpSquat: 9, dumbbell_jump_squat: 9, dumbbellSplitJump: 10, dumbbell_split_jump: 10, frontKneeStrike: 11, front_knee_strike: 11, weightedFrontKneeStrike: 12, weighted_front_knee_strike: 12, highBoxJump: 13, high_box_jump: 13, weightedHighBoxJump: 14, weighted_high_box_jump: 14, isometricExplosiveBodyWeightJumpSquat: 15, isometric_explosive_body_weight_jump_squat: 15, weightedIsometricExplosiveJumpSquat: 16, weighted_isometric_explosive_jump_squat: 16, lateralLeapAndHop: 17, lateral_leap_and_hop: 17, weightedLateralLeapAndHop: 18, weighted_lateral_leap_and_hop: 18, lateralPlyoSquats: 19, lateral_plyo_squats: 19, weightedLateralPlyoSquats: 20, weighted_lateral_plyo_squats: 20, lateralSlide: 21, lateral_slide: 21, weightedLateralSlide: 22, weighted_lateral_slide: 22, medicineBallOverheadThrows: 23, medicine_ball_overhead_throws: 23, medicineBallSideThrow: 24, medicine_ball_side_throw: 24, medicineBallSlam: 25, medicine_ball_slam: 25, sideToSideMedicineBallThrows: 26, side_to_side_medicine_ball_throws: 26, sideToSideShuffleJump: 27, side_to_side_shuffle_jump: 27, weightedSideToSideShuffleJump: 28, weighted_side_to_side_shuffle_jump: 28, squatJumpOntoBox: 29, squat_jump_onto_box: 29, weightedSquatJumpOntoBox: 30, weighted_squat_jump_onto_box: 30, squatJumpsInAndOut: 31, squat_jumps_in_and_out: 31, weightedSquatJumpsInAndOut: 32, weighted_squat_jumps_in_and_out: 32, _min: 0, _max: 32 }, pull_up_exercise_name: { bandedPullUps: 0, banded_pull_ups: 0, "30DegreeLatPulldown": 1, bandAssistedChinUp: 2, band_assisted_chin_up: 2, closeGripChinUp: 3, close_grip_chin_up: 3, weightedCloseGripChinUp: 4, weighted_close_grip_chin_up: 4, closeGripLatPulldown: 5, close_grip_lat_pulldown: 5, crossoverChinUp: 6, crossover_chin_up: 6, weightedCrossoverChinUp: 7, weighted_crossover_chin_up: 7, ezBarPullover: 8, ez_bar_pullover: 8, hangingHurdle: 9, hanging_hurdle: 9, weightedHangingHurdle: 10, weighted_hanging_hurdle: 10, kneelingLatPulldown: 11, kneeling_lat_pulldown: 11, kneelingUnderhandGripLatPulldown: 12, kneeling_underhand_grip_lat_pulldown: 12, latPulldown: 13, lat_pulldown: 13, mixedGripChinUp: 14, mixed_grip_chin_up: 14, weightedMixedGripChinUp: 15, weighted_mixed_grip_chin_up: 15, mixedGripPullUp: 16, mixed_grip_pull_up: 16, weightedMixedGripPullUp: 17, weighted_mixed_grip_pull_up: 17, reverseGripPulldown: 18, reverse_grip_pulldown: 18, standingCablePullover: 19, standing_cable_pullover: 19, straightArmPulldown: 20, straight_arm_pulldown: 20, swissBallEzBarPullover: 21, swiss_ball_ez_bar_pullover: 21, towelPullUp: 22, towel_pull_up: 22, weightedTowelPullUp: 23, weighted_towel_pull_up: 23, weightedPullUp: 24, weighted_pull_up: 24, wideGripLatPulldown: 25, wide_grip_lat_pulldown: 25, wideGripPullUp: 26, wide_grip_pull_up: 26, weightedWideGripPullUp: 27, weighted_wide_grip_pull_up: 27, burpeePullUp: 28, burpee_pull_up: 28, weightedBurpeePullUp: 29, weighted_burpee_pull_up: 29, jumpingPullUps: 30, jumping_pull_ups: 30, weightedJumpingPullUps: 31, weighted_jumping_pull_ups: 31, kippingPullUp: 32, kipping_pull_up: 32, weightedKippingPullUp: 33, weighted_kipping_pull_up: 33, lPullUp: 34, l_pull_up: 34, weightedLPullUp: 35, weighted_l_pull_up: 35, suspendedChinUp: 36, suspended_chin_up: 36, weightedSuspendedChinUp: 37, weighted_suspended_chin_up: 37, pullUp: 38, pull_up: 38, _min: 0, _max: 38 }, push_up_exercise_name: { chestPressWithBand: 0, chest_press_with_band: 0, alternatingStaggeredPushUp: 1, alternating_staggered_push_up: 1, weightedAlternatingStaggeredPushUp: 2, weighted_alternating_staggered_push_up: 2, alternatingHandsMedicineBallPushUp: 3, alternating_hands_medicine_ball_push_up: 3, weightedAlternatingHandsMedicineBallPushUp: 4, weighted_alternating_hands_medicine_ball_push_up: 4, bosuBallPushUp: 5, bosu_ball_push_up: 5, weightedBosuBallPushUp: 6, weighted_bosu_ball_push_up: 6, clappingPushUp: 7, clapping_push_up: 7, weightedClappingPushUp: 8, weighted_clapping_push_up: 8, closeGripMedicineBallPushUp: 9, close_grip_medicine_ball_push_up: 9, weightedCloseGripMedicineBallPushUp: 10, weighted_close_grip_medicine_ball_push_up: 10, closeHandsPushUp: 11, close_hands_push_up: 11, weightedCloseHandsPushUp: 12, weighted_close_hands_push_up: 12, declinePushUp: 13, decline_push_up: 13, weightedDeclinePushUp: 14, weighted_decline_push_up: 14, diamondPushUp: 15, diamond_push_up: 15, weightedDiamondPushUp: 16, weighted_diamond_push_up: 16, explosiveCrossoverPushUp: 17, explosive_crossover_push_up: 17, weightedExplosiveCrossoverPushUp: 18, weighted_explosive_crossover_push_up: 18, explosivePushUp: 19, explosive_push_up: 19, weightedExplosivePushUp: 20, weighted_explosive_push_up: 20, feetElevatedSideToSidePushUp: 21, feet_elevated_side_to_side_push_up: 21, weightedFeetElevatedSideToSidePushUp: 22, weighted_feet_elevated_side_to_side_push_up: 22, handReleasePushUp: 23, hand_release_push_up: 23, weightedHandReleasePushUp: 24, weighted_hand_release_push_up: 24, handstandPushUp: 25, handstand_push_up: 25, weightedHandstandPushUp: 26, weighted_handstand_push_up: 26, inclinePushUp: 27, incline_push_up: 27, weightedInclinePushUp: 28, weighted_incline_push_up: 28, isometricExplosivePushUp: 29, isometric_explosive_push_up: 29, weightedIsometricExplosivePushUp: 30, weighted_isometric_explosive_push_up: 30, judoPushUp: 31, judo_push_up: 31, weightedJudoPushUp: 32, weighted_judo_push_up: 32, kneelingPushUp: 33, kneeling_push_up: 33, weightedKneelingPushUp: 34, weighted_kneeling_push_up: 34, medicineBallChestPass: 35, medicine_ball_chest_pass: 35, medicineBallPushUp: 36, medicine_ball_push_up: 36, weightedMedicineBallPushUp: 37, weighted_medicine_ball_push_up: 37, oneArmPushUp: 38, one_arm_push_up: 38, weightedOneArmPushUp: 39, weighted_one_arm_push_up: 39, weightedPushUp: 40, weighted_push_up: 40, pushUpAndRow: 41, push_up_and_row: 41, weightedPushUpAndRow: 42, weighted_push_up_and_row: 42, pushUpPlus: 43, push_up_plus: 43, weightedPushUpPlus: 44, weighted_push_up_plus: 44, pushUpWithFeetOnSwissBall: 45, push_up_with_feet_on_swiss_ball: 45, weightedPushUpWithFeetOnSwissBall: 46, weighted_push_up_with_feet_on_swiss_ball: 46, pushUpWithOneHandOnMedicineBall: 47, push_up_with_one_hand_on_medicine_ball: 47, weightedPushUpWithOneHandOnMedicineBall: 48, weighted_push_up_with_one_hand_on_medicine_ball: 48, shoulderPushUp: 49, shoulder_push_up: 49, weightedShoulderPushUp: 50, weighted_shoulder_push_up: 50, singleArmMedicineBallPushUp: 51, single_arm_medicine_ball_push_up: 51, weightedSingleArmMedicineBallPushUp: 52, weighted_single_arm_medicine_ball_push_up: 52, spidermanPushUp: 53, spiderman_push_up: 53, weightedSpidermanPushUp: 54, weighted_spiderman_push_up: 54, stackedFeetPushUp: 55, stacked_feet_push_up: 55, weightedStackedFeetPushUp: 56, weighted_stacked_feet_push_up: 56, staggeredHandsPushUp: 57, staggered_hands_push_up: 57, weightedStaggeredHandsPushUp: 58, weighted_staggered_hands_push_up: 58, suspendedPushUp: 59, suspended_push_up: 59, weightedSuspendedPushUp: 60, weighted_suspended_push_up: 60, swissBallPushUp: 61, swiss_ball_push_up: 61, weightedSwissBallPushUp: 62, weighted_swiss_ball_push_up: 62, swissBallPushUpPlus: 63, swiss_ball_push_up_plus: 63, weightedSwissBallPushUpPlus: 64, weighted_swiss_ball_push_up_plus: 64, tPushUp: 65, t_push_up: 65, weightedTPushUp: 66, weighted_t_push_up: 66, tripleStopPushUp: 67, triple_stop_push_up: 67, weightedTripleStopPushUp: 68, weighted_triple_stop_push_up: 68, wideHandsPushUp: 69, wide_hands_push_up: 69, weightedWideHandsPushUp: 70, weighted_wide_hands_push_up: 70, paralletteHandstandPushUp: 71, parallette_handstand_push_up: 71, weightedParalletteHandstandPushUp: 72, weighted_parallette_handstand_push_up: 72, ringHandstandPushUp: 73, ring_handstand_push_up: 73, weightedRingHandstandPushUp: 74, weighted_ring_handstand_push_up: 74, ringPushUp: 75, ring_push_up: 75, weightedRingPushUp: 76, weighted_ring_push_up: 76, pushUp: 77, push_up: 77, pilatesPushup: 78, pilates_pushup: 78, _min: 0, _max: 78 }, row_exercise_name: { barbellStraightLegDeadliftToRow: 0, barbell_straight_leg_deadlift_to_row: 0, cableRowStanding: 1, cable_row_standing: 1, dumbbellRow: 2, dumbbell_row: 2, elevatedFeetInvertedRow: 3, elevated_feet_inverted_row: 3, weightedElevatedFeetInvertedRow: 4, weighted_elevated_feet_inverted_row: 4, facePull: 5, face_pull: 5, facePullWithExternalRotation: 6, face_pull_with_external_rotation: 6, invertedRowWithFeetOnSwissBall: 7, inverted_row_with_feet_on_swiss_ball: 7, weightedInvertedRowWithFeetOnSwissBall: 8, weighted_inverted_row_with_feet_on_swiss_ball: 8, kettlebellRow: 9, kettlebell_row: 9, modifiedInvertedRow: 10, modified_inverted_row: 10, weightedModifiedInvertedRow: 11, weighted_modified_inverted_row: 11, neutralGripAlternatingDumbbellRow: 12, neutral_grip_alternating_dumbbell_row: 12, oneArmBentOverRow: 13, one_arm_bent_over_row: 13, oneLeggedDumbbellRow: 14, one_legged_dumbbell_row: 14, renegadeRow: 15, renegade_row: 15, reverseGripBarbellRow: 16, reverse_grip_barbell_row: 16, ropeHandleCableRow: 17, rope_handle_cable_row: 17, seatedCableRow: 18, seated_cable_row: 18, seatedDumbbellRow: 19, seated_dumbbell_row: 19, singleArmCableRow: 20, single_arm_cable_row: 20, singleArmCableRowAndRotation: 21, single_arm_cable_row_and_rotation: 21, singleArmInvertedRow: 22, single_arm_inverted_row: 22, weightedSingleArmInvertedRow: 23, weighted_single_arm_inverted_row: 23, singleArmNeutralGripDumbbellRow: 24, single_arm_neutral_grip_dumbbell_row: 24, singleArmNeutralGripDumbbellRowAndRotation: 25, single_arm_neutral_grip_dumbbell_row_and_rotation: 25, suspendedInvertedRow: 26, suspended_inverted_row: 26, weightedSuspendedInvertedRow: 27, weighted_suspended_inverted_row: 27, tBarRow: 28, t_bar_row: 28, towelGripInvertedRow: 29, towel_grip_inverted_row: 29, weightedTowelGripInvertedRow: 30, weighted_towel_grip_inverted_row: 30, underhandGripCableRow: 31, underhand_grip_cable_row: 31, vGripCableRow: 32, v_grip_cable_row: 32, wideGripSeatedCableRow: 33, wide_grip_seated_cable_row: 33, _min: 0, _max: 33 }, shoulder_press_exercise_name: { alternatingDumbbellShoulderPress: 0, alternating_dumbbell_shoulder_press: 0, arnoldPress: 1, arnold_press: 1, barbellFrontSquatToPushPress: 2, barbell_front_squat_to_push_press: 2, barbellPushPress: 3, barbell_push_press: 3, barbellShoulderPress: 4, barbell_shoulder_press: 4, deadCurlPress: 5, dead_curl_press: 5, dumbbellAlternatingShoulderPressAndTwist: 6, dumbbell_alternating_shoulder_press_and_twist: 6, dumbbellHammerCurlToLungeToPress: 7, dumbbell_hammer_curl_to_lunge_to_press: 7, dumbbellPushPress: 8, dumbbell_push_press: 8, floorInvertedShoulderPress: 9, floor_inverted_shoulder_press: 9, weightedFloorInvertedShoulderPress: 10, weighted_floor_inverted_shoulder_press: 10, invertedShoulderPress: 11, inverted_shoulder_press: 11, weightedInvertedShoulderPress: 12, weighted_inverted_shoulder_press: 12, oneArmPushPress: 13, one_arm_push_press: 13, overheadBarbellPress: 14, overhead_barbell_press: 14, overheadDumbbellPress: 15, overhead_dumbbell_press: 15, seatedBarbellShoulderPress: 16, seated_barbell_shoulder_press: 16, seatedDumbbellShoulderPress: 17, seated_dumbbell_shoulder_press: 17, singleArmDumbbellShoulderPress: 18, single_arm_dumbbell_shoulder_press: 18, singleArmStepUpAndPress: 19, single_arm_step_up_and_press: 19, smithMachineOverheadPress: 20, smith_machine_overhead_press: 20, splitStanceHammerCurlToPress: 21, split_stance_hammer_curl_to_press: 21, swissBallDumbbellShoulderPress: 22, swiss_ball_dumbbell_shoulder_press: 22, weightPlateFrontRaise: 23, weight_plate_front_raise: 23, _min: 0, _max: 23 }, shoulder_stability_exercise_name: { "90DegreeCableExternalRotation": 0, bandExternalRotation: 1, band_external_rotation: 1, bandInternalRotation: 2, band_internal_rotation: 2, bentArmLateralRaiseAndExternalRotation: 3, bent_arm_lateral_raise_and_external_rotation: 3, cableExternalRotation: 4, cable_external_rotation: 4, dumbbellFacePullWithExternalRotation: 5, dumbbell_face_pull_with_external_rotation: 5, floorIRaise: 6, floor_i_raise: 6, weightedFloorIRaise: 7, weighted_floor_i_raise: 7, floorTRaise: 8, floor_t_raise: 8, weightedFloorTRaise: 9, weighted_floor_t_raise: 9, floorYRaise: 10, floor_y_raise: 10, weightedFloorYRaise: 11, weighted_floor_y_raise: 11, inclineIRaise: 12, incline_i_raise: 12, weightedInclineIRaise: 13, weighted_incline_i_raise: 13, inclineLRaise: 14, incline_l_raise: 14, weightedInclineLRaise: 15, weighted_incline_l_raise: 15, inclineTRaise: 16, incline_t_raise: 16, weightedInclineTRaise: 17, weighted_incline_t_raise: 17, inclineWRaise: 18, incline_w_raise: 18, weightedInclineWRaise: 19, weighted_incline_w_raise: 19, inclineYRaise: 20, incline_y_raise: 20, weightedInclineYRaise: 21, weighted_incline_y_raise: 21, lyingExternalRotation: 22, lying_external_rotation: 22, seatedDumbbellExternalRotation: 23, seated_dumbbell_external_rotation: 23, standingLRaise: 24, standing_l_raise: 24, swissBallIRaise: 25, swiss_ball_i_raise: 25, weightedSwissBallIRaise: 26, weighted_swiss_ball_i_raise: 26, swissBallTRaise: 27, swiss_ball_t_raise: 27, weightedSwissBallTRaise: 28, weighted_swiss_ball_t_raise: 28, swissBallWRaise: 29, swiss_ball_w_raise: 29, weightedSwissBallWRaise: 30, weighted_swiss_ball_w_raise: 30, swissBallYRaise: 31, swiss_ball_y_raise: 31, weightedSwissBallYRaise: 32, weighted_swiss_ball_y_raise: 32, _min: 0, _max: 32 }, shrug_exercise_name: { barbellJumpShrug: 0, barbell_jump_shrug: 0, barbellShrug: 1, barbell_shrug: 1, barbellUprightRow: 2, barbell_upright_row: 2, behindTheBackSmithMachineShrug: 3, behind_the_back_smith_machine_shrug: 3, dumbbellJumpShrug: 4, dumbbell_jump_shrug: 4, dumbbellShrug: 5, dumbbell_shrug: 5, dumbbellUprightRow: 6, dumbbell_upright_row: 6, inclineDumbbellShrug: 7, incline_dumbbell_shrug: 7, overheadBarbellShrug: 8, overhead_barbell_shrug: 8, overheadDumbbellShrug: 9, overhead_dumbbell_shrug: 9, scaptionAndShrug: 10, scaption_and_shrug: 10, scapularRetraction: 11, scapular_retraction: 11, serratusChairShrug: 12, serratus_chair_shrug: 12, weightedSerratusChairShrug: 13, weighted_serratus_chair_shrug: 13, serratusShrug: 14, serratus_shrug: 14, weightedSerratusShrug: 15, weighted_serratus_shrug: 15, wideGripJumpShrug: 16, wide_grip_jump_shrug: 16, _min: 0, _max: 16 }, sit_up_exercise_name: { alternatingSitUp: 0, alternating_sit_up: 0, weightedAlternatingSitUp: 1, weighted_alternating_sit_up: 1, bentKneeVUp: 2, bent_knee_v_up: 2, weightedBentKneeVUp: 3, weighted_bent_knee_v_up: 3, butterflySitUp: 4, butterfly_sit_up: 4, weightedButterflySitup: 5, weighted_butterfly_situp: 5, crossPunchRollUp: 6, cross_punch_roll_up: 6, weightedCrossPunchRollUp: 7, weighted_cross_punch_roll_up: 7, crossedArmsSitUp: 8, crossed_arms_sit_up: 8, weightedCrossedArmsSitUp: 9, weighted_crossed_arms_sit_up: 9, getUpSitUp: 10, get_up_sit_up: 10, weightedGetUpSitUp: 11, weighted_get_up_sit_up: 11, hoveringSitUp: 12, hovering_sit_up: 12, weightedHoveringSitUp: 13, weighted_hovering_sit_up: 13, kettlebellSitUp: 14, kettlebell_sit_up: 14, medicineBallAlternatingVUp: 15, medicine_ball_alternating_v_up: 15, medicineBallSitUp: 16, medicine_ball_sit_up: 16, medicineBallVUp: 17, medicine_ball_v_up: 17, modifiedSitUp: 18, modified_sit_up: 18, negativeSitUp: 19, negative_sit_up: 19, oneArmFullSitUp: 20, one_arm_full_sit_up: 20, recliningCircle: 21, reclining_circle: 21, weightedRecliningCircle: 22, weighted_reclining_circle: 22, reverseCurlUp: 23, reverse_curl_up: 23, weightedReverseCurlUp: 24, weighted_reverse_curl_up: 24, singleLegSwissBallJackknife: 25, single_leg_swiss_ball_jackknife: 25, weightedSingleLegSwissBallJackknife: 26, weighted_single_leg_swiss_ball_jackknife: 26, theTeaser: 27, the_teaser: 27, theTeaserWeighted: 28, the_teaser_weighted: 28, threePartRollDown: 29, three_part_roll_down: 29, weightedThreePartRollDown: 30, weighted_three_part_roll_down: 30, vUp: 31, v_up: 31, weightedVUp: 32, weighted_v_up: 32, weightedRussianTwistOnSwissBall: 33, weighted_russian_twist_on_swiss_ball: 33, weightedSitUp: 34, weighted_sit_up: 34, xAbs: 35, x_abs: 35, weightedXAbs: 36, weighted_x_abs: 36, sitUp: 37, sit_up: 37, _min: 0, _max: 37 }, squat_exercise_name: { legPress: 0, leg_press: 0, backSquatWithBodyBar: 1, back_squat_with_body_bar: 1, backSquats: 2, back_squats: 2, weightedBackSquats: 3, weighted_back_squats: 3, balancingSquat: 4, balancing_squat: 4, weightedBalancingSquat: 5, weighted_balancing_squat: 5, barbellBackSquat: 6, barbell_back_squat: 6, barbellBoxSquat: 7, barbell_box_squat: 7, barbellFrontSquat: 8, barbell_front_squat: 8, barbellHackSquat: 9, barbell_hack_squat: 9, barbellHangSquatSnatch: 10, barbell_hang_squat_snatch: 10, barbellLateralStepUp: 11, barbell_lateral_step_up: 11, barbellQuarterSquat: 12, barbell_quarter_squat: 12, barbellSiffSquat: 13, barbell_siff_squat: 13, barbellSquatSnatch: 14, barbell_squat_snatch: 14, barbellSquatWithHeelsRaised: 15, barbell_squat_with_heels_raised: 15, barbellStepover: 16, barbell_stepover: 16, barbellStepUp: 17, barbell_step_up: 17, benchSquatWithRotationalChop: 18, bench_squat_with_rotational_chop: 18, weightedBenchSquatWithRotationalChop: 19, weighted_bench_squat_with_rotational_chop: 19, bodyWeightWallSquat: 20, body_weight_wall_squat: 20, weightedWallSquat: 21, weighted_wall_squat: 21, boxStepSquat: 22, box_step_squat: 22, weightedBoxStepSquat: 23, weighted_box_step_squat: 23, bracedSquat: 24, braced_squat: 24, crossedArmBarbellFrontSquat: 25, crossed_arm_barbell_front_squat: 25, crossoverDumbbellStepUp: 26, crossover_dumbbell_step_up: 26, dumbbellFrontSquat: 27, dumbbell_front_squat: 27, dumbbellSplitSquat: 28, dumbbell_split_squat: 28, dumbbellSquat: 29, dumbbell_squat: 29, dumbbellSquatClean: 30, dumbbell_squat_clean: 30, dumbbellStepover: 31, dumbbell_stepover: 31, dumbbellStepUp: 32, dumbbell_step_up: 32, elevatedSingleLegSquat: 33, elevated_single_leg_squat: 33, weightedElevatedSingleLegSquat: 34, weighted_elevated_single_leg_squat: 34, figureFourSquats: 35, figure_four_squats: 35, weightedFigureFourSquats: 36, weighted_figure_four_squats: 36, gobletSquat: 37, goblet_squat: 37, kettlebellSquat: 38, kettlebell_squat: 38, kettlebellSwingOverhead: 39, kettlebell_swing_overhead: 39, kettlebellSwingWithFlipToSquat: 40, kettlebell_swing_with_flip_to_squat: 40, lateralDumbbellStepUp: 41, lateral_dumbbell_step_up: 41, oneLeggedSquat: 42, one_legged_squat: 42, overheadDumbbellSquat: 43, overhead_dumbbell_squat: 43, overheadSquat: 44, overhead_squat: 44, partialSingleLegSquat: 45, partial_single_leg_squat: 45, weightedPartialSingleLegSquat: 46, weighted_partial_single_leg_squat: 46, pistolSquat: 47, pistol_squat: 47, weightedPistolSquat: 48, weighted_pistol_squat: 48, plieSlides: 49, plie_slides: 49, weightedPlieSlides: 50, weighted_plie_slides: 50, plieSquat: 51, plie_squat: 51, weightedPlieSquat: 52, weighted_plie_squat: 52, prisonerSquat: 53, prisoner_squat: 53, weightedPrisonerSquat: 54, weighted_prisoner_squat: 54, singleLegBenchGetUp: 55, single_leg_bench_get_up: 55, weightedSingleLegBenchGetUp: 56, weighted_single_leg_bench_get_up: 56, singleLegBenchSquat: 57, single_leg_bench_squat: 57, weightedSingleLegBenchSquat: 58, weighted_single_leg_bench_squat: 58, singleLegSquatOnSwissBall: 59, single_leg_squat_on_swiss_ball: 59, weightedSingleLegSquatOnSwissBall: 60, weighted_single_leg_squat_on_swiss_ball: 60, squat: 61, weightedSquat: 62, weighted_squat: 62, squatsWithBand: 63, squats_with_band: 63, staggeredSquat: 64, staggered_squat: 64, weightedStaggeredSquat: 65, weighted_staggered_squat: 65, stepUp: 66, step_up: 66, weightedStepUp: 67, weighted_step_up: 67, suitcaseSquats: 68, suitcase_squats: 68, sumoSquat: 69, sumo_squat: 69, sumoSquatSlideIn: 70, sumo_squat_slide_in: 70, weightedSumoSquatSlideIn: 71, weighted_sumo_squat_slide_in: 71, sumoSquatToHighPull: 72, sumo_squat_to_high_pull: 72, sumoSquatToStand: 73, sumo_squat_to_stand: 73, weightedSumoSquatToStand: 74, weighted_sumo_squat_to_stand: 74, sumoSquatWithRotation: 75, sumo_squat_with_rotation: 75, weightedSumoSquatWithRotation: 76, weighted_sumo_squat_with_rotation: 76, swissBallBodyWeightWallSquat: 77, swiss_ball_body_weight_wall_squat: 77, weightedSwissBallWallSquat: 78, weighted_swiss_ball_wall_squat: 78, thrusters: 79, unevenSquat: 80, uneven_squat: 80, weightedUnevenSquat: 81, weighted_uneven_squat: 81, waistSlimmingSquat: 82, waist_slimming_squat: 82, wallBall: 83, wall_ball: 83, wideStanceBarbellSquat: 84, wide_stance_barbell_squat: 84, wideStanceGobletSquat: 85, wide_stance_goblet_squat: 85, zercherSquat: 86, zercher_squat: 86, kbsOverhead: 87, kbs_overhead: 87, squatAndSideKick: 88, squat_and_side_kick: 88, squatJumpsInNOut: 89, squat_jumps_in_n_out: 89, pilatesPlieSquatsParallelTurnedOutFlatAndHeels: 90, pilates_plie_squats_parallel_turned_out_flat_and_heels: 90, releveStraightLegAndKneeBentWithOneLegVariation: 91, releve_straight_leg_and_knee_bent_with_one_leg_variation: 91, _min: 0, _max: 91 }, total_body_exercise_name: { burpee: 0, weightedBurpee: 1, weighted_burpee: 1, burpeeBoxJump: 2, burpee_box_jump: 2, weightedBurpeeBoxJump: 3, weighted_burpee_box_jump: 3, highPullBurpee: 4, high_pull_burpee: 4, manMakers: 5, man_makers: 5, oneArmBurpee: 6, one_arm_burpee: 6, squatThrusts: 7, squat_thrusts: 7, weightedSquatThrusts: 8, weighted_squat_thrusts: 8, squatPlankPushUp: 9, squat_plank_push_up: 9, weightedSquatPlankPushUp: 10, weighted_squat_plank_push_up: 10, standingTRotationBalance: 11, standing_t_rotation_balance: 11, weightedStandingTRotationBalance: 12, weighted_standing_t_rotation_balance: 12, _min: 0, _max: 12 }, triceps_extension_exercise_name: { benchDip: 0, bench_dip: 0, weightedBenchDip: 1, weighted_bench_dip: 1, bodyWeightDip: 2, body_weight_dip: 2, cableKickback: 3, cable_kickback: 3, cableLyingTricepsExtension: 4, cable_lying_triceps_extension: 4, cableOverheadTricepsExtension: 5, cable_overhead_triceps_extension: 5, dumbbellKickback: 6, dumbbell_kickback: 6, dumbbellLyingTricepsExtension: 7, dumbbell_lying_triceps_extension: 7, ezBarOverheadTricepsExtension: 8, ez_bar_overhead_triceps_extension: 8, inclineDip: 9, incline_dip: 9, weightedInclineDip: 10, weighted_incline_dip: 10, inclineEzBarLyingTricepsExtension: 11, incline_ez_bar_lying_triceps_extension: 11, lyingDumbbellPulloverToExtension: 12, lying_dumbbell_pullover_to_extension: 12, lyingEzBarTricepsExtension: 13, lying_ez_bar_triceps_extension: 13, lyingTricepsExtensionToCloseGripBenchPress: 14, lying_triceps_extension_to_close_grip_bench_press: 14, overheadDumbbellTricepsExtension: 15, overhead_dumbbell_triceps_extension: 15, recliningTricepsPress: 16, reclining_triceps_press: 16, reverseGripPressdown: 17, reverse_grip_pressdown: 17, reverseGripTricepsPressdown: 18, reverse_grip_triceps_pressdown: 18, ropePressdown: 19, rope_pressdown: 19, seatedBarbellOverheadTricepsExtension: 20, seated_barbell_overhead_triceps_extension: 20, seatedDumbbellOverheadTricepsExtension: 21, seated_dumbbell_overhead_triceps_extension: 21, seatedEzBarOverheadTricepsExtension: 22, seated_ez_bar_overhead_triceps_extension: 22, seatedSingleArmOverheadDumbbellExtension: 23, seated_single_arm_overhead_dumbbell_extension: 23, singleArmDumbbellOverheadTricepsExtension: 24, single_arm_dumbbell_overhead_triceps_extension: 24, singleDumbbellSeatedOverheadTricepsExtension: 25, single_dumbbell_seated_overhead_triceps_extension: 25, singleLegBenchDipAndKick: 26, single_leg_bench_dip_and_kick: 26, weightedSingleLegBenchDipAndKick: 27, weighted_single_leg_bench_dip_and_kick: 27, singleLegDip: 28, single_leg_dip: 28, weightedSingleLegDip: 29, weighted_single_leg_dip: 29, staticLyingTricepsExtension: 30, static_lying_triceps_extension: 30, suspendedDip: 31, suspended_dip: 31, weightedSuspendedDip: 32, weighted_suspended_dip: 32, swissBallDumbbellLyingTricepsExtension: 33, swiss_ball_dumbbell_lying_triceps_extension: 33, swissBallEzBarLyingTricepsExtension: 34, swiss_ball_ez_bar_lying_triceps_extension: 34, swissBallEzBarOverheadTricepsExtension: 35, swiss_ball_ez_bar_overhead_triceps_extension: 35, tabletopDip: 36, tabletop_dip: 36, weightedTabletopDip: 37, weighted_tabletop_dip: 37, tricepsExtensionOnFloor: 38, triceps_extension_on_floor: 38, tricepsPressdown: 39, triceps_pressdown: 39, weightedDip: 40, weighted_dip: 40, _min: 0, _max: 40 }, warm_up_exercise_name: { quadrupedRocking: 0, quadruped_rocking: 0, neckTilts: 1, neck_tilts: 1, ankleCircles: 2, ankle_circles: 2, ankleDorsiflexionWithBand: 3, ankle_dorsiflexion_with_band: 3, ankleInternalRotation: 4, ankle_internal_rotation: 4, armCircles: 5, arm_circles: 5, bentOverReachToSky: 6, bent_over_reach_to_sky: 6, catCamel: 7, cat_camel: 7, elbowToFootLunge: 8, elbow_to_foot_lunge: 8, forwardAndBackwardLegSwings: 9, forward_and_backward_leg_swings: 9, groiners: 10, invertedHamstringStretch: 11, inverted_hamstring_stretch: 11, lateralDuckUnder: 12, lateral_duck_under: 12, neckRotations: 13, neck_rotations: 13, oppositeArmAndLegBalance: 14, opposite_arm_and_leg_balance: 14, reachRollAndLift: 15, reach_roll_and_lift: 15, scorpion: 16, shoulderCircles: 17, shoulder_circles: 17, sideToSideLegSwings: 18, side_to_side_leg_swings: 18, sleeperStretch: 19, sleeper_stretch: 19, slideOut: 20, slide_out: 20, swissBallHipCrossover: 21, swiss_ball_hip_crossover: 21, swissBallReachRollAndLift: 22, swiss_ball_reach_roll_and_lift: 22, swissBallWindshieldWipers: 23, swiss_ball_windshield_wipers: 23, thoracicRotation: 24, thoracic_rotation: 24, walkingHighKicks: 25, walking_high_kicks: 25, walkingHighKnees: 26, walking_high_knees: 26, walkingKneeHugs: 27, walking_knee_hugs: 27, walkingLegCradles: 28, walking_leg_cradles: 28, walkout: 29, walkoutFromPushUpPosition: 30, walkout_from_push_up_position: 30, _min: 0, _max: 30 }, run_exercise_name: { run: 0, walk: 1, jog: 2, sprint: 3, _min: 0, _max: 3 }, water_type: { fresh: 0, salt: 1, en13319: 2, custom: 3, _min: 0, _max: 3 }, tissue_model_type: { zhl16c: 0, _min: 0, _max: 0 }, dive_gas_status: { disabled: 0, enabled: 1, backupOnly: 2, backup_only: 2, _min: 0, _max: 2 }, dive_alert: { ndlReached: 0, ndl_reached: 0, gasSwitchPrompted: 1, gas_switch_prompted: 1, nearSurface: 2, near_surface: 2, approachingNdl: 3, approaching_ndl: 3, po2Warn: 4, po2CritHigh: 5, po2CritLow: 6, timeAlert: 7, time_alert: 7, depthAlert: 8, depth_alert: 8, decoCeilingBroken: 9, deco_ceiling_broken: 9, decoComplete: 10, deco_complete: 10, safetyStopBroken: 11, safety_stop_broken: 11, safetyStopComplete: 12, safety_stop_complete: 12, cnsWarning: 13, cns_warning: 13, cnsCritical: 14, cns_critical: 14, otuWarning: 15, otu_warning: 15, otuCritical: 16, otu_critical: 16, ascentCritical: 17, ascent_critical: 17, alertDismissedByKey: 18, alert_dismissed_by_key: 18, alertDismissedByTimeout: 19, alert_dismissed_by_timeout: 19, batteryLow: 20, battery_low: 20, batteryCritical: 21, battery_critical: 21, safetyStopStarted: 22, safety_stop_started: 22, approachingFirstDecoStop: 23, approaching_first_deco_stop: 23, setpointSwitchAutoLow: 24, setpoint_switch_auto_low: 24, setpointSwitchAutoHigh: 25, setpoint_switch_auto_high: 25, setpointSwitchManualLow: 26, setpoint_switch_manual_low: 26, setpointSwitchManualHigh: 27, setpoint_switch_manual_high: 27, autoSetpointSwitchIgnored: 28, auto_setpoint_switch_ignored: 28, switchedToOpenCircuit: 29, switched_to_open_circuit: 29, switchedToClosedCircuit: 30, switched_to_closed_circuit: 30, tankBatteryLow: 32, tank_battery_low: 32, po2CcrDilLow: 33, decoStopCleared: 34, deco_stop_cleared: 34, apneaNeutralBuoyancy: 35, apnea_neutral_buoyancy: 35, apneaTargetDepth: 36, apnea_target_depth: 36, apneaSurface: 37, apnea_surface: 37, apneaHighSpeed: 38, apnea_high_speed: 38, apneaLowSpeed: 39, apnea_low_speed: 39, _min: 0, _max: 39 }, dive_alarm_type: { depth: 0, time: 1, speed: 2, _min: 0, _max: 2 }, dive_backlight_mode: { atDepth: 0, at_depth: 0, alwaysOn: 1, always_on: 1, _min: 0, _max: 1 }, sleep_level: { unmeasurable: 0, awake: 1, light: 2, deep: 3, rem: 4, _min: 0, _max: 4 }, spo2_measurement_type: { offWrist: 0, off_wrist: 0, spotCheck: 1, spot_check: 1, continuousCheck: 2, continuous_check: 2, periodic: 3, _min: 0, _max: 3 }, ccr_setpoint_switch_mode: { manual: 0, automatic: 1, _min: 0, _max: 1 }, dive_gas_mode: { openCircuit: 0, open_circuit: 0, closedCircuitDiluent: 1, closed_circuit_diluent: 1, _min: 0, _max: 1 }, projectile_type: { arrow: 0, rifleCartridge: 1, rifle_cartridge: 1, pistolCartridge: 2, pistol_cartridge: 2, shotshell: 3, airRiflePellet: 4, air_rifle_pellet: 4, other: 5, _min: 0, _max: 5 }, favero_product: { assiomaUno: 10, assioma_uno: 10, assiomaDuo: 12, assioma_duo: 12, _min: 10, _max: 12 }, split_type: { ascentSplit: 1, ascent_split: 1, descentSplit: 2, descent_split: 2, intervalActive: 3, interval_active: 3, intervalRest: 4, interval_rest: 4, intervalWarmup: 5, interval_warmup: 5, intervalCooldown: 6, interval_cooldown: 6, intervalRecovery: 7, interval_recovery: 7, intervalOther: 8, interval_other: 8, climbActive: 9, climb_active: 9, climbRest: 10, climb_rest: 10, surfActive: 11, surf_active: 11, runActive: 12, run_active: 12, runRest: 13, run_rest: 13, workoutRound: 14, workout_round: 14, rwdRun: 17, rwd_run: 17, rwdWalk: 18, rwd_walk: 18, windsurfActive: 21, windsurf_active: 21, rwdStand: 22, rwd_stand: 22, transition: 23, skiLiftSplit: 28, ski_lift_split: 28, skiRunSplit: 29, ski_run_split: 29, _min: 1, _max: 29 }, climb_pro_event: { approach: 0, start: 1, complete: 2, _min: 0, _max: 2 }, gas_consumption_rate_type: { pressureSac: 0, pressure_sac: 0, volumeSac: 1, volume_sac: 1, rmv: 2, _min: 0, _max: 2 }, tap_sensitivity: { high: 0, medium: 1, low: 2, _min: 0, _max: 2 }, radar_threat_level_type: { threatUnknown: 0, threat_unknown: 0, threatNone: 1, threat_none: 1, threatApproaching: 2, threat_approaching: 2, threatApproachingFast: 3, threat_approaching_fast: 3, _min: 0, _max: 3 }, max_met_speed_source: { onboardGps: 0, onboard_gps: 0, connectedGps: 1, connected_gps: 1, cadence: 2, _min: 0, _max: 2 }, max_met_heart_rate_source: { whr: 0, hrm: 1, _min: 0, _max: 1 }, hrv_status: { none: 0, poor: 1, low: 2, unbalanced: 3, balanced: 4, _min: 0, _max: 4 }, no_fly_time_mode: { standard: 0, flat24Hours: 1, _min: 0, _max: 1 } };
      var A = { file_id: { value: 0, name: "file_id", fields: { type: { num: 0, name: "type", type: "file", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, manufacturer: { num: 1, name: "manufacturer", type: "manufacturer", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, product: { num: 2, name: "product", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "favero_product", type: "favero_product", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "manufacturer", value: 263 }] }, { name: "garmin_product", type: "garmin_product", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "manufacturer", value: 1 }, { name: "manufacturer", value: 15 }, { name: "manufacturer", value: 13 }, { name: "manufacturer", value: 89 }] }] }, serial_number: { num: 3, name: "serial_number", type: "uint32z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_created: { num: 4, name: "time_created", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, number: { num: 5, name: "number", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, product_name: { num: 8, name: "product_name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, capabilities: { value: 1, name: "capabilities", fields: { languages: { num: 0, name: "languages", type: "uint8z", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sports: { num: 1, name: "sports", type: "sport_bits0", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, workouts_supported: { num: 21, name: "workouts_supported", type: "workout_capabilities", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, connectivity_supported: { num: 23, name: "connectivity_supported", type: "connectivity_capabilities", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, device_settings: { value: 2, name: "device_settings", fields: { active_time_zone: { num: 0, name: "active_time_zone", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, utc_offset: { num: 1, name: "utc_offset", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_offset: { num: 2, name: "time_offset", type: "uint32", array: "true", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_mode: { num: 4, name: "time_mode", type: "time_mode", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_zone_offset: { num: 5, name: "time_zone_offset", type: "sint8", array: "true", scale: 4, offset: 0, units: "hr", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, backlight_mode: { num: 12, name: "backlight_mode", type: "backlight_mode", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, activity_tracker_enabled: { num: 36, name: "activity_tracker_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, clock_time: { num: 39, name: "clock_time", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pages_enabled: { num: 40, name: "pages_enabled", type: "uint16", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, move_alert_enabled: { num: 46, name: "move_alert_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, date_mode: { num: 47, name: "date_mode", type: "date_mode", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, display_orientation: { num: 55, name: "display_orientation", type: "display_orientation", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mounting_side: { num: 56, name: "mounting_side", type: "side", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, default_page: { num: 57, name: "default_page", type: "uint16", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, autosync_min_steps: { num: 58, name: "autosync_min_steps", type: "uint16", array: "false", scale: 1, offset: 0, units: "steps", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, autosync_min_time: { num: 59, name: "autosync_min_time", type: "uint16", array: "false", scale: 1, offset: 0, units: "minutes", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, lactate_threshold_autodetect_enabled: { num: 80, name: "lactate_threshold_autodetect_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ble_auto_upload_enabled: { num: 86, name: "ble_auto_upload_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, auto_sync_frequency: { num: 89, name: "auto_sync_frequency", type: "auto_sync_frequency", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, auto_activity_detect: { num: 90, name: "auto_activity_detect", type: "auto_activity_detect", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, number_of_screens: { num: 94, name: "number_of_screens", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, smart_notification_display_orientation: { num: 95, name: "smart_notification_display_orientation", type: "display_orientation", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, tap_interface: { num: 134, name: "tap_interface", type: "switch", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, tap_sensitivity: { num: 174, name: "tap_sensitivity", type: "tap_sensitivity", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, user_profile: { value: 3, name: "user_profile", fields: { friendly_name: { num: 0, name: "friendly_name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, gender: { num: 1, name: "gender", type: "gender", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, age: { num: 2, name: "age", type: "uint8", array: "false", scale: 1, offset: 0, units: "years", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, height: { num: 3, name: "height", type: "uint8", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, weight: { num: 4, name: "weight", type: "uint16", array: "false", scale: 10, offset: 0, units: "kg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, language: { num: 5, name: "language", type: "language", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, elev_setting: { num: 6, name: "elev_setting", type: "display_measure", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, weight_setting: { num: 7, name: "weight_setting", type: "display_measure", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, resting_heart_rate: { num: 8, name: "resting_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, default_max_running_heart_rate: { num: 9, name: "default_max_running_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, default_max_biking_heart_rate: { num: 10, name: "default_max_biking_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, default_max_heart_rate: { num: 11, name: "default_max_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, hr_setting: { num: 12, name: "hr_setting", type: "display_heart", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, speed_setting: { num: 13, name: "speed_setting", type: "display_measure", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, dist_setting: { num: 14, name: "dist_setting", type: "display_measure", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, power_setting: { num: 16, name: "power_setting", type: "display_power", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, activity_class: { num: 17, name: "activity_class", type: "activity_class", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, position_setting: { num: 18, name: "position_setting", type: "display_position", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, temperature_setting: { num: 21, name: "temperature_setting", type: "display_measure", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, local_id: { num: 22, name: "local_id", type: "user_local_id", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, global_id: { num: 23, name: "global_id", type: "byte", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, wake_time: { num: 28, name: "wake_time", type: "localtime_into_day", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sleep_time: { num: 29, name: "sleep_time", type: "localtime_into_day", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, height_setting: { num: 30, name: "height_setting", type: "display_measure", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, user_running_step_length: { num: 31, name: "user_running_step_length", type: "uint16", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, user_walking_step_length: { num: 32, name: "user_walking_step_length", type: "uint16", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, depth_setting: { num: 47, name: "depth_setting", type: "display_measure", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, dive_count: { num: 49, name: "dive_count", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hrm_profile: { value: 4, name: "hrm_profile", fields: { enabled: { num: 0, name: "enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, hrm_ant_id: { num: 1, name: "hrm_ant_id", type: "uint16z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, log_hrv: { num: 2, name: "log_hrv", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, hrm_ant_id_trans_type: { num: 3, name: "hrm_ant_id_trans_type", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, sdm_profile: { value: 5, name: "sdm_profile", fields: { enabled: { num: 0, name: "enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sdm_ant_id: { num: 1, name: "sdm_ant_id", type: "uint16z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sdm_cal_factor: { num: 2, name: "sdm_cal_factor", type: "uint16", array: "false", scale: 10, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, odometer: { num: 3, name: "odometer", type: "uint32", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, speed_source: { num: 4, name: "speed_source", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sdm_ant_id_trans_type: { num: 5, name: "sdm_ant_id_trans_type", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, odometer_rollover: { num: 7, name: "odometer_rollover", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, bike_profile: { value: 6, name: "bike_profile", fields: { name: { num: 0, name: "name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sport: { num: 1, name: "sport", type: "sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sub_sport: { num: 2, name: "sub_sport", type: "sub_sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, odometer: { num: 3, name: "odometer", type: "uint32", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bike_spd_ant_id: { num: 4, name: "bike_spd_ant_id", type: "uint16z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bike_cad_ant_id: { num: 5, name: "bike_cad_ant_id", type: "uint16z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bike_spdcad_ant_id: { num: 6, name: "bike_spdcad_ant_id", type: "uint16z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bike_power_ant_id: { num: 7, name: "bike_power_ant_id", type: "uint16z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, custom_wheelsize: { num: 8, name: "custom_wheelsize", type: "uint16", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, auto_wheelsize: { num: 9, name: "auto_wheelsize", type: "uint16", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bike_weight: { num: 10, name: "bike_weight", type: "uint16", array: "false", scale: 10, offset: 0, units: "kg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, power_cal_factor: { num: 11, name: "power_cal_factor", type: "uint16", array: "false", scale: 10, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, auto_wheel_cal: { num: 12, name: "auto_wheel_cal", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, auto_power_zero: { num: 13, name: "auto_power_zero", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, id: { num: 14, name: "id", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, spd_enabled: { num: 15, name: "spd_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, cad_enabled: { num: 16, name: "cad_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, spdcad_enabled: { num: 17, name: "spdcad_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, power_enabled: { num: 18, name: "power_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, crank_length: { num: 19, name: "crank_length", type: "uint8", array: "false", scale: 2, offset: -110, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enabled: { num: 20, name: "enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bike_spd_ant_id_trans_type: { num: 21, name: "bike_spd_ant_id_trans_type", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bike_cad_ant_id_trans_type: { num: 22, name: "bike_cad_ant_id_trans_type", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bike_spdcad_ant_id_trans_type: { num: 23, name: "bike_spdcad_ant_id_trans_type", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bike_power_ant_id_trans_type: { num: 24, name: "bike_power_ant_id_trans_type", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, odometer_rollover: { num: 37, name: "odometer_rollover", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, front_gear_num: { num: 38, name: "front_gear_num", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, front_gear: { num: 39, name: "front_gear", type: "uint8z", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, rear_gear_num: { num: 40, name: "rear_gear_num", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, rear_gear: { num: 41, name: "rear_gear", type: "uint8z", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, shimano_di2_enabled: { num: 44, name: "shimano_di2_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, zones_target: { value: 7, name: "zones_target", fields: { max_heart_rate: { num: 1, name: "max_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, threshold_heart_rate: { num: 2, name: "threshold_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, functional_threshold_power: { num: 3, name: "functional_threshold_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, hr_calc_type: { num: 5, name: "hr_calc_type", type: "hr_zone_calc", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pwr_calc_type: { num: 7, name: "pwr_calc_type", type: "pwr_zone_calc", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hr_zone: { value: 8, name: "hr_zone", fields: { high_bpm: { num: 1, name: "high_bpm", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, name: { num: 2, name: "name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, power_zone: { value: 9, name: "power_zone", fields: { high_value: { num: 1, name: "high_value", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, name: { num: 2, name: "name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, met_zone: { value: 10, name: "met_zone", fields: { high_bpm: { num: 1, name: "high_bpm", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calories: { num: 2, name: "calories", type: "uint16", array: "false", scale: 10, offset: 0, units: "kcal / min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, fat_calories: { num: 3, name: "fat_calories", type: "uint8", array: "false", scale: 10, offset: 0, units: "kcal / min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, sport: { value: 12, name: "sport", fields: { sport: { num: 0, name: "sport", type: "sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sub_sport: { num: 1, name: "sub_sport", type: "sub_sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, name: { num: 3, name: "name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, goal: { value: 15, name: "goal", fields: { sport: { num: 0, name: "sport", type: "sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sub_sport: { num: 1, name: "sub_sport", type: "sub_sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_date: { num: 2, name: "start_date", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_date: { num: 3, name: "end_date", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, type: { num: 4, name: "type", type: "goal", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, value: { num: 5, name: "value", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, repeat: { num: 6, name: "repeat", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, target_value: { num: 7, name: "target_value", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, recurrence: { num: 8, name: "recurrence", type: "goal_recurrence", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, recurrence_value: { num: 9, name: "recurrence_value", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enabled: { num: 10, name: "enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, source: { num: 11, name: "source", type: "goal_source", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, session: { value: 18, name: "session", fields: { event: { num: 0, name: "event", type: "event", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, event_type: { num: 1, name: "event_type", type: "event_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_time: { num: 2, name: "start_time", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_position_lat: { num: 3, name: "start_position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_position_long: { num: 4, name: "start_position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sport: { num: 5, name: "sport", type: "sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sub_sport: { num: 6, name: "sub_sport", type: "sub_sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_elapsed_time: { num: 7, name: "total_elapsed_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_timer_time: { num: 8, name: "total_timer_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_distance: { num: 9, name: "total_distance", type: "uint32", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_cycles: { num: 10, name: "total_cycles", type: "uint32", array: "false", scale: 1, offset: 0, units: "cycles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "total_strides", type: "uint32", array: "", scale: 1, offset: 0, units: "strides", bits: [], components: [], hasComponents: false, map: [{ name: "sport", value: 1 }, { name: "sport", value: 11 }] }, { name: "total_strokes", type: "uint32", array: "", scale: 1, offset: 0, units: "strokes", bits: [], components: [], hasComponents: false, map: [{ name: "sport", value: 2 }, { name: "sport", value: 5 }, { name: "sport", value: 15 }, { name: "sport", value: 37 }] }] }, total_calories: { num: 11, name: "total_calories", type: "uint16", array: "false", scale: 1, offset: 0, units: "kcal", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_fat_calories: { num: 13, name: "total_fat_calories", type: "uint16", array: "false", scale: 1, offset: 0, units: "kcal", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_speed: { num: 14, name: "avg_speed", type: "uint16", array: "false", scale: [1e3], offset: [0], units: ["m/s"], bits: [16], components: ["124"], isAccumulated: false, hasComponents: true, subFields: [] }, max_speed: { num: 15, name: "max_speed", type: "uint16", array: "false", scale: [1e3], offset: [0], units: ["m/s"], bits: [16], components: ["125"], isAccumulated: false, hasComponents: true, subFields: [] }, avg_heart_rate: { num: 16, name: "avg_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_heart_rate: { num: 17, name: "max_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_cadence: { num: 18, name: "avg_cadence", type: "uint8", array: "false", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "avg_running_cadence", type: "uint8", array: "", scale: 1, offset: 0, units: "strides/min", bits: [], components: [], hasComponents: false, map: [{ name: "sport", value: 1 }] }] }, max_cadence: { num: 19, name: "max_cadence", type: "uint8", array: "false", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "max_running_cadence", type: "uint8", array: "", scale: 1, offset: 0, units: "strides/min", bits: [], components: [], hasComponents: false, map: [{ name: "sport", value: 1 }] }] }, avg_power: { num: 20, name: "avg_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_power: { num: 21, name: "max_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_ascent: { num: 22, name: "total_ascent", type: "uint16", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_descent: { num: 23, name: "total_descent", type: "uint16", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_training_effect: { num: 24, name: "total_training_effect", type: "uint8", array: "false", scale: 10, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, first_lap_index: { num: 25, name: "first_lap_index", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, num_laps: { num: 26, name: "num_laps", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, event_group: { num: 27, name: "event_group", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, trigger: { num: 28, name: "trigger", type: "session_trigger", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, nec_lat: { num: 29, name: "nec_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, nec_long: { num: 30, name: "nec_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, swc_lat: { num: 31, name: "swc_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, swc_long: { num: 32, name: "swc_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, num_lengths: { num: 33, name: "num_lengths", type: "uint16", array: "false", scale: 1, offset: 0, units: "lengths", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, normalized_power: { num: 34, name: "normalized_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, training_stress_score: { num: 35, name: "training_stress_score", type: "uint16", array: "false", scale: 10, offset: 0, units: "tss", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, intensity_factor: { num: 36, name: "intensity_factor", type: "uint16", array: "false", scale: 1e3, offset: 0, units: "if", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, left_right_balance: { num: 37, name: "left_right_balance", type: "left_right_balance100", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_position_lat: { num: 38, name: "end_position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_position_long: { num: 39, name: "end_position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_stroke_count: { num: 41, name: "avg_stroke_count", type: "uint32", array: "false", scale: 10, offset: 0, units: "strokes/lap", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_stroke_distance: { num: 42, name: "avg_stroke_distance", type: "uint16", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, swim_stroke: { num: 43, name: "swim_stroke", type: "swim_stroke", array: "false", scale: 1, offset: 0, units: "swim_stroke", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pool_length: { num: 44, name: "pool_length", type: "uint16", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, threshold_power: { num: 45, name: "threshold_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pool_length_unit: { num: 46, name: "pool_length_unit", type: "display_measure", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, num_active_lengths: { num: 47, name: "num_active_lengths", type: "uint16", array: "false", scale: 1, offset: 0, units: "lengths", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_work: { num: 48, name: "total_work", type: "uint32", array: "false", scale: 1, offset: 0, units: "J", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_altitude: { num: 49, name: "avg_altitude", type: "uint16", array: "false", scale: [5], offset: [500], units: ["m"], bits: [16], components: ["126"], isAccumulated: false, hasComponents: true, subFields: [] }, max_altitude: { num: 50, name: "max_altitude", type: "uint16", array: "false", scale: [5], offset: [500], units: ["m"], bits: [16], components: ["128"], isAccumulated: false, hasComponents: true, subFields: [] }, gps_accuracy: { num: 51, name: "gps_accuracy", type: "uint8", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_grade: { num: 52, name: "avg_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_pos_grade: { num: 53, name: "avg_pos_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_neg_grade: { num: 54, name: "avg_neg_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_pos_grade: { num: 55, name: "max_pos_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_neg_grade: { num: 56, name: "max_neg_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_temperature: { num: 57, name: "avg_temperature", type: "sint8", array: "false", scale: 1, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_temperature: { num: 58, name: "max_temperature", type: "sint8", array: "false", scale: 1, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_moving_time: { num: 59, name: "total_moving_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_pos_vertical_speed: { num: 60, name: "avg_pos_vertical_speed", type: "sint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_neg_vertical_speed: { num: 61, name: "avg_neg_vertical_speed", type: "sint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_pos_vertical_speed: { num: 62, name: "max_pos_vertical_speed", type: "sint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_neg_vertical_speed: { num: 63, name: "max_neg_vertical_speed", type: "sint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, min_heart_rate: { num: 64, name: "min_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_hr_zone: { num: 65, name: "time_in_hr_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_speed_zone: { num: 66, name: "time_in_speed_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_cadence_zone: { num: 67, name: "time_in_cadence_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_power_zone: { num: 68, name: "time_in_power_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_lap_time: { num: 69, name: "avg_lap_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, best_lap_index: { num: 70, name: "best_lap_index", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, min_altitude: { num: 71, name: "min_altitude", type: "uint16", array: "false", scale: [5], offset: [500], units: ["m"], bits: [16], components: ["127"], isAccumulated: false, hasComponents: true, subFields: [] }, player_score: { num: 82, name: "player_score", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, opponent_score: { num: 83, name: "opponent_score", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, opponent_name: { num: 84, name: "opponent_name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, stroke_count: { num: 85, name: "stroke_count", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, zone_count: { num: 86, name: "zone_count", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_ball_speed: { num: 87, name: "max_ball_speed", type: "uint16", array: "false", scale: 100, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_ball_speed: { num: 88, name: "avg_ball_speed", type: "uint16", array: "false", scale: 100, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_vertical_oscillation: { num: 89, name: "avg_vertical_oscillation", type: "uint16", array: "false", scale: 10, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_stance_time_percent: { num: 90, name: "avg_stance_time_percent", type: "uint16", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_stance_time: { num: 91, name: "avg_stance_time", type: "uint16", array: "false", scale: 10, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_fractional_cadence: { num: 92, name: "avg_fractional_cadence", type: "uint8", array: "false", scale: 128, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_fractional_cadence: { num: 93, name: "max_fractional_cadence", type: "uint8", array: "false", scale: 128, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_fractional_cycles: { num: 94, name: "total_fractional_cycles", type: "uint8", array: "false", scale: 128, offset: 0, units: "cycles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_total_hemoglobin_conc: { num: 95, name: "avg_total_hemoglobin_conc", type: "uint16", array: "true", scale: 100, offset: 0, units: "g/dL", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, min_total_hemoglobin_conc: { num: 96, name: "min_total_hemoglobin_conc", type: "uint16", array: "true", scale: 100, offset: 0, units: "g/dL", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_total_hemoglobin_conc: { num: 97, name: "max_total_hemoglobin_conc", type: "uint16", array: "true", scale: 100, offset: 0, units: "g/dL", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_saturated_hemoglobin_percent: { num: 98, name: "avg_saturated_hemoglobin_percent", type: "uint16", array: "true", scale: 10, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, min_saturated_hemoglobin_percent: { num: 99, name: "min_saturated_hemoglobin_percent", type: "uint16", array: "true", scale: 10, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_saturated_hemoglobin_percent: { num: 100, name: "max_saturated_hemoglobin_percent", type: "uint16", array: "true", scale: 10, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_torque_effectiveness: { num: 101, name: "avg_left_torque_effectiveness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_torque_effectiveness: { num: 102, name: "avg_right_torque_effectiveness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_pedal_smoothness: { num: 103, name: "avg_left_pedal_smoothness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_pedal_smoothness: { num: 104, name: "avg_right_pedal_smoothness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_combined_pedal_smoothness: { num: 105, name: "avg_combined_pedal_smoothness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sport_profile_name: { num: 110, name: "sport_profile_name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sport_index: { num: 111, name: "sport_index", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_standing: { num: 112, name: "time_standing", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, stand_count: { num: 113, name: "stand_count", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_pco: { num: 114, name: "avg_left_pco", type: "sint8", array: "false", scale: 1, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_pco: { num: 115, name: "avg_right_pco", type: "sint8", array: "false", scale: 1, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_power_phase: { num: 116, name: "avg_left_power_phase", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_power_phase_peak: { num: 117, name: "avg_left_power_phase_peak", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_power_phase: { num: 118, name: "avg_right_power_phase", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_power_phase_peak: { num: 119, name: "avg_right_power_phase_peak", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_power_position: { num: 120, name: "avg_power_position", type: "uint16", array: "true", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_power_position: { num: 121, name: "max_power_position", type: "uint16", array: "true", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_cadence_position: { num: 122, name: "avg_cadence_position", type: "uint8", array: "true", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_cadence_position: { num: 123, name: "max_cadence_position", type: "uint8", array: "true", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_avg_speed: { num: 124, name: "enhanced_avg_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_max_speed: { num: 125, name: "enhanced_max_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_avg_altitude: { num: 126, name: "enhanced_avg_altitude", type: "uint32", array: "false", scale: 5, offset: 500, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_min_altitude: { num: 127, name: "enhanced_min_altitude", type: "uint32", array: "false", scale: 5, offset: 500, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_max_altitude: { num: 128, name: "enhanced_max_altitude", type: "uint32", array: "false", scale: 5, offset: 500, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_lev_motor_power: { num: 129, name: "avg_lev_motor_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_lev_motor_power: { num: 130, name: "max_lev_motor_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, lev_battery_consumption: { num: 131, name: "lev_battery_consumption", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_vertical_ratio: { num: 132, name: "avg_vertical_ratio", type: "uint16", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_stance_time_balance: { num: 133, name: "avg_stance_time_balance", type: "uint16", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_step_length: { num: 134, name: "avg_step_length", type: "uint16", array: "false", scale: 10, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_anaerobic_training_effect: { num: 137, name: "total_anaerobic_training_effect", type: "uint8", array: "false", scale: 10, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_vam: { num: 139, name: "avg_vam", type: "uint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_depth: { num: 140, name: "avg_depth", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_depth: { num: 141, name: "max_depth", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, surface_interval: { num: 142, name: "surface_interval", type: "uint32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_cns: { num: 143, name: "start_cns", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_cns: { num: 144, name: "end_cns", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_n2: { num: 145, name: "start_n2", type: "uint16", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_n2: { num: 146, name: "end_n2", type: "uint16", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_respiration_rate: { num: 147, name: "avg_respiration_rate", type: "uint8", array: "false", scale: [1], offset: [0], units: [""], bits: [8], components: ["169"], isAccumulated: false, hasComponents: true, subFields: [] }, max_respiration_rate: { num: 148, name: "max_respiration_rate", type: "uint8", array: "false", scale: [1], offset: [0], units: [""], bits: [8], components: ["170"], isAccumulated: false, hasComponents: true, subFields: [] }, min_respiration_rate: { num: 149, name: "min_respiration_rate", type: "uint8", array: "false", scale: [1], offset: [0], units: [""], bits: [8], components: ["180"], isAccumulated: false, hasComponents: true, subFields: [] }, min_temperature: { num: 150, name: "min_temperature", type: "sint8", array: "false", scale: 1, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, o2_toxicity: { num: 155, name: "o2_toxicity", type: "uint16", array: "false", scale: 1, offset: 0, units: "OTUs", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, dive_number: { num: 156, name: "dive_number", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, training_load_peak: { num: 168, name: "training_load_peak", type: "sint32", array: "false", scale: 65536, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_avg_respiration_rate: { num: 169, name: "enhanced_avg_respiration_rate", type: "uint16", array: "false", scale: 100, offset: 0, units: "Breaths/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_max_respiration_rate: { num: 170, name: "enhanced_max_respiration_rate", type: "uint16", array: "false", scale: 100, offset: 0, units: "Breaths/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_min_respiration_rate: { num: 180, name: "enhanced_min_respiration_rate", type: "uint16", array: "false", scale: 100, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_grit: { num: 181, name: "total_grit", type: "float32", array: "false", scale: 1, offset: 0, units: "kGrit", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_flow: { num: 182, name: "total_flow", type: "float32", array: "false", scale: 1, offset: 0, units: "Flow", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, jump_count: { num: 183, name: "jump_count", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_grit: { num: 186, name: "avg_grit", type: "float32", array: "false", scale: 1, offset: 0, units: "kGrit", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_flow: { num: 187, name: "avg_flow", type: "float32", array: "false", scale: 1, offset: 0, units: "Flow", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, workout_feel: { num: 192, name: "workout_feel", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, workout_rpe: { num: 193, name: "workout_rpe", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_spo2: { num: 194, name: "avg_spo2", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_stress: { num: 195, name: "avg_stress", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sdrr_hrv: { num: 197, name: "sdrr_hrv", type: "uint8", array: "false", scale: 1, offset: 0, units: "mS", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, rmssd_hrv: { num: 198, name: "rmssd_hrv", type: "uint8", array: "false", scale: 1, offset: 0, units: "mS", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_fractional_ascent: { num: 199, name: "total_fractional_ascent", type: "uint8", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_fractional_descent: { num: 200, name: "total_fractional_descent", type: "uint8", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_core_temperature: { num: 208, name: "avg_core_temperature", type: "uint16", array: "false", scale: 100, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, min_core_temperature: { num: 209, name: "min_core_temperature", type: "uint16", array: "false", scale: 100, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_core_temperature: { num: 210, name: "max_core_temperature", type: "uint16", array: "false", scale: 100, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, lap: { value: 19, name: "lap", fields: { event: { num: 0, name: "event", type: "event", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, event_type: { num: 1, name: "event_type", type: "event_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_time: { num: 2, name: "start_time", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_position_lat: { num: 3, name: "start_position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_position_long: { num: 4, name: "start_position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_position_lat: { num: 5, name: "end_position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_position_long: { num: 6, name: "end_position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_elapsed_time: { num: 7, name: "total_elapsed_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_timer_time: { num: 8, name: "total_timer_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_distance: { num: 9, name: "total_distance", type: "uint32", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_cycles: { num: 10, name: "total_cycles", type: "uint32", array: "false", scale: 1, offset: 0, units: "cycles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "total_strides", type: "uint32", array: "", scale: 1, offset: 0, units: "strides", bits: [], components: [], hasComponents: false, map: [{ name: "sport", value: 1 }, { name: "sport", value: 11 }] }, { name: "total_strokes", type: "uint32", array: "", scale: 1, offset: 0, units: "strokes", bits: [], components: [], hasComponents: false, map: [{ name: "sport", value: 2 }, { name: "sport", value: 5 }, { name: "sport", value: 15 }, { name: "sport", value: 37 }] }] }, total_calories: { num: 11, name: "total_calories", type: "uint16", array: "false", scale: 1, offset: 0, units: "kcal", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_fat_calories: { num: 12, name: "total_fat_calories", type: "uint16", array: "false", scale: 1, offset: 0, units: "kcal", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_speed: { num: 13, name: "avg_speed", type: "uint16", array: "false", scale: [1e3], offset: [0], units: ["m/s"], bits: [16], components: ["110"], isAccumulated: false, hasComponents: true, subFields: [] }, max_speed: { num: 14, name: "max_speed", type: "uint16", array: "false", scale: [1e3], offset: [0], units: ["m/s"], bits: [16], components: ["111"], isAccumulated: false, hasComponents: true, subFields: [] }, avg_heart_rate: { num: 15, name: "avg_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_heart_rate: { num: 16, name: "max_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_cadence: { num: 17, name: "avg_cadence", type: "uint8", array: "false", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "avg_running_cadence", type: "uint8", array: "", scale: 1, offset: 0, units: "strides/min", bits: [], components: [], hasComponents: false, map: [{ name: "sport", value: 1 }] }] }, max_cadence: { num: 18, name: "max_cadence", type: "uint8", array: "false", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "max_running_cadence", type: "uint8", array: "", scale: 1, offset: 0, units: "strides/min", bits: [], components: [], hasComponents: false, map: [{ name: "sport", value: 1 }] }] }, avg_power: { num: 19, name: "avg_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_power: { num: 20, name: "max_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_ascent: { num: 21, name: "total_ascent", type: "uint16", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_descent: { num: 22, name: "total_descent", type: "uint16", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, intensity: { num: 23, name: "intensity", type: "intensity", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, lap_trigger: { num: 24, name: "lap_trigger", type: "lap_trigger", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sport: { num: 25, name: "sport", type: "sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, event_group: { num: 26, name: "event_group", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, num_lengths: { num: 32, name: "num_lengths", type: "uint16", array: "false", scale: 1, offset: 0, units: "lengths", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, normalized_power: { num: 33, name: "normalized_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, left_right_balance: { num: 34, name: "left_right_balance", type: "left_right_balance100", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, first_length_index: { num: 35, name: "first_length_index", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_stroke_distance: { num: 37, name: "avg_stroke_distance", type: "uint16", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, swim_stroke: { num: 38, name: "swim_stroke", type: "swim_stroke", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sub_sport: { num: 39, name: "sub_sport", type: "sub_sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, num_active_lengths: { num: 40, name: "num_active_lengths", type: "uint16", array: "false", scale: 1, offset: 0, units: "lengths", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_work: { num: 41, name: "total_work", type: "uint32", array: "false", scale: 1, offset: 0, units: "J", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_altitude: { num: 42, name: "avg_altitude", type: "uint16", array: "false", scale: [5], offset: [500], units: ["m"], bits: [16], components: ["112"], isAccumulated: false, hasComponents: true, subFields: [] }, max_altitude: { num: 43, name: "max_altitude", type: "uint16", array: "false", scale: [5], offset: [500], units: ["m"], bits: [16], components: ["114"], isAccumulated: false, hasComponents: true, subFields: [] }, gps_accuracy: { num: 44, name: "gps_accuracy", type: "uint8", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_grade: { num: 45, name: "avg_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_pos_grade: { num: 46, name: "avg_pos_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_neg_grade: { num: 47, name: "avg_neg_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_pos_grade: { num: 48, name: "max_pos_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_neg_grade: { num: 49, name: "max_neg_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_temperature: { num: 50, name: "avg_temperature", type: "sint8", array: "false", scale: 1, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_temperature: { num: 51, name: "max_temperature", type: "sint8", array: "false", scale: 1, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_moving_time: { num: 52, name: "total_moving_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_pos_vertical_speed: { num: 53, name: "avg_pos_vertical_speed", type: "sint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_neg_vertical_speed: { num: 54, name: "avg_neg_vertical_speed", type: "sint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_pos_vertical_speed: { num: 55, name: "max_pos_vertical_speed", type: "sint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_neg_vertical_speed: { num: 56, name: "max_neg_vertical_speed", type: "sint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_hr_zone: { num: 57, name: "time_in_hr_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_speed_zone: { num: 58, name: "time_in_speed_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_cadence_zone: { num: 59, name: "time_in_cadence_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_power_zone: { num: 60, name: "time_in_power_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, repetition_num: { num: 61, name: "repetition_num", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, min_altitude: { num: 62, name: "min_altitude", type: "uint16", array: "false", scale: [5], offset: [500], units: ["m"], bits: [16], components: ["113"], isAccumulated: false, hasComponents: true, subFields: [] }, min_heart_rate: { num: 63, name: "min_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, wkt_step_index: { num: 71, name: "wkt_step_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, opponent_score: { num: 74, name: "opponent_score", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, stroke_count: { num: 75, name: "stroke_count", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, zone_count: { num: 76, name: "zone_count", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_vertical_oscillation: { num: 77, name: "avg_vertical_oscillation", type: "uint16", array: "false", scale: 10, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_stance_time_percent: { num: 78, name: "avg_stance_time_percent", type: "uint16", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_stance_time: { num: 79, name: "avg_stance_time", type: "uint16", array: "false", scale: 10, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_fractional_cadence: { num: 80, name: "avg_fractional_cadence", type: "uint8", array: "false", scale: 128, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_fractional_cadence: { num: 81, name: "max_fractional_cadence", type: "uint8", array: "false", scale: 128, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_fractional_cycles: { num: 82, name: "total_fractional_cycles", type: "uint8", array: "false", scale: 128, offset: 0, units: "cycles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, player_score: { num: 83, name: "player_score", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_total_hemoglobin_conc: { num: 84, name: "avg_total_hemoglobin_conc", type: "uint16", array: "true", scale: 100, offset: 0, units: "g/dL", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, min_total_hemoglobin_conc: { num: 85, name: "min_total_hemoglobin_conc", type: "uint16", array: "true", scale: 100, offset: 0, units: "g/dL", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_total_hemoglobin_conc: { num: 86, name: "max_total_hemoglobin_conc", type: "uint16", array: "true", scale: 100, offset: 0, units: "g/dL", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_saturated_hemoglobin_percent: { num: 87, name: "avg_saturated_hemoglobin_percent", type: "uint16", array: "true", scale: 10, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, min_saturated_hemoglobin_percent: { num: 88, name: "min_saturated_hemoglobin_percent", type: "uint16", array: "true", scale: 10, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_saturated_hemoglobin_percent: { num: 89, name: "max_saturated_hemoglobin_percent", type: "uint16", array: "true", scale: 10, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_torque_effectiveness: { num: 91, name: "avg_left_torque_effectiveness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_torque_effectiveness: { num: 92, name: "avg_right_torque_effectiveness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_pedal_smoothness: { num: 93, name: "avg_left_pedal_smoothness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_pedal_smoothness: { num: 94, name: "avg_right_pedal_smoothness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_combined_pedal_smoothness: { num: 95, name: "avg_combined_pedal_smoothness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_standing: { num: 98, name: "time_standing", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, stand_count: { num: 99, name: "stand_count", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_pco: { num: 100, name: "avg_left_pco", type: "sint8", array: "false", scale: 1, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_pco: { num: 101, name: "avg_right_pco", type: "sint8", array: "false", scale: 1, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_power_phase: { num: 102, name: "avg_left_power_phase", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_power_phase_peak: { num: 103, name: "avg_left_power_phase_peak", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_power_phase: { num: 104, name: "avg_right_power_phase", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_power_phase_peak: { num: 105, name: "avg_right_power_phase_peak", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_power_position: { num: 106, name: "avg_power_position", type: "uint16", array: "true", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_power_position: { num: 107, name: "max_power_position", type: "uint16", array: "true", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_cadence_position: { num: 108, name: "avg_cadence_position", type: "uint8", array: "true", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_cadence_position: { num: 109, name: "max_cadence_position", type: "uint8", array: "true", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_avg_speed: { num: 110, name: "enhanced_avg_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_max_speed: { num: 111, name: "enhanced_max_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_avg_altitude: { num: 112, name: "enhanced_avg_altitude", type: "uint32", array: "false", scale: 5, offset: 500, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_min_altitude: { num: 113, name: "enhanced_min_altitude", type: "uint32", array: "false", scale: 5, offset: 500, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_max_altitude: { num: 114, name: "enhanced_max_altitude", type: "uint32", array: "false", scale: 5, offset: 500, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_lev_motor_power: { num: 115, name: "avg_lev_motor_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_lev_motor_power: { num: 116, name: "max_lev_motor_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, lev_battery_consumption: { num: 117, name: "lev_battery_consumption", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_vertical_ratio: { num: 118, name: "avg_vertical_ratio", type: "uint16", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_stance_time_balance: { num: 119, name: "avg_stance_time_balance", type: "uint16", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_step_length: { num: 120, name: "avg_step_length", type: "uint16", array: "false", scale: 10, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_vam: { num: 121, name: "avg_vam", type: "uint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_depth: { num: 122, name: "avg_depth", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_depth: { num: 123, name: "max_depth", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, min_temperature: { num: 124, name: "min_temperature", type: "sint8", array: "false", scale: 1, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_avg_respiration_rate: { num: 136, name: "enhanced_avg_respiration_rate", type: "uint16", array: "false", scale: 100, offset: 0, units: "Breaths/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_max_respiration_rate: { num: 137, name: "enhanced_max_respiration_rate", type: "uint16", array: "false", scale: 100, offset: 0, units: "Breaths/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_respiration_rate: { num: 147, name: "avg_respiration_rate", type: "uint8", array: "false", scale: [1], offset: [0], units: [""], bits: [8], components: ["136"], isAccumulated: false, hasComponents: true, subFields: [] }, max_respiration_rate: { num: 148, name: "max_respiration_rate", type: "uint8", array: "false", scale: [1], offset: [0], units: [""], bits: [8], components: ["137"], isAccumulated: false, hasComponents: true, subFields: [] }, total_grit: { num: 149, name: "total_grit", type: "float32", array: "false", scale: 1, offset: 0, units: "kGrit", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_flow: { num: 150, name: "total_flow", type: "float32", array: "false", scale: 1, offset: 0, units: "Flow", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, jump_count: { num: 151, name: "jump_count", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_grit: { num: 153, name: "avg_grit", type: "float32", array: "false", scale: 1, offset: 0, units: "kGrit", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_flow: { num: 154, name: "avg_flow", type: "float32", array: "false", scale: 1, offset: 0, units: "Flow", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_fractional_ascent: { num: 156, name: "total_fractional_ascent", type: "uint8", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_fractional_descent: { num: 157, name: "total_fractional_descent", type: "uint8", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_core_temperature: { num: 158, name: "avg_core_temperature", type: "uint16", array: "false", scale: 100, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, min_core_temperature: { num: 159, name: "min_core_temperature", type: "uint16", array: "false", scale: 100, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_core_temperature: { num: 160, name: "max_core_temperature", type: "uint16", array: "false", scale: 100, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, record: { value: 20, name: "record", fields: { position_lat: { num: 0, name: "position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, position_long: { num: 1, name: "position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, altitude: { num: 2, name: "altitude", type: "uint16", array: "false", scale: [5], offset: [500], units: ["m"], bits: [16], components: ["78"], isAccumulated: false, hasComponents: true, subFields: [] }, heart_rate: { num: 3, name: "heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, cadence: { num: 4, name: "cadence", type: "uint8", array: "false", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, distance: { num: 5, name: "distance", type: "uint32", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: true, hasComponents: false, subFields: [] }, speed: { num: 6, name: "speed", type: "uint16", array: "false", scale: [1e3], offset: [0], units: ["m/s"], bits: [16], components: ["73"], isAccumulated: false, hasComponents: true, subFields: [] }, power: { num: 7, name: "power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, compressed_speed_distance: { num: 8, name: "compressed_speed_distance", type: "byte", array: "true", scale: [100, 16], offset: [0, 0], units: ["m/s", "m"], bits: [12, 12], components: ["6", "5"], isAccumulated: false, hasComponents: true, subFields: [] }, grade: { num: 9, name: "grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, resistance: { num: 10, name: "resistance", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_from_course: { num: 11, name: "time_from_course", type: "sint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, cycle_length: { num: 12, name: "cycle_length", type: "uint8", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, temperature: { num: 13, name: "temperature", type: "sint8", array: "false", scale: 1, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, speed1s: { num: 17, name: "speed1s", type: "uint8", array: "true", scale: 16, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, cycles: { num: 18, name: "cycles", type: "uint8", array: "false", scale: [1], offset: [0], units: ["cycles"], bits: [8], components: ["19"], isAccumulated: false, hasComponents: true, subFields: [] }, total_cycles: { num: 19, name: "total_cycles", type: "uint32", array: "false", scale: 1, offset: 0, units: "cycles", bits: [], components: [], isAccumulated: true, hasComponents: false, subFields: [] }, compressed_accumulated_power: { num: 28, name: "compressed_accumulated_power", type: "uint16", array: "false", scale: [1], offset: [0], units: ["watts"], bits: [16], components: ["29"], isAccumulated: false, hasComponents: true, subFields: [] }, accumulated_power: { num: 29, name: "accumulated_power", type: "uint32", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: true, hasComponents: false, subFields: [] }, left_right_balance: { num: 30, name: "left_right_balance", type: "left_right_balance", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, gps_accuracy: { num: 31, name: "gps_accuracy", type: "uint8", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, vertical_speed: { num: 32, name: "vertical_speed", type: "sint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calories: { num: 33, name: "calories", type: "uint16", array: "false", scale: 1, offset: 0, units: "kcal", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, vertical_oscillation: { num: 39, name: "vertical_oscillation", type: "uint16", array: "false", scale: 10, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, stance_time_percent: { num: 40, name: "stance_time_percent", type: "uint16", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, stance_time: { num: 41, name: "stance_time", type: "uint16", array: "false", scale: 10, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, activity_type: { num: 42, name: "activity_type", type: "activity_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, left_torque_effectiveness: { num: 43, name: "left_torque_effectiveness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, right_torque_effectiveness: { num: 44, name: "right_torque_effectiveness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, left_pedal_smoothness: { num: 45, name: "left_pedal_smoothness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, right_pedal_smoothness: { num: 46, name: "right_pedal_smoothness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, combined_pedal_smoothness: { num: 47, name: "combined_pedal_smoothness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time128: { num: 48, name: "time128", type: "uint8", array: "false", scale: 128, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, stroke_type: { num: 49, name: "stroke_type", type: "stroke_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, zone: { num: 50, name: "zone", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ball_speed: { num: 51, name: "ball_speed", type: "uint16", array: "false", scale: 100, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, cadence256: { num: 52, name: "cadence256", type: "uint16", array: "false", scale: 256, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, fractional_cadence: { num: 53, name: "fractional_cadence", type: "uint8", array: "false", scale: 128, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_hemoglobin_conc: { num: 54, name: "total_hemoglobin_conc", type: "uint16", array: "false", scale: 100, offset: 0, units: "g/dL", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_hemoglobin_conc_min: { num: 55, name: "total_hemoglobin_conc_min", type: "uint16", array: "false", scale: 100, offset: 0, units: "g/dL", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_hemoglobin_conc_max: { num: 56, name: "total_hemoglobin_conc_max", type: "uint16", array: "false", scale: 100, offset: 0, units: "g/dL", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, saturated_hemoglobin_percent: { num: 57, name: "saturated_hemoglobin_percent", type: "uint16", array: "false", scale: 10, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, saturated_hemoglobin_percent_min: { num: 58, name: "saturated_hemoglobin_percent_min", type: "uint16", array: "false", scale: 10, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, saturated_hemoglobin_percent_max: { num: 59, name: "saturated_hemoglobin_percent_max", type: "uint16", array: "false", scale: 10, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, device_index: { num: 62, name: "device_index", type: "device_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, left_pco: { num: 67, name: "left_pco", type: "sint8", array: "false", scale: 1, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, right_pco: { num: 68, name: "right_pco", type: "sint8", array: "false", scale: 1, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, left_power_phase: { num: 69, name: "left_power_phase", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, left_power_phase_peak: { num: 70, name: "left_power_phase_peak", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, right_power_phase: { num: 71, name: "right_power_phase", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, right_power_phase_peak: { num: 72, name: "right_power_phase_peak", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_speed: { num: 73, name: "enhanced_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_altitude: { num: 78, name: "enhanced_altitude", type: "uint32", array: "false", scale: 5, offset: 500, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, battery_soc: { num: 81, name: "battery_soc", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, motor_power: { num: 82, name: "motor_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, vertical_ratio: { num: 83, name: "vertical_ratio", type: "uint16", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, stance_time_balance: { num: 84, name: "stance_time_balance", type: "uint16", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, step_length: { num: 85, name: "step_length", type: "uint16", array: "false", scale: 10, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, cycle_length16: { num: 87, name: "cycle_length16", type: "uint16", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, absolute_pressure: { num: 91, name: "absolute_pressure", type: "uint32", array: "false", scale: 1, offset: 0, units: "Pa", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, depth: { num: 92, name: "depth", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, next_stop_depth: { num: 93, name: "next_stop_depth", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, next_stop_time: { num: 94, name: "next_stop_time", type: "uint32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_to_surface: { num: 95, name: "time_to_surface", type: "uint32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ndl_time: { num: 96, name: "ndl_time", type: "uint32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, cns_load: { num: 97, name: "cns_load", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, n2_load: { num: 98, name: "n2_load", type: "uint16", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, respiration_rate: { num: 99, name: "respiration_rate", type: "uint8", array: "false", scale: [1], offset: [0], units: ["s"], bits: [8], components: ["108"], isAccumulated: false, hasComponents: true, subFields: [] }, enhanced_respiration_rate: { num: 108, name: "enhanced_respiration_rate", type: "uint16", array: "false", scale: 100, offset: 0, units: "Breaths/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, grit: { num: 114, name: "grit", type: "float32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, flow: { num: 115, name: "flow", type: "float32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, current_stress: { num: 116, name: "current_stress", type: "uint16", array: "false", scale: 100, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ebike_travel_range: { num: 117, name: "ebike_travel_range", type: "uint16", array: "false", scale: 1, offset: 0, units: "km", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ebike_battery_level: { num: 118, name: "ebike_battery_level", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ebike_assist_mode: { num: 119, name: "ebike_assist_mode", type: "uint8", array: "false", scale: 1, offset: 0, units: "depends on sensor", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ebike_assist_level_percent: { num: 120, name: "ebike_assist_level_percent", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, air_time_remaining: { num: 123, name: "air_time_remaining", type: "uint32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pressure_sac: { num: 124, name: "pressure_sac", type: "uint16", array: "false", scale: 100, offset: 0, units: "bar/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, volume_sac: { num: 125, name: "volume_sac", type: "uint16", array: "false", scale: 100, offset: 0, units: "L/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, rmv: { num: 126, name: "rmv", type: "uint16", array: "false", scale: 100, offset: 0, units: "L/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ascent_rate: { num: 127, name: "ascent_rate", type: "sint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, po2: { num: 129, name: "po2", type: "uint8", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, core_temperature: { num: 139, name: "core_temperature", type: "uint16", array: "false", scale: 100, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, event: { value: 21, name: "event", fields: { event: { num: 0, name: "event", type: "event", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, event_type: { num: 1, name: "event_type", type: "event_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, data16: { num: 2, name: "data16", type: "uint16", array: "false", scale: [1], offset: [0], units: [""], bits: [16], components: ["3"], isAccumulated: false, hasComponents: true, subFields: [] }, data: { num: 3, name: "data", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "timer_trigger", type: "timer_trigger", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 0 }] }, { name: "course_point_index", type: "message_index", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 10 }] }, { name: "battery_level", type: "uint16", array: "", scale: 1e3, offset: 0, units: "V", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 11 }] }, { name: "virtual_partner_speed", type: "uint16", array: "", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 12 }] }, { name: "hr_high_alert", type: "uint8", array: "", scale: 1, offset: 0, units: "bpm", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 13 }] }, { name: "hr_low_alert", type: "uint8", array: "", scale: 1, offset: 0, units: "bpm", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 14 }] }, { name: "speed_high_alert", type: "uint32", array: "", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 15 }] }, { name: "speed_low_alert", type: "uint32", array: "", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 16 }] }, { name: "cad_high_alert", type: "uint16", array: "", scale: 1, offset: 0, units: "rpm", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 17 }] }, { name: "cad_low_alert", type: "uint16", array: "", scale: 1, offset: 0, units: "rpm", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 18 }] }, { name: "power_high_alert", type: "uint16", array: "", scale: 1, offset: 0, units: "watts", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 19 }] }, { name: "power_low_alert", type: "uint16", array: "", scale: 1, offset: 0, units: "watts", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 20 }] }, { name: "time_duration_alert", type: "uint32", array: "", scale: 1e3, offset: 0, units: "s", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 23 }] }, { name: "distance_duration_alert", type: "uint32", array: "", scale: 100, offset: 0, units: "m", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 24 }] }, { name: "calorie_duration_alert", type: "uint32", array: "", scale: 1, offset: 0, units: "calories", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 25 }] }, { name: "fitness_equipment_state", type: "fitness_equipment_state", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 27 }] }, { name: "sport_point", type: "uint32", array: "", scale: [1, 1], offset: [0, 0], units: ["", ""], bits: [16, 16], components: ["7", "8"], hasComponents: true, map: [{ name: "event", value: 33 }] }, { name: "gear_change_data", type: "uint32", array: "", scale: [1, 1, 1, 1], offset: [0, 0, 0, 0], units: ["", "", "", ""], bits: [8, 8, 8, 8], components: ["11", "12", "9", "10"], hasComponents: true, map: [{ name: "event", value: 42 }, { name: "event", value: 43 }] }, { name: "rider_position", type: "rider_position_type", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 44 }] }, { name: "comm_timeout", type: "comm_timeout_type", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 47 }] }, { name: "dive_alert", type: "dive_alert", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 56 }] }, { name: "auto_activity_detect_duration", type: "uint16", array: "", scale: 1, offset: 0, units: "min", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 54 }] }, { name: "radar_threat_alert", type: "uint32", array: "", scale: [1, 1, 10, 10], offset: [0, 0, 0, 0], units: ["", "", "", ""], bits: [8, 8, 8, 8], components: ["21", "22", "23", "24"], hasComponents: true, map: [{ name: "event", value: 75 }] }] }, event_group: { num: 4, name: "event_group", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, score: { num: 7, name: "score", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, opponent_score: { num: 8, name: "opponent_score", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, front_gear_num: { num: 9, name: "front_gear_num", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, front_gear: { num: 10, name: "front_gear", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, rear_gear_num: { num: 11, name: "rear_gear_num", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, rear_gear: { num: 12, name: "rear_gear", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, device_index: { num: 13, name: "device_index", type: "device_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, activity_type: { num: 14, name: "activity_type", type: "activity_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_timestamp: { num: 15, name: "start_timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "auto_activity_detect_start_timestamp", type: "date_time", array: "", scale: 1, offset: 0, units: "s", bits: [], components: [], hasComponents: false, map: [{ name: "event", value: 54 }] }] }, radar_threat_level_max: { num: 21, name: "radar_threat_level_max", type: "radar_threat_level_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, radar_threat_count: { num: 22, name: "radar_threat_count", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, radar_threat_avg_approach_speed: { num: 23, name: "radar_threat_avg_approach_speed", type: "uint8", array: "false", scale: 10, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, radar_threat_max_approach_speed: { num: 24, name: "radar_threat_max_approach_speed", type: "uint8", array: "false", scale: 10, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, device_info: { value: 23, name: "device_info", fields: { device_index: { num: 0, name: "device_index", type: "device_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, device_type: { num: 1, name: "device_type", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "ble_device_type", type: "ble_device_type", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "source_type", value: 3 }] }, { name: "antplus_device_type", type: "antplus_device_type", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "source_type", value: 1 }] }, { name: "ant_device_type", type: "uint8", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "source_type", value: 0 }] }, { name: "local_device_type", type: "local_device_type", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "source_type", value: 5 }] }] }, manufacturer: { num: 2, name: "manufacturer", type: "manufacturer", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, serial_number: { num: 3, name: "serial_number", type: "uint32z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, product: { num: 4, name: "product", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "favero_product", type: "favero_product", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "manufacturer", value: 263 }] }, { name: "garmin_product", type: "garmin_product", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "manufacturer", value: 1 }, { name: "manufacturer", value: 15 }, { name: "manufacturer", value: 13 }, { name: "manufacturer", value: 89 }] }] }, software_version: { num: 5, name: "software_version", type: "uint16", array: "false", scale: 100, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, hardware_version: { num: 6, name: "hardware_version", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, cum_operating_time: { num: 7, name: "cum_operating_time", type: "uint32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, battery_voltage: { num: 10, name: "battery_voltage", type: "uint16", array: "false", scale: 256, offset: 0, units: "V", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, battery_status: { num: 11, name: "battery_status", type: "battery_status", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sensor_position: { num: 18, name: "sensor_position", type: "body_location", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, descriptor: { num: 19, name: "descriptor", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ant_transmission_type: { num: 20, name: "ant_transmission_type", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ant_device_number: { num: 21, name: "ant_device_number", type: "uint16z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ant_network: { num: 22, name: "ant_network", type: "ant_network", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, source_type: { num: 25, name: "source_type", type: "source_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, product_name: { num: 27, name: "product_name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, battery_level: { num: 32, name: "battery_level", type: "uint8", array: "false", scale: 1, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, workout: { value: 26, name: "workout", fields: { sport: { num: 4, name: "sport", type: "sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, capabilities: { num: 5, name: "capabilities", type: "workout_capabilities", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, num_valid_steps: { num: 6, name: "num_valid_steps", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, wkt_name: { num: 8, name: "wkt_name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sub_sport: { num: 11, name: "sub_sport", type: "sub_sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pool_length: { num: 14, name: "pool_length", type: "uint16", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pool_length_unit: { num: 15, name: "pool_length_unit", type: "display_measure", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, wkt_description: { num: 17, name: "wkt_description", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, workout_step: { value: 27, name: "workout_step", fields: { wkt_step_name: { num: 0, name: "wkt_step_name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, duration_type: { num: 1, name: "duration_type", type: "wkt_step_duration", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, duration_value: { num: 2, name: "duration_value", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "duration_time", type: "uint32", array: "", scale: 1e3, offset: 0, units: "s", bits: [], components: [], hasComponents: false, map: [{ name: "duration_type", value: 0 }, { name: "duration_type", value: 28 }] }, { name: "duration_distance", type: "uint32", array: "", scale: 100, offset: 0, units: "m", bits: [], components: [], hasComponents: false, map: [{ name: "duration_type", value: 1 }] }, { name: "duration_hr", type: "workout_hr", array: "", scale: 1, offset: 0, units: "% or bpm", bits: [], components: [], hasComponents: false, map: [{ name: "duration_type", value: 2 }, { name: "duration_type", value: 3 }] }, { name: "duration_calories", type: "uint32", array: "", scale: 1, offset: 0, units: "calories", bits: [], components: [], hasComponents: false, map: [{ name: "duration_type", value: 4 }] }, { name: "duration_step", type: "uint32", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "duration_type", value: 6 }, { name: "duration_type", value: 7 }, { name: "duration_type", value: 8 }, { name: "duration_type", value: 9 }, { name: "duration_type", value: 10 }, { name: "duration_type", value: 11 }, { name: "duration_type", value: 12 }, { name: "duration_type", value: 13 }] }, { name: "duration_power", type: "workout_power", array: "", scale: 1, offset: 0, units: "% or watts", bits: [], components: [], hasComponents: false, map: [{ name: "duration_type", value: 14 }, { name: "duration_type", value: 15 }] }, { name: "duration_reps", type: "uint32", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "duration_type", value: 29 }] }] }, target_type: { num: 3, name: "target_type", type: "wkt_step_target", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, target_value: { num: 4, name: "target_value", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "target_speed_zone", type: "uint32", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "target_type", value: 0 }] }, { name: "target_hr_zone", type: "uint32", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "target_type", value: 1 }] }, { name: "target_cadence_zone", type: "uint32", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "target_type", value: 3 }] }, { name: "target_power_zone", type: "uint32", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "target_type", value: 4 }] }, { name: "repeat_steps", type: "uint32", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "duration_type", value: 6 }] }, { name: "repeat_time", type: "uint32", array: "", scale: 1e3, offset: 0, units: "s", bits: [], components: [], hasComponents: false, map: [{ name: "duration_type", value: 7 }] }, { name: "repeat_distance", type: "uint32", array: "", scale: 100, offset: 0, units: "m", bits: [], components: [], hasComponents: false, map: [{ name: "duration_type", value: 8 }] }, { name: "repeat_calories", type: "uint32", array: "", scale: 1, offset: 0, units: "calories", bits: [], components: [], hasComponents: false, map: [{ name: "duration_type", value: 9 }] }, { name: "repeat_hr", type: "workout_hr", array: "", scale: 1, offset: 0, units: "% or bpm", bits: [], components: [], hasComponents: false, map: [{ name: "duration_type", value: 10 }, { name: "duration_type", value: 11 }] }, { name: "repeat_power", type: "workout_power", array: "", scale: 1, offset: 0, units: "% or watts", bits: [], components: [], hasComponents: false, map: [{ name: "duration_type", value: 12 }, { name: "duration_type", value: 13 }] }, { name: "target_stroke_type", type: "swim_stroke", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "target_type", value: 11 }] }] }, custom_target_value_low: { num: 5, name: "custom_target_value_low", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "custom_target_speed_low", type: "uint32", array: "", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], hasComponents: false, map: [{ name: "target_type", value: 0 }] }, { name: "custom_target_heart_rate_low", type: "workout_hr", array: "", scale: 1, offset: 0, units: "% or bpm", bits: [], components: [], hasComponents: false, map: [{ name: "target_type", value: 1 }] }, { name: "custom_target_cadence_low", type: "uint32", array: "", scale: 1, offset: 0, units: "rpm", bits: [], components: [], hasComponents: false, map: [{ name: "target_type", value: 3 }] }, { name: "custom_target_power_low", type: "workout_power", array: "", scale: 1, offset: 0, units: "% or watts", bits: [], components: [], hasComponents: false, map: [{ name: "target_type", value: 4 }] }] }, custom_target_value_high: { num: 6, name: "custom_target_value_high", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "custom_target_speed_high", type: "uint32", array: "", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], hasComponents: false, map: [{ name: "target_type", value: 0 }] }, { name: "custom_target_heart_rate_high", type: "workout_hr", array: "", scale: 1, offset: 0, units: "% or bpm", bits: [], components: [], hasComponents: false, map: [{ name: "target_type", value: 1 }] }, { name: "custom_target_cadence_high", type: "uint32", array: "", scale: 1, offset: 0, units: "rpm", bits: [], components: [], hasComponents: false, map: [{ name: "target_type", value: 3 }] }, { name: "custom_target_power_high", type: "workout_power", array: "", scale: 1, offset: 0, units: "% or watts", bits: [], components: [], hasComponents: false, map: [{ name: "target_type", value: 4 }] }] }, intensity: { num: 7, name: "intensity", type: "intensity", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, notes: { num: 8, name: "notes", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, equipment: { num: 9, name: "equipment", type: "workout_equipment", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, exercise_category: { num: 10, name: "exercise_category", type: "exercise_category", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, exercise_name: { num: 11, name: "exercise_name", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, exercise_weight: { num: 12, name: "exercise_weight", type: "uint16", array: "false", scale: 100, offset: 0, units: "kg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, weight_display_unit: { num: 13, name: "weight_display_unit", type: "fit_base_unit", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, secondary_target_type: { num: 19, name: "secondary_target_type", type: "wkt_step_target", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, secondary_target_value: { num: 20, name: "secondary_target_value", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "secondary_target_speed_zone", type: "uint32", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "secondary_target_type", value: 0 }] }, { name: "secondary_target_hr_zone", type: "uint32", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "secondary_target_type", value: 1 }] }, { name: "secondary_target_cadence_zone", type: "uint32", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "secondary_target_type", value: 3 }] }, { name: "secondary_target_power_zone", type: "uint32", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "secondary_target_type", value: 4 }] }, { name: "secondary_target_stroke_type", type: "swim_stroke", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "secondary_target_type", value: 11 }] }] }, secondary_custom_target_value_low: { num: 21, name: "secondary_custom_target_value_low", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "secondary_custom_target_speed_low", type: "uint32", array: "", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], hasComponents: false, map: [{ name: "secondary_target_type", value: 0 }] }, { name: "secondary_custom_target_heart_rate_low", type: "workout_hr", array: "", scale: 1, offset: 0, units: "% or bpm", bits: [], components: [], hasComponents: false, map: [{ name: "secondary_target_type", value: 1 }] }, { name: "secondary_custom_target_cadence_low", type: "uint32", array: "", scale: 1, offset: 0, units: "rpm", bits: [], components: [], hasComponents: false, map: [{ name: "secondary_target_type", value: 3 }] }, { name: "secondary_custom_target_power_low", type: "workout_power", array: "", scale: 1, offset: 0, units: "% or watts", bits: [], components: [], hasComponents: false, map: [{ name: "secondary_target_type", value: 4 }] }] }, secondary_custom_target_value_high: { num: 22, name: "secondary_custom_target_value_high", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "secondary_custom_target_speed_high", type: "uint32", array: "", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], hasComponents: false, map: [{ name: "secondary_target_type", value: 0 }] }, { name: "secondary_custom_target_heart_rate_high", type: "workout_hr", array: "", scale: 1, offset: 0, units: "% or bpm", bits: [], components: [], hasComponents: false, map: [{ name: "secondary_target_type", value: 1 }] }, { name: "secondary_custom_target_cadence_high", type: "uint32", array: "", scale: 1, offset: 0, units: "rpm", bits: [], components: [], hasComponents: false, map: [{ name: "secondary_target_type", value: 3 }] }, { name: "secondary_custom_target_power_high", type: "workout_power", array: "", scale: 1, offset: 0, units: "% or watts", bits: [], components: [], hasComponents: false, map: [{ name: "secondary_target_type", value: 4 }] }] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, schedule: { value: 28, name: "schedule", fields: { manufacturer: { num: 0, name: "manufacturer", type: "manufacturer", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, product: { num: 1, name: "product", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "favero_product", type: "favero_product", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "manufacturer", value: 263 }] }, { name: "garmin_product", type: "garmin_product", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "manufacturer", value: 1 }, { name: "manufacturer", value: 15 }, { name: "manufacturer", value: 13 }, { name: "manufacturer", value: 89 }] }] }, serial_number: { num: 2, name: "serial_number", type: "uint32z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_created: { num: 3, name: "time_created", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, completed: { num: 4, name: "completed", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, type: { num: 5, name: "type", type: "schedule", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, scheduled_time: { num: 6, name: "scheduled_time", type: "local_date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, weight_scale: { value: 30, name: "weight_scale", fields: { weight: { num: 0, name: "weight", type: "weight", array: "false", scale: 100, offset: 0, units: "kg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, percent_fat: { num: 1, name: "percent_fat", type: "uint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, percent_hydration: { num: 2, name: "percent_hydration", type: "uint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, visceral_fat_mass: { num: 3, name: "visceral_fat_mass", type: "uint16", array: "false", scale: 100, offset: 0, units: "kg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bone_mass: { num: 4, name: "bone_mass", type: "uint16", array: "false", scale: 100, offset: 0, units: "kg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, muscle_mass: { num: 5, name: "muscle_mass", type: "uint16", array: "false", scale: 100, offset: 0, units: "kg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, basal_met: { num: 7, name: "basal_met", type: "uint16", array: "false", scale: 4, offset: 0, units: "kcal/day", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, physique_rating: { num: 8, name: "physique_rating", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, active_met: { num: 9, name: "active_met", type: "uint16", array: "false", scale: 4, offset: 0, units: "kcal/day", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, metabolic_age: { num: 10, name: "metabolic_age", type: "uint8", array: "false", scale: 1, offset: 0, units: "years", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, visceral_fat_rating: { num: 11, name: "visceral_fat_rating", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, user_profile_index: { num: 12, name: "user_profile_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bmi: { num: 13, name: "bmi", type: "uint16", array: "false", scale: 10, offset: 0, units: "kg/m^2", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, course: { value: 31, name: "course", fields: { sport: { num: 4, name: "sport", type: "sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, name: { num: 5, name: "name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, capabilities: { num: 6, name: "capabilities", type: "course_capabilities", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sub_sport: { num: 7, name: "sub_sport", type: "sub_sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, course_point: { value: 32, name: "course_point", fields: { timestamp: { num: 1, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, position_lat: { num: 2, name: "position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, position_long: { num: 3, name: "position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, distance: { num: 4, name: "distance", type: "uint32", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, type: { num: 5, name: "type", type: "course_point", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, name: { num: 6, name: "name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, favorite: { num: 8, name: "favorite", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, totals: { value: 33, name: "totals", fields: { timer_time: { num: 0, name: "timer_time", type: "uint32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, distance: { num: 1, name: "distance", type: "uint32", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calories: { num: 2, name: "calories", type: "uint32", array: "false", scale: 1, offset: 0, units: "kcal", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sport: { num: 3, name: "sport", type: "sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, elapsed_time: { num: 4, name: "elapsed_time", type: "uint32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sessions: { num: 5, name: "sessions", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, active_time: { num: 6, name: "active_time", type: "uint32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sport_index: { num: 9, name: "sport_index", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, activity: { value: 34, name: "activity", fields: { total_timer_time: { num: 0, name: "total_timer_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, num_sessions: { num: 1, name: "num_sessions", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, type: { num: 2, name: "type", type: "activity", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, event: { num: 3, name: "event", type: "event", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, event_type: { num: 4, name: "event_type", type: "event_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, local_timestamp: { num: 5, name: "local_timestamp", type: "local_date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, event_group: { num: 6, name: "event_group", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, software: { value: 35, name: "software", fields: { version: { num: 3, name: "version", type: "uint16", array: "false", scale: 100, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, part_number: { num: 5, name: "part_number", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, file_capabilities: { value: 37, name: "file_capabilities", fields: { type: { num: 0, name: "type", type: "file", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, flags: { num: 1, name: "flags", type: "file_flags", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, directory: { num: 2, name: "directory", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_count: { num: 3, name: "max_count", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_size: { num: 4, name: "max_size", type: "uint32", array: "false", scale: 1, offset: 0, units: "bytes", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, mesg_capabilities: { value: 38, name: "mesg_capabilities", fields: { file: { num: 0, name: "file", type: "file", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mesg_num: { num: 1, name: "mesg_num", type: "mesg_num", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, count_type: { num: 2, name: "count_type", type: "mesg_count", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, count: { num: 3, name: "count", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "num_per_file", type: "uint16", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "count_type", value: 0 }] }, { name: "max_per_file", type: "uint16", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "count_type", value: 1 }] }, { name: "max_per_file_type", type: "uint16", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "count_type", value: 2 }] }] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, field_capabilities: { value: 39, name: "field_capabilities", fields: { file: { num: 0, name: "file", type: "file", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mesg_num: { num: 1, name: "mesg_num", type: "mesg_num", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, field_num: { num: 2, name: "field_num", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, count: { num: 3, name: "count", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, file_creator: { value: 49, name: "file_creator", fields: { software_version: { num: 0, name: "software_version", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, hardware_version: { num: 1, name: "hardware_version", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, blood_pressure: { value: 51, name: "blood_pressure", fields: { systolic_pressure: { num: 0, name: "systolic_pressure", type: "uint16", array: "false", scale: 1, offset: 0, units: "mmHg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, diastolic_pressure: { num: 1, name: "diastolic_pressure", type: "uint16", array: "false", scale: 1, offset: 0, units: "mmHg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mean_arterial_pressure: { num: 2, name: "mean_arterial_pressure", type: "uint16", array: "false", scale: 1, offset: 0, units: "mmHg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, map3_sample_mean: { num: 3, name: "map3_sample_mean", type: "uint16", array: "false", scale: 1, offset: 0, units: "mmHg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, map_morning_values: { num: 4, name: "map_morning_values", type: "uint16", array: "false", scale: 1, offset: 0, units: "mmHg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, map_evening_values: { num: 5, name: "map_evening_values", type: "uint16", array: "false", scale: 1, offset: 0, units: "mmHg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, heart_rate: { num: 6, name: "heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, heart_rate_type: { num: 7, name: "heart_rate_type", type: "hr_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, status: { num: 8, name: "status", type: "bp_status", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, user_profile_index: { num: 9, name: "user_profile_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, speed_zone: { value: 53, name: "speed_zone", fields: { high_value: { num: 0, name: "high_value", type: "uint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, name: { num: 1, name: "name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, monitoring: { value: 55, name: "monitoring", fields: { device_index: { num: 0, name: "device_index", type: "device_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calories: { num: 1, name: "calories", type: "uint16", array: "false", scale: 1, offset: 0, units: "kcal", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, distance: { num: 2, name: "distance", type: "uint32", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, cycles: { num: 3, name: "cycles", type: "uint32", array: "false", scale: 2, offset: 0, units: "cycles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "steps", type: "uint32", array: "", scale: 1, offset: 0, units: "steps", bits: [], components: [], hasComponents: false, map: [{ name: "activity_type", value: 6 }, { name: "activity_type", value: 1 }] }, { name: "strokes", type: "uint32", array: "", scale: 2, offset: 0, units: "strokes", bits: [], components: [], hasComponents: false, map: [{ name: "activity_type", value: 2 }, { name: "activity_type", value: 5 }] }] }, active_time: { num: 4, name: "active_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, activity_type: { num: 5, name: "activity_type", type: "activity_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, activity_subtype: { num: 6, name: "activity_subtype", type: "activity_subtype", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, activity_level: { num: 7, name: "activity_level", type: "activity_level", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, distance16: { num: 8, name: "distance16", type: "uint16", array: "false", scale: 1, offset: 0, units: "100 * m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, cycles16: { num: 9, name: "cycles16", type: "uint16", array: "false", scale: 1, offset: 0, units: "2 * cycles (steps)", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, active_time16: { num: 10, name: "active_time16", type: "uint16", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, local_timestamp: { num: 11, name: "local_timestamp", type: "local_date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, temperature: { num: 12, name: "temperature", type: "sint16", array: "false", scale: 100, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, temperature_min: { num: 14, name: "temperature_min", type: "sint16", array: "false", scale: 100, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, temperature_max: { num: 15, name: "temperature_max", type: "sint16", array: "false", scale: 100, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, activity_time: { num: 16, name: "activity_time", type: "uint16", array: "true", scale: 1, offset: 0, units: "minutes", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, active_calories: { num: 19, name: "active_calories", type: "uint16", array: "false", scale: 1, offset: 0, units: "kcal", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, current_activity_type_intensity: { num: 24, name: "current_activity_type_intensity", type: "byte", array: "false", scale: [1, 1], offset: [0, 0], units: ["", ""], bits: [5, 3], components: ["5", "28"], isAccumulated: false, hasComponents: true, subFields: [] }, timestamp_min8: { num: 25, name: "timestamp_min8", type: "uint8", array: "false", scale: 1, offset: 0, units: "min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp16: { num: 26, name: "timestamp16", type: "uint16", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, heart_rate: { num: 27, name: "heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, intensity: { num: 28, name: "intensity", type: "uint8", array: "false", scale: 10, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, duration_min: { num: 29, name: "duration_min", type: "uint16", array: "false", scale: 1, offset: 0, units: "min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, duration: { num: 30, name: "duration", type: "uint32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ascent: { num: 31, name: "ascent", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, descent: { num: 32, name: "descent", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, moderate_activity_minutes: { num: 33, name: "moderate_activity_minutes", type: "uint16", array: "false", scale: 1, offset: 0, units: "minutes", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, vigorous_activity_minutes: { num: 34, name: "vigorous_activity_minutes", type: "uint16", array: "false", scale: 1, offset: 0, units: "minutes", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, training_file: { value: 72, name: "training_file", fields: { type: { num: 0, name: "type", type: "file", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, manufacturer: { num: 1, name: "manufacturer", type: "manufacturer", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, product: { num: 2, name: "product", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "favero_product", type: "favero_product", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "manufacturer", value: 263 }] }, { name: "garmin_product", type: "garmin_product", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "manufacturer", value: 1 }, { name: "manufacturer", value: 15 }, { name: "manufacturer", value: 13 }, { name: "manufacturer", value: 89 }] }] }, serial_number: { num: 3, name: "serial_number", type: "uint32z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_created: { num: 4, name: "time_created", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hrv: { value: 78, name: "hrv", fields: { time: { num: 0, name: "time", type: "uint16", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, ant_rx: { value: 80, name: "ant_rx", fields: { fractional_timestamp: { num: 0, name: "fractional_timestamp", type: "uint16", array: "false", scale: 32768, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mesg_id: { num: 1, name: "mesg_id", type: "byte", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mesg_data: { num: 2, name: "mesg_data", type: "byte", array: "true", scale: [1, 1, 1, 1, 1, 1, 1, 1, 1], offset: [0, 0, 0, 0, 0, 0, 0, 0, 0], units: ["", "", "", "", "", "", "", "", ""], bits: [8, 8, 8, 8, 8, 8, 8, 8, 8], components: ["3", "4", "4", "4", "4", "4", "4", "4", "4"], isAccumulated: false, hasComponents: true, subFields: [] }, channel_number: { num: 3, name: "channel_number", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, data: { num: 4, name: "data", type: "byte", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, ant_tx: { value: 81, name: "ant_tx", fields: { fractional_timestamp: { num: 0, name: "fractional_timestamp", type: "uint16", array: "false", scale: 32768, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mesg_id: { num: 1, name: "mesg_id", type: "byte", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mesg_data: { num: 2, name: "mesg_data", type: "byte", array: "true", scale: [1, 1, 1, 1, 1, 1, 1, 1, 1], offset: [0, 0, 0, 0, 0, 0, 0, 0, 0], units: ["", "", "", "", "", "", "", "", ""], bits: [8, 8, 8, 8, 8, 8, 8, 8, 8], components: ["3", "4", "4", "4", "4", "4", "4", "4", "4"], isAccumulated: false, hasComponents: true, subFields: [] }, channel_number: { num: 3, name: "channel_number", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, data: { num: 4, name: "data", type: "byte", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, ant_channel_id: { value: 82, name: "ant_channel_id", fields: { channel_number: { num: 0, name: "channel_number", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, device_type: { num: 1, name: "device_type", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, device_number: { num: 2, name: "device_number", type: "uint16z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, transmission_type: { num: 3, name: "transmission_type", type: "uint8z", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, device_index: { num: 4, name: "device_index", type: "device_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, length: { value: 101, name: "length", fields: { event: { num: 0, name: "event", type: "event", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, event_type: { num: 1, name: "event_type", type: "event_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_time: { num: 2, name: "start_time", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_elapsed_time: { num: 3, name: "total_elapsed_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_timer_time: { num: 4, name: "total_timer_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_strokes: { num: 5, name: "total_strokes", type: "uint16", array: "false", scale: 1, offset: 0, units: "strokes", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_speed: { num: 6, name: "avg_speed", type: "uint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, swim_stroke: { num: 7, name: "swim_stroke", type: "swim_stroke", array: "false", scale: 1, offset: 0, units: "swim_stroke", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_swimming_cadence: { num: 9, name: "avg_swimming_cadence", type: "uint8", array: "false", scale: 1, offset: 0, units: "strokes/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, event_group: { num: 10, name: "event_group", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_calories: { num: 11, name: "total_calories", type: "uint16", array: "false", scale: 1, offset: 0, units: "kcal", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, length_type: { num: 12, name: "length_type", type: "length_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, player_score: { num: 18, name: "player_score", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, opponent_score: { num: 19, name: "opponent_score", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, stroke_count: { num: 20, name: "stroke_count", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, zone_count: { num: 21, name: "zone_count", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_avg_respiration_rate: { num: 22, name: "enhanced_avg_respiration_rate", type: "uint16", array: "false", scale: 100, offset: 0, units: "Breaths/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_max_respiration_rate: { num: 23, name: "enhanced_max_respiration_rate", type: "uint16", array: "false", scale: 100, offset: 0, units: "Breaths/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_respiration_rate: { num: 24, name: "avg_respiration_rate", type: "uint8", array: "false", scale: [1], offset: [0], units: [""], bits: [8], components: ["22"], isAccumulated: false, hasComponents: true, subFields: [] }, max_respiration_rate: { num: 25, name: "max_respiration_rate", type: "uint8", array: "false", scale: [1], offset: [0], units: [""], bits: [8], components: ["23"], isAccumulated: false, hasComponents: true, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, monitoring_info: { value: 103, name: "monitoring_info", fields: { local_timestamp: { num: 0, name: "local_timestamp", type: "local_date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, activity_type: { num: 1, name: "activity_type", type: "activity_type", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, cycles_to_distance: { num: 3, name: "cycles_to_distance", type: "uint16", array: "true", scale: 5e3, offset: 0, units: "m/cycle", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, cycles_to_calories: { num: 4, name: "cycles_to_calories", type: "uint16", array: "true", scale: 5e3, offset: 0, units: "kcal/cycle", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, resting_metabolic_rate: { num: 5, name: "resting_metabolic_rate", type: "uint16", array: "false", scale: 1, offset: 0, units: "kcal / day", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, pad: { value: 105, name: "pad", fields: { timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, slave_device: { value: 106, name: "slave_device", fields: { manufacturer: { num: 0, name: "manufacturer", type: "manufacturer", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, product: { num: 1, name: "product", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "favero_product", type: "favero_product", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "manufacturer", value: 263 }] }, { name: "garmin_product", type: "garmin_product", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "manufacturer", value: 1 }, { name: "manufacturer", value: 15 }, { name: "manufacturer", value: 13 }, { name: "manufacturer", value: 89 }] }] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, connectivity: { value: 127, name: "connectivity", fields: { bluetooth_enabled: { num: 0, name: "bluetooth_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bluetooth_le_enabled: { num: 1, name: "bluetooth_le_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ant_enabled: { num: 2, name: "ant_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, name: { num: 3, name: "name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, live_tracking_enabled: { num: 4, name: "live_tracking_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, weather_conditions_enabled: { num: 5, name: "weather_conditions_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, weather_alerts_enabled: { num: 6, name: "weather_alerts_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, auto_activity_upload_enabled: { num: 7, name: "auto_activity_upload_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, course_download_enabled: { num: 8, name: "course_download_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, workout_download_enabled: { num: 9, name: "workout_download_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, gps_ephemeris_download_enabled: { num: 10, name: "gps_ephemeris_download_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, incident_detection_enabled: { num: 11, name: "incident_detection_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, grouptrack_enabled: { num: 12, name: "grouptrack_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, weather_conditions: { value: 128, name: "weather_conditions", fields: { weather_report: { num: 0, name: "weather_report", type: "weather_report", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, temperature: { num: 1, name: "temperature", type: "sint8", array: "false", scale: 1, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, condition: { num: 2, name: "condition", type: "weather_status", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, wind_direction: { num: 3, name: "wind_direction", type: "uint16", array: "false", scale: 1, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, wind_speed: { num: 4, name: "wind_speed", type: "uint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, precipitation_probability: { num: 5, name: "precipitation_probability", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, temperature_feels_like: { num: 6, name: "temperature_feels_like", type: "sint8", array: "false", scale: 1, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, relative_humidity: { num: 7, name: "relative_humidity", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, location: { num: 8, name: "location", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, observed_at_time: { num: 9, name: "observed_at_time", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, observed_location_lat: { num: 10, name: "observed_location_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, observed_location_long: { num: 11, name: "observed_location_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, day_of_week: { num: 12, name: "day_of_week", type: "day_of_week", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, high_temperature: { num: 13, name: "high_temperature", type: "sint8", array: "false", scale: 1, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, low_temperature: { num: 14, name: "low_temperature", type: "sint8", array: "false", scale: 1, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, weather_alert: { value: 129, name: "weather_alert", fields: { report_id: { num: 0, name: "report_id", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, issue_time: { num: 1, name: "issue_time", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, expire_time: { num: 2, name: "expire_time", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, severity: { num: 3, name: "severity", type: "weather_severity", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, type: { num: 4, name: "type", type: "weather_severe_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, cadence_zone: { value: 131, name: "cadence_zone", fields: { high_value: { num: 0, name: "high_value", type: "uint8", array: "false", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, name: { num: 1, name: "name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hr: { value: 132, name: "hr", fields: { fractional_timestamp: { num: 0, name: "fractional_timestamp", type: "uint16", array: "false", scale: 32768, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time256: { num: 1, name: "time256", type: "uint8", array: "false", scale: [256], offset: [0], units: ["s"], bits: [8], components: ["0"], isAccumulated: false, hasComponents: true, subFields: [] }, filtered_bpm: { num: 6, name: "filtered_bpm", type: "uint8", array: "true", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, event_timestamp: { num: 9, name: "event_timestamp", type: "uint32", array: "true", scale: 1024, offset: 0, units: "s", bits: [], components: [], isAccumulated: true, hasComponents: false, subFields: [] }, event_timestamp12: { num: 10, name: "event_timestamp12", type: "byte", array: "true", scale: [1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024], offset: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], units: ["s", "", "", "", "", "", "", "", "", ""], bits: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12], components: ["9", "9", "9", "9", "9", "9", "9", "9", "9", "9"], isAccumulated: false, hasComponents: true, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, segment_lap: { value: 142, name: "segment_lap", fields: { event: { num: 0, name: "event", type: "event", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, event_type: { num: 1, name: "event_type", type: "event_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_time: { num: 2, name: "start_time", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_position_lat: { num: 3, name: "start_position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_position_long: { num: 4, name: "start_position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_position_lat: { num: 5, name: "end_position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_position_long: { num: 6, name: "end_position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_elapsed_time: { num: 7, name: "total_elapsed_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_timer_time: { num: 8, name: "total_timer_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_distance: { num: 9, name: "total_distance", type: "uint32", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_cycles: { num: 10, name: "total_cycles", type: "uint32", array: "false", scale: 1, offset: 0, units: "cycles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "total_strokes", type: "uint32", array: "", scale: 1, offset: 0, units: "strokes", bits: [], components: [], hasComponents: false, map: [{ name: "sport", value: 2 }] }] }, total_calories: { num: 11, name: "total_calories", type: "uint16", array: "false", scale: 1, offset: 0, units: "kcal", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_fat_calories: { num: 12, name: "total_fat_calories", type: "uint16", array: "false", scale: 1, offset: 0, units: "kcal", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_speed: { num: 13, name: "avg_speed", type: "uint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_speed: { num: 14, name: "max_speed", type: "uint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_heart_rate: { num: 15, name: "avg_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_heart_rate: { num: 16, name: "max_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_cadence: { num: 17, name: "avg_cadence", type: "uint8", array: "false", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_cadence: { num: 18, name: "max_cadence", type: "uint8", array: "false", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_power: { num: 19, name: "avg_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_power: { num: 20, name: "max_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_ascent: { num: 21, name: "total_ascent", type: "uint16", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_descent: { num: 22, name: "total_descent", type: "uint16", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sport: { num: 23, name: "sport", type: "sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, event_group: { num: 24, name: "event_group", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, nec_lat: { num: 25, name: "nec_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, nec_long: { num: 26, name: "nec_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, swc_lat: { num: 27, name: "swc_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, swc_long: { num: 28, name: "swc_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, name: { num: 29, name: "name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, normalized_power: { num: 30, name: "normalized_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, left_right_balance: { num: 31, name: "left_right_balance", type: "left_right_balance100", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sub_sport: { num: 32, name: "sub_sport", type: "sub_sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_work: { num: 33, name: "total_work", type: "uint32", array: "false", scale: 1, offset: 0, units: "J", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_altitude: { num: 34, name: "avg_altitude", type: "uint16", array: "false", scale: [5], offset: [500], units: ["m"], bits: [16], components: ["91"], isAccumulated: false, hasComponents: true, subFields: [] }, max_altitude: { num: 35, name: "max_altitude", type: "uint16", array: "false", scale: [5], offset: [500], units: ["m"], bits: [16], components: ["92"], isAccumulated: false, hasComponents: true, subFields: [] }, gps_accuracy: { num: 36, name: "gps_accuracy", type: "uint8", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_grade: { num: 37, name: "avg_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_pos_grade: { num: 38, name: "avg_pos_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_neg_grade: { num: 39, name: "avg_neg_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_pos_grade: { num: 40, name: "max_pos_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_neg_grade: { num: 41, name: "max_neg_grade", type: "sint16", array: "false", scale: 100, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_temperature: { num: 42, name: "avg_temperature", type: "sint8", array: "false", scale: 1, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_temperature: { num: 43, name: "max_temperature", type: "sint8", array: "false", scale: 1, offset: 0, units: "C", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_moving_time: { num: 44, name: "total_moving_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_pos_vertical_speed: { num: 45, name: "avg_pos_vertical_speed", type: "sint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_neg_vertical_speed: { num: 46, name: "avg_neg_vertical_speed", type: "sint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_pos_vertical_speed: { num: 47, name: "max_pos_vertical_speed", type: "sint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_neg_vertical_speed: { num: 48, name: "max_neg_vertical_speed", type: "sint16", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_hr_zone: { num: 49, name: "time_in_hr_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_speed_zone: { num: 50, name: "time_in_speed_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_cadence_zone: { num: 51, name: "time_in_cadence_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_power_zone: { num: 52, name: "time_in_power_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, repetition_num: { num: 53, name: "repetition_num", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, min_altitude: { num: 54, name: "min_altitude", type: "uint16", array: "false", scale: [5], offset: [500], units: ["m"], bits: [16], components: ["93"], isAccumulated: false, hasComponents: true, subFields: [] }, min_heart_rate: { num: 55, name: "min_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, active_time: { num: 56, name: "active_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, wkt_step_index: { num: 57, name: "wkt_step_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sport_event: { num: 58, name: "sport_event", type: "sport_event", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_torque_effectiveness: { num: 59, name: "avg_left_torque_effectiveness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_torque_effectiveness: { num: 60, name: "avg_right_torque_effectiveness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_pedal_smoothness: { num: 61, name: "avg_left_pedal_smoothness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_pedal_smoothness: { num: 62, name: "avg_right_pedal_smoothness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_combined_pedal_smoothness: { num: 63, name: "avg_combined_pedal_smoothness", type: "uint8", array: "false", scale: 2, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, status: { num: 64, name: "status", type: "segment_lap_status", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, uuid: { num: 65, name: "uuid", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_fractional_cadence: { num: 66, name: "avg_fractional_cadence", type: "uint8", array: "false", scale: 128, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_fractional_cadence: { num: 67, name: "max_fractional_cadence", type: "uint8", array: "false", scale: 128, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_fractional_cycles: { num: 68, name: "total_fractional_cycles", type: "uint8", array: "false", scale: 128, offset: 0, units: "cycles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, front_gear_shift_count: { num: 69, name: "front_gear_shift_count", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, rear_gear_shift_count: { num: 70, name: "rear_gear_shift_count", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_standing: { num: 71, name: "time_standing", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, stand_count: { num: 72, name: "stand_count", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_pco: { num: 73, name: "avg_left_pco", type: "sint8", array: "false", scale: 1, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_pco: { num: 74, name: "avg_right_pco", type: "sint8", array: "false", scale: 1, offset: 0, units: "mm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_power_phase: { num: 75, name: "avg_left_power_phase", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_left_power_phase_peak: { num: 76, name: "avg_left_power_phase_peak", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_power_phase: { num: 77, name: "avg_right_power_phase", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_right_power_phase_peak: { num: 78, name: "avg_right_power_phase_peak", type: "uint8", array: "true", scale: 0.7111111, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_power_position: { num: 79, name: "avg_power_position", type: "uint16", array: "true", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_power_position: { num: 80, name: "max_power_position", type: "uint16", array: "true", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_cadence_position: { num: 81, name: "avg_cadence_position", type: "uint8", array: "true", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_cadence_position: { num: 82, name: "max_cadence_position", type: "uint8", array: "true", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, manufacturer: { num: 83, name: "manufacturer", type: "manufacturer", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_grit: { num: 84, name: "total_grit", type: "float32", array: "false", scale: 1, offset: 0, units: "kGrit", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_flow: { num: 85, name: "total_flow", type: "float32", array: "false", scale: 1, offset: 0, units: "Flow", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_grit: { num: 86, name: "avg_grit", type: "float32", array: "false", scale: 1, offset: 0, units: "kGrit", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_flow: { num: 87, name: "avg_flow", type: "float32", array: "false", scale: 1, offset: 0, units: "Flow", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_fractional_ascent: { num: 89, name: "total_fractional_ascent", type: "uint8", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_fractional_descent: { num: 90, name: "total_fractional_descent", type: "uint8", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_avg_altitude: { num: 91, name: "enhanced_avg_altitude", type: "uint32", array: "false", scale: 5, offset: 500, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_max_altitude: { num: 92, name: "enhanced_max_altitude", type: "uint32", array: "false", scale: 5, offset: 500, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_min_altitude: { num: 93, name: "enhanced_min_altitude", type: "uint32", array: "false", scale: 5, offset: 500, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, memo_glob: { value: 145, name: "memo_glob", fields: { memo: { num: 0, name: "memo", type: "byte", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mesg_num: { num: 1, name: "mesg_num", type: "mesg_num", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, parent_index: { num: 2, name: "parent_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, field_num: { num: 3, name: "field_num", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, data: { num: 4, name: "data", type: "uint8z", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, part_index: { num: 250, name: "part_index", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, segment_id: { value: 148, name: "segment_id", fields: { name: { num: 0, name: "name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, uuid: { num: 1, name: "uuid", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sport: { num: 2, name: "sport", type: "sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enabled: { num: 3, name: "enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, user_profile_primary_key: { num: 4, name: "user_profile_primary_key", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, device_id: { num: 5, name: "device_id", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, default_race_leader: { num: 6, name: "default_race_leader", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, delete_status: { num: 7, name: "delete_status", type: "segment_delete_status", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, selection_type: { num: 8, name: "selection_type", type: "segment_selection_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, segment_leaderboard_entry: { value: 149, name: "segment_leaderboard_entry", fields: { name: { num: 0, name: "name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, type: { num: 1, name: "type", type: "segment_leaderboard_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, group_primary_key: { num: 2, name: "group_primary_key", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, activity_id: { num: 3, name: "activity_id", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, segment_time: { num: 4, name: "segment_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, activity_id_string: { num: 5, name: "activity_id_string", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, segment_point: { value: 150, name: "segment_point", fields: { position_lat: { num: 1, name: "position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, position_long: { num: 2, name: "position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, distance: { num: 3, name: "distance", type: "uint32", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, altitude: { num: 4, name: "altitude", type: "uint16", array: "false", scale: [5], offset: [500], units: ["m"], bits: [16], components: ["6"], isAccumulated: false, hasComponents: true, subFields: [] }, leader_time: { num: 5, name: "leader_time", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_altitude: { num: 6, name: "enhanced_altitude", type: "uint32", array: "false", scale: 5, offset: 500, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, segment_file: { value: 151, name: "segment_file", fields: { file_uuid: { num: 1, name: "file_uuid", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enabled: { num: 3, name: "enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, user_profile_primary_key: { num: 4, name: "user_profile_primary_key", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, leader_type: { num: 7, name: "leader_type", type: "segment_leaderboard_type", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, leader_group_primary_key: { num: 8, name: "leader_group_primary_key", type: "uint32", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, leader_activity_id: { num: 9, name: "leader_activity_id", type: "uint32", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, leader_activity_id_string: { num: 10, name: "leader_activity_id_string", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, default_race_leader: { num: 11, name: "default_race_leader", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, workout_session: { value: 158, name: "workout_session", fields: { sport: { num: 0, name: "sport", type: "sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sub_sport: { num: 1, name: "sub_sport", type: "sub_sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, num_valid_steps: { num: 2, name: "num_valid_steps", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, first_step_index: { num: 3, name: "first_step_index", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pool_length: { num: 4, name: "pool_length", type: "uint16", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pool_length_unit: { num: 5, name: "pool_length_unit", type: "display_measure", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, watchface_settings: { value: 159, name: "watchface_settings", fields: { mode: { num: 0, name: "mode", type: "watchface_mode", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, layout: { num: 1, name: "layout", type: "byte", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "digital_layout", type: "digital_watchface_layout", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "mode", value: 0 }] }, { name: "analog_layout", type: "analog_watchface_layout", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "mode", value: 1 }] }] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, gps_metadata: { value: 160, name: "gps_metadata", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, position_lat: { num: 1, name: "position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, position_long: { num: 2, name: "position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_altitude: { num: 3, name: "enhanced_altitude", type: "uint32", array: "false", scale: 5, offset: 500, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enhanced_speed: { num: 4, name: "enhanced_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, heading: { num: 5, name: "heading", type: "uint16", array: "false", scale: 100, offset: 0, units: "degrees", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, utc_timestamp: { num: 6, name: "utc_timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, velocity: { num: 7, name: "velocity", type: "sint16", array: "true", scale: 100, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, camera_event: { value: 161, name: "camera_event", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, camera_event_type: { num: 1, name: "camera_event_type", type: "camera_event_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, camera_file_uuid: { num: 2, name: "camera_file_uuid", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, camera_orientation: { num: 3, name: "camera_orientation", type: "camera_orientation_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, timestamp_correlation: { value: 162, name: "timestamp_correlation", fields: { fractional_timestamp: { num: 0, name: "fractional_timestamp", type: "uint16", array: "false", scale: 32768, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, system_timestamp: { num: 1, name: "system_timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, fractional_system_timestamp: { num: 2, name: "fractional_system_timestamp", type: "uint16", array: "false", scale: 32768, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, local_timestamp: { num: 3, name: "local_timestamp", type: "local_date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp_ms: { num: 4, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, system_timestamp_ms: { num: 5, name: "system_timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, gyroscope_data: { value: 164, name: "gyroscope_data", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sample_time_offset: { num: 1, name: "sample_time_offset", type: "uint16", array: "true", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, gyro_x: { num: 2, name: "gyro_x", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, gyro_y: { num: 3, name: "gyro_y", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, gyro_z: { num: 4, name: "gyro_z", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calibrated_gyro_x: { num: 5, name: "calibrated_gyro_x", type: "float32", array: "true", scale: 1, offset: 0, units: "deg/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calibrated_gyro_y: { num: 6, name: "calibrated_gyro_y", type: "float32", array: "true", scale: 1, offset: 0, units: "deg/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calibrated_gyro_z: { num: 7, name: "calibrated_gyro_z", type: "float32", array: "true", scale: 1, offset: 0, units: "deg/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, accelerometer_data: { value: 165, name: "accelerometer_data", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sample_time_offset: { num: 1, name: "sample_time_offset", type: "uint16", array: "true", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, accel_x: { num: 2, name: "accel_x", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, accel_y: { num: 3, name: "accel_y", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, accel_z: { num: 4, name: "accel_z", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calibrated_accel_x: { num: 5, name: "calibrated_accel_x", type: "float32", array: "true", scale: 1, offset: 0, units: "g", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calibrated_accel_y: { num: 6, name: "calibrated_accel_y", type: "float32", array: "true", scale: 1, offset: 0, units: "g", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calibrated_accel_z: { num: 7, name: "calibrated_accel_z", type: "float32", array: "true", scale: 1, offset: 0, units: "g", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, compressed_calibrated_accel_x: { num: 8, name: "compressed_calibrated_accel_x", type: "sint16", array: "true", scale: 1, offset: 0, units: "mG", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, compressed_calibrated_accel_y: { num: 9, name: "compressed_calibrated_accel_y", type: "sint16", array: "true", scale: 1, offset: 0, units: "mG", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, compressed_calibrated_accel_z: { num: 10, name: "compressed_calibrated_accel_z", type: "sint16", array: "true", scale: 1, offset: 0, units: "mG", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, three_d_sensor_calibration: { value: 167, name: "three_d_sensor_calibration", fields: { sensor_type: { num: 0, name: "sensor_type", type: "sensor_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calibration_factor: { num: 1, name: "calibration_factor", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "accel_cal_factor", type: "uint32", array: "", scale: 1, offset: 0, units: "g", bits: [], components: [], hasComponents: false, map: [{ name: "sensor_type", value: 0 }] }, { name: "gyro_cal_factor", type: "uint32", array: "", scale: 1, offset: 0, units: "deg/s", bits: [], components: [], hasComponents: false, map: [{ name: "sensor_type", value: 1 }] }] }, calibration_divisor: { num: 2, name: "calibration_divisor", type: "uint32", array: "false", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, level_shift: { num: 3, name: "level_shift", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, offset_cal: { num: 4, name: "offset_cal", type: "sint32", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, orientation_matrix: { num: 5, name: "orientation_matrix", type: "sint32", array: "true", scale: 65535, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, video_frame: { value: 169, name: "video_frame", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, frame_number: { num: 1, name: "frame_number", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, obdii_data: { value: 174, name: "obdii_data", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_offset: { num: 1, name: "time_offset", type: "uint16", array: "true", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pid: { num: 2, name: "pid", type: "byte", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, raw_data: { num: 3, name: "raw_data", type: "byte", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pid_data_size: { num: 4, name: "pid_data_size", type: "uint8", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, system_time: { num: 5, name: "system_time", type: "uint32", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_timestamp: { num: 6, name: "start_timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_timestamp_ms: { num: 7, name: "start_timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, nmea_sentence: { value: 177, name: "nmea_sentence", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sentence: { num: 1, name: "sentence", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, aviation_attitude: { value: 178, name: "aviation_attitude", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, system_time: { num: 1, name: "system_time", type: "uint32", array: "true", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pitch: { num: 2, name: "pitch", type: "sint16", array: "true", scale: 10430.38, offset: 0, units: "radians", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, roll: { num: 3, name: "roll", type: "sint16", array: "true", scale: 10430.38, offset: 0, units: "radians", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, accel_lateral: { num: 4, name: "accel_lateral", type: "sint16", array: "true", scale: 100, offset: 0, units: "m/s^2", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, accel_normal: { num: 5, name: "accel_normal", type: "sint16", array: "true", scale: 100, offset: 0, units: "m/s^2", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, turn_rate: { num: 6, name: "turn_rate", type: "sint16", array: "true", scale: 1024, offset: 0, units: "radians/second", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, stage: { num: 7, name: "stage", type: "attitude_stage", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, attitude_stage_complete: { num: 8, name: "attitude_stage_complete", type: "uint8", array: "true", scale: 1, offset: 0, units: "%", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, track: { num: 9, name: "track", type: "uint16", array: "true", scale: 10430.38, offset: 0, units: "radians", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, validity: { num: 10, name: "validity", type: "attitude_validity", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, video: { value: 184, name: "video", fields: { url: { num: 0, name: "url", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, hosting_provider: { num: 1, name: "hosting_provider", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, duration: { num: 2, name: "duration", type: "uint32", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, video_title: { value: 185, name: "video_title", fields: { message_count: { num: 0, name: "message_count", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, text: { num: 1, name: "text", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, video_description: { value: 186, name: "video_description", fields: { message_count: { num: 0, name: "message_count", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, text: { num: 1, name: "text", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, video_clip: { value: 187, name: "video_clip", fields: { clip_number: { num: 0, name: "clip_number", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_timestamp: { num: 1, name: "start_timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_timestamp_ms: { num: 2, name: "start_timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_timestamp: { num: 3, name: "end_timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_timestamp_ms: { num: 4, name: "end_timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, clip_start: { num: 6, name: "clip_start", type: "uint32", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, clip_end: { num: 7, name: "clip_end", type: "uint32", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, ohr_settings: { value: 188, name: "ohr_settings", fields: { enabled: { num: 0, name: "enabled", type: "switch", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, exd_screen_configuration: { value: 200, name: "exd_screen_configuration", fields: { screen_index: { num: 0, name: "screen_index", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, field_count: { num: 1, name: "field_count", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, layout: { num: 2, name: "layout", type: "exd_layout", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, screen_enabled: { num: 3, name: "screen_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, exd_data_field_configuration: { value: 201, name: "exd_data_field_configuration", fields: { screen_index: { num: 0, name: "screen_index", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, concept_field: { num: 1, name: "concept_field", type: "byte", array: "false", scale: [1, 1], offset: [0, 0], units: ["", ""], bits: [4, 4], components: ["2", "3"], isAccumulated: false, hasComponents: true, subFields: [] }, field_id: { num: 2, name: "field_id", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, concept_count: { num: 3, name: "concept_count", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, display_type: { num: 4, name: "display_type", type: "exd_display_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, title: { num: 5, name: "title", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, exd_data_concept_configuration: { value: 202, name: "exd_data_concept_configuration", fields: { screen_index: { num: 0, name: "screen_index", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, concept_field: { num: 1, name: "concept_field", type: "byte", array: "false", scale: [1, 1], offset: [0, 0], units: ["", ""], bits: [4, 4], components: ["2", "3"], isAccumulated: false, hasComponents: true, subFields: [] }, field_id: { num: 2, name: "field_id", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, concept_index: { num: 3, name: "concept_index", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, data_page: { num: 4, name: "data_page", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, concept_key: { num: 5, name: "concept_key", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, scaling: { num: 6, name: "scaling", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, data_units: { num: 8, name: "data_units", type: "exd_data_units", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, qualifier: { num: 9, name: "qualifier", type: "exd_qualifiers", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, descriptor: { num: 10, name: "descriptor", type: "exd_descriptors", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, is_signed: { num: 11, name: "is_signed", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, field_description: { value: 206, name: "field_description", fields: { developer_data_index: { num: 0, name: "developer_data_index", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, field_definition_number: { num: 1, name: "field_definition_number", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, fit_base_type_id: { num: 2, name: "fit_base_type_id", type: "fit_base_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, field_name: { num: 3, name: "field_name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, array: { num: 4, name: "array", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, components: { num: 5, name: "components", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, scale: { num: 6, name: "scale", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, offset: { num: 7, name: "offset", type: "sint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, units: { num: 8, name: "units", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bits: { num: 9, name: "bits", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, accumulate: { num: 10, name: "accumulate", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, fit_base_unit_id: { num: 13, name: "fit_base_unit_id", type: "fit_base_unit", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, native_mesg_num: { num: 14, name: "native_mesg_num", type: "mesg_num", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, native_field_num: { num: 15, name: "native_field_num", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, developer_data_id: { value: 207, name: "developer_data_id", fields: { developer_id: { num: 0, name: "developer_id", type: "byte", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, application_id: { num: 1, name: "application_id", type: "byte", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, manufacturer_id: { num: 2, name: "manufacturer_id", type: "manufacturer", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, developer_data_index: { num: 3, name: "developer_data_index", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, application_version: { num: 4, name: "application_version", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, magnetometer_data: { value: 208, name: "magnetometer_data", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sample_time_offset: { num: 1, name: "sample_time_offset", type: "uint16", array: "true", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mag_x: { num: 2, name: "mag_x", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mag_y: { num: 3, name: "mag_y", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mag_z: { num: 4, name: "mag_z", type: "uint16", array: "true", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calibrated_mag_x: { num: 5, name: "calibrated_mag_x", type: "float32", array: "true", scale: 1, offset: 0, units: "G", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calibrated_mag_y: { num: 6, name: "calibrated_mag_y", type: "float32", array: "true", scale: 1, offset: 0, units: "G", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calibrated_mag_z: { num: 7, name: "calibrated_mag_z", type: "float32", array: "true", scale: 1, offset: 0, units: "G", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, barometer_data: { value: 209, name: "barometer_data", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sample_time_offset: { num: 1, name: "sample_time_offset", type: "uint16", array: "true", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, baro_pres: { num: 2, name: "baro_pres", type: "uint32", array: "true", scale: 1, offset: 0, units: "Pa", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, one_d_sensor_calibration: { value: 210, name: "one_d_sensor_calibration", fields: { sensor_type: { num: 0, name: "sensor_type", type: "sensor_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calibration_factor: { num: 1, name: "calibration_factor", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "baro_cal_factor", type: "uint32", array: "", scale: 1, offset: 0, units: "Pa", bits: [], components: [], hasComponents: false, map: [{ name: "sensor_type", value: 3 }] }] }, calibration_divisor: { num: 2, name: "calibration_divisor", type: "uint32", array: "false", scale: 1, offset: 0, units: "counts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, level_shift: { num: 3, name: "level_shift", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, offset_cal: { num: 4, name: "offset_cal", type: "sint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, monitoring_hr_data: { value: 211, name: "monitoring_hr_data", fields: { resting_heart_rate: { num: 0, name: "resting_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, current_day_resting_heart_rate: { num: 1, name: "current_day_resting_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, time_in_zone: { value: 216, name: "time_in_zone", fields: { reference_mesg: { num: 0, name: "reference_mesg", type: "mesg_num", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, reference_index: { num: 1, name: "reference_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_hr_zone: { num: 2, name: "time_in_hr_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_speed_zone: { num: 3, name: "time_in_speed_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_cadence_zone: { num: 4, name: "time_in_cadence_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_in_power_zone: { num: 5, name: "time_in_power_zone", type: "uint32", array: "true", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, hr_zone_high_boundary: { num: 6, name: "hr_zone_high_boundary", type: "uint8", array: "true", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, speed_zone_high_boundary: { num: 7, name: "speed_zone_high_boundary", type: "uint16", array: "true", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, cadence_zone_high_bondary: { num: 8, name: "cadence_zone_high_bondary", type: "uint8", array: "true", scale: 1, offset: 0, units: "rpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, power_zone_high_boundary: { num: 9, name: "power_zone_high_boundary", type: "uint16", array: "true", scale: 1, offset: 0, units: "watts", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, hr_calc_type: { num: 10, name: "hr_calc_type", type: "hr_zone_calc", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_heart_rate: { num: 11, name: "max_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, resting_heart_rate: { num: 12, name: "resting_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, threshold_heart_rate: { num: 13, name: "threshold_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pwr_calc_type: { num: 14, name: "pwr_calc_type", type: "pwr_zone_calc", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, functional_threshold_power: { num: 15, name: "functional_threshold_power", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, set: { value: 225, name: "set", fields: { duration: { num: 0, name: "duration", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, repetitions: { num: 3, name: "repetitions", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, weight: { num: 4, name: "weight", type: "uint16", array: "false", scale: 16, offset: 0, units: "kg", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, set_type: { num: 5, name: "set_type", type: "set_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_time: { num: 6, name: "start_time", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, category: { num: 7, name: "category", type: "exercise_category", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, category_subtype: { num: 8, name: "category_subtype", type: "uint16", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, weight_display_unit: { num: 9, name: "weight_display_unit", type: "fit_base_unit", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 10, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, wkt_step_index: { num: 11, name: "wkt_step_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 254, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, stress_level: { value: 227, name: "stress_level", fields: { stress_level_value: { num: 0, name: "stress_level_value", type: "sint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, stress_level_time: { num: 1, name: "stress_level_time", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, max_met_data: { value: 229, name: "max_met_data", fields: { update_time: { num: 0, name: "update_time", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, vo2_max: { num: 2, name: "vo2_max", type: "uint16", array: "false", scale: 10, offset: 0, units: "mL/kg/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sport: { num: 5, name: "sport", type: "sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sub_sport: { num: 6, name: "sub_sport", type: "sub_sport", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_met_category: { num: 8, name: "max_met_category", type: "max_met_category", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, calibrated_data: { num: 9, name: "calibrated_data", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, hr_source: { num: 12, name: "hr_source", type: "max_met_heart_rate_source", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, speed_source: { num: 13, name: "speed_source", type: "max_met_speed_source", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, dive_settings: { value: 258, name: "dive_settings", fields: { name: { num: 0, name: "name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, model: { num: 1, name: "model", type: "tissue_model_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, gf_low: { num: 2, name: "gf_low", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, gf_high: { num: 3, name: "gf_high", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, water_type: { num: 4, name: "water_type", type: "water_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, water_density: { num: 5, name: "water_density", type: "float32", array: "false", scale: 1, offset: 0, units: "kg/m^3", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, po2_warn: { num: 6, name: "po2_warn", type: "uint8", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, po2_critical: { num: 7, name: "po2_critical", type: "uint8", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, po2_deco: { num: 8, name: "po2_deco", type: "uint8", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, safety_stop_enabled: { num: 9, name: "safety_stop_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bottom_depth: { num: 10, name: "bottom_depth", type: "float32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bottom_time: { num: 11, name: "bottom_time", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, apnea_countdown_enabled: { num: 12, name: "apnea_countdown_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, apnea_countdown_time: { num: 13, name: "apnea_countdown_time", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, backlight_mode: { num: 14, name: "backlight_mode", type: "dive_backlight_mode", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, backlight_brightness: { num: 15, name: "backlight_brightness", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, backlight_timeout: { num: 16, name: "backlight_timeout", type: "backlight_timeout", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, repeat_dive_interval: { num: 17, name: "repeat_dive_interval", type: "uint16", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, safety_stop_time: { num: 18, name: "safety_stop_time", type: "uint16", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, heart_rate_source_type: { num: 19, name: "heart_rate_source_type", type: "source_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, heart_rate_source: { num: 20, name: "heart_rate_source", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [{ name: "heart_rate_antplus_device_type", type: "antplus_device_type", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "heart_rate_source_type", value: 1 }] }, { name: "heart_rate_local_device_type", type: "local_device_type", array: "", scale: 1, offset: 0, units: "", bits: [], components: [], hasComponents: false, map: [{ name: "heart_rate_source_type", value: 5 }] }] }, travel_gas: { num: 21, name: "travel_gas", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ccr_low_setpoint_switch_mode: { num: 22, name: "ccr_low_setpoint_switch_mode", type: "ccr_setpoint_switch_mode", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ccr_low_setpoint: { num: 23, name: "ccr_low_setpoint", type: "uint8", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ccr_low_setpoint_depth: { num: 24, name: "ccr_low_setpoint_depth", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ccr_high_setpoint_switch_mode: { num: 25, name: "ccr_high_setpoint_switch_mode", type: "ccr_setpoint_switch_mode", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ccr_high_setpoint: { num: 26, name: "ccr_high_setpoint", type: "uint8", array: "false", scale: 100, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ccr_high_setpoint_depth: { num: 27, name: "ccr_high_setpoint_depth", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, gas_consumption_display: { num: 29, name: "gas_consumption_display", type: "gas_consumption_rate_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, up_key_enabled: { num: 30, name: "up_key_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, dive_sounds: { num: 35, name: "dive_sounds", type: "tone", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, last_stop_multiple: { num: 36, name: "last_stop_multiple", type: "uint8", array: "false", scale: 10, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, no_fly_time_mode: { num: 37, name: "no_fly_time_mode", type: "no_fly_time_mode", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, dive_gas: { value: 259, name: "dive_gas", fields: { helium_content: { num: 0, name: "helium_content", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, oxygen_content: { num: 1, name: "oxygen_content", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, status: { num: 2, name: "status", type: "dive_gas_status", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mode: { num: 3, name: "mode", type: "dive_gas_mode", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, dive_alarm: { value: 262, name: "dive_alarm", fields: { depth: { num: 0, name: "depth", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time: { num: 1, name: "time", type: "sint32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enabled: { num: 2, name: "enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, alarm_type: { num: 3, name: "alarm_type", type: "dive_alarm_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sound: { num: 4, name: "sound", type: "tone", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, dive_types: { num: 5, name: "dive_types", type: "sub_sport", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, id: { num: 6, name: "id", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, popup_enabled: { num: 7, name: "popup_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, trigger_on_descent: { num: 8, name: "trigger_on_descent", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, trigger_on_ascent: { num: 9, name: "trigger_on_ascent", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, repeating: { num: 10, name: "repeating", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, speed: { num: 11, name: "speed", type: "sint32", array: "false", scale: 1e3, offset: 0, units: "mps", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, exercise_title: { value: 264, name: "exercise_title", fields: { exercise_category: { num: 0, name: "exercise_category", type: "exercise_category", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, exercise_name: { num: 1, name: "exercise_name", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, wkt_step_name: { num: 2, name: "wkt_step_name", type: "string", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, dive_summary: { value: 268, name: "dive_summary", fields: { reference_mesg: { num: 0, name: "reference_mesg", type: "mesg_num", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, reference_index: { num: 1, name: "reference_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_depth: { num: 2, name: "avg_depth", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_depth: { num: 3, name: "max_depth", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, surface_interval: { num: 4, name: "surface_interval", type: "uint32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_cns: { num: 5, name: "start_cns", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_cns: { num: 6, name: "end_cns", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_n2: { num: 7, name: "start_n2", type: "uint16", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_n2: { num: 8, name: "end_n2", type: "uint16", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, o2_toxicity: { num: 9, name: "o2_toxicity", type: "uint16", array: "false", scale: 1, offset: 0, units: "OTUs", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, dive_number: { num: 10, name: "dive_number", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, bottom_time: { num: 11, name: "bottom_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_pressure_sac: { num: 12, name: "avg_pressure_sac", type: "uint16", array: "false", scale: 100, offset: 0, units: "bar/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_volume_sac: { num: 13, name: "avg_volume_sac", type: "uint16", array: "false", scale: 100, offset: 0, units: "L/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_rmv: { num: 14, name: "avg_rmv", type: "uint16", array: "false", scale: 100, offset: 0, units: "L/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, descent_time: { num: 15, name: "descent_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, ascent_time: { num: 16, name: "ascent_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_ascent_rate: { num: 17, name: "avg_ascent_rate", type: "sint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_descent_rate: { num: 22, name: "avg_descent_rate", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_ascent_rate: { num: 23, name: "max_ascent_rate", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_descent_rate: { num: 24, name: "max_descent_rate", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, hang_time: { num: 25, name: "hang_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, spo2_data: { value: 269, name: "spo2_data", fields: { reading_spo2: { num: 0, name: "reading_spo2", type: "uint8", array: "false", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, reading_confidence: { num: 1, name: "reading_confidence", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, mode: { num: 2, name: "mode", type: "spo2_measurement_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, sleep_level: { value: 275, name: "sleep_level", fields: { sleep_level: { num: 0, name: "sleep_level", type: "sleep_level", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, jump: { value: 285, name: "jump", fields: { distance: { num: 0, name: "distance", type: "float32", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, height: { num: 1, name: "height", type: "float32", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, rotations: { num: 2, name: "rotations", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, hang_time: { num: 3, name: "hang_time", type: "float32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, score: { num: 4, name: "score", type: "float32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, position_lat: { num: 5, name: "position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, position_long: { num: 6, name: "position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, speed: { num: 7, name: "speed", type: "uint16", array: "false", scale: [1e3], offset: [0], units: ["m/s"], bits: [16], components: ["8"], isAccumulated: false, hasComponents: true, subFields: [] }, enhanced_speed: { num: 8, name: "enhanced_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, aad_accel_features: { value: 289, name: "aad_accel_features", fields: { time: { num: 0, name: "time", type: "uint16", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, energy_total: { num: 1, name: "energy_total", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, zero_cross_cnt: { num: 2, name: "zero_cross_cnt", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, instance: { num: 3, name: "instance", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time_above_threshold: { num: 4, name: "time_above_threshold", type: "uint16", array: "false", scale: 25, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, beat_intervals: { value: 290, name: "beat_intervals", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time: { num: 1, name: "time", type: "uint16", array: "true", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, respiration_rate: { value: 297, name: "respiration_rate", fields: { respiration_rate: { num: 0, name: "respiration_rate", type: "sint16", array: "false", scale: 100, offset: 0, units: "breaths/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hsa_accelerometer_data: { value: 302, name: "hsa_accelerometer_data", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sampling_interval: { num: 1, name: "sampling_interval", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, accel_x: { num: 2, name: "accel_x", type: "sint16", array: "true", scale: 1.024, offset: 0, units: "mG", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, accel_y: { num: 3, name: "accel_y", type: "sint16", array: "true", scale: 1.024, offset: 0, units: "mG", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, accel_z: { num: 4, name: "accel_z", type: "sint16", array: "true", scale: 1.024, offset: 0, units: "mG", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp32k: { num: 5, name: "timestamp32k", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hsa_step_data: { value: 304, name: "hsa_step_data", fields: { processing_interval: { num: 0, name: "processing_interval", type: "uint16", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, steps: { num: 1, name: "steps", type: "uint32", array: "true", scale: 1, offset: 0, units: "steps", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hsa_spo2_data: { value: 305, name: "hsa_spo2_data", fields: { processing_interval: { num: 0, name: "processing_interval", type: "uint16", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, reading_spo2: { num: 1, name: "reading_spo2", type: "uint8", array: "true", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, confidence: { num: 2, name: "confidence", type: "uint8", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hsa_stress_data: { value: 306, name: "hsa_stress_data", fields: { processing_interval: { num: 0, name: "processing_interval", type: "uint16", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, stress_level: { num: 1, name: "stress_level", type: "sint8", array: "true", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hsa_respiration_data: { value: 307, name: "hsa_respiration_data", fields: { processing_interval: { num: 0, name: "processing_interval", type: "uint16", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, respiration_rate: { num: 1, name: "respiration_rate", type: "sint16", array: "true", scale: 100, offset: 0, units: "breaths/min", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hsa_heart_rate_data: { value: 308, name: "hsa_heart_rate_data", fields: { processing_interval: { num: 0, name: "processing_interval", type: "uint16", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, status: { num: 1, name: "status", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, heart_rate: { num: 2, name: "heart_rate", type: "uint8", array: "true", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, split: { value: 312, name: "split", fields: { split_type: { num: 0, name: "split_type", type: "split_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_elapsed_time: { num: 1, name: "total_elapsed_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_timer_time: { num: 2, name: "total_timer_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_distance: { num: 3, name: "total_distance", type: "uint32", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_speed: { num: 4, name: "avg_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_time: { num: 9, name: "start_time", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_ascent: { num: 13, name: "total_ascent", type: "uint16", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_descent: { num: 14, name: "total_descent", type: "uint16", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_position_lat: { num: 21, name: "start_position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_position_long: { num: 22, name: "start_position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_position_lat: { num: 23, name: "end_position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_position_long: { num: 24, name: "end_position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_speed: { num: 25, name: "max_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_vert_speed: { num: 26, name: "avg_vert_speed", type: "sint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_time: { num: 27, name: "end_time", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_calories: { num: 28, name: "total_calories", type: "uint32", array: "false", scale: 1, offset: 0, units: "kcal", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_elevation: { num: 74, name: "start_elevation", type: "uint32", array: "false", scale: 5, offset: 500, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_moving_time: { num: 110, name: "total_moving_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, split_summary: { value: 313, name: "split_summary", fields: { split_type: { num: 0, name: "split_type", type: "split_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, num_splits: { num: 3, name: "num_splits", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_timer_time: { num: 4, name: "total_timer_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_distance: { num: 5, name: "total_distance", type: "uint32", array: "false", scale: 100, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_speed: { num: 6, name: "avg_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_speed: { num: 7, name: "max_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_ascent: { num: 8, name: "total_ascent", type: "uint16", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_descent: { num: 9, name: "total_descent", type: "uint16", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_heart_rate: { num: 10, name: "avg_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_heart_rate: { num: 11, name: "max_heart_rate", type: "uint8", array: "false", scale: 1, offset: 0, units: "bpm", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_vert_speed: { num: 12, name: "avg_vert_speed", type: "sint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_calories: { num: 13, name: "total_calories", type: "uint32", array: "false", scale: 1, offset: 0, units: "kcal", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, total_moving_time: { num: 77, name: "total_moving_time", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hsa_body_battery_data: { value: 314, name: "hsa_body_battery_data", fields: { processing_interval: { num: 0, name: "processing_interval", type: "uint16", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, level: { num: 1, name: "level", type: "sint8", array: "true", scale: 1, offset: 0, units: "percent", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, charged: { num: 2, name: "charged", type: "sint16", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, uncharged: { num: 3, name: "uncharged", type: "sint16", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hsa_event: { value: 315, name: "hsa_event", fields: { event_id: { num: 0, name: "event_id", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, climb_pro: { value: 317, name: "climb_pro", fields: { position_lat: { num: 0, name: "position_lat", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, position_long: { num: 1, name: "position_long", type: "sint32", array: "false", scale: 1, offset: 0, units: "semicircles", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, climb_pro_event: { num: 2, name: "climb_pro_event", type: "climb_pro_event", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, climb_number: { num: 3, name: "climb_number", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, climb_category: { num: 4, name: "climb_category", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, current_dist: { num: 5, name: "current_dist", type: "float32", array: "false", scale: 1, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, tank_update: { value: 319, name: "tank_update", fields: { sensor: { num: 0, name: "sensor", type: "ant_channel_id", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, pressure: { num: 1, name: "pressure", type: "uint16", array: "false", scale: 100, offset: 0, units: "bar", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, tank_summary: { value: 323, name: "tank_summary", fields: { sensor: { num: 0, name: "sensor", type: "ant_channel_id", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, start_pressure: { num: 1, name: "start_pressure", type: "uint16", array: "false", scale: 100, offset: 0, units: "bar", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, end_pressure: { num: 2, name: "end_pressure", type: "uint16", array: "false", scale: 100, offset: 0, units: "bar", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, volume_used: { num: 3, name: "volume_used", type: "uint32", array: "false", scale: 100, offset: 0, units: "L", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, sleep_assessment: { value: 346, name: "sleep_assessment", fields: { combined_awake_score: { num: 0, name: "combined_awake_score", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, awake_time_score: { num: 1, name: "awake_time_score", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, awakenings_count_score: { num: 2, name: "awakenings_count_score", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, deep_sleep_score: { num: 3, name: "deep_sleep_score", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sleep_duration_score: { num: 4, name: "sleep_duration_score", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, light_sleep_score: { num: 5, name: "light_sleep_score", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, overall_sleep_score: { num: 6, name: "overall_sleep_score", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sleep_quality_score: { num: 7, name: "sleep_quality_score", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sleep_recovery_score: { num: 8, name: "sleep_recovery_score", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, rem_sleep_score: { num: 9, name: "rem_sleep_score", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sleep_restlessness_score: { num: 10, name: "sleep_restlessness_score", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, awakenings_count: { num: 11, name: "awakenings_count", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, interruptions_score: { num: 14, name: "interruptions_score", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, average_stress_during_sleep: { num: 15, name: "average_stress_during_sleep", type: "uint16", array: "false", scale: 100, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hrv_status_summary: { value: 370, name: "hrv_status_summary", fields: { weekly_average: { num: 0, name: "weekly_average", type: "uint16", array: "false", scale: 128, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, last_night_average: { num: 1, name: "last_night_average", type: "uint16", array: "false", scale: 128, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, last_night5_min_high: { num: 2, name: "last_night5_min_high", type: "uint16", array: "false", scale: 128, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, baseline_low_upper: { num: 3, name: "baseline_low_upper", type: "uint16", array: "false", scale: 128, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, baseline_balanced_lower: { num: 4, name: "baseline_balanced_lower", type: "uint16", array: "false", scale: 128, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, baseline_balanced_upper: { num: 5, name: "baseline_balanced_upper", type: "uint16", array: "false", scale: 128, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, status: { num: 6, name: "status", type: "hrv_status", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hrv_value: { value: 371, name: "hrv_value", fields: { value: { num: 0, name: "value", type: "uint16", array: "false", scale: 128, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, raw_bbi: { value: 372, name: "raw_bbi", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, data: { num: 1, name: "data", type: "uint16", array: "true", scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], offset: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], units: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], bits: [14, 1, 1, 14, 1, 1, 14, 1, 1, 14, 1, 1, 14, 1, 1, 14, 1, 1, 14, 1, 1, 14, 1, 1, 14, 1, 1, 14, 1, 1, 14, 1, 1, 14, 1, 1, 14, 1, 1, 14, 1, 1, 14, 1, 1], components: ["2", "3", "4", "2", "3", "4", "2", "3", "4", "2", "3", "4", "2", "3", "4", "2", "3", "4", "2", "3", "4", "2", "3", "4", "2", "3", "4", "2", "3", "4", "2", "3", "4", "2", "3", "4", "2", "3", "4", "2", "3", "4", "2", "3", "4"], isAccumulated: false, hasComponents: true, subFields: [] }, time: { num: 2, name: "time", type: "uint16", array: "true", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, quality: { num: 3, name: "quality", type: "uint8", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, gap: { num: 4, name: "gap", type: "uint8", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, device_aux_battery_info: { value: 375, name: "device_aux_battery_info", fields: { device_index: { num: 0, name: "device_index", type: "device_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, battery_voltage: { num: 1, name: "battery_voltage", type: "uint16", array: "false", scale: 256, offset: 0, units: "V", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, battery_status: { num: 2, name: "battery_status", type: "battery_status", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, battery_identifier: { num: 3, name: "battery_identifier", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hsa_gyroscope_data: { value: 376, name: "hsa_gyroscope_data", fields: { timestamp_ms: { num: 0, name: "timestamp_ms", type: "uint16", array: "false", scale: 1, offset: 0, units: "ms", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sampling_interval: { num: 1, name: "sampling_interval", type: "uint16", array: "false", scale: 1, offset: 0, units: "1/32768 s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, gyro_x: { num: 2, name: "gyro_x", type: "sint16", array: "true", scale: 28.57143, offset: 0, units: "deg/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, gyro_y: { num: 3, name: "gyro_y", type: "sint16", array: "true", scale: 28.57143, offset: 0, units: "deg/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, gyro_z: { num: 4, name: "gyro_z", type: "sint16", array: "true", scale: 28.57143, offset: 0, units: "deg/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp32k: { num: 5, name: "timestamp32k", type: "uint32", array: "false", scale: 1, offset: 0, units: "1/32768 s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, chrono_shot_session: { value: 387, name: "chrono_shot_session", fields: { min_speed: { num: 0, name: "min_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, max_speed: { num: 1, name: "max_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, avg_speed: { num: 2, name: "avg_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, shot_count: { num: 3, name: "shot_count", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, projectile_type: { num: 4, name: "projectile_type", type: "projectile_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, grain_weight: { num: 5, name: "grain_weight", type: "uint32", array: "false", scale: 10, offset: 0, units: "gr", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, standard_deviation: { num: 6, name: "standard_deviation", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, chrono_shot_data: { value: 388, name: "chrono_shot_data", fields: { shot_speed: { num: 0, name: "shot_speed", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m/s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, shot_num: { num: 1, name: "shot_num", type: "uint16", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hsa_configuration_data: { value: 389, name: "hsa_configuration_data", fields: { data: { num: 0, name: "data", type: "byte", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, data_size: { num: 1, name: "data_size", type: "uint8", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, dive_apnea_alarm: { value: 393, name: "dive_apnea_alarm", fields: { depth: { num: 0, name: "depth", type: "uint32", array: "false", scale: 1e3, offset: 0, units: "m", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, time: { num: 1, name: "time", type: "sint32", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, enabled: { num: 2, name: "enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, alarm_type: { num: 3, name: "alarm_type", type: "dive_alarm_type", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, sound: { num: 4, name: "sound", type: "tone", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, dive_types: { num: 5, name: "dive_types", type: "sub_sport", array: "true", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, id: { num: 6, name: "id", type: "uint32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, popup_enabled: { num: 7, name: "popup_enabled", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, trigger_on_descent: { num: 8, name: "trigger_on_descent", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, trigger_on_ascent: { num: 9, name: "trigger_on_ascent", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, repeating: { num: 10, name: "repeating", type: "bool", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, speed: { num: 11, name: "speed", type: "sint32", array: "false", scale: 1e3, offset: 0, units: "mps", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, message_index: { num: 254, name: "message_index", type: "message_index", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, skin_temp_overnight: { value: 398, name: "skin_temp_overnight", fields: { local_timestamp: { num: 0, name: "local_timestamp", type: "local_date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, average_deviation: { num: 1, name: "average_deviation", type: "float32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, average7_day_deviation: { num: 2, name: "average7_day_deviation", type: "float32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, nightly_value: { num: 4, name: "nightly_value", type: "float32", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } }, hsa_wrist_temperature_data: { value: 409, name: "hsa_wrist_temperature_data", fields: { processing_interval: { num: 0, name: "processing_interval", type: "uint16", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, value: { num: 1, name: "value", type: "uint16", array: "true", scale: 1e3, offset: 0, units: "degC", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] }, timestamp: { num: 253, name: "timestamp", type: "date_time", array: "false", scale: 1, offset: 0, units: "s", bits: [], components: [], isAccumulated: false, hasComponents: false, subFields: [] } } } };
      function T(p) {
        return Object.keys(p);
      }
      var k = [0, 52225, 55297, 5120, 61441, 15360, 10240, 58369, 40961, 27648, 30720, 46081, 20480, 39937, 34817, 17408];
      function C(p, e, a) {
        let n = a?.array === "true", s;
        if (a?.hasComponents && a.components.length >= 2) {
          if (s = a.bits.reduce((d, l) => d + l, 0), n = false, s & 7) throw new Error(`Invalid bit-size ${s} for component bit field`);
          if (!Array.isArray(e)) throw new Error(`Wanted an array for component field, but got ${e}`);
          switch (s >>= 3, p) {
            case "byte":
            case "uint8":
            case "uint16":
            case "uint32":
              return { type: p, size: s };
          }
          throw new Error(`Unexpected type '${p}' for component field`);
        }
        switch (p) {
          case "string": {
            if (typeof e != "string") throw new Error("string without a length");
            s = e.length, n = false;
            break;
          }
          case "sint8":
          case "uint8":
          case "uint8z":
          case "byte":
          case "enum":
            s = 1;
            break;
          case "sint16":
          case "uint16":
          case "uint16z":
            s = 2;
            break;
          case "sint32":
          case "uint32":
          case "float32":
          case "uint32z":
            s = 4;
            break;
          case "float64":
          case "sint64":
          case "uint64":
          case "uint64z":
            s = 8;
            break;
          default:
            throw new Error(`Unexpected fit type ${p}`);
        }
        if (n) {
          if (!Array.isArray(e)) throw new Error("expected an array");
          s *= e.length;
        }
        return { type: p, size: s };
      }
      var F = A.record.fields.timestamp.num;
      var S = class {
        constructor(e) {
          __publicField(this, "buffer");
          __publicField(this, "offset", 0);
          __publicField(this, "crc");
          __publicField(this, "definitionMap", /* @__PURE__ */ new Map());
          __publicField(this, "nextLocalDef", 0);
          __publicField(this, "localDefs", []);
          __publicField(this, "scratch", new DataView(new ArrayBuffer(8)));
          __publicField(this, "devFieldTypes", /* @__PURE__ */ new Map());
          __publicField(this, "lastTimeStamp");
          __publicField(this, "options");
          e === true || e === false ? this.options = { noCompressedTimestamps: e } : this.options = e ?? { noCompressedTimestamps: true }, this.buffer = new DataView(new ArrayBuffer(16384)), this.crc = 0, this.file_header();
        }
        ensureSpace(e) {
          let a = this.offset + e;
          if (this.buffer.byteLength >= a) return;
          let n = new Uint8Array(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength), s = new Uint8Array(a * 2);
          s.set(n), this.buffer = new DataView(s.buffer);
        }
        write_crc() {
          let e = this.crc;
          this.word(e), this.crc = 0;
        }
        update_crc(e) {
          let a = this.crc, n = k[a & 15];
          a = a >> 4 & 4095, a = a ^ n ^ k[e & 15], n = k[a & 15], a = a >> 4 & 4095, a = a ^ n ^ k[e >> 4 & 15], this.crc = a;
        }
        byte(e) {
          return this.ensureSpace(1), e &= 255, this.update_crc(e), this.buffer.setUint8(this.offset++, e), this;
        }
        word(e) {
          return this.byte(e).byte(e >> 8);
        }
        long(e) {
          return this.word(e).word(e >> 16);
        }
        float(e) {
          this.scratch.setFloat32(0, e, true);
          for (let a = 0; a < 4; a++) this.byte(this.scratch.getUint8(a));
          return this;
        }
        double(e) {
          this.scratch.setFloat64(0, e, true);
          for (let a = 0; a < 8; a++) this.byte(this.scratch.getUint8(a));
          return this;
        }
        str(e) {
          for (let a = 0; a < e.length; a++) this.byte(e.charCodeAt(a));
          return this;
        }
        field(e, a, n) {
          return this.byte(e).byte(a).byte(n);
        }
        definition(e, a, n, s) {
          return this.byte(64 + (s.length ? 32 : 0) + (e & 15)), this.byte(0), this.byte(0), this.word(a), this.byte(n.length), n.forEach((d) => this.field(...d)), s.length && (this.byte(s.length), s.forEach((d) => this.field(...d))), this;
        }
        file_header(e = 0) {
          return this.byte(14), this.byte(32), this.word(2195), this.long(e), this.str(".FIT"), this.write_crc(), this;
        }
        dev_field_key(e, a) {
          let n = this.devFieldTypes.get(e);
          if (n == null) throw new Error(`Missing definition for developer field ${e}`);
          let { size: s } = C(n.base_type, a);
          return `dev-field-${e}-${s}`;
        }
        time(e) {
          return Math.round(+e / 1e3 - 631065600);
        }
        latlng(e) {
          if (e == null) return e;
          let a = e / (Math.PI * 2) + 0.5, n = a - Math.floor(a);
          return Math.round((n - 0.5) * Math.pow(2, 32));
        }
        finish() {
          this.write_crc();
          let { offset: e } = this;
          return this.offset = 0, this.file_header(e - 16), this.offset = e, new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteOffset + this.offset);
        }
        writeFieldValue(e, a, n, s) {
          if (s?.hasComponents && s.components.length > 1) {
            let _ = a;
            if (!Array.isArray(_)) throw new Error(`Expected array of components for field '${s.name}', but got ${a}`);
            let u = 0n, g = 0;
            for (let b = s.components.length; b--; ) {
              let t = s.bits[b], i = Array.isArray(s.scale) ? s.scale[b] : null, o = Array.isArray(s.offset) ? s.offset[b] : null;
              if (t == null || i == null || o == null) throw new Error(`Inconsistent component definition for field '${s.name}'`);
              let m = _[b];
              if (typeof m != "number") throw new Error(`Expected a numeric components, but got: ${m}`);
              u <<= BigInt(t), u |= BigInt((m + o) * i & (1 << t) - 1), g += t;
            }
            let r = 0;
            switch (e.base_type) {
              case "byte":
              case "uint8":
                r = 8;
                break;
              case "uint16":
                r = 16;
                break;
              case "uint32":
                r = 32;
                break;
              default:
                throw new Error(`Unexpected base_type '${e.base_type}' for component field`);
            }
            if (g % r) throw new Error(`bit size must be a multiple of ${r}`);
            a = Array(g / r).fill(0).map(() => {
              let b = Number(u & (1n << BigInt(r)) - 1n);
              return u >>= BigInt(r), b;
            });
          }
          if (n === "string") {
            if (typeof a != "string" || a.length !== e.size) throw new Error(`String mismatch. Expected string of length ${e.size}, but got: ${a}`);
            this.str(a);
            return;
          }
          if (Array.isArray(a)) {
            let _ = -1;
            switch (e.base_type) {
              case "byte":
              case "uint8":
              case "uint8z":
                _ = 1;
                break;
              case "word":
              case "uint16":
              case "uint16z":
                _ = 2;
                break;
              case "long":
              case "uint32":
              case "uint32z":
                _ = 4;
                break;
              default:
                throw new Error(`Unexpected base type for array: ${e.base_type}`);
            }
            if (e.size !== _ * a.length) throw new Error(`Array mismatch. Expected array of length ${e.size / _}, but got: ${a.length}`);
            a.forEach((u) => {
              switch (e.base_type) {
                case "byte":
                case "uint8":
                case "uint8z":
                  this.byte(u);
                  break;
                case "word":
                case "uint16":
                case "uint16z":
                  this.word(u);
                  break;
                case "long":
                case "uint32":
                case "uint32z":
                  this.long(u);
                  break;
                default:
                  throw new Error(`Unexpected base type for array: ${e.base_type}`);
              }
            });
            return;
          }
          let d = w[n], l = 0;
          if (typeof a == "string") {
            if (l = d?.[a], l == null && (s?.subFields.length && s.subFields.some((_) => {
              let u = w[_.type];
              return u ? (l = u?.[a], l != null) : false;
            }), l == null)) throw new Error(`Missing value ${a} in field ${e.key}`);
          } else if (typeof a == "number") l = a;
          else if (d?.mask) {
            let _ = a;
            l = _.value, _.options?.forEach((u) => {
              let g = d[u];
              if (g == null) throw new Error(`Missing option ${u} in field ${e.key}`);
              l |= g;
            });
          } else throw new Error("Unexpected field/value types");
          if (s != null && (l = (l + (Array.isArray(s.offset) ? s.offset[0] : s.offset)) * (Array.isArray(s.scale) ? s.scale[0] : s.scale)), e.base_type.startsWith("float")) {
            if (e.size === 4) {
              this.float(l);
              return;
            }
            if (e.size === 8) {
              this.double(l);
              return;
            }
          } else {
            if (e.size === 1) {
              this.byte(l & 255);
              return;
            }
            if (e.size === 2) {
              this.word(l & 65535);
              return;
            }
            if (e.size === 4) {
              this.long(l & 4294967295);
              return;
            }
          }
          throw new Error(`Unsupported size: ${e.size}`);
        }
        getPreferredField(e, a) {
          let n = e.fields[a];
          if (!n) throw new Error(`Didn't find field '${a}' in message '${e.name}'`);
          if (!this.options.usePreferredRecords || !n.hasComponents || n.components.length !== 1) return n;
          let s = Object.values(e.fields).find((d) => d.num === n.components[0]);
          if (!s) throw new Error(`Didn't find preferred field for '${e.name}:${n.name}`);
          return s;
        }
        writeMessage(e, a, n = null, s = false) {
          let d = (t) => {
            let i = this.localDefs[t];
            if (i) {
              let o = this.definitionMap.get(i);
              o && (this.definitionMap.delete(i), this.localDefs[o.local] = "", o.localCompressed >= 0 && (this.localDefs[o.localCompressed] = "")), this.localDefs[t] = "";
            }
          }, l = A[e], _ = !this.options.noCompressedTimestamps && this.lastTimeStamp != null && l.fields.timestamp?.num === F && "timestamp" in a && typeof a.timestamp == "number" && a.timestamp >= this.lastTimeStamp && a.timestamp - this.lastTimeStamp < 32 && a.timestamp, u = T(a).filter((t) => a[t] != null);
          u.sort((t, i) => {
            let o = l.fields[t].num, m = l.fields[i].num;
            return o - m;
          });
          let g = `${e}:${u.map((t) => {
            let i = t, o = l.fields[t];
            if ((!o.hasComponents || o.components.length <= 1) && o?.array === "true") {
              let m = a[t];
              if (o?.type === "string") {
                if (typeof m != "string") throw new Error(`Expected a string value for ${e}:${t} but got ${typeof m}`);
              } else if (!Array.isArray(m)) throw new Error(`Expected an array value for ${e}:${t} but got ${typeof m}`);
              i += `:${m.length}`;
            }
            return i;
          }).concat(n?.map((t) => this.dev_field_key(t.field_num, t.value)) ?? []).join("*")}`, r = this.definitionMap.get(g);
          if (!r) {
            let t = this.nextLocalDef & 15;
            d(t);
            let i = false, o = _ && t <= 3 && s ? t : -1, m = u.flatMap((c) => {
              let f = this.getPreferredField(l, c);
              if (f.name === "timestamp" && f.num === F && (i = true, o >= 0)) return [];
              let h = -1, y = "", v = w[f.type];
              if (v ? v._max <= 255 ? (h = 1, y = v._max < 255 ? "mask" in v ? "uint8" : "enum" : v._min >= 1 ? "uint8z" : "") : v._max <= 65535 ? (h = 2, y = "uint16") : v._max <= 4294967295 && (h = 4, y = "uint32") : { type: y, size: h } = C(f.type, a[c], f), h < 0) throw new Error(`Unsupported size for field '${c}' in message '${e}'`);
              let P = w.fit_base_type[y];
              if (P == null) throw new Error(`Invalid base type '${y}' for field '${c}' in message '${e}'`);
              return { key: c, size: h, base_type: y, info: [f.num, h, P] };
            });
            r = { global: e, local: t, localCompressed: o, hasTimestamp: i, fields: m, devFields: n?.flatMap((c) => {
              let f = this.devFieldTypes.get(c.field_num);
              if (f == null) throw new Error(`Missing definition for developer field ${c.field_num}`);
              let { size: h, type: y } = C(f.base_type, c.value);
              return { key: c.field_num.toString(), base_type: y, size: h, info: [c.field_num, h, f.developer_data_index] };
            }) ?? [] }, this.localDefs[t] = g, this.nextLocalDef = t + 1 & 15, this.definitionMap.set(g, r), this.definition(r.local, l.value, r.fields.map((c) => c.info), r.devFields.map((c) => c.info));
          }
          if (_ && r.localCompressed < 0 && e === "record") {
            let t = this.nextLocalDef < 4 ? this.nextLocalDef : 0;
            t === r.local && (t = t + 1 & 3), d(t), r.localCompressed = t, this.localDefs[t] = g, this.definition(t, l.value, r.fields.map((i) => i.info).filter((i) => i[0] !== F), r.devFields.map((i) => i.info));
          }
          let b = _ && r.localCompressed >= 0 ? 128 + (r.localCompressed << 5) + (_ & 31) : r.local;
          if (this.byte(b), e === "field_description") {
            let t = a, i = t.fit_base_type_id, o = typeof i == "string" && i in w.fit_base_type ? i : Object.entries(w.fit_base_type).find(([, f]) => f === i)?.[0];
            if (o == null) throw new Error("Missing fit_base_type_id in developer field_description");
            let m = t.field_definition_number;
            if (m == null) throw new Error("Missing field_definition_number in developer field_description");
            let c = t.developer_data_index;
            if (c == null) throw new Error("Missing developer_data_index in developer field_description");
            this.devFieldTypes.set(m, { base_type: o, developer_data_index: c });
          }
          r.fields.forEach((t) => {
            let i = a[t.key];
            if (r.hasTimestamp && t.key === "timestamp") {
              if (b & 128) return;
              this.lastTimeStamp = i;
            }
            let o = this.getPreferredField(l, t.key);
            this.writeFieldValue(t, i, o.type, o);
          }), r.devFields.forEach((t, i) => {
            let o = n[i], m = this.devFieldTypes.get(o.field_num);
            if (!m) throw new Error(`Missing definition for developer field ${o.field_num}`);
            this.writeFieldValue(t, o.value, m.base_type, null);
          }), s && (d(r.local), (r.local + 1 & 15) === this.nextLocalDef && (this.nextLocalDef = r.local));
        }
      };
    }
  });

  // src/index.js
  var index_exports = {};
  __export(index_exports, {
    applyPathToFIT: () => applyPathToFIT,
    fromArrayBuffer: () => fromArrayBuffer,
    fromFile: () => fromFile2,
    imageCenterlineFromGray: () => centerlineFromGray,
    imageEdgePreviewFromGray: () => edgePreviewFromGray,
    imageEdgesFromGray: () => edgesFromGray,
    imageFromFile: () => fromFile,
    imageFromURL: () => fromURL,
    imageGrayToRgba: () => grayToRgba,
    imagePathFromGray: () => pathFromGray,
    imagePreprocessGrayFromArrayBuffer: () => preprocessGrayFromArrayBuffer,
    imagePreprocessGrayFromFile: () => preprocessGrayFromFile,
    imagePreprocessGrayFromURL: () => preprocessGrayFromURL,
    mergeFITSensorData: () => mergeFITSensorData
  });

  // node_modules/fit-file-parser/dist/binary.js
  var import_buffer = __toESM(require_buffer(), 1);

  // node_modules/fit-file-parser/dist/fit.js
  var metersInOneKilometer = 1e3;
  var secondsInOneHour = 3600;
  var metersInOneMile = 1609.344;
  var centiBarsInOneBar = 100;
  var psiInOneBar = 14.5037738;
  var FIT = {
    scConst: 180 / Math.pow(2, 31),
    options: {
      speedUnits: {
        // native speed unit: meters per second [m/s]
        "m/s": {
          multiplier: 1,
          offset: 0
        },
        // miles per hour [mph]
        "mph": {
          multiplier: secondsInOneHour / metersInOneMile,
          offset: 0
        },
        // kilometers per hour [km/h]
        "km/h": {
          multiplier: secondsInOneHour / metersInOneKilometer,
          offset: 0
        }
      },
      lengthUnits: {
        // native length unit: meters [m]
        m: {
          multiplier: 1,
          offset: 0
        },
        // (international) mile [mi]
        mi: {
          multiplier: 1 / metersInOneMile,
          offset: 0
        },
        // kilometer [km]
        km: {
          multiplier: 1 / metersInOneKilometer,
          offset: 0
        }
      },
      temperatureUnits: {
        // native temperature unit: degree Celsius [°C]
        "\xB0C": {
          multiplier: 1,
          offset: 0
        },
        // kelvin [K]
        "kelvin": {
          multiplier: 1,
          offset: -273.15
        },
        // degree fahrenheit [°F]
        "fahrenheit": {
          multiplier: 9 / 5,
          offset: 32
        }
      },
      pressureUnits: {
        cbar: {
          multiplier: 1,
          offset: 0
        },
        bar: {
          multiplier: 1 / centiBarsInOneBar,
          offset: 0
        },
        psi: {
          multiplier: 1 / centiBarsInOneBar * psiInOneBar,
          offset: 0
        }
      }
    },
    messages: {
      0: {
        name: "file_id",
        0: { field: "type", type: "file", scale: null, offset: 0, units: "" },
        1: {
          field: "manufacturer",
          type: "manufacturer",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "product",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "serial_number",
          type: "uint32z",
          scale: null,
          offset: 0,
          units: ""
        },
        4: {
          field: "time_created",
          type: "date_time",
          scale: null,
          offset: 0,
          units: ""
        },
        5: { field: "number", type: "uint16", scale: null, offset: 0, units: "" },
        8: {
          field: "product_name",
          type: "string",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      1: {
        name: "capabilities",
        0: {
          field: "languages",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "sports",
          type: "sport_bits_0",
          scale: null,
          offset: 0,
          units: ""
        },
        21: {
          field: "workouts_supported",
          type: "workout_capabilities",
          scale: null,
          offset: 0,
          units: ""
        },
        23: {
          field: "connectivity_supported",
          type: "connectivity_capabilities",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      2: {
        name: "device_settings",
        0: {
          field: "active_time_zone",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "utc_offset",
          type: "uint32",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "time_offset",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "s"
        },
        5: {
          field: "time_zone_offset",
          type: "sint8",
          scale: 4,
          offset: 0,
          units: "hr"
        },
        55: {
          field: "display_orientation",
          type: "display_orientation",
          scale: null,
          offset: 0,
          units: ""
        },
        56: {
          field: "mounting_side",
          type: "side",
          scale: null,
          offset: 0,
          units: ""
        },
        94: {
          field: "number_of_screens",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        95: {
          field: "smart_notification_display_orientation",
          type: "display_orientation",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      3: {
        name: "user_profile",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        0: {
          field: "friendly_name",
          type: "string",
          scale: null,
          offset: 0,
          units: ""
        },
        1: { field: "gender", type: "gender", scale: null, offset: 0, units: "" },
        2: {
          field: "age",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "years"
        },
        3: { field: "height", type: "uint8", scale: 100, offset: 0, units: "m" },
        4: { field: "weight", type: "uint16", scale: 10, offset: 0, units: "kg" },
        5: {
          field: "language",
          type: "language",
          scale: null,
          offset: 0,
          units: ""
        },
        6: {
          field: "elev_setting",
          type: "display_measure",
          scale: null,
          offset: 0,
          units: ""
        },
        7: {
          field: "weight_setting",
          type: "display_measure",
          scale: null,
          offset: 0,
          units: ""
        },
        8: {
          field: "resting_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        9: {
          field: "default_max_running_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        10: {
          field: "default_max_biking_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        11: {
          field: "default_max_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        12: {
          field: "hr_setting",
          type: "display_heart",
          scale: null,
          offset: 0,
          units: ""
        },
        13: {
          field: "speed_setting",
          type: "display_measure",
          scale: null,
          offset: 0,
          units: ""
        },
        14: {
          field: "dist_setting",
          type: "display_measure",
          scale: null,
          offset: 0,
          units: ""
        },
        16: {
          field: "power_setting",
          type: "display_power",
          scale: null,
          offset: 0,
          units: ""
        },
        17: {
          field: "activity_class",
          type: "activity_class",
          scale: null,
          offset: 0,
          units: ""
        },
        18: {
          field: "position_setting",
          type: "display_position",
          scale: null,
          offset: 0,
          units: ""
        },
        21: {
          field: "temperature_setting",
          type: "display_measure",
          scale: null,
          offset: 0,
          units: ""
        },
        22: {
          field: "local_id",
          type: "user_local_id",
          scale: null,
          offset: 0,
          units: ""
        },
        23: {
          field: "global_id",
          type: "byte",
          scale: null,
          offset: 0,
          units: ""
        },
        28: {
          field: "wake_time",
          type: "localtime_into_day",
          scale: null,
          offset: 0,
          units: ""
        },
        29: {
          field: "sleep_time",
          type: "localtime_into_day",
          scale: null,
          offset: 0,
          units: ""
        },
        30: {
          field: "height_setting",
          type: "display_measure",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      4: {
        name: "hrm_profile",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        0: { field: "enabled", type: "bool", scale: null, offset: 0, units: "" },
        1: {
          field: "hrm_ant_id",
          type: "uint16z",
          scale: null,
          offset: 0,
          units: ""
        },
        2: { field: "log_hrv", type: "bool", scale: null, offset: 0, units: "" },
        3: {
          field: "hrm_ant_id_trans_type",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      5: {
        name: "sdm_profile",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        0: { field: "enabled", type: "bool", scale: null, offset: 0, units: "" },
        1: {
          field: "sdm_ant_id",
          type: "uint16z",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "sdm_cal_factor",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "%"
        },
        3: {
          field: "odometer",
          type: "uint32",
          scale: 100,
          offset: 0,
          units: "m"
        },
        4: {
          field: "speed_source",
          type: "bool",
          scale: null,
          offset: 0,
          units: ""
        },
        5: {
          field: "sdm_ant_id_trans_type",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        7: {
          field: "odometer_rollover",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      6: {
        name: "bike_profile",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        0: { field: "name", type: "string", scale: null, offset: 0, units: "" },
        1: { field: "sport", type: "sport", scale: null, offset: 0, units: "" },
        2: {
          field: "sub_sport",
          type: "sub_sport",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "odometer",
          type: "uint32",
          scale: 100,
          offset: 0,
          units: "m"
        },
        4: {
          field: "bike_spd_ant_id",
          type: "uint16z",
          scale: null,
          offset: 0,
          units: ""
        },
        5: {
          field: "bike_cad_ant_id",
          type: "uint16z",
          scale: null,
          offset: 0,
          units: ""
        },
        6: {
          field: "bike_spdcad_ant_id",
          type: "uint16z",
          scale: null,
          offset: 0,
          units: ""
        },
        7: {
          field: "bike_power_ant_id",
          type: "uint16z",
          scale: null,
          offset: 0,
          units: ""
        },
        8: {
          field: "custom_wheelsize",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m"
        },
        9: {
          field: "auto_wheelsize",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m"
        },
        10: {
          field: "bike_weight",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "kg"
        },
        11: {
          field: "power_cal_factor",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "%"
        },
        12: {
          field: "auto_wheel_cal",
          type: "bool",
          scale: null,
          offset: 0,
          units: ""
        },
        13: {
          field: "auto_power_zero",
          type: "bool",
          scale: null,
          offset: 0,
          units: ""
        },
        14: { field: "id", type: "uint8", scale: null, offset: 0, units: "" },
        15: {
          field: "spd_enabled",
          type: "bool",
          scale: null,
          offset: 0,
          units: ""
        },
        16: {
          field: "cad_enabled",
          type: "bool",
          scale: null,
          offset: 0,
          units: ""
        },
        17: {
          field: "spdcad_enabled",
          type: "bool",
          scale: null,
          offset: 0,
          units: ""
        },
        18: {
          field: "power_enabled",
          type: "bool",
          scale: null,
          offset: 0,
          units: ""
        },
        19: {
          field: "crank_length",
          type: "uint8",
          scale: 2,
          offset: -110,
          units: "mm"
        },
        20: { field: "enabled", type: "bool", scale: null, offset: 0, units: "" },
        21: {
          field: "bike_spd_ant_id_trans_type",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        22: {
          field: "bike_cad_ant_id_trans_type",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        23: {
          field: "bike_spdcad_ant_id_trans_type",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        24: {
          field: "bike_power_ant_id_trans_type",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        37: {
          field: "odometer_rollover",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        38: {
          field: "front_gear_num",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        39: {
          field: "front_gear",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        40: {
          field: "rear_gear_num",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        41: {
          field: "rear_gear",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        44: {
          field: "shimano_di2_enabled",
          type: "bool",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      7: {
        name: "zones_target",
        1: {
          field: "max_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "threshold_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "functional_threshold_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        5: {
          field: "hr_calc_type",
          type: "hr_zone_calc",
          scale: null,
          offset: 0,
          units: ""
        },
        7: {
          field: "pwr_calc_type",
          type: "pwr_zone_calc",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      8: {
        name: "hr_zone",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "high_bpm",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        2: { field: "name", type: "string", scale: null, offset: 0, units: "" }
      },
      9: {
        name: "power_zone",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "high_value",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        2: { field: "name", type: "string", scale: null, offset: 0, units: "" }
      },
      10: {
        name: "met_zone",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "high_bpm",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "calories",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "kcal / min"
        },
        3: {
          field: "fat_calories",
          type: "uint8",
          scale: 10,
          offset: 0,
          units: "kcal / min"
        }
      },
      12: {
        name: "sport",
        0: { field: "sport", type: "sport", scale: null, offset: 0, units: "" },
        1: {
          field: "sub_sport",
          type: "sub_sport",
          scale: null,
          offset: 0,
          units: ""
        },
        3: { field: "name", type: "string", scale: null, offset: 0, units: "" }
      },
      15: {
        name: "goal",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        0: { field: "sport", type: "sport", scale: null, offset: 0, units: "" },
        1: {
          field: "sub_sport",
          type: "sub_sport",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "start_date",
          type: "date_time",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "end_date",
          type: "date_time",
          scale: null,
          offset: 0,
          units: ""
        },
        4: { field: "type", type: "goal", scale: null, offset: 0, units: "" },
        5: { field: "value", type: "uint32", scale: null, offset: 0, units: "" },
        6: { field: "repeat", type: "bool", scale: null, offset: 0, units: "" },
        7: {
          field: "target_value",
          type: "uint32",
          scale: null,
          offset: 0,
          units: ""
        },
        8: {
          field: "recurrence",
          type: "goal_recurrence",
          scale: null,
          offset: 0,
          units: ""
        },
        9: {
          field: "recurrence_value",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        10: { field: "enabled", type: "bool", scale: null, offset: 0, units: "" }
      },
      18: {
        name: "session",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: "s"
        },
        0: { field: "event", type: "event", scale: null, offset: 0, units: "" },
        1: {
          field: "event_type",
          type: "event_type",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "start_time",
          type: "date_time",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "start_position_lat",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        4: {
          field: "start_position_long",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        5: { field: "sport", type: "sport", scale: null, offset: 0, units: "" },
        6: {
          field: "sub_sport",
          type: "sub_sport",
          scale: null,
          offset: 0,
          units: ""
        },
        7: {
          field: "total_elapsed_time",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        8: {
          field: "total_timer_time",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        9: {
          field: "total_distance",
          type: "uint32",
          scale: 100,
          offset: 0,
          units: "m"
        },
        10: {
          field: "total_cycles",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "cycles"
        },
        11: {
          field: "total_calories",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "kcal"
        },
        13: {
          field: "total_fat_calories",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "kcal"
        },
        14: {
          field: "avg_speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        15: {
          field: "max_speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        16: {
          field: "avg_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        17: {
          field: "max_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        18: {
          field: "avg_cadence",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "rpm"
        },
        19: {
          field: "max_cadence",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "rpm"
        },
        20: {
          field: "avg_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        21: {
          field: "max_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        22: {
          field: "total_ascent",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "m"
        },
        23: {
          field: "total_descent",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "m"
        },
        24: {
          field: "total_training_effect",
          type: "uint8",
          scale: 10,
          offset: 0,
          units: ""
        },
        25: {
          field: "first_lap_index",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        26: {
          field: "num_laps",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        27: {
          field: "event_group",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        28: {
          field: "trigger",
          type: "session_trigger",
          scale: null,
          offset: 0,
          units: ""
        },
        29: {
          field: "nec_lat",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        30: {
          field: "nec_long",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        31: {
          field: "swc_lat",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        32: {
          field: "swc_long",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        34: {
          field: "normalized_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        35: {
          field: "training_stress_score",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "tss"
        },
        36: {
          field: "intensity_factor",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "if"
        },
        37: {
          field: "left_right_balance",
          type: "left_right_balance_100",
          scale: 100,
          offset: 0,
          units: "%"
        },
        38: {
          field: "end_position_lat",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        39: {
          field: "end_position_long",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        41: {
          field: "avg_stroke_count",
          type: "uint32",
          scale: 10,
          offset: 0,
          units: "strokes/lap"
        },
        42: {
          field: "avg_stroke_distance",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "m"
        },
        43: {
          field: "swim_stroke",
          type: "swim_stroke",
          scale: null,
          offset: 0,
          units: "swim_stroke"
        },
        44: {
          field: "pool_length",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "m"
        },
        45: {
          field: "threshold_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        46: {
          field: "pool_length_unit",
          type: "display_measure",
          scale: null,
          offset: 0,
          units: ""
        },
        47: {
          field: "num_active_lengths",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "lengths"
        },
        48: {
          field: "total_work",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "J"
        },
        49: {
          field: "avg_altitude",
          type: "uint16",
          scale: 5,
          offset: -500,
          units: "m"
        },
        50: {
          field: "max_altitude",
          type: "uint16",
          scale: 5,
          offset: -500,
          units: "m"
        },
        51: {
          field: "gps_accuracy",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "m"
        },
        52: {
          field: "avg_grade",
          type: "sint16",
          scale: 100,
          offset: 0,
          units: "%"
        },
        53: {
          field: "avg_pos_grade",
          type: "sint16",
          scale: 100,
          offset: 0,
          units: "%"
        },
        54: {
          field: "avg_neg_grade",
          type: "sint16",
          scale: 100,
          offset: 0,
          units: "%"
        },
        55: {
          field: "max_pos_grade",
          type: "sint16",
          scale: 100,
          offset: 0,
          units: "%"
        },
        56: {
          field: "max_neg_grade",
          type: "sint16",
          scale: 100,
          offset: 0,
          units: "%"
        },
        57: {
          field: "avg_temperature",
          type: "sint8",
          scale: null,
          offset: 0,
          units: "C"
        },
        58: {
          field: "max_temperature",
          type: "sint8",
          scale: null,
          offset: 0,
          units: "C"
        },
        59: {
          field: "total_moving_time",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        60: {
          field: "avg_pos_vertical_speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        61: {
          field: "avg_neg_vertical_speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        62: {
          field: "max_pos_vertical_speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        63: {
          field: "max_neg_vertical_speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        64: {
          field: "min_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        65: {
          field: "time_in_hr_zone",
          type: "uint32_array",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        66: {
          field: "time_in_speed_zone",
          type: "uint32_array",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        67: {
          field: "time_in_cadence_zone",
          type: "uint32_array",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        68: {
          field: "time_in_power_zone",
          type: "uint32_array",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        69: {
          field: "avg_lap_time",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        70: {
          field: "best_lap_index",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        71: {
          field: "min_altitude",
          type: "uint16",
          scale: 5,
          offset: -500,
          units: "m"
        },
        82: {
          field: "player_score",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        83: {
          field: "opponent_score",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        84: {
          field: "opponent_name",
          type: "string",
          scale: null,
          offset: 0,
          units: ""
        },
        85: {
          field: "stroke_count",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "counts"
        },
        86: {
          field: "zone_count",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "counts"
        },
        87: {
          field: "max_ball_speed",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "m/s"
        },
        88: {
          field: "avg_ball_speed",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "m/s"
        },
        89: {
          field: "avg_vertical_oscillation",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "mm"
        },
        90: {
          field: "avg_stance_time_percent",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "percent"
        },
        91: {
          field: "avg_stance_time",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "ms"
        },
        92: {
          field: "avg_fractional_cadence",
          type: "uint8",
          scale: 128,
          offset: 0,
          units: "rpm"
        },
        93: {
          field: "max_fractional_cadence",
          type: "uint8",
          scale: 128,
          offset: 0,
          units: "rpm"
        },
        94: {
          field: "total_fractional_cycles",
          type: "uint8",
          scale: 128,
          offset: 0,
          units: "cycles"
        },
        95: {
          field: "avg_total_hemoglobin_conc",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "g/dL"
        },
        96: {
          field: "min_total_hemoglobin_conc",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "g/dL"
        },
        97: {
          field: "max_total_hemoglobin_conc",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "g/dL"
        },
        98: {
          field: "avg_saturated_hemoglobin_percent",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "%"
        },
        99: {
          field: "min_saturated_hemoglobin_percent",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "%"
        },
        100: {
          field: "max_saturated_hemoglobin_percent",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "%"
        },
        101: {
          field: "avg_left_torque_effectiveness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        102: {
          field: "avg_right_torque_effectiveness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        103: {
          field: "avg_left_pedal_smoothness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        104: {
          field: "avg_right_pedal_smoothness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        105: {
          field: "avg_combined_pedal_smoothness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        111: {
          field: "sport_index",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        112: {
          field: "time_standing",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        113: {
          field: "stand_count",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        114: {
          field: "avg_left_pco",
          type: "sint8",
          scale: null,
          offset: 0,
          units: "mm"
        },
        115: {
          field: "avg_right_pco",
          type: "sint8",
          scale: null,
          offset: 0,
          units: "mm"
        },
        116: {
          field: "avg_left_power_phase",
          type: "uint8",
          scale: 0.7111111,
          offset: 0,
          units: "degrees"
        },
        117: {
          field: "avg_left_power_phase_peak",
          type: "uint8",
          scale: 0.7111111,
          offset: 0,
          units: "degrees"
        },
        118: {
          field: "avg_right_power_phase",
          type: "uint8",
          scale: 0.7111111,
          offset: 0,
          units: "degrees"
        },
        119: {
          field: "avg_right_power_phase_peak",
          type: "uint8",
          scale: 0.7111111,
          offset: 0,
          units: "degrees"
        },
        120: {
          field: "avg_power_position",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        121: {
          field: "max_power_position",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        122: {
          field: "avg_cadence_position",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "rpm"
        },
        123: {
          field: "max_cadence_position",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "rpm"
        },
        124: {
          field: "enhanced_avg_speed",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        125: {
          field: "enhanced_max_speed",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        126: {
          field: "enhanced_avg_altitude",
          type: "uint32",
          scale: 5,
          offset: -500,
          units: "m"
        },
        127: {
          field: "enhanced_min_altitude",
          type: "uint32",
          scale: 5,
          offset: -500,
          units: "m"
        },
        128: {
          field: "enhanced_max_altitude",
          type: "uint32",
          scale: 5,
          offset: -500,
          units: "m"
        },
        129: {
          field: "avg_lev_motor_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        130: {
          field: "max_lev_motor_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        131: {
          field: "lev_battery_consumption",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        132: {
          field: "avg_vertical_ratio",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "percent"
        },
        133: {
          field: "avg_stance_time_balance",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "percent"
        },
        134: {
          field: "avg_step_length",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "mm"
        },
        137: {
          field: "total_anaerobic_training_effect",
          type: "uint8",
          scale: 10,
          offset: 0,
          units: ""
        },
        139: {
          field: "avg_vam",
          type: "uint16",
          scale: 1,
          // Raw 100 -> 100 (User specific m/h)
          offset: 0,
          units: "m/h"
        },
        192: {
          field: "workout_feel",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        193: {
          field: "workout_rpe",
          type: "uint8",
          scale: 10,
          offset: 0,
          units: ""
        },
        110: {
          field: "sport_profile_name",
          type: "string",
          scale: null,
          offset: 0,
          units: ""
        },
        168: {
          field: "training_load_peak",
          type: "uint32",
          scale: 1,
          offset: 0,
          units: ""
        },
        169: {
          field: "enhanced_avg_respiration_rate",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "breaths/min"
        },
        150: {
          field: "min_temperature",
          type: "sint8",
          scale: null,
          offset: 0,
          units: "C"
        },
        170: {
          field: "enhanced_max_respiration_rate",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "breaths/min"
        },
        178: {
          field: "est_sweat_loss",
          type: "uint16",
          scale: 1,
          // ml
          offset: 0,
          units: "ml"
        },
        180: {
          field: "enhanced_min_respiration_rate",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "breaths/min"
        },
        181: {
          field: "total_grit",
          type: "float32",
          scale: 1,
          offset: 0,
          units: "kGrit"
        },
        182: {
          field: "total_flow",
          type: "float32",
          scale: 1,
          offset: 0,
          units: "Flow"
        },
        183: {
          field: "jump_count",
          type: "uint16",
          scale: 1,
          offset: 0,
          units: ""
        },
        186: {
          field: "avg_grit",
          type: "float32",
          scale: 1,
          offset: 0,
          units: "kGrit"
        },
        187: {
          field: "avg_flow",
          type: "float32",
          scale: 1,
          offset: 0,
          units: "Flow"
        },
        188: {
          field: "primary_benefit",
          type: "uint8",
          scale: 1,
          offset: 0,
          units: ""
        },
        196: {
          field: "resting_calories",
          type: "uint16",
          scale: 1,
          offset: 0,
          units: "kcal"
        },
        214: {
          field: "avg_grit",
          type: "float32",
          scale: null,
          offset: 0,
          units: ""
        },
        215: {
          field: "avg_flow",
          type: "float32",
          scale: null,
          offset: 0,
          units: ""
        },
        140: {
          field: "recovery_advisor",
          type: "uint16",
          // Minutes?
          scale: 1,
          offset: 0,
          units: "min"
        }
      },
      19: {
        name: "lap",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: "s"
        },
        0: { field: "event", type: "event", scale: null, offset: 0, units: "" },
        1: {
          field: "event_type",
          type: "event_type",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "start_time",
          type: "date_time",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "start_position_lat",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        4: {
          field: "start_position_long",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        5: {
          field: "end_position_lat",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        6: {
          field: "end_position_long",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        7: {
          field: "total_elapsed_time",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        8: {
          field: "total_timer_time",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        9: {
          field: "total_distance",
          type: "uint32",
          scale: 100,
          offset: 0,
          units: "m"
        },
        10: {
          field: "total_cycles",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "cycles"
        },
        11: {
          field: "total_calories",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "kcal"
        },
        12: {
          field: "total_fat_calories",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "kcal"
        },
        13: {
          field: "avg_speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        14: {
          field: "max_speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        15: {
          field: "avg_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        16: {
          field: "max_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        17: {
          field: "avg_cadence",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "rpm"
        },
        18: {
          field: "max_cadence",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "rpm"
        },
        19: {
          field: "avg_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        20: {
          field: "max_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        21: {
          field: "total_ascent",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "m"
        },
        22: {
          field: "total_descent",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "m"
        },
        23: {
          field: "intensity",
          type: "intensity",
          scale: null,
          offset: 0,
          units: ""
        },
        24: {
          field: "lap_trigger",
          type: "lap_trigger",
          scale: null,
          offset: 0,
          units: ""
        },
        25: { field: "sport", type: "sport", scale: null, offset: 0, units: "" },
        26: {
          field: "event_group",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        32: {
          field: "num_lengths",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "lengths"
        },
        33: {
          field: "normalized_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        34: {
          field: "left_right_balance",
          type: "left_right_balance_100",
          scale: 100,
          offset: 0,
          units: "%"
        },
        35: {
          field: "first_length_index",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        37: {
          field: "avg_stroke_distance",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "m"
        },
        38: {
          field: "swim_stroke",
          type: "swim_stroke",
          scale: null,
          offset: 0,
          units: ""
        },
        39: {
          field: "sub_sport",
          type: "sub_sport",
          scale: null,
          offset: 0,
          units: ""
        },
        40: {
          field: "num_active_lengths",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "lengths"
        },
        41: {
          field: "total_work",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "J"
        },
        42: {
          field: "avg_altitude",
          type: "uint16",
          scale: 5,
          offset: -500,
          units: "m"
        },
        43: {
          field: "max_altitude",
          type: "uint16",
          scale: 5,
          offset: -500,
          units: "m"
        },
        44: {
          field: "gps_accuracy",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "m"
        },
        45: {
          field: "avg_grade",
          type: "sint16",
          scale: 100,
          offset: 0,
          units: "%"
        },
        46: {
          field: "avg_pos_grade",
          type: "sint16",
          scale: 100,
          offset: 0,
          units: "%"
        },
        47: {
          field: "avg_neg_grade",
          type: "sint16",
          scale: 100,
          offset: 0,
          units: "%"
        },
        48: {
          field: "max_pos_grade",
          type: "sint16",
          scale: 100,
          offset: 0,
          units: "%"
        },
        49: {
          field: "max_neg_grade",
          type: "sint16",
          scale: 100,
          offset: 0,
          units: "%"
        },
        50: {
          field: "avg_temperature",
          type: "sint8",
          scale: null,
          offset: 0,
          units: "C"
        },
        51: {
          field: "max_temperature",
          type: "sint8",
          scale: null,
          offset: 0,
          units: "C"
        },
        52: {
          field: "total_moving_time",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        53: {
          field: "avg_pos_vertical_speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        54: {
          field: "avg_neg_vertical_speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        55: {
          field: "max_pos_vertical_speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        56: {
          field: "max_neg_vertical_speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        57: {
          field: "time_in_hr_zone",
          type: "uint32_array",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        58: {
          field: "time_in_speed_zone",
          type: "uint32_array",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        59: {
          field: "time_in_cadence_zone",
          type: "uint32_array",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        60: {
          field: "time_in_power_zone",
          type: "uint32_array",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        61: {
          field: "repetition_num",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        62: {
          field: "min_altitude",
          type: "uint16",
          scale: 5,
          offset: -500,
          units: "m"
        },
        63: {
          field: "min_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        71: {
          field: "wkt_step_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        74: {
          field: "opponent_score",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        75: {
          field: "stroke_count",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "counts"
        },
        76: {
          field: "zone_count",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "counts"
        },
        77: {
          field: "avg_vertical_oscillation",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "mm"
        },
        78: {
          field: "avg_stance_time_percent",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "percent"
        },
        79: {
          field: "avg_stance_time",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "ms"
        },
        80: {
          field: "avg_fractional_cadence",
          type: "uint8",
          scale: 128,
          offset: 0,
          units: "rpm"
        },
        81: {
          field: "max_fractional_cadence",
          type: "uint8",
          scale: 128,
          offset: 0,
          units: "rpm"
        },
        82: {
          field: "total_fractional_cycles",
          type: "uint8",
          scale: 128,
          offset: 0,
          units: "cycles"
        },
        83: {
          field: "player_score",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        84: {
          field: "avg_total_hemoglobin_conc",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "g/dL"
        },
        85: {
          field: "min_total_hemoglobin_conc",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "g/dL"
        },
        86: {
          field: "max_total_hemoglobin_conc",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "g/dL"
        },
        87: {
          field: "avg_saturated_hemoglobin_percent",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "%"
        },
        88: {
          field: "min_saturated_hemoglobin_percent",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "%"
        },
        89: {
          field: "max_saturated_hemoglobin_percent",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "%"
        },
        91: {
          field: "avg_left_torque_effectiveness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        92: {
          field: "avg_right_torque_effectiveness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        93: {
          field: "avg_left_pedal_smoothness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        94: {
          field: "avg_right_pedal_smoothness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        95: {
          field: "avg_combined_pedal_smoothness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        98: {
          field: "time_standing",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        99: {
          field: "stand_count",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        100: {
          field: "avg_left_pco",
          type: "sint8",
          scale: null,
          offset: 0,
          units: "mm"
        },
        101: {
          field: "avg_right_pco",
          type: "sint8",
          scale: null,
          offset: 0,
          units: "mm"
        },
        102: {
          field: "avg_left_power_phase",
          type: "uint8",
          scale: 0.7111111,
          offset: 0,
          units: "degrees"
        },
        103: {
          field: "avg_left_power_phase_peak",
          type: "uint8",
          scale: 0.7111111,
          offset: 0,
          units: "degrees"
        },
        104: {
          field: "avg_right_power_phase",
          type: "uint8",
          scale: 0.7111111,
          offset: 0,
          units: "degrees"
        },
        105: {
          field: "avg_right_power_phase_peak",
          type: "uint8",
          scale: 0.7111111,
          offset: 0,
          units: "degrees"
        },
        106: {
          field: "avg_power_position",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        107: {
          field: "max_power_position",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        108: {
          field: "avg_cadence_position",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "rpm"
        },
        109: {
          field: "max_cadence_position",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "rpm"
        },
        110: {
          field: "enhanced_avg_speed",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        111: {
          field: "enhanced_max_speed",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        112: {
          field: "enhanced_avg_altitude",
          type: "uint32",
          scale: 5,
          offset: -500,
          units: "m"
        },
        113: {
          field: "enhanced_min_altitude",
          type: "uint32",
          scale: 5,
          offset: -500,
          units: "m"
        },
        114: {
          field: "enhanced_max_altitude",
          type: "uint32",
          scale: 5,
          offset: -500,
          units: "m"
        },
        115: {
          field: "avg_lev_motor_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        116: {
          field: "max_lev_motor_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        117: {
          field: "lev_battery_consumption",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        118: {
          field: "avg_vertical_ratio",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "percent"
        },
        119: {
          field: "avg_stance_time_balance",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "percent"
        },
        120: {
          field: "avg_step_length",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "mm"
        },
        121: {
          field: "avg_vam",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        }
      },
      20: {
        name: "record",
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: "s"
        },
        114: {
          field: "grit",
          type: "float32",
          scale: null,
          offset: 0,
          units: ""
        },
        115: {
          field: "flow",
          type: "float32",
          scale: null,
          offset: 0,
          units: ""
        },
        0: {
          field: "position_lat",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        1: {
          field: "position_long",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        2: {
          field: "altitude",
          type: "uint16",
          scale: 5,
          offset: -500,
          units: "m"
        },
        3: {
          field: "heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        4: {
          field: "cadence",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "rpm"
        },
        5: {
          field: "distance",
          type: "uint32",
          scale: 100,
          offset: 0,
          units: "m"
        },
        6: {
          field: "speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        7: {
          field: "power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        8: {
          field: "compressed_speed_distance",
          type: "byte",
          scale: 100.16,
          offset: 0,
          units: "m/s,m"
        },
        9: { field: "grade", type: "sint16", scale: 100, offset: 0, units: "%" },
        10: {
          field: "resistance",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        11: {
          field: "time_from_course",
          type: "sint32",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        12: {
          field: "cycle_length",
          type: "uint8",
          scale: 100,
          offset: 0,
          units: "m"
        },
        13: {
          field: "temperature",
          type: "sint8",
          scale: null,
          offset: 0,
          units: "C"
        },
        17: {
          field: "speed_1s",
          type: "uint8",
          scale: 16,
          offset: 0,
          units: "m/s"
        },
        18: {
          field: "cycles",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "cycles"
        },
        19: {
          field: "total_cycles",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "cycles"
        },
        28: {
          field: "compressed_accumulated_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        29: {
          field: "accumulated_power",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "watts"
        },
        30: {
          field: "left_right_balance",
          type: "left_right_balance",
          scale: null,
          offset: 0,
          units: ""
        },
        31: {
          field: "gps_accuracy",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "m"
        },
        32: {
          field: "vertical_speed",
          type: "sint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        33: {
          field: "calories",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "kcal"
        },
        39: {
          field: "vertical_oscillation",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "mm"
        },
        40: {
          field: "stance_time_percent",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "percent"
        },
        41: {
          field: "stance_time",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "ms"
        },
        42: {
          field: "activity_type",
          type: "activity_type",
          scale: null,
          offset: 0,
          units: ""
        },
        43: {
          field: "left_torque_effectiveness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        44: {
          field: "right_torque_effectiveness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        45: {
          field: "left_pedal_smoothness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        46: {
          field: "right_pedal_smoothness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        47: {
          field: "combined_pedal_smoothness",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        48: {
          field: "time128",
          type: "uint8",
          scale: 128,
          offset: 0,
          units: "s"
        },
        49: {
          field: "stroke_type",
          type: "stroke_type",
          scale: null,
          offset: 0,
          units: ""
        },
        50: { field: "zone", type: "uint8", scale: null, offset: 0, units: "" },
        51: {
          field: "ball_speed",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "m/s"
        },
        52: {
          field: "cadence256",
          type: "uint16",
          scale: 256,
          offset: 0,
          units: "rpm"
        },
        53: {
          field: "fractional_cadence",
          type: "uint8",
          scale: 128,
          offset: 0,
          units: "rpm"
        },
        54: {
          field: "total_hemoglobin_conc",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "g/dL"
        },
        55: {
          field: "total_hemoglobin_conc_min",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "g/dL"
        },
        56: {
          field: "total_hemoglobin_conc_max",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "g/dL"
        },
        57: {
          field: "saturated_hemoglobin_percent",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "%"
        },
        58: {
          field: "saturated_hemoglobin_percent_min",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "%"
        },
        59: {
          field: "saturated_hemoglobin_percent_max",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "%"
        },
        62: {
          field: "device_index",
          type: "device_index",
          scale: null,
          offset: 0,
          units: ""
        },
        67: {
          field: "left_pco",
          type: "sint8",
          scale: null,
          offset: 0,
          units: "mm"
        },
        68: {
          field: "right_pco",
          type: "sint8",
          scale: null,
          offset: 0,
          units: "mm"
        },
        69: {
          field: "left_power_phase",
          type: "uint8",
          scale: 0.7111111,
          offset: 0,
          units: "degrees"
        },
        70: {
          field: "left_power_phase_peak",
          type: "uint8",
          scale: 0.7111111,
          offset: 0,
          units: "degrees"
        },
        71: {
          field: "right_power_phase",
          type: "uint8",
          scale: 0.7111111,
          offset: 0,
          units: "degrees"
        },
        72: {
          field: "right_power_phase_peak",
          type: "uint8",
          scale: 0.7111111,
          offset: 0,
          units: "degrees"
        },
        73: {
          field: "enhanced_speed",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        78: {
          field: "enhanced_altitude",
          type: "uint32",
          scale: 5,
          offset: -500,
          units: "m"
        },
        81: {
          field: "battery_soc",
          type: "uint8",
          scale: 2,
          offset: 0,
          units: "percent"
        },
        82: {
          field: "motor_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        83: {
          field: "vertical_ratio",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "percent"
        },
        84: {
          field: "stance_time_balance",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "percent"
        },
        85: {
          field: "step_length",
          type: "uint16",
          scale: 10,
          offset: 0,
          units: "mm"
        },
        91: {
          field: "absolute_pressure",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "Pa"
        },
        92: {
          field: "depth",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "m"
        },
        93: {
          field: "next_stop_depth",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "m"
        },
        94: {
          field: "next_stop_time",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "s"
        },
        95: {
          field: "time_to_surface",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "s"
        },
        96: {
          field: "ndl_time",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "s"
        },
        97: {
          field: "cns_load",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "percent"
        },
        98: {
          field: "n2_load",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "percent"
        }
      },
      285: {
        name: "jump",
        253: { field: "timestamp", type: "date_time", scale: null, offset: 0, units: "s" },
        0: { field: "distance", type: "float32", scale: null, offset: 0, units: "m" },
        1: { field: "height", type: "float32", scale: null, offset: 0, units: "m" },
        2: { field: "rotations", type: "uint8", scale: null, offset: 0, units: "" },
        3: { field: "hang_time", type: "float32", scale: null, offset: 0, units: "s" },
        4: { field: "score", type: "float32", scale: null, offset: 0, units: "" },
        5: { field: "position_lat", type: "sint32", scale: null, offset: 0, units: "semicircles" },
        6: { field: "position_long", type: "sint32", scale: null, offset: 0, units: "semicircles" },
        7: { field: "speed", type: "uint16", scale: 1e3, offset: 0, units: "m/s" },
        8: { field: "enhanced_speed", type: "uint32", scale: 1e3, offset: 0, units: "m/s" }
      },
      21: {
        name: "event",
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: "s"
        },
        0: { field: "event", type: "event", scale: null, offset: 0, units: "" },
        1: {
          field: "event_type",
          type: "event_type",
          scale: null,
          offset: 0,
          units: ""
        },
        2: { field: "data16", type: "uint16", scale: null, offset: 0, units: "" },
        3: { field: "data", type: "uint32", scale: null, offset: 0, units: "" },
        4: {
          field: "event_group",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        7: { field: "score", type: "uint16", scale: null, offset: 0, units: "" },
        8: {
          field: "opponent_score",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        9: {
          field: "front_gear_num",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        10: {
          field: "front_gear",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        11: {
          field: "rear_gear_num",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        12: {
          field: "rear_gear",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        13: {
          field: "device_index",
          type: "device_index",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      23: {
        name: "device_info",
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: "s"
        },
        0: {
          field: "device_index",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "device_type",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "manufacturer",
          type: "manufacturer",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "serial_number",
          type: "uint32z",
          scale: null,
          offset: 0,
          units: ""
        },
        4: {
          field: "product",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        5: {
          field: "software_version",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: ""
        },
        6: {
          field: "hardware_version",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        7: {
          field: "cum_operating_time",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "s"
        },
        10: {
          field: "battery_voltage",
          type: "uint16",
          scale: 256,
          offset: 0,
          units: "V"
        },
        32: {
          field: "battery_level",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "percent"
        },
        11: {
          field: "battery_status",
          type: "battery_status",
          scale: null,
          offset: 0,
          units: ""
        },
        18: {
          field: "sensor_position",
          type: "body_location",
          scale: null,
          offset: 0,
          units: ""
        },
        19: {
          field: "descriptor",
          type: "string",
          scale: null,
          offset: 0,
          units: ""
        },
        20: {
          field: "ant_transmission_type",
          type: "uint8z",
          scale: null,
          offset: 0,
          units: ""
        },
        21: {
          field: "ant_device_number",
          type: "uint16z",
          scale: null,
          offset: 0,
          units: ""
        },
        22: {
          field: "ant_network",
          type: "ant_network",
          scale: null,
          offset: 0,
          units: ""
        },
        24: {
          field: "ant_id",
          type: "uint32z",
          scale: null,
          offset: 0,
          units: ""
        },
        25: {
          field: "source_type",
          type: "source_type",
          scale: null,
          offset: 0,
          units: ""
        },
        27: {
          field: "product_name",
          type: "string",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      26: {
        name: "workout",
        4: { field: "sport", type: "sport", scale: null, offset: 0, units: "" },
        5: {
          field: "capabilities",
          type: "workout_capabilities",
          scale: null,
          offset: 0,
          units: ""
        },
        6: {
          field: "num_valid_steps",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        8: {
          field: "wkt_name",
          type: "string",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      27: {
        name: "workout_step",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        0: {
          field: "wkt_step_name",
          type: "string",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "duration_type",
          type: "wkt_step_duration",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "duration_value",
          type: "uint32",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "target_type",
          type: "wkt_step_target",
          scale: null,
          offset: 0,
          units: ""
        },
        4: {
          field: "target_value",
          type: "uint32",
          scale: null,
          offset: 0,
          units: ""
        },
        5: {
          field: "custom_target_value_low",
          type: "uint32",
          scale: null,
          offset: 0,
          units: ""
        },
        6: {
          field: "custom_target_value_high",
          type: "uint32",
          scale: null,
          offset: 0,
          units: ""
        },
        7: {
          field: "intensity",
          type: "intensity",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      30: {
        name: "weight_scale",
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: "s"
        },
        0: {
          field: "weight",
          type: "weight",
          scale: 100,
          offset: 0,
          units: "kg"
        },
        1: {
          field: "percent_fat",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "%"
        },
        2: {
          field: "percent_hydration",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "%"
        },
        3: {
          field: "visceral_fat_mass",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "kg"
        },
        4: {
          field: "bone_mass",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "kg"
        },
        5: {
          field: "muscle_mass",
          type: "uint16",
          scale: 100,
          offset: 0,
          units: "kg"
        },
        7: {
          field: "basal_met",
          type: "uint16",
          scale: 4,
          offset: 0,
          units: "kcal/day"
        },
        8: {
          field: "physique_rating",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        9: {
          field: "active_met",
          type: "uint16",
          scale: 4,
          offset: 0,
          units: "kcal/day"
        },
        10: {
          field: "metabolic_age",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "years"
        },
        11: {
          field: "visceral_fat_rating",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        12: {
          field: "user_profile_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      31: {
        name: "course",
        4: { field: "sport", type: "sport", scale: null, offset: 0, units: "" },
        5: { field: "name", type: "string", scale: null, offset: 0, units: "" },
        6: {
          field: "capabilities",
          type: "course_capabilities",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      32: {
        name: "course_point",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "position_lat",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        3: {
          field: "position_long",
          type: "sint32",
          scale: null,
          offset: 0,
          units: "semicircles"
        },
        4: {
          field: "distance",
          type: "uint32",
          scale: 100,
          offset: 0,
          units: "m"
        },
        5: {
          field: "type",
          type: "course_point",
          scale: null,
          offset: 0,
          units: ""
        },
        6: { field: "name", type: "string", scale: null, offset: 0, units: "" },
        8: { field: "favorite", type: "bool", scale: null, offset: 0, units: "" }
      },
      33: {
        name: "totals",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: "s"
        },
        0: {
          field: "timer_time",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "s"
        },
        1: {
          field: "distance",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "m"
        },
        2: {
          field: "calories",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "kcal"
        },
        3: { field: "sport", type: "sport", scale: null, offset: 0, units: "" },
        4: {
          field: "elapsed_time",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "s"
        },
        5: {
          field: "sessions",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        6: {
          field: "active_time",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "s"
        },
        9: {
          field: "sport_index",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      34: {
        name: "activity",
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: ""
        },
        0: {
          field: "total_timer_time",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        1: {
          field: "num_sessions",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        2: { field: "type", type: "activity", scale: null, offset: 0, units: "" },
        3: { field: "event", type: "event", scale: null, offset: 0, units: "" },
        4: {
          field: "event_type",
          type: "event_type",
          scale: null,
          offset: 0,
          units: ""
        },
        5: {
          field: "local_timestamp",
          type: "local_date_time",
          scale: null,
          offset: 0,
          units: ""
        },
        6: {
          field: "event_group",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      35: {
        name: "software",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        3: { field: "version", type: "uint16", scale: 100, offset: 0, units: "" },
        5: {
          field: "part_number",
          type: "string",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      37: {
        name: "file_capabilities",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        0: { field: "type", type: "file", scale: null, offset: 0, units: "" },
        1: {
          field: "flags",
          type: "file_flags",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "directory",
          type: "string",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "max_count",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        4: {
          field: "max_size",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "bytes"
        }
      },
      38: {
        name: "mesg_capabilities",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        0: { field: "file", type: "file", scale: null, offset: 0, units: "" },
        1: {
          field: "mesg_num",
          type: "mesg_num",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "count_type",
          type: "mesg_count",
          scale: null,
          offset: 0,
          units: ""
        },
        3: { field: "count", type: "uint16", scale: null, offset: 0, units: "" }
      },
      39: {
        name: "field_capabilities",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        0: { field: "file", type: "file", scale: null, offset: 0, units: "" },
        1: {
          field: "mesg_num",
          type: "mesg_num",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "field_num",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        3: { field: "count", type: "uint16", scale: null, offset: 0, units: "" }
      },
      49: {
        name: "file_creator",
        0: {
          field: "software_version",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "hardware_version",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      51: {
        name: "blood_pressure",
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: "s"
        },
        0: {
          field: "systolic_pressure",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "mmHg"
        },
        1: {
          field: "diastolic_pressure",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "mmHg"
        },
        2: {
          field: "mean_arterial_pressure",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "mmHg"
        },
        3: {
          field: "map_3_sample_mean",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "mmHg"
        },
        4: {
          field: "map_morning_values",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "mmHg"
        },
        5: {
          field: "map_evening_values",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "mmHg"
        },
        6: {
          field: "heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        7: {
          field: "heart_rate_type",
          type: "hr_type",
          scale: null,
          offset: 0,
          units: ""
        },
        8: {
          field: "status",
          type: "bp_status",
          scale: null,
          offset: 0,
          units: ""
        },
        9: {
          field: "user_profile_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      55: {
        name: "monitoring",
        253: {
          field: "timestamp",
          type: "uint32",
          scale: null,
          offset: 0,
          units: ""
        },
        0: {
          field: "device_index",
          type: "device_index",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "calories",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "kcal"
        },
        2: {
          field: "distance",
          type: "float32",
          scale: null,
          offset: 0,
          units: "m"
        },
        3: {
          field: "cycles",
          type: "float32",
          scale: null,
          offset: 0,
          units: "cycles"
        },
        4: {
          field: "active_time",
          type: "float32",
          scale: null,
          offset: 0,
          units: "s"
        },
        5: {
          field: "activity_type",
          type: "activity_type",
          scale: null,
          offset: 0,
          units: ""
        },
        6: {
          field: "activity_subtype",
          type: "activity_subtype",
          scale: null,
          offset: 0,
          units: ""
        },
        7: {
          field: "activity_level",
          type: "activity_level",
          scale: null,
          offset: 0,
          units: "s"
        },
        8: {
          field: "distance16",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "m"
        },
        9: {
          field: "cycles16",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "cycles"
        },
        10: {
          field: "active_time16",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        11: {
          field: "local_timestamp",
          type: "uint32",
          scale: null,
          offset: 0,
          units: ""
        },
        12: {
          field: "temperature",
          type: "float32",
          scale: null,
          offset: 0,
          units: "C"
        },
        14: {
          field: "temperature_min",
          type: "float32",
          scale: null,
          offset: 0,
          units: "C"
        },
        15: {
          field: "temperature_max",
          type: "float32",
          scale: null,
          offset: 0,
          units: "C"
        },
        16: {
          field: "activity_time",
          type: "int32",
          scale: null,
          offset: 0,
          units: ""
        },
        19: {
          field: "active_calories",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "kcal"
        },
        24: {
          field: "current_activity_type_intensity",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        25: {
          field: "timestamp_min8",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        26: {
          field: "timestamp16",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        27: {
          field: "heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        28: {
          field: "intensity",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        29: {
          field: "duration_min",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        30: {
          field: "duration",
          type: "uint32",
          scale: null,
          offset: 0,
          units: ""
        },
        31: {
          field: "ascent",
          type: "float32",
          scale: null,
          offset: 0,
          units: "m"
        },
        32: {
          field: "descent",
          type: "float32",
          scale: null,
          offset: 0,
          units: "m"
        },
        33: {
          field: "moderate_activity_minutes",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        34: {
          field: "vigorous_activity_inutes",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      78: {
        name: "hrv",
        0: {
          field: "time",
          type: "uint16_array",
          scale: 1e3,
          offset: 0,
          units: "s"
        }
      },
      101: {
        name: "length",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: "s"
        },
        0: { field: "event", type: "event", scale: null, offset: 0, units: "" },
        1: {
          field: "event_type",
          type: "event_type",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "start_time",
          type: "date_time",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "total_elapsed_time",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        4: {
          field: "total_timer_time",
          type: "uint32",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        5: {
          field: "total_strokes",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "strokes"
        },
        6: {
          field: "avg_speed",
          type: "uint16",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        7: {
          field: "swim_stroke",
          type: "swim_stroke",
          scale: null,
          offset: 0,
          units: "swim_stroke"
        },
        9: {
          field: "avg_swimming_cadence",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "strokes/min"
        },
        10: {
          field: "event_group",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        11: {
          field: "total_calories",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "kcal"
        },
        12: {
          field: "length_type",
          type: "length_type",
          scale: null,
          offset: 0,
          units: "length_type"
        },
        18: {
          field: "player_score",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        19: {
          field: "opponent_score",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        20: {
          field: "stroke_count",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "counts"
        },
        21: {
          field: "zone_count",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "counts"
        }
      },
      103: {
        name: "monitoring_info",
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: ""
        },
        0: {
          field: "local_timestamp",
          type: "uint32",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "activity_type",
          type: "activity_type",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "cycles_to_distance",
          type: "float32",
          scale: null,
          offset: 0,
          units: "cycles"
        },
        4: {
          field: "cycles_to_calories",
          type: "float32",
          scale: null,
          offset: 0,
          units: "kcal"
        },
        5: {
          field: "resting_metabolic_rate",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      108: {
        name: "o_hr_settings",
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: ""
        },
        0: { field: "enabled", type: "byte", scale: null, offset: 0, units: "" }
      },
      140: {
        name: "activity_metrics",
        1: {
          field: "new_max_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        4: {
          field: "aerobic_training_effect",
          type: "uint8",
          scale: 10,
          offset: 0,
          units: ""
        },
        7: {
          field: "vo2_max",
          type: "uint32",
          scale: 65536 / 3.5,
          offset: 0,
          units: "ml/kg/min"
        },
        9: {
          field: "recovery_time",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "min"
        },
        11: {
          field: "sport",
          type: "sport",
          scale: null,
          offset: 0,
          units: ""
        },
        20: {
          field: "anaerobic_training_effect",
          type: "uint8",
          scale: 10,
          offset: 0,
          units: ""
        },
        29: {
          field: "first_vo2_max",
          type: "uint32",
          scale: 65536 / 3.5,
          offset: 0,
          units: "ml/kg/min"
        },
        41: {
          field: "primary_benefit",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        60: {
          field: "total_ascent",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "m"
        },
        61: {
          field: "total_descent",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "m"
        },
        62: {
          field: "avg_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        },
        63: {
          field: "avg_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        }
      },
      206: {
        name: "field_description",
        0: {
          field: "developer_data_index",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "field_definition_number",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "fit_base_type_id",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "field_name",
          type: "string",
          scale: null,
          offset: 0,
          units: ""
        },
        // 4: { field: 'array', type: 'uint8', scale: null, offset: 0, units: '' },
        // 5: { field: 'components', type: 'string', scale: null, offset: 0, units: '' },
        6: { field: "scale", type: "uint8", scale: null, offset: 0, units: "" },
        7: { field: "offset", type: "sint8", scale: null, offset: 0, units: "" },
        8: { field: "units", type: "string", scale: null, offset: 0, units: "" },
        // 9: { field: 'bits', type: 'string', scale: null, offset: 0, units: '' },
        // 10: { field: 'accumulate', type: 'string', scale: null, offset: 0, units: '' },
        // 13: { field: 'fit_base_unit_id', type: 'uint16', scale: null, offset: 0, units: '' },
        // 14: { field: 'native_mesg_num', type: 'mesg_num', scale: null, offset: 0, units: '' },
        15: {
          field: "native_field_num",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      227: {
        name: "stress_level",
        0: {
          field: "stress_level_value",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "stress_level_time",
          type: "date_time",
          scale: null,
          offset: 0,
          units: "s"
        },
        2: {
          field: "field_two",
          type: "sint8",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "body_battery",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        4: {
          field: "field_four",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      207: {
        name: "developer_data_id",
        0: {
          field: "developer_id",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "application_id",
          type: "byte_array",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "manufacturer_id",
          type: "manufacturer",
          scale: null,
          offset: 0,
          units: ""
        },
        3: {
          field: "developer_data_index",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        4: {
          field: "application_version",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      258: {
        name: "dive_settings",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        0: { field: "name", type: "string", scale: null, offset: 0, units: "" },
        1: {
          field: "model",
          type: "tissue_model_type",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "gf_low",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "percent"
        },
        3: {
          field: "gf_high",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "percent"
        },
        4: {
          field: "water_type",
          type: "water_type",
          scale: null,
          offset: 0,
          units: ""
        },
        5: {
          field: "water_density",
          type: "float32",
          scale: null,
          offset: 0,
          units: "kg/m^3"
        },
        6: {
          field: "po2_warn",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "percent"
        },
        7: {
          field: "po2_critical",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "percent"
        },
        8: {
          field: "po2_deco",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "percent"
        },
        9: {
          field: "safety_stop_enabled",
          type: "bool",
          scale: null,
          offset: 0,
          units: ""
        },
        10: {
          field: "bottom_depth",
          type: "float32",
          scale: null,
          offset: 0,
          units: ""
        },
        11: {
          field: "bottom_time",
          type: "uint32",
          scale: null,
          offset: 0,
          units: ""
        },
        12: {
          field: "apnea_countdown_enabled",
          type: "bool",
          scale: null,
          offset: 0,
          units: ""
        },
        13: {
          field: "apnea_countdown_time",
          type: "uint32",
          scale: null,
          offset: 0,
          units: ""
        },
        14: {
          field: "backlight_mode",
          type: "dive_backlight_mode",
          scale: null,
          offset: 0,
          units: ""
        },
        15: {
          field: "backlight_brightness",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        },
        16: {
          field: "backlight_timeout",
          type: "backlight_timeout",
          scale: null,
          offset: 0,
          units: ""
        },
        17: {
          field: "repeat_dive_time",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "s"
        },
        18: {
          field: "safety_stop_time",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "s"
        },
        19: {
          field: "heart_rate_source_type",
          type: "source_type",
          scale: null,
          offset: 0,
          units: ""
        },
        20: {
          field: "heart_rate_source",
          type: "uint8",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      259: {
        name: "dive_gas",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        0: {
          field: "helium_content",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "percent"
        },
        1: {
          field: "oxygen_content",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "percent"
        },
        2: {
          field: "status",
          type: "dive_gas_status",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      262: {
        name: "dive_alarm",
        254: {
          field: "message_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        0: { field: "depth", type: "uint32", scale: null, offset: 0, units: "m" },
        1: { field: "time", type: "sint32", scale: null, offset: 0, units: "s" },
        2: { field: "enabled", type: "bool", scale: null, offset: 0, units: "" },
        3: {
          field: "alarm_type",
          type: "dive_alarm_type",
          scale: null,
          offset: 0,
          units: ""
        },
        4: { field: "sound", type: "tone", scale: null, offset: 0, units: "" },
        5: {
          field: "dive_types",
          type: "sub_sport",
          scale: null,
          offset: 0,
          units: ""
        }
      },
      268: {
        name: "dive_summary",
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: "s"
        },
        0: {
          field: "reference_mesg",
          type: "mesg_num",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "reference_index",
          type: "message_index",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "avg_depth",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "m"
        },
        3: {
          field: "max_depth",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "m"
        },
        4: {
          field: "surface_interval",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "s"
        },
        5: {
          field: "start_cns",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "percent"
        },
        6: {
          field: "end_cns",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "percent"
        },
        7: {
          field: "start_n2",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "percent"
        },
        8: {
          field: "end_n2",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "percent"
        },
        9: {
          field: "o2_toxicity",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "OTUs"
        },
        10: {
          field: "dive_number",
          type: "uint32",
          scale: null,
          offset: 0,
          units: ""
        },
        11: {
          field: "bottom_time",
          type: "uint32",
          scale: null,
          offset: 0,
          units: "s"
        }
      },
      319: {
        name: "tank_update",
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: "s"
        },
        0: { field: "sensor", type: "uint32", scale: null, offset: 0, units: "" },
        1: {
          field: "pressure",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "cbar"
        }
      },
      323: {
        name: "tank_summary",
        0: { field: "sensor", type: "uint32", scale: null, offset: 0, units: "" },
        1: {
          field: "start_pressure",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "cbar"
        },
        2: {
          field: "end_pressure",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "cbar"
        },
        3: {
          field: "volume_used",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "cbar"
        }
      },
      216: {
        name: "time_in_zone",
        253: {
          field: "timestamp",
          type: "date_time",
          scale: null,
          offset: 0,
          units: "s"
        },
        0: {
          field: "reference_mesg",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        1: {
          field: "reference_index",
          type: "uint16",
          scale: null,
          offset: 0,
          units: ""
        },
        2: {
          field: "time_in_hr_zone",
          type: "uint32_array",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        3: {
          field: "time_in_speed_zone",
          type: "uint32_array",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        4: {
          field: "time_in_power_zone",
          type: "uint32_array",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        5: {
          field: "time_in_power_zone",
          type: "uint32_array",
          scale: 1e3,
          offset: 0,
          units: "s"
        },
        6: {
          field: "hr_zone_high_boundary",
          type: "uint8_array",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        7: {
          field: "speed_zone_high_boundary",
          type: "uint16_array",
          scale: 1e3,
          offset: 0,
          units: "m/s"
        },
        8: {
          field: "power_zone_high_boundary",
          type: "uint16_array",
          scale: null,
          offset: 0,
          units: "watts"
        },
        9: {
          field: "power_zone_high_boundary",
          type: "uint16_array",
          scale: null,
          offset: 0,
          units: "watts"
        },
        10: {
          field: "max_heart_rate_deprecated",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        11: {
          field: "max_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        12: {
          field: "resting_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        13: {
          field: "threshold_heart_rate",
          type: "uint8",
          scale: null,
          offset: 0,
          units: "bpm"
        },
        14: {
          field: "pwr_calc_type",
          type: "pwr_zone_calc",
          scale: null,
          offset: 0,
          units: ""
        },
        15: {
          field: "functional_threshold_power",
          type: "uint16",
          scale: null,
          offset: 0,
          units: "watts"
        }
      }
    },
    types: {
      file: {
        1: "device",
        2: "settings",
        3: "sport",
        4: "activity",
        5: "workout",
        6: "course",
        7: "schedules",
        9: "weight",
        10: "totals",
        11: "goals",
        14: "blood_pressure",
        15: "monitoring_a",
        20: "activity_summary",
        28: "monitoring_daily",
        32: "monitoring_b",
        34: "segment",
        35: "segment_list",
        40: "exd_configuration",
        247: "mfg_range_min",
        254: "mfg_range_max"
      },
      mesg_num: {
        0: "file_id",
        1: "capabilities",
        2: "device_settings",
        3: "user_profile",
        4: "hrm_profile",
        5: "sdm_profile",
        6: "bike_profile",
        7: "zones_target",
        8: "hr_zone",
        9: "power_zone",
        10: "met_zone",
        12: "sport",
        15: "goal",
        18: "session",
        19: "lap",
        20: "record",
        21: "event",
        23: "device_info",
        26: "workout",
        27: "workout_step",
        28: "schedule",
        30: "weight_scale",
        31: "course",
        32: "course_point",
        33: "totals",
        34: "activity",
        35: "software",
        37: "file_capabilities",
        38: "mesg_capabilities",
        39: "field_capabilities",
        49: "file_creator",
        51: "blood_pressure",
        53: "speed_zone",
        55: "monitoring",
        72: "training_file",
        78: "hrv",
        80: "ant_rx",
        81: "ant_tx",
        82: "ant_channel_id",
        101: "length",
        103: "monitoring_info",
        105: "pad",
        106: "slave_device",
        127: "connectivity",
        128: "weather_conditions",
        129: "weather_alert",
        131: "cadence_zone",
        132: "hr",
        140: "activity_metrics",
        142: "segment_lap",
        145: "memo_glob",
        148: "segment_id",
        149: "segment_leaderboard_entry",
        150: "segment_point",
        151: "segment_file",
        158: "workout_session",
        159: "watchface_settings",
        160: "gps_metadata",
        161: "camera_event",
        162: "timestamp_correlation",
        164: "gyroscope_data",
        165: "accelerometer_data",
        167: "three_d_sensor_calibration",
        169: "video_frame",
        174: "obdii_data",
        177: "nmea_sentence",
        178: "aviation_attitude",
        184: "video",
        185: "video_title",
        186: "video_description",
        187: "video_clip",
        200: "exd_screen_configuration",
        201: "exd_data_field_configuration",
        202: "exd_data_concept_configuration",
        206: "field_description",
        207: "developer_data_id",
        208: "magnetometer_data",
        209: "barometer_data",
        210: "one_d_sensor_calibration",
        225: "set",
        227: "stress_level",
        258: "dive_settings",
        259: "dive_gas",
        262: "dive_alarm",
        264: "exercise_title",
        268: "dive_summary",
        285: "jump",
        317: "climb_pro",
        319: "tank_update",
        323: "tank_summary",
        216: "time_in_zone",
        347: "o_hr_settings",
        65280: "mfg_range_min",
        65534: "mfg_range_max"
      },
      checksum: {
        0: "clear",
        1: "ok"
      },
      file_flags: {
        0: 0,
        2: "read",
        4: "write",
        8: "erase"
      },
      mesg_count: {
        0: "num_per_file",
        1: "max_per_file",
        2: "max_per_file_type"
      },
      date_time: {
        0: 0,
        268435456: "min"
      },
      local_date_time: {
        0: 0,
        268435456: "min"
      },
      message_index: {
        0: 0,
        4095: "mask",
        28672: "reserved",
        32768: "selected"
      },
      gender: {
        0: "female",
        1: "male"
      },
      language: {
        0: "english",
        1: "french",
        2: "italian",
        3: "german",
        4: "spanish",
        5: "croatian",
        6: "czech",
        7: "danish",
        8: "dutch",
        9: "finnish",
        10: "greek",
        11: "hungarian",
        12: "norwegian",
        13: "polish",
        14: "portuguese",
        15: "slovakian",
        16: "slovenian",
        17: "swedish",
        18: "russian",
        19: "turkish",
        20: "latvian",
        21: "ukrainian",
        22: "arabic",
        23: "farsi",
        24: "bulgarian",
        25: "romanian",
        26: "chinese",
        27: "japanese",
        28: "korean",
        29: "taiwanese",
        30: "thai",
        31: "hebrew",
        32: "brazilian_portuguese",
        33: "indonesian",
        34: "malaysian",
        35: "vietnamese",
        36: "burmese",
        37: "mongolian",
        254: "custom"
      },
      language_bits_0: {
        0: 0,
        1: "english",
        2: "french",
        4: "italian",
        8: "german",
        16: "spanish",
        32: "croatian",
        64: "czech",
        128: "danish"
      },
      language_bits_1: {
        0: 0,
        1: "dutch",
        2: "finnish",
        4: "greek",
        8: "hungarian",
        16: "norwegian",
        32: "polish",
        64: "portuguese",
        128: "slovakian"
      },
      language_bits_2: {
        0: 0,
        1: "slovenian",
        2: "swedish",
        4: "russian",
        8: "turkish",
        16: "latvian",
        32: "ukrainian",
        64: "arabic",
        128: "farsi"
      },
      language_bits_3: {
        0: 0,
        1: "bulgarian",
        2: "romanian",
        4: "chinese",
        8: "japanese",
        16: "korean",
        32: "taiwanese",
        64: "thai",
        128: "hebrew"
      },
      language_bits_4: {
        0: 0,
        1: "brazilian_portuguese",
        2: "indonesian",
        4: "malaysian",
        8: "vietnamese",
        16: "burmese",
        32: "mongolian"
      },
      time_zone: {
        0: "almaty",
        1: "bangkok",
        2: "bombay",
        3: "brasilia",
        4: "cairo",
        5: "cape_verde_is",
        6: "darwin",
        7: "eniwetok",
        8: "fiji",
        9: "hong_kong",
        10: "islamabad",
        11: "kabul",
        12: "magadan",
        13: "mid_atlantic",
        14: "moscow",
        15: "muscat",
        16: "newfoundland",
        17: "samoa",
        18: "sydney",
        19: "tehran",
        20: "tokyo",
        21: "us_alaska",
        22: "us_atlantic",
        23: "us_central",
        24: "us_eastern",
        25: "us_hawaii",
        26: "us_mountain",
        27: "us_pacific",
        28: "other",
        29: "auckland",
        30: "kathmandu",
        31: "europe_western_wet",
        32: "europe_central_cet",
        33: "europe_eastern_eet",
        34: "jakarta",
        35: "perth",
        36: "adelaide",
        37: "brisbane",
        38: "tasmania",
        39: "iceland",
        40: "amsterdam",
        41: "athens",
        42: "barcelona",
        43: "berlin",
        44: "brussels",
        45: "budapest",
        46: "copenhagen",
        47: "dublin",
        48: "helsinki",
        49: "lisbon",
        50: "london",
        51: "madrid",
        52: "munich",
        53: "oslo",
        54: "paris",
        55: "prague",
        56: "reykjavik",
        57: "rome",
        58: "stockholm",
        59: "vienna",
        60: "warsaw",
        61: "zurich",
        62: "quebec",
        63: "ontario",
        64: "manitoba",
        65: "saskatchewan",
        66: "alberta",
        67: "british_columbia",
        68: "boise",
        69: "boston",
        70: "chicago",
        71: "dallas",
        72: "denver",
        73: "kansas_city",
        74: "las_vegas",
        75: "los_angeles",
        76: "miami",
        77: "minneapolis",
        78: "new_york",
        79: "new_orleans",
        80: "phoenix",
        81: "santa_fe",
        82: "seattle",
        83: "washington_dc",
        84: "us_arizona",
        85: "chita",
        86: "ekaterinburg",
        87: "irkutsk",
        88: "kaliningrad",
        89: "krasnoyarsk",
        90: "novosibirsk",
        91: "petropavlovsk_kamchatskiy",
        92: "samara",
        93: "vladivostok",
        94: "mexico_central",
        95: "mexico_mountain",
        96: "mexico_pacific",
        97: "cape_town",
        98: "winkhoek",
        99: "lagos",
        100: "riyahd",
        101: "venezuela",
        102: "australia_lh",
        103: "santiago",
        253: "manual",
        254: "automatic"
      },
      display_measure: {
        0: "metric",
        1: "statute",
        2: "nautical"
      },
      display_heart: {
        0: "bpm",
        1: "max",
        2: "reserve"
      },
      display_power: {
        0: "watts",
        1: "percent_ftp"
      },
      display_position: {
        0: "degree",
        1: "degree_minute",
        2: "degree_minute_second",
        3: "austrian_grid",
        4: "british_grid",
        5: "dutch_grid",
        6: "hungarian_grid",
        7: "finnish_grid",
        8: "german_grid",
        9: "icelandic_grid",
        10: "indonesian_equatorial",
        11: "indonesian_irian",
        12: "indonesian_southern",
        13: "india_zone_0",
        14: "india_zone_IA",
        15: "india_zone_IB",
        16: "india_zone_IIA",
        17: "india_zone_IIB",
        18: "india_zone_IIIA",
        19: "india_zone_IIIB",
        20: "india_zone_IVA",
        21: "india_zone_IVB",
        22: "irish_transverse",
        23: "irish_grid",
        24: "loran",
        25: "maidenhead_grid",
        26: "mgrs_grid",
        27: "new_zealand_grid",
        28: "new_zealand_transverse",
        29: "qatar_grid",
        30: "modified_swedish_grid",
        31: "swedish_grid",
        32: "south_african_grid",
        33: "swiss_grid",
        34: "taiwan_grid",
        35: "united_states_grid",
        36: "utm_ups_grid",
        37: "west_malayan",
        38: "borneo_rso",
        39: "estonian_grid",
        40: "latvian_grid",
        41: "swedish_ref_99_grid"
      },
      switch: {
        0: "off",
        1: "on",
        2: "auto"
      },
      sport: {
        0: "generic",
        1: "running",
        2: "cycling",
        3: "transition",
        4: "fitness_equipment",
        5: "swimming",
        6: "basketball",
        7: "soccer",
        8: "tennis",
        9: "american_football",
        10: "training",
        11: "walking",
        12: "cross_country_skiing",
        13: "alpine_skiing",
        14: "snowboarding",
        15: "rowing",
        16: "mountaineering",
        17: "hiking",
        18: "multisport",
        19: "paddling",
        20: "flying",
        21: "e_biking",
        22: "motorcycling",
        23: "boating",
        24: "driving",
        25: "golf",
        26: "hang_gliding",
        27: "horseback_riding",
        28: "hunting",
        29: "fishing",
        30: "inline_skating",
        31: "rock_climbing",
        32: "sailing",
        33: "ice_skating",
        34: "sky_diving",
        35: "snowshoeing",
        36: "snowmobiling",
        37: "stand_up_paddleboarding",
        38: "surfing",
        39: "wakeboarding",
        40: "water_skiing",
        41: "kayaking",
        42: "rafting",
        43: "windsurfing",
        44: "kitesurfing",
        45: "tactical",
        46: "jumpmaster",
        47: "boxing",
        48: "floor_climbing",
        53: "diving",
        254: "all"
      },
      sport_bits_0: {
        0: 0,
        1: "generic",
        2: "running",
        4: "cycling",
        8: "transition",
        16: "fitness_equipment",
        32: "swimming",
        64: "basketball",
        128: "soccer"
      },
      sport_bits_1: {
        0: 0,
        1: "tennis",
        2: "american_football",
        4: "training",
        8: "walking",
        16: "cross_country_skiing",
        32: "alpine_skiing",
        64: "snowboarding",
        128: "rowing"
      },
      sport_bits_2: {
        0: 0,
        1: "mountaineering",
        2: "hiking",
        4: "multisport",
        8: "paddling",
        16: "flying",
        32: "e_biking",
        64: "motorcycling",
        128: "boating"
      },
      sport_bits_3: {
        0: 0,
        1: "driving",
        2: "golf",
        4: "hang_gliding",
        8: "horseback_riding",
        16: "hunting",
        32: "fishing",
        64: "inline_skating",
        128: "rock_climbing"
      },
      sport_bits_4: {
        0: 0,
        1: "sailing",
        2: "ice_skating",
        4: "sky_diving",
        8: "snowshoeing",
        16: "snowmobiling",
        32: "stand_up_paddleboarding",
        64: "surfing",
        128: "wakeboarding"
      },
      sport_bits_5: {
        0: 0,
        1: "water_skiing",
        2: "kayaking",
        4: "rafting",
        8: "windsurfing",
        16: "kitesurfing",
        32: "tactical",
        64: "jumpmaster",
        128: "boxing"
      },
      sport_bits_6: {
        0: 0,
        1: "floor_climbing"
      },
      sub_sport: {
        0: "generic",
        1: "treadmill",
        2: "street",
        3: "trail",
        4: "track",
        5: "spin",
        6: "indoor_cycling",
        7: "road",
        8: "mountain",
        9: "downhill",
        10: "recumbent",
        11: "cyclocross",
        12: "hand_cycling",
        13: "track_cycling",
        14: "indoor_rowing",
        15: "elliptical",
        16: "stair_climbing",
        17: "lap_swimming",
        18: "open_water",
        19: "flexibility_training",
        20: "strength_training",
        21: "warm_up",
        22: "match",
        23: "exercise",
        24: "challenge",
        25: "indoor_skiing",
        26: "cardio_training",
        27: "indoor_walking",
        28: "e_bike_fitness",
        29: "bmx",
        30: "casual_walking",
        31: "speed_walking",
        32: "bike_to_run_transition",
        33: "run_to_bike_transition",
        34: "swim_to_bike_transition",
        35: "atv",
        36: "motocross",
        37: "backcountry",
        38: "resort",
        39: "rc_drone",
        40: "wingsuit",
        41: "whitewater",
        42: "skate_skiing",
        43: "yoga",
        44: "pilates",
        45: "indoor_running",
        46: "gravel_cycling",
        47: "e_bike_mountain",
        48: "commuting",
        49: "mixed_surface",
        50: "navigate",
        51: "track_me",
        52: "map",
        53: "single_gas_diving",
        54: "multi_gas_diving",
        55: "gauge_diving",
        56: "apnea_diving",
        57: "apnea_hunting",
        58: "virtual_activity",
        59: "obstacle",
        254: "all"
      },
      sport_event: {
        0: "uncategorized",
        1: "geocaching",
        2: "fitness",
        3: "recreation",
        4: "race",
        5: "special_event",
        6: "training",
        7: "transportation",
        8: "touring"
      },
      activity: {
        0: "manual",
        1: "auto_multi_sport"
      },
      intensity: {
        0: "active",
        1: "rest",
        2: "warmup",
        3: "cooldown",
        4: "recovery",
        5: "interval",
        6: "other"
      },
      session_trigger: {
        0: "activity_end",
        1: "manual",
        2: "auto_multi_sport",
        3: "fitness_equipment"
      },
      autolap_trigger: {
        0: "time",
        1: "distance",
        2: "position_start",
        3: "position_lap",
        4: "position_waypoint",
        5: "position_marked",
        6: "off"
      },
      lap_trigger: {
        0: "manual",
        1: "time",
        2: "distance",
        3: "position_start",
        4: "position_lap",
        5: "position_waypoint",
        6: "position_marked",
        7: "session_end",
        8: "fitness_equipment"
      },
      time_mode: {
        0: "hour12",
        1: "hour24",
        2: "military",
        3: "hour_12_with_seconds",
        4: "hour_24_with_seconds",
        5: "utc"
      },
      backlight_mode: {
        0: "off",
        1: "manual",
        2: "key_and_messages",
        3: "auto_brightness",
        4: "smart_notifications",
        5: "key_and_messages_night",
        6: "key_and_messages_and_smart_notifications"
      },
      date_mode: {
        0: "day_month",
        1: "month_day"
      },
      backlight_timeout: {
        0: "infinite"
      },
      event: {
        0: "timer",
        3: "workout",
        4: "workout_step",
        5: "power_down",
        6: "power_up",
        7: "off_course",
        8: "session",
        9: "lap",
        10: "course_point",
        11: "battery",
        12: "virtual_partner_pace",
        13: "hr_high_alert",
        14: "hr_low_alert",
        15: "speed_high_alert",
        16: "speed_low_alert",
        17: "cad_high_alert",
        18: "cad_low_alert",
        19: "power_high_alert",
        20: "power_low_alert",
        21: "recovery_hr",
        22: "battery_low",
        23: "time_duration_alert",
        24: "distance_duration_alert",
        25: "calorie_duration_alert",
        26: "activity",
        27: "fitness_equipment",
        28: "length",
        32: "user_marker",
        33: "sport_point",
        36: "calibration",
        42: "front_gear_change",
        43: "rear_gear_change",
        44: "rider_position_change",
        45: "elev_high_alert",
        46: "elev_low_alert",
        47: "comm_timeout"
      },
      event_type: {
        0: "start",
        1: "stop",
        2: "consecutive_depreciated",
        3: "marker",
        4: "stop_all",
        5: "begin_depreciated",
        6: "end_depreciated",
        7: "end_all_depreciated",
        8: "stop_disable",
        9: "stop_disable_all"
      },
      timer_trigger: {
        0: "manual",
        1: "auto",
        2: "fitness_equipment"
      },
      fitness_equipment_state: {
        0: "ready",
        1: "in_use",
        2: "paused",
        3: "unknown"
      },
      tone: {
        0: "off",
        1: "tone",
        2: "vibrate",
        3: "tone_and_vibrate"
      },
      autoscroll: {
        0: "none",
        1: "slow",
        2: "medium",
        3: "fast"
      },
      activity_class: {
        0: 0,
        100: "level_max",
        127: "level",
        128: "athlete"
      },
      hr_zone_calc: {
        0: "custom",
        1: "percent_max_hr",
        2: "percent_hrr"
      },
      pwr_zone_calc: {
        0: "custom",
        1: "percent_ftp"
      },
      wkt_step_duration: {
        0: "time",
        1: "distance",
        2: "hr_less_than",
        3: "hr_greater_than",
        4: "calories",
        5: "open",
        6: "repeat_until_steps_cmplt",
        7: "repeat_until_time",
        8: "repeat_until_distance",
        9: "repeat_until_calories",
        10: "repeat_until_hr_less_than",
        11: "repeat_until_hr_greater_than",
        12: "repeat_until_power_less_than",
        13: "repeat_until_power_greater_than",
        14: "power_less_than",
        15: "power_greater_than",
        16: "training_peaks_tss",
        17: "repeat_until_power_last_lap_less_than",
        18: "repeat_until_max_power_last_lap_less_than",
        19: "power_3s_less_than",
        20: "power_10s_less_than",
        21: "power_30s_less_than",
        22: "power_3s_greater_than",
        23: "power_10s_greater_than",
        24: "power_30s_greater_than",
        25: "power_lap_less_than",
        26: "power_lap_greater_than",
        27: "repeat_until_training_peaks_tss",
        28: "repetition_time",
        29: "reps"
      },
      wkt_step_target: {
        0: "speed",
        1: "heart_rate",
        2: "open",
        3: "cadence",
        4: "power",
        5: "grade",
        6: "resistance",
        7: "power_3s",
        8: "power_10s",
        9: "power_30s",
        10: "power_lap",
        11: "swim_stroke",
        12: "speed_lap",
        13: "heart_rate_lap"
      },
      goal: {
        0: "time",
        1: "distance",
        2: "calories",
        3: "frequency",
        4: "steps",
        5: "ascent",
        6: "active_minutes"
      },
      goal_recurrence: {
        0: "off",
        1: "daily",
        2: "weekly",
        3: "monthly",
        4: "yearly",
        5: "custom"
      },
      goal_source: {
        0: "auto",
        1: "community",
        2: "user"
      },
      schedule: {
        0: "workout",
        1: "course"
      },
      course_point: {
        0: "generic",
        1: "summit",
        2: "valley",
        3: "water",
        4: "food",
        5: "danger",
        6: "left",
        7: "right",
        8: "straight",
        9: "first_aid",
        10: "fourth_category",
        11: "third_category",
        12: "second_category",
        13: "first_category",
        14: "hors_category",
        15: "sprint",
        16: "left_fork",
        17: "right_fork",
        18: "middle_fork",
        19: "slight_left",
        20: "sharp_left",
        21: "slight_right",
        22: "sharp_right",
        23: "u_turn",
        24: "segment_start",
        25: "segment_end"
      },
      manufacturer: {
        0: 0,
        1: "garmin",
        2: "garmin_fr405_antfs",
        3: "zephyr",
        4: "dayton",
        5: "idt",
        6: "srm",
        7: "quarq",
        8: "ibike",
        9: "saris",
        10: "spark_hk",
        11: "tanita",
        12: "echowell",
        13: "dynastream_oem",
        14: "nautilus",
        15: "dynastream",
        16: "timex",
        17: "metrigear",
        18: "xelic",
        19: "beurer",
        20: "cardiosport",
        21: "a_and_d",
        22: "hmm",
        23: "suunto",
        24: "thita_elektronik",
        25: "gpulse",
        26: "clean_mobile",
        27: "pedal_brain",
        28: "peaksware",
        29: "saxonar",
        30: "lemond_fitness",
        31: "dexcom",
        32: "wahoo_fitness",
        33: "octane_fitness",
        34: "archinoetics",
        35: "the_hurt_box",
        36: "citizen_systems",
        37: "magellan",
        38: "osynce",
        39: "holux",
        40: "concept2",
        42: "one_giant_leap",
        43: "ace_sensor",
        44: "brim_brothers",
        45: "xplova",
        46: "perception_digital",
        47: "bf1systems",
        48: "pioneer",
        49: "spantec",
        50: "metalogics",
        51: "4iiiis",
        52: "seiko_epson",
        53: "seiko_epson_oem",
        54: "ifor_powell",
        55: "maxwell_guider",
        56: "star_trac",
        57: "breakaway",
        58: "alatech_technology_ltd",
        59: "mio_technology_europe",
        60: "rotor",
        61: "geonaute",
        62: "id_bike",
        63: "specialized",
        64: "wtek",
        65: "physical_enterprises",
        66: "north_pole_engineering",
        67: "bkool",
        68: "cateye",
        69: "stages_cycling",
        70: "sigmasport",
        71: "tomtom",
        72: "peripedal",
        73: "wattbike",
        76: "moxy",
        77: "ciclosport",
        78: "powerbahn",
        79: "acorn_projects_aps",
        80: "lifebeam",
        81: "bontrager",
        82: "wellgo",
        83: "scosche",
        84: "magura",
        85: "woodway",
        86: "elite",
        87: "nielsen_kellerman",
        88: "dk_city",
        89: "tacx",
        90: "direction_technology",
        91: "magtonic",
        92: "1partcarbon",
        93: "inside_ride_technologies",
        94: "sound_of_motion",
        95: "stryd",
        96: "icg",
        97: "mipulse",
        98: "bsx_athletics",
        99: "look",
        100: "campagnolo_srl",
        101: "body_bike_smart",
        102: "praxisworks",
        103: "limits_technology",
        104: "topaction_technology",
        105: "cosinuss",
        106: "fitcare",
        107: "magene",
        108: "giant_manufacturing_co",
        109: "tigrasport",
        110: "salutron",
        111: "technogym",
        112: "bryton_sensors",
        113: "latitude_limited",
        114: "soaring_technology",
        115: "igpsport",
        116: "thinkrider",
        117: "gopher_sport",
        118: "waterrower",
        119: "orangetheory",
        120: "inpeak",
        121: "kinetic",
        122: "johnson_health_tech",
        123: "polar_electro",
        124: "seesense",
        125: "nci_technology",
        255: "development",
        257: "healthandlife",
        258: "lezyne",
        259: "scribe_labs",
        260: "zwift",
        261: "watteam",
        262: "recon",
        263: "favero_electronics",
        264: "dynovelo",
        265: "strava",
        266: "precor",
        267: "bryton",
        268: "sram",
        269: "navman",
        270: "cobi",
        271: "spivi",
        272: "mio_magellan",
        273: "evesports",
        274: "sensitivus_gauge",
        275: "podoon",
        276: "life_time_fitness",
        277: "falco_e_motors",
        278: "minoura",
        279: "cycliq",
        280: "luxottica",
        281: "trainer_road",
        282: "the_sufferfest",
        283: "fullspeedahead",
        284: "virtualtraining",
        285: "feedbacksports",
        286: "omata",
        287: "vdo",
        288: "magneticdays",
        289: "hammerhead",
        290: "kinetic_by_kurt",
        291: "shapelog",
        292: "dabuziduo",
        293: "jetblack",
        294: "coros",
        295: "virtugo",
        296: "velosense",
        5759: "actigraphcorp"
      },
      garmin_product: {
        0: "hrm_bike",
        1: "hrm1",
        2: "axh01",
        3: "axb01",
        4: "axb02",
        5: "hrm2ss",
        6: "dsi_alf02",
        7: "hrm3ss",
        8: "hrm_run_single_byte_product_id",
        9: "bsm",
        10: "bcm",
        11: "axs01",
        12: "hrm_tri_single_byte_product_id",
        14: "fr225_single_byte_product_id",
        473: "fr301_china",
        474: "fr301_japan",
        475: "fr301_korea",
        494: "fr301_taiwan",
        717: "fr405",
        782: "fr50",
        987: "fr405_japan",
        988: "fr60",
        1011: "dsi_alf01",
        1018: "fr310xt",
        1036: "edge500",
        1124: "fr110",
        1169: "edge800",
        1199: "edge500_taiwan",
        1213: "edge500_japan",
        1253: "chirp",
        1274: "fr110_japan",
        1325: "edge200",
        1328: "fr910xt",
        1333: "edge800_taiwan",
        1334: "edge800_japan",
        1341: "alf04",
        1345: "fr610",
        1360: "fr210_japan",
        1380: "vector_ss",
        1381: "vector_cp",
        1386: "edge800_china",
        1387: "edge500_china",
        1410: "fr610_japan",
        1422: "edge500_korea",
        1436: "fr70",
        1446: "fr310xt_4t",
        1461: "amx",
        1482: "fr10",
        1497: "edge800_korea",
        1499: "swim",
        1537: "fr910xt_china",
        1551: "fenix",
        1555: "edge200_taiwan",
        1561: "edge510",
        1567: "edge810",
        1570: "tempe",
        1600: "fr910xt_japan",
        1623: "fr620",
        1632: "fr220",
        1664: "fr910xt_korea",
        1688: "fr10_japan",
        1721: "edge810_japan",
        1735: "virb_elite",
        1736: "edge_touring",
        1742: "edge510_japan",
        1743: "hrm_tri",
        1752: "hrm_run",
        1765: "fr920xt",
        1821: "edge510_asia",
        1822: "edge810_china",
        1823: "edge810_taiwan",
        1836: "edge1000",
        1837: "vivo_fit",
        1853: "virb_remote",
        1885: "vivo_ki",
        1903: "fr15",
        1907: "vivo_active",
        1918: "edge510_korea",
        1928: "fr620_japan",
        1929: "fr620_china",
        1930: "fr220_japan",
        1931: "fr220_china",
        1936: "approach_s6",
        1956: "vivo_smart",
        1967: "fenix2",
        1988: "epix",
        2050: "fenix3",
        2052: "edge1000_taiwan",
        2053: "edge1000_japan",
        2061: "fr15_japan",
        2067: "edge520",
        2070: "edge1000_china",
        2072: "fr620_russia",
        2073: "fr220_russia",
        2079: "vector_s",
        2100: "edge1000_korea",
        2130: "fr920xt_taiwan",
        2131: "fr920xt_china",
        2132: "fr920xt_japan",
        2134: "virbx",
        2135: "vivo_smart_apac",
        2140: "etrex_touch",
        2147: "edge25",
        2148: "fr25",
        2150: "vivo_fit2",
        2153: "fr225",
        2156: "fr630",
        2157: "fr230",
        2158: "fr735xt",
        2160: "vivo_active_apac",
        2161: "vector_2",
        2162: "vector_2s",
        2172: "virbxe",
        2173: "fr620_taiwan",
        2174: "fr220_taiwan",
        2175: "truswing",
        2188: "fenix3_china",
        2189: "fenix3_twn",
        2192: "varia_headlight",
        2193: "varia_taillight_old",
        2204: "edge_explore_1000",
        2219: "fr225_asia",
        2225: "varia_radar_taillight",
        2226: "varia_radar_display",
        2238: "edge20",
        2262: "d2_bravo",
        2266: "approach_s20",
        2276: "varia_remote",
        2327: "hrm4_run",
        2337: "vivo_active_hr",
        2348: "vivo_smart_hr",
        2368: "vivo_move",
        2398: "varia_vision",
        2406: "vivo_fit3",
        2413: "fenix3_hr",
        2417: "virb_ultra_30",
        2429: "index_smart_scale",
        2431: "fr235",
        2432: "fenix3_chronos",
        2441: "oregon7xx",
        2444: "rino7xx",
        2496: "nautix",
        2530: "edge_820",
        2531: "edge_explore_820",
        2544: "fenix5s",
        2547: "d2_bravo_titanium",
        2567: "varia_ut800",
        2593: "running_dynamics_pod",
        2604: "fenix5x",
        2606: "vivo_fit_jr",
        2691: "fr935",
        2697: "fenix5",
        2859: "descent",
        10007: "sdm4",
        10014: "edge_remote",
        20119: "training_center",
        65531: "connectiq_simulator",
        65532: "android_antplus_plugin",
        65534: "connect"
      },
      antplus_device_type: {
        1: "antfs",
        11: "bike_power",
        12: "environment_sensor_legacy",
        15: "multi_sport_speed_distance",
        16: "control",
        17: "fitness_equipment",
        18: "blood_pressure",
        19: "geocache_node",
        20: "light_electric_vehicle",
        25: "env_sensor",
        26: "racquet",
        27: "control_hub",
        31: "muscle_oxygen",
        34: "shifting",
        35: "bike_light_main",
        36: "bike_light_shared",
        38: "exd",
        40: "bike_radar",
        46: "bike_aero",
        119: "weight_scale",
        120: "heart_rate",
        121: "bike_speed_cadence",
        122: "bike_cadence",
        123: "bike_speed",
        124: "stride_speed_distance"
      },
      local_device_type: {
        0: "gps",
        1: "glonass",
        2: "gps_glonass",
        3: "accelerometer",
        4: "barometer",
        5: "temperature",
        10: "whr",
        12: "sensor_hub"
      },
      ble_device_type: {
        0: "connected_gps",
        1: "heart_rate",
        2: "bike_power",
        3: "bike_speed_cadence",
        4: "bike_speed",
        5: "bike_cadence",
        6: "footpod",
        7: "bike_trainer"
      },
      ant_network: {
        0: "public",
        1: "antplus",
        2: "antfs",
        3: "private"
      },
      workout_capabilities: {
        0: 0,
        1: "interval",
        2: "custom",
        4: "fitness_equipment",
        8: "firstbeat",
        16: "new_leaf",
        32: "tcx",
        128: "speed",
        256: "heart_rate",
        512: "distance",
        1024: "cadence",
        2048: "power",
        4096: "grade",
        8192: "resistance",
        16384: "protected"
      },
      battery_status: {
        0: 0,
        1: "new",
        2: "good",
        3: "ok",
        4: "low",
        5: "critical",
        6: "charging",
        7: "unknown"
      },
      hr_type: {
        0: "normal",
        1: "irregular"
      },
      course_capabilities: {
        0: 0,
        1: "processed",
        2: "valid",
        4: "time",
        8: "distance",
        16: "position",
        32: "heart_rate",
        64: "power",
        128: "cadence",
        256: "training",
        512: "navigation",
        1024: "bikeway"
      },
      weight: {
        0: 0,
        65534: "calculating"
      },
      workout_hr: {
        0: 0,
        100: "bpm_offset"
      },
      workout_power: {
        0: 0,
        1e3: "watts_offset"
      },
      bp_status: {
        0: "no_error",
        1: "error_incomplete_data",
        2: "error_no_measurement",
        3: "error_data_out_of_range",
        4: "error_irregular_heart_rate"
      },
      user_local_id: {
        0: "local_min",
        15: "local_max",
        16: "stationary_min",
        255: "stationary_max",
        256: "portable_min",
        65534: "portable_max"
      },
      swim_stroke: {
        0: "freestyle",
        1: "backstroke",
        2: "breaststroke",
        3: "butterfly",
        4: "drill",
        5: "mixed",
        6: "im"
      },
      activity_type: {
        0: "generic",
        1: "running",
        2: "cycling",
        3: "transition",
        4: "fitness_equipment",
        5: "swimming",
        6: "walking",
        8: "sedentary",
        254: "all"
      },
      activity_subtype: {
        0: "generic",
        1: "treadmill",
        2: "street",
        3: "trail",
        4: "track",
        5: "spin",
        6: "indoor_cycling",
        7: "road",
        8: "mountain",
        9: "downhill",
        10: "recumbent",
        11: "cyclocross",
        12: "hand_cycling",
        13: "track_cycling",
        14: "indoor_rowing",
        15: "elliptical",
        16: "stair_climbing",
        17: "lap_swimming",
        18: "open_water",
        254: "all"
      },
      activity_level: {
        0: "low",
        1: "medium",
        2: "high"
      },
      side: {
        0: "right",
        1: "left"
      },
      left_right_balance: {
        0: 0,
        127: "mask",
        128: "right"
      },
      left_right_balance_100: {
        0: 0,
        16383: "mask",
        32768: "right"
      },
      length_type: {
        0: "idle",
        1: "active"
      },
      day_of_week: {
        0: "sunday",
        1: "monday",
        2: "tuesday",
        3: "wednesday",
        4: "thursday",
        5: "friday",
        6: "saturday"
      },
      connectivity_capabilities: {
        0: 0,
        1: "bluetooth",
        2: "bluetooth_le",
        4: "ant",
        8: "activity_upload",
        16: "course_download",
        32: "workout_download",
        64: "live_track",
        128: "weather_conditions",
        256: "weather_alerts",
        512: "gps_ephemeris_download",
        1024: "explicit_archive",
        2048: "setup_incomplete",
        4096: "continue_sync_after_software_update",
        8192: "connect_iq_app_download",
        16384: "golf_course_download",
        32768: "device_initiates_sync",
        65536: "connect_iq_watch_app_download",
        131072: "connect_iq_widget_download",
        262144: "connect_iq_watch_face_download",
        524288: "connect_iq_data_field_download",
        1048576: "connect_iq_app_managment",
        2097152: "swing_sensor",
        4194304: "swing_sensor_remote",
        8388608: "incident_detection",
        16777216: "audio_prompts",
        33554432: "wifi_verification",
        67108864: "true_up",
        134217728: "find_my_watch",
        268435456: "remote_manual_sync",
        536870912: "live_track_auto_start",
        1073741824: "live_track_messaging",
        2147483648: "instant_input"
      },
      weather_report: {
        0: "current",
        1: "hourly_forecast",
        2: "daily_forecast"
      },
      weather_status: {
        0: "clear",
        1: "partly_cloudy",
        2: "mostly_cloudy",
        3: "rain",
        4: "snow",
        5: "windy",
        6: "thunderstorms",
        7: "wintry_mix",
        8: "fog",
        11: "hazy",
        12: "hail",
        13: "scattered_showers",
        14: "scattered_thunderstorms",
        15: "unknown_precipitation",
        16: "light_rain",
        17: "heavy_rain",
        18: "light_snow",
        19: "heavy_snow",
        20: "light_rain_snow",
        21: "heavy_rain_snow",
        22: "cloudy"
      },
      weather_severity: {
        0: "unknown",
        1: "warning",
        2: "watch",
        3: "advisory",
        4: "statement"
      },
      weather_severe_type: {
        0: "unspecified",
        1: "tornado",
        2: "tsunami",
        3: "hurricane",
        4: "extreme_wind",
        5: "typhoon",
        6: "inland_hurricane",
        7: "hurricane_force_wind",
        8: "waterspout",
        9: "severe_thunderstorm",
        10: "wreckhouse_winds",
        11: "les_suetes_wind",
        12: "avalanche",
        13: "flash_flood",
        14: "tropical_storm",
        15: "inland_tropical_storm",
        16: "blizzard",
        17: "ice_storm",
        18: "freezing_rain",
        19: "debris_flow",
        20: "flash_freeze",
        21: "dust_storm",
        22: "high_wind",
        23: "winter_storm",
        24: "heavy_freezing_spray",
        25: "extreme_cold",
        26: "wind_chill",
        27: "cold_wave",
        28: "heavy_snow_alert",
        29: "lake_effect_blowing_snow",
        30: "snow_squall",
        31: "lake_effect_snow",
        32: "winter_weather",
        33: "sleet",
        34: "snowfall",
        35: "snow_and_blowing_snow",
        36: "blowing_snow",
        37: "snow_alert",
        38: "arctic_outflow",
        39: "freezing_drizzle",
        40: "storm",
        41: "storm_surge",
        42: "rainfall",
        43: "areal_flood",
        44: "coastal_flood",
        45: "lakeshore_flood",
        46: "excessive_heat",
        47: "heat",
        48: "weather",
        49: "high_heat_and_humidity",
        50: "humidex_and_health",
        51: "humidex",
        52: "gale",
        53: "freezing_spray",
        54: "special_marine",
        55: "squall",
        56: "strong_wind",
        57: "lake_wind",
        58: "marine_weather",
        59: "wind",
        60: "small_craft_hazardous_seas",
        61: "hazardous_seas",
        62: "small_craft",
        63: "small_craft_winds",
        64: "small_craft_rough_bar",
        65: "high_water_level",
        66: "ashfall",
        67: "freezing_fog",
        68: "dense_fog",
        69: "dense_smoke",
        70: "blowing_dust",
        71: "hard_freeze",
        72: "freeze",
        73: "frost",
        74: "fire_weather",
        75: "flood",
        76: "rip_tide",
        77: "high_surf",
        78: "smog",
        79: "air_quality",
        80: "brisk_wind",
        81: "air_stagnation",
        82: "low_water",
        83: "hydrological",
        84: "special_weather"
      },
      stroke_type: {
        0: "no_event",
        1: "other",
        2: "serve",
        3: "forehand",
        4: "backhand",
        5: "smash"
      },
      body_location: {
        0: "left_leg",
        1: "left_calf",
        2: "left_shin",
        3: "left_hamstring",
        4: "left_quad",
        5: "left_glute",
        6: "right_leg",
        7: "right_calf",
        8: "right_shin",
        9: "right_hamstring",
        10: "right_quad",
        11: "right_glute",
        12: "torso_back",
        13: "left_lower_back",
        14: "left_upper_back",
        15: "right_lower_back",
        16: "right_upper_back",
        17: "torso_front",
        18: "left_abdomen",
        19: "left_chest",
        20: "right_abdomen",
        21: "right_chest",
        22: "left_arm",
        23: "left_shoulder",
        24: "left_bicep",
        25: "left_tricep",
        26: "left_brachioradialis",
        27: "left_forearm_extensors",
        28: "right_arm",
        29: "right_shoulder",
        30: "right_bicep",
        31: "right_tricep",
        32: "right_brachioradialis",
        33: "right_forearm_extensors",
        34: "neck",
        35: "throat",
        36: "waist_mid_back",
        37: "waist_front",
        38: "waist_left",
        39: "waist_right"
      },
      segment_lap_status: {
        0: "end",
        1: "fail"
      },
      segment_leaderboard_type: {
        0: "overall",
        1: "personal_best",
        2: "connections",
        3: "group",
        4: "challenger",
        5: "kom",
        6: "qom",
        7: "pr",
        8: "goal",
        9: "rival",
        10: "club_leader"
      },
      segment_delete_status: {
        0: "do_not_delete",
        1: "delete_one",
        2: "delete_all"
      },
      segment_selection_type: {
        0: "starred",
        1: "suggested"
      },
      source_type: {
        0: "ant",
        1: "antplus",
        2: "bluetooth",
        3: "bluetooth_low_energy",
        4: "wifi",
        5: "local"
      },
      display_orientation: {
        0: "auto",
        1: "portrait",
        2: "landscape",
        3: "portrait_flipped",
        4: "landscape_flipped"
      },
      workout_equipment: {
        0: "none",
        1: "swim_fins",
        2: "swim_kickboard",
        3: "swim_paddles",
        4: "swim_pull_buoy",
        5: "swim_snorkel"
      },
      watchface_mode: {
        0: "digital",
        1: "analog",
        2: "connect_iq",
        3: "disabled"
      },
      digital_watchface_layout: {
        0: "traditional",
        1: "modern",
        2: "bold"
      },
      analog_watchface_layout: {
        0: "minimal",
        1: "traditional",
        2: "modern"
      },
      rider_position_type: {
        0: "seated",
        1: "standing",
        2: "transition_to_seated",
        3: "transition_to_standing"
      },
      power_phase_type: {
        0: "power_phase_start_angle",
        1: "power_phase_end_angle",
        2: "power_phase_arc_length",
        3: "power_phase_center"
      },
      camera_event_type: {
        0: "video_start",
        1: "video_split",
        2: "video_end",
        3: "photo_taken",
        4: "video_second_stream_start",
        5: "video_second_stream_split",
        6: "video_second_stream_end",
        7: "video_split_start",
        8: "video_second_stream_split_start",
        11: "video_pause",
        12: "video_second_stream_pause",
        13: "video_resume",
        14: "video_second_stream_resume"
      },
      sensor_type: {
        0: "accelerometer",
        1: "gyroscope",
        2: "compass",
        3: "barometer"
      },
      bike_light_network_config_type: {
        0: "auto",
        4: "individual",
        5: "high_visibility",
        6: "trail"
      },
      comm_timeout_type: {
        0: "wildcard_pairing_timeout",
        1: "pairing_timeout",
        2: "connection_lost",
        3: "connection_timeout"
      },
      camera_orientation_type: {
        0: "camera_orientation_0",
        1: "camera_orientation_90",
        2: "camera_orientation_180",
        3: "camera_orientation_270"
      },
      attitude_stage: {
        0: "failed",
        1: "aligning",
        2: "degraded",
        3: "valid"
      },
      attitude_validity: {
        0: 0,
        1: "track_angle_heading_valid",
        2: "pitch_valid",
        4: "roll_valid",
        8: "lateral_body_accel_valid",
        16: "normal_body_accel_valid",
        32: "turn_rate_valid",
        64: "hw_fail",
        128: "mag_invalid",
        256: "no_gps",
        512: "gps_invalid",
        1024: "solution_coasting",
        2048: "true_track_angle",
        4096: "magnetic_heading"
      },
      auto_sync_frequency: {
        0: "never",
        1: "occasionally",
        2: "frequent",
        3: "once_a_day",
        4: "remote"
      },
      exd_layout: {
        0: "full_screen",
        1: "half_vertical",
        2: "half_horizontal",
        3: "half_vertical_right_split",
        4: "half_horizontal_bottom_split",
        5: "full_quarter_split",
        6: "half_vertical_left_split",
        7: "half_horizontal_top_split"
      },
      exd_display_type: {
        0: "numerical",
        1: "simple",
        2: "graph",
        3: "bar",
        4: "circle_graph",
        5: "virtual_partner",
        6: "balance",
        7: "string_list",
        8: "string",
        9: "simple_dynamic_icon",
        10: "gauge"
      },
      exd_data_units: {
        0: "no_units",
        1: "laps",
        2: "miles_per_hour",
        3: "kilometers_per_hour",
        4: "feet_per_hour",
        5: "meters_per_hour",
        6: "degrees_celsius",
        7: "degrees_farenheit",
        8: "zone",
        9: "gear",
        10: "rpm",
        11: "bpm",
        12: "degrees",
        13: "millimeters",
        14: "meters",
        15: "kilometers",
        16: "feet",
        17: "yards",
        18: "kilofeet",
        19: "miles",
        20: "time",
        21: "enum_turn_type",
        22: "percent",
        23: "watts",
        24: "watts_per_kilogram",
        25: "enum_battery_status",
        26: "enum_bike_light_beam_angle_mode",
        27: "enum_bike_light_battery_status",
        28: "enum_bike_light_network_config_type",
        29: "lights",
        30: "seconds",
        31: "minutes",
        32: "hours",
        33: "calories",
        34: "kilojoules",
        35: "milliseconds",
        36: "second_per_mile",
        37: "second_per_kilometer",
        38: "centimeter",
        39: "enum_course_point",
        40: "bradians",
        41: "enum_sport",
        42: "inches_hg",
        43: "mm_hg",
        44: "mbars",
        45: "hecto_pascals",
        46: "feet_per_min",
        47: "meters_per_min",
        48: "meters_per_sec",
        49: "eight_cardinal"
      },
      exd_qualifiers: {
        0: "no_qualifier",
        1: "instantaneous",
        2: "average",
        3: "lap",
        4: "maximum",
        5: "maximum_average",
        6: "maximum_lap",
        7: "last_lap",
        8: "average_lap",
        9: "to_destination",
        10: "to_go",
        11: "to_next",
        12: "next_course_point",
        13: "total",
        14: "three_second_average",
        15: "ten_second_average",
        16: "thirty_second_average",
        17: "percent_maximum",
        18: "percent_maximum_average",
        19: "lap_percent_maximum",
        20: "elapsed",
        21: "sunrise",
        22: "sunset",
        23: "compared_to_virtual_partner",
        24: "maximum_24h",
        25: "minimum_24h",
        26: "minimum",
        27: "first",
        28: "second",
        29: "third",
        30: "shifter",
        31: "last_sport",
        32: "moving",
        33: "stopped",
        34: "estimated_total",
        242: "zone_9",
        243: "zone_8",
        244: "zone_7",
        245: "zone_6",
        246: "zone_5",
        247: "zone_4",
        248: "zone_3",
        249: "zone_2",
        250: "zone_1"
      },
      exd_descriptors: {
        0: "bike_light_battery_status",
        1: "beam_angle_status",
        2: "batery_level",
        3: "light_network_mode",
        4: "number_lights_connected",
        5: "cadence",
        6: "distance",
        7: "estimated_time_of_arrival",
        8: "heading",
        9: "time",
        10: "battery_level",
        11: "trainer_resistance",
        12: "trainer_target_power",
        13: "time_seated",
        14: "time_standing",
        15: "elevation",
        16: "grade",
        17: "ascent",
        18: "descent",
        19: "vertical_speed",
        20: "di2_battery_level",
        21: "front_gear",
        22: "rear_gear",
        23: "gear_ratio",
        24: "heart_rate",
        25: "heart_rate_zone",
        26: "time_in_heart_rate_zone",
        27: "heart_rate_reserve",
        28: "calories",
        29: "gps_accuracy",
        30: "gps_signal_strength",
        31: "temperature",
        32: "time_of_day",
        33: "balance",
        34: "pedal_smoothness",
        35: "power",
        36: "functional_threshold_power",
        37: "intensity_factor",
        38: "work",
        39: "power_ratio",
        40: "normalized_power",
        41: "training_stress_Score",
        42: "time_on_zone",
        43: "speed",
        44: "laps",
        45: "reps",
        46: "workout_step",
        47: "course_distance",
        48: "navigation_distance",
        49: "course_estimated_time_of_arrival",
        50: "navigation_estimated_time_of_arrival",
        51: "course_time",
        52: "navigation_time",
        53: "course_heading",
        54: "navigation_heading",
        55: "power_zone",
        56: "torque_effectiveness",
        57: "timer_time",
        58: "power_weight_ratio",
        59: "left_platform_center_offset",
        60: "right_platform_center_offset",
        61: "left_power_phase_start_angle",
        62: "right_power_phase_start_angle",
        63: "left_power_phase_finish_angle",
        64: "right_power_phase_finish_angle",
        65: "gears",
        66: "pace",
        67: "training_effect",
        68: "vertical_oscillation",
        69: "vertical_ratio",
        70: "ground_contact_time",
        71: "left_ground_contact_time_balance",
        72: "right_ground_contact_time_balance",
        73: "stride_length",
        74: "running_cadence",
        75: "performance_condition",
        76: "course_type",
        77: "time_in_power_zone",
        78: "navigation_turn",
        79: "course_location",
        80: "navigation_location",
        81: "compass",
        82: "gear_combo",
        83: "muscle_oxygen",
        84: "icon",
        85: "compass_heading",
        86: "gps_heading",
        87: "gps_elevation",
        88: "anaerobic_training_effect",
        89: "course",
        90: "off_course",
        91: "glide_ratio",
        92: "vertical_distance",
        93: "vmg",
        94: "ambient_pressure",
        95: "pressure",
        96: "vam"
      },
      auto_activity_detect: {
        0: "none",
        1: "running",
        2: "cycling",
        4: "swimming",
        8: "walking",
        16: "elliptical",
        32: "sedentary"
      },
      supported_exd_screen_layouts: {
        0: 0,
        1: "full_screen",
        2: "half_vertical",
        4: "half_horizontal",
        8: "half_vertical_right_split",
        16: "half_horizontal_bottom_split",
        32: "full_quarter_split",
        64: "half_vertical_left_split",
        128: "half_horizontal_top_split"
      },
      fit_base_type: {
        0: "enum",
        1: "sint8",
        2: "uint8",
        7: "string",
        10: "uint8z",
        13: "byte",
        131: "sint16",
        132: "uint16",
        133: "sint32",
        134: "uint32",
        136: "float32",
        137: "float64",
        139: "uint16z",
        140: "uint32z",
        142: "sint64",
        143: "uint64",
        144: "uint64z"
      },
      turn_type: {
        0: "arriving_idx",
        1: "arriving_left_idx",
        2: "arriving_right_idx",
        3: "arriving_via_idx",
        4: "arriving_via_left_idx",
        5: "arriving_via_right_idx",
        6: "bear_keep_left_idx",
        7: "bear_keep_right_idx",
        8: "continue_idx",
        9: "exit_left_idx",
        10: "exit_right_idx",
        11: "ferry_idx",
        12: "roundabout_45_idx",
        13: "roundabout_90_idx",
        14: "roundabout_135_idx",
        15: "roundabout_180_idx",
        16: "roundabout_225_idx",
        17: "roundabout_270_idx",
        18: "roundabout_315_idx",
        19: "roundabout_360_idx",
        20: "roundabout_neg_45_idx",
        21: "roundabout_neg_90_idx",
        22: "roundabout_neg_135_idx",
        23: "roundabout_neg_180_idx",
        24: "roundabout_neg_225_idx",
        25: "roundabout_neg_270_idx",
        26: "roundabout_neg_315_idx",
        27: "roundabout_neg_360_idx",
        28: "roundabout_generic_idx",
        29: "roundabout_neg_generic_idx",
        30: "sharp_turn_left_idx",
        31: "sharp_turn_right_idx",
        32: "turn_left_idx",
        33: "turn_right_idx",
        34: "uturn_left_idx",
        35: "uturn_right_idx",
        36: "icon_inv_idx",
        37: "icon_idx_cnt"
      },
      bike_light_beam_angle_mode: {
        0: "manual",
        1: "auto"
      },
      fit_base_unit: {
        0: "other",
        1: "kilogram",
        2: "pound"
      },
      set_type: {
        0: "rest",
        1: "active"
      },
      exercise_category: {
        0: "bench_press",
        1: "calf_raise",
        2: "cardio",
        3: "carry",
        4: "chop",
        5: "core",
        6: "crunch",
        7: "curl",
        8: "deadlift",
        9: "flye",
        10: "hip_raise",
        11: "hip_stability",
        12: "hip_swing",
        13: "hyperextension",
        14: "lateral_raise",
        15: "leg_curl",
        16: "leg_raise",
        17: "lunge",
        18: "olympic_lift",
        19: "plank",
        20: "plyo",
        21: "pull_up",
        22: "push_up",
        23: "row",
        24: "shoulder_press",
        25: "shoulder_stability",
        26: "shrug",
        27: "sit_up",
        28: "squat",
        29: "total_body",
        30: "triceps_extension",
        31: "warm_up",
        32: "run",
        65534: "unknown"
      },
      bench_press_exercise_name: {
        0: "alternating_dumbbell_chest_press_on_swiss_ball",
        1: "barbell_bench_press",
        2: "barbell_board_bench_press",
        3: "barbell_floor_press",
        4: "close_grip_barbell_bench_press",
        5: "decline_dumbbell_bench_press",
        6: "dumbbell_bench_press",
        7: "dumbbell_floor_press",
        8: "incline_barbell_bench_press",
        9: "incline_dumbbell_bench_press",
        10: "incline_smith_machine_bench_press",
        11: "isometric_barbell_bench_press",
        12: "kettlebell_chest_press",
        13: "neutral_grip_dumbbell_bench_press",
        14: "neutral_grip_dumbbell_incline_bench_press",
        15: "one_arm_floor_press",
        16: "weighted_one_arm_floor_press",
        17: "partial_lockout",
        18: "reverse_grip_barbell_bench_press",
        19: "reverse_grip_incline_bench_press",
        20: "single_arm_cable_chest_press",
        21: "single_arm_dumbbell_bench_press",
        22: "smith_machine_bench_press",
        23: "swiss_ball_dumbbell_chest_press",
        24: "triple_stop_barbell_bench_press",
        25: "wide_grip_barbell_bench_press",
        26: "alternating_dumbbell_chest_press"
      },
      calf_raise_exercise_name: {
        0: "3_way_calf_raise",
        1: "3_way_weighted_calf_raise",
        2: "3_way_single_leg_calf_raise",
        3: "3_way_weighted_single_leg_calf_raise",
        4: "donkey_calf_raise",
        5: "weighted_donkey_calf_raise",
        6: "seated_calf_raise",
        7: "weighted_seated_calf_raise",
        8: "seated_dumbbell_toe_raise",
        9: "single_leg_bent_knee_calf_raise",
        10: "weighted_single_leg_bent_knee_calf_raise",
        11: "single_leg_decline_push_up",
        12: "single_leg_donkey_calf_raise",
        13: "weighted_single_leg_donkey_calf_raise",
        14: "single_leg_hip_raise_with_knee_hold",
        15: "single_leg_standing_calf_raise",
        16: "single_leg_standing_dumbbell_calf_raise",
        17: "standing_barbell_calf_raise",
        18: "standing_calf_raise",
        19: "weighted_standing_calf_raise",
        20: "standing_dumbbell_calf_raise"
      },
      cardio_exercise_name: {
        0: "bob_and_weave_circle",
        1: "weighted_bob_and_weave_circle",
        2: "cardio_core_crawl",
        3: "weighted_cardio_core_crawl",
        4: "double_under",
        5: "weighted_double_under",
        6: "jump_rope",
        7: "weighted_jump_rope",
        8: "jump_rope_crossover",
        9: "weighted_jump_rope_crossover",
        10: "jump_rope_jog",
        11: "weighted_jump_rope_jog",
        12: "jumping_jacks",
        13: "weighted_jumping_jacks",
        14: "ski_moguls",
        15: "weighted_ski_moguls",
        16: "split_jacks",
        17: "weighted_split_jacks",
        18: "squat_jacks",
        19: "weighted_squat_jacks",
        20: "triple_under",
        21: "weighted_triple_under"
      },
      carry_exercise_name: {
        0: "bar_holds",
        1: "farmers_walk",
        2: "farmers_walk_on_toes",
        3: "hex_dumbbell_hold",
        4: "overhead_carry"
      },
      chop_exercise_name: {
        0: "cable_pull_through",
        1: "cable_rotational_lift",
        2: "cable_woodchop",
        3: "cross_chop_to_knee",
        4: "weighted_cross_chop_to_knee",
        5: "dumbbell_chop",
        6: "half_kneeling_rotation",
        7: "weighted_half_kneeling_rotation",
        8: "half_kneeling_rotational_chop",
        9: "half_kneeling_rotational_reverse_chop",
        10: "half_kneeling_stability_chop",
        11: "half_kneeling_stability_reverse_chop",
        12: "kneeling_rotational_chop",
        13: "kneeling_rotational_reverse_chop",
        14: "kneeling_stability_chop",
        15: "kneeling_woodchopper",
        16: "medicine_ball_wood_chops",
        17: "power_squat_chops",
        18: "weighted_power_squat_chops",
        19: "standing_rotational_chop",
        20: "standing_split_rotational_chop",
        21: "standing_split_rotational_reverse_chop",
        22: "standing_stability_reverse_chop"
      },
      core_exercise_name: {
        0: "abs_jabs",
        1: "weighted_abs_jabs",
        2: "alternating_plate_reach",
        3: "barbell_rollout",
        4: "weighted_barbell_rollout",
        5: "body_bar_oblique_twist",
        6: "cable_core_press",
        7: "cable_side_bend",
        8: "side_bend",
        9: "weighted_side_bend",
        10: "crescent_circle",
        11: "weighted_crescent_circle",
        12: "cycling_russian_twist",
        13: "weighted_cycling_russian_twist",
        14: "elevated_feet_russian_twist",
        15: "weighted_elevated_feet_russian_twist",
        16: "half_turkish_get_up",
        17: "kettlebell_windmill",
        18: "kneeling_ab_wheel",
        19: "weighted_kneeling_ab_wheel",
        20: "modified_front_lever",
        21: "open_knee_tucks",
        22: "weighted_open_knee_tucks",
        23: "side_abs_leg_lift",
        24: "weighted_side_abs_leg_lift",
        25: "swiss_ball_jackknife",
        26: "weighted_swiss_ball_jackknife",
        27: "swiss_ball_pike",
        28: "weighted_swiss_ball_pike",
        29: "swiss_ball_rollout",
        30: "weighted_swiss_ball_rollout",
        31: "triangle_hip_press",
        32: "weighted_triangle_hip_press",
        33: "trx_suspended_jackknife",
        34: "weighted_trx_suspended_jackknife",
        35: "u_boat",
        36: "weighted_u_boat",
        37: "windmill_switches",
        38: "weighted_windmill_switches",
        39: "alternating_slide_out",
        40: "weighted_alternating_slide_out",
        41: "ghd_back_extensions",
        42: "weighted_ghd_back_extensions",
        43: "overhead_walk",
        44: "inchworm",
        45: "weighted_modified_front_lever",
        46: "russian_twist",
        47: "abdominal_leg_rotations",
        48: "arm_and_leg_extension_on_knees",
        49: "bicycle",
        50: "bicep_curl_with_leg_extension",
        51: "cat_cow",
        52: "corkscrew",
        53: "criss_cross",
        54: "criss_cross_with_ball",
        55: "double_leg_stretch",
        56: "knee_folds",
        57: "lower_lift",
        58: "neck_pull",
        59: "pelvic_clocks",
        60: "roll_over",
        61: "roll_up",
        62: "rolling",
        63: "rowing_1",
        64: "rowing_2",
        65: "scissors",
        66: "single_leg_circles",
        67: "single_leg_stretch",
        68: "snake_twist_1_and_2",
        69: "swan",
        70: "swimming",
        71: "teaser",
        72: "the_hundred"
      },
      crunch_exercise_name: {
        0: "bicycle_crunch",
        1: "cable_crunch",
        2: "circular_arm_crunch",
        3: "crossed_arms_crunch",
        4: "weighted_crossed_arms_crunch",
        5: "cross_leg_reverse_crunch",
        6: "weighted_cross_leg_reverse_crunch",
        7: "crunch_chop",
        8: "weighted_crunch_chop",
        9: "double_crunch",
        10: "weighted_double_crunch",
        11: "elbow_to_knee_crunch",
        12: "weighted_elbow_to_knee_crunch",
        13: "flutter_kicks",
        14: "weighted_flutter_kicks",
        15: "foam_roller_reverse_crunch_on_bench",
        16: "weighted_foam_roller_reverse_crunch_on_bench",
        17: "foam_roller_reverse_crunch_with_dumbbell",
        18: "foam_roller_reverse_crunch_with_medicine_ball",
        19: "frog_press",
        20: "hanging_knee_raise_oblique_crunch",
        21: "weighted_hanging_knee_raise_oblique_crunch",
        22: "hip_crossover",
        23: "weighted_hip_crossover",
        24: "hollow_rock",
        25: "weighted_hollow_rock",
        26: "incline_reverse_crunch",
        27: "weighted_incline_reverse_crunch",
        28: "kneeling_cable_crunch",
        29: "kneeling_cross_crunch",
        30: "weighted_kneeling_cross_crunch",
        31: "kneeling_oblique_cable_crunch",
        32: "knees_to_elbow",
        33: "leg_extensions",
        34: "weighted_leg_extensions",
        35: "leg_levers",
        36: "mcgill_curl_up",
        37: "weighted_mcgill_curl_up",
        38: "modified_pilates_roll_up_with_ball",
        39: "weighted_modified_pilates_roll_up_with_ball",
        40: "pilates_crunch",
        41: "weighted_pilates_crunch",
        42: "pilates_roll_up_with_ball",
        43: "weighted_pilates_roll_up_with_ball",
        44: "raised_legs_crunch",
        45: "weighted_raised_legs_crunch",
        46: "reverse_crunch",
        47: "weighted_reverse_crunch",
        48: "reverse_crunch_on_a_bench",
        49: "weighted_reverse_crunch_on_a_bench",
        50: "reverse_curl_and_lift",
        51: "weighted_reverse_curl_and_lift",
        52: "rotational_lift",
        53: "weighted_rotational_lift",
        54: "seated_alternating_reverse_crunch",
        55: "weighted_seated_alternating_reverse_crunch",
        56: "seated_leg_u",
        57: "weighted_seated_leg_u",
        58: "side_to_side_crunch_and_weave",
        59: "weighted_side_to_side_crunch_and_weave",
        60: "single_leg_reverse_crunch",
        61: "weighted_single_leg_reverse_crunch",
        62: "skater_crunch_cross",
        63: "weighted_skater_crunch_cross",
        64: "standing_cable_crunch",
        65: "standing_side_crunch",
        66: "step_climb",
        67: "weighted_step_climb",
        68: "swiss_ball_crunch",
        69: "swiss_ball_reverse_crunch",
        70: "weighted_swiss_ball_reverse_crunch",
        71: "swiss_ball_russian_twist",
        72: "weighted_swiss_ball_russian_twist",
        73: "swiss_ball_side_crunch",
        74: "weighted_swiss_ball_side_crunch",
        75: "thoracic_crunches_on_foam_roller",
        76: "weighted_thoracic_crunches_on_foam_roller",
        77: "triceps_crunch",
        78: "weighted_bicycle_crunch",
        79: "weighted_crunch",
        80: "weighted_swiss_ball_crunch",
        81: "toes_to_bar",
        82: "weighted_toes_to_bar",
        83: "crunch",
        84: "straight_leg_crunch_with_ball"
      },
      curl_exercise_name: {
        0: "alternating_dumbbell_biceps_curl",
        1: "alternating_dumbbell_biceps_curl_on_swiss_ball",
        2: "alternating_incline_dumbbell_biceps_curl",
        3: "barbell_biceps_curl",
        4: "barbell_reverse_wrist_curl",
        5: "barbell_wrist_curl",
        6: "behind_the_back_barbell_reverse_wrist_curl",
        7: "behind_the_back_one_arm_cable_curl",
        8: "cable_biceps_curl",
        9: "cable_hammer_curl",
        10: "cheating_barbell_biceps_curl",
        11: "close_grip_ez_bar_biceps_curl",
        12: "cross_body_dumbbell_hammer_curl",
        13: "dead_hang_biceps_curl",
        14: "decline_hammer_curl",
        15: "dumbbell_biceps_curl_with_static_hold",
        16: "dumbbell_hammer_curl",
        17: "dumbbell_reverse_wrist_curl",
        18: "dumbbell_wrist_curl",
        19: "ez_bar_preacher_curl",
        20: "forward_bend_biceps_curl",
        21: "hammer_curl_to_press",
        22: "incline_dumbbell_biceps_curl",
        23: "incline_offset_thumb_dumbbell_curl",
        24: "kettlebell_biceps_curl",
        25: "lying_concentration_cable_curl",
        26: "one_arm_preacher_curl",
        27: "plate_pinch_curl",
        28: "preacher_curl_with_cable",
        29: "reverse_ez_bar_curl",
        30: "reverse_grip_wrist_curl",
        31: "reverse_grip_barbell_biceps_curl",
        32: "seated_alternating_dumbbell_biceps_curl",
        33: "seated_dumbbell_biceps_curl",
        34: "seated_reverse_dumbbell_curl",
        35: "split_stance_offset_pinky_dumbbell_curl",
        36: "standing_alternating_dumbbell_curls",
        37: "standing_dumbbell_biceps_curl",
        38: "standing_ez_bar_biceps_curl",
        39: "static_curl",
        40: "swiss_ball_dumbbell_overhead_triceps_extension",
        41: "swiss_ball_ez_bar_preacher_curl",
        42: "twisting_standing_dumbbell_biceps_curl",
        43: "wide_grip_ez_bar_biceps_curl"
      },
      deadlift_exercise_name: {
        0: "barbell_deadlift",
        1: "barbell_straight_leg_deadlift",
        2: "dumbbell_deadlift",
        3: "dumbbell_single_leg_deadlift_to_row",
        4: "dumbbell_straight_leg_deadlift",
        5: "kettlebell_floor_to_shelf",
        6: "one_arm_one_leg_deadlift",
        7: "rack_pull",
        8: "rotational_dumbbell_straight_leg_deadlift",
        9: "single_arm_deadlift",
        10: "single_leg_barbell_deadlift",
        11: "single_leg_barbell_straight_leg_deadlift",
        12: "single_leg_deadlift_with_barbell",
        13: "single_leg_rdl_circuit",
        14: "single_leg_romanian_deadlift_with_dumbbell",
        15: "sumo_deadlift",
        16: "sumo_deadlift_high_pull",
        17: "trap_bar_deadlift",
        18: "wide_grip_barbell_deadlift"
      },
      flye_exercise_name: {
        0: "cable_crossover",
        1: "decline_dumbbell_flye",
        2: "dumbbell_flye",
        3: "incline_dumbbell_flye",
        4: "kettlebell_flye",
        5: "kneeling_rear_flye",
        6: "single_arm_standing_cable_reverse_flye",
        7: "swiss_ball_dumbbell_flye",
        8: "arm_rotations",
        9: "hug_a_tree"
      },
      hip_raise_exercise_name: {
        0: "barbell_hip_thrust_on_floor",
        1: "barbell_hip_thrust_with_bench",
        2: "bent_knee_swiss_ball_reverse_hip_raise",
        3: "weighted_bent_knee_swiss_ball_reverse_hip_raise",
        4: "bridge_with_leg_extension",
        5: "weighted_bridge_with_leg_extension",
        6: "clam_bridge",
        7: "front_kick_tabletop",
        8: "weighted_front_kick_tabletop",
        9: "hip_extension_and_cross",
        10: "weighted_hip_extension_and_cross",
        11: "hip_raise",
        12: "weighted_hip_raise",
        13: "hip_raise_with_feet_on_swiss_ball",
        14: "weighted_hip_raise_with_feet_on_swiss_ball",
        15: "hip_raise_with_head_on_bosu_ball",
        16: "weighted_hip_raise_with_head_on_bosu_ball",
        17: "hip_raise_with_head_on_swiss_ball",
        18: "weighted_hip_raise_with_head_on_swiss_ball",
        19: "hip_raise_with_knee_squeeze",
        20: "weighted_hip_raise_with_knee_squeeze",
        21: "incline_rear_leg_extension",
        22: "weighted_incline_rear_leg_extension",
        23: "kettlebell_swing",
        24: "marching_hip_raise",
        25: "weighted_marching_hip_raise",
        26: "marching_hip_raise_with_feet_on_a_swiss_ball",
        27: "weighted_marching_hip_raise_with_feet_on_a_swiss_ball",
        28: "reverse_hip_raise",
        29: "weighted_reverse_hip_raise",
        30: "single_leg_hip_raise",
        31: "weighted_single_leg_hip_raise",
        32: "single_leg_hip_raise_with_foot_on_bench",
        33: "weighted_single_leg_hip_raise_with_foot_on_bench",
        34: "single_leg_hip_raise_with_foot_on_bosu_ball",
        35: "weighted_single_leg_hip_raise_with_foot_on_bosu_ball",
        36: "single_leg_hip_raise_with_foot_on_foam_roller",
        37: "weighted_single_leg_hip_raise_with_foot_on_foam_roller",
        38: "single_leg_hip_raise_with_foot_on_medicine_ball",
        39: "weighted_single_leg_hip_raise_with_foot_on_medicine_ball",
        40: "single_leg_hip_raise_with_head_on_bosu_ball",
        41: "weighted_single_leg_hip_raise_with_head_on_bosu_ball",
        42: "weighted_clam_bridge",
        43: "single_leg_swiss_ball_hip_raise_and_leg_curl",
        44: "clams",
        45: "inner_thigh_circles",
        46: "inner_thigh_side_lift",
        47: "leg_circles",
        48: "leg_lift",
        49: "leg_lift_in_external_rotation"
      },
      hip_stability_exercise_name: {
        0: "band_side_lying_leg_raise",
        1: "dead_bug",
        2: "weighted_dead_bug",
        3: "external_hip_raise",
        4: "weighted_external_hip_raise",
        5: "fire_hydrant_kicks",
        6: "weighted_fire_hydrant_kicks",
        7: "hip_circles",
        8: "weighted_hip_circles",
        9: "inner_thigh_lift",
        10: "weighted_inner_thigh_lift",
        11: "lateral_walks_with_band_at_ankles",
        12: "pretzel_side_kick",
        13: "weighted_pretzel_side_kick",
        14: "prone_hip_internal_rotation",
        15: "weighted_prone_hip_internal_rotation",
        16: "quadruped",
        17: "quadruped_hip_extension",
        18: "weighted_quadruped_hip_extension",
        19: "quadruped_with_leg_lift",
        20: "weighted_quadruped_with_leg_lift",
        21: "side_lying_leg_raise",
        22: "weighted_side_lying_leg_raise",
        23: "sliding_hip_adduction",
        24: "weighted_sliding_hip_adduction",
        25: "standing_adduction",
        26: "weighted_standing_adduction",
        27: "standing_cable_hip_abduction",
        28: "standing_hip_abduction",
        29: "weighted_standing_hip_abduction",
        30: "standing_rear_leg_raise",
        31: "weighted_standing_rear_leg_raise",
        32: "supine_hip_internal_rotation",
        33: "weighted_supine_hip_internal_rotation"
      },
      hip_swing_excercise_name: {
        0: "single_arm_kettlebell_swing",
        1: "single_arm_dumbbell_swing",
        2: "step_out_swing"
      },
      hyperextension_exercise_name: {
        0: "back_extension_with_opposite_arm_and_leg_reach",
        1: "weighted_back_extension_with_opposite_arm_and_leg_reach",
        2: "base_rotations",
        3: "weighted_base_rotations",
        4: "bent_knee_reverse_hyperextension",
        5: "weighted_bent_knee_reverse_hyperextension",
        6: "hollow_hold_and_roll",
        7: "weighted_hollow_hold_and_roll",
        8: "kicks",
        9: "weighted_kicks",
        10: "knee_raises",
        11: "weighted_knee_raises",
        12: "kneeling_superman",
        13: "weighted_kneeling_superman",
        14: "lat_pull_down_with_row",
        15: "medicine_ball_deadlift_to_reach",
        16: "one_arm_one_leg_row",
        17: "one_arm_row_with_band",
        18: "overhead_lunge_with_medicine_ball",
        19: "plank_knee_tucks",
        20: "weighted_plank_knee_tucks",
        21: "side_step",
        22: "weighted_side_step",
        23: "single_leg_back_extension",
        24: "weighted_single_leg_back_extension",
        25: "spine_extension",
        26: "weighted_spine_extension",
        27: "static_back_extension",
        28: "weighted_static_back_extension",
        29: "superman_from_floor",
        30: "weighted_superman_from_floor",
        31: "swiss_ball_back_extension",
        32: "weighted_swiss_ball_back_extension",
        33: "swiss_ball_hyperextension",
        34: "weighted_swiss_ball_hyperextension",
        35: "swiss_ball_opposite_arm_and_leg_lift",
        36: "weighted_swiss_ball_opposite_arm_and_leg_lift",
        37: "superman_on_swiss_ball",
        38: "cobra",
        39: "supine_floor_barre"
      },
      lateral_raise_exercise_name: {
        0: "45_degree_cable_external_rotation",
        1: "alternating_lateral_raise_with_static_hold",
        2: "bar_muscle_up",
        3: "bent_over_lateral_raise",
        4: "cable_diagonal_raise",
        5: "cable_front_raise",
        6: "calorie_row",
        7: "combo_shoulder_raise",
        8: "dumbbell_diagonal_raise",
        9: "dumbbell_v_raise",
        10: "front_raise",
        11: "leaning_dumbbell_lateral_raise",
        12: "lying_dumbbell_raise",
        13: "muscle_up",
        14: "one_arm_cable_lateral_raise",
        15: "overhand_grip_rear_lateral_raise",
        16: "plate_raises",
        17: "ring_dip",
        18: "weighted_ring_dip",
        19: "ring_muscle_up",
        20: "weighted_ring_muscle_up",
        21: "rope_climb",
        22: "weighted_rope_climb",
        23: "scaption",
        24: "seated_lateral_raise",
        25: "seated_rear_lateral_raise",
        26: "side_lying_lateral_raise",
        27: "standing_lift",
        28: "suspended_row",
        29: "underhand_grip_rear_lateral_raise",
        30: "wall_slide",
        31: "weighted_wall_slide",
        32: "arm_circles",
        33: "shaving_the_head"
      },
      leg_curl_exercise_name: {
        0: "leg_curl",
        1: "weighted_leg_curl",
        2: "good_morning",
        3: "seated_barbell_good_morning",
        4: "single_leg_barbell_good_morning",
        5: "single_leg_sliding_leg_curl",
        6: "sliding_leg_curl",
        7: "split_barbell_good_morning",
        8: "split_stance_extension",
        9: "staggered_stance_good_morning",
        10: "swiss_ball_hip_raise_and_leg_curl",
        11: "zercher_good_morning"
      },
      leg_raise_exercise_name: {
        0: "hanging_knee_raise",
        1: "hanging_leg_raise",
        2: "weighted_hanging_leg_raise",
        3: "hanging_single_leg_raise",
        4: "weighted_hanging_single_leg_raise",
        5: "kettlebell_leg_raises",
        6: "leg_lowering_drill",
        7: "weighted_leg_lowering_drill",
        8: "lying_straight_leg_raise",
        9: "weighted_lying_straight_leg_raise",
        10: "medicine_ball_leg_drops",
        11: "quadruped_leg_raise",
        12: "weighted_quadruped_leg_raise",
        13: "reverse_leg_raise",
        14: "weighted_reverse_leg_raise",
        15: "reverse_leg_raise_on_swiss_ball",
        16: "weighted_reverse_leg_raise_on_swiss_ball",
        17: "single_leg_lowering_drill",
        18: "weighted_single_leg_lowering_drill",
        19: "weighted_hanging_knee_raise",
        20: "lateral_stepover",
        21: "weighted_lateral_stepover"
      },
      lunge_exercise_name: {
        0: "overhead_lunge",
        1: "lunge_matrix",
        2: "weighted_lunge_matrix",
        3: "alternating_barbell_forward_lunge",
        4: "alternating_dumbbell_lunge_with_reach",
        5: "back_foot_elevated_dumbbell_split_squat",
        6: "barbell_box_lunge",
        7: "barbell_bulgarian_split_squat",
        8: "barbell_crossover_lunge",
        9: "barbell_front_split_squat",
        10: "barbell_lunge",
        11: "barbell_reverse_lunge",
        12: "barbell_side_lunge",
        13: "barbell_split_squat",
        14: "core_control_rear_lunge",
        15: "diagonal_lunge",
        16: "drop_lunge",
        17: "dumbbell_box_lunge",
        18: "dumbbell_bulgarian_split_squat",
        19: "dumbbell_crossover_lunge",
        20: "dumbbell_diagonal_lunge",
        21: "dumbbell_lunge",
        22: "dumbbell_lunge_and_rotation",
        23: "dumbbell_overhead_bulgarian_split_squat",
        24: "dumbbell_reverse_lunge_to_high_knee_and_press",
        25: "dumbbell_side_lunge",
        26: "elevated_front_foot_barbell_split_squat",
        27: "front_foot_elevated_dumbbell_split_squat",
        28: "gunslinger_lunge",
        29: "lawnmower_lunge",
        30: "low_lunge_with_isometric_adduction",
        31: "low_side_to_side_lunge",
        32: "lunge",
        33: "weighted_lunge",
        34: "lunge_with_arm_reach",
        35: "lunge_with_diagonal_reach",
        36: "lunge_with_side_bend",
        37: "offset_dumbbell_lunge",
        38: "offset_dumbbell_reverse_lunge",
        39: "overhead_bulgarian_split_squat",
        40: "overhead_dumbbell_reverse_lunge",
        41: "overhead_dumbbell_split_squat",
        42: "overhead_lunge_with_rotation",
        43: "reverse_barbell_box_lunge",
        44: "reverse_box_lunge",
        45: "reverse_dumbbell_box_lunge",
        46: "reverse_dumbbell_crossover_lunge",
        47: "reverse_dumbbell_diagonal_lunge",
        48: "reverse_lunge_with_reach_back",
        49: "weighted_reverse_lunge_with_reach_back",
        50: "reverse_lunge_with_twist_and_overhead_reach",
        51: "weighted_reverse_lunge_with_twist_and_overhead_reach",
        52: "reverse_sliding_box_lunge",
        53: "weighted_reverse_sliding_box_lunge",
        54: "reverse_sliding_lunge",
        55: "weighted_reverse_sliding_lunge",
        56: "runners_lunge_to_balance",
        57: "weighted_runners_lunge_to_balance",
        58: "shifting_side_lunge",
        59: "side_and_crossover_lunge",
        60: "weighted_side_and_crossover_lunge",
        61: "side_lunge",
        62: "weighted_side_lunge",
        63: "side_lunge_and_press",
        64: "side_lunge_jump_off",
        65: "side_lunge_sweep",
        66: "weighted_side_lunge_sweep",
        67: "side_lunge_to_crossover_tap",
        68: "weighted_side_lunge_to_crossover_tap",
        69: "side_to_side_lunge_chops",
        70: "weighted_side_to_side_lunge_chops",
        71: "siff_jump_lunge",
        72: "weighted_siff_jump_lunge",
        73: "single_arm_reverse_lunge_and_press",
        74: "sliding_lateral_lunge",
        75: "weighted_sliding_lateral_lunge",
        76: "walking_barbell_lunge",
        77: "walking_dumbbell_lunge",
        78: "walking_lunge",
        79: "weighted_walking_lunge",
        80: "wide_grip_overhead_barbell_split_squat"
      },
      olympic_lift_exercise_name: {
        0: "barbell_hang_power_clean",
        1: "barbell_hang_squat_clean",
        2: "barbell_power_clean",
        3: "barbell_power_snatch",
        4: "barbell_squat_clean",
        5: "clean_and_jerk",
        6: "barbell_hang_power_snatch",
        7: "barbell_hang_pull",
        8: "barbell_high_pull",
        9: "barbell_snatch",
        10: "barbell_split_jerk",
        11: "clean",
        12: "dumbbell_clean",
        13: "dumbbell_hang_pull",
        14: "one_hand_dumbbell_split_snatch",
        15: "push_jerk",
        16: "single_arm_dumbbell_snatch",
        17: "single_arm_hang_snatch",
        18: "single_arm_kettlebell_snatch",
        19: "split_jerk",
        20: "squat_clean_and_jerk"
      },
      plank_exercise_name: {
        0: "45_degree_plank",
        1: "weighted_45_degree_plank",
        2: "90_degree_static_hold",
        3: "weighted_90_degree_static_hold",
        4: "bear_crawl",
        5: "weighted_bear_crawl",
        6: "cross_body_mountain_climber",
        7: "weighted_cross_body_mountain_climber",
        8: "elbow_plank_pike_jacks",
        9: "weighted_elbow_plank_pike_jacks",
        10: "elevated_feet_plank",
        11: "weighted_elevated_feet_plank",
        12: "elevator_abs",
        13: "weighted_elevator_abs",
        14: "extended_plank",
        15: "weighted_extended_plank",
        16: "full_plank_passe_twist",
        17: "weighted_full_plank_passe_twist",
        18: "inching_elbow_plank",
        19: "weighted_inching_elbow_plank",
        20: "inchworm_to_side_plank",
        21: "weighted_inchworm_to_side_plank",
        22: "kneeling_plank",
        23: "weighted_kneeling_plank",
        24: "kneeling_side_plank_with_leg_lift",
        25: "weighted_kneeling_side_plank_with_leg_lift",
        26: "lateral_roll",
        27: "weighted_lateral_roll",
        28: "lying_reverse_plank",
        29: "weighted_lying_reverse_plank",
        30: "medicine_ball_mountain_climber",
        31: "weighted_medicine_ball_mountain_climber",
        32: "modified_mountain_climber_and_extension",
        33: "weighted_modified_mountain_climber_and_extension",
        34: "mountain_climber",
        35: "weighted_mountain_climber",
        36: "mountain_climber_on_sliding_discs",
        37: "weighted_mountain_climber_on_sliding_discs",
        38: "mountain_climber_with_feet_on_bosu_ball",
        39: "weighted_mountain_climber_with_feet_on_bosu_ball",
        40: "mountain_climber_with_hands_on_bench",
        41: "mountain_climber_with_hands_on_swiss_ball",
        42: "weighted_mountain_climber_with_hands_on_swiss_ball",
        43: "plank",
        44: "plank_jacks_with_feet_on_sliding_discs",
        45: "weighted_plank_jacks_with_feet_on_sliding_discs",
        46: "plank_knee_twist",
        47: "weighted_plank_knee_twist",
        48: "plank_pike_jumps",
        49: "weighted_plank_pike_jumps",
        50: "plank_pikes",
        51: "weighted_plank_pikes",
        52: "plank_to_stand_up",
        53: "weighted_plank_to_stand_up",
        54: "plank_with_arm_raise",
        55: "weighted_plank_with_arm_raise",
        56: "plank_with_knee_to_elbow",
        57: "weighted_plank_with_knee_to_elbow",
        58: "plank_with_oblique_crunch",
        59: "weighted_plank_with_oblique_crunch",
        60: "plyometric_side_plank",
        61: "weighted_plyometric_side_plank",
        62: "rolling_side_plank",
        63: "weighted_rolling_side_plank",
        64: "side_kick_plank",
        65: "weighted_side_kick_plank",
        66: "side_plank",
        67: "weighted_side_plank",
        68: "side_plank_and_row",
        69: "weighted_side_plank_and_row",
        70: "side_plank_lift",
        71: "weighted_side_plank_lift",
        72: "side_plank_with_elbow_on_bosu_ball",
        73: "weighted_side_plank_with_elbow_on_bosu_ball",
        74: "side_plank_with_feet_on_bench",
        75: "weighted_side_plank_with_feet_on_bench",
        76: "side_plank_with_knee_circle",
        77: "weighted_side_plank_with_knee_circle",
        78: "side_plank_with_knee_tuck",
        79: "weighted_side_plank_with_knee_tuck",
        80: "side_plank_with_leg_lift",
        81: "weighted_side_plank_with_leg_lift",
        82: "side_plank_with_reach_under",
        83: "weighted_side_plank_with_reach_under",
        84: "single_leg_elevated_feet_plank",
        85: "weighted_single_leg_elevated_feet_plank",
        86: "single_leg_flex_and_extend",
        87: "weighted_single_leg_flex_and_extend",
        88: "single_leg_side_plank",
        89: "weighted_single_leg_side_plank",
        90: "spiderman_plank",
        91: "weighted_spiderman_plank",
        92: "straight_arm_plank",
        93: "weighted_straight_arm_plank",
        94: "straight_arm_plank_with_shoulder_touch",
        95: "weighted_straight_arm_plank_with_shoulder_touch",
        96: "swiss_ball_plank",
        97: "weighted_swiss_ball_plank",
        98: "swiss_ball_plank_leg_lift",
        99: "weighted_swiss_ball_plank_leg_lift",
        100: "swiss_ball_plank_leg_lift_and_hold",
        101: "swiss_ball_plank_with_feet_on_bench",
        102: "weighted_swiss_ball_plank_with_feet_on_bench",
        103: "swiss_ball_prone_jackknife",
        104: "weighted_swiss_ball_prone_jackknife",
        105: "swiss_ball_side_plank",
        106: "weighted_swiss_ball_side_plank",
        107: "three_way_plank",
        108: "weighted_three_way_plank",
        109: "towel_plank_and_knee_in",
        110: "weighted_towel_plank_and_knee_in",
        111: "t_stabilization",
        112: "weighted_t_stabilization",
        113: "turkish_get_up_to_side_plank",
        114: "weighted_turkish_get_up_to_side_plank",
        115: "two_point_plank",
        116: "weighted_two_point_plank",
        117: "weighted_plank",
        118: "wide_stance_plank_with_diagonal_arm_lift",
        119: "weighted_wide_stance_plank_with_diagonal_arm_lift",
        120: "wide_stance_plank_with_diagonal_leg_lift",
        121: "weighted_wide_stance_plank_with_diagonal_leg_lift",
        122: "wide_stance_plank_with_leg_lift",
        123: "weighted_wide_stance_plank_with_leg_lift",
        124: "wide_stance_plank_with_opposite_arm_and_leg_lift",
        125: "weighted_mountain_climber_with_hands_on_bench",
        126: "weighted_swiss_ball_plank_leg_lift_and_hold",
        127: "weighted_wide_stance_plank_with_opposite_arm_and_leg_lift",
        128: "plank_with_feet_on_swiss_ball",
        129: "side_plank_to_plank_with_reach_under",
        130: "bridge_with_glute_lower_lift",
        131: "bridge_one_leg_bridge",
        132: "plank_with_arm_variations",
        133: "plank_with_leg_lift",
        134: "reverse_plank_with_leg_pull"
      },
      plyo_exercise_name: {
        0: "alternating_jump_lunge",
        1: "weighted_alternating_jump_lunge",
        2: "barbell_jump_squat",
        3: "body_weight_jump_squat",
        4: "weighted_jump_squat",
        5: "cross_knee_strike",
        6: "weighted_cross_knee_strike",
        7: "depth_jump",
        8: "weighted_depth_jump",
        9: "dumbbell_jump_squat",
        10: "dumbbell_split_jump",
        11: "front_knee_strike",
        12: "weighted_front_knee_strike",
        13: "high_box_jump",
        14: "weighted_high_box_jump",
        15: "isometric_explosive_body_weight_jump_squat",
        16: "weighted_isometric_explosive_jump_squat",
        17: "lateral_leap_and_hop",
        18: "weighted_lateral_leap_and_hop",
        19: "lateral_plyo_squats",
        20: "weighted_lateral_plyo_squats",
        21: "lateral_slide",
        22: "weighted_lateral_slide",
        23: "medicine_ball_overhead_throws",
        24: "medicine_ball_side_throw",
        25: "medicine_ball_slam",
        26: "side_to_side_medicine_ball_throws",
        27: "side_to_side_shuffle_jump",
        28: "weighted_side_to_side_shuffle_jump",
        29: "squat_jump_onto_box",
        30: "weighted_squat_jump_onto_box",
        31: "squat_jumps_in_and_out",
        32: "weighted_squat_jumps_in_and_out"
      },
      pull_up_exercise_name: {
        0: "banded_pull_ups",
        1: "30_degree_lat_pulldown",
        2: "band_assisted_chin_up",
        3: "close_grip_chin_up",
        4: "weighted_close_grip_chin_up",
        5: "close_grip_lat_pulldown",
        6: "crossover_chin_up",
        7: "weighted_crossover_chin_up",
        8: "ez_bar_pullover",
        9: "hanging_hurdle",
        10: "weighted_hanging_hurdle",
        11: "kneeling_lat_pulldown",
        12: "kneeling_underhand_grip_lat_pulldown",
        13: "lat_pulldown",
        14: "mixed_grip_chin_up",
        15: "weighted_mixed_grip_chin_up",
        16: "mixed_grip_pull_up",
        17: "weighted_mixed_grip_pull_up",
        18: "reverse_grip_pulldown",
        19: "standing_cable_pullover",
        20: "straight_arm_pulldown",
        21: "swiss_ball_ez_bar_pullover",
        22: "towel_pull_up",
        23: "weighted_towel_pull_up",
        24: "weighted_pull_up",
        25: "wide_grip_lat_pulldown",
        26: "wide_grip_pull_up",
        27: "weighted_wide_grip_pull_up",
        28: "burpee_pull_up",
        29: "weighted_burpee_pull_up",
        30: "jumping_pull_ups",
        31: "weighted_jumping_pull_ups",
        32: "kipping_pull_up",
        33: "weighted_kipping_pull_up",
        34: "l_pull_up",
        35: "weighted_l_pull_up",
        36: "suspended_chin_up",
        37: "weighted_suspended_chin_up",
        38: "pull_up"
      },
      push_up_exercise_name: {
        0: "chest_press_with_band",
        1: "alternating_staggered_push_up",
        2: "weighted_alternating_staggered_push_up",
        3: "alternating_hands_medicine_ball_push_up",
        4: "weighted_alternating_hands_medicine_ball_push_up",
        5: "bosu_ball_push_up",
        6: "weighted_bosu_ball_push_up",
        7: "clapping_push_up",
        8: "weighted_clapping_push_up",
        9: "close_grip_medicine_ball_push_up",
        10: "weighted_close_grip_medicine_ball_push_up",
        11: "close_hands_push_up",
        12: "weighted_close_hands_push_up",
        13: "decline_push_up",
        14: "weighted_decline_push_up",
        15: "diamond_push_up",
        16: "weighted_diamond_push_up",
        17: "explosive_crossover_push_up",
        18: "weighted_explosive_crossover_push_up",
        19: "explosive_push_up",
        20: "weighted_explosive_push_up",
        21: "feet_elevated_side_to_side_push_up",
        22: "weighted_feet_elevated_side_to_side_push_up",
        23: "hand_release_push_up",
        24: "weighted_hand_release_push_up",
        25: "handstand_push_up",
        26: "weighted_handstand_push_up",
        27: "incline_push_up",
        28: "weighted_incline_push_up",
        29: "isometric_explosive_push_up",
        30: "weighted_isometric_explosive_push_up",
        31: "judo_push_up",
        32: "weighted_judo_push_up",
        33: "kneeling_push_up",
        34: "weighted_kneeling_push_up",
        35: "medicine_ball_chest_pass",
        36: "medicine_ball_push_up",
        37: "weighted_medicine_ball_push_up",
        38: "one_arm_push_up",
        39: "weighted_one_arm_push_up",
        40: "weighted_push_up",
        41: "push_up_and_row",
        42: "weighted_push_up_and_row",
        43: "push_up_plus",
        44: "weighted_push_up_plus",
        45: "push_up_with_feet_on_swiss_ball",
        46: "weighted_push_up_with_feet_on_swiss_ball",
        47: "push_up_with_one_hand_on_medicine_ball",
        48: "weighted_push_up_with_one_hand_on_medicine_ball",
        49: "shoulder_push_up",
        50: "weighted_shoulder_push_up",
        51: "single_arm_medicine_ball_push_up",
        52: "weighted_single_arm_medicine_ball_push_up",
        53: "spiderman_push_up",
        54: "weighted_spiderman_push_up",
        55: "stacked_feet_push_up",
        56: "weighted_stacked_feet_push_up",
        57: "staggered_hands_push_up",
        58: "weighted_staggered_hands_push_up",
        59: "suspended_push_up",
        60: "weighted_suspended_push_up",
        61: "swiss_ball_push_up",
        62: "weighted_swiss_ball_push_up",
        63: "swiss_ball_push_up_plus",
        64: "weighted_swiss_ball_push_up_plus",
        65: "t_push_up",
        66: "weighted_t_push_up",
        67: "triple_stop_push_up",
        68: "weighted_triple_stop_push_up",
        69: "wide_hands_push_up",
        70: "weighted_wide_hands_push_up",
        71: "parallette_handstand_push_up",
        72: "weighted_parallette_handstand_push_up",
        73: "ring_handstand_push_up",
        74: "weighted_ring_handstand_push_up",
        75: "ring_push_up",
        76: "weighted_ring_push_up",
        77: "push_up",
        78: "pilates_pushup"
      },
      row_exercise_name: {
        0: "barbell_straight_leg_deadlift_to_row",
        1: "cable_row_standing",
        2: "dumbbell_row",
        3: "elevated_feet_inverted_row",
        4: "weighted_elevated_feet_inverted_row",
        5: "face_pull",
        6: "face_pull_with_external_rotation",
        7: "inverted_row_with_feet_on_swiss_ball",
        8: "weighted_inverted_row_with_feet_on_swiss_ball",
        9: "kettlebell_row",
        10: "modified_inverted_row",
        11: "weighted_modified_inverted_row",
        12: "neutral_grip_alternating_dumbbell_row",
        13: "one_arm_bent_over_row",
        14: "one_legged_dumbbell_row",
        15: "renegade_row",
        16: "reverse_grip_barbell_row",
        17: "rope_handle_cable_row",
        18: "seated_cable_row",
        19: "seated_dumbbell_row",
        20: "single_arm_cable_row",
        21: "single_arm_cable_row_and_rotation",
        22: "single_arm_inverted_row",
        23: "weighted_single_arm_inverted_row",
        24: "single_arm_neutral_grip_dumbbell_row",
        25: "single_arm_neutral_grip_dumbbell_row_and_rotation",
        26: "suspended_inverted_row",
        27: "weighted_suspended_inverted_row",
        28: "t_bar_row",
        29: "towel_grip_inverted_row",
        30: "weighted_towel_grip_inverted_row",
        31: "underhand_grip_cable_row",
        32: "v_grip_cable_row",
        33: "wide_grip_seated_cable_row"
      },
      shoulder_press_exercise_name: {
        0: "alternating_dumbbell_shoulder_press",
        1: "arnold_press",
        2: "barbell_front_squat_to_push_press",
        3: "barbell_push_press",
        4: "barbell_shoulder_press",
        5: "dead_curl_press",
        6: "dumbbell_alternating_shoulder_press_and_twist",
        7: "dumbbell_hammer_curl_to_lunge_to_press",
        8: "dumbbell_push_press",
        9: "floor_inverted_shoulder_press",
        10: "weighted_floor_inverted_shoulder_press",
        11: "inverted_shoulder_press",
        12: "weighted_inverted_shoulder_press",
        13: "one_arm_push_press",
        14: "overhead_barbell_press",
        15: "overhead_dumbbell_press",
        16: "seated_barbell_shoulder_press",
        17: "seated_dumbbell_shoulder_press",
        18: "single_arm_dumbbell_shoulder_press",
        19: "single_arm_step_up_and_press",
        20: "smith_machine_overhead_press",
        21: "split_stance_hammer_curl_to_press",
        22: "swiss_ball_dumbbell_shoulder_press",
        23: "weight_plate_front_raise"
      },
      shoulder_stability_exercise_name: {
        0: "90_degree_cable_external_rotation",
        1: "band_external_rotation",
        2: "band_internal_rotation",
        3: "bent_arm_lateral_raise_and_external_rotation",
        4: "cable_external_rotation",
        5: "dumbbell_face_pull_with_external_rotation",
        6: "floor_i_raise",
        7: "weighted_floor_i_raise",
        8: "floor_t_raise",
        9: "weighted_floor_t_raise",
        10: "floor_y_raise",
        11: "weighted_floor_y_raise",
        12: "incline_i_raise",
        13: "weighted_incline_i_raise",
        14: "incline_l_raise",
        15: "weighted_incline_l_raise",
        16: "incline_t_raise",
        17: "weighted_incline_t_raise",
        18: "incline_w_raise",
        19: "weighted_incline_w_raise",
        20: "incline_y_raise",
        21: "weighted_incline_y_raise",
        22: "lying_external_rotation",
        23: "seated_dumbbell_external_rotation",
        24: "standing_l_raise",
        25: "swiss_ball_i_raise",
        26: "weighted_swiss_ball_i_raise",
        27: "swiss_ball_t_raise",
        28: "weighted_swiss_ball_t_raise",
        29: "swiss_ball_w_raise",
        30: "weighted_swiss_ball_w_raise",
        31: "swiss_ball_y_raise",
        32: "weighted_swiss_ball_y_raise"
      },
      shrug_exercise_name: {
        0: "barbell_jump_shrug",
        1: "barbell_shrug",
        2: "barbell_upright_row",
        3: "behind_the_back_smith_machine_shrug",
        4: "dumbbell_jump_shrug",
        5: "dumbbell_shrug",
        6: "dumbbell_upright_row",
        7: "incline_dumbbell_shrug",
        8: "overhead_barbell_shrug",
        9: "overhead_dumbbell_shrug",
        10: "scaption_and_shrug",
        11: "scapular_retraction",
        12: "serratus_chair_shrug",
        13: "weighted_serratus_chair_shrug",
        14: "serratus_shrug",
        15: "weighted_serratus_shrug",
        16: "wide_grip_jump_shrug"
      },
      sit_up_exercise_name: {
        0: "alternating_sit_up",
        1: "weighted_alternating_sit_up",
        2: "bent_knee_v_up",
        3: "weighted_bent_knee_v_up",
        4: "butterfly_sit_up",
        5: "weighted_butterfly_situp",
        6: "cross_punch_roll_up",
        7: "weighted_cross_punch_roll_up",
        8: "crossed_arms_sit_up",
        9: "weighted_crossed_arms_sit_up",
        10: "get_up_sit_up",
        11: "weighted_get_up_sit_up",
        12: "hovering_sit_up",
        13: "weighted_hovering_sit_up",
        14: "kettlebell_sit_up",
        15: "medicine_ball_alternating_v_up",
        16: "medicine_ball_sit_up",
        17: "medicine_ball_v_up",
        18: "modified_sit_up",
        19: "negative_sit_up",
        20: "one_arm_full_sit_up",
        21: "reclining_circle",
        22: "weighted_reclining_circle",
        23: "reverse_curl_up",
        24: "weighted_reverse_curl_up",
        25: "single_leg_swiss_ball_jackknife",
        26: "weighted_single_leg_swiss_ball_jackknife",
        27: "the_teaser",
        28: "the_teaser_weighted",
        29: "three_part_roll_down",
        30: "weighted_three_part_roll_down",
        31: "v_up",
        32: "weighted_v_up",
        33: "weighted_russian_twist_on_swiss_ball",
        34: "weighted_sit_up",
        35: "x_abs",
        36: "weighted_x_abs",
        37: "sit_up"
      },
      squat_exercise_name: {
        0: "leg_press",
        1: "back_squat_with_body_bar",
        2: "back_squats",
        3: "weighted_back_squats",
        4: "balancing_squat",
        5: "weighted_balancing_squat",
        6: "barbell_back_squat",
        7: "barbell_box_squat",
        8: "barbell_front_squat",
        9: "barbell_hack_squat",
        10: "barbell_hang_squat_snatch",
        11: "barbell_lateral_step_up",
        12: "barbell_quarter_squat",
        13: "barbell_siff_squat",
        14: "barbell_squat_snatch",
        15: "barbell_squat_with_heels_raised",
        16: "barbell_stepover",
        17: "barbell_step_up",
        18: "bench_squat_with_rotational_chop",
        19: "weighted_bench_squat_with_rotational_chop",
        20: "body_weight_wall_squat",
        21: "weighted_wall_squat",
        22: "box_step_squat",
        23: "weighted_box_step_squat",
        24: "braced_squat",
        25: "crossed_arm_barbell_front_squat",
        26: "crossover_dumbbell_step_up",
        27: "dumbbell_front_squat",
        28: "dumbbell_split_squat",
        29: "dumbbell_squat",
        30: "dumbbell_squat_clean",
        31: "dumbbell_stepover",
        32: "dumbbell_step_up",
        33: "elevated_single_leg_squat",
        34: "weighted_elevated_single_leg_squat",
        35: "figure_four_squats",
        36: "weighted_figure_four_squats",
        37: "goblet_squat",
        38: "kettlebell_squat",
        39: "kettlebell_swing_overhead",
        40: "kettlebell_swing_with_flip_to_squat",
        41: "lateral_dumbbell_step_up",
        42: "one_legged_squat",
        43: "overhead_dumbbell_squat",
        44: "overhead_squat",
        45: "partial_single_leg_squat",
        46: "weighted_partial_single_leg_squat",
        47: "pistol_squat",
        48: "weighted_pistol_squat",
        49: "plie_slides",
        50: "weighted_plie_slides",
        51: "plie_squat",
        52: "weighted_plie_squat",
        53: "prisoner_squat",
        54: "weighted_prisoner_squat",
        55: "single_leg_bench_get_up",
        56: "weighted_single_leg_bench_get_up",
        57: "single_leg_bench_squat",
        58: "weighted_single_leg_bench_squat",
        59: "single_leg_squat_on_swiss_ball",
        60: "weighted_single_leg_squat_on_swiss_ball",
        61: "squat",
        62: "weighted_squat",
        63: "squats_with_band",
        64: "staggered_squat",
        65: "weighted_staggered_squat",
        66: "step_up",
        67: "weighted_step_up",
        68: "suitcase_squats",
        69: "sumo_squat",
        70: "sumo_squat_slide_in",
        71: "weighted_sumo_squat_slide_in",
        72: "sumo_squat_to_high_pull",
        73: "sumo_squat_to_stand",
        74: "weighted_sumo_squat_to_stand",
        75: "sumo_squat_with_rotation",
        76: "weighted_sumo_squat_with_rotation",
        77: "swiss_ball_body_weight_wall_squat",
        78: "weighted_swiss_ball_wall_squat",
        79: "thrusters",
        80: "uneven_squat",
        81: "weighted_uneven_squat",
        82: "waist_slimming_squat",
        83: "wall_ball",
        84: "wide_stance_barbell_squat",
        85: "wide_stance_goblet_squat",
        86: "zercher_squat",
        87: "kbs_overhead",
        88: "squat_and_side_kick",
        89: "squat_jumps_in_n_out",
        90: "pilates_plie_squats_parallel_turned_out_flat_and_heels",
        91: "releve_straight_leg_and_knee_bent_with_one_leg_variation"
      },
      total_body_exercise_name: {
        0: "burpee",
        1: "weighted_burpee",
        2: "burpee_box_jump",
        3: "weighted_burpee_box_jump",
        4: "high_pull_burpee",
        5: "man_makers",
        6: "one_arm_burpee",
        7: "squat_thrusts",
        8: "weighted_squat_thrusts",
        9: "squat_plank_push_up",
        10: "weighted_squat_plank_push_up",
        11: "standing_t_rotation_balance",
        12: "weighted_standing_t_rotation_balance"
      },
      triceps_extension_exercise_name: {
        0: "bench_dip",
        1: "weighted_bench_dip",
        2: "body_weight_dip",
        3: "cable_kickback",
        4: "cable_lying_triceps_extension",
        5: "cable_overhead_triceps_extension",
        6: "dumbbell_kickback",
        7: "dumbbell_lying_triceps_extension",
        8: "ez_bar_overhead_triceps_extension",
        9: "incline_dip",
        10: "weighted_incline_dip",
        11: "incline_ez_bar_lying_triceps_extension",
        12: "lying_dumbbell_pullover_to_extension",
        13: "lying_ez_bar_triceps_extension",
        14: "lying_triceps_extension_to_close_grip_bench_press",
        15: "overhead_dumbbell_triceps_extension",
        16: "reclining_triceps_press",
        17: "reverse_grip_pressdown",
        18: "reverse_grip_triceps_pressdown",
        19: "rope_pressdown",
        20: "seated_barbell_overhead_triceps_extension",
        21: "seated_dumbbell_overhead_triceps_extension",
        22: "seated_ez_bar_overhead_triceps_extension",
        23: "seated_single_arm_overhead_dumbbell_extension",
        24: "single_arm_dumbbell_overhead_triceps_extension",
        25: "single_dumbbell_seated_overhead_triceps_extension",
        26: "single_leg_bench_dip_and_kick",
        27: "weighted_single_leg_bench_dip_and_kick",
        28: "single_leg_dip",
        29: "weighted_single_leg_dip",
        30: "static_lying_triceps_extension",
        31: "suspended_dip",
        32: "weighted_suspended_dip",
        33: "swiss_ball_dumbbell_lying_triceps_extension",
        34: "swiss_ball_ez_bar_lying_triceps_extension",
        35: "swiss_ball_ez_bar_overhead_triceps_extension",
        36: "tabletop_dip",
        37: "weighted_tabletop_dip",
        38: "triceps_extension_on_floor",
        39: "triceps_pressdown",
        40: "weighted_dip"
      },
      warm_up_exercise_name: {
        0: "quadruped_rocking",
        1: "neck_tilts",
        2: "ankle_circles",
        3: "ankle_dorsiflexion_with_band",
        4: "ankle_internal_rotation",
        5: "arm_circles",
        6: "bent_over_reach_to_sky",
        7: "cat_camel",
        8: "elbow_to_foot_lunge",
        9: "forward_and_backward_leg_swings",
        10: "groiners",
        11: "inverted_hamstring_stretch",
        12: "lateral_duck_under",
        13: "neck_rotations",
        14: "opposite_arm_and_leg_balance",
        15: "reach_roll_and_lift",
        16: "scorpion",
        17: "shoulder_circles",
        18: "side_to_side_leg_swings",
        19: "sleeper_stretch",
        20: "slide_out",
        21: "swiss_ball_hip_crossover",
        22: "swiss_ball_reach_roll_and_lift",
        23: "swiss_ball_windshield_wipers",
        24: "thoracic_rotation",
        25: "walking_high_kicks",
        26: "walking_high_knees",
        27: "walking_knee_hugs",
        28: "walking_leg_cradles",
        29: "walkout",
        30: "walkout_from_push_up_position"
      },
      run_exercise_name: {
        0: "run",
        1: "walk",
        2: "jog",
        3: "sprint"
      },
      water_type: {
        0: "fresh",
        1: "salt",
        2: "en13319",
        3: "custom"
      },
      tissue_model_type: {
        0: "zhl_16c"
      },
      dive_gas_status: {
        0: "disabled",
        1: "enabled",
        2: "backup_only"
      },
      dive_alarm_type: {
        0: "depth",
        1: "time"
      },
      dive_backlight_mode: {
        0: "at_depth",
        1: "always_on"
      },
      favero_product: {
        10: "assioma_uno",
        12: "assioma_duo"
      }
    }
  };

  // node_modules/fit-file-parser/dist/messages.js
  function getFieldObject(fieldNum, messageNum) {
    const message = FIT.messages[messageNum];
    if (!message) {
      return {};
    }
    return message[fieldNum] || {};
  }
  function getMessageName(messageNum) {
    const message = FIT.messages[messageNum];
    return message ? message.name : "";
  }
  function getFitMessage(messageNum) {
    return {
      name: getMessageName(messageNum),
      getAttributes: (fieldNum) => getFieldObject(fieldNum, messageNum)
    };
  }
  function getFitMessageBaseType(inp) {
    return inp;
  }

  // node_modules/fit-file-parser/dist/binary.js
  var CompressedLocalMsgNumMask = 96;
  var CompressedHeaderMask = 128;
  var GarminTimeOffset = 6310656e5;
  var monitoring_timestamp = 0;
  function addEndian(littleEndian, bytes) {
    let result = 0;
    if (!littleEndian)
      bytes.reverse();
    for (let i = 0; i < bytes.length; i++) {
      result += bytes[i] << (i << 3) >>> 0;
    }
    return result;
  }
  function readData(blob, fDef, startIndex, options) {
    if (fDef.type === "uint8_array") {
      const array8 = [];
      for (let i = 0; i < fDef.size; i++) {
        array8.push(blob[startIndex + i]);
      }
      return array8;
    }
    if (fDef.endianAbility) {
      const temp = [];
      for (let i = 0; i < fDef.size; i++) {
        temp.push(blob[startIndex + i]);
      }
      const { buffer } = new Uint8Array(temp);
      const dataView = new DataView(buffer);
      try {
        switch (fDef.type) {
          case "sint16":
            return dataView.getInt16(0, fDef.littleEndian);
          case "uint16":
          case "uint16z":
            return dataView.getUint16(0, fDef.littleEndian);
          case "sint32":
            return dataView.getInt32(0, fDef.littleEndian);
          case "uint32":
          case "uint32z":
            return dataView.getUint32(0, fDef.littleEndian);
          case "float32":
            return dataView.getFloat32(0, fDef.littleEndian);
          case "float64":
            return dataView.getFloat64(0, fDef.littleEndian);
          case "uint32_array": {
            const array32 = [];
            for (let i = 0; i < fDef.size; i += 4) {
              array32.push(dataView.getUint32(i, fDef.littleEndian));
            }
            return array32;
          }
          case "uint16_array": {
            const array16 = [];
            for (let i = 0; i < fDef.size; i += 2) {
              array16.push(dataView.getUint16(i, fDef.littleEndian));
            }
            return array16;
          }
        }
      } catch (e) {
        if (!options.force) {
          throw e;
        }
      }
      return addEndian(fDef.littleEndian, temp);
    }
    if (fDef.type === "string") {
      const temp = [];
      for (let i = 0; i < fDef.size; i++) {
        if (blob[startIndex + i]) {
          temp.push(blob[startIndex + i]);
        }
      }
      return import_buffer.Buffer.from(temp).toString("utf-8");
    }
    if (fDef.type === "byte_array") {
      const temp = [];
      for (let i = 0; i < fDef.size; i++) {
        temp.push(blob[startIndex + i]);
      }
      return temp;
    }
    if (fDef.type === "sint8") {
      const val = blob[startIndex];
      return val > 127 ? val - 256 : val;
    }
    return blob[startIndex];
  }
  function formatByType(data, type, scale, offset) {
    switch (type) {
      case "date_time":
      case "local_date_time":
        return new Date(data * 1e3 + GarminTimeOffset);
      case "sint32":
        return data * FIT.scConst;
      case "uint8":
      case "sint16":
      case "uint32":
      case "uint16":
        return scale ? data / scale + offset : data;
      case "uint32_array":
      case "uint16_array":
      case "uint8_array":
        if (Array.isArray(data)) {
          const baseType = type.replace("_array", "");
          return data.map((dataItem) => {
            if (isInvalidValue(dataItem, baseType)) {
              return null;
            }
            return scale ? dataItem / scale + offset : dataItem;
          });
        }
        return scale ? data / scale + offset : data;
      default: {
        if (!FIT.types[type]) {
          return data;
        }
        const values = [];
        for (const key in FIT.types[type]) {
          if (key in FIT.types[type]) {
            values.push(String(FIT.types[type][key]));
          }
        }
        if (!values.includes("mask")) {
          const typeMap = FIT.types[type];
          const mapped = typeMap[String(data)];
          return mapped === void 0 ? data : mapped;
        }
        const dataItem = {};
        for (const key in FIT.types[type]) {
          if (key in FIT.types[type]) {
            if (FIT.types[type][key] === "mask") {
              dataItem.value = data & Number(key);
            } else {
              dataItem[FIT.types[type][key]] = !!((data & Number(key)) >> 7);
            }
          }
        }
        return dataItem;
      }
    }
  }
  function isInvalidValue(data, type) {
    switch (type) {
      case "enum":
        return data === 255;
      case "sint8":
        return data === 127;
      case "uint8":
        return data === 255;
      case "sint16":
        return data === 32767;
      case "uint16":
        return data === 65535;
      case "sint32":
        return data === 2147483647;
      case "uint32":
        return data === 4294967295;
      case "string":
        return data === 0;
      case "float32":
        return data === 4294967295;
      case "float64":
        return data === 18446744073709552e3;
      case "uint8z":
        return data === 0;
      case "uint16z":
        return data === 0;
      case "uint32z":
        return data === 0;
      case "byte":
        return data === 255;
      case "sint64":
        return data === 9223372036854776e3;
      case "uint64":
        return data === 18446744073709552e3;
      case "uint64z":
        return data === 0;
      default:
        return false;
    }
  }
  function convertTo(data, unitsList, unitName) {
    const options = FIT.options[unitsList];
    const unit = options[unitName];
    return unit ? data * unit.multiplier + unit.offset : data;
  }
  function applyOptions(data, field, options, fields) {
    switch (field) {
      case "device_type": {
        const isLocal = fields.source_type === "local" || fields.source_type === 5;
        const isBLE = fields.source_type === "bluetooth_low_energy" || fields.source_type === 3 || fields.source_type === "bluetooth" || fields.source_type === 2;
        const isANT = fields.source_type === "antplus" || fields.source_type === 1 || fields.source_type === "ant" || fields.source_type === 0;
        if (isLocal) {
          return FIT.types.local_device_type[data] || data;
        }
        if (isBLE) {
          return FIT.types.ble_device_type[data] || data;
        }
        if (isANT) {
          return FIT.types.antplus_device_type[data] || data;
        }
        return data;
      }
      case "speed":
      case "enhanced_speed":
      case "vertical_speed":
      case "avg_speed":
      case "max_speed":
      case "speed_1s":
      case "ball_speed":
      case "enhanced_avg_speed":
      case "enhanced_max_speed":
      case "avg_pos_vertical_speed":
      case "max_pos_vertical_speed":
      case "avg_neg_vertical_speed":
      case "max_neg_vertical_speed":
        return convertTo(data, "speedUnits", options.speedUnit);
      case "distance":
      case "total_distance":
      case "enhanced_avg_altitude":
      case "enhanced_min_altitude":
      case "enhanced_max_altitude":
      case "enhanced_altitude":
      case "height":
      case "odometer":
      case "avg_stroke_distance":
      case "min_altitude":
      case "avg_altitude":
      case "max_altitude":
      case "total_ascent":
      case "total_descent":
      case "altitude":
      case "cycle_length":
      case "auto_wheelsize":
      case "custom_wheelsize":
      case "gps_accuracy":
        return convertTo(data, "lengthUnits", options.lengthUnit);
      case "temperature":
      case "avg_temperature":
      case "max_temperature":
        return convertTo(data, "temperatureUnits", options.temperatureUnit);
      case "pressure":
      case "start_pressure":
      case "end_pressure":
        return convertTo(data, "pressureUnits", options.pressureUnit);
      case "ant_id": {
        const n1 = data >>> 28 & 15;
        const n2 = data >>> 24 & 15;
        const n3 = data >>> 16 & 255;
        const n4 = data & 65535;
        return `${n1.toString(16).toUpperCase()}-${n2.toString(16).toUpperCase()}-${n3.toString(16).toUpperCase().padStart(2, "0")}-${n4.toString(16).toUpperCase().padStart(4, "0")}`;
      }
      default:
        return data;
    }
  }
  function readRecord(blob, messageTypes, developerFields, startIndex, options, startDate, pausedTime) {
    const recordHeader = blob[startIndex];
    let localMessageType = recordHeader & 15;
    if ((recordHeader & CompressedHeaderMask) === CompressedHeaderMask) {
      localMessageType = (recordHeader & CompressedLocalMsgNumMask) >> 5;
    } else if ((recordHeader & 64) === 64) {
      const hasDeveloperData = (recordHeader & 32) === 32;
      const lEnd = blob[startIndex + 2] === 0;
      const numberOfFields = blob[startIndex + 5];
      const numberOfDeveloperDataFields = hasDeveloperData ? blob[startIndex + 5 + numberOfFields * 3 + 1] : 0;
      const mTypeDef = {
        littleEndian: lEnd,
        globalMessageNumber: addEndian(lEnd, [
          blob[startIndex + 3],
          blob[startIndex + 4]
        ]),
        numberOfFields: numberOfFields + numberOfDeveloperDataFields,
        fieldDefs: []
      };
      const message2 = getFitMessage(mTypeDef.globalMessageNumber);
      for (let i = 0; i < numberOfFields; i++) {
        const fDefIndex = startIndex + 6 + i * 3;
        const baseType = blob[fDefIndex + 2];
        const { field, type } = message2.getAttributes(blob[fDefIndex]);
        const fDef = {
          type,
          fDefNo: blob[fDefIndex],
          size: blob[fDefIndex + 1],
          endianAbility: (baseType & 128) === 128,
          littleEndian: lEnd,
          baseTypeNo: baseType & 15,
          name: field,
          dataType: getFitMessageBaseType(baseType & 15)
        };
        mTypeDef.fieldDefs.push(fDef);
      }
      for (let i = 0; i < numberOfDeveloperDataFields; i++) {
        try {
          const fDefIndex = startIndex + 6 + numberOfFields * 3 + 1 + i * 3;
          const fieldNum = blob[fDefIndex];
          const size = blob[fDefIndex + 1];
          const devDataIndex = blob[fDefIndex + 2];
          const devDef = developerFields[devDataIndex][fieldNum];
          const baseType = devDef.fit_base_type_id;
          const fDef = {
            type: FIT.types.fit_base_type[baseType],
            fDefNo: fieldNum,
            size,
            endianAbility: (baseType & 128) === 128,
            littleEndian: lEnd,
            baseTypeNo: baseType & 15,
            name: devDef.field_name,
            dataType: getFitMessageBaseType(baseType & 15),
            scale: devDef.scale || 1,
            offset: devDef.offset || 0,
            developerDataIndex: devDataIndex,
            isDeveloperField: true
          };
          mTypeDef.fieldDefs.push(fDef);
        } catch (e) {
          if (options.force) {
            continue;
          }
          throw e;
        }
      }
      messageTypes[localMessageType] = mTypeDef;
      const nextIndex = startIndex + 6 + mTypeDef.numberOfFields * 3;
      const nextIndexWithDeveloperData = nextIndex + 1;
      return {
        messageType: "definition",
        nextIndex: hasDeveloperData ? nextIndexWithDeveloperData : nextIndex
      };
    }
    const messageType = messageTypes[localMessageType] || messageTypes[0];
    let messageSize = 0;
    let readDataFromIndex = startIndex + 1;
    const fields = {};
    const message = getFitMessage(messageType.globalMessageNumber);
    const rawFields = [];
    for (let i = 0; i < messageType.fieldDefs.length; i++) {
      const fDef = messageType.fieldDefs[i];
      const data = readData(blob, fDef, readDataFromIndex, options);
      if (!isInvalidValue(data, fDef.type)) {
        rawFields.push({ fDef, data });
      }
      readDataFromIndex += fDef.size;
      messageSize += fDef.size;
    }
    for (const { fDef, data } of rawFields) {
      const { field } = fDef.isDeveloperField ? { field: fDef.name } : message.getAttributes(fDef.fDefNo);
      if (field !== "unknown" && field !== "" && field !== void 0) {
        fields[field] = data;
      }
    }
    for (const { fDef, data } of rawFields) {
      if (fDef.isDeveloperField) {
        const field = fDef.name;
        const { type } = fDef;
        const { scale } = fDef;
        const { offset } = fDef;
        fields[fDef.name] = applyOptions(formatByType(data, type, scale, offset), field, options, fields);
      } else {
        const { field, type, scale, offset } = message.getAttributes(fDef.fDefNo);
        if (field !== "unknown" && field !== "" && field !== void 0) {
          fields[field] = applyOptions(formatByType(data, type, scale, offset), field, options, fields);
        }
      }
      if (message.name === "record" && options.elapsedRecordField) {
        fields.elapsed_time = (fields.timestamp - (startDate || 0)) / 1e3;
        fields.timer_time = fields.elapsed_time - pausedTime;
      }
    }
    if (message.name === "field_description") {
      developerFields[fields.developer_data_index] = developerFields[fields.developer_data_index] || [];
      developerFields[fields.developer_data_index][fields.field_definition_number] = fields;
    }
    if (message.name === "monitoring") {
      if (fields.timestamp) {
        monitoring_timestamp = fields.timestamp;
        fields.timestamp = new Date(fields.timestamp * 1e3 + GarminTimeOffset);
      }
      if (fields.timestamp16 && !fields.timestamp) {
        monitoring_timestamp += fields.timestamp16 - (monitoring_timestamp & 65535) & 65535;
        fields.timestamp = new Date(monitoring_timestamp * 1e3 + GarminTimeOffset);
      }
    }
    return {
      messageType: message.name,
      nextIndex: startIndex + messageSize + 1,
      message: fields
    };
  }
  function getArrayBuffer(buffer) {
    if (buffer instanceof ArrayBuffer) {
      return buffer;
    }
    const ab = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    return ab;
  }
  function calculateCRC(blob, start, end) {
    const crcTable = [
      0,
      52225,
      55297,
      5120,
      61441,
      15360,
      10240,
      58369,
      40961,
      27648,
      30720,
      46081,
      20480,
      39937,
      34817,
      17408
    ];
    let crc = 0;
    for (let i = start; i < end; i++) {
      const byteVal = blob[i];
      let tmp = crcTable[crc & 15];
      crc = crc >> 4 & 4095;
      crc = crc ^ tmp ^ crcTable[byteVal & 15];
      tmp = crcTable[crc & 15];
      crc = crc >> 4 & 4095;
      crc = crc ^ tmp ^ crcTable[byteVal >> 4 & 15];
    }
    return crc;
  }

  // node_modules/fit-file-parser/dist/helper.js
  function mapDataIntoLap(inputLaps, lapKey, data) {
    const laps = [...inputLaps];
    let index = 0;
    for (let i = 0; i < laps.length; i++) {
      const nextLap = laps[i + 1];
      const tempData = [];
      const nextLapStartTime = nextLap ? new Date(nextLap.start_time).getTime() : null;
      for (let j = index; j < data.length; j++) {
        const row = data[j];
        if (nextLap && nextLapStartTime) {
          const timestamp = new Date(row.timestamp || row.start_time).getTime();
          if (nextLapStartTime > timestamp) {
            tempData.push(row);
          } else if (nextLapStartTime <= timestamp) {
            index = j;
            break;
          }
        } else {
          tempData.push(row);
        }
      }
      if (!laps[i][lapKey]) {
        laps[i][lapKey] = tempData;
      }
    }
    return laps;
  }
  function mapDataIntoSession(inputSessions, laps) {
    const sessions = [...inputSessions];
    let lapIndex = 0;
    for (let i = 0; i < sessions.length; i++) {
      const nextSession = sessions[i + 1];
      const tempLaps = [];
      const nextSessionStartTime = nextSession ? new Date(nextSession.start_time).getTime() : null;
      for (let j = lapIndex; j < laps.length; j++) {
        const lap = laps[j];
        if (nextSession && nextSessionStartTime) {
          const lapStartTime = new Date(lap.start_time).getTime();
          if (nextSessionStartTime > lapStartTime) {
            tempLaps.push(lap);
          } else if (nextSessionStartTime <= lapStartTime) {
            lapIndex = j;
            break;
          }
        } else {
          tempLaps.push(lap);
        }
      }
      if (!sessions[i].laps) {
        sessions[i].laps = tempLaps;
      }
    }
    return sessions;
  }

  // node_modules/fit-file-parser/dist/fit-parser.js
  var FitParser = class {
    constructor(options = {}) {
      this.options = {
        force: options.force != null ? options.force : true,
        speedUnit: options.speedUnit || "m/s",
        lengthUnit: options.lengthUnit || "m",
        temperatureUnit: options.temperatureUnit || "celsius",
        elapsedRecordField: options.elapsedRecordField || false,
        pressureUnit: options.pressureUnit || "bar",
        mode: options.mode || "list"
      };
    }
    parseAsync(content) {
      return new Promise((resolve, reject) => {
        this.parse(content, (error, data) => {
          if (error) {
            reject(error);
          } else if (data) {
            resolve(data);
          }
        });
      });
    }
    parse(content, callback) {
      var _a;
      const blob = new Uint8Array(getArrayBuffer(content));
      if (blob.length < 12) {
        callback("File to small to be a FIT file", void 0);
        if (!this.options.force) {
          return;
        }
      }
      const headerLength = blob[0];
      if (headerLength !== 14 && headerLength !== 12) {
        callback("Incorrect header size", void 0);
        if (!this.options.force) {
          return;
        }
      }
      let fileTypeString = "";
      for (let i = 8; i < 12; i++) {
        fileTypeString += String.fromCharCode(blob[i]);
      }
      if (fileTypeString !== ".FIT") {
        callback("Missing '.FIT' in header", void 0);
        if (!this.options.force) {
          return;
        }
      }
      if (headerLength === 14) {
        const crcHeader = blob[12] + (blob[13] << 8);
        const crcHeaderCalc = calculateCRC(blob, 0, 12);
        if (crcHeader !== crcHeaderCalc) {
          if (!this.options.force) {
            return;
          }
        }
      }
      const protocolVersion = blob[1];
      const profileVersion = blob[2] + (blob[3] << 8);
      const dataLength = blob[4] + (blob[5] << 8) + (blob[6] << 16) + (blob[7] << 24);
      const crcStart = dataLength + headerLength;
      const crcFile = blob[crcStart] + (blob[crcStart + 1] << 8);
      const crcFileCalc = calculateCRC(blob, headerLength === 12 ? 0 : headerLength, crcStart);
      if (crcFile !== crcFileCalc) {
        if (!this.options.force) {
          return;
        }
      }
      const fitObj = {
        profileVersion,
        protocolVersion
      };
      let sessions = [];
      let laps = [];
      const records = [];
      const events = [];
      const hr_zone = [];
      const power_zone = [];
      const hrv = [];
      const device_infos = [];
      const applications = [];
      const fieldDescriptions = [];
      const dive_gases = [];
      const course_points = [];
      const sports = [];
      const monitors = [];
      const stress = [];
      const definitions = [];
      const file_ids = [];
      const monitor_info = [];
      const lengths = [];
      const tank_updates = [];
      const tank_summaries = [];
      const jumps = [];
      const time_in_zone = [];
      const activity_metrics = [];
      let loopIndex = headerLength;
      const messageTypes = [];
      const developerFields = [];
      const isModeCascade = this.options.mode === "cascade";
      const isCascadeNeeded = isModeCascade || this.options.mode === "both";
      let startDate;
      let lastStopTimestamp;
      let pausedTime = 0;
      while (loopIndex < crcStart) {
        const { nextIndex, messageType, message } = readRecord(blob, messageTypes, developerFields, loopIndex, this.options, startDate, pausedTime);
        loopIndex = nextIndex;
        switch (messageType) {
          case "lap":
            laps.push(message);
            break;
          case "session":
            sessions.push(message);
            break;
          case "event":
            if (message.event === "timer") {
              if (message.event_type === "stop_all") {
                lastStopTimestamp = message.timestamp;
              } else if (message.event_type === "start" && lastStopTimestamp) {
                pausedTime += (message.timestamp - lastStopTimestamp) / 1e3;
              }
            }
            events.push(message);
            break;
          case "length":
            lengths.push(message);
            break;
          case "hrv":
            hrv.push(message);
            break;
          case "hr_zone":
            hr_zone.push(message);
            break;
          case "power_zone":
            power_zone.push(message);
            break;
          case "record":
            if (!startDate) {
              startDate = message.timestamp;
              message.elapsed_time = 0;
              message.timer_time = 0;
            }
            records.push(message);
            break;
          case "field_description":
            fieldDescriptions.push(message);
            break;
          case "device_info":
            device_infos.push(message);
            break;
          case "developer_data_id":
            applications.push(message);
            break;
          case "dive_gas":
            dive_gases.push(message);
            break;
          case "course_point":
            course_points.push(message);
            break;
          case "sport":
            sports.push(message);
            break;
          case "file_id":
            if (message) {
              file_ids.push(message);
            }
            break;
          case "definition":
            if (message) {
              definitions.push(message);
            }
            break;
          case "monitoring":
            monitors.push(message);
            break;
          case "monitoring_info":
            monitor_info.push(message);
            break;
          case "stress_level":
            stress.push(message);
            break;
          case "software":
            fitObj.software = message;
            break;
          case "tank_update":
            tank_updates.push(message);
            break;
          case "tank_summary":
            tank_summaries.push(message);
            break;
          case "jump":
            jumps.push(message);
            break;
          case "time_in_zone":
            time_in_zone.push(message);
            break;
          case "activity_metrics":
            activity_metrics.push(message);
            break;
          default:
            if (messageType !== "") {
              fitObj[messageType] = message;
            }
            break;
        }
      }
      fitObj.hr_zone = hr_zone;
      fitObj.power_zone = power_zone;
      fitObj.dive_gases = dive_gases;
      fitObj.course_points = course_points;
      fitObj.sports = sports;
      fitObj.monitors = monitors;
      fitObj.stress = stress;
      fitObj.file_ids = file_ids;
      fitObj.monitor_info = monitor_info;
      fitObj.definitions = definitions;
      fitObj.tank_updates = tank_updates;
      fitObj.tank_summaries = tank_summaries;
      fitObj.jumps = jumps;
      fitObj.time_in_zone = time_in_zone;
      fitObj.activity_metrics = activity_metrics;
      if (isCascadeNeeded) {
        laps = mapDataIntoLap(laps, "records", records);
        laps = mapDataIntoLap(laps, "lengths", lengths);
        sessions = mapDataIntoSession(sessions, laps);
        fitObj.activity = Object.assign(Object.assign({}, (_a = fitObj.activity) !== null && _a !== void 0 ? _a : {}), {
          // ugly but we assume the activity was parsed correctly with all other members correctly
          sessions,
          events,
          hrv,
          device_infos,
          developer_data_ids: applications,
          field_descriptions: fieldDescriptions,
          sports
        });
      }
      if (!isModeCascade) {
        fitObj.sessions = sessions;
        fitObj.laps = laps;
        fitObj.lengths = lengths;
        fitObj.records = records;
        fitObj.events = events;
        fitObj.device_infos = device_infos;
        fitObj.developer_data_ids = applications;
        fitObj.field_descriptions = fieldDescriptions;
        fitObj.hrv = hrv;
      }
      callback(void 0, fitObj);
    }
  };

  // src/image-to-path/preprocess.js
  function lumaFromRgb(r, g, b, mode) {
    if (mode === "max" || mode === "hsvV") {
      return Math.max(r, g, b) | 0;
    }
    return 0.299 * r + 0.587 * g + 0.114 * b | 0;
  }
  function applyGamma(gray, width, height, gamma) {
    if (gamma == null || gamma === 1 || !Number.isFinite(gamma) || gamma <= 0) {
      return gray;
    }
    const inv = 1 / gamma;
    const lut = new Uint8ClampedArray(256);
    for (let v = 0; v < 256; v++) {
      lut[v] = Math.min(255, Math.round(255 * Math.pow(v / 255, inv)));
    }
    const n = width * height;
    const out = new Uint8ClampedArray(n);
    for (let i = 0; i < n; i++) {
      out[i] = lut[gray[i]];
    }
    return out;
  }
  function clipHistogram(hist, clipLimit, numPixels) {
    const limit = Math.max(1, clipLimit * numPixels / 256);
    let excess = 0;
    for (let i = 0; i < 256; i++) {
      if (hist[i] > limit) {
        excess += hist[i] - limit;
        hist[i] = limit;
      }
    }
    const inc = excess / 256;
    for (let i = 0; i < 256; i++) {
      hist[i] += inc;
    }
  }
  function histToLut(hist, numPixels) {
    const cdf0 = hist[0];
    const cdf = new Float32Array(256);
    cdf[0] = hist[0];
    for (let i = 1; i < 256; i++) {
      cdf[i] = cdf[i - 1] + hist[i];
    }
    const cmin = cdf0;
    const scale = numPixels > cmin ? 255 / (numPixels - cmin) : 0;
    const lut = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      lut[i] = Math.min(255, Math.round((cdf[i] - cmin) * scale));
    }
    return lut;
  }
  function buildTileLuts(gray, width, height, tileSize, clipLimit) {
    const numTilesX = Math.max(1, Math.ceil(width / tileSize));
    const numTilesY = Math.max(1, Math.ceil(height / tileSize));
    const luts = [];
    for (let tj = 0; tj < numTilesY; tj++) {
      for (let ti = 0; ti < numTilesX; ti++) {
        const x0 = ti * tileSize;
        const y0 = tj * tileSize;
        const x1 = Math.min(x0 + tileSize, width);
        const y1 = Math.min(y0 + tileSize, height);
        const h = new Float32Array(256);
        let count = 0;
        for (let y = y0; y < y1; y++) {
          const row = y * width;
          for (let x = x0; x < x1; x++) {
            h[gray[row + x]]++;
            count++;
          }
        }
        if (count === 0) {
          const id = new Uint8Array(256);
          for (let i = 0; i < 256; i++) id[i] = i;
          luts.push(id);
          continue;
        }
        clipHistogram(h, clipLimit, count);
        const lut = histToLut(h, count);
        luts.push(lut);
      }
    }
    return { luts, numTilesX, numTilesY };
  }
  function applyClahe(gray, width, height, opts = {}) {
    const tileSize = opts.tileSize ?? 8;
    const clipLimit = opts.clipLimit ?? 3;
    const { luts, numTilesX, numTilesY } = buildTileLuts(gray, width, height, tileSize, clipLimit);
    const getLut = (ti, tj) => {
      const tiC = Math.max(0, Math.min(ti, numTilesX - 1));
      const tjC = Math.max(0, Math.min(tj, numTilesY - 1));
      return luts[tjC * numTilesX + tiC];
    };
    const out = new Uint8ClampedArray(width * height);
    for (let y = 0; y < height; y++) {
      const row = y * width;
      const ya = y / tileSize;
      const j0 = Math.floor(ya);
      const j1 = Math.min(j0 + 1, numTilesY - 1);
      const wy = ya - j0;
      for (let x = 0; x < width; x++) {
        const xa = x / tileSize;
        const i0 = Math.floor(xa);
        const i1 = Math.min(i0 + 1, numTilesX - 1);
        const wx = xa - i0;
        const v = gray[row + x];
        const l00 = getLut(i0, j0)[v];
        const l10 = getLut(i1, j0)[v];
        const l01 = getLut(i0, j1)[v];
        const l11 = getLut(i1, j1)[v];
        const a = (1 - wx) * l00 + wx * l10;
        const b = (1 - wx) * l01 + wx * l11;
        out[row + x] = Math.min(255, Math.round((1 - wy) * a + wy * b));
      }
    }
    return out;
  }
  function applyGrayPreprocess(grayObj, opts = {}) {
    const { width, height } = grayObj;
    let data = grayObj.data;
    const gamma = opts.gamma ?? 1;
    data = applyGamma(data, width, height, gamma);
    if (opts.clahe === true) {
      data = applyClahe(data, width, height, {
        tileSize: opts.claheTileSize ?? 8,
        clipLimit: opts.claheClipLimit ?? 3
      });
    }
    return { data, width, height };
  }

  // src/image-to-path/image.js
  function loadGrayImageData(source, options = {}) {
    const maxSize = options.maxSize || 0;
    const lumaMode = "bt601";
    let w = source.width;
    let h = source.height;
    if (maxSize > 0 && Math.max(w, h) > maxSize) {
      const scale = maxSize / Math.max(w, h);
      w = Math.round(w * scale);
      h = Math.round(h * scale);
    }
    const canvas = typeof document !== "undefined" ? document.createElement("canvas") : new OffscreenCanvas(w, h);
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(source, 0, 0, w, h);
    const imageData = ctx.getImageData(0, 0, w, h);
    const { data } = imageData;
    const gray = new Uint8ClampedArray(w * h);
    for (let i = 0; i < w * h; i++) {
      const r = data[i * 4];
      const g = data[i * 4 + 1];
      const b = data[i * 4 + 2];
      const a = data[i * 4 + 3];
      let R = r, G = g, B = b;
      if (a < 255) {
        const t = a / 255;
        R = r * t + 255 * (1 - t) | 0;
        G = g * t + 255 * (1 - t) | 0;
        B = b * t + 255 * (1 - t) | 0;
      }
      gray[i] = lumaFromRgb(R, G, B, lumaMode);
    }
    return applyGrayPreprocess({ data: gray, width: w, height: h }, {});
  }
  function fileToBitmap(file) {
    return createImageBitmap(file);
  }
  async function urlToBitmap(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
    const blob = await res.blob();
    return createImageBitmap(blob);
  }

  // src/image-to-path/canny.js
  var GAUSSIAN_5 = [
    2,
    4,
    5,
    4,
    2,
    4,
    9,
    12,
    9,
    4,
    5,
    12,
    15,
    12,
    5,
    4,
    9,
    12,
    9,
    4,
    2,
    4,
    5,
    4,
    2
  ];
  function gaussianBlur5(src, width, height) {
    const out = new Uint8ClampedArray(src.length);
    const k = 2;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let sum = 0;
        let wsum = 0;
        for (let dy = -k; dy <= k; dy++) {
          for (let dx = -k; dx <= k; dx++) {
            const nx = Math.max(0, Math.min(width - 1, x + dx));
            const ny = Math.max(0, Math.min(height - 1, y + dy));
            const w = GAUSSIAN_5[(dy + k) * 5 + (dx + k)];
            sum += src[ny * width + nx] * w;
            wsum += w;
          }
        }
        out[y * width + x] = Math.round(sum / wsum);
      }
    }
    return out;
  }
  function sobel(src, width, height) {
    const mag = new Float32Array(width * height);
    const dir = new Float32Array(width * height);
    const GX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const GY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0, gy = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const v = src[(y + dy) * width + (x + dx)];
            gx += v * GX[(dy + 1) * 3 + (dx + 1)];
            gy += v * GY[(dy + 1) * 3 + (dx + 1)];
          }
        }
        const i = y * width + x;
        mag[i] = Math.sqrt(gx * gx + gy * gy);
        dir[i] = Math.atan2(gy, gx);
      }
    }
    return { mag, dir };
  }
  function nonMaxSuppression(mag, dir, width, height) {
    const out = new Float32Array(width * height);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = y * width + x;
        const m = mag[i];
        if (m === 0) continue;
        const d = dir[i];
        const ddeg = (d * 180 / Math.PI + 180) % 180;
        let m1, m2;
        if (ddeg < 22.5 || ddeg >= 157.5) {
          m1 = mag[y * width + (x - 1)];
          m2 = mag[y * width + (x + 1)];
        } else if (ddeg < 67.5) {
          m1 = mag[(y - 1) * width + (x + 1)];
          m2 = mag[(y + 1) * width + (x - 1)];
        } else if (ddeg < 112.5) {
          m1 = mag[(y - 1) * width + x];
          m2 = mag[(y + 1) * width + x];
        } else {
          m1 = mag[(y - 1) * width + (x - 1)];
          m2 = mag[(y + 1) * width + (x + 1)];
        }
        out[i] = m >= m1 && m >= m2 ? m : 0;
      }
    }
    return out;
  }
  function hysteresis(mag, width, height, low, high) {
    const out = new Uint8ClampedArray(width * height);
    const strong = 255;
    const weak = 50;
    for (let i = 0; i < mag.length; i++) {
      if (mag[i] >= high) out[i] = strong;
      else if (mag[i] >= low) out[i] = weak;
      else out[i] = 0;
    }
    const stack = [];
    for (let i = 0; i < mag.length; i++) {
      if (out[i] === strong) stack.push(i);
    }
    while (stack.length > 0) {
      const i = stack.pop();
      const x = i % width;
      const y = i / width | 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          const ni = ny * width + nx;
          if (out[ni] === weak) {
            out[ni] = strong;
            stack.push(ni);
          }
        }
      }
    }
    for (let i = 0; i < out.length; i++) {
      if (out[i] === weak) out[i] = 0;
    }
    return out;
  }
  function magnitudePercentile(suppressed, percentile) {
    const tmp = [];
    for (let i = 0; i < suppressed.length; i++) {
      const v = suppressed[i];
      if (v > 0) tmp.push(v);
    }
    if (tmp.length === 0) return 1;
    tmp.sort((a, b) => a - b);
    const p = Math.min(100, Math.max(0, percentile));
    const idx = Math.min(tmp.length - 1, Math.max(0, Math.floor(p / 100 * (tmp.length - 1))));
    return tmp[idx];
  }
  function resolveBlurPasses(options, low, highOrig, thresholdMode) {
    if (options.gaussianPasses != null && Number.isFinite(options.gaussianPasses)) {
      return Math.max(1, Math.min(5, Math.round(options.gaussianPasses)));
    }
    if (thresholdMode === "percentile") {
      return 2;
    }
    let h = highOrig;
    if (h >= 240) {
      h = Math.max(low * 2, 100);
    }
    return h >= 200 ? 3 : 2;
  }
  function canny(gray, options = {}) {
    let low = options.low ?? 50;
    let high = options.high ?? 150;
    const thresholdMode = options.thresholdMode === "percentile" ? "percentile" : "absolute";
    const { data, width, height } = gray;
    const highOrig = high;
    const passes = resolveBlurPasses(options, low, highOrig, thresholdMode);
    let blurred = gaussianBlur5(data, width, height);
    for (let p = 1; p < passes; p++) {
      blurred = gaussianBlur5(blurred, width, height);
    }
    const { mag, dir } = sobel(blurred, width, height);
    const suppressed = nonMaxSuppression(mag, dir, width, height);
    if (thresholdMode === "percentile") {
      const hp = Math.min(100, Math.max(0, options.highPercentile ?? 88));
      const lp = Math.min(100, Math.max(0, options.lowPercentile ?? 65));
      let hi = magnitudePercentile(suppressed, hp);
      let lo = magnitudePercentile(suppressed, lp);
      if (lo >= hi) {
        lo = hi * 0.4;
      }
      if (hi < 1e-9) {
        hi = 1;
        lo = 0.3;
      }
      low = lo;
      high = hi;
    } else if (high >= 240) {
      high = Math.max(low * 2, 100);
    }
    return hysteresis(suppressed, width, height, low, high);
  }
  function gradientMagnitudeRgba(gray, options = {}) {
    const low = options.low ?? 50;
    const highOrig = options.high ?? 150;
    const thresholdMode = options.thresholdMode === "percentile" ? "percentile" : "absolute";
    const { data, width, height } = gray;
    const passes = resolveBlurPasses(options, low, highOrig, thresholdMode);
    let blurred = gaussianBlur5(data, width, height);
    for (let p = 1; p < passes; p++) {
      blurred = gaussianBlur5(blurred, width, height);
    }
    const { mag } = sobel(blurred, width, height);
    let mx = 0;
    for (let i = 0; i < mag.length; i++) {
      if (mag[i] > mx) mx = mag[i];
    }
    const scale = mx > 0 ? 255 / mx : 1;
    const rgba = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      const g = Math.min(255, Math.round(mag[i] * scale));
      const o = i * 4;
      rgba[o] = g;
      rgba[o + 1] = g;
      rgba[o + 2] = g;
      rgba[o + 3] = 255;
    }
    return { data: rgba, width, height };
  }

  // src/image-to-path/points.js
  function thinEdges(edges, width, height) {
    const out = new Uint8ClampedArray(edges.length);
    for (let i = 0; i < edges.length; i++) {
      out[i] = edges[i] > 0 ? 255 : 0;
    }
    const get = (arr, x, y) => y >= 0 && y < height && x >= 0 && x < width && arr[y * width + x] > 0 ? 1 : 0;
    let changed = true;
    while (changed) {
      changed = false;
      for (const pass of [1, 2]) {
        const toRemove = [];
        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            if (get(out, x, y) === 0) continue;
            const p2 = get(out, x, y - 1), p3 = get(out, x + 1, y - 1), p4 = get(out, x + 1, y);
            const p5 = get(out, x + 1, y + 1), p6 = get(out, x, y + 1), p7 = get(out, x - 1, y + 1);
            const p8 = get(out, x - 1, y), p9 = get(out, x - 1, y - 1);
            const B = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
            if (B < 2 || B > 6) continue;
            const seq = [p2, p3, p4, p5, p6, p7, p8, p9];
            let A = 0;
            for (let s = 0; s < 8; s++) {
              if (seq[s] === 0 && seq[(s + 1) % 8] === 1) A++;
            }
            if (A !== 1) continue;
            if (pass === 1) {
              if (p2 * p4 * p6 !== 0 || p4 * p6 * p8 !== 0) continue;
            } else {
              if (p2 * p4 * p8 !== 0 || p2 * p6 * p8 !== 0) continue;
            }
            toRemove.push(y * width + x);
          }
        }
        for (const i of toRemove) {
          out[i] = 0;
          changed = true;
        }
      }
    }
    return out;
  }
  function edgePoints(edges, width, height) {
    const points = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (edges[y * width + x] > 0) points.push([x, y]);
      }
    }
    return points;
  }
  function samplePoints(points, maxPoints) {
    const n = points.length;
    if (n <= maxPoints) return points;
    const result = [];
    for (let i = 0; i < maxPoints; i++) {
      const idx = Math.round(i / (maxPoints - 1) * (n - 1));
      result.push(points[idx]);
    }
    return result;
  }

  // src/image-to-path/centerline.js
  function centerlineFromGray(gray, options = {}) {
    const inkThreshold = options.inkThreshold ?? 200;
    const { data, width, height } = gray;
    const binary = new Uint8ClampedArray(width * height);
    for (let i = 0; i < width * height; i++) {
      binary[i] = data[i] < inkThreshold ? 255 : 0;
    }
    return thinEdges(binary, width, height);
  }

  // src/image-to-path/pipeline-utils.js
  function assertEdgesOverride(override, width, height) {
    if (!(override instanceof Uint8ClampedArray) || override.length !== width * height) {
      throw new Error("edgesOverride must be a Uint8ClampedArray of length width * height");
    }
  }

  // src/image-to-path/tsp.js
  var TSP_DISTANCE_MATRIX_MAX_POINTS = 2500;
  function distanceMatrix(points) {
    const n = points.length;
    if (n > TSP_DISTANCE_MATRIX_MAX_POINTS) {
      throw new Error(
        "distanceMatrix: too many points (" + n + "), max " + TSP_DISTANCE_MATRIX_MAX_POINTS + " (reduce maxPoints or subsample before TSP)"
      );
    }
    const D = Array.from({ length: n }, () => new Array(n));
    for (let i = 0; i < n; i++) {
      D[i][i] = 0;
      for (let j = i + 1; j < n; j++) {
        const dx = points[i][0] - points[j][0];
        const dy = points[i][1] - points[j][1];
        const d = Math.sqrt(dx * dx + dy * dy);
        D[i][j] = d;
        D[j][i] = d;
      }
    }
    return D;
  }
  function nearestNeighbourOrder(D, start = 0) {
    const n = D.length;
    if (n <= 1) return Array.from({ length: n }, (_, i) => i);
    const order = [start];
    const remaining = new Set(Array.from({ length: n }, (_, i) => i));
    remaining.delete(start);
    while (remaining.size > 0) {
      const last = order[order.length - 1];
      let best = -1;
      let bestDist = Infinity;
      for (const i of remaining) {
        if (D[last][i] < bestDist) {
          bestDist = D[last][i];
          best = i;
        }
      }
      order.push(best);
      remaining.delete(best);
    }
    return order;
  }
  function nearestNeighbourOrderFromPoints(points, start = 0) {
    const n = points.length;
    if (n <= 1) return Array.from({ length: n }, (_, i) => i);
    const order = [start];
    const remaining = new Set(Array.from({ length: n }, (_, i) => i));
    remaining.delete(start);
    while (remaining.size > 0) {
      const last = order[order.length - 1];
      const pl = points[last];
      let best = -1;
      let bestDistSq = Infinity;
      for (const i of remaining) {
        const dx = pl[0] - points[i][0];
        const dy = pl[1] - points[i][1];
        const dSq = dx * dx + dy * dy;
        if (dSq < bestDistSq) {
          bestDistSq = dSq;
          best = i;
        }
      }
      order.push(best);
      remaining.delete(best);
    }
    return order;
  }
  function convexHullGraham(points) {
    const n = points.length;
    if (n <= 2) return Array.from({ length: n }, (_, i) => i);
    let minY = points[0][1];
    let pivot = 0;
    for (let i = 1; i < n; i++) {
      const y = points[i][1];
      if (y < minY || y === minY && points[i][0] < points[pivot][0]) {
        minY = y;
        pivot = i;
      }
    }
    const px = points[pivot][0];
    const py = points[pivot][1];
    const rest = [];
    for (let i = 0; i < n; i++) {
      if (i !== pivot) rest.push(i);
    }
    rest.sort((a, b) => {
      const aa = Math.atan2(points[a][1] - py, points[a][0] - px);
      const bb = Math.atan2(points[b][1] - py, points[b][0] - px);
      return aa - bb;
    });
    const hull = [pivot];
    for (const idx of rest) {
      while (hull.length >= 2) {
        const a = points[hull[hull.length - 2]];
        const b = points[hull[hull.length - 1]];
        const c = points[idx];
        const cross = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
        if (cross <= 0) hull.pop();
        else break;
      }
      hull.push(idx);
    }
    return hull;
  }
  function convexHullInsertionOrder(D, points) {
    const n = D.length;
    if (n <= 2) return Array.from({ length: n }, (_, i) => i);
    const hullIdx = convexHullGraham(points);
    const order = [...hullIdx];
    const remaining = new Set(Array.from({ length: n }, (_, i) => i));
    for (const i of hullIdx) remaining.delete(i);
    while (remaining.size > 0) {
      let bestInc = Infinity;
      let bestK = -1;
      let bestPos = -1;
      for (const k of remaining) {
        for (let pos = 0; pos < order.length; pos++) {
          const i = order[pos];
          const j = order[(pos + 1) % order.length];
          const inc = D[i][k] + D[k][j] - D[i][j];
          if (inc < bestInc) {
            bestInc = inc;
            bestK = k;
            bestPos = pos;
          }
        }
      }
      if (bestK < 0) break;
      order.splice(bestPos + 1, 0, bestK);
      remaining.delete(bestK);
    }
    return order;
  }
  function closedPathLengthFromMatrix(D, order) {
    if (order.length < 2) return 0;
    let sum = 0;
    for (let t = 0; t < order.length; t++) {
      sum += D[order[t]][order[(t + 1) % order.length]];
    }
    return sum;
  }
  function twoOpt(D, order, options = {}) {
    const maxSteps = options.maxSteps ?? 0;
    const progressEvery = options.progressEvery ?? 0;
    const onProgress = options.onProgress;
    const n = order.length;
    if (n < 4) return { order: [...order], steps: 0 };
    const current = [...order];
    let step = 0;
    let improved = true;
    if (onProgress && progressEvery > 0) {
      onProgress({ order: [...current], step: 0 });
    }
    while (improved) {
      if (maxSteps > 0 && step >= maxSteps) break;
      improved = false;
      for (let i = 0; i < n; i++) {
        for (let j = i + 2; j < n; j++) {
          if (i === 0 && j === n - 1) continue;
          const a = current[i];
          const b = current[(i + 1) % n];
          const c = current[j];
          const d = current[(j + 1) % n];
          const before = D[a][b] + D[c][d];
          const after = D[a][c] + D[b][d];
          if (after < before) {
            const seg = current.slice(i + 1, j + 1).reverse();
            for (let k = 0; k < seg.length; k++) current[i + 1 + k] = seg[k];
            improved = true;
            step++;
            if (onProgress && progressEvery > 0 && step % progressEvery === 0) {
              onProgress({ order: [...current], step });
            }
            break;
          }
        }
        if (improved) break;
      }
    }
    if (onProgress && progressEvery > 0 && step > 0 && step % progressEvery !== 0) {
      onProgress({ order: [...current], step });
    }
    return { order: current, steps: step };
  }
  function orderToPath(points, order, close = true) {
    const path = order.map((i) => points[i]);
    if (close && path.length > 1) path.push(path[0]);
    return path;
  }

  // src/image-to-path/minHeap.js
  var MinHeapF = class {
    constructor() {
      this.a = [];
    }
    /**
     * @param {{ x: number, y: number, f: number, g: number }} n
     */
    push(n) {
      const a = this.a;
      a.push(n);
      let i = a.length - 1;
      while (i > 0) {
        const p = i - 1 >> 1;
        if (a[p].f <= a[i].f) break;
        const t = a[p];
        a[p] = a[i];
        a[i] = t;
        i = p;
      }
    }
    /**
     * @returns {{ x: number, y: number, f: number, g: number }|undefined}
     */
    pop() {
      const a = this.a;
      if (a.length === 0) return void 0;
      const top = a[0];
      const last = a.pop();
      if (a.length === 0) return top;
      a[0] = last;
      let i = 0;
      for (; ; ) {
        const l = i * 2 + 1;
        const r = l + 1;
        let smallest = i;
        if (l < a.length && a[l].f < a[smallest].f) smallest = l;
        if (r < a.length && a[r].f < a[smallest].f) smallest = r;
        if (smallest === i) break;
        const t = a[i];
        a[i] = a[smallest];
        a[smallest] = t;
        i = smallest;
      }
      return top;
    }
    get length() {
      return this.a.length;
    }
  };

  // src/image-to-path/strokeTrace.js
  var DEFAULT_MAX_BRIDGE_EXPANSIONS = 75e4;
  var MAX_CHAINS_FOR_TWO_OPT = 400;
  var DX = [-1, 0, 1, -1, 1, -1, 0, 1];
  var DY = [-1, -1, -1, 0, 0, 1, 1, 1];
  function fromIdx(i, w) {
    return { x: i % w, y: i / w | 0 };
  }
  function neighbors8(i, w, h, mask) {
    const { x, y } = fromIdx(i, w);
    const out = [];
    for (let k = 0; k < 8; k++) {
      const nx = x + DX[k];
      const ny = y + DY[k];
      if (nx >= 0 && nx < w && ny >= 0 && ny < h && mask[ny * w + nx] > 0) {
        out.push(ny * w + nx);
      }
    }
    return out;
  }
  function edgeKey(i, j) {
    return i < j ? `${i}_${j}` : `${j}_${i}`;
  }
  function degree8(i, w, h, mask) {
    return neighbors8(i, w, h, mask).length;
  }
  function pickNextDegree2(prev, cur, w, h, mask) {
    if (degree8(cur, w, h, mask) !== 2) return -1;
    const nbList = neighbors8(cur, w, h, mask);
    for (const nb of nbList) {
      if (nb !== prev) return nb;
    }
    return -1;
  }
  function chainArcLength(chain) {
    if (chain.length < 2) return 0;
    let L = 0;
    for (let i = 1; i < chain.length; i++) {
      const dx = chain[i][0] - chain[i - 1][0];
      const dy = chain[i][1] - chain[i - 1][1];
      L += Math.hypot(dx, dy);
    }
    return L;
  }
  function chainCentroid(chain) {
    let sx = 0;
    let sy = 0;
    for (let i = 0; i < chain.length; i++) {
      sx += chain[i][0];
      sy += chain[i][1];
    }
    const n = chain.length;
    return [sx / n, sy / n];
  }
  function bridgeAlongBackground(mask, w, h, ax, ay, bx, by, maxSteps) {
    const sx = Math.max(0, Math.min(w - 1, Math.round(ax)));
    const sy = Math.max(0, Math.min(h - 1, Math.round(ay)));
    const gx = Math.max(0, Math.min(w - 1, Math.round(bx)));
    const gy = Math.max(0, Math.min(h - 1, Math.round(by)));
    if (sx === gx && sy === gy) return [];
    function walkable(x, y) {
      if (x < 0 || x >= w || y < 0 || y >= h) return false;
      if (x === sx && y === sy) return true;
      if (x === gx && y === gy) return true;
      return mask[y * w + x] === 0;
    }
    const startKey = sy * w + sx;
    const cameFrom = /* @__PURE__ */ new Map();
    const gScore = /* @__PURE__ */ new Map();
    const open = new MinHeapF();
    function heur(x, y) {
      return Math.hypot(gx - x, gy - y);
    }
    gScore.set(startKey, 0);
    open.push({ x: sx, y: sy, f: heur(sx, sy), g: 0 });
    let expanded = 0;
    while (open.length > 0 && expanded < maxSteps) {
      const cur = open.pop();
      if (!cur) break;
      const { x, y, g } = cur;
      const ckey = y * w + x;
      const knownG = gScore.get(ckey);
      if (knownG !== void 0 && g > knownG + 1e-9) continue;
      expanded++;
      if (x === gx && y === gy) {
        const pathIdx = [];
        let k = ckey;
        while (k !== void 0) {
          pathIdx.push(k);
          if (k === startKey) break;
          k = cameFrom.get(k);
        }
        pathIdx.reverse();
        const out = pathIdx.map((idx) => {
          const p = fromIdx(idx, w);
          return [p.x, p.y];
        });
        if (out.length >= 2) return out.slice(1, -1);
        return [];
      }
      for (let di = 0; di < 8; di++) {
        const nx = x + DX[di];
        const ny = y + DY[di];
        if (!walkable(nx, ny)) continue;
        const stepCost = di < 4 ? 1 : Math.SQRT2;
        const tentativeG = g + stepCost;
        const nkey = ny * w + nx;
        const prevG = gScore.get(nkey);
        if (prevG !== void 0 && tentativeG >= prevG) continue;
        cameFrom.set(nkey, ckey);
        gScore.set(nkey, tentativeG);
        open.push({ x: nx, y: ny, g: tentativeG, f: tentativeG + heur(nx, ny) });
      }
    }
    return null;
  }
  function bridgeAlongInk(mask, w, h, ax, ay, bx, by, maxSteps) {
    const sx = Math.max(0, Math.min(w - 1, Math.round(ax)));
    const sy = Math.max(0, Math.min(h - 1, Math.round(ay)));
    const gx = Math.max(0, Math.min(w - 1, Math.round(bx)));
    const gy = Math.max(0, Math.min(h - 1, Math.round(by)));
    if (sx === gx && sy === gy) return [];
    const sKey = sy * w + sx;
    const gKey = gy * w + gx;
    if (mask[sKey] === 0 || mask[gKey] === 0) return null;
    const cameFrom = /* @__PURE__ */ new Map();
    const queue = [];
    let qi = 0;
    queue.push(sKey);
    const visited = new Uint8Array(w * h);
    visited[sKey] = 1;
    let expanded = 0;
    while (qi < queue.length && expanded < maxSteps) {
      const ckey = queue[qi++];
      expanded++;
      if (ckey === gKey) {
        const pathIdx = [];
        let k = ckey;
        while (k !== void 0) {
          pathIdx.push(k);
          if (k === sKey) break;
          k = cameFrom.get(k);
        }
        pathIdx.reverse();
        const out = pathIdx.map((idx) => {
          const p = fromIdx(idx, w);
          return [p.x, p.y];
        });
        if (out.length >= 2) return out.slice(1, -1);
        return [];
      }
      const { x, y } = fromIdx(ckey, w);
      for (let di = 0; di < 8; di++) {
        const nx = x + DX[di];
        const ny = y + DY[di];
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
        const nkey = ny * w + nx;
        if (visited[nkey]) continue;
        if (mask[nkey] === 0) continue;
        visited[nkey] = 1;
        cameFrom.set(nkey, ckey);
        queue.push(nkey);
      }
    }
    return null;
  }
  function makeBridge(a, b, width, height, mask, opts) {
    const bridgeMode = opts.bridgeMode ?? "avoidInk";
    const maxBridgeSteps = opts.maxBridgeSteps ?? Math.min(width * height * 4, DEFAULT_MAX_BRIDGE_EXPANSIONS);
    if (bridgeMode === "straight") {
      return bridgeSegment(a, b, width, height);
    }
    const alongInk = bridgeAlongInk(mask, width, height, a[0], a[1], b[0], b[1], maxBridgeSteps);
    if (alongInk != null) {
      return alongInk;
    }
    const avoid = bridgeAlongBackground(mask, width, height, a[0], a[1], b[0], b[1], maxBridgeSteps);
    if (avoid != null) {
      return avoid;
    }
    return bridgeSegment(a, b, width, height);
  }
  function orderChainsAndBridge(chains, width, height, mask, options = {}) {
    const valid = chains.filter((c) => c && c.length > 0);
    if (valid.length === 0) return [];
    if (valid.length === 1) return valid[0];
    const sorted = valid.slice().sort((a, b) => chainArcLength(b) - chainArcLength(a));
    const m = sorted.length;
    const centroids = sorted.map(chainCentroid);
    let perm;
    if (m > TSP_DISTANCE_MATRIX_MAX_POINTS) {
      perm = nearestNeighbourOrderFromPoints(centroids, 0);
    } else {
      const D = distanceMatrix(centroids);
      perm = nearestNeighbourOrder(D, 0);
      if (m >= 4 && m <= MAX_CHAINS_FOR_TWO_OPT) {
        const { order: improved } = twoOpt(D, perm, { maxSteps: 5e3 });
        perm = improved;
      }
    }
    const pos = perm.indexOf(0);
    if (pos > 0) {
      perm = perm.slice(pos).concat(perm.slice(0, pos));
    }
    const ordered = [];
    let currentEnd = null;
    const bridgeOpts = { bridgeMode: options.bridgeMode, maxBridgeSteps: options.maxBridgeSteps };
    for (let t = 0; t < perm.length; t++) {
      let ch = sorted[perm[t]].map((p) => [p[0], p[1]]);
      if (t === 0) {
        ordered.push(ch);
        currentEnd = ch[ch.length - 1];
        continue;
      }
      const d0 = Math.hypot(currentEnd[0] - ch[0][0], currentEnd[1] - ch[0][1]);
      const d1 = Math.hypot(currentEnd[0] - ch[ch.length - 1][0], currentEnd[1] - ch[ch.length - 1][1]);
      if (d1 < d0) ch.reverse();
      const br = makeBridge(currentEnd, ch[0], width, height, mask, bridgeOpts);
      ordered.push(br);
      ordered.push(ch);
      currentEnd = ch[ch.length - 1];
    }
    const flat = [];
    for (const part of ordered) {
      for (const p of part) flat.push(p);
    }
    return flat;
  }
  function bridgeSegment(a, b, width, height) {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const d = Math.hypot(dx, dy);
    if (d < 1e-9) return [];
    const maxSeg = 24;
    const n = Math.min(maxSeg, Math.max(2, Math.ceil(d / 4)));
    const out = [];
    for (let i = 1; i < n; i++) {
      const t = i / n;
      out.push([a[0] + dx * t, a[1] + dy * t]);
    }
    return out;
  }
  function resamplePathByArcLength(path, maxPoints) {
    if (!path || path.length === 0) return [];
    if (path.length === 1 || maxPoints < 2) return path;
    if (path.length <= maxPoints) return path;
    const segLen = [];
    let total = 0;
    for (let i = 1; i < path.length; i++) {
      const dx = path[i][0] - path[i - 1][0];
      const dy = path[i][1] - path[i - 1][1];
      segLen.push(Math.hypot(dx, dy));
      total += segLen[segLen.length - 1];
    }
    if (total < 1e-12) return [[path[0][0], path[0][1]]];
    const result = [];
    for (let k = 0; k < maxPoints; k++) {
      const target = k / (maxPoints - 1) * total;
      if (k === 0) {
        result.push([path[0][0], path[0][1]]);
        continue;
      }
      if (k === maxPoints - 1) {
        result.push([path[path.length - 1][0], path[path.length - 1][1]]);
        continue;
      }
      let acc = 0;
      for (let i = 0; i < segLen.length; i++) {
        if (acc + segLen[i] >= target) {
          const t = segLen[i] < 1e-12 ? 0 : (target - acc) / segLen[i];
          const x = path[i][0] + t * (path[i + 1][0] - path[i][0]);
          const y = path[i][1] + t * (path[i + 1][1] - path[i][1]);
          result.push([x, y]);
          break;
        }
        acc += segLen[i];
      }
    }
    return result;
  }
  function walkChainFrom(s, n, w, h, mask, edgeVisited, maxSteps) {
    const ek = edgeKey(s, n);
    if (edgeVisited.has(ek)) return null;
    const { x: sx, y: sy } = fromIdx(s, w);
    const path = [[sx, sy]];
    const start = s;
    let prev = s;
    let cur = n;
    let steps = 0;
    while (steps++ < maxSteps) {
      edgeVisited.add(edgeKey(prev, cur));
      if (cur === start && path.length > 1) break;
      const { x: cx, y: cy } = fromIdx(cur, w);
      path.push([cx, cy]);
      const next = pickNextDegree2(prev, cur, w, h, mask);
      if (next < 0) break;
      prev = cur;
      cur = next;
    }
    return path;
  }
  function extractCycle(startIdx, w, h, mask, edgeVisited, maxSteps) {
    const { x: x0, y: y0 } = fromIdx(startIdx, w);
    const nbs = neighbors8(startIdx, w, h, mask);
    if (nbs.length === 0) return [[x0, y0]];
    let n1 = nbs[0];
    for (const nb of nbs) {
      if (!edgeVisited.has(edgeKey(startIdx, nb))) {
        n1 = nb;
        break;
      }
    }
    const path = [[x0, y0]];
    let prev = startIdx;
    let cur = n1;
    let steps = 0;
    while (steps++ < maxSteps) {
      edgeVisited.add(edgeKey(prev, cur));
      if (cur === startIdx && path.length > 1) break;
      const { x: cx, y: cy } = fromIdx(cur, w);
      path.push([cx, cy]);
      const next = pickNextDegree2(prev, cur, w, h, mask);
      if (next < 0) break;
      prev = cur;
      cur = next;
    }
    return path;
  }
  function chainsFromComponent(comp, w, h, mask) {
    const edgeVisited = /* @__PURE__ */ new Set();
    const chains = [];
    const maxSteps = comp.size * 8 + 64;
    const compArr = Array.from(comp);
    if (comp.size === 1) {
      const i = compArr[0];
      const { x, y } = fromIdx(i, w);
      return [[[x, y]]];
    }
    const special = [];
    for (const i of comp) {
      const d = degree8(i, w, h, mask);
      if (d !== 2) special.push(i);
    }
    if (special.length === 0) {
      const start = compArr.reduce((a, b) => a < b ? a : b);
      chains.push(extractCycle(start, w, h, mask, edgeVisited, maxSteps));
      return chains;
    }
    for (const s of special) {
      for (const nb of neighbors8(s, w, h, mask)) {
        if (!comp.has(nb)) continue;
        if (edgeVisited.has(edgeKey(s, nb))) continue;
        const ch = walkChainFrom(s, nb, w, h, mask, edgeVisited, maxSteps);
        if (ch && ch.length > 0) chains.push(ch);
      }
    }
    for (const i of comp) {
      for (const nb of neighbors8(i, w, h, mask)) {
        if (nb < i || !comp.has(nb)) continue;
        if (edgeVisited.has(edgeKey(i, nb))) continue;
        const d1 = degree8(i, w, h, mask);
        const d2 = degree8(nb, w, h, mask);
        if (d1 === 2 && d2 === 2) {
          chains.push(extractCycle(i, w, h, mask, edgeVisited, maxSteps));
        } else {
          const ch = walkChainFrom(i, nb, w, h, mask, edgeVisited, maxSteps);
          if (ch && ch.length > 0) chains.push(ch);
        }
      }
    }
    return chains;
  }
  function connectedComponents(mask, w, h) {
    const seen = new Uint8Array(w * h);
    const components = [];
    for (let i = 0; i < w * h; i++) {
      if (mask[i] === 0 || seen[i]) continue;
      const comp = /* @__PURE__ */ new Set();
      const stack = [i];
      seen[i] = 1;
      while (stack.length > 0) {
        const cur = stack.pop();
        comp.add(cur);
        for (const nb of neighbors8(cur, w, h, mask)) {
          if (!seen[nb]) {
            seen[nb] = 1;
            stack.push(nb);
          }
        }
      }
      components.push(comp);
    }
    return components;
  }
  function pathFromThinMask(mask, width, height, maxPoints, options = {}) {
    const w = width;
    const h = height;
    const comps = connectedComponents(mask, w, h);
    const allChains = [];
    for (const comp of comps) {
      const chs = chainsFromComponent(comp, w, h, mask);
      for (const c of chs) {
        if (c && c.length > 0) allChains.push(c);
      }
    }
    if (allChains.length === 0) return [];
    const merged = orderChainsAndBridge(allChains, w, h, mask, options);
    const cap = maxPoints ?? 1500;
    return resamplePathByArcLength(merged, cap);
  }

  // src/image-to-path/pipeline.js
  function normalizePath(path, width, height) {
    return path.map(([x, y]) => [x / width, y / height]);
  }
  function emitProgress(onProgress, payload) {
    if (typeof onProgress === "function") onProgress(payload);
  }
  var PREVIEW_THROTTLE_MS = 220;
  var TWO_OPT_PROGRESS_EVERY = 55;
  function normalizePipelineOptions(options) {
    if (options == null || typeof options !== "object") return {};
    const out = { ...options };
    if (out.edgesOverride != null) {
      out.useCenterline = false;
    }
    return out;
  }
  function runDensityPipeline(gray, options) {
    const maxPoints = options.maxPoints ?? 1500;
    const thresholdLow = options.thresholdLow ?? 50;
    const thresholdHigh = options.thresholdHigh ?? 150;
    const doThinEdges = options.thinEdges === true;
    const useCenterline = options.useCenterline === true;
    const inkThreshold = options.inkThreshold ?? 200;
    const onProgress = options.onProgress;
    const previewThrottleMs = PREVIEW_THROTTLE_MS;
    const twoOptProgressEvery = TWO_OPT_PROGRESS_EVERY;
    const { width, height } = gray;
    const override = options.edgesOverride;
    emitProgress(onProgress, {
      message: useCenterline ? "Extracting centerline (skeleton)\u2026" : "Detecting edges\u2026"
    });
    let edges;
    if (override != null) {
      assertEdgesOverride(override, width, height);
      edges = new Uint8ClampedArray(override);
    } else if (useCenterline) {
      edges = centerlineFromGray(gray, { inkThreshold });
    } else {
      edges = canny(gray, { low: thresholdLow, high: thresholdHigh });
      if (doThinEdges) edges = thinEdges(edges, width, height);
    }
    emitProgress(onProgress, { message: "Extracting contour points\u2026" });
    let points = edgePoints(edges, width, height);
    if (points.length === 0) throw new Error("No edge points found. Try different threshold.");
    points = samplePoints(points, maxPoints);
    if (points.length < 2) throw new Error("Too few points after sampling.");
    emitProgress(onProgress, { message: "Sampling done (" + points.length + " pts)" });
    let tspPoints = points;
    if (tspPoints.length > TSP_DISTANCE_MATRIX_MAX_POINTS) {
      tspPoints = samplePoints(points, TSP_DISTANCE_MATRIX_MAX_POINTS);
      emitProgress(onProgress, {
        message: "TSP: using " + TSP_DISTANCE_MATRIX_MAX_POINTS + " points (cap; had " + points.length + " sampled) to avoid out-of-memory\u2026"
      });
    }
    emitProgress(onProgress, { message: "Computing distance matrix\u2026" });
    const D = distanceMatrix(tspPoints);
    const n = tspPoints.length;
    const runs = [];
    runs.push(nearestNeighbourOrder(D, 0));
    if (n > 3) {
      runs.push(nearestNeighbourOrder(D, Math.max(0, Math.floor(n / 3))));
      runs.push(nearestNeighbourOrder(D, Math.max(0, Math.floor(2 * n / 3))));
      runs.push(convexHullInsertionOrder(D, tspPoints));
    }
    let lastPreviewAt = 0;
    const previewNow = typeof performance !== "undefined" && performance.now ? () => performance.now() : () => Date.now();
    const emitPreviewFromOrder = (order, message) => {
      if (!onProgress) return;
      const t = previewNow();
      if (t - lastPreviewAt < previewThrottleMs) return;
      lastPreviewAt = t;
      const pathRaw = orderToPath(tspPoints, order, true);
      const pathNorm2 = normalizePath(pathRaw, width, height);
      emitProgress(onProgress, {
        message: message || "Updating route\u2026",
        preview: { path: pathNorm2, width, height }
      });
    };
    emitPreviewFromOrder(runs[0], "Initial route (nearest neighbor)");
    let bestOrder = runs[0];
    let bestScore = closedPathLengthFromMatrix(D, bestOrder);
    const twoOptBase = {};
    const twoOptOpts = onProgress ? {
      ...twoOptBase,
      progressEvery: twoOptProgressEvery,
      onProgress: ({ order }) => emitPreviewFromOrder(order, "2-opt optimization\u2026")
    } : twoOptBase;
    let runIdx = 0;
    for (const order of runs) {
      runIdx++;
      if (onProgress && runs.length > 1) {
        emitProgress(onProgress, { message: "2-opt trial " + runIdx + " / " + runs.length });
      }
      const { order: improved } = twoOpt(D, order, twoOptOpts);
      const score = closedPathLengthFromMatrix(D, improved);
      if (score < bestScore) {
        bestScore = score;
        bestOrder = improved;
      }
    }
    if (onProgress) {
      lastPreviewAt = 0;
      const pathFinal = orderToPath(tspPoints, bestOrder, true);
      const pathNormFinal = normalizePath(pathFinal, width, height);
      emitProgress(onProgress, {
        message: "Final route",
        preview: { path: pathNormFinal, width, height }
      });
    }
    let pathPix = orderToPath(tspPoints, bestOrder, true);
    if (pathPix.length > maxPoints) {
      pathPix = resamplePathByArcLength(pathPix, maxPoints);
    }
    const pathNorm = normalizePath(pathPix, width, height);
    return { path: pathNorm, width, height };
  }
  function runStrokeTracePipeline(gray, options) {
    const maxPoints = options.maxPoints ?? 1500;
    const inkThreshold = options.inkThreshold ?? 200;
    const onProgress = options.onProgress;
    const { width, height } = gray;
    const override = options.edgesOverride;
    emitProgress(onProgress, { message: "Building thin-line mask\u2026" });
    let mask;
    if (override != null) {
      assertEdgesOverride(override, width, height);
      mask = new Uint8ClampedArray(override);
    } else {
      mask = centerlineFromGray(gray, { inkThreshold });
    }
    emitProgress(onProgress, { message: "Tracing along graph\u2026" });
    const pathPix = pathFromThinMask(mask, width, height, maxPoints, {
      bridgeMode: options.bridgeMode,
      maxBridgeSteps: options.maxBridgeSteps
    });
    if (!pathPix || pathPix.length < 2) {
      throw new Error("Stroke too short. Adjust inkThreshold or the image.");
    }
    const pathNorm = normalizePath(pathPix, width, height);
    if (onProgress) {
      emitProgress(onProgress, {
        message: "Trace complete",
        preview: { path: pathNorm, width, height }
      });
    }
    return { path: pathNorm, width, height };
  }
  function runPipeline(gray, options = {}) {
    const opts = normalizePipelineOptions(options);
    const routeMode = opts.routeMode ?? "density";
    if (routeMode === "contour") {
      throw new Error('routeMode "contour" (filled silhouette) was removed. Use strokeTrace for line art or density for photos.');
    }
    if (routeMode === "strokeTrace") return runStrokeTracePipeline(gray, opts);
    return runDensityPipeline(gray, opts);
  }
  function edgesFromGray(gray, options = {}) {
    const opts = normalizePipelineOptions(options);
    const routeMode = opts.routeMode ?? "density";
    const { width, height } = gray;
    if (routeMode === "contour") {
      throw new Error('routeMode "contour" (filled silhouette) was removed. Use strokeTrace for line art or density for photos.');
    }
    if (routeMode === "strokeTrace") {
      if (opts.edgesOverride != null) {
        assertEdgesOverride(opts.edgesOverride, width, height);
        return new Uint8ClampedArray(opts.edgesOverride);
      }
      return centerlineFromGray(gray, { inkThreshold: opts.inkThreshold });
    }
    if (opts.edgesOverride != null) {
      assertEdgesOverride(opts.edgesOverride, width, height);
      return new Uint8ClampedArray(opts.edgesOverride);
    }
    const useCenterline = opts.useCenterline === true;
    if (useCenterline) {
      return centerlineFromGray(gray, { inkThreshold: opts.inkThreshold });
    }
    const thresholdLow = opts.thresholdLow ?? 50;
    const thresholdHigh = opts.thresholdHigh ?? 150;
    const doThinEdges = opts.thinEdges === true;
    let edges = canny(gray, { low: thresholdLow, high: thresholdHigh });
    if (doThinEdges) edges = thinEdges(edges, width, height);
    return edges;
  }

  // src/image-to-path/metrics.js
  function ccw(a, b, c) {
    return (c[1] - a[1]) * (b[0] - a[0]) > (b[1] - a[1]) * (c[0] - a[0]);
  }
  function segIntersects(a, b, c, d) {
    return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
  }
  function computePathMetrics(path) {
    if (!Array.isArray(path) || path.length < 2) {
      return { points: Array.isArray(path) ? path.length : 0, length: 0, selfIntersections: 0 };
    }
    let length = 0;
    for (let i = 1; i < path.length; i++) {
      const dx = path[i][0] - path[i - 1][0];
      const dy = path[i][1] - path[i - 1][1];
      length += Math.sqrt(dx * dx + dy * dy);
    }
    let selfIntersections = 0;
    const n = Math.min(path.length, 600);
    for (let i = 1; i < n; i++) {
      const a = path[i - 1];
      const b = path[i];
      for (let j = i + 2; j < n; j++) {
        if (j === i + 1) continue;
        const c = path[j - 1];
        const d = path[j];
        if (segIntersects(a, b, c, d)) selfIntersections++;
      }
    }
    return { points: path.length, length, selfIntersections };
  }

  // src/image-to-path/preview.js
  function grayToRgba(gray) {
    const { data, width, height } = gray;
    const rgba = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      const g = data[i];
      const o = i * 4;
      rgba[o] = g;
      rgba[o + 1] = g;
      rgba[o + 2] = g;
      rgba[o + 3] = 255;
    }
    return { data: rgba, width, height };
  }
  function edgePreviewFromGray(gray, options = {}) {
    const thresholdLow = options.thresholdLow ?? 50;
    const thresholdHigh = options.thresholdHigh ?? 150;
    const cannyOpts = { low: thresholdLow, high: thresholdHigh };
    if (options.edgePreviewStyle === "gradient") {
      return gradientMagnitudeRgba(gray, cannyOpts);
    }
    const { width, height } = gray;
    const edges = edgesFromGray(gray, options);
    const rgba = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      const v = edges[i] > 0 ? 0 : 255;
      const o = i * 4;
      rgba[o] = v;
      rgba[o + 1] = v;
      rgba[o + 2] = v;
      rgba[o + 3] = 255;
    }
    return { data: rgba, width, height };
  }

  // src/image-to-path/index.js
  function loadOptsFromImageOptions(options) {
    return {
      maxSize: options.maxSize ?? 0
    };
  }
  function pipelineOptsFromImageOptions(options) {
    return normalizePipelineOptions({
      maxPoints: options.maxPoints,
      thresholdLow: options.thresholdLow,
      thresholdHigh: options.thresholdHigh,
      thinEdges: options.thinEdges,
      useCenterline: options.useCenterline,
      inkThreshold: options.inkThreshold,
      edgesOverride: options.edgesOverride,
      routeMode: options.routeMode,
      bridgeMode: options.bridgeMode,
      maxBridgeSteps: options.maxBridgeSteps,
      onProgress: options.onProgress
    });
  }
  function withMetrics(result) {
    return {
      ...result,
      metrics: computePathMetrics(result.path)
    };
  }
  function pathFromGray(gray, options = {}) {
    const routeMode = options.routeMode ?? "density";
    const basic = runPipeline(gray, pipelineOptsFromImageOptions(options));
    return withMetrics({ ...basic, modeUsed: routeMode });
  }
  function preprocessGrayFromFile(file, options = {}) {
    return fileToBitmap(file).then((bitmap) => {
      const gray = loadGrayImageData(bitmap, loadOptsFromImageOptions(options));
      bitmap.close();
      return gray;
    });
  }
  function preprocessGrayFromArrayBuffer(arrayBuffer, options = {}) {
    const blob = new Blob([arrayBuffer]);
    return createImageBitmap(blob).then((bitmap) => {
      const gray = loadGrayImageData(bitmap, loadOptsFromImageOptions(options));
      bitmap.close();
      return gray;
    });
  }
  function preprocessGrayFromURL(url, options = {}) {
    return urlToBitmap(url).then((bitmap) => {
      const gray = loadGrayImageData(bitmap, loadOptsFromImageOptions(options));
      bitmap.close();
      return gray;
    });
  }
  function fromFile(file, options = {}) {
    return preprocessGrayFromFile(file, options).then((gray) => pathFromGray(gray, options));
  }
  function fromURL(url, options = {}) {
    return preprocessGrayFromURL(url, options).then((gray) => pathFromGray(gray, options));
  }

  // src/path-to-fit/fitConstants.js
  var SEMICIRCLES_TO_DEG = 180 / 2 ** 31;
  var DEG_TO_SEMICIRCLES = 2 ** 31 / 180;
  var RECORD_POSITION_KEYS = ["timestamp", "position_lat", "position_long", "distance", "speed", "altitude", "enhanced_altitude"];
  var RECORD_COPY_KEYS = ["heart_rate", "cadence", "fractional_cadence", "power", "calories", "enhanced_altitude", "enhanced_speed", "grade", "gps_accuracy", "vertical_speed", "resistance", "temperature", "cycles", "total_cycles", "accumulated_power", "grit", "flow"];
  var SESSION_COPY_KEYS = ["sport", "sport_profile_name", "total_calories", "total_fat_calories", "avg_speed", "max_speed", "avg_heart_rate", "max_heart_rate", "avg_cadence", "max_cadence", "avg_power", "max_power", "total_ascent", "total_descent", "normalized_power", "training_stress_score", "intensity_factor", "total_work", "avg_altitude", "max_altitude", "min_altitude", "total_moving_time", "trigger", "num_laps"];
  var LAP_COPY_KEYS = ["sport", "total_calories", "total_fat_calories", "avg_speed", "max_speed", "avg_heart_rate", "max_heart_rate", "avg_cadence", "max_cadence", "avg_power", "max_power", "total_ascent", "total_descent", "intensity", "lap_trigger", "normalized_power", "total_work", "avg_altitude", "max_altitude", "min_altitude", "total_moving_time", "num_lengths"];
  var SESSION_SENSOR_OVERRIDE_KEYS = ["avg_heart_rate", "max_heart_rate", "total_ascent", "total_descent", "normalized_power", "training_stress_score", "intensity_factor", "total_work", "avg_altitude", "max_altitude", "min_altitude", "trigger", "num_laps"];
  var LAP_SENSOR_OVERRIDE_KEYS = ["avg_heart_rate", "max_heart_rate", "total_ascent", "total_descent", "intensity", "lap_trigger", "normalized_power", "total_work", "avg_altitude", "max_altitude", "min_altitude", "num_lengths"];

  // src/path-to-fit/fitRecords.js
  function extractPoints(fitObject) {
    const points = [];
    if (!fitObject || !fitObject.sessions) return points;
    for (const session of fitObject.sessions) {
      if (!session.laps) continue;
      for (const lap of session.laps) {
        if (!lap.records) continue;
        for (const record of lap.records) {
          const lat = record.position_lat;
          const lng = record.position_long;
          if (lat == null || lng == null) continue;
          const latDeg = typeof lat === "number" ? lat * SEMICIRCLES_TO_DEG : lat;
          const lngDeg = typeof lng === "number" ? lng * SEMICIRCLES_TO_DEG : lng;
          points.push({ lat: latDeg, lng: lngDeg });
        }
      }
    }
    return points;
  }
  function collectRecord(record, records, rawRecords, bounds) {
    const lat = record.position_lat;
    const lng = record.position_long;
    const ts = record.timestamp;
    const dist = record.distance;
    const alt = record.altitude ?? record.enhanced_altitude;
    records.push({
      timestamp: ts,
      distance: typeof dist === "number" ? dist : void 0,
      altitude: typeof alt === "number" && Number.isFinite(alt) ? alt : void 0
    });
    rawRecords.push(record);
    if (lat != null && lng != null) {
      const latDeg = typeof lat === "number" ? lat * SEMICIRCLES_TO_DEG : lat;
      const lngDeg = typeof lng === "number" ? lng * SEMICIRCLES_TO_DEG : lng;
      if (latDeg < bounds.minLat) bounds.minLat = latDeg;
      if (latDeg > bounds.maxLat) bounds.maxLat = latDeg;
      if (lngDeg < bounds.minLng) bounds.minLng = lngDeg;
      if (lngDeg > bounds.maxLng) bounds.maxLng = lngDeg;
    }
  }
  function getFITRecordsAndBounds(fitObject) {
    const records = [];
    const rawRecords = [];
    const bounds = { minLat: Infinity, maxLat: -Infinity, minLng: Infinity, maxLng: -Infinity };
    if (!fitObject) return { records, rawRecords, bounds: { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 }, totalDistanceM: 0 };
    if (fitObject.sessions) {
      for (const session of fitObject.sessions) {
        if (!session.laps) continue;
        for (const lap of session.laps) {
          if (!lap.records) continue;
          for (const record of lap.records) collectRecord(record, records, rawRecords, bounds);
        }
      }
    }
    if (records.length === 0 && Array.isArray(fitObject.records)) {
      for (const record of fitObject.records) collectRecord(record, records, rawRecords, bounds);
    }
    const totalDistanceM = records.length > 0 && records[records.length - 1].distance != null ? records[records.length - 1].distance : 0;
    if (bounds.minLat === Infinity) bounds.minLat = bounds.maxLat = 35;
    if (bounds.minLng === Infinity) bounds.minLng = bounds.maxLng = 139;
    const span = 0.01;
    if (bounds.maxLat - bounds.minLat < span) {
      bounds.minLat -= span / 2;
      bounds.maxLat += span / 2;
    }
    if (bounds.maxLng - bounds.minLng < span) {
      bounds.minLng -= span / 2;
      bounds.maxLng += span / 2;
    }
    return { records, rawRecords, bounds: { minLat: bounds.minLat, maxLat: bounds.maxLat, minLng: bounds.minLng, maxLng: bounds.maxLng }, totalDistanceM };
  }

  // src/path-to-fit/routePreview.js
  function routeToDataURL(points, opts = {}) {
    const width = opts.width ?? 800;
    const lineWidth = opts.lineWidth ?? 2;
    const padding = opts.padding ?? 20;
    if (points.length < 2) {
      throw new Error("Route points must be at least 2");
    }
    let minLat = points[0].lat;
    let maxLat = points[0].lat;
    let minLng = points[0].lng;
    let maxLng = points[0].lng;
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      if (p.lat < minLat) minLat = p.lat;
      if (p.lat > maxLat) maxLat = p.lat;
      if (p.lng < minLng) minLng = p.lng;
      if (p.lng > maxLng) maxLng = p.lng;
    }
    const spanLat = maxLat - minLat || 1e-6;
    const spanLng = maxLng - minLng || 1e-6;
    const aspect = spanLng / spanLat;
    let cw = width;
    let ch = Math.round(width / aspect);
    if (ch > width) {
      ch = width;
      cw = Math.round(width * aspect);
    }
    cw += padding * 2;
    ch += padding * 2;
    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cw, ch);
    const scaleX = (cw - padding * 2) / spanLng;
    const scaleY = (ch - padding * 2) / spanLat;
    const toX = (lng) => padding + (lng - minLng) * scaleX;
    const toY = (lat) => ch - padding - (lat - minLat) * scaleY;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(toX(points[0].lng), toY(points[0].lat));
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(toX(points[i].lng), toY(points[i].lat));
    }
    ctx.stroke();
    return canvas.toDataURL("image/png");
  }

  // src/path-to-fit/geo.js
  function haversineM(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  function pathToLatLng(path, bounds, numPoints) {
    const out = [];
    const { minLat, maxLat, minLng, maxLng } = bounds;
    const spanLat = maxLat - minLat;
    const spanLng = maxLng - minLng;
    for (let i = 0; i < numPoints; i++) {
      const t = numPoints <= 1 ? 0 : i / (numPoints - 1);
      const pathIdx = t * (path.length - 1);
      const i0 = Math.floor(pathIdx);
      const i1 = Math.min(i0 + 1, path.length - 1);
      const frac = pathIdx - i0;
      const x = path[i0][0] * (1 - frac) + path[i1][0] * frac;
      const y = path[i0][1] * (1 - frac) + path[i1][1] * frac;
      const lng = minLng + x * spanLng;
      const lat = maxLat - y * spanLat;
      out.push({ lat, lng });
    }
    return out;
  }

  // src/path-to-fit/fitWrite.js
  var import_fit_file_writer = __toESM(require_fit_encode(), 1);
  function toTimestampMs(record) {
    const t = record?.timestamp;
    if (t == null) return NaN;
    return typeof t === "number" ? t < 1e12 ? t * 1e3 : t : new Date(t).getTime();
  }
  function writeFITWithWriter(points, rawRecords, session, lap) {
    if (points.length === 0) return new Blob([], { type: "application/octet-stream" });
    const firstDate = new Date(points[0].timestamp);
    const lastDate = new Date(points[points.length - 1].timestamp);
    const totalTimerTimeSec = Math.max(0, (lastDate.getTime() - firstDate.getTime()) / 1e3);
    const distances = [0];
    const speeds = [0];
    for (let i = 1; i < points.length; i++) {
      const segM = haversineM(points[i - 1].lat, points[i - 1].lng, points[i].lat, points[i].lng);
      distances.push(distances[i - 1] + segM);
      const dtSec = (points[i].timestamp - points[i - 1].timestamp) / 1e3;
      speeds.push(dtSec > 0 ? segM / dtSec : 0);
    }
    const hasRawDistance = rawRecords && rawRecords.length === points.length && rawRecords[rawRecords.length - 1] && typeof rawRecords[rawRecords.length - 1].distance === "number" && Number.isFinite(rawRecords[rawRecords.length - 1].distance);
    const fallbackTotalDistanceM = hasRawDistance ? rawRecords[rawRecords.length - 1].distance ?? 0 : distances[points.length - 1] ?? 0;
    let fallbackMaxSpeedMps = 0;
    if (hasRawDistance && rawRecords) {
      for (let i = 0; i < rawRecords.length; i++) {
        const r = rawRecords[i];
        const s = r && typeof r.speed === "number" && Number.isFinite(r.speed) ? r.speed : r && typeof r.enhanced_speed === "number" && Number.isFinite(r.enhanced_speed) ? r.enhanced_speed : null;
        if (s != null && s >= 0 && s > fallbackMaxSpeedMps) fallbackMaxSpeedMps = s;
      }
    } else if (speeds.length > 0) {
      fallbackMaxSpeedMps = Math.max(...speeds);
    }
    const fallbackAvgSpeedMps = totalTimerTimeSec > 0 ? fallbackTotalDistanceM / totalTimerTimeSec : 0;
    const degToSemi = (deg) => Math.round(deg * DEG_TO_SEMICIRCLES);
    const firstLat = points[0].lat;
    const firstLon = points[0].lng;
    const fitWriter = new import_fit_file_writer.FitWriter();
    const start = fitWriter.time(firstDate);
    fitWriter.writeMessage("file_id", {
      type: "activity",
      manufacturer: "garmin",
      product: 0,
      serial_number: 0,
      time_created: start,
      product_name: "track-remap"
    }, null, true);
    fitWriter.writeMessage("activity", {
      total_timer_time: totalTimerTimeSec,
      num_sessions: 1,
      type: "manual",
      timestamp: start,
      local_timestamp: start - firstDate.getTimezoneOffset() * 60
    }, null, true);
    const sessionBase = {
      timestamp: start,
      start_time: start,
      total_elapsed_time: totalTimerTimeSec,
      total_timer_time: totalTimerTimeSec,
      start_position_lat: degToSemi(firstLat),
      start_position_long: degToSemi(firstLon)
    };
    const sessionFields = { ...sessionBase, sport: "cycling" };
    if (session && typeof session === "object") {
      for (const k of SESSION_COPY_KEYS) {
        if (session[k] !== void 0 && session[k] !== null) sessionFields[k] = session[k];
      }
    }
    sessionFields.sub_sport = "virtual_activity";
    if (sessionFields.total_distance == null) sessionFields.total_distance = fallbackTotalDistanceM;
    if (sessionFields.avg_speed == null) sessionFields.avg_speed = fallbackAvgSpeedMps;
    if (sessionFields.max_speed == null) sessionFields.max_speed = fallbackMaxSpeedMps;
    if (sessionFields.total_moving_time == null) sessionFields.total_moving_time = totalTimerTimeSec;
    fitWriter.writeMessage("session", sessionFields, null, true);
    const lapBase = {
      timestamp: start,
      start_time: start,
      total_elapsed_time: totalTimerTimeSec,
      total_timer_time: totalTimerTimeSec,
      start_position_lat: degToSemi(firstLat),
      start_position_long: degToSemi(firstLon),
      end_position_lat: degToSemi(points[points.length - 1].lat),
      end_position_long: degToSemi(points[points.length - 1].lng)
    };
    const lapFields = { ...lapBase, sport: "cycling" };
    if (lap && typeof lap === "object") {
      for (const k of LAP_COPY_KEYS) {
        if (lap[k] !== void 0 && lap[k] !== null) lapFields[k] = lap[k];
      }
    }
    lapFields.sub_sport = "virtual_activity";
    if (lapFields.total_distance == null) lapFields.total_distance = fallbackTotalDistanceM;
    if (lapFields.avg_speed == null) lapFields.avg_speed = fallbackAvgSpeedMps;
    if (lapFields.max_speed == null) lapFields.max_speed = fallbackMaxSpeedMps;
    if (lapFields.total_moving_time == null) lapFields.total_moving_time = totalTimerTimeSec;
    fitWriter.writeMessage("lap", lapFields, null, true);
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const date = new Date(p.timestamp);
      const timestamp = fitWriter.time(date);
      const raw = rawRecords && rawRecords[i] && typeof rawRecords[i] === "object" ? rawRecords[i] : {};
      const recordFields = {};
      for (const key of RECORD_COPY_KEYS) {
        if (RECORD_POSITION_KEYS.indexOf(key) !== -1) continue;
        const v = raw[key];
        if (v !== void 0 && v !== null && (typeof v !== "number" || Number.isFinite(v))) {
          recordFields[key] = v;
        }
      }
      if (recordFields.cadence == null && recordFields.fractional_cadence != null && Number.isFinite(recordFields.fractional_cadence)) {
        recordFields.cadence = Math.round(recordFields.fractional_cadence);
      }
      recordFields.timestamp = timestamp;
      const rawDist = raw.distance;
      const rawSpd = raw.speed != null && Number.isFinite(raw.speed) ? raw.speed : raw.enhanced_speed != null && Number.isFinite(raw.enhanced_speed) ? raw.enhanced_speed : null;
      recordFields.distance = rawDist != null && Number.isFinite(rawDist) ? rawDist : distances[i];
      delete recordFields.position_lat;
      delete recordFields.position_long;
      recordFields.position_lat = degToSemi(p.lat);
      recordFields.position_long = degToSemi(p.lng);
      if (rawSpd != null && rawSpd >= 0) {
        recordFields.speed = rawSpd;
        recordFields.enhanced_speed = rawSpd;
      } else if (speeds[i] != null && speeds[i] >= 0) {
        recordFields.speed = speeds[i];
        recordFields.enhanced_speed = speeds[i];
      }
      if (p.altitude != null && Number.isFinite(p.altitude)) recordFields.altitude = p.altitude;
      fitWriter.writeMessage("record", recordFields, null, i === points.length - 1);
    }
    const dataView = fitWriter.finish();
    const uint8 = new Uint8Array(dataView.buffer, dataView.byteOffset, dataView.byteLength);
    return new Blob([uint8], { type: "application/octet-stream" });
  }

  // src/path-to-fit/applyPath.js
  async function applyPathToFIT(imagePathResult, fitFileOrBuffer, options = {}) {
    const buffer = fitFileOrBuffer instanceof ArrayBuffer ? fitFileOrBuffer : await (fitFileOrBuffer instanceof File ? fitFileOrBuffer.arrayBuffer() : Promise.resolve(fitFileOrBuffer));
    const fitParser = new FitParser({ force: true, mode: "both" });
    const uint8 = new Uint8Array(buffer);
    const fitObject = await fitParser.parseAsync(uint8.buffer);
    const { records, rawRecords, bounds: rawBounds, totalDistanceM: originalTotalDistanceM } = getFITRecordsAndBounds(fitObject);
    const firstSession = fitObject.sessions && fitObject.sessions[0] ? fitObject.sessions[0] : null;
    const firstLap = firstSession && firstSession.laps && firstSession.laps[0] ? firstSession.laps[0] : null;
    if (records.length === 0) throw new Error("FIT file contains no records");
    const path = imagePathResult.path;
    if (!path || path.length < 2) throw new Error("No image route found. Please load an image and create a route first");
    let bounds = rawBounds;
    if (options.center && typeof options.center.lat === "number" && typeof options.center.lng === "number") {
      const spanLat2 = rawBounds.maxLat - rawBounds.minLat;
      const spanLng = rawBounds.maxLng - rawBounds.minLng;
      bounds = {
        minLat: options.center.lat - spanLat2 / 2,
        maxLat: options.center.lat + spanLat2 / 2,
        minLng: options.center.lng - spanLng / 2,
        maxLng: options.center.lng + spanLng / 2
      };
    }
    const centerLat = (bounds.minLat + bounds.maxLat) / 2;
    const spanLat = bounds.maxLat - bounds.minLat;
    const centerLng = (bounds.minLng + bounds.maxLng) / 2;
    const cosLat = Math.max(1e-6, Math.cos(centerLat * Math.PI / 180));
    const aspect = (imagePathResult.width || 1) / (imagePathResult.height || 1);
    const spanLngCorrected = spanLat * aspect / cosLat;
    bounds = {
      minLat: bounds.minLat,
      maxLat: bounds.maxLat,
      minLng: centerLng - spanLngCorrected / 2,
      maxLng: centerLng + spanLngCorrected / 2
    };
    let latLngs = pathToLatLng(path, bounds, records.length);
    if (originalTotalDistanceM > 0 && latLngs.length >= 2) {
      let pathLengthM = 0;
      for (let i = 1; i < latLngs.length; i++) {
        pathLengthM += haversineM(latLngs[i - 1].lat, latLngs[i - 1].lng, latLngs[i].lat, latLngs[i].lng);
      }
      if (pathLengthM > 0) {
        const k = originalTotalDistanceM / pathLengthM;
        const cLat = (bounds.minLat + bounds.maxLat) / 2;
        const cLng = (bounds.minLng + bounds.maxLng) / 2;
        latLngs = latLngs.map((p) => ({
          lat: cLat + (p.lat - cLat) * k,
          lng: cLng + (p.lng - cLng) * k
        }));
      }
    }
    const baseTime = records[0].timestamp != null ? typeof records[0].timestamp === "number" ? records[0].timestamp : new Date(records[0].timestamp).getTime() : Date.now();
    const interval = records.length > 1 && records[records.length - 1].timestamp != null ? ((typeof records[records.length - 1].timestamp === "number" ? records[records.length - 1].timestamp : new Date(records[records.length - 1].timestamp).getTime()) - baseTime) / (records.length - 1) : 1;
    const appliedPoints = latLngs.map((p, i) => ({
      lat: p.lat,
      lng: p.lng,
      timestamp: baseTime + i * interval,
      altitude: records[i].altitude
    }));
    const fitBlob = writeFITWithWriter(appliedPoints, rawRecords, firstSession, firstLap);
    return { appliedPoints, fitBlob };
  }

  // src/path-to-fit/mergeSensor.js
  async function mergeFITSensorData(appliedPoints, sensorFitFileOrBuffer, options = {}) {
    const isPointsArray = Array.isArray(appliedPoints) && appliedPoints.length > 0 && typeof appliedPoints[0] === "object" && typeof appliedPoints[0].lat === "number" && typeof appliedPoints[0].lng === "number";
    if (!isPointsArray) throw new Error("First argument of mergeFITSensorData must be appliedPoints from applyPathToFIT");
    const points = appliedPoints.map((p) => ({
      lat: p.lat,
      lng: p.lng,
      timestamp: typeof p.timestamp === "number" ? p.timestamp : new Date(p.timestamp).getTime(),
      altitude: p.altitude != null && Number.isFinite(p.altitude) ? p.altitude : void 0
    }));
    const sensorBuffer = sensorFitFileOrBuffer instanceof ArrayBuffer ? sensorFitFileOrBuffer : await (sensorFitFileOrBuffer instanceof Blob ? sensorFitFileOrBuffer.arrayBuffer() : sensorFitFileOrBuffer.arrayBuffer());
    const sensorObj = await new FitParser({ force: true, mode: "both" }).parseAsync(new Uint8Array(sensorBuffer).buffer);
    const sensorData = getFITRecordsAndBounds(sensorObj);
    const { rawRecords: sensorRawRecords } = sensorData;
    if (sensorRawRecords.length === 0) throw new Error("Sensor FIT file contains no records");
    const sensorFirstSession = sensorObj.sessions?.[0] ?? null;
    const sensorFirstLap = sensorFirstSession?.laps?.[0] ?? null;
    const sensorTimestampsMs = sensorRawRecords.map((r) => toTimestampMs(r));
    let routeFirstSession = null;
    let routeFirstLap = null;
    let routeRawRecords = null;
    const routeFitBlob = options.routeFitForSessionLap;
    if (routeFitBlob) {
      try {
        const routeBuf = routeFitBlob instanceof ArrayBuffer ? routeFitBlob : await (routeFitBlob instanceof Blob ? routeFitBlob.arrayBuffer() : routeFitBlob.arrayBuffer());
        const routeObj = await new FitParser({ force: true, mode: "both" }).parseAsync(new Uint8Array(routeBuf).buffer);
        routeFirstSession = routeObj.sessions?.[0] ?? null;
        routeFirstLap = routeFirstSession?.laps?.[0] ?? null;
        const routeData = getFITRecordsAndBounds(routeObj);
        if (routeData.rawRecords.length === points.length) {
          routeRawRecords = routeData.rawRecords;
        }
      } catch (_) {
      }
    }
    const mergedRawRecords = [];
    for (let i = 0; i < points.length; i++) {
      const t = points[i].timestamp;
      let best = 0;
      let bestDiff = Math.abs(sensorTimestampsMs[0] - t);
      for (let j = 1; j < sensorRawRecords.length; j++) {
        const d = Math.abs(sensorTimestampsMs[j] - t);
        if (d < bestDiff) {
          bestDiff = d;
          best = j;
        }
      }
      const sensorIdx = best;
      const sensorRecord = sensorRawRecords[sensorIdx] || {};
      const routeRecord = {};
      if (routeRawRecords && routeRawRecords[i]) {
        const rrec = routeRawRecords[i];
        for (const k of RECORD_COPY_KEYS) {
          if (RECORD_POSITION_KEYS.indexOf(k) !== -1 || k === "heart_rate") continue;
          const v = rrec[k];
          if (v !== void 0 && v !== null && (typeof v !== "number" || Number.isFinite(v))) {
            routeRecord[k] = v;
          }
        }
        if (rrec.distance !== void 0 && rrec.distance !== null && Number.isFinite(rrec.distance)) {
          routeRecord.distance = rrec.distance;
        }
        if (rrec.speed !== void 0 && rrec.speed !== null && Number.isFinite(rrec.speed)) {
          routeRecord.speed = rrec.speed;
        }
        if (rrec.enhanced_speed !== void 0 && rrec.enhanced_speed !== null && Number.isFinite(rrec.enhanced_speed)) {
          routeRecord.enhanced_speed = rrec.enhanced_speed;
        }
      }
      const hrVal = sensorRecord.heart_rate;
      if (hrVal !== void 0 && hrVal !== null && (typeof hrVal !== "number" || Number.isFinite(hrVal))) {
        routeRecord.heart_rate = hrVal;
      }
      if (!routeRawRecords || !routeRawRecords[i]) {
        for (const k of RECORD_COPY_KEYS) {
          if (RECORD_POSITION_KEYS.indexOf(k) !== -1) continue;
          const v = sensorRecord[k];
          if (v !== void 0 && v !== null && (typeof v !== "number" || Number.isFinite(v))) {
            routeRecord[k] = v;
          }
        }
      }
      mergedRawRecords.push(routeRecord);
    }
    const mergedSession = routeFirstSession && typeof routeFirstSession === "object" ? { ...routeFirstSession } : {};
    if (sensorFirstSession && typeof sensorFirstSession === "object") {
      for (const k of SESSION_SENSOR_OVERRIDE_KEYS) {
        if (sensorFirstSession[k] !== void 0 && sensorFirstSession[k] !== null) {
          mergedSession[k] = sensorFirstSession[k];
        }
      }
    }
    const mergedLap = routeFirstLap && typeof routeFirstLap === "object" ? { ...routeFirstLap } : {};
    if (sensorFirstLap && typeof sensorFirstLap === "object") {
      for (const k of LAP_SENSOR_OVERRIDE_KEYS) {
        if (sensorFirstLap[k] !== void 0 && sensorFirstLap[k] !== null) {
          mergedLap[k] = sensorFirstLap[k];
        }
      }
    }
    const fitBlob = writeFITWithWriter(points, mergedRawRecords, mergedSession, mergedLap);
    return { fitBlob, appliedPoints: points };
  }

  // src/index.js
  function fromFile2(file, options = {}) {
    return file.arrayBuffer().then((buffer) => fromArrayBuffer(buffer, options));
  }
  async function fromArrayBuffer(buffer, options = {}) {
    const fitParser = new FitParser({ force: true, mode: "cascade" });
    const uint8 = new Uint8Array(buffer);
    const fitObject = await fitParser.parseAsync(uint8.buffer);
    const points = extractPoints(fitObject);
    if (points.length < 2) {
      throw new Error("FIT file has fewer than 2 position points");
    }
    const routeOpts = {
      width: options.routeWidth ?? 800,
      lineWidth: options.routeLineWidth ?? 2,
      padding: options.routePadding ?? 20
    };
    const dataUrl = routeToDataURL(points, routeOpts);
    const pathOpts = {
      maxPoints: options.maxPoints,
      maxSize: options.maxSize,
      thresholdLow: options.thresholdLow,
      thresholdHigh: options.thresholdHigh,
      thinEdges: options.thinEdges
    };
    const result = await fromURL(dataUrl, pathOpts);
    result.points = points;
    return result;
  }
  return __toCommonJS(index_exports);
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
//# sourceMappingURL=track-remap.js.map
