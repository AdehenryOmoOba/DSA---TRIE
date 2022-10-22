function collector(pResult, pChar){
    let result = []

    if(!pResult.length){
        result.push([])
        result.push([pChar])
        return result
    }

    for(let subArr of pResult){
     let negative = subArr[0] 
     negative ? result.push([negative]) : result.push([])
     let positive = subArr[0] || ""
     positive += pChar
     result.push([positive])
    }
    return result
}

function combination(str){
    let result = []

    for (let char of str){
        const xxx = collector(result, char)
        result = [...xxx]
    }
    console.log({result, length: result.length})
    return result
}

combination("abcd")