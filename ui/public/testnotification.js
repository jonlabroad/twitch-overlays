(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CurrentSongContainer = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.ArtistName = new cjs.Text("The Songery", "bold 24px 'Microsoft PhagsPa'", "#FFFFFF");
	this.ArtistName.name = "ArtistName";
	this.ArtistName.lineHeight = 31;
	this.ArtistName.parent = this;
	this.ArtistName.setTransform(24,55.9);

	this.SongName = new cjs.Text("I Wanna Go Out", "bold 32px 'Microsoft PhagsPa'", "#FFFFFF");
	this.SongName.name = "SongName";
	this.SongName.lineHeight = 41;
	this.SongName.parent = this;
	this.SongName.setTransform(24,10.95);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#003300").ss(1,1,1).p("Egj7gI0MBH3AAAIAARpMhH3AAAg");
	this.shape.setTransform(229.975,56.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#003300").s().p("Egj7AI1IAAxpMBH3AAAIAARpg");
	this.shape_1.setTransform(229.975,56.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.SongName},{t:this.ArtistName}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,462,115);


// stage content:
(lib.testnotification = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {SlideInPoint:0,SlideOutPoint:88};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,88];
	// timeline functions:
	this.frame_0 = function() {
		this.slideIn = () => this.gotoAndPlay("SlideInPoint");
		this.slideOut = () => this.gotoAndPlay("SlideOutPoint");
		
		window.currentSongNotification = {
			instance: this,
			songName: this.children[0].SongName,
			artistName: this.children[0].ArtistName,
			slideIn: () => this.gotoAndPlay("SlideInPoint"),
			slideOut: () => this.gotoAndPlay("SlideOutPoint"),
		};
		this.initialized = true;
		this.stop();
	}
	this.frame_88 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(88).call(this.frame_88).wait(42));

	// Layer_1
	this.instance = new lib.CurrentSongContainer("synched",0);
	this.instance.setTransform(230,583.5,1,1,0,0,0,230,56.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({startPosition:0},0).wait(1).to({x:230.1},0).wait(1).to({x:230.3},0).wait(1).to({x:230.6},0).wait(1).to({x:230.95},0).wait(1).to({x:231.35},0).wait(1).to({x:231.9},0).wait(1).to({x:232.55},0).wait(1).to({x:233.3},0).wait(1).to({x:234.1},0).wait(1).to({x:235.1},0).wait(1).to({x:236.15},0).wait(1).to({x:237.35},0).wait(1).to({x:238.7},0).wait(1).to({x:240.2},0).wait(1).to({x:241.85},0).wait(1).to({x:243.65},0).wait(1).to({x:245.65},0).wait(1).to({x:247.85},0).wait(1).to({x:250.2},0).wait(1).to({x:252.85},0).wait(1).to({x:255.65},0).wait(1).to({x:258.8},0).wait(1).to({x:262.2},0).wait(1).to({x:265.9},0).wait(1).to({x:269.95},0).wait(1).to({x:274.4},0).wait(1).to({x:279.25},0).wait(1).to({x:284.6},0).wait(1).to({x:290.5},0).wait(1).to({x:297},0).wait(1).to({x:304.25},0).wait(1).to({x:312.3},0).wait(1).to({x:321.35},0).wait(1).to({x:331.6},0).wait(1).to({x:343.2},0).wait(1).to({x:356.5},0).wait(1).to({x:371.9},0).wait(1).to({x:389.8},0).wait(1).to({x:410.75},0).wait(1).to({x:434.85},0).wait(1).to({x:461.55},0).wait(1).to({x:489.3},0).wait(1).to({x:515.75},0).wait(1).to({x:539.5},0).wait(1).to({x:560.1},0).wait(1).to({x:577.9},0).wait(1).to({x:593.2},0).wait(1).to({x:606.55},0).wait(1).to({x:618.3},0).wait(1).to({x:628.65},0).wait(1).to({x:637.9},0).wait(1).to({x:646.2},0).wait(1).to({x:653.7},0).wait(1).to({x:660.45},0).wait(1).to({x:666.65},0).wait(1).to({x:672.25},0).wait(1).to({x:677.4},0).wait(1).to({x:682.15},0).wait(1).to({x:686.5},0).wait(1).to({x:690.5},0).wait(1).to({x:694.2},0).wait(1).to({x:697.6},0).wait(1).to({x:700.75},0).wait(1).to({x:703.65},0).wait(1).to({x:706.3},0).wait(1).to({x:708.8},0).wait(1).to({x:711.1},0).wait(1).to({x:713.2},0).wait(1).to({x:715.1},0).wait(1).to({x:716.9},0).wait(1).to({x:718.55},0).wait(1).to({x:720.05},0).wait(1).to({x:721.4},0).wait(1).to({x:722.65},0).wait(1).to({x:723.75},0).wait(1).to({x:724.8},0).wait(1).to({x:725.7},0).wait(1).to({x:726.5},0).wait(1).to({x:727.2},0).wait(1).to({x:727.85},0).wait(1).to({x:728.4},0).wait(1).to({x:728.85},0).wait(1).to({x:729.25},0).wait(1).to({x:729.55},0).wait(1).to({x:729.75},0).wait(1).to({x:729.95},0).wait(1).to({x:730.05},0).to({x:230},41,cjs.Ease.quintIn).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(479,846,482,-205);
// library properties:
lib.properties = {
	id: '8CD0B152413ADA40AA7C161AAE6096BF',
	width: 960,
	height: 640,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['8CD0B152413ADA40AA7C161AAE6096BF'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;