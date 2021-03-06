const showPhone = document.getElementById("sn-phone");
const showPhoneDetails = document.getElementById('sn-phone-details');
const error = document.getElementById("error");
const toggoleSpinner = displayStyle => {
    document.getElementById('sn-spinner').style.display = displayStyle;
}

// get phone input
const smartPhone = () => {
    const inputValue = document.getElementById("sn-search-box");
    const searchValue = inputValue.value;
    // display spinner
    toggoleSpinner('block');
    // error message validation
    if ((searchValue) == "") { //Check Empty Value
        error.innerText = "Please Enter a Phone Name";
        showPhoneDetails.textContent = "";
        searchValue.value = "";
        showPhone.textContent = "";
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
        fetch(url)
            .then((res) => res.json())
            .then((data) => showSmartPhoneResult(data.data));
        //  clear data 
        showPhone.textContent = "";
        showPhoneDetails.textContent = "";
        searchValue.value = "";
        error.textContent = ""
    }
};

// Display phones
const showSmartPhoneResult = phones => {
    //check phone name 
    if (phones.length == 0) {
        error.innerText = "No Phone Found";
    }
    // show 20 phone 
    const show20Phone = phones.slice(0, 20)
    show20Phone?.forEach(phone => {
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
    });
    toggoleSpinner('none');
}

// get phone details 
const phoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data)
}

// show phone details 
const displayPhoneDetail = singlePhoneDetails => {
    showPhoneDetails.scrollIntoView();
    const div = document.createElement("div");
    showPhoneDetails.textContent = "";
    div.classList.add("d-flex");
    div.classList.add("justify-content-center");
    div.classList.add("mx-auto");
    div.innerHTML = `
            <div class="card" >
                <img src="${singlePhoneDetails?.image}" class="mx-auto my-2" alt="...">
                <div class="card-body">
                    <h4 class="card-title">
                        <span>Name: ${singlePhoneDetails?.name} || </span>
                        <span>Brand: ${singlePhoneDetails?.brand} </span>
                    </h4>
                    <p>Release Date: ${singlePhoneDetails.releaseDate ? singlePhoneDetails.releaseDate : 'No Release Date Found'}</p>
                    <h4 id="error-text" class="text-danger text-center"></h4>
                    <div class="row">
                        <div class="col">
                            <h5><b>Main Features:</b></h5>
                            <p><b>Storage</b>:
                            ${singlePhoneDetails.mainFeatures?.storage ? singlePhoneDetails.mainFeatures?.storage : 'No'}  
                            </p>                         
                            <p><b>DisplaySize</b>:
                            ${singlePhoneDetails.mainFeatures?.displaySize ? singlePhoneDetails.mainFeatures?.displaySize : 'No'}
                            </p>  
                            <p><b>ChipSet</b>:
                            ${singlePhoneDetails.mainFeatures?.chipSet ? singlePhoneDetails.mainFeatures?.chipSet : 'No'}
                            </p> 
                            <p><b>Memory</b>:
                            ${singlePhoneDetails.mainFeatures?.memory ? singlePhoneDetails.mainFeatures?.memory : 'No'}
                            </p> 
                            <p><b>Sensors</b>: 
                            ${singlePhoneDetails.mainFeatures?.sensors ? singlePhoneDetails.mainFeatures?.sensors : 'No'}</p>                                                        
                        </div>
                        <div class="col">
                            <h5><b>Others:</b></h5>
                            <p><b>Bluetooth</b>:
                            ${singlePhoneDetails.others?.Bluetooth ? singlePhoneDetails.others?.Bluetooth : 'No'}
                             </p> 
                            <p><b>GPS</b>:
                            ${singlePhoneDetails.others?.GPS ? singlePhoneDetails.others?.GPS : 'No'}
                            </p> 
                            <p><b>NFC</b>:
                            ${singlePhoneDetails.others?.NFC ? singlePhoneDetails.others?.NFC : 'No'}
                            </p> 
                            <p><b>Radio</b>:
                             ${singlePhoneDetails.others?.Radio ? singlePhoneDetails.others?.Radio : 'No'}
                            <p><b>USB</b>:
                             ${singlePhoneDetails.others?.USB ? singlePhoneDetails.others?.USB : 'No'}
                            <p><b>WLAN</b>:
                             ${singlePhoneDetails.others?.WLAN ? singlePhoneDetails.others?.WLAN : 'No'}
                        </div>
                    </div
                </div>
            </div>
            `
    showPhoneDetails.appendChild(div);
}

