const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];

window.onload=function(){

    for (let w = 0; w < countries.length; w++) {

        let div0 = document.createElement("div");
        div0.className = "item";
        let div1 = document.getElementsByClassName("flex-container justify")[0];
        div1.appendChild(div0);

        let h2 = document.createElement("h2");
        let h2value = document.createTextNode(countries[w].name);
        h2.appendChild(h2value);
        div0.appendChild(h2);
        let h3 = document.createElement("h3");
        let h3value = document.createTextNode(countries[w].continent);
        h3.appendChild(h3value);
        div0.appendChild(h3);

        let cities = document.createElement("div");
        cities.className = "inner-box";
        let cityTitle = document.createElement("h3");
        cityTitle.appendChild(document.createTextNode("Cities"));
        cities.appendChild(cityTitle);


        for (i in countries[w].cities) {
            let cityName = document.createElement("p");
            cityName.appendChild(document.createTextNode(countries[w].cities[i]));
            cities.appendChild(cityName);
        }

        div0.appendChild(cities);

        let photos = document.createElement("div");
        photos.className = "inner-box";
        let photosTitle = document.createElement("h3");
        photosTitle.appendChild(document.createTextNode("Popular Photos"));
        photos.appendChild(photosTitle);

        for (j in countries[w].photos) {
            let photo = document.createElement("img");
            photo.className = "photo";
            photo.src = "images/" + countries[w].photos[j];
            photos.appendChild(photo);
        }
        div0.appendChild(photos);

        let bt = document.createElement("button");
        bt.appendChild(document.createTextNode("Visit"));
        div0.appendChild(bt);

    }
}