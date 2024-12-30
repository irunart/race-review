"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export default function ProfileForm({ user }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          currentPassword: formData.get("currentPassword"),
          newPassword: formData.get("newPassword"),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "更新失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          用户名
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={user.name || ""}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          邮箱
        </label>
        <input
          type="email"
          id="email"
          defaultValue={user.email || ""}
          disabled
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">修改密码</h3>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              当前密码
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              新密码
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {isLoading ? "保存中..." : "保存修改"}
        </button>
      </div>
    </form>
  );
}
