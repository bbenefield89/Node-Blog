const express = require('express');
const router = express.Router();

const db = require('../data/helpers/userDb');
const error = require('./helpers/error');

// const error = (res, statusCode, message) => {
//   res.status(statusCode).json({ error: message });
// }

/*************************
** ROUTE: / **
*************************/
// get
router.get('/', (req, res) => {
  db.get()
    .then(data => res.json(data))
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
})

// insert
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return error(res, 400, 'Please provide a name before attempting to create a new user');
  }
  db.insert({ name })
    .then(data => res.json(data))
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
});

/*************************
** ROUTE: /:id **
*************************/
// get
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(data => {
      if (!data) {
        return error(res, 404, 'Sorry, could not find that user. Perhaps try another one?');
      }
      res.json(data)
    })
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
});

// getUserPosts
router.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  db.getUserPosts(id)
    .then(data => {
      if (data.length === 0) {
        return error(res, 404, 'This user either does not exist or has yet to add any posts');
      }
      res.json(data);
    })
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
})

// update
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.update(id, { name })
    .then(data => res.json(data))
    .catch(err => {
      if (!name) {
        return error(res, 400, 'Please provide a new name when attempting to update your name');
      }
      error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site');
    });
});

// remove
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(data => {
      if (!data) {
        return error(res, 404, 'Sorry, could not find that user. Perhaps try another one?');
      }
      res.json(data);
    })
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
})

module.exports = router;