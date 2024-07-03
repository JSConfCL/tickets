import { TicketApprovalStatus } from "~/api/gql/graphql";
import { useMyTicketsSuspenseQuery } from "~/components/MyTickets/graphql/myTickets.generated";

export const MyTicketsList = () => {
  const tickets = useMyTicketsSuspenseQuery({
    variables: {
      input: {
        pagination: {
          page: 0,
          pageSize: 10,
        },
        search: {
          approvalStatus: TicketApprovalStatus.Approved,
        },
      },
    },
  });

  const myTickets = tickets.data.myTickets?.data?.map((ticket) => ticket);

  return (
    <div>
      {myTickets.map((ticket) => (
        <div key={ticket.id}>{ticket.id}</div>
      ))}
    </div>
  );
};
