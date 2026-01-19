const express = require('express');
const server = express();

server.set('view engine', 'ejs');
server.use(express.urlencoded());

let tasks = [
    {
        no: '1',
        tname: 'dancing',
        tprio: 'low'
    },
    {
        no: '2',
        tname: 'reading',
        tprio: 'low'
    },
    {
        no: '3',
        tname: 'study',
        tprio: 'low'
    }
];

server.post('/add-task', (req, res) => {
    tasks.push(req.body);
    console.log('Tasks added success');
    return res.redirect('/');
})

server.get("/delete-task/:no", (req, res) => {
    let no = req.params.no;
    tasks = tasks.filter(task => task.no != no);
    return res.redirect('/');
})

server.get("/edit-task/:no", (req, res) => {
    let no = req.params.no;
    let record = tasks.find(task => task.no == no);
    return res.render('editTask', { task: record });
})

server.post('/update-task', (req, res) => {
    let { no, name, des, date, prio } = req.body;

    tasks = tasks.map(task => {
        if (task.no == no) {
            task.tname = name;
            task.tdes = des;
            task.tdate = date;
            task.tprio = prio;
        }
        return task;
    });

    return res.redirect("/");
})

server.get('/', (req, res) => {
    res.render('index', { tasks });
})

server.listen(8011, () => {
    console.log(`Server Start at http://localhost:8011`);
})