// import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAsync } from "react-use";
import { gql, request } from "graphql-request";
import { AccountStatementQuery } from "../gql/graphql";

const Query = gql`
  query AccountStatement {
    me {
      id
      firstName
      lastName
    }
    accountStatement {
      payments {
        id
        type
        method
        time
        amount
        status
      }
      wagers {
        id
        time
        amount
        betId
        betType
        eventTime
        resolveTime
        result
        name
        choice
        state
      }
    }
  }
`;

// TODO: ServerSide
// type Props = {
//   data: AccountStatementQuery;
// };
//
// export const getServerSideProps: GetServerSideProps<Props> = async (
//   context
// ) => {
//   const header = context.req.headers.authorization;

//   const param = context.query.token;

//   if (!header && !param) {
//     throw new Error("401");
//   }

//   const auth = header || `Bearer ${param}`;

//   const data = await request<AccountStatementQuery>(
//     process.env.API_URL!,
//     query,
//     {},
//     new Headers({ authorization: auth })
//   );

//   return { props: { data } };
// };

export default function Home() {
  const router = useRouter();
  const { token } = router.query;

  const query = useAsync(async () => {
    if (!token) {
      return null;
    }
    const auth = `Bearer ${token}`;
    const data = await request<AccountStatementQuery>(
      process.env.NEXT_PUBLIC_API_URL!,
      Query,
      {},
      new Headers({ authorization: auth })
    );

    return data;
  }, [token]);

  if (!token) {
    return <div>No token provided</div>;
  }

  if (query.loading) {
    return (
      <div className="flex justify-center items-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (query.error) {
    return <div>{query.error.message}</div>;
  }

  if (!query.value) {
    return <div>No token provided</div>;
  }

  const data = query.value;

  return (
    <div>
      <Head>
        <title>BetYou PDF</title>
        <meta name="description" content="Generate Your BetYou Statement" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-8 px-4">
        <div className="space-y-4">
          <div className="text-xl font-bold">
            BetYou Account Statement for {data.me?.firstName}{" "}
            {data.me?.lastName}
          </div>
          <div>
            <div className="text-lg font-semibold">Wagering History</div>
            {data.accountStatement.wagers.length ? (
              <table className="mt-2 min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Bet ID
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Name
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Type
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Choice
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Result
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Amount
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Bet Submitted
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Game Time
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Resolved Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.accountStatement.wagers.map((wager) => (
                    <tr key={wager.id} className="border-b">
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {wager.betId}
                      </td>

                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {wager.name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {wager.betType}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {wager.choice}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {wager.result || "-"}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {wager.amount}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {wager.time}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {wager.eventTime}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {wager.resolveTime || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No wagers available</div>
            )}
          </div>
          <div>
            <div className="text-lg font-semibold">Payments History</div>
            {data.accountStatement.payments.length ? (
              <table className="mt-2 min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Payment ID
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Type
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Method
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Status
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Amount
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.accountStatement.payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {payment.id}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {payment.type}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {payment.method}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {payment.status}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {payment.amount}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-2 py-4">
                        {payment.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No payments available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
