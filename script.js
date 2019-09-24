class CardPeople{
	constructor(){
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthday = birthday;
		this.addres = addres;
		this.phone = phone;
		this.email = email;
		this.id = peopleStorage.length;
		this.cars = [];
	}
	addInfo(){
		this.firstName = document.getElementById('firstName').value;
		this.lastName = document.getElementById('lastName').value;
		this.birthday = document.getElementById('birthday').value;
		this.addres = document.getElementById('addres').value;
		this.phone = document.getElementById('phone').value;
		this.email = document.getElementById('email').value;
	}
}
class CardCar{
	constructor(){
		this.make = make; 
		this.model = model;
		this.year = year; 
		this.vin = vin;
		this.orders = [];
		this.owner = '';
		this.id = carStorage.length;
	}
	addInfo(){
		this.make = document.getElementById('make').value;
		this.model = document.getElementById('model').value;
		this.year = document.getElementById('year').value;
		this.vin = document.getElementById('vin').value;
		this.owner = document.getElementById('selectOwner').value;
	}
}
class CardOrder{
	constructor(){
		this.date = date; 
		this.orderAmount =orderAmount;
		this.orderStatus = orderStatus;
		this.car = ''; 
		this.id = orderStorage.length;
	}
	addInfo(){
		this.date = document.getElementById('date').value;
		this.orderAmount = document.getElementById('orderAmount').value;
		this.orderStatus = document.getElementById('orderStatus').value;
		this.car = document.getElementById('selectCar').value;
	}
}

const peopleStorage = [];
const orderStorage = [];
const carStorage = [];

const addButton = document.getElementById('addButton');
const backButton = document.getElementById('backButton');
const saveButton = document.getElementById('saveButton');

const createClientCardButton = document.getElementById('createClientCardsAction');
const createListOfOrdersButton = document.getElementById('createListOfOrdersAction');
const createCarCardButton = document.getElementById('createCarCardsAction');
const clientCardsButton = document.getElementById('clientCardsAction');
const listOfOrdersButton = document.getElementById("listOfOrdersAction");
const carCardButton = document.getElementById('carCardsAction');

const list = document.getElementById('list');

function clearViev(){
	list.innerHTML = '';
	document.getElementsByClassName('car')[0].style.display = 'none';
	document.getElementsByClassName('people')[0].style.display = 'none';
	document.getElementsByClassName('order')[0].style.display = 'none';
	document.getElementById('button-container').style.display = 'none';
}
function createObj(className,array,arrayMain){
	let obj = new className();
	obj.addInfo();
	array.push(obj);
	for (let i = 0; i<arrayMain.length;i++){
		if(arrayMain[i].constructor.name == "CardPeople" && obj.owner && arrayMain[i].firstName == obj.owner){
			arrayMain[i].cars.push(obj);
		}
		if(arrayMain[i].constructor.name == "CardCar" && obj.car && arrayMain[i].make == obj.car){
			arrayMain[i].orders.push(obj);
		}
	}
}
function addToStorage(){
	const addAttr = addButton.getAttribute('data-target');
	switch (addAttr){
		case 'people':createObj(CardPeople,peopleStorage,[]);
		break;
		case 'car': createObj(CardCar,carStorage,peopleStorage);
		break;
		case 'order': createObj(CardOrder,orderStorage,carStorage);
		break;
	}
	alert('Add');	
}
function listForm(id,array,key){
	const listSelect = document.getElementById(id);
	listSelect.innerHTML='';
	for (let i = 0; i<array.length;i++){
		const oElement = document.createElement('option');
		oElement.textContent = array[i][key];
		oElement.value = array[i][key];
		oElement.id = 'option '+i;
		listSelect.appendChild(oElement);
	}
}

backButton.addEventListener('click',clearViev);
addButton.addEventListener('click',addToStorage);

