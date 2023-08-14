const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search')
const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')

let search = 1

const fetchPokemon = async (pokemom) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemom}`)
    if (APIResponse.status === 200){
        const data = await APIResponse.json()
        return data
    }
}
const renderPokemom = async (pokemom) => {
    pokemonName.innerHTML = 'Loanding...'
    pokemonNumber.innerHTML = ''
    const data = await fetchPokemon(pokemom)
    if (data) {
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']
        search = data.id
    }else {
        pokemonName.innerHTML ='Not Found :C'
        pokemonNumber.innerHTML = ''
        pokemonImage.src = ''
    }
    input.value = ''
}
form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemom(input.value.toLowerCase())
})

next.addEventListener('click', () => {
    search  += 1
    renderPokemom(search)
})
prev.addEventListener('click',() => {
    if (search > 1){
        search -= 1
        renderPokemom(search)
    }
})
renderPokemom(search)
