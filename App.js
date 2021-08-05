compareObj=(obj1,obj2)=>{

  console.log(Object.entries(obj1) )
   console.log(Object.entries(obj2) )
  let firstObjKeys = Object.keys(obj1);
  let secondObjKeys = Object.keys(obj2);
   

  
 
  if(Object.entries(obj1).length>0){
    Object.entries(obj1).map(objKeys1=>{
      
      if(typeof (objKeys1)=="object"){
        console.log(objKeys1,' is a Object')
      }
      else{
        console.log(objKeys1,' is a Array')
      }
    })
  }

// if(obj1.includes(obj2)){
//   return true
// }
// else{
//   return false
// }


}

obj1 = {'y':'y', 'x':'x', n:{'p':{'b':'b', 'a':'a'}}}
obj2 = {'b':'b', 'a':'a'}

compareObj(obj1,obj2)