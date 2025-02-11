let cl = console.log;

const stdForm = document.getElementById("stdForm");
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email");
const contactControl = document.getElementById("contact");
const stdCotainer = document.getElementById("stdCotainer");
const stdTable = document.getElementById("stdTable");
const noStd = document.getElementById("noStd");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");




const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};


const stdTemplating = (arr) => {
let result ='';
arr.forEach((std,i) => {
    result+=`
        <tr id="${std.stdId}">
            <td>${i+1}</td>
            <td>${std.fname}</td>
            <td>${std.lname}</td>
            <td>${std.email}</td>
            <td>${std.contact}</td>
            <td><button class="btn btn-sm btn-dark" onClick="onEdit(this)" >Edit</button></td>
            <td><button class="btn btn-sm btn-danger" onClick="onRemove(this)" >Remove</button></td>               
        </tr>

` 
});
stdCotainer.innerHTML = result;
}

let stdArr = JSON.parse(localStorage.getItem("stdArr")) || []

if(stdArr.length > 0){
    stdTemplating(stdArr)
}else{
    stdTable.classList.add("d-none");
    noStd.classList.remove("d-none");
}


const onEdit = (ele) =>{
    let editId = ele.closest("tr").id;

    let getObj = stdArr.find(std => std.stdId === editId);
    cl(getObj)
    fnameControl.value = getObj.fname;
    lnameControl.value = getObj.lname;
    emailControl.value = getObj.email;
    contactControl.value = getObj.contact;

    localStorage.setItem("editId",editId);

    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}

const onStdAdd = (eve) =>{
      eve.preventDefault();
    let newStd = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        stdId : generateUuid(),
        updatCount : 0
    }
    stdArr.push(newStd)
    stdTable.classList.remove("d-none");
    noStd.classList.add("d-none");
    stdForm.reset()
    localStorage.setItem("stdArr",JSON.stringify(stdArr));



    let tr = document.createElement("tr")
    tr.id = newStd.stdId
    tr.innerHTML = `
                    
            <td>${stdArr.length}</td>
            <td>${newStd.fname}</td>
            <td>${newStd.lname}</td>
            <td>${newStd.email}</td>
            <td>${newStd.contact}</td>
            <td> <button class="btn btn-dark btn-sm " onClick ="onEdit(this)">Edit</button>
            </td>
            <td><button class="btn btn-danger btn-sm " onClick ="onRemove(this)">Remove</button></td>
    
    `
    stdCotainer.append(tr)

    Swal.fire({
        title : `new student ${newStd.fname} ${newStd.lname} is added succesfully`,
        timer : 3500,
        icon : 'success'
    })
}

const onUpdateStd = (ele) => {
    let updatedId = localStorage.getItem('editId')
    cl(updatedId)
    let updatedObj = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        updatCount : 0,
        stdId : updatedId

    }

    let getIndex = stdArr.findIndex(std => std.stdId === updatedId);
    cl(getIndex)
      
    stdArr[getIndex] = updatedObj;
   localStorage.setItem("stdArr",JSON.stringify(stdArr));
   let tr =[...document.getElementById(updatedId).children]
   cl(tr);

   tr[1].innerHTML = updatedObj.fname
   tr[2].innerHTML = updatedObj.lname
   tr[3].innerHTML = updatedObj.email
   tr[4].innerHTML = updatedObj.contact

    swal.fire({
        title : `New Student ${fname.value} ${lname.value} Updated Successfully !!!`,
        timer : 3500,
        icon : 'success'
    });

    submitBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    stdForm.reset()
}

const onRemove = (ele) => {

    let removeId = ele.closest("tr").id;

    let getIndex = stdArr.findIndex(std => std.stdId === removeId);

    stdArr.splice(getIndex, 1)




    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            ele.closest("tr").remove();
            localStorage.setItem("stdArr",JSON.stringify(stdArr));
        
        
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "student information has been deleted.",
            timer: 3500,
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "student info is safe :)",
            timer: 3500,
            icon: "error"
          });
        }
      });

      stdForm.reset()

}

stdForm.addEventListener('submit', onStdAdd)
updateBtn.addEventListener("click", onUpdateStd)














