import JobModel from "../models/job.model.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sendMail from "../utils/mail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default class JobController {
    getJob = (req, res) => {
        const jobs = JobModel.getAll();
        res.render('jobs', { jobs, userEmail: req.session.userEmail, userName: req.session.userName, lastVisit: res.locals.lastVisit });
    }
    addJob = (req, res) => {
        const jobs = JobModel.postJob(req);
        res.redirect('/jobs');
    }
    getJobByID = (req, res) => {
        const job = JobModel.getJobByID(req.params.id)
        res.render('job', { job, userEmail: req.session.userEmail, userName: req.session.userName, errorMessage: null, lastVisit: res.locals.lastVisit });
        return job;
    }
    search = (req, res) => {
        try {
            const name = req.body.name;
            const jobs = JobModel.searchResult(name);
            res.render('jobs', { jobs: jobs });
        } catch (error) { res.render('jobs', { jobs: [] }); }
    }
    getPostNewJob = (req, res) => {
        res.render('post-job', { userEmail: req.session.userEmail, userName: req.session.userName, errorMessage: null });
    }
    getUpdateJob = (req, res) => {
        const job = JobModel.getJobByID(req.params.id)
        res.render('update-job', { job, userEmail: req.session.userEmail, userName: req.session.userName, });
    }
    postUpdatedJob = (req, res) => {
        const updatedJob = JobModel.updateJob(req, req.params.id);
        res.render('job', { job: updatedJob, userEmail: req.session.userEmail, userName: req.session.userName, errorMessage: null, lastVisitTime: res.locals.lastVisitTime });
    };

    deleteJob = (req, res) => {
        JobModel.deleteJob(req.params.id);
        res.render('jobs', { jobs: JobModel.getAll(), userEmail: req.session.userEmail, userName: req.session.userName });
    }
    postAddApplicant(req, res, next) {
        const id = req.params.id;
        const job = JobModel.getJobByID(req.params.id)
        const { name, email, contact } = req.body;
        const resumeUrl = '/resume/' + req.file.filename;
        JobModel.addApplicant(id, name, email, contact, resumeUrl);
        sendMail(email, job.job_designation)//sendMAILconfirmation
        res.render('job', { job, errorMessage: null })
    }
    getAllApplicants(req, res) {
        const applicants = JobModel.getAllApplicants(req.params.id);
        res.render('applicants', { applicants })
    }
    viewResume(req, res) {
        const filePath = path.join(__dirname, '../../public/resumes', req.params.filename);
        res.sendFile(filePath)
    }
}