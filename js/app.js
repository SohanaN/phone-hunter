const showPhone = document.getElementById("sn-phone");
// get phone input
const smartPhone = () => {
    const inputValue = document.getElementById("sn-search-box");
    const searchValue = inputValue.value;
    const error = document.getElementById("error");

    if ((searchValue) == "") { //Empty 
        error.innerText = "Please enter a Brand name";
        searchValue.value = "";
        showPhone.innerHTML = "";
    }
    else if ((searchValue) !== (searchValue)) {
        error.innerText = "No Phone Found";
        searchValue.value = "";
        showPhone.innerHTML = "";
    }
    else {
        showPhone.innerHTML = "";
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
        fetch(url)
            .then((res) => res.json())
            .then((data) => showSmartPhoneDetails(data.data));
        searchValue.value = "";
        error.innerHTML = ""
    }

};
// Display phones
const showSmartPhoneDetails = (phones) => {
    const show20Phone = phones.slice(0, 20);
    for (const phone of show20Phone) {
        const div = document.createElement("div");
        div.classList.add("col-lg-4");
        div.classList.add("col-sm-12");
        div.classList.add("my-5");
        div.classList.add("d-flex");
        div.classList.add("justify-content-center");
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${phone.phone_name}</h5>
                    <h6 class="card-title">Brand: ${phone.brand}</h6>                   
                    <button onclick="phoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Details</button>
                </div>
            </div>
            `
        showPhone.appendChild(div);
    }
}
// get phone details 
const phoneDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then(data => displayPhoneDetail(data.data));
}
// show phone details 
const displayPhoneDetail = singlePhone => {
    // console.log(singlePhone);
    const showPhoneDetails = document.getElementById('sn-phone-details');
    const div = document.createElement("div");
    showPhoneDetails.innerHTML = "";
    div.classList.add("my-5");
    div.classList.add("d-flex");
    div.classList.add("justify-content-center");
    div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${singlePhone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">Name: ${singlePhone.name}</h4>
                    <h5 class="card-title">Brand: ${singlePhone.brand}</h5> 
                    <h6 class="card-title">Release Date: ${singlePhone.releaseDate}</h6> 
                    <div class="row">
                        <div class="col">
                            <h5><b>Main Features:</b></h5>
                            <p><b>Storage</b>: ${singlePhone.mainFeatures.storage}</p> 
                            <p><b>DisplaySize</b>: ${singlePhone.mainFeatures.displaySize}</p> 
                            <p><b>ChipSet</b>: ${singlePhone.mainFeatures.chipSet}</p> 
                            <p><b>Memory</b>: ${singlePhone.mainFeatures.memory}</p> 
                            <p><b>Sensors</b>: ${singlePhone.mainFeatures.sensors}</p> 
                        </div>
                        <div class="col">
                            <h5><b>Others:</b></h5>
                            <p><b>Bluetooth</b>: ${singlePhone.others.Bluetooth}</p> 
                            <p><b>GPS</b>: ${singlePhone.others.GPS}</p> 
                            <p><b>NFC</b>: ${singlePhone.others.NFC}</p> 
                            <p><b>Radio</b>: ${singlePhone.others.Radio}</p> 
                            <p><b>USB</b>: ${singlePhone.others.USB}</p> 
                            <p><b>WLAN</b>: ${singlePhone.others.WLAN}</p> 
                        </div>
                    </div
                </div>
            </div>
            `
    showPhoneDetails.appendChild(div);

}

