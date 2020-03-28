class NekoSama{
    constructor(){
        let cache = document.getElementsByTagName('h1')[0].innerHTML;
        cache = cache.substring(0,cache.indexOf('<small>'));
        this._name = cache;
        this._link = document.getElementsByClassName('play');
        this._video = [];
        this._stats = true;
    }
    getName(){
        return this._name;
    }
    getLink(){
        return this._link;
    }
    getVideo(){
        return this._video;
    }
    getStats(){
        return this._stats;
    }
    setVideo(callback){
        this._stats = false;
        let a = this._link;
        var element = this;
        for(var n in a){
            try{
                if(a[n].href.trim()!=null && a[n].href.trim()!=""){
                    this.updateVideo(a[n].href, function(embed){
                        let link = embed[0];
                        element._video.push(link);
                    });
                }
            } catch(e){}
        }
        setTimeout(function(){
            this._stats = true;
            callback(element._video);
        }, 1000);
    }
    updateVideo(src, callback){
        let page = new XMLHttpRequest();
        var element = this;
        page.onload = function(){
            let core = page.responseText;
            let video = element.fakeIframe(core);
            callback(video);
        }
        page.open('GET', src);
        page.send();
    }
    fakeIframe(page){
        let cache = [];
        let parameter = ['<script type="text/javascript">','</script>'];
        let body = page.substring(page.indexOf(parameter[0]));
        body = body.substring(parameter[0].length, body.indexOf(parameter[1]));
        eval(body+"\n cache = video;");
        return cache;
    }
}
var animes = new NekoSama();
animes.setVideo(function(result){
    console.log(animes.getName());
    console.log(result);
});