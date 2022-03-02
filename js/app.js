const showPhone = document.getElementById("sn-phone");
const showPhoneDetails = document.getElementById('sn-phone-details');

// get phone input
const smartPhone = () => {
    const inputValue = document.getElementById("sn-search-box");
    // clear data 
    const searchValue = inputValue.value;
    // error message 
    const error = document.getElementById("error");
    if ((searchValue) == "") { //Check Empty Value
        error.innerText = "No Phone Found";
        showPhoneDetails.innerHTML = "";
        searchValue.value = "";
        showPhone.innerHTML = "";
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
        fetch(url)
            .then((res) => res.json())
            .then((data) => showSmartPhoneResult(data.data));
        //  clear data 
        showPhone.innerHTML = "";
        showPhoneDetails.innerHTML = "";
        searchValue.value = "";
        error.innerHTML = ""
    }
};
// Display phones
const showSmartPhoneResult = (phones) => {
    phones.forEach(phone => {
        const div = document.createElement("div");
        div.classList.add("col-lg-4");
        div.classList.add("col-sm-12");
        div.classList.add("my-5");
        div.classList.add("d-flex");
        div.classList.add("justify-content-center");
        div.classList.add("text-center");
        div.innerHTML = `
            <div class="card mx-auto">
                <img src="${phone?.image}" class="h-100 w-50 mx-auto my-2" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${phone?.phone_name}</h5>
                    <h6 class="card-title">Brand: ${phone?.brand}</h6>                   
                    <button onclick="phoneDetails('${phone?.slug}')" href="#" class="btn btn-primary">Details</button>
                </div>
            </div>
            `
        showPhone.appendChild(div);
    })
}
// get phone details 
const phoneDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then(data => displayPhoneDetail(data.data));
}
// show phone details 
const displayPhoneDetail = singlePhoneDetails => {
    console.log(singlePhoneDetails);
    showPhoneDetails.scrollIntoView();
    const div = document.createElement("div");
    showPhoneDetails.innerHTML = "";
    div.classList.add("d-flex");
    div.classList.add("justify-content-center");
    div.classList.add("mx-auto");
    div.innerHTML = `
            <div class="card " >
                <img src="${singlePhoneDetails?.image}" class="mx-auto my-2" alt="...">
                <div class="card-body">
                    <h4 class="card-title">
                        <span>Name: ${singlePhoneDetails?.name} || </span>
                        <span>Brand: ${singlePhoneDetails?.brand} || </span>
                    </h4>
                    <p>Release Date: ${singlePhoneDetails?.releaseDate}</p>
                    <div class="row">
                        <div class="col">
                            <h5><b>Main Features:</b></h5>
                            <p><b>Storage</b>: ${singlePhoneDetails?.mainFeatures?.storage}</p> 
                            <p><b>DisplaySize</b>: ${singlePhoneDetails?.mainFeatures?.displaySize}</p> 
                            <p><b>ChipSet</b>: ${singlePhoneDetails?.mainFeatures?.chipSet}</p> 
                            <p><b>Memory</b>: ${singlePhoneDetails?.mainFeatures?.memory}</p> 
                            <p><b>Sensors</b>: ${singlePhoneDetails?.mainFeatures?.sensors}</p> 
                        </div>
                        <div class="col">
                            <h5><b>Others:</b></h5>
                            <p><b>Bluetooth</b>: ${singlePhoneDetails?.others?.Bluetooth}</p> 
                            <p><b>GPS</b>: ${singlePhoneDetails?.others?.GPS}</p> 
                            <p><b>NFC</b>: ${singlePhoneDetails?.others?.NFC}</p> 
                            <p><b>Radio</b>: ${singlePhoneDetails?.others?.Radio}</p> 
                            <p><b>USB</b>: ${singlePhoneDetails?.others?.USB}</p> 
                            <p><b>WLAN</b>: ${singlePhoneDetails?.others?.WLAN}</p> 
                        </div>
                    </div
                </div>
            </div>
            `
    showPhoneDetails.appendChild(div);
}

