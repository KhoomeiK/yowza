import HeadNext from 'next/head';

export default function Head () {
  return (
    <div>
      <HeadNext>
        <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />
        <meta charSet='utf-8' />
        <title>Yowza!</title>
      </HeadNext>
      <style jsx global>{`
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      }
    `}</style>
    </div>
  );
}
