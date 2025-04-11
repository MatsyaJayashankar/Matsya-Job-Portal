
export default class JobModel {
    constructor(id, job_category, job_designation, job_location, company_name, salary, apply_by, skills_required, number_of_openings, jobposted, applicants) {
        Object.assign(this, { id, job_category, job_designation, job_location, company_name, salary, apply_by, skills_required, number_of_openings, jobposted, applicants });
    }
    static jobs = [
        new JobModel(1, 'Tech', 'SDE', 'Gurgaon, HR, IND, Remote', 'Coding Ninjas', '14-20LPA', '2025-02-05', ['React', 'NodeJs', 'JavaScript', 'SQL', 'MongoDB', 'Express', 'AWS'], 1, '2025-02-05', []),
        new JobModel(2, 'Tech', 'Angular Developer', 'Pune, IND, On-Site', 'Go Digit', '6-10LPA', '2025-02-05', ['Angular', 'JavaScript', 'SQL', 'MongoDB', 'Express', 'AWS'], 2, '2025-02-05', []),
        new JobModel(3, 'Tech', 'SDE', 'Bangalore, IND', 'Juspay', '20-26LPA', '2025-02-05', ['React', 'NodeJs', 'JavaScript', 'SQL', 'MongoDB', 'Express', 'AWS'], 3, '2025-02-05', []),
    ];
    static getAll(){ return this.jobs }
    static getJobByID(id){
        return this.jobs.find(job => job.id == id)
    }

    static postJob = (req) => {
    const newJob = { id: this.jobs.length + 1, ...req.body, applicants:[], recruiterEmail: req.session.userEmail };
    this.jobs.push(newJob) //push returns only length
    return this.jobs
    };

    static updateJob = (req, id) => {
    const index = this.jobs.findIndex(job => job.id === parseInt(id));
    if (index !== -1) {
        return this.jobs[index] = { ...this.jobs[index], ...req.body }
    } else return null
    };
    static deleteJob = (id) => {
    const index = this.jobs.findIndex(job => job.id === parseInt(id))
    if (index !== -1) {
        const deletedJob = this.jobs.splice(index, 1);
        console.log('job Deleted SuccessFully', deletedJob[0]);
        return deletedJob[0]
    } else return null;
    }
    static searchResult = (name) => {
    const searchName = name.trim().toLowerCase(); // Normalize input
    const data = this.jobs.filter((job) => {
        const jobSkills = job.skills_required.map(skill => skill.toLowerCase());
        if (job.job_designation.toLowerCase() === searchName ||
            job.job_category.toLowerCase() === searchName ||
            job.job_location.toLowerCase() === searchName ||
            jobSkills.some(skill => skill === searchName)
        )
            return job  // Ensure exact match
    });
    console.log(data); // Log the filtered data
    return data;
}
    static addApplicant(id,name,email,contact,resumeUrl){
        const job = this.getJobByID(id);
        if(job){
            job.applicants.push({name,email,contact,resumeUrl});
            return job;
        }else return null;
    }
     static getAllApplicants(id){
        const job = this.getJobByID(id);
        return job.applicants
     }
}