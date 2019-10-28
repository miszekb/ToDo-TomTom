//Task Container class

function TaskContainer() {
    this.container = [];
}

TaskContainer.prototype.getAll = function () {
    return this.container;
}

TaskContainer.prototype.addTask = function (name, category, latitude, longitude) {
    this.container.push(new Task(name, category, latitude, longitude));
    cleanTheForm();
    this.renderAll();
}

TaskContainer.prototype.removeTask = function (id) {
    for (var i = 0; i < this.container.length; i++) {
        if (this.container[i].id === id) {
            this.container.splice(i, 1);
        }
    }
    this.renderAll();
}

TaskContainer.prototype.prepareToEdit = function (id) {

    document.getElementById('form-title').innerText = 'Edit Task';

    var editedTask = null;

    this.currentlyEditingTask = id;
    for (var i = 0; i < this.container.length; i++) {
        if (this.container[i].id === id) {
            editedTask = this.container[i];
        }
    }

    //Switch form and button name to 'Edit Task'
    var confirmEditButton = document.createElement("button");
    confirmEditButton.className = 'update-task';
    confirmEditButton.innerText = 'Confirm Edit';
    confirmEditButton.addEventListener(
        'click',
        this.editTask.bind(this, editedTask.id)
    );
    document.getElementById('button-container').innerHTML = '';
    document.getElementById('button-container').appendChild(confirmEditButton);

    //Get chosen task data to input fields
    document.getElementById("name-input").value = editedTask.name;
    document.getElementById("category-input").value = editedTask.category;
    document.getElementById("lat-input").value = editedTask.latitude;
    document.getElementById("long-input").value = editedTask.longitude;
}

TaskContainer.prototype.editTask = function (id) {
    var taskToEdit = null;

    for (var i = 0; i < this.container.length; i++) {
        if (this.container[i].id === id) {
            taskToEdit = this.container[i];
        }
    }

    taskToEdit.name = document.getElementById("name-input").value;
    taskToEdit.category = document.getElementById("category-input").value;
    taskToEdit.latitude = document.getElementById("lat-input").value;
    taskToEdit.longitude = document.getElementById("long-input").value;

    //switch to create button and clean the form
    var confirmEditButton = document.createElement("button");
    confirmEditButton.innerText = 'Create Task';
    confirmEditButton.addEventListener(
        'click',
        this.addTask.bind(this, taskToEdit.id)
    );
    document.getElementById('button-container').innerHTML = '';
    document.getElementById('button-container').appendChild(confirmEditButton);

    var taskCreateButton = document.createElement("button");
    taskCreateButton.innerText = 'Create Task';
    taskCreateButton.className = 'add-task';
    const that = this;
    taskCreateButton.addEventListener('click', function () {

        //collect data from form
        var name = document.getElementById('name-input').value;
        var category = document.getElementById('category-input').value;
        var latitude = document.getElementById('lat-input').value;
        var longitude = document.getElementById('long-input').value;

        if (!name || !category || !latitude || !longitude) {
            alert('You forgot about something!');
        }
        else {
            that.addTask(name, category, latitude, longitude);
        }
    });

    alert('Task "'+taskToEdit.name+'" has been updated!');

    document.getElementById('button-container').innerHTML = '';
    document.getElementById('button-container').appendChild(taskCreateButton);
    document.getElementById('form-title').innerText = 'New Task';

    cleanTheForm();
    this.renderAll();
}

//this function is used for refreshing tasks list
TaskContainer.prototype.renderAll = function () {
    document.getElementsByClassName('task-container')[0].innerHTML = '';
    for (var i = 0; i < this.container.length; i++) {
        var taskTemplate = document.createElement('div');
        taskTemplate.innerHTML = taskLabels
            + putDataToTaskTemplate(
                this.container[i].id,
                this.container[i].name,
                this.container[i].category,
                this.container[i].latitude,
                this.container[i].longitude
            )
            + generateTaskButtons(this.container[i].id);

        document.getElementById('tsk_cnt').appendChild(taskTemplate);

        //remove button listener
        document.getElementById(this.container[i].id).addEventListener(
            'click',
            this.removeTask.bind(this, this.container[i].id)
        );

        //edit button listener
        document.getElementById('edit' + this.container[i].id).addEventListener(
            'click',
            this.prepareToEdit.bind(this, this.container[i].id)
        );
    }
}

//New task HTML template
var MultiString = function (f) {
    return f.toString().split('\n').slice(1, -1).join('\n');
}

const taskLabels = MultiString(function () {/**
   <div class="task">
        <div class="task-labels">
            <label for="" class="task-info-label">Name:</label>
            <label for="" class="task-info-label">Category:</label>
            <label for="" class="task-info-label">Longitude:</label>
            <label for="" class="task-info-label">Latitude:</label>
        </div>
        <div class="task-info">
  **/});

function putDataToTaskTemplate(id, name, category, lat, long) {
    var templateInfo = '<p class="task-name">' + name + '</p>';
    templateInfo += '<p class="task-category">' + category + '</p>';
    templateInfo += '<p class="task-lon">' + long + '</p>';
    templateInfo += '<p class="task-lat">' + lat + '</p>';
    return templateInfo;
}

function generateTaskButtons(id) {
    var taskButtons = '</div><div class="task-buttons">';
    taskButtons += '<button class="task-button" id="' + id + '">Remove</button>';
    taskButtons += '<button class="task-button" id="edit' + id + '">Edit</button>';
    taskButtons += '</div></div>';
    return taskButtons;
}

function cleanTheForm() {
    document.getElementById("name-input").value = '';
    document.getElementById("category-input").value = '';
    document.getElementById("lat-input").value = '';
    document.getElementById("long-input").value = '';
}