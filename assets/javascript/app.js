var config = {
    apiKey: "AIzaSyAPqSLaRJuZhq68hJwGo4iIXpIVUwFJeCA",
    authDomain: "christa-s-project.firebaseapp.com",
    databaseURL: "https://christa-s-project.firebaseio.com",
    projectId: "christa-s-project",
    storageBucket: "christa-s-project.appspot.com",
    messagingSenderId: "102209623264"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-employee-btn").on("click", function (event) {
    event.preventDefault();
    console.log("employee name");
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainStart,
        frequency: trainFrequency
    };
    console.log(newTrain);
    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    // console.log(newEmp.name);
    // console.log(newEmp.role);
    // console.log(newEmp.start);
    // console.log(newEmp.rate);

    // alert("Employee successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFrequency);

    var tFrequency = trainFrequency;

    // Time is 3:30 AM
    var firstTime = trainStart;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainStart),
        $("<td>").text(trainFrequency),
        $("<td>").text(tMinutesTillTrain),
        $("<td>").text(nextTrain)

    );

    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);

    console.log("new computation");


});