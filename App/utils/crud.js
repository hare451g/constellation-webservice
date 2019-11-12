async function getAll(Model, populate) {
  return Model.find().populate(populate);
}

function getById(Model, id, populate) {
  return Model.findById(id).populate(populate);
}

function getDocument(Model, queryObject, populate) {
  return Model.findOne(queryObject).populate(populate);
}

function createNew(Model, document) {
  const newDocument = new Model(document);
  return newDocument.save();
}

function update(Model, id, document) {
  const updatedModel = Model.findByIdAndUpdate(id, { $set: document });
  return updatedModel;
}

function remove(Model, id) {
  const removedModel = Model.findByIdAndRemove(id);
  return removedModel;
}

const crud = { getAll, getById, getDocument, createNew, update, remove };

module.exports = crud;
