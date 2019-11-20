const mongoose = require('mongoose');
const Course = require('../model/courses');
const router = require('express').Router();
var multer = require('multer');



/* 
    @routes 
        1. courses : to view all course
        2. addCourse : to add new Course
        3. deleteCourse : to delete an event it take id of the institute as a parameter
        4. updateCourse : to update an event it take id of the institute as a parameter
*/

var store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/courses')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.' + file.originalname);
    }
})

var upload = multer({ storage: store }).single('file');



router.get('/courses', async(req, res) => {
    pageNumber = req.query.pageno;
    console.log(pageNumber);
    pageSize = 10;
    findCourses = await Course.find().skip((pageNumber - 1) * pageSize).limit(pageSize);

    res.send(findCourses);
});


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
router.post('/addCourse', async(req, res) => {

    filename = await fileupload(req, res);

    console.log(filename);

    var course = new Course({
        name: req.body.name,
        category: req.body.category,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        desc: req.body.desc,
        fee: req.body.fee,
        venue: req.body.venue,
        regLastDate: req.body.regLastDate,
        regLink: req.body.regLink,
        file: filename
    });


    course.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log(JSON.stringify(err));
        }
    });

});


router.put('/updateCourse/:id', async(req, res) => {

    id = req.params.id;
    var course = await Course.findById(id);

    course.name = req.body.name || course.name;
    course.category = req.body.category || course.category;
    course.startDate = req.body.startDate || course.startDate;
    course.endDate = req.body.endDate || course.endDate;
    course.desc = req.body.desc || course.desc;
    course.fee = req.body.fee || course.fee;
    course.venue = req.body.venue || course.venue;
    course.regLastDate = req.body.regLastDate || course.regLastDate;
    console.log(course);

    course.save((err, docs) => {
        if (!err) {
            res.status(200).send({ message: "Course updated Successfully " });
        } else {
            res.status(400).send({ message: "Course cannot be updated " });
        }
    });


});

router.put('/deleteCourse/:id', async(req, res) => {

    id = req.params.id;

    Course.deleteOne({ id: id }, (err, docs) => {
        if (!err) {
            res.status(200).send({ message: "Course Deleted Successfully " });
        } else {
            res.status(400).send({ message: "Course cannot be Deleted " });
        }
    })
    res.send(result);

});





module.exports = router;
