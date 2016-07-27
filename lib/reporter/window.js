const noop = () => null;
const doc = global.window && global.window.document;

const setTitle = !doc ? noop : title => {doc.title = title;};

const setFavIcon = !doc ? noop : (() => {
    const head = doc.querySelector('head');
    const rel = 'shortcut icon';
    const iconTpl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3wsZER*AAAAAElFTkSuQmCC';
    const presets = {
        RED: iconTpl.replace('*', 'Y0VbWlewAAAB1JREFUOMtj/OJs9p+BAsDEQCEYNWDUgFEDBosBABZOAow9yV0y'),
        GREEN: iconTpl.replace('*', 'kM+i8BKgAAAB1JREFUOMtj9Fkf8J+BAsDEQCEYNWDUgFEDBosBAIuhAmqCXURi'),
        GREY: iconTpl.replace('*', 'kjUf48cwAAAB1JREFUOMtjDA0N/c9AAWBioBCMGjBqwKgBg8UAAFduAh79mcom')
    };

    return href => {
        const iconEl = doc.querySelector(`link[rel="${rel}"]`);
        if (iconEl) {
            head.removeChild(iconEl);
        }

        const link = doc.createElement('link');
        link.rel = rel;
        link.href = presets.hasOwnProperty(href) ? presets[href] : href;
        head.appendChild(link);
    };
})();

module.exports = {
    setTitle,
    setFavIcon
};
