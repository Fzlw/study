class Loading {
    constructor(ctx) {
        this.load();
    }

    load() {
        let XML = new XMLHttpRequest();
        XML.onreadystatechange = () => {
            if (XML.readyState === 4 && XML.status === 200) {
                console.log(XML.responseText);
            }
        }
        XML.open("GET", "./resource.json", true);
        XML.send(null);
    }
}

// export default Loading;