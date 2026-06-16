import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Brush,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Wand2,
} from 'lucide-react';
import BounceCards from './BounceCards';
import DotGrid from './DotGrid';
import LazyVideo from './LazyVideo';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  '/assets/hero-visual.mp4',
  '/assets/project-brand.mp4',
  '/assets/project-scene.mp4',
  '/assets/project-campaign.mp4',
];

const projects = [
  {
    title: 'AI视觉动态效果',
    type: 'Motion / AI Visual',
    video: videos[0],
    desc: '以影像、节奏与生成式视觉构建沉浸式画面，适用于品牌发布、活动主视觉和数字内容传播。',
  },
  {
    title: '品牌视觉延展',
    type: 'Brand System',
    video: videos[1],
    desc: '围绕视觉识别、海报构图和多媒介物料，建立具有记忆点的视觉语言。',
  },
  {
    title: '空间与场景效果',
    type: 'Scene Design',
    video: videos[2],
    desc: '结合空间叙事、材质氛围和镜头表达，输出更具真实感与情绪张力的效果画面。',
  },
  {
    title: '商业传播内容',
    type: 'Campaign Visual',
    video: videos[3],
    desc: '面向社媒、展陈与宣传渠道，完成从概念到可落地视觉资产的完整表达。',
  },
];

const strengths = [
  {
    title: 'AI视觉生成',
    text: '熟悉用 AI 辅助完成风格探索、画面生成、质感强化与视觉提案。',
    icon: Wand2,
    images: ['/assets/adv-01-opt.jpg', '/assets/adv-02-opt.jpg', '/assets/adv-03-opt.jpg'],
  },
  {
    title: '效果表现能力',
    text: '关注光影、材质、构图和氛围，能将概念快速转化为高完成度画面。',
    icon: Sparkles,
    images: ['/assets/adv-04-opt.jpg', '/assets/adv-05-opt.jpg', '/assets/adv-06-opt.jpg'],
  },
  {
    title: '品牌审美判断',
    text: '在克制的系统感和鲜明的视觉记忆之间建立平衡，避免模板化表达。',
    icon: Brush,
    images: ['/assets/adv-07-opt.jpg', '/assets/adv-08-opt.jpg', '/assets/adv-09-opt.jpg'],
  },
  {
    title: '跨媒介落地',
    text: '适配海报、网页、视频、社媒与展示场景，让视觉资产形成连续体验。',
    icon: Bot,
    images: ['/assets/adv-10-opt.jpg', '/assets/adv-11-opt.jpg', '/assets/adv-12-opt.jpg'],
  },
  {
    title: '视觉策略思维',
    text: '从目标、受众和传播渠道反推设计语言，让作品不只停留在好看。',
    icon: BrainCircuit,
    images: ['/assets/adv-13-opt.jpg', '/assets/adv-14-opt.jpg', '/assets/adv-15-opt.jpg'],
  },
];

const aboutSlides = [
  '/assets/about-slide-01-opt.jpg',
  '/assets/about-slide-02-opt.jpg',
  '/assets/about-slide-03-opt.jpg',
  '/assets/about-slide-04-opt.jpg',
  '/assets/about-slide-05-opt.jpg',
  '/assets/about-slide-06-opt.jpg',
];

const metricSlides = [
  '/assets/metric-slide-01-opt.jpg',
  '/assets/metric-slide-02-opt.jpg',
  '/assets/metric-slide-03-opt.jpg',
  '/assets/metric-slide-04-opt.jpg',
  '/assets/metric-slide-05-opt.jpg',
];

const contactVideos = [
  '/assets/contact-slide-01.mp4',
  '/assets/contact-slide-02.mp4',
  '/assets/contact-slide-03.mp4',
  '/assets/contact-slide-04.mp4',
];

