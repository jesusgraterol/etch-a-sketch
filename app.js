/**
 * App
 * The following class implements the Etch-a-Sketch Project and supports multiple modes.
 */
class App {
    // Configuration
    #mode; // "color|rainbow|eraser"
    #color_mode_button_el;
    #rainbow_mode_button_el;
    #eraser_mode_button_el;

    // Clear
    #clear_button_el;

    // Size
    #sketch_pad_size_el;
    #sketch_pad_size_text_el;
    #rows = 16;
    #cols = 16;

    // Sketch Pad
    #primary_color = "#312e2e";
    #drawing = false;
    #sketch_pad_container;

    constructor () {
        // Initialize the mode buttons & activate the default
        this.#color_mode_button_el = document.getElementById("color_mode_button");
        this.#rainbow_mode_button_el = document.getElementById("rainbow_mode_button");
        this.#eraser_mode_button_el = document.getElementById("eraser_mode_button");
        this.#activate_mode("color");

        // Subscribe to the modes' click events
        this.#color_mode_button_el.addEventListener("click", () => this.#activate_mode("color"));
        this.#rainbow_mode_button_el.addEventListener("click", () => this.#activate_mode("rainbow"));
        this.#eraser_mode_button_el.addEventListener("click", () => this.#activate_mode("eraser"));

        // Initialize the reset button and subscribe to its events
        this.#clear_button_el = document.getElementById("clear_button");
        this.#clear_button_el.addEventListener("click", () => this.#build_sketch_pad())

        // Initialize the sketch pad size elements and subscribe to changes
        this.#sketch_pad_size_el = document.getElementById("sketch_pad_size");
        this.#sketch_pad_size_text_el = document.getElementById("sketch_pad_size_text");
        this.#sketch_pad_size_el.addEventListener("input", (e) => {
            const size = Number(e.target.value);
            this.#rows = size;
            this.#cols = size;
            this.#build_sketch_pad();
        });

        // Initialize the sketch pad element
        this.#sketch_pad_container = document.getElementById("sketch_pad_container");
        this.#sketch_pad_container.addEventListener("mousedown", (e) => this.#drawing = true );
        this.#sketch_pad_container.addEventListener("mousemove", (e) => this.#draw(e));
        this.#sketch_pad_container.addEventListener("mouseup", (e) => this.#drawing = false );
        
        // Build the sketch pad container
        this.#build_sketch_pad();
    }






    /***************************
     * SKETCHPAD CONFIGURATION *
     ***************************/



    /**
     * Activates a given mode and handles the deactivation & activation of the button element.
     * @param {*} mode 
     */
    #activate_mode(mode) {
        // Only activate the mode if it is different to the current one
        if (mode != this.#mode) {
            // Set the new mode
            this.#mode = mode;

            // Remove the active class from all the mode buttons
            this.#color_mode_button_el.classList.remove("active");
            this.#rainbow_mode_button_el.classList.remove("active");
            this.#eraser_mode_button_el.classList.remove("active");

            // Activate the mode button
            switch (mode) {
                case "color":
                    this.#color_mode_button_el.classList.add("active");
                    break;
                case "rainbow":
                    this.#rainbow_mode_button_el.classList.add("active");
                    break;
                case "eraser":
                    this.#eraser_mode_button_el.classList.add("active");
                    break;
            }
        }
    }



    /**
     * Puts together the size of the pad in string format.
     * @returns string
     */
    #get_sketch_pad_size_text() { return `${this.#rows} x ${this.#cols}` }













    /********************
     * SKETCH PAD BUILD *
     ********************/




    /**
     * Builds the Sketch Pad based on the current configuration. 
     */
    #build_sketch_pad() {
        // Initialize the rows & columns container
        let content = "";

        // Iterate according to the current rows and cols updating the content
        for (let i_row = 0; i_row < this.#rows; i_row++) {
            let row = "<div class='row'>";
            for (let i_col = 0; i_col < this.#cols; i_col++) row += "<div class='col'></div>";
            row += "</div>";
            content += row;
        }

        // Set the size of the sketch pad
        this.#sketch_pad_size_text_el.innerText = this.#get_sketch_pad_size_text();

        // Finaly, set the content on the element
        this.#sketch_pad_container.innerHTML = content;
    }











    /*********************
     * SKETCHPAD DRAWING *
     *********************/




    /**
     * Draws on the sketchpad based on the active mode
     * @param e 
     */
    #draw(e) { if (this.#drawing) e.target.style.backgroundColor = this.#get_color() }


    /**
     * Derives the color to be used based on the mode.
     * @returns string
     */
    #get_color() {
        switch (this.#mode) {
            case "color":
                return this.#primary_color;
            case "rainbow":
                return this.#generate_random_color();
            case "eraser":
                return "#FFFFFF";
        }
    }


    /**
     * Generates a random hexadecimal color.
     * @returns string
     */
    #generate_random_color() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}




/**
 * App Initializer
 * Initializes the instance of the application once the HTML has been put together.
 * DO NOT MODIFY THIS CODE
 */
const app = new App();