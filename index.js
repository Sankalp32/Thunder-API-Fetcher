console.log("My clone project");

// functions 

// Dom element for params 

function getElementFromString(string) {

    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
    
}



// number of parameters

let addedParamsCount = 0 ;

// Hide the parameters box 
let parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = 'none';



//if clicked on params box hide json box
let customRadio = document.getElementById('customradio');
customRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';

})


//if clicked on json box hide params box

let jsonRadio = document.getElementById('jsonradio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';

})

// Add button for custom parameters 

let addParams = document.getElementById('addParams');
addParams.addEventListener('click',()=>{
    let params = document.getElementById('params');
        let string = `
            <div class="row my-2">
                <label for="inputUrl" class="col-sm-2 col-md-2">Parameter ${addedParamsCount+ 2}</label>

                <div class=" col-md-4">

            <input type="text" class="form-control bg-dark text-white border border-2 border-white" id="parameterKey${addedParamsCount+ 2}" placeholder="Enter parameter ${addedParamsCount+ 2} Key">
            </div>

            <div class=" col-md-4">

            <input type="text" class="form-control bg-dark text-white border border-2 border-white" id="parameterValue${addedParamsCount+ 2}" placeholder="Enter parameter ${addedParamsCount+ 2} value">
            </div>
         
            <button class="btn bg-dark  text-white border border-white border-2 col-md-1 deleteParams" ">DELETE</button>
        </div>`;

        // Convert element string to DOM 

      let paramElement = getElementFromString(string);  
    //   console.log(paramElement)
    params.appendChild(paramElement);
    // Event listener for - button
    let deleteParams = document.getElementsByClassName('deleteParams');
    for (item of deleteParams){
        item.addEventListener('click', (e) => {

            e.target.parentElement.remove();

        })
    }
addedParamsCount++;
})


// submit button 

let submit = document.getElementById('submit');
submit.addEventListener('click',() => {
    //wait msg in the response box
    // document.getElementById('responseJsonText').value ="Please wait fetching...."
    document.getElementById('responsePrism').innerHTML ="Please wait fetching...."
    Prism.highlightAll();

    // fetching the values that has been entered 

    let url = document.getElementById('inputUrl').value;
    let requestType = document.querySelector("input[name = 'requestType']:checked").value;
    let contentType = document.querySelector("input[name = 'contentType']:checked").value;

    


    // if used params option gather params as an object
    if(contentType == 'params'){
        data = {};
        for (i=0 ; i <addedParamsCount+1; i++){
            if(document.getElementById('parameterKey' + (i+1)) != undefined){
            let key = document.getElementById('parameterKey' +(i+1)).value;
            console.log(key)
            let value = document.getElementById('parameterValue' +(i+1)).value;
            data[key] = value;
            }
            data = JSON.stringify(data)



        }
    }

    else{
        data =document.getElementById('requestJsonText').value;

    }

    console.log("URL = " ,url);
    console.log("Request Type = ", requestType);
    console.log("Content Type = ", contentType);
    console.log("Data" ,data)

// Request type GET invoke fetch api
    if(requestType == 'GET'){
        fetch(url,{
            method:'GET'
        })
        .then(response => response.text())
        .then(text=> {
            //  document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
    else{
        fetch(url,{
            method:'POST',
            headers:{
                body:data,
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.text())
        .then(text=> {
            //  document.getElementById('responseJsonText').value = text;
             document.getElementById('responsePrism').innerHTML = text;
             Prism.highlightAll();
        });

    }


})