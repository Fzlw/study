/**
 * 
 * @param {string/obj} target 
 * @param {number} type  1：手机号码 2： 密码  3： 验证码
 */
function assign(target, _type) {
    let tar = typeof target === 'string' ? $(target) : target;
    let reg_pwd = /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}/;
    let reg_mobile = /^\d{3}-\d{8}$|^\d{4}-\d{7}$|^\d{11}$/;
    let space = /^\s+$/;
    let value = tar.val();
    let type = _type || null;
    if (!value) {
        return 'none';
    }
    // 空字符串
    if(space.test(value)) {
        return 'space';
    }
    if (type === 1 && !reg_mobile.test(value)) {
        return 'MformatFalse';
    }
    if (type === 2 && !reg_pwd.test(value)) {
        return 'PformatFalse';
    }
    if (type === 3 && $.trim(value)) {
        return 'codePass';
    }
    return 'Pass';
}