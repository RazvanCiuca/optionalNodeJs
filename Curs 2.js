var student = {
    firstName: 'John',
    lastName: 'Smith',
    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    }
};

console.log(student.fullName());

var student2 = student;
student2.firstName = 'Mary';
student2.lastName = 'Poppins';

//console.log(student2.fullName());

function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = function() {
        return this.firstName + ' ' + this.lastName;
    }
}

var a = new Student('Gica', 'Hagi');

//console.log(a.fullName());