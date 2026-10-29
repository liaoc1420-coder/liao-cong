// Public media paths also work under a GitHub Pages repository subdirectory.
export function assetUrl(path){
 if(!path)return undefined;
 if(/^(?:https?:|data:|blob:)/i.test(path))return path;
 const base=import.meta.env.BASE_URL;
 if(path.startsWith(base))return path;
 return base+path.replace(/^\/+/, '');
}
