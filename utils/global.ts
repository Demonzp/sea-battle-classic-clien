type TObj = { [key: string]: any };

export const compairValuesObjs = (obj1: TObj, obj2: TObj)=>{
    if(Object.keys(obj1).length===Object.keys(obj2).length){
        for (const key in obj1) {
            if (obj1.hasOwnProperty(key)&&obj2.hasOwnProperty(key)) {
                if(obj1[key]!==obj2[key]){
                    return false;
                }
            }else{
                return false;
            }
        }
        return true;
    }else{
        return false;
    }
}