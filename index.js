//Create Node, Doubly Linked List, and methods for DLL:

//Creates a node structure with a value, next, and previous property
class Node{
  //construct the node object to assign key/value pairs
  constructor(value){
    this.value = value;
    //must have 'next' property in node object
    this.next = null;
    //must have 'previous' property in node object for DLL
    this.prev = null;
  }
}

//Creates Doubly Linked List structure
class DoublyLinkedList{
  //construct the DLL with head, tail, and length
  constructor(){
    this.head = null;
    this.tail = null;
    this.length = 0;  //not to be confused with JS length method
  }
  
  //adds node to end of DLL
  //the method accepts a value parameter
  push(value){
    //create a new node
    const newNode = new Node(value);
    //edge case: if DLL is empty (or head is null)
      //{assign newNode to head; assign head to tail (or assign newNode to tail)}
    if(this.length === 0){
      this.head = newNode;
      this.tail = this.head;
    //else
      //{assign newNode to tails next pointer; assign tail to newNode previous pointer; assign newNode to tail}  
    }else{
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    //increment length
    this.length++;
    //return list
    return this;
  }

  //remove node from end of DLL
  //the method does not take parameters
  pop(){
    //edge case: if list is empty (or head is null), return undefined
    if(this.length === 0) return undefined;
    //grab tail in a variable to return later
    const oldTail = this.tail;
    //edge case: if DLL length equals 1
      //{assign assign head and tail to null b/c the list will become empty after pop}
    if(this.length === 1){
      this.head = null;
      this.tail = null;
    //else
      //{assign previous node to tail; assign null to new tails next pointer; assign null to oldTail previous pointer}
    }else{
    this.tail = oldTail.prev;
    this.tail.next = null;
    oldTail.prev = null;
    }
    //decrement length
    this.length--;
    //return oldTail
    return oldTail;
  }

  //remove node from beginning of DLL
  //the method does not take parameters
  shift(){
    //if list is empty, return undefined (edgecase)
    if(this.length === 0) return undefined;
    //store (assign) head property in variable
    const oldHead = this.head;
    //edge case: if DLL length equals 1
      //{assign assign head and tail to null b/c the list will become empty after shift}
    if(this.length === 1){
      this.head = null;
      this.tail = null;
      //else
      //{assign old head's next value to head; assign null to new head's previous pointer; assign null to old head's next pointer}
    }else{
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    //decrement length
    this.length--;
    //return oldHead
    return oldHead;
  }

  //adds a node to beginning of DLL
  //the method accepts a value parameter
  unshift(value){
    //make a new node
    const newNode = new Node(value);
    //if DLL is empty (edge case)
      //{assign newNode to head; assign head to tail}
    if(this.length === 0){
      this.head = newNode;
      this.tail = this.head;
    //else
      //{assign head to newNode's next pointer; assign newNode to head's previous pointer; assign newNode to head}
    }else{
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    //increment length
    this.length++;
    //return list
    return this;
  }

  //get a node from a chosen position ("index") in the DLL
  //the method accepts an index parameter
  get(index){
    //edge case: if index is less than zero OR greater than/equal to length, return null
    if(index < 0 || index >= this.length) return null;
    //create undefined counter variable
    let counter;
    //create undefined currentNode variable
    let currentNode;
    if(index <= this.length / 2){
      //start an index counter at zero
      counter = 0;
      //start the currentNode at head
      currentNode = this.head;
      //as long as counter("index") is not equal to the index passed
      while(counter !== index){
        //keep traversing the currentNode through DLL forwards
        currentNode = currentNode.next;
        //and increment the index counter
        counter++;
      }
    }else{
      //start an index counter at the tail
      counter = this.length-1;
      //start the currentNode at tail
      currentNode = this.tail;
      //as long as counter("index") is not equal to the index passed
      while(counter !== index){
        //keep traversing the currentNode through DLL backwards
        currentNode = currentNode.prev;
        //and decrement the index counter
        counter--;
      }
    }
    //return currentNode when the counter is equal to the index passed
    return currentNode;
  }

  //change the value of a node based on it's position in the DLL
  //the method accepts a position ("index") and a value to update the node at that index
  set(index, value){
     //use get function to find the specific node and assign it to a variable
    let foundNode = this.get(index);
    //if node is found (true, or not null)
    if(foundNode !== null){
      //{assign new value to found node's value and return true}
      foundNode.value = value;
      return true;
    }
    //if node not found, return false
    return false;
  }

  //add a node to DLL at a specific position ("index")
  //the method accepts a position ("index") and a value to add a new node at that index
  insert(index, value){
    //edge case: if index is less than zero OR greater than the length, return false
    if(index < 0 || index > this.length) return false;
    //edge case: if index is 0, unshift value to beginning of the list ('!!' changes output to boolean)
    if(index === 0) return !!this.unshift(value);
    //edge case: if index = length, push value to the end of the list ('!!' changes output to boolean)
    if(index === this.length) return !!this.push(value);

    //create new node
    const newNode = new Node(value);
    //grab the node that comes before the wanted index using get method
    const prevNode = this.get(index-1);
    //grab the node that comes after the previous
    const afterNode = prevNode.next;
    //update the previous nodes next pointer to the newNode
    prevNode.next = newNode;
    //update new nodes previous pointer to previous node
    newNode.prev = prevNode;
    //update new nodes next pointer to after node
    newNode.next = afterNode;
    //update after nodes previous pointer to new node
    afterNode.prev = newNode;
    //increment length
    this.length++;
    //return true
    return true;
  }

  //removes a node from DLL at a specific position ("index")
  //the method accepts a position ("index")
  remove(index){
    //if index is less than zero OR greater than or equal to the length, return undefined
    if(index < 0 || index >= this.length) return undefined;
    //if index is 0, return shift method (returns whole node: this.shift() or returns value: this.shift.value)
    if(index === 0) return this.shift();
    //if index is the same as the length-1, pop method (returns whole node: this.pop() or returns value: this.shift.value)
    if(index === this.length-1) return this.pop();

    //otherwise, use get method to access the node to be removed
    const removedNode = this.get(index);
    //grab the node that comes previous to the removed node
    const prevNode = removedNode.prev;
    //grab the node that comes after the removed node
    const afterNode = removedNode.next;

    //update the previous nodes next pointer to the after node
    prevNode.next = afterNode;
    //update the after nodes previous pointer to the previous node
    afterNode.prev = prevNode;

    //update the removed nodes next and previous pointers to null
    removedNode.next = null;
    removedNode.prev = null;

    //decrement length
    this.length--;
    //return removed node
    return removedNode;
  }

  //reverses the list in place
  //creates 3 variables to track: next, previous, and currentNode
  reverse(){
    //start current node at head, and use currentNode as temporary variable to swap head and tail
    let currentNode = this.head;
    //assign tail to head to swap
    this.head = this.tail;
    //assign currentNode to tail to swap
    this.tail = currentNode;
    //create next variable to keep track of currentNode.next property (remains empty/undefined to start)
    let next;
    //assign null to previous (because tail will point to previous which is initially null)
    let prev = null;
    //loop through list with while loop (current is true) (or for loop: "for(let i=0; i<this.length; i++"))
    while(currentNode){
      //assign currentNode.next to next to keep track of currentNode.next property
      next = currentNode.next;
      //assign previous to currentNode next pointer (changes pointer to previous which is null)
      currentNode.next = prev;
      //assign next to currentNode previous pointerto (changes pointer to next node)
      currentNode.prev = next;
      //assign currentNode to previous to move previous up one spot on the list
      prev = currentNode;
      //assign next to curretNode to move currentNode up one spot on the list
      currentNode = next;
    }
    //return list
    return this;
  }

  //prints a list in console that's easier to read
  printListArray(){
    //create empty array
    const array = [];
    //begin currentNode at head
    let currentNode = this.head;
    //while currentNode is not null (while loops used when we don't know input length)
    while(currentNode !== null){
      //push the currentNode value into empty array
      array.push(currentNode.value);
      //update currentNode to next node until currentNode is at null
      currentNode = currentNode.next
    }
    //return the array
    return array;
  }
  
}

// Examples of working DLL:

// first = new Node(12);
// first.next = new Node(13);
// first.next.prev = first;
// console.log(first);

const list = new DoublyLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
list.push(6);
list.push(7);
list.push(8);
// console.log(list.pop());
// console.log(list.shift());
// console.log(list.unshift(55));
// console.log(list.get(0));
// console.log(list.set(0, 'work'));
// console.log(list.insert(7, 100));
// console.log(list.remove(5));
console.log(list.reverse());


// console.log(list);
console.log(list.printListArray());

