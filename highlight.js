// TODO:
// - add an options page / popup to set theme for editing
~function (doc, $, pollTimeout, editor, textarea, selectExtension, extensions, undefined) {
    textarea = $('.file-contents');
    selectExtension = $('.js-language-picker');
    // FIXME: doesn't CodeMirror accept extensions for modes?
    extensions = {
        "js": "javascript"
      , "css": "css"
      , "html": "htmlmixed"
      , "txt": "text"
      , "c": "clike"
      , "clj": "clojure"
      , "coffee": "coffeescript"
      , "diff": "diff"
      , "md": "gfm"
      , "go": "go"
      , "groovy": "groovy"
      , "hs": "haskell"
      , "lua": "lua"
      , "sql": "mysql"
      , "pl": "perl"
      , "php": "php"
      , "py": "python"
      , "r": "r"
      , "rb": "ruby"
      , "scm": "scheme"
      , "sh": "shell"
      , "st": "smalltalk"
      , "tpl": "smarty"
      , "v": "verilog"
      , "xml": "xml"
      , "xq": "xquery"
      , "yml": "yaml"
    };

    function extToMode (ext) {
        return extensions[ext.slice(1)] || "text";
    }
    
    function fireEvent (element, event) {
        var e = doc.createEvent("HTMLEvents");
        e.initEvent(event, true, true);
        return !element.dispatchEvent(e);
    }

    // FIXME: is there really no other option other than polling?
    setTimeout( function pollLanguageChange (value) {
        if (value !== selectExtension.value) fireEvent(selectExtension, "change");
        setTimeout( pollLanguageChange, pollTimeout, selectExtension.value );
    }, pollTimeout, selectExtension.value);

    // defaults
    CodeMirror.defaults.theme = "ambiance";
    CodeMirror.defaults.lineNumbers = true;

    selectExtension.addEventListener("change", function () {
        editor.setOption("mode", extToMode(selectExtension.value));
    }, false);

    textarea && (editor = CodeMirror.fromTextArea(textarea, {
        mode: extToMode(selectExtension.value)
    }));
}(document, function (selector) { return document.querySelector(selector); }, 100);
