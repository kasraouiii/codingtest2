import Head from 'next/head';
import DateCalculator from './components/DateCalculator';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Date Calculator</title>
        <meta name="description" content="Date calculator app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold mb-4">Date Calculator</h1>
        <DateCalculator />
      </main>

      <footer className="mt-8">
        <p>Footer content here</p>
      </footer>
    </div>
  );
}
