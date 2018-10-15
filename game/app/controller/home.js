const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // this.ctx.body = 'Hello world';
    await this.ctx.render('game/flappybird.xtpl');
  }
}

module.exports = HomeController;