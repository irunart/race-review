import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { User } from '@prisma/client';
import { Shield, Award, Trophy, Medal } from 'lucide-react';

interface UserBadgeProps {
  user: User & {
    _count?: {
      reviews: number;
      races: number;
    };
    achievements?: {
      type: string;
      date: Date;
    }[];
  };
}

export function UserBadge({ user }: UserBadgeProps) {
  const getBadges = () => {
    const badges = [];

    // 认证跑者徽章
    if (user.isVerifiedRunner) {
      badges.push({
        icon: Shield,
        label: '认证跑者',
        color: 'blue',
        tooltip: '已通过身份验证的跑者',
      });
    }

    // 资深评论者徽章
    if (user._count?.reviews && user._count.reviews >= 10) {
      badges.push({
        icon: Award,
        label: '资深评论者',
        color: 'green',
        tooltip: `已发表 ${user._count.reviews} 条评论`,
      });
    }

    // 多次参赛者徽章
    if (user._count?.races && user._count.races >= 5) {
      badges.push({
        icon: Trophy,
        label: '多次参赛者',
        color: 'purple',
        tooltip: `已参加 ${user._count.races} 场赛事`,
      });
    }

    // 精英跑者徽章
    const eliteAchievement = user.achievements?.find(a => a.type === 'ELITE_RUNNER');
    if (eliteAchievement) {
      badges.push({
        icon: Medal,
        label: '精英跑者',
        color: 'yellow',
        tooltip: '完赛成绩达到精英标准',
      });
    }

    return badges;
  };

  const badges = getBadges();

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge, index) => (
        <Tooltip key={index} content={badge.tooltip}>
          <Badge
            variant="outline"
            className={`flex items-center gap-1 bg-${badge.color}-50 text-${badge.color}-700 border-${badge.color}-200`}
          >
            <badge.icon className="w-3 h-3" />
            <span>{badge.label}</span>
          </Badge>
        </Tooltip>
      ))}
    </div>
  );
}
