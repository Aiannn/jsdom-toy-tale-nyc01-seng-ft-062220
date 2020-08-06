let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyDiv = document.getElementById('toy-collection')
  const toyName = document.querySelector('.add-toy-form')[0]
  const toyImage = document.querySelector('.add-toy-form')[1]
  const toysUrl = "http://localhost:3000/toys"
  const likeButton = document.getElementsByClassName("like-btn")
  

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
      toyCard.dataset.id = toy.id 
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
  
    const name = e.target[0].value
    const image = e.target[1].value 
    newToy(name, image)
    

  function newToy(name, image) {
    fetch(toysUrl, {
      method: "POST",
      body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
      }),
      headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
      }
  })
  .then(response => response.json())
  .then(toy => renderToy(toy));
  }
  })

  document.addEventListener('click', function(e) {
    if (e.target.className === "like-btn") {
      let el = event.target.parentElement
      let p = el.childNodes[4]
      console.log(p)
      p.innerText = `${parseInt(p.innerText) + 1} likes`
      //debugger;
    }
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
})