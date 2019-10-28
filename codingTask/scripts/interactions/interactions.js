
function init() {
    //create instance of TaskContainer
    var container = new TaskContainer();

    //addTask button
    var taskCreateButton = document.getElementById("add-task");

    taskCreateButton.addEventListener('click', function () {

        //collect data from form
        var name = document.getElementById("name-input").value;
        var category = document.getElementById("category-input").value;
        var latitude = document.getElementById("lat-input").value;
        var longitude = document.getElementById("long-input").value;

        if (!name || !category || !latitude || !longitude) {
            alert("You forgot about something!");
        }
        else {
            container.addTask(name, category, latitude, longitude);
        }
    });

}


