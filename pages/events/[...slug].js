import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import ResultsTitle from "../../components/events/results-title";
import EventList from "../../components/events/event-list";

function FilteredEventsPage() {
  const router = useRouter ();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // Transform year and month to a number by using a +, because in the url array it is a string
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // Check if it is not a number, for example when someone types in a word in the url manually
  // also the range of year and month
  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
    return <p>Invalid filter, please adjust your values and try again.</p>
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth
  })

  // Check if filteredEvents is is somehow falsy or the array is empty
  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>
  }

  const date = new Date(numYear, numMonth - 1);

  return (
  <>
    <ResultsTitle date={date} />
    <EventList items={filteredEvents} />
  </>
  )
}
export default FilteredEventsPage;
