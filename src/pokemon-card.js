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
          <h2>${this.pokemon.name}</h2>
          <img src="${this.pokemon.sprites.front_default}" alt="${this.pokemon.name}" />
          <!-- Add more Pokémon details here -->
        ` : html`<p>Loading...</p>`}
      </div>
    `;
  }

  static get styles() {
    return css`
      .pokemon-card {
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      text-align: center;
      background-color: white;
      transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
      color: black;
    }

    .pokemon-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .pokemon-card img {
      max-width: 100%;
      height: auto;
      border-radius: 5px;
    }
    `;
  }
}

customElements.define('pokemon-card', PokemonCard);