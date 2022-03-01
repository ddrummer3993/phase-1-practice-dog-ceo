console.log('%c HI', 'color: firebrick')

//fetch images upon page load

document.addEventListener('DOMContentLoaded', fetchImages());

function fetchImages() {
    return fetch ("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(data => {
        const imgArray = data.message
        postImages(imgArray)
    });
}

function postImages(imageData) {
    imageData.forEach(imageUrl => {
        image = document.createElement('img');
        image.src = imageUrl;
        document.querySelector('#dog-image-container').appendChild(image);
    });
};

//fetch dog breeds on page load

document.addEventListener("DOMContentLoaded", fetchDogBreeds());

function fetchDogBreeds() {
    return fetch ('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(data => {
        const breedData = data.message
        //console.log(breedData);
        let breedArray = makeDogBreedsArray(breedData);
        //console.log(breedArray)
        postDogBreeds(breedArray);
        filterBreeds(breedArray);
        handleBreedClick();
    })
};

function makeDogBreedsArray(breedObj) {
    let breedArray = [];
    for (const breedKey in breedObj) {
        const breedValue = breedObj[breedKey];
        if (breedValue.length === 0) {
            let breedElement = `${breedKey}` 
            breedArray.push(breedElement);
        } else {
            for (const breedSpec of breedValue) {
                let breedElement = `${breedSpec} ${breedKey}`;
                breedArray.push(breedElement);
            }
        }
    }
    return breedArray;
};

function postDogBreeds(breedArray) {
    for (const breed of breedArray) {
        let breedLi = document.createElement('li');
        breedLi.innerText = `${breed}`
        document.querySelector('#dog-breeds').appendChild(breedLi);
    };
};


// create change color of <li> upon click

function handleBreedClick() {
    let dogBreedLi = document.querySelector('#dog-breeds').children;
    for (const liElement of dogBreedLi) {
        liElement.addEventListener('click', () => {
            liElement.style.color = 'red';
        })
    } 
}

// create filter breeds via dropdown

function filterBreeds(breedArray) {
    const dropDown = document.querySelector('#breed-dropdown')
    dropDown.addEventListener('change', () => {
        let selection = dropDown.value;
        let newArray = [];
        let breedList = document.querySelector('#dog-breeds');
        while (breedList.firstChild) breedList.removeChild(breedList.firstChild);
        for (const breed of breedArray) {
            if (breed[0] === selection) {
                newArray.push(breed);
            }
        }
        postDogBreeds(newArray);
        handleBreedClick();               
    })
};                      
                        

//instead of trying to work off a variable represeneting an imported list, why cant we use a db.json?
//what is the best way to access a <ul> that was created via JS and does not exist in the original HTML file?
//can we call fetch again to grab the same info?





/*function postDogBreeds(breedObj) {
    const breedList = document.querySelector('#dog-breeds')
    for (const breedKey in breedObj) {
        const breedArray = breedObj[breedKey]
        if (breedArray.length === 0) {
            let breedLi = document.createElement('li');
            breedLi.innerText = `${breedKey}`
            breedList.appendChild(breedLi);
        }else {
            for (const breedSpec of breedArray) {
                let breedLi = document.createElement('li');
                breedLi.innerText = `${breedSpec} ${breedKey}`
                breedList.appendChild(breedLi);
            }
        }
    }
    console.log(breedList)
    handleBreedClick(breedList);
    filterBreeds(breedObj);
}*/




                        