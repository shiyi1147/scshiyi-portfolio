const fs=require('fs'),path=require('path'),crypto=require('crypto');
module.exports=function checkFilmPreview(){
 const root=path.resolve(__dirname,'..'),manifest=JSON.parse(fs.readFileSync(path.join(root,'src/filmPreviewMedia.json'),'utf8'));
 const content=fs.readFileSync(path.join(root,'src/archiveContent.js'),'utf8'),projects=JSON.parse(content.slice(content.indexOf('['),content.lastIndexOf('];')+1));
 const primary=projects.find(p=>p.id==='archive-film')?.items.find(item=>item.video)?.video;
 const sha=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
 if(primary!==manifest.source||sha(path.join(root,'public',manifest.source))!==manifest.sourceSha256)throw Error('Film preview is stale. Run npm run prepare:film-preview after updating the primary film.');
 for(const name of ['desktop','mobile']){const variant=manifest[name],file=path.join(root,'public',variant.src);if(sha(file)!==variant.sha256||fs.statSync(file).size!==variant.bytes)throw Error('Film preview file differs from its manifest: '+name);}
 return manifest;
};
if(require.main===module){const result=module.exports();console.log(JSON.stringify({source:result.source,desktopBytes:result.desktop.bytes,mobileBytes:result.mobile.bytes}));}
