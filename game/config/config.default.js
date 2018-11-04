exports.keys = "liwei";

exports.view = {
    mapping: {
        '.xtpl': 'xtpl'
    },
};
exports.cluster = {
    listen: {
      port: 2018,
      hostname: '0.0.0.0',
    }
};
   