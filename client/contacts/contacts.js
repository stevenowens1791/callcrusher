Template.Contacts_show.helpers({
    contacts: function(){
			return Contacts.find();
		}
    
  });

   Template.Contacts_show.events({
    "submit .new-contact": function (event) {

      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var nameProp = event.target.name.value;
	  var phoneProp = event.target.phone.value;

      // Insert a task into the collection
     // Insert a task into the collection
      Contacts.insert({
        name: nameProp,
		phone: phoneProp,
		createdBy:  Meteor.user().username,
		lastCalled: null,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.name.value = "";
	  event.target.phone.value = "";
     }
   });

   Template.contact.events({
    "click .call": function () {

	document.location.href = 'tel:'+this.phone;
	Contacts.update(this._id, {
        $set: {lastCalled: new Date()}
      });
    }
  });