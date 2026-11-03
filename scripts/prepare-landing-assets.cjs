// Keep original project art intact; these files are only for the home screen.
const fs=require('node:fs'),crypto=require('node:crypto'),sharp=require('sharp');
module.exports=async function prepareLandingAssets(){
 const source=fs.readFileSync('src/archiveContent.js','utf8');
 const projects=JSON.parse(source.slice(source.indexOf('['),source.lastIndexOf('];')+1));
 const first=projects.find(project=>project.id==='archive-shanhai');
 fs.mkdirSync('public/assets/landing-previews',{recursive:true});
 const make=async(input,width,quality)=>{
  const id=crypto.createHash('sha256').update(fs.readFileSync('public/'+input)).update(`landing-v1:${width}:${quality}`).digest('hex').slice(0,16);
  const src=`assets/landing-previews/${id}.webp`,file='public/'+src;
  if(!fs.existsSync(file))await sharp('public/'+input).resize({width,withoutEnlargement:true}).webp({quality,effort:5}).toFile(file);
  return {src,bytes:fs.statSync(file).size};
 };
 const scene='assets/scene/cyber-courtyard.webp';
 const manifest={
  scene:{desktop:await make(scene,1440,64),mobile:await make(scene,960,60)},
  shanhai:{desktop:await make(first.cover,960,78),mobile:await make(first.cover,640,76)},
 };
 fs.writeFileSync('src/landingMedia.json',JSON.stringify(manifest,null,2)+'\n');
 const boot=fs.readFileSync('scripts/landing-boot.js','utf8').replace('__LANDING_MEDIA__',JSON.stringify(manifest));
 const html=fs.readFileSync('index.html','utf8');
 const tag='<script id="landing-boot">\n'+boot+'\n</script>';
 const updated=html.includes('<script id="landing-boot">')?html.replace(/<script id="landing-boot">[\s\S]*?<\/script>/,()=>tag):html.replace('    <link rel="preload"', '    '+tag+'\n    <link rel="preload"');
 if(updated!==html)fs.writeFileSync('index.html',updated);
 fs.writeFileSync('output/landing-assets-report.json',JSON.stringify({originalSceneBytes:fs.statSync('public/'+scene).size,originalArtBytes:fs.statSync('public/'+first.cover).size,...manifest},null,2));
 console.log('Landing previews: '+JSON.stringify(manifest));
};
