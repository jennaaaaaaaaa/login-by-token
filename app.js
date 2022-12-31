// const express = require("express")
// const cookieParser = require("cookie-parser")

// const app = express()
// const port = 2000

// app.use(cookieParser())
// app.use(express.json())

// const session = []

// const users = [
//     {id: "aaa"},
//     {id: "ccc"},
//     {id: "bbb"}
// ]

// app.get('/users', (req, res) => {
//     const userId = req.cookies.userid
//     // console.log(userId)
//     const user = users.find(user => user.id === userId)

//     if(!user) {
//         return res.status(401).json({message: "로그인 이후 사용"})
//     }
//     res.send(user)
// })

// app.post('/login', (req, res) => {
//     const userId = req.body.userId
//     const user = users.find(user => user.id === userId)

//     req.session.userid = user.id
//     // console.log(req.body)//실제로 값을 잘 가져오는지
//     res.send('login page')
// })

// app.post('/logout', (req, res) => {
//     res.send('logout page')
// })

// app.post('/register', (req, res) => {
//     res.send('register page')
// })

// app.listen(port, () => {
//     console.log(port, '서버 실행')
// })




// const express = require('express')
// const cookieParser = require('cookie-parser')

// const app = express()
// const port = 3000

// app.use(cookieParser())
// app.use(express.json())

// const users = [
//     {id: "aaa"},
//     {id: "bbb"},
//     {id: "ccc"}
// ]

// const session = []

// app.get('/users', (req,res) => {
//     const user = session.find(session => session.ssid === req.cookies.ssid)
//     console.log(sessions)
//     console.log(user)
//     res.send({id: user.id})
// })

// app.post('/login', (req, res) => {
//     const userId = req.body.userId
//     const user = users.find(user => user.id === userId)

//     const ssid = Date.now().toString()

//     sessions.push({
//         ...user,
//         ssid
//     })

//     res.cookie("ssid", ssid)
//     res.send(user.id)
// })

// app.post('/logout', (req, res) => {
//     res.send("logout page")
// })
// app.post('/register', (req, res) => {
//     res.send("register page")
// })

// app.listen(port, () => {
//     console.log(port, '포트로 서버 열림')
// })



const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)

const app = express()
const port = 3000

app.use(cookieParser())
app.use(express.json())

const sessionObj = {
    secret: 'aaa',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore(),
}

app.use(session(sessionObj))

const users = [
    {id: "noggong"},
    {id: "hyowon"},
    {id: "kimin"}
]

app.get('/users', (req,res) => {
    const userId = req.session.userId
    const user = users.find(user => user.id === userId)
    res.send(user)
})

app.post('/login', (req, res) => {
    const userId = req.body.userId
    const user = users.find(user => user.id === userId)

    req.session.userid = user.id
    res.send(user.id)
})

app.post('/logout', (req,res) => {
    res.send("logout page")
})

app.post('/register', (req, res) => {
    res.send("register page")
})

app.listen(port, () => {
    console.log(port, '서버 실행')
})