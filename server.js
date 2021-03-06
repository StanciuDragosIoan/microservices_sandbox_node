const express = require("express");
// const cors = require("cors");
const app = express();
const port = 3000;

// app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/products", (req, res) => {
  res.send(`
  <style>
    .card {
        background:#ccc;
        border:1px solid black;
        border-radius: 15px;
        display:block;
        margin: 2rem auto 2rem auto;
        width:70vw;
        text-align:center;
    }

    .btn {
        width:10rem;
        height:3rem;
        font-size:1rem;
        background: blue;
        color:white;
        margin-bottom:2rem;
    }

    .btn:hover {
        cursor:pointer;
    }

    .red {
        background:red;
    }

    .blue {
        background:blue;
    }
  </style>
  <h1>Welcome to the products page</h1>
  <p>Press the button below to get the products</p>
  <button id="prods">
    Get Products
  </button>
  <div id="output">
  </div>
  <script>
    const btn = document.getElementById("prods");
    let crtProds;

    // Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}



    const orderProduct = (event) => {
        console.log(event.target);
        const id = event.target.previousSibling.innerText;
        const price = event.target.previousSibling.previousSibling.innerText.split(' ')[0];
        console.log(price);
        postData('http://localhost:8000/', { id, price })
        .then(data => {
            console.log(data); 
        });
        event.target.className += " red";
      
        setTimeout(()=>{
            confirm('Confirm order?');

            event.target.className += " blue";
        }, 1);
    }
    const getProds =() => {
        console.log('api call here..');
        fetch('http://localhost:5000/')
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            let output = document.querySelector("#output");
            let test = "";
           
            data.data.map(p => {
            test +=  
                '<div class="card">'
                     + '<h1>' + p.name + '</h1>' +
                     '<p>' + p.description + '</p>' +
                     '<p>' + p.price + ' $' + '</p>' +
                     '<p style="display:none;">' + p.id + '</p>' +
                     '<button class="btn" onClick="orderProduct(event)">' +'Order ' + p.name + '</button>' 
                 + '</div>'
            
            
            });
           
            output.innerHTML = test;
            // console.log(output);
            // console.log(data[0]);
        });
           
            
        }


    // console.log(crtProds);
    btn.addEventListener("click", getProds);
   
  </script>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
