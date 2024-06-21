import path from "path"
export const projectPath=path.resolve(__dirname,'../../')



export const distPath=(key:string)=>{
    return path.resolve(__dirname,'../../'+key)
}


export const outDir=path.resolve(__dirname,'../../dist')


export const compInputPath=path.resolve(__dirname,'../../packages/ws-plus')

export const componentsPath=path.resolve(projectPath,'packages/components')