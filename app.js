//url doesnt exist hence code wont run but its correct
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";//url doesnt exist hence code wont run but its correct

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");//creating countries names by adding them from codes.js to dropdown's select
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);//adding the countries list one by one to select
    }

    select.addEventListener("change",(evt)=>{//when change the curr then flag should also update
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");// what user inputed 
    let amtVal = amount.value; 
    //if user left field blank or 0 or negative no. automatically reset / asign value 1 and show 1 on the input field also
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    //send request to the api - send from and to value in lowercase(as the currency codes are in uppercase but api gives in lowercase)
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];//this is the conversion rate in data array(decided on the  basis of api output)means 1 from curr= ? to curr
  
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  };
  

const updateFlag=(element)=>{
    let currCode=element.value;//current code i.e. inr or usd 
    let countryCode = countryList[currCode];//id for inr, us for usd
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;//source link of new updated flag as per currency selected
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;//updated the source file of image  with updated source
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();//stop all default actions (like page refresh)that happens when we click button
    updateExchangeRate();//instead do this
});
  
  window.addEventListener("load", () => {
    updateExchangeRate();
});