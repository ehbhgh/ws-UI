import path from "path"
export const projectPath=path.resolve(__dirname,'../../')



export const distPath=(key:string)=>{
    return path.resolve(__dirname,'../../'+key)
}


export const outDir=path.resolve(__dirname,'../../dist')