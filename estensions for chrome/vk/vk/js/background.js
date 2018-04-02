class Bg {
    constructor() {
        chrome.runtime.onMessage.addListener((a) => {
            'setBadge' === a.action && this.setBadge(a.value)
        }), chrome.runtime.onInstalled.addListener((a) => {
            'install' === a.reason && chrome.tabs.create({
                url: 'https://musvk.ru/success-install.html'
            })
        }), chrome.runtime.setUninstallURL('https://musvk.ru/uninstall.html')
    }
    setBadge(a) {
        a ? (chrome.browserAction.setBadgeBackgroundColor({
            color: [16, 201, 33, 100]
        }), chrome.browserAction.setBadgeText({
            text: a + ''
        })) : (chrome.browserAction.setBadgeBackgroundColor({
            color: [0, 0, 0, 0]
        }), chrome.browserAction.setBadgeText({
            text: ''
        }))
    }
}
var bg = new Bg;