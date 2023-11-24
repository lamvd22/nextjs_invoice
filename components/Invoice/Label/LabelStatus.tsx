type Status = { [key: string]: string }

const LabelStatus = ({status}: { status: string }) => {
  const stt: Status = {
    paid: 'Paid',
    pending: 'Pending',
    draft: 'Draft'
  }
  return (
    <div className={`lb-${status}`}>
      <div>
        <span className={`dot-${status}`}></span>
        {stt[status]}
      </div>
    </div>
  )
}

export default LabelStatus