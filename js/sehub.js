var currentActiveSite;

function getAnchor()
{
    var anchor = window.location.hash;
    return anchor;
}

function loadContentFromAnchor() {
    var site = window.location.hash;
    site = site.replace('#', '');
    loadContent(site);
}

function loadContent(site) {
    if (site == currentActiveSite)
        return;
    $('#contentcontainer').html('');
    $('#loadingcontainer').show();

    $.ajax({
        url: 'scripts/loadSite.php',
        data: {
            sitename: site,
            format: 'json'
        },
        error: function() {
            $('#contentcontainer').html('<div id="maincontent" class="vcenter-container"> <p class="vcenter header">An error has occurred =(</p></div>');
            setActiveMenu('');
            $('#loadingcontainer').hide();
        },
        dataType: 'json',
        success: function(data) {

            $('#loadingcontainer').hide();

            if (data.error != null)
            {
                $('#contentcontainer').html(data.error);
                setActiveMenu('');
            }
            else
            {
                $('#contentcontainer').html(data.result);
                setActiveMenu(site);
            }
        },
        type: 'POST'
    });
}

function bla(site) {

}

function setActiveMenu(site) {
    currentActiveSite = site;

    // remove active element from all classes
    var elements = $('.menu-item-link');

    for (var i = 0; i < elements.length; i++)
    {
        var element = elements[i];
        element.className = element.className.replace(/\bpure-menu-selected\b/, '').trim();

        if (site.length > 0 && element.href.indexOf(site) >= 0)
            element.className = element.className + " pure-menu-selected";
    }
}
