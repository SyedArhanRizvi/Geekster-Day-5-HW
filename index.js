import express from "express";
import data from './RestApi.json' assert {type:'json'};
import fs from "fs";


const app = express();
const PORT = 3000;
const dummyData = data;

app.use(express.urlencoded({extended : false}));
app.use(express.json())

app.get("/", (req, res)=>{
    res.json("Hello this is a Dummy Rest Api Page :If you want to see rendome images so type {/user/img} and if you want to see whole api so type {/api/user} and if you wn to see individual items so type {/api/user/:idNumber}")
});
// console.log(dummyData);

app.get("/user/img", (req, res)=>{

    const images = `
    <ol> 
        ${dummyData.map((item) =>`<li><img src=${item.imgUrls[0]} style="height:300px; width:400px;"></img></li>`).join("")}
    </ol>
    `;
    res.send(images)
});

app.get("/api/user", (req, res)=>{
    res.send(dummyData)
});

app.get("/api/user/:id", (req, res)=>{
    const id = req.params.id;
    const user = dummyData.find((item)=> item.id == id);
    console.log(`this is our id${id}, and this is our users id ${user}`);
    
   return res.send(user)
});


app.post("/api/user", (req, res)=>{
    const data = req.body;
    //console.log(dummyData)
    // console.log("__________      ",data );

    dummyData.push({id: dummyData.length + 1, ...data})

    // dummyData.push({id: dummyData.push.length + 1, ...data});

    fs.writeFile("./RestApi.json/", JSON.stringify(dummyData), (err)=>{
        if(err){
            console.log(err);
            
        } else {
            console.log("Data added");
            
        }
    });
    console.log("Our received body is", data);
    res.send(data);
});

// app.head("/api/user", (req, res)=>{});

// app.put("/api/user", async(req, res)=>{
//     const {name , id, price , desc} = req.body;
//     console.log(name , price , desc);
//     // let name = "King Size Bed";
//     const index = dummyData.findIndex(item => item.id == id);
//     console.log(data)

//     dummyData[index].name = name;
//     dummyData[index].price = price;
//     dummyData[index].desc = desc;


//     // console.log();
    
    
// });

app.listen(PORT, ()=>{
    console.log(`Our server is live now on the port of ${PORT}`);
});


// Patch is use for ubdation 
// Put is use for replace
