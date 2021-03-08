const path = {
    path:window.location.pathname.split("/").slice(0,-1).join("/"), // 柔軟なルーティングに対応させる
    apiServerUrl:"http://192.168.1.49:3030", //開発環境ではhttp://192.168.1.49:3030,公開環境では / (ルート)だから空文字
};
export default path;