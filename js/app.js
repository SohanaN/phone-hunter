const smartPhone = () => {
    const searchValue = document.getElementById("sn-search-box").value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => console.log(data));
    console.log(url);
}