import Edit from "../components/views/one/Edit";

export default class aircraft extends Edit {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        document.getElementById("aircraftType").addEventListener("blur", this.alertt)
    }
    alertt = (e) => {
        alert("aircraftType");
    }

    hidePopUp = (e) => {
        console.log("hide")
    }
}