
//   var x = new Styler();

//   x.addSelector("th")

//   x.propvalue({
//       border: "1px solid black"
//   })

//   x.set();

  function TableBuilder(id = undefined, cls="____js_table", attrs = {border:"1"}, hoverE = false)
  {
    var styler = new Styler();
    
    this.addAttr = function (el, attrs) {

        for (attr in attrs)
        {
            el.setAttribute(attr , attrs[attr]);
        }

    }

    this.setStyleAll = function(el, attrs){

        styler.select("."+this.cls+" "+ (typeof el === "string" ? el : el.nodeName)).propvalue(attrs).set();

    }

    var init = () => {

        this.table = document.createElement("table");

        this.cur = this.table;

        this.cls = cls ? cls : "____js_table";

        attrs.class = this.cls;
        
        this.addAttr(this.table, attrs);

        

        if (this.cls == "____js_table")
        {
            this.setStyleAll("th", {

                backgroundColor: "black",

                color:"white",

                padding:"5px"
            })
        }
        
        if (hoverE)
        {
            this.setStyleAll("td:hover > *",
            {
                backgroundColor:"whiteSmoke",
                color:"black",
                cursor:"pointer"
            })
        }

    }
    
    init();

    this.th = function (cont) {

        var h = document.createElement("th");

        h.innerHTML = cont;

        this.table.appendChild(h);

    }

    this.tr = function (rs) {

      var r = document.createElement("tr");

      this.table.appendChild(r);

      if (rs)
      {
          this.addAttr(r, {rowspan: rs});
      }

      this.cur = r

    }

    this.td = function (cont = "", cs) {
      
      var c = document.createElement("td");

      c.innerHTML = cont;
      
      if (cs)
      {
          this.addAttr(c, {colspan: cs});
      }

      this.cur.appendChild(c);

      return c;

    }

    this.enterHtml = function (c, data) {
      
      c.innerHTML = data;

    }

    this.append = function (el) {

      el.appendChild(this.table);
      
    }

    this.clearppend = function (el) {

        el.innerHTML = "";

        this.append(el);
    }
  }
