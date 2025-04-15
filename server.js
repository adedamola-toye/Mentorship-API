import app from './app.js'

const PORT = process.env.PORT || 300;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});