(function(w){
	       
		    	w.verticalDrag=function (navsWrap,navsList,callback){
		  
		
		    	        var disY=0;		
		    	        var eleY=0;
		    	        var startY=0;
		    	        
		    	        var startTime = 0;
		    	        var startValue =0;
		    	        var endTime  = 0;
		    	        var endValue =0;
		    	        
		    	        var disTime =1;
		    	        var disValue=0;
		    	        
		    	        var timer = 0;
		    	        var Tween = {
				         //正常：匀速
				           Linear: function(t,b,c,d){
				           	return c*t/d + b;
				           },
		            		//回弹
				           easeOut: function(t,b,c,d,s){
			               if (s == undefined) s = 1.70158;
			                  return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			                }
						
			            };
			            
			            var startX =0;
			            isY=true;
			            isFirst=false;
			            
		    	    navsWrap.addEventListener('touchstart',function(event){
		    	    	var touch = event.changedTouches[0];
		    	
		    	    	clearInterval(timer);
		    	    	navsList.style.transition='none';
		    	    	
		    	    	eleY = transformCss(navsList,'translateY')
		    	    	console.log(eleY);
		    	    	startY = touch.clientY;
		    	    	startX = touch.clientX;
		    	    	startTime = new Date().getTime();
		    	    	startValue = eleY;
		    	    	
		    	    	disValue=0;
//		    	    	console.log(eleY);
		    	    	
		    	    	 if(callback&&callback['start']){
                        	callback['start']();
                        	
                        }
		    	    	 isY=true;
		    	    	 isFirst=true;
		    	    });
		    	    navsWrap.addEventListener('touchmove',function(event){
		    	    	var touch = event.changedTouches[0];
		    	    	
		    	    	    	
		    	    	if(!isY){
		    	    		return;
		    	    	}
		    	    	
		    	    	var endY = touch.clientY;
		    	    	var endX = touch.clientX;
		    	    	disY = endY-startY;//手指的距离差
		    	    	var disX=endX-startX;
                        var translateY = disY+eleY;
                        var ratio=0; 
                        var minY = document.documentElement.clientHeight-navsList.offsetHeight;
                        
                        if(translateY>0){
                        	ratio = 1-translateY/document.documentElement.clientHeight;
                        	translateY = translateY*ratio;
                        }else if(translateY<minY){
                        	var blank = Math.abs(translateY) - Math.abs(minY);
                        	ratio = 1-blank/document.documentElement.clientHeight;
                        	translateY =  minY - ratio*blank;
                        }
                        
                        transformCss(navsList,'translateY',translateY);
//                      console.log(translateY);
                        
                        endTime = new Date().getTime();
                        endValue = translateY;
                        disTime = endTime - startTime;
                        disValue = endValue - startValue;
                        
                        if(callback&&callback['move']){
                        	callback['move']();
                        }
		                if(isFirst){
		                	isFirst=false;
		                	if(Math.abs(disX)>Math.abs(disY)){
		                			disY=0;
		                			isY=false
		                	}
		                
		                }
		    	    });
		    	    navsWrap.addEventListener('touchend',function(event){
		    	    	var touch = event.changedTouches[0];
		    	    	
		    	    	var speed = disValue/disTime;
		    	    	
		    	    	var target = transformCss(navsList,'translateY')+speed*100;
		    	    	var minY = document.documentElement.clientHeight-navsList.offsetHeight; 
//                      console.log(navsList.offsetHeight);
		    	    	var type = 'Linear';
		    	    	if(target>0){
		    	    		target=0;
		    	    		type = 'easeOut';
		    	    		
		    	    	}else if(target<minY){
		    	    		target = minY;
		    	    		type = 'easeOut';
		    	    	}
//                      console.log(target);
		    	    	
//		    	        navsList.style.transition = '3s '+bezier;
//		    	        transformCss(navsList,'translateY',target);
		    	        
		    	        var time = '3';
		    	        moveTween(type,target,time);
		    	        
		    	    });
		    	    
		    	    function moveTween(type,target,time){
		    	    	var t=0;
		    	    	var b=transformCss(navsList,'translateY');
		    	    	var c=target-b;
		    	    	var d=time/0.01;
		    	    	
		    	    	clearInterval(timer);
		    	    	timer = setInterval(function(){
		    	    		t++;
		    	    		
		    	    		if(t>d){
		    	    			clearInterval(timer);
		    	    			
		    	    			if(callback&&callback['end']){
		    	    				callback['end']();
		    	    			}
		    	    		}else{
		    	    			var points =Tween[type](t,b,c,d);
		    	    			
		    	    			transformCss(navsList,'translateY',points);
		    	    			if(callback&&callback['move']){
		    	    				callback['move']();
		    	    			}
//		    	    		   console.log(t,b,c,d);
		    	    		}
		    	    		
		    	    		
		    	    	},10);
		    	}
		    	
        }
})(window)
