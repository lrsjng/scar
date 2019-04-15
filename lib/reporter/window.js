const noop = () => null;
const doc = global.window && global.window.document;

const set_title = !doc ? noop : title => {doc.title = title;};

const set_fav_icon = !doc ? noop : (() => {
    const ICON_TPL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3wsZER*AAAAAElFTkSuQmCC';
    const PRESETS = {
        RED: ICON_TPL.replace('*', 'Y0VbWlewAAAB1JREFUOMtj/OJs9p+BAsDEQCEYNWDUgFEDBosBABZOAow9yV0y'),
        GREEN: ICON_TPL.replace('*', 'kM+i8BKgAAAB1JREFUOMtj9Fkf8J+BAsDEQCEYNWDUgFEDBosBAIuhAmqCXURi'),
        GREY: ICON_TPL.replace('*', 'kjUf48cwAAAB1JREFUOMtjDA0N/c9AAWBioBCMGjBqwKgBg8UAAFduAh79mcom')
    };
    const head = doc.querySelector('head');
    const rel = 'shortcut icon';

    return href => {
        const old_el = doc.querySelector(`link[rel="${rel}"]`);
        if (old_el) {
            head.removeChild(old_el);
        }

        const el = doc.createElement('link');
        el.rel = rel;
        el.href = PRESETS.hasOwnProperty(href) ? PRESETS[href] : href;
        head.appendChild(el);
    };
})();

module.exports = {
    set_title,
    set_fav_icon
};
