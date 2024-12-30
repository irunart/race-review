import { Achievement } from '@prisma/client';
import { Award, Medal, Trophy, Target, Clock, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface AchievementListProps {
  achievements: (Achievement & {
    metadata: any;
  })[];
}

interface AchievementDisplay {
  icon: any;
  title: string;
  description: string;
  color: string;
  getMetadataDisplay: (metadata: any) => string;
}

const achievementTypes: Record<string, AchievementDisplay> = {
  FIRST_RACE: {
    icon: Target,
    title: '初次参赛',
    description: '完成第一场比赛',
    color: 'blue',
    getMetadataDisplay: (metadata) => `完成 ${metadata.raceName}`,
  },
  SPEED_MILESTONE: {
    icon: Clock,
    title: '配速里程碑',
    description: '达到特定配速目标',
    color: 'green',
    getMetadataDisplay: (metadata) => 
      `${metadata.distance}公里配速 ${metadata.pace}/公里`,
  },
  DISTANCE_MILESTONE: {
    icon: MapPin,
    title: '距离里程碑',
    description: '完成特定距离',
    color: 'purple',
    getMetadataDisplay: (metadata) => 
      `完成${metadata.distance}公里赛事`,
  },
  ELITE_RUNNER: {
    icon: Trophy,
    title: '精英跑者',
    description: '达到精英跑者标准',
    color: 'yellow',
    getMetadataDisplay: (metadata) => 
      `${metadata.raceName} ${metadata.finishTime}`,
  },
  RACE_COUNT: {
    icon: Medal,
    title: '参赛里程碑',
    description: '参加多场赛事',
    color: 'orange',
    getMetadataDisplay: (metadata) => 
      `完成${metadata.count}场赛事`,
  },
  COMMUNITY_CONTRIBUTOR: {
    icon: Users,
    title: '社区贡献者',
    description: '为社区做出贡献',
    color: 'pink',
    getMetadataDisplay: (metadata) => 
      `发表${metadata.reviewCount}篇精华评论`,
  },
};

export function AchievementList({ achievements }: AchievementListProps) {
  const sortedAchievements = [...achievements].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  return (
    <div className="space-y-4">
      {sortedAchievements.map((achievement) => {
        const display = achievementTypes[achievement.type];
        if (!display) return null;

        return (
          <div
            key={achievement.id}
            className="bg-white rounded-lg shadow p-4 flex items-start gap-4"
          >
            <div
              className={`p-2 rounded-full bg-${display.color}-100 text-${display.color}-600`}
            >
              <display.icon className="w-6 h-6" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{display.title}</h3>
                <time className="text-sm text-gray-500">
                  {format(achievement.date, 'yyyy年M月d日', { locale: zhCN })}
                </time>
              </div>
              
              <p className="text-gray-600 text-sm mt-1">
                {display.description}
              </p>
              
              <p className="text-sm font-medium mt-2">
                {display.getMetadataDisplay(achievement.metadata)}
              </p>
            </div>
          </div>
        );
      })}

      {achievements.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          还没有获得任何成就，继续加油！
        </div>
      )}
    </div>
  );
}
