export default function getHexRGBColor(color)
{
	  color = color.replace(/\s/g,"");
	  var aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
	  if(aRGB)
	  {
	    color = '';
	    for (var i=1;  i<=3; i++) color += Math.round((aRGB[i][aRGB[i].length-1]=="%"?2.55:1)*parseInt(aRGB[i])).toString(16).replace(/^(.)$/,'0$1');
	  }
	  else {
      var color_new = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
      if (color_new != color)
        return color_new;
    }

    var color_new = color.replace(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i, 'color');
    if (color_new == 'color')
      return color.replace(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i, '$1$2$3');

    color = color.replace(/%20/g,"");
    console.log(color)
    var hsl = color.match(/^hsl\((\d{1,3}),(\d{1,3})[%],(\d{1,3})[%]\)$/i);
    console.log(hsl);
    if (hsl){
      var h = parseInt(hsl[1]),
          s = parseInt(hsl[2]),
          l = parseInt(hsl[3]);

      if (s>100 || l>100)
        return '';
      console.log(h,s,l)
      hsl = hsl2rgb(h, s, l);
      return getHexRGBColor('rgb('+ hsl.r +','+ hsl.g + ','+ hsl.b+')');
    };
	  return '';
}



function hsl2rgb (h, s, l) {

    var r, g, b, m, c, x

    if (!isFinite(h)) h = 0
    if (!isFinite(s)) s = 0
    if (!isFinite(l)) l = 0

    h /= 60
    if (h < 0) h = 6 - (-h % 6)
    h %= 6

    s = Math.max(0, Math.min(1, s / 100))
    l = Math.max(0, Math.min(1, l / 100))

    c = (1 - Math.abs((2 * l) - 1)) * s
    x = c * (1 - Math.abs((h % 2) - 1))

    if (h < 1) {
        r = c
        g = x
        b = 0
    } else if (h < 2) {
        r = x
        g = c
        b = 0
    } else if (h < 3) {
        r = 0
        g = c
        b = x
    } else if (h < 4) {
        r = 0
        g = x
        b = c
    } else if (h < 5) {
        r = x
        g = 0
        b = c
    } else {
        r = c
        g = 0
        b = x
    }

    m = l - c / 2
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return { r: r, g: g, b: b }

}
