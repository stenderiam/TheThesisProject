import superagent from 'superagent';
import {Promise} from 'es6-promise';

export function loadModels() {
  return new Promise((resolve, reject) => {
    superagent
    .get('/api/models')
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        resolve(res.body);
      }
    });
  });
}

export function loadoneModel(id) {
  return new Promise((resolve, reject) => {
    superagent
    .get('/api/models/'+id)
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        res.body.full = true;
        resolve(res.body);
      }
    });
  });
}

export function uploadModel(model, id) {
  return new Promise((resolve, reject) => {
    superagent
    .put('/api/models/' + id + '/upload')
    .send(model)
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        resolve(res.body);
      }
    });
  });
}

export function updateModel(model) {
  return new Promise((resolve, reject) => {
    superagent
    .put('/api/models/' + model.id)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(model))
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        resolve(res.body);
      }
    });
  });
}

export function addModel(model) {
  return new Promise((resolve, reject) => {
    superagent
    .post('/api/models')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(model))
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        resolve(res.body);
      }
    });
  });
}

export function deleteModel(model) {
  return new Promise((resolve, reject) => {
    superagent
    .delete('/api/models/' + model.id)
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        resolve(res.body);
      }
    });
  });
}
