;(function( name, definition ) {
  var hasDefine = typeof define === 'function',
    hasExports = typeof module !== 'undefined' && module.exports;
  if ( hasDefine ) {
    define(definition);
  } else if (hasExports) {
    module.exports = definition();
  } else {
    this[name] = definition();
  }
})('light', function() {

var light = function() {
  this.callbacks = {};
};

light.callbacks = {};

light.addEventListener = 
light.on = 
light.prototype.addEventListener =
light.prototype.off = function(name, callback) {
  var callbacks = this.callbacks[name] = this.callbacks[name] || [];
  callbacks.push(callback);
};

light.removeEventListener = 
light.off =
light.prototype.removeEventListener 
light.prototype.off = function(name, callback){
  if(typeof name == 'string') {
    var callbacks = this.callbacks[name];
    if(callbacks) {
      // 直接删除 name 组.
      if(callback == null){
        delete this.callbacks[name];
      } else {
        // 删除指定 callback.
        if(typeof callback == 'function'){
          for(var i = 0, l = callbacks.length; i < l; ++i){
            if(callback === callbacks[i]){
              callbacks[i] = null;
            }
          }
        }
      }
    }
  }
};

light.notify = 
light.dispatchEvent = 
light.prototype.notify =
light.prototype.dispatchEvent = function(name){
  var callbacks = this.callbacks[name];
  if(callbacks && typeof name == 'string'){
    for(var i = 0; i < callbacks.length; ++i){
      var callback = callbacks[i];
      if (typeof callback == 'function') {
        callback.apply(null, [].slice.call(arguments,1));
      } else {
        callbacks.splice(i, 1 );
        --i;
      }
    }
  }
};

return light;

});
