
/**
 * Task class
 * 
 * @param {String} name 
 * @param {String} category 
 * @param {Number} latitude 
 * @param {Number} longitude 
 */

function Task(name, category, latitude, longitude) {
    // decided that proper id validation is not priority in this case
    this.id = Math.floor(Math.random() * 9999) + 1; 
    this.name = name;
    this.category = category;
    this.latitude = latitude;
    this.longitude = longitude;
    alert('Task "' + name + '" has been added!');
}

