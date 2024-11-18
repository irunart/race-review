import { Race } from '@prisma/client';
import { Shoe, Watch, Wind, Sun, Droplets } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';

interface RaceRecommendationsProps {
  race: Race;
  weatherData?: {
    temperature: number;
    humidity: number;
    conditions: string;
  };
}

interface Equipment {
  type: string;
  icon: any;
  name: string;
  description: string;
  features: string[];
  alternatives?: string[];
}

interface TrainingPlan {
  phase: string;
  duration: string;
  workouts: {
    type: string;
    description: string;
    intensity: string;
  }[];
  tips: string[];
}

export function RaceRecommendations({ race, weatherData }: RaceRecommendationsProps) {
  const getRecommendedEquipment = (): Equipment[] => {
    const equipment: Equipment[] = [];

    // 根据赛道类型和难度推荐跑鞋
    if (race.terrain === 'TRAIL') {
      equipment.push({
        type: 'shoes',
        icon: Shoe,
        name: '越野跑鞋',
        description: '适合越野地形的专业跑鞋',
        features: [
          '防滑耐磨大底',
          '岩板保护',
          '防水透气鞋面',
        ],
        alternatives: [
          'Hoka Speedgoat',
          'Salomon Ultra Glide',
          'Nike Terra Kiger',
        ],
      });
    } else {
      equipment.push({
        type: 'shoes',
        icon: Shoe,
        name: '公路跑鞋',
        description: '适合公路赛道的轻量跑鞋',
        features: [
          '缓震性能出色',
          '轻量化设计',
          '透气舒适',
        ],
        alternatives: [
          'Nike Vaporfly',
          'Hoka Bondi',
          'Saucony Endorphin',
        ],
      });
    }

    // 根据赛事距离推荐装备
    if (race.distance > 21) {
      equipment.push({
        type: 'watch',
        icon: Watch,
        name: '运动手表',
        description: '长距离配速管理必备',
        features: [
          'GPS定位',
          '心率监测',
          '电池续航长',
        ],
        alternatives: [
          'Garmin Forerunner',
          'Coros Apex',
          'Polar Vantage',
        ],
      });
    }

    // 根据天气情况推荐装备
    if (weatherData) {
      if (weatherData.temperature > 25) {
        equipment.push({
          type: 'cooling',
          icon: Sun,
          name: '防暑装备',
          description: '高温天气防护必备',
          features: [
            '防晒帽',
            '速干衣物',
            '防晒霜',
          ],
        });
      }

      if (weatherData.humidity > 80) {
        equipment.push({
          type: 'moisture',
          icon: Droplets,
          name: '防潮装备',
          description: '潮湿天气防护必备',
          features: [
            '防水袜子',
            '防磨贴',
            '快干毛巾',
          ],
        });
      }
    }

    return equipment;
  };

  const getTrainingPlan = (): TrainingPlan[] => {
    const isLongDistance = race.distance > 21;
    const isTrail = race.terrain === 'TRAIL';
    
    return [
      {
        phase: '基础期 (8-12周)',
        duration: '4周',
        workouts: [
          {
            type: '长距离跑',
            description: `每周一次，距离逐渐增加到赛程的${isLongDistance ? '50%' : '70%'}`,
            intensity: '中等强度',
          },
          {
            type: '间歇训练',
            description: '每周1-2次，400m-800m交替跑',
            intensity: '高强度',
          },
          {
            type: '恢复跑',
            description: '每周2-3次，30-45分钟',
            intensity: '低强度',
          },
        ],
        tips: [
          '循序渐进增加训练量',
          '注意核心力量训练',
          '保持充足休息',
        ],
      },
      {
        phase: '强化期 (4-8周)',
        duration: '4周',
        workouts: [
          {
            type: '配速跑',
            description: '每周一次，以目标配速进行',
            intensity: '中高强度',
          },
          {
            type: '节奏跑',
            description: '每周一次，5-10公里',
            intensity: '高强度',
          },
          {
            type: '专项训练',
            description: isTrail ? '越野地形适应' : '配速控制练习',
            intensity: '中等强度',
          },
        ],
        tips: [
          '模拟赛道环境训练',
          '注意补给策略练习',
          '调整装备适应性',
        ],
      },
      {
        phase: '赛前调整 (1-2周)',
        duration: '2周',
        workouts: [
          {
            type: '减量跑',
            description: '距离和强度逐渐降低',
            intensity: '低强度',
          },
          {
            type: '技术磨合',
            description: '装备和配速最后调整',
            intensity: '中等强度',
          },
        ],
        tips: [
          '保证充足睡眠',
          '合理饮食补充',
          '避免尝试新装备',
        ],
      },
    ];
  };

  const equipment = getRecommendedEquipment();
  const trainingPlan = getTrainingPlan();

  return (
    <Tabs defaultValue="equipment" className="w-full">
      <Tabs.List>
        <Tabs.Trigger value="equipment">装备建议</Tabs.Trigger>
        <Tabs.Trigger value="training">训练计划</Tabs.Trigger>
      </Tabs.List>
      
      <Tabs.Content value="equipment" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipment.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-50">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  
                  <ul className="mt-3 space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {item.alternatives && (
                    <div className="mt-3">
                      <p className="text-sm font-medium">推荐产品：</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.alternatives.map((alt, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded-full bg-gray-100"
                          >
                            {alt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Tabs.Content>

      <Tabs.Content value="training" className="mt-4">
        <div className="space-y-6">
          {trainingPlan.map((phase, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">{phase.phase}</h3>
                <span className="text-sm text-gray-500">持续{phase.duration}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">训练内容</h4>
                  <div className="space-y-3">
                    {phase.workouts.map((workout, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{workout.type}</span>
                          <span className="text-sm text-gray-500">
                            {workout.intensity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {workout.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">注意事项</h4>
                  <ul className="space-y-2">
                    {phase.tips.map((tip, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Tabs.Content>
    </Tabs>
  );
}
