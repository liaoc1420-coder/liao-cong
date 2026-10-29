import {readFile,writeFile} from 'node:fs/promises';
const projects=JSON.parse(await readFile(new URL('../src/projects.json',import.meta.url),'utf8'));
const cards=projects.map(({id,title,category,description,count,coverIndex=0,coverPosition,landscapes,images,thumbs,smallThumbs,galleryThumbs,imageDimensions,fullImageDimensions})=>{
 const indices=id==='autumn'&&landscapes.length?landscapes:[coverIndex];
 return {id,title,category,description,count,coverPosition,covers:indices.map(i=>({src:thumbs[i],small:smallThumbs?.[i]||thumbs[i],large:images[i],width:imageDimensions?.[i]?.[0]||1000,height:imageDimensions?.[i]?.[1]||1000,smallWidth:imageDimensions?.[i]?Math.round(imageDimensions[i][0]*Math.min(480/Math.max(...imageDimensions[i]),1)):480,largeWidth:fullImageDimensions?.[i]?.[0]||imageDimensions?.[i]?.[0]||1000}))};
});
await writeFile(new URL('../src/project-cards.json',import.meta.url),JSON.stringify(cards));
console.log(`Prepared ${cards.length} lightweight project cards.`);
