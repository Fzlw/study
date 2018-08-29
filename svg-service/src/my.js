require([ 'zepto', 'svg' ], function($, svg) {
    let img = `<img src="${svg.test}" />`
    $('body').append(img);
})