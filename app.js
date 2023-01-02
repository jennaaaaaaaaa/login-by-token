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



// // Session
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


// express-session
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)

const app = express()
const port = 3000

app.use(cookieParser())
app.use(express.json())

const sessionObj = {
    // secret(필수옵션) : session key, 세션 및 쿠키 확인
    secret: 'kong',
    // resave : 세션값 변동 여부와 상관없이 다시 저장할지
    resave: false,
    // saveUninitialized : session에 내용 여부와 상과없이 저장할지
    saveUninitialized: true,
    // store : 세션을 저장하는 곳/ memorystorer 모듈을 이용한 새로운 저장소
    store: new MemoryStore(),
}

app.use(session(sessionObj)) // session 

const users = [
    { id: "noggong" },
    { id: "hyowon" },
    { id: "kimin" }
]

// 유저 정보 확인
app.get('/users', (req, res) => {
    //express-session으로 req.session 사용 가능
    const userId = req.session.userId // sessntion.usersId를 userId에 할당

    const user = users.find(user => user.id === userId)

    if (!user) {
        return res.status(401).json({ message: "로그인 이후 사용" })
    }
    res.send(user)

})

app.post('/login', (req, res) => {
    //body로 userId 보내줌
    const userId = req.body.userId
    const user = users.find(user => user.id === userId)

    req.session.userid = user.id // userid값을 session의 userid값에 할당
    // console.log(req.session) //세션을 확인하기 위한 콘솔
    res.send(user.id)
})

app.post('/logout', (req, res) => {
    res.send("logout page")
})

app.post('/register', (req, res) => {
    res.send("register page")
})

app.listen(port, () => {
    console.log(port, '서버 실행')
})