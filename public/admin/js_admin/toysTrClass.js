class ToysTrClass {
    constructor(_parent, _item, _index, _deletetoys) {
        this.parent = _parent;
        this._id = _item._id;
        this.name = _item.name;
        this.info = _item.info || "";
        this.category = _item.category;
        this.img_url = _item.img_url;
        this.price = _item.price;
        this.index = _index;
        ////FUNCTION DELETE PARAMTER
        this.deletetoys = _deletetoys
    }

    render() {
        let tr = document.createElement("tr");
        document.querySelector(this.parent).append(tr);
        tr.innerHTML += `
    <td>${this.index + 1}</td>
    <td>${this.name}</td>
    <td>${this.info.substring(0, 30)}...</td>
    <td>${this.category}</td>
    <td>${this.img_url}</td>
    <td>${this.price}</td>
    <td>
      <button class="btn btn-danger btn-del">x</button>
    </td>
    `

        let delBtn = tr.querySelector(".btn-del");
        delBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete the toys?")) {
                this.deletetoys(this._id);
            }
        })
    }


}

export default ToysTrClass;