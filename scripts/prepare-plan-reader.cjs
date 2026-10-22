// Optional asset preparation for updated planning PDFs. Generated WebP files are
// committed, so ordinary site builds do not need Poppler.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const sharp=require('sharp');
const poppler=name=>process.env.POPPLER_BIN?path.join(process.env.POPPLER_BIN,name+(process.platform==='win32'?'.exe':'')):name;
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
(async()=>{
 const output='public/assets/plan-reader',temp='tmp/pdfs/plan-reader';
 fs.mkdirSync(output,{recursive:true});fs.mkdirSync(temp,{recursive:true});
 const archiveText=fs.readFileSync('src/archiveContent.js','utf8');
 const projects=JSON.parse(archiveText.slice(archiveText.indexOf('['),archiveText.lastIndexOf('];')+1));
 const manifest={};
 for(const name of ['nutrition','sanfu','yunnan']){
  const document=`${name}-brand-plan.pdf`,pdf=`public/assets/documents/${document}`;
  const info=execFileSync(poppler('pdfinfo'),[pdf],{encoding:'utf8'});
  const count=Number(info.match(/^Pages:\s+(\d+)/m)?.[1]);
  if(!count)throw Error('Could not determine page count: '+document);
  const project=projects.find(p=>p.document===`assets/documents/${document}`);
  if(name!=='nutrition'&&project.items.length!==count)throw Error('Existing gallery does not contain the full plan: '+document);
  const pages=[];
  for(let index=0;index<count;index++){
   const page=String(index+1).padStart(2,'0');
   const src=name==='nutrition'?`assets/plan-reader/${name}-${page}.webp`:project.items[index].src;
   if(name==='nutrition'){
    const png=path.join(temp,`${name}-${page}`);
    execFileSync(poppler('pdftoppm'),['-f',String(index+1),'-l',String(index+1),'-singlefile','-scale-to-x','1800','-scale-to-y','-1','-png',pdf,png],{stdio:'pipe'});
    await sharp(png+'.png').webp({quality:88,effort:4}).toFile('public/'+src);
    fs.unlinkSync(png+'.png');
   }
   const small=`assets/plan-reader/${name}-${page}-small.webp`;
   await sharp('public/'+src).resize({width:900,withoutEnlargement:true}).webp({quality:86,effort:4}).toFile('public/'+small);
   const {width,height}=await sharp('public/'+src).metadata();
   pages.push({src,small,width,height});
   if((index+1)%10===0||index===count-1)console.log(`${name}: ${index+1}/${count}`);
  }
  manifest[document]={sourceSHA256:hash(pdf),pages};
 }
 fs.writeFileSync('src/planReaderManifest.json',JSON.stringify(manifest,null,2)+'\n');
 const totals=Object.entries(manifest).map(([document,{pages}])=>({document,pages:pages.length,firstPageBytes:fs.statSync('public/'+pages[0].small).size,fullPageBytes:pages.reduce((sum,p)=>sum+fs.statSync('public/'+p.src).size,0),mobilePageBytes:pages.reduce((sum,p)=>sum+fs.statSync('public/'+p.small).size,0)}));
 fs.mkdirSync('output/home-refinement',{recursive:true});
 fs.writeFileSync('output/home-refinement/plan-reader-assets.json',JSON.stringify(totals,null,2));
 console.log(JSON.stringify(totals));
})().catch(error=>{console.error(error);process.exitCode=1;});
