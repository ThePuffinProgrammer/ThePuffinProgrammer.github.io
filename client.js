// un-obfusicated code of iready 

var arrDomain = location.hostname.split('.');
if (arrDomain.length > 2) {
    arrDomain.pop();
}
document.domain = arrDomain.join('.');

function logout() {
    setTimeout(logout_, 0);
}

function logout_() {
    try {
        if (window.opener && window.opener.location) {
            window.opener.location.href = '/logout';
        } else {
            window.location.href = '/logout';
        }
    } catch (e) {
        window.location.href = '/logout';
    }
}

function doBrowserCheck(url) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(responseData => handleBrowserCheck(responseData))
    .catch(error => {
        logToConsole('Error doing browser check');
        logToConsole(error);
    });
}

function handleBrowserCheck(responseData) {
    if (responseData.browserUnknown) {
        document.getElementById('browser-unknown-container').style.display = 'block';
        document.getElementById('browser-not-supported-container').style.display = 'block';
    }
    if (responseData.browserNotSupported) {
        document.getElementById('browser-not-supported-content').style.display = 'block';
        document.getElementById('browser-unknown-content').style.display = 'block';
    }
}

function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = cookies.length - 1; i >= 0; i--) {
        var cookie = cookies[i].substr(0, cookies[i].indexOf('='));
        var value = cookies[i].substring(cookies[i].indexOf('=') + 1);
        cookie = cookie.trim();
        if (cookie == name) {
            return unescape(value);
        }
    }
}

function setCookie(name, value, expiresInDays) {
    var date = new Date();
    date.setDate(date.getDate() + expiresInDays);
    document.cookie = name + '=' + escape(value) + (expiresInDays === null || expiresInDays === undefined ? '' : '; expires=' + date.toUTCString()) + '; path=/';
}

function logToConsole(message) {
    if (typeof console !== 'undefined' && console.log) {
        console.log(message);
    }
}

function addProtocol(url) {
    if (url.substring(0, 2) == '//') {
        url = window.location.protocol + ':' + url;
    }
    return url;
}

function doReload() {
    window.location.reload();
}

function goHome() {
    if (window.location.pathname === '/') {
        loginId = getCookie('iready_login_id');
    } else {
        window.onunload = null;
        window.location.href = '/';
    }
}

function checkIReadyIds() {
    var checkFlag = false;
    if (landingPage && !allowMultipleLandingPages) {
        if (created === null) {
            created = new Date().getTime();
            setCookie('iready_landing_page_id', created);
        } else if (getCookie('iready_landing_page_id') != created) {
            checkFlag = true;
        }
    }
    if (loginCheckEnabled && getCookie('iready_login_id') != loginId) {
        checkFlag = true;
    }
    if (checkFlag) {
        goHome();
    }
}

function setAllowMultipleLandingPages(value) {
    if (allowMultipleLandingPages && !value) {
        created = null;
    }
    allowMultipleLandingPages = value;
}

function addCheckIreadyIds() {
    if (!document.hidden) {
        setInterval(checkIReadyIds, 400);
    } else {
        setTimeout(addCheckIreadyIds, 150);
    }
}

var loginCheckEnabled = true;
var allowMultipleLandingPages = false;
var loginId = getCookie('iready_login_id');
var landingPage = false;
var created = null;
addCheckIreadyIds();
