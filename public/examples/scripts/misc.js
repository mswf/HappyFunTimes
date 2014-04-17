/*
 * Copyright 2014, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";

define(function() {
  /**
   * Copies properties from obj to dst recursively.
   * @param {!Object} obj Object with new settings.
   * @param {!Object} dst Object to receive new settings.
   */
  var copyProperties = function(obj, dst) {
    for (var name in obj) {
      var value = obj[name];
      if (value instanceof Array) {
        var newDst = dst[name];
        if (!newDst) {
          newDst = [];
          dst[name] = newDst;
        }
        copyProperties(value, newDst);
      } else if (typeof value == 'object') {
        var newDst = dst[name];
        if (!newDst) {
          newDst = {};
          dst[name] = newDst;
        }
        copyProperties(value, newDst);
      } else {
        dst[name] = value;
      }
    }
  };

  var applyUrlSettings = function(obj, opt_argumentName) {
    var argumentName = opt_argumentName || 'settings';
    try {
      var s = window.location.href;
      var q = s.indexOf("?");
      var e = s.indexOf("#");
      if (e < 0) {
        e = s.length;
      }
      var query = s.substring(q + 1, e);
      var pairs = query.split("&");
      for (var ii = 0; ii < pairs.length; ++ii) {
        var keyValue = pairs[ii].split("=");
        var key = keyValue[0];
        var value = decodeURIComponent(keyValue[1]);
        switch (key) {
        case argumentName:
          var settings = eval("(" + value + ")");
          copyProperties(settings, obj);
          break;
        }
      }
    } catch (e) {
      console.error(e);
      console.error("settings:", settings);
      return;
    }
  };

  var randInt = function(value) {
    return Math.floor(Math.random() * value);
  };

  var randCSSColor = function() {
    var strong = randInt(3);
    var colors = [];
    for (var ii = 0; ii < 3; ++ii) {
      colors.push(randInt(128) + (ii == strong ? 128 : 64));
    }
    return "rgb(" + colors.join(",") + ")";
  };

  var findCSSStyleRule = function(selector) {
    for (var ii = 0; ii < document.styleSheets.length; ++ii) {
      var styleSheet = document.styleSheets[ii];
      var rules = styleSheet.cssRules || styleSheet.rules;
      for (var rr = 0; rr < rules.length; ++rr) {
        var rule = rules[rr];
        if (rule.selectorText == selector) {
          return rule;
        }
      }
    }
  };

  var copyProperties = function(src, dst) {
    for (var name in src) {
      if (!src.hasOwnProperty(name)) {
        continue;
      }
      var value = src[name];
      if (value instanceof Array) {
        var newDst = dst[name];
        if (!newDst) {
          newDst = [];
          dst[name] = newDst;
        }
        copyProperties(value, newDst);
      } else if (value instanceof Object &&
                 !(value instanceof HTMLElement)) {
        var newDst = dst[name];
        if (!newDst) {
          newDst = {};
          dst[name] = newDst;
        }
        copyProperties(value, newDst);
      } else {
        dst[name] = value;
      }
    }
  };

  /**
   * Returns the absolute position of an element for certain browsers.
   * @param {HTML Element} element The element to get a position for.
   * @return {Object} An object containing x and y as the absolute position
   *   of the given element.
   */
  var getAbsolutePosition = function(element) {
    var r = { x: element.offsetLeft, y: element.offsetTop };
    if (element.offsetParent) {
      var tmp = getAbsolutePosition(element.offsetParent);
      r.x += tmp.x;
      r.y += tmp.y;
    }
    return r;
  };

  return {
    applyUrlSettings: applyUrlSettings,
    findCSSStyleRule: findCSSStyleRule,
    getAbsolutePosition: getAbsolutePosition,
    randInt: randInt,
    randCSSColor: randCSSColor,
    copyProperties: copyProperties,
  };
});


