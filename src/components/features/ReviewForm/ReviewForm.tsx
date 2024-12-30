import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Rating } from '@/components/ui/rating';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ReviewFormProps {
  raceId: string;
  onSubmit: (data: ReviewFormData) => Promise<void>;
}

export interface ReviewFormData {
  trackDifficulty: number;
  supplies: number;
  organization: number;
  transportation: number;
  valueForMoney: number;
  scenery: number;
  volunteerService: number;
  content: string;
  tags: string[];
}

export function ReviewForm({ raceId, onSubmit }: ReviewFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ReviewFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ratingDimensions = [
    { name: 'trackDifficulty', label: '赛道难度' },
    { name: 'supplies', label: '补给情况' },
    { name: 'organization', label: '组织水平' },
    { name: 'transportation', label: '交通便利度' },
    { name: 'valueForMoney', label: '性价比' },
    { name: 'scenery', label: '风景指数' },
    { name: 'volunteerService', label: '志愿者服务' },
  ];

  const handleFormSubmit = async (data: ReviewFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {ratingDimensions.map((dimension) => (
        <div key={dimension.name} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {dimension.label}
          </label>
          <Rating
            {...register(dimension.name as keyof ReviewFormData, { required: true })}
            size="lg"
          />
          {errors[dimension.name as keyof ReviewFormData] && (
            <p className="text-red-500 text-sm">请为{dimension.label}评分</p>
          )}
        </div>
      ))}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          详细评价
        </label>
        <Textarea
          {...register('content', { required: true, minLength: 50 })}
          placeholder="请分享您的参赛体验，包括赛事亮点和建议..."
          rows={6}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">
            请至少输入50个字的评价内容
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? '提交中...' : '提交评价'}
      </Button>
    </form>
  );
}
