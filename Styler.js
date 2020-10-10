function Styler()
  {
        var style = (function () {
            
            if (document.getElementsByTagName('style')[0])
            {
                return document.getElementsByTagName('style')[0]; 

            }
            
            var x = document.createElement("style");

            document.head.appendChild(x);

            return x;

        })();

        console.log(style);

        style.type = 'text/css';
        
        var pv ="", sels = [], curr;

        this.select = function (sel)
        {
            if (typeof sel === "string")
            {
                sels.push(sel);

                curr = sel;

            } else {

                x = sel.parentNode.id;

                if (x)
                {
                    sel = "#"+x+" "+sel.nodeName;

                } else {

                    sel = sel.parentNode.nodeName+ " "+ sel.nodeName;

                }

                sel = sel.toLowerCase();

                console.log(sel);

                sels.push(sel);

                curr = sel;
                
            }

            return this;
            //style.innerHTML += sel + "{display : block;}"
        }

        this.propvalue = (obj, value = "") => {

            if (typeof obj === "object")
            {
                for(e in obj) {

                    temp_e = e;

                    if (e.match(/[A-Z]/g))
                    {
                        pos = e.match(/[A-Z]/g).map(function (cap) {
                            return "-"+cap.toLowerCase();
                        });

                        pos.forEach(el => {
                            e = e.replace(/[A-Z]/, el)
                        });
                    }


                    if (typeof obj[temp_e] === "string"){
                        pv += e + " : " + obj[temp_e] + ";";
                    }

                };

                //console.log(pv);
                
            } else {
                pv += obj + " : " + value + ";";
            }

            return this;
        }

        this.set = function(sel=undefined)
        {
            var add = (name, rules) => {
                
                if(!(style.sheet||{}).insertRule) {

                    (style.styleSheet || style.sheet).addRule(name, rules);
            
                } else {
            
                    style.sheet.insertRule(name+"{"+rules+"}",0);
            
                }

            }

            if (sel)
            {
                add(sels.find((e) => {return sel === e}), pv)

            } else {

                add(curr, pv)
            }
        }
  }
