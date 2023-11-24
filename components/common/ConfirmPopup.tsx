interface PopupProps {
  status: boolean
  message: string
  action: () => void
  cancel: () => void
}

const ConfirmPopup = ({status, message, action, cancel}: PopupProps) => {

  return (
    <>
      <div
        className={`flex absolute left-0 h-screen w-screen items-center justify-center z-20 bg-white
          bg-opacity-70 dark:bg-black dark:bg-opacity-70 ${status ? '' : 'duration-200 invisible'}`}>
        <div className={`w-[380px] h-[210px] bg-[#888EB0] dark:bg-[#1f213a] rounded-xl transition-opacity duration-200
              ${status ? 'ease-in opacity-100' : 'ease-out opacity-0'}`}>
          <div className="px-10">
            <div className="h-[140px] pt-[30px]">
              <h2 className="leading-10">Confirm Deletion</h2>
              <p className="leading-5">{message}</p>
            </div>
            <div className="h-[70px] pb-[30px]">
              <div className="flex justify-end">
                <button className="btn-light mr-2"
                        onClick={cancel}
                >
                  Cancel
                </button>
                <button className="btn-danger"
                        onClick={action}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmPopup