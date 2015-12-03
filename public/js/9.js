var insightID = 9;

$(function($) {

    $(".knob").knob({
        draw : function () {

            // "tron" case
            if(this.$.data('skin') == 'tron') {

                this.cursorExt = 0.3;

                var a = this.arc(this.cv)  // Arc
                    , pa                   // Previous arc
                    , r = 1;

                this.g.lineWidth = this.lineWidth;

                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
        }
    });


});

function clock() {
    var $s = $(".second"),
        $m = $(".minute"),
        $h = $(".hour"),
        $D = $(".day"),
        $M = $(".month"),
        $Y = $(".year"),

        d = new Date(),
        s = d.getSeconds(),
        m = d.getMinutes(),
        h = d.getHours(),
        D = d.getDate(),
        M = d.getMonth(),
        Y = d.getFullYear();
    $s.val(s).trigger("change");
    $m.val(m).trigger("change");
    $h.val(h).trigger("change");
    $D.val(D).trigger("change");
    $M.val(M).trigger("change");
    $Y.val(Y).trigger("change");
    setTimeout("clock()", 1000);
}
clock();