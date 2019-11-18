const Registrations = require('../model/registrations').RegistrationModel;

const router = require('express').Router();

/*
 @routes 
        registrations : all the registrations
        registrationsbydate: filtering registrations by date send pagenumber query and dateBegin and dateEnd as query

*/

router.get('registrations', async(req, res) => {

    pageNo = req.query.pageno;
    pagesize = 15;
    registrations = await Registrations.find().skip(pagesize * (pageno - 1)).limit(pagesize);
    res.send(registrations);
});

router.get('registrationsbydate', async(req, res) => {

    pageNo = req.query.pageno;
    pagesize = 15;
    datebegin = req.query.dateBegin;
    dateEnd = req.query.dateEnd;
    registrations = await Registrations.find({ dateofRegistration: { $gte: dateBegin, $lte: dateEnd } }).skip(pagesize * (pageno - 1)).limit(pagesize);

});


router.get('registrationsbycourse', async(req, res) => {

    pageNo = req.query.pageno;
    pagesize = 15;
    reqcourseId = req.query.courseId;
    registrations = await Registrations.find({ courseId: reqcourseId }).skip(pagesize * (pageno - 1)).limit(pagesize);

});


router.post('addRegistrations', (req, res) => {

    registrations = new Registrations({
        studentId: req.body.studentId,
        courseId: req.body.courseId,
        paymentId: req.body.paymentId,
        amount: req.body.amount
    });

    registrations.save((err, docs) => {
        if (!err) {
            res.status(200).send({ message: "registration successful" });
        } else {
            res.status(400).send({ message: "Registrations not successfull" });
        }
    });


});


module.exports = router;