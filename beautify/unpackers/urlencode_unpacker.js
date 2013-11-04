/*global unescape */
/*jshint curly: false, scripturl: true */
//
// trivial bookmarklet/escaped script detector for the javascript beautifier
// written by Einar Lielmanis <einar@jsbeautifier.org>
//
// usage:
//
// if (Urlencoded.detect(some_string)) {
//     var unpacked = Urlencoded.unpack(some_string);
// }
//
//

_PAEz._unpackers.Urlencoded = {
    detect: function(str) {
        // the fact that script doesn't contain any space, but has %20 instead
        // should be sufficient check for now.
        if (str.indexOf(' ') == -1) {
            if (str.indexOf('%2') != -1) return true;
            if (str.replace(/[^%]+/g, '').length > 3) return true;
        }
        return false;
    },

    unpack: function(str) {
        /* PAEz */
        // Adding some stuff to remove the javascript: and the anonymous function if there is one
        if (str.substring(0, 11) == 'javascript:') str = str.substring(11);
        var TextLength = str.length;
        if ((str.substring(0, 12) + str.substring(TextLength - 5)) == '(function(){})();') str = str.substring(12, TextLength - 5);
        /* PAEz */

        if (this.detect(str)) {
            if (str.indexOf('%2B') != -1 || str.indexOf('%2b') != -1) {
                // "+" escaped as "%2B"
                return unescape(str.replace(/\+/g, '%20'));
            } else {
                return unescape(str);
            }
        }
        return str;
    }


};