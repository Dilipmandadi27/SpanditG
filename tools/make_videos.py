import numpy as np, math, subprocess, random
from PIL import Image, ImageDraw, ImageFilter
W,H,F=640,360,192
random.seed(4)
def run(name,fn):
    p=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','24','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','27','-preset','fast','-movflags','+faststart',f'assets/video/{name}'],stdin=subprocess.PIPE)
    for f in range(F): p.stdin.write(fn(f/F).tobytes())
    p.stdin.close();p.wait()
stars=[(random.random()*W,random.random()*H,random.choice([1,1,2]),random.randint(1,3),random.random()) for _ in range(160)]
def celestial(t):
    im=Image.new('RGB',(W,H),(8,4,12));d=ImageDraw.Draw(im,'RGBA')
    cx,cy=W*.7,H*.45
    for k in range(5):
        for i in range(260):
            r=(i/260)**.7*H*.7;a=k*math.pi/2.5+i/260*5+t*2*math.pi/5
            x=cx+math.cos(a)*r;y=cy+math.sin(a)*r*.45
            c=(217,179,106) if i%3 else (190,110,160)
            d.ellipse([x-1.5,y-1.5,x+1.5,y+1.5],fill=c+(int(90*(1-i/260)),))
    for x,y,s,sp,ph in stars:
        xx=(x+t*W*sp)%W
        a=int(120+135*abs(math.sin(2*math.pi*(t*sp+ph))))
        d.rectangle([xx,y,xx+s,y+s],fill=(255,240,215,a))
    return np.asarray(im.filter(ImageFilter.GaussianBlur(.6)))
def mandala(t):
    im=Image.new('RGB',(W,H),(10,4,10));d=ImageDraw.Draw(im,'RGBA')
    cx,cy=W/2,H/2
    for R,n,sg in [(150,12,1),(115,16,-1),(85,12,1),(55,8,-1),(30,6,1)]:
        for i in range(n):
            a=2*math.pi*i/n+sg*t*2*math.pi/n
            x=cx+math.cos(a)*R;y=cy+math.sin(a)*R;pr=R*.21
            d.ellipse([x-pr,y-pr,x+pr,y+pr],outline=(217,179,106,150),width=1)
            d.line([cx,cy,x,y],fill=(217,179,106,35))
        d.ellipse([cx-R,cy-R,cx+R,cy+R],outline=(244,220,162,110),width=1)
    d.ellipse([cx-8,cy-8,cx+8,cy+8],fill=(244,220,162,200))
    return np.asarray(im.filter(ImageFilter.GaussianBlur(.5)))
run('celestial.mp4',celestial);run('mandala.mp4',mandala)
