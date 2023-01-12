



const searchInput = document.querySelector('#searchInput')
    const searchBtn = document.querySelector('#searchBtn').addEventListener("click", () => {
        displayCountry(searchInput.value)
    })

    function displayCountry(country) {
        // Reset before every query
        resetUI()
        // Fetch country
        fetch(`https://restcountries.com/v3.1/name/${country}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("This country not found")
                }
                return response.json()
            })// Displaying country info by data
            .then((data) => {
                setCountry(data[0]);
                // Get border countries
                let countries;
                if (data[0].borders != null) {
                    countries = data[0].borders; // ts()
                } else {
                    throw new Error("There is no border countries.")
                }
                console.log(data[0])
                // Fetch border countries by alpha codes
                fetch(`https://restcountries.com/v3.1/alpha?codes=${countries}`)
                    .then((borders) => {
                        console.log(borders)
                        return borders.json()
                    })
                    .then((borders) => {
                        // iterate borders
                        for (const countries of borders) {
                            // display border countries by border data
                            setBorderCountry(countries)
                        }
                        // Border countries header before end
                        document.querySelector('.col-12').insertAdjacentHTML('beforeend', `<h4> Border Countries </h4> <hr>`)
                    })
            })
            .catch((err) => {
                console.log(err)
                renderError(err)
            })

    }



    let html;
    function setCountry(data) {

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
        document.querySelector('.errors').innerHTML = ""
        document.querySelector('.container .row').innerHTML = ""
    }

    function renderError(err) {

        const html = `
        
            <div class ="alert alert-warning">
                ${err.message}
                </div>
        `
        setTimeout(() => {
            document.querySelector('.errors').innerHTML = ""
        }, 5000);
        document.querySelector('.errors').innerHTML = html
    }
