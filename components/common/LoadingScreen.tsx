const LoadingScreen = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F8F8FB] dark:bg-[#0b0b13]">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  )
}

export default LoadingScreen
