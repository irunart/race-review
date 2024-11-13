import { RaceCard } from "@/components/shared/RaceCard";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { getLatestRaces, getPopularReviews } from "@/services/race";

export default async function Home() {
  const latestRaces = await getLatestRaces(6);
  const popularReviews = await getPopularReviews(4);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Banner Section */}
      <section className="relative h-[60vh] rounded-2xl overflow-hidden">
        <Image
          src="/banner.jpg"
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">发现精彩赛事</h1>
            <p className="text-xl md:text-2xl">找到适合你的下一场比赛</p>
            <Button size="lg" asChild>
              <Link href="/races">浏览赛事</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Races */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">最新赛事</h2>
          <Link href="/races" className="text-primary-600 hover:underline">
            查看全部
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestRaces.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6">赛事分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CategoryCard
            title="马拉松"
            icon={<MarathonIcon />}
            count={120}
            href="/races?category=marathon"
          />
          <CategoryCard
            title="越野跑"
            icon={<TrailIcon />}
            count={85}
            href="/races?category=trail"
          />
          <CategoryCard
            title="城市跑"
            icon={<CityIcon />}
            count={95}
            href="/races?category=city"
          />
          <CategoryCard
            title="山地赛"
            icon={<MountainIcon />}
            count={60}
            href="/races?category=mountain"
          />
        </div>
      </section>

      {/* Popular Reviews */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">热门评论</h2>
          <Link href="/reviews" className="text-primary-600 hover:underline">
            查看全部
          </Link>
        </div>
        <div className="grid gap-6">
          {popularReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-12">为什么选择我们</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<StarIcon />}
            title="专业评分"
            description="多维度评分系统，帮助你做出更好的参赛决策"
          />
          <FeatureCard
            icon={<ChartIcon />}
            title="数据分析"
            description="历年天气、难度分析，让你更好地了解赛事"
          />
          <FeatureCard
            icon={<CommunityIcon />}
            title="社区互动"
            description="与其他跑者分享经验，获取第一手参赛建议"
          />
        </div>
      </section>
    </div>
  );
}
