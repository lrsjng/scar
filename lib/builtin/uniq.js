const PREFIX = 'UNIQ-';
const SUFFIX = '-ID';
const LENGTH = 4;
const ZEROPAD = '0000';
const RE_ID = new RegExp(`^${PREFIX}\\d{${LENGTH}}${SUFFIX}$`);

let counter = 0;

const id = () => {
    counter += 1;
    return PREFIX + (ZEROPAD + counter).substr(-LENGTH) + SUFFIX;
};

const is_id = sequence => RE_ID.test(sequence);
const obj = () => ({_uniq_id: id()});
const path = (ext = '') => '_uniq_path/' + id() + ext;

module.exports = {
    id,
    is_id,
    isId: is_id,
    obj,
    path
};
