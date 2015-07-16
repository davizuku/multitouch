
function HammerMovement(hObj, renderCallback){
    var that = this;

    that.targetObj = hObj.element;
    that.hammerObj = hObj;

    that.iniZIndex = 1;
    that.acumDelta = {x : 0, y : 0};
    that.iniRotate = 0;
    that.iniScale = 1;

    that.transform = {
        translate: { x: 0, y: 0 },
        scale: 1,
        angle: 0
    };

    that.hammerObj.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
    that.hammerObj
    .on("panstart", function(ev){
        
    })
    .on("panmove", function(ev){
        var x = ev.deltaX + that.acumDelta.x;
        var y = ev.deltaY + that.acumDelta.y;
        that.transform.translate = {x : x, y : y};
        renderCallback(that.transform);
    })
    .on("panend", function(ev){
        that.acumDelta.x += ev.deltaX;
        that.acumDelta.y += ev.deltaY;
    });

    that.hammerObj.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(that.hammerObj.get('pan'));
    that.hammerObj
    .on("rotatestart", function(ev){

    })
    .on("rotatemove", function(ev){
        var normAngle = ev.rotation < 0 ? ev.rotation + 360 : ev.rotation;
        that.transform.angle = that.iniRotate + ev.rotation;
        renderCallback(that.transform);
    })
    .on("rotateend", function(ev){
        that.iniRotate = that.transform.angle;
    });

    that.hammerObj.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([that.hammerObj.get('pan'), that.hammerObj.get('rotate')]);
    that.hammerObj
    .on("pinchstart", function(ev){

    })
    .on("pinchmove", function(ev){
        that.transform.scale = that.iniScale * ev.scale;
        renderCallback(that.transform);
    })
    .on("pinchend", function(ev){
        that.iniScale = that.transform.scale;
    });

    that.hammerObj.on("hammer.input", function(ev) {
        if (ev.isFirst){
            that.targetObj.style.zIndex = that.iniZIndex;;
        }
        else if(ev.isFinal) {
            that.iniZIndex = that.iniZIndex + 1;
        }
    });
}
