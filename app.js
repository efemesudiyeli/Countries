// callback
// console.log('Start');

// const login = (username, password, callback) => {
//     setTimeout(() => {
//         callback({ username: username, email: "info@asdasf.com" })
//     }, 1000);
// }

// const getPostsByUsername = (username, callback) => {
//     setTimeout(() => {
//         callback(['post1', 'post2', 'post3'])
//     }, 2000);
// }

// const getPostDetails = (post, callback) => {
//     setTimeout(() => {
//         callback("post details")
//     }, 3000);
// }

// login('sadikturan', '12345', user => {
//     console.log(user.username, user.email)

//     getPostsByUsername(user.username, (posts) => {
//         console.log(posts)

//         getPostDetails(posts[1], (details) => {
//             console.log(details)
//         })
//     })
// })
// // Callback Hell
// console.log('End')

// AJAX



const searchInput = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#searchBtn').addEventListener("click", () => {

    displayCountry(searchInput.value.toLowerCase())
})


function displayCountry(country) {
    resetUI()
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();


    // bu talep bir asenkron işlem ne zaman geri döneceğini tahmin edemeyiz
    request.addEventListener('load', function () {
        let data = request.responseText;
        // string to json
        data = JSON.parse(data)
        setCountry(data[0]);

        // load border countries
        const countries = data[0].borders.toString();
        console.log(countries)
        const req = new XMLHttpRequest();
        req.open('GET', `https://restcountries.com/v3.1/alpha?codes=${countries}`)
        req.send()
        req.addEventListener('load', () => {
            const data = JSON.parse(req.responseText);
            console.log(data)

            for (const country of data) {
                setBorderCountry(country)
            }

            document.querySelector('.col-12').insertAdjacentHTML('beforeend', `<h4> Border Countries </h4> <hr>`)
        })
    })
}



let html;
function setCountry(data) {
    console.log(data)

    html = `
    <div class="col-12 my-2">
         <div class="card w-100 mb-3" >
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${data.flags.png}" class="w-100 h-100 img-fluid" alt="...">
            </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title text-center">${data.name.official}</h5>
                        <hr>
                        <div class="row">
                            <div class="col-6">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"><span class = "info-head">Capital:</span> ${data.capital}</li>
                                    <li class="list-group-item"><span class = "info-head">Language:</span> ${Object.values(data.languages)}</li>
                                    <li class="list-group-item"><span class = "info-head">Currency:</span> ${Object.keys(data.currencies)}   </li >
                                    <li class="list-group-item"><span class = "info-head">Region:</span> ${data.region}</li>
                                    <li class="list-group-item"><span class = "info-head">Subregion:</span> ${data.subregion}</li>
                                    <li class="list-group-item"><span class = "info-head">Timezones:</span> ${data.timezones}</li>
                                </ul >
                            </div>
                            <div class="col-6">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"><span class ="info-head">Common Name:</span> ${data.name.common}</li>
                                    <li class="list-group-item"><span class ="info-head">Population:</span> ${Intl.NumberFormat().format(data.population)}</li>
                                    <li class="list-group-item"><span class ="info-head">Currency Symbol:</span> ${Object.values(data.currencies)[0].symbol}    </li >
                                    <li class="list-group-item"><span class ="info-head">Start of Week:</span> ${data.startOfWeek}</li> 
                                    <li class="list-group-item"><span class ="info-head">Area:</span> ${Intl.NumberFormat().format(data.area)}</li>
                                    <li class="list-group-item"><span class ="info-head">TLD:</span> ${data.tld}</li>
                                </ul >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    `
    document.querySelector('.container .row').innerHTML += html
}


function setBorderCountry(data) {
    console.log(data)
    html = `
    
    <div class="col-3 my-2">
    <div class="card text-center">
        <img class="card-img-top " src="${data.flags.png}" alt="Flag">
        <div class="card-body">
            <h4 class="card-title">${data.name.common}</h4>
            <p class="card-text">Population: ${Intl.NumberFormat().format(data.population)}</p>
            <ul class="list-group list-group-flush">
                    <li class="list-group-item"><span class ="info-head"> Capital:</span> ${data.capital}</li>
                
                 
                    <li class="list-group-item"><span class ="info-head">Region:</span>  ${data.region}</li>
                   
                    
                    
                  </ul >
        </div >
    </div > </div >

    
    `
    document.querySelector('.container .row').innerHTML += html

}




function resetUI() {
    document.querySelector('.container .row').innerHTML = ""
}
