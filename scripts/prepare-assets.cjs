const fs=require('fs'),path=require('path'),crypto=require('crypto'),{spawnSync}=require('child_process');
const sharp=require('sharp');
(async()=>{require('./check-film-preview.cjs')();fs.mkdirSync('output',{recursive:true});const r=spawnSync(process.env.PORTFOLIO_PYTHON||'python',['scripts/subset-fonts.py'],{stdio:'inherit'});if(r.status!==0)throw Error('Font subset failed; run python -m pip install -r scripts/requirements-assets.txt');
const source=fs.readFileSync('src/archiveContent.js','utf8');const start=source.indexOf('['),end=source.lastIndexOf('];');const projects=JSON.parse(source.slice(start,end+1));
const images=new Map();
for(const project of projects){
 if(['archive-solar','archive-solar-life','archive-solar-nature','archive-summer-3d'].includes(project.id)){
  for(const item of project.items)if(!item.video)images.set(item.src,item.src);
 }else if(project.group==='interface'){
  const item=project.items.find(item=>item.src.includes('assets/watchfaces/')&&item.label.includes('方形'));
  if(item)images.set(item.src,item.still || item.src);
 }
}
const map={};let before=0,after=0;fs.mkdirSync('public/assets/home-previews',{recursive:true});for(const [src,preview] of images){const input='public/'+preview;const hash=crypto.createHash('sha256').update(fs.readFileSync(input)).digest('hex').slice(0,16);const dest='assets/home-previews/'+hash+'.webp';if(!fs.existsSync('public/'+dest))await sharp(input).resize({width:720,height:720,fit:'inside',withoutEnlargement:true}).webp({quality:88,alphaQuality:100}).toFile('public/'+dest);map[src]=dest;before+=fs.statSync(input).size;after+=fs.statSync('public/'+dest).size;}
fs.writeFileSync('src/homePreviewMap.json',JSON.stringify(map));fs.writeFileSync('output/home-preview-report.json',JSON.stringify({count:images.size,before,after},null,2));console.log({count:images.size,before,after});await require('./prepare-landing-assets.cjs')();})().catch(e=>{console.error(e);process.exit(1)});
