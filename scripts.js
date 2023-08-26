// This function updates the content of the output panel based on user input
function updatedOutput() {
    // Find the HTML content of the iframe, combining CSS and HTML inputs
    $("iframe").contents().find("html").html("<html><head><style>" + $("#cssPanel").val() + "</style></head><body>" + $("#htmlPanel").val() + "</body></html>");
    
    // Evaluate the JavaScript code in the output iframe
    document.getElementById("outputPanel").contentWindow.eval($("#javascriptPanel").val());
}

// Add hover effect to toggle buttons when the mouse enters and exits
$(".toggleButton").hover(function() {
    $(this).addClass("highlightedButton");
}, function() {
    $(this).removeClass("highlightedButton");
});

// Toggle the active state of toggle buttons when clicked
$(".toggleButton").click(function() {
    $(this).toggleClass("active");
    $(this).removeClass("highlightedButton");
    
    // Derive the panel ID from the clicked button's ID
    var panelId = $(this).attr("id") + "Panel";
    
    // Toggle the hidden class of the corresponding panel
    $("#" + panelId).toggleClass("hidden");
    
    // Calculate the number of active panels and adjust panel width
    var numberOfActivePanels = 4 - $(".hidden").length;
    $(".panel").width(($(window).width() / numberOfActivePanels) - 10);
});

// Set the height of textarea based on window dimensions and top bar height
$("textarea").height($(window).height() - $("#top-bar").height() - 52);

// Set the width of the output panel as half of the window width
$("#outputPanel").width(($(window).width() / 2));

// Set the height of the output panel based on window dimensions and top bar height
$("#outputPanel").height($(window).height() - $("#top-bar").height() - 15);

// Call the updatedOutput function to initialize the output
updatedOutput();

// Bind the change, keyup, and paste events of textarea to the updatedOutput function
$("textarea").on('change keyup paste', function() {
    updatedOutput();
});
