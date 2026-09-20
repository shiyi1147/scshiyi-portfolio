const fs=require('fs'),path=require('path');
const root=path.resolve('dist');
const excluded=['assets/fonts/misans-normal.ttf','assets/fonts/pangmen-display.ttf','assets/fonts/zaozigongfang-yihei.otf','assets/fonts/misans-normal.woff2','assets/fonts/pangmen-display.woff2','assets/fonts/zaozigongfang-yihei.woff2','assets/portfolio.pdf','bobo-poster-master.html'];
let removed=0;
for(const name of excluded){const file=path.resolve(root,name);if(!file.startsWith(root+path.sep))throw Error('Invalid build path');if(fs.existsSync(file)){removed+=fs.statSync(file).size;fs.unlinkSync(file)}}
let total=0,files=0;function scan(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())scan(file);else{total+=fs.statSync(file).size;files++}}}scan(root);
if(total>950000000)throw Error('Deployment exceeds 950 MB safety budget');
console.log(JSON.stringify({files,bytes:total,excludedBytes:removed}));
