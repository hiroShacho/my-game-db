export default function Footer() {
  return (
    <footer className="text-center text-sm text-gray-500 py-4 border-t mt-8">
      <nav>
        <ul>
          <a href="/privacy-policy" className="hover:underline">プライバシーポリシー</a> |
          <a href="/about" className="hover:underline px-2">運営者情報</a> |
          <a href="/contact" className="hover:underline">お問い合わせ</a>
        </ul>
      </nav>
      <small className="block mt-2">&copy; 2025 幻塔攻略データベース</small>
      <p className="text-sm text-gray-600 mt-4">
        If this site helped you, feel free to support me on{' '}
        <a
          href="https://ko-fi.com/hiro_Shacho"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Ko-fi
        </a>
        {' '}💙
      </p>
      <p>
        <a href="https://hiroshacho.fanbox.cc" target="_blank" rel="noopener noreferrer" className="underline ml-1">
          活動支援（FANBOX）
        </a>
      </p>
    </footer>
  );
}