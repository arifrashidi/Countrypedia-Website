

// ? HTML Variables
const countries_div = document.querySelector(".countries")
const btn_country = document.querySelector(".btn_country")
const input_country = document.querySelector(".input_country")

// ? Request API (Promises) 
const get_country_data_api_4 = async function(p_country) {
    try {
        const result = await fetch(`https://restcountries.com/v3.1/name/${p_country}`);
        // -----------------
        // Throwing specific error Manually
        console.log(result); /// one of the result property = { ok: true / false }
        if(result.ok === false) { 
            throw new Error(`${p_country} country not found😞, please insert the right input.`)
        }
        // -----------------
        const data = await result.json();
        console.log(data);
        render_country_4(data[0]);

        //+ --------------------------------------------------------------------------
        // neighbour (chaining promises)
         const neighbour = data[0].borders[0];  /// Malaysia.borders: (3) ['BRN', 'IDN', 'THA']
         // -----------------
         // Throwing specific error Manually
         if (!neighbour) {
             throw new Error(`No neighboring countries found`); // ! not work properly for some reason?
         }
        // -----------------
        const neighbour_result = 
        await fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`) // search by country code
        const neighbour_data = await neighbour_result.json();
        render_country_4(neighbour_data[0], "neighbour")

    } 
    catch (error) { window.alert(error.message) }
    finally {countries_div.style.opacity = 1}
}

// ? addEventListener()
btn_country.addEventListener("click", function() {
    get_country_data_api_4(input_country.value.toLowerCase());

    //+ HTML variable
    const countries_children = document.querySelectorAll(".country")

    //+ smooth opacity transition on second call
    if (countries_children.length !== 0) {
        countries_div.style.opacity = 0;
    }
    //+ remove first call
    if (countries_children.length !== 0) {
        countries_children.forEach(el => el.remove())
    }
})

// ? function push HTML
const render_country_4 = function(data, class_name = "") {
    const HTML = `
    <article class="country ${class_name}" >
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} mil people</p>
    <p class="country__row"><span>🗣️</span>${Object.values(data.languages)}</p>
    <p class="country__row"><span>💰</span>${Object.values(data.currencies).map(el => el.name)}</p>
    </div>
    </article>`;

    // Insert in inside HTML
    countries_div.insertAdjacentHTML("beforeend", HTML)
    // countries_div.style.opacity = 1
}