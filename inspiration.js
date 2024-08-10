getInspirationData()

async function getInspirationData(){
  try{
    const response = await fetch('inspiration.json')
    const data = await response.json()

    displayData(data)


  } catch(error) {
    console.error("Fehler beim Abrufen der Daten:", error); // Fehler
  }
}

function displayData(inspirations) {
  const inspirationContainer = document.createElement('section')
  inspirationContainer.classList.add('inspiration-container')

  inspirations.forEach(inspiration => {
    const template = `
    <div class="inspiration">
  <h2>Title: ${inspiration.title}</h2>
  <img src="${inspiration.thumbnail}" alt="${inspiration.title}">
  <p>Idee: ${inspiration.body}</p>
  <p>Material: ${inspiration.material}</p>
  <p>Verwendung: ${inspiration.use}</p>
  <p>Entstehung: ${inspiration.year}</p>
</div>
    `

    inspirationContainer.innerHTML += template
  })

  document.querySelector('.inspiration-content').innerText= ''
  document.querySelector('.inspiration-content').appendChild(inspirationContainer)

}
