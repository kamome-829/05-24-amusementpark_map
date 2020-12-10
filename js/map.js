$(() => {

    // map表示用に使用する変数
    let map;

    // 現在地を取得するときのオプション
    const option = {
        enableHighAccuracy: true,
        maximumAge: 20000,
        timeout: 1000000
    };

    // 現在地の取得に成功したときの関数
    function showPosition(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(lat, lng);
    }

    // 現在位置の取得に失敗したの実行する関数
    function showError(error) {
        let e = "";
        if (error.code == 1) {
            e = "位置情報が許可されてません";
        }
        if (error.code == 2) {
            e = "現在位置を特定できません";
        }
        if (error.code == 3) {
            e = "位置情報を取得する前にタイムアウトになりました";
        }
        alert("error：" + e);
    }

    // 位置情報を取りにいく処理
    function getPosition() {
        navigator.geolocation
            .getCurrentPosition(mapsInit, showError, option);
    }

    window.onload = function () {
        getPosition();
    }
    /*
        function mapsInit(position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          map = new Microsoft.Maps.Map('#map', {
            center: {
              latitude: 35.6359322, longitude: 139.8786311
            },
            zoom: 17,
          });
        }
    */

    function mapsInit(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        // マップ表示の処理（省略）
        map = new Microsoft.Maps.Map('#map', {
            center: {
                latitude: lat, longitude: lng
            },
            zoom: 8,
        });
        pushPin(lat, lng, map);
        const name = "現在地";
        const place = "I'm here!!!";
        generateInfobox(lat, lng, map, name, place);
        oll_open();
    }

    function pushPin(lat, lng, map) {
        const location = new Microsoft.Maps.Location(lat, lng)
        const pin = new Microsoft.Maps.Pushpin(location, {
            color: 'navy', // 色の設定
            visible: true, // これ書かないとピンが見えない
        });
        map.entities.push(pin);
    };

    function generateInfobox(lat, lng, map, name, place) {
        const location = new Microsoft.Maps.Location(lat, lng)
        const infobox = new Microsoft.Maps.Infobox(location, {
            title: name,
            description: place
        });
        infobox.setMap(map);
    }

    const park = {
        name: ["USJ", "ハウステンボス", "ディズニーランド", "横浜シーパラダイス", "白い恋人パーク", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        place: ["大阪", "長崎", "東京", "神奈川", "北海道", "https://www.fujiq.jp/", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        phone: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
        web: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
        latitude: [34.665442, 56, 45, 52, 32],
        longitude: [135.432338, 158, 52, 85, 152],
    };

    function oll_open() {
        for (let i = 0; i < park.name.length; i++) {
            console.log(park.name[i]);
            let lat = park.latitude[i];
            let lng = park.longitude[i];
            let name = park.name[i];
            let place = park.place[i];
            pushPin(lat, lng, map);
            generateInfobox(lat, lng, map, name, place);

        }
    }
})