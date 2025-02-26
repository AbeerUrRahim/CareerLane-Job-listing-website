// // // Select all job cards
// // let jobCards = document.querySelectorAll('.card');

// // // Select popup elements
// // let popupCard = document.querySelector('.card2_container');
// // let overlay = document.querySelector('#overlay'); 
// // let closeButton = document.querySelector('#closeBtn');

// // // Add click event to each job card
// // jobCards.forEach(card => {
// //     card.addEventListener('click', () => {
// //         popupCard.style.display = "flex"; // Show the popup
// //         overlay.style.display = "block"; // Show overlay
// //     });
// // });

// // // Close popup when clicking outside or on the button
// // overlay.addEventListener('click', closePopup);
// // closeButton.addEventListener('click', closePopup);

// // function closePopup() {
// //     popupCard.style.display = "none";
// //     overlay.style.display = "none";
// // }
// async function getdata() {
    
//     // let url= 'https://jsearch.p.rapidapi.com/estimated-salary?job_title=nodejs%20developer&location=new%20york&location_type=ANY&years_of_experience=ALL' 
//      let url= 'https://jsearch.p.rapidapi.com/company-job-salary?company=Amazon&job_title=software%20developer&location_type=ca&years_of_experience=ALL' 


//     let options={
//         method:'GET',
//         headers:{
//     'x-rapidapi-host': 'jsearch.p.rapidapi.com', 
// 	'x-rapidapi-key': '2e7331e500msh0baa58d8a996214p1d54c3jsn564c876b8de9'
//         }
//     }
//     let data=await fetch(url,options)
//     let response = await data.json()
//     console.log(response)
// }
// getdata()



// JobSearch.js
const appId = "83fc6d81";
const appKey = "b9e30bb4dc0fc4e6f5695938a907227e";
let country = "";
let searchQuery = document.querySelector('.input');
let selectCountry = document.querySelector("#country_selection");
let search = document.querySelector('.search');
let cards = document.querySelector('.cards'); // Get cards container

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
    
        // overlay.addEventListener('click', closePopup);
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
//random cards generation

// let titles_arr=["Frontend Developer","Designer","Charted accountant","fullstack developer","content writer"]

// for(let i=0;i<titles_arr.length;i++){
//     async function Get_recc_data() {
//         try {
//             const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(titles_arr[i])}&where=${encodeURIComponent("London")}&results_per_page=2`; 
//             let jobData = await fetch(url);
//             let parsedData = await jobData.json();
//             console.log(parsedData);
    
    
//             displayCards(parsedData); // Call displayCards directly
//         } catch (error) {
//             console.error("Error fetching jobs:", error);
//             cards.innerHTML = "<p>Error fetching job listings.</p>"; // Display error message
//         }
//     }   
//     Get_recc_data()
// }

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


// document.addEventListener("DOMContentLoaded", () => {
//     fetchRandomJobs(); // Fetch random jobs on page load
// });

// function fetchRandomJobs() {
//     const jobContainer = document.querySelector(".cards");
//     jobContainer.innerHTML = ""; // Clear existing jobs if needed

//     const jobTitles = ["Frontend Developer", "Backend Developer", "UI/UX Designer", "Data Scientist", "Marketing Manager"];
//     const companies = ["Google", "Amazon", "Microsoft", "Tesla", "Netflix"];
//     const locations = ["New York, USA", "London, UK", "Berlin, Germany", "Tokyo, Japan", "Sydney, Australia"];
//     const salaries = ["50,000", "70,000", "90,000", "110,000", "130,000"];
    
//     for (let i = 0; i < 5; i++) { // Generate 5 random jobs
//         const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
//         const company = companies[Math.floor(Math.random() * companies.length)];
//         const location = locations[Math.floor(Math.random() * locations.length)];
//         const salary = salaries[Math.floor(Math.random() * salaries.length)];

//         const jobCard = `
//             <div class="card">
//                 <p><strong>Company:</strong> ${company}</p>
//                 <p><strong>Title:</strong> ${title}</p>
//                 <p><strong>Location:</strong> ${location}</p>
//                 <p class="salary"><strong>Salary:</strong> €${salary}/year</p>
//                 <p class="description"><strong>Description:</strong> Exciting opportunity for a ${title} at ${company}.</p>
//                 <a href="#" >Click here</a>
//             </div>
//         `;
//         jobContainer.innerHTML += jobCard;
//     }
// }


    search.addEventListener('click', Getdata);