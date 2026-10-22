// Independent projects and series; source mapping is recorded in output/archive-source-manifest.json.
const projects = [
  {
    "id": "archive-bobo",
    "title": "心情啵啵",
    "name": "心情啵啵",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "用角色表情回应压力变化，结合背景、图标与排版组织小屏幕中的信息。项目已上线。",
    "details": [
      [
        "我的工作",
        "角色、背景、图标与界面排版等视觉内容。"
      ],
      [
        "制作方式",
        "使用 ChatGPT 辅助生成部分视觉元素，在 Figma 中进行手动修改与视觉整理。"
      ]
    ],
    "items": [
      {
        "src": "assets/portfolio/bobo-cover.webp",
        "thumb": "assets/portfolio/bobo-cover-thumb.webp",
        "label": "心情啵啵 · 压力值驱动的角色表盘",
        "chapter": "心情啵啵",
        "caption": "我负责角色、背景、图标与排版。时间位于上方，果冻角色居中，状态短句在下方呼应表情。"
      },
      {
        "src": "assets/portfolio/bobo-states.webp",
        "thumb": "assets/portfolio/bobo-states-thumb.webp",
        "label": "同一角色，五种状态表达",
        "chapter": "心情啵啵",
        "caption": "通过表情、姿态与配色呈现不同状态。表情随压力值切换，时间和日期保持相近的位置。"
      },
      {
        "src": "assets/portfolio/bobo-layout.webp",
        "thumb": "assets/portfolio/bobo-layout-thumb.webp",
        "label": "时间、角色与状态的信息层级",
        "chapter": "心情啵啵",
        "caption": "上部读取日常信息，中部观察角色，下部补充状态，让数字阅读和角色表达各有空间。"
      },
      {
        "src": "assets/portfolio/bobo-shapes.webp",
        "thumb": "assets/portfolio/bobo-shapes-thumb.webp",
        "label": "三种外形中的界面排布",
        "chapter": "心情啵啵",
        "caption": "保留角色与背景风格，根据圆形、方形和跑道形的空间，调整信息位置、比例与间距。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/portfolio/bobo-cover.webp",
    "preview": "assets/portfolio/bobo-cover-thumb.webp",
    "displayTitle": [
      "心情啵啵"
    ],
    "eyebrow": "CHATGPT + FIGMA / 已上线",
    "number": "01"
  },
  {
    "id": "archive-shixu",
    "title": "时序方舟",
    "name": "时序方舟",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以点阵数字组织日常信息，展示圆形、方形、跑道形与息屏状态的视觉适配。项目已上线。",
    "details": [
      [
        "我的工作",
        "背景、图标和界面排版等视觉内容。"
      ],
      [
        "制作方式",
        "使用 ChatGPT 辅助生成部分视觉元素，在 Figma 中进行手动修改与视觉整理。"
      ]
    ],
    "items": [
      {
        "src": "assets/portfolio/shixu-cover.webp",
        "thumb": "assets/portfolio/shixu-cover-thumb.webp",
        "label": "时序方舟 · 复古电子仪器语言",
        "chapter": "时序方舟",
        "caption": "点阵时间构成主要信息，黑白显示区与机械面板细节形成对照，少量红色标记作为点缀。"
      },
      {
        "src": "assets/portfolio/shixu-layout.webp",
        "thumb": "assets/portfolio/shixu-layout-thumb.webp",
        "label": "同一组信息，三种布局",
        "chapter": "时序方舟",
        "caption": "圆形与方形将电量放在下部中央；跑道形将电量移到日期下方，在有限宽度中重新组织模块。"
      },
      {
        "src": "assets/portfolio/shixu-aod.webp",
        "thumb": "assets/portfolio/shixu-aod-thumb.webp",
        "label": "息屏状态中的信息简化",
        "chapter": "时序方舟",
        "caption": "已有息屏资源减少装饰和信息模块，保留时间、日期与星期，以轮廓点阵延续视觉语言。"
      },
      {
        "src": "assets/portfolio/shixu-resources.webp",
        "thumb": "assets/portfolio/shixu-resources-thumb.webp",
        "label": "固定背景与变化数值",
        "chapter": "时序方舟",
        "caption": "现有资源将背景与数字分开保存：固定图形留在底板中，需要变化的时间与信息独立呈现。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/portfolio/shixu-cover.webp",
    "preview": "assets/portfolio/shixu-cover-thumb.webp",
    "displayTitle": [
      "时序方舟"
    ],
    "eyebrow": "CHATGPT + FIGMA / 已上线",
    "number": "02"
  },
  {
    "id": "archive-film",
    "number": "03",
    "title": "AI 东方幻想影像",
    "name": "幻想影像",
    "en": "WORLDS IN MOTION",
    "group": "motion",
    "category": "AI VISUAL / MOTION",
    "contextLabel": "AI 影像探索",
    "note": "7 部横竖屏影像",
    "accent": "#d1d7ff",
    "color": "#d1d7ff",
    "surface": "#101b1b",
    "cover": "assets/portfolio/film-cloud.webp",
    "preview": "assets/portfolio/film-cloud-thumb.webp",
    "displayTitle": [
      "WORLDS",
      "IN MOTION"
    ],
    "eyebrow": "CHATGPT / PREMIERE PRO / 剪映",
    "summary": "以东方建筑、云海和巨大构筑物展开空间想象。横屏呈现建筑群与环境，竖屏聚焦纵深与光源，以三种氛围探索幻想影像的表达。",
    "details": [
      [
        "创作工具",
        "制作中使用 ChatGPT，并使用 Premiere Pro（PR）和剪映辅助。"
      ],
      [
        "云海宫阙",
        "约 33 秒横屏影像。层叠建筑、云海与水面构成开阔环境，人物与船只提供尺度参照。"
      ],
      [
        "紫金幻境",
        "约 33 秒竖屏影像。巨大器物、发光结构与紫金色彩强调空间规模。"
      ],
      [
        "青金幽城",
        "约 29 秒竖屏影像。青蓝环境与暖金光源形成冷暖对照，通道与悬桥引导视线。"
      ]
    ],
    "items": [
      {
        "src": "assets/portfolio/film-cloud.webp",
        "thumb": "assets/portfolio/film-cloud-thumb.webp",
        "label": "云海宫阙 · 横屏主片",
        "chapter": "云海宫阙",
        "caption": "门阙、层叠宫殿与水面共同展开环境尺度。使用播放器观看，也可全屏欣赏。",
        "video": "assets/portfolio/film-cloud.mp4"
      },
      {
        "src": "assets/archive/film-04.webp",
        "thumb": "assets/archive/film-04-thumb.webp",
        "label": "横屏影像 04",
        "chapter": "影像",
        "caption": "横屏影像作品，可使用播放器查看完整视频。",
        "video": "assets/archive/film-04.mp4"
      },
      {
        "src": "assets/portfolio/film-purple.webp",
        "thumb": "assets/portfolio/film-purple-thumb.webp",
        "label": "紫金幻境 · 竖屏影像",
        "chapter": "紫金幻境",
        "caption": "从横向宫殿群转向巨大器物与竖向空间。紫金光线、路径和环形纹样形成视觉主体。",
        "video": "assets/portfolio/film-purple.mp4"
      },
      {
        "src": "assets/portfolio/film-city.webp",
        "thumb": "assets/portfolio/film-city-thumb.webp",
        "label": "青金幽城 · 竖屏影像",
        "chapter": "青金幽城",
        "caption": "建筑、悬桥与狭窄通道沿纵向展开。人物处于画面局部，强调幽深环境与空间大小的对照。",
        "video": "assets/portfolio/film-city.mp4"
      },
      {
        "src": "assets/archive/film-05.webp",
        "thumb": "assets/archive/film-05-thumb.webp",
        "label": "竖屏影像 05",
        "chapter": "影像",
        "caption": "竖屏影像作品，可使用播放器查看完整视频。",
        "video": "assets/archive/film-05.mp4"
      },
      {
        "src": "assets/archive/film-06.webp",
        "thumb": "assets/archive/film-06-thumb.webp",
        "label": "竖屏影像 06",
        "chapter": "影像",
        "caption": "竖屏影像作品，可使用播放器查看完整视频。",
        "video": "assets/archive/film-06.mp4"
      },
      {
        "src": "assets/archive/film-07.webp",
        "thumb": "assets/archive/film-07-thumb.webp",
        "label": "竖屏影像 07",
        "chapter": "影像",
        "caption": "竖屏影像作品，可使用播放器查看完整视频。",
        "video": "assets/archive/film-07.mp4"
      }
    ]
  },
  {
    "id": "archive-shanhai",
    "title": "山海经 · 幻兽系列",
    "contextLabel": "AI 视觉探索",
    "name": "山海幻兽",
    "group": "illustration",
    "category": "ILLUSTRATION",
    "summary": "围绕神兽、云气与山川意象，以夸张的主体尺度、流动线条和冷暖光色，呈现幻想生物与环境之间的关系。从十七张作品中选取六张展开。",
    "details": [
      [
        "创作工具",
        "本系列创作过程中使用了 ChatGPT。"
      ],
      [
        "视觉表达",
        "以神兽形态和环境线索建立空间，以羽毛、鳞片与云气的方向变化强化动势。"
      ],
      [
        "系列展示",
        "六张作品以全景、飞禽形象、近景与明亮的结尾构成阅读节奏。"
      ],
      [
        "作品标题",
        "页面标题用于描述画面与组织阅读，不作为古籍神兽身份的认定。"
      ]
    ],
    "items": [
      {
        "src": "assets/archive/shanhai-01.webp",
        "thumb": "assets/archive/shanhai-01-thumb.webp",
        "label": "山海经 · 幻兽系列 · 01",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 01"
      },
      {
        "src": "assets/archive/shanhai-02.webp",
        "thumb": "assets/archive/shanhai-02-thumb.webp",
        "label": "山海经 · 幻兽系列 · 02",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 02"
      },
      {
        "src": "assets/archive/shanhai-03.webp",
        "thumb": "assets/archive/shanhai-03-thumb.webp",
        "label": "山海经 · 幻兽系列 · 03",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 03"
      },
      {
        "src": "assets/archive/shanhai-04.webp",
        "thumb": "assets/archive/shanhai-04-thumb.webp",
        "label": "山海经 · 幻兽系列 · 04",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 04"
      },
      {
        "src": "assets/archive/shanhai-05.webp",
        "thumb": "assets/archive/shanhai-05-thumb.webp",
        "label": "山海经 · 幻兽系列 · 05",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 05"
      },
      {
        "src": "assets/archive/shanhai-06.webp",
        "thumb": "assets/archive/shanhai-06-thumb.webp",
        "label": "山海经 · 幻兽系列 · 06",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 06"
      },
      {
        "src": "assets/archive/shanhai-07.webp",
        "thumb": "assets/archive/shanhai-07-thumb.webp",
        "label": "山海经 · 幻兽系列 · 07",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 07"
      },
      {
        "src": "assets/archive/shanhai-08.webp",
        "thumb": "assets/archive/shanhai-08-thumb.webp",
        "label": "山海经 · 幻兽系列 · 08",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 08"
      },
      {
        "src": "assets/archive/shanhai-09.webp",
        "thumb": "assets/archive/shanhai-09-thumb.webp",
        "label": "山海经 · 幻兽系列 · 09",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 09"
      },
      {
        "src": "assets/archive/shanhai-10.webp",
        "thumb": "assets/archive/shanhai-10-thumb.webp",
        "label": "山海经 · 幻兽系列 · 10",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 10"
      },
      {
        "src": "assets/archive/shanhai-11.webp",
        "thumb": "assets/archive/shanhai-11-thumb.webp",
        "label": "山海经 · 幻兽系列 · 11",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 11"
      },
      {
        "src": "assets/archive/shanhai-12.webp",
        "thumb": "assets/archive/shanhai-12-thumb.webp",
        "label": "山海经 · 幻兽系列 · 12",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 12"
      },
      {
        "src": "assets/archive/shanhai-13.webp",
        "thumb": "assets/archive/shanhai-13-thumb.webp",
        "label": "山海经 · 幻兽系列 · 13",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 13"
      },
      {
        "src": "assets/archive/shanhai-14.webp",
        "thumb": "assets/archive/shanhai-14-thumb.webp",
        "label": "山海经 · 幻兽系列 · 14",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 14"
      },
      {
        "src": "assets/archive/shanhai-15.webp",
        "thumb": "assets/archive/shanhai-15-thumb.webp",
        "label": "山海经 · 幻兽系列 · 15",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 15"
      },
      {
        "src": "assets/archive/shanhai-16.webp",
        "thumb": "assets/archive/shanhai-16-thumb.webp",
        "label": "山海经 · 幻兽系列 · 16",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 16"
      },
      {
        "src": "assets/archive/shanhai-17.webp",
        "thumb": "assets/archive/shanhai-17-thumb.webp",
        "label": "山海经 · 幻兽系列 · 17",
        "chapter": "作品",
        "caption": "山海经 · 幻兽系列 · 17"
      }
    ],
    "accent": "#f1ce98",
    "color": "#f1ce98",
    "surface": "#111c1d",
    "cover": "assets/archive/shanhai-01.webp",
    "preview": "assets/archive/shanhai-01-thumb.webp",
    "displayTitle": [
      "山海经",
      "幻兽系列"
    ],
    "eyebrow": "AI 辅助插画 / CHATGPT",
    "number": "04"
  },
  {
    "id": "archive-solar",
    "title": "岁时绮境",
    "name": "岁时绮境",
    "group": "illustration",
    "category": "ILLUSTRATION",
    "summary": "将人物、植物、器物与自然场景组织在修长画幅中，以流动曲线、细密装饰与色彩变化呈现季节气氛。",
    "details": [
      [
        "创作工具",
        "Procreate，未使用 AI。"
      ],
      [
        "系列结构",
        "修长人物、曲线轮廓和装饰元素贯穿系列，植物与衣饰在局部穿出画面边界。"
      ],
      [
        "场景表达",
        "花枝、水面、果实和雪景，以及青绿、暖红、橙褐和蓝白等色彩，呈现不同氛围。"
      ],
      [
        "阅读方式",
        "总览按原文件名顺序编号，代表作品按画面气氛分组；编号不代表节气顺序。"
      ]
    ],
    "items": [
      {
        "src": "assets/archive/solar-01.webp",
        "thumb": "assets/archive/solar-01-thumb.webp",
        "label": "岁时绮境 · 01",
        "chapter": "作品",
        "caption": "岁时绮境 · 01"
      },
      {
        "src": "assets/archive/solar-02.webp",
        "thumb": "assets/archive/solar-02-thumb.webp",
        "label": "岁时绮境 · 02",
        "chapter": "作品",
        "caption": "岁时绮境 · 02"
      },
      {
        "src": "assets/archive/solar-03.webp",
        "thumb": "assets/archive/solar-03-thumb.webp",
        "label": "岁时绮境 · 03",
        "chapter": "作品",
        "caption": "岁时绮境 · 03"
      },
      {
        "src": "assets/archive/solar-04.webp",
        "thumb": "assets/archive/solar-04-thumb.webp",
        "label": "岁时绮境 · 04",
        "chapter": "作品",
        "caption": "岁时绮境 · 04"
      },
      {
        "src": "assets/archive/solar-05.webp",
        "thumb": "assets/archive/solar-05-thumb.webp",
        "label": "岁时绮境 · 05",
        "chapter": "作品",
        "caption": "岁时绮境 · 05"
      },
      {
        "src": "assets/archive/solar-06.webp",
        "thumb": "assets/archive/solar-06-thumb.webp",
        "label": "岁时绮境 · 06",
        "chapter": "作品",
        "caption": "岁时绮境 · 06"
      },
      {
        "src": "assets/archive/solar-07.webp",
        "thumb": "assets/archive/solar-07-thumb.webp",
        "label": "岁时绮境 · 07",
        "chapter": "作品",
        "caption": "岁时绮境 · 07"
      },
      {
        "src": "assets/archive/solar-08.webp",
        "thumb": "assets/archive/solar-08-thumb.webp",
        "label": "岁时绮境 · 08",
        "chapter": "作品",
        "caption": "岁时绮境 · 08"
      },
      {
        "src": "assets/archive/solar-09.webp",
        "thumb": "assets/archive/solar-09-thumb.webp",
        "label": "岁时绮境 · 09",
        "chapter": "作品",
        "caption": "岁时绮境 · 09"
      },
      {
        "src": "assets/archive/solar-10.webp",
        "thumb": "assets/archive/solar-10-thumb.webp",
        "label": "岁时绮境 · 10",
        "chapter": "作品",
        "caption": "岁时绮境 · 10"
      },
      {
        "src": "assets/archive/solar-11.webp",
        "thumb": "assets/archive/solar-11-thumb.webp",
        "label": "岁时绮境 · 11",
        "chapter": "作品",
        "caption": "岁时绮境 · 11"
      },
      {
        "src": "assets/archive/solar-12.webp",
        "thumb": "assets/archive/solar-12-thumb.webp",
        "label": "岁时绮境 · 12",
        "chapter": "作品",
        "caption": "岁时绮境 · 12"
      },
      {
        "src": "assets/archive/solar-13.webp",
        "thumb": "assets/archive/solar-13-thumb.webp",
        "label": "岁时绮境 · 13",
        "chapter": "作品",
        "caption": "岁时绮境 · 13"
      },
      {
        "src": "assets/archive/solar-14.webp",
        "thumb": "assets/archive/solar-14-thumb.webp",
        "label": "岁时绮境 · 14",
        "chapter": "作品",
        "caption": "岁时绮境 · 14"
      },
      {
        "src": "assets/archive/solar-15.webp",
        "thumb": "assets/archive/solar-15-thumb.webp",
        "label": "岁时绮境 · 15",
        "chapter": "作品",
        "caption": "岁时绮境 · 15"
      },
      {
        "src": "assets/archive/solar-16.webp",
        "thumb": "assets/archive/solar-16-thumb.webp",
        "label": "岁时绮境 · 16",
        "chapter": "作品",
        "caption": "岁时绮境 · 16"
      },
      {
        "src": "assets/archive/solar-17.webp",
        "thumb": "assets/archive/solar-17-thumb.webp",
        "label": "岁时绮境 · 17",
        "chapter": "作品",
        "caption": "岁时绮境 · 17"
      },
      {
        "src": "assets/archive/solar-18.webp",
        "thumb": "assets/archive/solar-18-thumb.webp",
        "label": "岁时绮境 · 18",
        "chapter": "作品",
        "caption": "岁时绮境 · 18"
      },
      {
        "src": "assets/archive/solar-19.webp",
        "thumb": "assets/archive/solar-19-thumb.webp",
        "label": "岁时绮境 · 19",
        "chapter": "作品",
        "caption": "岁时绮境 · 19"
      },
      {
        "src": "assets/archive/solar-20.webp",
        "thumb": "assets/archive/solar-20-thumb.webp",
        "label": "岁时绮境 · 20",
        "chapter": "作品",
        "caption": "岁时绮境 · 20"
      },
      {
        "src": "assets/archive/solar-21.webp",
        "thumb": "assets/archive/solar-21-thumb.webp",
        "label": "岁时绮境 · 21",
        "chapter": "作品",
        "caption": "岁时绮境 · 21"
      },
      {
        "src": "assets/archive/solar-22.webp",
        "thumb": "assets/archive/solar-22-thumb.webp",
        "label": "岁时绮境 · 22",
        "chapter": "作品",
        "caption": "岁时绮境 · 22"
      },
      {
        "src": "assets/archive/solar-23.webp",
        "thumb": "assets/archive/solar-23-thumb.webp",
        "label": "岁时绮境 · 23",
        "chapter": "作品",
        "caption": "岁时绮境 · 23"
      },
      {
        "src": "assets/archive/solar-24.webp",
        "thumb": "assets/archive/solar-24-thumb.webp",
        "label": "岁时绮境 · 24",
        "chapter": "作品",
        "caption": "岁时绮境 · 24"
      }
    ],
    "accent": "#f1ce98",
    "color": "#f1ce98",
    "surface": "#111c1d",
    "cover": "assets/archive/solar-01.webp",
    "preview": "assets/archive/solar-01-thumb.webp",
    "displayTitle": ["岁时绮境"],
    "eyebrow": "二十四节气装饰插画 / PROCREATE · 未使用 AI",
    "number": "05"
  },
  {
    "id": "archive-solar-life",
    "title": "人间时令",
    "name": "人间时令",
    "group": "illustration",
    "category": "ILLUSTRATION",
    "summary": "以人物与季节环境的关系展开画面，将花木、山川与流动的色块融入生活叙事。修长构图与柔和曲线串联人物和自然，让节气不只是一项时间标记，也成为可感知的情绪与风景。",
    "details": [],
    "items": [
      {
        "src": "assets/archive/solar-life-01.webp",
        "thumb": "assets/archive/solar-life-01-thumb.webp",
        "label": "人间时令 · 01",
        "chapter": "作品",
        "caption": "人间时令 · 01"
      },
      {
        "src": "assets/archive/solar-life-02.webp",
        "thumb": "assets/archive/solar-life-02-thumb.webp",
        "label": "人间时令 · 02",
        "chapter": "作品",
        "caption": "人间时令 · 02"
      },
      {
        "src": "assets/archive/solar-life-03.webp",
        "thumb": "assets/archive/solar-life-03-thumb.webp",
        "label": "人间时令 · 03",
        "chapter": "作品",
        "caption": "人间时令 · 03"
      },
      {
        "src": "assets/archive/solar-life-04.webp",
        "thumb": "assets/archive/solar-life-04-thumb.webp",
        "label": "人间时令 · 04",
        "chapter": "作品",
        "caption": "人间时令 · 04"
      },
      {
        "src": "assets/archive/solar-life-05.webp",
        "thumb": "assets/archive/solar-life-05-thumb.webp",
        "label": "人间时令 · 05",
        "chapter": "作品",
        "caption": "人间时令 · 05"
      },
      {
        "src": "assets/archive/solar-life-06.webp",
        "thumb": "assets/archive/solar-life-06-thumb.webp",
        "label": "人间时令 · 06",
        "chapter": "作品",
        "caption": "人间时令 · 06"
      },
      {
        "src": "assets/archive/solar-life-07.webp",
        "thumb": "assets/archive/solar-life-07-thumb.webp",
        "label": "人间时令 · 07",
        "chapter": "作品",
        "caption": "人间时令 · 07"
      },
      {
        "src": "assets/archive/solar-life-08.webp",
        "thumb": "assets/archive/solar-life-08-thumb.webp",
        "label": "人间时令 · 08",
        "chapter": "作品",
        "caption": "人间时令 · 08"
      },
      {
        "src": "assets/archive/solar-life-09.webp",
        "thumb": "assets/archive/solar-life-09-thumb.webp",
        "label": "人间时令 · 09",
        "chapter": "作品",
        "caption": "人间时令 · 09"
      },
      {
        "src": "assets/archive/solar-life-10.webp",
        "thumb": "assets/archive/solar-life-10-thumb.webp",
        "label": "人间时令 · 10",
        "chapter": "作品",
        "caption": "人间时令 · 10"
      },
      {
        "src": "assets/archive/solar-life-11.webp",
        "thumb": "assets/archive/solar-life-11-thumb.webp",
        "label": "人间时令 · 11",
        "chapter": "作品",
        "caption": "人间时令 · 11"
      },
      {
        "src": "assets/archive/solar-life-12.webp",
        "thumb": "assets/archive/solar-life-12-thumb.webp",
        "label": "人间时令 · 12",
        "chapter": "作品",
        "caption": "人间时令 · 12"
      },
      {
        "src": "assets/archive/solar-life-13.webp",
        "thumb": "assets/archive/solar-life-13-thumb.webp",
        "label": "人间时令 · 13",
        "chapter": "作品",
        "caption": "人间时令 · 13"
      },
      {
        "src": "assets/archive/solar-life-14.webp",
        "thumb": "assets/archive/solar-life-14-thumb.webp",
        "label": "人间时令 · 14",
        "chapter": "作品",
        "caption": "人间时令 · 14"
      },
      {
        "src": "assets/archive/solar-life-15.webp",
        "thumb": "assets/archive/solar-life-15-thumb.webp",
        "label": "人间时令 · 15",
        "chapter": "作品",
        "caption": "人间时令 · 15"
      },
      {
        "src": "assets/archive/solar-life-16.webp",
        "thumb": "assets/archive/solar-life-16-thumb.webp",
        "label": "人间时令 · 16",
        "chapter": "作品",
        "caption": "人间时令 · 16"
      },
      {
        "src": "assets/archive/solar-life-17.webp",
        "thumb": "assets/archive/solar-life-17-thumb.webp",
        "label": "人间时令 · 17",
        "chapter": "作品",
        "caption": "人间时令 · 17"
      },
      {
        "src": "assets/archive/solar-life-18.webp",
        "thumb": "assets/archive/solar-life-18-thumb.webp",
        "label": "人间时令 · 18",
        "chapter": "作品",
        "caption": "人间时令 · 18"
      },
      {
        "src": "assets/archive/solar-life-19.webp",
        "thumb": "assets/archive/solar-life-19-thumb.webp",
        "label": "人间时令 · 19",
        "chapter": "作品",
        "caption": "人间时令 · 19"
      },
      {
        "src": "assets/archive/solar-life-20.webp",
        "thumb": "assets/archive/solar-life-20-thumb.webp",
        "label": "人间时令 · 20",
        "chapter": "作品",
        "caption": "人间时令 · 20"
      },
      {
        "src": "assets/archive/solar-life-21.webp",
        "thumb": "assets/archive/solar-life-21-thumb.webp",
        "label": "人间时令 · 21",
        "chapter": "作品",
        "caption": "人间时令 · 21"
      },
      {
        "src": "assets/archive/solar-life-22.webp",
        "thumb": "assets/archive/solar-life-22-thumb.webp",
        "label": "人间时令 · 22",
        "chapter": "作品",
        "caption": "人间时令 · 22"
      },
      {
        "src": "assets/archive/solar-life-23.webp",
        "thumb": "assets/archive/solar-life-23-thumb.webp",
        "label": "人间时令 · 23",
        "chapter": "作品",
        "caption": "人间时令 · 23"
      },
      {
        "src": "assets/archive/solar-life-24.webp",
        "thumb": "assets/archive/solar-life-24-thumb.webp",
        "label": "人间时令 · 24",
        "chapter": "作品",
        "caption": "人间时令 · 24"
      }
    ],
    "accent": "#f1ce98",
    "color": "#f1ce98",
    "surface": "#111c1d",
    "cover": "assets/archive/solar-life-01.webp",
    "preview": "assets/archive/solar-life-01-thumb.webp",
    "displayTitle": ["人间时令"],
    "eyebrow": "节气生活叙事 / 系列插画",
    "number": "06"
  },
  {
    "id": "archive-solar-nature",
    "title": "万物有灵",
    "name": "万物有灵",
    "group": "illustration",
    "category": "ILLUSTRATION",
    "summary": "以草木生长与自然形态为视觉线索，通过夸张的尺度、层叠的植物和鲜明的季节色彩，表现自然世界的生命力。节气文字与插画相互呼应，让抽象的时序变化转化为具体的画面意象。",
    "details": [],
    "items": [
      {
        "src": "assets/archive/solar-nature-01.webp",
        "thumb": "assets/archive/solar-nature-01-thumb.webp",
        "label": "万物有灵 · 01",
        "chapter": "作品",
        "caption": "万物有灵 · 01"
      },
      {
        "src": "assets/archive/solar-nature-02.webp",
        "thumb": "assets/archive/solar-nature-02-thumb.webp",
        "label": "万物有灵 · 02",
        "chapter": "作品",
        "caption": "万物有灵 · 02"
      },
      {
        "src": "assets/archive/solar-nature-03.webp",
        "thumb": "assets/archive/solar-nature-03-thumb.webp",
        "label": "万物有灵 · 03",
        "chapter": "作品",
        "caption": "万物有灵 · 03"
      },
      {
        "src": "assets/archive/solar-nature-04.webp",
        "thumb": "assets/archive/solar-nature-04-thumb.webp",
        "label": "万物有灵 · 04",
        "chapter": "作品",
        "caption": "万物有灵 · 04"
      },
      {
        "src": "assets/archive/solar-nature-05.webp",
        "thumb": "assets/archive/solar-nature-05-thumb.webp",
        "label": "万物有灵 · 05",
        "chapter": "作品",
        "caption": "万物有灵 · 05"
      },
      {
        "src": "assets/archive/solar-nature-06.webp",
        "thumb": "assets/archive/solar-nature-06-thumb.webp",
        "label": "万物有灵 · 06",
        "chapter": "作品",
        "caption": "万物有灵 · 06"
      },
      {
        "src": "assets/archive/solar-nature-07.webp",
        "thumb": "assets/archive/solar-nature-07-thumb.webp",
        "label": "万物有灵 · 07",
        "chapter": "作品",
        "caption": "万物有灵 · 07"
      },
      {
        "src": "assets/archive/solar-nature-08.webp",
        "thumb": "assets/archive/solar-nature-08-thumb.webp",
        "label": "万物有灵 · 08",
        "chapter": "作品",
        "caption": "万物有灵 · 08"
      },
      {
        "src": "assets/archive/solar-nature-09.webp",
        "thumb": "assets/archive/solar-nature-09-thumb.webp",
        "label": "万物有灵 · 09",
        "chapter": "作品",
        "caption": "万物有灵 · 09"
      },
      {
        "src": "assets/archive/solar-nature-10.webp",
        "thumb": "assets/archive/solar-nature-10-thumb.webp",
        "label": "万物有灵 · 10",
        "chapter": "作品",
        "caption": "万物有灵 · 10"
      },
      {
        "src": "assets/archive/solar-nature-11.webp",
        "thumb": "assets/archive/solar-nature-11-thumb.webp",
        "label": "万物有灵 · 11",
        "chapter": "作品",
        "caption": "万物有灵 · 11"
      },
      {
        "src": "assets/archive/solar-nature-12.webp",
        "thumb": "assets/archive/solar-nature-12-thumb.webp",
        "label": "万物有灵 · 12",
        "chapter": "作品",
        "caption": "万物有灵 · 12"
      },
      {
        "src": "assets/archive/solar-nature-13.webp",
        "thumb": "assets/archive/solar-nature-13-thumb.webp",
        "label": "万物有灵 · 13",
        "chapter": "作品",
        "caption": "万物有灵 · 13"
      },
      {
        "src": "assets/archive/solar-nature-14.webp",
        "thumb": "assets/archive/solar-nature-14-thumb.webp",
        "label": "万物有灵 · 14",
        "chapter": "作品",
        "caption": "万物有灵 · 14"
      },
      {
        "src": "assets/archive/solar-nature-15.webp",
        "thumb": "assets/archive/solar-nature-15-thumb.webp",
        "label": "万物有灵 · 15",
        "chapter": "作品",
        "caption": "万物有灵 · 15"
      },
      {
        "src": "assets/archive/solar-nature-16.webp",
        "thumb": "assets/archive/solar-nature-16-thumb.webp",
        "label": "万物有灵 · 16",
        "chapter": "作品",
        "caption": "万物有灵 · 16"
      },
      {
        "src": "assets/archive/solar-nature-17.webp",
        "thumb": "assets/archive/solar-nature-17-thumb.webp",
        "label": "万物有灵 · 17",
        "chapter": "作品",
        "caption": "万物有灵 · 17"
      },
      {
        "src": "assets/archive/solar-nature-18.webp",
        "thumb": "assets/archive/solar-nature-18-thumb.webp",
        "label": "万物有灵 · 18",
        "chapter": "作品",
        "caption": "万物有灵 · 18"
      },
      {
        "src": "assets/archive/solar-nature-19.webp",
        "thumb": "assets/archive/solar-nature-19-thumb.webp",
        "label": "万物有灵 · 19",
        "chapter": "作品",
        "caption": "万物有灵 · 19"
      },
      {
        "src": "assets/archive/solar-nature-20.webp",
        "thumb": "assets/archive/solar-nature-20-thumb.webp",
        "label": "万物有灵 · 20",
        "chapter": "作品",
        "caption": "万物有灵 · 20"
      },
      {
        "src": "assets/archive/solar-nature-21.webp",
        "thumb": "assets/archive/solar-nature-21-thumb.webp",
        "label": "万物有灵 · 21",
        "chapter": "作品",
        "caption": "万物有灵 · 21"
      },
      {
        "src": "assets/archive/solar-nature-22.webp",
        "thumb": "assets/archive/solar-nature-22-thumb.webp",
        "label": "万物有灵 · 22",
        "chapter": "作品",
        "caption": "万物有灵 · 22"
      },
      {
        "src": "assets/archive/solar-nature-23.webp",
        "thumb": "assets/archive/solar-nature-23-thumb.webp",
        "label": "万物有灵 · 23",
        "chapter": "作品",
        "caption": "万物有灵 · 23"
      },
      {
        "src": "assets/archive/solar-nature-24.webp",
        "thumb": "assets/archive/solar-nature-24-thumb.webp",
        "label": "万物有灵 · 24",
        "chapter": "作品",
        "caption": "万物有灵 · 24"
      }
    ],
    "accent": "#f1ce98",
    "color": "#f1ce98",
    "surface": "#111c1d",
    "cover": "assets/archive/solar-nature-01.webp",
    "preview": "assets/archive/solar-nature-01-thumb.webp",
    "displayTitle": ["万物有灵"],
    "eyebrow": "自然意象 / 系列插画",
    "number": "07"
  },
  {
    "id": "archive-summer-3d",
    "title": "夏日场景 · 3D 建模",
    "name": "夏日场景",
    "group": "spatial",
    "category": "3D DESIGN",
    "summary": "围绕夏日生活与安全主题，以三维物件组织视觉信息。通过清晰的造型、明快的配色与图标化排布，将救生用品、日常器物及提示符号组合成轻松易读的主题画面。",
    "details": [],
    "items": [
      {
        "src": "assets/archive/summer-3d-01.webp",
        "thumb": "assets/archive/summer-3d-01-thumb.webp",
        "label": "夏日场景 · 3D 建模 · 01",
        "chapter": "作品",
        "caption": "夏日场景 · 3D 建模 · 01"
      },
      {
        "src": "assets/archive/summer-3d-02.webp",
        "thumb": "assets/archive/summer-3d-02-thumb.webp",
        "label": "夏日场景 · 3D 建模 · 02",
        "chapter": "作品",
        "caption": "夏日场景 · 3D 建模 · 02"
      },
      {
        "src": "assets/archive/summer-3d-03.webp",
        "thumb": "assets/archive/summer-3d-03-thumb.webp",
        "label": "夏日场景 · 3D 建模 · 03",
        "chapter": "作品",
        "caption": "夏日场景 · 3D 建模 · 03"
      },
      {
        "src": "assets/archive/summer-3d-04.webp",
        "thumb": "assets/archive/summer-3d-04-thumb.webp",
        "label": "夏日场景 · 3D 建模 · 04",
        "chapter": "作品",
        "caption": "夏日场景 · 3D 建模 · 04"
      },
      {
        "src": "assets/archive/summer-3d-05.webp",
        "thumb": "assets/archive/summer-3d-05-thumb.webp",
        "label": "夏日场景 · 3D 建模 · 05",
        "chapter": "作品",
        "caption": "夏日场景 · 3D 建模 · 05"
      },
      {
        "src": "assets/archive/summer-3d-06.webp",
        "thumb": "assets/archive/summer-3d-06-thumb.webp",
        "label": "夏日场景 · 3D 建模 · 06",
        "chapter": "作品",
        "caption": "夏日场景 · 3D 建模 · 06"
      },
      {
        "src": "assets/archive/summer-3d-07.webp",
        "thumb": "assets/archive/summer-3d-07-thumb.webp",
        "label": "夏日场景 · 3D 建模 · 07",
        "chapter": "作品",
        "caption": "夏日场景 · 3D 建模 · 07"
      },
      {
        "src": "assets/archive/summer-3d-08.webp",
        "thumb": "assets/archive/summer-3d-08-thumb.webp",
        "label": "夏日场景 · 3D 建模 · 08",
        "chapter": "作品",
        "caption": "夏日场景 · 3D 建模 · 08"
      },
      {
        "src": "assets/archive/summer-3d-09.webp",
        "thumb": "assets/archive/summer-3d-09-thumb.webp",
        "label": "夏日场景 · 3D 建模 · 09",
        "chapter": "作品",
        "caption": "夏日场景 · 3D 建模 · 09"
      },
      {
        "src": "assets/archive/summer-3d-10.webp",
        "thumb": "assets/archive/summer-3d-10-thumb.webp",
        "label": "夏日场景 · 3D 建模 · 10",
        "chapter": "作品",
        "caption": "夏日场景 · 3D 建模 · 10"
      },
      {
        "src": "assets/archive/summer-3d-11.webp",
        "thumb": "assets/archive/summer-3d-11-thumb.webp",
        "label": "夏日场景 · 3D 建模 · 11",
        "chapter": "作品",
        "caption": "夏日场景 · 3D 建模 · 11"
      },
      {
        "src": "assets/archive/summer-3d-12.webp",
        "thumb": "assets/archive/summer-3d-12-thumb.webp",
        "label": "夏日场景 · 3D 建模 · 12",
        "chapter": "作品",
        "caption": "夏日场景 · 3D 建模 · 12"
      }
    ],
    "accent": "#c0e1fa",
    "color": "#c0e1fa",
    "surface": "#111c1d",
    "cover": "assets/archive/summer-3d-01.webp",
    "preview": "assets/archive/summer-3d-01-thumb.webp",
    "displayTitle": [
      "夏日场景",
      "3D 建模"
    ],
    "eyebrow": "三维场景 / 渲染作品",
    "number": "08"
  },
  {
    "id": "archive-nutrition",
    "number": "09",
    "title": "营养快线品牌创意提案",
    "name": "营养快线",
    "en": "A FRESH PERSPECTIVE",
    "group": "brand",
    "category": "BRAND / TEAM PROPOSAL",
    "contextLabel": "团队竞赛",
    "achievementLabel": "全国优秀奖 · 4 人团队领队",
    "note": "4 人团队 · 领队 / 全国优秀奖",
    "accent": "#ffdda7",
    "color": "#ffdda7",
    "surface": "#101b1b",
    "cover": "assets/portfolio/nutrition-cover.webp",
    "preview": "assets/portfolio/nutrition-cover-thumb.webp",
    "displayTitle": [
      "NUTRITION",
      "EXPRESS"
    ],
    "eyebrow": "团队比赛提案 / 领队 / 2025",
    "summary": "以“告别脆皮，特种兵上线”为主题，围绕户外角色“快快”延展品牌视觉。我担任领队，带领 4 人团队完成品牌调研及全案视觉设计；项目获第 17 届全国大学生广告艺术大赛全国优秀奖，作品收录大赛年鉴。",
    "strategy": [
      ["目标人群", "面向喜欢结伴出游、探索新鲜生活的年轻人，以学生与年轻白领为沟通重点。"],
      ["主题切入", "以“脆皮”自嘲与“特种兵”出游的反差切入，把日常疲惫转化为积极出发的品牌表达。"],
      ["视觉延展", "将瓶盖头盔、橙白配色融入“快快”的户外造型，用同一角色串联 Citywalk 海报、包装与文创周边。"]
    ],
    "details": [
      [
        "项目性质",
        "第 17 届全国大学生广告艺术大赛比赛提案，团队共同完成。"
      ],
      [
        "我的角色",
        "领队，带领 4 人团队完成品牌调研及全案视觉设计，输出主 KV、系列海报与周边。以下作品展示团队共同成果。"
      ],
      [
        "项目成果",
        "获第 17 届全国大学生广告艺术大赛全国优秀奖，作品收录大赛年鉴。"
      ],
      [
        "创意主线",
        "将活力出行主题转化为角色“快快”，以品牌橙白配色和户外装备连接不同传播场景。"
      ],
      [
        "提案产出",
        "创意主题、角色设定、系列海报、包装、活动视觉及完整传播方案。应用画面均为提案示意。"
      ],
      [
        "视觉复盘",
        "基于原提案的后续分析：梳理角色识别、城市差异和跨载体构图关系。"
      ]
    ],
    "items": [
      {
        "src": "assets/portfolio/nutrition-cover.webp",
        "thumb": "assets/portfolio/nutrition-cover-thumb.webp",
        "label": "告别“脆皮”，“特种兵”上线",
        "chapter": "主题",
        "caption": "以活力出行为传播切入点，用漫画分格、大字标题和橙蓝色彩建立提案的视觉记忆。"
      },
      {
        "src": "assets/portfolio/nutrition-character.webp",
        "thumb": "assets/portfolio/nutrition-character-thumb.webp",
        "label": "快快 · 从品牌元素到户外角色",
        "chapter": "角色",
        "caption": "瓶盖造型融入头盔，橙白配色连接品牌包装；护目镜、马甲和登山靴共同强化探索者形象。"
      },
      {
        "src": "assets/portfolio/nutrition-citywalk.webp",
        "thumb": "assets/portfolio/nutrition-citywalk-thumb.webp",
        "label": "快快带你 Citywalk",
        "chapter": "系列",
        "caption": "四座城市保留相近标题结构、角色位置和路线语言，用实景与服饰体现差异。"
      },
      {
        "src": "assets/portfolio/nutrition-applications.webp",
        "thumb": "assets/portfolio/nutrition-applications-thumb.webp",
        "label": "包装、活动与闪屏页",
        "chapter": "应用",
        "caption": "在不同版面中重新安排角色、产品与标题比例，延续角色识别。均为比赛提案中的设计示意。"
      },
      {
        "src": "assets/portfolio/nutrition-review.webp",
        "detail": "assets/portfolio/nutrition-review-detail.webp",
        "thumb": "assets/portfolio/nutrition-review-thumb.webp",
        "label": "视觉系统复盘",
        "chapter": "复盘",
        "caption": "基于原提案的后续分析：从品牌到角色、从统一到差异、从海报到不同载体。可打开大图阅读。"
      }
    ],
    "document": "assets/documents/nutrition-brand-plan.pdf"
  },
  {
    "id": "archive-watch-01",
    "title": "面包心情",
    "name": "面包心情",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以温暖的面包角色连接时间、天气与健康信息，展示方形、圆形和跑道形三种适配，以及六种角色表情。",
    "details": [
      [
        "视觉语言",
        "奶油色底纹、棕色文字与柔和的彩色功能区，搭配面包角色和手绘装饰。"
      ],
      [
        "外形适配",
        "方形版强调分区信息；圆形版围绕边界调整布局；跑道形版采用纵向排列。"
      ],
      [
        "角色表情",
        "方形版包含微笑、爱心眼、眨眼、低落、生气与熟睡六种表情。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/bread/square-smile.webp",
        "thumb": "assets/watchfaces/bread/square-smile-thumb.webp",
        "detail": "assets/watchfaces/bread/originals/square-smile.png",
        "label": "面包心情 · 方形 · 微笑主视觉",
        "chapter": "方形表盘",
        "caption": "方形版完整展示时间、天气、日期、面包角色和健康数据，以奶油色与棕色统一信息层级。"
      },
      {
        "src": "assets/watchfaces/bread/square-heart.webp",
        "thumb": "assets/watchfaces/bread/square-heart-thumb.webp",
        "detail": "assets/watchfaces/bread/originals/square-heart.png",
        "label": "面包心情 · 方形 · 爱心眼",
        "chapter": "方形表盘",
        "caption": "爱心眼与张嘴微笑的角色版本，搭配周围的爱心装饰。"
      },
      {
        "src": "assets/watchfaces/bread/square-wink.webp",
        "thumb": "assets/watchfaces/bread/square-wink-thumb.webp",
        "detail": "assets/watchfaces/bread/originals/square-wink.png",
        "label": "面包心情 · 方形 · 眨眼",
        "chapter": "方形表盘",
        "caption": "单眼眨眼的角色版本，延续相同的信息布局。"
      },
      {
        "src": "assets/watchfaces/bread/square-sad.webp",
        "thumb": "assets/watchfaces/bread/square-sad-thumb.webp",
        "detail": "assets/watchfaces/bread/originals/square-sad.png",
        "label": "面包心情 · 方形 · 低落",
        "chapter": "方形表盘",
        "caption": "以眉毛和嘴角的变化表现低落表情。"
      },
      {
        "src": "assets/watchfaces/bread/square-angry.webp",
        "thumb": "assets/watchfaces/bread/square-angry-thumb.webp",
        "detail": "assets/watchfaces/bread/originals/square-angry.png",
        "label": "面包心情 · 方形 · 生气",
        "chapter": "方形表盘",
        "caption": "以皱眉、鼓气符号和角色姿态表现生气表情。"
      },
      {
        "src": "assets/watchfaces/bread/square-sleep.webp",
        "thumb": "assets/watchfaces/bread/square-sleep-thumb.webp",
        "detail": "assets/watchfaces/bread/originals/square-sleep.png",
        "label": "面包心情 · 方形 · 熟睡",
        "chapter": "方形表盘",
        "caption": "闭眼与睡眠符号组成熟睡表情，其他界面信息保持一致。"
      },
      {
        "src": "assets/watchfaces/bread/round-smile.webp",
        "thumb": "assets/watchfaces/bread/round-smile-thumb.webp",
        "detail": "assets/watchfaces/bread/originals/round-smile.png",
        "label": "面包心情 · 圆形 · 微笑版",
        "chapter": "圆形表盘",
        "caption": "圆形版沿圆形边界重新安排天气、日期与心率信息，保留面包角色作为视觉中心。"
      },
      {
        "src": "assets/watchfaces/bread/capsule-smile.webp",
        "thumb": "assets/watchfaces/bread/capsule-smile-thumb.webp",
        "detail": "assets/watchfaces/bread/originals/capsule-smile.png",
        "label": "面包心情 · 跑道形 · 微笑版",
        "chapter": "跑道形表盘",
        "caption": "窄长屏幕采用纵向排列，依次呈现时间、角色、步数、卡路里和心率。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/bread/square-smile.webp",
    "preview": "assets/watchfaces/bread/square-smile-thumb.webp",
    "displayTitle": [
      "面包心情"
    ],
    "eyebrow": "智能表盘 / 三种外形 · 六种表情",
    "number": "10"
  },
  {
    "id": "archive-watch-02",
    "title": "多吃蔬菜",
    "name": "多吃蔬菜",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以番茄、白菜、西兰花和胡萝卜四种蔬菜角色构成趣味表盘，展示不同配色以及方形、圆形、跑道形的布局适配。",
    "details": [
      [
        "角色与配色",
        "四张方形预览分别呈现番茄、白菜、西兰花与胡萝卜，搭配暖橙、黄绿、绿色和紫色背景。"
      ],
      [
        "信息布局",
        "突出时间与日期，通过独立区域组织心率、步数及功能图标。"
      ],
      [
        "外形适配",
        "圆形与跑道形预览采用西兰花主题，根据屏幕边界和比例调整信息位置。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/vegetables/square-tomato.webp",
        "thumb": "assets/watchfaces/vegetables/square-tomato-thumb.webp",
        "detail": "assets/watchfaces/vegetables/originals/square-tomato.png",
        "label": "多吃蔬菜 · 方形 · 番茄",
        "chapter": "方形表盘",
        "caption": "番茄角色搭配暖橙色背景，以大号时间和分区数据组织画面。"
      },
      {
        "src": "assets/watchfaces/vegetables/square-cabbage.webp",
        "thumb": "assets/watchfaces/vegetables/square-cabbage-thumb.webp",
        "detail": "assets/watchfaces/vegetables/originals/square-cabbage.png",
        "label": "多吃蔬菜 · 方形 · 白菜",
        "chapter": "方形表盘",
        "caption": "白菜角色搭配黄绿色背景，延续相同的时间、日期与健康数据布局。"
      },
      {
        "src": "assets/watchfaces/vegetables/square-broccoli.webp",
        "thumb": "assets/watchfaces/vegetables/square-broccoli-thumb.webp",
        "detail": "assets/watchfaces/vegetables/originals/square-broccoli.png",
        "label": "多吃蔬菜 · 方形 · 西兰花",
        "chapter": "方形表盘",
        "caption": "西兰花角色搭配绿色画面与“迎兰而上”主题文字。"
      },
      {
        "src": "assets/watchfaces/vegetables/square-carrot.webp",
        "thumb": "assets/watchfaces/vegetables/square-carrot-thumb.webp",
        "detail": "assets/watchfaces/vegetables/originals/square-carrot.png",
        "label": "多吃蔬菜 · 方形 · 胡萝卜",
        "chapter": "方形表盘",
        "caption": "胡萝卜角色搭配紫色夜景，保留统一的功能分区与图标位置。"
      },
      {
        "src": "assets/watchfaces/vegetables/round-broccoli.webp",
        "thumb": "assets/watchfaces/vegetables/round-broccoli-thumb.webp",
        "detail": "assets/watchfaces/vegetables/originals/round-broccoli.png",
        "label": "多吃蔬菜 · 圆形 · 西兰花",
        "chapter": "圆形表盘",
        "caption": "圆形版围绕屏幕边界调整日期、角色和功能图标的位置。"
      },
      {
        "src": "assets/watchfaces/vegetables/capsule-broccoli.webp",
        "thumb": "assets/watchfaces/vegetables/capsule-broccoli-thumb.webp",
        "detail": "assets/watchfaces/vegetables/originals/capsule-broccoli.png",
        "label": "多吃蔬菜 · 跑道形 · 西兰花",
        "chapter": "跑道形表盘",
        "caption": "窄长屏幕采用纵向排布，依次展示时间、日期、角色和健康数据。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/vegetables/square-tomato.webp",
    "preview": "assets/watchfaces/vegetables/square-tomato-thumb.webp",
    "displayTitle": [
      "多吃蔬菜"
    ],
    "eyebrow": "智能表盘 / 四种角色 · 三种外形",
    "number": "11"
  },
  {
    "id": "archive-watch-04",
    "title": "时光相伴",
    "name": "时光相伴",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以橘猫主题画面、浅蓝信息卡片与描边时间构成温暖的照片表盘，展示两款方形画面、圆形与跑道形布局。",
    "details": [
      [
        "表盘介绍",
        "「时光相伴」是一款支持自定义照片的智能表盘。你可以随时将家人、宠物或风景照设为背景，让每一次抬腕都遇见美好回忆。表盘在突出照片的同时，清晰整合了时间日期、心率、电量、睡眠记录和空气湿度等信息，既个性又实用，为你的腕间增添一份专属温度。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/timecompanion/square-campfire.webp",
        "thumb": "assets/watchfaces/timecompanion/square-campfire-thumb.webp",
        "detail": "assets/watchfaces/timecompanion/originals/square-campfire.png",
        "label": "时光相伴 · 方形 · 篝火猫",
        "chapter": "方形表盘",
        "caption": "方形版以篝火旁烤棉花糖的橘猫画面为中心，描边时间叠放于图片上沿，下方排列步数、心率与生活信息卡片。"
      },
      {
        "src": "assets/watchfaces/timecompanion/square-cartoon.webp",
        "thumb": "assets/watchfaces/timecompanion/square-cartoon-thumb.webp",
        "detail": "assets/watchfaces/timecompanion/originals/square-cartoon.png",
        "label": "时光相伴 · 方形 · 卡通猫",
        "chapter": "方形表盘",
        "caption": "方形卡通版本展示蓝黄背景中的橘猫背影，沿用浅蓝卡片、描边时间和白色涂鸦装饰。"
      },
      {
        "src": "assets/watchfaces/timecompanion/round-campfire.webp",
        "thumb": "assets/watchfaces/timecompanion/round-campfire-thumb.webp",
        "detail": "assets/watchfaces/timecompanion/originals/round-campfire.png",
        "label": "时光相伴 · 圆形 · 篝火猫",
        "chapter": "圆形表盘",
        "caption": "圆形版保留橘猫主画面，在上下区域安排日期、天气、步数、心率和电量信息。"
      },
      {
        "src": "assets/watchfaces/timecompanion/capsule-campfire.webp",
        "thumb": "assets/watchfaces/timecompanion/capsule-campfire-thumb.webp",
        "detail": "assets/watchfaces/timecompanion/originals/capsule-campfire.png",
        "label": "时光相伴 · 跑道形 · 篝火猫",
        "chapter": "跑道形表盘",
        "caption": "跑道形版纵向展示日期、时间和橘猫画面，下方排列步数、心率、电量及圆形图标。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/timecompanion/square-campfire.webp",
    "preview": "assets/watchfaces/timecompanion/square-campfire-thumb.webp",
    "displayTitle": [
      "时光相伴"
    ],
    "eyebrow": "智能表盘 / 照片相伴 · 三种外形",
    "number": "12"
  },
  {
    "id": "archive-watch-05",
    "title": "橙能引擎",
    "name": "橙能引擎",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以高对比度橙黑配色和工业仪表布局突出时间，通过模块化区域组织天气、日历与运动数据，展示三种屏幕外形的适配。",
    "details": [
      [
        "表盘介绍",
        "橙能引擎是一款以“高效能数据驾驶舱”为设计理念打造的运动风表盘。采用高对比度橙黑配色，将时间、天气、日历、心率、步数、卡路里等核心信息集中呈现，带来一目了然的阅读体验。\n\n超大数字时间搭配工业仪表盘式布局，如同赛车驾驶舱般充满力量感与速度感。每一次抬腕，都能快速掌握当天状态，让时间管理与健康数据尽在掌控。无论是工作通勤、运动训练还是日常出行，橙能引擎都能为你持续注入满格能量。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/orangeengine/square-engine.webp",
        "thumb": "assets/watchfaces/orangeengine/square-engine-thumb.webp",
        "detail": "assets/watchfaces/orangeengine/originals/square-engine.png",
        "label": "橙能引擎 · 方形 · 橙黑仪表",
        "chapter": "方形表盘",
        "caption": "方形版以橙色大号时间为核心，周围卡片分区呈现天气、日期、步数、卡路里与其他数据。"
      },
      {
        "src": "assets/watchfaces/orangeengine/round-engine.webp",
        "thumb": "assets/watchfaces/orangeengine/round-engine-thumb.webp",
        "detail": "assets/watchfaces/orangeengine/originals/round-engine.png",
        "label": "橙能引擎 · 圆形适配 · 橙黑仪表",
        "chapter": "圆形表盘",
        "caption": "适配版保留橙色时间与中央环形状态区，将天气和日期置于上方，完整保留原图留白。"
      },
      {
        "src": "assets/watchfaces/orangeengine/capsule-engine.webp",
        "thumb": "assets/watchfaces/orangeengine/capsule-engine-thumb.webp",
        "detail": "assets/watchfaces/orangeengine/originals/capsule-engine.png",
        "label": "橙能引擎 · 跑道形 · 橙黑仪表",
        "chapter": "跑道形表盘",
        "caption": "跑道形版纵向排列天气、时间、步数与卡路里，在窄长屏幕中保持橙黑对比。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/orangeengine/square-engine.webp",
    "preview": "assets/watchfaces/orangeengine/square-engine-thumb.webp",
    "displayTitle": [
      "橙能引擎"
    ],
    "eyebrow": "智能表盘 / 橙黑仪表 · 三种外形",
    "number": "13"
  },
  {
    "id": "archive-watch-06",
    "title": "曜界",
    "name": "曜界",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以深黑背景和高亮橙色构建模块化仪表界面，突出时间、天气与健康信息，展示方形、圆形和跑道形三种布局。",
    "details": [
      [
        "表盘介绍",
        "“曜”代表时间的流转与光芒，也呼应表盘醒目的橙色能量元素；“界”象征信息与生活场景的边界融合。曜界，掌控每一秒的能量秩序。\n\n曜界以未来仪表盘为设计灵感，采用深邃黑底搭配高亮能量橙，打造兼具科技感与高级感的视觉语言。时间以超大数字居中呈现，抬腕即读；天气、日期、心率、压力、运动、步数、电量及快捷应用被巧妙整合进模块化布局之中，信息层级清晰，操作高效直观。\n\n每一道橙色光线，都像仪表启动时亮起的能量脉冲；每一个数据模块，都在记录你生活的节奏与状态。它不仅是一块显示时间的表盘，更像腕间的个人指挥中心——让时间可视化，让效率触手可及。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/yaojie/square-dashboard.webp",
        "thumb": "assets/watchfaces/yaojie/square-dashboard-thumb.webp",
        "detail": "assets/watchfaces/yaojie/originals/square-dashboard.png",
        "label": "曜界 · 方形 · 能量仪表",
        "chapter": "方形表盘",
        "caption": "方形版以黑色模块和橙色重点组织时间、天气、日期、心率、压力与运动信息。"
      },
      {
        "src": "assets/watchfaces/yaojie/round-dashboard.webp",
        "thumb": "assets/watchfaces/yaojie/round-dashboard-thumb.webp",
        "detail": "assets/watchfaces/yaojie/originals/round-dashboard.png",
        "label": "曜界 · 圆形 · 能量仪表",
        "chapter": "圆形表盘",
        "caption": "圆形版沿屏幕轮廓安排天气、时间和数据模块，底部保留电量与快捷应用。"
      },
      {
        "src": "assets/watchfaces/yaojie/capsule-dashboard.webp",
        "thumb": "assets/watchfaces/yaojie/capsule-dashboard-thumb.webp",
        "detail": "assets/watchfaces/yaojie/originals/capsule-dashboard.png",
        "label": "曜界 · 跑道形 · 能量仪表",
        "chapter": "跑道形表盘",
        "caption": "跑道形版纵向组织天气、时间、压力、步数与心率，保持黑橙配色和仪表风格。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/yaojie/square-dashboard.webp",
    "preview": "assets/watchfaces/yaojie/square-dashboard-thumb.webp",
    "displayTitle": [
      "曜界"
    ],
    "eyebrow": "智能表盘 / 能量仪表 · 三种外形",
    "number": "14"
  },
  {
    "id": "archive-watch-07",
    "title": "今日有喵",
    "name": "今日有喵",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以探出脑袋的小猫为视觉焦点，搭配柔和的奶油色界面，展示三花猫与橘猫两种角色，以及方形、圆形、跑道形的布局适配。",
    "details": [
      [
        "表盘介绍",
        "《今日有喵》采用温暖治愈的萌宠设计风格，以探出脑袋的小猫作为视觉焦点，搭配柔和舒适的奶油色界面，让每一次抬腕都充满轻松与愉悦。时间、天气、心率、步数、睡眠、电量等常用信息经过精心排布，在保持清晰易读的同时，也营造出温暖有趣的视觉体验。\n\n无论是在工作、学习还是运动途中，这只可爱的小猫都会默默陪伴着你，记录每一次心跳、每一步成长，以及每一个值得珍藏的日常瞬间。\n\n愿你每天抬腕查看时间时，都能收获一句无声的问候——世界破破烂烂，小猫尝尝咸淡。今天，也要开心有喵。把忙碌的生活，交给一只可爱的小猫来陪伴。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/cats/square-calico.webp",
        "thumb": "assets/watchfaces/cats/square-calico-thumb.webp",
        "detail": "assets/watchfaces/cats/originals/square-calico.png",
        "label": "今日有喵 · 方形 · 三花猫",
        "chapter": "方形表盘",
        "caption": "三花猫角色搭配奶油色界面，展示时间、天气、心率和健康数据分区。"
      },
      {
        "src": "assets/watchfaces/cats/square-orange.webp",
        "thumb": "assets/watchfaces/cats/square-orange-thumb.webp",
        "detail": "assets/watchfaces/cats/originals/square-orange.png",
        "label": "今日有喵 · 方形 · 橘猫",
        "chapter": "方形表盘",
        "caption": "橘猫角色与配套功能图标延续统一的奶油色界面和信息布局。"
      },
      {
        "src": "assets/watchfaces/cats/round-orange.webp",
        "thumb": "assets/watchfaces/cats/round-orange-thumb.webp",
        "detail": "assets/watchfaces/cats/originals/round-orange.png",
        "label": "今日有喵 · 圆形 · 橘猫",
        "chapter": "圆形表盘",
        "caption": "圆形版围绕屏幕边界安排时间、日期、健康数据与底部功能图标。"
      },
      {
        "src": "assets/watchfaces/cats/capsule-orange.webp",
        "thumb": "assets/watchfaces/cats/capsule-orange-thumb.webp",
        "detail": "assets/watchfaces/cats/originals/capsule-orange.png",
        "label": "今日有喵 · 跑道形 · 橘猫",
        "chapter": "跑道形表盘",
        "caption": "跑道形版以纵向布局连接时间、角色、心率、卡路里和功能入口。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/cats/square-calico.webp",
    "preview": "assets/watchfaces/cats/square-calico-thumb.webp",
    "displayTitle": [
      "今日有喵"
    ],
    "eyebrow": "智能表盘 / 萌宠主题 · 三种外形",
    "number": "15"
  },
  {
    "id": "archive-watch-08",
    "title": "悠然一刻",
    "name": "悠然一刻",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以柔和浅色底面、圆角信息卡片和细线图标呈现日常数据，展示蓝、绿、紫三款方形配色，以及圆形和跑道形布局。",
    "details": [
      [
        "表盘介绍",
        "悠然一刻，是一款以轻生活理念打造的治愈系信息表盘。采用柔和的马卡龙配色与简洁的卡片布局，将时间、天气、空气质量、心率、运动、睡眠、压力等日常数据巧妙融合于一屏。无需繁琐切换，抬腕之间即可掌握生活节奏，让科技回归陪伴，让每一次查看时间，都成为属于自己的悠然时刻。\n\n慢享生活，从容每一刻。以「悠然」诠释轻松自在的生活态度，以「一刻」记录每一次抬腕相见的瞬间。它不仅是一款显示信息的表盘，更像一位安静陪伴的生活助手，在忙碌与喧嚣中，为你保留一份从容与治愈。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/leisuremoment/square-blue.webp",
        "thumb": "assets/watchfaces/leisuremoment/square-blue-thumb.webp",
        "detail": "assets/watchfaces/leisuremoment/originals/square-blue.png",
        "label": "悠然一刻 · 方形 · 蓝色",
        "chapter": "方形表盘",
        "caption": "浅蓝方形版以环形电量和大字号时间为顶部重点，卡片分区展示天气、空气质量、运动与心率等信息。"
      },
      {
        "src": "assets/watchfaces/leisuremoment/square-green.webp",
        "thumb": "assets/watchfaces/leisuremoment/square-green-thumb.webp",
        "detail": "assets/watchfaces/leisuremoment/originals/square-green.png",
        "label": "悠然一刻 · 方形 · 绿色",
        "chapter": "方形表盘",
        "caption": "绿色版本沿用简洁卡片布局，以薄荷绿图标、边框和进度圆环呼应浅色底面。"
      },
      {
        "src": "assets/watchfaces/leisuremoment/square-purple.webp",
        "thumb": "assets/watchfaces/leisuremoment/square-purple-thumb.webp",
        "detail": "assets/watchfaces/leisuremoment/originals/square-purple.png",
        "label": "悠然一刻 · 方形 · 紫色",
        "chapter": "方形表盘",
        "caption": "紫色版本以淡紫背景和紫色功能图标呈现相同的信息层级与卡片结构。"
      },
      {
        "src": "assets/watchfaces/leisuremoment/round-blue.webp",
        "thumb": "assets/watchfaces/leisuremoment/round-blue-thumb.webp",
        "detail": "assets/watchfaces/leisuremoment/originals/round-blue.png",
        "label": "悠然一刻 · 圆形 · 蓝色",
        "chapter": "圆形表盘",
        "caption": "圆形版顶部并列电量与时间，中部展示天气和空气质量，底部排列快捷图标与日出日落时间。"
      },
      {
        "src": "assets/watchfaces/leisuremoment/capsule-blue.webp",
        "thumb": "assets/watchfaces/leisuremoment/capsule-blue-thumb.webp",
        "detail": "assets/watchfaces/leisuremoment/originals/capsule-blue.png",
        "label": "悠然一刻 · 跑道形 · 蓝色",
        "chapter": "跑道形表盘",
        "caption": "跑道形版纵向安排电量、日期、时间与天气，下方保留睡眠、压力及日出日落信息。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/leisuremoment/square-blue.webp",
    "preview": "assets/watchfaces/leisuremoment/square-blue-thumb.webp",
    "displayTitle": [
      "悠然一刻"
    ],
    "eyebrow": "智能表盘 / 轻生活卡片 · 三种外形",
    "number": "16"
  },
  {
    "id": "archive-watch-09",
    "title": "虹辉星澜",
    "name": "虹辉星澜",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以黑色底面、米白信息面板和两侧虹彩刻度构建复古电子仪表风格，展示方形、圆形与跑道形三种布局。",
    "details": [
      [
        "表盘介绍",
        "灵感源于绚丽虹光与浩瀚星河，虹辉星澜将复古电子仪表的秩序美学与现代智能交互巧妙融合，在经典与未来之间，打造出兼具科技感与艺术感的腕间体验。\n\n整体采用高对比信息布局，以醒目的大数字时间作为视觉中心，确保抬腕即可快速读取时间。天气、心率、电量、步数、站立、卡路里、睡眠、压力、相机等常用信息科学分布于四周，各模块层次清晰、布局均衡，让重要数据一目了然，帮助你在繁忙生活中高效掌控每一天。\n\n表盘两侧标志性的虹彩渐变能量光带，是整款设计最具辨识度的视觉语言。从冷静沉稳的蓝绿，到充满活力的橙红，渐变色彩宛如流动的光谱，为整体增添丰富的层次与节奏，也象征着生命活力与无限能量，如星光流转般点亮腕间。\n\n虹辉星澜不仅是一款记录时间的表盘，更是一种充满节奏与能量的生活方式。每一次抬腕，都能感受虹光与星辉交织的视觉魅力，让时间、健康与生活信息尽收眼底，在方寸之间，开启属于你的智能腕间新体验。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/honghui/square-dashboard.webp",
        "thumb": "assets/watchfaces/honghui/square-dashboard-thumb.webp",
        "detail": "assets/watchfaces/honghui/originals/square-dashboard.png",
        "label": "虹辉星澜 · 方形 · 虹彩仪表",
        "chapter": "方形表盘",
        "caption": "方形版以中央米白时间面板为核心，四周排列天气、心率、电量与健康数据，两侧点缀虹彩刻度。"
      },
      {
        "src": "assets/watchfaces/honghui/round-dashboard.webp",
        "thumb": "assets/watchfaces/honghui/round-dashboard-thumb.webp",
        "detail": "assets/watchfaces/honghui/originals/round-dashboard.png",
        "label": "虹辉星澜 · 圆形 · 虹彩仪表",
        "chapter": "圆形表盘",
        "caption": "圆形版在中央面板展示天气、日期与数字时间，沿圆周安排心率、电量、步数及快捷图标。"
      },
      {
        "src": "assets/watchfaces/honghui/capsule-dashboard.webp",
        "thumb": "assets/watchfaces/honghui/capsule-dashboard-thumb.webp",
        "detail": "assets/watchfaces/honghui/originals/capsule-dashboard.png",
        "label": "虹辉星澜 · 跑道形 · 虹彩仪表",
        "chapter": "跑道形表盘",
        "caption": "跑道形版纵向排列电量、时间、日期、步数、站立和心率信息，两侧保留虹彩刻度。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/honghui/square-dashboard.webp",
    "preview": "assets/watchfaces/honghui/square-dashboard-thumb.webp",
    "displayTitle": [
      "虹辉星澜"
    ],
    "eyebrow": "智能表盘 / 虹彩仪表 · 三种外形",
    "number": "17"
  },
  {
    "id": "archive-watch-10",
    "title": "蓝境",
    "name": "蓝境",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以深黑背景、米白大数字与科技蓝细节组织模块化信息，环形电量和圆角数据卡片贯穿方形、圆形与跑道形布局。",
    "details": [
      [
        "表盘介绍",
        "蓝境以深邃黑色为底，搭配通透的科技蓝点缀，呈现出沉稳而富有未来感的视觉风格。整体采用模块化信息布局，将时间置于视觉中心，天气、步数、压力、心率、睡眠、电量、卡路里、站立等核心数据合理分区，让重要信息一目了然，抬腕即可快速掌握全天状态。\n\n圆角卡片设计与统一的蓝色描边相互呼应，在提升层次感的同时，也赋予界面更加精致、现代的视觉体验。大字号时间确保清晰易读，蓝白配色兼顾美观与识别度，无论是在工作、运动还是日常生活中，都能带来舒适高效的使用体验。\n\n蓝境，不仅是一块记录时间的表盘，更是一方融合科技美学与健康管理的智能空间，让每一次抬腕，都仿佛置身于静谧而充满未来感的蓝色世界。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/lanjing/square-dashboard.webp",
        "thumb": "assets/watchfaces/lanjing/square-dashboard-thumb.webp",
        "detail": "assets/watchfaces/lanjing/originals/square-dashboard.png",
        "label": "蓝境 · 方形 · 科技蓝",
        "chapter": "方形表盘",
        "caption": "方形版顶部排列天气、步数和压力，中部突出时间与蓝色秒数，下方以环形电量连接健康数据卡片。"
      },
      {
        "src": "assets/watchfaces/lanjing/round-dashboard.webp",
        "thumb": "assets/watchfaces/lanjing/round-dashboard-thumb.webp",
        "detail": "assets/watchfaces/lanjing/originals/round-dashboard.png",
        "label": "蓝境 · 圆形 · 科技蓝",
        "chapter": "圆形表盘",
        "caption": "圆形版沿屏幕轮廓排布天气、步数和健康信息，保留大字号时间、环形电量与底部快捷图标。"
      },
      {
        "src": "assets/watchfaces/lanjing/capsule-dashboard.webp",
        "thumb": "assets/watchfaces/lanjing/capsule-dashboard-thumb.webp",
        "detail": "assets/watchfaces/lanjing/originals/capsule-dashboard.png",
        "label": "蓝境 · 跑道形 · 科技蓝",
        "chapter": "跑道形表盘",
        "caption": "跑道形版纵向组织日期、时间、心率和站立数据，下方以蓝色电量圆环及周围图标收束布局。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/lanjing/square-dashboard.webp",
    "preview": "assets/watchfaces/lanjing/square-dashboard-thumb.webp",
    "displayTitle": [
      "蓝境"
    ],
    "eyebrow": "智能表盘 / 科技蓝 · 三种外形",
    "number": "18"
  },
  {
    "id": "archive-watch-11",
    "title": "赤曜仪表",
    "name": "赤曜仪表",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以黑白线框、分段数字与斜纹色块构建赛车仪表风格，展示赤红、亮橙、青色三款方形配色，以及圆形和跑道形布局。",
    "details": [
      [
        "表盘介绍",
        "以赛车仪表盘与机械测速界面为灵感，将醒目的赤红能量与深邃黑色融合，打造充满速度感与力量感的腕上驾驶舱。时间、天气、运动与健康数据如同精密仪表般有序排列，让每一次抬腕都仿佛置身于高性能机器的控制中心。\n\n赤色如曜，数据如仪。让每一次前进，都清晰可见。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/chiyao/square-red.webp",
        "thumb": "assets/watchfaces/chiyao/square-red-thumb.webp",
        "detail": "assets/watchfaces/chiyao/originals/square-red.png",
        "label": "赤曜仪表 · 方形 · 赤红",
        "chapter": "方形表盘",
        "caption": "赤红斜纹与细线框架围绕纵向数字时间，左右分区展示天气、环境与健康信息。"
      },
      {
        "src": "assets/watchfaces/chiyao/square-orange.webp",
        "thumb": "assets/watchfaces/chiyao/square-orange-thumb.webp",
        "detail": "assets/watchfaces/chiyao/originals/square-orange.png",
        "label": "赤曜仪表 · 方形 · 亮橙",
        "chapter": "方形表盘",
        "caption": "方形橙色版本沿用仪表分区，以亮橙斜纹、日期和电量刻度强调重点。"
      },
      {
        "src": "assets/watchfaces/chiyao/square-cyan.webp",
        "thumb": "assets/watchfaces/chiyao/square-cyan-thumb.webp",
        "detail": "assets/watchfaces/chiyao/originals/square-cyan.png",
        "label": "赤曜仪表 · 方形 · 青色",
        "chapter": "方形表盘",
        "caption": "方形青色版本以青色斜纹和局部数字点缀黑白信息框架。"
      },
      {
        "src": "assets/watchfaces/chiyao/round-red.webp",
        "thumb": "assets/watchfaces/chiyao/round-red-thumb.webp",
        "detail": "assets/watchfaces/chiyao/originals/round-red.png",
        "label": "赤曜仪表 · 圆形 · 赤红",
        "chapter": "圆形表盘",
        "caption": "圆形版以纵向时间为中心，沿两侧排布天气、步数、睡眠与心率，底部展示电量。"
      },
      {
        "src": "assets/watchfaces/chiyao/capsule-red.webp",
        "thumb": "assets/watchfaces/chiyao/capsule-red-thumb.webp",
        "detail": "assets/watchfaces/chiyao/originals/capsule-red.png",
        "label": "赤曜仪表 · 跑道形 · 赤红",
        "chapter": "跑道形表盘",
        "caption": "跑道形版纵向排列天气、时间、日期、步数与心率，以红色刻度和日期强调仪表风格。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/chiyao/square-red.webp",
    "preview": "assets/watchfaces/chiyao/square-red-thumb.webp",
    "displayTitle": [
      "赤曜仪表"
    ],
    "eyebrow": "智能表盘 / 赛车仪表 · 三种外形",
    "number": "19"
  },
  {
    "id": "archive-watch-12",
    "title": "能量脉冲",
    "name": "能量脉冲",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以黑色底面、荧光绿重点与白色大数字构建信息界面，地球图像承载电量展示，呈现方形、圆形与跑道形三种布局。",
    "details": [
      [
        "表盘介绍",
        "以荧光能量绿为视觉核心，将时间、天气、电量、心率、睡眠与运动数据融为一体，打造如脉冲般持续跃动的腕上能量中心。每一次抬腕，都能快速掌握身体状态与生活节奏，让科技感与效率感同步在线。\n\n让时间跃动，让能量可见。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/energypulse/square-dashboard.webp",
        "thumb": "assets/watchfaces/energypulse/square-dashboard-thumb.webp",
        "detail": "assets/watchfaces/energypulse/originals/square-dashboard.png",
        "label": "能量脉冲 · 方形 · 能量仪表",
        "chapter": "方形表盘",
        "caption": "方形版顶部排列天气、日期与步数，大字号时间下方以地球电量图像连接心率、睡眠及其他数据卡片。"
      },
      {
        "src": "assets/watchfaces/energypulse/round-dashboard.webp",
        "thumb": "assets/watchfaces/energypulse/round-dashboard-thumb.webp",
        "detail": "assets/watchfaces/energypulse/originals/round-dashboard.png",
        "label": "能量脉冲 · 圆形 · 能量仪表",
        "chapter": "圆形表盘",
        "caption": "圆形版沿轮廓组织天气、日期与步数，中央突出时间和地球电量，底部排列数据卡片与快捷图标。"
      },
      {
        "src": "assets/watchfaces/energypulse/capsule-dashboard.webp",
        "thumb": "assets/watchfaces/energypulse/capsule-dashboard-thumb.webp",
        "detail": "assets/watchfaces/energypulse/originals/capsule-dashboard.png",
        "label": "能量脉冲 · 跑道形 · 能量仪表",
        "chapter": "跑道形表盘",
        "caption": "跑道形版纵向排列时间、心率、地球电量、站立、压力与步数，保留荧光绿标识和底部日出日落信息。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/energypulse/square-dashboard.webp",
    "preview": "assets/watchfaces/energypulse/square-dashboard-thumb.webp",
    "displayTitle": [
      "能量脉冲"
    ],
    "eyebrow": "智能表盘 / 荧光能量 · 三种外形",
    "number": "20"
  },
  {
    "id": "archive-watch-13",
    "title": "粉漾时光",
    "name": "粉漾时光",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以明亮粉色、立体数字与圆角卡片构建信息界面，围绕中央时间安排健康数据与圆形快捷图标，展示三种外形布局。",
    "details": [
      [
        "表盘介绍",
        "以清新灵动的粉色为主调，将时间作为视觉中心，搭配天气、日期、心率、步数、电量等实用信息。清晰有序的模块布局兼顾颜值与效率，多种屏幕形态灵活适配，让每一次抬腕，都沉浸在轻快明亮的粉色时光里。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/pinktime/square-dashboard.webp",
        "thumb": "assets/watchfaces/pinktime/square-dashboard-thumb.webp",
        "detail": "assets/watchfaces/pinktime/originals/square-dashboard.png",
        "label": "粉漾时光 · 方形 · 粉色立体",
        "chapter": "方形表盘",
        "caption": "方形版以四枚立体数字为中心，顶部排列电量、天气与日期，两侧展示心率和步数，下方排列快捷图标与数据。"
      },
      {
        "src": "assets/watchfaces/pinktime/round-dashboard.webp",
        "thumb": "assets/watchfaces/pinktime/round-dashboard-thumb.webp",
        "detail": "assets/watchfaces/pinktime/originals/round-dashboard.png",
        "label": "粉漾时光 · 圆形 · 能量仪表",
        "chapter": "圆形表盘",
        "caption": "圆形版围绕中央粉色时间面板排布天气、日期、心率和步数，底部保留圆形快捷图标与站立、压力信息。"
      },
      {
        "src": "assets/watchfaces/pinktime/capsule-dashboard.webp",
        "thumb": "assets/watchfaces/pinktime/capsule-dashboard-thumb.webp",
        "detail": "assets/watchfaces/pinktime/originals/capsule-dashboard.png",
        "label": "粉漾时光 · 跑道形 · 能量仪表",
        "chapter": "跑道形表盘",
        "caption": "跑道形版纵向排列日期、立体时间数字和快捷图标，下方展示站立与压力，延续粉色层次和圆润造型。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/pinktime/square-dashboard.webp",
    "preview": "assets/watchfaces/pinktime/square-dashboard-thumb.webp",
    "displayTitle": [
      "粉漾时光"
    ],
    "eyebrow": "智能表盘 / 能量仪表 · 三种外形",
    "number": "21"
  },
  {
    "id": "archive-watch-14",
    "title": "宠趣时光",
    "name": "宠趣时光",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以猫狗出游场景搭配粉色界面，通过半透明卡片组织时间与健康信息，展示方形、圆形和跑道形三种布局适配。",
    "details": [
      [
        "表盘介绍",
        "把治愈系萌宠戴在手上，粉嫩可爱的“宠趣时光”表盘，步数、心率、血氧一屏全掌握。生活虽忙，但别忘了给它留点可爱的瞬间。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/pettime/square-pets.webp",
        "thumb": "assets/watchfaces/pettime/square-pets-thumb.webp",
        "detail": "assets/watchfaces/pettime/originals/square-pets.png",
        "label": "宠趣时光 · 方形 · 猫狗同行",
        "chapter": "方形表盘",
        "caption": "方形版以猫狗出游场景为中心，用半透明信息卡片组织时间、天气与健康数据。"
      },
      {
        "src": "assets/watchfaces/pettime/round-pets.webp",
        "thumb": "assets/watchfaces/pettime/round-pets-thumb.webp",
        "detail": "assets/watchfaces/pettime/originals/round-pets.png",
        "label": "宠趣时光 · 圆形 · 猫狗同行",
        "chapter": "圆形表盘",
        "caption": "圆形版沿屏幕边界调整信息卡片，保留中央猫狗角色和粉色出游场景。"
      },
      {
        "src": "assets/watchfaces/pettime/capsule-pets.webp",
        "thumb": "assets/watchfaces/pettime/capsule-pets-thumb.webp",
        "detail": "assets/watchfaces/pettime/originals/capsule-pets.png",
        "label": "宠趣时光 · 跑道形 · 猫狗同行",
        "chapter": "跑道形表盘",
        "caption": "跑道形版采用纵向排布，在窄长屏幕中呈现时间、环境信息、猫狗角色和功能入口。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/pettime/square-pets.webp",
    "preview": "assets/watchfaces/pettime/square-pets-thumb.webp",
    "displayTitle": [
      "宠趣时光"
    ],
    "eyebrow": "智能表盘 / 猫狗出游 · 三种外形",
    "number": "22"
  },
  {
    "id": "archive-watch-15",
    "title": "萌宠暖绒",
    "name": "萌宠暖绒",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以毛绒小狗和暖米色背景营造柔和氛围，结合圆角信息卡片与自定义文字，展示方形、圆形和跑道形三种布局。",
    "details": [
      [
        "表盘介绍",
        "圆润卡片清晰呈现健康数据，每次抬腕都能收获一份毛绒绒的好心情。暖绒色调治愈日常，萌宠伴友守护腕间。侧边加入自定义文字，圆润清新，数据一目了然，轻松点亮你的每一刻。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/cozypet/square-puppy.webp",
        "thumb": "assets/watchfaces/cozypet/square-puppy-thumb.webp",
        "detail": "assets/watchfaces/cozypet/originals/square-puppy.png",
        "label": "萌宠暖绒 · 方形 · 暖绒小狗",
        "chapter": "方形表盘",
        "caption": "方形版以戴毛绒帽的小狗为视觉主体，用圆角半透明卡片组织时间、天气、步数与健康数据。"
      },
      {
        "src": "assets/watchfaces/cozypet/round-puppy.webp",
        "thumb": "assets/watchfaces/cozypet/round-puppy-thumb.webp",
        "detail": "assets/watchfaces/cozypet/originals/round-puppy.png",
        "label": "萌宠暖绒 · 圆形 · 暖绒小狗",
        "chapter": "圆形表盘",
        "caption": "圆形版保留小狗与暖米色背景，将字母文字排列于下方，适应圆形屏幕边界。"
      },
      {
        "src": "assets/watchfaces/cozypet/capsule-puppy.webp",
        "thumb": "assets/watchfaces/cozypet/capsule-puppy-thumb.webp",
        "detail": "assets/watchfaces/cozypet/originals/capsule-puppy.png",
        "label": "萌宠暖绒 · 跑道形 · 暖绒小狗",
        "chapter": "跑道形表盘",
        "caption": "跑道形版采用纵向布局，时间位于上方，小狗居中，字母文字沿侧边排列。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/cozypet/square-puppy.webp",
    "preview": "assets/watchfaces/cozypet/square-puppy-thumb.webp",
    "displayTitle": [
      "萌宠暖绒"
    ],
    "eyebrow": "智能表盘 / 暖绒萌宠 · 三种外形",
    "number": "23"
  },
  {
    "id": "archive-watch-16",
    "title": "冷萃时刻",
    "name": "冷萃时刻",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以冰海与白熊插画营造清凉氛围，搭配蓝色大数字和浅色数据卡片，展示方形日夜两版、圆形与跑道形布局。",
    "details": [
      [
        "表盘介绍",
        "以雪天为背景，中央超大时间搭配日期与农历，一目了然。下方数据网格清晰排列：卡路里、步数、心率、睡眠时长、站立次数及电量，冷白与冰蓝配色，视觉沁凉。抬腕即感冰雪拂面，所有关键信息尽收眼底。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/coldbrew/square-day.webp",
        "thumb": "assets/watchfaces/coldbrew/square-day-thumb.webp",
        "detail": "assets/watchfaces/coldbrew/originals/square-day.png",
        "label": "冷萃时刻 · 方形 · 日间",
        "chapter": "方形表盘",
        "caption": "日间版以冰海、浮冰和泳圈中的白熊为背景，蓝色大数字搭配四格健康数据与底部快捷图标。"
      },
      {
        "src": "assets/watchfaces/coldbrew/square-night.webp",
        "thumb": "assets/watchfaces/coldbrew/square-night-thumb.webp",
        "detail": "assets/watchfaces/coldbrew/originals/square-night.png",
        "label": "冷萃时刻 · 方形 · 夜间",
        "chapter": "方形表盘",
        "caption": "夜间版展示星空与浮冰上熟睡的白熊，以浅青色时间和半透明数据卡片呼应深蓝背景。"
      },
      {
        "src": "assets/watchfaces/coldbrew/round-day.webp",
        "thumb": "assets/watchfaces/coldbrew/round-day-thumb.webp",
        "detail": "assets/watchfaces/coldbrew/originals/round-day.png",
        "label": "冷萃时刻 · 圆形 · 日间",
        "chapter": "圆形表盘",
        "caption": "圆形版保留冰海白熊插画、四格数据与底部彩色图标，时间横向铺展于上方。"
      },
      {
        "src": "assets/watchfaces/coldbrew/capsule-day.webp",
        "thumb": "assets/watchfaces/coldbrew/capsule-day-thumb.webp",
        "detail": "assets/watchfaces/coldbrew/originals/capsule-day.png",
        "label": "冷萃时刻 · 跑道形 · 日间",
        "chapter": "跑道形表盘",
        "caption": "跑道形版以时间、日期和白熊插画纵向构图，下方排列站立信息与快捷图标。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/coldbrew/square-day.webp",
    "preview": "assets/watchfaces/coldbrew/square-day-thumb.webp",
    "displayTitle": [
      "冷萃时刻"
    ],
    "eyebrow": "智能表盘 / 冰海白熊 · 三种外形",
    "number": "24"
  },
  {
    "id": "archive-watch-17",
    "title": "霓虹萌咪",
    "name": "霓虹萌咪",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以呆萌小猫搭配深紫渐变、粉色文字和细线边框，展示状态信息与健康数据在方形、圆形和跑道形屏幕中的布局。",
    "details": [
      [
        "表盘介绍",
        "紫晶霓虹渐变，呆萌惊讶小猫。随心情变换小猫表情，天气环境速览，四格快捷触达，辅以心率卡路里。美貌与实用兼备。心率步数，一屏尽览。颜值与实力并存的腕间萌伴。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/neoncat/square-kitten.webp",
        "thumb": "assets/watchfaces/neoncat/square-kitten-thumb.webp",
        "detail": "assets/watchfaces/neoncat/originals/square-kitten.png",
        "label": "霓虹萌咪 · 方形 · 霓虹小猫",
        "chapter": "方形表盘",
        "caption": "方形版以小猫角色搭配深紫渐变和粉色描边，分区展示时间、压力状态、睡眠与活动数据。"
      },
      {
        "src": "assets/watchfaces/neoncat/round-kitten.webp",
        "thumb": "assets/watchfaces/neoncat/round-kitten-thumb.webp",
        "detail": "assets/watchfaces/neoncat/originals/round-kitten.png",
        "label": "霓虹萌咪 · 圆形 · 霓虹小猫",
        "chapter": "圆形表盘",
        "caption": "圆形版将时间置于上方，小猫与状态信息并排呈现，底部排列卡路里、步数和心率。"
      },
      {
        "src": "assets/watchfaces/neoncat/capsule-kitten.webp",
        "thumb": "assets/watchfaces/neoncat/capsule-kitten-thumb.webp",
        "detail": "assets/watchfaces/neoncat/originals/capsule-kitten.png",
        "label": "霓虹萌咪 · 跑道形 · 霓虹小猫",
        "chapter": "跑道形表盘",
        "caption": "跑道形版沿纵向排列天气、时间、小猫角色、状态文字与数据，适配窄长屏幕。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/neoncat/square-kitten.webp",
    "preview": "assets/watchfaces/neoncat/square-kitten-thumb.webp",
    "displayTitle": [
      "霓虹萌咪"
    ],
    "eyebrow": "智能表盘 / 霓虹萌宠 · 三种外形",
    "number": "25"
  },
  {
    "id": "archive-watch-18",
    "title": "喵趣涂鸦",
    "name": "喵趣涂鸦",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以手绘猫咪、彩色星星和对话框搭配黑白大字时间，展示方形、圆形和跑道形中的趣味信息布局。",
    "details": [
      [
        "表盘介绍",
        "活泼手绘猫咪搭配缤纷涂鸦元素，时间清晰醒目，步数、心率、天气、电量等信息一目了然，让每次抬腕都充满可爱与好心情。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/doodlecat/square-doodle.webp",
        "thumb": "assets/watchfaces/doodlecat/square-doodle-thumb.webp",
        "detail": "assets/watchfaces/doodlecat/originals/square-doodle.png",
        "label": "喵趣涂鸦 · 方形 · 猫咪涂鸦",
        "chapter": "方形表盘",
        "caption": "方形版以大号黑色时间为中心，猫咪、星星和对话框共同组织步数、心率、天气与电量信息。"
      },
      {
        "src": "assets/watchfaces/doodlecat/round-doodle.webp",
        "thumb": "assets/watchfaces/doodlecat/round-doodle-thumb.webp",
        "detail": "assets/watchfaces/doodlecat/originals/round-doodle.png",
        "label": "喵趣涂鸦 · 圆形 · 猫咪涂鸦",
        "chapter": "圆形表盘",
        "caption": "圆形版沿屏幕边界布局猫咪与星星，保留醒目的时间及对话框式数据区域。"
      },
      {
        "src": "assets/watchfaces/doodlecat/capsule-doodle.webp",
        "thumb": "assets/watchfaces/doodlecat/capsule-doodle-thumb.webp",
        "detail": "assets/watchfaces/doodlecat/originals/capsule-doodle.png",
        "label": "喵趣涂鸦 · 跑道形 · 猫咪涂鸦",
        "chapter": "跑道形表盘",
        "caption": "跑道形版将星期、猫咪、时间和天气纵向排列，用涂鸦线条连接不同信息区域。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/doodlecat/square-doodle.webp",
    "preview": "assets/watchfaces/doodlecat/square-doodle-thumb.webp",
    "displayTitle": [
      "喵趣涂鸦"
    ],
    "eyebrow": "智能表盘 / 猫咪涂鸦 · 三种外形",
    "number": "26"
  },
  {
    "id": "archive-watch-19",
    "title": "雪跃时光",
    "name": "雪跃时光",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以滑雪、雪橇和滑冰小海豹搭配冰蓝雪景，展示四种方形角色画面，以及圆形与跑道形的信息布局。",
    "details": [
      [
        "表盘介绍",
        "清爽冰蓝色调搭配滑雪小海豹，营造轻松又充满活力的冬日氛围。时间信息醒目直观，并整合心率、步数、睡眠、电量、压力等常用数据，让可爱视觉与实用功能自然结合，陪你记录每一天的活力状态。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/snowseal/square-ski.webp",
        "thumb": "assets/watchfaces/snowseal/square-ski-thumb.webp",
        "detail": "assets/watchfaces/snowseal/originals/square-ski.png",
        "label": "雪跃时光 · 方形 · 滑雪",
        "chapter": "方形表盘",
        "caption": "滑雪小海豹位于冰蓝雪景中央，大号时间与底部半透明信息卡片形成清晰分区。"
      },
      {
        "src": "assets/watchfaces/snowseal/square-sleigh.webp",
        "thumb": "assets/watchfaces/snowseal/square-sleigh-thumb.webp",
        "detail": "assets/watchfaces/snowseal/originals/square-sleigh.png",
        "label": "雪跃时光 · 方形 · 围巾雪橇",
        "chapter": "方形表盘",
        "caption": "红围巾小海豹乘坐木制雪橇，在统一的雪景与信息布局中呈现另一种角色造型。"
      },
      {
        "src": "assets/watchfaces/snowseal/square-sled.webp",
        "thumb": "assets/watchfaces/snowseal/square-sled-thumb.webp",
        "detail": "assets/watchfaces/snowseal/originals/square-sled.png",
        "label": "雪跃时光 · 方形 · 平板雪橇",
        "chapter": "方形表盘",
        "caption": "小海豹乘坐平板雪橇，延续冰蓝色背景、白色时间和底部数据卡片。"
      },
      {
        "src": "assets/watchfaces/snowseal/square-skate.webp",
        "thumb": "assets/watchfaces/snowseal/square-skate-thumb.webp",
        "detail": "assets/watchfaces/snowseal/originals/square-skate.png",
        "label": "雪跃时光 · 方形 · 滑冰",
        "chapter": "方形表盘",
        "caption": "戴蓝色毛线帽的小海豹呈现滑冰姿态，与雪花装饰和浅色信息卡片呼应。"
      },
      {
        "src": "assets/watchfaces/snowseal/round-ski.webp",
        "thumb": "assets/watchfaces/snowseal/round-ski-thumb.webp",
        "detail": "assets/watchfaces/snowseal/originals/round-ski.png",
        "label": "雪跃时光 · 圆形 · 滑雪",
        "chapter": "圆形表盘",
        "caption": "圆形版将步数与睡眠置于角色两侧，底部排列站立、卡路里和压力信息。"
      },
      {
        "src": "assets/watchfaces/snowseal/capsule-ski.webp",
        "thumb": "assets/watchfaces/snowseal/capsule-ski-thumb.webp",
        "detail": "assets/watchfaces/snowseal/originals/capsule-ski.png",
        "label": "雪跃时光 · 跑道形 · 滑雪",
        "chapter": "跑道形表盘",
        "caption": "跑道形版以纵向布局排列日期、时间、滑雪角色与站立、卡路里数据。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/snowseal/square-ski.webp",
    "preview": "assets/watchfaces/snowseal/square-ski-thumb.webp",
    "displayTitle": [
      "雪跃时光"
    ],
    "eyebrow": "智能表盘 / 冰雪萌宠 · 三种外形",
    "number": "27"
  },
  {
    "id": "archive-watch-20",
    "title": "心情放映",
    "name": "心情放映",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以浅色底面、彩色圆角卡片和生动表情呈现日常状态，搭配睡眠月亮与醒目数字时间，展示方形、圆形和跑道形布局。",
    "details": [
      [
        "表盘介绍",
        "用明快色彩记录一天的小情绪，可变表情会随着不同状态展现不同模样，让每次抬腕都有一点新鲜感。时间、天气、睡眠、心率、压力与运动数据轻巧融入其中，把日常状态变成一场有趣的心情放映。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/moodscreen/square-mood.webp",
        "thumb": "assets/watchfaces/moodscreen/square-mood-thumb.webp",
        "detail": "assets/watchfaces/moodscreen/originals/square-mood.png",
        "label": "心情放映 · 方形 · 星星眼",
        "chapter": "方形表盘",
        "caption": "方形版以黑金数字时间、紫色睡眠月亮和彩色表情卡片组织信息，下方排列运动数据与快捷图标。"
      },
      {
        "src": "assets/watchfaces/moodscreen/round-mood.webp",
        "thumb": "assets/watchfaces/moodscreen/round-mood-thumb.webp",
        "detail": "assets/watchfaces/moodscreen/originals/round-mood.png",
        "label": "心情放映 · 圆形 · 眨眼",
        "chapter": "圆形表盘",
        "caption": "圆形版以眨眼表情、睡眠月亮和蓝色天气卡片围绕心率信息，底部保留运动数据及快捷图标。"
      },
      {
        "src": "assets/watchfaces/moodscreen/capsule-mood.webp",
        "thumb": "assets/watchfaces/moodscreen/capsule-mood-thumb.webp",
        "detail": "assets/watchfaces/moodscreen/originals/capsule-mood.png",
        "label": "心情放映 · 跑道形 · 眨眼",
        "chapter": "跑道形表盘",
        "caption": "跑道形版纵向排列电量、时间和日期，以睡眠及表情压力卡片为主体，下方展示卡路里、步数与快捷图标。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/moodscreen/square-mood.webp",
    "preview": "assets/watchfaces/moodscreen/square-mood-thumb.webp",
    "displayTitle": [
      "心情放映"
    ],
    "eyebrow": "智能表盘 / 心情卡片 · 三种外形",
    "number": "28"
  },
  {
    "id": "archive-watch-21",
    "title": "云端漫游",
    "name": "云端漫游",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以猫咪驾驶蓝色汽车的插画搭配手绘数字与浅色数据卡片，展示海边、田野、夕阳和夜景四款方形场景，以及圆形和跑道形布局。",
    "details": [
      [
        "表盘介绍",
        "清新的蓝色天空与可爱猫咪相伴，营造出自在又治愈的云端出行氛围。时间、天气、步数、心率、睡眠等信息清晰呈现，让每次抬腕都像开启一场轻松的小小漫游。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/cloudroaming/square-coast.webp",
        "thumb": "assets/watchfaces/cloudroaming/square-coast-thumb.webp",
        "detail": "assets/watchfaces/cloudroaming/originals/square-coast.png",
        "label": "云端漫游 · 方形 · 海边",
        "chapter": "方形表盘",
        "caption": "海边版以猫咪与蓝色汽车为主体，白色手绘数字时间搭配左侧健康数据卡片。"
      },
      {
        "src": "assets/watchfaces/cloudroaming/square-field.webp",
        "thumb": "assets/watchfaces/cloudroaming/square-field-thumb.webp",
        "detail": "assets/watchfaces/cloudroaming/originals/square-field.png",
        "label": "云端漫游 · 方形 · 田野",
        "chapter": "方形表盘",
        "caption": "田野版以青山、草地和乡间道路为背景，延续蓝色汽车与浅色数据卡片。"
      },
      {
        "src": "assets/watchfaces/cloudroaming/square-sunset.webp",
        "thumb": "assets/watchfaces/cloudroaming/square-sunset-thumb.webp",
        "detail": "assets/watchfaces/cloudroaming/originals/square-sunset.png",
        "label": "云端漫游 · 方形 · 夕阳",
        "chapter": "方形表盘",
        "caption": "夕阳版以橙粉色天空与城市剪影衬托猫咪汽车，保留时间与健康信息布局。"
      },
      {
        "src": "assets/watchfaces/cloudroaming/square-night.webp",
        "thumb": "assets/watchfaces/cloudroaming/square-night-thumb.webp",
        "detail": "assets/watchfaces/cloudroaming/originals/square-night.png",
        "label": "云端漫游 · 方形 · 夜景",
        "chapter": "方形表盘",
        "caption": "夜景版以星空、月亮和海岸灯光呈现夜间出行场景，车灯与白色时间形成亮点。"
      },
      {
        "src": "assets/watchfaces/cloudroaming/round-coast.webp",
        "thumb": "assets/watchfaces/cloudroaming/round-coast-thumb.webp",
        "detail": "assets/watchfaces/cloudroaming/originals/round-coast.png",
        "label": "云端漫游 · 圆形 · 海边",
        "chapter": "圆形表盘",
        "caption": "圆形版上方突出时间和日期，左侧展示步数、卡路里与心率，下方安排电量条。"
      },
      {
        "src": "assets/watchfaces/cloudroaming/capsule-coast.webp",
        "thumb": "assets/watchfaces/cloudroaming/capsule-coast-thumb.webp",
        "detail": "assets/watchfaces/cloudroaming/originals/capsule-coast.png",
        "label": "云端漫游 · 跑道形 · 海边",
        "chapter": "跑道形表盘",
        "caption": "跑道形版纵向排列天气、时间与日期，以猫咪汽车占据下半部，搭配手电筒、拍照图标和电量条。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/cloudroaming/square-coast.webp",
    "preview": "assets/watchfaces/cloudroaming/square-coast-thumb.webp",
    "displayTitle": [
      "云端漫游"
    ],
    "eyebrow": "智能表盘 / 猫咪出行 · 三种外形",
    "number": "29"
  },
  {
    "id": "archive-watch-22",
    "title": "月兔团圆",
    "name": "月兔团圆",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以三只玉兔与月饼搭配米白、暖黄色调，结合描边时间和圆角信息卡片，展示三种屏幕外形中的中秋主题设计。",
    "details": [
      [
        "表盘介绍",
        "三只软萌玉兔围坐月饼之间，把中秋的团圆与温暖藏进腕间。清新的米白与暖黄色调搭配时间、天气、步数、心率等日常信息，让每一次抬腕都多一点节日的治愈感。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/moonrabbit/square-rabbits.webp",
        "thumb": "assets/watchfaces/moonrabbit/square-rabbits-thumb.webp",
        "detail": "assets/watchfaces/moonrabbit/originals/square-rabbits.png",
        "label": "月兔团圆 · 方形 · 月兔团圆",
        "chapter": "方形表盘",
        "caption": "方形版以三只玉兔与月饼为中心，描边时间位于上方，天气、心率、步数和压力信息分列两侧。"
      },
      {
        "src": "assets/watchfaces/moonrabbit/round-rabbits.webp",
        "thumb": "assets/watchfaces/moonrabbit/round-rabbits-thumb.webp",
        "detail": "assets/watchfaces/moonrabbit/originals/round-rabbits.png",
        "label": "月兔团圆 · 圆形 · 月兔团圆",
        "chapter": "圆形表盘",
        "caption": "圆形版沿屏幕边界调整信息卡片，保留玉兔、月饼与底部节日寄语。"
      },
      {
        "src": "assets/watchfaces/moonrabbit/capsule-rabbits.webp",
        "thumb": "assets/watchfaces/moonrabbit/capsule-rabbits-thumb.webp",
        "detail": "assets/watchfaces/moonrabbit/originals/capsule-rabbits.png",
        "label": "月兔团圆 · 跑道形 · 月兔团圆",
        "chapter": "跑道形表盘",
        "caption": "跑道形版纵向排列电量、时间和日期，将玉兔与月饼作为下半部的视觉主体。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/moonrabbit/square-rabbits.webp",
    "preview": "assets/watchfaces/moonrabbit/square-rabbits-thumb.webp",
    "displayTitle": [
      "月兔团圆"
    ],
    "eyebrow": "智能表盘 / 中秋玉兔 · 三种外形",
    "number": "30"
  },
  {
    "id": "archive-watch-23",
    "title": "像素动物",
    "name": "像素动物",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以复古像素方块呈现橘猫、青蛙、小鸭、兔子、小狗和熊猫，搭配黑色网格、彩色时间与花草场景，展示不同外形中的信息布局。",
    "details": [
      [
        "表盘介绍",
        "以复古像素方块勾勒出6种不同动物，搭配明亮跳跃的色彩，让黑色表盘多了一点游戏感与治愈气息。时间、日期、心率、步数、睡眠与电量清晰排布，在实用信息里藏进一只可爱的小动物。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/pixelanimals/square-cat.webp",
        "thumb": "assets/watchfaces/pixelanimals/square-cat-thumb.webp",
        "detail": "assets/watchfaces/pixelanimals/originals/square-cat.png",
        "label": "像素动物 · 方形 · 橘猫",
        "chapter": "方形表盘",
        "caption": "橘猫与彩色草地搭配黑色像素网格，时间与健康信息排列于上方。"
      },
      {
        "src": "assets/watchfaces/pixelanimals/square-frog.webp",
        "thumb": "assets/watchfaces/pixelanimals/square-frog-thumb.webp",
        "detail": "assets/watchfaces/pixelanimals/originals/square-frog.png",
        "label": "像素动物 · 方形 · 青蛙",
        "chapter": "方形表盘",
        "caption": "绿色青蛙与花草组成像素场景，延续统一的时间和数据分区。"
      },
      {
        "src": "assets/watchfaces/pixelanimals/square-duck.webp",
        "thumb": "assets/watchfaces/pixelanimals/square-duck-thumb.webp",
        "detail": "assets/watchfaces/pixelanimals/originals/square-duck.png",
        "label": "像素动物 · 方形 · 小鸭",
        "chapter": "方形表盘",
        "caption": "黄色小鸭与花草搭配黑色网格背景，突出鲜明的像素轮廓。"
      },
      {
        "src": "assets/watchfaces/pixelanimals/square-rabbit.webp",
        "thumb": "assets/watchfaces/pixelanimals/square-rabbit-thumb.webp",
        "detail": "assets/watchfaces/pixelanimals/originals/square-rabbit.png",
        "label": "像素动物 · 方形 · 兔子",
        "chapter": "方形表盘",
        "caption": "白色长耳兔置于花草之间，保留统一的像素时间与健康信息布局。"
      },
      {
        "src": "assets/watchfaces/pixelanimals/square-dog.webp",
        "thumb": "assets/watchfaces/pixelanimals/square-dog-thumb.webp",
        "detail": "assets/watchfaces/pixelanimals/originals/square-dog.png",
        "label": "像素动物 · 方形 · 小狗",
        "chapter": "方形表盘",
        "caption": "棕白色小狗通过像素方块呈现，搭配草地和小花。"
      },
      {
        "src": "assets/watchfaces/pixelanimals/square-panda.webp",
        "thumb": "assets/watchfaces/pixelanimals/square-panda-thumb.webp",
        "detail": "assets/watchfaces/pixelanimals/originals/square-panda.png",
        "label": "像素动物 · 方形 · 熊猫",
        "chapter": "方形表盘",
        "caption": "黑白熊猫与绿色草地形成对比，延续同系列像素语言。"
      },
      {
        "src": "assets/watchfaces/pixelanimals/round-cat.webp",
        "thumb": "assets/watchfaces/pixelanimals/round-cat-thumb.webp",
        "detail": "assets/watchfaces/pixelanimals/originals/round-cat.png",
        "label": "像素动物 · 圆形适配 · 橘猫",
        "chapter": "圆形表盘",
        "caption": "橘猫适配版将时间、四项数据与角色集中排布，完整保留上传图的黑色留白。"
      },
      {
        "src": "assets/watchfaces/pixelanimals/capsule-cat.webp",
        "thumb": "assets/watchfaces/pixelanimals/capsule-cat-thumb.webp",
        "detail": "assets/watchfaces/pixelanimals/originals/capsule-cat.png",
        "label": "像素动物 · 跑道形 · 橘猫",
        "chapter": "跑道形表盘",
        "caption": "窄长版纵向排列像素时间、日期、心率、步数、橘猫与天气图标。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/pixelanimals/square-cat.webp",
    "preview": "assets/watchfaces/pixelanimals/square-cat-thumb.webp",
    "displayTitle": [
      "像素动物"
    ],
    "eyebrow": "智能表盘 / 六种像素动物 · 三种外形",
    "number": "31"
  },
  {
    "id": "archive-watch-25",
    "title": "雪境初光",
    "name": "雪境初光",
    "group": "interface",
    "category": "WATCHFACE DESIGN",
    "summary": "以雪峰风景、通透大数字与玻璃质感信息栏构建界面，展示晨光、白昼、极光三款方形场景，以及圆形和跑道形布局。",
    "details": [
      [
        "表盘介绍",
        "雪峰沐浴在第一束暖光里，冰蓝与金色交织出清透又安静的雪境。融雪感数字搭配运动、步数、天气等信息，让每一次抬腕，都像看见山巅刚刚亮起。"
      ]
    ],
    "items": [
      {
        "src": "assets/watchfaces/snowdawn/square-dawn.webp",
        "thumb": "assets/watchfaces/snowdawn/square-dawn-thumb.webp",
        "detail": "assets/watchfaces/snowdawn/originals/square-dawn.png",
        "label": "雪境初光 · 方形 · 晨光",
        "chapter": "方形表盘",
        "caption": "晨光版以暖色云霞和雪峰为背景，半透明大数字与下方玻璃质感信息栏叠放于山景之上。"
      },
      {
        "src": "assets/watchfaces/snowdawn/square-day.webp",
        "thumb": "assets/watchfaces/snowdawn/square-day-thumb.webp",
        "detail": "assets/watchfaces/snowdawn/originals/square-day.png",
        "label": "雪境初光 · 方形 · 白昼",
        "chapter": "方形表盘",
        "caption": "白昼版展示蓝天与明亮雪峰，沿用通透时间数字、健康数据条和底部快捷图标。"
      },
      {
        "src": "assets/watchfaces/snowdawn/square-aurora.webp",
        "thumb": "assets/watchfaces/snowdawn/square-aurora-thumb.webp",
        "detail": "assets/watchfaces/snowdawn/originals/square-aurora.png",
        "label": "雪境初光 · 方形 · 极光",
        "chapter": "方形表盘",
        "caption": "极光版以绿色极光、星空和深蓝雪峰构成夜景，浅色数字与半透明面板保持信息层级。"
      },
      {
        "src": "assets/watchfaces/snowdawn/round-dawn.webp",
        "thumb": "assets/watchfaces/snowdawn/round-dawn-thumb.webp",
        "detail": "assets/watchfaces/snowdawn/originals/round-dawn.png",
        "label": "雪境初光 · 圆形 · 晨光",
        "chapter": "圆形表盘",
        "caption": "圆形版保留晨光雪峰背景，上方突出时间，下方集中展示健康数据、快捷图标与步数。"
      },
      {
        "src": "assets/watchfaces/snowdawn/capsule-dawn.webp",
        "thumb": "assets/watchfaces/snowdawn/capsule-dawn-thumb.webp",
        "detail": "assets/watchfaces/snowdawn/originals/capsule-dawn.png",
        "label": "雪境初光 · 跑道形 · 晨光",
        "chapter": "跑道形表盘",
        "caption": "跑道形版纵向排列天气、日期与时间，底部以数据条和快捷图标呈现健康信息及步数。"
      }
    ],
    "accent": "#bff3df",
    "color": "#bff3df",
    "surface": "#111c1d",
    "cover": "assets/watchfaces/snowdawn/square-dawn.webp",
    "preview": "assets/watchfaces/snowdawn/square-dawn-thumb.webp",
    "displayTitle": [
      "雪境初光"
    ],
    "eyebrow": "智能表盘 / 雪峰光影 · 三种外形",
    "number": "32"
  },
  {
    "id": "archive-sanfu",
    "title": "三福 · 品牌策划",
    "name": "三福提案",
    "group": "brand",
    "category": "BRAND DESIGN",
    "summary": "通过原作品页面展示三福 · 品牌策划的创意构思与视觉呈现。支持作品逐页浏览及完整策划案的上下滑动阅读。",
    "details": [],
    "items": [
      {
        "src": "assets/archive/sanfu-01.webp",
        "thumb": "assets/archive/sanfu-01-thumb.webp",
        "label": "三福 · 品牌策划 · 第 1 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 1 页"
      },
      {
        "src": "assets/archive/sanfu-02.webp",
        "thumb": "assets/archive/sanfu-02-thumb.webp",
        "label": "三福 · 品牌策划 · 第 2 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 2 页"
      },
      {
        "src": "assets/archive/sanfu-03.webp",
        "thumb": "assets/archive/sanfu-03-thumb.webp",
        "label": "三福 · 品牌策划 · 第 3 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 3 页"
      },
      {
        "src": "assets/archive/sanfu-04.webp",
        "thumb": "assets/archive/sanfu-04-thumb.webp",
        "label": "三福 · 品牌策划 · 第 4 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 4 页"
      },
      {
        "src": "assets/archive/sanfu-05.webp",
        "thumb": "assets/archive/sanfu-05-thumb.webp",
        "label": "三福 · 品牌策划 · 第 5 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 5 页"
      },
      {
        "src": "assets/archive/sanfu-06.webp",
        "thumb": "assets/archive/sanfu-06-thumb.webp",
        "label": "三福 · 品牌策划 · 第 6 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 6 页"
      },
      {
        "src": "assets/archive/sanfu-07.webp",
        "thumb": "assets/archive/sanfu-07-thumb.webp",
        "label": "三福 · 品牌策划 · 第 7 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 7 页"
      },
      {
        "src": "assets/archive/sanfu-08.webp",
        "thumb": "assets/archive/sanfu-08-thumb.webp",
        "label": "三福 · 品牌策划 · 第 8 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 8 页"
      },
      {
        "src": "assets/archive/sanfu-09.webp",
        "thumb": "assets/archive/sanfu-09-thumb.webp",
        "label": "三福 · 品牌策划 · 第 9 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 9 页"
      },
      {
        "src": "assets/archive/sanfu-10.webp",
        "thumb": "assets/archive/sanfu-10-thumb.webp",
        "label": "三福 · 品牌策划 · 第 10 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 10 页"
      },
      {
        "src": "assets/archive/sanfu-11.webp",
        "thumb": "assets/archive/sanfu-11-thumb.webp",
        "label": "三福 · 品牌策划 · 第 11 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 11 页"
      },
      {
        "src": "assets/archive/sanfu-12.webp",
        "thumb": "assets/archive/sanfu-12-thumb.webp",
        "label": "三福 · 品牌策划 · 第 12 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 12 页"
      },
      {
        "src": "assets/archive/sanfu-13.webp",
        "thumb": "assets/archive/sanfu-13-thumb.webp",
        "label": "三福 · 品牌策划 · 第 13 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 13 页"
      },
      {
        "src": "assets/archive/sanfu-14.webp",
        "thumb": "assets/archive/sanfu-14-thumb.webp",
        "label": "三福 · 品牌策划 · 第 14 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 14 页"
      },
      {
        "src": "assets/archive/sanfu-15.webp",
        "thumb": "assets/archive/sanfu-15-thumb.webp",
        "label": "三福 · 品牌策划 · 第 15 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 15 页"
      },
      {
        "src": "assets/archive/sanfu-16.webp",
        "thumb": "assets/archive/sanfu-16-thumb.webp",
        "label": "三福 · 品牌策划 · 第 16 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 16 页"
      },
      {
        "src": "assets/archive/sanfu-17.webp",
        "thumb": "assets/archive/sanfu-17-thumb.webp",
        "label": "三福 · 品牌策划 · 第 17 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 17 页"
      },
      {
        "src": "assets/archive/sanfu-18.webp",
        "thumb": "assets/archive/sanfu-18-thumb.webp",
        "label": "三福 · 品牌策划 · 第 18 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 18 页"
      },
      {
        "src": "assets/archive/sanfu-19.webp",
        "thumb": "assets/archive/sanfu-19-thumb.webp",
        "label": "三福 · 品牌策划 · 第 19 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 19 页"
      },
      {
        "src": "assets/archive/sanfu-20.webp",
        "thumb": "assets/archive/sanfu-20-thumb.webp",
        "label": "三福 · 品牌策划 · 第 20 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 20 页"
      },
      {
        "src": "assets/archive/sanfu-21.webp",
        "thumb": "assets/archive/sanfu-21-thumb.webp",
        "label": "三福 · 品牌策划 · 第 21 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 21 页"
      },
      {
        "src": "assets/archive/sanfu-22.webp",
        "thumb": "assets/archive/sanfu-22-thumb.webp",
        "label": "三福 · 品牌策划 · 第 22 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 22 页"
      },
      {
        "src": "assets/archive/sanfu-23.webp",
        "thumb": "assets/archive/sanfu-23-thumb.webp",
        "label": "三福 · 品牌策划 · 第 23 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 23 页"
      },
      {
        "src": "assets/archive/sanfu-24.webp",
        "thumb": "assets/archive/sanfu-24-thumb.webp",
        "label": "三福 · 品牌策划 · 第 24 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 24 页"
      },
      {
        "src": "assets/archive/sanfu-25.webp",
        "thumb": "assets/archive/sanfu-25-thumb.webp",
        "label": "三福 · 品牌策划 · 第 25 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 25 页"
      },
      {
        "src": "assets/archive/sanfu-26.webp",
        "thumb": "assets/archive/sanfu-26-thumb.webp",
        "label": "三福 · 品牌策划 · 第 26 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 26 页"
      },
      {
        "src": "assets/archive/sanfu-27.webp",
        "thumb": "assets/archive/sanfu-27-thumb.webp",
        "label": "三福 · 品牌策划 · 第 27 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 27 页"
      },
      {
        "src": "assets/archive/sanfu-28.webp",
        "thumb": "assets/archive/sanfu-28-thumb.webp",
        "label": "三福 · 品牌策划 · 第 28 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 28 页"
      },
      {
        "src": "assets/archive/sanfu-29.webp",
        "thumb": "assets/archive/sanfu-29-thumb.webp",
        "label": "三福 · 品牌策划 · 第 29 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 29 页"
      },
      {
        "src": "assets/archive/sanfu-30.webp",
        "thumb": "assets/archive/sanfu-30-thumb.webp",
        "label": "三福 · 品牌策划 · 第 30 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 30 页"
      },
      {
        "src": "assets/archive/sanfu-31.webp",
        "thumb": "assets/archive/sanfu-31-thumb.webp",
        "label": "三福 · 品牌策划 · 第 31 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 31 页"
      },
      {
        "src": "assets/archive/sanfu-32.webp",
        "thumb": "assets/archive/sanfu-32-thumb.webp",
        "label": "三福 · 品牌策划 · 第 32 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 32 页"
      },
      {
        "src": "assets/archive/sanfu-33.webp",
        "thumb": "assets/archive/sanfu-33-thumb.webp",
        "label": "三福 · 品牌策划 · 第 33 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 33 页"
      },
      {
        "src": "assets/archive/sanfu-34.webp",
        "thumb": "assets/archive/sanfu-34-thumb.webp",
        "label": "三福 · 品牌策划 · 第 34 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 34 页"
      },
      {
        "src": "assets/archive/sanfu-35.webp",
        "thumb": "assets/archive/sanfu-35-thumb.webp",
        "label": "三福 · 品牌策划 · 第 35 页",
        "chapter": "项目页面",
        "caption": "三福 · 品牌策划 · 第 35 页"
      }
    ],
    "accent": "#e5ad83",
    "color": "#e5ad83",
    "surface": "#111c1d",
    "cover": "assets/archive/sanfu-01.webp",
    "preview": "assets/archive/sanfu-01-thumb.webp",
    "displayTitle": [
      "三福",
      "品牌策划"
    ],
    "eyebrow": "品牌视觉 / 项目档案",
    "document": "assets/documents/sanfu-brand-plan.pdf",
    "documentLabel": "完整策划案 PDF",
    "number": "33"
  },
  {
    "id": "archive-yunnan",
    "title": "云南白药 · 品牌策划",
    "name": "云南白药",
    "group": "brand",
    "category": "BRAND DESIGN",
    "summary": "通过原作品页面展示云南白药 · 品牌策划的创意构思与视觉呈现。支持作品逐页浏览及完整策划案的上下滑动阅读。",
    "details": [],
    "items": [
      {
        "src": "assets/archive/yunnan-01.webp",
        "thumb": "assets/archive/yunnan-01-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 1 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 1 页"
      },
      {
        "src": "assets/archive/yunnan-02.webp",
        "thumb": "assets/archive/yunnan-02-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 2 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 2 页"
      },
      {
        "src": "assets/archive/yunnan-03.webp",
        "thumb": "assets/archive/yunnan-03-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 3 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 3 页"
      },
      {
        "src": "assets/archive/yunnan-04.webp",
        "thumb": "assets/archive/yunnan-04-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 4 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 4 页"
      },
      {
        "src": "assets/archive/yunnan-05.webp",
        "thumb": "assets/archive/yunnan-05-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 5 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 5 页"
      },
      {
        "src": "assets/archive/yunnan-06.webp",
        "thumb": "assets/archive/yunnan-06-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 6 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 6 页"
      },
      {
        "src": "assets/archive/yunnan-07.webp",
        "thumb": "assets/archive/yunnan-07-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 7 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 7 页"
      },
      {
        "src": "assets/archive/yunnan-08.webp",
        "thumb": "assets/archive/yunnan-08-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 8 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 8 页"
      },
      {
        "src": "assets/archive/yunnan-09.webp",
        "thumb": "assets/archive/yunnan-09-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 9 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 9 页"
      },
      {
        "src": "assets/archive/yunnan-10.webp",
        "thumb": "assets/archive/yunnan-10-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 10 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 10 页"
      },
      {
        "src": "assets/archive/yunnan-11.webp",
        "thumb": "assets/archive/yunnan-11-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 11 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 11 页"
      },
      {
        "src": "assets/archive/yunnan-12.webp",
        "thumb": "assets/archive/yunnan-12-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 12 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 12 页"
      },
      {
        "src": "assets/archive/yunnan-13.webp",
        "thumb": "assets/archive/yunnan-13-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 13 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 13 页"
      },
      {
        "src": "assets/archive/yunnan-14.webp",
        "thumb": "assets/archive/yunnan-14-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 14 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 14 页"
      },
      {
        "src": "assets/archive/yunnan-15.webp",
        "thumb": "assets/archive/yunnan-15-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 15 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 15 页"
      },
      {
        "src": "assets/archive/yunnan-16.webp",
        "thumb": "assets/archive/yunnan-16-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 16 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 16 页"
      },
      {
        "src": "assets/archive/yunnan-17.webp",
        "thumb": "assets/archive/yunnan-17-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 17 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 17 页"
      },
      {
        "src": "assets/archive/yunnan-18.webp",
        "thumb": "assets/archive/yunnan-18-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 18 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 18 页"
      },
      {
        "src": "assets/archive/yunnan-19.webp",
        "thumb": "assets/archive/yunnan-19-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 19 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 19 页"
      },
      {
        "src": "assets/archive/yunnan-20.webp",
        "thumb": "assets/archive/yunnan-20-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 20 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 20 页"
      },
      {
        "src": "assets/archive/yunnan-21.webp",
        "thumb": "assets/archive/yunnan-21-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 21 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 21 页"
      },
      {
        "src": "assets/archive/yunnan-22.webp",
        "thumb": "assets/archive/yunnan-22-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 22 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 22 页"
      },
      {
        "src": "assets/archive/yunnan-23.webp",
        "thumb": "assets/archive/yunnan-23-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 23 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 23 页"
      },
      {
        "src": "assets/archive/yunnan-24.webp",
        "thumb": "assets/archive/yunnan-24-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 24 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 24 页"
      },
      {
        "src": "assets/archive/yunnan-25.webp",
        "thumb": "assets/archive/yunnan-25-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 25 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 25 页"
      },
      {
        "src": "assets/archive/yunnan-26.webp",
        "thumb": "assets/archive/yunnan-26-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 26 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 26 页"
      },
      {
        "src": "assets/archive/yunnan-27.webp",
        "thumb": "assets/archive/yunnan-27-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 27 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 27 页"
      },
      {
        "src": "assets/archive/yunnan-28.webp",
        "thumb": "assets/archive/yunnan-28-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 28 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 28 页"
      },
      {
        "src": "assets/archive/yunnan-29.webp",
        "thumb": "assets/archive/yunnan-29-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 29 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 29 页"
      },
      {
        "src": "assets/archive/yunnan-30.webp",
        "thumb": "assets/archive/yunnan-30-thumb.webp",
        "label": "云南白药 · 品牌策划 · 第 30 页",
        "chapter": "项目页面",
        "caption": "云南白药 · 品牌策划 · 第 30 页"
      }
    ],
    "accent": "#e5ad83",
    "color": "#e5ad83",
    "surface": "#111c1d",
    "cover": "assets/archive/yunnan-01.webp",
    "preview": "assets/archive/yunnan-01-thumb.webp",
    "displayTitle": [
      "云南白药",
      "品牌策划"
    ],
    "eyebrow": "品牌视觉 / 项目档案",
    "document": "assets/documents/yunnan-brand-plan.pdf",
    "documentLabel": "完整策划案 PDF",
    "number": "34"
  },
  {
    "id": "archive-qiang",
    "title": "一羌一绣",
    "name": "一羌一绣",
    "group": "brand",
    "category": "BRAND DESIGN",
    "summary": "通过原作品页面展示一羌一绣的创意构思与视觉呈现。可逐页浏览，也可打开完整 PDF 阅读。",
    "details": [],
    "items": [
      {
        "src": "assets/archive/qiang-01.webp",
        "thumb": "assets/archive/qiang-01-thumb.webp",
        "label": "一羌一绣 · 第 3 页",
        "chapter": "项目页面",
        "caption": "一羌一绣 · 第 3 页"
      },
      {
        "src": "assets/archive/qiang-02.webp",
        "thumb": "assets/archive/qiang-02-thumb.webp",
        "label": "一羌一绣 · 第 4 页",
        "chapter": "项目页面",
        "caption": "一羌一绣 · 第 4 页"
      },
      {
        "src": "assets/archive/qiang-03.webp",
        "thumb": "assets/archive/qiang-03-thumb.webp",
        "label": "一羌一绣 · 第 5 页",
        "chapter": "项目页面",
        "caption": "一羌一绣 · 第 5 页"
      },
      {
        "src": "assets/archive/qiang-04.webp",
        "thumb": "assets/archive/qiang-04-thumb.webp",
        "label": "一羌一绣 · 第 6 页",
        "chapter": "项目页面",
        "caption": "一羌一绣 · 第 6 页"
      },
      {
        "src": "assets/archive/qiang-05.webp",
        "thumb": "assets/archive/qiang-05-thumb.webp",
        "label": "一羌一绣 · 第 7 页",
        "chapter": "项目页面",
        "caption": "一羌一绣 · 第 7 页"
      },
      {
        "src": "assets/archive/qiang-06.webp",
        "thumb": "assets/archive/qiang-06-thumb.webp",
        "label": "一羌一绣 · 第 8 页",
        "chapter": "项目页面",
        "caption": "一羌一绣 · 第 8 页"
      },
      {
        "src": "assets/archive/qiang-07.webp",
        "thumb": "assets/archive/qiang-07-thumb.webp",
        "label": "一羌一绣 · 第 9 页",
        "chapter": "项目页面",
        "caption": "一羌一绣 · 第 9 页"
      }
    ],
    "accent": "#e5ad83",
    "color": "#e5ad83",
    "surface": "#111c1d",
    "cover": "assets/archive/qiang-01.webp",
    "preview": "assets/archive/qiang-01-thumb.webp",
    "displayTitle": [
      "一羌一绣"
    ],
    "eyebrow": "品牌视觉 / 项目档案",
    "document": "assets/documents/shi-yi-project-collection.pdf",
    "documentLabel": "完整作品集 PDF",
    "number": "35"
  },
  {
    "id": "archive-anyue",
    "title": "安岳时刻",
    "name": "安岳时刻",
    "group": "brand",
    "category": "BRAND DESIGN",
    "summary": "通过原作品页面展示安岳时刻的创意构思与视觉呈现。可逐页浏览，也可打开完整 PDF 阅读。",
    "details": [],
    "items": [
      {
        "src": "assets/archive/anyue-01.webp",
        "thumb": "assets/archive/anyue-01-thumb.webp",
        "label": "安岳时刻 · 第 11 页",
        "chapter": "项目页面",
        "caption": "安岳时刻 · 第 11 页"
      },
      {
        "src": "assets/archive/anyue-02.webp",
        "thumb": "assets/archive/anyue-02-thumb.webp",
        "label": "安岳时刻 · 第 12 页",
        "chapter": "项目页面",
        "caption": "安岳时刻 · 第 12 页"
      },
      {
        "src": "assets/archive/anyue-03.webp",
        "thumb": "assets/archive/anyue-03-thumb.webp",
        "label": "安岳时刻 · 第 13 页",
        "chapter": "项目页面",
        "caption": "安岳时刻 · 第 13 页"
      },
      {
        "src": "assets/archive/anyue-04.webp",
        "thumb": "assets/archive/anyue-04-thumb.webp",
        "label": "安岳时刻 · 第 14 页",
        "chapter": "项目页面",
        "caption": "安岳时刻 · 第 14 页"
      },
      {
        "src": "assets/archive/anyue-05.webp",
        "thumb": "assets/archive/anyue-05-thumb.webp",
        "label": "安岳时刻 · 第 15 页",
        "chapter": "项目页面",
        "caption": "安岳时刻 · 第 15 页"
      },
      {
        "src": "assets/archive/anyue-06.webp",
        "thumb": "assets/archive/anyue-06-thumb.webp",
        "label": "安岳时刻 · 第 16 页",
        "chapter": "项目页面",
        "caption": "安岳时刻 · 第 16 页"
      },
      {
        "src": "assets/archive/anyue-07.webp",
        "thumb": "assets/archive/anyue-07-thumb.webp",
        "label": "安岳时刻 · 第 17 页",
        "chapter": "项目页面",
        "caption": "安岳时刻 · 第 17 页"
      }
    ],
    "accent": "#e5ad83",
    "color": "#e5ad83",
    "surface": "#111c1d",
    "cover": "assets/archive/anyue-01.webp",
    "preview": "assets/archive/anyue-01-thumb.webp",
    "displayTitle": [
      "安岳时刻"
    ],
    "eyebrow": "品牌视觉 / 项目档案",
    "document": "assets/documents/shi-yi-project-collection.pdf",
    "documentLabel": "完整作品集 PDF",
    "number": "36"
  },
  {
    "id": "archive-hostel",
    "title": "万能青旅",
    "name": "万能青旅",
    "group": "web",
    "category": "WEB DESIGN",
    "summary": "通过原作品页面展示万能青旅的创意构思与视觉呈现。可逐页浏览，也可打开完整 PDF 阅读。",
    "details": [],
    "items": [
      {
        "src": "assets/archive/hostel-01.webp",
        "thumb": "assets/archive/hostel-01-thumb.webp",
        "label": "万能青旅 · 第 19 页",
        "chapter": "项目页面",
        "caption": "万能青旅 · 第 19 页"
      },
      {
        "src": "assets/archive/hostel-02.webp",
        "thumb": "assets/archive/hostel-02-thumb.webp",
        "label": "万能青旅 · 第 20 页",
        "chapter": "项目页面",
        "caption": "万能青旅 · 第 20 页"
      },
      {
        "src": "assets/archive/hostel-03.webp",
        "thumb": "assets/archive/hostel-03-thumb.webp",
        "label": "万能青旅 · 第 21 页",
        "chapter": "项目页面",
        "caption": "万能青旅 · 第 21 页"
      },
      {
        "src": "assets/archive/hostel-04.webp",
        "thumb": "assets/archive/hostel-04-thumb.webp",
        "label": "万能青旅 · 第 22 页",
        "chapter": "项目页面",
        "caption": "万能青旅 · 第 22 页"
      },
      {
        "src": "assets/archive/hostel-05.webp",
        "thumb": "assets/archive/hostel-05-thumb.webp",
        "label": "万能青旅 · 第 23 页",
        "chapter": "项目页面",
        "caption": "万能青旅 · 第 23 页"
      }
    ],
    "accent": "#e5ad83",
    "color": "#e5ad83",
    "surface": "#111c1d",
    "cover": "assets/archive/hostel-01.webp",
    "preview": "assets/archive/hostel-01-thumb.webp",
    "displayTitle": [
      "万能青旅"
    ],
    "eyebrow": "网页视觉 / 项目档案",
    "document": "assets/documents/shi-yi-project-collection.pdf",
    "documentLabel": "完整作品集 PDF",
    "number": "37"
  },
  {
    "id": "archive-vcg",
    "title": "视觉中国 · vivo 壁纸设计",
    "contextLabel": "实习项目",
    "name": "视觉中国",
    "group": "wallpaper",
    "category": "WALLPAPER COLLECTION",
    "summary": "2026 年 5 月至 8 月，在视觉中国 vivo 项目组担任 AI 视觉设计实习生，围绕壁纸主题开展静态与动态视觉设计，个人独立完成制作与优化。本页选览静态与动态壁纸作品。",
    "details": [
      [
        "实习背景",
        "视觉中国 / vivo 项目组，2026.05 - 2026.08；AI 视觉设计实习生，参与静态与动态壁纸设计。"
      ],
      [
        "视觉设计职责",
        "围绕 vivo 壁纸主题调整构图层次、色彩搭配与光影表现，结合画面内容优化动态节奏与视觉连贯性。"
      ],
      [
        "工作流与工具",
        "使用小云雀搭建视频生成工作流，参与工具配置与模型选择；整理可复用提示词模板，结合可灵 AI、Seedance、Gemini 等工具开展生成测试、素材筛选与后期优化。"
      ],
      [
        "个人交付",
        "个人独立完成制作与优化，日均最终交付约 72 张静态壁纸、30 条动态壁纸。"
      ],
      [
        "作品选览",
        "16 张静态精选按光影留白、材质构成、自然想象、趣味角色分组，另有 8 条动态壁纸可直接播放。本页为部分实习作品选览。"
      ]
    ],
    "brief": {
      "role": "AI 视觉设计实习生 / vivo 项目组",
      "period": "2026.05 - 2026.08",
      "headline": "静态与动态壁纸设计",
      "intro": "围绕 vivo 壁纸主题开展视觉设计，调整构图、色彩与光影，并优化动态节奏和视觉连贯性。个人独立完成制作与优化。",
      "metricsLabel": "个人日均最终交付约",
      "metrics": [
        [
          "72",
          "张静态壁纸"
        ],
        [
          "30",
          "条动态壁纸"
        ]
      ],
      "workflow": [
        [
          "主题视觉设计",
          "围绕壁纸主题，调整构图层次、色彩搭配与光影表现。"
        ],
        [
          "生成工作流",
          "使用小云雀搭建视频生成工作流，参与工具配置与模型选择。"
        ],
        [
          "测试与筛选",
          "整理可复用提示词模板，结合可灵 AI、Seedance、Gemini 开展生成测试与素材筛选。"
        ],
        [
          "制作与优化",
          "结合画面内容完成后期优化，调整动态节奏与视觉连贯性。"
        ]
      ],
      "selectionNote": "四组静态精选展示光影、材质、自然与角色表达，动态壁纸可单独观看。",
      "comparisons": [
       {
        "id": "tea",
        "label": "圆窗茶影",
        "focus": "构图与光影",
        "thumb": "assets/vcg-selected/light-tea-thumb.webp",
        "before": "assets/vcg-process/light-tea-initial-ai.png",
        "after": "assets/vcg-selected/light-tea.webp",
        "beforeAlt": "AI 模拟初始图：枝叶较密、光线偏冷的圆窗茶器画面",
        "afterAlt": "现有壁纸成品：暖光下的圆窗、竹叶与茶器",
        "notes": [
          ["构图留白", "减少上部干扰，突出主体层次。"],
          ["光影关系", "梳理明暗，让茶具与背景更清晰。"],
          ["材质细节", "强化陶器与木纹的质感。"]
        ]
       },
       {
        "id": "gold",
        "label": "暗涌鎏金",
        "focus": "材质与高光",
        "thumb": "assets/vcg-selected/material-gold-thumb.webp",
        "before": "assets/vcg-process/material-gold-initial-ai.png",
        "after": "assets/vcg-selected/material-gold.webp",
        "beforeAlt": "AI 模拟初始图：金带较平滑、颗粒感较弱的黑金抽象构成",
        "afterAlt": "现有壁纸成品：带有细密金色颗粒与明暗层次的流动褶皱",
        "notes": [
          ["金属颗粒", "让细密金色颗粒替代平滑色带，增加材质辨识度。"],
          ["边缘高光", "沿起伏边缘组织亮部，突出曲面的流动感。"],
          ["暗部层次", "区分黑色褶皱与灰色背景，保留深色区域的细节。"]
        ]
       },
       {
        "id": "sea",
        "label": "椰影透蓝",
        "focus": "景深与水体",
        "thumb": "assets/vcg-selected/nature-sea-thumb.webp",
        "before": "assets/vcg-process/nature-sea-initial-ai.png",
        "after": "assets/vcg-selected/nature-sea.webp",
        "beforeAlt": "AI 模拟初始图：远山较实、海水色调较均一的热带海景",
        "afterAlt": "现有壁纸成品：远山淡化、近岸海水清透并呈现水下礁石的海景",
        "notes": [
          ["远近分层", "减弱远山的明暗反差，拉开前景、海面与远景的距离。"],
          ["水体通透", "通过水下礁石与折射光纹，表现近岸浅水的清澈感。"],
          ["色彩过渡", "从近岸青绿过渡到远处深蓝，让水深变化更自然。"]
        ]
       },
       {
        "id": "otter",
        "label": "探墙的小水獭",
        "focus": "主体与留白",
        "thumb": "assets/vcg-selected/character-otter-thumb.webp",
        "before": "assets/vcg-process/character-otter-initial-ai.png",
        "after": "assets/vcg-selected/character-otter.webp",
        "beforeAlt": "AI 模拟初始图：主体较大且靠上、顶部留白较少的小水獭壁纸",
        "afterAlt": "现有壁纸成品：主体下移并缩小、上方保留大面积青色空间的小水獭壁纸",
        "notes": [
          ["主体比例", "缩小角色占比，保留探头动作与画面呼吸感。"],
          ["顶部留白", "将角色重心下移，为时间与桌面信息预留空间。"],
          ["趣味焦点", "保留眼神、笑容和扶墙动作，让小尺寸下的表情依然清晰。"]
        ]
       }
      ],
      "previewImages": [
        {
          "src": "assets/vcg-selected/light-tea-thumb.webp",
          "label": "圆窗茶影"
        },
        {
          "src": "assets/vcg-selected/material-gold-thumb.webp",
          "label": "暗涌鎏金"
        },
        {
          "src": "assets/vcg-selected/nature-sea-thumb.webp",
          "label": "椰影透蓝"
        },
        {
          "src": "assets/vcg-selected/character-otter-thumb.webp",
          "label": "探墙的小水獭"
        }
      ]
    },
    "items": [
      {
        "src": "assets/vcg-selected/light-tea.webp",
        "thumb": "assets/vcg-selected/light-tea-thumb.webp",
        "label": "圆窗茶影",
        "chapter": "光影留白",
        "caption": "圆窗、竹叶与茶器形成前后层次，以低饱和暖灰保留安静的阅读空间。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/light-morning.webp",
        "thumb": "assets/vcg-selected/light-morning-thumb.webp",
        "label": "晨光慢读",
        "chapter": "光影留白",
        "caption": "纱帘与植物投影落在浅色织物上，以柔和暖光串联书本、藤椅和日常器物。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/light-wetland.webp",
        "thumb": "assets/vcg-selected/light-wetland-thumb.webp",
        "label": "远山静水",
        "chapter": "光影留白",
        "caption": "低位岛屿与层叠远山压低画面重心，大面积雾色天空形成疏朗的空间。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/light-iris.webp",
        "thumb": "assets/vcg-selected/light-iris-thumb.webp",
        "label": "暗夜鸢尾",
        "chapter": "光影留白",
        "caption": "黑色背景中保留紫色花瓣的细微明暗，以集中主体与周围留白形成对照。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/material-gold.webp",
        "thumb": "assets/vcg-selected/material-gold-thumb.webp",
        "label": "暗涌鎏金",
        "chapter": "材质构成",
        "caption": "褶皱状黑灰曲面沿纵向流动，金色颗粒强调转折与光线，呈现材质之间的对比。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/material-lotus.webp",
        "thumb": "assets/vcg-selected/material-lotus-thumb.webp",
        "label": "金箔浮生",
        "chapter": "材质构成",
        "caption": "金色纹理、白色花朵与环状水波相互呼应，以明暗和反射组织视觉中心。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/material-fruit.webp",
        "thumb": "assets/vcg-selected/material-fruit-thumb.webp",
        "label": "青梨气泡",
        "chapter": "材质构成",
        "caption": "青绿色果实、透明冰块与气泡形成明快的材质组合，大小变化带来纵向节奏。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/material-observatory.webp",
        "thumb": "assets/vcg-selected/material-observatory-thumb.webp",
        "label": "掌心观星台",
        "chapter": "材质构成",
        "caption": "将山体、步道与观星建筑收束成微缩场景，以深蓝背景和小尺度细节强化空间感。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/nature-butterfly.webp",
        "thumb": "assets/vcg-selected/nature-butterfly-thumb.webp",
        "label": "蝶影轻游",
        "chapter": "自然想象",
        "caption": "半透明蝶翼与浅紫花瓣构成轻盈的色块，以米白底色和舒展曲线保持画面呼吸感。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/nature-iris.webp",
        "thumb": "assets/vcg-selected/nature-iris-thumb.webp",
        "label": "鸢尾手记",
        "chapter": "自然想象",
        "caption": "以淡紫花瓣、细长叶片和纸面般的浅色背景，呈现植物插画的细节与层次。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/nature-sea.webp",
        "thumb": "assets/vcg-selected/nature-sea-thumb.webp",
        "label": "椰影透蓝",
        "chapter": "自然想象",
        "caption": "椰叶与木栈道围合清透海面，以前景框景、远岸和云层建立纵深。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/nature-whale.webp",
        "thumb": "assets/vcg-selected/nature-whale-thumb.webp",
        "label": "鲸跃云海",
        "chapter": "自然想象",
        "caption": "蓝色鲸鱼穿行于暖色云层之间，以冷暖对比和斜向动势展开轻盈的幻想场景。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/character-reading.webp",
        "thumb": "assets/vcg-selected/character-reading-thumb.webp",
        "label": "月下读书的小猫",
        "chapter": "趣味角色",
        "caption": "猫咪与吊床构成叙事中心，灯光、萤火与远处月色连接近景和夜间环境。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/character-otter.webp",
        "thumb": "assets/vcg-selected/character-otter-thumb.webp",
        "label": "探墙的小水獭",
        "chapter": "趣味角色",
        "caption": "以青绿与浅紫色面划分空间，让探头角色的表情与细密毛发成为视觉重点。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/character-picnic.webp",
        "thumb": "assets/vcg-selected/character-picnic-thumb.webp",
        "label": "秋林里的野餐",
        "chapter": "趣味角色",
        "caption": "以暖黄树林包围小动物角色，用前后景与散落叶片营造轻松的童话氛围。",
        "selected": true
      },
      {
        "src": "assets/vcg-selected/character-sketch.webp",
        "thumb": "assets/vcg-selected/character-sketch-thumb.webp",
        "label": "铅笔小犬",
        "chapter": "趣味角色",
        "caption": "以浅色留白托起小体量角色，毛发线条与针织衣物的纹理呈现素描般的细节。",
        "selected": true
      },
      {
        "src": "assets/vcg-motion/sunlit-peak.webp",
        "thumb": "assets/vcg-motion/sunlit-peak-thumb.webp",
        "label": "雪山云光",
        "chapter": "动态壁纸",
        "caption": "云层沿雪峰移动，暖光逐渐点亮山脊，以稳定构图呈现光色变化。",
        "video": "assets/vcg-motion/sunlit-peak.mp4",
        "wallpaperMotion": true
      },
      {
        "src": "assets/vcg-motion/sunset-shore.webp",
        "thumb": "assets/vcg-motion/sunset-shore-thumb.webp",
        "label": "落日潮汐",
        "chapter": "动态壁纸",
        "caption": "海面与湿润沙滩映出落日，飞鸟和细浪带来舒缓的动态层次。",
        "video": "assets/vcg-motion/sunset-shore.mp4",
        "wallpaperMotion": true
      },
      {
        "src": "assets/vcg-motion/citrus-light.webp",
        "thumb": "assets/vcg-motion/citrus-light-thumb.webp",
        "label": "柠檬清光",
        "chapter": "动态壁纸",
        "caption": "保持饮品主体清晰，借助轻缓推进与细微光感变化呈现清新的夏日氛围。",
        "video": "assets/vcg-motion/citrus-light.mp4",
        "wallpaperMotion": true
      },
      {
        "src": "assets/vcg-motion/forest-bird.webp",
        "thumb": "assets/vcg-motion/forest-bird-thumb.webp",
        "label": "林间轻羽",
        "chapter": "动态壁纸",
        "caption": "枝叶与逆光形成纵深，小鸟转头、低头和整理羽毛带来细节动作。",
        "video": "assets/vcg-motion/forest-bird.mp4",
        "wallpaperMotion": true
      },
      {
        "src": "assets/vcg-motion/playful-shiba.webp",
        "thumb": "assets/vcg-motion/playful-shiba-thumb.webp",
        "label": "探头柴犬",
        "chapter": "动态壁纸",
        "caption": "以简洁色面突出角色，围绕眨眼和头部的轻微变化表现活泼神态。",
        "video": "assets/vcg-motion/playful-shiba.mp4",
        "wallpaperMotion": true
      },
      {
        "src": "assets/vcg-motion/floating-whale.webp",
        "thumb": "assets/vcg-motion/floating-whale-thumb.webp",
        "label": "浮空鲸行",
        "chapter": "动态壁纸",
        "caption": "鲸鱼在悬浮山体与水面之间缓缓游动，以前景植物和远景建筑建立尺度。",
        "video": "assets/vcg-motion/floating-whale.mp4",
        "wallpaperMotion": true
      },
      {
        "src": "assets/vcg-motion/golden-portrait.webp",
        "thumb": "assets/vcg-motion/golden-portrait-thumb.webp",
        "label": "暖黄色的问候",
        "chapter": "动态壁纸",
        "caption": "以暖黄背景和黑色服饰形成对比，通过转头、表情和手部动作展开人物表达。",
        "video": "assets/vcg-motion/golden-portrait.mp4",
        "wallpaperMotion": true
      },
      {
        "src": "assets/vcg-motion/pond-dream.webp",
        "thumb": "assets/vcg-motion/pond-dream-thumb.webp",
        "label": "池畔小憩",
        "chapter": "动态壁纸",
        "caption": "角色在荷塘与灯光之间伸展身体，水面、萤光与夜色共同构成轻松的场景。",
        "video": "assets/vcg-motion/pond-dream.mp4",
        "wallpaperMotion": true
      }
    ],
    "accent": "#a8ddce",
    "color": "#a8ddce",
    "surface": "#111c1d",
    "cover": "assets/vcg-selected/light-tea.webp",
    "preview": "assets/vcg-selected/light-tea-thumb.webp",
    "displayTitle": [
      "视觉中国",
      "壁纸主题选览"
    ],
    "eyebrow": "视觉中国 / vivo 项目组 / AI 视觉设计实习",
    "number": "38",
    "note": "16 张静态精选 / 8 条动态壁纸"
  }
];
const resolveMedia = value => {
  if (typeof value === 'string') return value.startsWith('assets/') ? `${import.meta.env.BASE_URL}${value}` : value;
  if (Array.isArray(value)) return value.map(resolveMedia);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveMedia(item)]));
  return value;
};
export const archiveProjects = resolveMedia(projects);
