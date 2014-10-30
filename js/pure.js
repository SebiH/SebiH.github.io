(function (window, document) {

    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink'),
        menuTitle = document.getElementById('menuTitle'),
        menuIcons = document.getElementById('iconPanel');

    var menuClicked = false;

    var contentRule = "#maincontent { padding-left: 230px; }";
    var offsetAdded = false;

    function addOffset() {
        if(!offsetAdded)
            document.styleSheets[0].insertRule(contentRule);
        offsetAdded = true;
    }

    function removeOffset() {
        document.styleSheets[0].removeRule(contentRule);
        offsetAdded = false;
    }

    function toggleOffset() {
        document.styleSheets[0].removeRule(contentRule);
        if (!offsetAdded)
            document.styleSheets[0].insertRule(contentRule);

        offsetAdded = !offsetAdded;
    }

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
        toggleOffset();
    }

    function addClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        // The className is not found
        if (classes.indexOf(className) < 0) {
            classes.push(className);
        }

        element.className = classes.join(' ');
        addOffset();
    }

    function removeClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }

        element.className = classes.join(' ');
        removeOffset();
    }

    menuLink.onclick = function (e) {
        var active = 'active';
        // prevent resizing events from opening / closing menu
        menuClicked = true;

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
        toggleClass(menuTitle, active);
        toggleClass(menuIcons, active);
    };

    function setCorrectMenuStatus() {
        if (menuClicked)
            return;

        var active = 'active';

        if (window.innerWidth > 1000) {
            addClass(layout, active);
            addClass(menu, active);
            addClass(menuLink, active);
            addClass(menuTitle, active);
            addClass(menuIcons, active);
        } else {
            removeClass(layout, active);
            removeClass(menu, active);
            removeClass(menuLink, active);
            removeClass(menuTitle, active);
            removeClass(menuIcons, active);
        }
    }

    window.onresize = setCorrectMenuStatus;

    window.onload = setCorrectMenuStatus;

}(this, this.document));
