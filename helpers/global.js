module.exports = class Global {
  static getAll(model, res) {
    return model.find((error, result) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.send({ 'message': 'Aucun résultat' }) : res.send(result);
      }
    });
  }
}
