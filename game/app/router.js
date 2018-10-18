module.exports = app => {
    const {
        router,
        controller
    } = app;
    router.get('/', controller.home.index);
    router.get('/web', controller.home.testsocket);
    router.get('/ws', controller.home.ws);
};