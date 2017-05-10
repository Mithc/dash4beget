var base1 = ["1;Самый главный сервис в Бегете;101.5.150.23:25565;minecraft;;", "2;Форум для крутых парней;101.5.150.11;minecraft;https://forum.office-team.beget;", "3;Рабочие лошадки;101.5.100.16/28:3000;workspace;;", "4;Система подачи печенек;192.168.1.30;kitchen;http://cookies.beget;", "5;Та штука которая всегда должна работать;101.5.100.100;hosting;https://beget.com", "6;Пока не придумали (тест);101.5.100.301;dev;httрs://shit.dev-team.beget;", "7;Самый главный сервис в Бегете;101.5.150.23:25565;minecraft;;", "8;Форум для крутых парней;101.5.150.11;minecraft;https://forum.office-team.beget;", "9;Рабочие лошадки;101.5.100.16/28:3000;workspace;;", "10;Система подачи печенек;192.168.1.30;kitchen;http://cookies.beget;", "11;Та штука которая всегда должна работать;101.5.100.100;hosting;https://beget.com", "12;Пока не придумали (тест);101.5.100.301;dev;httрs://shit.dev-team.beget;"];

var dashboard = function() {

  var base0 = [];
  for (var i = 0; i < base1.length; i++) {
    var service = new Service(base1[i].split(';'));
    base0.push(service);
  }
console.log(base0);

  function Service(data) {
    this.id = data[0];
    this.name = data[1];
    this.ip = data[2];
    this.descrition = data[3];
    this.url = data[4];
    this.status = status();
  }

  function status() {
    var rand = Math.random();
    if (rand < 0.7) {
      return "online";
    } else {
      return "offline";
    }
  }

  function createTable(base) {
    var j = 0;
    for (var i = 0; i < base1.length; i++) {
      var online = document.querySelector(".online_tr"),
        offline = document.querySelector(".offline_tr"),
        mainPanel = document.getElementById('mainPanel'),
        baseOfObjects = [];
      if (online) {
        mainPanel.removeChild(online);
      } else if (offline) {
        mainPanel.removeChild(offline);
      } else {
        for (var i = 0; i < base.length; i++) {
          var service = base[i],
            mainPanel = document.getElementById('mainPanel'),
            newTr = document.createElement('tr');
          baseOfObjects.push(service);
          if (service.status == "online") {
            newTr.classList.add("online_tr");
            newTr.innerHTML = "<td>" + service.id +  "</span> </td> <td>" + service.name +"</td> <td>" + service.ip + "</td> <td>" + service.descrition + "</td><td class= 'online status'>" + service.status + "</td>";
          } else {
            newTr.classList.add("offline_tr");
            newTr.innerHTML = "<td>" + service.id + "</td> <td>" + service.name + "</td> <td>" + service.ip + "</td> <td>" + service.descrition + "</td><td class='offline status'>" + service.status + "</td>";
            //" " +"<span class='glyphicon glyphicon-cog' id='edit'>"+"/"+"<span class='glyphicon glyphicon-trash' id='del'>
            j++;
          }
          mainPanel.appendChild(newTr);
        }
      }
    }
    /*
            setTimeout(function statusUpdate() {
              for (var i = 0; i < base.length; i++) {
                var service = new Service(base[i].split(';'));
                console.log(document.getElementsByClassName("status"));
                    var collection =document.getElementsByClassName("status");
                    collection.innerHTML(service.status);
              }
            }, 1000);
    */
    function createBar(numOffline) {
      var numOfRows = document.querySelectorAll(".status"),
        statistics = 100 - Math.floor(100 * numOffline / numOfRows.length),
        barOnline = document.getElementById('progressBarOnline'),
        strOnline = statistics + "%",
        statOnline = document.createElement('span'),
        numOfRows = document.querySelectorAll(".status");

      barOnline.style.width = strOnline;
      statOnline.innerHTML = strOnline;
      barOnline.style.width = strOnline;
      //  barOnline.removeChild(statOnline);
      barOnline.appendChild(statOnline);


      var barOffline = document.getElementById('progressBarOffline'),
        strOffline = (Math.floor(100 * numOffline / numOfRows.length)) + "%",
        statOffline = document.createElement('span');

      statOffline.innerHTML = strOffline;
      barOffline.style.width = strOffline;
      statOffline.innerHTML = strOffline;
      //  barOffline.removeChild(statOffline);
      barOffline.appendChild(statOffline);
    }

    createBar(j);
    return baseOfObjects;
  }

  var base = createTable(base0);

  function saveData() {
    var serviceName = document.getElementById('serviceName'),
      adress = document.getElementById('adress'),
      socket = document.getElementById('socket'),
      serviceDesc = document.getElementById('serviceDesc'),
      http = document.getElementById('http'),
      length = document.getElementsByClassName("status").length,
      Arr = [length + 1, serviceName.value, adress.value + socket.value, serviceDesc.value, status()],
      mainPanel = document.getElementById('mainPanel'),
      newTr = document.createElement('tr'),
      service = new Service(Arr);
      base.push(service);
    if (service.status == "online") {
      newTr.classList.add("online_tr");
      newTr.innerHTML = "<td>" + service.id + "</td> <td>" + service.name + "</td> <td>" + service.ip + "</td> <td>" + service.descrition + "</td><td class= 'online status'>" + service.status + "</td>";
    } else {
      newTr.classList.add("offline_tr");
      newTr.innerHTML = "<td>" + service.id + "</td> <td>" + service.name + "</td> <td>" + service.ip + "</td> <td>" + service.descrition + "</td><td class='offline status'>" + service.status + "</td>";

    }
    mainPanel.appendChild(newTr);
  }


  hideOnline.addEventListener("click", hide);
  addData.addEventListener("click", saveData);

  function hide() {
    var online = document.querySelector(".online_tr"),
      numOfRows = document.querySelectorAll(".status");
    if (online === null) {
      createTable(base);
    } else {
      for (var i = 0; i < numOfRows.length; i++) {
        var online = document.querySelector(".online_tr"),
          mainPanel = document.getElementById('mainPanel');

        if (online) {
          mainPanel.removeChild(online);
        }

      }
    }
  }

}();
