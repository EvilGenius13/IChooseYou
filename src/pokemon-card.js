import { LitElement, html, css } from 'lit'
import axios from 'axios'

class PokemonCard extends LitElement {
  static get properties() {
    return {
      pokemonId: { type: Number },
      pokemon: { type: Object },
    }
  };

  updated(changedProperties) {
    if (changedProperties.has('pokemonId')) {
      this.fetchPokemon();
    }
  }

  constructor() {
    super();
    this.pokemon = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchPokemon();
  }

  async fetchPokemon() {
    if (!this.pokemonId) return;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`);
      this.pokemon = response.data;
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  }

  render() {
    return html`
      <div class="pokemon-card">
        ${this.pokemon ? html`
          <h2 class="pokemon-name">${this.pokemon.name}</h2>
          <img class="pokemon-sprite" src="${this.pokemon.sprites.front_default}" alt="${this.pokemon.name}" />
          <div class="pokemon-types">
            ${this.pokemon.types.map(typeInfo => html`
              <span class="pokemon-type ${typeInfo.type.name}">${typeInfo.type.name}</span>
            `)}
          </div>
        ` : html`<p>Loading...</p>`}
      </div>
    `;
  }

  static get styles() {
    return css`
      @import url('https://fonts.cdnfonts.com/css/pokemon-solid');

      .pokemon-card {
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      background-color: white;
      font-family: sans-serif;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      will-change: transform, box-shadow;
      animation: fadeIn 0.5s ease-out;
      min-width: 125px;
      border: 2px solid #e0e0e0;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
    }

    .pokemon-card:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .pokemon-name {
    font-size: 1.2em;
    margin: 0 0 20px 0;
    color: #333;
    text-transform: capitalize;
    font-family: 'Pokemon Solid', sans-serif;
    }

    .pokemon-id {
      font-size: 0.9em;
      color: #666;
    }

    .pokemon-sprite {
      max-width: 100%;
      height: auto;
      margin-bottom: 20px;
    }

    .pokemon-types {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    }

    .pokemon-type {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 5px;
      color: white;
      font-size: 0.8em;
      text-transform: capitalize;
    }
    /* Type-specific background colors */
    .pokemon-type.normal { background-color: #A8A77A; }
    .pokemon-type.fire { background-color: #EE8130; }
    .pokemon-type.water { background-color: #6390F0; }
    .pokemon-type.electric { background-color: #F7D02C; }
    .pokemon-type.grass { background-color: #7AC74C; }
    .pokemon-type.ice { background-color: #96D9D6; }
    .pokemon-type.fighting { background-color: #C22E28; }
    .pokemon-type.poison { background-color: #A33EA1; }
    .pokemon-type.ground { background-color: #E2BF65; }
    .pokemon-type.flying { background-color: #A98FF3; }
    .pokemon-type.psychic { background-color: #F95587; }
    .pokemon-type.bug { background-color: #A6B91A; }
    .pokemon-type.rock { background-color: #B6A136; }
    .pokemon-type.ghost { background-color: #735797; }
    .pokemon-type.dragon { background-color: #6F35FC; }
    .pokemon-type.dark { background-color: #705746; }
    .pokemon-type.steel { background-color: #B7B7CE; }
    .pokemon-type.fairy { background-color: #D685AD; }

    @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 600px) {
    .pokemon-card {
      width: 100%;
      }
    }
    `;
  }
}

customElements.define('pokemon-card', PokemonCard);