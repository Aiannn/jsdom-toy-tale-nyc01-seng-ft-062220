let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyDiv = document.getElementById('toy-collection')
  const toyName = document.querySelector('.add-toy-form')[0]
  const toyImage = document.querySelector('.add-toy-form')[1]
  const toysUrl = "http://localhost:3000/toys"
  

    const fetchToys = () => {
      fetch(toysUrl)
      .then(response => response.json())
      .then(toys => renderToys(toys))
    }

    const renderToys = (toys) => {
      toys.forEach(toy => renderToy(toy))
    }

    const renderToy = (toy) => {
      const toyCard = document.createElement('div')
      toyCard.className = 'card'
      toyCard.innerHTML =
        `<h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>`
      toyDiv.append(toyCard)
    }



  document.addEventListener('submit', function(e) {
    e.preventDefault()
    console.log(e.target)
  })


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys()
});

// When a user submits the toy form, a POST request is sent to http://localhost:3000/toys and the new toy is added to Andy's Toy Collection.
// The toy should conditionally render to the page.
// In order to send a POST request via Fetch, give the Fetch a second argument of an object. This object should specify the method 
// as POST and also provide the appropriate headers and the JSON-ified data for the request. 
// If your request isn't working, make sure your header and keys match the documentation.