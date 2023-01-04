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

export const msToString = (ms:number)=>{
    const hours = Math.trunc((ms / 1000) / 60 / 60);
    const hoursToSec = hours * 60 * 60;
    const h = hours < 10 ? '0' + hours : String(hours);
    const minuts = Math.trunc((ms / 1000 - hoursToSec) / 60);
    const m = minuts < 10 ? '0' + minuts : String(minuts);
    const seconds = Math.trunc((ms / 1000 - hoursToSec - (minuts * 60)));
    const s = seconds < 10 ? '0' + seconds : String(seconds);
    return {h,m,s};
}