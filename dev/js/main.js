// Initialize tooltip component
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

// Initialize popover component
$(function () {
    $('[data-toggle="popover"]').popover()
})

$("[data-toggle=popover]").popover({
    html: true,
    content: function () {
        return $('#popover-content1').html();
    }
});
