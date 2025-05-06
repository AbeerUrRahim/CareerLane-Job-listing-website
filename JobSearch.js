const appId = "83fc6d81";
const appKey = "b9e30bb4dc0fc4e6f5695938a907227e";
let country = "";
let searchQuery = document.querySelector('.input');
let selectCountry = document.querySelector("#country_selection");
let search = document.querySelector('.search');
let cards = document.querySelector('.cards'); 

selectCountry.addEventListener('change', (event) => {
    country = event.target.value;
    console.log("country is: " + country);
});

let rec_jobs=document.querySelector('.rec_text')
async function Getdata() {
    try {
        const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(searchQuery.value)}&where=${encodeURIComponent("London")}&results_per_page=10`; // Fixed jobLocation
        let jobData = await fetch(url);
        let parsedData = await jobData.json();
        console.log(parsedData);

        rec_jobs.style.display="none"
        displayCards(parsedData); // Call displayCards directly
    } catch (error) {
        console.error("Error fetching jobs:", error);
        cards.innerHTML = "<p>Error fetching job listings.</p>"; // Display error message
    }
}


function displayCards(parsedData) {
    if (!parsedData.results || parsedData.results.length === 0) {
        cards.innerHTML = "<p>No job listings found.</p>";
        return;
    }

    cards.innerHTML = ""; // Clear existing cards

    parsedData.results.forEach(job => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.title = job.title || "N/A";
        card.dataset.location = job.location.display_name || "N/A";
        card.dataset.created = job.created ? job.created.split("T")[0] : "N/A";
        card.dataset.salary = job.salary_max || "";
        card.dataset.description = job.description || "";
        card.dataset.url = job.redirect_url;
        card.dataset.company = job.company?.display_name || "N/A"; // Store company name
        card.innerHTML = `
        <p class="card_title">${card.dataset.title}</p>
        <p class="company">
            <i class="bi bi-buildings-fill icon_loc"></i> 
            <span id="company" data-name="${card.dataset.company}">${card.dataset.company}</span>
        </p>
        <p class="location">
            <i class="bi bi-geo-alt-fill icon_loc"></i> 
            <span id="location" data-location="${card.dataset.location}">${card.dataset.location}</span>
        </p>
        <p class="salary"> €<span id="salary" data-salary="${card.dataset.salary}">${card.dataset.salary}</span>/year</p>
        <p class="description"><strong>description:</strong> ${card.dataset.description}</p>
    `;
    

        cards.appendChild(card);
    });

        // Popup logic (moved inside displayCards after card creation)
        let popupCard = document.querySelector('#popupCard');
        let overlay = document.querySelector('#overlay');
        let closeButton = document.querySelector('#closeBtn');
        let card2=document.querySelector('#card2')

        cards.addEventListener('click', (event) => {
            let clickedCard = event.target.closest('.card');
            if (!clickedCard) return;
            
            console.log("Company:", clickedCard.dataset.company);
            console.log("Location:", clickedCard.dataset.location);
            console.log("Salary:", clickedCard.dataset.salary);

            document.getElementById('company2').innerText = clickedCard.dataset.company;
document.getElementById('location2').innerText = clickedCard.dataset.location;
document.getElementById('salary2').innerText = clickedCard.dataset.salary;

            // document.getElementById('company').textContent = clickedCard.dataset.company;
            document.getElementById('title').textContent = clickedCard.dataset.title;
            document.getElementById('created').textContent = clickedCard.dataset.created;
            // document.getElementById('location').textContent = clickedCard.dataset.location;
            // document.getElementById('salary').textContent = clickedCard.dataset.salary;
            document.getElementById('description2').textContent = clickedCard.dataset.description;
            let applyNow=document.getElementById('applyNow')
            applyNow.addEventListener('click',()=>{

                let jobLink=document.getElementById('jobLink').href = clickedCard.dataset.url;
                if (jobLink && jobLink !== "#") {
                    window.open(jobLink, "_blank")
                }
            })

            popupCard.style.display = "flex";
            overlay.style.display = "block";
            card2.style.visibility='visible';
        });
        
        function closePopup() {
            popupCard.style.display = "none";
            overlay.style.display = "none";
            card2.style.visibility='hidden'
        }
    
        closeButton.addEventListener('click', closePopup);

}
function display_recommended_Cards(parsedData) {
    if (!parsedData.results || parsedData.results.length === 0) {
        cards.innerHTML = "<p>No job listings found.</p>";
        return;
    }

    // cards.innerHTML = ""; // Clear existing cards

    parsedData.results.forEach(job => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.title = job.title || "N/A";
        card.dataset.location = job.location.display_name || "N/A";
        card.dataset.created = job.created ? job.created.split("T")[0] : "N/A";
        card.dataset.salary = job.salary_max || "";
        card.dataset.description = job.description || "";
        card.dataset.url = job.redirect_url;
        card.dataset.company = job.company?.display_name || "N/A"; // Store company name
        card.innerHTML = `
        <p class="card_title">${card.dataset.title}</p>
        <p class="company">
            <i class="bi bi-buildings-fill icon_loc"></i> 
            <span id="company" data-name="${card.dataset.company}">${card.dataset.company}</span>
        </p>
        <p class="location">
            <i class="bi bi-geo-alt-fill icon_loc"></i> 
            <span id="location" data-location="${card.dataset.location}">${card.dataset.location}</span>
        </p>
        <p class="salary"> €<span id="salary" data-salary="${card.dataset.salary}">${card.dataset.salary}</span>/year</p>
        <p class="description"><strong>description:</strong> ${card.dataset.description}</p>
    `;
    

        cards.appendChild(card);
    });

        // Popup logic (moved inside displayCards after card creation)
        let popupCard = document.querySelector('#popupCard');
        let overlay = document.querySelector('#overlay');
        let closeButton = document.querySelector('#closeBtn');
        let card2=document.querySelector('#card2')

        cards.addEventListener('click', (event) => {
            let clickedCard = event.target.closest('.card');
            if (!clickedCard) return;
            
            console.log("Company:", clickedCard.dataset.company);
            console.log("Location:", clickedCard.dataset.location);
            console.log("Salary:", clickedCard.dataset.salary);

            document.getElementById('company2').innerText = clickedCard.dataset.company;
document.getElementById('location2').innerText = clickedCard.dataset.location;
document.getElementById('salary2').innerText = clickedCard.dataset.salary;

            // document.getElementById('company').textContent = clickedCard.dataset.company;
            document.getElementById('title').textContent = clickedCard.dataset.title;
            document.getElementById('created').textContent = clickedCard.dataset.created;
            // document.getElementById('location').textContent = clickedCard.dataset.location;
            // document.getElementById('salary').textContent = clickedCard.dataset.salary;
            document.getElementById('description2').textContent = clickedCard.dataset.description;
            let applyNow=document.getElementById('applyNow')
            applyNow.addEventListener('click',()=>{

                let jobLink=document.getElementById('jobLink').href = clickedCard.dataset.url;
                if (jobLink && jobLink !== "#") {
                    window.open(jobLink, "_blank")
                }
            })

            popupCard.style.display = "flex";
            overlay.style.display = "block";
            card2.style.visibility='visible';
        });
        
        function closePopup() {
            popupCard.style.display = "none";
            overlay.style.display = "none";
            card2.style.visibility='hidden'
        }
    
        // overlay.addEventListener('click', closePopup);
        closeButton.addEventListener('click', closePopup);

}

//random card generation
let titles_arr = ["Frontend Developer", "Designer", "Chartered Accountant", "Fullstack Developer", "Content Writer"];

async function fetchJobs(title) {
    try {
        const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(title)}&where=${encodeURIComponent("London")}&results_per_page=2`; 
        let jobData = await fetch(url);
        let parsedData = await jobData.json();
        console.log(parsedData);
        
        display_recommended_Cards(parsedData); // Call displayCards with the fetched data
    } catch (error) {
        console.error("Error fetching jobs:", error);
        cards.innerHTML = "<p>Error fetching job listings.</p>"; // Display error message
    }
}
let Spinner=document.querySelector('.spinner')
// Fetch jobs with a delay to avoid "Too many requests" error
async function fetchAllJobs() {
    Spinner.style.display="flex"
    for (let i = 0; i < titles_arr.length; i++) {
        await fetchJobs(titles_arr[i]);  
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
    }
    Spinner.style.display="none"

}

fetchAllJobs();





    search.addEventListener('click', Getdata);