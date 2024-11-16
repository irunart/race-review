#### 基础命令

dev: 开发环境运行
build: 构建生产版本
start: 运行生产版本
lint: 运行代码检查

#### 数据库相关

db:migrate: 部署数据库迁移
db:reset: 重置数据库
db:seed: 填充测试数据
db:studio: 启动 Prisma Studio
db:generate: 生成 Prisma Client

#### 开发工具

type-check: TypeScript 类型检查
test: 运行测试
test:watch: 监视模式运行测试
test:e2e: 运行端到端测试
test:e2e:dev: 开发模式运行端到端测试

#### 部署相关

prepare: 安装 husky hooks
postinstall: 安装后生成 Prisma Client

#### 爬虫相关

scrape: 运行爬虫
scrape:dev: 开发模式运行爬虫

#### 组合命令

setup: 初始化项目
validate: 运行所有验证
dev:full: 同时运行开发服务器和数据库管理工具
