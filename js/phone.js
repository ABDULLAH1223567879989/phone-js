const loadPhone = async (searchText, isShowAll) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container card before adding new cards
    phoneContainer.innerHTML = '';

    // display show all button if there are more than 12 phn

    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden');

    }
    else{
      showAllContainer.classList.add('hidden');
    }

    console.log('is show all', isShowAll);
    // display only first 12 phn if not show all
    if(!isShowAll){
      phones = phones.slice(0,12);
    }
   
    

    phones.forEach(phone => {
        // console.log(phone);
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
        // 3. set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')"
             class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        // 4. append child
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    loadingDots(false);
}

// 
const handleShowDetail = async (id) =>{
  console.log('click show details', id);
  // load single phn data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();

  const phone = data.data;

  showPhoneDetails(phone);

  
}

const showPhoneDetails =(phone) =>{
  console.log(phone);
  const phoneName = document.getElementById('show-phone-name')
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container')
  showDetailContainer.innerHTML = `
  
  <img src="${phone.image}" alt="" />
  <p><span>storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>Display:</span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>Memory:</span>${phone?.mainFeatures?.memory}</p>

  `
  //  show the model
  show_details_modal_.showModal();
}


// handle search button
const handleSearch = (isShowAll) =>{
  loadingDots(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value 
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}


const loadingDots = (isLoading) =>{
  const loading = document.getElementById('loading')
  if(isLoading){
    loading.classList.remove('hidden')
  }
  else{
    loading.classList.add('hidden')
  }

}

// handle show all
const handleShowAll = () =>{
  handleSearch(true);
}

// loadPhone();