import Edit from "../components/views/one/Edit";

export default class todo extends Edit {
    constructor(props) {
        super(props);
    }

    extraCondition = (model, value, input) => {
        // const a = this.createFilter("firstname", "contains", "a");
        if (model.id === "city" && value != undefined) {
            const b = this.createFilter("CountrySNo", "eq", value.value);
            return this.setFilter(b, "contact_name");
        }

        // const group1 = this.createGroup("AND", a, b);
        // return this.setFilter(group1, "contact_name");
    }

    extraParameter = (model, value, input) => {
        // return this.setParam({ "@PageSize": "10", "@WhereCondition": "(CAST([firstname] AS VARCHAR(MAX)) like '%%' )", "@TableName": "contact", "@KeyColumn": "id", "@TextColumn": "firstname", "@TemplateColumn": "firstname" });
    }

    openPopUp = (e) => {
        if (this.refs.popup1) {
            this.refs.popup1.setState({ show: true });
        }
    }

    hidePopUp = (e) => {
        console.log("hide")
    }
}