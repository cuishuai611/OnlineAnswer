//jianting
function pushHistory() {
    var title = document.title, Url = window.location.href;
    var state = { 
        title: title, 
        url: Url
    }; 
    window.history.pushState(state, title, Url); 
}

//layer
function ShowEsg(obj){
    var layer = document.querySelector('.mylayer');
    if(layer === null){
        var mylayer = document.createElement('span'),
        container = document.getElementsByTagName('body')[0];
        mylayer.setAttribute('class','mylayer');
        container.appendChild(mylayer);
        layer = document.querySelector('.mylayer');
    }
    layer.innerHTML = obj;
    layer.style.opacity = 1;
    var layerW = layer.offsetWidth,  layerH = layer.offsetHeight, t = null;
    layer.style.marginLeft = -layerW/2+'px';
    layer.style.marginTop = -layerH/2+'px';
	t = setTimeout(function(){
        container.removeChild(layer);
        clearTimeout(t);
    },2500);
}