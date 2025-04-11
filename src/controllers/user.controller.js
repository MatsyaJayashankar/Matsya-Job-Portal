import UserModel from "../models/user.model.js";
import JobModel from "../models/job.model.js";
export default class UserController {
    getLogin = (req, res) => { res.render('login', { errorMessage: null }) }
    register = (req, res) => {
        const { name, email, password } = req.body
        const newUser = UserModel.addUser(name, email, password);
        console.log(newUser)
        res.render('login', { errorMessage: null, newUser});
        
    };
    postLogin = (req, res) => {
        const { email, password } = req.body;
        const user = UserModel.isValidUser(email, password);//fetches the user object if present
        if (!user) {
            return res.render('home', { errorMessage: 'Register as Recruiter before login', })
        }
        req.session.userEmail = email;
        req.session.userName = user.name;
        var jobs = JobModel.getAll();
        console.log(user.name, 'loginSuccess')
       
        res.render('jobs', { jobs, userEmail: req.session.userEmail, userName: req.session.userName })
    }
    logout = (req, res) => {
        req.session.destroy((err) => {
            if (err) { res.status(500).send(err) }
            else {
                res.clearCookie("lastVisit");
                res.redirect('/login');
                console.log('Logout success')
            }
        })
    }
}