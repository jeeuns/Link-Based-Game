//jnitialize keyFound
let keyFound = false;

class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {

    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices && locationData.Choices.length > 0) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choice
                    this.engine.addChoice(choice.Text, choice); }
        } else {
            this.engine.addChoice("The end.");
        }
    }

    handleChoice(choice) {
        if(choice) {

            if (choice.Text == "Lick the Frosting") {
                if (!keyFound) {
                    keyFound = true;
                }
            }
            if (choice.Text == "Make your own soup!") {
                //go to soup
                this.engine.gotoScene(Soup, choice.Target);

            } else if (choice.Text == "Unlock" && !keyFound) {
                this.engine.show("The FRIDGE is LOCKED! Looks like you need a KEY.");
                this.engine.gotoScene(Location, choice.Target);
    
            } else if (keyFound && choice.Text == "Unlock") {
                this.engine.gotoScene(Location, choice.Target ="FOOD");

            } else {
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target);

               }
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

class Soup extends Location {
    create(key) {
        // Call the super create method to keep the base functionality
        super.create(key);

        // Adding custom choices for making soup
        this.engine.addChoice("Add Carrots", { Text: "Add Carrots" });
        this.engine.addChoice("Add Potatoes", { Text: "Add Potatoes" });
        this.engine.addChoice("Add Onions", { Text: "Add Onions" });
        this.engine.addChoice("Add Herbs", { Text: "Add Herbs" });
        this.engine.addChoice("Finish Making Soup", { Text: "Finish Making Soup" });
    }

    handleChoice(choice) {
        // Handle the choices based on the player's input
        if (choice) {
            switch (choice.Text) {
                case "Add Carrots":
                    this.engine.show("You add carrots to the soup.");
                    this.engine.addChoice("Add Potatoes", { Text: "Add Potatoes" });
                    this.engine.addChoice("Add Onions", { Text: "Add Onions" });
                    this.engine.addChoice("Add Herbs", { Text: "Add Herbs" });
                    this.engine.addChoice("Finish Making Soup", { Text: "Finish Making Soup" });
                    break;
                case "Add Potatoes":
                    this.engine.show("You add potatoes to the soup.");
                    this.engine.addChoice("Add Carrots", { Text: "Add Carrots" });
                    this.engine.addChoice("Add Onions", { Text: "Add Onions" });
                    this.engine.addChoice("Add Herbs", { Text: "Add Herbs" });
                    this.engine.addChoice("Finish Making Soup", { Text: "Finish Making Soup" });
                    break;
                case "Add Onions":
                    this.engine.show("You add onions to the soup.");
                    this.engine.addChoice("Add Carrots", { Text: "Add Carrots" });
                    this.engine.addChoice("Add Potatoes", { Text: "Add Potatoes" });
                    this.engine.addChoice("Add Herbs", { Text: "Add Herbs" });
                    this.engine.addChoice("Finish Making Soup", { Text: "Finish Making Soup" });
                    break;
                case "Add Herbs":
                    this.engine.show("You add herbs to the soup.");
                    this.engine.addChoice("Add Carrots", { Text: "Add Carrots" });
                    this.engine.addChoice("Add Potatoes", { Text: "Add Potatoes" });
                    this.engine.addChoice("Add Onions", { Text: "Add Onions" });
                    this.engine.addChoice("Finish Making Soup", { Text: "Finish Making Soup" });
                    break;
                case "Finish Making Soup":
                    this.engine.show("You have finished making the soup. It smells delicious!");
                    // You can navigate to another scene or end the story
                    this.engine.gotoScene(Location, choice.Target = "SOUP");
                    break;
                default:
                    // If an unexpected choice occurs, you might want to handle it
                    this.engine.show("Unexpected choice.");
            }
        }
    }
}

Engine.load(Start, 'myStory.json');