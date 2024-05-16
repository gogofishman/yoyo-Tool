export default function () {
    wsClient.invoke('getAppInfo', null).onEnd((data) => {
        window.appInfo = data.data
    })
}