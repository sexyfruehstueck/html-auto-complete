const CSS_URL = "autocomplete.css";

var link = document.createElement("link");
link.rel = "stylesheet";
link.href = CSS_URL;
document.getElementsByTagName("head")[0].appendChild(link);

let AutoComplete = (function(){
    
    function _init(element){
        element.loadData = _loadData;
        element.selectedItem = -1;
        element.itemsCount = 0;
        _addAutoCompleteBox (element);
        _addEvents (element);
    }

    function _addAutoCompleteBox(element){
        let parent = element.parentNode;    
        let ul = document.createElement("ul");
        let div = document.createElement("div");
        let input = parent.replaceChild(div, element);

        ul.className = "auto-complete-list hidden";
        div.className = "auto-complete-box";
        div.appendChild(input);
        div.appendChild(ul);
    }

    function _addEvents(element){
        element.addEventListener("keyup", _event_keyup);
        element.addEventListener("keydown", _event_keydown);
        element.addEventListener("blur", _event_blur);
    }

    function _loadData(data){
        let that = this;
        for (let item of data) {
            let text = (typeof(item) !== "object") ? item : item.value;
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(text));
            _addEventsListItem(li, that);
            this.parentNode.querySelector(".auto-complete-list").appendChild(li);
        }
    }

    function _addEventsListItem(li, element){
        li.addEventListener("mousedown", (event) => _event_mousedown(event, element));
        li.addEventListener("mouseover", (event) => _event_mouse_over(event, element));
    }

    function _event_mousedown(event, element){
        _selectItem(element, event.target);
        _select(element);
        event.preventDefault();
    }

    function _event_mouse_over(event, element){
        _deselectItems(element);
        _selectItem(element, event.target);
    }

    function _event_blur(event){
        _hideListBox(event.target);
    }

    function _event_keydown(event){
        if(event.key === "Tab"){
            _select(event.target);
        }
    }

    function _event_keyup(event){
        switch (event.key) {
            case "Escape":
                event.target.selectedItem = -1;
                _hideListBox(event.target);
                break;
            case "Enter":
                _select(event.target);
                break;
            case "ArrowUp":
                _selectPreviousItem(event.target);
                break;
            case "ArrowDown":
                _selectNextItem(event.target);
                break; 
            default:
                let found = false;
                event.target.itemsCount = 0;
                [].forEach.call(event.target.parentNode.querySelectorAll(".auto-complete-list li"), 
                    (element) => {
                        let found = new RegExp(event.target.value, "gi").test(element.innerText);
                        if(found){
                            element.itemIndex = event.target.itemsCount;
                            event.target.itemsCount++;
                        }
                        Helper.toggleClass(element, "hidden", !found);
                    }
                );
                _setSelectedItem(event.target);
                _displayListBox(event.target);
        }
        _displaySelectedItem(event.target);
    }

    function _select(element){
        let item = element.parentNode.querySelector(".auto-complete-list .selected");
        if(item){
            element.value = item.innerText;
            _hideListBox(element);
        }
    }

    function _setSelectedItem(element){
        element.selectedItem = element.itemsCount > 0 ? 0 : -1;
    }

    function _selectItem(element, listItem){
        element.selectedItem = listItem.itemIndex;
        _displaySelectedItem(element);
    }

    function _selectPreviousItem(element){
        if(element.itemsCount > 0){
            if(element.selectedItem > 0){
                element.selectedItem--;
            }
        }
    }

    function _selectNextItem(element){
        if(element.itemsCount > 0 && element.itemsCount > element.selectedItem + 1 ){
            element.selectedItem++;
        }
    }

    function _deselectItems(element){
        [].forEach.call(
            element.parentNode.querySelectorAll(".auto-complete-list li:not(hidden)"),
            (currentElement) => {
                Helper.toggleClass(currentElement, "selected", false);
            }
        );
    }

    function _displaySelectedItem(element){
        _deselectItems(element);
        if(element.selectedItem > -1){
            Helper.toggleClass(element.parentNode.querySelectorAll(".auto-complete-list li:not(.hidden)")[element.selectedItem], "selected", true);
        }
    }

    function _hideListBox(element){
        Helper.toggleClass(
            element.parentNode.querySelector(".auto-complete-list"), 
            "hidden",
            true
        );
    }

    function _displayListBox(element){
        Helper.toggleClass(
            element.parentNode.querySelector(".auto-complete-list"), 
            "hidden",
            element.parentNode.querySelectorAll(".auto-complete-list li:not(.hidden)").length === 0
        );
    }

    return {
        init: _init
    };
})();

let Helper = (function(){
    function _toggleClass(element, className, set){

        if(set === undefined){
            set = new RegExp(`\\b${className}\\b/`,"gi").test(element.className);
        }

        element.className = element.className.replace(new RegExp(`\\s*${className}\\b`,"gi"), "");

        if(set){
            element.className += ` ${className}`;
        } 
    }
    return {
        toggleClass: _toggleClass
    };
}())