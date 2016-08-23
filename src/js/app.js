function App(name) {
  this.name = name;
}

App.prototype.getName = function() {
  return this.name;
}

App.prototype.showNameInConsole = function() {
  console.info(this.name);
}

var app = new App('Kate');
app.showNameInConsole();
document.getElementById('name').innerHTML = app.getName();
