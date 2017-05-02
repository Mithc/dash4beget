var base = ["1;Самый главный сервис в Бегете;101.5.150.23:25565;minecraft;;", "2;Форум для крутых парней;101.5.150.11;minecraft;https://forum.office-team.beget;", "3;Рабочие лошадки;101.5.100.16/28:3000;workspace;;", "4;Система подачи печенек;192.168.1.30;kitchen;http://cookies.beget;", "5;Та штука которая всегда должна работать;101.5.100.100;hosting;https://beget.com", "6;Пока не придумали (тест);101.5.100.301;dev;httрs://shit.dev-team.beget;", "1;Самый главный сервис в Бегете;101.5.150.23:25565;minecraft;;", "2;Форум для крутых парней;101.5.150.11;minecraft;https://forum.office-team.beget;", "3;Рабочие лошадки;101.5.100.16/28:3000;workspace;;", "4;Система подачи печенек;192.168.1.30;kitchen;http://cookies.beget;", "5;Та штука которая всегда должна работать;101.5.100.100;hosting;https://beget.com", "6;Пока не придумали (тест);101.5.100.301;dev;httрs://shit.dev-team.beget;"];

function status() {
  var rand = Math.random();
  if (rand < 0.9) {
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

function createTable() {
  for (var i = 0; i < base.length; i++) {
    var service = new Service(base[i].split(';'));
    var mainPanel = document.getElementById('mainPanel');
    var newTr = document.createElement('tr');
    if (service.status == "online") {
      newTr.innerHTML = "<td>" + service.id + "</td> <td>" + service.name + "</td> <td>" + service.ip + "</td> <td>" + service.descrition + "</td><td class= 'online'>" + service.status + "</td>";
    } else {
      newTr.innerHTML = "<td>" + service.id + "</td> <td>" + service.name + "</td> <td>" + service.ip + "</td> <td>" + service.descrition + "</td><td class='offline'>" + service.status + "</td>";
    }

    mainPanel.appendChild(newTr);

    console.log(service);
  }
}

createTable();
