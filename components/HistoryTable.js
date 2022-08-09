const DeleteButton = ({ onClick }) => {
  return (
    <button className="mx-5 my-5 outline-none" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
};

const HistoryTable = ({ records, deleteRecord }) => {
  const Header = ({ title }) => {
    return (
      <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
        {title}
      </th>
    );
  };

  const Row = ({ entry }) => {
    const Cell = ({ value }) => {
      return (
        <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8] text-gray-600">
          {value}
        </td>
      );
    };

    return (
      <tr>
        <Cell value={entry.number} />
        <Cell value={entry.result} />
        <Cell value={entry.time} />
        <DeleteButton onClick={() => deleteRecord(entry.id)} />
      </tr>
    );
  };

  return (
    <section className="py-7 ml-20">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="max-w-full overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-blue-500 text-center">
                    <Header title="Number" />
                    <Header title="Result" />
                    <Header title="Time (ms)" />
                  </tr>
                </thead>
                <tbody>
                  {records.map((entry, index) => {
                    return <Row key={index} entry={entry} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTable;
