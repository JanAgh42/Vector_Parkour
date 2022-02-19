
class Node {
  constructor() {

    this.listOfNodes = new Array();
  }
  
  add(node, array) {
    this[array].push(node);
  }

  remove(node, array) {
    let index = this[array].indexOf(node);
    delete this[array][index];
    
  }

  addNewArray(array){
    this[array] = new Array();
  }

  delete(array){
    this[array] = new Array();
  }

  notify(event, argument, array) {
    for (let x of this[array]) { 
      if (x.isActive){
        x[event](argument);
      }
    }
  }
}