Template.channel.events({
    "click .toggle-checked": function () {
        // Set the checked property to the opposite of its current value
        Channel_List.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function () {
        Channel_List.remove(this._id);
    }
});