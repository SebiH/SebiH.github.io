var currentActiveSite;
var fadeTime = 400;

// number of currently active content container 
var ccNumber = '0';
var loadInProgress = false;

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
    if (site == currentActiveSite || loadInProgress)
        return;

    loadInProgress = true;

    // unload current content container
    $('#loadingcontainer').fadeIn(fadeTime/2);
    var oldContainer = getActiveCC();
    oldContainer.fadeOut(fadeTime, function() { oldContainer.html(' '); });

    // begin loading into new container while old content fades out
    switchccNumber();

    $.ajax({
        url: 'scripts/loadSite.php',

        data: {
            sitename: site,
            format: 'json'
        },

        error: function() {
            getActiveCC().html('<div id="maincontent" class="vcenter-container"> <p class="vcenter header">An error has occurred =(</p></div>');
            setActiveMenu('');
        },

        dataType: 'json',

        success: function(data) {
            if (data.error != null)
            {
                getActiveCC().html(data.error);
                setActiveMenu('');
            }
            else
            {
                getActiveCC().html(data.result);
                setActiveMenu(site);
            }
        },

        complete: function(jqXHR, textstatus)
        {
            $('#loadingcontainer').fadeOut(fadeTime/2);
            getActiveCC().fadeIn(fadeTime);
            loadInProgress = false;

        },

        type: 'POST'
    });
}

// returns active content container
function getActiveCC()
{
    return $('#contentcontainer'.concat(ccNumber));
}

function switchccNumber()
{
    if (ccNumber == '0')
        ccNumber = '1';
    else
        ccNumber = '0';
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