function App() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.defaults({ ease: 'power4.out' });

      const opening = gsap.timeline({ defaults: { duration: 1.2 } });
      opening.eventCallback('onComplete', () => {
        gsap.set('.heroIntro .sparkMark, .heroIntro h1, .heroIntro p, .heroFrame', {
          clearProps: 'willChange,filter,clipPath',
        });
      });
      opening
        .set('.heroIntro .sparkMark, .heroIntro h1, .heroIntro p, .heroFrame', {
          willChange: 'transform, opacity, clip-path',
        })
        .from('.heroIntro .sparkMark', {
          scale: 0,
          rotate: -90,
          duration: 1.05,
          ease: 'expo.out',
        })
        .from(
          '.heroIntro h1',
          {
            y: 96,
            scaleY: 0.72,
            clipPath: 'inset(0 0 100% 0)',
            transformOrigin: '50% 100%',
            duration: 1.45,
            ease: 'expo.out',
          },
          '-=0.58',
        )
        .from(
          '.heroIntro p',
          {
            y: 34,
            opacity: 0,
            filter: 'blur(14px)',
            duration: 1.1,
          },
          '-=0.72',
        )
        .from(
          '.heroFrame',
          {
            y: 130,
            scale: 0.94,
            clipPath: 'inset(18% 6% 0 6% round 30px)',
            filter: 'blur(10px)',
            duration: 1.55,
            ease: 'expo.out',
          },
          '-=0.42',
        )
        .from(
          '.frameNav > *, .frameCopy > *, .floatingWorkCard, .metricNarrative, .heroFrame .heroCards div',
          {
            y: 42,
            opacity: 0,
            stagger: 0.055,
            duration: 0.95,
          },
          '-=0.78',
        )
        .from(
          '.frameMedia',
          {
            x: 120,
            scaleX: 0.78,
            clipPath: 'inset(0 100% 0 0 round 36px)',
            duration: 1.28,
            ease: 'expo.out',
          },
          '-=1.05',
        );

      const animatedSections = gsap.utils.toArray('section:not(.hero)');
      animatedSections.forEach((section) => {
        const kicker = section.querySelector('.sectionKicker');
        const title = section.querySelector('h2');
        const cards = section.querySelectorAll(
          '.projectCard, .strengthCard, .stats > div, .contactGrid span, .finalLinks a',
        );
        const media = section.querySelectorAll(
          '.workCarousel, .projectCard video, .strengthImages img, .contactVideoCarousel',
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 74%',
            once: true,
          },
          defaults: { ease: 'power4.out' },
        });

        if (kicker) {
          tl.from(kicker, {
            y: 70,
            opacity: 0,
            letterSpacing: '0.55em',
            duration: 1,
          });
        }

        if (title) {
          tl.from(
            title,
            {
              y: 116,
              scaleX: 0.82,
              clipPath: 'inset(0 0 100% 0)',
              transformOrigin: '0% 100%',
              duration: 1.25,
              ease: 'expo.out',
            },
            '-=0.58',
          );
        }

        if (media.length) {
          tl.from(
            media,
            {
              y: 80,
              scale: 1.12,
              clipPath: 'inset(0 0 22% 0)',
              filter: 'blur(8px)',
              duration: 1.2,
              stagger: 0.08,
            },
            '-=0.68',
          );
        }

        if (cards.length) {
          tl.from(
            cards,
            {
              y: 86,
              opacity: 0,
              clipPath: 'inset(18% 0 0 0 round 22px)',
              duration: 1,
              stagger: 0.09,
            },
            '-=0.72',
          );
        }
      });

      gsap.utils.toArray('.projectCard, .workCarousel, .contactVideoCarousel').forEach((el) => {
        gsap.to(el, {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      });

      gsap.utils.toArray('.carouselTrack').forEach((el) => {
        gsap.to(el, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <section className="hero" id="home">
        <video className="heroVideo" src={videos[0]} autoPlay muted loop playsInline />
        <div className="heroAura" />
        <div className="grain" />

        <div className="heroIntro shell">
          <DotGrid
            className="introDotGrid"
            dotSize={4}
            gap={24}
            baseColor="#173133"
            activeColor="#19e6d2"
            proximity={140}
          />
          <span className="sparkMark" />
          <h1>
            SHIYI
            <span>Visual Portfolio</span>
          </h1>
          <p>AI效果视觉设计师，用 AIGC、动态影像与品牌视觉，构建克制而有未来感的视觉表达。</p>
        </div>

        <div className="heroFrame shell">
          <DotGrid
            className="heroDotGrid"
            dotSize={5}
            gap={22}
            baseColor="#8fbfbd"
            activeColor="#19e6d2"
            proximity={150}
          />
          <nav className="frameNav">
            <a className="brand" href="#home">
              <span />
              SHIYI
            </a>
            <div className="navLinks">
              <a className="active" href="#home">Home</a>
              <a href="#about">Profile</a>
              <a href="#projects">Works</a>
              <a href="#strength">Ability</a>
              <a href="#contact">Contact</a>
            </div>
            <a className="navCta" href="tel:13347214948">
              Contact
              <ArrowUpRight size={16} />
            </a>
          </nav>

          <div className="frameHero">
            <div className="frameCopy">
              <p className="heroBadge"><Sparkles size={15} />AI Effect Visual Designer</p>
              <h2>
                Redefine
                <span>digital vision</span>
              </h2>
              <p>
                从概念、风格探索到视觉落地，把 AI 的不确定性转化为可识别、可传播的视觉结果。
              </p>
              <div className="heroActions">
                <a className="primaryButton" href="#projects">查看作品</a>
                <a className="ghostButton" href="/assets/portfolio.pdf" target="_blank" rel="noreferrer">
                  完整作品集
                </a>
              </div>
            </div>

            <div className="frameMedia">
              <video src={videos[0]} autoPlay muted loop playsInline />
            </div>

            <aside className="floatingWorkStack" aria-label="动态视觉作品预览">
              <article className="floatingWorkCard">
                <LazyVideo src="/assets/header-card-top.mp4" autoPlay muted loop playsInline loadDelay={900} />
                <span>AI Motion / 01</span>
                <strong>Dark bloom visual</strong>
              </article>
              <article className="floatingWorkCard">
                <LazyVideo src={videos[1]} autoPlay muted loop playsInline loadDelay={1300} />
                <span>Selected / 2026</span>
                <strong>Motion visual system</strong>
              </article>
              <article className="floatingWorkCard">
                <LazyVideo src="/assets/header-card-bottom.mp4" autoPlay muted loop playsInline loadDelay={1700} />
                <span>AI Motion / 02</span>
                <strong>Fluid wallpaper loop</strong>
              </article>
            </aside>

            <div className="kineticWord">visual</div>
          </div>

          <div className="frameStatement">
            <span className="sparkMark small" />
            <p>
              石宜是一名面向品牌与活动场景的 AI效果视觉设计师，
              通过生成式工具、动态影像和视觉策略，让作品在第一眼建立记忆点。
            </p>
          </div>

          <div className="heroMetricsArea">
            <div className="metricNarrative">
              <BounceCards className="metricBounceCards" images={metricSlides} />
              <span className="sparkMark small" />
              <p>从赛事主视觉、校园活动物料到 AI 动态壁纸，持续把创意概念转化为可展示、可传播的完整视觉资产。</p>
              <div>
                <span>AI visual</span>
                <span>Motion</span>
                <span>Campaign</span>
              </div>
            </div>
            <div className="heroCards">
              <div>
                <span>National Award</span>
                <strong>国赛优秀奖</strong>
              </div>
              <div>
                <span>AIGC Workflow</span>
                <strong>效率提升 30%+</strong>
              </div>
              <div>
                <span>Campaign Reach</span>
                <strong>5000+ 人次</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="stickyNavWrap">
        <nav className="stickyNav shell" aria-label="页面固定导航">
          <a className="stickyBrand" href="#home">
            <span />
            SHIYI
          </a>
          <div className="stickyLinks">
            <a href="#home">首页</a>
            <a href="#about">经历</a>
            <a href="#projects">项目</a>
            <a href="#strength">优势</a>
            <a href="#contact">联系</a>
          </div>
          <a className="stickyAction" href="tel:13347214948">
            联系我
            <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>

      <section className="about shell" id="about">
        <div className="workCarousel" aria-label="石宜视觉作品轮播">
          <div className="carouselTrack">
            {aboutSlides.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`石宜视觉作品 ${index + 1}`}
                style={{ '--slide-index': index }}
              />
            ))}
          </div>
          <div className="carouselMeta">
            <span>Selected Visual Works</span>
            <strong>AI Wallpaper Series</strong>
          </div>
          <div className="carouselDots" aria-hidden="true">
            {aboutSlides.map((src, index) => (
              <span key={src} style={{ '--dot-index': index }} />
            ))}
          </div>
        </div>
        <div className="aboutCopy">
          <p className="sectionKicker">PROFILE</p>
          <h2>把 AI 的不确定性，转化为可被识别、被传播的视觉结果。</h2>
          <p>
            我是石宜，AI效果视觉设计师。擅长将视觉审美、生成式工具和商业表达结合，
            面向品牌视觉、活动主视觉、空间效果、海报与动态内容输出完整的视觉方案。
            曾参与全国大学生广告艺术大赛并获得国家级优秀奖、省级奖项，多次负责校园活动主视觉与系列传播物料。
          </p>
          <div className="contactGrid">
            <span><Phone size={16} />13347214948</span>
            <span><Mail size={16} />1483399012@qq.com</span>
            <span><MapPin size={16} />China / Remote</span>
          </div>
          <div className="stats">
            <div><strong>30+</strong><span>大型活动主视觉统筹</span></div>
            <div><strong>5000+</strong><span>单次活动参与人次</span></div>
            <div><strong>30%</strong><span>AIGC工作流提效</span></div>
          </div>
        </div>
      </section>

      <section className="projects shell" id="projects">
        <div className="sectionHead">
          <p className="sectionKicker">SELECTED WORKS</p>
          <h2>精选项目</h2>
          <a href="/assets/portfolio.pdf" target="_blank" rel="noreferrer">
            查看 PDF 作品集
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="projectGrid">
          {projects.map((project) => (
            <article className="projectCard" key={project.title}>
              <LazyVideo src={project.video} autoPlay muted loop playsInline />
              <div className="projectOverlay">
                <span>{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="strength shell" id="strength">
        <div className="sectionHead compact">
          <p className="sectionKicker">CAPABILITY</p>
          <h2>个人优势</h2>
        </div>
        <div className="strengthGrid">
          {strengths.map(({ title, text, icon: Icon, images }) => (
            <article className="strengthCard" key={title}>
              <div className="strengthCopy">
                <Icon size={26} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <div className="strengthImages" aria-hidden="true">
                {images.map((src, index) => (
                  <img key={src} src={src} alt="" style={{ '--image-index': index }} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contactFinal" id="contact">
        <div className="contactInner shell">
          <div className="contactVideoCarousel" aria-label="动态壁纸视频轮播">
            {contactVideos.map((src, index) => (
              <LazyVideo
                key={src}
                src={src}
                autoPlay
                muted
                loop
                playsInline
                style={{ '--contact-video-index': index }}
              />
            ))}
            <div className="contactVideoLabel">
              <span>Dynamic Wallpaper</span>
              <strong>Selected motion works</strong>
            </div>
          </div>
          <p className="sectionKicker">CONTACT</p>
          <h2>期待与你一起，把想法推进成有质感的视觉结果。</h2>
          <div className="finalLinks">
            <a href="tel:13347214948"><Phone size={18} />13347214948</a>
            <a href="mailto:1483399012@qq.com"><Mail size={18} />1483399012@qq.com</a>
            <a href="/assets/portfolio.pdf" target="_blank" rel="noreferrer">
              完整作品集
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
