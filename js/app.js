const showPhone = document.getElementById("sn-phone");
const smartPhone = () => {
    const searchValue = document.getElementById("sn-search-box").value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => showSmartPhoneDetails(data.data));
};
const showSmartPhoneDetails = (phones) => {
    for (const phone of phones) {
        console.log(phone);
        const div = document.createElement("div");
        div.classList.add("col-lg-4");
        div.classList.add("col-sm-12");
        div.classList.add("mb-5");
        div.classList.add("d-flex");
        div.classList.add("justify-content-center");
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${phone.phone_name}</h5>
                    <h6 class="card-title">Brand: ${phone.brand}</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Details</a>
                </div>
            </div>
            `
        showPhone.appendChild(div);
    }
}