function vievList(array){
	list.innerHTML = '';
	const ulElement = document.createElement('ul');
	ulElement.className = 'list-group list-group-flush';
	list.appendChild(ulElement);
	for(let i =0; i< array.length;i++){
		const liElement = document.createElement('li');
		liElement.className = 'list-group-item';
		ulElement.appendChild(liElement);

		const aElement = document.createElement('a');
		if(array[i].firstName){
			aElement.innerHTML = array[i].firstName;
		} else if(array[i].date){
			aElement.innerHTML = array[i].date;
		} else if(array[i].make){
			aElement.innerHTML = array[i].make;
		}
		aElement.href = '';
		aElement.setAttribute('data-toggle',"modal");
		aElement.setAttribute('data-target',"Modal");
		aElement.id = array[i].id;
		liElement.appendChild(aElement);
		aElement.addEventListener('click',()=>{
			const divModalContent = document.getElementById('modal-body-content');
			let str = '';
			if (array[i].firstName){
				for(let ind = 0;ind< array[i].cars.length; ind++){
					str+= array[i].cars[ind].make+' ';
				}
				divModalContent.innerHTML = 'First Name: '+array[i].firstName+'<br>Last Name: '+array[i].lastName+'<br>Date of Birth: '+array[i].birthday+'<br>Addres: '+array[i].addres+'<br>Phone: '+array[i].phone+'<br>Email: '+array[i].email+'<br>Cars: '+str;
			} else if (array[i].date){
				divModalContent.innerHTML = 'Car: '+array[i].car+'<br>Date: '+array[i].date+'<br>Order Amount: '+array[i].orderAmount+'<br>Order Status: '+array[i].orderStatus;
			} else if (array[i].make){
				for(let ind = 0;ind< array[i].orders.length; ind++){
					str+= array[i].orders[ind].date+'; ';
				}
				divModalContent.innerHTML = 'Owner: '+array[i].owner+'<br>Make: '+array[i].make+'<br>Model: '+array[i].model+'<br>Year: '+array[i].year+'<br>VIN: '+array[i].vin+'<br>Date: '+str;
			}
			$('#Modal').modal('show');
		})

		const deleteButton = document.createElement('button');
		liElement.appendChild(deleteButton);
		deleteButton.type = 'button';
		deleteButton.className = 'btn btn-outline-danger';
		deleteButton.innerText = 'Delete';
		deleteButton.style = 'float: right';

		const editButton = document.createElement('button');
		liElement.appendChild(editButton);
		editButton.type = 'button';
		editButton.className = 'btn btn-outline-primary';
		editButton.innerText = 'Edit';
		editButton.style = 'float: right';

		editButton.addEventListener('click',()=>{
			list.innerHTML = '';
			switch(array[i].constructor.name){
				case "CardPeople":
					document.getElementsByClassName('people')[0].style.display = 'block';
					document.getElementById('firstName').value = array[i].firstName;
					document.getElementById('lastName').value = array[i].lastName;
					document.getElementById('birthday').value = array[i].birthday;
					document.getElementById('addres').value = array[i].addres;
					document.getElementById('phone').value = array[i].phone;
					document.getElementById('email').value = array[i].email;
					break;
				case "CardOrder":
					document.getElementsByClassName('order')[0].style.display = 'block';
					document.getElementById('date').value = array[i].date;
					document.getElementById('orderAmount').value = array[i].orderAmount;
					document.getElementById('orderStatus').value = array[i].orderStatus;
					break;
				case "CardCar":
					document.getElementsByClassName('car')[0].style.display = 'block';
					document.getElementById('selectOwnerDiv').style.display = 'none';
					document.getElementById('make').value = array[i].make;
					document.getElementById('model').value = array[i].model;
					document.getElementById('year').value = array[i].year;
					document.getElementById('vin').value = array[i].vin;
					break;															
			}
			const saveButton = document.createElement('button');
			saveButton.type = 'button';
			saveButton.className = 'btn btn-success';
			saveButton.innerText = 'Save';
			saveButton.style.display = 'block';
			saveButton.style = 'margin-top: 10px';
			list.appendChild(saveButton);

			saveButton.addEventListener('click',()=>{
				array[aElement.id].addInfo();
				alert("Saved");
				clearViev();
			})
		})
		function deleteInfo(){
			if(array[i].constructor.name == 'CardCar' && array[i].orders.length != 0){
				alert('Unable to delete entry because the machine has orders');
				return;
			}
			if(array[i].constructor.name == 'CardPeople' && array[i].cars.length != 0){
				alert('Unable to delete entry because a person has cars');
				return;
			}

			if(array[i].constructor.name == 'CardCar'){
				for(let index = 0;index<peopleStorage.length;index++){
					let obj = peopleStorage[index].cars.indexOf(array[i]);
					if (obj > -1 && obj < peopleStorage[index].cars.length){
						peopleStorage[index].cars.splice(obj,1);
					}
				}
			}
			if(array[i].constructor.name == 'CardOrder'){
				for(let index = 0;index<carStorage.length;index++){
					let obj = carStorage[index].orders.indexOf(array[i]);
					if (obj > -1 && obj < carStorage[index].orders.length){
						carStorage[index].orders.splice(obj,1);
					}
				}
			}
			array.splice(array[i].id,1);
			for (let i = 0; i< array.length;i++){
				array[i].id = i;
			}
			vievList(array);			
		}
		deleteButton.addEventListener('click',deleteInfo)
	}
}

clientCardsButton.addEventListener('click', ()=>{
	clearViev();
	vievList(peopleStorage);	
})
listOfOrdersButton.addEventListener('click',()=>{
	clearViev();
	vievList(orderStorage);
})
carCardButton.addEventListener('click', ()=>{
	clearViev();
	vievList(carStorage);
})

createClientCardButton.addEventListener('click',()=>{
	clearViev();
	document.getElementsByClassName('people')[0].style.display = 'block';
	document.getElementById('button-container').style.display = 'block';
	addButton.setAttribute('data-target','people');
})
createListOfOrdersButton.addEventListener('click',()=>{
	clearViev();
	document.getElementsByClassName('order')[0].style.display = 'block';
	document.getElementById('button-container').style.display = 'block';
	addButton.setAttribute('data-target','order');
	listForm("selectCar",carStorage,"make");
})
createCarCardButton.addEventListener('click',()=>{
	clearViev();
	document.getElementsByClassName('car')[0].style.display = 'block';
	document.getElementById('button-container').style.display = 'block';
	addButton.setAttribute('data-target','car');
	listForm("selectOwner",peopleStorage,"firstName");
})
