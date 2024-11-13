export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-white border-t", className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="font-bold">RaceReview</span>
            </Link>
            <p className="text-sm text-gray-600">发现精彩赛事，分享跑步体验</p>
            <div className="flex space-x-4">
              <SocialIcon href="#" icon={TwitterIcon} />
              <SocialIcon href="#" icon={WechatIcon} />
              <SocialIcon href="#" icon={WeiboIcon} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">赛事</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/races">浏览赛事</Link>
              </li>
              <li>
                <Link href="/races/create">发布赛事</Link>
              </li>
              <li>
                <Link href="/calendar">赛事日历</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">社区</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/reviews">最新评论</Link>
              </li>
              <li>
                <Link href="/community">跑团</Link>
              </li>
              <li>
                <Link href="/events">线下活动</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">关于</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">关于我们</Link>
              </li>
              <li>
                <Link href="/contact">联系我们</Link>
              </li>
              <li>
                <Link href="/privacy">隐私政策</Link>
              </li>
              <li>
                <Link href="/terms">用户协议</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} RaceReview. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
