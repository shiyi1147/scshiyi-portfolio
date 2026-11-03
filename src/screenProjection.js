// Project an unwarped screen onto four viewport points (TL, TR, BR, BL).
export function screenMatrix(points, width, height) {
  const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = points;
  const dx1=x1-x2, dx2=x3-x2, dx3=x0-x1+x2-x3;
  const dy1=y1-y2, dy2=y3-y2, dy3=y0-y1+y2-y3;
  const det=dx1*dy2-dx2*dy1;
  const g=(dx3*dy2-dx2*dy3)/det, h=(dx1*dy3-dx3*dy1)/det;
  const a=x1-x0+g*x1, b=x3-x0+h*x3, d=y1-y0+g*y1, e=y3-y0+h*y3;
  return `matrix3d(${[a/width,d/width,0,g/width,b/height,e/height,0,h/height,0,0,1,0,x0,y0,0,1].join(',')})`;
}

export function portalGeometry(entry, progress, width, height) {
  const center=entry.quad.reduce((value,point)=>[value[0]+point[0]/4,value[1]+point[1]/4],[0,0]);
  const ratio=entry.portalHeight/entry.portalWidth;
  const cover=Math.max(width/entry.width,height/(entry.width*ratio));
  // Equal movement along the camera axis produces an accelerating projection.
  const scale=1/(1-(1-1/cover)*progress);
  const aim=1-Math.pow(1-Math.min(1,progress/.65),2);
  const alignment=Math.min(1,progress/.65);
  const x=center[0]+(width/2-center[0])*aim, y=center[1]+(height/2-center[1])*aim;
  const targets=[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]];
  const points=entry.quad.map((point,index)=>{
    const tx=targets[index][0]*entry.width, ty=targets[index][1]*entry.width*ratio;
    return [x+((point[0]-center[0])*(1-alignment)+tx*alignment)*scale,y+((point[1]-center[1])*(1-alignment)+ty*alignment)*scale];
  });
  return {points,scale,center,x,y};
}
