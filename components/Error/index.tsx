interface IProps {
  resetErrorBoundary: (...args: unknown[]) => void
}

const Error = ({ resetErrorBoundary }: IProps) => {
  return (
    <div>
      There was an error!
      <button type='button' onClick={() => resetErrorBoundary()}>
        Try again
      </button>
    </div>
  )
}

export default Error
