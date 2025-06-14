
export const JobsHeader = () => {
  return (
    <div className="mb-12 text-center">
      <div className="relative">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
          Find Your Dream Job
        </h1>
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-50"></div>
      </div>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Our AI-powered job matcher finds the perfect opportunities for your skills and career goals. 
        <span className="block mt-2 text-lg font-medium text-blue-600">
          Get matched with top companies looking for talent like you.
        </span>
      </p>
    </div>
  );
};
