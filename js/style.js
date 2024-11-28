var wName = document.getElementById("name");
var wUrl = document.getElementById("url")
var wContent = document.getElementById("content");
var array = [];
const siteNameRegex = /^[a-zA-Z0-9]{1,21}$/;
const siteUrlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.(com|org)(\/[^\s]*)?$/;


array = JSON.parse(localStorage.getItem("DB"))||[];
displayContent();

function addURl (){

  if (!validateAllInputs()) return;

  var objectUrl = {
    name: wName.value ,
    url :wUrl.value
  }
 array.push(objectUrl);
 localStorage.setItem("DB" , JSON.stringify(array))
 displayContent();
 clearInput() 
  
}
function displayContent(){
  var htmlMarkup = "";
  for(var i = 0 ; i<array.length ; i++){
    htmlMarkup+=`      <tr>
        <td>${i+1}</td>
        <td>${array[i].name}</td>
        <td><button class="btn btn-success" onclick= "visitFunc(${i})"><i class="fa-solid fa-eye-low-vision"></i>
          visit</button></td>
        <td><button class= "btn btn-danger" onclick="deleteFunc(${i})"><i class="fa-solid fa-trash"></i>Delete</button></td>
      </tr>`
  }
  wContent.innerHTML=htmlMarkup
  
}
function deleteFunc(index){
  
  // console.log(index);

  array.splice(index,1);
  localStorage.setItem("DB" , JSON.stringify(array))
  displayContent()

}
function clearInput() {
  wName.value = "";
  wUrl.value = "";
}




function visitFunc(index){
  
  var url = array[index].url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }
  open(url, "_blank");

}


function validation(regex, inputValue, input) {
  if (regex.test(inputValue)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}
function showValidationError() {
  Swal.fire({
    html: `
      <div style="display: flex; margin-bottom: 15px; ">
        <div style="width: 20px; height: 20px; background-color:#F15F5D; border-radius: 50%; margin-right: 5px;"></div>
        <div style="width: 20px; height: 20px; background-color:#FEBE2E ; border-radius: 50%; margin-right: 5px;"></div>
        <div style="width: 20px; height: 20px; background-color: #4DB748; border-radius: 50%;"></div>
      </div>
       <div style="font-size: 20px; text-align: left; margin-bottom:16px"> Site Name or Url is not valid, Please follow the rules below </div>
      <ul style="list-style-type: none; text-align:left  ">
        <li>
         <i class="fa-regular fa-circle-right p-2" style= "color:#BB4120"></i>
    Site name must contain at least 3 characters
        </li>
        <li>  <i  class="fa-regular fa-circle-right p-2" style= "color:#BB4120"></i>Site URL must be a valid one</li>
      </ul>
    `,
    showCloseButton: true,
    confirmButtonText: 'OK',
    confirmButtonColor: '#d33',
  });
}
function validateAllInputs() {
  const isNameValid = validation(siteNameRegex, wName.value, wName);
  const isUrlValid = validation(siteUrlRegex, wUrl.value, wUrl);
// Not BE true MEANS EQUAL TO FUCKING  (false)  مش كل مره ترجع لأأمها 
  if (!isNameValid || !isUrlValid) {
    showValidationError();
    return false;
  }
  return true;
}

// /=====Key Logger=======/