class Counter extends HTMLElement {
    css = `
    :host {
        display: block;
        max-width: 150px;
        background-color: white;
        border-radius: 4px;
        padding: 16px;
        border: 1px solid #dddddd;
        user-select: none;
    }

    .value {
        padding: 24px 0;
        text-align: center;
        font-family: sans-serif;
        font-size: 48px;
    }

    .buttons {
        display: flex;
        gap: 16px;
    }

    .button {
        flex-grow: 1;
        font-size: 24px;
        padding: 16px 0;
        background: #dddddd;
        color: #333333;
        cursor: pointer;
        outline: none;
        border: none;
        border-radius: 4px;
    }

    .button:active {
        background: #cccccc;
    }
    `
    
    template = () => {
        return `
        <div class="value">${this.value}</div>
        <div class="buttons">
            <button type="button" class="button button--decrement">-</button>
            <button type="button" class="button button--increment">+</button>
        </div>
    `;
    } 
    

    constructor() {
        super();
        
        this.value = 0;
        this.attachShadow({ mode: "open" });
        this.render();
    }
    
    render() {
        this.shadowRoot.innerHTML = `
        <style>${this.css.trim()}</style>
        ${this.template().trim()}
        `
    this.shadowRoot.querySelector(".button--increment").addEventListener("click", this.increment);
    this.shadowRoot.querySelector(".button--decrement").addEventListener("click", this.decrement);
    }

    increment = () => {
        this.value++;
        this.render();
    }
    
    decrement = () => {
        // if (this.value <= 0) {
        //     this.value = 0;
        // } else this.value--
        this.value <= 0 ? 0 : this.value--;
      
        this.render();
    }
}

class CounterTwo extends HTMLElement {

    css = `
    .container {
        display: block;
        max-width: 150px;
        background-color: white;
        border-radius: 4px;
        padding: 16px;
        border: 1px solid #dddddd;
        user-select: none;
    }

    .value {
        padding: 24px 0;
        text-align: center;
        font-family: sans-serif;
        font-size: 48px;
    }

    .buttons {
        display: flex;
        gap: 16px;
    }

    .button {
        flex-grow: 1;
        font-size: 24px;
        padding: 16px 0;
        background: #dddddd;
        color: #333333;
        cursor: pointer;
        outline: none;
        border: none;
        border-radius: 4px;
    }

    .button:active {
        background: #cccccc;
    }
    `

    template = () => {
        return `
        <div class="container">
        <div class="value">${this.value}</div>
        <div class="buttons">
            <button type="button" class="button button--decrement">-</button>
            <button type="button" class="button button--increment">+</button>
        </div>
        </div>
    `;
    }

    constructor() {
        super()

        this.value = 0;
        // this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // console.log(this.template())
        const shadow = this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>${this.css.trim()}</style>
            ${this.template().trim()}
        `
    }

}

customElements.define('counter-component', Counter)
customElements.define('counter-comp', CounterTwo)