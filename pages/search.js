import {format} from 'date-fns';
import {useRouter} from 'next/router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';

function Search({searchResult}) {
  const router = useRouter();
  const {location, startDate, endDate, numberOfGest} = router.query;
  console.log(searchResult);
  const formatStartDate = format(new Date(startDate), 'dd MMM yy');
  const formatendDate = format(new Date(endDate), 'dd MMM yy');
  const range = `${formatStartDate} - ${formatendDate}`;

  return (
    <div className="">
      <Header placeholder={`${location} | ${range} | ${numberOfGest}`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-sm">
            300+ Stays {range} For {numberOfGest} Guest
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Celcelacion Furnability</p>
            <p className="button">Type Of Place</p>
            <p className="button">Price</p>
            <p className="button">Price</p>
          </div>
          <div className="flex flex-col">
            {searchResult.map(
              ({
                img,
                location,
                title,
                price,
                description,
                star,
                total,
                long,
                lat,
              }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  price={price}
                  description={description}
                  star={star}
                  total={total}
                  long={long}
                  lat={lat}
                />
              ),
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResult = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json(),
  );

  return {
    props: {
      searchResult,
    },
  };
}
