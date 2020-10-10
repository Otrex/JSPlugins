

    function Doc(type, attr, children, id) {

        var _ = document;

        var init = () => {

            this.attr = attr;

            this._id = id;

            this.children = children;

            this.tag = _.createElement(type);

            this.setupAttr();

            this.attachChildren();
        }

        this.setupAttr = function () {

            for(x in this.attr)
            {
                att = _.createAttribute(x);

                att.value = this.attr[x];

                this.tag.setAttributeNode(att);
            }   
        }

        this.attachChildren = function () {

            if (!this.children) return ;
            this.children.forEach(child =>{

                for (x in child)
                {
                   // console.log(child);
                    if (x ==="textNode")
                    {
                        this.tag.innerHTML += child[x].text;

                        continue;

                    }
                    //console.log(child)
                    this.tag.appendChild(new Doc (x, child[x].attr, child[x].children, child[x]._id).tag);
                    //console.log(this.tag)
                }

            })
        }

        init();
    }
    
    function Parser__(json) {
        
        var _ = document;
        
        var cv = _.body;

        var init = () => {
            
            for (x in json)
            {
                v = new Doc(x, json[x].attr, json[x].children, json[x]._id)

                //console.log(v);
            }


            cv.appendChild(v.tag);
        }

        init();
    }

