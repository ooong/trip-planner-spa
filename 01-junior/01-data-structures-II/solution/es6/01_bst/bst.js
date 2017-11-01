class BinarySearchTree {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
    this.magnitude = 1;
  }
  insert(val){
    const direction = val < this.value ? 'left' : 'right';
    if (this[direction]) this[direction].insert(val);
    else this[direction] = new BinarySearchTree(val);
    this.magnitude++;
  }
  contains(val){
    if (this.value === val) return true;
    const direction = val < this.value ? 'left' : 'right';
    if (this[direction]) return this[direction].contains(val);
    else return false;
  }
  // es6 Default Parameter - initializing with default values if no value passed in
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
  depthFirstForEach(fn, opt = 'in-order'){
    if (opt === 'pre-order') fn(this.value);
    if (this.left) this.left.depthFirstForEach(fn, opt);
    if (opt === 'in-order') fn(this.value);
    if (this.right) this.right.depthFirstForEach(fn, opt);
    if (opt === 'post-order') fn(this.value);
  }
  breadthFirstForEach(fn){
    const queue = [this];
    while (queue.length) {
      const current = queue.shift();
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      fn(current.value);
    }
  }
  size(){
    return this.magnitude;
  }
}
