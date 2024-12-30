interface Props {
  initialRatings?: {
    elevation: number;
    road: number;
    technical: number;
  };
  onChange?: (ratings: {
    elevation: number;
    road: number;
    technical: number;
  }) => void;
  readonly?: boolean;
}

export function RaceDifficultyRating({
  initialRatings,
  onChange,
  readonly = true,
}: Props) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">赛道难度评估</h3>

      <div className="space-y-4">
        <RatingItem
          label="高程变化"
          value={initialRatings?.elevation ?? 4.5}
          description="起伏较大,有较多爬升"
          icon={<ElevationIcon />}
          onChange={
            readonly
              ? undefined
              : (value) => onChange?.({ ...initialRatings, elevation: value })
          }
        />

        <RatingItem
          label="路况"
          value={initialRatings?.road ?? 3.8}
          description="以柏油路面为主,部分碎石路段"
          icon={<RoadIcon />}
          onChange={
            readonly
              ? undefined
              : (value) => onChange?.({ ...initialRatings, road: value })
          }
        />

        <RatingItem
          label="技术难度"
          value={initialRatings?.technical ?? 4.2}
          description="需要一定越野跑经验"
          icon={<TechnicalIcon />}
          onChange={
            readonly
              ? undefined
              : (value) => onChange?.({ ...initialRatings, technical: value })
          }
        />

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">适合人群</h4>
          <div className="flex flex-wrap gap-2">
            <Badge>有越野跑经验</Badge>
            <Badge>体能良好</Badge>
            <Badge>有爬升训练</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
