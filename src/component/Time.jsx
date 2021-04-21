import React from 'react';
import {useState , useEffect} from 'react';
import './Time.css';
import {Dropdown,DropdownButton} from 'react-bootstrap';
function Time(){


      const [currency1,changecurrency1]=useState("USD");
      const [currency2,changecurrency2]=useState("INR");
      const [value1,changevalue1]=useState(1);
      const [value2,changevalue2]=useState(2);
      const[disclaimer,setdisclaimer]=useState(" ");
      const[flag,setflag]=useState(0);
      const currencyname =[
          {ABB : "USD", name : "United State Dollar"},
          {ABB : "AED", name : "United Arab Emirates Dirham"},
          {ABB : "GBP", name : "Great Britain Pound"},
          {ABB : "CAD", name : "Canada Dollar"},
          {ABB : "SGD", name : "Singapore Dollar"},
          {ABB : "EUR", name : "Euro"},
          {ABB : "JPY", name : "Japan Yen"},
          {ABB : "PKR", name : "Pakistan Rupee"},
          {ABB : "ZAR", name : "South Africa Rand"},
          {ABB : "ALL", name : "Albanian Lek"},
          {ABB : "INR", name : "Indian Rupee"}

        
      ];
      const[displayname1,changename1]=useState("United State Dollar");
      const[displayname2,changename2]=useState("Indian Rupee");
      const [tempv1,changetempv1]=useState(1);
      
     function handleClick(e)
     {

    
         
       if(e.target.name === "name1")
       {
                var value = e.target.id;
               var link=currencyname[value].ABB;
                changecurrency2(link);
                changename2(currencyname[value].name);
                fetch('https://open.exchangerate-api.com/v6/latest/' + link)
           .then(async response =>{
            const user = await response.json();
            setdisclaimer(user.time_last_update_utc);  
            var parameter = user.rates[currency1];
            changevalue2((parameter*tempv1).toFixed(3));
             changevalue1(tempv1);
           })

      }
     else if(e.target.name === "name2")
     {
        var value = e.target.id;
        fetch('https://open.exchangerate-api.com/v6/latest/' + currency2)
        .then(async response =>{
         const user = await response.json();
         setdisclaimer(user.time_last_update_utc);  
         var parameter = user.rates[currencyname[value].ABB];
          changevalue2((parameter*tempv1).toFixed(3));
          changevalue1(tempv1);
          changecurrency1(currencyname[value].ABB);
          changename1(currencyname[value].name);
          console.log(currency2,parameter,tempv1);
        })
     }
    
        

     }
     function handleChange(e)
     {
         console.log(e.target.value);
         changetempv1(e.target.value);
         fetch('https://open.exchangerate-api.com/v6/latest/' + currency2)
         .then(async response =>{
          const user = await response.json();
          var parameter = user.rates[currency1];
          changevalue2((parameter*e.target.value).toFixed(3));
           //changevalue2(parameter*);
           changevalue1(e.target.value);
           setdisclaimer(user.time_last_update_utc);
         })
         
     }
     function fetchdata()
     {
        fetch('https://open.exchangerate-api.com/v6/latest/' + currency2)
        .then(async response =>{
            const user = await response.json();
            //console.log(user.time_last_update_utc);
            setdisclaimer(user.time_last_update_utc);
            changevalue2((user.rates[currency1]).toFixed(3));
           
        })
            
        .then(console.log("error"));
       
           
     }
     useEffect(async () => {
        if(flag === 0)
        {
            setflag(1);
            fetchdata();
        }
      });
    return(
     <div class="time">
         <h1 class="title">FOREX CALCULATOR</h1>
      <div class=" timebox">
        
       <div class = "row written">
           <h1>{value1} {displayname2} equals {value2} {displayname1}</h1>
           <h7 class="disclaimer">Last Updated : {disclaimer}</h7>
       </div>
       <div class="row row1">
           <div class="col-lg-2 col1 col12">
           <input name="value1" class="inputclass" onChange={handleChange}></input></div> <div class="col-lg-2 col2">
           <DropdownButton id="dropdown-basic-button" title={currency2}>
  <Dropdown.Item href="#/0" id="0" name="name1" onClick={handleClick}>USD</Dropdown.Item>
  <Dropdown.Item href="#/1" id="1" name="name1" onClick={handleClick}>AED</Dropdown.Item>
  <Dropdown.Item href="#2" id ="2" name="name1" onClick={handleClick}>GBP</Dropdown.Item>
  <Dropdown.Item href="#/0" id="3" name="name1" onClick={handleClick}>CAD</Dropdown.Item>
  <Dropdown.Item href="#/1" id="4" name="name1" onClick={handleClick}>SGD</Dropdown.Item>
  <Dropdown.Item href="#/0" id="5" name="name1" onClick={handleClick}>EUR</Dropdown.Item>
  <Dropdown.Item href="#/1" id="6" name="name1" onClick={handleClick}>JPY</Dropdown.Item>
  <Dropdown.Item href="#2"  id="7" name="name1" onClick={handleClick}>PKR</Dropdown.Item>
  <Dropdown.Item href="#/0" id="8" name="name1" onClick={handleClick}>ZAR</Dropdown.Item>
  <Dropdown.Item href="#/1" id="9" name="name1" onClick={handleClick}>ALL</Dropdown.Item>
  <Dropdown.Item href="#/1" id="10" name="name1" onClick={handleClick}>INR</Dropdown.Item>

</DropdownButton>
           </div></div>
       
       <div class="row row2">
           <div class="col-lg-2 col1 col11">
          {value2}</div>
           <div class="col-lg-2 col2">
           <DropdownButton id="dropdown-basic-button" title={currency1}>
           <Dropdown.Item href="#/0" id="0" name="name2" onClick={handleClick}>USD</Dropdown.Item>
  <Dropdown.Item href="#/1" id="1" name="name2" onClick={handleClick}>AED</Dropdown.Item>
  <Dropdown.Item href="#2" id ="2" name="name2" onClick={handleClick}>GBP</Dropdown.Item>
  <Dropdown.Item href="#/0" id="3" name="name2" onClick={handleClick}>CAD</Dropdown.Item>
  <Dropdown.Item href="#/1" id="4" name="name2" onClick={handleClick}>SGD</Dropdown.Item>
  <Dropdown.Item href="#/0" id="5" name="name2" onClick={handleClick}>EUR</Dropdown.Item>
  <Dropdown.Item href="#/1" id="6" name="name2" onClick={handleClick}>JPY</Dropdown.Item>
  <Dropdown.Item href="#2"  id="7" name="name2" onClick={handleClick}>PKR</Dropdown.Item>
  <Dropdown.Item href="#/0" id="8" name="name2" onClick={handleClick}>ZAR</Dropdown.Item>
  <Dropdown.Item href="#/1" id="9" name="name2" onClick={handleClick}>ALL</Dropdown.Item>
  <Dropdown.Item href="#/1" id="10" name="name2" onClick={handleClick}>INR</Dropdown.Item>

</DropdownButton>
           </div>
       </div>

      </div>
      </div>
      
    );
}
export default Time;
