import { cn } from '@/lib/utils';

interface RaceDifficultyGradeProps {
  elevation: number; // 海拔高度变化(米)
  distance: number; // 距离(公里)
  terrain: 'ROAD' | 'TRAIL' | 'MIXED'; // 地形类型
  technicalLevel: number; // 技术难度 (1-5)
  className?: string;
}

interface DifficultyLevel {
  grade: 'E' | 'D' | 'C' | 'B' | 'A' | 'A+';
  label: string;
  description: string;
  color: string;
  suitableFor: string;
}

export function RaceDifficultyGrade({
  elevation,
  distance,
  terrain,
  technicalLevel,
  className,
}: RaceDifficultyGradeProps) {
  const calculateDifficultyGrade = (): DifficultyLevel => {
    // 计算难度系数
    const elevationFactor = elevation / distance; // 每公里平均爬升
    const distanceFactor = distance / 42.195; // 相对于马拉松的距离系数
    const terrainFactor = terrain === 'ROAD' ? 1 : terrain === 'TRAIL' ? 1.5 : 1.3;
    
    // 综合难度分数 (0-100)
    const difficultyScore = 
      (elevationFactor / 50) * 30 + // 爬升因子 (最高30分)
      (distanceFactor) * 25 + // 距离因子 (最高25分)
      (terrainFactor) * 20 + // 地形因子 (最高20分)
      (technicalLevel / 5) * 25; // 技术难度因子 (最高25分)

    // 难度等级划分
    const levels: DifficultyLevel[] = [
      {
        grade: 'E',
        label: '入门级',
        description: '适合初次参赛的跑者',
        color: 'green',
        suitableFor: '跑步新手，首次参赛者',
      },
      {
        grade: 'D',
        label: '基础级',
        description: '需要一定跑步基础',
        color: 'blue',
        suitableFor: '有跑步基础的业余跑者',
      },
      {
        grade: 'C',
        label: '进阶级',
        description: '建议有半程马拉松完赛经验',
        color: 'yellow',
        suitableFor: '有比赛经验的跑者',
      },
      {
        grade: 'B',
        label: '挑战级',
        description: '需要充分的训练和比赛经验',
        color: 'orange',
        suitableFor: '经验丰富的跑者',
      },
      {
        grade: 'A',
        label: '精英级',
        description: '极具挑战性的赛事',
        color: 'red',
        suitableFor: '精英跑者',
      },
      {
        grade: 'A+',
        label: '专业级',
        description: '顶级难度赛事',
        color: 'purple',
        suitableFor: '专业运动员',
      },
    ];

    // 根据分数返回对应等级
    if (difficultyScore < 20) return levels[0];
    if (difficultyScore < 40) return levels[1];
    if (difficultyScore < 60) return levels[2];
    if (difficultyScore < 75) return levels[3];
    if (difficultyScore < 90) return levels[4];
    return levels[5];
  };

  const difficulty = calculateDifficultyGrade();

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-4">
        <div className={cn(
          'text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center',
          `bg-${difficulty.color}-100 text-${difficulty.color}-700`
        )}>
          {difficulty.grade}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{difficulty.label}</h3>
          <p className="text-gray-600 text-sm">{difficulty.description}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">适合人群</h4>
        <p className="text-gray-600">{difficulty.suitableFor}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">平均爬升：</span>
          <span className="font-medium">{Math.round(elevation/distance)} 米/公里</span>
        </div>
        <div>
          <span className="text-gray-600">总距离：</span>
          <span className="font-medium">{distance} 公里</span>
        </div>
        <div>
          <span className="text-gray-600">地形：</span>
          <span className="font-medium">
            {terrain === 'ROAD' ? '公路' : terrain === 'TRAIL' ? '越野' : '混合'}
          </span>
        </div>
        <div>
          <span className="text-gray-600">技术难度：</span>
          <span className="font-medium">{technicalLevel}/5</span>
        </div>
      </div>
    </div>
  );
}
