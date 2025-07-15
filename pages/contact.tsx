import Head from "next/head";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function Contact() {
  return (
    <>
      <Head>
        <title>お問い合わせ | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔攻略データベースへのお問い合わせはこちら。" />
      </Head>
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">お問い合わせ</h1>
        <p className="mb-4">
          当サイトに関するご意見・ご感想・削除依頼等は、下記のフォームよりご連絡ください。
        </p>
        <p className="mb-6">
          ▶ お問い合わせフォーム：
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScb84YXDnMTlmrwbTdWqlPG-_tFMzvUFWmCk0n_BtYILTXRPw/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline ml-1"
          >
            Googleフォームはこちら
          </a>
        </p>
        <p>
          ※内容によっては返信できない場合がございます。予めご了承ください。
        </p>
      </main>
    </>
  );
}

Contact.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};