import JobModel from "../src/models/job.model.js";
export const checkPermission = (req, res, next) => {

    const job = JobModel.getJobByID(req.params.id);
    console.log('recuiterEmail: ', job.recruiterEmail);
    if (job && job.recruiterEmail == req.session.userEmail) {
        next();
    }
    else {
        res.render('error-404', { userEmail: req.session.userEmail, userName: req.session.userName })
    }
}