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

// Shows the date with the format: "dd/mm/yyyy HH:mm" or "dd/mm/yyyy" depending on the "time" value: true or false
const dateTimeFormat = (fecha,time) => {

    console.log(fecha)
    let tempDate = new Date(fecha);
    let fDate= tempDate.getDate() + "/" + (tempDate.getMonth()+1) + "/" + tempDate.getFullYear();
    let fTime= tempDate.getHours() + ":";
    
    if(time) {
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

