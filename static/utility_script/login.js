var initial = document.getElementById('initial');
var login = document.getElementById('login');
var register1 = document.getElementById('register1');
var register2 = document.getElementById('register2');
var register3 = document.getElementById('register3');
//var username = 

//login option selected
document.getElementById('login-btn').addEventListener('click', function() { 
    clearClass(initial);
    clearClass(login);
    initial.classList.add('hide-element');
    login.classList.add('show-element--div');
 }, false);

document.getElementById('login-submit-btn').addEventListener('click',function(){
    var username = document.getElementById('login-username-field').value;
    var password = document.getElementById('login-password-field').value;
    validateLogin(username,password);
    setCookies(username);
}, false);

document.getElementById('spotify-button').addEventListener('click',function(){
	document.cookie = "service=1";
},false);

document.getElementById('apple-button').addEventListener('click',function(){
        document.cookie = "service=0";
},false);


//back button on LOGIN option is selected
document.getElementById('login-back-btn').addEventListener('click', function() { 
    clearClass(initial);
    clearClass(login);
    login.classList.add('hide-element');
    initial.classList.add('show-element--div');
 }, false);

 //register button is selected
 document.getElementById('register-btn').addEventListener('click', function() { 
    clearClass(initial);
    clearClass(register1);
    initial.classList.add('hide-element');
    register1.classList.add('show-element--div');
 }, false);

//next button on register1 is selected
document.getElementById('next1-btn').addEventListener('click', function() { 
   var username = document.getElementById('username-field').value;
   var password = document.getElementById('password-field').value;
   var password2 = document.getElementById('password-confirm').value; 
   validateUserPass(username,password,password2);
	//have to do more here to make sure panel doesnt chagne on bad input 
   /*clearClass(register1);
   clearClass(register2);
   register1.classList.add('hide-element');
   register2.classList.add('show-element--div');*/
}, false);

 //cancel button on register1 option is selected
 document.getElementById('cancel1-btn').addEventListener('click', function() { 
    clearClass(initial);
    clearClass(register1);
    register1.classList.add('hide-element');
    initial.classList.add('show-element--div');
 }, false);

 //next button on register2 is selected
 document.getElementById('next2-btn').addEventListener('click', function() { 
	var genderObj = document.getElementById('gender-field');
	var gender = genderObj.options[genderObj.selectedIndex].value;
	var countryObj = document.getElementById('countryId');
	var country = countryObj.options[countryObj.selectedIndex].value;
	var stateObj = document.getElementById('stateId');
	var state = stateObj.options[stateObj.selectedIndex].value;
	var cityObj = document.getElementById('cityId');
	var city = cityObj.options[cityObj.selectedIndex].value;
	var age = document.getElementById('age-field').value;
	
	var valid = validateDemoInput(gender,country,state,city,age);	
	if(valid){
		saveDemographicInfo(gender,country,state,city,age);
		clearClass(register2);
   		clearClass(register3);
   		register2.classList.add('hide-element');
   		register3.classList.add('show-element--div');
	}else{
		alert("invalid input, please make sure all fields are filled out");
	}

   /*clearClass(register2);
   clearClass(register3);
   register2.classList.add('hide-element');
   register3.classList.add('show-element--div');*/
}, false);

//cancel button on register2 option is selected
document.getElementById('cancel2-btn').addEventListener('click', function() { 
   clearClass(initial);
   clearClass(register2);
   register2.classList.add('hide-element');
   initial.classList.add('show-element--div');
}, false);

//cancel button on register3 option is selected
document.getElementById('cancel3-btn').addEventListener('click', function() { 
   clearClass(initial);
   clearClass(register3);
   register3.classList.add('hide-element');
   initial.classList.add('show-element--div');
}, false);

function saveUserPass(userName,passWord){

	
	$.ajax({
		url: 'http://ec2-3-88-85-136.compute-1.amazonaws.com:3001/userPass',
		timeout: 10000000,
		data:{
			'username': userName,
			'password': passWord
		}
	}).done(function(){
		console.log("sent");
	});
}

function saveDemographicInfo(gender,country,state,city,age){

	$.ajax({
                url: 'http://ec2-3-88-85-136.compute-1.amazonaws.com:3001/demographics',
                timeout: 10000000,
                data:{
                        'gender': gender,
                        'country': country,
			'state':  state,
			'city': city,
			'age': age,
			'username': document.cookie
                }
        }).done(function(){
                console.log("sent");
        });

}

function validateDemoInput(gender,country,state,city,age){
	if(gender.localeCompare('selectGender') == 0){
		console.log("booty gender");
		return false;
	}
	if(country.localeCompare('') == 0){
		return false;
	}
	if(state.localeCompare('') == 0){
		return false;
	}
	if(city.localeCompare('') == 0){
		return false;
	}
	if(age < 13 || age > 100){
		return false;
	}
	document.cookie = "gender=" + gender;
	document.cookie = "country=" + country;
	document.cookie = "state=" + state;
	document.cookie = "city=" + city;
	document.cookie = "age=" + age;
	return true;
}

function validateUserPass(userName,passWord,passWord2){
	
	if(userName.length < 5 || userName.length > 20 || passWord.length < 7 || passWord.localeCompare(passWord2) != 0){
		return false;
	}
	$.ajax({
		url: 'http://ec2-3-88-85-136.compute-1.amazonaws.com:3001/validateUsername',
		data: {
			username: userName
		}
	}).done(function(data){	
		console.log("done");
		if(data == false){
			console.log('booty username');
			alert("The username you selected already exists, please login or try a different username");
		}else{
			console.log('valid username');
			document.cookie = "username=" + userName;
			saveUserPass(userName,passWord);
			clearClass(register1);
			clearClass(register2);
			register1.classList.add('hide-element');
   			register2.classList.add('show-element--div');
		}
	});
	
}

function validateLogin(username,password){
	if(username.length < 5 || username.length > 20 || password.length < 7){
		return false;	 
	}
	$.ajax({
		url: 'http://ec2-3-88-85-136.compute-1.amazonaws.com:3001/validateLogin',
		data:{
			userName: username,
			passWord: password
		}
	}).done(function(data){
		console.log(data);
		if(data == false){
			
			alert("Invalid login");
		}else{
		 	console.log('Big Dubs');
			document.cookie = "username=" + username;
			window.location.href = "http://ec2-3-88-85-136.compute-1.amazonaws.com/home";
		}
	});
}

function setCookies(username){
	$.ajax({
		url: 'http://ec2-3-88-85-136.compute-1.amazonaws.com:3001/getUserInfo',
		data: {
			userName: username
		}
	}).done(function(data){
		console.dir(data);
		document.cookie = "city=" + data[0].city;
		document.cookie = "gender=" + data[0].gender;
		document.cookie = "country=" + data[0].country;
		document.cookie = "state=" + data[0].state;
		document.cookie = "age=" + data[0].age;
		document.cookie = "service=" + data[0].isSpotify;
	});
}
