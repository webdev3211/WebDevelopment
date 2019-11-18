const mongoose = require('mongoose');
const Events = require('../model/Event').EventModel;
const router = require('express').Router();
const Institute = require('../model/institute').InstituteModel;
var multer = require('multer');


/* 
    @routes 
        1. events : to view all event
        2. addEvent : to add new event
        3. deleteEvent : to delete an event it take id of the institute as a parameter
        4. updateEvent : to update an event it take id of the institute as a parameter
*/



var store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/events')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.' + file.originalname);
    }
});

var upload = multer({ storage: store }).single('file');



router.get('/events', async(req, res) => {

    pageNumber = req.query.pageNo;
    console.log(pageNumber);
    pageSize = 10;
    events = await Events.find().skip((pageNumber - 1) * pageSize).limit(pageSize);

    res.send(events);
});


router.post('/addEvent/:id', async(req, res) => {
    filename = await fileupload(req, res);

    instituteId = req.params.id;
    institute = await Institute.findById(instituteId);

    const events = new Events({
        name: req.body.name,
        category: req.body.category,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        desc: req.body.desc,
        photo: filename,
        institute: institute
    });

    events.save((err, docs) => {
        if (!err) {
            res.status(200).send({ message: "Event added Successfully " });
        } else {
            console.log(JSON.stringify(err));
            res.status(400).send({ message: "Event cannot be added " });
        }
    });

});

router.put('/updateEvent/:id', async(req, res) => {

    id = req.params.id;
    var events = await Events.findById(id);

    events.name = req.body.name || events.name;
    events.category = req.body.category || events.category;
    events.startDate = req.body.startDate || events.startDate;
    events.endDate = req.body.endDate || events.endDate;
    events.desc = req.body.desc || events.desc;


    events.save((err, docs) => {
        if (!err) {
            res.status(200).send({ message: "Event updated Successfully " });
        } else {
            res.status(400).send({ message: "Event cannot be updated " });
        }
    });


});

router.put('/deleteEvent/:id', async(req, res) => {

    id = req.params.id;



    Events.deleteOne({ id: id }, (err, docs) => {
        if (!err) {
            res.status(200).send({ message: "Event Deleted Successfully " });
        } else {
            res.status(400).send({ message: "Event cannot be Deleted " });
        }
    })
    res.send(result);

});


module.exports = router;



async function fileupload(req, res) {
    return new Promise(
        resolve => {
            upload(req, res, (err) => {
                if (!err) {
                    console.log(req.file.filename);
                    resolve(req.file.filename);

                } else {
                    console.log(JSON.stringify(err));
                }
            })

        }
    )

}