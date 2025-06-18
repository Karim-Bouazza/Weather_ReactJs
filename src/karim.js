export default function karim (currentState, action) {
   const type = action.type;
   
   if(type == "add") {
       const {number1, number2} = action.payload;
       return Number(number1) + Number(number2);
   } else if(type == "sub") {
        const {number1, number2} = action.payload;
        return number1 - number2;
   } else if(type == "mul") {
        const {number1, number2} = action.payload;
        return number1 * number2;
   } else if(type == "div") {
        const {number1, number2} = action.payload;
        return number1 / number2;
   }
}