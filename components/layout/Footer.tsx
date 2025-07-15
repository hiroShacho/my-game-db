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
    </footer>
  );
}