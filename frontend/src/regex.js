export const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
 );
 export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
 
 export const validName = new RegExp('^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$');
 export const validPhoneNumber = new RegExp('^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$');

//  export default function validDay(date){
//      const splitTime = date.split('-');
//      const year = parseInt(splitTime[0]);
//      const month = parseInt(splitTime[1]);
//      const day = parseInt(splitTime[2]);
//      const dayCurrent = new Date().getDate();
//     const monthCurrent = new Date().getMonth();
//     const yearCurrent = new Date().getFullYear();
//     return year >= yearCurrent && month >= monthCurrent && day >= dayCurrent;
//  }

 //validName validPhoneNumber validDate