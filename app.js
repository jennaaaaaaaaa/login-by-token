const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")

const app = express()
const port = 2000

app.use(cookieParser())
app.use(express.json())
app.use(session())

const session = []

const users = [
    {id: "aaa"},
    {id: "ccc"},
    {id: "bbb"}
]

app.get('/users', (req, res) => {
    const userId = req.cookies.userid
    // console.log(userId)
    const user = users.find(user => user.id === userId)

    if(!user) {
        return res.status(401).json({message: "로그인 이후 사용"})
    }
    res.send(user)
})

app.post('/login', (req, res) => {
    const userId = req.body.userId
    const user = users.find(user => user.id === userId)

    req.session.userid = user.id
    // console.log(req.body)//실제로 값을 잘 가져오는지
    res.send('login page')
})

app.post('/logout', (req, res) => {
    res.send('logout page')
})

app.post('/register', (req, res) => {
    res.send('register page')
})

app.listen(port, () => {
    console.log(port, '서버 실행')
})
