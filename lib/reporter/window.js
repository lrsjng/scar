const noop = () => null;
const DOC = !!global.window && global.document;

const setTitle = !DOC ? noop : title => {DOC.title = title;};

const setFavIcon = (() => {
    if (!DOC) {
        return noop;
    }

    const ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3wsZER*AAAAAElFTkSuQmCC';
    const PRESETS = {
        RED: ICON.replace('*', 'Y0VbWlewAAAB1JREFUOMtj/OJs9p+BAsDEQCEYNWDUgFEDBosBABZOAow9yV0y'),
        GREEN: ICON.replace('*', 'kM+i8BKgAAAB1JREFUOMtj9Fkf8J+BAsDEQCEYNWDUgFEDBosBAIuhAmqCXURi'),
        GREY: ICON.replace('*', 'kjUf48cwAAAB1JREFUOMtjDA0N/c9AAWBioBCMGjBqwKgBg8UAAFduAh79mcom')
    };

    const head = DOC.head || DOC.getElementsByTagName('head')[0];
    const rel = 'shortcut icon';

    return href => {
        if (PRESETS.hasOwnProperty(href)) {
            href = PRESETS[href];
        }
        const iconEl = DOC.querySelector(`link[rel="${rel}"]`);
        const link = DOC.createElement('link');
        link.rel = rel;
        link.href = href;
        if (iconEl) {
            head.removeChild(iconEl);
        }
        head.appendChild(link);
    };
})();

module.exports = {setTitle, setFavIcon};
