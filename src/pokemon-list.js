import { LitElement, html, css } from "lit";
import './pokemon-card.js'

class PokemonList extends LitElement {
  static get properties() {
    return {
      pokemonIds: { type: Array },
    };
  }

  constructor() {
    super();
    this.pokemonIds = this.getRandomPokemonIds(3);
  }

  getRandomPokemonIds(numberOfPokemon) {
    let ids = [];
    for (let i = 0; i < numberOfPokemon; i++) {
      ids.push(Math.floor(Math.random() * 151) + 1);
    }
    return ids;
  }

  render() {
    return html`
      <div class="pokemon-list">
        ${this.pokemonIds.map(id => html`<pokemon-card .pokemonId=${id}></pokemon-card>`)}
      </div>
    `;
  }

  static get styles() {
    return css`
      .pokemon-list {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
      animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @media (max-width: 600px) {
      .pokemon-list {
        flex-direction: column;
      }
    }
    `;
  }
}

customElements.define("pokemon-list", PokemonList);