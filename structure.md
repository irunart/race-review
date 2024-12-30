race-review-platform/
├── .env # 环境变量配置 已完成✔
├── .gitignore 已完成✔
├── package.json 已完成✔
├── next.config.js # Next.js 配置文件 已完成✔
├── tsconfig.json # TypeScript 配置 已完成✔
├── middleware.ts # Next.js 中间件(用于认证等) 已完成✔
│
├── public/ # 静态资源 , 无需生成
│ ├── images/
│ ├── icons/
│ └── fonts/
│
├── src/
│ ├── app/ # App Router 路由目录
│ │ ├── layout.tsx # 根布局, 已完成✔
│ │ ├── page.tsx # 首页, 已完成✔
│ │ ├── error.tsx # 错误处理, 已完成✔
│ │ ├── loading.tsx # 加载状态, 已完成✔
│ │ │
│ │ ├── auth/ # 认证相关页面
│ │ │ ├── signin/ , 已完成✔
│ │ │ └── signup/
│ │ │
│ │ ├── races/ # 赛事相关页面
│ │ │ ├── [id]/ # 赛事详情
│ │ │ ├── create/ # 创建赛事
│ │ │ └── search/ # 赛事搜索
│ │ │
│ │ ├── reviews/ # 评论相关页面
│ │ │ ├── [id]/ # 评论详情
│ │ │ └── create/ # 创建评论
│ │ │
│ │ └── community/ # 社区相关页面
│ │ ├── events/ # 线下活动
│ │ └── groups/ # 用户小组
│ │
│ ├── components/ # 可复用组件
│ │ ├── ui/ # 基础 UI 组件
│ │ │ ├── Button/
│ │ │ ├── Card/
│ │ │ ├── Input/
│ │ │ └── Modal/
│ │ │
│ │ ├── layout/ # 布局组件
│ │ │ ├── Header/
│ │ │ ├── Footer/
│ │ │ ├── Sidebar/
│ │ │ └── Navigation/
│ │ │
│ │ ├── features/ # 功能组件
│ │ │ ├── RaceDifficultyRating/ # 赛道难度评分
│ │ │ ├── WeatherHistory/ # 往年天气
│ │ │ ├── EquipmentSuggestion/ # 装备建议
│ │ │ └── TrainingPlan/ # 训练建议
│ │ │
│ │ └── shared/ # 共享组件
│ │ ├── ReviewCard/
│ │ ├── RaceCard/
│ │ └── UserBadge/
│ │
│ ├── hooks/ # 自定义 Hook
│ │ ├── useAuth.ts
│ │ ├── useReview.ts
│ │ └── useRace.ts
│ │
│ ├── lib/ # 工具函数和配置
│ │ ├── api/ # API 相关
│ │ │ ├── client.ts
│ │ │ └── endpoints.ts
│ │ ├── db/ # 数据库配置
│ │ │ └── prisma.ts
│ │ └── utils/ # 工具函数
│ │ ├── validation.ts
│ │ └── formatters.ts
│ │
│ ├── models/ # 数据模型和类型定义
│ │ ├── race.ts
│ │ ├── review.ts
│ │ └── user.ts
│ │
│ ├── services/ # 业务逻辑服务
│ │ ├── auth/
│ │ ├── race/
│ │ ├── review/
│ │ └── user/
│ │
│ └── styles/ # 样式文件
│ ├── globals.css
│ └── themes/
│
├── prisma/ # Prisma ORM
│ ├── schema.prisma # 数据库模型定义 已完成✔
│ └── migrations/ # 数据库迁移文件
│
└── tests/ # 测试文件
├── unit/
├── integration/
└── e2e/

### project 说明

通过next 框架搭建一个赛事评论网站, 该产品功能点差异化发展方向：

评价维度细化： 赛道难度 补给情况 组织水平 交通便利度 性价比 风景指数 志愿者服务
特色功能： 赛事难度分级系统 适合人群标签（新手友好、精英挑战等） 往年天气数据整合 装备建议 训练建议 住宿交通信息整合  
社区运营方向： 鼓励精华评价 设置评价者标签（认证跑者、多次参赛者等） 举办线下活动加强社区粘性 与赛事方合作推出独家优惠

这个赛事评价平台的机会点在于： 填补市场空缺 满足跑者真实需求 有利于赛事提升质量 帮助新手做出更好的参赛决策

### TODO
1. Add more weather metrics?
2. Implement weather-based race difficulty adjustments?
4. Add weather alerts for extreme conditions?
5. Add more weather metrics or analysis features?
7. Create weather trend visualizations?
