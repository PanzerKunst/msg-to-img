// MooTools: the javascript framework.
// Load this file's selection again by visiting: http://mootools.net/more/307a2296984759b807e828038b51b650 
// Or build this file again with packager using: packager build More/String.Extras
/*
---
copyrights:
  - [MooTools](http://mootools.net)

licenses:
  - [MIT License](http://mootools.net/license.txt)
...
*/
MooTools.More={version:"1.4.0.1",build:"a4244edf2aa97ac8a196fc96082dd35af1abab87"};(function(){var c={a:/[àáâãäåăą]/g,A:/[ÀÁÂÃÄÅĂĄ]/g,c:/[ćčç]/g,C:/[ĆČÇ]/g,d:/[ďđ]/g,D:/[ĎÐ]/g,e:/[èéêëěę]/g,E:/[ÈÉÊËĚĘ]/g,g:/[ğ]/g,G:/[Ğ]/g,i:/[ìíîï]/g,I:/[ÌÍÎÏ]/g,l:/[ĺľł]/g,L:/[ĹĽŁ]/g,n:/[ñňń]/g,N:/[ÑŇŃ]/g,o:/[òóôõöøő]/g,O:/[ÒÓÔÕÖØ]/g,r:/[řŕ]/g,R:/[ŘŔ]/g,s:/[ššş]/g,S:/[ŠŞŚ]/g,t:/[ťţ]/g,T:/[ŤŢ]/g,ue:/[ü]/g,UE:/[Ü]/g,u:/[ùúûůµ]/g,U:/[ÙÚÛŮ]/g,y:/[ÿý]/g,Y:/[ŸÝ]/g,z:/[žźż]/g,Z:/[ŽŹŻ]/g,th:/[þ]/g,TH:/[Þ]/g,dh:/[ð]/g,DH:/[Ð]/g,ss:/[ß]/g,oe:/[œ]/g,OE:/[Œ]/g,ae:/[æ]/g,AE:/[Æ]/g},b={" ":/[\xa0\u2002\u2003\u2009]/g,"*":/[\xb7]/g,"'":/[\u2018\u2019]/g,'"':/[\u201c\u201d]/g,"...":/[\u2026]/g,"-":/[\u2013]/g,"&raquo;":/[\uFFFD]/g};
var a=function(f,h){var e=f,g;for(g in h){e=e.replace(h[g],g);}return e;};var d=function(e,g){e=e||"";var h=g?"<"+e+"(?!\\w)[^>]*>([\\s\\S]*?)</"+e+"(?!\\w)>":"</?"+e+"([^>]+)?>",f=new RegExp(h,"gi");
return f;};String.implement({standardize:function(){return a(this,c);},repeat:function(e){return new Array(e+1).join(this);},pad:function(e,h,g){if(this.length>=e){return this;
}var f=(h==null?" ":""+h).repeat(e-this.length).substr(0,e-this.length);if(!g||g=="right"){return this+f;}if(g=="left"){return f+this;}return f.substr(0,(f.length/2).floor())+this+f.substr(0,(f.length/2).ceil());
},getTags:function(e,f){return this.match(d(e,f))||[];},stripTags:function(e,f){return this.replace(d(e,f),"");},tidy:function(){return a(this,b);},truncate:function(e,f,i){var h=this;
if(f==null&&arguments.length==1){f="…";}if(h.length>e){h=h.substring(0,e);if(i){var g=h.lastIndexOf(i);if(g!=-1){h=h.substr(0,g);}}if(f){h+=f;}}return h;
}});})();