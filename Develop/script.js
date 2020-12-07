//JS logic for a delete notes button

$("#delete-btn").click(function () { 
    const searchTerm = $("character-search").val(); 
    $.ajax({
        url: `/${searchTerm}`, 
        method: "delete", 
    }).then(console.log); 
});