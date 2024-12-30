import { Review } from '@prisma/client';
import { StarRating } from '@/components/ui/StarRating';

interface DetailedRatingsProps {
  reviews: Review[];
}

interface AverageRatings {
  trackDifficulty: number;
  supplies: number;
  organization: number;
  transportation: number;
  valueForMoney: number;
  scenery: number;
  volunteerService: number;
}

export function DetailedRatings({ reviews }: DetailedRatingsProps) {
  const calculateAverageRatings = (): AverageRatings => {
    if (!reviews.length) {
      return {
        trackDifficulty: 0,
        supplies: 0,
        organization: 0,
        transportation: 0,
        valueForMoney: 0,
        scenery: 0,
        volunteerService: 0,
      };
    }

    const sum = reviews.reduce(
      (acc, review) => {
        const ratings = review.detailedRatings as any;
        return {
          trackDifficulty: acc.trackDifficulty + ratings.trackDifficulty,
          supplies: acc.supplies + ratings.supplies,
          organization: acc.organization + ratings.organization,
          transportation: acc.transportation + ratings.transportation,
          valueForMoney: acc.valueForMoney + ratings.valueForMoney,
          scenery: acc.scenery + ratings.scenery,
          volunteerService: acc.volunteerService + ratings.volunteerService,
        };
      },
      {
        trackDifficulty: 0,
        supplies: 0,
        organization: 0,
        transportation: 0,
        valueForMoney: 0,
        scenery: 0,
        volunteerService: 0,
      }
    );

    return Object.entries(sum).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: Number((value / reviews.length).toFixed(1)),
      }),
      {} as AverageRatings
    );
  };

  const averageRatings = calculateAverageRatings();
  const ratingDimensions = [
    { key: 'trackDifficulty', label: '赛道难度' },
    { key: 'supplies', label: '补给情况' },
    { key: 'organization', label: '组织水平' },
    { key: 'transportation', label: '交通便利度' },
    { key: 'valueForMoney', label: '性价比' },
    { key: 'scenery', label: '风景指数' },
    { key: 'volunteerService', label: '志愿者服务' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">详细评分</h3>
      <div className="space-y-4">
        {ratingDimensions.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-gray-600">{label}</span>
            <div className="flex items-center gap-2">
              <StarRating
                value={averageRatings[key as keyof AverageRatings]}
                readOnly
                size="sm"
              />
              <span className="text-lg font-medium">
                {averageRatings[key as keyof AverageRatings]}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="text-sm text-gray-500 text-center">
          基于 {reviews.length} 条评价
        </div>
      </div>
    </div>
  );
}
