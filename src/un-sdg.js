import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class unSdg extends DDDSuper(LitElement) {

  static get tag() {
    return "un-sdg";
  }

  // Store alt texts for each goal in static object
  static goalAltTexts = {
    circle: "Sustainable Development Goals (SDG) logo",
    all:    "All goals",
    1:      "Goal 1: No Poverty",
    2:      "Goal 2: Zero Hunger",
    3:      "Goal 3: Good Health and Well-Being",
    4:      "Goal 4: Quality Education",
    5:      "Goal 5: Gender Equality",
    6:      "Goal 6: Clean Water and Sanitation",
    7:      "Goal 7: Affordable and Clean Energy",
    8:      "Goal 8: Decent Work and Economic Growth",
    9:      "Goal 9: Industry, Innovation and Infrastructure",
    10:     "Goal 10: Reduced Inequalities",
    11:     "Goal 11: Sustainable Cities and Communities",
    12:     "Goal 12: Responsible Consumption and Production",
    13:     "Goal 13: Climate Action",
    14:     "Goal 14: Life Below Water",
    15:     "Goal 15: Life on Land",
    16:     "Goal 16: Peace, Justice and Strong Institutions",
    17:     "Goal 17: Partnerships for the Goals",
  }

  // Initialize properties for instance of class
  constructor() {
    super();
    this.goal = "circle"; // Updates image, alt text, and background color to respective goal
    this.label = unSdg.goalAltTexts[this.goal]; // Indexes static object for current goal's alt text
    this.imgSrc = ""; // Stores image path to be accessed from updated()
    this.width = "254px";
    this.height = "254px";
    this.loading = "lazy"; // "lazy" defers loading image until on-screen; "eager" loads image immediately
    this.fetchPriority = "low"; // Determines order of importance in loading images (high/low/auto)
    this.colorOnly = false; // If true, display only the div without the image and text
  }

  // Specify property types
  static get properties() {
    return {
      goal: { type: String, },
      label: { type: String },
      imgSrc: { type: String },
      width: { type: String },
      height: { type: String },
      loading: { type: String },
      fetchPriority: { type: String },
      colorOnly: { type: Boolean },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        background-color: white;
        
        /* Width and height variables for adjusting scale of wrapper */
        width: var(--width, 254px);
        height: var(--height, 254px);

        /* Color variables */
        --un-sdg-goal-1:  #EB1C2C;
        --un-sdg-goal-2:  #D2A02A;
        --un-sdg-goal-3:  #2C9B48;
        --un-sdg-goal-4:  #C21F33;
        --un-sdg-goal-5:  #EF402A;
        --un-sdg-goal-6:  #00ADD8;
        --un-sdg-goal-7:  #FDB713;
        --un-sdg-goal-8:  #8F1737;
        --un-sdg-goal-9:  #F36D24;
        --un-sdg-goal-10: #E01583;
        --un-sdg-goal-11: #F99D25;
        --un-sdg-goal-12: #CF8D2A;
        --un-sdg-goal-13: #48773D;
        --un-sdg-goal-14: #007DBB;
        --un-sdg-goal-15: #3FAF49;
        --un-sdg-goal-16: #01558A;
        --un-sdg-goal-17: #193667;
      }

      /* Div used for displaying background color */
      .wrapper {
        width: var(--width, 254px);
        height: var(--height, 254px);
        padding: 0;
        margin: 0;
      }

      /* Scale image to fit uniform in wrapper div */
      img {
        width: 100%;
        height: 100%;
      }
    `];
  }

  // Updated method for modifying alt text/image when goal attribute is changed
  updated(changedProperties) {
    if (changedProperties.has('goal')) { // If goal is a changed property
      this.label = unSdg.goalAltTexts[this.goal]; // Index static object with updated goal attribute
      this.imgSrc = new URL(`../lib/svgs/${this.goal}.svg`, import.meta.url).href; // Index svg library with updated goal attribute
    }
  }

  // Render method for displaying web component
  render() {
    return html`
      <!-- Update wrapper dimensions -->
      <style>
        :host {
          --width: ${this.width};
          --height: ${this.height};
        }
      </style>

      <!-- Create wrapper div with background color based on goal attribute -->
      <div class="wrapper" style="background-color: var(--un-sdg-goal-${this.goal});">
        <!-- Ternary operator: Only create and display the image if colorOnly is false -->
        ${this.colorOnly ? `` : 
          html `
            <img 
              src="${this.imgSrc}"
              alt="${this.label}"
              loading="${this.loading}"
              fetchpriority="${this.fetchPriority}"
            />
        `}
      </div>
    `;
  }

  // haxProperties integration via file reference
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(unSdg.tag, unSdg);