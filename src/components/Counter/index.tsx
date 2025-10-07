import { useCount } from "../../contexts/countContext/index.context";

const Counter = () => {
  const { count, increment, decrement, reset } = useCount();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-96">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Counter App</h1>
          <p className="text-gray-600">Simple counter with Tailwind CSS</p>
        </div>

        {/* Count Display */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-4xl font-bold">{count}</span>
          </div>
          <p className="text-gray-600 text-sm">Current Count</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              onClick={decrement}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
            >
              -
            </button>
            <button
              onClick={increment}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
            >
              +
            </button>
          </div>

          <button
            onClick={reset}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
          >
            Reset
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 text-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-blue-600 font-semibold text-sm">Status</div>
              <div className="text-gray-800 font-bold">
                {count > 0 ? "Positive" : count < 0 ? "Negative" : "Zero"}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-purple-600 font-semibold text-sm">Value</div>
              <div className="text-gray-800 font-bold">{Math.abs(count)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
