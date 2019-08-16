/*
* The Client
*/
class Client {
	/*
	* The constructor for a new client.
	*/
	constructor() {
		this.id = this.generateID();
		this.color = this.generateColor();
	}

	/*
	* Generate a unique ID.
	*/
	generateID() {
		return '_' + Math.random().toString(36).substr(2, 9);
	}

	/*
	* Generate a random HEX color.
	*/
	generateColor() {
    	let color = '#';
    	let letters = "0123456789ABCDEF";
	    for (let i = 0; i < 6; i++)
    	   color += letters[(Math.floor(Math.random() * 16))];

    	return color;
	}
}

module.exports = Client;