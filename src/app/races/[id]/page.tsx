export default function RaceDetail({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      {/* 赛事基本信息 */}
      <section className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
        <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
          <Image
            fill
            src="/race-banner.jpg"
            alt="Race banner"
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">2024北京马拉松</h1>

          <div className="flex flex-wrap gap-4">
            <Badge>难度: 4.5/5</Badge>
            <Badge>补给: 4.8/5</Badge>
            <Badge>组织: 4.7/5</Badge>
            <Badge>交通: 4.6/5</Badge>
            <Badge>性价比: 4.2/5</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InfoCard
              icon={<CalendarIcon />}
              label="比赛时间"
              value="2024-04-15"
            />
            <InfoCard
              icon={<LocationIcon />}
              label="比赛地点"
              value="北京奥林匹克公园"
            />
            <InfoCard icon={<RunnerIcon />} label="参赛人数" value="30000人" />
            <InfoCard icon={<PriceIcon />} label="报名费用" value="￥200起" />
          </div>
        </div>
      </section>

      {/* 天气信息 */}
      <WeatherHistory raceId={params.id} />

      {/* 装备建议 */}
      <EquipmentSuggestions raceId={params.id} />

      {/* 评论列表 */}
      <ReviewList raceId={params.id} />
    </div>
  );
}
