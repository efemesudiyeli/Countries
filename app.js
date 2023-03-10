const searchInput = document.querySelector('#searchInput')
    const searchBtn = document.querySelector('#searchBtn').addEventListener("click", () => {


        displayCountry(searchInput.value)
    })

    async function displayCountry(country) {
        // Reset before every query
        resetUI()
        document.querySelector('.loading').style.display = "flex"
        // Fetch country
        try {

            const countryFetch = await fetch(`https://restcountries.com/v3.1/name/${country}`)

            if (!countryFetch.ok) {
                throw new Error("This country not found")
            } else {

                document.querySelector('.loading').style.display = "none"
                const data = await countryFetch.json()
                // Displaying country info by data
                setCountry(data[0]);
                // Get border countries
                let countries;
                if (data[0].borders != null) {
                    countries = data[0].borders;
                } else {
                    throw new Error("There is no border countries.")
                }
                console.log(data[0])
                // Fetch border countries by alpha codes
                const borderFetch = await fetch(`https://restcountries.com/v3.1/alpha?codes=${countries}`)
                const borderCountries = await borderFetch.json()

                // iterate borders
                for (const countries of borderCountries) {
                    // display border countries by border data
                    setBorderCountry(countries)
                }
                // Border countries header before end
                document.querySelector('.col-12').insertAdjacentHTML('beforeend', `<h4> Border Countries </h4> <hr>`)
            }
        } catch (err) {
            console.log(err)
            renderError(err)
            document.querySelector('.loading').style.display = "none"
        }

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
        document.querySelector('.container .info').innerHTML += html
    }


    function setBorderCountry(data) {

          html = `
        
                    <div class="col-lg-4 col-md-6 col-sm-12 my-2">
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
        document.querySelector('.container .info').innerHTML += html

    }

    function resetUI() {
        document.querySelector('.errors').innerHTML = ""
        document.querySelector('.container .info').innerHTML = ""
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

    // geoLocation
    const api_key = "ceb7802f534a4e73929b5c6c42eb4711"

    document.querySelector('#btnLocation').addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError)
        }
    })

    function onError(err) {
        console.log(err)
    }
    function onSuccess(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        // api, opencagedata
        getLocation(lat, lng)


    }

    async function getLocation(latitude, longitude) {
        try {
            const fetchApi = await fetch
                (`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`);
            const data = await fetchApi.json()
            console.log(data)
            const country = data.results[0].components.country;
            displayCountry(country);
            searchInput.value = country;
        } catch (error) {
            console.log(error)
        }


    }
