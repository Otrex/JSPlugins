
function Calender(el, year, mnth, event = false, event_cls) {

    this.el = el;

    this.calevent = [];

    this.numMnth = 31;

    this.year = year ? year : new Date().getFullYear();

    this.mnth = mnth ? mnth : new Date().getMonth() + 1;

    var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    var label = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

    this.isLeap = function () {
        return this.year % 100 === 0 ? this.year % 400 === 0 : this.year % 4 === 0;
    }

    this.numDays = function()
    {
        this.numMnth = this.mnth == 4 || this.mnth == 6 || this.mnth == 9  || this.mnth == 11 ? 30 : this.mnth == 2 ?( this.isLeap() ? 28 : 29 ): 31;
    }

    this.numDays();

    var d = new Date(this.year+"/"+this.mnth+"/1");

    //console.log(d);

    var k = d.getDay()//used to print out the headers

    this.create = function () {

        this.el.innerHTML = "";

        var m = document.createElement("h1");

        m.innerHTML = months[this.mnth - 1] + " <span>"+ this.year +"</span>";

        this.el.appendChild(m);
        
        var view = new TableBuilder("","",attrs= {}, event)

        for (m of label)
        {
            view.th(m.slice(0,3));
        }

        view.tr()

        var i = 1, end = 1;

        //console.log([k, label[k]])

        while (i <= 42)
        {
            if (i > k && end <= this.numMnth)
            {
                if (event)
                {
                    
                    td_ = view.td("<div id='calevent-"+end+"-"+this.mnth+"-"+this.year+"'>"+end+"</div>");

                    this.attachEvent(this.el,"click", td_, event_cls)

                } else {

                    view.td("<div>"+end+"</div>")

                }

                end++;

            } else {

                view.td();
            }

            if (i % 7 == 0)
            {
                view.tr()
            }

            i ++;
        }

        view.append(this.el) 
        // i = 1;
        // this.calevent.forEach((e) => {
        //     //console.log("#calevent-"+i+this.mnth+this.year);
        //     e.attachEvent("click", document.querySelector("#calevent-"+i+""+this.mnth+""+this.year))
        //     i++;
        // })
        //console.log(this.calevent);
    }
}


Calender.prototype = {
    
    attachEvent : (el, event, tag, event_cls, callback)=>
    {
        tag.addEventListener(event, function (event) {

            var date = event.target.id.split("-");

            date.shift();

            date = new CalenderEvent(...date, el, event_cls)

            date.show()

           // alert(date.date ? date.date : tag.dispatchEvent("click"))

        })
    }
}




// var x  =  new Calender(document.body, "2020", "1")
// x.create()


function CalenderEvent(dd, mm, yy, el, event_cls) {

    var init = ()=> {
        this.dd = dd;
        this.mm = mm;
        this.yy = yy;

        this.date = new Date(mm+"/"+dd+"/"+yy);

        //console.log(this.date);
        this.el = el;

        this.create();
    }

    this.show = () => {
        this.el ? this.el.appendChild(this.vp) : "";
    }

    this.create = function(){

        vp = document.createElement("div");

        vp.id = "next1"
        
        vp2 = document.createElement("div");

        vp.appendChild(vp2);

        x = new Styler();

        x.select(vp2).propvalue({background:"red"}).set();

        vp.style.width = "100%";
        vp.style.zIndex = "1";
        
        vp.innerHTML = this.date;
        this.vp = vp;

    }
    
    

    this.attach = function () {
        
        this.el.appendChild(this.vp);

    }

    init();

}



