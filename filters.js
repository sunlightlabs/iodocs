exports.eat_null = function (val) {
    return (val == null) ? '' : val.toString();
};

exports.if_empty = function (val, alt) {
    if (val == null)
        return alt.toString();
    var val_str = val.toString();
    if (val_str.replace(/\s+/, '').length == 0)
        return alt.toString();
    return val_str;
};
