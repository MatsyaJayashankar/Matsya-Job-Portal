import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import UserController from "./src/controllers/user.controller.js";
import JobController from "./src/controllers/job.controller.js";
import { auth } from "./middlewares/auth.middleware.js";
import { validatePostJob, validateApplicant } from "./middlewares/validation.middleware.js";
import { uploadFile } from './middlewares/file-upload.middleware.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { setLastVisit } from "./middlewares/lastVisit.middleware.js";
import bodyParser from 'body-parser'
//import methodOverride from 'method-override';
import { checkPermission } from "./middlewares/permission.middleware.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const userController = new UserController();
const jobController = new JobController();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join('src', 'views'));
//app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressEjsLayouts);
app.use(cookieParser());
app.use(setLastVisit)
app.use(bodyParser.json())
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.get('/', (req, res) => res.render('home', { userEmail: req.session.userEmail, userName: req.session.userName,errorMessage:null }));

app.get('/login', userController.getLogin);
app.post('/register', userController.register);
app.post('/register2', userController.register);

app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);

app.get('/jobs', jobController.getJob);
app.get('/post-job', auth, jobController.getPostNewJob)
app.post('/post-job', auth, validatePostJob, jobController.addJob);

app.post('/search', jobController.search);

app.get('/job/:id', jobController.getJobByID)
app.get('/job/update/:id', auth, checkPermission, jobController.getUpdateJob)
app.post('/job/update/:id', auth, checkPermission, jobController.postUpdatedJob)
app.get('/job/delete/:id', auth, checkPermission, jobController.deleteJob)

app.post('/apply/:id', uploadFile.single('resumeUrl'), validateApplicant, jobController.postAddApplicant)
app.get('/apply/job/applicants/:id', auth, jobController.getAllApplicants)
app.get('/resume/:filename', jobController.viewResume)

export default app;
