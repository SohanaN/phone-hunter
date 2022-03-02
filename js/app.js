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
// show phone 
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
// show phone details 
const phoneDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then(data => displayPhoneDetail(data.data));
}
const displayPhoneDetail = singlePhone => {
    console.log(singlePhone);

    const div = document.createElement("div");
    showPhone.innerHTML = "";
    div.classList.add("my-5");
    div.classList.add("d-flex");
    div.classList.add("justify-content-center");
    div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${singlePhone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${singlePhone.name}</h5>
                    <h6 class="card-title">Brand: ${singlePhone.brand}</h6> 
                    <span> Main Features:</span>
                    <p class="card-text">storage: ${singlePhone.mainFeatures.storage}</p> 
                    <p class="card-text">displaySize: ${singlePhone.mainFeatures.displaySize}</p> 
                </div>
            </div>
            `
    showPhone.appendChild(div);

}

