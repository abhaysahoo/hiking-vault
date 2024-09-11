

const ProcessingToast = () => {
  return (
    <div className="flex-start p-2 gap-4">
        <div className="loader"></div> {/* Your loader component or element */}
        <span>Processing your request...</span>
    </div>
  )
}

export default ProcessingToast