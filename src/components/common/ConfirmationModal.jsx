import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-gray-600 bg-gray-800 p-6">
        <p className="text-2xl font-semibold text-white">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-gray-300">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <IconBtn
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            onClick={modalData?.btn2Handler}
            className="rounded-md bg-gray-300 px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200 transition-all"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}
