export default function InputNumberWithButton({ onClick, onChange, value }) {
  return (
    <form className="flex" onSubmit={(e) => e.preventDefault()}>
      <input
        type="number"
        className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-lg transition ease-in-out m-0 focus:text-gray-600 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Type an integer"
        onChange={onChange}
        value={value}
      />
      <button
        className="px-8 rounded-r-lg bg-blue-400  text-gray-600 font-semibold p-4 uppercase border-blue-500 border-t border-b border-r"
        onClick={onClick}
      >
        Send
      </button>
    </form>
  );
}
