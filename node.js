const http = require('http');
const svgCaptcha = require('svg-captcha');
const service = http.createServer((req, res) => {
    if (req.url === '/test') {
        let code = svgCaptcha.create({
            // 翻转颜色
            inverse: false,
            ignoreChars: '0o1i',
            // 验证码字符中排除 0o1i
            // 字体大小
            fontSize: 32,
            // 噪声线条数
            noise: 2,
            // 宽度
            width: 130,
            // 高度
            height: 29,
            color: false,
        })
        res.writeHead(200, {
            'Content-Type': 'text/xml'
        })
        res.write(code.data);
    }
    res.end();
})

service.listen(7001, '127.0.0.1');