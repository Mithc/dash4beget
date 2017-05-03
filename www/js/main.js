var base1 = ["1;Самый главный сервис в Бегете;101.5.150.23:25565;minecraft;;", "2;Форум для крутых парней;101.5.150.11;minecraft;https://forum.office-team.beget;", "3;Рабочие лошадки;101.5.100.16/28:3000;workspace;;", "4;Система подачи печенек;192.168.1.30;kitchen;http://cookies.beget;", "5;Та штука которая всегда должна работать;101.5.100.100;hosting;https://beget.com", "6;Пока не придумали (тест);101.5.100.301;dev;httрs://shit.dev-team.beget;", "7;Самый главный сервис в Бегете;101.5.150.23:25565;minecraft;;", "8;Форум для крутых парней;101.5.150.11;minecraft;https://forum.office-team.beget;", "9;Рабочие лошадки;101.5.100.16/28:3000;workspace;;", "10;Система подачи печенек;192.168.1.30;kitchen;http://cookies.beget;", "11;Та штука которая всегда должна работать;101.5.100.100;hosting;https://beget.com", "12;Пока не придумали (тест);101.5.100.301;dev;httрs://shit.dev-team.beget;"];

function status() {
  var rand = Math.random();
  if (rand < 0.7) {
    return "online";
  } else {
    return "offline";
  }
}

function Service(data) {
  this.id = data[0];
  this.name = data[1];
  this.ip = data[2];
  this.descrition = data[3];
  this.url = data[4];
  this.status = status();
}

function createTable(base) {
  var j = 0;
  for (var i = 0; i < base.length; i++) {
    var service = new Service(base[i].split(';'));
    var mainPanel = document.getElementById('mainPanel');
    var newTr = document.createElement('tr');

    if (service.status == "online") {
      newTr.innerHTML = "<td>" + service.id + "</td> <td>" + service.name + "</td> <td>" + service.ip + "</td> <td>" + service.descrition + "</td><td class= 'online'>" + service.status + "</td>";
    } else {
      newTr.innerHTML = "<td>" + service.id + "</td> <td>" + service.name + "</td> <td>" + service.ip + "</td> <td>" + service.descrition + "</td><td class='offline'>" + service.status + "</td>";
      j++;
    }

    mainPanel.appendChild(newTr);
  }
  var statistics = 100-Math.floor(100*j/base.length);
  var barOnline = document.getElementById('progressBarOnline');
  var strOnline = statistics+"%";
  var statOnline = document.createElement('span');

  barOnline.style.width = strOnline;
  statOnline.innerHTML = strOnline;
  barOnline.style.width = strOnline;
  barOnline.appendChild(statOnline);


  var barOffline = document.getElementById('progressBarOffline');
  var strOffline = (Math.floor(100*j/base.length))+"%";
  var statOffline = document.createElement('span');

  statOffline.innerHTML = strOffline;
  barOffline.style.width = strOffline;
  statOffline.innerHTML = strOffline;
  barOffline.appendChild(statOffline);
}


createTable(base1);

/* Form validate */

function saveData() {
  var serviceName = document.getElementById('serviceName');
  var adress = document.getElementById('adress');
  var socket = document.getElementById('socket');
  var serviceDesc = document.getElementById('serviceDesc');
  var http = document.getElementById('http');
  var Arr = [base1.length+1,serviceName.value,adress.value+socket.value,serviceDesc.value,http.value];
  createTable(base1.push(Arr.join(';')));
  console.log(Arr);
}
