const knex = require('../database');
const { create } = require('./UserController');

module.exports = {
  async index (req, res, next) {
    try {
      const { user_id, page = 1 } = req.query;

      const query = knex('projects')
         .limit(5)   //paginação 5 por página
         .offset((page - 1) * 5);

      const countObj = knex('projects').count();

      // Se o parâmetro opcional de user_id vier preenchido, ele busca o projeto do usuário específico, além de seu respectivo nome 
      if (user_id) {
        query
        .join('users', 'users.id', '=', 'projects.user_id')
        .select('projects.*', 'users.username')
        .where('user_id', user_id)

        countObj
        .where('user_id', user_id)
      }

      const results = await query;

      const [count] = await countObj;
      
      res.header('X-Total-Count', count["count"]);

      return res.json(results);
    } catch (error) {
      next(error)
    }
  },
  async create(req, res, next) {
    try {
      const { title, user_id } = req.body;

      await knex('projects').insert({
        user_id,
        title
      })

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}