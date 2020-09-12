const router = require('express').Router();
const uuid = require('uuid');
let Assignment = require('../models/assignment');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

router.get('/' , jsonParser, function(req , res){
    Assignment.find()
    .then(assignments => res.json(assignments))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add' , jsonParser, function(req , res){
  const name = req.body.name;
  const dueDate = Date.parse(req.body.dueDate);
  const completionTime = Number(req.body.completionTime);
  const suggestedDate = Date.parse(req.body.suggestedDate);
  const points = Number(req.body.points);
  const done = Boolean(req.body.done);
  const aUuid = uuid.v4();

  const newAssignment = new Assignment({
    name,
    dueDate,
    completionTime,
    suggestedDate,
    points,
    done,
    aUuid,
  });

  newAssignment.save()
  .then(() => res.json('Assignment added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/update/:id' , jsonParser, function(req , res){
    Assignment.findById(req.params.id)
    .then(assignment => {
        assignment.name = req.body.name;
        assignment.dueDate = Date.parse(req.body.dueDate);
        assignment.completionTime = Number(req.body.completionTime);
        assignment.suggestedDate = Date.parse(req.body.suggestedDate);
        assignment.points = Number(req.body.points);
        assignment.done = Boolean(req.body.done);

      name.save()
        .then(() => res.json('Assignment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;