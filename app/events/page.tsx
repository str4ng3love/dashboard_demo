import { prisma } from "@/lib/ConnectPrisma";

import EventsBrowser from "../components/dynamic/Events/EventsBrowser";
import Button from "../components/dynamic/Button";
import { Prisma } from "@prisma/client";

const getEventsAndAmount = async () => {
  const query: Prisma.EventFindManyArgs = {
    where: { images: { isEmpty: false } }, take: 10
  }
  const [events, count] = await prisma.$transaction([
    prisma.event.findMany(query), prisma.event.count({ where: query.where })
  ])
  return {
    events, count
  }
}

const page = async () => {

  const { events, count } = await getEventsAndAmount();
  if (events.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-xl mb-12">There are no Events in the DB</h1>
        <Button title="go to home" text="go to Home" link="/" />
      </div>
    );
  } else {
    return (
      <>

        {/* TODO: Event browser with sorting, pagination etc */}
        <EventsBrowser events={events} count={count} />
      </>
    );
  }
};

export default page;
