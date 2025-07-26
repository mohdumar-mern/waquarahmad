const Table = ({ columns = [], data = [] }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-sm">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-4 py-3">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? data.map((row, rowIndex) => (
            <tr key={row._id || rowIndex} className="hover:bg-gray-50 border-b">
              {columns.map(col => (
                <td key={col.key} className="px-4 py-2">
                  {typeof col.render === 'function' ? col.render(row, rowIndex) : row[col.key]}
                </td>
              ))}
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
