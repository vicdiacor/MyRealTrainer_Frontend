import DateTimePicker from '@react-native-community/datetimepicker';

// Shows a clock or a calendar depending on the date-type you choose
// mode: time || date
const datePicker= (mode,defaultValue,onChangeFunction) => {

    return <DateTimePicker
          
    testID="dateTimePicker"
    value={defaultValue}
    mode={mode}
    is24Hour={true}
    onChange={onChangeFunction}
    />
    
}

// Shows the date with the format: "dd/mm/yyyy HH:mm" , "dd/mm/yyyy" or "HH:mm" depending on the "haveTime" and 
// haveDay values (true or false)
const dateTimeFormat = (fecha,haveTime,haveDay=true) => {

   
    let tempDate = new Date(fecha)
    let fDate= "";
    if (haveDay){
        let day = "" + tempDate.getDate();
        /\d\d/.test(day) ? fDate += day + "/": fDate += "0" + day + "/"
        
        let month = (tempDate.getMonth()+1) + "";
        /\d\d/.test(month) ? fDate += month + "/" : fDate += "0" + month + "/"

        fDate += "" + tempDate.getFullYear()
    }

    if(haveTime) {
    let fTime= tempDate.getHours() + ":";
        if(tempDate.getMinutes()<10){
      fTime+="0"
        }
        fTime+=tempDate.getMinutes();
        return fDate + " " + fTime
    }else{
        return fDate
    }
  };

// Modifies the input date format to submitting it to the backend
const dateFormatterToSubmit = (date) => {


    let tempDate = new Date(date);
    let fDate= tempDate.getFullYear() + "-";
    if(tempDate.getMonth()+1<10){
        fDate+="0";

    }
    fDate+=tempDate.getMonth()+1;
    fDate+="-";

    if(tempDate.getDate()<10){
        fDate+="0";

    }
    fDate+=tempDate.getDate();

    let horas= tempDate.getHours();
    let tiempo= "T";
    if(horas<10){ //Add hours
        tiempo+="0"
        tiempo+=horas;
        tiempo+=":";
    }else{
        tiempo+=horas;
        tiempo+=":";
    }

    if(tempDate.getMinutes()<10){
        tiempo+="0"
    }
    tiempo+=tempDate.getMinutes();
    tiempo+=":00"
    return fDate + tiempo
};

function calculateAge(birthdayDate) {
    var ageInMs = Date.now() - birthdayDate;
    var ageDate = new Date(ageInMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

export {datePicker,dateTimeFormat,dateFormatterToSubmit,calculateAge}

