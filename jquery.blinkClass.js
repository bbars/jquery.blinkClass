(function() {
    var $ = jQuery;
    $.fn.blinkClass = function(className, delay) {
        if (!className && className !== false)
            return this;
        var delay = parseInt(delay);
        delay = delay > 0 ? delay : 600;
        
        var newClassList = [];
        if (className)
            newClassList = className.replace(/^\s+|\s+$/g, '').split(/\s+/);
        
        $(this).each(function() {
            if (typeof this.blinkClass != 'object') {
                function AssocArray() {}
                AssocArray.prototype = null;
                this.blinkClass = new AssocArray();
            }
            
            var $this = $(this);
            
            if (className === false) {
                for (var k in this.blinkClass) {
                    clearTimeout(this.blinkClass[k]);
                    $this.removeClass(k);
                    delete this.blinkClass;
                }
            }
            else {
                var classDiff = [],
                    classList = this.className.replace(/^\s+|\s+$/g, '').split(/\s+/);
                for (var i = 0; i < newClassList.length; i++)
                    if (classList.indexOf(newClassList[i]) == -1)
                        classDiff.push(newClassList[i]);
                classDiff = classDiff.join(' ').replace(/^\s+|\s+$/g, '');
                
                if (typeof this.blinkClass[classDiff] != 'undefined') {
                    clearTimeout(this.blinkClass[classDiff]);
                    delete this.blinkClass[classDiff];
                }
                
                $this.addClass(classDiff);
                this.blinkClass[classDiff] = setTimeout(function() {
                    $this.removeClass(classDiff);
                    delete $this[0].blinkClass[classDiff];
                }, delay);
            }
        });
        
        return this;
    };
})();
