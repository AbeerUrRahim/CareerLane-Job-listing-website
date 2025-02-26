const appId = "83fc6d81"; 
const appKey = "b9e30bb4dc0fc4e6f5695938a907227e"; 
let country = ""; 
// let searchQuery = document.querySelector('.input'); 
 let searchQuery = document.querySelector('.input'); 
// let Title=searchQuery.value
const jobLocation = "London"; 
let selectCountry= document.querySelector("#country_selection")

let country_Option= document.querySelectorAll('option')
function getCountry(event){
  country= event.target.value
  // console.log(Title)
  console.log("country is: "+country)
}
selectCountry.addEventListener('change',getCountry)

let search = document.querySelector('.search')


async function Getdata() {
  try {
    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(searchQuery.value)}&where=${encodeURIComponent(jobLocation)}&results_per_page=10`;
    let jobData = await fetch(url);
    // console.log(Title)
    let parsedData = await jobData.json();
    console.log(parsedData);

    let cards = document.querySelector('.cards');

    function displayCards(parsedData) {
      if (!parsedData.results || parsedData.results.length === 0) {
        cards.innerHTML = "<p>No job listings found.</p>";
        return;
      }
      
      let cardsData = parsedData.results.map(job => ({
        name: job.company?.display_name || "N/A",
        title: job.title || "N/A",
        Locationjob: job.location.display_name || "N/A",
        salary: job.salary_max|| "",
        contract:job.contract_type||"N/A",
        created:job.created ||"",
        description:job.description ||"",
        redirect_Url:job.redirect_url
        
      }));
      const date=new Date(cardsData.created)
      let dateLocal= date.toLocaleString()
      let jobCards = document.querySelectorAll('.card');

      // Select popup elements
      let popupCard = document.querySelector('.card2_container');
      let overlay = document.querySelector('#overlay'); 
      let closeButton = document.querySelector('#closeBtn');
      let jobCards_container=document.querySelector('.cards')
      
      // Add click event to each job card
          jobCards_container.addEventListener('click', (event) => {
            let clickedCard=event.target.closest('.card')
           
            // if(!clickedCard)return;
            let companyName = clickedCard.name;
            console.log(companyName)
    let title = clickedCard.dataset.title;
    let location = clickedCard.dataset.location;
    let salary = clickedCard.dataset.salary;
    let description = clickedCard.dataset.description;
    let jobLink = clickedCard.dataset.url;

    // Update popup content
    document.getElementById('company').textContent = companyName;
    document.getElementById('title').textContent = title;
    document.getElementById('location').textContent = location;
    document.getElementById('salary').textContent = salary;
    document.getElementById('description').textContent = description;
    document.getElementById('jobLink').href = jobLink;

              popupCard.style.display = "flex"; // Show the popup
              overlay.style.display = "block"; // Show overlay
              
          });
      
      // Close popup when clicking outside or on the button
      function closePopup() {
          popupCard.style.display = "none";
          overlay.style.display = "none";
      }
      overlay.addEventListener('click', closePopup);
      let maps = cardsData.map(({ name, title ,Locationjob,salary,contract,dateLocal,description,redirect_Url}) => 
        `<div class="card">
          <p><strong>Company:</strong> ${name}</p>
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Locationjob:</strong> ${Locationjob}</p>
          <p class="salary"><strong>salary:</strong> €${salary}/year</p>
          
          <p class="description"><strong>description:</strong > ${description}</p>
          <a href="${redirect_Url}">click here</a>
        </div>`
      ).join("");

      cards.innerHTML = maps;
    }

    displayCards(parsedData);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
}

// Example: Call with your API URL
// Getdata(url);
// Select all job cards

// closeButton.addEventListener('click', closePopup);

search.addEventListener('click',Getdata)
