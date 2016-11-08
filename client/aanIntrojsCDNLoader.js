const introJs = document.createElement("script");
introJs.setAttribute("type", "text/javascript");
introJs.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.3.0/intro.min.js");
document.getElementsByTagName("head")[0].appendChild(introJs);
		

const introCss = document.createElement("link");
introCss.setAttribute("rel", "stylesheet");
introCss.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.3.0/introjs.min.css");
document.getElementsByTagName("head")[0].appendChild(introCss);

const introCustomCss = document.createElement("link");
introCustomCss.setAttribute("rel", "stylesheet");
introCustomCss.setAttribute("href", "/introCustomStyle.css");
document.getElementsByTagName("head")[0].appendChild(introCustomCss);

