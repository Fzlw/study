let pro = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('liwei1');
        }, 1000)
    }) 
}

async function handle() {
    let data = await pro()
    console.log(data)
    return data;
}

handle()